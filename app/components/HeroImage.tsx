import Image from 'next/image';

export default function HeroImage() {
  return (
    <figure className="portrait-card premium-hover group mx-auto w-full max-w-xs rotate-1 border border-border bg-card p-3 shadow-(--shadow-soft) transition-transform duration-500 ease-(--ease-out-quint) hover:rotate-0 lg:mx-0 lg:max-w-sm">
      <div className="aspect-4/5 w-full overflow-hidden bg-muted">
        <Image
          src="/images/hero/hero-portrait.webp"
          alt="Portrait of Jon Wayne Cabusbusan"
          width={864}
          height={1080}
          priority
          sizes="(max-width: 1024px) 90vw, 360px"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-(--ease-out-quint) group-hover:scale-[1.03]"
        />
      </div>

      <figcaption className="mono-meta mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-border pt-3 leading-5 text-muted-foreground">
        <span>Iloilo, PH</span>
        <span>Full-stack web systems</span>
      </figcaption>
    </figure>
  );
}
