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
      data-work-beat={index}
      className={`work-beat grid grid-cols-1 items-center gap-8 py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-14 md:py-20 ${
        index > 0 ? 'border-t border-border-on-ink' : ''
      }`}
    >
      <div className={`work-copy min-w-0 ${flip ? 'md:order-2' : ''}`}>
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
                // min-w-0: a flex child will not shrink below its content
                // without it, which pushed the page wider than the screen.
                className={`min-w-0 flex-1 py-3.5 ${i > 0 ? 'border-l border-border-on-ink pl-4' : 'pr-4'} ${i > 0 && i < impact.length - 1 ? 'pr-4' : ''}`}
              >
                <dt className="sr-only">{item.description}</dt>
                <dd className="font-serif text-xl font-bold leading-none text-paper-on-ink sm:text-2xl">
                  {item.metric}
                </dd>
                {/* break-words: at 320px a cell is 87px wide and a single
                    long word would otherwise widen the whole page. */}
                <dd className="mono-micro mt-1.5 break-words text-muted-on-ink">
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

      <div className={`work-media min-w-0 ${flip ? 'md:order-1' : ''}`}>{children}</div>
    </article>
  );
}

/** A framed figure with its caption underneath. The frame stays dark in both
 *  weathers — it is an artefact sitting on the plate, not part of it. In the
 *  pinned stage the three frames coincide and read as one window, with only
 *  the plane inside it moving. */
function Figure({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure>
      <div className="figure-frame">
        <div className="work-plane">{children}</div>
      </div>
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
    <div className="grid h-full min-h-72 grid-cols-3 gap-3 bg-frame-board p-5" aria-hidden="true">
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

/** Abstracted folder view plus phone for Trackbill — the structure is read
 *  from the product (folder rows with a per-source breakdown, a mobile inbox
 *  with a capture button), the proportions are illustrative, and there is no
 *  screenshot. One image for the routing story: many channels, one inbox. */
function TrackbillInbox() {
  const sourceTones = ['bg-frame-green', 'bg-frame-text/55', 'bg-frame-text/35', 'bg-frame-text/20'];
  const folders = [
    { name: 'Unified', hot: true, mix: [5, 3, 1, 3] },
    { name: 'Gmail Imports', mix: [0, 6, 0, 1] },
    { name: 'API Uploads', mix: [0, 0, 0, 5] },
    { name: 'Trackbill Billing', mix: [0, 0, 4, 0] },
  ];

  return (
    <div className="flex h-full min-h-72 items-stretch gap-3 overflow-hidden bg-frame-board p-4 sm:gap-4 sm:p-5" aria-hidden="true">
      <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-hidden rounded-lg border border-frame-edge bg-frame-column p-3">
        <div className="mono-micro flex justify-between px-1 pb-1 text-frame-muted">
          <span>Folders</span>
          <span>Sources</span>
        </div>
        {folders.map((folder) => (
          <div
            key={folder.name}
            className={`flex items-center gap-3 rounded-md border p-2.5 ${
              folder.hot ? 'border-frame-green bg-frame-card-hot' : 'border-frame-text/10 bg-frame-card'
            }`}
          >
            <span className={`h-2.5 w-3.5 shrink-0 rounded-[2px] ${folder.hot ? 'bg-frame-green' : 'bg-frame-text/30'}`} />
            <span className="mono-micro min-w-0 flex-1 truncate text-frame-text">{folder.name}</span>
            <span className="flex h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-frame-text/10 sm:w-20">
              {folder.mix.map((weight, i) =>
                weight ? <span key={i} style={{ flex: weight }} className={sourceTones[i]} /> : null
              )}
            </span>
          </div>
        ))}
        <div className="mono-micro mt-auto flex flex-wrap gap-x-3 px-1 pt-2 text-frame-muted">
          <span>WhatsApp</span>
          <span>Email</span>
          <span>Billing</span>
          <span>Upload</span>
        </div>
      </div>

      <div className="relative flex w-20 shrink-0 flex-col gap-2 rounded-2xl border border-frame-edge bg-frame-column p-2 sm:w-28">
        <div className="mx-auto h-1 w-8 rounded-full bg-frame-text/20" />
        <div className="mono-micro px-1 text-frame-muted">Inbox</div>
        {[3, 2, 3, 2].map((lines, i) => (
          <div key={i} className="rounded-md border border-frame-text/10 bg-frame-card p-2">
            {Array.from({ length: lines }).map((_, j) => (
              <div
                key={j}
                className={`mb-1 h-1 rounded-full last:mb-0 ${j === 0 ? 'w-4/5 bg-frame-text/30' : 'w-3/5 bg-frame-text/15'}`}
              />
            ))}
          </div>
        ))}
        <div className="absolute right-3 bottom-3 h-8 w-8 rounded-full bg-frame-green" />
      </div>
    </div>
  );
}

/** Captions for real media. The illustrations carry their own, and say so. */
const mediaCaptions: Record<string, string> = {
  reisky: 'Reisky Martial Arts, production site (reisky.vercel.app)',
  trackbill: 'Trackbill, product screen (trackbill.ai)',
};

/**
 * The media slot. Any project carrying an `image` shows real media; the
 * others show an illustration drawn from the product's structure. Trackbill
 * flips from illustration to screenshot the moment an image path is added
 * to data/portfolio.ts — nothing else has to change.
 */
function visualFor(project: Project): { caption: string; node: React.ReactNode } {
  if (project.image) {
    return {
      caption: mediaCaptions[project.id] ?? `${project.title}, production screen`,
      node: (
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          width={1200}
          height={675}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 620px"
        />
      ),
    };
  }

  if (project.id === 'trackbill') {
    return {
      caption: 'Trackbill, folder view and mobile inbox drawn from the product’s structure (no public screenshot)',
      node: <TrackbillInbox />,
    };
  }

  return {
    caption: 'OKRa, board view drawn from the product’s structure (internal tool, no public screenshot)',
    node: <OkraBoard />,
  };
}

export default function Projects() {
  const selected = portfolioData.projects.filter((project) => project.caseStudyPath);
  const more = portfolioData.projects.filter((project) => !project.caseStudyPath);

  return (
    <section
      id="projects"
      data-scene="work"
      aria-labelledby="projects-heading"
      className="dark-scene dark-scene--cover pt-16 pb-20 md:pt-24"
    >
      <div className="section-shell">
        <header className="sec-head">
          <h2 id="projects-heading" className="sec-title mask-rise text-paper-on-ink" data-mask>
            Selected work
          </h2>
        </header>

        <div
          className="work-stage"
          data-work-stage
          style={{ '--beats': selected.length } as React.CSSProperties}
        >
          <div className="work-pin">
            <ul className="work-rail" data-work-rail hidden>
              {selected.map((project, index) => (
                <li key={project.id}>
                  <button type="button" data-work-jump={index} aria-label={`Show ${project.title.split(' — ')[0]}`}>
                    <span className="work-tick" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            {selected.map((project, index) => {
              const visual = visualFor(project);
              return (
                <SelectedProject key={project.id} project={project} index={index} flip={index % 2 === 1}>
                  <Figure caption={visual.caption}>{visual.node}</Figure>
                </SelectedProject>
              );
            })}
          </div>
        </div>

        <MoreBuilds projects={more} startAt={selected.length + 1} />
      </div>
    </section>
  );
}
