import company from "@/content/company.json";
export { company };
export const wa = (text = "Olá! Gostaria de solicitar um orçamento para meu projeto.") => `https://wa.me/${company.phone}?text=${encodeURIComponent(text)}`;
