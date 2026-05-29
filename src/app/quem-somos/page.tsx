'use client';

import React from 'react';
import Link from 'next/link';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";

const comparativos = [
  {
    banco: "Um banco ou uma instituição financeira tradicional pertence aos seus sócios, em geral um pequeno grupo de investidores, detentores do poder de decisão na organização",
    coop: "Uma cooperativa de crédito também pertence aos sócios, mas estes são todos os cooperados, que são ao mesmo tempo coproprietários e usuários/beneficiários da organização."
  },
  {
    banco: "O objetivo do banco é obter o máximo lucro sobre o capital investido, mediante cobrança de juros, tarifas e outros encargos sobre as operações e movimentações dos clientes.",
    coop: "O objetivo da cooperativa não é o lucro, mas proporcionar aos associados acesso aos produtos e serviços financeiros disponíveis no mercado com vantagens iguais para todos."
  },
  {
    banco: "O banco tem clientes.",
    coop: "A cooperativa tem sócios."
  },
  {
    banco: "Nos bancos, os clientes não têm poder de decisão: utilizam os produtos e serviços oferecidos e pagam os preços e encargos fixados.",
    coop: "No modelo cooperativista, prevalece a ajuda mútua. As decisões, as vantagens, os custos e as responsabilidades são compartilhados."
  },
  {
    banco: "Para tornar-se cliente do banco, o interessado deve abrir uma conta corrente ou de poupança e fazer o depósito inicial exigido, tendo com isso direito a fazer movimentações.",
    coop: "Para utilizar os produtos e serviços financeiros da cooperativa, o interessado deve primeiro associar-se. Com isso, terá acesso a todas as vantagens do modelo cooperativista."
  }
];

