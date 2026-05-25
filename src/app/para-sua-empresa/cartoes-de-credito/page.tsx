'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";
import ContentBlockSection from "@/components/ContentBlockSection/ContentBlockSection";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";

const cartoesPJ = [
  {
    id: 1,
    image: "/soltas/1-cartoes-empresa.webp",
    title: "Conta Empresa",
    description: "Cartão de débito e múltiplo, ideal para movimentações do dia a dia da empresa, com segurança e controle pelo app.",
    href: "#"
  },
  {
    id: 2,
    image: "/soltas/2-cartoes-empresa.webp",
    title: "Minha Empresa",
    description: "Cartão corporativo com função múltipla, limites adequados para empresas menores e benefícios das bandeiras Mastercard ou Visa.",
    href: "#"
  },
  {
    id: 3,
    image: "/soltas/3-cartoes-empresa.webp",
    title: "Empresarial",
    description: "Cartão corporativo completo, com limites mais altos, programa de pontos, seguros, assistências e vantagens para viagens e compras corporativas.",
    href: "#"
  }
];

const outrasSolucoesPJ = [
  {
    id: 1,
    title: "Empréstimos e Financiamentos",
    description: "Realize seus planos com crédito sob medida.",
    icon: '/soltas/icone-ativos-financeiros.svg',
    link: "/para-empresas/emprestimos-e-investimentos"
  },
  {
    id: 2,
    title: "Investimentos",
    description: "Faça seu dinheiro render com segurança.",
    icon: '/soltas/icone-grafico-acenssao.svg',
    link: "/para-empresas/investimentos"
  },
  {
    id: 3,
    title: "Consórcio",
    description: "Conquiste bens com planejamento e sem pagar juros.",
    icon: '/soltas/icone-cooperados.svg',
    link: "/para-empresas/consorcios"
  },
  {
    id: 4,
    title: "Seguro",
    description: "Proteja o que importa com tranquilidade.",
    icon: '/soltas/icone-grafico-cadeado.svg',
    link: "/para-empresas/seguros"
  }
];

const faqCartoesPJ = [
  {
    question: "Quais bandeiras os cartões utilizam?",
    answer: "Mastercard e Visa, oferecendo benefícios como seguros, proteções e assistências para compras e viagens."
  },
  {
    question: "O cartão empresarial tem pagamento por aproximação?",
    answer: "Sim. Todos os cartões têm tecnologia contactless, agilizando transações do dia a dia."
  },
  {
    question: "É possível emitir cartões adicionais para colaboradores?",
    answer: "Sim. Cartões adicionais podem ser solicitados e vinculados ao limite geral da empresa, facilitando a gestão de despesas."
  },
  {
    question: "Os cartões oferecem benefícios corporativos?",
    answer: "Sim. Dependendo da categoria, há acesso a salas VIP, seguros de viagem, concierge, proteção de compras e programa de pontos Coopera."
  },
  {
    question: "Como a empresa controla gastos e limites?",
    answer: "Tudo é gerenciado pelo app, onde é possível acompanhar transações, ajustar limites e liberar funções."
  },
  {
    question: "Preciso ser cooperado para solicitar?",
    answer: "Sim. Apenas empresas cooperadas podem solicitar cartões Credicitrus. A abertura de conta PJ é rápida e digital."
  }
];

export default function CartoesPJPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-sua-empresa-cartoes-de-credito.webp"
          titleLines={["CARTÕES QUE", "IMPULSIONAM A", "SUA EMPRESA"]}
          highlightIndices={[1, 2]}
          subtitleColor="secondary"
          buttons={[
            { label: "Abra já sua conta PJ", href: "#", variant: "secondary" },
            { label: "Já sou associado e quero solicitar", href: "#", variant: "primary" }
          ]}
        />

        <FeatureCardsSection
          eyebrowText="PARA SUA EMPRESA"
          title={
            <>
              Soluções de cartões para gerir <br />
              e expandir seu negócio
            </>
          }
          description="Os cartões Credicitrus estão disponíveis nas bandeiras Mastercard e Visa, com pagamento por aproximação, uso internacional, cartão virtual e carteiras digitais, tudo com benefícios e seguros das bandeiras para compras e viagens"
          cards={cartoesPJ}
          ctaTitle="Ficou na dúvida sobre qual cartão é ideal para o seu negócio?"
          ctaButtonText="Fale com nosso especialista!"
        />

        <ContentBlockSection
          title={
            <>
              PROGRAMA <br />
              COOPERA
            </>
          }
          paragraphs={[
            "As compras com os cartões Sicoobcard geram pontos, que podem ser trocados por produtos eletroeletrônicos, milhas aéreas ou até crédito na fatura do cartão.",
            "É possível comprar no Coopera através da troca de pontos, cartão + pontos, ou só no cartão, de forma rápida, fácil e 100% segura!"
          ]}
          paragraphsInside={true}
          footerText={
            <>
              Mais detalhes em sua agência <br />
              ou no site
            </>
          }
          cta={{
            text: "www.shopcoopera.com.br",
            href: "https://www.shopcoopera.com.br"
          }}
          imageSrc="/soltas/4-cartoes-empresa.webp"
          imageAlt="Programa Coopera"
          imagePosition="right"
          imageAspectRatio="aspect-square"
          titleWeight="font-medium"
          paragraphWeight="font-normal"
          footerWeight="font-extrabold"
          reverseOnMobile={true}
        />

        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA SUA EMPRESA"
          sectionTitle={
            <>
              Explore outras vantagens de ser <br />
              Credicitrus e cresça com quem <br />
              entende do seu negócio
            </>
          }
        />

        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title="Tire suas dúvidas sobre nossos cartões empresariais"
          items={faqCartoesPJ}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "#"
          }}
        />

        <SejaAssociado
          title={`Pronto para\ncomeçar?`}
          description={`Abra sua conta e conte com\ncartões seguros, digitais e\nadequados para impulsionar\nsuas operações.`}
          buttonText="Abra já sua conta PJ"
        />

      </main>
      <Rodape />
    </div>
  );
}
