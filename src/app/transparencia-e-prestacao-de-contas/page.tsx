'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const transparencyLinks = [
  { label: 'Assembleias', href: '/assembleia-credicitrus' },
  { label: 'Relatórios', href: '/relatorios-credicitrus-1' },
  { label: 'Normativos', href: '/normativos-credicitrus' },
  { label: 'Ética e integridade', href: '/etica-e-integridade' },
  { label: 'Tabela de tarifas', href: '#' },
  { label: 'Prevenção a fraudes e golpes', href: '/prevencao-a-fraudes-e-golpes' },
  { label: 'Gerenciamento de riscos e de capital', href: '/gerenciamento-de-riscos-e-de-capital-credicitrus-1' },
  { label: 'Segurança e privacidade', href: '/relatorios-credicitrus-2' },
];

export default function TransparenciaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero 
          backgroundImage="/soltas/hero-transparencia.png"
          titleLines={["TRANSPARÊNCIA", "E PRESTAÇÃO", "DE CONTAS"]}
          highlightIndices={[1, 2]}
          subtitleColor="secondary"
        />

        <section className="w-full bg-[#f8f9fa] py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h4 className="text-verdecredicitrus font-medium text-base uppercase tracking-wider mb-4">
                TRANSPARÊNCIA
              </h4>
              <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight">
                Acesse nossos documentos <br />
                e prestações de contas
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {transparencyLinks.map((item, idx) => (
                <Link 
                  key={idx} 
                  href={item.href}
                  className="bg-white rounded-full p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <span className="text-primary font-bold text-lg md:text-xl ml-4">
                    {item.label}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                    <ChevronRight size={24} strokeWidth={3} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Rodape />
    </div>
  );
}
