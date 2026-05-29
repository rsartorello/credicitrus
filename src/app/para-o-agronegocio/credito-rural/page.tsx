'use client';

import React from 'react';
import Rodape from "@/components/Rodape/Rodape";
import Hero from "@/components/Hero/Hero";
import Faq from "@/components/Faq/Faq";
import ParaOAgro from "@/components/ParaOAgro/ParaOAgro";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";

const paraOAgroItems = [
  {
    id: 1,
    image: '/soltas/credito-rural-1.webp',
    title: 'Fortaleça o Agronegócio',
    description: 'A Credicitrus faz uma gestão financeira eficiente e fortalece a economia do campo.',
    href: 'https://wa.me/551633445020',
  },
  {
    id: 2,
    image: '/soltas/credito-rural-2.webp',
    title: 'Invista na sua propriedade',
    description: 'Adquira novos equipamentos, compre máquinas e modernize a infraestrutura do seu agronegócio.',
    href: 'https://wa.me/551633445020',
  },
  {
    id: 3,
    image: '/soltas/credito-rural-3.webp',
    title: 'Atendimento exclusivo',
    description: 'A Credicitrus conta com uma equipe especializada que entende as necessidades de cada produtor rural.',
    href: 'https://wa.me/551633445020',
  },
];

const agroSolucoesOutras = [
  {
    id: 1,
    icon: '/soltas/icone-consorcio.svg',
    title: 'Consórcio',
    description: 'Adquira máquinas agrícolas, veículos ou imóveis com planejamento e sem juros.',
    link: '/para-o-agronegocio/consorcios',
  },
  {
    id: 2,
    icon: '/soltas/icone-seguro.svg',
    title: 'Seguros',
    description: 'Proteção completa para sua lavoura, maquinários, propriedade e família.',
    link: '/para-o-agronegocio/seguro',
  },
  {
    id: 3,
    icon: '/soltas/icone-portaldoagro.svg',
    title: 'Portal Agro',
    description: 'Informações, cotações e as principais novidades do agronegócio em tempo real.',
    link: '#',
  },
  {
    id: 4,
    icon: '/soltas/icone-produtoseservicos.svg',
    title: '+ Produtos e Serviços',
    description: 'Conheça outras soluções financeiras desenhadas para a sua propriedade rural.',
    link: '/fale-com-a-gente',
  },
];

const faqItems = [
  {
    question: "Quem pode solicitar o Crédito Rural na Credicitrus?",
    answer: "Podem solicitar o Crédito Rural pessoas físicas ou jurídicas, incluindo produtores rurais com CNPJ individual ou coletivo. É necessário que o tomador esteja inscrito no Cadastro de Contribuintes de ICMS do seu Estado."
  },
  {
    question: "Quais são os documentos necessários?",
    answer: (
      <>
        <p className="mb-3">Os principais documentos exigidos incluem:</p>
        <ul className="list-disc list-inside space-y-1 text-left">
          <li>Orçamento, plano ou projeto da operação (exceto para desconto)</li>
          <li>Nota Fiscal de insumos, emitida para o tomador (PF ou PJ), com o valor total do empreendimento</li>
          <li>Declaração de Imposto de Renda, com rendimentos da atividade rural</li>
          <li>Matrícula do imóvel, quando aplicável</li>
          <li>Ficha sanitária ou equivalente</li>
        </ul>
        <p className="mt-3">Outros documentos podem ser solicitados conforme o tipo de operação e as regras do crédito rural.</p>
      </>
    )
  },
  {
    question: "Crédito Rural é um tipo de financiamento?",
    answer: "Sim. O Crédito Rural é uma modalidade de financiamento voltada a produtores rurais (PF ou PJ), destinada ao custeio, investimento ou comercialização das atividades agropecuárias."
  }
];

export default function CreditoRuralPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-foto-credito-rural.webp"
          titleLines={["CRÉDITO RURAL", "CREDICITRUS"]}
          subtitleColor="secondary"
          buttons={[
            { label: "Abra já sua conta", href: "/abra-sua-conta", variant: "secondary" },
            { label: "Já sou associado e quero solicitar", href: "https://wa.me/551633445020", variant: "primary" }
          ]}
        />

        <ParaOAgro
          title="Crédito Rural para seu agronegócio crescer ainda mais com a gente"
          description="Na Credicitrus, você encontra o parceiro ideal para que você, produtor rural, invista mais, produza melhor e fortaleça ainda mais o agronegócio no país."
          items={paraOAgroItems}
          ctaTitle="Não sabe qual é o melhor produto para seu agronegócio?"
          ctaButtonText="Falar com nosso especialista"
        />

        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA O AGRONEGÓCIO"
          sectionTitle="Veja outras soluções e serviços para seu agronegócio"
          slides={agroSolucoesOutras}
        />

        <Faq
          title="Tire suas dúvidas sobre Crédito Rural"
          items={faqItems}
          cta={{ text: "Fale com nosso especialista!", href: "https://wa.me/551633445020" }}
        />

        <SejaAssociado
          title="Pronto para&#10;começar?"
          description="Abra a conta do seu agronegócio agora mesmo, seja um associado e descubra todas as vantagens da Credicitrus!"
          buttonText="Abra já sua conta"
        />

      </main>
      <Rodape />
    </div>
  );
}
