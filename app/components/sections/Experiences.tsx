'use client';

import { motion, type Variants } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';

const typeLabels: Record<string, string> = {
  contract: 'Contract',
  freelance: 'Freelance',
  internship: 'Internship',
  academic: 'Academic',
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function ProfessionalExperience() {
  const experiences = portfolioData.experiences;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="editorial-rule scroll-mt-20 py-20 md:py-28"
    >
      <div className="section-shell">
        <header className="mb-14 grid gap-5 md:grid-cols-[0.42fr_0.58fr] md:items-end">
          <div>
            <p className="section-kicker">Experience</p>
            <h2
              id="experience-heading"
              className="mt-4 text-balance font-serif text-4xl font-bold leading-tight md:text-5xl"
            >
              A short record of shipped work.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:justify-self-end">
            Contract and academic engagements across marketplace, e-commerce, healthcare,
            and government products — each delivered in small, agile teams.
          </p>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {experiences.map((exp) => (
            <motion.article
              key={exp.id}
              variants={itemVariants}
              className="grid gap-5 border-t border-border py-8 md:grid-cols-[0.32fr_0.68fr] md:gap-10"
            >
              <div>
                <time
                  className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground"
                  dateTime={`${exp.startDate}/${exp.endDate}`}
                >
                  {exp.period}
                </time>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline">{typeLabels[exp.type]}</Badge>
                  {exp.location && <Badge variant="secondary">{exp.location}</Badge>}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {exp.company}
                  </h3>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-mx-1 inline-flex min-h-11 items-center gap-1.5 px-1 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-colors hover:text-accent focus-visible:rounded-sm"
                      aria-label={`Visit ${exp.company}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      Visit
                    </a>
                  )}
                </div>
                <p className="mt-1 text-sm font-bold text-primary">{exp.role}</p>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                  {exp.scope}
                </p>

                <ul className="mt-5 grid gap-3" role="list">
                  {exp.achievements.slice(0, 2).map((achievement) => (
                    <li
                      key={achievement}
                      className="grid grid-cols-[1.25rem_1fr] gap-3 text-sm leading-6 text-foreground/80"
                    >
                      <span className="mt-3 h-px bg-accent" aria-hidden="true" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                {exp.impact && exp.impact.length > 0 && (
                  <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                    {exp.impact.map((metric) => (
                      <div
                        key={`${metric.metric}-${metric.description}`}
                        className="border border-border bg-secondary/50 p-4"
                      >
                        <dt className="font-serif text-2xl font-bold text-foreground">
                          {metric.metric}
                        </dt>
                        <dd className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                          {metric.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
