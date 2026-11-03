import {notFound} from "next/navigation";
import {works} from "@/lib/works";
import {CTA,Photo} from "@/components/ui";
export const dynamicParams=false;
export function generateStaticParams(){return works.map(w=>({slug:w.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const w=works.find(x=>x.slug===slug);return {title:w?.title||"Obra",description:w?.description,alternates:{canonical:`/obras/${slug}`}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const w=works.find(x=>x.slug===slug);if(!w)notFound();return <><section className="page-intro"><p className="eyebrow"><span>{w.type}</span> / {w.location}</p><h1>{w.title}</h1><p className="intro">{w.description}</p></section><section className="wrap"><div className="works-grid">{w.images.map(i=><Photo key={i.src} src={i.src} description={i.alt}/>)}</div><dl className="specs">{Object.entries({Produto:w.product,Linha:w.line,Vidro:w.glass,Cor:w.color,Local:w.location}).map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>{w.testimonial&&<blockquote>{w.testimonial}</blockquote>}<div style={{marginTop:40}}><CTA>Orçar um projeto semelhante</CTA></div></section></>}
