# Trackbill case study — content brief

> **Status (2026-09-10):** answered by a read-only investigation of the three
> repositories; the case study now lives in `data/caseStudies.ts` and renders at
> `/work/trackbill`. Still open before it is published: written permission from
> Inertia (the client code is marked proprietary and the repositories carry no
> disclosure policy), and whether to publish the verified 42 merged PRs or the
> ~52 that local history shows. Everything else in this brief is resolved.

The Work plate only gives a project the full "selected" treatment (browser frame,
metrics rail, case-study page) when a complete case study exists in
`data/caseStudies.ts`. The content-parity tests enforce that, so nothing below
can be invented or stubbed. This brief lists what the site already knows from
the CV, what is still needed, and the exact shape it will be written into.

## What the site can already say (from the CV, no input needed)

- Role: Contract Full-Stack Product Engineer · Inertia · Jul – Sep 2026 · Remote
- Surface: Node/Express/Prisma services, Next.js/React web app, Expo/React Native
  mobile apps (Android and iOS), OpenAPI contracts
- Delivered slices: API-key security lifecycle; unified incoming-receipt routing
  across backend, web and native (shared preferences, explicit-folder routing,
  transactional folder-resolution locking, rollback, localization, tests);
  receipt and admin workflow improvements (inline receipt editing, bulk category
  updates, duplicate-scan semantics, last-upload sorting, debounced folder
  search, user-list pagination, MRR reporting, direct seat editing)
- Figures: 42 merged author-filtered PRs; 3 production codebases; test changes
  across server, client and mobile layers

## What is needed from you

### 1. Permission and naming (blocking)
- [ ] May the company (Inertia) and product (Trackbill) be named publicly? (They
      already appear on the CV and in Experience; confirm the case study may go
      deeper.)
- [ ] Is there an NDA or client clause that limits screenshots, metrics, or
      architecture detail? List anything that must stay out.
- [ ] Public product URL, if one exists (marketing site or app store listing).
      Nothing will be linked until you confirm the exact URL.

### 2. The product in two sentences
- [ ] What Trackbill is, for whom (e.g. "expense tracking for small teams who
      forward receipts by email"), and how a receipt gets in (email forwarding,
      scan, upload).
- [ ] Which platforms shipped: web app, iOS, Android. Store links if public.

### 3. Your part (the "brief" and "delivery" sections)
- [ ] Team shape: how many engineers, who owned product/design, how work was
      assigned to you (tickets, slices, features end-to-end).
- [ ] The three codebases by name and stack, e.g. `server` (Express + Prisma +
      PostgreSQL?), `client` (Next.js version?), `mobile` (Expo SDK version,
      React Native version).
- [ ] Database: PostgreSQL? Hosted where? Migration tooling (Prisma Migrate)?
- [ ] How the OpenAPI contract is produced and consumed (hand-written spec,
      generated from code, generated clients for web/mobile?).

### 4. The two deep sections (one paragraph plus 3 bullets each)
- [ ] API-key security lifecycle: what problem it solved, how keys are created,
      stored (hashing?), rotated, revoked, redacted in logs/errors, and what the
      settings UX looks like. Any rate limiting or scoping per key?
- [ ] Unified receipt routing: what "explicit-folder routing" means to a user,
      why folder resolution needed a transactional lock, what rolls back on
      failure, and how web and native share the same preferences.

### 5. Quality section
- [ ] Test stack per layer (Jest? Supertest? React Testing Library? Detox or
      Maestro for mobile?) and roughly how many tests you added or changed.
- [ ] CI: GitHub Actions? EAS builds? Anything about release cadence.

### 6. Outcome and metrics (3 to 6 pairs for the metrics rail)
Already available: 42 merged PRs · 3 codebases. Candidates to confirm:
- [ ] Number of API endpoints or routes touched
- [ ] Number of screens or mobile features shipped
- [ ] Locales supported by the localized routing work
- [ ] Any before/after figure (duplicate scans reduced, admin task time, MRR
      reporting delivered to N accounts) — only if measured

### 7. Visual for the Work plate (pick one)
- [ ] Real screenshots (web and mobile) you are allowed to publish, or
- [ ] Permission to represent it as an honest abstract illustration (like the
      OKRa board): a phone and a browser frame showing a receipt inbox, folder
      routing and an API-key settings panel. For that I need the rough screen
      structure: what the receipt inbox lists, what a folder looks like, what
      the API-key settings panel contains.

## Where it lands

`data/caseStudies.ts` — one `CaseStudy` object:

```ts
{
  projectId: 'trackbill',
  title: 'Trackbill — …',
  client: 'Inertia',
  role: 'Contract Full-Stack Product Engineer',
  period: 'Jul 2026 – Sep 2026',
  liveUrl: '…',                       // only if confirmed
  summary: '…',                       // one paragraph, ~230 characters like OKRa
  metrics: [{ value: '42', label: 'Merged PRs across API, web, and mobile' }, …],
  stack: ['Node.js', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'Next.js', 'Expo', 'React Native', 'OpenAPI'],
  sections: [
    { heading: 'The brief', body: '…' },
    { heading: 'Three codebases, one slice at a time', body: '…', bullets: […] },
    { heading: 'API-key security lifecycle', body: '…', bullets: […] },
    { heading: 'Receipt routing across web and native', body: '…', bullets: […] },
    { heading: 'Quality across server, client, and mobile', body: '…', bullets: […] },
    { heading: 'Outcome', body: '…' },
  ],
}
```

Then: `caseStudyPath: '/work/trackbill'` on the project in `data/portfolio.ts`,
a route at `app/work/trackbill/page.tsx` (copy of `app/work/okra/page.tsx`),
the sitemap entry, and the parity test's selected-work list updated to
`['trackbill', 'reisky', 'okra']`.
