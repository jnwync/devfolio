import Image from 'next/image';

/**
 * Portrait in the system's frame language: rounded card, hairline border,
 * registration corner marks, and a mono location tag — the same technical
 * vocabulary as the browser frames and metric rails.
 */
export default function HeroImage() {
  return (
    <figure className="group relative mx-auto w-72 rotate-2 transition-transform duration-500 ease-(--ease-out-quint) hover:rotate-0 sm:w-80 lg:mx-0 lg:w-87">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src="/images/hero/hero-portrait.webp"
          alt="Portrait of Jon Wayne Cabusbusan"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 360px"
          className="object-cover object-top transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.03]"
        />
        <span className="mono-micro absolute bottom-3 left-3 rounded-md bg-ink/70 px-2.5 py-1.5 text-paper-on-ink backdrop-blur-sm">
          Iloilo, PH
        </span>
      </div>
      <span aria-hidden="true" className="absolute -top-2 -left-2 h-4 w-4 border-t border-l border-foreground/50" />
      <span aria-hidden="true" className="absolute -top-2 -right-2 h-4 w-4 border-t border-r border-foreground/50" />
      <span aria-hidden="true" className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-foreground/50" />
      <span aria-hidden="true" className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-foreground/50" />
    </figure>
  );
}
