import React from 'react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'verde';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  target,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 shadow-lg text-center";
  
  const variants = {
    primary: "bg-primary hover:bg-secondary text-white",
    secondary: "bg-secondary hover:bg-primary text-white",
    verde: "bg-verdecredicitrus hover:bg-secondary text-white",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 md:px-12 py-3 md:py-4 text-sm md:text-base",
    lg: "px-12 md:px-20 py-3 md:py-4 text-base lg:text-lg"
  };

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
    const finalTarget = target || (isExternal ? '_blank' : undefined);
    const finalRel = finalTarget === '_blank' ? 'noopener noreferrer' : undefined;

    return (
      <Link href={href} target={finalTarget} rel={finalRel} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
