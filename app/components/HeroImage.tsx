import Image from 'next/image';

/**
 * Portrait: a rounded frame with a hairline, sitting still. No tilt, no
 * zoom, no viewfinder marks, no tag — the eyebrow already says where.
 */
export default function HeroImage() {
  return (
    <figure className="relative mx-auto w-72 sm:w-80 lg:mx-0 lg:w-87">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src="/images/hero/hero-portrait.webp"
          alt="Portrait of Jon Wayne Cabusbusan"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 360px"
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}
