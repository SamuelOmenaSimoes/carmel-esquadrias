import type {Metadata} from "next";
import {ProductRows} from "@/components/products";
import {Openings} from "@/components/openings";
import {Heading} from "@/components/ui";
export const metadata:Metadata={title:"Produtos e esquadrias sob medida em Mogi das Cruzes",description:"Explore janelas, portas e soluções de alumínio e vidro. Consulte a disponibilidade e peça orçamento para Mogi das Cruzes.",alternates:{canonical:"/produtos"}};
export default function Page(){return <><section className="page-intro"><p className="eyebrow"><span>01</span> / SOLUÇÕES SOB MEDIDA</p><h1>Materiais, movimentos<br/>e possibilidades.</h1><p className="intro">Catálogo de aplicações para orientar sua consulta. Categorias, linhas, vidros e acabamentos dependem de confirmação da Carmel.</p></section><section className="wrap"><ProductRows/></section><section className="dark"><div className="wrap split"><Heading n="T" kicker="Guia de aberturas" title="Veja o movimento antes de decidir.">Ilustrações conceituais. A viabilidade de cada abertura depende das dimensões e da especificação do projeto.</Heading><Openings/></div></section></>}
