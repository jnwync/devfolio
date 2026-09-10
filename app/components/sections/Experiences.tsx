import { ArrowUpRight } from 'lucide-react';
import { portfolioData, type Experience } from '@/data/portfolio';

/** Months since year zero, so spans can be laid out by arithmetic. */
function monthIndex(ym: string): number {
  const [year, month] = ym.split('-').map(Number);
  return year * 12 + (month - 1);
}

/**
 * The axis: every role as a span on a shared time base, newest lane at the
 * top so the lanes read in the same order as the rows below. Built from the
 * same dates the rows print, at render time, with no measurement.
 */
function buildAxis(experiences: Experience[]) {
  const first = Math.min(...experiences.map((exp) => monthIndex(exp.startDate)));
  const last = Math.max(...experiences.map((exp) => monthIndex(exp.endDate) + 1));
  const total = Math.max(1, last - first);

  const lanes = experiences.map((exp) => {
    const start = monthIndex(exp.startDate);
    const end = monthIndex(exp.endDate) + 1;
    return { id: exp.id, x: (start - first) / total, w: (end - start) / total };
  });

  const years: { year: number; x: number }[] = [];
  for (let month = first; month <= last; month += 1) {
    if (month % 12 === 0) years.push({ year: month / 12, x: (month - first) / total });
  }

  return { lanes, years, firstYear: Math.floor(first / 12) };
}

/**
 * Timeline in the row language: mono period, company + role, one-line
 * summary. Each row is a native <details> — the summary row stays exactly as
 * scannable as before, and opening it reveals the scope, achievements,
 * impact figures and tools already held in data/portfolio.ts. Keyboard- and
 * screen-reader-native, no JavaScript involved.
 *
 * Above them sits the axis, which says the one thing a list of dates cannot:
 * where engagements overlapped and where they ran back to back. It repeats
 * information the rows already carry, so it is hidden from assistive tech;
 * the experience scene lights the span belonging to whichever row you are
 * reading.
 */
export default function ProfessionalExperience() {
  const { experiences } = portfolioData;
  const { lanes, years, firstYear } = buildAxis(experiences);

  return (
    <section
      id="experience"
      data-scene="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 py-20 md:py-28"
    >
      <div className="section-shell">
        <header className="sec-head">
          <h2 id="experience-heading" className="sec-title mask-rise" data-mask>
            Experience
          </h2>
        </header>
      </div>

      {/* Full-bleed so the sticky strip reads as a shelf under the nav
          rather than a rectangle floating on the water. */}
      <div className="exp-axis" aria-hidden="true">
        <div className="section-shell">
          <div className="exp-axis-years">
            <span className="exp-year" style={{ '--x': 0 } as React.CSSProperties}>
              {firstYear}
            </span>
            {years.map((year) => (
              <span key={year.year} className="exp-year" style={{ '--x': year.x } as React.CSSProperties}>
                {year.year}
              </span>
            ))}
          </div>
          <div className="exp-axis-lanes">
            {years.map((year) => (
              <i key={year.year} className="exp-axis-rule" style={{ '--x': year.x } as React.CSSProperties} />
            ))}
            {lanes.map((lane) => (
              <i
                key={lane.id}
                className="exp-span"
                data-exp-lane={lane.id}
                style={{ '--x': lane.x, '--w': lane.w } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="section-shell">
        <div>
          {experiences.map((exp) => (
            <details key={exp.id} data-exp-row={exp.id} className="exp-row border-b border-border">
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
