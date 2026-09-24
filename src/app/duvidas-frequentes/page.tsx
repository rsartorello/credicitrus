'use client';

import React from 'react';
import Link from 'next/link';
import Hero from "@/components/Hero/Hero";
import Faq from "@/components/Faq/Faq";
import Rodape from "@/components/Rodape/Rodape";
import { SITE_FAQ } from "@/data/faq-site";

const faqItems = SITE_FAQ.map((item) => {
  if (item.question === "Quais são os canais oficiais de atendimento?") {
    return {
      question: item.question,
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
    };
  }
  return {
    question: item.question,
    answer: item.answerText,
  };
});

export default function DuvidasFrequentesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-duvidas-frequentes.webp"
          titleLines={["Dúvidas", "Frequentes"]}
          subtitleColor="secondary"
        />

        <Faq
          subtitle=""
          title="Aqui você tira dúvidas de forma simples e objetiva, com informações essenciais sobre a Credicitrus"
          items={faqItems}
          cta={{ text: "Fale com nosso especialista!", href: "/fale-com-a-gente" }}
        />

      </main>
      <Rodape />
    </div>
  );
}
