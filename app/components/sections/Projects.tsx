'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, type Variants } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { portfolioData } from '@/data/portfolio';

export default function Projects() {
  const projects = portfolioData.projects;

  const typeLabels = {
    freelance: 'Freelance',
    personal: 'Personal',
    academic: 'Academic',
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
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
            Selected Work
          </p>
          <h2 id="projects-heading" className="text-balance text-4xl font-bold md:text-5xl">
            Projects
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Independent and freelance projects showcasing end-to-end development, from concept through deployment.
          </p>
        </motion.header>

        {/* Project Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative"
            >
              <Card className="group relative overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] before:absolute before:inset-0 before:bg-linear-to-br before:from-accent/5 before:to-primary/5 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
                {project.image && (
                  <div className="relative -mt-6 w-full aspect-video border-b border-border bg-muted overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1200px) 100vw, 800px"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <CardTitle className="text-2xl group-hover:text-accent transition-colors">
                        {project.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <time dateTime={`${project.startDate}/${project.endDate}`}>
                          {project.period}
                        </time>
                        <span aria-hidden="true">•</span>
                        <span>{typeLabels[project.type]}</span>
                      </div>
                    </div>

                    {(project.github || project.link) && (
                      <div className="flex items-center gap-3 shrink-0">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.25)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                            aria-label={`View ${project.title} source code on GitHub`}
                          >
                            <FaGithub className="w-4 h-4" aria-hidden="true" />
                            <span className="hidden sm:inline">Source</span>
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.25)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
                            aria-label={`Visit ${project.title} website`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span className="hidden sm:inline">Visit Site</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <CardDescription className="text-base leading-relaxed mt-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Achievements */}
                  <ul className="space-y-2" role="list">
                    {project.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm leading-relaxed"
                      >
                        <span className="text-accent mt-1.5 shrink-0" aria-hidden="true">▸</span>
                        <span className="text-foreground/80">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block rounded-md bg-accent/5 px-3 py-1.5 text-xs font-medium text-foreground/70 border border-border hover:border-accent/30 hover:bg-accent/10 hover:text-foreground transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
