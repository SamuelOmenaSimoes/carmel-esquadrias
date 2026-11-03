"use client";
import {motion,useReducedMotion} from "framer-motion";
export function Reveal({children}:{children:React.ReactNode}){const reduce=useReducedMotion();return <motion.div initial={reduce?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.55,ease:"easeOut"}}>{children}</motion.div>}
