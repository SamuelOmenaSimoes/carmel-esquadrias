import {NextRequest,NextResponse} from "next/server";
import {createHash,randomUUID} from "node:crypto";
import {quoteSchema,MAX_BODY,MAX_FILE,MIME,imageMatches} from "@/lib/quote";
export const runtime="nodejs";
function fail(error:string,status=400){return NextResponse.json({error},{status})}
async function limitedBody(req:NextRequest){const reader=req.body?.getReader();if(!reader)throw new Error("empty");const chunks:Uint8Array[]=[];let size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>MAX_BODY){await reader.cancel();throw new Error("size")}chunks.push(value)}return Buffer.concat(chunks);}
export async function POST(req:NextRequest){
 const origin=req.headers.get("origin");const expected=process.env.SITE_URL||req.nextUrl.origin;if(!origin||origin!==expected)return fail("Origem não autorizada.",403);
 if(!req.headers.get("content-type")?.startsWith("multipart/form-data"))return fail("Formato inválido.",415);
 if(Number(req.headers.get("content-length"))>MAX_BODY)return fail("As fotos devem somar no máximo 3 MB.",413);
 const {UPSTASH_REDIS_REST_URL:redis,UPSTASH_REDIS_REST_TOKEN:token,RESEND_API_KEY:key,QUOTE_FROM:from,QUOTE_TO:to}=process.env;
 if(!redis||!token||!key||!from||!to)return fail("O envio por e-mail está temporariamente indisponível. Continue pelo WhatsApp.",503);
 try{
  // Vercel fornece x-vercel-forwarded-for; não confiar em x-forwarded-for arbitrário.
  const ip=process.env.VERCEL?req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim():"local";
  if(!ip)return fail("Não foi possível verificar esta solicitação.",403);
  const rateKey=`carmel:quote:${createHash("sha256").update(ip).digest("hex").slice(0,32)}`;
  const script="local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n";
  const rr=await fetch(redis,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify(["EVAL",script,1,rateKey]),signal:AbortSignal.timeout(5000)});if(!rr.ok)return fail("Serviço temporariamente indisponível.",503);const r=await rr.json();if(r.error||typeof r.result!=="number")return fail("Serviço temporariamente indisponível.",503);if(r.result>5)return fail("Muitas tentativas. Aguarde 10 minutos.",429);
  let form:FormData;try{const bytes=await limitedBody(req);form=await new Response(bytes,{headers:{"Content-Type":req.headers.get("content-type")!}}).formData()}catch{return fail("Dados inválidos ou acima de 3 MB.",413)}
  if(form.get("website"))return fail("Solicitação inválida.");
  const result=quoteSchema.safeParse(Object.fromEntries(form));if(!result.success)return fail("Revise os campos e confirme o consentimento.");
  const files=form.getAll("photos").filter((f):f is File=>f instanceof File&&f.size>0);if(files.length>3)return fail("Envie até 3 imagens.");
  const attachments=[];let index=0;for(const f of files){if(f.size>MAX_FILE||!MIME.includes(f.type))return fail("Use JPG, PNG ou WebP com até 1 MB por imagem.");const b=Buffer.from(await f.arrayBuffer());if(!imageMatches(b,f.type))return fail("Conteúdo de imagem inválido.");attachments.push({filename:`foto-${++index}.${f.type==="image/jpeg"?"jpg":f.type.split("/")[1]}`,content:b.toString("base64")})}
  const d=result.data;const id=randomUUID();const text=`Pedido ${id}\nNome: ${d.name}\nE-mail: ${d.email}\nTelefone: ${d.phone}\nProduto: ${d.product}\nQuantidade/ambientes: ${d.quantity}\nMedidas aproximadas: ${d.measurements||"Não informadas"}\nObra: ${d.workType}\nLocal: ${d.location}\nPrazo: ${d.deadline}\nObservações: ${d.notes}\nConsentimento LGPD: aceito em ${new Date().toISOString()} — política /privacidade v1.`;
  const sent=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({from,to:[to],reply_to:d.email,subject:"Novo pedido de orçamento — Carmel",text,attachments}),signal:AbortSignal.timeout(15000)});
  if(!sent.ok)return fail("O e-mail não foi enviado. Continue pelo WhatsApp ou tente novamente.",502);
  return NextResponse.json({ok:true,id});
 }catch{return fail("Não foi possível enviar agora. Continue pelo WhatsApp.",503)}
}
