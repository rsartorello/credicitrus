import React from 'react';
import Image, { type ImageProps } from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  containerClassName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
}

const aspectRatios = {
  square: '1/1',
  video: '16/9',
  portrait: '3/4',
  auto: 'auto',
};

export default function OptimizedImage({
  alt,
  src,
  width,
  height,
  fill,
  className,
  containerClassName,
  aspectRatio = 'auto',
  priority = false,
  ...props
}: OptimizedImageProps) {
  // Common sizes attribute for better performance
  const sizes = props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        containerClassName
      )}
      style={{ aspectRatio: aspectRatios[aspectRatio] }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={cn(
          'object-contain',
          fill ? 'absolute inset-0 h-full w-full' : 'h-auto w-full',
          className
        )}
        loading={priority ? undefined : 'lazy'}
        {...props}
      />
    </div>
  );
}
