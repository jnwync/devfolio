'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowDown, BriefcaseBusiness, FileDown, Mail } from 'lucide-react';
import HeroImage from '../HeroImage';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  const { personal, featuredSkills } = portfolioData;
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden py-12 sm:py-16 lg:py-20"
      aria-labelledby="hero-heading"
    >
      <div className="section-shell">
        {/* Masthead / folio line */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border pb-4">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-foreground">
            {personal.name}
          </span>
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {personal.availability.message}
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="max-w-3xl space-y-6"
          >
            <motion.p variants={item} className="section-kicker">
              {personal.tagline}
            </motion.p>

            <motion.h1
              variants={item}
              id="hero-heading"
              className="max-w-3xl font-serif text-[clamp(2.25rem,1.3rem+3.2vw,3.4rem)] font-bold leading-[1.05] text-foreground"
            >
              {personal.positioning}
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl"
            >
              {personal.summary}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href={`mailto:${personal.email}`}>
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  Start a conversation
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#projects">
                  <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                  View selected work
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/cv.pdf" download>
                  <FileDown className="h-5 w-5" aria-hidden="true" />
                  Download CV
                </a>
              </Button>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-6">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Core stack
              </span>
              <span className="h-3 w-px bg-border" aria-hidden="true" />
              <ul className="flex flex-wrap gap-x-4 gap-y-1" role="list">
                {featuredSkills.map((skill) => (
                  <li key={skill.name} className="text-sm font-bold text-foreground">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          >
            <HeroImage />
          </motion.div>
        </div>

        <a
          href="#evidence"
          aria-label="Scroll to evidence"
          className="mt-12 hidden w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary lg:inline-flex"
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
          Scroll for the evidence
        </a>
      </div>
    </section>
  );
}
