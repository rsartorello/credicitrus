'use client';

import React from 'react';
import Image from 'next/image';
import Hero from "@/components/Hero/Hero";
import Rodape from "@/components/Rodape/Rodape";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";
import ContentBlockSection from "@/components/ContentBlockSection/ContentBlockSection";
import CentralAtendimentoSection from "@/components/CentralAtendimentoSection/CentralAtendimentoSection";
import AnimateIn from '@/components/ui/AnimateIn';


export default function ConsorciosParaCadaObjetivoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero
          backgroundImage="/soltas/hero-para-voce-consorcios.webp"
          titleLines={[
            "CONSÓRCIOS",
            "PARA CADA",
            "OBJETIVO"
          ]}
          highlightIndices={[2]}
          buttons={[
            { label: "Abra já sua conta pessoal", href: "/abra-sua-conta", variant: "secondary" },
            { label: "Já sou associado e quero solicitar", href: "https://wa.me/551733445020", variant: "primary" }
          ]}
        />

        <FeatureCardsSection
          sectionBgClass="bg-white"
          cardBgClass="bg-white"
          eyebrowText="PARA VOCÊ"
          title={
            <>
              Consórcio para realizar <br />
              seu próximo sonho
            </>
          }
          description="Na Credicitrus, você transforma objetivo em conquista com compra planejada, sem juros, e carta de crédito para imóveis, veículos, serviços e muito mais."
          cards={[
            {
              id: 1,
              image: "/soltas/1-consorcios-objetivo.webp",
              title: "Imóveis",
              description: "Adquira seu imóvel urbano, rural ou terreno."
            },
            {
              id: 2,
              image: "/soltas/2-consorcios-objetivo.webp",
              title: "Automóveis",
              description: "Compre seu automóvel ou moto, novo ou usado."
            },
            {
              id: 3,
              image: "/soltas/3-consorcios-objetivo.webp",
              title: "Serviços",
              description: "Contrate consultorias, projetos, viagens, saúde e festas."
            },
            {
              id: 4,
              image: "/soltas/4-consorcios-objetivo.webp",
              title: "Pesados",
              description: "Equipe a operação com caminhões, ônibus e implementos agrícolas."
            },
            {
              id: 5,
              image: "/soltas/5-consorcios-objetivo.webp",
              title: "Outros bens",
              description: "Adquira bens móveis duráveis, como eletrônicos e eletrodomésticos."
            }
          ]}
          gridCols={3}
          ctaTitle="Ficou na dúvida sobre o consórcio?"
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
          imageSrc="/soltas/6-consorcios-objetivo.webp"
          imageAlt="Família planejando o futuro"
        />

        {/* Seção Outras Soluções */}
        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA VOCÊ"
          sectionTitle={
            <>
              Explore outras vantagens de ser Credicitrus <br className="hidden md:block" />
              e cresça com quem entende de gente
            </>
          }
          slides={[
            {
              id: 1,
              title: 'Cartões de Crédito',
              description: 'Cartões com benefícios exclusivos.',
              icon: '/soltas/icone-cartaodecredito.svg',
              link: '/para-voce/cartoes-de-credito'
            },
            {
              id: 2,
              title: 'Empréstimos e Financiamentos',
              description: 'Crédito para suas necessidades.',
              icon: '/soltas/icone-emprestimos.svg',
              link: '/para-voce/emprestimos-e-financiamentos'
            },
            {
              id: 3,
              title: 'Investimentos',
              description: 'Faça seu dinheiro render mais.',
              icon: '/soltas/icone-investimentos.svg',
              link: '/para-voce/investimentos'
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
              title: 'Soluções de Recebimento',
              description: 'Facilidade para receber e gerenciar seus pagamentos diários.',
              icon: '/soltas/icone-solucoesderecebimento.svg',
              link: '/para-voce/solucoes-de-recebimento'
            },
            {
              id: 6,
              title: 'Credicitrus Club',
              description: 'Benefícios exclusivos para cooperados.',
              icon: '/soltas/icone-credicitrusclub.svg',
              link: '/para-voce/credicitrus-club'
            }
          ]}
        />

        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title="Tire suas dúvidas sobre consórcio:"
          items={[
            {
              question: 'Como acontecem as contemplações?',
              answer: 'As contemplações ocorrem em assembleias periódicas por sorteio e/ou lance, conforme o regulamento do grupo.'
            },
            {
              question: 'O que é a carta de crédito e como você usa?',
              answer: 'Ao ser contemplado(a), você recebe uma carta de crédito, que trata-se de um valor aprovado para adquirir o bem/serviço conforme o regulamento. Na prática, ela oferece poder de negociação semelhante ao pagamento à vista, dentro das regras do grupo.'
            },
            {
              question: 'O consórcio tem juros?',
              answer: 'Não. O consórcio não tem cobrança de juros. Você paga somente a taxa de administração e, conforme o grupo, fundo de reserva e seguro prestamista previstos no contrato.'
            },
            {
              question: 'Posso antecipar minha contemplação com lance?',
              answer: 'Sim. Você pode ofertar lance para tentar antecipar a contemplação, conforme as regras do grupo (tipos e condições variam).'
            },
            {
              question: 'Qual a principal diferença entre consórcio e financiamento?',
              answer: 'No consórcio, não há juros e a aquisição ocorre após contemplação (sorteio/lance); no financiamento, a compra é imediata, mas há juros embutidos nas parcela.'
            }
          ]}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "https://wa.me/551633445020"
          }}
        />

        <SejaAssociado
          subtitle="SEJA ASSOCIADO"
          title={"Pronto para\nconquistar\nseus objetivos?"}
          description={"Abra sua conta e transforme planos em conquistas: consórcio com taxas justas, previsibilidade e a solidez do cooperativismo."}
          buttonText="Abra sua conta Pessoal"
          imageSrc="/soltas/cartoes.webp"
        />

      </main>
      <Rodape />
    </div>
  );
}
