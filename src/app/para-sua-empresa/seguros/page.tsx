'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";

export default function SeguroEmpresarialPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-sua-empresa-seguros.webp"
          titleLines={[
            "SEGURO",
            "EMPRESARIAL",
            "CREDICITRUS"
          ]}
          highlightIndices={[0]}
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
              Seguro Empresarial para proteger <br />
              seu patrimônio e suas operações
            </>
          }
          description={
            <>
              Na Credicitrus, sua empresa conta com proteção completa para <br />
              continuar crescendo com segurança. O Seguro Empresarial garante <br />
              tranquilidade, agilidade e suporte diante de imprevistos.
            </>
          }
          cards={[
            {
              id: 1,
              image: "/soltas/1-seguro-empresarial.webp",
              title: "Vida Empresarial",
              titleColorClass: "text-primary",
              description: "Proteção financeira para colaboradores, sócios e equipes, com coberturas completas e gestão simplificada."
            },
            {
              id: 2,
              image: "/soltas/2-seguro-empresarial.webp",
              title: "Automóveis",
              titleColorClass: "text-primary",
              description: "Seguro completo para a frota, com coberturas contra colisão, roubo, incêndio, assistência 24 horas e muito mais."
            },
            {
              id: 3,
              image: "/soltas/3-seguro-empresarial.webp",
              title: "Empresarial",
              titleColorClass: "text-primary",
              description: "Coberturas e serviços para todos os portes, com contratação rápida, aceitação ampla e proteção a comércio, indústria e serviços."
            },
            {
              id: 4,
              image: "/soltas/4-seguro-empresarial.webp",
              title: "Máquinas e Equipamentos",
              titleColorClass: "text-primary",
              description: "Cobertura para máquinas e equipamentos essenciais ao negócio, incluindo danos físicos, subtração, danos elétricos e responsabilidade civil."
            },
            {
              id: 5,
              image: "/soltas/5-seguro-empresarial.webp",
              title: "Responsabilidade Civil",
              titleColorClass: "text-primary",
              description: "Reembolsa responsabilidades civis por riscos contratados, com cobertura de danos materiais, corporais e morais a terceiros"
            },
            {
              id: 6,
              image: "/soltas/6-seguro-empresarial.webp",
              title: "Garantia",
              titleColorClass: "text-primary",
              description: "Cobertura para descumprimento contratual em serviços, construção, fabricação e fornecimento. Atende licitações e contratos com garantia, nas modalidades judiciais/administrativas."
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
          title={
            <>
              Tire suas dúvidas sobre os nossos <br />
              seguros para a sua empresa
            </>
          }
          items={[
            {
              question: "Quais seguros empresariais posso contratar pela Credicitrus?",
              answer: "O portfólio contempla Seguro Empresarial (patrimonial), Vida Empresarial, Auto (frota), Máquinas e Equipamentos, Responsabilidade Civil e Garantia. Esses produtos protegem desde o imóvel e o conteúdo do negócio até pessoas, frota, maquinário, responsabilidade perante terceiros e obrigações contratuais."
            },
            {
              question: "O que exatamente o Seguro Empresarial (patrimonial) protege?",
              answer: "A cobertura protege o prédio e o conteúdo do negócio, incluindo máquinas e equipamentos, contra danos por incêndio, explosão e queda de raio, além de contemplar a recomposição de documentos fiscais e contábeis. Também oferece opções adicionais para alagamentos, danos elétricos, deterioração de mercadorias, quebra de vidros e outras ocorrências que possam afetar a operação."
            },
            {
              question: "Como dimensionar o capital segurado do meu patrimônio (e evitar sub/seguro)?Como funcionam as coberturas de responsabilidade civil?",
              answer: "Faça um inventário simples do prédio e do conteúdo por área/ambiente, use valores de reposição (não apenas contábeis) e estime custos indiretos (ex.: adequações, frete, montagem). Para estoques, use média do período ou pico sazonal, se houver."
            },
            {
              question: "Posso combinar coberturas para continuidade do negócio?",
              answer: "Sim. A combinação é comum para mitigar perda material, responsabilidade perante terceiros e impacto no caixa enquanto a operação é restabelecida."
            },
            {
              question: "Como funciona a contratação pela Credicitrus?",
              answer: "Você conta com atendimento especializado para avaliar porte, segmento e necessidades do negócio, definindo coberturas e limites de forma adequada. O processo é simples e pode ser iniciado pelos canais oficiais da Credicitrus."
            }
          ]}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "#"
          }}
        />

        <SejaAssociado
          title={`Pronto para\nproteger seu\nnegócio?`}
          description={`Abra sua conta e contrate seguros com a confiança do cooperativismo: proteção especializada, condições transparentes e atendimento próximo para garantir a segurança que sua empresa precisa.`}
          buttonText="Abra já sua conta PJ"
        />

      </main>
      <Rodape />
    </div>
  );
}
