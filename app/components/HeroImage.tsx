import Image from 'next/image';

export default function HeroImage() {
  return (
    <figure className="portrait-card premium-hover group mx-auto w-full max-w-sm border border-border bg-card p-3 shadow-(--shadow-soft) lg:mx-0">
      <span
        aria-hidden="true"
        className="absolute -right-10 top-12 hidden rotate-90 border border-border bg-background/85 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground shadow-(--shadow-soft) lg:block"
      >
        Verified profile
      </span>
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

      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-border pt-3 text-xs font-bold uppercase leading-5 tracking-[0.12em] text-muted-foreground">
        <span>Iloilo, PH</span>
        <span>Full-stack web systems</span>
      </figcaption>
    </figure>
  );
}