export default function QuemSomosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-[#f8f9fa]">
        {/* Hero Section */}
        <Hero
          backgroundImage="/soltas/hero-quem-somos.webp"
          titleLines={["A CREDICITRUS"]}
          highlightIndices={[0]}
          buttons={[]}
        />

        {/* Diferenciais / Grid Cards Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">
            <AnimateIn className="mb-12 md:mb-16">
              <SectionHeader
                subtitle="QUEM SOMOS"
                title="Cooperativa financeira de livre admissão, aberta ao ingresso de pessoas físicas e jurídicas de quaisquer categorias"
                description="Aqui na Credicitrus, oferecemos aos cooperados toda a diversidade de produtos e serviços do sistema financeiro, porém com as vantagens únicas do cooperativismo"
              />
            </AnimateIn>

            {/* 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                <span key="1">Economia em <br /> juros e tarifas</span>,
                <span key="2">Participação <br /> nos resultados</span>,
                <span key="3">Valorização contínua <br /> do capital social</span>,
                <span key="4">Benefícios para <br /> as comunidades</span>
              ].map((item, idx) => (
                <AnimateIn key={idx} delay={0.15 * idx} className="h-full">
                  <div className="bg-[#003641] text-white rounded-[2rem] p-8 md:p-10 flex items-center justify-center text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full min-h-[140px]">
                    <h3 className="font-extrabold text-[1.25rem] md:text-[1.4rem] lg:text-[1.5rem] leading-snug">
                      {item}
                    </h3>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Propósito, Missão, Visão e Valores Section */}
        <section className="py-20 md:py-28 bg-[#003641] text-white">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl">
            <AnimateIn className="mb-16 md:mb-20">
              <SectionHeader
                variant="white"
                subtitle="DNA CREDICITRUS"
                title={<>Conheça mais sobre nosso <br /> propósito, missão, visão e valores.</>}
                description="Além disso, saiba como é nossa estrutura de governança"
                subtitleClassName="!text-[#8fb534]"
              />
            </AnimateIn>

            {/* Grid 2 columns (exact layout from mockup) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto">
              {[
                {
                  title: "NOSSO PROPÓSITO",
                  text: "Somar forças para gerar prosperidade, transformar vidas e desenvolver a comunidade."
                },
                {
                  title: "NOSSA VISÃO",
                  text: "Ser excelência no atendimento fundamentada nos princípios do cooperativismo."
                },
                {
                  title: "NOSSA MISSÃO",
                  text: "Atender as necessidades dos cooperados com soluções financeiras inovadoras e confiáveis estimulando a economia colaborativa e contribuindo para o desenvolvimento da comunidade."
                },
                {
                  title: "NOSSOS VALORES",
                  text: "Constituem-se na base ética da Sicoob Credicitrus, em seu relacionamento com os públicos interno e externo: Responsabilidade social, Transparência, Diversidade, Inovação e Solidez."
                }
              ].map((item, idx) => (
                <AnimateIn key={idx} delay={0.1 * idx} className="flex flex-col">
                  <div className="flex flex-col justify-start">
                    <h4 className="text-white font-extrabold text-[0.85rem] tracking-widest mb-3 uppercase opacity-90">
                      {item.title}
                    </h4>
                    <p className="text-white font-light italic text-[1.1rem] md:text-[1.2rem] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Comparativo de Diferenciais Section */}
        <section id="diferenciais" className="py-16 md:py-24 scroll-mt-36">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-6xl">
            <AnimateIn className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-lg border border-gray-100">
              <div className="mb-12 text-left">
                <p className="text-[#003641] font-bold text-base md:text-lg uppercase mb-3 tracking-wider">
                  1. NOSSOS DIFERENCIAIS
                </p>
                <p className="text-[#003641] font-regular text-sm md:text-base leading-relaxed">
                  Cooperativas de crédito e bancos se parecem nos produtos e serviços que oferecem e na aparência de suas instalações, mas são modelos de negócios distintos. As diferenças explicam o sucesso do cooperativismo no mundo
                </p>
              </div>

              <div className="grid grid-cols-2 divide-x divide-gray-100">
                {/* Header Row */}
                <div className="px-2 md:px-6 pb-6 border-b border-gray-100 text-[#003641] font-extrabold text-[0.8rem] md:text-[0.95rem] uppercase tracking-wider text-center">
                  Bancos e Instituições<br />Financeiras Tradicionais
                </div>
                <div className="px-2 md:px-6 pb-6 border-b border-gray-100 text-[#003641] font-extrabold text-[0.8rem] md:text-[0.95rem] uppercase tracking-wider text-center">
                  Cooperativas<br />de Crédito
                </div>

                {/* Rows */}
                {comparativos.map((item, idx) => {
                  const isLast = idx === comparativos.length - 1;
                  const borderClass = isLast ? '' : 'border-b border-gray-100';
                  return (
                    <React.Fragment key={idx}>
                      {/* Banco */}
                      <div className={`px-2 md:px-6 py-8 flex items-center text-left ${borderClass}`}>
                        <p className="text-[#003641] font-regular text-[0.8rem] md:text-sm lg:text-base leading-relaxed">
                          {item.banco}
                        </p>
                      </div>

                      {/* Cooperativa */}
                      <div className={`px-2 md:px-6 py-8 flex items-center text-left ${borderClass}`}>
                        <p className="text-[#003641] font-regular text-[0.8rem] md:text-sm lg:text-base leading-relaxed">
                          {item.coop}
                        </p>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* História e Governança Section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-6xl">
            <AnimateIn className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-lg border border-gray-100 flex flex-col gap-12 text-[#003641]">
              {/* Capital Social */}
              <div className="text-left">
                <h3 className="font-bold text-base md:text-lg uppercase mb-6 tracking-wider">
                  CAPITAL SOCIAL FAZ A DIFERENÇA
                </h3>
                <p className="font-regular text-sm md:text-base leading-relaxed mb-6">
                  Para tornar-se cliente de um banco e poder fazer movimentações financeiras, o interessado deve abrir uma conta, efetuando o depósito inicial exigido. Já para utilizar os produtos e serviços de uma cooperativa de crédito, o interessado deve associar-se, integralizando um número mínimo de cotas de capital. Assim, torna-se coproprietário da cooperativa, passando a usufruir todas as soluções e vantagens oferecidas.
                </p>
                <p className="font-regular text-sm md:text-base leading-relaxed mb-6">
                  As quotas de capital integralizadas compõem o capital social do cooperado, um bem que lhe pertence, é corrigido anualmente, recebe parte das sobras distribuídas e pode ser acrescido com novos aportes a qualquer momento.
                </p>
                <p className="font-regular text-sm md:text-base leading-relaxed">
                  O capital social representa uma reserva financeira para o futuro do cooperado. Nesse sentido, a Credicitrus foi pioneira ao criar um benefício adicional: o cooperado pode resgatar seu capital social em parcelas após completar 65 anos, desde que seja associado há pelo menos 10 anos, funcionando como uma aposentadoria suplementar.
                </p>
              </div>

              {/* Governança */}
              <div id="governanca" className="text-left mt-6 scroll-mt-36">
                <h3 className="font-bold text-base md:text-lg uppercase mb-6 tracking-wider">
                  2. ESTRUTURA DE GOVERNANÇA
                </h3>
                <p className="font-regular text-sm md:text-base leading-relaxed mb-6">
                  Para tornar-se cliente de um banco e poder fazer movimentações financeiras, o interessado deve abrir uma conta, efetuando o depósito inicial exigido. Já para utilizar os produtos e serviços de uma cooperativa de crédito, o interessado deve associar-se, integralizando um número mínimo de cotas de capital. Assim, torna-se coproprietário da cooperativa, passando a usufruir todas as soluções e vantagens oferecidas.
                </p>
                <p className="font-regular text-sm md:text-base leading-relaxed mb-6">
                  As quotas de capital integralizadas compõem o capital social do cooperado, um bem que lhe pertence, é corrigido anualmente, recebe parte das sobras distribuídas e pode ser acrescido com novos aportes a qualquer momento.
                </p>
                <p className="font-regular text-sm md:text-base leading-relaxed mb-6">
                  O capital social representa uma reserva financeira para o futuro do cooperado. Nesse sentido, a Credicitrus foi pioneira ao criar um benefício adicional: o cooperado pode resgatar seu capital social em parcelas após completar 65 anos, desde que seja associado há pelo menos 10 anos, funcionando como uma aposentadoria suplementar.
                </p>
                <p className="font-regular text-sm md:text-base leading-relaxed mb-6">
                  A estrutura de governança é composta pelos seguintes órgãos:
                </p>

                <div className="flex flex-col gap-6">
                  <p className="font-regular text-sm md:text-base leading-relaxed">
                    <span className="font-bold">Conselho de Administração</span>, eleito pelos cooperados em Assembleia Geral Ordinária, com mandato de quatro anos, responsável pela formulação das diretrizes estratégicas da Cooperativa;
                  </p>
                  <p className="font-regular text-sm md:text-base leading-relaxed">
                    <span className="font-bold">Diretoria Executiva</span>, contratada pelo Conselho de Administração, com a responsabilidade de conduzir as operações da Cooperativa de acordo com as diretrizes definidas no planejamento estratégico;
                  </p>
                  <p className="font-regular text-sm md:text-base leading-relaxed">
                    <span className="font-bold">Comitê de Auditoria</span>, órgão independente ligado ao Conselho de Administração, com a função de reforçar a governança, a transparência e a confiabilidade das informações, atuando como elo técnico entre a administração, os auditores internos e externos e os órgãos de fiscalização;
                  </p>
                  <p className="font-regular text-sm md:text-base leading-relaxed">
                    <span className="font-bold">Coordenadores Institucionais de Relacionamento</span> – representam uma inovação na estrutura de governança da Credicitrus. Trata-se de uma função auxiliar não remunerada, exercida por cooperados eleitos pelos respectivos Postos de Atendimento, com a missão de disseminar o cooperativismo, sua doutrina e seus princípios, além de promover o estreitamento das relações entre os associados e a Cooperativa.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Governança Membros e Sustentabilidade Section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-6xl">
            <AnimateIn className="flex flex-col gap-12 text-[#003641] mb-16 px-4 md:px-12">
              {/* Conselho de Administração */}
              <div>
                <h3 className="font-bold text-base md:text-lg uppercase mb-6 tracking-wider text-[#003641]">
                  CONSELHO DE ADMINISTRAÇÃO
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-12">
                  <div>
                    <p className="font-bold text-base text-[#003641]">Marcos Lourenço Santin</p>
                    <p className="text-sm text-secondary font-medium">Presidente</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Maria Tereza de Souza Lima Uchôa</p>
                    <p className="text-sm text-secondary font-medium">Vice-presidente</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Claudemir Strachicini</p>
                    <p className="text-sm text-secondary font-medium">Membro vogal</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Eduardo Noriyuki Yamada</p>
                    <p className="text-sm text-secondary font-medium">Membro vogal</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Glaucia Oliveira Perri Santos</p>
                    <p className="text-sm text-secondary font-medium">Membro vogal</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Maria Áurea Trindade Lopes Poleselli</p>
                    <p className="text-sm text-secondary font-medium">Membro vogal</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Maria Madalena Fernandes Rocha</p>
                    <p className="text-sm text-secondary font-medium">Membro vogal</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Marcelo Martins</p>
                    <p className="text-sm text-secondary font-medium">Membro vogal</p>
                  </div>
                </div>
              </div>

              {/* Diretoria Executiva */}
              <div className="mt-4">
                <h3 className="font-bold text-base md:text-lg uppercase mb-6 tracking-wider text-[#003641]">
                  DIRETORIA EXECUTIVA
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-12">
                  <div>
                    <p className="font-bold text-base text-[#003641]">Walmir Fernandes Segatto</p>
                    <p className="text-sm text-secondary font-medium">Diretor-presidente Executivo</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Denise Almeida</p>
                    <p className="text-sm text-secondary font-medium">Diretora Administrativa</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Fábio Rodrigues Fernandes</p>
                    <p className="text-sm text-secondary font-medium">Diretor de Negócios</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Jonas Ferreira</p>
                    <p className="text-sm text-secondary font-medium">Diretor de Governança, Riscos e Compliance</p>
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#003641]">Wagner Aparecido Alquas</p>
                    <p className="text-sm text-secondary font-medium">Diretor Financeiro</p>
                  </div>
                </div>
              </div>

              {/* Comitê de Auditoria */}
              <div className="mt-4">
                <h3 className="font-bold text-base md:text-lg uppercase mb-6 tracking-wider text-[#003641]">
                  COMITÊ DE AUDITORIA
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-12">
                  <div>
                    <p className="font-bold text-base text-[#003641]">Maria Madalena Fernandes Rocha</p>
                    <p className="text-sm text-secondary font-medium">Coordenadora</p>
                  </div>
                </div>
              </div>

              {/* Coordenadores Institucionais de Relacionamento */}
              <div className="mt-4">
                <h3 className="font-bold text-base md:text-lg uppercase mb-6 tracking-wider text-[#003641]">
                  COORDENADORES INSTITUCIONAIS DE RELACIONAMENTO
                </h3>
                <p className="font-regular text-sm md:text-base leading-relaxed text-[#003641]/80">
                  Cada Posto de Atendimento tem um coordenador eleito pelos respectivos associados. O mandato tem duração de dois anos, havendo a possibilidade de reeleição. Na última eleição, realizada em ...., foram eleitos ... Coordenadores, apresentados abaixo:
                </p>
              </div>
            </AnimateIn>

            {/* Sustentabilidade Card */}
            <AnimateIn>
              <div id="sustentabilidade" className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-lg border border-gray-100 text-[#003641] scroll-mt-36">
                <h3 className="font-bold text-base md:text-lg uppercase mb-6 tracking-wider text-[#003641]">
                  3. SUSTENTABILIDADE
                </h3>
                <p className="font-regular text-sm md:text-base leading-relaxed text-[#003641]/80">
                  A atuação da Credicitrus, em todas as suas operações e relações internas e externas, está alinhada aos critérios ESG (ambiental, social e de governança), bem como aos Objetivos de Desenvolvimento Sustentável (ODS) estabelecidos na Agenda 2030 da Organização das Nações Unidas (ONU).
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>
      <Rodape />
    </div>
  );
}
