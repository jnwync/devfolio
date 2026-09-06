import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import TransitionLink from '../TransitionLink';
import { portfolioData, getExperienceById, type Project } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import MoreBuilds from './MoreBuilds';

const typeLabels: Record<string, string> = {
  contract: 'Contract · Product engineering',
  freelance: 'Freelance · International client',
  professional: 'Internship · Product team',
  startup: 'Student-led startup',
  academic: 'Academic client',
};

const pad = (n: number) => String(n).padStart(2, '0');

function SelectedProject({
  project,
  index,
  flip,
  children,
}: {
  project: Project;
  index: number;
  flip?: boolean;
  children: React.ReactNode;
}) {
  const impact = getExperienceById(project.id)?.impact ?? [];

  return (
    <article
      className={`grid items-center gap-8 py-14 md:grid-cols-[5fr_6fr] md:gap-14 md:py-20 ${
        index > 0 ? 'border-t border-border-on-ink' : ''
      }`}
    >
      <div className={`rv ${flip ? 'md:order-2' : ''}`}>
        <p>
          <span className="mono-meta tracking-[0.2em] text-green-bright">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="mono-meta ml-4 text-muted-on-ink">{typeLabels[project.type]}</span>
        </p>
        <h3
          className="mt-4 font-serif text-[1.7rem] font-bold leading-[1.05] text-paper-on-ink sm:text-4xl"
          style={{ viewTransitionName: `pt-${project.id}` }}
        >
          {project.title}
        </h3>
        <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-7 text-muted-on-ink">
          {project.homepageSummary} {project.homepageOutcome}
        </p>

        {impact.length > 0 && (
          <dl className="mt-6 flex border-y border-border-on-ink">
            {impact.map((item, i) => (
              <div
                key={item.description}
                className={`flex-1 py-3.5 ${i > 0 ? 'border-l border-border-on-ink pl-4' : 'pr-4'} ${i > 0 && i < impact.length - 1 ? 'pr-4' : ''}`}
              >
                <dt className="sr-only">{item.description}</dt>
                <dd className="font-serif text-xl font-bold leading-none text-paper-on-ink sm:text-2xl">
                  {item.metric}
                </dd>
                <dd className="mono-micro mt-1.5 text-muted-on-ink">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
          {project.technologies.slice(0, 5).map((tech) => (
            <li key={tech} className="chip-pill">
              {tech}
            </li>
          ))}
        </ul>

        {project.caseStudyPath && (
          <Button asChild variant="paper" className="mt-7">
            <TransitionLink href={project.caseStudyPath}>
              Read the case study
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-(--ease-out-quint) group-hover/btn:translate-x-1" aria-hidden="true" />
            </TransitionLink>
          </Button>
        )}
      </div>

      <div className={`rv rv-d1 ${flip ? 'md:order-1' : ''}`}>{children}</div>
    </article>
  );
}

/** Browser-chrome frame shared by the selected project media. It stays dark in
 *  both weathers — it is an artefact sitting on the plate, not part of it. */
function BrowserFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-frame-edge bg-frame shadow-[0_24px_60px_var(--shadow-frame)]">
      <div className="flex items-center gap-2 border-b border-frame-edge bg-frame-bar px-3.5 py-2.5">
        <span className="h-2 w-2 rounded-full bg-frame-dot" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-frame-dot" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-frame-dot" aria-hidden="true" />
        <span className="ml-2 flex-1 truncate rounded-md bg-frame-board px-2.5 py-1 font-mono text-[0.6rem] tracking-wide text-frame-muted">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Abstracted board view for OKRa — no public screenshot exists, so the
 *  product is represented honestly as an illustration, not a fake capture. */
function OkraBoard() {
  const columns = [
    { name: 'Backlog', count: 4, cards: [3, 2, 3] },
    { name: 'In progress', count: 2, cards: [3, 2], hot: 0 },
    { name: 'Done', count: 7, cards: [2, 3] },
  ];

  return (
    <div className="grid min-h-72 grid-cols-3 gap-3 bg-frame-board p-5" aria-hidden="true">
      {columns.map((col) => (
        <div key={col.name} className="flex flex-col gap-2 rounded-lg border border-frame-edge bg-frame-column p-2.5">
          <div className="mono-micro flex justify-between px-1 pb-1 text-frame-muted">
            <span>{col.name}</span>
            <span>{col.count}</span>
          </div>
          {col.cards.map((lines, cardIndex) => (
            <div
              key={cardIndex}
              className={`rounded-md border p-2.5 ${
                col.hot === cardIndex
                  ? 'border-frame-green bg-frame-card-hot'
                  : 'border-frame-text/10 bg-frame-card'
              }`}
            >
              {Array.from({ length: lines }).map((_, lineIndex) => (
                <div
                  key={lineIndex}
                  className={`mb-1.5 h-1.5 rounded-full last:mb-0 ${
                    col.hot === cardIndex && lineIndex === lines - 1
                      ? 'w-2/5 bg-frame-green'
                      : lineIndex % 2 === 0
                        ? 'w-4/5 bg-frame-text/15'
                        : 'w-3/5 bg-frame-text/15'
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  const selected = portfolioData.projects.filter((project) => project.caseStudyPath);
  const more = portfolioData.projects.filter((project) => !project.caseStudyPath);
  const total = portfolioData.projects.length;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="dark-scene dark-scene--cover scroll-mt-20 pt-16 pb-20 md:pt-24"
    >
      <div className="section-shell">
        <header className="rv sec-head">
          <div>
            <p className="section-kicker">01 · Selected work</p>
            <h2 id="projects-heading" className="sec-title text-paper-on-ink">
              Work that shipped.
            </h2>
          </div>
          <p className="sec-count" aria-hidden="true">
            {pad(1)}–{pad(total)}
          </p>
        </header>

        <SelectedProject project={selected[0]} index={0}>
          <BrowserFrame label="Reisky Martial Arts — production site">
            <div className="overflow-hidden">
              <Image
                src={selected[0].image ?? '/images/projects/reisky-home.png'}
                alt={`Screenshot of ${selected[0].title}`}
                width={1200}
                height={675}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </div>
          </BrowserFrame>
        </SelectedProject>

        <SelectedProject project={selected[1]} index={1} flip>
          <BrowserFrame label="OKRa — abstracted board view">
            <OkraBoard />
          </BrowserFrame>
        </SelectedProject>

        <MoreBuilds projects={more} startAt={selected.length + 1} />
      </div>
    </section>
  );
}
