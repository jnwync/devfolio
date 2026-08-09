import { ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';

const typeLabels: Record<string, string> = {
  contract: 'Contract',
  freelance: 'Freelance',
  internship: 'Internship',
  startup: 'Student-led startup',
  professional: 'Project-based',
  academic: 'Academic',
};

export default function ProfessionalExperience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="editorial-rule scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <header className="mb-12 grid gap-5 md:grid-cols-[0.42fr_0.58fr] md:items-end">
          <div>
            <p className="section-kicker">02 — Experience</p>
            <h2 id="experience-heading" className="section-heading">
              Experience in shipped systems.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:justify-self-end">
            A concise record of freelance, product, startup, and academic work for hiring teams evaluating how I operate in production.
          </p>
        </header>

        <div>
          {portfolioData.experiences.map((exp) => {
            const year = exp.period.match(/\b(20\d{2})\b/)?.[0] ?? '';
            return (
              <article key={exp.id} className="grid gap-5 border-t border-border py-8 md:grid-cols-[0.32fr_0.68fr] md:items-start md:gap-10">
                <div>
                  <p className="font-serif text-4xl font-bold leading-none text-foreground sm:text-5xl">{year}</p>
                  <time className="mt-3 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground" dateTime={`${exp.startDate}/${exp.endDate}`}>
                    {exp.period}
                  </time>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-accent">
                    {typeLabels[exp.type]}{exp.location ? ` · ${exp.location}` : ''}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <h3 className="font-serif text-2xl font-bold text-foreground">{exp.company}</h3>
                    {exp.link && (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-primary" aria-label={`Visit ${exp.company}`}>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        Visit
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-bold text-primary">{exp.role}</p>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{exp.homepageSummary}</p>
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-foreground/80">{exp.achievements[0]}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
