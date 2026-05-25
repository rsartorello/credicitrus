import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';

interface FeatureSectionProps {
  subtitle?: string;
  title?: string;
  imagePosition?: 'left' | 'right';
  highlightText: React.ReactNode;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  bgColor?: string;
  reverseOnMobile?: boolean;
}

export default function FeatureSection({
  subtitle,
  title,
  imagePosition = 'right',
  highlightText,
  description,
  imageSrc,
  imageAlt,
  bgColor = "bg-white",
  reverseOnMobile = false
}: FeatureSectionProps) {
  const isImageRight = imagePosition === 'right';

  return (
    <section className={`w-full ${bgColor} py-24 pb-32 flex flex-col items-center overflow-hidden`}>
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 flex flex-col items-center gap-12 lg:gap-20">

        {(subtitle || title) && (
          <SectionHeader subtitle={subtitle} title={title || ''} />
        )}

        <div className={`w-full flex ${reverseOnMobile ? 'flex-col-reverse' : 'flex-col'} ${isImageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-center gap-12 lg:gap-16`}>

          <div className={`w-full lg:w-[60%] flex justify-center ${isImageRight ? 'lg:justify-end xl:pr-10' : 'lg:justify-start xl:pl-10'}`}>
            <h3 className={`text-4xl md:text-5xl xl:text-6xl font-medium text-secondary leading-[1.15] text-center ${isImageRight ? 'lg:text-right' : 'lg:text-left'} uppercase tracking-widest`}>
              {highlightText}
            </h3>
          </div>

          <div className={`w-full lg:w-[40%] flex justify-center ${isImageRight ? 'lg:justify-start' : 'lg:justify-end'}`}>
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-tr-[40px] rounded-bl-[40px] overflow-hidden shadow-xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

        </div>

        {description && (
          <div className="w-full flex justify-center">
            <p className="text-xl md:text-2xl lg:text-3xl font-normal text-primary leading-[1.4] text-center max-w-[1200px] tracking-tight px-4">
              {description}
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
