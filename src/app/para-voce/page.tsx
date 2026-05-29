'use client';

import React from 'react';
import Rodape from "@/components/Rodape/Rodape";
import Hero from "@/components/Hero/Hero";
import SolucoesVoceGrid from "@/components/SolucoesVoceGrid/SolucoesVoceGrid";
import AppSicoob from "@/components/AppSicoob/AppSicoob";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";

export default function ParaVocePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-voce.webp"
          titleLines={["Produtos e", "serviços para", "você realizar", "seus planos"]}
          subtitleColor="secondary"
          buttons={[{ label: "Abra já sua conta", href: "/abra-sua-conta", variant: "secondary" }]}
        />

        <SolucoesVoceGrid />

        <AppSicoob
          title="Tudo o que você precisa no seu dia a dia financeiro."
          listItems={[
            'Acompanhe seus saldos, extratos e transações com facilidade.',
            'Pague contas, faça Pix e transferências de onde estiver.',
            'Contrate empréstimos e investimentos com poucos cliques.',
            'Gerencie seus cartões e controle seu limite com segurança.'
          ]}
          ctaText="Baixe o App Sicoob em seu celular"
          withSejaAssociado={true}
        />

        <SejaAssociado
          subtitle="SEJA ASSOCIADO"
          title="Pronto para começar?"
          description="Abra sua conta pessoal hoje mesmo, junte-se à Credicitrus e aproveite todos os benefícios de ser um associado!"
          buttonText="ABRA JÁ SUA CONTA"
          withAppSicoob={true}
        />

      </main>
      <Rodape />
    </div>
  );
}
