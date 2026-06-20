'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import SectionMark from '../SectionMark';

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
      className="editorial-rule relative scroll-mt-20 overflow-hidden py-16 md:py-20"
    >
      <SectionMark index="04" />
      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="grid gap-x-10 gap-y-6 md:grid-cols-[0.42fr_0.58fr] md:items-baseline"
        >
          <div>
            <p className="section-kicker">04 — Education</p>
            <h2
              id="education-heading"
              className="mt-3 font-serif text-2xl font-bold leading-tight text-foreground md:text-3xl"
            >
              {education.degree}
            </h2>
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
