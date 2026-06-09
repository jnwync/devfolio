import { portfolioData } from '@/data/portfolio';

export default function EvidenceBand() {
  return (
    <section id="evidence" className="editorial-rule bg-card/70" aria-label="Portfolio evidence at a glance">
      <div className="section-shell">
        <dl className="grid gap-0 divide-y divide-border border-x border-border bg-card md:grid-cols-4 md:divide-x md:divide-y-0">
          {portfolioData.proofPoints.map((point, index) => (
            <div key={point.value} className="flex flex-col gap-2 p-5 sm:p-6">
              <span
                className="text-xs font-bold uppercase tracking-[0.16em] text-accent"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <dt className="font-serif text-xl font-bold leading-tight text-foreground">
                {point.value}
              </dt>
              <dd className="text-sm leading-6 text-muted-foreground">{point.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
