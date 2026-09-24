import { getSiteUrl, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";

/** Dados institucionais já publicados no rodapé / site — não inventar. */
export const ORG = {
  legalName: "Sicoob Credicitrus",
  name: SITE_NAME,
  alternateName: ["Credicitrus", "Sicoob Credicitrus"],
  taxId: "54.037.916/0001-45",
  description: DEFAULT_DESCRIPTION,
  telephone: "+55-17-3345-9000",
  whatsapp: "+55-17-3344-5020",
  ouvidoria: "0800-770-6883",
  email: undefined as string | undefined,
  address: {
    streetAddress: "Rua Prudente de Moraes, 534",
    addressLocality: "Bebedouro",
    addressRegion: "SP",
    postalCode: "14700-120",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.instagram.com/credicitrus/",
    "https://www.facebook.com/SicoobCredicitrus/",
    "https://www.linkedin.com/company/sicoob-credicitrus/",
    "https://www.tiktok.com/@credicitrus",
    "https://www.youtube.com/channel/UCjdKzIzfl5Ywst_XO_tsJjA",
  ],
  areaServed: ["SP", "MG", "MS"],
  openingHours: "Mo-Fr 08:00-16:00",
} as const;

export function orgId() {
  return `${getSiteUrl()}/#organization`;
}

export function websiteId() {
  return `${getSiteUrl()}/#website`;
}
