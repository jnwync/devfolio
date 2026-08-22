'use client';

import { useState } from 'react';
import { ArrowUp, Check, Copy, FileDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import Wordmark from '../Wordmark';

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

/**
 * Final scene. `.scene-contact` is sticky at the page bottom behind
 * `.page-above`, so the whole site lifts away like a sheet to reveal it —
 * the mirror of the Work panel covering the hero at the top.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { personal } = portfolioData;
  const github = portfolioData.contactLinks.find((l) => l.icon === 'github');
  const linkedin = portfolioData.contactLinks.find((l) => l.icon === 'linkedin');
  const phone = portfolioData.contactLinks.find((l) => l.icon === 'phone');

  const handleCopyEmail = async () => {
    if (await copyText(personal.email)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="dark-scene scene-contact flex flex-col justify-center py-14 md:py-16"
    >
      <div className="section-shell w-full">
        <p className="mono-meta inline-flex items-center gap-2 rounded-full border border-border-on-ink px-3.5 py-2 text-paper-on-ink">
          <span className="h-2 w-2 rounded-full bg-green-bright" aria-hidden="true" />
          {personal.availability.message}
        </p>

        <h2
          id="contact-heading"
          className="mt-6 max-w-4xl font-serif text-[clamp(2.4rem,1.3rem+5.8vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-paper-on-ink"
        >
          Let&rsquo;s ship something<span className="text-green-bright">.</span>
        </h2>

        <p className="mt-5 max-w-xl text-base leading-7 text-muted-on-ink">
          Available for project delivery, contract work, and full-time product engineering
          conversations. Tell me what needs to ship next.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild variant="paper" size="lg">
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
          </Button>
          <Button
            onClick={handleCopyEmail}
            variant="outlineDark"
            size="icon"
            aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
          >
            <span aria-live="polite" className="sr-only">
              {copied ? 'Email copied' : ''}
            </span>
            {copied ? (
              <Check className="h-5 w-5 text-green-bright" aria-hidden="true" />
            ) : (
              <Copy className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
          <Button asChild variant="outlineDark" size="lg">
            <a href="/cv.pdf" download>
              <FileDown className="h-5 w-5" aria-hidden="true" />
              Download CV
            </a>
          </Button>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border-on-ink pt-7 md:grid-cols-4">
          <div>
            <dt className="mono-meta text-muted-on-ink">GitHub</dt>
            <dd className="mt-2">
              <a
                href={github?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-sm font-bold text-paper-on-ink"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                jnwync
              </a>
            </dd>
          </div>
          <div>
            <dt className="mono-meta text-muted-on-ink">LinkedIn</dt>
            <dd className="mt-2">
              <a
                href={linkedin?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-sm font-bold text-paper-on-ink"
              >
                <FaLinkedin className="h-4 w-4" aria-hidden="true" />
                in/jnwync
              </a>
            </dd>
          </div>
          <div>
            <dt className="mono-meta text-muted-on-ink">Phone</dt>
            <dd className="mt-2">
              <a href={phone?.href} className="link-underline text-sm font-bold text-paper-on-ink">
                {personal.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="mono-meta text-muted-on-ink">Location</dt>
            <dd className="mt-2 text-sm font-bold text-paper-on-ink">{personal.location}</dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border-on-ink pt-6">
          <p className="flex items-center gap-3 text-paper-on-ink">
            <Wordmark className="text-lg" />
            <span className="mono-meta text-muted-on-ink">
              © {new Date().getFullYear()} Jon Wayne Cabusbusan
            </span>
          </p>
          <Button
            onClick={handleBackToTop}
            variant="outlineDark"
            size="icon"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
