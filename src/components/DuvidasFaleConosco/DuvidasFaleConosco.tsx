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
            Estamos à disposição também, através da central de atendimento, no 0800 XXX XXXX (todas as localidades) para assuntos relacionados à produtos, tais como: Pix, Cartões, Aplicativo e Internet Banking e muito mais. Além disso, o associado Credicitrus pode contar com nossa inteligência artificial, o Léo, através do WhatsApp XXXXXXXX.
          </p>
        </div>

        {/* Formulário de Contato */}
        <form className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Coluna Esquerda: Nome, E-mail, Telefone */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="nome" className="sr-only">Nome:</label>
              <input
                type="text"
                id="nome"
                placeholder="Nome:"
                className="w-full bg-white rounded-xl py-4 px-6 text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="sr-only">E-mail:</label>
              <input
                type="email"
                id="email"
                placeholder="E-mail:"
                className="w-full bg-white rounded-xl py-4 px-6 text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="telefone" className="sr-only">Telefone:</label>
              <input
                type="tel"
                id="telefone"
                placeholder="Telefone:"
                className="w-full bg-white rounded-xl py-4 px-6 text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
              />
            </div>
          </div>

          {/* Coluna Direita: Mensagem e Botão Enviar */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 h-full">
              <label htmlFor="mensagem" className="sr-only">Mensagem:</label>
              <textarea
                id="mensagem"
                placeholder="Mensagem:"
                rows={4}
                className="w-full bg-white rounded-xl py-4 px-6 text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary transition-all h-full resize-none"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-white text-white hover:text-secondary border-2 border-transparent hover:border-secondary font-bold py-4 rounded-xl transition-all duration-300 uppercase shadow-lg"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
