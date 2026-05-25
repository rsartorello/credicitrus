'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import Rodape from "@/components/Rodape/Rodape";


export default function SeguroParaVocePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* 1. Hero */}
        <Hero
          backgroundImage="/soltas/hero-para-voce-seguros.png"
          titleLines={["SEGURO", "PARA VOCÊ"]}
          highlightIndices={[0]}
          subtitleColor="secondary"
          mirrorImage={false}
          buttons={[
            { label: "Para você e vida", href: "#vida", variant: "secondary" },
            { label: "Para seu patrimônio e bens", href: "#bens", variant: "primary" }
          ]}
        />

        {/* 2. Sessão Para Você */}
        <section id="vida" className="scroll-mt-24">
          <FeatureCardsSection
            eyebrowText="PARA VOCÊ"
            title={
              <>
                Seguros que acompanham<br />
                seu momento de vida
              </>
            }
            description={
              <>
                Na Credicitrus, você encontra soluções de seguros para proteger sua família,<br />
                sua casa, seu carro e seus bens com a segurança do cooperativismo.
              </>
            }
            cards={[
              {
                id: 1,
                image: "/soltas/1-seguro-voce.png",
                title: "Vida",
                description: "Proteção financeira para você e sua família, com coberturas flexíveis que garantem amparo em imprevistos e segurança em cada fase da vida."
              },
              {
                id: 2,
                image: "/soltas/2-seguro-voce.png",
                title: "Residencial",
                description: "Cobre danos ao imóvel e ao conteúdo da sua casa, incluindo incêndio, raio, explosão, danos elétricos e assistência 24h."
              },
              {
                id: 3,
                image: "/soltas/3-seguro-voce.png",
                title: "Veículos",
                description: "Seguro completo para seu carro, com cobertura contra colisão, roubo, danos a terceiros e serviços de assistência."
              },
              {
                id: 4,
                image: "/soltas/4-seguro-voce.png",
                title: "Equipamentos Portáteis",
                description: "Proteção para smartphones, tablets, notebooks, câmeras e outros dispositivos usados no dia a dia ou no trabalho, cobrindo danos e prejuízos materiais."
              },
              {
                id: 5,
                image: "/soltas/5-seguro-voce.png",
                title: "Responsabilidade Civil",
                description: "Cobertura para profissionais que desejam se proteger contra prejuízos causados a terceiros no exercício da atividade, com garantias ajustadas a diferentes especialidades."
              }
            ]}
            gridCols={3}
            ctaTitle="Ficou com alguma dúvida?"
            ctaButtonText="Fale com nosso especialista!"
          />
        </section>

        {/* 3. Outras Soluções */}
        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA VOCÊ"
          sectionTitle={"Explore outras vantagens de ser Credicitrus\ne cresça com quem entende de negócio"}
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
              title: 'Credicitrus Club',
              description: 'Benefícios exclusivos para cooperados.',
              icon: '/soltas/icone-credicitrusclub.svg',
              link: '/para-voce/credicitrus-club'
            }
          ]}
        />

        {/* 4. FAQ */}
        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title={"Tire suas dúvidas sobre os\nnossos seguros agrícolas"}
          items={[
            {
              question: "O Seguro Residencial cobre apenas a estrutura da casa?",
              answer: "Não. O seguro cobre imóvel e conteúdo, protegendo bens como eletrodomésticos, móveis e equipamentos, além de oferecer assistências emergenciais."
            },
            {
              question: "O Seguro de Vida é personalizável?",
              answer: "Sim. As coberturas podem ser ajustadas ao seu momento de vida, considerando necessidades como proteção familiar, organização patrimonial ou complementação de benefícios pessoais. A linha de seguros da Credicitrus possui coberturas flexíveis e adequadas a diferentes perfis de contratantes."
            },
            {
              question: "O Seguro de Responsabilidade Civil Profissional é para quais áreas?",
              answer: "Destina‑se a profissionais que precisam de proteção contra danos causados a terceiros durante o exercício da atividade, como consultores, advogados, designers, profissionais da saúde, TI e outros. A cobertura ajuda a evitar prejuízos financeiros decorrentes de erros, omissões ou falhas profissionais."
            },
            {
              question: "Posso contratar mais de um seguro ao mesmo tempo?",
              answer: "Sim. É comum contratar um conjunto de proteções (por exemplo, Vida + Residencial + Auto) para ampliar a segurança pessoal, familiar e patrimonial. Isso garante proteção mais completa."
            },
            {
              question: "Preciso ser associado para contratar seguros?",
              answer: "Sim. Para contratar qualquer seguro com a Credicitrus, é necessário ser cooperado. A abertura de conta é simples e pode ser iniciada online."
            }
          ]}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "#"
          }}
        />

        {/* 5. Seja Associado */}
        <SejaAssociado
          subtitle="SEJA ASSOCIADO"
          title={"Pronto para\nproteger o\nque importa?"}
          description={"Abra sua conta e contrate seguros\npessoais com a confiança do\ncooperativismo: proteção completa,\ncondições transparentes e\natendimento dedicado."}
          buttonText="Abra sua conta"
          imageSrc="/soltas/cartoes.png"
        />
      </main>
      <Rodape />
    </div>
  );
}
