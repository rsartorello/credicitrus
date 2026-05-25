'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';

export interface SejaAssociadoProps {
  subtitle?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
}

export default function SejaAssociado({
  subtitle = 'SEJA ASSOCIADO',
  title = 'Pronto para\ncomeçar?',
  description = 'Faça como mais de 170 mil\ncooperados. Abra sua conta\nagora mesmo e descubra todas\nas vantagens da Credicitrus!',
  buttonText = 'Abra já sua conta',
  buttonHref = '#',
  imageSrc = '/soltas/cartoes.png'
}: SejaAssociadoProps) {
  return (
    <section className="w-full bg-white py-12 lg:py-24 xl:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-8">

          {/* Text Content Area */}
          <AnimateIn direction="right" className="w-full lg:w-1/2 flex flex-col items-center lg:items-start z-10 text-center lg:text-left">

            {/* Subtitle H4 Medium VerdeCredicitrus scaled */}
            <h4 className="text-sm md:text-base lg:text-lg font-medium text-verdecredicitrus uppercase tracking-wider mb-4 lg:mb-6">
              {subtitle}
            </h4>

            {/* Title H1 ExtraBold 62.25pt Primary scaled */}
            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold text-primary leading-[1.1] tracking-tight mb-6 lg:mb-8 whitespace-pre-line">
              {title}
            </h1>

            {/* Description Paragraph Regular Primary scaled */}
            <p className="text-base md:text-xl lg:text-[1.4rem] font-normal text-primary leading-relaxed mb-8 lg:mb-12 whitespace-pre-line max-w-xl opacity-90">
              {description}
            </p>

            {/* CTA Button scaled */}
            <Link
              href={buttonHref}
              className="inline-block w-full sm:w-auto bg-secondary hover:bg-primary text-sm md:text-base font-bold px-8 xl:px-10 py-3 xl:py-4 text-white rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
            >
              {buttonText}
            </Link>

          </AnimateIn>

          {/* Image Area */}
          <AnimateIn direction="left" delay={0.2} className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mb-8 lg:mb-0">
            {/* Flutuabilidade hover e drop-shadow para os cartões Sicoob */}
            <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-square transform hover:scale-105 hover:-rotate-1 transition-all duration-700">
              <Image
                src={imageSrc}
                alt="Cartões Credicitrus Sicoob Gold e Black"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain object-center lg:object-right filter"
                priority
              />
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
}
