'use client';

import Rodape from "@/components/Rodape/Rodape";
import HeroAbraConta from "@/components/HeroAbraConta/HeroAbraConta";
import Faq from "@/components/Faq/Faq";
import BeneficiosAbraSuaConta from "@/components/BeneficiosAbraSuaConta/BeneficiosAbraSuaConta";
import ComoAbrirSuaConta from "@/components/ComoAbrirSuaConta/ComoAbrirSuaConta";
import Depoimentos from "@/components/Depoimentos/Depoimentos";

const faqItems = [
  {
    question: "Quem pode solicitar crédito PF na Credicitrus?",
    answer: ""
  },
  {
    question: "Como contratar um empréstimo?",
    answer: "V"
  },
  {
    question: "Preciso justificar o uso do crédito?",
    answer: ""
  },
  {
    question: "Como saber se tenho crédito disponível?",
    answer: ""
  },
  {
    question: "Posso antecipar meu FGTS pela Credicitrus?",
    answer: ""
  },
  {
    question: "O crédito é liberado na hora?",
    answer: ""
  },
  {
    question: "Como funciona a participação nos resultados (sobras) para associados PF?",
    answer: ""
  },
  {
    question: "Posso contratar mais de uma linha de crédito?",
    answer: ""
  }
];

export default function AbraSuaContaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroAbraConta
          backgroundImage="/soltas/hero-abra-sua-conta.jpg"
          titleLines={["SUA CONTA", "CREDICITRUS:", "MAIS QUE UM BANCO,", "UM PARCEIRO PARA", "TODA A VIDA"]}
          buttonLabel="Abra já sua conta PF"
          buttonHref="#abrir-conta"
        />

        <BeneficiosAbraSuaConta />
        <ComoAbrirSuaConta />
        <Depoimentos />

        <Faq
          title="Tire suas dúvidas sobre crédito PF"
          items={faqItems}
          cta={{ text: "Fale com nosso especialista!", href: "#" }}
        />
      </main>
      <Rodape />
    </div>
  );
}
