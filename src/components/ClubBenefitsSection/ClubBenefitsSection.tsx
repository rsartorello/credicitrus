'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface BenefitItem {
  boldText: string;
  regularText: string;
}

export interface BenefitCard {
  id: string | number;
  image: string;
  title: string;
  items: BenefitItem[];
  href: string;
}

export interface ClubBenefitsSectionProps {
  eyebrowText?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  cards: BenefitCard[];
  ctaTitle?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
}

// Componente finalizado conforme layout oficial
export default function ClubBenefitsSection({
  eyebrowText = "PARA SUA EMPRESA",
  title,
  description,
  cards,
  ctaTitle,
  ctaButtonText,
  ctaButtonHref = "#",
}: ClubBenefitsSectionProps) {
  return (
    <section className="w-full bg-[#f8f9fa] py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1200px]">
        {/* Cabeçalho */}
        <div className="text-center mb-16 md:mb-20">
          {eyebrowText && (
            <h4 className="text-verdecredicitrus font-medium text-base md:text-lg lg:text-xl uppercase tracking-wider mb-4">
              {eyebrowText}
            </h4>
          )}
          <h2 className="text-[#003641] font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight mb-8">
            {title}
          </h2>
          {description && (
            <p className="text-[#003641] font-normal text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Grade de Cards - Boxes Brancos com Sombra */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 mb-20">
          {cards.map((card) => (
            <div 
              key={card.id}
              className="bg-white overflow-hidden flex flex-col h-full"
              style={{ 
                borderRadius: '60px', 
                boxShadow: '0 25px 60px rgba(0,0,0,0.1)',
                border: '1px solid #f0f0f0'
              }}
            >
              {/* Imagem de Topo - Forçando altura para garantir visibilidade */}
              <div className="relative w-full overflow-hidden" style={{ height: '280px' }}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Conteúdo Interno */}
              <div className="p-12 md:p-14 lg:p-16 flex flex-col flex-grow">
                <h3 className="text-[#00a99d] text-2xl md:text-3xl lg:text-[2rem] mb-12" style={{ fontWeight: 700 }}>
                  {card.title}
                </h3>

                <ul className="flex flex-col gap-8 flex-grow mb-16">
                  {card.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-[#003641]">
                      {/* Bullet Dot - SVG maior para combinar com o texto */}
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="mt-[0.75rem] flex-shrink-0">
                        <circle cx="4" cy="4" r="3.5" fill="#003641" />
                      </svg>
                      <p className="text-base md:text-lg lg:text-[1.25rem] leading-[1.6]">
                        <span style={{ fontWeight: 900 }}>{item.boldText}</span>
                        <span style={{ fontWeight: 400 }}>{item.regularText}</span>
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Botão de Ação Circular */}
                <div className="flex justify-end mt-auto pr-2 pb-2">
                  <Link 
                    href={card.href}
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300"
                    style={{ backgroundColor: '#003641' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Inferior de Simulação */}
        {(ctaTitle || ctaButtonText) && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-16 pt-10">
            {ctaTitle && (
              <h2 className="text-[#003641] font-extrabold text-2xl md:text-3xl lg:text-4xl text-center">
                {ctaTitle}
              </h2>
            )}
            {ctaButtonText && (
              <Link
                href={ctaButtonHref}
                className="bg-[#00a99d] hover:bg-[#003641] text-white font-bold text-lg md:text-xl px-12 py-4 rounded-2xl transition-all duration-300 shadow-lg"
              >
                {ctaButtonText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
