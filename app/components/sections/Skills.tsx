'use client';

import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';

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

export default function Skills() {
  const { capabilityGroups } = portfolioData;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="editorial-rule scroll-mt-20 py-20 md:py-28"
    >
      <div className="section-shell">
        <header className="mb-14 max-w-3xl">
          <p className="section-kicker">Capabilities</p>
          <h2
            id="skills-heading"
            className="mt-4 text-balance font-serif text-4xl font-bold leading-tight md:text-5xl"
          >
            The stack, organized by the work it supports.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Skills are grouped by delivery surface so readers can connect technology
            choices to product outcomes — not arbitrary proficiency bars.
          </p>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-5 md:grid-cols-2"
        >
          {capabilityGroups.map((group, index) => (
            <motion.article
              key={group.title}
              variants={itemVariants}
              className="flex flex-col border border-border bg-card p-6 sm:p-8"
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-serif text-sm font-bold text-accent"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  {group.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {group.summary}
              </p>
              <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground/80">
                {group.evidence}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
