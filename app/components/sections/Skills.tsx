import { portfolioData } from '@/data/portfolio';

/**
 * Capability rows: area, what it covers, where it was proven, and the tools
 * as one mono line — closed out by the education row. No tag walls.
 */
export default function Skills() {
  const { education } = portfolioData;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <header className="sec-head">
          <h2 id="skills-heading" className="sec-title">
            What I cover
          </h2>
        </header>

        <div>
          {portfolioData.capabilityGroups.map((group) => (
            <article
              key={group.title}
              className="grid items-start gap-x-10 gap-y-4 border-b border-border py-8 md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,4fr)]"
            >
              <h3 className="font-serif text-[1.35rem] font-bold leading-tight text-foreground">
                {group.title}
              </h3>
              <div className="text-sm leading-6 text-muted-foreground">
                {group.summary}
                <em className="mt-2 block text-[0.78rem] not-italic text-muted-foreground">{group.evidence}</em>
              </div>
              <p className="tool-line md:text-right">{group.skills.join(' · ')}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4 border-t border-border pt-7">
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground">{education.degree}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {education.institution} · {education.year}
            </p>
          </div>
          <span className="meta-line">Education</span>
        </div>
      </div>
    </section>
  );
}
