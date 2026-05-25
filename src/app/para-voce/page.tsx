'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";
import ContentBlockSection from "@/components/ContentBlockSection/ContentBlockSection";
import CentralAtendimentoSection from "@/components/CentralAtendimentoSection/CentralAtendimentoSection";

export default function CartoesQueAcompanhamOSeuDiaADiaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-voce-cartoes.webp"
          titleLines={[
            "CARTÕES QUE",
            "ACOMPANHAM O",
            "SEU DIA A DIA"
          ]}
          highlightIndices={[2]}
          buttons={[
            { label: "Abra já sua conta pessoal", href: "#", variant: "secondary" },
            { label: "Já sou associado e quero solicitar o cartão", href: "#", variant: "primary" }
          ]}
        />

        <FeatureCardsSection
          sectionBgClass="bg-[#f8f9fa]"
          cardBgClass="bg-white"
          eyebrowText="PARA VOCÊ"
          title={
            <>
              Cartões feitos para <br />
              simplificar sua rotina
            </>
          }
          description={
            <>
              Os cartões Credicitrus estão disponíveis nas bandeiras Mastercard e Visa, com <br className="hidden md:block" />
              pagamento por aproximação, uso internacional, cartão virtual e carteiras digitais. <br className="hidden md:block" />
              Tudo com benefícios e seguros das bandeiras para compras e viagens.
            </>
          }
          cards={[
            {
              id: 1,
              image: "/soltas/1-cartoes-dia-a-dia.webp",
              title: "Cartão Débito",
              description: "Para compras do dia a dia, com transações seguras, controle pelo app e pagamento por aproximação."
            },
            {
              id: 2,
              image: "/soltas/2-cartoes-dia-a-dia.webp",
              title: "Vooz",
              description: "Cartão múltiplo com baixa mensalidade, pagamento por aproximação e pontos Coopera a cada dólar gasto."
            },
            {
              id: 3,
              image: "/soltas/3-cartoes-dia-a-dia.webp",
              title: "Clássico",
              description: "Cartão com programa de pontos, benefícios das bandeiras e vantagens como cartão virtual e carteiras digitais."
            },
            {
              id: 4,
              image: "/soltas/1-cartoes-dia-a-dia.webp",
              title: "Gold",
              description: "Para compras do dia a dia, com transações seguras, controle pelo app e pagamento por aproximação."
            },
            {
              id: 5,
              image: "/soltas/2-cartoes-dia-a-dia.webp",
              title: "Platinum",
              description: "Cartão múltiplo com baixa mensalidade, pagamento por aproximação e pontos Coopera a cada dólar gasto."
            },
            {
              id: 6,
              image: "/soltas/cartao-sicoob-black.webp",
              title: "Black",
              description: "Cartão com programa de pontos, benefícios das bandeiras e vantagens como cartão virtual e carteiras digitais."
            },
            {
              id: 7,
              image: "/soltas/1-cartoes-dia-a-dia.webp",
              title: "Visa Infinite",
              description: "Para compras do dia a dia, com transações seguras, controle pelo app e pagamento por aproximação."
            },
            {
              id: 8,
              image: "/soltas/2-cartoes-dia-a-dia.webp",
              title: "Zenith",
              description: "Cartão múltiplo com baixa mensalidade, pagamento por aproximação e pontos Coopera a cada dólar gasto."
            }
          ]}
          gridCols={3}
          ctaTitle={
            <>
              Ficou na dúvida sobre qual <br />
              cartão é ideal para você?
            </>
          }
          ctaButtonText="Fale com nosso especialista!"
        />

        {/* Seção Programa Coopera */}
        <ContentBlockSection
          imageSrc="/soltas/4-cartoes-dia-a-dia.svg"
          imageAlt="Programa Coopera"
          imagePosition="right"
          noShadow={true}
          titleAlign="right"
          eyebrowText="Programa Coopera"
          eyebrowCentered={true}
          title={
            <div className="flex flex-col items-end w-full">
              <span className="whitespace-nowrap">MAIS DETALHES</span>
              <span className="whitespace-nowrap">EM SUA AGÊNCIA</span>
              <span className="whitespace-nowrap">OU NO SITE</span>
            </div>
          }
          titleWeight="font-medium"
          titleTracking="tracking-[0.15em]"
          imageClassName="scale-[1.3] object-contain"
          paragraphs={[
            "As compras com os cartões Sicoobcard geram pontos, que podem ser trocados por produtos eletroeletrônicos, milhas aéreas ou até crédito na fatura do cartão.",
            "É possível comprar no Coopera por meio de troca de pontos, cartão + pontos, ou só no cartão, de forma rápida, fácil e 100% segura!"
          ]}
          paragraphsCentered={true}
          imageAspectRatio="aspect-square"
          imageBorderRadius="0"
          reverseOnMobile={true}
        />
        {/* Seção Outras Soluções */}
        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA VOCÊ"
          sectionTitle="Explore outras vantagens de ser Credicitrus e cresça com quem entende de gente"
          slides={[
            {
              id: 1,
              title: 'Empréstimos e Financiamentos',
              description: 'Crédito para suas necessidades.',
              icon: '/soltas/icone-emprestimos.svg',
              link: '/para-voce/emprestimos-e-financiamentos'
            },
            {
              id: 2,
              title: 'Investimentos',
              description: 'Faça seu dinheiro render mais.',
              icon: '/soltas/icone-investimentos.svg',
              link: '/para-voce/investimentos'
            },
            {
              id: 3,
              title: 'Consórcio',
              description: 'Realize seus sonhos de forma planejada.',
              icon: '/soltas/icone-consorcio.svg',
              link: '/para-voce/consorcios'
            },
            {
              id: 4,
              title: 'Seguros',
              description: 'Proteção para você e sua família.',
              icon: '/soltas/icone-seguro.svg',
              link: '/para-voce/seguros'
            },
            {
              id: 5,
              title: 'Credicitrus Club',
              description: 'Benefícios exclusivos para cooperados.',
              icon: '/soltas/icone-credicitrusclub.svg',
              link: '/para-voce/credicitrus-club'
            }
          ]}
        />
        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title="Tire suas dúvidas sobre nossos cartões"
          items={[
            {
              question: "Quais bandeiras os cartões Credicitrus oferecem?",
              answer: "Os cartões estão disponíveis nas bandeiras Mastercard e Visa."
            },
            {
              question: "Preciso ser cooperado para solicitar um cartão?",
              answer: "Sim. A solicitação de cartões é exclusiva para cooperados Credicitrus - Abra sua conta e peça o seu pelo app)"
            },
            {
              question: "Quais recursos de segurança e conveniência estão disponíveis?",
              answer: "Pagamento por aproximação, cartão virtual para compras online, uso internacional, carteiras digitais (Apple Pay e Samsung Pay) e limites diários ajustáveis no app."
            },
            {
              question: "Existe programa de pontos?",
              answer: "Sim. O Programa de Pontos Coopera permite acumular pontos a cada dólar gasto na função crédito (a pontuação varia por categoria do cartão)."
            },
            {
              question: "Há benefícios e seguros de bandeira?",
              answer: "Sim. As bandeiras oferecem coberturas como Proteção de Compras, Garantia Estendida, Proteção de Preços e assistências/seguros de viagem (variam por categoria e bandeira)."
            },
            {
              question: "Os cartões têm acesso a salas VIP?",
              answer: "Categorias elegíveis contam com LoungeKey e, no caso do Mastercard Black, acesso ao Black Airport Lounge (condições e franquias de acessos conforme categoria)."
            },
            {
              question: "O cartão adicional está disponível?",
              answer: "Sim. É possível solicitar cartão adicional vinculado ao limite do titular, bom para organizar despesas familiares."
            },
            {
              question: "O que diferencia cada categoria (Vooz, Clássico, Gold, Platinum, Black, Infinite, Zenith)?",
              answer: "As categorias variam em pontuação no Coopera, benefícios/seguros de bandeira, acessos a salas VIP e anuidade. Quanto mais alta a categoria, maiores os benefícios."
            },
            {
              question: "Como acompanho meus gastos e limites?",
              answer: `Você gerencia tudo pelo app: faturas, limites, cartão virtual, carteiras digitais e liberações de uso. - Para saber mais, acesse: <a href="http://www.sicoobcard.com.br/" target="_blank" rel="noopener noreferrer">http://www.sicoobcard.com.br/</a>`
            }
          ]}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "#"
          }}
        />

        <SejaAssociado
          subtitle="SEJA ASSOCIADO"
          title={"Pronto para\ncomeçar?"}
          description={"Abra sua conta e aproveite toda a praticidade e segurança dos cartões Credicitrus."}
          buttonText="Abra sua conta Pessoal"
          imageSrc="/soltas/cartoes.webp"
        />

        <CentralAtendimentoSection />
      </main>
      <Rodape />
    </div>
  );
}
