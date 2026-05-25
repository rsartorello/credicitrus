'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

export interface SolucoesItem {
  id: number | string;
  image: string;
  title: string;
  description: string;
  href?: string;
}

const SolutionCard = ({ item }: { item: SolucoesItem }) => (
  <Link
    href={item.href || '#'}
    className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-300 transform md:hover:-translate-y-2 border border-gray-100 h-full"
  >
    {/* Imagem com cantos superiores arredondados */}
    <div className="relative aspect-[440/280] w-full overflow-hidden rounded-t-[2.5rem]">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover md:group-hover:scale-105 transition-transform duration-700"
      />
    </div>

    {/* Conteúdo do Card */}
    <div className="flex flex-col p-8 lg:p-10 flex-grow relative">
      <h3 className="text-primary font-bold text-[1.3rem] md:text-[1.5rem] lg:text-[1.6rem] leading-tight mb-4 md:group-hover:text-secondary transition-colors duration-300">
        {item.title}
      </h3>
      <p className="text-primary/80 font-medium text-xs md:text-base lg:text-[1.1rem] leading-relaxed mb-12 flex-grow">
        {item.description}
      </p>

      {/* Ícone de Seta (Ajustado para o canto inferior direito como no design) */}
      <div className="absolute bottom-8 right-8 lg:bottom-10 lg:right-10">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center md:group-hover:bg-secondary transition-colors duration-300 shadow-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white transform md:group-hover:translate-x-1 transition-transform"
          >
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  </Link>
);

export interface SolucoesGeralProps {
  sectionSubtitle?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  items?: SolucoesItem[];
  ctaTitle?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
}

const defaultItems: SolucoesItem[] = [
  {
    id: 1,
    image: '/soltas/emprestimo1.webp',
    title: 'Crédito para o dia a dia e fluxo de caixa',
    description: 'Mantenha o equilíbrio financeiro da sua empresa, pague fornecedores, renove estoque ou cubra despesas operacionais inesperadas.',
    href: '#',
  },
  {
    id: 2,
    image: '/soltas/emprestimo2.webp',
    title: 'Financiamentos para expansão e modernização',
    description: 'Adquira novos equipamentos, reforme ou construa instalações, compre máquinas e modernize a infraestrutura do seu negócio.',
    href: '#',
  },
  {
    id: 3,
    image: '/soltas/emprestimo3.webp',
    title: 'Crédito com garantia',
    description: 'Oferecemos linhas de crédito com taxas reduzidas utilizando bens (imóveis ou veículos) como garantia. Ideal para grandes projetos ou reestruturação.',
    href: '#',
  },
];

export default function SolucoesGeral({
  sectionSubtitle = 'PARA SUA EMPRESA',
  sectionTitle = 'Empréstimos e financiamentos para sua empresa crescer ainda mais com a gente',
  sectionDescription = 'Na Credicitrus, você encontra crédito para investir, reformar, enfrentar desafios e muito mais. Tudo com soluções que fazem sentido para o seu negócio.',
  items = defaultItems,
  ctaTitle = 'Ficou na dúvida sobre qual é o melhor crédito?',
  ctaButtonText = 'Fale com nosso especialista!',
  ctaButtonHref = '#',
}: SolucoesGeralProps) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px]">
        {/* Cabeçalho */}
        <div className="text-center mb-16 md:mb-20">
          <h4 className="text-verdecredicitrus font-medium text-base md:text-lg lg:text-xl uppercase tracking-wider mb-4">
            {sectionSubtitle}
          </h4>
          <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight mb-8 max-w-6xl mx-auto">
            {sectionTitle}
          </h2>
          <p className="text-primary font-medium text-lg md:text-xl lg:text-[1.4rem] max-w-5xl mx-auto leading-relaxed opacity-90">
            {sectionDescription}
          </p>
        </div>

        {/* Grade de Cards (Desktop) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-20 md:mb-24">
          {items.map((item) => (
            <SolutionCard key={item.id} item={item} />
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
            {items.map((item) => (
              <SwiperSlide key={item.id} className="h-auto flex pb-6">
                <SolutionCard item={item} />
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
              {items.map((_, index) => (
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

        {/* Seção CTA Inferior (Reorganizado para 100% fidelity) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left bg-gray-50/50 p-8 md:p-16 rounded-[3rem]">
          <h2 className="text-primary font-extrabold text-2xl md:text-3xl lg:text-[2.6rem] leading-tight max-w-xl">
            {ctaTitle}
          </h2>
          <Link
            href={ctaButtonHref}
            className="inline-block bg-secondary hover:bg-primary text-white font-bold text-base md:text-lg lg:text-xl px-12 md:px-16 py-4 md:py-5 rounded-full transition-all duration-300 shadow-lg whitespace-nowrap uppercase tracking-wide"
          >
            {ctaButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
