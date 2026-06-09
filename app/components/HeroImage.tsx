import Image from 'next/image';

export default function HeroImage() {
  return (
    <figure className="relative mx-auto w-full max-w-sm border border-border bg-card p-3 shadow-(--shadow-soft) lg:mx-0">
      <div className="aspect-4/5 w-full overflow-hidden bg-muted">
        <Image
          src="/images/hero/hero-portrait.webp"
          alt="Professional headshot of Jon Wayne Cabusbusan"
          width={864}
          height={1080}
          priority
          sizes="(max-width: 1024px) 90vw, 360px"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        <span>Iloilo, PH</span>
        <span>Full-stack web systems</span>
      </figcaption>
    </figure>
  );
}
