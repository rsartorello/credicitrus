'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const gridItems = [
  {
    id: 1,
    image: '/soltas/investimento-1.webp',
    title: 'Invista com isenção de IR e baixo risco',
    description: 'A LCA (Letra de Crédito do Agronegócio) tem garantia do FGCoop é ideal para quem busca segurança, rentabilidade e ainda contribui com o agronegócio nacional.',
  },
  {
    id: 2,
    image: '/soltas/investimento-2.webp',
    title: 'Renda fixa com liquidez e proteção',
    description: 'O RDC (Recibo de Depósito Cooperativo) oferece rentabilidade pós-fixada, semelhante ao CDB (Certificado de Depósito Bancário) dos bancos tradicionais, liquidez diária e garantia do FGCoop.',
  },
  {
    id: 3,
    image: '/soltas/investimento-3.webp',
    title: 'Rentabilidade crescente com flexibilidade',
    description: 'O RDC Progressivo aumenta os ganhos conforme o tempo de permanência, com liquidez diária.',
  },
  {
    id: 4,
    image: '/soltas/investimento-4.webp',
    title: 'Pague suas parcelas e concorra a prêmios',
    description: 'Com a Capitalização, você poupa de forma programada e concorra a sorteios semanais e mensais.',
  },
  {
    id: 5,
    image: '/soltas/investimento-5.webp',
    title: 'Aplicação com carência e foco no longo prazo',
    description: 'O RDC DI tem carência definida (181, 361 ou 721 dias) e liquidez diária, ideal para quem pensa no futuro.',
  },
  {
    id: 6,
    image: '/soltas/investimento-6.webp',
    title: 'Fidelidade que recompensa no vencimento',
    description: 'O RDC Fidelidade DI oferece rentabilidade estável com carência (181, 361 ou 721 dias) e sem liquidez no período.',
  },
  {
    id: 7,
    image: '/soltas/investimento-7.webp',
    title: 'Investimento tradicional e acessível',
    description: 'A Poupança é isenta de IR (Imposto de Renda), sem valor mínimo e com garantia do FGCoop.',
  },
  {
    id: 8,
    image: '/soltas/investimento-8.webp',
    title: 'Segurança e acessibilidade em títulos públicos',
    description: 'O Tesouro Direto é um programa do Tesouro Nacional para a venda de títulos públicos federais para pessoas físicas, com liquidez e segurança.',
  },
  {
    id: 9,
    image: '/soltas/investimento-9.webp',
    title: 'Diversifique com gestão especializada',
    description: 'Os Fundos de Investimento Sicoob oferecem estratégias para todos os perfis, com segurança e rentabilidade.',
  },
  {
    id: 10,
    image: '/soltas/investimento-10.webp',
    title: 'Ganhos estáveis com liquidez diária',
    description: 'O Sicoob DI acompanha o CDI (Certificado de Depósito Interbancário) e é ideal para quem busca baixo risco e retorno consistente.',
  },
  {
    id: 11,
    image: '/soltas/investimento-11.webp',
    title: 'Invista com impacto positivo',
    description: 'O Sicoob ASG foca em empresas sustentáveis com critérios ESG (sigla em inglês para Ambiental, Social e Governança).',
  },
  {
    id: 12,
    image: '/soltas/investimento-12.webp',
    title: 'Construa patrimônio com estratégia',
    description: 'O Sicoob Small Caps investe em empresas de menor capitalização com foco em crescimento.',
  },
  {
    id: 13,
    image: '/soltas/investimento-13.webp',
    title: 'Proteção contra a inflação com títulos públicos',
    description: 'O Sicoob Inflação é ideal para quem busca ganhos reais e estabilidade, com aplicações em títulos públicos federais atrelados aos IPCA (Índice Nacional de Preços ao Consumidor Amplo).',
  },
  {
    id: 14,
    image: '/soltas/investimento-14.webp',
    title: 'Receba mais com empresas de valor',
    description: 'O Sicoob Dividendos foca em empresas com histórico de pagamento de dividendos, visando renda passiva.',
  },
  {
    id: 15,
    image: '/soltas/investimento-15.webp',
    title: 'Aproveite as maiores empresas da Bolsa',
    description: 'O Sicoob Ibovespa busca acompanhar o desempenho do principal índice de ações do Brasil.',
  },
  {
    id: 16,
    image: '/soltas/investimento-16.webp',
    title: 'Invista com autonomia e agilidade',
    description: 'O Home Broker permite operar ações, FIIs (Fundos de Investimento Imobiliário), ETFs (Exchange Traded Funds) e BDRs (Brazilian Depositary Receipts) pelo App Sicoob.',
  },
];

export default function GridInvestimento() {
  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px]">
        {/* Cabeçalho */}
        <div className="text-center mb-16 md:mb-20">
          <h4 className="text-verdecredicitrus font-medium text-base md:text-lg lg:text-xl uppercase tracking-wider mb-4">
            PARA VOCÊ
          </h4>
          <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight mb-8 max-w-5xl mx-auto">
            Investimentos para fazer seu dinheiro render com segurança
          </h2>
          <p className="text-primary font-regular text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed">
            Na Credicitrus, você encontra opções de investimento para diferentes perfis e objetivos. Aqui você conta com solidez, rentabilidade e a confiança de investir na maior cooperativa de crédito do país.
          </p>
        </div>

        {/* Grade de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-20 md:mb-24">
          {gridItems.map((item) => (
            <Link
              key={item.id}
              href="#"
              className="group flex flex-col bg-[#f8f8f8] rounded-3xl overflow-hidden hover:shadow-[0_10px_30px_rgba(32,28,28,0.15)] transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Imagem com cantos superiores arredondados */}
              <div className="relative aspect-[440/280] w-full overflow-hidden rounded-t-3xl border-b border-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Conteúdo do Card */}
              <div className="flex flex-col p-8 md:p-10 flex-grow relative">
                <h3 className="text-primary font-bold text-[1.25rem] md:text-[1.35rem] xl:text-[1.5rem] leading-[1.2] mb-4 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-primary/70 font-regular text-sm md:text-base lg:text-lg leading-snug mb-8 flex-grow">
                  {item.description}
                </p>

                {/* Ícone de Mais no canto inferior direito conforme layout */}
                <div className="self-end mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-secondary transition-colors duration-300">
                    <span className="text-2xl font-light leading-none">+</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Inferior */}
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 w-full max-w-6xl">
            <h2 className="text-primary font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] leading-tight">
              Ficou na dúvida sobre qual é o melhor investimento?
            </h2>
            <Link
              href="#"
              className="inline-block bg-secondary hover:bg-primary text-white font-bold text-base md:text-lg lg:text-xl px-10 md:px-14 py-4 rounded-full transition-all duration-300 shadow-lg whitespace-nowrap"
            >
              Fale com nosso especialista!
            </Link>
          </div>

          {/* Disclaimer text at bottom */}
          <div className="w-full border-t border-gray-200 pt-8 mt-12">
            <p className="text-primary font-regular text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] opacity-70 max-w-5xl mx-auto leading-relaxed text-center">
              As aplicações em RDC, LCA, LCI e Poupança possuem garantia do FGCoop até o limite de R$ 250 mil por CPF, conforme as condições de cada linha de investimento; estão sujeitas a alteração sem aviso prévio. Algumas opções de investimentos têm limite de horário para realizar a aplicação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
