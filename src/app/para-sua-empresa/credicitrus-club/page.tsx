'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";


const faqClub = [
  {
    question: "Quem pode comprar pelo Credicitrus Club?",
    answer: "A compra é exclusiva para cooperados Credicitrus (PF ou PJ). Se ainda não for cooperado, é só abrir a conta para ter acesso às ofertas e condições."
  },
  {
    question: "Quem pode vender no Credicitrus Club?",
    answer: "Empresas, prestadores de serviço e lojistas podem vender mesmo sem serem cooperados. O credenciamento do parceiro é feito online e o time valida a participação."
  },
  {
    question: "Como funciona o pagamento ao vendedor?",
    answer: "O vendedor recebe o valor da venda à vista, e a cobrança ao comprador fica por conta da Credicitrus (processo financeiro e recebimento). Isso reduz risco e acelera o caixa do parceiro."
  },
  {
    question: "Existe simulação para quem ainda não é cooperado?",
    answer: "Sim. Não cooperados podem simular, entender condições e, se desejarem seguir, abrir a conta para concluir a compra."
  },
  {
    question: "Que tipos de produtos e serviços entram no Credicitrus Club?",
    answer: "Ele reúne ofertas de parceiros em diversas categorias, incluindo placas fotovoltaicas, máquinas e implementos agrícolas, veículos, imóveis e muito mais."
  }
];

import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";

const clubCards = [
  {
    id: 1,
    image: "/soltas/1-credicitrus-club-1.webp",
    title: "Vantagens para vendedores",
    titleColorClass: "text-[#00a99d]",
    href: "#",
    description: (
      <ul className="flex flex-col gap-8">
        {[
          { b: "Canal de venda adicional,", r: " ampliando suas oportunidades de negócio;" },
          { b: "Acesso a milhares de cooperados,", r: " um público qualificado e com alto potencial de compra;" },
          { b: "Agilidade em todo o processo,", r: " do cadastro à efetivação da venda;" },
          { b: "Simulação", r: " disponível também para não cooperados;" },
          { b: "Divulgação da sua marca,", r: " produtos e serviços, gerando visibilidade para um público seleto (PF e PJ);" },
          { b: "Processo 100% digital,", r: " com simulação, envio de proposta, nota fiscal e autorização de faturamento online;" },
          { b: "Acompanhamento completo,", r: " permitindo visualizar todas as etapas da proposta em tempo real." }
        ].map((item, i) => (
          <li key={i} className="flex items-start">
            <p className="text-[#003641] leading-[1.8]">
              <span style={{ fontWeight: 900 }}>• {item.b}</span>
              <span style={{ fontWeight: 400 }}>{item.r}</span>
            </p>
          </li>
        ))}
      </ul>
    )
  },
  {
    id: 2,
    image: "/soltas/2-credicitrus-club-1.webp",
    title: "Vantagens para compradores",
    titleColorClass: "text-[#00a99d]",
    href: "#",
    description: (
      <ul className="flex flex-col gap-8">
        {[
          { b: "Produtos e serviços relevantes", r: ", alinhados ao perfil e necessidades de cada cooperado;" },
          { b: "Preços mais atrativos e competitivos", r: ", garantindo economia na contratação;" },
          { b: "Crédito certo para viabilizar a compra", r: ", com taxas reduzidas e condições acessíveis;" },
          { b: "Simulação rápida e precisa", r: ", com valor de parcela fiel;" },
          { b: "Contratação 100% digital", r: ", sem necessidade de deslocamento;" },
          { b: "Prazos maiores para parcelamento", r: ", sem consumir limite do cartão." },
          { b: "Acesso a novos vendedores e prestadores", r: ", ampliando opções de compra e negociação." }
        ].map((item, i) => (
          <li key={i} className="flex items-start">
            <p className="text-[#003641] leading-[1.8]">
              <span style={{ fontWeight: 900 }}>• {item.b}</span>
              <span style={{ fontWeight: 400 }}>{item.r}</span>
            </p>
          </li>
        ))}
      </ul>
    )
  }
];

export default function CredicitrusClubPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-sua-empresa-credicitrus-club.webp"
          titleLines={[
            "CREDICITRUS CLUB",
            "BENEFÍCIOS QUE",
            "CONECTAM VOCÊ A",
            "NOVAS EXPERIÊNCIAS"
          ]}
          highlightIndices={[0]}
          subtitleColor="secondary"
          buttons={[
            { label: "Acesse o Credicitrus Club", href: "https://www.credicitrusclub.com.br", variant: "secondary" }
          ]}
        />

        <FeatureCardsSection
          sectionBgClass="bg-[#f8f9fa]"
          cardBgClass="bg-white"
          eyebrowText="PARA SUA EMPRESA"
          title={
            <>
              Um espaço de benefícios, conteúdo <br />
              e experiências para cooperados.
            </>
          }
          description={
            <>
              O Credicitrus Club é um shopping virtual exclusivo para cooperados <br />
              e está cheio de vantagens pensadas para facilitar suas compras. <br />
              Com vantagens para quem vende e benefícios para quem compra.
            </>
          }
          cards={clubCards}
          gridCols={2}
          ctaTitle="Quer fazer uma simulação?"
          ctaButtonText="Clique aqui!"
          ctaButtonHref="https://www.credicitrusclub.com.br/"
        />

        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA VOCÊ"
          sectionTitle={
            <>
              Explore outras vantagens de ser Credicitrus <br />
              e cresça com quem entende de gente
            </>
          }
        />

        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title="Tire suas dúvidas sobre o Credicitrus Club"
          items={faqClub}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "https://wa.me/551633445020"
          }}
        />

        <SejaAssociado
          title={`Pronto para\ncomeçar?`}
          description={`Abra sua conta e aproveite as\nvantagens do Credicitrus Club:\nbenefícios exclusivos e\ncondições diferenciadas`}
          buttonText="Abra sua conta"
        />

      </main>
      <Rodape />
    </div>
  );
}
