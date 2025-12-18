'use client';

import { useTheme } from '../ThemeProvider';
import { useEffect, useState } from 'react';
import HeroImage from '../HeroImage';

const roles = [
  'Full-Stack Web Developer',
  'React & Next.js Developer',
  'React Native Developer',
  'Product-Focused Engineer',
];

export default function Hero() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const role = roles[currentRole];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = isDeleting ? 500 : 2000;

    if (!isDeleting && displayedText === role) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? role.substring(0, displayedText.length - 1)
          : role.substring(0, displayedText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRole]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with subtle grid pattern */}
      <div className="absolute inset-0 bg-background -z-10" />
      <div 
        className="absolute inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-muted/30 -z-10" />
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10">
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="group inline-flex items-center gap-2 rounded-full px-4 py-2 bg-card border border-border hover:border-accent transition-colors"
        >
          <span className="text-sm">
            {!mounted ? '🌙' : theme === 'dark' ? '☀️' : '🌙'}
          </span>
          <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity max-sm:hidden">
            {!mounted ? 'Dark' : theme === 'dark' ? 'Light' : 'Dark'}
          </span>
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Name with gradient */}
            <h1
              className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="bg-linear-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                Jon Wayne Cabusbusan
              </span>
            </h1>

            {/* Role */}
            <h2
              className={`text-xl md:text-3xl lg:text-4xl font-medium text-muted-foreground transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              I'm a{' '}
              <span className="relative inline-block min-h-[1.5em]">
                <span className="text-accent font-semibold">
                  {displayedText}
                </span>
                <span className="animate-pulse text-accent">|</span>
              </span>
            </h2>

            {/* Description */}
            <p
              className={`text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              I build clean, high-performance digital products focused on real users, accessibility, and long-term impact.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-3 pt-2 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
              >
                <span>View Projects</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="/cv.pdf"
                download
                className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-accent px-6 py-3 font-semibold text-accent hover:bg-accent/5 transition-colors"
              >
                <span>Download CV</span>
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div
            className={`relative order-first lg:order-last transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <HeroImage />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 max-lg:hidden ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-wider uppercase">Scroll</span>
            <div className="h-6 w-px bg-linear-to-b from-accent to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
