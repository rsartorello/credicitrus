'use client';

import React from 'react';
import Rodape from "@/components/Rodape/Rodape";
import Hero from "@/components/Hero/Hero";
import Faq from "@/components/Faq/Faq";
import SolucoesGeral from "@/components/SolucoesGeral/SolucoesGeral";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import SejaAssociado from '@/components/SejaAssociado/SejaAssociado';

const faqItems = [
  {
    question: "Quem pode solicitar um empréstimo PJ na Credicitrus?",
    answer: ""
  },
  {
    question: "Quais são os documentos necessários?",
    answer: ""
  },
  {
    question: "Como funciona a participação nos resultados (sobras) para associados PJ?",
    answer: ""
  },
  {
    question: "Qual a diferença entre empréstimo e financiamento?",
    answer: ""
  }
];

export default function EmprestimoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-sua-empresa-emprestimos.webp"
          titleLines={["Empréstimos e", "Financiamentos:", "Credicitrus"]}
          subtitleColor="secondary"
          buttons={[
            { label: "Abra já sua conta PJ", href: "#abrir-conta-pj", variant: "secondary" },
            { label: "Já sou associado e quero solicitar", href: "#solicitar-emprestimo", variant: "primary" }
          ]}
        />

        <SolucoesGeral />
        <OutrasSolucoesGeral />

        <Faq
          title="Tire suas dúvidas sobre crédito PJ"
          items={faqItems}
          cta={{ text: "Fale com nosso especialista!", href: "#" }}
        />

        <SejaAssociado />
      </main>
      <Rodape />
    </div>
  );
}
