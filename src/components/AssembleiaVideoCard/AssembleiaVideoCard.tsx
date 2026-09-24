'use client';

import React from 'react';
import Image from 'next/image';

export default function AssembleiaVideoCard() {
  const [playVideo, setPlayVideo] = React.useState(false);

  return (
    <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden flex-grow flex flex-col justify-between">
      {playVideo ? (
        <div className="relative w-full max-w-[360px] mx-auto aspect-[9/16] overflow-hidden bg-black rounded-2xl shadow-inner">
          <iframe
            src="https://www.youtube.com/embed/qAwf-wdWJKY?autoplay=1"
            title="O que é a Assembleia"
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          onClick={() => setPlayVideo(true)}
          className="relative w-full max-w-[360px] mx-auto aspect-[9/16] block group overflow-hidden bg-[#003b2a] cursor-pointer rounded-2xl border-0 p-0"
        >
          <Image
            src="/soltas/1-assembleia-credicitrus.webp"
            alt="O que é a Assembleia"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
              <div className="w-0 h-0 border-t-[15px] lg:border-t-[20px] border-t-transparent border-l-[25px] lg:border-l-[35px] border-l-primary border-b-[15px] lg:border-b-[20px] border-b-transparent ml-2 lg:ml-3"></div>
            </div>
          </div>
        </button>
      )}

      <div className="flex-grow flex items-center justify-center py-8 lg:py-10">
        <h4 className="text-primary font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] leading-[1.1] tracking-tight text-center">
          Clique <br /> e Assista
        </h4>
      </div>
    </div>
  );
}

