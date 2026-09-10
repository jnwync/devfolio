import Image from 'next/image';

/**
 * The portrait is a cut-out, not a photograph in a box: it has no
 * background of its own, so it does not get a frame that invents one. He
 * stands to the right of the masthead with the water line at his feet, and
 * the last of him dissolves into it rather than being sliced by a border.
 */
export default function HeroImage() {
  return (
    <figure className="hero-figure">
      <Image
        src="/images/hero/hero-portrait.webp"
        alt="Portrait of Jon Wayne Cabusbusan"
        width={864}
        height={1080}
        priority
        sizes="(max-width: 640px) 30vw, (max-width: 1024px) 26vw, 272px"
        className="h-auto w-full"
      />
    </figure>
  );
}
