'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import AnimateIn from '@/components/ui/AnimateIn';

import 'swiper/css';

export interface FeatureCard {
  id: string | number;
  image: string;
  title: string;
  description: React.ReactNode;
  href?: string;
  titleColorClass?: string;
}

const FeatureCardItem = ({ item, cardBgClass, compact }: { item: FeatureCard, cardBgClass: string, compact?: boolean }) => {
  const content = (
    <>
      {/* Imagem com cantos superiores arredondados */}
      <div className="relative w-full overflow-hidden" style={{ height: compact ? '180px' : '220px' }}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={`object-cover ${item.href ? 'md:group-hover:scale-105' : ''} transition-transform duration-500`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Conteúdo do Card */}
      <div className={`flex flex-col ${compact ? 'p-6 pb-8' : 'p-8 md:p-10 lg:p-12'} flex-grow relative`}>
        <h3 className={`${item.titleColorClass || 'text-primary'} font-extrabold ${compact ? 'text-lg md:text-[1.35rem] mb-3' : 'text-[1.4rem] md:text-[1.55rem] xl:text-[1.85rem] leading-tight mb-6'}`}>
          {item.title}
        </h3>
        <div className={`text-primary font-regular flex-grow ${compact ? 'text-xs md:text-sm leading-relaxed mb-2' : 'text-xs md:text-base lg:text-[1.1rem] leading-relaxed mb-8'}`}>
          {item.description}
        </div>
      </div>
    </>
  );

  const borderRadiusVal = compact ? '32px' : '50px';

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={`group flex flex-col ${cardBgClass} overflow-hidden md:hover:shadow-[0_15px_45px_rgba(0,0,0,0.12)] transition-all duration-300 transform md:hover:-translate-y-2 border border-gray-100 h-full`}
        style={{ borderRadius: borderRadiusVal }}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`group flex flex-col ${cardBgClass} overflow-hidden border border-gray-100 h-full cursor-default`}
      style={{ borderRadius: borderRadiusVal }}
    >
      {content}
    </div>
  );
};

export interface FeatureCardsSectionProps {
  /** Cor de fundo da seção (ex: 'bg-white' ou 'bg-[#f8f9fa]') */
  sectionBgClass?: string;
  /** Cor de fundo do card (ex: 'bg-[#f8f8f8]' ou 'bg-white') */
  cardBgClass?: string;

  /** Texto pequeno acima do título (Eyebrow) */
  eyebrowText?: string;
  /** Classe de cor para o eyebrow (ex: 'text-verdecredicitrus') */
  eyebrowColorClass?: string;

  /** Título principal da seção */
  title: React.ReactNode;
  /** Descrição abaixo do título */
  description?: React.ReactNode;

  /** Array de cards para renderizar */
  cards: FeatureCard[];

  /** Quantidade de colunas na grade (padrão: 3) */
  gridCols?: 1 | 2 | 3 | 4;

  /** Título do CTA inferior */
  ctaTitle?: React.ReactNode;
  /** Texto do botão do CTA */
  ctaButtonText?: string;
  /** Link do botão do CTA */
  ctaButtonHref?: string;
  /** Aviso legal pequeno (disclaimer) no rodapé da seção */
  disclaimer?: React.ReactNode;

  /** Se deve renderizar em layout compacto */
  compact?: boolean;
}

export default function FeatureCardsSection({
  sectionBgClass = 'bg-white',
  cardBgClass = 'bg-[#f8f8f8]',
  eyebrowText,
  eyebrowColorClass = 'text-verdecredicitrus',
  title,
  description,
  cards,
  gridCols = 3,
  ctaTitle,
  ctaButtonText = 'Fale com nosso especialista!',
  ctaButtonHref = 'https://wa.me/551633445020',
  disclaimer,
  compact,
}: FeatureCardsSectionProps) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const gridColsClass = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[gridCols];

  return (
    <section className={`w-full ${sectionBgClass} py-16 md:py-24 overflow-hidden`}>
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">
        {/* Cabeçalho */}
        <AnimateIn delay={0.1} className="text-center mb-16 md:mb-20">
          {eyebrowText && (
            <h4 className={`${eyebrowColorClass} font-medium text-base md:text-lg lg:text-xl uppercase tracking-wider mb-4`}>
              {eyebrowText}
            </h4>
          )}
          <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight mb-8 lg:px-8">
            {title}
          </h2>
          {description && (
            <p className="text-primary font-regular text-lg md:text-xl lg:text-2xl max-w-6xl mx-auto leading-relaxed px-4 lg:px-8">
              {description}
            </p>
          )}
        </AnimateIn>

        {/* Grade de Cards (Desktop) */}
        <div className={`hidden md:grid ${gridColsClass} gap-8 md:gap-10 lg:gap-12 mb-20 md:mb-24`}>
          {cards.map((item, idx) => (
            <AnimateIn key={item.id} delay={0.1 * (idx + 1)}>
              <FeatureCardItem item={item} cardBgClass={cardBgClass} compact={compact} />
            </AnimateIn>
          ))}
        </div>

        {/* Versão Swiper (Mobile apenas) */}
        <div className="block md:hidden mb-16 relative px-2 pt-10">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full pb-12 pt-[10px] -mt-[10px]"
          >
            {cards.map((item) => (
              <SwiperSlide key={item.id} className="h-auto flex pb-6">
                <FeatureCardItem item={item} cardBgClass={cardBgClass} compact={compact} />
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
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`flex-1 transition-all duration-300 border-none p-0 focus:outline-none cursor-pointer max-w-[56px] ${activeIndex === index
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

        {/* Seção CTA Inferior */}
        {(ctaTitle || ctaButtonText) && (
          <div className="flex flex-col items-center mt-12 md:mt-20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 w-full max-w-6xl">
              {ctaTitle && (
                <h2 className="text-primary font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] leading-tight text-center md:text-left">
                  {ctaTitle}
                </h2>
              )}
              {ctaButtonText && (
                <Button
                  href={ctaButtonHref}
                  variant="secondary"
                  size="lg"
                  className="normal-case whitespace-nowrap"
                >
                  {ctaButtonText}
                </Button>
              )}
            </div>

            {/* Disclaimer */}
            {disclaimer && (
              <p className="text-primary font-regular text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] opacity-70 max-w-4xl leading-tight text-center md:text-left mt-14">
                {disclaimer}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
