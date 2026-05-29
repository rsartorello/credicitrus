'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";
import ContentBlockSection from "@/components/ContentBlockSection/ContentBlockSection";


const faqConsorcioEmp = [
  {
    question: "Como o consórcio pode ajudar no crescimento da minha empresa?",
    answer: "O consórcio é uma ferramenta de planejamento financeiro que permite a aquisição de bens (imóveis, veículos, máquinas) sem o pagamento de juros altos de financiamentos, preservando o capital de giro da sua empresa."
  },
  {
    question: "Quais bens minha empresa pode adquirir via consórcio?",
    answer: "É possível adquirir imóveis comerciais (salas, galpões, terrenos), veículos leves e pesados (frotas, caminhões), máquinas, equipamentos industriais e até serviços como reformas e consultorias."
  },
  {
    question: "Existe limite de crédito para empresas no consórcio?",
    answer: "Os limites variam de acordo com o grupo e o bem desejado. A Credicitrus oferece diversas faixas de crédito para atender desde pequenos negócios até grandes operações."
  },
  {
    question: "Como funcionam as contemplações para PJ?",
    answer: "Assim como para PF, as contemplações ocorrem por meio de sorteios mensais ou lances (fixo, embutido ou livre), realizados nas assembleias do grupo."
  },
  {
    question: "Posso utilizar o FGTS no consórcio empresarial?",
    answer: "O uso do FGTS é restrito a pessoas físicas para aquisição de imóvel residencial próprio, conforme as regras da CEF. Para empresas, o planejamento se baseia em recursos próprios para lances ou quitação."
  }
];

export default function ConsorciosParaSuaEmpresaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-sua-empresa-consorcio.webp"
          titleLines={[
            "CONSÓRCIOS",
            "PARA SUA",
            "EMPRESA"
          ]}
          highlightIndices={[2]}
          buttons={[
            { label: "Abra já sua conta", href: "/abra-sua-conta", variant: "secondary" },
            { label: "Já sou associado e quero solicitar", href: "https://wa.me/551633445020", variant: "primary" }
          ]}
        />

        <FeatureCardsSection
          sectionBgClass="bg-white"
          cardBgClass="bg-[#f8f8f8]"
          eyebrowText="PARA SUA EMPRESA"
          title={
            <>
              Consórcio Empresarial para Impulsionar <br />
              o crescimento da sua empresa
            </>
          }
          description={
            <>
              Na Credicitrus, o seu negócio avança com planejamento: o consórcio <br />
              empresarial permite investir em máquinas, equipamentos, veículos, imóveis <br />
              comerciais e muito mais
            </>
          }
          cards={[
            {
              id: 1,
              image: "/soltas/1-consorcios-empresa.webp",
              title: "Imóveis",
              description: "Adquira seu imóvel urbano, rural ou terreno."
            },
            {
              id: 2,
              image: "/soltas/2-consorcios-empresa.webp",
              title: "Automóveis",
              description: "Compre seu automóvel ou moto, novo ou usado."
            },
            {
              id: 3,
              image: "/soltas/3-consorcios-empresa.webp",
              title: "Serviços",
              description: "Contrate consultorias, projetos, viagens, saúde e festas."
            },
            {
              id: 4,
              image: "/soltas/4-consorcios-empresa.webp",
              title: "Pesados",
              description: "Equipe a operação com caminhões, ônibus e implementos agrícolas."
            },
            {
              id: 5,
              image: "/soltas/5-consorcios-empresa.webp",
              title: "Outros Bens",
              description: "Adquira bens móveis duráveis, como eletrônicos e eletrodomésticos."
            }
          ]}
          gridCols={3}
          ctaTitle={
            <>
              Ficou na dúvida sobre <br />
              o consórcio?
            </>
          }
          ctaButtonText="Fale com nosso especialista!"
        />

        <ContentBlockSection
          eyebrowText="COMO FUNCIONA"
          titleWeight="font-medium"
          paragraphWeight="font-regular"
          title={
            <>
              ENTENDA A <br />
              DINÂMICA DO <br />
              CONSÓRCIO
            </>
          }
          paragraphs={[
            "O consórcio é uma forma de compra parcelada e programada, sem juros, em que pessoas ou empresas se organizam em grupos para formar um fundo comum.",
            "Nas assembleias do grupo (normalmente mensais), ocorrem as contemplações por sorteio e/ou lance, conforme o regulamento.",
            "Ao ser contemplado, você recebe uma carta de crédito, que é um valor aprovado para a aquisição do bem ou serviço, com poder de negociação semelhante ao pagamento à vista."
          ]}
          imageSrc="/soltas/6-consorcios-empresa.webp"
          imageAlt="Dinâmica do consórcio empresarial"
        />

        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA A EMPRESA"
          sectionTitle={
            <>
              Explore outras vantagens de ser <br />
              Credicitrus e cresça seu negócio <br />
              com quem entende de gente
            </>
          }
        />

        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title="Tire suas dúvidas sobre consórcio:"
          items={[
            {
              question: "Como acontecem as contemplações?",
              answer: "As contemplações ocorrem em assembleias periódicas por sorteio e/ou lance, conforme o regulamento do grupo."
            },
            {
              question: "O que é a carta de crédito e como você usa?",
              answer: "Ao ser contemplado(a), você recebe uma carta de crédito, que trata-se de um valor aprovado para adquirir o bem/serviço conforme o regulamento. Na prática, ela oferece poder de negociação semelhante ao pagamento à vista, dentro das regras do grupo."
            },
            {
              question: "O consórcio tem juros?",
              answer: "Não. O consórcio não tem cobrança de juros. Você paga somente a taxa de administração e, conforme o grupo, fundo de reserva e seguro prestamista previstos no contrato."
            },
            {
              question: "Posso antecipar minha contemplação com lance?",
              answer: "Sim. Você pode ofertar lance para tentar antecipar a contemplação, conforme as regras do grupo  (tipos e condições variam)."
            },
            {
              question: "Qual a principal diferença entre consórcio e financiamento?",
              answer: "No consórcio, não há juros e a aquisição ocorre após contemplação (sorteio/lance); no financiamento, a compra é imediata, mas há juros embutidos nas parcela."
            }
          ]}
        />

        <SejaAssociado
          title={"Pronto para\nconquistar seus\nobjetivos?"}
          description={"Abra sua conta e transforme planos em conquistas:\nconsórcio com taxas justas, previsibilidade e a solidez do cooperativismo"}
          buttonText="Abra já sua conta"
        />

      </main>
      <Rodape />
    </div>
  );
}
