import React from 'react';
import Hero from '@/components/Hero/Hero';
import Rodape from '@/components/Rodape/Rodape';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';

const documents = [
  { name: "Estatuto Social", link: "/files/transparencia/normativos/Estatuto-Social-Aprovado-pela-AGE-16.4.2025.pdf" },
  { name: "Lei nº 5.764/1971", link: "https://www.planalto.gov.br/ccivil_03/leis/l5764.htm" },
  { name: "Lei Complementar nº 130/2005", link: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp130.htm" },
  { name: "Regulamento do Canal de Conduta Ética", link: "/files/transparencia/normativos/Regulamento-do-Canal-de-Conduta-Etica-27112025.pdf" },
  { name: "Política Institucional de Responsabilidade Social, Ambiental e Climática do Sicoob", link: "/files/transparencia/normativos/Politica-Institucional-de-PRSAC.pdf" },
  { name: "Resumo da Política de Segurança Cibernética", link: "/files/transparencia/normativos/84.-POLITICA-DE-SEGURANCA-CIBERNETICA-1-1.pdf" },
  { name: "Lei 12.741/12 - Tabela do Custo Tributário", link: "/files/transparencia/normativos/Lei1274112-Tabela-do-Custo-Tributario.pdf" },
  { name: "Política de Privacidade e Tratamento de Dados", link: "/files/transparencia/normativos/AVISO-DE-PRIVACIDADE-E-TRATAMENTO-DE-DADOS-CREDICITRUS.pdf" },
  { name: "Código de Conduta Ética, de Segurança da Informação e Segurança Cibernética para terceiros e prestadores de serviços", link: "/files/transparencia/normativos/Codigo-de-Conduta-Etica_-de-Seguranca-da-Informacao-e-Seguranca-Cibernetica-para-Terceiros-e-Prestadores-de-Servicos-22.pdf" },
  { name: "Regulamento do Comitê de Auditoria", link: "/files/transparencia/normativos/Regulamento-do-Comite-de-Auditoria-377.pdf" },
  { name: "Pacto de Ética Sicoob", link: "/files/transparencia/normativos/Pacto-de-Etica-do-Sicoob-versao-02.09.2025-1.pdf" },
  { name: "Termos e Condições de Uso do Site", link: "/files/transparencia/normativos/TERMOS-E-CONDICOES-DE-USO-DO-SITE-INSTITUCIONAL.pdf" },
  { name: "Política de Controles Internos e Conformidade [Compliance]", link: "/files/transparencia/normativos/Politica-de-Controles-Internos-e-Conformidade-20042026.pdf" },
  { name: "Programa de Integridade", link: "/files/transparencia/normativos/Programa-de-Integridade-Sicoob-3.pdf" },
  { name: "Política Institucional de Prevenção à Lavagem de Dinheiro e ao Financiamento do Terrorismo", link: "/files/transparencia/normativos/Politica-Institucional-de-PLDFT.pdf" },
  { name: "Política Ambiental", link: "/files/transparencia/normativos/Politica-Institucional-de-PRSAC.pdf" },
  { name: "Política de Renovação dos Membros do Conselho de Administração", link: "/files/transparencia/normativos/Politica-de-Renovacao-dos-Membros-do-Conselho-de-Administracao-765.pdf" }
];

export default function NormativosCredicitrusPage() {
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
              {documents.map((doc, idx) => (
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
                    <span className="font-normal text-base">Baixar</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>

          </Container>
        </Section>
      </main>
      <Rodape />
    </div>
  );
}
