'use client';

import { useEffect, useState } from 'react';
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

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

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
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const element = document.querySelector(href);
    if (!element) return;

    setActiveSection(href.slice(1));
    setIsOpen(false);

    const nav = document.querySelector('nav');
    const navHeight = nav?.getBoundingClientRect().height || 72;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementPosition - navHeight,
      behavior: 'smooth',
    });
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
          <div className="flex min-h-18 items-center justify-between gap-4">
            <a
              href="#about"
              onClick={(event) => handleLinkClick(event, '#about')}
              className="font-serif text-xl font-bold text-foreground transition-colors hover:text-primary focus-visible:rounded-sm"
              aria-label="Jon Wayne Cabusbusan - Home"
            >
              JWC
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {links.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => handleLinkClick(event, link.href)}
                    className={`relative rounded-md px-3 py-2 text-sm font-bold transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
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
                className="overflow-hidden md:hidden"
              >
                <div className="grid gap-2 border-t border-border py-4">
                  {links.map((link) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(event) => handleLinkClick(event, link.href)}
                        className={`rounded-md px-3 py-3 text-sm font-bold ${
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
