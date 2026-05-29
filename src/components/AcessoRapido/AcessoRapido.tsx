'use client';

import React from 'react';
import Link from 'next/link';

export interface AcessoRapidoCard {
  id: string;
  iconSrc: string;
  title: string;
  description: string;
  href: string;
}

export interface AcessoRapidoProps {
  subtitle?: string;
  title?: string;
  cards?: AcessoRapidoCard[];
}

export default function AcessoRapido({
  subtitle = 'ACESSO RÁPIDO',
  title = 'Facilite o seu dia a dia',
  cards = [
    {
      id: 'quem-somos',
      iconSrc: '/soltas/icone-quem-somos-00ae9d.svg',
      title: 'Quem somos',
      description: 'Saiba mais sobre a Credicitrus',
      href: '/quem-somos'
    },
    {
      id: 'agencias',
      iconSrc: '/soltas/icone-agencias-00ae9d.svg',
      title: 'Nossas agências',
      description: 'Encontre a agência mais próxima de você',
      href: '/nossas-agencias'
    },
    {
      id: 'fale',
      iconSrc: '/soltas/icone-fale-00ae9d.svg',
      title: 'Fale conosco',
      description: 'Conheça nossos canais de ajuda',
      href: '/fale-com-a-gente'
    },
    {
      id: 'duvidas',
      iconSrc: '/soltas/icone-duvidas-00ae9d.svg',
      title: 'Dúvidas frequentes',
      description: 'Tire todas as suas dúvidas',
      href: '/duvidas-frequentes'
    },
    {
      id: 'redes',
      iconSrc: '/soltas/icone-redes-sociais-00ae9d.svg',
      title: 'Siga nossas redes sociais',
      description: 'Acompanhe a Credicitrus',
      href: '/nossas-redes-sociais'
    }
  ]
}: AcessoRapidoProps) {
  return (
    <section className="w-full bg-[#f9fafb] py-16 lg:py-24 flex flex-col items-center">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 flex flex-col items-center">

        {/* Main Headings */}
        <div className="flex flex-col items-center text-center max-w-4xl mb-12 lg:mb-16">
          <h4 className="text-sm md:text-base lg:text-lg font-medium text-[#8fb534] uppercase tracking-wider mb-4">
            {subtitle}
          </h4>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#003641] leading-[1.05] tracking-tight">
            {title}
          </h1>
        </div>

        {/* Action Cards Grid - 5 columns */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 justify-center">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group flex flex-row sm:flex-col bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-transparent hover:border-[#f3f4f6] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 text-left h-full max-w-[300px] sm:max-w-none mx-auto w-full items-center sm:items-start gap-4 sm:gap-0"
            >
              {/* Icon (Left-aligned as instructed) */}
              <div className="mb-0 sm:mb-6 w-10 h-10 flex items-center justify-start transform group-hover:scale-110 transition-transform duration-300 origin-left opacity-90 shrink-0">
                <img
                  src={card.iconSrc}
                  alt={`Ícone ${card.title}`}
                  className="w-full h-full object-contain object-left"
                />
              </div>

              <div className="flex flex-col">
                {/* Box Title scaled */}
                <h3 className="text-sm lg:text-base font-bold text-[#003641] leading-[1.15] mb-1 sm:mb-2">
                  {card.title}
                </h3>

                {/* Box Description scaled */}
                <p className="text-[10px] lg:text-xs text-[#71717A] leading-[1.4] flex-grow">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
