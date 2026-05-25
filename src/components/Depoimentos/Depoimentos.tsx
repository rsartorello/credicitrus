'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { Play } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import CSS
import './Depoimentos.css';

export interface DepoimentoSlide {
  id: string;
  imageSrc: string;
  name: string;
  type: string;
  time: string;
  videoUrl?: string; // links the play button click
}

export interface DepoimentosProps {
  subtitle?: string;
  title?: string;
  description?: string;
  slides?: DepoimentoSlide[];
}

export default function Depoimentos({
  subtitle = 'DEPOIMENTOS',
  title = 'Faça como os mais de 170 mil cooperados.',
  description = 'Confie na Credicitrus para realizar seus sonhos e fazer seus negócios crescerem.',
  slides = [
    {
      id: 'nelson',
      imageSrc: '/depoimentos/depoimento-nelson.png',
      name: 'Nelson',
      type: 'Cliente Agro',
      time: 'há 15 anos',
      videoUrl: '#'
    },
    {
      id: 'jaqueline',
      imageSrc: '/depoimentos/depoimento-jaqueline.png',
      name: 'Jaqueline',
      type: 'Cliente Empresa',
      time: 'há 5 anos',
      videoUrl: '#'
    },
    {
      id: 'nelson2',
      imageSrc: '/depoimentos/depoimento-nelson.png',
      name: 'Nelson Clone',
      type: 'Cliente Agro',
      time: 'há 15 anos',
      videoUrl: '#'
    }
  ]
}: DepoimentosProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section className="w-full bg-[#f9fafb] py-16 lg:py-24 flex flex-col items-center overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">
        
        {/* Left Content (Carousel) */}
        <div className="w-full lg:w-[50%] xl:w-[55%] flex flex-col">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 2.2, spaceBetween: 30 },
              1024: { slidesPerView: 2, spaceBetween: 40 },
              1280: { slidesPerView: 2.5, spaceBetween: 40 }
            }}
            loop={slides.length >= 6}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            className="w-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="flex flex-col">
                <button 
                  className="group relative w-full aspect-[3/4.5] rounded-3xl overflow-hidden mb-4 lg:mb-6 block text-left transition-transform duration-300 hover:-translate-y-2 drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] focus:outline-none"
                  onClick={() => window.open(slide.videoUrl, '_blank')}
                  aria-label={`Ver depoimento em vídeo de ${slide.name}`}
                >
                  <Image 
                    src={slide.imageSrc}
                    alt={`Depoimento ${slide.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {/* Overlay for Play Button */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[2px] border-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-5 h-5 md:w-6 md:h-6 text-white ml-1" fill="white" strokeWidth={1.5} />
                    </div>
                  </div>
                </button>
                
                {/* Text below image */}
                <div className="flex flex-col px-2">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg lg:text-xl font-extrabold text-[#003641] leading-none">{slide.name}</h3>
                    {/* 5 Stars */}
                    <div className="flex items-center gap-[1px]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-[12px] h-[12px] text-[#8fb534]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm text-[#003641] font-normal leading-[1.3]">{slide.type}</p>
                  <p className="text-xs lg:text-sm text-[#003641] font-normal leading-[1.3]">{slide.time}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation & Pagination (Mobile only) */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
            <button 
              className="depoimentos-prev transition-transform hover:scale-110"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 27.5L3 15L15.5 2.5" stroke="#E1E1E1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Pagination container */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`depoimentos-bullet border-none p-0 ${activeIndex === index ? 'hero-bullet-active' : ''}`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button 
              className="depoimentos-next transition-transform hover:scale-110"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 27.5L15 15L2.5 2.5" stroke="#E1E1E1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Content (Texts and Pagination) */}
        <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col justify-center">
          <h4 className="text-sm md:text-base lg:text-lg font-medium text-[#8fb534] uppercase tracking-wider mb-4 lg:mb-5">
            {subtitle}
          </h4>
          
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-[#003641] leading-[1.05] tracking-tight mb-6 lg:mb-8">
            {title}
          </h1>

          <h3 className="text-lg md:text-xl lg:text-[1.33rem] font-normal text-[#003641] leading-[1.3] mb-10 lg:mb-14 max-w-lg">
            {description}
          </h3>

          {/* Custom Navigation & Pagination (Desktop only) */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              className="depoimentos-prev transition-transform hover:scale-110"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 27.5L3 15L15.5 2.5" stroke="#E1E1E1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Pagination container */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiperRef.current?.slideTo(index)}
                  className={`depoimentos-bullet border-none p-0 ${activeIndex === index ? 'hero-bullet-active' : ''}`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>

            <button 
              className="depoimentos-next transition-transform hover:scale-110"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 27.5L15 15L2.5 2.5" stroke="#E1E1E1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
