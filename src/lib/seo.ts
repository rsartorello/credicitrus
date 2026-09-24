import type { Metadata } from "next";
import { getSiteUrl, isPublicIndexingEnabled } from "@/lib/site-url";

export { getSiteUrl, isPublicIndexingEnabled } from "@/lib/site-url";

export const DEFAULT_DESCRIPTION =
  "Cooperativa de crédito Credicitrus: soluções financeiras para você, sua empresa e o agronegócio, com transparência e proximidade.";

export const SITE_NAME = "Credicitrus";

export type PageSeo = {
  path: string;
  title: string;
  description: string;
};

/** Catálogo de rotas públicas para metadata + sitemap. */
export const PUBLIC_PAGES: PageSeo[] = [
  {
    path: "/",
    title: "Cooperativa de Crédito",
    description: DEFAULT_DESCRIPTION,
  },
  {
    path: "/quem-somos",
    title: "Quem somos",
    description:
      "Conheça a Credicitrus: história, propósito e o modelo cooperativo que coloca as pessoas no centro.",
  },
  {
    path: "/capital-social",
    title: "Capital social",
    description:
      "Entenda o capital social da Credicitrus e como a participação dos associados fortalece a cooperativa.",
  },
  {
    path: "/abra-sua-conta",
    title: "Abra sua conta",
    description:
      "Abra sua conta na Credicitrus e faça parte de uma cooperativa de crédito próxima e transparente.",
  },
  {
    path: "/nossas-agencias",
    title: "Nossas agências",
    description:
      "Encontre a agência Credicitrus mais perto de você e fale com nossa equipe.",
  },
  {
    path: "/nossas-redes-sociais",
    title: "Redes sociais",
    description:
      "Acompanhe a Credicitrus nas redes sociais e fique por dentro das novidades.",
  },
  {
    path: "/fale-com-a-gente",
    title: "Fale com a gente",
    description:
      "Canais de atendimento Credicitrus para dúvidas, suporte e relacionamento com associados.",
  },
  {
    path: "/duvidas-frequentes",
    title: "Dúvidas frequentes",
    description:
      "Respostas para as perguntas mais comuns sobre produtos, serviços e atendimento Credicitrus.",
  },
  {
    path: "/para-voce",
    title: "Para você",
    description:
      "Soluções financeiras Credicitrus para pessoa física: crédito, investimentos, cartões e muito mais.",
  },
  {
    path: "/para-voce/emprestimos-e-financiamentos",
    title: "Empréstimos e financiamentos",
    description:
      "Empréstimos e financiamentos Credicitrus para realizar seus planos com condições pensadas para associados.",
  },
  {
    path: "/para-voce/cartoes-de-credito",
    title: "Cartões de crédito",
    description:
      "Cartões de crédito Credicitrus com benefícios e praticidade no dia a dia.",
  },
  {
    path: "/para-voce/consorcios",
    title: "Consórcios",
    description:
      "Consórcios Credicitrus para conquistar bens com planejamento e sem juros de financiamento tradicional.",
  },
  {
    path: "/para-voce/investimentos",
    title: "Investimentos",
    description:
      "Opções de investimento Credicitrus para fazer seu dinheiro render com segurança e orientação.",
  },
  {
    path: "/para-voce/seguros",
    title: "Seguros",
    description:
      "Seguros Credicitrus para proteger você, sua família e seu patrimônio.",
  },
  {
    path: "/para-voce/solucoes-de-recebimento",
    title: "Soluções de recebimento",
    description:
      "Soluções de recebimento Credicitrus para facilitar cobranças e gestão financeira pessoal.",
  },
  {
    path: "/para-voce/credicitrus-club",
    title: "Credicitrus Club",
    description:
      "Credicitrus Club: vantagens e benefícios exclusivos para associados.",
  },
  {
    path: "/para-sua-empresa",
    title: "Para sua empresa",
    description:
      "Soluções Credicitrus para empresas: crédito, recebíveis, cartões, seguros e consórcios.",
  },
  {
    path: "/para-sua-empresa/emprestimos-e-financiamentos",
    title: "Empréstimos e financiamentos para empresas",
    description:
      "Crédito empresarial Credicitrus para impulsionar o crescimento do seu negócio.",
  },
  {
    path: "/para-sua-empresa/antecipacao-de-recebiveis",
    title: "Antecipação de recebíveis",
    description:
      "Antecipe recebíveis com a Credicitrus e melhore o fluxo de caixa da sua empresa.",
  },
  {
    path: "/para-sua-empresa/cartoes-de-credito",
    title: "Cartões de crédito empresariais",
    description:
      "Cartões de crédito para empresas com praticidade na gestão de despesas.",
  },
  {
    path: "/para-sua-empresa/cartoes-de-beneficios",
    title: "Cartões de benefícios",
    description:
      "Cartões de benefícios Credicitrus para valorizar sua equipe.",
  },
  {
    path: "/para-sua-empresa/consorcios",
    title: "Consórcios empresariais",
    description:
      "Consórcios Credicitrus para empresas adquirirem bens com planejamento.",
  },
  {
    path: "/para-sua-empresa/seguros",
    title: "Seguros empresariais",
    description:
      "Seguros para empresas Credicitrus com cobertura alinhada ao seu negócio.",
  },
  {
    path: "/para-sua-empresa/solucoes-de-recebimento",
    title: "Soluções de recebimento para empresas",
    description:
      "Receba e gerencie pagamentos com soluções Credicitrus para empresas.",
  },
  {
    path: "/para-sua-empresa/credicitrus-club",
    title: "Credicitrus Club empresas",
    description:
      "Benefícios Credicitrus Club voltados ao segmento empresarial.",
  },
  {
    path: "/para-o-agronegocio",
    title: "Para o agronegócio",
    description:
      "Crédito rural, seguros e consórcios Credicitrus para o agronegócio.",
  },
  {
    path: "/para-o-agronegocio/credito-rural",
    title: "Crédito rural",
    description:
      "Crédito rural Credicitrus para financiar a produção e o desenvolvimento no campo.",
  },
  {
    path: "/para-o-agronegocio/seguro",
    title: "Seguro agro",
    description:
      "Seguros para o agronegócio com a Credicitrus: proteção para a produção e o patrimônio rural.",
  },
  {
    path: "/para-o-agronegocio/consorcios",
    title: "Consórcios agro",
    description:
      "Consórcios Credicitrus para o agronegócio com planejamento de longo prazo.",
  },
  {
    path: "/transparencia",
    title: "Transparência",
    description:
      "Portal de transparência Credicitrus: relatórios, normativos, ética e informações institucionais.",
  },
  {
    path: "/transparencia/relatorios",
    title: "Relatórios",
    description:
      "Relatórios Credicitrus disponíveis para consulta e download.",
  },
  {
    path: "/transparencia/normativos",
    title: "Normativos",
    description:
      "Políticas, leis e documentos oficiais publicados pela Credicitrus.",
  },
  {
    path: "/transparencia/etica-e-integridade",
    title: "Ética e integridade",
    description:
      "Compromissos de ética e integridade da Credicitrus.",
  },
  {
    path: "/transparencia/assembleia",
    title: "Assembleia",
    description:
      "Informações e documentos das assembleias Credicitrus.",
  },
  {
    path: "/transparencia/gerenciamento-de-riscos-e-capital",
    title: "Gerenciamento de riscos e capital",
    description:
      "Informações sobre gerenciamento de riscos e capital da Credicitrus.",
  },
  {
    path: "/transparencia/prevencao-a-fraudes-e-golpes",
    title: "Prevenção a fraudes e golpes",
    description:
      "Orientações Credicitrus para prevenção a fraudes e golpes.",
  },
  {
    path: "/transparencia/seguranca-e-privacidade",
    title: "Segurança e privacidade",
    description:
      "Políticas de segurança e privacidade da Credicitrus.",
  },
];

const byPath = new Map(PUBLIC_PAGES.map((p) => [p.path, p]));

export function getPageSeo(path: string): PageSeo {
  return (
    byPath.get(path) || {
      path,
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
    }
  );
}

export function buildPageMetadata(path: string): Metadata {
  const page = getPageSeo(path);
  const url = `${getSiteUrl()}${path === "/" ? "" : path}`;
  const fullTitle =
    path === "/"
      ? `${SITE_NAME} | ${page.title}`
      : `${page.title} | ${SITE_NAME}`;
  const indexable = isPublicIndexingEnabled();

  return {
    title: path === "/" ? { absolute: fullTitle } : page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: page.description,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
    },
    robots: indexable
      ? { index: true, follow: true }
      : {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            noarchive: true,
            nosnippet: true,
          },
        },
  };
}
