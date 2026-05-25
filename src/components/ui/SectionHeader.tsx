import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionHeaderProps {
  subtitle?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  variant?: 'primary' | 'white';
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  centered = true,
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  variant = 'primary',
}: SectionHeaderProps) {
  const textColor = variant === 'white' ? 'text-white' : 'text-primary';
  const subtitleColor = variant === 'white' ? 'text-white/80' : 'text-[#8fb534]';

  return (
    <div className={cn(
      'mb-0 md:mb-2 max-w-4xl',
      centered ? 'text-center mx-auto' : 'text-left',
      className
    )}>
      {subtitle && (
        <h4 className={cn(
          'font-bold tracking-widest text-sm md:text-base uppercase mb-4',
          subtitleColor,
          subtitleClassName
        )}>
          {subtitle}
        </h4>
      )}

      <h2 className={cn(
        'font-extrabold text-3xl md:text-4xl lg:text-[2.9rem] leading-tight tracking-tight whitespace-pre-line',
        textColor,
        titleClassName
      )}>
        {title}
      </h2>

      {description && (
        <div className={cn(
          'mt-6 text-lg md:text-xl font-normal leading-relaxed',
          textColor,
          variant === 'primary' ? 'opacity-90' : 'opacity-100',
          descriptionClassName
        )}>
          {description}
        </div>
      )}
    </div>
  );
}
