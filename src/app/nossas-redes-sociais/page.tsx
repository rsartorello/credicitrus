'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import SectionHeader from "@/components/ui/SectionHeader";
import Rodape from "@/components/Rodape/Rodape";
import { ChevronRight } from 'lucide-react';
import AnimateIn from "@/components/ui/AnimateIn";

const FacebookIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} width={size} height={size} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} width={size} height={size} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} width={size} height={size} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className} width={size} height={size} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const redesSociais = [
  { name: 'Facebook', icon: FacebookIcon, href: 'https://www.facebook.com/credicitrus/' },
  { name: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/sicoobcredicitrus/' },
  { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/company/sicoob-credicitrus/' },
  { name: 'Youtube', icon: YoutubeIcon, href: 'https://www.youtube.com/c/SicoobCredicitrus' },
];

export default function NossasRedesSociaisPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-nossas-redes-sociais.jpg"
          titleLines={["Nossas", "Redes Sociais"]}
          subtitleColor="secondary"
        />

        <section className="w-full bg-[#f8f9fa] py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px]">
            <AnimateIn direction="none" delay={0.2} className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
              <SectionHeader
                subtitle="NOSSAS REDES SOCIAIS"
                title="Conecte-se com a gente"
                centered={true}
              />
              <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed pt-10 px-4">
                Acompanhe conteúdos institucionais, novidades da cooperativa, iniciativas com a comunidade e eventos ao longo do ano. Estamos presentes nos principais canais para informar e fortalecer nossa rede de relacionamento.
              </p>
            </AnimateIn>

            <AnimateIn direction="none" delay={0.4} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
              {redesSociais.map((rede, idx) => {
                const Icon = rede.icon;
                return (
                  <a
                    key={idx}
                    href={rede.href}
                    className="bg-white rounded-[2rem] p-8 md:p-6 lg:p-8 flex flex-col sm:aspect-square shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 group max-w-[280px] sm:max-w-[240px] mx-auto w-full"
                  >
                    <div className="text-secondary mb-8 sm:mb-0">
                      <Icon size={48} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col w-full mt-auto">
                      <span className="text-primary font-bold text-xl sm:text-base lg:text-lg">{rede.name}</span>
                      <div className="flex justify-end mt-2">
                        <ChevronRight size={24} strokeWidth={3} className="text-primary group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </AnimateIn>
          </div>
        </section>

      </main>
      <Rodape />
    </div>
  );
}
