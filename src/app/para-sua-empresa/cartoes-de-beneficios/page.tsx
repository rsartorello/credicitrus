'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";

const faqCartoesBeneficios = [
  {
    question: "O que inclui o portfólio?",
    answer: "Cartões corporativos para benefícios e reconhecimentos: alimentação, refeição, combustível, presente, controle de despesas e premiação."
  },
  {
    question: "Como funciona a aceitação?",
    answer: "Uso em estabelecimentos credenciados por categoria (ex.: mercados/padarias; restaurantes; postos/serviços automotivos)."
  },
  {
    question: "O que a empresa consegue controlar?",
    answer: "Parâmetros de uso, limites por período/categoria e relatórios para acompanhamento e auditoria."
  },
  {
    question: "Há visibilidade por centro de custo/unidade?",
    answer: "Sim, a solução oferece visão gerencial do uso por grupos e períodos (conforme configuração contratada)."
  },
  {
    question: "O cartão de Controle atende viagens e despesas?",
    answer: "Sim, com parâmetros de uso definidos e rastreabilidade de transações. "
  },
  {
    question: "Como a empresa pode reconhecer colaboradores (Presente/Premiação)?",
    answer: "Concessões para datas e campanhas, com critérios definidos e registro das entregas."
  },
  {
    question: "Quais são os prazos de implantação e entrega?",
    answer: "Variam por volume e praça. O cronograma inclui cadastro, emissão e distribuição dos cartões (físicos e/ou virtuais)."
  },
  {
    question: "Como é feita a recarga dos cartões?",
    answer: "Crédito por colaborador e categoria, seguindo o calendário definido com RH/Finanças."
  }
];

export default function CartoesBeneficiosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-sua-empresa-cartoes-de-beneficios.webp"
          titleLines={[
            "CARTÕES",
            "BENEFÍCIOS",
            "PARA SUA",
            "EMPRESA"
          ]}
          highlightIndices={[2, 3]}
          subtitleColor="secondary"
          buttons={[
            { label: "Abra já sua conta", href: "/abra-sua-conta", variant: "secondary" },
            { label: "Já sou associado e quero solicitar", href: "https://wa.me/551633445020", variant: "primary" }
          ]}
        />

        <FeatureCardsSection
          sectionBgClass="bg-[#f8f9fa]"
          cardBgClass="bg-white"
          eyebrowText="PARA SUA EMPRESA"
          title={
            <>
              Soluções de cartões benefícios <br className="hidden md:inline" />
              para gerir e motivar equipes
            </>
          }
          description={
            <>
              Administração de benefícios corporativos com <br className="hidden md:inline" />
              transparência, segurança e suporte especializado.
            </>
          }
          cards={[
            {
              id: 1,
              image: "/soltas/1-cartoes-beneficios.webp",
              title: "Coopcerto Alimentação",
              titleColorClass: "text-primary",
              description: "Com ele o colaborador tem várias opções de supermercados, açougues e padarias. E ainda simplifica a rotina da empresa, que não precisa armazenar cestas básicas ou fazer adiantamentos em dinheiro"
            },
            {
              id: 2,
              image: "/soltas/2-cartoes-beneficios.webp",
              title: "Coopcerto Refeição",
              titleColorClass: "text-primary",
              description: "Liberdade na escolha de refeições em restaurantes, lanchonetes e similares. É mais qualidade de vida para o funcionário e economia para a empresa"
            },
            {
              id: 3,
              image: "/soltas/3-cartoes-beneficios.webp",
              title: "Coopcerto Combustível",
              titleColorClass: "text-primary",
              description: "O jeito mais prático de pagar combustível, estacionamento e demais serviços automotivos, tornando mais fácil a rotina do colaborador e gestão da empresa"
            },
            {
              id: 4,
              image: "/soltas/4-cartoes-beneficios.webp",
              title: "Coopcerto Controle",
              titleColorClass: "text-primary",
              description: "Uma excelente solução para o pagamento de gastos em viagens e controle de despesas corporativas, facilitando a gestão financeira da empresa."
            },
            {
              id: 5,
              image: "/soltas/5-cartoes-beneficios.webp",
              title: "Coopcerto Presente",
              titleColorClass: "text-primary",
              description: "Ideal para datas comemorativas e ocasiões especiais. O presenteado pode escolher o que mais lhe agrada e a empresa ganha praticidade."
            },
            {
              id: 6,
              image: "/soltas/6-cartoes-beneficios.webp",
              title: "Coopcerto Premiação",
              titleColorClass: "text-primary",
              description: "A escolha certa para premiar os funcionários em ações internas, além de motivar o colaborador, a empresa faz a gestão total com facilidade."
            }
          ]}
          gridCols={3}
          ctaTitle="Ficou com alguma dúvida sobre nossos cartões?"
          ctaButtonText="Fale com nosso especialista!"
        />

        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA SUA EMPRESA"
          sectionTitle={
            <>
              Explore outras vantagens de ser <br />
              Credicitrus e cresça com quem <br />
              entende de gente
            </>
          }
        />

        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title={
            <>
              Tire suas dúvidas sobre os <br className="hidden md:inline" />
              cartões benefícios
            </>
          }
          items={faqCartoesBeneficios}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "https://wa.me/551633445020"
          }}
        />

        <SejaAssociado
          title={`Pronto para\nestruturar seu\nprograma de\nbenefícios?`}
          description={`Abra sua conta e conte com\ncartões de benefícios para\nfortalecer a experiência do\ncolaborador.`}
          buttonText="Abra já sua conta"
        />

      </main>
      <Rodape />
    </div>
  );
}
