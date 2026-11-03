import {ImageResponse} from "next/og";
export const alt="Carmel — Alumínio e vidro sob medida";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function Image(){return new ImageResponse(<div style={{background:"#202321",color:"#f5f3ee",height:"100%",width:"100%",padding:85,display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div style={{fontSize:24,color:"#eb7770",letterSpacing:8}}>CARMEL / ALUMÍNIO & VIDRO</div><div style={{fontSize:78,lineHeight:1.08}}>Precisão no detalhe.<br/>Elegância em cada vão.</div><div style={{fontSize:23}}>Fabricação própria · Mogi das Cruzes, SP</div></div>,size)}
