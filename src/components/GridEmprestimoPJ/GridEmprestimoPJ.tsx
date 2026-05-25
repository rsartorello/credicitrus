'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

const beneficios = [
  {
    id: 1,
    image: '/soltas/emprestimo-p-j-1.webp',
    title: 'Receba antes e planeje com mais liberdade',
    description: 'Antecipe sua restituição do imposto de renda com praticidade e pagamento em parcela única.',
  },
  {
    id: 2,
    image: '/soltas/emprestimo-p-j-2.webp',
    title: 'Organize seus gastos com mais tranquilidade',
    description: 'Antecipe o valor do seu 13º salário e aproveite oportunidades com crédito direto na conta.',
  },
  {
    id: 3,
    image: '/soltas/emprestimo-p-j-3.webp',
    title: 'Use seu FGTS agora e pague depois',
    description: 'Antecipe até 10 parcelas do saque-aniversário com contratação rápida pelo App Sicoob.',
  },
  {
    id: 4,
    image: '/soltas/emprestimo-p-j-4.webp',
    title: 'Invista na sua participação na Credicitrus',
    description: 'Financie seu capital social com o Cotas Plus, garanta juros reduzidos e fortaleça sua reserva financeira.',
  },
  {
    id: 5,
    image: '/soltas/emprestimo-p-j-5.webp',
    title: 'Mais crédito para quem tem folha conveniada',
    description: 'Crédito consignado com desconto direto em folha e uma das menores taxas do mercado.',
  },
  {
    id: 6,
    image: '/soltas/emprestimo-p-j-6.webp',
    title: 'Financie sua graduação ou pós com facilidade',
    description: 'Crédito estudantil para cursos superiores com prazo estendido e contratação simples.',
  },
  {
    id: 7,
    image: '/soltas/emprestimo-p-j-7.webp',
    title: 'Use o valor já integralizado na sua conta capital',
    description: 'Com o Crédito Fidelidade você tem o valor integralizado em capital social disponível como empréstimo com liberação rápida e taxas mais atrativas.',
  },
  {
    id: 8,
    image: '/soltas/emprestimo-p-j-8.webp',
    title: 'Financie seu imóvel com prazo de até 30 anos',
    description: 'Crédito imobiliário para compra de imóveis residenciais ou terrenos urbanos com prazo estendido e possibilidade de incluir despesas diversas no financiamento.',
  },
  {
    id: 9,
    image: '/soltas/emprestimo-p-j-9.webp',
    title: 'Compre sua bike com crédito facilitado',
    description: 'Com o Crédito Mobilidade você tem até 48 meses para pagar sua bicicleta nova e contratação sem burocracia.',
  },
  {
    id: 10,
    image: '/soltas/emprestimo-p-j-10.webp',
    title: 'Crédito rápido e sem burocracia',
    description: 'O Crédito Pessoal Pré-Aprovado pode ser contratado direto pelo App Sicoob, com liberação rápida e personalizada.',
  },
  {
    id: 11,
    image: '/soltas/emprestimo-p-j-11.webp',
    title: 'Mais crédito com garantia e taxas reduzidas',
    description: 'O Crédito Pessoal com Garantia oferece taxas mais atrativas usando imóvel, veículo ou aplicação financeira como garantia.',
  },
  {
    id: 12,
    image: '/soltas/emprestimo-p-j-12.webp',
    title: 'Pix parcelado para facilitar suas transferências',
    description: 'O Crédito Pessoal Pix Parcelado permite enviar valores mesmo sem saldo em conta corrente e pagar em parcelas direto pelo App Sicoob.',
  },
  {
    id: 13,
    image: '/soltas/emprestimo-p-j-13.webp',
    title: 'Crédito para conquistar seu veículo com facilidade',
    description: 'O Financiamento de Veículos disponibiliza até 100% do valor, prazo estendido e condições que se ajustam ao seu perfil.',
  },
  {
    id: 14,
    image: '/soltas/emprestimo-p-j-14.webp',
    title: 'Energia limpa com crédito facilitado',
    description: 'O Financiamento Fotovoltaico cobre até 100% do projeto, incluindo equipamentos, instalação e serviços, com prazo estendido e débito automático.',
  },
  {
    id: 15,
    image: '/soltas/emprestimo-p-j-15.webp',
    title: 'Mais tecnologia para seu consultório ou clínica',
    description: 'O Saúde + Pro financia equipamentos médicos, odontológicos e fisioterapêuticos com até 48 meses para pagar e condições especiais.',
  },
];

