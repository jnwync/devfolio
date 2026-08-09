import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { portfolioData, type Project } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const typeLabels: Record<string, string> = {
  freelance: 'Freelance',
  professional: 'Professional',
  startup: 'Startup',
  academic: 'Academic',
};

function ProjectPreview({ project, figure }: { project: Project; figure: string }) {
  if (!project.image) return null;

  return (
    <figure className="mt-7 overflow-hidden border border-border bg-background">
      <figcaption className="flex min-h-8 items-center justify-between border-b border-border bg-secondary/55 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        <span>Fig. {figure}</span>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
            Live site
          </a>
        )}
      </figcaption>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 520px"
        />
      </div>
    </figure>
  );
}

export default function Projects() {
  const projects = portfolioData.projects.filter((project) => project.caseStudyPath);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="editorial-rule scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <header className="mb-12 grid gap-5 md:grid-cols-[0.42fr_0.58fr] md:items-end">
          <div>
            <p className="section-kicker">01 — Selected work</p>
            <h2 id="projects-heading" className="section-heading">
              Two systems, taken from brief to launch.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:justify-self-end">
            Read the detailed case studies for the decisions, constraints, and outcomes behind the client and product work.
          </p>
        </header>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <article key={project.id} className="premium-panel grid md:grid-cols-[0.95fr_1.05fr]">
              <div className="border-b border-border p-6 md:border-b-0 md:border-r md:p-8">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  <Badge variant="outline">{typeLabels[project.type]}</Badge>
                  <span>{project.period}</span>
                </div>
                <h3 className="mt-6 max-w-xl font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
                  {project.title}
                </h3>
                <ProjectPreview project={project} figure={String(index + 1).padStart(2, '0')} />
                <p className="mt-5 text-base leading-7 text-muted-foreground">{project.homepageSummary}</p>
              </div>

              <div className="space-y-6 p-6 md:p-8">
                <div>
                  <h4 className="text-sm font-bold text-foreground">What I owned</h4>
                  <p className="mt-2 text-base leading-7 text-foreground/85">{project.responsibility}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Outcome</h4>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">{project.homepageOutcome}</p>
                </div>
                <ul className="grid gap-3" role="list">
                  {project.outcomes.slice(0, 2).map((outcome) => (
                    <li key={outcome} className="grid grid-cols-[0.875rem_1fr] gap-3 text-sm leading-6 text-muted-foreground">
                      <span className="evidence-marker" aria-hidden="true" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
                <Button asChild size="sm">
                  <Link href={project.caseStudyPath!}>
                    Read case study
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="ml-4 inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground transition-colors hover:text-primary">
                    Visit live site <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
