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
  liveUrl: 'https://reisky.vercel.app',
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

// Figures below come from a read-only investigation of the three repositories
// (local git history, 2026-09-10). 42 merged PRs is the verified 2026-08-30
// GitHub snapshot; local history now shows more, but only the verified number
// is published. No ticket IDs, internal names, endpoint paths, or production
// metrics: none of those are cleared for publication.
export const trackbillCaseStudy: CaseStudy = {
  projectId: 'trackbill',
  title: 'Trackbill — Receipts, Security, and Reporting across Web and Mobile',
  client: 'Inertia · Remote contract',
  role: 'Contract Full-Stack Product Engineer',
  period: 'Jul 2026 – Sep 2026',
  liveUrl: 'https://trackbill.ai',
  summary:
    'Contract product engineering for Trackbill, an AI-powered receipt and expense platform: an API-key security lifecycle, unified receipt routing across backend, web and native, and workflow improvements across three production codebases.',
  metrics: [
    { value: '42', label: 'Sole-authored merged pull requests across the API, dashboard, and mobile app in about six weeks' },
    { value: '38', label: 'Tickets delivered end-to-end, from schema and routes to web and native UI' },
    { value: '66', label: 'Test files authored: Jest and Supertest on the server, React Testing Library on the web, contract tests on mobile' },
    { value: '3', label: 'Production codebases: Express/Prisma API, Next.js dashboard, Expo mobile app' },
    { value: '15', label: 'Locales shipped with the unified-inbox setting, each covered by a locale-completeness test' },
    { value: '350', label: 'Files touched across the three repositories, excluding lockfiles and generated output' },
  ],
  stack: [
    'Node.js',
    'Express 4',
    'Prisma 5',
    'MySQL',
    'TypeScript',
    'Zod',
    'Next.js 15',
    'React 19',
    'TanStack Query',
    'Expo SDK 57',
    'React Native',
    'Jest',
    'Supertest',
    'React Testing Library',
    'GitHub Actions',
    'EAS',
    'Google Cloud Run',
  ],
  sections: [
    {
      heading: 'The brief',
      body: 'Trackbill is an AI-powered expense and receipt platform for small businesses in Asia-Pacific. Receipts arrive through WhatsApp, LINE, forwarded email, Gmail import, a web dashboard, a mobile app, and a public API; the AI classifies each one, and the records flow into approvals, folders, reports, and accounting sync. I joined Inertia on a six-week remote contract to ship product slices end-to-end across the three codebases: the Express and Prisma API, the Next.js dashboard, and the Expo mobile app. Work arrived as tickets, and each one was owned from schema to screen, tests included, in sole-authored pull requests reviewed by the team.',
    },
    {
      heading: 'Three codebases, one slice at a time',
      body: 'The API mounts one protected router behind two front doors: first-party web and mobile clients authenticate with a Firebase ID token, third parties with an API key. Because the mobile app behaves like the web client, most mobile features needed little new backend, and a typical ticket touched the Prisma schema and migrations, Express controllers and routes, the Zod response schemas, the dashboard, and the Expo screens in one pass.',
      bullets: [
        'Mobile: trash and restore with swipe-to-delete, receipt thumbnails, sign-in polish and legal links, a development-environment badge, invite-link onboarding over universal links, Export Center parity with the web, a reproducible local iOS build with local signing, and the App Store icon.',
        'Web: inline receipt editing, bulk category updates, bulk approvals with partial-failure handling, clearer duplicate-receipt results, debounced folder search and sorting by last upload, paginated user lists, inline seat editing, persisted report exports, a request-timeout policy, analytics tracking, and MRR reporting for the admin console.',
        'Server: changes to existing endpoints across twelve route modules, plus new routes for API keys and phone linking, each with Supertest coverage.',
      ],
    },
    {
      heading: 'API-key security lifecycle',
      body: 'Third-party integrations authenticate with API keys, and those keys had been stored in plaintext. I replaced that with a lifecycle in which the secret is 256 bits of randomness, shown exactly once at creation, and stored only as a SHA-256 hash with its last four characters kept for display.',
      bullets: [
        'Legacy keys migrate themselves: when a hash lookup misses, the server checks the legacy column, writes the hash, and clears the plaintext in place, so every existing integration kept working with no forced re-issue and no downtime.',
        'Redaction is a property of the type. The public API-key schema is a Zod transform that strips the secret and emits only a masked value, and every response passes through the same sanitiser, so a plaintext key cannot leak through a list or read response even from a not-yet-migrated row.',
        'Revocation is a soft delete that takes effect on the next request; each key records when it was last used; a per-user quota is enforced on both client and server; and the settings page gained create and revoke dialogs that clear the revealed secret from state as soon as it is copied.',
      ],
    },
    {
      heading: 'Routing receipts from many channels into one inbox',
      body: 'By default the product filed each receipt by the channel it came through, so one person’s receipts scattered across a WhatsApp folder, an app folder, and more. I shipped a per-user setting that routes WhatsApp, LINE, and mobile uploads into a single inbox, across all three codebases in one ticket.',
      bullets: [
        'Folder resolution is find-or-create, and the API runs on several Cloud Run instances at once, so two first uploads arriving together could both try to create the inbox and one would fail. Resolution now runs under a per-user MySQL named advisory lock held inside one interactive transaction, so the lock is released on the same connection that took it and one user never blocks another.',
        'Folder identity is a metadata key rather than a name, so renaming the inbox keeps routing intact and an existing folder with the default name is adopted instead of duplicated. A lock timeout fails before any credit is spent, a mid-transaction failure rolls back, and a failed classification refunds the OCR credit through an append-only ledger.',
        'Neither client implements routing logic: the dashboard sends the folder in view, the app asks the API for its default folder, and the preference lives in one server-side column, so flipping it on the web changes the next mobile upload with no app release. The setting shipped in all fifteen locales with tests asserting every language carries the strings.',
      ],
    },
    {
      heading: 'Quality across server, web, and mobile',
      body: 'Every slice shipped with tests in the layer it touched, and the routing work in particular is covered around its failure modes.',
      bullets: [
        'Server: Jest with Supertest at the route level, including tests that the advisory lock is released when resolution fails and that no folder is resolved when the lock cannot be acquired.',
        'Web: Jest with React Testing Library, including an optimistic-UI test that the routing toggle reverts to its stored value and reports an error when the save is rejected.',
        'Mobile: contract tests on Node’s built-in test runner against the API’s response shapes, catching client and server drift without a device farm. Continuous integration runs lint, type-check, tests, and an Expo prebuild for both platforms on every pull request.',
      ],
    },
    {
      heading: 'Outcome',
      body: 'Over about six weeks the engagement produced 42 sole-authored merged pull requests across the API, dashboard, and mobile app, 38 tickets delivered end-to-end, and 66 new test files. The API-key migration removed plaintext secrets from the database without disrupting existing integrations, and the unified inbox replaced per-channel folder scatter for people who capture receipts from their phone.',
    },
  ],
};

export const caseStudies: Record<string, CaseStudy> = {
  trackbill: trackbillCaseStudy,
  reisky: reiskyCaseStudy,
  okra: okraCaseStudy,
};

export const getCaseStudy = (projectId: string): CaseStudy | undefined =>
  caseStudies[projectId];
