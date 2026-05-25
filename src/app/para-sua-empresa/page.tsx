'use client';

import React from 'react';
import Rodape from "@/components/Rodape/Rodape";
import Hero from "@/components/Hero/Hero";
import SolucoesGeral from "@/components/SolucoesGeral/SolucoesGeral";
import SolucoesEmpresaGrid from "@/components/SolucoesEmpresaGrid/SolucoesEmpresaGrid";
import AppSicoob from "@/components/AppSicoob/AppSicoob";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";

export default function EmpresaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-empresa.webp"
          titleLines={["Produtos e", "serviços para", "sua empresa", "prosperar."]}
          subtitleColor="secondary"
          buttons={[{ label: "Abra já sua conta PJ", href: "#abra-conta-pj", variant: "secondary" }]}
        />

        <SolucoesEmpresaGrid />

        <AppSicoob
          title="Gerenciamento total da sua empresa em um só lugar."
          listItems={[
            'Acompanhe os gastos da sua empresa onde estiver.',
            'Pague suas contas, faça transferências e Pix de forma ágil e segura.',
            'Gerencie seus cartões com facilidade.',
            'Acesse os investimentos empresariais em tempo real.'
          ]}
          ctaText="Baixe agora em seu celular"
        />

        <SejaAssociado
          subtitle="SEJA ASSOCIADO"
          title="Pronto para começar?"
          description="Abra a conta da sua empresa agora mesmo, seja associado e descubra todas as vantagens da Credicitrus!"
          buttonText="ABRA JÁ SUA CONTA PJ"
        />

      </main>
      <Rodape />
    </div>
  );
}
