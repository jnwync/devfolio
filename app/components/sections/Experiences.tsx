import { portfolioData } from '@/data/portfolio';

/**
 * Timeline in the row language: mono period, company + role, one-line
 * summary. Each row is a native <details> — the summary row stays exactly as
 * scannable as before, and opening it reveals the achievements, impact
 * figures and tools already held in data/portfolio.ts. Keyboard- and
 * screen-reader-native, no JavaScript involved.
 */
export default function ProfessionalExperience() {
  const { experiences } = portfolioData;
  const years = `${experiences[experiences.length - 1].startDate.slice(0, 4)}–${experiences[0].endDate.slice(0, 4)}`;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <header className="rv sec-head">
          <div>
            <p className="section-kicker">02 · Where I&rsquo;ve worked</p>
            <h2 id="experience-heading" className="sec-title">
              Experience.
            </h2>
          </div>
          <p className="sec-count" aria-hidden="true">
            {years}
          </p>
        </header>

        <div>
          {experiences.map((exp) => (
            <details key={exp.id} className="exp-row group border-b border-border">
              <summary className="exp-summary grid cursor-pointer items-baseline gap-x-6 gap-y-2 py-7 transition-[padding-left] duration-300 ease-(--ease-out-quint) md:grid-cols-[10.5rem_minmax(0,5fr)_minmax(0,6fr)_2rem] md:hover:pl-3">
                <time className="mono-meta text-muted-foreground" dateTime={`${exp.startDate}/${exp.endDate}`}>
                  {exp.period}
                </time>
                <div>
                  <h3 className="font-serif text-xl font-bold leading-tight text-foreground">{exp.company}</h3>
                  <p className="mt-1 text-[0.83rem] text-muted-foreground">
                    {exp.role}
                    {exp.location ? ` · ${exp.location}` : ''}
                  </p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{exp.homepageSummary}</p>
                <span className="exp-toggle" aria-hidden="true">
                  <span className="sr-only">Details</span>
                </span>
              </summary>

              <div className="grid gap-x-6 pb-9 md:grid-cols-[10.5rem_minmax(0,1fr)_2rem]">
                <p className="mono-micro hidden text-muted-foreground md:block">{exp.scope ? 'Scope' : ''}</p>
                <div className="max-w-3xl">
                  {exp.scope && <p className="text-sm leading-6 text-foreground/90">{exp.scope}</p>}
                  <ul className="mt-4 grid gap-2.5" role="list">
                    {exp.achievements.map((item) => (
                      <li key={item} className="grid grid-cols-[0.875rem_1fr] gap-3 text-sm leading-6 text-muted-foreground">
                        <span className="evidence-marker" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.impact && exp.impact.length > 0 && (
                    <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-4">
                      {exp.impact.map((item) => (
                        <div key={item.description} className="max-w-56">
                          <dt className="sr-only">{item.description}</dt>
                          <dd className="font-serif text-xl font-bold leading-none text-foreground">{item.metric}</dd>
                          <dd className="mono-micro mt-1.5 text-muted-foreground">{item.description}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <ul className="mt-5 flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
                    {exp.technologies.map((tech) => (
                      <li key={tech} className="chip-pill">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
