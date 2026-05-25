import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InfoCardProps {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  variant?: 'white' | 'gray' | 'outline';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  centered?: boolean;
}

const variants = {
  white: 'bg-white shadow-sm',
  gray: 'bg-[#f8f9fa] shadow-sm',
  outline: 'bg-transparent border border-gray-200',
};

const roundness = {
  sm: 'rounded-xl',
  md: 'rounded-2xl',
  lg: 'rounded-3xl',
  full: 'rounded-[2rem] md:rounded-full',
};

export default function InfoCard({
  title,
  description,
  icon,
  footer,
  className,
  variant = 'gray',
  rounded = 'lg',
  centered = false,
}: InfoCardProps) {
  return (
    <div
      className={cn(
        'p-8 md:p-10 flex flex-col transition-all duration-300',
        variants[variant],
        roundness[rounded],
        centered ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {icon && <div className="mb-6">{icon}</div>}
      
      {title && (
        <h3 className="text-primary font-extrabold text-lg md:text-xl mb-4 leading-snug">
          {title}
        </h3>
      )}
      
      {description && (
        <div className="text-primary font-normal text-sm md:text-base leading-relaxed">
          {description}
        </div>
      )}

      {footer && <div className="mt-auto pt-6 w-full">{footer}</div>}
    </div>
  );
}
