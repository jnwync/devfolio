'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroImage from '../HeroImage';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  const { personal } = portfolioData;
  const roles = personal.roles;
  
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
    
    // Safety check
    if (!role) return;
    
    // Slower on mobile for better readability
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const typingSpeed = isDeleting ? (isMobile ? 60 : 50) : (isMobile ? 150 : 100);
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
    <section 
      id="about"
      className="scroll-mt-20 relative min-h-dvh flex items-center overflow-hidden"
      aria-label="Hero introduction"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-background -z-10" />
      <motion.div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, var(--accent) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, var(--primary) 0%, transparent 50%)
          `,
          filter: 'blur(80px)',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div 
        className="absolute inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-muted/30 -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Name with gradient */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight motion-safe:transition-all motion-safe:duration-700 ${
                isVisible ? 'opacity-100 motion-safe:translate-y-0' : 'opacity-0 motion-safe:translate-y-8'
              }`}
            >
              <span className="bg-linear-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
                {personal.name}
              </span>
            </h1>

            {/* Role */}
            <h2
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-200 ${
                isVisible ? 'opacity-100 motion-safe:translate-y-0' : 'opacity-0 motion-safe:translate-y-8'
              }`}
              aria-live="polite"
              aria-atomic="true"
            >
              I'm a{' '}
              <span className="relative inline-block min-h-[1.5em] min-w-[280px] sm:min-w-[380px] md:min-w-[480px]">
                <span className="text-accent font-semibold">
                  {displayedText}
                </span>
                <span className="animate-pulse text-accent" aria-hidden="true">|</span>
              </span>
            </h2>

            {/* Description */}
            <p
              className={`text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-300 ${
                isVisible ? 'opacity-100 motion-safe:translate-y-0' : 'opacity-0 motion-safe:translate-y-8'
              }`}
            >
              {personal.bio}
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-3 pt-2 motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-400 ${
                isVisible ? 'opacity-100 motion-safe:translate-y-0' : 'opacity-0 motion-safe:translate-y-8'
              }`}
            >
              <Button asChild size="lg">
                <a href="#experience" className="group">
                  <span>View Experience</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </Button>
              
              <Button asChild variant="outline" size="default">
                <a href="/cv.pdf" download className="group">
                  <span>Download CV</span>
                  <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Image */}
          <div
            className={`relative order-first lg:order-last motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-100 ${
              isVisible ? 'opacity-100 motion-safe:translate-y-0' : 'opacity-0 motion-safe:translate-y-8'
            }`}
          >
            <HeroImage />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-500 max-lg:hidden ${
            isVisible ? 'opacity-100 motion-safe:translate-y-0' : 'opacity-0 motion-safe:translate-y-4'
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
