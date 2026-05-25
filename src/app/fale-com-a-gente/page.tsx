'use client';

import Hero from "@/components/Hero/Hero";
import Faq from "@/components/Faq/Faq";
import DuvidasFaleConosco from "@/components/DuvidasFaleConosco/DuvidasFaleConosco";
import Rodape from "@/components/Rodape/Rodape";

const faqItems = [
  {
    question: "Quem pode abrir conta na Credicitrus?",
    answer: ""
  },
  {
    question: "Onde posso abrir minha conta Credicitrus?",
    answer: ""
  },
  {
    question: "Quanto tempo demora o processo de abertura da conta?",
    answer: ""
  },
  {
    question: "Quais são os benefícios de ser um associado?",
    answer: ""
  },
  {
    question: "Tenho acesso ao cartão de crédito Credicitrus?",
    answer: ""
  },
  {
    question: "Quais são os documentos necessários para pessoa física?",
    answer: ""
  },
  {
    question: "Quais são os documentos necessários para pessoa jurídica?",
    answer: ""
  },
  {
    question: "Quais são os benefícios para o produtor rural?",
    answer: ""
  }
];

export default function FaleConoscoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/fale-conosco.jpg"
          titleLines={["FALE COM A", "CREDICITRUS:", "MAIS QUE UM BANCO,", "UM PARCEIRO PARA", "TODA A VIDA"]}
          highlightIndices={[2, 3, 4]}
          subtitleColor="secondary"
          buttons={[{ label: "Entre em contato", href: "#contato", variant: "secondary" }]}
        />

        <DuvidasFaleConosco />

        <Faq
          title="Ficou com alguma dúvida?"
          items={faqItems}
          cta={{ text: "Fale com nosso especialista!", href: "/contato-especialista" }}
        />
      </main>
      <Rodape />
    </div>
  );
}
