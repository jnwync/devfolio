'use client';

import { motion, type Variants } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

export default function Skills() {

  const featuredSkills = portfolioData.featuredSkills;
  const skillCategories = portfolioData.skillCategories;

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section 
      id="skills" 
      aria-labelledby="skills-heading" 
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
            Technical Stack
          </p>
          <h2 id="skills-heading" className="text-balance text-4xl font-bold md:text-5xl">
            Skills & Technologies
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Production-ready expertise in modern web development, from pixel-perfect frontends to scalable backend systems.
          </p>
        </motion.header>

        {/* Primary Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-sm font-semibold text-foreground mb-6">Primary Stack</h3>
          <div className="flex flex-wrap gap-3">
            {featuredSkills.map((skill, index) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 + index * 0.05 }}
                className="inline-block rounded-md border border-accent/40 bg-accent/5 px-4 py-2 text-sm font-semibold text-accent hover:border-accent hover:bg-accent/10 transition-colors"
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Skill Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="group"
            >
              {/* Visual separator for second row on desktop */}
              {index >= 2 && (
                <div className="hidden md:block border-t border-border/50 mb-6 -mt-2" aria-hidden="true" />
              )}
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
              
              <motion.div
                variants={containerVariants}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    variants={badgeVariants}
                    className="inline-block rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}