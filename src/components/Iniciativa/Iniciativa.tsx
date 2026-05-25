'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

export interface IniciativaCard {
  id: string;
  imageSrc: string;
  iconSrc: string;
  iconBgColor: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export interface IniciativaProps {
  subtitle?: string;
  title?: string;
  cards?: IniciativaCard[];
}

export default function Iniciativa({
  subtitle = 'INICIATIVAS CREDICITRUS',
  title = 'Descubra todas as iniciativas que fazem a diferença na vida dos nossos cooperados',
  cards = [
    {
      id: 'credilitrus-club',
      imageSrc: '/soltas/descubra-1.webp',
      iconSrc: '/soltas/icone-cred-club.svg',
      iconBgColor: '#483c9a',
      title: 'Credicitrus Club',
      description: 'Programa de benefícios exclusivos para nossos cooperados, com descontos e vantagens em estabelecimentos parceiros.',
      buttonText: 'Saiba mais',
      buttonHref: '#'
    },
    {
      id: 'instituto',
      imageSrc: '/soltas/descubra-2.webp',
      iconSrc: '/soltas/icone-instituto.webp',
      iconBgColor: '#00a99d',
      title: 'Instituto Credicitrus',
      description: 'Nossa iniciativa de responsabilidade social, promovendo educação financeira e desenvolvimento sustentável nas comunidades.',
      buttonText: 'Conheça o Instituto',
      buttonHref: '#'
    },
    {
      id: 'portal-agro',
      imageSrc: '/soltas/descubra-3.webp',
      iconSrc: '/soltas/icone-portal-agro.svg',
      iconBgColor: '#003641',
      title: 'Portal Agro',
      description: 'Plataforma digital completa para o agronegócio, com soluções tecnológicas e informações especializadas para o campo.',
      buttonText: 'Acesse o Portal',
      buttonHref: '#'
    }
  ]
}: IniciativaProps) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-[#f9fafb] py-16 lg:py-24 flex flex-col items-center">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 flex flex-col items-center">

        {/* Main Headings */}
        <div className="flex flex-col items-center text-center max-w-4xl mb-12 lg:mb-16">
          <h4 className="text-sm md:text-base lg:text-lg font-medium text-[#8fb534] uppercase tracking-wider mb-4">
            {subtitle}
          </h4>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#003641] leading-[1.05] tracking-tight">
            {title}
          </h1>
        </div>

        {/* Grade de Cards (Desktop) */}
        <div className="hidden md:grid w-full md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-shadow duration-300 overflow-hidden"
            >
              {/* Card Image Banner */}
              <div className="relative w-full aspect-[4/3] max-h-[250px] overflow-hidden">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Card Content (Relative spacing to pull the icon up) */}
              <div className="relative flex flex-col items-center text-center px-6 pb-8 pt-12 h-full border border-t-0 border-[#f3f4f6] rounded-b-3xl">

                {/* Floating Icon Circle */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center border-[3px] border-white shadow-sm z-10"
                  style={{ backgroundColor: card.iconBgColor }}
                >
                  <img
                    src={card.iconSrc}
                    alt={`Ícone ${card.title}`}
                    className="w-6 h-6 lg:w-7 lg:h-7 object-contain brightness-0 invert"
                  />
                </div>

                {/* Box Text 1 (H3 Bold 19.33pt scaled) */}
                <h3 className="text-base lg:text-lg font-bold text-[#003641] mb-3">
                  {card.title}
                </h3>

                {/* Box Text 2 (H4 Medium 13pt scaled) */}
                <h4 className="text-[10px] lg:text-xs font-medium text-[#003641] leading-[1.6] mb-6 flex-grow opacity-90">
                  {card.description}
                </h4>

                {/* Box Button (H3 Bold 14pt scaled) */}
                <Link
                  href={card.buttonHref}
                  className="w-full max-w-[180px] inline-flex items-center justify-center border-[1.5px] border-[#003641] text-[#003641] py-2 px-4 rounded-md hover:bg-[#003641] hover:text-white transition-colors duration-300 group/btn"
                >
                  <h3 className="font-bold text-[9px] lg:text-[0.68rem] leading-none m-0 p-0 text-inherit uppercase tracking-wider">{card.buttonText}</h3>
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* Versão Swiper (Mobile apenas) */}
        <div className="block md:hidden w-full mb-8 relative px-2 pt-10">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full pb-12 pt-[10px] -mt-[10px]"
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id} className="h-auto flex pb-6">
                <div className="group flex flex-col bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] transition-shadow duration-300 overflow-hidden w-full animate-fadeIn">
                  {/* Card Image Banner */}
                  <div className="relative w-full aspect-[4/3] max-h-[250px] overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Card Content (Relative spacing to pull the icon up) */}
                  <div className="relative flex flex-col items-center text-center px-6 pb-8 pt-12 h-full border border-t-0 border-[#f3f4f6] rounded-b-3xl">

                    {/* Floating Icon Circle */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] lg:w-[60px] lg:h-[60px] rounded-full flex items-center justify-center border-[3px] border-white shadow-sm z-10"
                      style={{ backgroundColor: card.iconBgColor }}
                    >
                      <img
                        src={card.iconSrc}
                        alt={`Ícone ${card.title}`}
                        className="w-6 h-6 lg:w-7 lg:h-7 object-contain brightness-0 invert"
                      />
                    </div>

                    {/* Box Text 1 (H3 Bold 19.33pt scaled) */}
                    <h3 className="text-base lg:text-lg font-bold text-[#003641] mb-3">
                      {card.title}
                    </h3>

                    {/* Box Text 2 (H4 Medium 13pt scaled) */}
                    <h4 className="text-[10px] lg:text-xs font-medium text-[#003641] leading-[1.6] mb-6 flex-grow opacity-90">
                      {card.description}
                    </h4>

                    {/* Box Button (H3 Bold 14pt scaled) */}
                    <Link
                      href={card.buttonHref}
                      className="w-full max-w-[180px] inline-flex items-center justify-center border-[1.5px] border-[#003641] text-[#003641] py-2 px-4 rounded-md hover:bg-[#003641] hover:text-white transition-colors duration-300 group/btn"
                    >
                      <h3 className="font-bold text-[9px] lg:text-[0.68rem] leading-none m-0 p-0 text-inherit uppercase tracking-wider">{card.buttonText}</h3>
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
              className="flex items-center justify-center text-[#8fb534] hover:opacity-70 transition-all cursor-pointer border-none bg-transparent"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>

            {/* Linhas de Progresso Dinâmicas */}
            <div className="flex gap-1.5 py-2 w-full max-w-[240px] justify-center">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`flex-1 transition-all duration-300 border-none p-0 focus:outline-none cursor-pointer max-w-[56px] ${
                    activeIndex === index
                      ? 'bg-[#8fb534]'
                      : 'bg-[#003641]/20'
                  }`}
                  style={{ height: '2px' }}
                />
              ))}
            </div>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex items-center justify-center text-[#8fb534] hover:opacity-70 transition-all cursor-pointer border-none bg-transparent"
              aria-label="Próximo"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
