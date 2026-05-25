'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface AppSicoobProps {
  subtitle?: string;
  title?: string | React.ReactNode;
  description?: string;
  listItems?: string[];
  ctaText?: string;
  imageSrc?: string;
}

export default function AppSicoob({
  subtitle = 'APP SICOOB CREDICITRUS',
  title = <>Gerenciamento<br />financeiro total,<br />onde você estiver.</>,
  description,
  listItems = [
    'Acompanhe seus gastos e defina metas com inteligência.',
    'Pague suas contas, faça transferências e Pix de forma ágil e segura.',
    'Gerencie seus cartões com facilidade.',
    'Acesse seus investimentos em tempo real.'
  ],
  ctaText = 'Baixe agora no seu Celular!',
  imageSrc = '/sicoob/gerenciamento-financeiro.webp'
}: AppSicoobProps) {
  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center bg-[#ffffff] overflow-hidden">
      {/* Background partition: Dark Green on Left */}
      <div className="absolute top-0 left-0 w-full lg:w-[75%] xl:w-[80%] h-full bg-[#003641] z-0"></div>

      <div className="container relative z-10 mx-auto px-4 lg:px-6 xl:px-8 py-20 lg:py-24 flex flex-col lg:flex-row items-center">

        {/* Left Content */}
        <div className="w-full lg:w-[75%] xl:w-[80%] flex flex-col pt-8 lg:pt-0">
          {/* Text 1: H4 Medium VerdeCredicitrus */}
          <h4 className="text-sm md:text-base lg:text-lg font-medium text-[#8fb534] uppercase tracking-wider mb-4">
            {subtitle}
          </h4>

          {/* Text 2: H1 ExtraBold 62.25pt White */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.05] tracking-tight mb-8 lg:mb-12 max-w-xl">
            {title}
          </h1>

          {description && (
            <p className="text-white text-lg md:text-xl lg:text-[1.33rem] font-medium leading-[1.3] mb-8 lg:mb-12 opacity-95 max-w-xl">
              {description}
            </p>
          )}

          {/* Text 3: SemiBold White */}
          {!description && listItems && (
            <ul className="flex flex-col gap-3 lg:gap-4 text-white text-sm lg:text-base font-semibold tracking-wide mb-12 max-w-lg">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="text-[#8fb534] mt-[0.1rem] text-[1.2rem] leading-none">•</span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-10 mt-2">
            {/* Text 4: H2 Bold Secondary */}
            <h2 className="text-base lg:text-xl font-bold text-[#359e91] leading-tight">
              {ctaText}
            </h2>

            <div className="flex items-center gap-4">
              <Link href="#" className="hover:scale-105 transition-transform duration-300 drop-shadow-md">
                <img
                  src="/soltas/botao-google-play.svg"
                  alt="Disponível no Google Play"
                  className="h-[36px] lg:h-[40px] w-auto"
                />
              </Link>
              <Link href="#" className="hover:scale-105 transition-transform duration-300 drop-shadow-md">
                <img
                  src="/soltas/botao-apple-store.svg"
                  alt="Disponível na App Store"
                  className="h-[36px] lg:h-[40px] w-auto"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[25%] xl:w-[20%] flex justify-center lg:justify-end mt-16 lg:mt-0 relative">
          <div className="relative w-full aspect-[2/3] -translate-x-8 lg:-translate-x-24 xl:-translate-x-36 drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] lg:scale-[2] origin-center">
            <Image
              src={imageSrc}
              alt="Aplicativo Sicoob Credicitrus"
              fill
              className="object-contain object-center"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
