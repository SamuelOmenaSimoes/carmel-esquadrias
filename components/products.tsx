import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import products from "@/content/products.json";
export function ProductRows({limit}:{limit?:number}){return <div>{products.slice(0,limit).map((p,i)=><Link className="product-row" key={p.slug} href={`/produtos/${p.slug}`}><span>{String(i+1).padStart(2,"0")}</span><h3>{p.title}</h3><p>{p.summary}</p><ArrowUpRight size={24}/></Link>)}</div>}
