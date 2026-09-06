import type { Project } from '@/data/portfolio';

const typeLabels: Record<string, string> = {
  contract: 'Contract',
  freelance: 'Freelance',
  professional: 'Professional',
  startup: 'Startup',
  academic: 'Academic client',
};

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The remaining builds as a hairline index inside the Work plate: number,
 * title and period, one-line summary, tools. No cards, no pinned scroll —
 * the row language is the same as the Experience list so it scans in
 * seconds. Numbering continues from the selected case studies.
 */
export default function MoreBuilds({ projects, startAt }: { projects: Project[]; startAt: number }) {
  const first = startAt;
  const last = startAt + projects.length - 1;

  return (
    <div className="mt-4 border-t border-border-on-ink pt-10">
      <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-kicker">More builds</p>
          <h3 className="mt-2 font-serif text-2xl font-bold text-paper-on-ink sm:text-3xl">
            {pad(first)}–{pad(last)}
          </h3>
        </div>
      </div>

      <ol className="mt-4" role="list">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className="grid items-baseline gap-x-6 gap-y-3 border-b border-border-on-ink py-7 md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)_auto]"
          >
            <span className="mono-meta text-green-bright" aria-hidden="true">
              {pad(first + index)}
            </span>
            <div>
              <h4 className="font-serif text-xl font-bold leading-tight text-paper-on-ink">{project.title}</h4>
              <p className="mono-meta mt-2 text-muted-on-ink">
                {typeLabels[project.type]} · {project.period}
              </p>
            </div>
            <p className="text-sm leading-6 text-muted-on-ink">{project.homepageSummary}</p>
            <ul className="flex flex-wrap gap-1.5 md:max-w-56 md:justify-end" role="list" aria-label="Technologies">
              {project.technologies.slice(0, 3).map((tech) => (
                <li key={tech} className="chip-pill">
                  {tech}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
