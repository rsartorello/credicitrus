'use client';

import React from 'react';
import Image from 'next/image';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import Button from "@/components/ui/Button";

export default function AssembleiaCredicitrusPage() {
  const [playVideo, setPlayVideo] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* 1. Hero */}
        <Hero
          backgroundImage="/soltas/hero-transparencia-assembleia.webp"
          titleLines={["ASSEMBLEIA", "CREDICITRUS"]}
          highlightIndices={[1]}
          buttons={[]}
        />

        {/* 2. O momento de decidir juntos */}
        <section className="w-full bg-[#f8f9fa] py-20 md:py-28">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-6xl">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight tracking-tight">
                O momento de decidir juntos <br className="hidden md:inline" />
                os rumos da Cooperativa
              </h2>
            </div>

            {/* Top row: 3 topics on the left, video card on the right */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
              {/* Coluna Esquerda: 3 primeiros tópicos */}
              <div className="w-full lg:w-[55%] flex flex-col gap-6">
                {[
                  {
                    title: "O que são as Assembleias?",
                    content: (
                      <>
                        A Assembleia é um momento fundamental para a Cooperativa e para cada cooperado. É por meio dela que a Credicitrus reafirma seu compromisso com a democracia, a transparência e a participação ativa dos associados. Na Assembleia, você contribui diretamente para as decisões que definem os rumos da Cooperativa. Aqui todos têm o mesmo direito. Um voto por associado. É justo, igualitário e democrático.
                      </>
                    )
                  },
                  {
                    title: "Quais são as modalidades de Assembleia?",
                    content: (
                      <>
                        Assembleia Geral Ordinária (AGO): ocorre uma vez por ano e aborda assuntos ordinários e obrigatórios da governança. <br />
                        Assembleia Geral Extraordinária (AGE): é convocada conforme a necessidade, sem periodicidade fixa, para assuntos não rotineiros e estruturantes.
                      </>
                    )
                  },
                  {
                    title: "Sua participação faz a diferença.",
                    content: (
                      <>
                        Participar da Assembleia é exercer seu papel de dono da Cooperativa. Na Credicitrus, ninguém decide sozinho: cada associado importa e cada participação faz a diferença.
                      </>
                    )
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                    <h3 className="text-secondary font-bold text-xl md:text-2xl mb-4">
                      {item.title}
                    </h3>
                    <div className="text-primary text-base md:text-lg leading-relaxed font-medium">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coluna Direita: Card de Vídeo */}
              <div className="w-full lg:w-[45%] flex flex-col">
                <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden flex-grow flex flex-col justify-between">
                  {/* Área da Imagem / Vídeo */}
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
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
                        <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/90 rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                          <div className="w-0 h-0 border-t-[15px] lg:border-t-[20px] border-t-transparent border-l-[25px] lg:border-l-[35px] border-l-primary border-b-[15px] lg:border-b-[20px] border-b-transparent ml-2 lg:ml-3"></div>
                        </div>
                      </div>
                    </button>
                  )}

                  {/* Área do Texto */}
                  <div className="flex-grow flex items-center justify-center py-8 lg:py-10">
                    <h4 className="text-primary font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] leading-[1.1] tracking-tight text-center">
                      Clique <br /> e Assista
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: 4th topic on the left, empty space on the right */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch mt-6">
              {/* Coluna Esquerda: 4º tópico */}
              <div className="w-full lg:w-[55%]">
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] h-full">
                  <h3 className="text-secondary font-bold text-xl md:text-2xl mb-4">
                    O que é discutido nas Assembleias?
                  </h3>
                  <div className="text-primary text-base md:text-lg leading-relaxed font-medium">
                    <ul className="list-none p-0 flex flex-col gap-3">
                      <li>• <strong>Prestação de contas:</strong> acompanhamento dos resultados e das evidências de gestão do último período.</li>
                      <li>• <strong>Eleição de conselheiros:</strong> quando previsto, os associados elegem representantes.</li>
                      <li>• <strong>Direcionamento do futuro:</strong> deliberação sobre prioridades e próximos passos da Credicitrus.</li>
                      <li>• <strong>Fortalecimento da governança:</strong> decisões coletivas, com base em transparência e responsabilidade.</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Espaço vazio para alinhar com o grid */}
              <div className="hidden lg:block lg:w-[45%]" />
            </div>
          </div>
        </section>

        {/* 3. Veja como é fácil votar */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px]">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight tracking-tight">
                Veja como é fácil votar
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-16 max-w-5xl mx-auto w-full">
              <div className="w-full md:w-1/2">
                <Image
                  src="/soltas/2-assembleia-credicitrus.webp"
                  alt="App Moob"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start gap-8">
                <div className="text-primary text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-left">
                  É fácil participar da Assembleia Geral <br className="hidden lg:block" />
                  Credicitrus. Pelo seu celular <br className="hidden lg:block" />
                  (smartphone), por meio do aplicativo <br className="hidden lg:block" />
                  Sicoob Moob ou pelo aplicativo Sicoob, <br className="hidden lg:block" />
                  o mesmo que utiliza para <br className="hidden lg:block" />
                  movimentação de sua conta corrente. <br className="hidden lg:block" />
                  E, pelo computador pelo endereço <br className="hidden lg:block" />
                  <a href="https://sicoob.com.br/web/moobweb" className="text-secondary hover:underline">sicoob.com.br/web/moobweb</a>
                </div>
                <Button href="https://www.sicoob.com.br/web/moobweb" variant="secondary" size="lg" className="w-full">
                  QUERO VOTAR
                </Button>
              </div>
            </div>

            <p className="text-primary text-base md:text-lg lg:text-xl font-medium leading-relaxed text-center mx-auto max-w-5xl pt-16">
              No período da AGO, escolha o melhor dia e horário e vote. Confira sempre <br className="hidden md:block" />
              o edital de convocação e os documentos relacionados à Assembleia. Leia <br className="hidden md:block" />
              atentamente as informações e participe!
            </p>
          </div>
        </section>

        {/* 4. Transparência e Governança */}
        <section className="w-full bg-[#f8f9fa] py-20 md:py-28">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-6xl text-center">
            <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight tracking-tight mb-8">
              Transparência e Governança
            </h2>
            <p className="text-primary text-lg md:text-xl lg:text-2xl font-medium leading-relaxed mb-12 mx-auto text-center">
              Espaço exclusivo para cooperados consultarem a documentação oficial da <br className="hidden md:block" />
              Assembleia. Clique no botão para acessar.
            </p>
            <Button href="https://assembleia.sicoobcredicitrus.com.br/auth" variant="secondary" size="lg" className="md:px-50">
              ACESSAR
            </Button>
          </div>
        </section>

      </main>
      <Rodape />
    </div>
  );
}
