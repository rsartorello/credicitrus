'use client';

import React from 'react';
import Rodape from "@/components/Rodape/Rodape";
import HeroPJ from "@/components/HeroPJ/HeroPJ";
import Faq from "@/components/Faq/Faq";
import GridEmprestimoPJ from "@/components/GridEmprestimoPJ/GridEmprestimoPJ";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";

const outrasSolucoesSlides = [
  {
    id: 1,
    title: 'Cartões de Crédito',
    description: 'Cartões com benefícios exclusivos.',
    icon: '/soltas/icone-cartaodecredito.svg',
    link: '/para-voce/cartoes-de-credito'
  },
  {
    id: 2,
    title: 'Investimentos',
    description: 'Faça seu dinheiro render mais.',
    icon: '/soltas/icone-investimentos.svg',
    link: '/para-voce/investimentos'
  },
  {
    id: 3,
    title: 'Consórcio',
    description: 'Realize seus sonhos de forma planejada.',
    icon: '/soltas/icone-consorcio.svg',
    link: '/para-voce/consorcios'
  },
  {
    id: 4,
    title: 'Seguros',
    description: 'Proteção para você e sua família.',
    icon: '/soltas/icone-seguro.svg',
    link: '/para-voce/seguros'
  },
  {
    id: 5,
    title: 'Soluções de Recebimento',
    description: 'Facilidade para receber e gerenciar seus pagamentos diários.',
    icon: '/soltas/icone-solucoesderecebimento.svg',
    link: '/para-voce/solucoes-de-recebimento'
  },
  {
    id: 6,
    title: 'Credicitrus Club',
    description: 'Benefícios exclusivos para cooperados.',
    icon: '/soltas/icone-credicitrusclub.svg',
    link: '/para-voce/credicitrus-club'
  }
];

const faqItems = [
  {
    question: "Quem pode solicitar um empréstimo na Credicitrus?",
    answer: "Qualquer Pessoa Física pode solicitar. Você deve ser um associado da Credicitrus (Sicoob). Abrir sua conta é simples e rápido, e você já pode dar entrada no seu crédito."
  },
  {
    question: "Quais são os documentos necessários?",
    answer: "Geralmente, solicitamos RG ou CNH, comprovante de residência atualizado e comprovante de renda (holerite ou extrato bancário, dependendo da modalidade). O processo é simplificado e o gerente PJ irá orientar sobre qualquer documentação adicional."
  },
  {
    question: "Qual a diferença entre Empréstimo e Financiamento?",
    answer: "O Empréstimo tem uso livre (Crédito Pessoal) e taxas geralmente mais altas. O Financiamento é destinado à aquisição de bens específicos (veículos, imóveis) e costuma ter taxas menores, pois o próprio bem serve de garantia."
  },
  {
    question: "As taxas de juros são mais baixas do que em bancos tradicionais?",
    answer: "Sim. Por sermos uma cooperativa, não visamos o lucro. Nosso foco é no benefício do associado, resultando em taxas e tarifas mais justas e competitivas em relação ao sistema bancário comum."
  },
  {
    question: "O que são as 'Sobras' e como elas se aplicam ao meu empréstimo?",
    answer: "As Sobras são a distribuição de parte do resultado financeiro da Credicitrus aos associados. Seu empréstimo contribui para esse resultado e, ao final do ano, parte desse valor pode retornar para você, diminuindo o custo efetivo do seu crédito."
  },
  {
    question: "Posso simular meu crédito online?",
    answer: "Sim, você pode iniciar uma simulação em nosso site ou App. No entanto, para ter a proposta mais exata e personalizada, recomendamos que você fale diretamente com o nosso gerente."
  }
];

export default function EmprestimoPJPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroPJ
          backgroundImage="/soltas/hero-emprestimo-p-j.webp"
          titleLines={["Empréstimos e", "financiamentos", "credicitrus"]}
          buttons={[
            { label: "Abra já sua conta", href: "/abra-sua-conta", variant: "secondary" },
            { label: "Já sou associado e quero solicitar", href: "https://wa.me/551633445020", variant: "primary" }
          ]}
        />

        <GridEmprestimoPJ />

        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA VOCÊ"
          sectionTitle="Veja outras soluções e produtos disponíveis para você"
          slides={outrasSolucoesSlides}
        />

        <Faq
          title="Tire suas dúvidas sobre crédito PF"
          items={faqItems}
          cta={{ text: "Fale com nosso especialista!", href: "#" }}
        />

        <SejaAssociado />
      </main>
      <Rodape />
    </div>
  );
}
