'use client';

import React from 'react';
import Link from 'next/link';
import Hero from "@/components/Hero/Hero";
import Faq from "@/components/Faq/Faq";
import Rodape from "@/components/Rodape/Rodape";

const faqItems = [
  {
    question: "O que é a Credicitrus?",
    answer: "A Credicitrus é uma cooperativa de crédito de livre admissão, com portfólio completo de produtos e serviços financeiros para pessoas físicas, empresas e também para o agro. Quem se associa torna-se cooperado e parte do negócio."
  },
  {
    question: "Como faço para me associar e abrir a conta?",
    answer: "Para se associar, basta abrir sua conta através do nosso aplicativo ou em uma de nossas agências, apresentando seus documentos pessoais e comprovantes de renda/residência."
  },
  {
    question: "Quais são meus direitos e deveres como cooperado?",
    answer: "Como dono do negócio, você tem direito de votar nas assembleias, participar das sobras e acessar todos os nossos produtos e serviços. O dever principal é integralizar suas quotas-partes e participar ativamente da cooperativa."
  },
  {
    question: "Qual é a diferença entre cooperativa de crédito e banco?",
    answer: "Cooperativa é sociedade de pessoas: quem se associa é dono (cooperado), decide pelo princípio \"1 pessoa = 1 voto\" e os resultados (sobras) podem ser reinvestidos ou distribuídos aos cooperados; banco é sociedade de capital, focada em retorno aos acionistas. Ambas são autorizadas e supervisionadas pelo Banco Central."
  },
  {
    question: "O que são \"sobras\" e como funciona a distribuição?",
    answer: "Nas cooperativas financeiras, os cooperados participam dos resultados da instituição. Ao final do exercício, o resultado (as \"sobras\") pode ser reinvestido na própria cooperativa e/ou distribuído aos cooperados, conforme decisão em assembleia e regras estatutárias. Essa é uma diferença importante em relação aos bancos, onde o lucro é direcionado aos acionistas."
  },
  {
    question: "Quais são os canais oficiais de atendimento?",
    answer: (
      <>
        Você pode falar com a Credicitrus pelos nossos canais oficiais: telefone{" "}
        <a href="tel:1733459000" className="text-secondary hover:underline">
          (17) 3345‑9000
        </a>
        , WhatsApp{" "}
        <a
          href="https://wa.me/551733445020"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:underline"
        >
          (17) 3344-5020
        </a>
        , Ouvidoria{" "}
        <a href="tel:08007706883" className="text-secondary hover:underline">
          0800 770 6883
        </a>
        , além das agências e da página{" "}
        <Link href="/fale-com-a-gente" className="text-secondary hover:underline">
          “Fale com a gente”
        </Link>{" "}
        no site.
      </>
    ),
  }
];

export default function DuvidasFrequentesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-duvidas-frequentes.jpg"
          titleLines={["Dúvidas", "Frequentes"]}
          subtitleColor="secondary"
        />

        <Faq
          subtitle=""
          title="Aqui você tira dúvidas de forma simples e objetiva, com informações essenciais sobre a Credicitrus"
          items={faqItems}
          cta={{ text: "Fale com nosso especialista!", href: "#" }}
        />

      </main>
      <Rodape />
    </div>
  );
}
