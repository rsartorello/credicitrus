'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './SolucoesFinanceiras.css';

export default function SolucoesFinanceiras() {
  const [activeIndex, setActiveIndex] = useState(1); // Starts with "Você" (index 1) active
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const slidesData = [
    {
      id: 1,
      image: '/solucoes/para-sua-empresa.webp',
      prefix: '#Para',
      mid: ' sua',
      line2: 'Empresa',
      link: '/para-sua-empresa'
    },
    {
      id: 2,
      image: '/solucoes/para-voce.webp',
      prefix: '#Para',
      mid: '',
      line2: 'Você',
      link: '/para-voce'
    },
    {
      id: 3,
      image: '/solucoes/para-o-agro.webp',
      prefix: '#Para',
      mid: '',
      line2: 'oAgro',
      link: '/para-o-agro'
    }
  ];

  // Map index position based on activeIndex
  const getSlidePosition = (slideIndex: number) => {
    const diff = (slideIndex - activeIndex + 3) % 3;
    if (diff === 0) return 'active';
    if (diff === 1) return 'right';
    return 'left';
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + 3) % 3);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % 3);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <section className="w-full bg-[#f8f8f8] py-24 pb-32 flex flex-col items-center overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6 flex flex-col items-center text-center gap-16">

        {/* Texts Configuration - First line H4, Second H2, Third H3 */}
        <div className="flex flex-col items-center gap-4 lg:gap-6 max-w-3xl">
          <h4 className="text-xs md:text-sm lg:text-base font-medium text-[#8fb534] uppercase tracking-[0.2em]">
            SOLUÇÕES FINANCEIRAS
          </h4>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-[#003641] leading-[1.1] tracking-tight">
            A Credicitrus tem o produto ideal para cada momento da sua vida
          </h2>
          <h3 className="text-base md:text-lg xl:text-xl font-bold text-[#359e91] leading-[1.3] max-w-2xl mt-2">
            Para você ter controle total da sua vida financeira e realizar seus projetos pessoais
          </h3>
        </div>

        {/* 3D Static-Slot Slider (Sequence: Inactive - Active - Inactive) */}
        <div className="w-full mt-4 lg:mt-8 relative flex flex-col items-center">
          <div
            className="solucoes-cards-container w-full h-[400px] sm:h-[500px] lg:h-[560px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {slidesData.map((slide, index) => {
              const position = getSlidePosition(index);
              const isActive = position === 'active';

              return (
                <div
                  key={slide.id}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(index);
                    }
                  }}
                  className={`solucoes-card-slot solucoes-card-${position} relative w-[260px] sm:w-[280px] md:w-[300px] lg:w-[340px] h-full overflow-hidden group transicaoborda ${
                    !isActive ? 'cursor-pointer' : ''
                  }`}
                >
                  {/* Background Image */}
                  <Image
                    src={slide.image}
                    alt={slide.line2}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={isActive}
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003641]/90 via-black/20 to-transparent"></div>

                  {/* Card Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-end h-full z-10">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-[1.1] text-center flex flex-col mb-6 lg:mb-8">
                      <span>
                        <span className="text-[#359e91]">{slide.prefix}</span>
                        <span className="text-white">{slide.mid}</span>
                      </span>
                      <span className="text-white">{slide.line2}</span>
                    </h3>

                    <Link
                      href={slide.link}
                      tabIndex={isActive ? 0 : -1}
                      onClick={(e) => {
                        if (!isActive) {
                          e.preventDefault();
                        }
                      }}
                      className="inline-flex justify-center items-center bg-secondary hover:bg-primary text-white text-sm lg:text-base font-bold py-3 px-8 rounded-full transition-colors w-full max-w-[240px]"
                    >
                      Saiba mais
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Navigation / Pagination Centered Below the Slider */}
          <div className="flex items-center justify-center gap-12 mt-12 w-full opacity-60 hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrev}
              className="solucoes-btn-prev text-[#d1d5db] hover:text-primary transition-colors text-4xl font-light"
              aria-label="Slide anterior"
            >
              &lsaquo;
            </button>

            <div className="!w-auto flex items-center justify-center gap-3">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`solucoes-bullet ${activeIndex === idx ? 'solucoes-bullet-active' : ''}`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="solucoes-btn-next text-[#d1d5db] hover:text-primary transition-colors text-4xl font-light"
              aria-label="Próximo slide"
            >
              &rsaquo;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
