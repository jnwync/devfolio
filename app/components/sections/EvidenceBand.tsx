'use client';

import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function EvidenceBand() {
  return (
    <section id="evidence" className="editorial-rule bg-card/70" aria-label="Portfolio evidence at a glance">
      <div className="section-shell">
        <motion.dl
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="premium-panel grid gap-0 divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0"
        >
          {portfolioData.proofPoints.map((point, index) => (
            <motion.div
              key={point.value}
              variants={cellVariants}
              className="premium-hover flex min-h-32 flex-col gap-2 p-5 hover:bg-secondary/35 sm:min-h-36 sm:p-6"
            >
              <span
                className="text-xs font-bold uppercase tracking-[0.16em] text-accent"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <dt className="max-w-[12ch] font-serif text-xl font-bold leading-tight text-foreground">
                {point.value}
              </dt>
              <dd className="max-w-[30ch] text-sm leading-6 text-muted-foreground">{point.label}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
