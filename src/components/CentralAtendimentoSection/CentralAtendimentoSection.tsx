'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CentralAtendimentoSection() {
  return (
    <section className="w-full bg-[#f8f9fa] py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-5xl">
        {/* Title - Left Aligned to Content */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20 text-left">
          <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] leading-tight text-left">
            Central de Atendimento Sicoobcard
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-6 gap-x-12 lg:gap-x-32 items-start max-w-4xl mx-auto">

          {/* Row 1 Left: Regiões metropolitanas */}
          <div className="text-left">
            <h4 className="text-[#58595b] font-normal text-lg md:text-xl mb-0.5">
              Regiões metropolitanas
            </h4>
            <p className="text-primary font-normal text-base md:text-lg">
              4007 1256
            </p>
          </div>

          {/* Row 1 Right: Exterior (ligue a cobrar) */}
          <div className="text-left">
            <h4 className="text-[#58595b] font-normal text-lg md:text-xl mb-0.5">
              Exterior (ligue a cobrar)
            </h4>
            <p className="text-primary font-normal text-base md:text-lg">
              +55 61 3030 6767
            </p>
          </div>

          {/* Row 2 Left: Demais regiões */}
          <div className="text-left mt-4 md:mt-8">
            <h4 className="text-[#58595b] font-normal text-lg md:text-xl mb-0.5">
              Demais regiões
            </h4>
            <p className="text-primary font-normal text-base md:text-lg">
              0800 702 0756
            </p>
          </div>

          {/* Row 3 Left: Exterior (ligue a cobrar) */}
          <div className="text-left mt-4 md:mt-8">
            <h4 className="text-[#58595b] font-normal text-lg md:text-xl mb-0.5">
              Exterior (ligue a cobrar)
            </h4>
            <p className="text-primary font-normal text-base md:text-lg">
              +55 61 3030 6767
            </p>
          </div>

          {/* Row 2-3 Right: Programa de Desconto (row-span-2, vertically centered) */}
          <div className="flex flex-col items-start gap-4 text-left mt-4 md:mt-0 md:row-span-2 md:col-start-2 md:row-start-2 md:self-center">
            <h4 className="text-primary font-bold text-xl md:text-[1.2rem] whitespace-nowrap">
              Programa de Desconto de Anuidade
            </h4>
            <Link
              href="#"
              className="w-full bg-secondary hover:bg-primary text-sm md:text-base font-bold px-8 xl:px-10 py-3 xl:py-4 text-white rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300 text-center block"
            >
              Clique aqui e acesse
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
