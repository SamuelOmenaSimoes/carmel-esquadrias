import {z} from "zod";
export const quoteSchema=z.object({product:z.string().trim().min(2).max(120),quantity:z.coerce.number().int().min(1).max(1000),measurements:z.string().trim().max(1500),workType:z.enum(["Construção","Reforma","Outro"]),location:z.string().trim().min(3).max(180),deadline:z.string().trim().min(2).max(120),name:z.string().trim().min(2).max(100),email:z.email().max(180),phone:z.string().regex(/^[+()\d\s-]{10,22}$/),notes:z.string().trim().max(2000),consent:z.literal("on"),website:z.literal("")});
export const MAX_FILE=1024*1024;
export const MAX_BODY=3_500_000;
export const MIME=["image/jpeg","image/png","image/webp"];
export function imageMatches(b:Uint8Array,type:string){return type==="image/jpeg"?b[0]===255&&b[1]===216&&b[2]===255:type==="image/png"?[137,80,78,71,13,10,26,10].every((v,i)=>b[i]===v):type==="image/webp"?Buffer.from(b.slice(0,4)).toString()==="RIFF"&&Buffer.from(b.slice(8,12)).toString()==="WEBP":false;}
