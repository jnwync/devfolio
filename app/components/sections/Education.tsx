'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';

export default function Education() {
  const { education } = portfolioData;

  // Surface only the courses that signal something to a hiring reader —
  // skip table-stakes module names (Data Structures, Algorithms, etc.).
  const featuredCoursework = [
    'Web Application Development',
    'Database Systems',
    'Software Architecture',
    'Software Testing',
    'Machine Learning',
  ].filter((course) => education.coursework.includes(course));

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
            className="section-heading"
          >
            The academic foundation.
          </h2>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="premium-panel grid gap-8 p-6 md:grid-cols-[0.42fr_0.58fr] md:p-8"
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
