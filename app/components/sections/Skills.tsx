import { portfolioData } from '@/data/portfolio';

/**
 * Capability rows straight from the prototype: area title, what it covers,
 * where it was proven, and the tools as uniform chips — closed out by the
 * toolbox line and the education band.
 */
export default function Skills() {
  const { education } = portfolioData;
  const toolbox = Array.from(
    new Set(
      portfolioData.skillCategories.flatMap((category) => category.skills.map((skill) => skill.name))
    )
  ).slice(0, 18);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="bg-secondary/40 scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <header className="rv sec-head">
          <div>
            <p className="section-kicker">03 — Capabilities</p>
            <h2 id="skills-heading" className="sec-title">
              What I cover.
            </h2>
          </div>
          <p className="sec-count" aria-hidden="true">
            5 areas
          </p>
        </header>

        <div>
          {portfolioData.capabilityGroups.map((group, index) => (
            <article
              key={group.title}
              className={`rv ${index < 3 ? `rv-d${index + 1}` : ''} grid items-start gap-x-10 gap-y-4 border-b border-border py-8 md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,4fr)]`}
            >
              <h3 className="font-serif text-[1.35rem] font-bold leading-tight text-foreground">
                {group.title}
              </h3>
              <div className="text-sm leading-6 text-muted-foreground">
                {group.summary}
                <em className="mt-2 block text-[0.78rem] not-italic text-foreground/45">{group.evidence}</em>
              </div>
              <ul className="flex flex-wrap gap-1.5 md:justify-end" role="list" aria-label={`${group.title} tools`}>
                {group.skills.map((skill) => (
                  <li key={skill} className="chip-pill">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="toolbox-line rv mt-8 max-w-4xl">
          <span className="font-bold text-foreground">Toolbox — </span>
          {toolbox.join(' · ')}
        </p>

        <div className="rv mt-10 flex flex-wrap items-baseline justify-between gap-4 border-t border-border pt-7">
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground">{education.degree}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {education.institution} · {education.year}
            </p>
          </div>
          <span className="mono-meta text-muted-foreground">Education</span>
        </div>
      </div>
    </section>
  );
}
