import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

interface InfoCard {
  id: string;
  icon: string;
  topText?: string;
  highlightText: string;
  bottomText: string;
  href: string;
}

interface StatsSectionProps {
  subtitle?: string;
  title: string;
  highlightTitle?: string;
  cards: InfoCard[];
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function StatsSection({
  subtitle,
  title,
  highlightTitle,
  cards,
  description,
  buttonText,
  buttonHref
}: StatsSectionProps) {
  return (
    <section className="w-full bg-white py-24 pb-32 flex flex-col items-center">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 flex flex-col items-center gap-16">

        <div className="w-full flex flex-col items-center order-1 md:order-none">
          <SectionHeader subtitle={subtitle} title={title} />
        </div>

        {highlightTitle && (
          <div className="flex flex-col items-center text-center max-w-5xl -mt-8 mb-4 px-4 text-center order-2 md:order-none">
            <h3 className="text-4xl md:text-5xl xl:text-[5rem] font-medium text-secondary leading-[1.15] uppercase tracking-widest whitespace-pre-line text-center">
              {highlightTitle}
            </h3>
          </div>
        )}

        {description && (
          <div className="w-full flex justify-center mt-0 md:mt-12 px-4 md:px-12 order-3 md:order-none">
            <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-primary leading-[1.4] text-center max-w-5xl tracking-tight">
              {description}
            </h3>
          </div>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 justify-center mt- max-w-5xl order-4 md:order-none">
          {cards.map((card) => {
            return (
              <Link
                key={card.id}
                href={card.href}
                className="group relative flex flex-row md:flex-col justify-between md:justify-start items-center md:items-stretch bg-primary rounded-2xl p-4 md:py-2 md:px-4 lg:py-3 lg:px-5 min-h-[100px] md:min-h-[180px] xl:min-h-[200px] h-full hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="flex flex-row md:flex-col gap-4 md:gap-3 lg:gap-4 relative z-10 flex-grow items-center md:items-stretch">
                  <img src={card.icon} className="w-8 h-8 object-contain shrink-0 self-start md:self-auto mt-1 md:mt-0" alt="" />

                  <div className="flex flex-col flex-grow justify-center">
                    {card.topText && (
                      <span className="text-xs md:text-sm lg:text-base font-bold text-white mb-1">
                        {card.topText}
                      </span>
                    )}
                    <div className={`flex ${card.topText ? 'flex-row flex-wrap items-center gap-x-2 gap-y-0.5' : 'flex-col'} md:flex-col md:items-stretch md:gap-0`}>
                      <span className="text-5xl md:text-[1.4rem] xl:text-[1.5rem] font-extrabold text-secondary leading-none md:mb-2 shrink-0">
                        {card.highlightText}
                      </span>
                      <span className="text-xs md:text-sm lg:text-base font-bold text-white whitespace-pre-line leading-snug">
                        {card.bottomText}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative md:absolute md:bottom-6 md:right-6 text-secondary group-hover:translate-x-2 transition-transform duration-300 z-10 shrink-0 ml-2 md:ml-0">
                  <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
                </div>
              </Link>
            );
          })}
        </div>

        {buttonText && buttonHref && (
          <div className="mt-8 order-5 md:order-none">
            <Button href={buttonHref} variant="secondary">
              {buttonText}
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}
