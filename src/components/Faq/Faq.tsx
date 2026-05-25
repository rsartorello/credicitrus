'use client';

import React, { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import AnimateIn from '@/components/ui/AnimateIn';

interface FaqItem {
  question: React.ReactNode;
  answer: React.ReactNode;
}

interface FaqProps {
  subtitle?: string;
  title: React.ReactNode;
  items: FaqItem[];
  cta?: {
    title?: string;
    text?: string; // Mantendo compatibilidade
    buttonText?: string;
    href: string;
  };
  sectionBgClass?: string;
  itemBgClass?: string;
}

export default function Faq({
  subtitle = "Dúvidas Frequentes",
  title,
  items,
  cta,
  sectionBgClass = "bg-[#f8f9fa]",
  itemBgClass = "bg-white"
}: FaqProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={`w-full py-16 md:py-24 lg:py-32 ${sectionBgClass}`}>
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1400px]">
        <AnimateIn delay={0.1}>
          <SectionHeader subtitle={subtitle} title={title} />
        </AnimateIn>

        <div className="max-w-5xl mx-auto flex flex-col gap-6 mt-12">
          {items.map((item, index) => (
            <AnimateIn key={index} delay={0.1 * (index + 1)}>
              <div
                className={`${itemBgClass} rounded-full shadow-[0_4px_15px_0_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full relative flex items-center justify-center py-5 md:py-6 px-10 md:px-16 text-center hover:bg-gray-50 transition-colors"
                  aria-expanded={activeIndex === index}
                >
                  <span className="text-primary font-bold text-base md:text-xl lg:text-2xl leading-tight px-4">
                    {item.question}
                  </span>
                  <span className="absolute right-6 md:right-8 text-primary text-xl md:text-2xl font-light transform transition-transform duration-300">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out px-8 md:px-16 overflow-hidden ${activeIndex === index ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="text-primary font-medium text-xs md:text-base lg:text-lg text-center leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {cta && (
          <AnimateIn delay={0.3} className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-center">
            <h2 className="text-primary font-bold text-xl md:text-3xl lg:text-[2.15rem]">
              {cta.title || "Sua dúvida não foi resolvida?"}
            </h2>
            <Button href={cta.href} variant="secondary" size="md" className="normal-case w-full md:w-auto">
              {cta.buttonText || cta.text || "Fale conosco"}
            </Button>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
