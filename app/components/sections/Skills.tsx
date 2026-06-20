'use client';

import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import SectionMark from '../SectionMark';

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
      className="editorial-rule relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <SectionMark index="03" />
      <div className="section-shell relative z-10">
        <header className="mb-14 max-w-3xl">
          <p className="section-kicker">03 — Capabilities</p>
          <h2
            id="skills-heading"
            className="section-heading"
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
          viewport={{ once: true, amount: 0.08 }}
          className="border-t border-border"
        >
          {capabilityGroups.map((group, index) => (
            <motion.article
              key={group.title}
              variants={itemVariants}
              className="group grid gap-x-10 gap-y-4 border-b border-border py-8 md:grid-cols-[0.4fr_0.6fr] md:py-10"
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="font-serif text-2xl font-bold leading-none text-accent transition-transform duration-300 ease-(--ease-out-quart) group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-2xl font-bold leading-tight text-foreground md:text-3xl">
                  {group.title}
                </h3>
              </div>
              <div>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                  {group.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.slice(0, 6).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
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
