'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionMark from '../SectionMark';
import { portfolioData, type Project } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const typeLabels: Record<string, string> = {
  freelance: 'Freelance',
  professional: 'Professional',
  startup: 'Startup',
  academic: 'Academic',
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

function ProjectPreview({ project, figure }: { project: Project; figure: string }) {
  if (!project.image) {
    return null;
  }

  return (
    <figure className="group/preview mt-7 overflow-hidden border border-border bg-background shadow-(--shadow-soft)">
      <figcaption className="flex h-8 items-center justify-between border-b border-border bg-secondary/55 px-3 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        <span>Fig. {figure}</span>
        {project.link && (
          <span
            aria-hidden="true"
            className="hidden items-center gap-1 transition-colors duration-300 group-hover/preview:text-primary sm:inline-flex"
          >
            Live site
          </span>
        )}
      </figcaption>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover/preview:scale-[1.045]"
          sizes={
            project.featured
              ? '(max-width: 768px) 100vw, 520px'
              : '(max-width: 768px) 100vw, 960px'
          }
        />
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live site`}
            className="absolute inset-0 flex items-end justify-end p-3.5 opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/95 px-4 py-2 text-xs font-bold text-foreground shadow-(--shadow-soft) backdrop-blur">
              View live
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </a>
        )}
      </div>
    </figure>
  );
}

export default function Projects() {
  const projects = [...portfolioData.projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="editorial-rule relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <SectionMark index="01" />
      <div className="section-shell relative z-10">
        <header className="mb-14 grid gap-5 md:grid-cols-[0.42fr_0.58fr] md:items-end">
          <div>
            <p className="section-kicker">01 — Selected work</p>
            <h2
              id="projects-heading"
              className="section-heading"
            >
              Case-study evidence, not just project tiles.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:justify-self-end">
            A compact record of systems I have designed, implemented, optimized, and
            shipped across freelance, professional, startup, and academic client work.
          </p>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="space-y-8"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className={`premium-panel premium-hover ${
                project.featured ? 'md:grid md:grid-cols-[0.95fr_1.05fr]' : ''
              }`}
            >
              <div className="border-b border-border p-6 md:border-b-0 md:border-r md:p-8">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant={project.featured ? 'default' : 'outline'}>
                    {typeLabels[project.type]}
                  </Badge>
                  {project.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {project.period}
                  </span>
                </div>

                <h3 className="mt-6 max-w-xl font-serif text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
                  {project.title}
                </h3>

                <ProjectPreview project={project} figure={String(index + 1).padStart(2, '0')} />

                <p className="mt-5 text-base leading-7 text-muted-foreground">
                  {project.context}
                </p>
              </div>

              <div className="space-y-6 p-6 md:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                    Responsibility
                  </p>
                  <p className="mt-2 text-base leading-7 text-foreground/85">
                    {project.responsibility}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                    Evidence
                  </p>
                  <ul className="mt-3 space-y-3.5" role="list">
                    {project.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="grid grid-cols-[0.875rem_1fr] gap-3 text-sm leading-6 text-muted-foreground"
                      >
                        <span className="evidence-marker" aria-hidden="true" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {(project.caseStudyPath || project.link || project.github) && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.caseStudyPath && (
                      <Button asChild size="sm">
                        <Link href={project.caseStudyPath} className="group/button">
                          Read case study
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" aria-hidden="true" />
                        </Link>
                      </Button>
                    )}
                    {project.link && (
                      <Button asChild variant="outline" size="sm">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/button">
                          <ExternalLink className="h-4 w-4 transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" aria-hidden="true" />
                          Visit site
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button asChild variant="ghost" size="sm">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <FaGithub className="h-4 w-4" aria-hidden="true" />
                          Source
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
