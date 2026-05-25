'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";


const faqAntecipacao = [
  {
    question: "O que é a antecipação de recebíveis?",
    answer: "É a liberação antecipada de valores a receber de vendas a prazo, para reforçar o capital de giro e dar previsibilidade ao caixa. As condições são definidas na contratação e podem variar conforme análise de crédito."
  },
  {
    question: "Quais modalidades estão disponíveis?",
    answer: "A cooperativa oferece antecipação dos recebíveis originados nas modalidades boleto e vendas na maquininha (SIPAG), conforme habilitação contratada."
  },
  {
    question: "Quem pode contratar?",
    answer: "Cooperados com conta ativa, elegíveis conforme análise cadastral e de crédito. A habilitação das modalidades depende das políticas vigentes."
  },
  {
    question: "Como solicito a antecipação?",
    answer: "Procure seu gerente de conta para contratar. Ele orienta a habilitação do serviço e os próximos passos."
  },
  {
    question: "Em quanto tempo o crédito é liberado?",
    answer: "O prazo de crédito é informado na contratação e pode variar por modalidade, volume e perfil do cooperado."
  },
  {
    question: "Posso antecipar parte dos recebíveis?",
    answer: "Sim. Antecipação total ou parcial pode estar disponível conforme as opções previstas no contrato e no limite aprovado."
  },
  {
    question: "Quais custos estão envolvidos?",
    answer: "Podem incidir taxas e encargos conforme modalidade, prazo e perfil, além de tarifas operacionais quando aplicáveis. Os valores são informados na proposta comercial e no contrato."
  },
  {
    question: "Existem limites de antecipação?",
    answer: "Sim. Limites são definidos a partir da análise de crédito, histórico de relacionamento e políticas internas."
  }
];

export default function AntecipacaoRecebiveisPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-sua-empresa-antecipacao-de-recebiveis.webp"
          titleLines={[
            "ANTECIPAÇÃO",
            "DE RECEBÍVEIS"
          ]}
          highlightIndices={1}
          subtitleColor="secondary"
          buttons={[
            { label: "Abra já sua conta PJ", href: "/abra-sua-conta", variant: "secondary" },
            { label: "Já sou associado e tenho interesse", href: "#", variant: "primary" }
          ]}
        />

        <FeatureCardsSection
          sectionBgClass="bg-[#f8f9fa]"
          cardBgClass="bg-white"
          eyebrowText="PARA SUA EMPRESA"
          title={
            <>
              Transforme vendas a prazo em <br />
              recursos imediatos para o seu caixa.
            </>
          }
          description={
            <>
              Converta vendas a prazo em liquidez e ganhe previsibilidade no fluxo <br />
              de caixa da empresa.
            </>
          }
          cards={[
            {
              id: 1,
              image: "/soltas/1-antecipacao-de-recebiveis.webp",
              title: "Boleto",
              titleColorClass: "text-primary",
              description: "Antecipe seus boletos emitidos e traga previsibilidade ao seu negócio."
            },
            {
              id: 2,
              image: "/soltas/2-antecipacao-de-recebiveis.webp",
              title: "Máquina de Cartão (Sipag)",
              titleColorClass: "text-primary",
              description: "Antecipe suas vendas realizadas no cartão e fortaleça o caixa de forma segura."
            }
          ]}
          gridCols={2}
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
              Tire suas dúvidas sobre <br />
              antecipações de recebíveis
            </>
          }
          items={faqAntecipacao}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "#"
          }}
        />

        <SejaAssociado
          title={`Pronto para\nreforçar o\ncapital de giro?`}
          description={`Abra sua conta e habilite a\nantecipação de recebíveis por\nboleto e Sipag para dar mais\nfôlego ao caixa do seu negócio.`}
          buttonText="Abra já sua conta PJ"
        />

      </main>
      <Rodape />
    </div>
  );
}
