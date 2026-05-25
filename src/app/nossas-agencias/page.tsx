'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import AgenciasMap from "@/components/AgenciasMap/AgenciasMap";

export default function NossasAgenciasPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-nossas-agencias.webp"
          titleLines={["NOSSAS", "AGÊNCIAS"]}
          highlightIndices={[1]}
          subtitleColor="secondary"
        />

        <AgenciasMap />

        {/* Seção de Horário de Atendimento */}
        <section className="w-full bg-white py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12">
            <div className="w-full max-w-[700px] mx-auto grid grid-cols-1 md:grid-cols-2 items-start gap-8">

              {/* Título */}
              <div className="flex flex-col items-center md:items-start md:pr-4">
                <h2 className="text-center md:text-left text-[#003641] text-4xl lg:text-[2.75rem] font-bold leading-[1.15] tracking-tight">
                  Horário de<br />
                  atendimento<br />
                  nas agências
                </h2>
              </div>

              {/* Informações */}
              <div className="flex flex-col items-center md:items-start md:pl-4">
                <p className="text-center md:text-left text-[#004f59] text-lg md:text-xl font-medium mb-3 leading-snug">
                  De segunda a sexta, das<br />
                  8h00 às 16h00.
                </p>
                <p className="text-center md:text-left text-gray-400 text-sm font-medium leading-tight">
                  *Horários sujeitos a alteração<br />
                  em feriados e datas especiais.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Rodape />
    </div>
  );
}
