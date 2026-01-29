'use client';

import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import { FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  phone: FaPhone,
  mail: MdEmail,
} as const;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = portfolioData.personal.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const contactLinks = portfolioData.contactLinks;

  // Animation variants
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

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading" 
      className="scroll-mt-20 border-t border-border py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 space-y-6 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Get In Touch
          </p>
          <h2 id="contact-heading" className="text-balance text-4xl font-bold leading-tight md:text-5xl">
            Let's Build Something Great
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
            I'm always excited to collaborate on impactful projects. Whether you need a full-stack developer or want to discuss an idea, just drop me a line!
          </p>

          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm sm:text-base font-medium text-green-700 dark:text-green-400 border border-green-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for opportunities
          </motion.div>
        </motion.header>

        {/* Contact Links */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Primary Email Actions */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div variants={itemVariants}>
              <Button asChild size="lg" className="group w-full sm:w-auto">
                <a 
                  href={`mailto:${email}`}
                  className="inline-flex items-center justify-center gap-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Send Email</span>
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </Button>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Button
                onClick={handleCopyEmail}
                variant="outline"
                size="lg"
                className="group relative w-full sm:w-auto"
                aria-label={copied ? "Email address copied to clipboard" : "Copy email address to clipboard"}
              >
                {copied ? (
                  <>
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy Email</span>
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links - Mobile: Vertical Icon Stack, Desktop: Horizontal Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col sm:grid gap-3 sm:grid-cols-2 md:grid-cols-3"
          >
            {contactLinks.filter(link => !link.primary).map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <motion.a
                  key={link.label}
                  variants={itemVariants}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 rounded-lg border border-border bg-card px-6 py-4 sm:py-4 text-base font-medium leading-normal transition-[border-color,box-shadow,transform] hover:border-accent/50 hover:shadow-[0_4px_20px_rgba(var(--accent-rgb),0.15)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 duration-300 min-h-14"
                  aria-label={`Connect on ${link.label}`}
                >
                  <span className="text-accent group-hover:scale-110 transition-transform duration-300 w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center shrink-0">
                    {Icon && <Icon className="w-full h-full" />}
                  </span>
                  <span className="text-foreground group-hover:text-accent transition-colors duration-300 text-center sm:text-left sm:flex-1 text-sm sm:text-base">{link.label}</span>
                  {link.href.startsWith('http') && (
                    <svg 
                      className="hidden sm:block w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}