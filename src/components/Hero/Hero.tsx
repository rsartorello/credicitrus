'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import HeroButtons from './HeroButtons';
import AnimateIn from '@/components/ui/AnimateIn';
import { usePathname } from 'next/navigation';
import {
  HERO_HEIGHT_CLASSES,
  HERO_IMAGE_CLASSES,
  HERO_IMAGE_LAYER_CLASSES,
  HERO_MEDIA_CLASSES,
  HERO_SECTION_CLASSES,
  HERO_TITLE_AREA_CLASSES,
  HERO_TITLE_INNER_CLASSES,
} from './heroHeight';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Hero.css';

interface HeroProps {
  backgroundImage: string | string[];
  mobileBackgroundImage?: string | string[];
  titleLines?: string[];
  subtitleColor?: 'primary' | 'secondary';
  buttons?: Array<{ label: string; href: string; variant?: 'primary' | 'secondary' | 'outline' | 'verde'; target?: string }>;
  collageImages?: Array<{ src: string; alt: string; top?: string; left?: string; right?: string; bottom?: string; width?: string; z?: number }>;
  isHome?: boolean;
  highlightIndices?: number | number[];
  imagePosition?: string;
  mirrorImage?: boolean;
  isSlider?: boolean;
}

export default function Hero({
  backgroundImage,
  mobileBackgroundImage,
  titleLines = [],
  buttons = [],
  collageImages = [],
  isHome = false,
  highlightIndices,
  imagePosition = 'center',
  mirrorImage = false,
  isSlider = false
}: HeroProps) {
  const singleImage = Array.isArray(backgroundImage) ? backgroundImage[0] : backgroundImage;

  if (isSlider) {
    const images = Array.isArray(backgroundImage) ? backgroundImage : [backgroundImage];
    const sectionClass = isHome
      ? "w-full relative shrink-0 overflow-hidden h-[calc(100vh-96px)] md:h-[calc(100vh-128px)] lg:h-[calc(100vh-88px)]"
      : `w-full relative shrink-0 overflow-hidden ${HERO_HEIGHT_CLASSES}`;

    return (
      <section className={sectionClass}>
        <div className="absolute inset-0 z-0 w-full h-full">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loop={images.length > 1}
            navigation={images.length > 1 ? {
              prevEl: '.hero-btn-prev',
              nextEl: '.hero-btn-next',
            } : false}
            pagination={images.length > 1 ? {
              clickable: true,
              el: '.hero-btn-pagination',
              renderBullet: (index, className) => {
                return `<span class="${className} hero-bullet"></span>`;
              },
            } : false}
            className="w-full h-full"
          >
            {images.map((img, idx) => {
              const mobImg = mobileBackgroundImage
                ? (Array.isArray(mobileBackgroundImage)
                  ? mobileBackgroundImage[idx]
                  : (idx === 0 ? mobileBackgroundImage : undefined))
                : undefined;

              return (
                <SwiperSlide key={idx} className="relative w-full h-full overflow-hidden">
                  {mobImg ? (
                    <>
                      <div className="hidden md:block absolute inset-0 size-full">
                        <Image
                          src={img}
                          alt={`Fundo Hero ${idx + 1}`}
                          fill
                          priority={idx === 0}
                          sizes="100vw"
                          className={HERO_IMAGE_CLASSES}
                        />
                      </div>
                      <div className="block md:hidden absolute inset-0 size-full">
                        <Image
                          src={mobImg}
                          alt={`Fundo Hero Mobile ${idx + 1}`}
                          fill
                          priority={idx === 0}
                          sizes="100vw"
                          className={HERO_IMAGE_CLASSES}
                        />
                      </div>
                    </>
                  ) : (
                    <Image
                      src={img}
                      alt={`Fundo Hero ${idx + 1}`}
                      fill
                      priority={idx === 0}
                      sizes="100vw"
                      className={HERO_IMAGE_CLASSES}
                    />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-5 w-full pointer-events-auto">
            <button className="hero-btn-prev cursor-pointer select-none flex items-center justify-center">
              <svg width="12" height="20" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 27.5L3 15L15.5 2.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="hero-btn-pagination flex items-center justify-center gap-5"></div>
            <button className="hero-btn-next cursor-pointer select-none flex items-center justify-center">
              <svg width="12" height="20" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 27.5L15 15L2.5 2.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </section>
    );
  }

  if (isHome) {
    const mobImg = mobileBackgroundImage
      ? (Array.isArray(mobileBackgroundImage) ? mobileBackgroundImage[0] : mobileBackgroundImage)
      : undefined;

    return (
      <section
        className="w-full relative shrink-0 overflow-hidden h-[calc(100vh-96px)] md:h-[calc(100vh-128px)] lg:h-[calc(100vh-88px)]"
      >
        <div className={HERO_IMAGE_LAYER_CLASSES}>
          {mobImg ? (
            <>
              <div className="hidden md:block absolute inset-0 size-full">
                <Image
                  src={singleImage}
                  alt="Fundo Hero"
                  fill
                  priority
                  sizes="100vw"
                  className={HERO_IMAGE_CLASSES}
                />
              </div>
              <div className="block md:hidden absolute inset-0 size-full">
                <Image
                  src={mobImg}
                  alt="Fundo Hero Mobile"
                  fill
                  priority
                  sizes="100vw"
                  className={HERO_IMAGE_CLASSES}
                />
              </div>
            </>
          ) : (
            <Image
              src={singleImage}
              alt="Fundo Hero"
              fill
              priority
              sizes="100vw"
              className={HERO_IMAGE_CLASSES}
            />
          )}
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-6 xl:px-8 flex flex-col lg:flex-row items-center justify-between w-full h-full gap-8 xl:gap-2 py-10 md:py-12">

          <div className="w-full lg:w-[48%] xl:w-[42%] flex flex-col items-start gap-8 lg:gap-12">
            <AnimateIn direction="left" delay={0.1}>
              <h1 className="flex flex-col items-start text-white font-extrabold text-3xl lg:text-4xl xl:text-[2.75rem] leading-[1.1] tracking-tight uppercase">
                {titleLines.map((line, idx) => (
                  <span key={idx} className="bg-primary px-4 md:px-5 py-2 block w-fit -mt-[1px]">
                    {line}
                  </span>
                ))}
              </h1>
            </AnimateIn>

            <HeroButtons buttons={buttons} isHome={isHome} />
          </div>

          <div className="w-full lg:w-[50%] xl:w-[54%] xl:-ml-10 relative flex-1 min-h-0 flex items-center justify-center">
            <AnimateIn direction="right" delay={0.3} className="relative w-full max-w-[700px] h-full max-h-full aspect-square">
              {collageImages.map((img, idx) => (
                <div
                  key={idx}
                  className="absolute hover:scale-105 transition-transform duration-500"
                  style={{
                    top: img.top,
                    left: img.left,
                    right: img.right,
                    bottom: img.bottom,
                    width: img.width,
                    zIndex: img.z
                  }}
                >
                  <Image src={img.src} alt={img.alt} width={400} height={400} className="w-full h-auto object-contain drop-shadow-md" />
                </div>
              ))}
            </AnimateIn>
          </div>

        </div>
      </section>
    );
  }

  const pathname = usePathname();
  const normalizedPath = pathname?.replace(/\/$/, '') || '';
  const noMarginPaths = ['/nossas-redes-sociais', '/nossas-agencias', '/duvidas-frequentes'];
  const hasNoMargin = noMarginPaths.includes(normalizedPath) || normalizedPath.startsWith('/transparencia');

  const sectionClass = hasNoMargin
    ? HERO_SECTION_CLASSES.replace('mb-12 md:mb-20', '').trim()
    : HERO_SECTION_CLASSES;

  return (
    <section className={sectionClass}>
      <div className={HERO_MEDIA_CLASSES}>
        <div className={HERO_IMAGE_LAYER_CLASSES}>
          <Image
            src={singleImage}
            alt="Hero"
            fill
            priority
            sizes="100vw"
            className={HERO_IMAGE_CLASSES}
            style={{
              objectPosition: imagePosition === 'center' ? 'center center' : imagePosition,
              transform: mirrorImage ? 'scaleX(-1)' : 'none',
            }}
          />
        </div>

        <div className={HERO_TITLE_AREA_CLASSES}>
          <div className={HERO_TITLE_INNER_CLASSES}>
            <AnimateIn direction="none" delay={0.2} className="max-w-[95%] md:max-w-[70%] lg:max-w-[60%]">
              <h1 className="flex flex-col items-start text-white font-extrabold text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.25rem] leading-[1.1] tracking-tight uppercase">
                {titleLines.map((line, idx) => {
                  let isHighlighted = false;

                  if (highlightIndices !== undefined) {
                    if (Array.isArray(highlightIndices)) {
                      isHighlighted = highlightIndices.includes(idx);
                    } else {
                      isHighlighted = highlightIndices === idx;
                    }
                  } else {
                    isHighlighted = idx === titleLines.length - 1;
                  }

                  const bgColor = isHighlighted ? 'bg-secondary' : 'bg-primary';
                  const isActuallyPlain = line === 'SEGURO' || line === 'SEGUROS';

                  return (
                    <span
                      key={idx}
                      className={`${isActuallyPlain ? 'text-white bg-secondary py-0 px-3 md:px-5 mb-1' : `${bgColor} text-white px-3 md:px-5 py-1.5 mb-[2px]`} block w-fit`}
                    >
                      {line}
                    </span>
                  );
                })}
              </h1>
            </AnimateIn>
          </div>
        </div>

        <HeroButtons buttons={buttons} isHome={isHome} />
      </div>
    </section>
  );
}
