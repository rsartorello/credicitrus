'use client';

import React from 'react';

export default function DuvidasFaleConosco() {
  return (
    <section className="w-full bg-primary py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px]">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-12 md:mb-16">
          <h4 className="text-verdecredicitrus font-medium text-base md:text-lg lg:text-xl uppercase tracking-wider mb-4">
            Fale com a gente
          </h4>
          <h2 className="text-white font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight mb-8">
            Precisa de ajuda ou está com dúvidas?
          </h2>
          <p className="text-white/90 font-regular text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed">
            Estamos à disposição também, através da central de atendimento, no <a href="tel:+551733459000" className="text-verdecredicitrus hover:underline font-bold">(17) 3345-9000</a> (todas as localidades) para assuntos relacionados à produtos, tais como: Pix, Cartões, Aplicativo e Internet Banking e muito mais. Além disso, o associado Credicitrus pode contar com nossa inteligência artificial, o Léo, através do WhatsApp <a href="https://wa.me/551733445020" target="_blank" rel="noopener noreferrer" className="text-verdecredicitrus hover:underline font-bold">(17) 3344-5020</a>.
          </p>
        </div>

        {/* Botão de Contato Central de Relacionamento */}
        <div className="flex justify-center">
          <a
            href="https://sicoobsaccredicitrus.omd.com.br/sac/externo/cadastro.do"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-white text-white hover:text-secondary border-2 border-transparent hover:border-secondary font-bold px-8 py-4 rounded-xl transition-all duration-300 uppercase shadow-lg text-center"
          >
            Falar com a Central de Relacionamento
          </a>
        </div>
      </div>
    </section>
  );
}
