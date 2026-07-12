'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, FileDown, Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import Magnetic from '../motion/Magnetic';
import SectionMark from '../SectionMark';

const iconMap: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  phone: Phone,
  mail: Mail,
};

function displayValue(href: string): string {
  return href
    .replace(/^mailto:/, '')
    .replace(/^tel:/, '')
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
}

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the compatibility path for stricter browser contexts.
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  return copied;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { personal, contactLinks } = portfolioData;
  const email = personal.email;
  const directory = contactLinks.filter((link) => !link.primary);

  const handleCopyEmail = async () => {
    if (await copyText(email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="editorial-rule relative scroll-mt-20 overflow-hidden py-20 md:py-28"
    >
      <SectionMark index="05" />
      <div className="section-shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_0.45fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="section-kicker">05 — Contact</p>
            <h2
              id="contact-heading"
              className="mt-4 text-balance font-serif text-4xl font-bold leading-[1.04] text-foreground sm:text-5xl lg:text-6xl"
            >
              Start with the role, the product, or the problem.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              I am open to full-time, contract, and selected freelance full-stack
              development opportunities. Tell me what you are building and what you need
              shipped.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic strength={0.4}>
                <Button asChild size="lg">
                  <a href={`mailto:${email}`}>
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    Email Jon Wayne
                  </a>
                </Button>
              </Magnetic>
              <Button asChild variant="outline" size="lg">
                <a href="/cv.pdf" download>
                  <FileDown className="h-5 w-5" aria-hidden="true" />
                  Download CV
                </a>
              </Button>
              <Button
                onClick={handleCopyEmail}
                variant="ghost"
                size="lg"
                aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
              >
                {copied ? (
                  <Check className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Copy className="h-5 w-5" aria-hidden="true" />
                )}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Elsewhere
            </p>
            <ul className="mt-4 divide-y divide-border border-y border-border" role="list">
              {directory.map((link) => {
                const Icon = iconMap[link.icon];
                const isExternal = link.href.startsWith('http');
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="group flex min-h-14 items-center gap-4 py-4 transition-colors hover:text-primary focus-visible:rounded-sm"
                    >
                      {Icon && (
                        <Icon
                          className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                          aria-hidden="true"
                        />
                      )}
                      <span className="flex min-w-0 flex-col">
                        <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                          {link.label}
                        </span>
                        <span className="truncate text-sm font-bold text-foreground">
                          {displayValue(link.href)}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              Based in {personal.location}. Available for remote, hybrid, contract, and
              full-time conversations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
