import React from 'react';
import Hero from '@/components/Hero/Hero';
import Rodape from '@/components/Rodape/Rodape';
import Button from '@/components/ui/Button';
import { FileText, Download } from 'lucide-react';
import { getEticaCards } from '@/lib/cms';
import { eticaFallback } from '@/data/etica-fallback';

export default async function EticaEIntegridadePage() {
  const documentCards = await getEticaCards(eticaFallback);
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* 1. Hero Section */}
        <Hero
          backgroundImage="/soltas/hero-transparencia-etica-e-integridade.webp"
          titleLines={["ÉTICA E", "INTEGRIDADE"]}
          highlightIndices={[1]}
          buttons={[]}
        />

        {/* 2. Diretrizes e Documentos Oficiais */}
        <section className="w-full py-20 md:py-32 bg-[#f8f9fa]">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px]">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight tracking-tight mb-8">
                Diretrizes e Documentos Oficiais
              </h2>
              <p className="text-primary text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-6 font-normal">
                Na Credicitrus, ética não é apenas diretriz: é prática diária. <br className="hidden md:block" />
                Este espaço reúne os principais documentos que orientam nossa conduta, <br className="hidden md:block" />
                conformidade e relacionamento com públicos interno e externo.
              </p>
              <p className="text-primary font-extrabold text-lg md:text-xl">
                Clique no documento para acessar.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-5 gap-4">
              {documentCards.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#003641] rounded-[2rem] p-6 lg:p-8 flex flex-col h-full text-white hover:bg-[#004a59] transition-all duration-300 group cursor-pointer shadow-xl min-h-[500px]"
                >
                  <div className="mb-6 lg:mb-10">
                    <FileText className="w-8 h-8 text-[#00a99d]" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-base lg:text-lg font-bold leading-snug mb-4">
                    {doc.title}
                  </h3>

                  <p className="text-xs lg:text-sm text-white/80 font-light leading-relaxed mb-8">
                    {doc.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between text-[#00a99d] font-normal text-sm lg:text-base">
                    <span>Baixar</span>
                    <Download className="w-5 h-5 text-[#00a99d] group-hover:translate-y-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Canal de Conduta Ética */}
        <section className="w-full py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px] text-center">
            <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight tracking-tight mb-8">
              Canal de Conduta Ética
            </h2>
            <p className="text-primary text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-4xl mx-auto">
              Canal para registrar ocorrências éticas ou dúvidas sobre o Pacto de <br className="hidden md:block" />
              Ética/Programa de Integridade. É possível se identificar ou optar por anonimato, <br className="hidden md:block" />
              observando as Regras do Regulamento.
            </p>

            <Button href="https://www.contatoseguro.com.br/credicitrus" variant="secondary" size="lg" className="px-12 md:px-16 mb-8 uppercase">
              ACESSAR O CANAL DE CONDUTA ÉTICA
            </Button>

            <p className="text-primary/50 text-xs md:text-sm font-normal mt-4">
              *O canal é regido pelo Regulamento do Canal de Conduta Ética e pelas diretrizes do Sistema Sicoob
            </p>
          </div>
        </section>

      </main>
      <Rodape />
    </div>
  );
}
