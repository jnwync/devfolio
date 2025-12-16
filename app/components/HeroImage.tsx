'use client';

import Image from 'next/image';
import { useTheme } from './ThemeProvider';

export default function HeroImage() {
  const { theme, mounted } = useTheme();

  // Prevent hydration mismatch by using light image as default
  const src = !mounted || theme === 'light'
    ? '/images/hero/hero-profile-light.png'
    : '/images/hero/hero-profile-dark.png';

  return (
    <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <Image
          src={src}
          alt="Jon Wayne Cabusbusan"
          width={600}
          height={600}
          priority
          className="hero-image w-full h-full object-cover"
        />
      </div>
      
      {/* Subtle accent glow */}
      <div className="absolute -inset-4 bg-accent/5 rounded-3xl blur-2xl -z-10" />
    </div>
  );
}