import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="editorial-rule scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <header className="rv mb-12 max-w-3xl">
          <p className="section-kicker">03 — Skills</p>
          <h2 id="skills-heading" className="section-heading">The stack, organized by the work it supports.</h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            The technologies below are grouped by delivery surface, so the stack stays connected to the product work behind it.
          </p>
        </header>

        <div className="border-t border-border">
          {portfolioData.capabilityGroups.map((group, index) => (
            <article key={group.title} className="grid gap-x-10 gap-y-5 border-b border-border py-8 md:grid-cols-[0.4fr_0.6fr] md:py-10">
              <div className="flex items-baseline gap-4">
                <span className="mono-meta text-accent" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="font-serif text-2xl font-bold leading-tight text-foreground md:text-3xl">{group.title}</h3>
              </div>
              <div>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">{group.summary}</p>
                <div className="mt-5 flex max-w-3xl flex-wrap gap-2">
                  {group.skills.slice(0, 4).map((skill) => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="toolbox-line mt-8 max-w-4xl">
          <span className="font-bold text-foreground">Toolbox — </span>
          {Array.from(
            new Set(
              portfolioData.skillCategories.flatMap((category) =>
                category.skills.map((skill) => skill.name)
              )
            )
          )
            .slice(0, 18)
            .join(' · ')}
        </p>
      </div>
    </section>
  );
}
