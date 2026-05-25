'use client';

import React from 'react';
import SolucoesGeral, { SolucoesItem } from '../SolucoesGeral/SolucoesGeral';

interface ParaOAgroProps {
  subtitle?: string;
  title?: string;
  description?: string;
  items?: SolucoesItem[];
  ctaTitle?: string;
  ctaButtonText?: string;
}

export default function ParaOAgro({
  subtitle = 'PARA O AGRO',
  title = 'Potencialize sua produção com quem entende do campo',
  description = 'Linhas de crédito pensadas para o produtor rural, com as melhores taxas e prazos do mercado.',
  items,
  ctaTitle = 'Quer saber mais sobre nossas soluções agro?',
  ctaButtonText = 'Falar com especialista agro',
}: ParaOAgroProps) {
  return (
    <SolucoesGeral 
      sectionSubtitle={subtitle}
      sectionTitle={title}
      sectionDescription={description}
      items={items}
      ctaTitle={ctaTitle}
      ctaButtonText={ctaButtonText}
    />
  );
}
