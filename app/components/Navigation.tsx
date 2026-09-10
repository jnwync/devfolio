'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Wordmark from './Wordmark';
import { world } from './world/state';

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

  // Track which section is most visible for the active link state.
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
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      sections.clear();
    };
  }, []);

  // Flip the nav to its plate theme while a plate sits under it.
  useEffect(() => {
    const plates = document.querySelectorAll('.dark-scene');
    const intersecting = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target);
          } else {
            intersecting.delete(entry.target);
          }
        });
        setOverDark(intersecting.size > 0);
      },
      // Only the strip the nav occupies counts.
      { rootMargin: '0px 0px -94% 0px', threshold: 0 }
    );
    plates.forEach((plate) => observer.observe(plate));

    return () => observer.disconnect();
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

  // Every jump goes through the shared scroll: it wraps Lenis when the
  // motion bundle has it and falls back to the native call otherwise, so
  // the page never has two things scrolling it at once. The nav offset
  // comes from each section's own scroll-margin-top.
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return;
    world.scrollTo(element);
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
    world.scrollTo(0);
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
                title="Download resume (PDF)"
                aria-label="Download resume (PDF)"
                className="nav-resume inline-flex min-h-10 items-center rounded-lg px-4 text-sm font-bold"
              >
                Resume
              </a>
              <ThemeToggle className="h-11 w-11" />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle className="h-12 w-12" />
              <button
                type="button"
                onClick={() => setIsOpen((value) => !value)}
                className="nav-menu-btn inline-flex h-12 w-12 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div id="mobile-menu" className={`mobile-menu md:hidden ${isOpen ? 'is-open' : ''}`} inert={!isOpen}>
            <div className="mobile-menu-inner">
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
                  Resume (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
