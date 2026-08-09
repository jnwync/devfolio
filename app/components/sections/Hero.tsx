'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { BriefcaseBusiness, ClipboardList } from 'lucide-react';
import HeroImage from '../HeroImage';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  const { personal } = portfolioData;
  const reduceMotion = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden py-10 sm:py-16 lg:py-20"
      aria-labelledby="hero-heading"
    >
      <div aria-hidden="true" className="grain-layer" />
      <div className="section-shell relative z-10">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border pb-4 sm:mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-foreground">
            {personal.name}
          </span>
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            {personal.availability.message}
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } } }}
            className="max-w-3xl space-y-5"
          >
            <motion.h1
              variants={item}
              id="hero-heading"
              className="max-w-2xl font-serif text-[clamp(2.15rem,1.4rem+4.4vw,4.5rem)] font-bold leading-[1.04] text-foreground"
            >
              {personal.positioning}
            </motion.h1>

            <motion.p variants={item} className="max-w-xl text-base leading-7 text-muted-foreground">
              {personal.summary}
            </motion.p>

            <motion.div variants={item} className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="#projects">
                  <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                  See client work
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href="#experience">
                  <ClipboardList className="h-5 w-5" aria-hidden="true" />
                  Review hiring experience
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1], delay: 0.12 }}
          >
            <HeroImage />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
