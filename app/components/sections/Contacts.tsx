'use client';

import { Fragment, useState } from 'react';
import { ArrowUp, Check, Copy, FileDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import Wordmark from '../Wordmark';
import { world } from '../world/state';

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
 * The bookend. The page opened on the water with the masthead standing in
 * it, and it closes the same way: no plate, the world visible all the way
 * down. The closing line rises out of the water word by word, and its
 * period — the same green dot the sun or moon set off from in the hero —
 * stays lit as a beacon reflected in the water below it.
 *
 * Contact details stay conventional and scannable. Without JavaScript the
 * whole section renders complete and still.
 */
export default function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copied = copyState === 'copied';
  const { personal } = portfolioData;
  const github = portfolioData.contactLinks.find((l) => l.icon === 'github');
  const linkedin = portfolioData.contactLinks.find((l) => l.icon === 'linkedin');
  const phone = portfolioData.contactLinks.find((l) => l.icon === 'phone');

  const handleCopyEmail = async () => {
    const ok = await copyText(personal.email);
    setCopyState(ok ? 'copied' : 'failed');
    window.setTimeout(() => setCopyState('idle'), 2400);
  };
  const copyLabel =
    copyState === 'copied'
      ? 'Email copied to clipboard'
      : copyState === 'failed'
        ? 'Copy failed. Select the address to copy it.'
        : 'Copy email address';

  const handleBackToTop = () => world.scrollTo(0);

  return (
    <section
      id="contact"
      data-scene="contact"
      aria-labelledby="contact-heading"
      className="contact-scene"
    >
      <div className="section-shell w-full">
        <p className="avail-line" data-contact-lead>
          <span className="dot" aria-hidden="true" />
          {personal.availability.message}
        </p>

        <h2
          id="contact-heading"
          className="mt-6 max-w-4xl font-serif text-[clamp(2.4rem,1.3rem+5.8vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground"
        >
          {/* The space lives between the spans: trailing whitespace inside
              an inline-block is trimmed away. */}
          {['Let’s', 'ship', 'something'].map((word, index) => (
            <Fragment key={word}>
              <span className="contact-word" data-word={index}>
                {word}
              </span>
              {index < 2 ? ' ' : null}
            </Fragment>
          ))}
          <span className="contact-word text-primary" data-word="3" data-beacon>
            .
          </span>
        </h2>

        <div data-contact-tail>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Open to contract, freelance, and full-time product engineering roles, working
            remotely from {personal.timezone}. Email is the fastest way to reach me.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </Button>
            <Button
              onClick={handleCopyEmail}
              variant="outline"
              size="icon"
              aria-label={copyLabel}
              title={copyLabel}
            >
              <span aria-live="polite" className="sr-only">
                {copyState === 'idle' ? '' : copyLabel}
              </span>
              {copied ? (
                <Check className="h-5 w-5 text-primary" aria-hidden="true" />
              ) : (
                <Copy className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/cv.pdf" download title="Download resume (PDF)">
                <FileDown className="h-5 w-5" aria-hidden="true" />
                Resume (PDF)
              </a>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-7 md:grid-cols-4">
            <div>
              <dt className="mono-meta text-muted-foreground">GitHub</dt>
              <dd className="mt-2">
                <a
                  href={github?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex min-h-6 items-center gap-2 text-sm font-bold text-foreground"
                >
                  <FaGithub className="h-4 w-4" aria-hidden="true" />
                  jnwync
                </a>
              </dd>
            </div>
            <div>
              <dt className="mono-meta text-muted-foreground">LinkedIn</dt>
              <dd className="mt-2">
                <a
                  href={linkedin?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex min-h-6 items-center gap-2 text-sm font-bold text-foreground"
                >
                  <FaLinkedin className="h-4 w-4" aria-hidden="true" />
                  in/jnwync
                </a>
              </dd>
            </div>
            <div>
              <dt className="mono-meta text-muted-foreground">Phone</dt>
              <dd className="mt-2">
                <a href={phone?.href} className="link-underline inline-flex min-h-6 items-center text-sm font-bold text-foreground">
                  {personal.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="mono-meta text-muted-foreground">Location</dt>
              <dd className="mt-2 text-sm font-bold text-foreground">
                {personal.location}
                <span className="mt-1 block font-normal text-muted-foreground">
                  {personal.timezone} · Remote
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <p className="flex items-center gap-3 text-foreground">
              <Wordmark className="text-lg" />
              <span className="mono-meta text-muted-foreground">
                © {new Date().getFullYear()} Jon Wayne Cabusbusan
              </span>
            </p>
            <Button
              onClick={handleBackToTop}
              variant="outline"
              size="icon"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
