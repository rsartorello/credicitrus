'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import Rodape from "@/components/Rodape/Rodape";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";

export default function InvestimentosObjetivosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* 1. Hero */}
        <Hero
          backgroundImage="/soltas/hero-para-voce-investimento.webp"
          titleLines={["INVESTIMENTOS", "QUE ACOMPANHAM", "SEUS OBJETIVOS"]}
          highlightIndices={[2]}
          subtitleColor="secondary"
          imagePosition="center"
          mirrorImage={false}
          buttons={[
            { label: "Abra já sua conta pessoal", href: "/abra-sua-conta", variant: "secondary" },
            { label: "Já sou associado e quero investir", href: "https://wa.me/551633445020", variant: "primary" }
          ]}
        />

        {/* 2. Sessão Para Você */}
        <FeatureCardsSection
          eyebrowText="PARA VOCÊ"
          title="Investimento para cada objetivo"
          description="Na Credicitrus, você conta com soluções pensadas para cada etapa do seu planejamento financeiro, com a segurança do cooperativismo, transparência e solidez."
          cards={[
            {
              id: 'lca',
              image: '/soltas/investimento-1.webp',
              title: 'LCA',
              description: 'Renda fixa de baixo risco, pós-fixada, com recursos direcionados ao agronegócio.'
            },
            {
              id: 'lci',
              image: '/soltas/investimento-2.webp',
              title: 'LCI',
              description: 'Renda fixa de baixo risco, pós-fixada, com recursos direcionados ao mercado imobiliário.'
            },
            {
              id: 'rdc',
              image: '/soltas/investimento-3.webp',
              title: 'RDC',
              description: 'Renda fixa da cooperativa, pós-fixada, semelhante ao CDB, para objetivos do dia a dia.'
            },
            {
              id: 'rdc-progressivo',
              image: '/soltas/investimento-4.webp',
              title: 'RDC Progressivo',
              description: 'Renda fixa pós-fixada, pensada para quem quer planejar objetivos com horizonte de tempo definido.'
            },
            {
              id: 'rdc-carencia',
              image: '/soltas/investimento-5.webp',
              title: 'RDC com carência',
              description: 'Renda fixa pós-fixada, com carência definida conforme as condições do produto.'
            },
            {
              id: 'rdc-fidelidade',
              image: '/soltas/investimento-6.webp',
              title: 'RDC Fidelidade DI',
              description: 'Renda fixa pós-fixada (Fidelidade DI), ideal para prazos mais longos.'
            },
            {
              id: 'fundos',
              image: '/soltas/investimento-7.webp',
              title: 'Fundos',
              description: 'Carteiras com gestão profissional e estratégias por perfil; destaque ao Referenciado DI atrelado ao CDI.'
            },
            {
              id: 'poupanca',
              image: '/soltas/investimento-8.webp',
              title: 'Poupança',
              description: 'A poupança é um investimento conservador, com rentabilidade padrão em todas as instituições financeiras.'
            },
            {
              id: 'previdencia',
              image: '/soltas/investimento-9.webp',
              title: 'Previdência',
              description: 'Ajuda você a planejar e garantir seu padrão de vida no futuro.'
            },
            {
              id: 'tesouro',
              image: '/soltas/investimento-10.webp',
              title: 'Tesouro Direto',
              description: 'Compra e venda de títulos públicos federais aos investidores pessoas físicas, pelo App Sicoob.'
            },
            {
              id: 'home-broker',
              image: '/soltas/investimento-11.webp',
              title: 'Home Broker',
              description: 'O Home Broker permite operar ações, FIIs (Fundos de Investimento Imobiliário), ETFs (Exchange Traded Funds) e BDRs (Brazilian Depositary Receipts) pelo App Sicoob.'
            },
          ]}
        />

        {/* 3. Outras Soluções */}
        <OutrasSolucoesGeral
          sectionSubtitle="SOLUÇÕES PARA VOCÊ"
          sectionTitle={"Explore outras vantagens de ser Credicitrus\ne cresça com quem entende de gente"}
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

        {/* 4. FAQ */}
        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title="Tire suas dúvidas sobre Investimentos:"
          items={[
            {
              question: 'O que considerar ao escolher entre LCA, LCI e RDC?',
              answer: 'Considere objetivo, prazo e lastro: a LCA é renda fixa pós‑fixada com recursos direcionados ao agronegócio; a LCI é renda fixa pós‑fixada com recursos voltados ao mercado imobiliário; o RDC é renda fixa pós‑fixada emitida pela cooperativa, com referência de que é semelhante ao CDB.'
            },
            {
              question: 'Em que casos considerar as variações do RDC (Progressivo, Carência e Fidelidade)?',
              answer: 'Quando o plano permite prazo maior (Progressivo), quando você pode aceitar um período de carência definido (Carência) ou quando busca uma linha de fidelidade voltada a prazos mais longos (Fidelidade/DI). Todas seguem a lógica de renda fixa pós‑fixada.'
            },
            {
              question: 'Quais são os valores mínimos, a carência e a liquidez do LCA?',
              answer: 'O valor mínimo é R$ 500,00; a carência é de 6 meses; após a carência, a liquidez é diária.'
            },
            {
              question: 'Como a Previdência é abordada na Credicitrus?',
              answer: 'A Credicitrus opera previdência complementar por meio de plano multi‑instituído do Sicoob, voltado a acumulação de longo prazo para complementar renda futura.'
            },
            {
              question: 'Preciso ser cooperado para investir? Como me associo?',
              answer: 'Os investimentos são oferecidos pela cooperativa a seus cooperados. A associação pode ser iniciada on‑line pelo App Sicoob.'
            }
          ]}
          cta={{
            title: "Sua dúvida não foi resolvida?",
            buttonText: "Fale com nosso especialista!",
            href: "https://wa.me/551633445020"
          }}
        />

        {/* 5. Seja Associado */}
        <SejaAssociado
          subtitle="SEJA ASSOCIADO"
          title={"Pronto para\nrealizar seus\nobjetivos?"}
          description={"Abra sua conta e invista com a confiança do cooperativismo: condições claras, taxas justas e potencial de retorno para impulsionar seus objetivos."}
          buttonText="Abra sua conta Pessoal"
          imageSrc="/soltas/cartoes.webp"
        />
      </main>
      <Rodape />
    </div>
  );
}
