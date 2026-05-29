'use client';

import React from 'react';
import Rodape from "@/components/Rodape/Rodape";
import HeroAbraConta from "@/components/HeroAbraConta/HeroAbraConta";
import Faq from "@/components/Faq/Faq";
import BeneficiosAbraSuaConta from "@/components/BeneficiosAbraSuaConta/BeneficiosAbraSuaConta";
import ComoAbrirSuaConta from "@/components/ComoAbrirSuaConta/ComoAbrirSuaConta";
import Depoimentos from "@/components/Depoimentos/Depoimentos";

const faqItems = [
  {
    question: "Quem pode abrir conta na Credicitrus?",
    answer: "A Credicitrus é uma cooperativa de livre admissão, ou seja, qualquer pessoa pode se tornar associada, desde que atenda aos requisitos de cadastro. Para abrir a conta, é necessário apresentar documentos para validação de identidade, assinar os termos de adesão e integralizar, no mínimo, 100 quotas-partes de capital - o que significa fazer um investimento inicial na cooperativa e passar a participar como associado, com direito aos resultados."
  },
  {
    question: "Onde posso abrir minha conta Credicitrus?",
    answer: (
      <>
        A abertura de conta pode ser feita de forma prática pelo aplicativo{' '}
        <a
          href="https://apps.apple.com/br/app/sicoob-pix-conta-empr%C3%A9stimo/id416696406"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:underline font-semibold"
        >
          iOS
        </a>
        {' '}e{' '}
        <a
          href="https://play.google.com/store/apps/details?id=br.com.sicoobnet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary hover:underline font-semibold"
        >
          Android
        </a>
        {' '}ou presencialmente em uma agência Credicitrus.
      </>
    )
  },
  {
    question: "Quanto tempo demora o processo de abertura da conta?",
    answer: "O prazo pode variar conforme a apresentação e validação dos documentos, além do cumprimento das etapas cadastrais. Em geral, o tempo depende da regularidade das informações fornecidas."
  },
  {
    question: "Quais são os benefícios de ser um associado?",
    answer: "Ao se associar à Credicitrus, você passa a participar dos resultados da cooperativa, tem acesso a produtos e serviços financeiros com condições diferenciadas, pode investir por meio das quotas-partes de capital e também participar das decisões, exercendo seu direito de voto."
  },
  {
    question: "Posso antecipar meu FGTS pela Credicitrus?",
    answer: ""
  },
  {
    question: "Tenho acesso ao cartão de crédito Credicitrus?",
    answer: "Sim. Os associados podem solicitar o cartão de crédito Credicitrus, sujeito à análise de crédito e cadastro."
  },
  {
    question: "Quais são os documentos necessários para pessoa física?",
    answer: "Para pessoa física, é necessário apresentar documentos que permitam validar a identidade e o cadastro, como RG, CPF e comprovante de endereço."
  },
  {
    question: "Quais são os documentos necessários para pessoa jurídica?",
    answer: "Para pessoa jurídica, são exigidos documentos da empresa, como contrato ou estatuto social e suas alterações, além dos documentos dos sócios e representantes legais, comprovante de endereço, informações financeiras e certidões obrigatórias. Dependendo da análise, também podem ser solicitadas consultas cadastrais, como SERASA e SCR, além de outros documentos específicos."
  },
  {
    question: "Quais são os benefícios para o produtor rural?",
    answer: "O produtor rural encontra na Credicitrus soluções financeiras voltadas ao agronegócio, com linhas de crédito para custeio, investimento e comercialização, condições alinhadas ao ciclo produtivo e atendimento especializado. Além disso, ao se associar, também participa dos resultados da cooperativa e tem acesso a um portfólio completo de produtos e serviços para apoiar o desenvolvimento da sua atividade."
  }
];

export default function AbraSuaContaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroAbraConta
          backgroundImage="/soltas/hero-abra-sua-conta.webp"
          titleLines={["SUA CONTA", "CREDICITRUS:", "MAIS QUE UM BANCO,", "UM PARCEIRO PARA", "TODA A VIDA"]}
          buttonLabel="Abra já sua conta"
          buttonHref="https://wa.me/551633445020"
        />

        <BeneficiosAbraSuaConta />
        <ComoAbrirSuaConta />
        <Depoimentos />

        <Faq
          title="Tire suas dúvidas sobre crédito"
          items={faqItems}
          cta={{ text: "Fale com nosso especialista!", href: "https://wa.me/551633445020" }}
        />
      </main>
      <Rodape />
    </div>
  );
}
