'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const tiposConsorcio = [
  {
    id: 1,
    image: '/soltas/1-consorcios-fazenda.webp',
    title: 'Imóveis',
    description: 'Adquira seu imóvel urbano, rural ou terreno.',
  },
  {
    id: 2,
    image: '/soltas/2-consorcios-fazenda.webp',
    title: 'Automóveis',
    description: 'Compre seu automóvel ou moto, novo ou usado.',
  },
  {
    id: 3,
    image: '/soltas/3-consorcios-fazenda.webp',
    title: 'Serviços',
    description: 'Contrate consultorias, projetos, viagens, saúde e festas.',
  },
  {
    id: 4,
    image: '/soltas/4-consorcios-fazenda.webp',
    title: 'Pesados',
    description: 'Equipe a operação com caminhões, ônibus e implementos agrícolas.',
  },
  {
    id: 5,
    image: '/soltas/5-consorcios-fazenda.webp',
    title: 'Outros Bens',
    description: 'Adquira bens móveis duráveis, como eletrônicos e eletrodomésticos.',
  },
];

import FeatureCardsSection from '@/components/FeatureCardsSection/FeatureCardsSection';

export default function TiposConsorcioFazenda() {
  return (
    <FeatureCardsSection
      eyebrowText="PARA O AGRONEGÓCIO"
      title={
        <>
          Consórcio para impulsionar o <br />
          crescimento da sua fazenda
        </>
      }
      description={
        <>
          Na Credicitrus, a sua produção avança com planejamento: o consórcio <br className="hidden md:block" />
          empresarial permite investir em máquinas agrícolas, implementos, tratores, <br className="hidden md:block" />
          veículos, caminhões, estruturas rurais, imóveis e muito mais.
        </>
      }
      cards={tiposConsorcio}
      ctaTitle={
        <>
          Ficou na dúvida sobre<br />o consórcio?
        </>
      }
      ctaButtonText="Fale com nosso especialista!"
      ctaButtonHref="#"
    />
  );
}
