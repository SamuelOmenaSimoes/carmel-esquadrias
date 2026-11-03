import raw from "@/content/works.json";
export type Work={slug:string;title:string;product:string;type:"Residencial"|"Comercial"|"Condomínio";description:string;line:string;glass:string;color:string;location:string;images:{src:string;alt:string}[];testimonial?:string};
export const works=raw as Work[];
