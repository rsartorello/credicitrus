'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import AnimateIn from '@/components/ui/AnimateIn';

export interface ContentBlockSectionProps {
  /** Texto pequeno acima do título principal (Eyebrow) */
  eyebrowText?: string;
  /** Título grande em destaque (lado da imagem) */
  title: React.ReactNode;
  /** Array de parágrafos para renderizar na parte inferior (ou lateral se paragraphsInside for true) */
  paragraphs?: React.ReactNode[];
  /** Se true, renderiza os parágrafos ao lado da imagem, abaixo do título */
  paragraphsInside?: boolean;
  /** Caminho da imagem */
  imageSrc: string;
  /** Alt da imagem */
  imageAlt: string;
  /** Posição da imagem (default: 'right') */
  imagePosition?: 'left' | 'right';
  /** Cor de fundo da seção */
  bgColor?: string;
  /** Proporção da imagem (ex: 'aspect-[4/3]' ou 'aspect-square') */
  imageAspectRatio?: string;
  /** Link/Botão opcional no rodapé do bloco de texto */
  cta?: {
    text: string;
    href: string;
  };
  /** Texto pequeno abaixo dos parágrafos */
  footerText?: React.ReactNode;
  /** Pesos de fonte customizados */
  titleWeight?: string;
  paragraphWeight?: string;
  footerWeight?: string;
  /** Centralizar o eyebrow no topo da seção */
  eyebrowCentered?: boolean;
  /** Cor customizada para o eyebrow (hex ou classe) */
  eyebrowColor?: string;
  /** Centralizar os parágrafos inferiores */
  paragraphsCentered?: boolean;
  /** Border radius da imagem */
  imageBorderRadius?: string;
  /** Espaçamento entre letras do título */
  titleTracking?: string;
  /** Cor do título */
  titleColor?: string;
  /** Classe customizada para a imagem */
  imageClassName?: string;
  /** Remover sombra da imagem */
  noShadow?: boolean;
  /** Alinhamento do título (left, center, right) */
  titleAlign?: 'left' | 'center' | 'right';
  /** Inverter a ordem da imagem e do texto no mobile, e centralizar o rodapé */
  reverseOnMobile?: boolean;
}

export default function ContentBlockSection({
  eyebrowText,
  title,
  paragraphs = [],
  paragraphsInside = false,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  bgColor = 'bg-white',
  imageAspectRatio = 'aspect-[4/3]',
  cta,
  footerText,
  titleWeight = 'font-regular',
  paragraphWeight = 'font-medium',
  footerWeight = 'font-bold',
  eyebrowCentered = false,
  eyebrowColor = '#8CC63F',
  paragraphsCentered = false,
  imageBorderRadius = '0 100px 0 100px',
  titleTracking = 'tracking-[0.05em]',
  titleColor = 'text-[#00a99d]',
  imageClassName = 'object-cover',
  noShadow = false,
  titleAlign = 'left',
  reverseOnMobile = false
}: ContentBlockSectionProps) {
  const isImageRight = imagePosition === 'right';

  return (
    <section className={`w-full ${bgColor} py-16 md:py-24`}>
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 max-w-[1200px] flex flex-col gap-12 md:gap-16">

        {eyebrowText && eyebrowCentered && (
          <div className="w-full flex justify-center">
            <h4
              className="font-extrabold text-3xl md:text-4xl lg:text-5xl xl:text-7xl tracking-normal mb-4 text-primary"
            >
              {eyebrowText}
            </h4>
          </div>
        )}

        {/* Bloco Superior: Título e Imagem */}
        <div className={`w-full flex ${reverseOnMobile ? 'flex-col-reverse' : 'flex-col'} ${isImageRight ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 lg:gap-8`}>

          {/* Lado do Texto (Título + Parágrafos opcionais) */}
          <AnimateIn direction="right" delay={0.1} className={`w-full md:w-1/2 flex flex-col ${titleAlign === 'right' ? 'items-center md:items-end' : titleAlign === 'center' ? 'items-center' : 'items-center md:items-start'} justify-center`}>
            {eyebrowText && !eyebrowCentered && (
              <h4
                className="font-medium text-xs md:text-base uppercase tracking-[0.2em] mb-4 text-center md:text-left"
                style={{ color: eyebrowColor }}
              >
                {eyebrowText}
              </h4>
            )}
            <h2
              className={`${titleColor} ${titleWeight} uppercase mb-8 md:mb-12 text-center md:text-${titleAlign}`}
              style={{
                letterSpacing: '0.2em',
                fontSize: 'clamp(1.5rem, 8vw, 3.5rem)',
                lineHeight: '1.1',
              }}
            >
              {title}
            </h2>

            {/* Parágrafos na lateral (opcional) */}
            {paragraphsInside && paragraphs.length > 0 && (
              <div className="flex flex-col gap-6 md:gap-8 mb-12 w-full items-center md:items-start text-center md:text-left">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className={`text-[#58595b] ${paragraphWeight} text-sm md:text-lg lg:text-xl leading-relaxed max-w-xl text-center md:text-left`}>
                    {p}
                  </p>
                ))}
              </div>
            )}

          </AnimateIn>

          {/* Lado da Imagem */}
          <AnimateIn direction="left" delay={0.2} disableOnMobile={true} className={`w-full md:w-1/2 flex justify-center ${isImageRight ? 'md:justify-start' : 'md:justify-end'}`}>
            <div
              className={`relative w-full max-w-[450px] md:max-w-[550px] ${imageAspectRatio} overflow-hidden ${noShadow ? '' : 'shadow-xl md:shadow-2xl'}`}
              style={{ borderRadius: '0 50px 0 50px' }} // Adjusted for mobile
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className={`${imageClassName} transition-transform duration-700 hover:scale-105`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </AnimateIn>
        </div>

        {/* Bloco de Rodapé: FooterText + CTA (Opcional, alinhados na mesma linha) */}
        {paragraphsInside && (footerText || cta) && (
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 mt-4">
            <div className={`w-full md:w-1/2 flex ${reverseOnMobile ? 'justify-center' : 'justify-start'} md:justify-start`}>
              {footerText && (
                <div className={`text-primary ${footerWeight} text-xl md:text-2xl lg:text-3xl leading-tight ${reverseOnMobile ? 'text-center' : 'text-left'} md:text-left`}>
                  {footerText}
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              {cta && (
                <Button
                  href={cta.href}
                  variant="secondary"
                  size="md"
                  className="w-full"
                  target={
                    cta.href.startsWith('http://') ||
                      cta.href.startsWith('https://') ||
                      cta.href.startsWith('//')
                      ? '_blank'
                      : undefined
                  }
                >
                  {cta.text}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Bloco Inferior: Parágrafos (apenas se não estiverem na lateral) */}
        {!paragraphsInside && paragraphs.length > 0 && (
          <AnimateIn delay={0.3} className={`w-full flex flex-col gap-6 ${paragraphsCentered ? 'mx-auto text-center items-center max-w-5xl' : 'max-w-4xl'}`}>
            {paragraphs.map((p, idx) => (
              <p key={idx} className={`text-[#58595b] ${paragraphWeight} text-base md:text-lg leading-relaxed`}>
                {p}
              </p>
            ))}
          </AnimateIn>
        )}

      </div>
    </section>
  );
}
