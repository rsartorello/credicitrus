'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";

const segurosAgro = [
  {
    id: 1,
    image: "/soltas/1-seguro-agro.png",
    title: "Seguro Agrícola (Safra)",
    description: "Protege a lavoura contra eventos climáticos e adversidades, com modalidades de custeio e produtividade conforme a cultura",
    href: "#"
  },
  {
    id: 2,
    image: "/soltas/2-seguro-agro.png",
    title: "Penhor Rural",
    description: "Cobre bens dados em garantia no crédito rural (agrícola, pecuário, aquícola ou florestal), com coberturas básicas e adicionais previstas em apólice",
    href: "#"
  },
  {
    id: 3,
    image: "/soltas/3-seguro-agro.png",
    title: "Máquinas e Equipamentos Agro",
    description: "Proteção para tratores, colheitadeiras e equipamentos essenciais, incluindo danos físicos, subtração e danos elétricos, conforme contratação",
    href: "#"
  }
];

const outrasSolucoesFazenda = [
  {
    id: 1,
    title: "Crédito Rural",
    description: "Créditos para suas necessidades.",
    icon: '/soltas/icone-creditorural.svg',
    link: "para-o-agronegocio/credito-rural"
  },
  {
    id: 2,
    title: "Consórcio",
    description: "Realize seus sonhos de forma planejada.",
    icon: '/soltas/icone-consorcio.svg',
    link: "para-o-agronegocio/consorcio"
  },
  {
    id: 3,
    title: "Portal Agro",
    description: "Fique por dentro de tudo que acontece.",
    icon: '/soltas/icone-portaldoagro.svg',
    link: "#"
  },
  {
    id: 4,
    icon: '/soltas/icone-produtoseservicos.svg',
    title: '+ Produtos e Serviços',
    description: 'Conheça outras soluções financeiras desenhadas para a sua propriedade rural.',
    link: '/fale-com-a-gente',
  },
];

const faqSeguroAgro = [
  {
    question: "O que o Seguro Agrícola (Safra) cobre?",
    answer: "O Seguro Agrícola protege o produtor de perdas causadas por fenômenos climáticos e adversidades que afetem as lavouras, com modalidades de cobertura para Custeio (valor investido em insumos) e Produtividade (queda de rendimento por eventos climáticos)."
  },
  {
    question: "Quem pode contratar o Seguro Agrícola?",
    answer: "OProdutores rurais de diferentes portes e culturas, desde agricultores individuais até cooperativas, que desejam proteger investimentos e produtividade contra riscos naturais durante o ciclo da safra."
  },
  {
    question: "Quais tipos de bens podem ser segurados no Penhor Rural?",
    answer: "Máquinas, equipamentos agrícolas, insumos, produtos agropecuários, estoques e outros bens diretamente ligados à atividade rural e usados como garantia em empréstimos."
  },
  {
    question: "As coberturas variam conforme a cultura ou tipo de bem?",
    answer: "Sim. Tanto no Seguro Agrícola quanto no Penhor Rural, as coberturas básicas e adicionais variam de acordo com a cultura, a seguradora e o tipo de bem segurado. Alguns riscos são obrigatórios, enquanto outros podem ser adicionados conforme necessidade."
  },
  {
    question: "O seguro cobre perdas financeiras por queda de produtividade?",
    answer: "Sim, no Agrícola Produtividade, o produtor pode ser indenizado quando adversidades climáticas causam queda de rendimento da lavoura segurada."
  }
];

export default function SeguroAgroCredicitrusPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-o-agronegocio-seguros.jpg"
          titleLines={["SEGURO AGRO", "CREDICITRUS"]}
          highlightIndices={[1]}
          subtitleColor="secondary"
          buttons={[
            { label: "Proteja sua lavoura e bens", href: "#lavoura", variant: "secondary" },
            { label: "Proteja seu maquinário", href: "#maquinario", variant: "primary" }
          ]}
        />

        <FeatureCardsSection
          eyebrowText="PARA O AGRONEGÓCIO"
          title={
            <>
              Seguros que protegem sua produção, <br />
              seus bens e a continuidade do <br />
              trabalho no campo
            </>
          }
          description="A Credicitrus oferece seguros que protegem a lavoura, máquinas e bens rurais contra eventos climáticos, acidentes e perdas inesperadas, garantindo segurança e continuidade na produção."
          cards={segurosAgro}
          ctaTitle="Ficou com alguma dúvida?"
          ctaButtonText="Fale com nosso especialista!"
        />

        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA SUA FAZENDA"
          sectionTitle={
            <>
              Explore outras vantagens de ser <br />
              Credicitrus e cresça com quem <br />
              entende de negócio
            </>
          }
          slides={outrasSolucoesFazenda}
        />

        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title="Tire suas dúvidas sobre os nossos seguros agrícolas"
          items={faqSeguroAgro}
          cta={{
            text: "Fale com nosso especialista!",
            href: "#"
          }}
        />

        <SejaAssociado
          title={`Pronto para\nproteger sua\nprodução?`}
          description={`Abra sua conta e contrate seguros Agro com a confiança do cooperativismo, garantindo proteção para lavoura, máquinas e bens rurais com atendimento próximo e transparente.`}
          buttonText="Abra já sua conta"
        />

      </main>
      <Rodape />
    </div>
  );
}
