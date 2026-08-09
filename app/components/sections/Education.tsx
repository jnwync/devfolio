import { portfolioData } from '@/data/portfolio';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" aria-labelledby="education-heading" className="editorial-rule scroll-mt-20 py-16 md:py-20">
      <div className="section-shell">
        <div className="grid gap-3 md:grid-cols-[0.42fr_0.58fr] md:items-start">
          <div>
            <p className="section-kicker">04 — Education</p>
            <h2 id="education-heading" className="mt-3 font-serif text-2xl font-bold leading-tight text-foreground md:text-3xl">
              {education.degree}
            </h2>
          </div>
          <div>
            <p className="text-base font-bold text-primary">{education.institution}</p>
            <p className="mt-1 text-sm text-muted-foreground">{education.year}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
