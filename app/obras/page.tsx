import {Portfolio} from "@/components/portfolio";
import {CTA} from "@/components/ui";
export const metadata={title:"Obras e portfólio de esquadrias",description:"Portfólio de obras Carmel: registros e especificações de esquadrias de alumínio e vidro.",alternates:{canonical:"/obras"}};
export default function Page(){return <><section className="page-intro"><p className="eyebrow"><span>03</span> / PORTFÓLIO</p><h1>Da medida<br/>à arquitetura.</h1><p className="intro">Projetos e detalhes do trabalho com alumínio e vidro.</p></section><section className="wrap"><Portfolio/><div style={{marginTop:40}}><CTA>Conversar sobre minha obra</CTA></div></section></>}
