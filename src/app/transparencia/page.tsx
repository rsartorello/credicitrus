'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero/Hero';
import Rodape from '@/components/Rodape/Rodape';
import Image from 'next/image';

export default function GerenciamentoRiscosCapitalPage1() {
  const [selectedYearRelatorios, setSelectedYearRelatorios] = useState("2023");
  const [selectedYearNormativos, setSelectedYearNormativos] = useState("2023");

  const [selectedYearGerenciamento, setSelectedYearGerenciamento] = useState("2023");

  // Mock data for testing dynamic rendering
  const relatoriosData: Record<string, string[]> = {
    "2023": ['1T', '2T', '3T', '4T'],
    "2022": ['1T', '2T', '3T', '4T', 'Anual'],
    "2021": ['1T', '2T']
  };

  const normativosData: Record<string, string[]> = {
    "2023": ['1T', '2T', '3T', '4T'],
    "2022": ['Estatuto', 'Regimento Interno'],
    "2021": ['Política de Crédito']
  };

  const gerenciamentoData: Record<string, string[]> = {
    "2023": ['1T', '2T', '3T', '4T'],
    "2022": ['1T', '2T', '3T', '4T'],
    "2021": ['1T', '2T']
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* 1. Hero Section */}
        <Hero 
          backgroundImage="/soltas/hero-risco-capital-1.png"
          titleLines={[
            "GERENCIAMENTO DE",
            "RISCOS E DE CAPITAL",
            "CREDICITRUS"
          ]}
          highlightIndices={[2]}
          buttons={[]}
        />

        {/* 2. Estrutura de Gerenciamento Integrado */}
        <section className="w-full bg-[#f8f9fa] py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1200px]">
            
            {/* Header */}
            <div className="text-center mb-16">
              <h4 className="text-verdecredicitrus font-bold tracking-widest text-sm md:text-base uppercase mb-4">
                TRANSPARÊNCIA
              </h4>
              <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl">
                Estrutura de Gerenciamento Integrado
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              
              {/* Card 1: ASSEMBLEIAS */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm w-full">
                <h3 className="text-primary font-extrabold text-lg md:text-xl mb-8">
                  1. ASSEMBLEIAS
                </h3>
                <div className="text-primary font-normal text-[15px] md:text-base leading-[1.8]">
                  <p className="mb-8">
                    O órgão máximo de deliberação de uma cooperativa é a Assembleia Geral, cujas decisões são tomadas
                    por meio de votações democráticas, nas quais os votos de todos os cooperados têm igual peso,
                    independentemente de tempo de filiação à Cooperativa, capital social e volume de movimentações e
                    operações, entre outros fatores.
                  </p>
                  <p className="mb-8">
                    As decisões aprovadas pela maioria nas assembleias são irrecorríveis e devem ser acatadas por todo o
                    quadro social.
                  </p>
                  <p className="mb-8">
                    As assembleias têm dois formatos:
                  </p>
                  <ul>
                    <li className="flex items-start gap-2 mb-8">
                      <span className="font-bold">•</span>
                      <span>
                        <span className="font-bold">Assembleia Geral Ordinária (AGO)</span>, realizada anualmente para aprovação das contas da Cooperativa, deliberação sobre destinação das sobras e, periodicamente, eleição de membros do Conselho de Administração;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>
                        <span className="font-bold">Assembleia Geral Extraordinária (AGE)</span>, para deliberação sobre outros assuntos, como reforma do Estatuto Social, entre outros.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 2: RELATÓRIOS */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm w-full">
                <h3 className="text-primary font-extrabold text-lg md:text-xl mb-8">
                  2. RELATÓRIOS
                </h3>
                <div className="text-primary font-normal text-[15px] md:text-base leading-[1.8] mb-10">
                  <p className="mb-8">
                    A transparência nas relações com os cooperados tem como principal instrumento os relatórios anuais e
                    semestrais, que apresentam os fatos relevantes ocorridos em cada período focalizado e os balanços
                    contábeis correspondentes, acompanhados das notas explicativas necessárias.
                  </p>
                  <p className="mb-8">
                    Para reportar essas informações, a Credicitrus aplica as normas <span className="font-bold">GRI (Global Reporting Initiative) e SASB (Sustainability Accounting Standard Board)</span>, reconhecidas mundialmente como as mais efetivas para essa finalidade. Segundo as normas GRI, os relatórios devem informar os impactos econômicos, ambientais e sociais das atividades da Cooperativa. As normas SASB preconizam que sejam apontados os fatores ESG que afetam o desempenho da Cooperativa.
                  </p>
                  <p className="mb-8">
                    Outros relatórios complementam esse conjunto, focalizando transparência salarial, Ouvidoria, Canal de
                    Conduta Ética e a Ação Social Cooperada (registro de apoio a entidades sociais anterior à fundação do
                    Instituto Credicitrus).
                  </p>
                  <p>
                    Todos os relatórios permanecem gravados e podem ser baixados ou consultados por todos os
                    cooperados, bastando para isso clicar no botão correspondente abaixo.
                  </p>
                </div>

                {/* Filter and Download */}
                <div className="w-full mt-4 relative z-10">
                  <div className="flex w-full justify-end mb-3">
                    <div className="relative w-auto">
                      <select 
                        value={selectedYearRelatorios}
                        onChange={(e) => setSelectedYearRelatorios(e.target.value)}
                        className="text-white font-bold text-[13px] md:text-[14px] rounded-full py-1.5 pl-5 pr-8 transition-colors cursor-pointer shadow-sm hover:opacity-80 appearance-none outline-none w-auto"
                        style={{ backgroundColor: '#00A79D' }}
                      >
                        {Object.keys(relatoriosData).sort((a,b) => b.localeCompare(a)).map(year => (
                          <option key={year} value={year} style={{ color: '#003641', backgroundColor: '#ffffff' }}>
                            Filtrar: {year}
                          </option>
                        ))}
                      </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                  
                <div className="flex flex-col sm:flex-row items-center justify-between bg-[#003641] rounded-md py-4 px-6 md:px-8 w-full gap-4 sm:gap-0">
                    <span className="text-white font-bold text-[14px] md:text-[15px] w-full sm:w-auto text-left">Baixar Relatórios</span>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-12 md:gap-16 lg:gap-24">
                      {relatoriosData[selectedYearRelatorios]?.map((term) => (
                        <a 
                          href="#" 
                          key={term} 
                          className="font-normal text-[14px] md:text-[15px] transition-colors hover:text-white whitespace-nowrap"
                          style={{ color: '#00A79D' }}
                        >
                          {term}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: NORMATIVOS */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm w-full">
                <h3 className="text-primary font-extrabold text-lg md:text-xl mb-8">
                  3. NORMATIVOS
                </h3>
                <div className="text-primary font-normal text-[15px] md:text-base leading-[1.8] mb-10">
                  <p className="mb-8">
                    As operações e relações da Credicitrus são reguladas por políticas, programas e procedimentos formais
                    expressos em seu Normativos, a começar pelo Estatuto Social, que representa a sua “constituição”,
                    definindo como funciona, é governada e quais são os direitos e responsabilidades dos cooperados, em
                    conformidade com a legislação cooperativista e as normas do Banco Central.
                  </p>
                  <p>
                    Para consultar ou baixar o Normativo de seu interesse, clique no botão correspondente abaixo.
                  </p>
                </div>

                {/* Filter and Download */}
                <div className="w-full mt-4 relative z-10">
                  <div className="flex w-full justify-end mb-3">
                    <div className="relative w-auto">
                      <select 
                        value={selectedYearNormativos}
                        onChange={(e) => setSelectedYearNormativos(e.target.value)}
                        className="text-white font-bold text-[13px] md:text-[14px] rounded-full py-1.5 pl-5 pr-8 transition-colors cursor-pointer shadow-sm hover:opacity-80 appearance-none outline-none w-auto"
                        style={{ backgroundColor: '#00A79D' }}
                      >
                        {Object.keys(normativosData).sort((a,b) => b.localeCompare(a)).map(year => (
                          <option key={year} value={year} style={{ color: '#003641', backgroundColor: '#ffffff' }}>
                            Filtrar: {year}
                          </option>
                        ))}
                      </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                  
                <div className="flex flex-col sm:flex-row items-center justify-between bg-[#003641] rounded-md py-4 px-6 md:px-8 w-full gap-4 sm:gap-0">
                    <span className="text-white font-bold text-[14px] md:text-[15px] w-full sm:w-auto text-left">Baixar Normativos</span>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-12 md:gap-16 lg:gap-24">
                      {normativosData[selectedYearNormativos]?.map((term) => (
                        <a 
                          href="#" 
                          key={term} 
                          className="font-normal text-[14px] md:text-[15px] transition-colors hover:text-white whitespace-nowrap"
                          style={{ color: '#00A79D' }}
                        >
                          {term}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: ÉTICA E INTEGRIDADE */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm w-full">
                <h3 className="text-primary font-extrabold text-lg md:text-xl mb-8">
                  4. ÉTICA E INTEGRIDADE
                </h3>
                <div className="text-primary font-normal text-[15px] md:text-base leading-[1.8]">
                  <p className="mb-8">
                    A confiança é o ativo mais valioso nas relações da Credicitrus com seus associados, colaboradores,
                    parceiros e as comunidades em que está presente. Nesse sentido, em sua conduta, ética é um princípio
                    fundamental, irrecorrível e irrecusável, não uma opção. Está presente nas regras operacionais no dia a
                    dia e no sistema estruturado de prevenção e controle de desvios, sustentado por instrumentos
                    concretos.
                  </p>
                  <p className="mb-8">
                    A Cooperativa é signatária de dois normativos do Sicoob específicos para essa área:
                  </p>
                  <ul className="space-y-2 mb-8" style={{ color: '#00A79D' }}>
                    <li className="font-bold flex gap-2"><span>•</span> Pacto de Ética</li>
                    <li className="font-bold flex gap-2"><span>•</span> Programa de Integridade</li>
                  </ul>
                  
                  <p className="mb-8">
                    Além disso, mantém outros instrumentos internos:
                  </p>
                  <ul className="space-y-2" style={{ color: '#00A79D' }}>
                    <li className="font-bold flex gap-2"><span>•</span> Política de Controles Internos e Conformidade (Compliance)</li>
                    <li className="font-bold flex gap-2"><span>•</span> Política Institucional de Prevenção à Lavagem de Dinheiro e ao Financiamento do Terrorismo</li>
                    <li className="font-bold flex gap-2"><span>•</span> Política de Renovação dos Membros do Conselho de Administração</li>
                    <li className="font-bold flex gap-2"><span>•</span> Política Ambiental</li>
                    <li className="font-bold flex gap-2"><span>•</span> Política de Privacidade e Tratamento de Dados</li>
                    <li className="font-bold flex gap-2"><span>•</span> Política de Segurança Cibernética – Resumo</li>
                    <li className="font-bold flex gap-2"><span>•</span> Política Nacional de Cooperativismo (Lei no 5.764/1971)</li>
                    <li className="font-bold flex gap-2"><span>•</span> Regulamento do Canal de Conduta Ética</li>
                    <li className="font-bold flex gap-2"><span>•</span> Regulamento do Canal de Auditoria</li>
                    <li className="font-bold flex gap-2"><span>•</span> Termos e condições de uso do site</li>
                  </ul>
                </div>
              </div>

              {/* Card 5: PREVENÇÃO A FRAUDES E GOLPES */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm w-full">
                <h3 className="text-primary font-extrabold text-lg md:text-xl mb-8">
                  5. PREVENÇÃO A FRAUDES E GOLPES
                </h3>
                <div className="text-primary font-normal text-[15px] md:text-base leading-[1.8]">
                  <p className="mb-8">
                    A transformação digital trouxe enormes benefícios à sociedade. Mas, em paralelo, criminosos se
                    aproveitam dos avanços da informática para aplicar golpes e cometer fraudes. A Credicitrus mantém
                    uma estrutura robusta de prevenção e controle dessas ameaças e oferece informações detalhadas e
                    ampla orientação para que nenhum cooperado seja vítima da ação de marginais.
                  </p>
                  
                  <p className="font-bold mb-8">Evite os golpes mais comuns:</p>
                  
                  <p className="mb-8">Assista aos vídeos abaixo e conheça como os criminosos agem:</p>

                  {/* Videos Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto mt-12 mb-20">
                    {[
                      { src: '/soltas/1-risco-capital-1.webp', alt: 'Golpe 1' },
                      { src: '/soltas/2-risco-capital-1.webp', alt: 'Golpe 2' },
                      { src: '/soltas/3-risco-capital-1.webp', alt: 'Golpe 3' },
                      { src: '/soltas/4-risco-capital-1.webp', alt: 'Golpe 4' }
                    ].map((video, idx) => (
                      <div 
                        key={idx}
                        className="w-full relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 shadow-xl group"
                      >
                        <Image 
                          src={video.src} 
                          alt={video.alt} 
                          width={800}
                          height={450}
                          className="w-full h-auto object-cover"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
                          <div className="w-14 h-14 md:w-16 md:h-16 bg-[#e3000f] rounded-full flex items-center justify-center border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="font-bold">Dicas gerais de proteção:</p>
                  <p>Saiba como proteger-se seguindo estas dicas:</p>

                  <ul className="space-y-2 mt-4">
                    <li className="flex gap-2"><span>-</span> <span>Não faça compras ou movimentações usando celulares ou computadores de terceiros;</span></li>
                    <li className="flex gap-2"><span>-</span> <span>Não realize movimentações utilizando redes wi-fi de locais públicos como shopping centers e salas de espera de aeroportos;</span></li>
                    <li className="flex gap-2"><span>-</span> <span>Não forneça a ninguém senhas, códigos de validação e/ou segurança de contas correntes e cartões de crédito ou débito;</span></li>
                    <li className="flex gap-2"><span>-</span> <span>Não deixe dados pessoais expostos em redes sociais, como telefone, nome completo, endereço e números de CPF e RG;</span></li>
                    <li className="flex gap-2"><span>-</span> <span>Não faça depósitos ou transferências atendendo a pedidos via WhatsApp ou mensagens por celular, sem ter certeza de quem realmente fez a solicitação, pois pode ser um golpe usando engenharia social, que é a manipulação psicológica de pessoas para obter informações confidenciais ou ações a favor de golpistas. Cuidado com uso de inteligência Artificial, criminosos criam “deepfakes” de vídeo e áudio, clonando a imagem e a voz de qualquer pessoa, a partir de amostras de apenas alguns segundos de mensagens gravadas em redes sociais;</span></li>
                    <li className="flex gap-2"><span>-</span> <span>Não deixe senhas ou dados pessoais salvos em bloco de notas de seu celular ou computador;</span></li>
                    <li className="flex gap-2"><span>-</span> <span>Ative a confirmação em duas etapas para transações e contas em redes sociais;</span></li>
                    <li className="flex gap-2"><span>-</span> <span>Se alguém entrar em contato em nome da Credicitrus ou do Sicoob, relatando um problema em sua conta ou com seu cartão, desconfie. Não forneça informações, não faça qualquer ação solicitada, e procure imediatamente o gerente da sua conta ou uma agência física;</span></li>
                    <li className="flex gap-2"><span>-</span> <span>Nunca clique em links ou arquivos para atualizar seu cadastro ou token, pois essa ação jamais é solicitada por e-mail ou mensagem de texto via celular.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 3. Central de Atendimento */}
        <section className="w-full bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[900px] flex flex-col items-center text-center">
            <h2 className="text-primary font-extrabold text-3xl md:text-4xl mb-8">
              Central de atendimento
            </h2>
            
            <div className="text-primary text-[15px] md:text-base leading-relaxed mb-12 max-w-2xl">
              <p className="mb-6">
                Se você suspeita que tenha sofrido um golpe ou uma fraude<br className="hidden sm:block" />
                entre em contato com a gente.
              </p>
              <p>
                Após o horário comercial (08h às 17:30h) e/ou finais de semana,<br className="hidden sm:block" />
                gentileza acionar o SAC 24h para tratativa, através dos contatos:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
              {/* Card 1 */}
              <div className="bg-[#f8f9fa] rounded-2xl p-8 flex flex-col items-start text-left h-full">
                <h3 className="text-primary font-bold text-lg mb-4">
                  Engenharia Social
                </h3>
                <p className="text-primary text-sm leading-relaxed mb-8">
                  Golpes que são<br />
                  aplicados por terceiros,<br />
                  com o auxílio da<br />
                  própria vítima.
                </p>
                <div className="mt-auto">
                  <p className="text-primary font-bold text-sm">
                    0800 724 4420<br />
                    (Opção 5 – Contestação)
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#f8f9fa] rounded-2xl p-8 flex flex-col items-start text-left h-full">
                <h3 className="text-primary font-bold text-lg mb-4">
                  Cartão
                </h3>
                <div className="mt-auto">
                  <p className="text-primary font-bold text-sm">
                    0800 724 4420<br />
                    (Opção 1 – Cartão)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Gerenciamento e Segurança */}
        <section className="w-full bg-[#f8f9fa] py-16 md:py-24">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1100px]">
            <div className="flex flex-col gap-6 md:gap-8">
              
              {/* Card 6: GERENCIAMENTO DE RISCOS E CAPITAL */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm w-full">
                <h3 className="text-primary font-extrabold text-lg md:text-xl mb-8">
                  6. GERENCIAMENTO DE RISCOS E CAPITAL
                </h3>
                <div className="text-primary font-normal text-[15px] md:text-base leading-[1.8] mb-10">
                  <p className="mb-8">
                    As operações e todas as atividades correlatas realizadas na Credicitrus são cercadas de todos os cuidados
                    para que sejam executadas com total controle dos riscos envolvidos.
                  </p>
                  <p className="mb-8">
                    A Diretoria de Governança, Riscos e Compliance é responsável pela Estrutura de Gerenciamento
                    Integrado de Riscos e de Capital, que se reporta diretamente e de forma independente aos órgãos de
                    governança.
                  </p>
                  <p className="mb-8">
                    Em sua estrutura, mantém o Comitê de Risco, cuja atribuição é assessorar o Conselho de Administração
                    na definição de diretrizes e estratégias de gestão de riscos e de capital, em conformidade com as
                    políticas aplicáveis à Cooperativa.
                  </p>
                  <p>
                    O Comitê de Risco emite trimestralmente Relatórios de Gerenciamento de Riscos, que são documentos
                    públicos e podem ser consultados abaixo:
                  </p>
                </div>

                {/* Filter and Download */}
                <div className="w-full mt-4 relative z-10">
                  <div className="flex w-full justify-end mb-3">
                    <div className="relative w-auto">
                      <select 
                        value={selectedYearGerenciamento}
                        onChange={(e) => setSelectedYearGerenciamento(e.target.value)}
                        className="text-white font-bold text-[13px] md:text-[14px] rounded-full py-1.5 pl-5 pr-8 transition-colors cursor-pointer shadow-sm hover:opacity-80 appearance-none outline-none w-auto"
                        style={{ backgroundColor: '#00A79D' }}
                      >
                        {Object.keys(gerenciamentoData).sort((a,b) => b.localeCompare(a)).map(year => (
                          <option key={year} value={year} style={{ color: '#003641', backgroundColor: '#ffffff' }}>
                            Filtrar: {year}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-[#003641] rounded-md py-4 px-6 md:px-8 w-full gap-4 sm:gap-0">
                    <span className="text-white font-bold text-[14px] md:text-[15px] w-full sm:w-auto text-left">Baixar Normativos</span>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-12 md:gap-16 lg:gap-24">
                      {gerenciamentoData[selectedYearGerenciamento]?.map((term) => (
                        <a 
                          href="#" 
                          key={term} 
                          className="font-normal text-[14px] md:text-[15px] transition-colors hover:text-white whitespace-nowrap"
                          style={{ color: '#00A79D' }}
                        >
                          {term}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 7: SEGURANÇA E PRIVACIDADE */}
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm w-full">
                <h3 className="text-primary font-extrabold text-lg md:text-xl mb-8">
                  7. SEGURANÇA E PRIVACIDADE
                </h3>
                <div className="text-primary font-normal text-[15px] md:text-base leading-[1.8]">
                  <p className="mb-8">
                    A Credicitrus mantém, no conjunto de seus Normativos, regras constantemente revistas e atualizadas,
                    para que a gestão dos recursos dos cooperados seja realizada com o mais alto grau de segurança e
                    privacidade.
                  </p>
                  <p>
                    Esses cuidados incluem, com destaque, o uso dos mais modernos recursos tecnológicos para neutralizar
                    ataques cibernéticos e treinamento das equipes para rigoroso cumprimento da Lei Geral de Proteção de
                    Dados Pessoais (LGPDP), no que se refere a coleta, tratamento, armazenamento e compartilhamento,
                    tanto em meios físicos quanto digitais, de informações dos cooperados e das operações realizadas.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Rodape />
    </div>
  );
}
