import React from 'react';
import Hero from '@/components/Hero/Hero';
import Rodape from '@/components/Rodape/Rodape';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { getNormativosList } from '@/lib/cms';
import { normativosFallback } from '@/data/normativos-fallback';

export default async function NormativosCredicitrusPage() {
  const documents = await getNormativosList(normativosFallback);
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* 1. Hero */}
        <Hero
          backgroundImage="/soltas/hero-transparencia-normativos.webp"
          titleLines={["NORMATIVOS", "CREDICITRUS"]}
          highlightIndices={[1]}
          buttons={[]}
        />

        {/* 2. Documentos Oficiais */}
        <Section background="gray" padding="lg">
          <Container size="narrow">

            <SectionHeader
              subtitle="NORMATIVOS"
              title="Documentos Oficiais"
              description={
                <div className="text-[15px] md:text-base leading-relaxed max-w-2xl mx-auto space-y-6">
                  <p>
                    Na Credicitrus, transparência e responsabilidade fazem parte da nossa essência
                    cooperativista. Nesta página, você encontra normativos, políticas, regulamentos e
                    documentos oficiais que orientam a atuação da Cooperativa, garantindo
                    segurança, conformidade e clareza em cada processo.
                  </p>
                  <p>
                    Aqui, reunimos materiais essenciais para que cooperados, parceiros e interessados
                    possam consultar, compreender e acompanhar as normas que sustentam nossa
                    governança e fortalecem a confiança no relacionamento com a Credicitrus.
                  </p>
                  <p className="font-bold text-xl md:text-2xl pt-4">
                    Clique no documento para acessar.
                  </p>
                </div>
              }
            />

            <div className="flex flex-col w-full gap-4 max-w-2xl mx-auto mt-8">
              {documents.map((doc, idx) => {
                const isPdf = doc.link.endsWith('.pdf') || doc.link.includes('/files/');
                return (
                  <div
                    key={idx}
                    className="relative group flex items-center justify-between bg-white rounded-2xl shadow-sm px-6 py-4 w-full gap-6 min-h-[96px] transition-all duration-200 hover:bg-[#f0fdfb] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,167,157,0.12)]"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0 text-[#00A79D]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="8" y1="13" x2="16" y2="13" />
                          <line x1="8" y1="17" x2="16" y2="17" />
                          <line x1="8" y1="9" x2="10" y2="9" />
                        </svg>
                      </div>
                      <span className="text-primary text-[12px] md:text-[13px] font-bold leading-snug">
                        {doc.name}
                      </span>
                    </div>
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 flex-shrink-0 text-[#00A79D] after:content-[''] after:absolute after:inset-0"
                    >
                      <span className="font-normal text-base">{isPdf ? 'Baixar' : 'Acessar'}</span>
                      {isPdf ? (
                        <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </a>
                  </div>
                );
              })}
            </div>

          </Container>
        </Section>
      </main>
      <Rodape />
    </div>
  );
}
