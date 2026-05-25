import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

const sizes = {
  default: 'max-w-[1400px]',
  narrow: 'max-w-[900px]',
  wide: 'max-w-[1600px]',
  full: 'max-w-full',
};

export default function Container({
  children,
  className,
  size = 'default',
}: ContainerProps) {
  return (
    <div
      className={cn(
        'container mx-auto px-4 lg:px-8 xl:px-12',
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
}
