'use client';

import React, { useState, useRef } from 'react';
import { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AnimateIn from '@/components/ui/AnimateIn';
import { usePathname } from 'next/navigation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface OutrasSolucoesSlide {
  id: number | string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

export interface OutrasSolucoesGeralProps {
  sectionSubtitle?: string;
  sectionTitle?: React.ReactNode;
  slides?: OutrasSolucoesSlide[];
}

const defaultSlides: OutrasSolucoesSlide[] = [
  {
    id: 1,
    icon: '/soltas/icone-emprestimos.svg',
    title: 'Empréstimos e Financiamento',
    description: 'Créditos para suas necessidades.',
    link: '/para-sua-empresa/emprestimos-e-financiamentos',
  },
  {
    id: 2,
    icon: '/soltas/icone-consorcio.svg',
    title: 'Consórcio',
    description: 'Realize seus sonhos de forma planejada.',
    link: '/para-sua-empresa/consorcios',
  },
  {
    id: 3,
    icon: '/soltas/icone-solucoesderecebimento.svg',
    title: 'Soluções de Recebimento',
    description: 'Receba pagamentos com facilidade.',
    link: '/para-sua-empresa/solucoes-de-recebimento',
  },
  {
    id: 4,
    icon: '/soltas/icone-cartaodecredito.svg',
    title: 'Cartões de Crédito',
    description: 'Cartões com benefícios exclusivos.',
    link: '/para-sua-empresa/cartoes-de-credito',
  },
  {
    id: 5,
    icon: '/soltas/icone-seguro.svg',
    title: 'Seguros',
    description: 'Proteção para você e sua família.',
    link: '/para-sua-empresa/seguros',
  },
  {
    id: 6,
    icon: '/soltas/icone-recebiveis.svg',
    title: 'Antecipação de Recebíveis',
    description: 'Dinheiro na sua conta, na hora.',
    link: '/para-sua-empresa/antecipacao-de-recebiveis',
  },
  {
    id: 7,
    icon: '/soltas/icone-cartoesbeneficios.svg',
    title: 'Cartões de Benefícios',
    description: 'Cartões para benefícios sociais.',
    link: '/para-sua-empresa/cartoes-de-beneficios',
  },
  {
    id: 8,
    icon: '/soltas/icone-credicitrusclub.svg',
    title: 'Credicitrus Club',
    description: 'Benefícios exclusivos para cooperados.',
    link: '/para-sua-empresa/credicitrus-club',
  },
  {
    id: 9,
    icon: '/soltas/icone-produtoseservicos.svg',
    title: '+ Produtos e Serviços',
    description: 'Descubra outras soluções.',
    link: '/fale-com-a-gente',
  },
];

export default function OutrasSolucoesGeral({
  sectionSubtitle = 'SOLUÇÕES PARA SUA EMPRESA',
  sectionTitle = 'Veja outras soluções e serviços para sua empresa',
  slides = defaultSlides,
}: OutrasSolucoesGeralProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();

  const normalizedPath = pathname?.replace(/\/$/, '') || '';
  const filteredSlides = slides.filter(
    (slide) => (slide.link?.replace(/\/$/, '') || '') !== normalizedPath
  );

  // Duplicar slides para evitar o aviso de loop do Swiper (mínimo de 8 slides para slidesPerView de até 4)
  let swiperSlides = filteredSlides;
  if (filteredSlides.length > 0 && filteredSlides.length < 8) {
    swiperSlides = [...filteredSlides, ...filteredSlides.map((s, idx) => ({ ...s, id: `${s.id}-dup-${idx}` }))];
    if (swiperSlides.length < 8) {
      swiperSlides = [...swiperSlides, ...swiperSlides.map((s, idx) => ({ ...s, id: `${s.id}-dup2-${idx}` }))];
    }
  }

  return (
    <section className="w-full bg-primary py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">
        {/* Cabeçalho */}
        <AnimateIn className="text-center mb-16 md:mb-20">
          <h4 className="text-verdecredicitrus font-medium text-base md:text-lg lg:text-xl uppercase tracking-wider mb-4">
            {sectionSubtitle}
          </h4>
          <h2 className="text-white font-extrabold text-3xl md:text-[2.7rem] lg:text-[3rem] xl:text-[3rem] leading-[1.1] max-w-none mx-auto whitespace-pre-line">
            {sectionTitle}
          </h2>
        </AnimateIn>

        {/* Carrossel */}
        <AnimateIn delay={0.2} className="relative px-4 md:px-0 mb-12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            loop={swiperSlides.length > 1}
            centeredSlides={false}
            watchOverflow={false}
            observer={true}
            observeParents={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setTimeout(() => {
                swiper.update();
              }, 100);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 28 },
            }}
            className="pb-12 pt-[10px] -mt-[10px] !items-stretch"
          >
            {swiperSlides.map((slide) => (
              <SwiperSlide key={slide.id} className="!h-auto flex flex-col overflow-visible relative pt-2.5 pb-6">
                {/* Ribbon Column (Absolute to slide container to bypass card border-radius clipping) */}
                <div
                  className="absolute left-6 md:left-8 top-0 shrink-0 w-[56px] h-[96px] z-10 pt-[10px]"
                >
                  <Image
                    src={slide.icon}
                    alt={slide.title}
                    width={56}
                    height={96}
                    className="absolute top-0 left-0 object-contain"
                  />
                </div>

                <div className="bg-white rounded-[2rem] flex flex-1 flex-col h-full min-h-[250px] shadow-lg md:group md:hover:shadow-2xl transition-all duration-300 overflow-visible">

                  {/* ─── Top Row: Ribbon Space + Title ─── */}
                  <div className="relative flex items-stretch min-h-[6rem] shrink-0 pt-0 overflow-visible">

                    {/* Spacer Column to reserve space for the absolute ribbon */}
                    <div className="shrink-0 w-[56px] ml-6 md:ml-8" />

                    {/* Title Column */}
                    <div className="flex-1 min-w-0 flex items-center pl-4 pr-6 py-4">
                      <h3 className="text-primary font-extrabold text-[0.95rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[1.1rem] 2xl:text-[1.2rem] leading-snug w-full">
                        {slide.title}
                      </h3>
                    </div>
                  </div>

                  {/* ─── Body: Description + Button ─── */}
                  <div className="flex flex-1 flex-col p-6 md:p-8 pt-4">
                    <p className="text-primary/80 font-medium text-[1rem] md:text-[1.05rem] leading-relaxed flex-1 mb-8">
                      {slide.description}
                    </p>

                    <Link
                      href={slide.link}
                      className="w-full text-center border-2 border-secondary text-secondary font-bold text-[1.1rem] py-3 rounded-2xl hover:bg-secondary hover:text-white transition-all duration-300"
                    >
                      Saiba mais
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navegação Customizada Abaixo (Estilo Mockup) */}
          <div className="flex items-center justify-center gap-6 md:gap-8 mt-4 md:mt-12 w-full px-4 md:px-0">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex items-center justify-center text-secondary hover:opacity-70 transition-all cursor-pointer"
            >
              <ChevronLeft size={32} strokeWidth={2} />
            </button>

            {/* Linhas de Progresso Dinâmicas */}
            <div className="flex gap-1.5 md:gap-4 py-2 shrink-0">
              {filteredSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className={`w-8 md:w-14 transition-all duration-300 border-none p-0 focus:outline-none cursor-pointer ${activeIndex % (filteredSlides.length || 1) === index
                    ? 'bg-secondary'
                    : 'bg-white/20'
                    }`}
                  style={{ height: '2px' }}
                />
              ))}
            </div>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex items-center justify-center text-secondary hover:opacity-70 transition-all cursor-pointer"
            >
              <ChevronRight size={32} strokeWidth={2} />
            </button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
