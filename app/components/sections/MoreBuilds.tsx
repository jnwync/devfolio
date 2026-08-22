'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { Project } from '@/data/portfolio';

const typeLabels: Record<string, string> = {
  freelance: 'Freelance',
  professional: 'Professional',
  startup: 'Startup',
  academic: 'Academic client',
};

/**
 * Projects 03–06 as a horizontal moment: on desktop the section pins and
 * vertical scroll drives the cards right-to-left; on mobile (or with reduced
 * motion) it falls back to a native scroll-snap row. Never a horizontal-
 * scroll site — just one directional beat inside the dark Work scene.
 */
export default function MoreBuilds({ projects }: { projects: Project[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [drive, setDrive] = useState(false);
  const [maxShift, setMaxShift] = useState(0);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setDrive(query.matches && !reduceMotion);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!drive) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setMaxShift(Math.max(0, track.scrollWidth - track.clientWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [drive]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -maxShift]);

  return (
    <div ref={outerRef} className={drive ? 'md:h-[260vh]' : undefined}>
      <div className={drive ? 'sticky top-0 flex min-h-svh flex-col justify-center overflow-hidden' : undefined}>
        <div className="section-shell w-full">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-t border-border-on-ink pt-10">
            <div>
              <p className="section-kicker">More builds</p>
              <h3 className="mt-2 font-serif text-2xl font-bold text-paper-on-ink sm:text-3xl">
                03 — 06
              </h3>
            </div>
            <p className="mono-meta text-muted-on-ink" aria-hidden="true">
              {drive ? 'Keep scrolling →' : 'Swipe →'}
            </p>
          </div>
        </div>

        <div className="section-shell w-full">
          <motion.div
            ref={trackRef}
            style={drive ? { x } : undefined}
            className="hstrip-track flex gap-5 pb-4 md:pb-0"
          >
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="hstrip-card flex w-[82vw] max-w-95 flex-none flex-col gap-4 rounded-2xl border border-border-on-ink bg-ink-soft p-6 transition-[transform,border-color] duration-400 ease-(--ease-out-quint) hover:-translate-y-1.5 hover:border-paper-on-ink/40 sm:w-[60vw] md:w-95"
              >
                <p className="mono-meta text-green-bright">{String(index + 3).padStart(2, '0')}</p>
                <h4 className="font-serif text-xl font-bold leading-tight text-paper-on-ink">
                  {project.title}
                </h4>
                <p className="text-sm leading-6 text-muted-on-ink md:flex-1">{project.homepageSummary}</p>
                <ul className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <li
                      key={tech}
                      className="mono-micro rounded-full border border-border-on-ink px-2.5 py-1 text-paper-on-ink"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <p className="mono-meta text-muted-on-ink">
                  {typeLabels[project.type]} · {project.period}
                </p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
