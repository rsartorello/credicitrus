'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";

const faqReceba = [
  {
    question: "O que é o Desconto de Recebíveis?",
    answer: "É a antecipação de valores que sua empresa tem a receber por meio de cheques, duplicatas ou notas promissórias. Assim, você transforma vendas a prazo em dinheiro à vista, com agilidade e condições competitivas."
  },
  {
    question: "Quem pode usar o Desconto de Recebíveis?",
    answer: "Empresas e estabelecimentos que trabalham com prazos de recebimento e desejam melhorar seu fluxo de caixa, aumentar a liquidez ou aproveitar oportunidades de negócio."
  },
  {
    question: "O que é a Cobrança de Títulos?",
    answer: "É o serviço de emissão e gestão de boletos bancários, permitindo organizar cobranças, acompanhar pagamentos e obter previsibilidade no recebimento, tudo com tarifas competitivas."
  },
  {
    question: "A Cobrança de Títulos é indicada para qual tipo de negócio?",
    answer: "Para empresas de todos os portes, que precisam emitir boletos, controlar recebimentos e otimizar sua gestão financeira."
  },
  {
    question: "O que é a solução de Vendas com Cartões (Sipag)?",
    answer: "É a maquininha de cartões da Credicitrus, ideal para estabelecimentos comerciais e profissionais liberais que precisam receber no débito e no crédito com segurança e agilidade."
  },
  {
    question: "Quais são as vantagens da Sipag?",
    answer: "Taxas competitivas, tecnologia confiável, rapidez no processamento, controle dos recebimentos e o suporte da Credicitrus para fortalecer o seu negócio."
  },
  {
    question: "Preciso ser associado para usar as soluções de recebimento?",
    answer: "Sim. Para contratar qualquer solução de recebimento, é necessário ser cooperado da Credicitrus. O processo de associação é simples e pode ser iniciado pelo nosso aplicativo."
  }
];

export default function RecebaPraticidadeSegurancaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-sua-empresa-solucoes-de-recebimento.webp"
          titleLines={[
            "RECEBA COM",
            "MAIS PRATICIDADE",
            "E SEGURANÇA"
          ]}
          highlightIndices={0}
          subtitleColor="secondary"
          buttons={[
            { label: "Abra já sua conta", href: "/abra-sua-conta", variant: "secondary" },
            { label: "Já sou associado e quero receber melhor", href: "https://wa.me/551633445020", variant: "primary" }
          ]}
        />

        <FeatureCardsSection
          sectionBgClass="bg-[#f8f9fa]"
          cardBgClass="bg-white"
          eyebrowText="PARA SUA EMPRESA"
          title={
            <>
              Soluções de recebimentos que dão <br />
              mais praticidade ao seu dia a dia
            </>
          }
          description={
            <>
              Na Credicitrus, você recebe seus valores com agilidade, segurança e total transparência. <br />
              Organize cobranças, antecipe recebíveis e tenha mais controle sobre sua vida financeira.
            </>
          }
          cards={[
            {
              id: 1,
              image: "/soltas/1-receber-praticidade-seguranca.webp",
              title: "Desconto de Recebíveis",
              titleColorClass: "text-primary",
              description: "Antecipe valores de cheques, duplicatas e notas promissórias e fortaleça o fluxo de caixa do seu negócio com agilidade, com um processo descomplicado e com taxas atrativas."
            },
            {
              id: 2,
              image: "/soltas/2-receber-praticidade-seguranca.webp",
              title: "Cobrança de Títulos",
              titleColorClass: "text-primary",
              description: "Aprimore sua cobrança por boletos bancários com emissão simples, controle eficiente e condições competitivas. Deixe os boletos por nossa conta e ganhe previsibilidade e praticidade no seu recebimento."
            },
            {
              id: 3,
              image: "/soltas/3-receber-praticidade-seguranca.webp",
              title: "Venda com Cartões",
              titleColorClass: "text-primary",
              description: "A solução ideal para estabelecimentos comerciais e profissionais liberais, com a segurança e agilidade da Sipag para vender no débito e crédito, controlar recebimentos e impulsionar os resultados."
            }
          ]}
          gridCols={3}
          ctaTitle="Ficou com alguma dúvida?"
          ctaButtonText="Fale com nosso especialista!"
        />

        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA SUA EMPRESA"
          sectionTitle={
            <>
              Explore outras vantagens de ser Credicitrus <br />
              e cresça com quem entende de negócio
            </>
          }

        />

        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title="Tire suas dúvidas sobre as nossas soluções de recebimentos"
          items={faqReceba}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "#"
          }}
        />

        <SejaAssociado
          title={`Pronto para\nrealizar seus\nobjetivos?`}
          description={`Abra sua conta e invista com a\nconfiança do cooperativismo:\ncondições claras, taxas justas e\npotencial de retorno para\nimpulsionar seus objetivos.`}
          buttonText="Abra sua conta PJ"
        />

      </main>
      <Rodape />
    </div>
  );
}
