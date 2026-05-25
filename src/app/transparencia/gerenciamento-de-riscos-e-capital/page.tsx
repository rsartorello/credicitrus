'use client';

import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import Hero from '@/components/Hero/Hero';
import Rodape from '@/components/Rodape/Rodape';

export default function GerenciamentoRiscosCapitalPage2() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* 1. Hero */}
        <Hero
          backgroundImage="/soltas/hero-transparencia-gerenciamento-de-riscos-e-capital.jpg"
          titleLines={[
            "GERENCIAMENTO DE",
            "RISCOS E DE CAPITAL",
            "CREDICITRUS"
          ]}
          highlightIndices={[2]}
          subtitleColor="secondary"
          mirrorImage={false}
          buttons={[]}
        />

        {/* 2. Estrutura de Gerenciamento Integrado */}
        <section className="w-full bg-[#f8f9fa] py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1100px]">

            {/* Header */}
            <div className="text-center mb-16">
              <h4 className="text-verdecredicitrus font-bold tracking-widest text-sm md:text-base uppercase mb-4">
                TRANSPARÊNCIA
              </h4>
              <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl">
                Estrutura de Gerenciamento Integrado
              </h2>
            </div>

            <div className="flex flex-col gap-6 md:gap-8 mb-16">
              {/* Card 1 */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm w-full">
                <div className="text-primary font-normal text-[15px] md:text-base leading-[1.8]">
                  <p className="mb-6">
                    Na Credicitrus, a Diretoria de Governança, Riscos e Compliance é responsável pela estrutura de Gerenciamento
                    Integrado de Riscos e de Capital, com reporte direto e independente aos órgãos de governança. A Credicitrus
                    mantém em sua estrutura de Governança Corporativa e Gestão o Comitê de Riscos, que tem por atribuição
                    assessorar o Conselho de Administração na definição de diretrizes e estratégias relativas ao gerenciamento de
                    riscos e de capital, visando o cumprimento e a observância de políticas aplicáveis à Instituição. A estrutura de
                    Gerenciamento Integrado de Riscos e de Capital da Credicitrus é compatível com o modelo de negócio, a
                    natureza das operações e a complexidade dos produtos, serviços, atividades e processos da instituição,
                    proporcionais à dimensão e relevância dos riscos aos quais a Cooperativa está exposta, de forma a assegurar o
                    seu efetivo gerenciamento.
                  </p>
                  <p>
                    Destaca-se que a Credicitrus está atenta às melhores práticas de gestão de mercado para o desenvolvimento de
                    suas atividades e, não poderia ser diferente, ao gerenciamento de riscos corporativos. Portanto, a seguir, de forma
                    sintetizada, são apresentadas as 3 linhas de gestão existentes, que objetivam prover melhor comunicação e
                    esclarecimento quanto aos papéis e responsabilidades essenciais no gerenciamento integrado de riscos.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm w-full">
                <div className="text-primary font-normal text-[15px] md:text-base leading-[1.8]">
                  <p className="mb-8">
                    Em atendimento ao Artigo 57 da Resolução CMN 4557/2017, constam a seguir as atribuições do Comitê de
                    Riscos, instituído em 29/06/2022, que tem como objetivo assessorar o Conselho de Administração na definição
                    de diretrizes e estratégias relativas ao gerenciamento de riscos e de capital:
                  </p>

                  <ul className="space-y-6">
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Propor, com periodicidade mínima anual, recomendações ao Conselho de Administração sobre: as políticas, as estratégias e os limites de gerenciamento de riscos, que estabeleçam limites e procedimentos destinados a manter a exposição aos riscos em conformidade com os níveis fixados na RAS - Declaração de Apetite por Riscos; as políticas e as estratégias de gerenciamento de capital, que estabeleçam procedimentos destinados a manter o PR – Patrimônio de Referência, o Nível I e o Capital Principal, de que trata a Resolução CMN 4.192/2013, em níveis compatíveis com os riscos incorridos e com o requerimento mínimo regulamentar; o programa de testes de estresse; as políticas e estratégias para gestão de continuidade de negócios; o Plano de Contingência de Liquidez; o Plano de Capital; o Plano de Contingência de Capital; a política de divulgação de informações que evidenciem o atendimento de requerimentos prudenciais pela Cooperativa, conforme detalhamento a ser estabelecido pelo BCB; e, as políticas para determinar quais instrumentos serão incluídos na carteira de negociação, bem como procedimentos para garantir que os critérios de classificação nessa carteira sejam observados de maneira consistente;</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Avaliar os níveis de apetite por riscos fixados na RAS e as estratégias para o seu gerenciamento, considerando os riscos individualmente e de forma integrada;</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Supervisionar a atuação e o desempenho da Diretoria de Governança, Riscos e Compliance (CRO), relativo ao gerenciamento de riscos e de capital; II Supervisionar a observância, pela Diretoria Executiva, dos termos da RAS;</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Avaliar o grau de aderência dos processos da estrutura de gerenciamento de riscos às políticas estabelecidas;</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Coordenar suas atividades com o Comitê de Auditoria, de modo a facilitar a troca de informação, os ajustes necessários à estrutura de governança de riscos e o efetivo tratamento dos riscos a que a cooperativa está exposta;</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Apreciar os relatórios elaborados pela gerência responsável pela área de Riscos;</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Apreciar os relatórios semestrais, com datas-bases de 30 de junho e 31 de dezembro, elaborados pelo diretor responsável pelo compartilhamento Open Finance, referente aos dados e serviços em que a Cooperativa estiver envolvida;</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Apreciar o relatório anual sobre a implementação do plano de ação e de resposta a incidentes visando à implementação da política de segurança cibernética, com data-base 31 de dezembro;</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Reunir-se com o Conselho de Administração, mediante convocação deste, no mínimo semestralmente, para, dentre outras matérias eventualmente pertinentes, discutir acerca de políticas, práticas e procedimentos identificados no âmbito das suas respectivas competências;</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold">•</span>
                      <span>Além das responsabilidades citadas, compete aos membros do Comitê de Riscos em conjunto ao Conselho de Administração, a Diretoria de Governança, Riscos e Compliance e os demais membros da Diretoria Executiva: compreender, de forma abrangente e integrada, os riscos que podem impactar o capital e a liquidez da Cooperativa; entender as limitações das informações constantes dos relatórios gerenciais de que tratam o Art. 7o-X e Art. 40-VII da Resolução CMN 4.557/2017, e dos reportes relativos ao gerenciamento de riscos e de capital; fixar os níveis de apetite por riscos na RAS e revisá-los; garantir que o conteúdo da RAS seja observado pela Cooperativa; entender as limitações e as incertezas relacionadas à avaliação dos riscos, aos modelos, mesmo quando desenvolvidos por terceiros, e às metodologias utilizadas na estrutura de gerenciamento de riscos; e, assegurar o entendimento e o contínuo monitoramento dos riscos pelos diversos níveis da cooperativa;</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Download Blocks Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

              {/* Block 1 */}
              <a href="#" className="group bg-primary rounded-[2rem] p-6 md:p-10 flex flex-col items-start justify-between min-h-[280px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex flex-col items-start">
                  <div className="bg-[#00a99d]/10 rounded-xl p-3 mb-8">
                    <FileText className="w-8 h-8 text-[#00a99d]" />
                  </div>
                  <h3 className="text-white font-extrabold text-xl md:text-[1.35rem] leading-snug whitespace-pre-line">{`RELATÓRIO\nDE PILAR 3`}</h3>
                  <p className="text-white/70 text-sm mt-2">Gerenciamento de Riscos</p>
                </div>
                <div className="flex items-center gap-2 text-[#00a99d] font-bold text-lg mt-8 group-hover:gap-4 transition-all">
                  Baixar <ChevronRight className="w-5 h-5" />
                </div>
              </a>

              {/* Block 2 */}
              <a href="#" className="group bg-primary rounded-[2rem] p-6 md:p-10 flex flex-col items-start justify-between min-h-[280px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex flex-col items-start">
                  <div className="bg-[#00a99d]/10 rounded-xl p-3 mb-8">
                    <FileText className="w-8 h-8 text-[#00a99d]" />
                  </div>
                  <h3 className="text-white font-extrabold text-xl md:text-[1.35rem] leading-snug whitespace-pre-line">{`ANEXOS\nPILAR 3`}</h3>
                  <p className="text-white/70 text-sm mt-2">Gerenciamento de Riscos</p>
                </div>
                <div className="flex items-center gap-2 text-[#00a99d] font-bold text-lg mt-8 group-hover:gap-4 transition-all">
                  Baixar <ChevronRight className="w-5 h-5" />
                </div>
              </a>

              {/* Block 3 */}
              <a href="#" className="group bg-primary rounded-[2rem] p-6 md:p-10 flex flex-col items-start justify-between min-h-[280px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex flex-col items-start">
                  <div className="bg-[#00a99d]/10 rounded-xl p-3 mb-8">
                    <FileText className="w-8 h-8 text-[#00a99d]" />
                  </div>
                  <h3 className="text-white font-extrabold text-xl md:text-[1.35rem] leading-snug whitespace-pre-line">{`RELATÓRIO\nDE GRSAC`}</h3>
                  <p className="text-white/70 text-sm mt-2 whitespace-pre-line">{`Riscos e Oportunidades\nSociais, Ambientais\ne Clim\u00e1ticas`}</p>
                </div>
                <div className="flex items-center gap-2 text-[#00a99d] font-bold text-lg mt-8 group-hover:gap-4 transition-all">
                  Baixar <ChevronRight className="w-5 h-5" />
                </div>
              </a>

            </div>
          </div>
        </section>



      </main>
      <Rodape />
    </div>
  );
}
