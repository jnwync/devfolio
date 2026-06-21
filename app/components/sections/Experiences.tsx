'use client';

import { motion, type Variants } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import SectionMark from '../SectionMark';

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
      className="editorial-rule relative scroll-mt-20 py-20 md:py-28"
    >
      <SectionMark index="02" />
      <div className="section-shell relative z-10">
        <header className="mb-14 grid gap-5 md:grid-cols-[0.42fr_0.58fr] md:items-end">
          <div>
            <p className="section-kicker">02 — Experience</p>
            <h2
              id="experience-heading"
              className="section-heading"
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
          viewport={{ once: true, amount: 0.08 }}
        >
          {experiences.map((exp) => {
            const year = exp.period.match(/\b(20\d{2})\b/)?.[0] ?? '';
            return (
            <motion.article
              key={exp.id}
              variants={itemVariants}
              className="grid gap-5 border-t border-border py-8 md:grid-cols-[0.32fr_0.68fr] md:items-start md:gap-10"
            >
              <div className="md:sticky md:top-28 md:self-start">
                <p className="font-serif text-4xl font-bold leading-none text-foreground sm:text-5xl">
                  {year}
                </p>
                <time
                  className="mt-3 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground"
                  dateTime={`${exp.startDate}/${exp.endDate}`}
                >
                  {exp.period}
                </time>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  {typeLabels[exp.type]}
                  {exp.location ? ` · ${exp.location}` : ''}
                </p>
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
                      className="grid grid-cols-[0.875rem_1fr] gap-3 text-sm leading-6 text-foreground/80"
                    >
                      <span className="evidence-marker bg-accent" aria-hidden="true" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                {exp.impact && exp.impact.length > 0 && (
                  <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-6">
                    {exp.impact.map((metric) => (
                      <div key={`${metric.metric}-${metric.description}`}>
                        <dt className="font-serif text-3xl font-bold leading-none text-foreground">
                          {metric.metric}
                        </dt>
                        <dd className="mt-2 max-w-[24ch] text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                          {metric.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.technologies.slice(0, 5).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
