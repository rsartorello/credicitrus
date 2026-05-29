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
    answer: "Podem solicitar crédito PJ as empresas associadas à Credicitrus, desde que estejam credenciadas no portal Credicitrus Club ou Market Club e atendam aos critérios de cadastro e análise de crédito da cooperativa."
  },
  {
    question: "Quais são os documentos necessários?",
    answer: (
      <>
        <p className="mb-3">Os documentos podem variar conforme o tipo de empresa e operação, mas geralmente incluem:</p>
        <ul className="list-disc list-inside space-y-1 text-left">
          <li>Documentos da empresa: contrato ou estatuto social</li>
          <li>Documentos dos representantes legais: RG, CPF e comprovante de endereço</li>
          <li>Informações financeiras: comprovante de faturamento e situação financeira</li>
          <li>Registros e certidões: inscrição estadual (quando aplicável) e Certidão Negativa de Débitos</li>
          <li>Consultas obrigatórias: SERASA, SCR (Banco Central)</li>
          <li>Outros documentos: cadastro completo da PJ e questionário de risco socioambiental (QRSA)</li>
        </ul>
        <p className="mt-3 text-sm opacity-70">*Em casos com apontamentos de risco, podem ser solicitados documentos adicionais.</p>
      </>
    )
  },
  {
    question: "Como funciona a participação nos resultados (sobras) para associados PJ?",
    answer: (
      <>
        As sobras são definidas anualmente na{' '}
        <a
          href="/transparencia/assembleia"
          className="text-secondary hover:underline font-semibold"
        >
          Assembleia Geral Ordinária (AGO)
        </a>
        . Após as destinações obrigatórias, o valor restante é distribuído entre os associados de forma proporcional às operações realizadas com a cooperativa, desconsiderando as quotas-partes.
      </>
    )
  },
  {
    question: "Qual a diferença entre empréstimo e financiamento?",
    answer: (
      <>
        <p><strong>Empréstimo:</strong> o valor é liberado para uso livre da empresa, com pagamento em parcelas e juros definidos em contrato.</p>
        <p className="mt-3"><strong>Financiamento:</strong> o crédito tem finalidade específica, como aquisição de bens, que normalmente ficam vinculados como garantia até a quitação.</p>
      </>
    )
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
            { label: "Abra já sua conta", href: "/abra-sua-conta", variant: "secondary" },
            { label: "Já sou associado e quero solicitar", href: "https://wa.me/551633445020", variant: "primary" }
          ]}
        />

        <SolucoesGeral />
        <OutrasSolucoesGeral />

        <Faq
          title="Tire suas dúvidas sobre crédito PJ"
          items={faqItems}
          cta={{ text: "Fale com nosso especialista!", href: "https://wa.me/551633445020" }}
        />

        <SejaAssociado />
      </main>
      <Rodape />
    </div>
  );
}
