'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, FileDown, Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  phone: Phone,
  mail: Mail,
};

function displayValue(href: string): string {
  return href.replace(/^mailto:/, '').replace(/^tel:/, '').replace(/^https?:\/\//, '').replace(/\/$/, '');
}

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the compatibility path.
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
  const directory = contactLinks.filter((link) => !link.primary);

  const handleCopyEmail = async () => {
    if (await copyText(personal.email)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="editorial-rule scroll-mt-20 py-20 md:py-28">
      <div className="section-shell">
        <header className="max-w-3xl">
          <p className="section-kicker">05 — Contact</p>
          <h2 id="contact-heading" className="mt-4 text-balance font-serif text-4xl font-bold leading-[1.04] text-foreground sm:text-5xl lg:text-6xl">
            Choose the conversation that fits.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            I am available for project delivery, contract work, and full-time product engineering conversations.
          </p>
        </header>

        <div className="mt-12 grid gap-10 border-y border-border py-8 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className="font-serif text-2xl font-bold text-foreground">Project work</h3>
            <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
              Tell me what you are building, where delivery is stuck, and what needs to ship next.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={`mailto:${personal.email}`}>
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  Discuss a project
                </a>
              </Button>
              <Button onClick={handleCopyEmail} variant="outline" size="lg" aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}>
                {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold text-foreground">Full-time roles</h3>
            <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
              Review the experience timeline, then reach out about a full-stack role on a product team.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="/cv.pdf" download>
                  <FileDown className="h-5 w-5" aria-hidden="true" />
                  Download CV
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`mailto:${personal.email}`}>
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  Discuss a role
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-10 pt-10 lg:grid-cols-[0.55fr_0.45fr] lg:gap-16">
          <div>
            <p className="text-sm leading-6 text-muted-foreground">Based in {personal.location}. Available for remote, hybrid, contract, and full-time conversations.</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Elsewhere</p>
            <ul className="mt-4 divide-y divide-border border-y border-border" role="list">
              {directory.map((link) => {
                const Icon = iconMap[link.icon];
                const isExternal = link.href.startsWith('http');
                return (
                  <li key={link.label}>
                    <a href={link.href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} className="group flex min-h-14 items-center gap-4 py-4 transition-colors hover:text-primary">
                      {Icon && <Icon className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />}
                      <span className="flex min-w-0 flex-col">
                        <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{link.label}</span>
                        <span className="truncate text-sm font-bold text-foreground">{displayValue(link.href)}</span>
                      </span>
                      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
