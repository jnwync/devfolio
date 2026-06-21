/**
 * A large, faint serif chapter numeral anchored in a section's top corner —
 * an editorial "folio" device that ties the sections into a numbered sequence.
 * Decorative only (aria-hidden); hidden on small screens to avoid crowding.
 *
 * Requires its section to be `relative overflow-hidden`, with the section's
 * content wrapper raised above it (e.g. `relative z-10`).
 */
export default function SectionMark({ index }: { index: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ color: 'oklch(0.36 0.085 148 / 0.08)' }}
      className="ghost-word right-5 top-6 hidden text-[clamp(6rem,12vw,11rem)] leading-none lg:block"
    >
      {index}
    </span>
  );
}
