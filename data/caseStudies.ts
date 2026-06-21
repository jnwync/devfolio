// =============================================================================
// CASE STUDY DATA
// Long-form, typed case-study content rendered by dedicated /work/[id] routes.
// Kept out of portfolio.ts to keep that file lean. Every claim here is
// verified against the project codebase — no Performance score (needs a
// PageSpeed run on the deployed URL) and no traffic/conversion (not yet live).
// =============================================================================

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudySection {
  heading: string;
  body?: string;
  bullets?: string[];
  /** Optional monospace snippet rendered as a code block. */
  code?: string;
}

export interface CaseStudy {
  /** Matches Project.id in portfolio.ts. */
  projectId: string;
  title: string;
  client: string;
  role: string;
  period: string;
  liveUrl?: string;
  /** One-paragraph overview shown in the hero. */
  summary: string;
  metrics: CaseStudyMetric[];
  stack: string[];
  sections: CaseStudySection[];
}

export const reiskyCaseStudy: CaseStudy = {
  projectId: 'reisky',
  title: 'Reisky — Filipino Martial Arts Studio Platform',
  client: 'Reisky Martial Arts · Surrey, BC',
  role: 'Solo Developer (Freelance)',
  period: 'Jan 2026 – Mar 2026',
  liveUrl: 'https://reisky.vercel.app',
  summary:
    'A production website and headless-CMS platform for a Filipino martial arts studio, designed and engineered solo. Its defining decision is an env-switched dual data source: every service runs identically against a live Sanity CMS or static fallback data, so the site shipped immediately and adopts the CMS as a single feature flag — no rewrite, no big-bang cutover.',
  metrics: [
    { value: '100', label: 'Lighthouse Accessibility — all 12 routes, mobile + desktop' },
    { value: '50', label: 'Sanity schema types, fully typed end-to-end via TypeGen' },
    { value: '55', label: 'Automated tests — 44 Vitest unit + 11 Playwright E2E' },
    { value: '~34k', label: 'Lines of strict-mode TypeScript' },
    { value: '74', label: 'React components in a 4-tier hierarchy' },
    { value: '6', label: 'API route handlers, incl. a Stripe webhook + draft mode' },
  ],
  stack: [
    'Next.js 16',
    'React 19',
    'TypeScript (strict)',
    'Sanity CMS',
    'GROQ',
    'Tailwind CSS v4',
    'CVA',
    'Framer Motion',
    'Stripe',
    'Playwright',
    'Vitest',
    'Sentry',
    'Vercel',
  ],
  sections: [
    {
      heading: 'The brief',
      body: 'A real client engagement. The studio needed content it could edit itself, but the site had to launch before any CMS was provisioned — and the budget could not absorb a later rewrite to "add a CMS." I was the sole architect, designer, and developer, so the call on how to reconcile "ship now" with "editable later" was mine to make.',
    },
    {
      heading: 'Architecture — an env-switched dual data source',
      body: 'Rather than couple the launch to CMS readiness, I wrote every data-access service once and let it route at runtime. A single feature flag decides the source: a live Sanity CMS via typed GROQ, or static fallback data. The whole site runs identically either way, so the migration is a config change — the Strangler-Fig pattern applied to a CMS adoption with zero downtime risk and full type safety on both branches.',
      code: "// lib/api/* — written once, routes at runtime\nif (isSanityEnabled()) {\n  return mapEvents(await client.fetch(eventsQuery)); // live GROQ\n}\nreturn staticEvents; // typed fallback — same shape, same types",
      bullets: [
        'Type-safe pipeline end-to-end: Sanity schema → TypeGen → 1,547 LOC of generated types → 12 unit-tested mappers → hand-authored domain types.',
        'Mappers act as an anti-corruption layer: the CMS document shape is never allowed to leak into application code — domain types are the contract.',
        'A server/client boundary keeps next/headers-dependent live-query code server-only; client components receive data through a provider, avoiding a common App Router class of bug.',
      ],
    },
    {
      heading: 'Technical decisions & tradeoffs',
      body: 'Strangler-Fig over a big-bang cutover: the static site earns value on day one while the CMS is provisioned incrementally behind the flag, so launch and CMS readiness are decoupled. The cost is maintaining two data paths — paid down by writing the service layer once and type-checking both branches, so they cannot silently diverge.',
      bullets: [
        'Domain types as the contract, not the CMS shape — schema changes surface as type errors at the mapper boundary instead of runtime bugs in pages.',
        'An embedded Sanity Studio with live visual editing gives the client a real authoring experience, not just a read API.',
      ],
    },
    {
      heading: 'Challenges solved',
      body: 'Two problems worth calling out, both diagnosed and fixed.',
      bullets: [
        'Build-time failure: generateStaticParams reached a draftMode()-bound live fetcher, which has no request scope at build time. Fixed by switching build-time slug enumeration to a plain published client.fetch, unblocking the production CMS build.',
        'Accessibility remediation to a verified 100 site-wide: an audit surfaced real WCAG 2.1 AA regressions — color contrast, heading order, ARIA table semantics, Label-in-Name, and target size — each fixed and re-verified across all 12 routes on mobile and desktop (24/24).',
      ],
    },
    {
      heading: 'Design & frontend',
      body: 'I authored the brand and the design system, not just the implementation. A token-driven theme (color, type, spacing, motion) lives as CSS custom properties and is consumed through a CVA-based component library — a single source of truth across 74 components organized primitives → sections → layout → forms.',
      bullets: [
        'Centralized Framer Motion variants with prefers-reduced-motion honored on every animation — brand expression balanced against WCAG-conscious restraint.',
        'Server Components by default; "use client" scoped only to hooks, browser APIs, and motion, keeping the client bundle lean.',
      ],
    },
    {
      heading: 'Quality & workflow',
      body: 'Quality is enforced by tooling, not vigilance. A deliberate test pyramid — fast unit tests on the riskiest logic (the mappers) plus a thin E2E layer across four viewports — sits behind a zero-warning ESLint gate, strict TypeScript (no any), and Husky pre-commit hooks. The build itself was developed in an agentic, spec-driven workflow with automated tests and review as the quality gate.',
      bullets: [
        'Lighthouse Best Practices 96 and SEO 92, alongside the verified Accessibility 100.',
        'Production hardening: Sentry across client/server/edge runtimes, security headers, honeypot spam protection, and server-side validation on form routes.',
      ],
    },
    {
      heading: 'Outcome',
      body: 'A production-ready platform built solo, end-to-end — design system through data layer. The env-switched CMS integration is built and tested and is slated for production rollout; because every future content type plugs into the same service + mapper layer, the CMS is reusable infrastructure rather than a one-off. The capabilities above are what was built; business metrics will follow once the site is live.',
    },
  ],
};

export const caseStudies: Record<string, CaseStudy> = {
  reisky: reiskyCaseStudy,
};

export const getCaseStudy = (projectId: string): CaseStudy | undefined =>
  caseStudies[projectId];
