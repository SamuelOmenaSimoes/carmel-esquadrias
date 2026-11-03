import {Heading,Photo} from "@/components/ui";
const images=[
{file:"ilustracoes/box",title:"Vidro e pedra em equilíbrio",alt:"Imagem ilustrativa gerada por IA: banheiro com box transparente e acabamentos em pedra clara"},
{file:"ilustracoes/pergolado",title:"A arquitetura encontra o jardim",alt:"Imagem ilustrativa gerada por IA: pátio com pergolado em alumínio e vidro"},
{file:"ilustracoes/fabricacao",title:"Precisão na matéria",alt:"Imagem ilustrativa gerada por IA: cortes de perfis de alumínio sobre bancada"},
{file:"conexao-ambientes",title:"Conexão entre ambientes",alt:"Ambiente com plantas e esquadria de piso a teto, com texto sobre integração entre interior e exterior"},
{file:"luz-natural",title:"Luz que desenha o espaço",alt:"Janela de perfis claros iluminada pelo sol, com texto sobre luz natural"},
{file:"ambiente-familia",title:"O espaço de todos os dias",alt:"Família à mesa junto a uma esquadria escura em um dia de chuva"},
{file:"casa-contemporanea",title:"Arquitetura e transparência",alt:"Casa de dois pavimentos com grandes superfícies envidraçadas"},
{file:"escada-envidracada",title:"Luz junto à escada",alt:"Escada e vão envidraçado com perfis escuros"},
{file:"detalhe-guarda-corpo",title:"Encontros de materiais",alt:"Detalhe de corrimão metálico e painéis de vidro"},
];
export function Inspiration({all=false}:{all?:boolean}){return <section className="wrap"><Heading n="↗" kicker="Inspirações Carmel" title="Mais luz. Mais possibilidades.">Referências de ambientes, materiais e detalhes para imaginar as possibilidades do seu projeto.</Heading><div className="inspiration-grid">{images.slice(0,all?images.length:3).map(i=><figure key={i.file}><Photo src={`/obras/${i.file}.png`} description={i.alt}/><figcaption>{i.title}</figcaption></figure>)}</div></section>}
