'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

export default function Education() {
  const { education } = portfolioData;

  // Highlight the most relevant courses — skip generic module names
  const featuredCoursework = education.coursework.filter(
    (c) =>
      !c.includes('I-III') &&
      !c.includes('Engineering Data Analysis')
  );

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="scroll-mt-20 border-t border-border py-20 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 space-y-4"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Academic Background
          </p>
          <h2 id="education-heading" className="text-balance text-4xl font-bold md:text-5xl">
            Education
          </h2>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="rounded-xl border border-border bg-card px-8 py-8 shadow-sm"
        >
          {/* Degree + Institution */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">{education.degree}</h3>
              <p className="text-base font-semibold text-accent">{education.institution}</p>
            </div>
            <span className="shrink-0 self-start rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
              Class of {education.year}
            </span>
          </div>

          {/* Relevant Coursework */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Relevant Coursework</p>
            <div className="flex flex-wrap gap-2">
              {featuredCoursework.map((course) => (
                <span
                  key={course}
                  className="inline-block rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
