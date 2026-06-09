'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';

export default function Education() {
  const { education } = portfolioData;

  // Highlight the most relevant courses — skip generic module names
  const featuredCoursework = education.coursework.filter(
    (course) => !course.includes('I-III') && !course.includes('Engineering Data Analysis')
  );

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="editorial-rule scroll-mt-20 py-20 md:py-28"
    >
      <div className="section-shell">
        <header className="mb-12">
          <p className="section-kicker">Education</p>
          <h2
            id="education-heading"
            className="mt-4 text-balance font-serif text-4xl font-bold leading-tight md:text-5xl"
          >
            The academic foundation.
          </h2>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="grid gap-8 border border-border bg-card p-6 md:grid-cols-[0.42fr_0.58fr] md:p-8"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Degree
            </p>
            <h3 className="mt-4 font-serif text-3xl font-bold text-foreground">
              {education.degree}
            </h3>
            <p className="mt-2 text-base font-bold text-primary">{education.institution}</p>
            <p className="mt-1 text-sm text-muted-foreground">Class of {education.year}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Relevant coursework
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {featuredCoursework.map((course) => (
                <Badge key={course} variant="outline">
                  {course}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
