'use client';

import { useState } from 'react';

export default function HeroImage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className="relative mx-auto w-full max-w-sm border border-border bg-card p-3 shadow-(--shadow-soft) lg:mx-0">
      {!isLoaded && <div className="aspect-4/5 animate-pulse bg-muted" aria-hidden="true" />}

      <div className={isLoaded ? 'block' : 'absolute inset-3 opacity-0'}>
        <img
          src="/images/hero/Cabusbusan-ID.svg"
          alt="Professional headshot of Jon Wayne Cabusbusan"
          width={520}
          height={650}
          className="aspect-4/5 w-full object-cover object-top"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        <span>Iloilo, PH</span>
        <span>Full-stack web systems</span>
      </figcaption>
    </figure>
  );
}
