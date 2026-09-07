import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import TransitionLink from '../TransitionLink';
import { portfolioData, getExperienceById, type Project } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import MoreBuilds from './MoreBuilds';

const typeLabels: Record<string, string> = {
  contract: 'Contract · product engineering',
  freelance: 'Freelance · international client',
  professional: 'Internship · product team',
  startup: 'Student-led startup',
  academic: 'Academic client',
};

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
      <div className={flip ? 'md:order-2' : ''}>
        <p className="meta-line">
          {typeLabels[project.type]} · {project.period}
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

        <p className="tool-line mt-5">{project.technologies.slice(0, 6).join(' · ')}</p>

        {(project.caseStudyPath || project.link) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.caseStudyPath && (
              <Button asChild variant="paper">
                <TransitionLink href={project.caseStudyPath}>
                  Read the case study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TransitionLink>
              </Button>
            )}
            {project.link && (
              <Button asChild variant="outlineDark">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  Live site
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            )}
          </div>
        )}
      </div>

      <div className={flip ? 'md:order-1' : ''}>{children}</div>
    </article>
  );
}

/** A framed figure with its caption underneath. The frame stays dark in both
 *  weathers — it is an artefact sitting on the plate, not part of it. */
function Figure({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure>
      <div className="figure-frame">{children}</div>
      <figcaption className="meta-line mt-3">{caption}</figcaption>
    </figure>
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

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="dark-scene dark-scene--cover scroll-mt-20 pt-16 pb-20 md:pt-24"
    >
      <div className="section-shell">
        <header className="sec-head">
          <h2 id="projects-heading" className="sec-title text-paper-on-ink">
            Selected work
          </h2>
        </header>

        <SelectedProject project={selected[0]} index={0}>
          <Figure caption="Reisky Martial Arts, production site (reisky.vercel.app)">
            <Image
              src={selected[0].image ?? '/images/projects/reisky-home.png'}
              alt={`Screenshot of ${selected[0].title}`}
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </Figure>
        </SelectedProject>

        <SelectedProject project={selected[1]} index={1} flip>
          <Figure caption="OKRa, board view drawn from the product’s structure (internal tool, no public screenshot)">
            <OkraBoard />
          </Figure>
        </SelectedProject>

        <MoreBuilds projects={more} startAt={selected.length + 1} />
      </div>
    </section>
  );
}
