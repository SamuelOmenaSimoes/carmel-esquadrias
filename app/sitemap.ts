import type {MetadataRoute} from "next";
import products from "@/content/products.json";
import {works} from "@/lib/works";
import {company} from "@/lib/data";
export default function sitemap():MetadataRoute.Sitemap{return ["","/produtos","/obras","/sobre","/profissionais","/orcamento","/privacidade",...products.map(p=>`/produtos/${p.slug}`),...works.map(w=>`/obras/${w.slug}`)].map(path=>({url:company.url+path}))}
