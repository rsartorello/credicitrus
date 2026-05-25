'use client';

import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ResourceCard {
  title: string;
  href: string;
}

interface ResourceGridProps {
  eyebrow: string;
  description: string;
  cards: ResourceCard[];
  columns?: number;
}

export default function ResourceGrid({
  eyebrow,
  description,
  cards
}: ResourceGridProps) {
  const containerMaxW = 'max-w-[1200px]';

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className={`container mx-auto px-4 lg:px-8 xl:px-12 ${containerMaxW}`}>
        
        {/* Header Area Area */}
        <div className="flex flex-col mb-16">
          <h4 className="text-sm md:text-base font-medium text-verdecredicitrus uppercase tracking-widest mb-8 text-center w-full">
            {eyebrow}
          </h4>
          <p className="text-primary text-base md:text-lg lg:text-xl leading-relaxed max-w-[1000px] opacity-80 text-left">
            {description}
          </p>
        </div>

        {/* Cards Grid - Fixo em 4 colunas para manter o tamanho dos cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {cards.map((card, index) => {
            const isFile = card.href.endsWith('.pdf') || card.href.includes('/files/');
            const isExternal = card.href.startsWith('http://') || card.href.startsWith('https://') || card.href.startsWith('//');

            const linkProps: any = {};
            if (isFile) {
              linkProps.download = true;
            }
            if (isExternal) {
              linkProps.target = "_blank";
              linkProps.rel = "noopener noreferrer";
            }

            const cardContent = (
              <>
                <div className="flex flex-col items-start">
                  <div className="bg-[#00a99d]/10 rounded-xl p-3 mb-8">
                    <FileText className="w-8 h-8 text-[#00a99d]" />
                  </div>
                  <h3 className="text-white font-extrabold text-xl md:text-[1.35rem] leading-snug whitespace-pre-line">
                    {card.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-[#00a99d] font-bold text-lg mt-8 group-hover:gap-4 transition-all">
                  Saiba mais
                  <ChevronRight className="w-5 h-5" />
                </div>
              </>
            );

            const cardClassName = "group bg-primary rounded-[2rem] p-6 md:p-10 flex flex-col items-start justify-between min-h-[280px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl w-full text-left";

            if (isFile || isExternal) {
              return (
                <a key={index} href={card.href} className={cardClassName} {...linkProps}>
                  {cardContent}
                </a>
              );
            }

            return (
              <Link key={index} href={card.href} className={cardClassName}>
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
