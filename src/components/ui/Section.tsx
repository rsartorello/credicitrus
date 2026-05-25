import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'primary' | 'secondary' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  as?: 'section' | 'div' | 'header' | 'footer';
}

const backgrounds = {
  white: 'bg-white',
  gray: 'bg-[#f8f9fa]',
  primary: 'bg-[#003641]',
  secondary: 'bg-[#00a99d]',
  transparent: 'bg-transparent',
};

const paddings = {
  none: 'py-0',
  sm: 'py-8 md:py-12',
  md: 'py-16 md:py-20',
  lg: 'py-20 md:py-28',
  xl: 'py-24 md:py-32',
};

export default function Section({
  children,
  className,
  id,
  background = 'white',
  padding = 'md',
  as: Component = 'section',
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        'w-full',
        backgrounds[background],
        paddings[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}
