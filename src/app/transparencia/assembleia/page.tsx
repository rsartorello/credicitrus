import Image from 'next/image';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import Button from "@/components/ui/Button";
import AssembleiaVideoCard from "@/components/AssembleiaVideoCard/AssembleiaVideoCard";
import { getAssembleiasList } from "@/lib/cms";

export default async function AssembleiaCredicitrusPage() {
  const assembleiaDocs = await getAssembleiasList([]);

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
                <AssembleiaVideoCard />
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

            {assembleiaDocs.length > 0 ? (
              <div className="mt-12 max-w-5xl mx-auto">
                <h3 className="text-secondary font-extrabold text-2xl md:text-3xl text-center mb-6">
                  Documentos da Assembleia
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {assembleiaDocs.map((doc) => {
                    const isPdf = doc.link.toLowerCase().endsWith(".pdf");
                    return (
                      <a
                        key={doc.link}
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={isPdf}
                        className="flex items-center justify-center rounded-[1.25rem] border border-gray-200 bg-white px-4 py-4 text-primary font-bold hover:border-verdecredicitrus hover:text-verdecredicitrus transition"
                      >
                        {doc.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </section>

      </main>
      <Rodape />
    </div>
  );
}
