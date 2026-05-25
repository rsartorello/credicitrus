'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface VideoCardProps {
  url: string;
  alt: string;
}

function getYoutubeId(url: string): string | null {
  const cleanUrl = url.replace(/^h+ttps/, 'https');
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = cleanUrl.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function VideoCard({ url, alt }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeId(url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

  if (isPlaying && videoId) {
    return (
      <div 
        className="w-full relative rounded-3xl overflow-hidden shadow-xl"
        style={{ aspectRatio: '16/9' }}
      >
        <iframe
          className="w-full h-full absolute inset-0 border-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setIsPlaying(true)}
      className="w-full relative rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 shadow-xl group block"
      style={{ aspectRatio: '16/9' }}
    >
      {thumbnailUrl && (
        <Image 
          src={thumbnailUrl} 
          alt={alt} 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          unoptimized
        />
      )}
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#e3000f] rounded-full flex items-center justify-center border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
