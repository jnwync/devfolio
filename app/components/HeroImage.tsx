import Image from 'next/image';

/**
 * The portrait is a cut-out, not a photograph in a box: it has no
 * background of its own, so it does not get a frame that invents one. He
 * stands *behind* the masthead with the water line at his feet — his head
 * clear in the sky, the name written across his gown — which is what stops
 * him reading as a separate object pasted beside the type.
 */
export default function HeroImage() {
  return (
    <figure className="hero-figure">
      <Image
        src="/images/hero/portrait-2026.webp"
        alt="Portrait of Jon Wayne Cabusbusan"
        width={1100}
        height={1452}
        priority
        sizes="(max-width: 640px) 58vw, 34vh"
        className="h-auto w-full"
      />
    </figure>
  );
}
