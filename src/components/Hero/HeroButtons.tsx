'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Button from '@/components/ui/Button';
import { HERO_BUTTONS_LAYER_CLASSES } from './heroHeight';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface HeroButtonsProps {
  buttons: Array<{ label: string; href: string; variant?: 'primary' | 'secondary' | 'outline' | 'verde'; target?: string }>;
  isHome?: boolean;
}

export default function HeroButtons({ buttons, isHome }: HeroButtonsProps) {
  if (buttons.length === 0) return null;

  if (isHome) {
    return (
      <div className="w-full max-w-[360px] hero-button-slider">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation={{
            prevEl: '.hero-btn-prev',
            nextEl: '.hero-btn-next',
          }}
          pagination={{
            clickable: true,
            el: '.hero-btn-pagination',
            bulletClass: 'hero-bullet',
            bulletActiveClass: 'hero-bullet-active',
          }}
          className="w-full rounded-full overflow-hidden"
        >
          {buttons.map((btn, idx) => (
            <SwiperSlide key={idx}>
              <Button href={btn.href} target={btn.target} variant={btn.variant || 'secondary'} className="w-full py-4 rounded-none">
                {btn.label}
              </Button>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center justify-center gap-6 mt-4 w-full">
          <button className="hero-btn-prev text-[#e5e7eb] hover:text-primary transition-colors text-3xl font-light">
            &lsaquo;
          </button>
          <div className="hero-btn-pagination flex items-center gap-2"></div>
          <button className="hero-btn-next text-[#e5e7eb] hover:text-primary transition-colors text-3xl font-light">
            &rsaquo;
          </button>
        </div>
      </div>
    );
  }

  const isSingle = buttons.length === 1;

  return (
    <div className={HERO_BUTTONS_LAYER_CLASSES}>
      <div className="pointer-events-auto container mx-auto px-4 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 w-full">
          {isSingle ? (
            <div className="md:col-start-2 flex justify-center">
              <Button
                href={buttons[0].href}
                target={buttons[0].target}
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
                  target={btn.target}
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
  );
}
