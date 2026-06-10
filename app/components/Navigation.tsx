'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const links = [
  { name: 'Profile', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Capabilities', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const MOBILE_MENU_EXIT_MS = 220;
const NAVIGATION_SETTLE_FALLBACK_MS = 1200;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const pendingSectionRef = useRef<string | null>(null);
  const settleTimerRef = useRef<number | null>(null);
  const scrollEndCleanupRef = useRef<(() => void) | null>(null);
  const visibleActiveSection = pendingSection ?? activeSection;

  const clearSettleWatchers = () => {
    if (settleTimerRef.current) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }

    if (scrollEndCleanupRef.current) {
      scrollEndCleanupRef.current();
      scrollEndCleanupRef.current = null;
    }
  };

  const releaseNavigationIntent = (sectionId: string) => {
    if (pendingSectionRef.current !== sectionId) return;

    clearSettleWatchers();
    pendingSectionRef.current = null;
    setActiveSection(sectionId);
    setPendingSection(null);
  };

  const watchScrollSettled = (sectionId: string) => {
    clearSettleWatchers();

    const handleScrollEnd = () => releaseNavigationIntent(sectionId);
    window.addEventListener('scrollend', handleScrollEnd, { once: true });
    scrollEndCleanupRef.current = () => window.removeEventListener('scrollend', handleScrollEnd);

    settleTimerRef.current = window.setTimeout(() => {
      releaseNavigationIntent(sectionId);
    }, NAVIGATION_SETTLE_FALLBACK_MS);
  };

  useEffect(() => {
    const sections = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sections.set(entry.target.id, entry.intersectionRatio);
          } else {
            sections.delete(entry.target.id);
          }
        });

        if (pendingSectionRef.current) return;

        if (sections.size > 0) {
          const mostVisible = Array.from(sections.entries()).reduce((max, current) =>
            current[1] > max[1] ? current : max
          );
          setActiveSection(mostVisible[0]);
        }
      },
      {
        rootMargin: '-88px 0px -45% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    links.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      sections.clear();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }

      if (scrollEndCleanupRef.current) {
        scrollEndCleanupRef.current();
      }
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return;

    const navBar = document.querySelector('[data-nav-bar]');
    const navHeight = navBar?.getBoundingClientRect().height || 72;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: Math.max(elementPosition - navHeight, 0),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const element = document.querySelector(href);
    if (!element) return;

    const shouldDelayScroll = isOpen;
    const sectionId = href.slice(1);

    pendingSectionRef.current = sectionId;
    setPendingSection(sectionId);
    setActiveSection(sectionId);

    if (shouldDelayScroll) {
      window.requestAnimationFrame(() => {
        setIsOpen(false);

        window.setTimeout(() => {
          scrollToSection(href);
          watchScrollSettled(sectionId);
        }, MOBILE_MENU_EXIT_MS);
      });
      return;
    }

    setIsOpen(false);
    scrollToSection(href);
    watchScrollSettled(sectionId);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <nav
        className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="section-shell">
          <div data-nav-bar className="flex min-h-18 items-center justify-between gap-4">
            <a
              href="#about"
              onClick={(event) => handleLinkClick(event, '#about')}
              className="inline-flex min-h-11 items-center rounded-md pr-3 font-serif text-xl font-bold text-foreground transition-colors hover:text-primary focus-visible:rounded-sm"
              aria-label="Jon Wayne Cabusbusan - Home"
            >
              JWC
            </a>

            <div className="hidden items-center gap-1.5 md:flex">
              {links.map((link) => {
                const sectionId = link.href.slice(1);
                const isActive = visibleActiveSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => handleLinkClick(event, link.href)}
                    className={`relative inline-flex min-h-11 items-center rounded-md px-3 text-sm font-bold transition-colors ${
                      isActive ? 'bg-secondary/70 text-primary shadow-[inset_0_0_0_1px_oklch(0.82_0.035_78/0.7)]' : 'text-muted-foreground hover:bg-secondary/45 hover:text-foreground'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                      />
                    )}
                  </a>
                );
              })}

              <Button asChild size="sm" className="ml-3">
                <a href="#contact" onClick={(event) => handleLinkClick(event, '#contact')}>
                  Start a conversation
                </a>
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto md:hidden"
              >
                <div className="grid gap-2 border-t border-border py-4">
                  {links.map((link) => {
                    const sectionId = link.href.slice(1);
                    const isActive = visibleActiveSection === sectionId;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(event) => handleLinkClick(event, link.href)}
                        className={`flex min-h-12 items-center rounded-md px-3 text-sm font-bold transition-colors ${
                          isActive ? 'bg-secondary text-primary' : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                  <Button asChild size="default" className="mt-2">
                    <a href="#contact" onClick={(event) => handleLinkClick(event, '#contact')}>
                      Start a conversation
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
