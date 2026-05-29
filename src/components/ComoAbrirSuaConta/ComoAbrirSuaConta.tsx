'use client';

import React from 'react';
import Image from 'next/image';

export default function ComoAbrirSuaConta() {
  const [playVideo, setPlayVideo] = React.useState(false);

  return (
    <section className="w-full bg-primary py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px]">
        {/* Cabeçalho */}
        <div className="text-center mb-12 md:mb-16">
          <h4 className="text-verdecredicitrus font-medium text-base md:text-lg lg:text-xl uppercase tracking-wider mb-4">
            Passo a passo
          </h4>
          <h2 className="text-white font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight mb-8">
            Como abrir uma conta na Credicitrus.
          </h2>
          <p className="text-white font-regular text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed">
            Seja para você ou para seu negócio, a Credicitrus é sua parceira ideal.
          </p>
        </div>

        {/* Container da Imagem/Vídeo */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative aspect-[16/9] w-full bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
            {playVideo ? (
              <iframe
                src="https://www.youtube.com/embed/He9WvSCHPdU?autoplay=1"
                title="Vídeo passo a passo abertura de conta"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                {/* Imagem Centralizada (ajustada para parecer um vídeo) */}
                <div className="relative h-full aspect-[9/16]">
                  <Image
                    src="/soltas/como-abrir.webp"
                    alt="Vídeo passo a passo abertura de conta"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Overlay de Botão Play */}
                <button
                  onClick={() => setPlayVideo(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors duration-300 cursor-pointer group border-0 p-0 w-full h-full"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white flex items-center justify-center bg-white/10 group-hover:scale-110 transition-transform duration-300">
                    <svg 
                      width="40" 
                      height="40" 
                      viewBox="0 0 24 24" 
                      fill="white" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2"
                    >
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
