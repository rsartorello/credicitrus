'use client';

import React from 'react';
import Hero from "@/components/Hero/Hero";
import FeatureCardsSection from "@/components/FeatureCardsSection/FeatureCardsSection";
import OutrasSolucoesGeral from "@/components/OutrasSolucoesGeral/OutrasSolucoesGeral";
import Faq from "@/components/Faq/Faq";
import SejaAssociado from "@/components/SejaAssociado/SejaAssociado";
import Rodape from "@/components/Rodape/Rodape";
import { TrendingUp, HandCoins, CreditCard, Banknote, ShieldCheck } from 'lucide-react';

export default function RecebaPraticidadeSeguranca1Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* 1. Hero */}
        <Hero
          backgroundImage="/soltas/hero-receber-praticidade-seguranca-1.png"
          titleLines={["RECEBA COM MAIS", "PRATICIDADE E", "SEGURANÇA"]}
          subtitleColor="secondary"
          mirrorImage={false}
          buttons={[
            { label: "Abra já sua conta", href: "#", variant: "secondary" },
            { label: "Já sou associado e quero receber melhor", href: "#", variant: "primary" }
          ]}
        />

        {/* 2. Sessão Para Você */}
        <FeatureCardsSection
          eyebrowText="PARA VOCÊ"
          title={
            <>
              Soluções de Recebimento<br />
              que facilitam seu dia a dia
            </>
          }
          description="Na Credicitrus, você recebe seus valores com agilidade, segurança e total transparência. Organize cobranças, antecipe recebíveis e tenha mais controle sobre sua vida financeira."
          cards={[
            {
              id: 1,
              image: "/soltas/1-receber-praticidade-seguranca-1.png",
              title: "Desconto de Recebíveis",
              description: "Antecipe valores de cheques, duplicatas e notas promissórias e fortaleça o fluxo de caixa do seu negócio com agilidade, com um processo descomplicado e com taxas atrativas."
            },
            {
              id: 2,
              image: "/soltas/2-receber-praticidade-seguranca-1.png",
              title: "Cobrança de Títulos",
              description: "Aprimore sua cobrança por boletos bancários com emissão simples, controle eficiente e condições competitivas. Deixe os boletos por nossa conta e ganhe previsibilidade e praticidade no seu recebimento."
            },
            {
              id: 3,
              image: "/soltas/3-receber-praticidade-seguranca-1.png",
              title: "Vendas com Cartões",
              description: "A solução ideal para estabelecimentos comerciais e profissionais liberais, com a segurança e agilidade da Sipag para vender no débito e crédito, controlar recebimentos e impulsionar os resultados."
            }
          ]}
          gridCols={3}
          ctaTitle="Ficou com alguma dúvida?"
          ctaButtonText="Fale com nosso especialista!"
        />

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

        {/* 4. FAQ */}
        <Faq
          subtitle="DÚVIDAS FREQUENTES"
          title={"Tire suas dúvidas sobre as nossas\nsoluções de recebimentos"}
          items={[
            {
              question: "O que é o Desconto de Recebíveis?",
              answer: "É a antecipação dos valores que você tem a receber por meio de vendas ou serviços já realizados. Assim, você transforma pagamentos futuros em dinheiro à vista, garantindo mais flexibilidade para organizar seu orçamento."
            },
            {
              question: "Quem pode usar o Desconto de Recebíveis?",
              answer: "Pessoas físicas que recebem pagamentos parcelados, autônomos e profissionais liberais que desejam antecipar valores e ter mais controle do fluxo financeiro no dia a dia."
            },
            {
              question: "O que é a Cobrança de Títulos?",
              answer: "É o serviço de emissão e gestão de boletos, que permite organizar cobranças, acompanhar pagamentos e ter previsibilidade sobre o que vai entrar na sua conta, tudo com praticidade e transparência."
            },
            {
              question: "A Cobrança de Títulos é indicada para quem?",
              answer: "Para quem presta serviços, realiza vendas por conta própria ou precisa emitir cobranças de forma profissional."
            },
            {
              question: "O que é a solução de Vendas com Cartões (Sipag)?",
              answer: "É a maquininha de cartões da Credicitrus, ideal para quem recebe pagamentos no débito ou crédito e precisa de rapidez, segurança e gestão simples das vendas."
            },
            {
              question: "Quais são as vantagens da Sipag?",
              answer: "Você conta com taxas competitivas, tecnologia estável, recebimento rápido, relatórios de controle e a possibilidade de antecipar vendas, tudo com o suporte da Credicitrus."
            },
            {
              question: "Preciso ser associado para usar as soluções de recebimento?",
              answer: "Sim. Para acessar cobrança, antecipação ou Sipag, é necessário ser cooperado da Credicitrus. A abertura de conta é simples e pode ser iniciada pelo aplicativo."
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
          title={"Pronto para\nrealizar seus\nobjetivos?"}
          description={"Abra sua conta e invista com a\nconfiança do cooperativismo:\ncondições claras, taxas justas e\npotencial de retorno para\nimpulsionar seus objetivos."}
          buttonText="Abra sua conta"
          imageSrc="/soltas/cartoes.png"
        />
      </main>
      <Rodape />
    </div>
  );
}
