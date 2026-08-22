import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Wordmark from './Wordmark';
import type { CaseStudy } from '@/data/caseStudies';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CaseStudyLayoutProps {
  caseStudy: CaseStudy;
  email: string;
}

export default function CaseStudyLayout({ caseStudy, email }: CaseStudyLayoutProps) {
  const metricsGrid = caseStudy.metrics.length > 3
    ? 'grid-cols-2 md:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-3';

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="section-shell">
          <nav aria-label="Case study" className="flex min-h-16 items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-md pr-3 text-xl text-foreground transition-colors hover:text-primary"
              aria-label="Jon Wayne Cabusbusan — Home"
            >
              <Wordmark />
            </Link>
            <Link
              href="/#projects"
              className="inline-flex min-h-11 items-center gap-2 rounded-md pl-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Selected work
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="relative scroll-mt-20 py-16 md:py-24" aria-labelledby="case-study-title">
          <div className="section-shell">
            <p className="section-kicker">Case study · {typeLabel(caseStudy.role)}</p>
            <h1
              id="case-study-title"
              className="mt-4 max-w-4xl text-balance font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
              style={{ viewTransitionName: `pt-${caseStudy.projectId}` }}
            >
              {caseStudy.title}
            </h1>

            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
              <Meta term="Client" value={caseStudy.client} />
              <Meta term="Role" value={caseStudy.role} />
              <Meta term="Timeline" value={caseStudy.period} />
            </dl>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
              {caseStudy.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {caseStudy.liveUrl && (
                <Button asChild size="lg">
                  <a href={caseStudy.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5" aria-hidden="true" />
                    Visit live site
                  </a>
                </Button>
              )}
              <Button asChild variant="outline" size="lg">
                <Link href="/#projects">
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  Back to work
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="editorial-rule py-12 md:py-16" aria-label="Project at a glance">
          <div className="section-shell">
            <dl className={`premium-panel grid divide-border ${metricsGrid} divide-x divide-y md:divide-y-0`}>
              {caseStudy.metrics.map((metric) => (
                <div key={metric.label} className="flex min-h-28 flex-col gap-2 p-5 sm:p-6">
                  <dt className="font-serif text-3xl font-bold leading-none text-foreground sm:text-4xl">
                    {metric.value}
                  </dt>
                  <dd className="max-w-[28ch] text-sm leading-6 text-muted-foreground">
                    {metric.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="editorial-rule py-10 md:py-12" aria-label="Technology stack">
          <div className="section-shell">
            <p className="section-kicker mb-4">Stack</p>
            <ul className="flex flex-wrap gap-2" role="list">
              {caseStudy.stack.map((tech) => (
                <li key={tech}>
                  <Badge variant="secondary">{tech}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="section-shell">
          {caseStudy.sections.map((section, index) => (
            <section
              key={section.heading}
              className="editorial-rule grid gap-x-10 gap-y-5 py-12 md:grid-cols-[0.3fr_0.7fr] md:py-16"
            >
              <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-3">
                <span
                  className="font-serif text-2xl font-bold leading-none text-accent"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="font-serif text-2xl font-bold leading-tight text-foreground md:text-3xl">
                  {section.heading}
                </h2>
              </div>

              <div className="max-w-3xl">
                {section.body && (
                  <p className="text-base leading-7 text-muted-foreground">{section.body}</p>
                )}

                {section.code && (
                  <pre className="mt-5 overflow-x-auto border border-border bg-card p-4 text-sm leading-6 text-foreground/90">
                    <code className="font-mono">{section.code}</code>
                  </pre>
                )}

                {section.bullets && (
                  <ul className="mt-5 grid gap-3.5" role="list">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="grid grid-cols-[0.875rem_1fr] gap-3 text-sm leading-6 text-foreground/85"
                      >
                        <span className="evidence-marker bg-accent" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <section className="editorial-rule py-16 md:py-24" aria-labelledby="case-study-cta">
          <div className="section-shell">
            <h2
              id="case-study-cta"
              className="max-w-2xl text-balance font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Interested in work built this way?
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={`mailto:${email}`}>Email Jon Wayne</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#projects">
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  Back to selected work
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{term}</dt>
      <dd className="mt-1.5 text-sm font-bold text-foreground">{value}</dd>
    </div>
  );
}

function typeLabel(role: string): string {
  const normalizedRole = role.toLowerCase();
  if (normalizedRole.includes('freelance')) return 'Freelance';
  if (normalizedRole.includes('intern')) return 'Internship';
  return 'Project';
}
