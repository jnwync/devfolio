import Image from 'next/image';

/**
 * Portrait: a rounded frame with a hairline, sitting still in the sky.
 * No tilt, no zoom, no marks, no tag — the eyebrow already says where.
 */
export default function HeroImage() {
  return (
    <figure className="relative w-full">
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src="/images/hero/hero-portrait.webp"
          alt="Portrait of Jon Wayne Cabusbusan"
          fill
          priority
          sizes="(max-width: 640px) 128px, (max-width: 1024px) 200px, 240px"
          className="object-cover object-top"
        />
      </div>
    </figure>
  );
}
