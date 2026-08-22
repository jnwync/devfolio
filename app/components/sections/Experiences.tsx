import { portfolioData } from '@/data/portfolio';

/**
 * Timeline in the prototype's row language: mono period, company + role,
 * one-line summary, and an arrow that slides in as the row shifts on hover.
 */
export default function ProfessionalExperience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <header className="rv sec-head">
          <div>
            <p className="section-kicker">02 — Where I&rsquo;ve worked</p>
            <h2 id="experience-heading" className="sec-title">
              Experience.
            </h2>
          </div>
          <p className="sec-count" aria-hidden="true">
            2024 — 2026
          </p>
        </header>

        <div>
          {portfolioData.experiences.map((exp) => (
            <article
              key={exp.id}
              className="group grid items-baseline gap-x-6 gap-y-2 border-b border-border py-7 transition-[padding-left] duration-300 ease-(--ease-out-quint) md:grid-cols-[10.5rem_minmax(0,5fr)_minmax(0,6fr)_2rem] md:hover:pl-3"
            >
              <time className="mono-meta text-muted-foreground" dateTime={`${exp.startDate}/${exp.endDate}`}>
                {exp.period}
              </time>
              <div>
                <h3 className="font-serif text-xl font-bold leading-tight text-foreground">
                  {exp.company}
                </h3>
                <p className="mt-1 text-[0.83rem] text-muted-foreground">
                  {exp.role}
                  {exp.location ? ` · ${exp.location}` : ''}
                </p>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{exp.homepageSummary}</p>
              <span
                className="hidden text-lg text-primary opacity-0 transition-[opacity,translate] duration-300 ease-(--ease-out-quint) group-hover:translate-x-1 group-hover:opacity-100 md:block"
                aria-hidden="true"
              >
                →
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