export default function GridEmprestimoPJ() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px]">
        {/* Cabeçalho */}
        <div className="text-center mb-16 md:mb-20">
          <h4 className="text-verdecredicitrus font-medium text-base md:text-lg lg:text-xl uppercase tracking-wider mb-4">
            PARA VOCÊ
          </h4>
          <h2 className="text-primary font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-tight mb-8">
            Empréstimos e financiamentos para realizar seus planos com tranquilidade
          </h2>
          <p className="text-primary font-regular text-lg md:text-xl lg:text-2xl max-w-5xl mx-auto leading-relaxed">
            Com a Credicitrus, você tem acesso a linhas de crédito para cada momento da sua vida. Praticidade, agilidade e taxas que cabem no seu bolso.
          </p>
        </div>

        {/* Versão Swiper (Mobile apenas) */}
        <div className="block md:hidden mb-20 relative px-2 pt-10">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="w-full pb-12 pt-[10px] -mt-[10px]"
          >
            {beneficios.map((item) => (
              <SwiperSlide key={item.id} className="h-auto flex pb-6">
                <Link
                  href="#"
                  className="flex flex-col bg-[#f8f8f8] rounded-3xl overflow-hidden transition-all duration-300 transform h-full w-full"
                >
                  {/* Imagem com cantos superiores arredondados */}
                  <div className="relative aspect-[440/280] w-full overflow-hidden rounded-t-3xl border-b border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="flex flex-col p-6 flex-grow relative">
                    <h3 className="text-primary font-bold text-lg leading-[1.2] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-primary/70 font-regular text-xs leading-snug mb-6 flex-grow">
                      {item.description}
                    </p>

                    {/* Ícone de Seta */}
                    <div className="self-end mt-auto">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navegação Customizada Mobile (Igual a OutrasSolucoesGeral) */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex items-center justify-center text-secondary hover:opacity-70 transition-all cursor-pointer border-none bg-transparent"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>

            {/* Linhas de Progresso Dinâmicas */}
            <div className="flex gap-1.5 py-2 w-full max-w-[240px] justify-center">
              {beneficios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`flex-1 transition-all duration-300 border-none p-0 focus:outline-none cursor-pointer max-w-[56px] ${
                    activeIndex === index
                      ? 'bg-secondary'
                      : 'bg-primary/20'
                  }`}
                  style={{ height: '2px' }}
                />
              ))}
            </div>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="flex items-center justify-center text-secondary hover:opacity-70 transition-all cursor-pointer border-none bg-transparent"
              aria-label="Próximo"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Versão Grade (Desktop apenas) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-20">
          {beneficios.map((item) => (
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
                <h3 className="text-primary font-bold text-[1.25rem] md:text-[1.35rem] xl:text-[1.5rem] leading-[1.2] mb-4">
                  {item.title}
                </h3>
                <p className="text-primary/70 font-regular text-sm md:text-base lg:text-lg leading-snug mb-8 flex-grow">
                  {item.description}
                </p>

                {/* Ícone de Seta (Representado pelo círculo com seta no canto inferior direito conforme layout) */}
                <div className="self-end mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-secondary transition-colors duration-300">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Inferior */}
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8 w-full max-w-6xl">
            <h2 className="text-primary font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] leading-tight text-left max-w-lg">
              Ficou na dúvida sobre qual o melhor crédito?
            </h2>
            <Link
              href="#"
              className="inline-block bg-[#00a99d] hover:bg-[#003641] text-white font-bold text-base md:text-lg lg:text-xl px-10 md:px-14 py-4 rounded-full transition-all duration-300 shadow-lg whitespace-nowrap"
            >
              Fale com nosso especialista!
            </Link>
          </div>
          <p className="text-primary font-regular text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] opacity-70 max-w-4xl leading-tight italic">
            *As linhas de empréstimos e financiamentos são sujeitas à análise de crédito e cadastral e estão disponíveis apenas para cooperados Credicitrus. Caso alguma das linhas automáticas não esteja disponível no App Sicoob, contate seu gerente.
          </p>
        </div>
      </div>
    </section>
  );
}
