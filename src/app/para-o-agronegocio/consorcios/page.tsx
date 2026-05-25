'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import ContentBlockSection from "@/components/ContentBlockSection/ContentBlockSection";
import TiposConsorcioFazenda from "@/components/TiposConsorcioFazenda/TiposConsorcioFazenda";
import Rodape from "@/components/Rodape/Rodape";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
const outrasSolucoesAgro = [
  {
    id: 1,
    icon: '/soltas/icone-creditorural.svg',
    title: 'Crédito Rural',
    description: 'Crédito sob medida para custeio, investimento e comercialização da sua safra.',
    link: '/para-o-agronegocio/credito-rural',
  },
  {
    id: 2,
    icon: '/soltas/icone-seguro.svg',
    title: 'Seguros',
    description: 'Proteção completa para sua lavoura, maquinários, propriedade e família.',
    link: '/para-o-agronegocio/seguro',
  },
  {
    id: 3,
    icon: '/soltas/icone-portaldoagro.svg',
    title: 'Portal Agro',
    description: 'Informações, cotações e as principais novidades do agronegócio em tempo real.',
    link: '#',
  },
  {
    id: 4,
    icon: '/soltas/icone-produtoseservicos.svg',
    title: '+ Produtos e Serviços',
    description: 'Conheça outras soluções financeiras desenhadas para a sua propriedade rural.',
    link: '/fale-com-a-gente',
  },
];

const faqConsorcio = [
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
];

export default function ConsorciosParaSuaFazendaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-o-agronegocio-consorcio.jpg"
          titleLines={["CONSÓRCIOS PARA", "SUA FAZENDA", "CREDICITRUS"]}
          subtitleColor="secondary"
          buttons={[
            { label: "Abra já sua conta", href: "#", variant: "secondary" },
            { label: "Falar com especialista", href: "#", variant: "primary" }
          ]}
        />
        <TiposConsorcioFazenda />

        <ContentBlockSection
          eyebrowText="COMO FUNCIONA"
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
          imageSrc="/soltas/6-consorcios-fazenda.png"
          imageAlt="Dinâmica do consórcio"
        />

        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA O AGRO"
          sectionTitle={
            <>
              Explore outras vantagens de ser <br className="hidden md:inline" />
              Credicitrus e cresça seu negócio <br className="hidden md:inline" />
              com quem entende de gente
            </>
          }
          slides={outrasSolucoesAgro}
        />

        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title="Tire suas dúvidas sobre consórcio:"
          items={faqConsorcio}
        />

        <SejaAssociado
          title="Pronto para conquistar seus objetivos?"
          description={`Abra sua conta e transforme\nplanos em conquistas:\nconsórcio com taxas justas,\nprevisibilidade e a solidez do\ncooperativismo.`}
          buttonText="Abra já sua conta"
        />

      </main>
      <Rodape />
    </div>
  );
}
