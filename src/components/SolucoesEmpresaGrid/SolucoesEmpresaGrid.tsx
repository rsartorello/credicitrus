'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

interface SolucaoEmpresa {
  id: number;
  icon: string;
  title: string;
  description: string;
  href: string;
}

const solucoes: SolucaoEmpresa[] = [
  {
    id: 1,
    icon: '/soltas/icone-emprestimos.svg',
    title: 'Empréstimos e Financiamento',
    description: 'Créditos para suas necessidades.',
    href: '/para-sua-empresa/emprestimos-e-financiamentos',
  },
  {
    id: 2,
    icon: '/soltas/icone-consorcio.svg',
    title: 'Consórcio',
    description: 'Realize seus sonhos de forma planejada.',
    href: '/para-sua-empresa/consorcios',
  },
  {
    id: 3,
    icon: '/soltas/icone-solucoesderecebimento.svg',
    title: 'Soluções de Recebimento',
    description: 'Receba pagamentos com facilidade.',
    href: '/para-sua-empresa/solucoes-de-recebimento',
  },
  {
    id: 4,
    icon: '/soltas/icone-cartaodecredito.svg',
    title: 'Cartões de Crédito',
    description: 'Cartões com benefícios exclusivos.',
    href: '/para-sua-empresa/cartoes-de-credito',
  },
  {
    id: 5,
    icon: '/soltas/icone-seguro.svg',
    title: 'Seguros',
    description: 'Proteção para você e sua família.',
    href: '/para-sua-empresa/seguros',
  },
  {
    id: 6,
    icon: '/soltas/icone-recebiveis.svg',
    title: 'Antecipação de Recebíveis',
    description: 'Dinheiro na sua conta, na hora.',
    href: '/para-sua-empresa/antecipacao-de-recebiveis',
  },
  {
    id: 7,
    icon: '/soltas/icone-cartoesbeneficios.svg',
    title: 'Cartões de Benefícios',
    description: 'Cartões para benefícios sociais.',
    href: '/para-sua-empresa/cartoes-de-beneficios',
  },
  {
    id: 8,
    icon: '/soltas/icone-credicitrusclub.svg',
    title: 'Credicitrus Club',
    description: 'Benefícios exclusivos para cooperados.',
    href: '/para-sua-empresa/credicitrus-club',
  },
  {
    id: 9,
    icon: '/soltas/icone-produtoseservicos.svg',
    title: '+ Produtos e Serviços',
    description: 'Descubra outras soluções.',
    href: '/fale-com-a-gente',
  },
];

export default function SolucoesEmpresaGrid() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px]">
        {/* Cabeçalho */}
        <div className="text-center mb-16 md:mb-20">
          <h4 className="text-verdecredicitrus font-medium text-base md:text-lg lg:text-xl uppercase tracking-widest mb-6">
            PARA SUA EMPRESA
          </h4>
          <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight max-w-4xl mx-auto">
            A Credicitrus tem o produto ideal para sua empresa crescer ainda mais
          </h2>
        </div>

        {/* Versão Swiper (Mobile apenas) */}
        <div className="block md:hidden mb-20 relative px-2 pt-10">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full pb-12 pt-[10px] -mt-[10px]"
          >
            {solucoes.map((item) => (
              <SwiperSlide key={item.id} className="h-auto flex flex-col pt-2.5 pb-6 overflow-visible relative">
                {/* Ribbon Column (Absolute to slide container to bypass card border-radius clipping) */}
                <div
                  className="absolute left-6 top-0 shrink-0 w-[56px] h-[96px] z-10 pt-[10px]"
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={56}
                    height={96}
                    className="absolute top-0 left-0 object-contain"
                  />
                </div>

                <div className="bg-white rounded-[2rem] flex flex-col min-h-[200px] h-full shadow-lg transition-all duration-300 overflow-visible flex-grow">
                  {/* ─── Top Row: Ribbon Space + Title ─── */}
                  <div className="relative flex items-stretch min-h-[6rem] shrink-0 pt-0 overflow-visible">
                    {/* Spacer Column to reserve space for the absolute ribbon */}
                    <div className="shrink-0 w-[56px] ml-6" />

                    {/* Title Column */}
                    <div className="flex-1 flex items-center pl-4 pr-6 py-4">
                      <h3 className="text-primary font-extrabold text-[1.1rem] leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* ─── Body: Description + Button ─── */}
                  <div className="flex flex-col flex-grow p-6 pt-4">
                    <p className="text-primary/80 font-medium text-[1rem] leading-relaxed flex-grow mb-8 min-h-[110px]">
                      {item.description}
                    </p>

                    <Link
                      href={item.href}
                      className="w-full text-center border-2 border-secondary text-secondary font-bold text-[1.1rem] py-3 rounded-2xl hover:bg-secondary hover:text-white transition-all duration-300"
                    >
                      Saiba mais
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navegação Customizada Mobile */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex items-center justify-center text-secondary hover:opacity-70 transition-all cursor-pointer border-none bg-transparent"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>

            {/* Linhas de Progresso Dinâmicas */}
            <div className="flex gap-1.5 py-2 w-full max-w-[240px] justify-center">
              {solucoes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`flex-1 transition-all duration-300 border-none p-0 focus:outline-none cursor-pointer max-w-[56px] ${
                    activeIndex === index
                      ? 'bg-secondary'
                      : 'bg-primary/20'
                  }`}
                  style={{ height: '2px' }}
                />
              ))}
            </div>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex items-center justify-center text-secondary hover:opacity-70 transition-all cursor-pointer border-none bg-transparent"
              aria-label="Próximo"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Versão Grade (Desktop apenas) */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-24 overflow-visible">
          {solucoes.map((item) => (
            <div key={item.id} className="h-auto overflow-visible relative pt-2.5">
              {/* Ribbon Column */}
              <div
                className="absolute left-6 md:left-8 top-0 shrink-0 w-[56px] h-[96px] z-10 pt-[10px]"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={56}
                  height={96}
                  className="absolute top-0 left-0 object-contain"
                />
              </div>

              <div className="bg-white rounded-[2rem] flex flex-col min-h-[200px] h-full shadow-lg group hover:shadow-2xl transition-all duration-300 overflow-visible">
                {/* ─── Top Row: Ribbon Space + Title ─── */}
                <div className="relative flex items-stretch min-h-[6rem] shrink-0 pt-0 overflow-visible">
                  {/* Spacer Column to reserve space for the absolute ribbon */}
                  <div className="shrink-0 w-[56px] ml-6 md:ml-8" />

                  {/* Title Column */}
                  <div className="flex-1 flex items-center pl-4 pr-6 py-4">
                    <h3 className="text-primary font-extrabold text-[1.1rem] md:text-[1.15rem] lg:text-[1.25rem] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* ─── Body: Description + Button ─── */}
                <div className="flex flex-col flex-grow p-6 md:p-8 pt-4">
                  <p className="text-primary/80 font-medium text-[1rem] md:text-[1.05rem] leading-relaxed flex-grow mb-8 min-h-[110px]">
                    {item.description}
                  </p>

                  <Link
                    href={item.href}
                    className="w-full text-center border-2 border-secondary text-secondary font-bold text-[1.1rem] py-3 rounded-2xl hover:bg-secondary hover:text-white transition-all duration-300"
                  >
                    Saiba mais
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
