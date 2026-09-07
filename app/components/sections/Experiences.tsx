import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

/**
 * Timeline in the row language: mono period, company + role, one-line
 * summary. Each row is a native <details> — the summary row stays exactly as
 * scannable as before, and opening it reveals the scope, achievements,
 * impact figures and tools already held in data/portfolio.ts. Keyboard- and
 * screen-reader-native, no JavaScript involved.
 */
export default function ProfessionalExperience() {
  const { experiences } = portfolioData;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <header className="sec-head">
          <h2 id="experience-heading" className="sec-title">
            Experience
          </h2>
        </header>

        <div>
          {experiences.map((exp) => (
            <details key={exp.id} className="exp-row border-b border-border">
              <summary className="exp-summary grid cursor-pointer items-baseline gap-x-6 gap-y-2 py-7 md:grid-cols-[10.5rem_minmax(0,5fr)_minmax(0,6fr)_2rem]">
                <time className="meta-line" dateTime={`${exp.startDate}/${exp.endDate}`}>
                  {exp.period}
                </time>
                <div>
                  <h3 className="font-serif text-xl font-bold leading-tight text-foreground transition-colors duration-200">
                    {exp.company}
                  </h3>
                  <p className="mt-1 text-[0.83rem] text-muted-foreground">
                    {exp.role}
                    {exp.location ? ` · ${exp.location}` : ''}
                  </p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{exp.homepageSummary}</p>
                <span className="exp-toggle" aria-hidden="true" />
              </summary>

              <div className="grid gap-x-6 pb-9 md:grid-cols-[10.5rem_minmax(0,1fr)_2rem]">
                <div className="hidden md:block" />
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
                  <p className="tool-line mt-5">{exp.technologies.join(' · ')}</p>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-4 inline-flex min-h-6 items-center gap-1.5 text-sm font-bold text-foreground"
                    >
                      Live site
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
