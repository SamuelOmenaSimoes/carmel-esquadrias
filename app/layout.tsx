import type {Metadata} from "next";
import {Space_Grotesk,Inter} from "next/font/google";
import {Header,Footer} from "@/components/shell";
import {company} from "@/lib/data";
import "./globals.css";
const display=Space_Grotesk({subsets:["latin"],variable:"--font-display",display:"swap"});
const body=Inter({subsets:["latin"],variable:"--font-body",display:"swap"});
export const metadata:Metadata={metadataBase:new URL(company.url),title:{default:"Carmel | Esquadrias de alumínio e vidro em Mogi das Cruzes",template:"%s | Carmel"},description:"Fabricação própria de esquadrias de alumínio e vidro em Mogi das Cruzes. Projetos personalizados e produtos sob medida. Solicite orçamento.",openGraph:{locale:"pt_BR",type:"website",siteName:"Carmel",title:"Carmel · Alumínio e vidro sob medida",description:"Esquadrias para o seu projeto em Mogi das Cruzes."},robots:{index:true,follow:true}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body className={`${display.variable} ${body.variable}`}><a className="skip" href="#conteudo">Pular para conteúdo</a><Header/><main id="conteudo">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness",name:company.name,url:company.url,telephone:company.displayPhone,email:company.email,description:"Fábrica de esquadrias de alumínio e vidro em Mogi das Cruzes",address:{"@type":"PostalAddress",addressLocality:"Mogi das Cruzes",addressRegion:"SP",addressCountry:"BR"}}).replace(/</g,"\u003c")}}/></body></html>}
