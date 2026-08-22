import { ArrowDown, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import HeroImage from '../HeroImage';
import Magnetic from '../motion/Magnetic';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';

/**
 * Full-height opening scene. It pins (`.scene-hero`) so the dark Selected
 * Work panel rises over it — the first scene change of the page. Entrance
 * staggering is pure CSS keyed on html[data-intro], so the hero needs no
 * client JS of its own.
 */
export default function Hero() {
  const { personal, proofPoints } = portfolioData;
  const github = portfolioData.contactLinks.find((l) => l.icon === 'github');
  const linkedin = portfolioData.contactLinks.find((l) => l.icon === 'linkedin');

  // "Full-stack developer for products that need to ship." — the closing word
  // carries the brand green.
  const headline = personal.positioning.replace(/\s*ship\.$/, '');
  const hasShip = headline !== personal.positioning;

  return (
    <section id="about" className="scene-hero" aria-labelledby="hero-heading">
      <div className="relative flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-background">
        <div aria-hidden="true" className="grain-layer" />

        <div className="section-shell relative z-10 flex flex-1 flex-col justify-center py-10 sm:py-12">
          <div className="hero-st hero-st-1 mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border pb-4">
            <span className="mono-meta text-foreground">
              {personal.name} — {personal.location}
            </span>
            <span className="mono-meta flex items-center gap-2 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
              {personal.availability.message}
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-3xl">
              <h1
                id="hero-heading"
                className="hero-st hero-st-2 font-serif text-[clamp(2.4rem,1.5rem+4.6vw,4.75rem)] font-bold leading-[1.02] text-foreground"
              >
                {headline}
                {hasShip && (
                  <>
                    {' '}
                    <em className="font-medium italic text-primary">ship.</em>
                  </>
                )}
              </h1>

              <p className="hero-st hero-st-3 mt-6 max-w-xl text-base leading-7 text-muted-foreground">
                {personal.summary}
              </p>

              <div className="hero-st hero-st-4 mt-9 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.2} className="inline-flex">
                  <Button asChild size="lg">
                    <a href="#projects">
                      View work
                      <ArrowDown className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </Magnetic>
                <Button asChild variant="outline" size="lg">
                  <a href="#contact">Contact</a>
                </Button>

                <span className="mx-1 hidden h-6 w-px bg-border sm:block" aria-hidden="true" />

                <div className="flex items-center gap-1">
                  {github && (
                    <Button asChild variant="ghost" size="icon" aria-label="GitHub profile">
                      <a href={github.href} target="_blank" rel="noopener noreferrer">
                        <FaGithub className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                  {linkedin && (
                    <Button asChild variant="ghost" size="icon" aria-label="LinkedIn profile">
                      <a href={linkedin.href} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </Button>
                  )}
                  <Button asChild variant="ghost" size="icon" aria-label={`Email ${personal.name}`}>
                    <a href={`mailto:${personal.email}`}>
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="hero-st hero-st-5 lg:justify-self-end">
              <HeroImage />
            </div>
          </div>
        </div>

        <div className="section-shell relative z-10">
          <dl className="hero-st hero-st-6 grid grid-cols-2 gap-y-5 border-t border-border py-6 md:grid-cols-4 md:gap-y-0">
            {proofPoints.map((point, index) => (
              <div
                key={point.value}
                className={`pr-5 md:border-l md:border-border md:px-5 ${index === 0 ? 'md:border-l-0 md:pl-0' : ''} ${index === 3 ? 'md:pr-0' : ''}`}
              >
                <dt className="font-serif text-[0.95rem] font-bold leading-snug text-foreground">
                  {point.value}
                </dt>
                <dd className="mt-1.5 text-[0.8rem] leading-5 text-muted-foreground">{point.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
