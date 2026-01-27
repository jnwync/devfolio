'use client';

import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';

interface Skill {
  name: string;
  proficiency: number; // 0-100
  yearsUsed: number;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export default function Skills() {
  // const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const featuredSkills: Skill[] = [
    { name: 'React', proficiency: 90, yearsUsed: 2 },
    { name: 'Next.js', proficiency: 85, yearsUsed: 2 },
    { name: 'TypeScript', proficiency: 85, yearsUsed: 2 },
    { name: 'TailwindCSS', proficiency: 90, yearsUsed: 2 },
  ];

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      description: 'Modern JavaScript frameworks and libraries',
      skills: [
        { name: 'React', proficiency: 90, yearsUsed: 2 },
        { name: 'Next.js', proficiency: 85, yearsUsed: 2 },
        { name: 'React Native', proficiency: 75, yearsUsed: 1 },
        { name: 'TypeScript', proficiency: 85, yearsUsed: 2 },
        { name: 'JavaScript (ES6+)', proficiency: 90, yearsUsed: 3 },
      ],
    },
    {
      title: 'Styling & UI',
      description: 'Component-driven design systems',
      skills: [
        { name: 'TailwindCSS', proficiency: 90, yearsUsed: 2 },
        { name: 'CSS3', proficiency: 85, yearsUsed: 3 },
        { name: 'Responsive Design', proficiency: 90, yearsUsed: 3 },
        { name: 'Accessibility (WCAG)', proficiency: 80, yearsUsed: 2 },
      ],
    },
    {
      title: 'Backend & Database',
      description: 'Full-stack capabilities and data persistence',
      skills: [
        { name: 'Node.js', proficiency: 80, yearsUsed: 2 },
        { name: 'Express.js', proficiency: 75, yearsUsed: 2 },
        { name: 'PostgreSQL', proficiency: 75, yearsUsed: 2 },
        { name: 'Prisma ORM', proficiency: 80, yearsUsed: 2 },
        { name: 'Firebase', proficiency: 75, yearsUsed: 2 },
        { name: 'REST APIs', proficiency: 85, yearsUsed: 2 },
      ],
    },
    {
      title: 'Tools & Workflow',
      description: 'Professional development environment',
      skills: [
        { name: 'Git/GitHub', proficiency: 85, yearsUsed: 3 },
        { name: 'Agile/Scrum', proficiency: 80, yearsUsed: 2 },
        { name: 'Postman', proficiency: 85, yearsUsed: 2 },
        { name: 'ESLint', proficiency: 80, yearsUsed: 2 },
        { name: 'VS Code', proficiency: 90, yearsUsed: 3 },
      ],
    },
  ];

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

        {/* Featured Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-sm font-semibold text-foreground mb-6">Core Competencies</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  damping: 20,
                  stiffness: 100,
                  delay: 0.1 + index * 0.1,
                }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    {skill.yearsUsed}yr • {skill.proficiency}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      damping: 20,
                      stiffness: 80,
                      delay: 0.2 + index * 0.1,
                    }}
                    className="h-full bg-linear-to-r from-accent to-primary rounded-full"
                  />
                </div>
              </motion.div>
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