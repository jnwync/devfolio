'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function HeroImage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="aspect-square rounded-full bg-muted animate-pulse" />
      )}

      {/* Image container with gradient background */}
      <div 
        className={`hero-image-container aspect-square rounded-full overflow-hidden ${
          !isLoaded ? 'absolute inset-0 opacity-0' : ''
        }`}
      >
        <Image
          src="/images/hero/hero-profile.png"
          alt="Professional headshot of Jon Wayne Cabusbusan, Full-Stack Web Developer"
          width={600}
          height={600}
          priority
          className={`hero-image w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => {
            console.log('Image loaded successfully');
            setIsLoaded(true);
          }}
          onError={(e) => {
            console.error('Failed to load image:', e);
            setIsLoaded(true);
          }}
        />
      </div>
      
      {/* Subtle accent glow */}
      <div 
        className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-accent/5 rounded-full blur-2xl -z-10 pointer-events-none" 
        aria-hidden="true"
      />
    </div>
  );
}