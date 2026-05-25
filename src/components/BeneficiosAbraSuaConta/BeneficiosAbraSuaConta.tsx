'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const beneficios = [
  {
    id: 1,
    image: '/soltas/abra-1.jpg',
    title: 'Soluções completas',
    description: 'Tudo que você precisa: Crédito pessoal, empresarial e rural, investimentos, Seguros, Consórcios e Cartões. Soluções para você, sua empresa e para o agronegócio.',
  },
  {
    id: 2,
    image: '/soltas/abra-2.jpg',
    title: 'Benefícios exclusivos',
    description: 'Nossas taxas em empréstimos, financiamentos e tarifas são mais competitivas, focadas no seu sucesso.',
  },
  {
    id: 3,
    image: '/soltas/abra-3.jpg',
    title: 'Retorno financeiro',
    description: 'Participe ativamente dos resultados anuais da Credicitrus. Seu relacionamento gera retorno direto para o seu bolso.',
  },
  {
    id: 4,
    image: '/soltas/abra-4.jpg',
    title: 'Proximidade',
    description: 'Conte com gerentes que conhecem a sua história para ajudar a tomar as melhores decisões financeiras.',
  },
  {
    id: 5,
    image: '/soltas/abra-5.jpg',
    title: 'Praticidade e facilidade',
    description: 'Crie a sua conta com praticidade e clareza em todo processo de abertura.',
  },
  {
    id: 6,
    image: '/soltas/abra-6.jpg',
    title: 'Pix gratuito e ilimitado',
    description: 'Você não paga nada nem para receber nem para fazer pagamentos e transferências.',
  },
];

import FeatureCardsSection from '@/components/FeatureCardsSection/FeatureCardsSection';

export default function BeneficiosAbraSuaConta() {
  return (
    <FeatureCardsSection
      eyebrowText="Abra sua conta"
      title="Por que milhares de brasileiros escolhem o cooperativismo?"
      description="Abra sua conta Credicitrus e tenha acesso às melhores taxas, além de um portfólio completo de produtos e serviços para concretizar seus sonhos ou fazer sua empresa e seus negócios prosperarem cada vez mais."
      cards={beneficios}
      ctaTitle="Ainda tem dúvida sobre abrir sua conta?"
      ctaButtonText="Fale com nosso especialista!"
      disclaimer="*As linhas de empréstimos e financiamentos são sujeitas à análise de crédito e cadastral e estão disponíveis apenas para cooperados Credicitrus. Caso alguma das linhas automáticas não esteja disponível no App Sicoob, contate seu gerente."
    />
  );
}
