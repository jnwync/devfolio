'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Wordmark from './Wordmark';

const links = [
  { name: 'Work', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const MOBILE_MENU_EXIT_MS = 220;
const NAVIGATION_SETTLE_FALLBACK_MS = 1200;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [activeSection, setActiveSection] = useState('');
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

  // Track which section is most visible for the active link state. The
  // contact scene is pinned behind the page from scroll 0, so observers
  // would misread it — it is handled by the reveal-position scroll handler
  // below instead.
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
        } else {
          setActiveSection('');
        }
      },
      {
        rootMargin: '-88px 0px -45% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    links.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element && !element.classList.contains('scene-contact')) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      sections.clear();
    };
  }, []);

  // Flip the nav to its dark theme while a dark scene sits under it. Scenes
  // inside .page-above are observed; the pinned contact scene counts once
  // the page above it has lifted past the nav.
  useEffect(() => {
    const darkScenes = document.querySelectorAll('.dark-scene:not(.scene-contact)');
    const pageAbove = document.querySelector('.page-above');

    const intersecting = new Set<Element>();
    let overScene = false;
    let overContact = false;
    let contactRevealed = false;
    let ticking = false;

    const apply = () => {
      setOverDark(overScene || overContact);
      if (contactRevealed && !pendingSectionRef.current) {
        setActiveSection('contact');
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target);
          } else {
            intersecting.delete(entry.target);
          }
        });
        overScene = intersecting.size > 0;
        apply();
      },
      // Only the strip the nav occupies counts.
      { rootMargin: '0px 0px -94% 0px', threshold: 0 }
    );
    darkScenes.forEach((scene) => observer.observe(scene));

    const handleScroll = () => {
      if (ticking || !pageAbove) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const bottom = pageAbove.getBoundingClientRect().bottom;
        overContact = bottom <= 80;
        contactRevealed = bottom <= window.innerHeight * 0.55;
        apply();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
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

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsOpen(false);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
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
        className="site-nav sticky top-0 z-50 border-b border-transparent"
        data-nav-theme={overDark && !isOpen ? 'dark' : undefined}
        aria-label="Main navigation"
      >
        <div className="section-shell">
          <div data-nav-bar className="flex min-h-18 items-center justify-between gap-4">
            <a
              href="#about"
              onClick={handleHomeClick}
              id="nav-wordmark"
              className="nav-wordmark inline-flex min-h-11 items-center rounded-md pr-3 text-[1.35rem] focus-visible:rounded-sm"
              aria-label="Jon Wayne Cabusbusan - Home"
            >
              <Wordmark />
            </a>

            <div className="hidden items-center gap-7 md:flex">
              {links.map((link) => {
                const sectionId = link.href.slice(1);
                const isActive = visibleActiveSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => handleLinkClick(event, link.href)}
                    className="nav-link link-underline inline-flex min-h-11 items-center text-sm font-bold"
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {link.name}
                  </a>
                );
              })}

              <a
                href="/cv.pdf"
                download
                className="nav-resume inline-flex min-h-10 items-center rounded-lg px-4 text-sm font-bold"
              >
                Resume
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="nav-menu-btn inline-flex h-12 w-12 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
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
                        aria-current={isActive ? 'location' : undefined}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                  <a
                    href="/cv.pdf"
                    download
                    className="flex min-h-12 items-center rounded-md px-3 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
                  >
                    Resume
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
