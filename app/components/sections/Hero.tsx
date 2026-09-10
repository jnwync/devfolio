import { ArrowDown, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import HeroImage from '../HeroImage';
import Wordmark from '../Wordmark';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';

/**
 * The opening view of the world. Above the horizon: the eyebrow with the
 * three facts a remote recruiter scans first, the masthead sitting on the
 * water line (its period is where the sun or moon starts), and the
 * portrait in the sky. Below the horizon, on the water: the positioning
 * statement, summary and calls to action. The proof line closes the hero.
 *
 * Positions are CSS only, so the layout is identical without JavaScript;
 * the scroll scene in motion/scenes/hero.ts only adds transforms.
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
    <section id="about" data-scene="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero-sky section-shell">
        <div className="hero-st hero-st-1 hero-eyebrow">
          <p className="mono-meta text-foreground">
            {personal.name}
            <span className="text-muted-foreground"> · Remote web + mobile · {personal.location} · {personal.timezone}</span>
          </p>
          <p className="avail-line">
            <span className="dot" aria-hidden="true" />
            {personal.availability.message}
          </p>
        </div>

        <div className="hero-st hero-st-2 hero-portrait" data-portrait>
          <HeroImage />
        </div>

        <p className="hero-mast" data-masthead>
          <Wordmark />
        </p>
      </div>

      <div className="hero-water section-shell" data-hero-water>
        <h1
          id="hero-heading"
          className="hero-st hero-st-3 wdth-scrub max-w-4xl font-serif text-[clamp(2rem,1.1rem+3.4vw,3.75rem)] font-bold leading-[1.02] text-foreground"
        >
          {headline}
          {hasShip && (
            <>
              {' '}
              <em className="font-medium italic text-primary">ship.</em>
            </>
          )}
        </h1>

        <p className="hero-st hero-st-4 mt-6 max-w-xl text-base leading-7 text-foreground/95">
          {personal.summary}
        </p>

        <div className="hero-st hero-st-5 mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href="#projects">
              View work
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
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

        <ul className="proof-line hero-st hero-st-6 mt-12" role="list" aria-label="Proof points">
          {proofPoints.map((point) => (
            <li key={point.value}>
              <b>{point.value}</b>
              <span>{point.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
