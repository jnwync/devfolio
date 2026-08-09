import { portfolioData } from '@/data/portfolio';

export default function EvidenceBand() {
  return (
    <section id="evidence" className="editorial-rule bg-card/60" aria-label="How Jon works">
      <div className="section-shell">
        <dl className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {portfolioData.proofPoints.slice(0, 3).map((point) => (
            <div key={point.value} className="flex min-h-32 flex-col justify-center gap-2 p-5 first:pl-0 last:pr-0 sm:p-6 md:first:pr-8 md:last:pl-8">
              <dt className="font-serif text-xl font-bold leading-tight text-foreground sm:text-2xl">
                {point.value}
              </dt>
              <dd className="max-w-[32ch] text-sm leading-6 text-muted-foreground">{point.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
