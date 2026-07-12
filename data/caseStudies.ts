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
  client: 'Reisky Martial Arts · Surrey, BC, Canada',
  role: 'Freelance Full-Stack Developer',
  period: 'Jan 2026 – Apr 2026',
  summary:
    'A production website and headless-CMS platform for a Filipino martial arts studio, designed and built end-to-end as an international freelance client project in Surrey, BC, Canada.',
  metrics: [
    { value: '100', label: 'Lighthouse Accessibility — all 12 routes, mobile + desktop' },
    { value: '50', label: 'Sanity schema types connected to TypeGen' },
    { value: '55', label: 'Automated tests in the project suite' },
    { value: '~34K', label: 'Lines of strict-mode TypeScript' },
    { value: '74', label: 'React components' },
    { value: '6', label: 'API route handlers' },
  ],
  stack: [
    'Next.js 16',
    'React 19',
    'TypeScript (strict)',
    'Sanity CMS',
    'GROQ',
    'TypeGen',
  ],
  sections: [
    {
      heading: 'The brief',
      body: 'Reisky Martial Arts was an international freelance client project for a Filipino martial arts studio in Surrey, BC, Canada. The work was a production website and headless-CMS platform built end-to-end in strict-mode TypeScript on Next.js 16 and React 19.',
    },
    {
      heading: 'Architecture — an env-switched dual data source',
      body: 'The platform uses 12 service-layer modules that route at runtime between Sanity CMS (GROQ) and static fallback data behind a single feature flag. That keeps the CMS path and fallback path aligned behind one application contract.',
      bullets: [
        '12 service-layer modules route between Sanity CMS (GROQ) and static fallback data.',
        'A single feature flag controls the active data source.',
        'The architecture supports a tested CMS pipeline without rewriting the site around a different data shape.',
      ],
    },
    {
      heading: 'Type-safe content pipeline',
      body: 'The content pipeline connects 50 Sanity schema types to TypeGen and then to 12 unit-tested anti-corruption mappers that produce domain types for the application.',
      bullets: [
        '50 Sanity schema types are represented in the CMS model.',
        'TypeGen supports the type-safe bridge between CMS content and application code.',
        '12 unit-tested anti-corruption mappers translate content into domain types.',
      ],
    },
    {
      heading: 'Build scope',
      body: 'The production build covered a sizeable application surface for a freelance client project.',
      bullets: [
        '~34K LOC in strict-mode TypeScript.',
        '23 routes and 74 React components.',
        '6 API route handlers.',
      ],
    },
    {
      heading: 'Quality and accessibility',
      body: 'The project established a 55-test suite and reached strong Lighthouse results across every route.',
      bullets: [
        '55-test suite.',
        'Lighthouse Accessibility 100 across all 12 routes on mobile + desktop.',
        'Lighthouse Best Practices 96 and SEO 92.',
      ],
    },
    {
      heading: 'Outcome',
      body: 'The result is a production website and headless-CMS platform that demonstrates end-to-end delivery across frontend, API routes, CMS data modeling, typed content mapping, testing, accessibility, and deployment.',
    },
  ],
};

export const okraCaseStudy: CaseStudy = {
  projectId: 'okra',
  title: 'OKRa — Internal Work Tracking Platform',
  client: 'Mashup Technology Ventures Inc.',
  role: 'Software Engineering Intern / Full-Stack Developer (OJT)',
  period: 'May 2026 – Jul 2026',
  summary:
    'A department-first collaborative work-tracking platform built during a software engineering internship, connecting shared workspaces, workflow columns, tickets, permissions, attachments, realtime updates, and administrative oversight.',
  metrics: [
    { value: '32', label: 'Current route handlers across frontend and API workflows' },
    { value: '21', label: 'Database migrations supporting the platform data model' },
    { value: '83', label: 'Automated test files across API, database, auth, UI, accessibility, and E2E workflows' },
  ],
  stack: [
    'Next.js App Router',
    'React',
    'TypeScript',
    'PostgreSQL',
    'Drizzle ORM',
    'Zod',
    'Auth.js/NextAuth',
    'S3-compatible storage',
    'Server-Sent Events',
  ],
  sections: [
    {
      heading: 'The brief',
      body: 'OKRa is a department-first collaborative work-tracking platform for organizing workspaces, workflow columns, tickets, cross-department sharing, comments, labels, activity history, invitations, attachments, and administrative oversight.',
    },
    {
      heading: 'Full-stack delivery',
      body: 'The work connected reusable React workflows, Next.js route handlers, shared TypeScript/Zod contracts, and a PostgreSQL/Drizzle data model.',
      bullets: [
        '32 current route handlers across frontend and API workflows.',
        '21 database migrations supporting the platform data model.',
        'Shared validation contracts kept frontend and backend behavior aligned.',
      ],
    },
    {
      heading: 'Authentication and authorization',
      body: 'The platform required security-sensitive access control across users, workspaces, and administrative workflows.',
      bullets: [
        'Auth.js credential sessions with session versioning and route protection.',
        'Role- and workspace-scoped permissions for protected workflows.',
        'Password and invite flows, database-backed rate limiting, and administrative safeguards.',
      ],
    },
    {
      heading: 'Storage and realtime behavior',
      body: 'File handling and collaboration workflows were designed around failure-aware server behavior and timely board updates.',
      bullets: [
        'S3-compatible attachment and avatar storage with upload validation and per-kind size controls.',
        'Staged persistence, protected preview/download behavior, missing-object handling, and recovery states.',
        'Realtime board updates through Server-Sent Events and PostgreSQL LISTEN/NOTIFY.',
      ],
    },
    {
      heading: 'Quality and maintainability',
      body: 'The project established a broad automated test surface covering both application behavior and user-facing quality concerns.',
      bullets: [
        '83 automated test files across API routes, database behavior, shared schemas, authentication, responsive UI, accessibility, keyboard interaction, and end-to-end workflows.',
        'Clear monorepo boundaries separating the Next.js application, PostgreSQL/Drizzle database package, and shared TypeScript/Zod contracts.',
      ],
    },
    {
      heading: 'Outcome',
      body: 'The result is a production-oriented work platform demonstrating end-to-end engineering across product workflows, data modeling, security, file handling, realtime behavior, testing, and maintainable project boundaries.',
    },
  ],
};

export const caseStudies: Record<string, CaseStudy> = {
  reisky: reiskyCaseStudy,
  okra: okraCaseStudy,
};

export const getCaseStudy = (projectId: string): CaseStudy | undefined =>
  caseStudies[projectId];
