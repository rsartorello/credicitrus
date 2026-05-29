'use client';

import React from 'react';
import Rodape from "@/components/Rodape/Rodape";
import Hero from "@/components/Hero/Hero";
import SolucoesParceiroGrid from "@/components/SolucoesParceiroGrid/SolucoesParceiroGrid";
import AppSicoob from "@/components/AppSicoob/AppSicoob";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";

export default function ParceiroPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/parceiro.webp"
          titleLines={["Parceiro certo", "para a sua", "fazenda", "prosperar"]}
          subtitleColor="secondary"
          buttons={[{ label: "Abra já sua conta", href: "/abra-sua-conta", variant: "secondary" }]}
        />

        <SolucoesParceiroGrid />

        <AppSicoob
          title="Gerenciamento total do seu agronegócio em um só lugar!"
          listItems={[
            'Gerencie seu crédito rural.',
            'Acompanhe o fluxo de caixa da sua propriedade.',
            'Controle financeiro digital a qualquer hora do dia ou da noite.',
            'Acesse os investimentos em tempo real.'
          ]}
          ctaText="Baixe agora no seu celular!"
          withSejaAssociado={true}
        />

        <SejaAssociado
          subtitle="SEJA ASSOCIADO"
          title="Pronto para começar?"
          description={"Abra a conta do seu agronegócio\nagora mesmo, seja associado e\ndescubra todas as vantagens de\nser um parceiro da Credicitrus!"}
          buttonText="Abra já sua conta"
          withAppSicoob={true}
        />

      </main>
      <Rodape />
    </div>
  );
}
