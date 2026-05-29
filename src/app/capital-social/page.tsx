'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";
import Depoimentos from "@/components/Depoimentos/Depoimentos";
import Faq from "@/components/Faq/Faq";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import Rodape from "@/components/Rodape/Rodape";

const capitalSocialCards = [
  {
    id: 1,
    image: "/soltas/1-capital-social.webp",
    title: "Como capitalizar",
    titleColorClass: "text-[#003641]",
    description: (
      <p className="text-[#003641] font-normal leading-relaxed">
        O cooperado pode formar e fortalecer seu capital de três formas: Ao ingressar na Cooperativa – adquirindo um número de cotas superior ao mínimo exigido. Adquirindo novas cotas a qualquer tempo. Capitalizando as sobras anuais a que tiver direito.
      </p>
    )
  },
  {
    id: 2,
    image: "/soltas/2-capital-social.jpg",
    title: "Valorização",
    titleColorClass: "text-[#003641]",
    description: (
      <p className="text-[#003641] font-normal leading-relaxed">
        O capital é corrigido anualmente, com base na atualização monetária, com base no desempenho econômico-financeiro da cooperativa.
      </p>
    )
  },
  {
    id: 3,
    image: "/soltas/3-capital-social.webp",
    title: "Viva Bem Plus",
    titleColorClass: "text-[#003641]",
    description: (
      <p className="text-[#003641] font-normal leading-relaxed">
        Benefício exclusivo da Sicoob Credicitrus. O cooperado pode resgatar, em parcelas, o capital acumulado. Regra de resgate: a partir dos 65 anos de idade e 10 anos de filiação à Cooperativa.
      </p>
    )
  }
];

const faqCapitalSocial = [
  {
    id: 1,
    question: "O que é Capital Social?",
    answer: ""
  },
  {
    id: 2,
    question: "Como me associo para se tornar co-proprietário da credicitrus?",
    answer: ""
  },
  {
    id: 3,
    question: "Quais os benefícios de se tornar um co-proprietário?",
    answer: ""
  },
  {
    id: 4,
    question: "Quanto rende o Capital Social da Credicitrus?",
    answer: ""
  }
];

export default function CapitalSocialPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-capital-social.webp"
          titleLines={[
            "CAPITAL SOCIAL",
            "CREDICITRUS"
          ]}
          highlightIndices={[1]}
          buttons={[
            { label: "ABRA JÁ SUA CONTA", href: "/abra-sua-conta", variant: "secondary" }
          ]}
        />


        <FeatureCardsSection
          sectionBgClass="bg-[#f8f9fa]"
          cardBgClass="bg-white"
          eyebrowText="CAPITAL SOCIAL"
          title={
            <>
              Um investimento que beneficia você, <br />
              sua família e sua cooperativa
            </>
          }
          description={
            <>
              Aqui na Credicitrus, a soma das cotas de capital de todos os cooperados <br />
              os tornam co-proprietários da Cooperativa. É por meio do capital social <br />
              que você se associa e passa a fazer parte do negócio.
            </>
          }
          cards={capitalSocialCards}
          gridCols={3}
          compact={true}
          ctaTitle={
            <>
              Ainda tem dúvida <br className="hidden md:block" />
              sobre abrir sua conta?
            </>
          }
          ctaButtonText="Fale com nosso especialista!"
          ctaButtonHref="https://wa.me/551733445020"
          disclaimer={
            <>
              *As linhas de empréstimos e financiamentos são sujeitas à análise de crédito e cadastral e estão disponíveis apenas para cooperados Credicitrus. Caso alguma das linhas automáticas não esteja disponível no App Sicoob, contate seu gerente.
            </>
          }
        />

        <Depoimentos />

        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title={"Ficou com alguma dúvida sobre\no Capital Social?"}
          items={faqCapitalSocial}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista",
            href: "https://wa.me/551733445020"
          }}
        />

      </main>
      <Rodape />
    </div>
  );
}
