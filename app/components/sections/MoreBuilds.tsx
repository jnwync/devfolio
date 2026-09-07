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
 * title and period, one-line summary, tools. No cards, no hover tricks —
 * the row language is the same as the Experience list so it scans in
 * seconds. Numbering continues from the selected case studies.
 */
export default function MoreBuilds({ projects, startAt }: { projects: Project[]; startAt: number }) {
  return (
    <div className="mt-4 border-t border-border-on-ink pt-10">
      <h3 className="font-serif text-2xl font-bold text-paper-on-ink sm:text-3xl">More builds</h3>

      <ol className="mt-4" role="list">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className="grid items-baseline gap-x-6 gap-y-3 border-b border-border-on-ink py-7 md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)]"
          >
            <span className="meta-line" aria-hidden="true">
              {pad(startAt + index)}
            </span>
            <div>
              <h4 className="font-serif text-xl font-bold leading-tight text-paper-on-ink">{project.title}</h4>
              <p className="meta-line mt-2">
                {typeLabels[project.type]} · {project.period}
              </p>
            </div>
            <div>
              <p className="text-sm leading-6 text-muted-on-ink">{project.homepageSummary}</p>
              <p className="tool-line mt-2">{project.technologies.slice(0, 4).join(' · ')}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
