'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, type Variants } from 'framer-motion';

interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'contract' | 'freelance' | 'internship' | 'academic';
  period: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  link?: string;
}

export default function ProfessionalExperience() {
  const experiences: Experience[] = [
    {
      id: 'packup',
      company: 'PackUp (Suppliipack)',
      role: 'Full-Stack Developer',
      type: 'contract',
      period: 'Jun 2024 - Dec 2024',
      startDate: '2024-06',
      endDate: '2024-12',
      location: 'Hybrid',
      description: 'Mobile-first web application enabling MSMEs to access wholesale packaging pricing with reduced MOQs.',
      achievements: [
        'Supported UI/UX design, database maintenance, back-end development, and production deployment',
        'Ensured smooth user experience for both senders and couriers through full-stack contributions',
        'Collaborated with cross-functional team to deliver features on schedule',
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Firebase'],
      link: 'https://www.packup.ph/',
    },
    {
      id: 'apollo',
      company: 'Wisdomous Inc. (Apollo Medical Group)',
      role: 'Front-End Developer',
      type: 'contract',
      period: 'Jan 2024 - May 2024',
      startDate: '2024-01',
      endDate: '2024-05',
      location: 'Remote',
      description: 'Patient portal and hospital booking web application for healthcare facility management.',
      achievements: [
        'Led front-end development delivering responsive UI/UX supporting patients and admin staff',
        'Refactored back-end logic and optimized database structure, reducing load times significantly',
        'Collaborated in agile 2-developer team through design discussions, sprint reviews, and production deployment',
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    },
    {
      id: 'dti',
      company: 'Department of Trade and Industry (DTI) Iloilo',
      role: 'Full-Stack Developer',
      type: 'academic',
      period: 'Aug 2023 - May 2024',
      startDate: '2023-08',
      endDate: '2024-05',
      location: 'Iloilo, Philippines',
      description: 'Government-backed MSME e-commerce platform mapping and promoting regional industries.',
      achievements: [
        'Built and deployed platform used to map vendors and showcase local products',
        'Implemented scalable APIs and dynamic front-end components for vendor discovery',
        'Collaborated with DTI stakeholders to meet government requirements and accessibility standards',
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'REST APIs'],
      link: 'https://dti6-industry-map.vercel.app/',
    },
    {
      id: 'baylo',
      company: 'DemiGAD (Baylo Central)',
      role: 'Full-Stack Developer',
      type: 'contract',
      period: 'Jun 2023 - Dec 2023',
      startDate: '2023-06',
      endDate: '2023-12',
      location: 'Hybrid',
      description: 'E-commerce platform for MSMEs with integrated payment and inventory management.',
      achievements: [
        'Contributed to full-stack development enhancing functionality, performance, and UX',
        'Provided feedback on site design and features during agile ceremonies',
        'Implemented features supporting vendor onboarding and product catalog management',
      ],
      technologies: ['React', 'Next.js', 'Express.js', 'MongoDB', 'Stripe'],
    },
  ];

  const typeLabels = {
    contract: 'Contract',
    freelance: 'Freelance',
    internship: 'Internship',
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
      id="experience" 
      aria-labelledby="experience-heading" 
      className="border-t border-border py-20 md:py-32"
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
            Career Journey
          </p>
          <h2 id="experience-heading" className="text-balance text-4xl font-bold md:text-5xl">
            Professional Experience
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Proven track record delivering web and mobile solutions across contract, freelance, and capstone projects in agile, remote-first environments.
          </p>
        </motion.header>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line (hidden on mobile) */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-border via-border to-transparent hidden md:block" 
            aria-hidden="true"
          />

          {/* Experience Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-12"
          >
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.id}
                variants={cardVariants}
                className="relative md:pl-8"
              >
                {/* Timeline dot (hidden on mobile) */}
                <div 
                  className="absolute left-0 top-6 hidden md:block"
                  aria-hidden="true"
                >
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-accent -translate-x-[3.5px]" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-accent/20 animate-ping -translate-x-[3.5px]" />
                  </div>
                </div>

                <Card className="group transition-[border-color,box-shadow] duration-200 hover:border-accent/50 hover:shadow-md">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <CardTitle className="text-2xl group-hover:text-accent transition-colors">
                          {exp.company}
                        </CardTitle>
                        <div className="flex flex-col gap-1 text-sm">
                          <span className="font-semibold text-foreground">{exp.role}</span>
                          <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                            <time dateTime={`${exp.startDate}/${exp.endDate}`}>
                              {exp.period}
                            </time>
                            <span aria-hidden="true">•</span>
                            <span>{typeLabels[exp.type]}</span>
                            {exp.location && (
                              <>
                                <span aria-hidden="true">•</span>
                                <span>{exp.location}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {exp.link && (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm shrink-0"
                          aria-label={`Visit ${exp.company} website`}
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

                    <CardDescription className="text-base leading-relaxed mt-3">
                      {exp.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Achievements */}
                    <ul className="space-y-2" role="list">
                      {exp.achievements.map((achievement, idx) => (
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
                      {exp.technologies.map((tech) => (
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
      </div>
    </section>
  );
}