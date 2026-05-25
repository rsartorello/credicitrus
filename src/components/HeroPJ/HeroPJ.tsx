'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import {
  HERO_BUTTONS_LAYER_CLASSES,
  HERO_IMAGE_CLASSES,
  HERO_IMAGE_LAYER_CLASSES,
  HERO_MEDIA_CLASSES,
  HERO_SECTION_CLASSES,
  HERO_TITLE_AREA_CLASSES,
  HERO_TITLE_INNER_CLASSES,
} from '@/components/Hero/heroHeight';

interface HeroPJProps {
  backgroundImage: string;
  titleLines: string[];
  buttons: Array<{ label: string; href: string; variant?: 'primary' | 'secondary' }>;
}

export default function HeroPJ({
  backgroundImage,
  titleLines,
  buttons
}: HeroPJProps) {
  return (
    <section className={HERO_SECTION_CLASSES}>
      <div className={HERO_MEDIA_CLASSES}>
        <div className={HERO_IMAGE_LAYER_CLASSES}>
          <Image
            src={backgroundImage}
            alt="Hero Empréstimo PJ"
            fill
            priority
            sizes="100vw"
            className={HERO_IMAGE_CLASSES}
          />
        </div>

        <div className={HERO_TITLE_AREA_CLASSES}>
          <div className={HERO_TITLE_INNER_CLASSES}>
            <div className="max-w-[90%] md:max-w-[70%] lg:max-w-[60%]">
              <h1 className="flex flex-col items-start text-white font-extrabold text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.25rem] leading-[1.1] tracking-tight uppercase">
                {titleLines.map((line, idx) => {
                  const isLast = idx === titleLines.length - 1;
                  const bgColor = isLast ? 'bg-secondary' : 'bg-primary';
                  return (
                    <span key={idx} className={`${bgColor} px-3 md:px-5 py-1.5 mb-[2px] block w-fit`}>
                      {line}
                    </span>
                  );
                })}
              </h1>
            </div>
          </div>
        </div>

        <div className={HERO_BUTTONS_LAYER_CLASSES}>
          <div className="pointer-events-auto container mx-auto px-4 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 w-full">
              {buttons.length === 1 ? (
                <div className="md:col-start-2 flex justify-center">
                  <Button
                    href={buttons[0].href}
                    variant={buttons[0].variant || 'secondary'}
                    size="lg"
                    className="shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-transform w-full sm:w-[420px] text-center"
                  >
                    {buttons[0].label}
                  </Button>
                </div>
              ) : (
                buttons.map((btn, idx) => (
                  <div key={idx} className="flex justify-center">
                    <Button
                      href={btn.href}
                      variant={btn.variant || 'secondary'}
                      size="lg"
                      className="shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-transform w-full sm:w-[420px] text-center"
                    >
                      {btn.label}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
