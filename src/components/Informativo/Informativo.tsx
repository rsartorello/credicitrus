'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { Montserrat } from 'next/font/google';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Informativo.css';

// Configurando tipografia local para atender à exigência "Montserrat Light 21.67pt"
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300'], // Light
  display: 'swap',
});

export interface InformativoArticle {
  id: string;
  imageSrc: string;
  title: string;
  linkHref: string;
}

export interface InformativoProps {
  subtitle?: string;
  title?: string;
  buttonText?: string;
  buttonHref?: string;
  articles?: InformativoArticle[];
}

export default function Informativo({
  subtitle = 'INFORMATIVO',
  title = 'Fique por dentro das novidades Credicitrus',
  buttonText = 'Ir para o Blog',
  buttonHref = '#',
  articles = [
    {
      id: 'seguros',
      imageSrc: '/soltas/fique-por-dentro1.webp',
      title: 'Campanha de Seguros Gerais',
      linkHref: '#'
    },
    {
      id: 'gptw',
      imageSrc: '/soltas/fique-por-dentro2.webp',
      title: 'GPTW Agronegócio 2025',
      linkHref: '#'
    },
    {
      id: 'seguros-clone',
      imageSrc: '/soltas/fique-por-dentro1.webp',
      title: 'Campanha de Seguros Gerais',
      linkHref: '#'
    },
    {
      id: 'gptw-clone',
      imageSrc: '/soltas/fique-por-dentro2.webp',
      title: 'GPTW Agronegócio 2025',
      linkHref: '#'
    }
  ]
}: InformativoProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative w-full flex flex-col xl:flex-row overflow-hidden">
      
      {/* Left Section (White Background) */}
      <div className="w-full xl:w-[40%] bg-white py-16 xl:py-32 flex justify-center xl:justify-end px-4 xl:pr-12 2xl:pr-16 z-10">
        <div className="w-full max-w-[500px] flex flex-col items-start pt-4 xl:ml-auto">
          
          {/* Subtitle H4 Medium VerdeCredicitrus */}
          <h4 className="text-sm md:text-base lg:text-lg font-medium text-[#8fb534] uppercase tracking-wider mb-4 lg:mb-6">
            {subtitle}
          </h4>
          
          {/* Title H1 ExtraBold 62.25pt Primary scaled */}
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#003641] leading-[1.05] tracking-tight mb-8 lg:mb-12 max-w-sm">
            {title}
          </h1>

          {/* Master Button scaled */}
          <Link 
            href={buttonHref}
            className="inline-flex items-center justify-center bg-[#00a99d] hover:bg-[#003641] text-white text-sm md:text-base font-bold px-8 py-3 lg:py-4 rounded-lg transition-colors duration-300 shadow-md"
          >
            {buttonText}
          </Link>
          
        </div>
      </div>

      {/* Right Section (Dark Green Background with Carousel) */}
      <div className="w-full xl:w-[60%] bg-[#003641] py-16 xl:py-32 pl-4 xl:pl-12 overflow-hidden flex flex-col justify-center">
        
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 2.2, spaceBetween: 30 },
            1280: { slidesPerView: 2.5, spaceBetween: 30 },
            1536: { slidesPerView: 2.8, spaceBetween: 40 }
          }}
          loop={articles.length >= 6}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{
            el: '.informativo-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + ' informativo-bullet"></span>';
            },
            bulletActiveClass: 'informativo-bullet-active',
          }}
          className="w-full"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id} className="flex flex-col h-auto py-4">
              {/* Card Container */}
              <Link 
                href={article.linkHref}
                className="group flex flex-col bg-[#f9fafb] rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition-transform duration-300"
              >
                {/* Image Area */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image 
                    src={article.imageSrc}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Area */}
                <div className="flex flex-col p-6 lg:p-8 flex-grow bg-[#f9fafb]">
                  {/* Article Title: Montserrat Light 21.67pt scaled to base */}
                  <h2 className={`${montserrat.className} text-base lg:text-lg text-[#003641] leading-tight mb-6 lg:mb-8 font-light flex-grow`}>
                    {article.title}
                  </h2>

                  {/* Link Text: H3 Bold 12.21pt scaled to extra small */}
                  <h3 className="text-[10px] lg:text-xs font-bold text-[#003641] flex items-center gap-2 group-hover:text-[#359e91] transition-colors leading-none tracking-tight uppercase">
                    Ir para o artigo <span className="text-sm group-hover:translate-x-1 transition-transform">›</span>
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation & Pagination */}
        <div className="flex items-center gap-6 mt-8 xl:mt-12 pr-4 xl:pr-12">
          <button 
            className="informativo-prev transition-transform hover:scale-110"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Notícia Anterior"
          >
            <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 27.5L3 15L15.5 2.5" stroke="#E1E1E1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Pagination container */}
          <div className="informativo-pagination flex items-center gap-2"></div>

          <button 
            className="informativo-next transition-transform hover:scale-110"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Próxima Notícia"
          >
            <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 27.5L15 15L2.5 2.5" stroke="#E1E1E1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>

    </section>
  );
}
