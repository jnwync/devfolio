/**
 * The `jnwync.` wordmark — the core of the visual identity. Lowercase
 * Bricolage Grotesque; the period is the only element that takes the brand
 * green (it brightens automatically inside `.dark-scene` surfaces).
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark ${className}`.trim()}>
      jnwync<span className="wordmark-dot">.</span>
    </span>
  );
}
