# Editorial Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio into an editorial engineer dossier that prioritizes outreach, strengthens selected-work evidence, and removes generic AI portfolio styling.

**Architecture:** Keep the existing one-page Next.js App Router structure and `data/portfolio.ts` content source. Extend the data contract for proof points, case-study fields, and capability groups, then recompose the existing sections around the approved funnel: hero, evidence band, selected work, experience, capabilities, education, and contact.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 CSS-first tokens, Framer Motion for restrained reveal animations, lucide-react icons, existing shadcn-style UI primitives.

---

## Implementation Status — ✅ COMPLETE (2026-06-10)

All eight tasks implemented, verified, and committed on `main`. The page now reads as an
editorial engineer dossier: warm OKLCH paper system, Libre Baskerville display + Source Sans 3
body, masthead hero, evidence register, case-study work blocks, dossier experience timeline,
grouped capability map, and a confident contact close. No AI-slop tells remain.

**Verification evidence**

- `npx tsc --noEmit` → PASS.
- `npm run lint` → clean (0 problems).
- `npm run build` → PASS (4 static pages, compiled ~1.3s).
- Anti-pattern scan (gradient text, glow blobs, side-stripe borders, theme/cursor remnants) → no matches.
- Browser audit at 1440px and 390px: no horizontal overflow (docW === viewW at 390px); mobile
  menu opens/closes via button and Escape (`aria-expanded` toggles, menu unmounts); nav links
  show the 2px focus-visible outline and buttons the shadcn focus ring; portrait and `/cv.pdf`
  assets resolve.

**Commits**

- `style: establish editorial visual system` (Task 2, pre-session)
- `feat: add editorial portfolio content model` (Task 1, pre-session)
- `refactor: simplify navigation and shared UI` (Task 3)
- `feat: build editorial hero dossier and evidence band` (Task 4)
- `feat: present projects as case studies` (Task 5)
- `feat: restructure experience and capabilities` (Task 6)
- `feat: add editorial contact close` (Task 7)
- `polish: fix hero portrait cached-image load and simplify` (Task 8)
- `perf: optimize hero portrait to served webp via next/image` (follow-up)

**Follow-up: `/impeccable audit` (score 19→20/20)**

A code-level audit scored the build 19/20 (Excellent). Fixes applied (`a11y: fix accent
contrast and respect reduced-motion`):

- **[P1] Contrast** — accent label text measured 4.18–4.39:1 (below AA 4.5). `--accent`
  darkened to `oklch(0.55 0.125 48)` → 4.73:1 on background, 4.97:1 on card. Verified with an
  OKLCH→sRGB WCAG contrast script.
- **[P2] Reduced motion** — the global CSS `prefers-reduced-motion` rule only neutralizes CSS
  animations, not Framer Motion's JS transforms. Wrapped the tree in
  `<MotionConfig reducedMotion="user">` so all scroll reveals drop their translation when the
  user opts out.
- **[P3]** Removed `animate-bounce` from the hero scroll arrow; gave the (future) experience
  "Visit" link a 44px touch target; deleted the unused `--accent-rgb` token.

The mobile-menu `height:auto` animation (flagged P2) was intentionally **kept** — its
`AnimatePresence` unmount keeps closed links out of the tab order, which outweighs the minor
layout-animation cost a grid-rows refactor would trade for.

**Follow-up: `/impeccable critique` (design review, 37/40 Excellent)**

A UX design-director critique passed the anti-pattern verdict and scored 37/40 on Nielsen's
heuristics. Fixes applied (`design: tighten hero fold, sharpen copy, trim experience density`):

- **[P2] Hero fold** — the 7xl `text-balance` headline set in a narrow 1.12fr column wrapped to
  ~5 lines and pushed the primary CTA below the fold on a 13–14" laptop. Replaced with a fluid
  `clamp(2.25rem, 1.3rem + 3.2vw, 3.4rem)` headline in a wider `1.3fr` text column (3 lines), plus
  tighter section padding. Verified at 1366×768: name, all three CTAs, core-stack, and portrait
  all clear the fold.
- **[P3] CV emphasis** — hero "Download CV" promoted ghost → outline (recruiters reach for it).
- **[P3] Copy** — positioning sharpened from "…that have to work for real users" to
  "…production web systems people rely on" (removes filler, shorter → helps the fold).
- **[P3] Density** — experience trimmed to the 2 strongest bullets per role.
- **Minor** — evidence proof #2 reframed ("Next.js + TypeScript" → "Frontend to deployment") so it
  no longer echoes the hero's core-stack strip.

**Follow-up: hero image optimization**

The portrait was a 1.1MB SVG that actually wrapped a base64 raster (no real vector benefit). It is
now a 70KB 4:5 WebP generated from the source photo with `sharp` and served through `next/image`
(`priority`, responsive `sizes`), with `images.formats: ["image/avif", "image/webp"]` enabled in
`next.config.ts` so clients negotiate the smallest format. The redundant 1.1MB SVG and 1.6MB source
PNG were removed from the working tree (recoverable from git history). Served portrait weight
dropped ~94%.

**Impeccable refinements (intentional deviations from the literal plan snippets)**

1. **HeroImage** was simplified to a stateless **server component** that renders the local SVG
   portrait directly over a `bg-muted` placeholder. The plan's `isLoaded` skeleton left the
   portrait blank: the SVG is cached/`complete` before React attaches `onLoad`, so the handler
   never fires. Removing the state machine fixed the bug and reduced client JS.
2. **Brand icons** use `react-icons` (`FaGithub`, `FaLinkedin`) in Projects and Contacts instead
   of lucide's deprecated `Github`/`Linkedin` exports. lucide is kept for UI glyphs (Mail,
   ExternalLink, Copy, Check, FileDown, Phone, ArrowUpRight, Menu, X).
3. **Hero** shows a compact "Core stack" strip from `featuredSkills` rather than duplicating
   `proofPoints` chips — the proof points already render in the `EvidenceBand` directly below,
   so repeating them would violate the "don't restate information" rule.
4. **EvidenceBand** and **Skills** cards carry editorial index numerals (`01`–`04`) for a dossier
   register feel, replacing the generic big-number metric template.
5. Hero / Projects / Experience / Skills reveal animations guard `prefers-reduced-motion` via
   `useReducedMotion`, in addition to the global reduced-motion CSS.
6. Canonical Tailwind v4 class syntax adopted where flagged (`aspect-4/5`, `shadow-(--shadow-soft)`).
7. The mobile nav menu includes the primary "Start a conversation" CTA so the conversion path
   is reachable on small screens.

---

## Source Spec

- `docs/superpowers/specs/2026-06-10-editorial-portfolio-redesign-design.md`

## Scope Check

This is one focused subsystem: a single-page portfolio redesign. It does not require a CMS, backend service, authentication, external data dependency, or routing expansion.

## File Structure

- Modify `data/portfolio.ts`: add editorial data fields while preserving existing factual claims and utility exports.
- Modify `app/layout.tsx`: replace Geist with editorial Google font variables, simplify the root shell, update metadata, remove theme boot script.
- Modify `app/globals.css`: replace purple/dark token system with warm OKLCH editorial tokens, type tokens, spacing helpers, reduced-motion rules, and paper-like base styling.
- Modify `components/ui/button.tsx`: sharpen button radius, hierarchy, and focus states.
- Modify `components/ui/badge.tsx`: convert badges into quiet editorial labels.
- Modify `components/ui/card.tsx`: reduce generic card styling and keep cards as simple framed surfaces.
- Modify `app/components/Navigation.tsx`: remove theme toggle, keep active section tracking, use clearer nav labels and a contact action.
- Modify `app/components/ScrollProgress.tsx`: keep as a slim editorial reading progress indicator.
- Delete `app/components/CursorSpotlight.tsx`: remove constant mouse-tracking decorative layer.
- Modify `app/components/HeroImage.tsx`: turn the circular glow portrait into a rectangular dossier portrait.
- Modify `app/components/sections/Hero.tsx`: rebuild as the Hero Dossier.
- Create `app/components/sections/EvidenceBand.tsx`: add the proof strip after the hero.
- Modify `app/page.tsx`: insert `EvidenceBand` after `Hero`.
- Modify `app/components/sections/Projects.tsx`: rebuild as selected case-study story blocks.
- Modify `app/components/sections/Experiences.tsx`: rebuild as compact career dossier timeline.
- Modify `app/components/sections/Skills.tsx`: rebuild as capability map.
- Modify `app/components/sections/Education.tsx`: restyle to match the editorial system.
- Modify `app/components/sections/Contacts.tsx`: rebuild as the conversion close.

## Implementation Tasks

### Task 1: Extend Portfolio Data Contract

**Files:**
- Modify: `data/portfolio.ts`

- [x] **Step 1: Run the baseline type check**

Run:

```bash
npx tsc --noEmit
```

Expected: PASS. If it fails before edits, record the existing error in the task notes and fix only errors caused by this task.

- [x] **Step 2: Replace the type definitions at the top of `data/portfolio.ts` with the editorial contract**

Use this shape while preserving all existing fields that downstream utilities still use:

```typescript
export interface ImpactItem {
  metric: string;
  description: string;
}

export interface ProofPoint {
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'contract' | 'freelance' | 'internship' | 'academic';
  period: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string;
  scope: string;
  achievements: string[];
  impact?: ImpactItem[];
  technologies: string[];
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  type: 'freelance' | 'personal' | 'academic';
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  context: string;
  responsibility: string;
  outcomes: string[];
  achievements: string[];
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  proficiency: number;
  yearsUsed: number;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export interface CapabilityGroup {
  title: string;
  summary: string;
  evidence: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  coursework: string[];
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  primary?: boolean;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  positioning: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  roles: string[];
  availability: {
    status: 'available' | 'employed' | 'unavailable';
    message: string;
  };
}

export interface PortfolioData {
  personal: PersonalInfo;
  proofPoints: ProofPoint[];
  experiences: Experience[];
  projects: Project[];
  featuredSkills: Skill[];
  skillCategories: SkillCategory[];
  capabilityGroups: CapabilityGroup[];
  education: Education;
  contactLinks: ContactLink[];
}
```

- [x] **Step 3: Add `positioning` and `summary` to `personal`**

Add these fields inside `portfolioData.personal`:

```typescript
positioning: 'Full-stack engineer for production web systems that have to work for real users.',
summary: 'I build responsive interfaces, API surfaces, and data workflows across government, healthcare, e-commerce, and marketplace products, with enough range to move from architecture through deployment.',
```

- [x] **Step 4: Add `proofPoints` after `personal`**

Add:

```typescript
proofPoints: [
  {
    value: '4 product domains',
    label: 'Government, healthcare, e-commerce, and marketplace platforms',
  },
  {
    value: 'Next.js + TypeScript',
    label: 'Frontend systems, API routes, data flows, and deployment',
  },
  {
    value: 'Production delivery',
    label: 'Architecture, implementation, QA, and launch support',
  },
  {
    value: 'Iloilo, Philippines',
    label: 'Available for remote, hybrid, contract, and full-time conversations',
  },
],
```

- [x] **Step 5: Add `scope` to each experience**

Use these values:

```typescript
// packup
scope: 'Owned product/order APIs, role-aware admin flows, Firestore data operations, uploads, and lifecycle notifications for a packaging marketplace.',

// baylo
scope: 'Built marketplace browsing, social feed interactions, cart behavior, and seller dashboard pieces for an MSME e-commerce platform.',

// apollo
scope: 'Led patient portal and hospital booking UI work while supporting backend refactors and database improvements in a two-developer team.',

// dti
scope: 'Built government-backed MSME mapping workflows, admin management, GeoJSON data delivery, and role-based API protection.',
```

- [x] **Step 6: Add `context`, `responsibility`, `outcomes`, and `featured` to each project**

Use these additions:

```typescript
// devfolio
context: 'A personal portfolio that needs to work as a recruiter scan, a technical proof surface, and a polished professional identity.',
responsibility: 'Designed and implemented the full app, including content architecture, typed portfolio data, theme tokens, accessibility affordances, and motion behavior.',
outcomes: [
  'Centralized the portfolio content into a typed data source so sections can change without component rewrites.',
  'Built a WCAG-minded one-page flow with skip navigation, section labels, reduced-motion handling, and semantic landmarks.',
  'Used Next.js 16, React 19, Tailwind v4, and Framer Motion to create a production-ready personal site.',
],
featured: false,

// reisky
context: 'A conversion-focused marketing site for a traditional Filipino martial arts school with many static content pages.',
responsibility: 'Delivered the static page system, component variants, performance work, SEO infrastructure, security headers, and monitoring setup.',
outcomes: [
  'Delivered 40 statically generated pages across programs, events, athlete profiles, scheduling, and pricing.',
  'Reached Lighthouse scores of 94 Performance, 96 Accessibility, 100 Best Practices, and 92 SEO.',
  'Generated all pages in under 600ms with Server Components, optimized images, and lazy-loading behavior.',
],
featured: true,
```

- [x] **Step 7: Add `capabilityGroups` after `skillCategories`**

Add:

```typescript
capabilityGroups: [
  {
    title: 'Frontend systems',
    summary: 'Responsive interfaces, component architecture, accessibility, and motion that supports the product instead of decorating it.',
    evidence: 'Built Next.js and React interfaces for marketplaces, patient booking, government dashboards, and static marketing systems.',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'shadcn/ui', 'Framer Motion'],
  },
  {
    title: 'Backend and APIs',
    summary: 'RESTful API routes, authentication checks, role-based access, service layers, and event-driven workflows.',
    evidence: 'Implemented product/order APIs, RBAC boundaries, lifecycle notifications, and CRUD flows across Firebase and PostgreSQL-backed products.',
    skills: ['Node.js', 'REST APIs', 'Firebase Admin SDK', 'JWT', 'OAuth 2.0', 'Express.js'],
  },
  {
    title: 'Data and cloud',
    summary: 'Relational and document data modeling, migrations, uploads, storage, serialization, and deployment workflows.',
    evidence: 'Worked with PostgreSQL, Supabase, Prisma, Firestore, Firebase Storage, Vercel, and production migration flows.',
    skills: ['PostgreSQL', 'Supabase', 'Prisma', 'Firestore', 'Firebase Storage', 'Vercel'],
  },
  {
    title: 'Delivery and quality',
    summary: 'End-to-end delivery from architecture through QA, with attention to accessibility, performance, SEO, and maintainability.',
    evidence: 'Contributed independently and in small agile teams across production, freelance, contract, and government-backed systems.',
    skills: ['WCAG 2.1', 'Core Web Vitals', 'Lighthouse', 'ESLint', 'GitHub Actions', 'Sentry'],
  },
],
```

- [x] **Step 8: Run the type check**

Run:

```bash
npx tsc --noEmit
```

Expected: PASS.

- [x] **Step 9: Commit**

```bash
git add data/portfolio.ts
git commit -m "feat: add editorial portfolio content model"
```

### Task 2: Replace Global Visual Tokens And Root Fonts

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [x] **Step 1: Update fonts and metadata in `app/layout.tsx`**

Replace Geist imports with:

```tsx
import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";
```

Use:

```tsx
const displayFont = Libre_Baskerville({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
```

Update metadata to:

```tsx
export const metadata: Metadata = {
  title: "Jon Wayne Cabusbusan | Full-Stack Engineer",
  description:
    "Full-stack engineer building production web systems across government, healthcare, e-commerce, and marketplace products with Next.js, TypeScript, APIs, databases, and cloud deployment.",
  keywords: [
    "Full-Stack Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Web Development",
    "Frontend",
    "Backend",
    "Iloilo Philippines",
  ],
  authors: [{ name: "Jon Wayne Cabusbusan" }],
  creator: "Jon Wayne Cabusbusan",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Jon Wayne Cabusbusan | Full-Stack Engineer",
    description:
      "Production web systems across government, healthcare, e-commerce, and marketplace products.",
    siteName: "Jon Wayne Cabusbusan Portfolio",
  },
};
```

Remove the inline theme boot script, `ThemeProvider`, and `CursorSpotlight` usage. Keep `ScrollProgress`.

Set the body class:

```tsx
className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
```

- [x] **Step 2: Replace `app/globals.css` with editorial tokens**

Use Tailwind v4 CSS-first tokens and keep shadcn-compatible color names:

```css
@import "tailwindcss";
@import "tw-animate-css";

:root {
  --background: oklch(0.975 0.018 78);
  --foreground: oklch(0.18 0.032 72);
  --card: oklch(0.993 0.01 78);
  --card-foreground: oklch(0.18 0.032 72);
  --popover: oklch(0.993 0.01 78);
  --popover-foreground: oklch(0.18 0.032 72);
  --primary: oklch(0.36 0.085 148);
  --primary-foreground: oklch(0.985 0.014 78);
  --secondary: oklch(0.925 0.035 82);
  --secondary-foreground: oklch(0.24 0.045 78);
  --muted: oklch(0.925 0.024 78);
  --muted-foreground: oklch(0.43 0.036 74);
  --accent: oklch(0.58 0.13 48);
  --accent-foreground: oklch(0.985 0.014 78);
  --accent-rgb: 168, 91, 39;
  --destructive: oklch(0.55 0.19 28);
  --destructive-foreground: oklch(0.985 0.014 78);
  --success: oklch(0.48 0.11 150);
  --success-foreground: oklch(0.985 0.014 78);
  --warning: oklch(0.68 0.13 72);
  --warning-foreground: oklch(0.18 0.032 72);
  --info: oklch(0.47 0.09 225);
  --info-foreground: oklch(0.985 0.014 78);
  --border: oklch(0.82 0.035 78);
  --input: oklch(0.955 0.018 78);
  --ring: oklch(0.46 0.11 148);
  --radius: 0.5rem;
  --shadow-soft: 0 18px 50px oklch(0.23 0.04 75 / 0.08);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
}

@theme inline {
  --font-sans: var(--font-body);
  --font-serif: var(--font-display);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 2px);
}
```

Keep this base layer:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-family: var(--font-body), sans-serif;
    background-image:
      linear-gradient(90deg, oklch(0.2 0.03 78 / 0.035) 1px, transparent 1px),
      linear-gradient(180deg, oklch(0.2 0.03 78 / 0.035) 1px, transparent 1px);
    background-size: 44px 44px;
  }

  h1,
  h2,
  h3 {
    font-family: var(--font-display), serif;
    letter-spacing: 0;
  }

  p,
  li,
  dd {
    @apply leading-relaxed;
  }

  :focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 3px;
  }

  ::selection {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }
}
```

Keep the `.sr-only` and `.focus\:not-sr-only:focus` utilities from the current file. Remove `.dark`, `.hero-image-container` radial gradients, animated stagger helpers, and theme transition rules.

Add:

```css
.section-shell {
  @apply mx-auto max-w-6xl px-5 sm:px-6 lg:px-8;
}

.section-kicker {
  @apply text-xs font-bold uppercase tracking-[0.16em] text-accent;
}

.editorial-rule {
  @apply border-t border-border;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [x] **Step 3: Run checks**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both PASS.

- [x] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "style: establish editorial visual system"
```

### Task 3: Sharpen Shared UI And Navigation

**Files:**
- Modify: `components/ui/button.tsx`
- Modify: `components/ui/badge.tsx`
- Modify: `components/ui/card.tsx`
- Modify: `app/components/Navigation.tsx`
- Modify: `app/components/ScrollProgress.tsx`
- Delete: `app/components/ThemeProvider.tsx`
- Delete: `app/components/CursorSpotlight.tsx`

- [x] **Step 1: Update `buttonVariants` in `components/ui/button.tsx`**

Use:

```tsx
const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold transition-[transform,background-color,border-color,color,opacity] duration-200 ease-[var(--ease-out-quart)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/92 active:translate-y-px",
        outline:
          "border border-border bg-background text-foreground hover:border-primary hover:text-primary active:translate-y-px",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:translate-y-px",
        ghost:
          "text-foreground hover:bg-secondary/70 hover:text-primary active:translate-y-px",
        link:
          "min-h-0 rounded-none px-0 py-0 text-primary underline-offset-4 hover:underline focus-visible:ring-0 focus-visible:underline",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-4 py-2 text-xs",
        lg: "min-h-12 px-6 py-3 text-base",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

- [x] **Step 2: Update `badgeVariants` in `components/ui/badge.tsx`**

Use:

```tsx
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] transition-[border-color,background-color,color] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default:
          "border-primary/25 bg-primary/8 text-primary [a&]:hover:border-primary/45",
        secondary:
          "border-border bg-secondary text-secondary-foreground [a&]:hover:border-primary/30",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive [a&]:hover:bg-destructive/15",
        outline:
          "border-border bg-background text-muted-foreground [a&]:hover:border-primary/40 [a&]:hover:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
```

- [x] **Step 3: Update `Card` in `components/ui/card.tsx`**

Change the root class to:

```tsx
"bg-card text-card-foreground flex flex-col gap-5 rounded-md border border-border shadow-none"
```

Change `CardHeader` to:

```tsx
"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-5 pt-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] sm:px-6 sm:pt-6 [.border-b]:pb-6"
```

Change `CardContent` to:

```tsx
"px-5 pb-5 sm:px-6 sm:pb-6"
```

Change `CardFooter` to:

```tsx
"flex items-center px-5 pb-5 sm:px-6 sm:pb-6 [.border-t]:pt-6"
```

- [x] **Step 4: Replace `app/components/Navigation.tsx` with a theme-free nav**

Use lucide icons instead of inline SVG:

```tsx
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

      <nav className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md" aria-label="Main navigation">
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
```

- [x] **Step 5: Update `ScrollProgress`**

Change the progress bar class to:

```tsx
className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-primary"
```

- [x] **Step 6: Delete unused effects and theme provider**

```bash
rm app/components/CursorSpotlight.tsx app/components/ThemeProvider.tsx
```

- [x] **Step 7: Run checks**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both PASS.

- [x] **Step 8: Commit**

```bash
git add components/ui/button.tsx components/ui/badge.tsx components/ui/card.tsx app/components/Navigation.tsx app/components/ScrollProgress.tsx app/layout.tsx app/components/CursorSpotlight.tsx app/components/ThemeProvider.tsx
git commit -m "refactor: simplify navigation and shared UI"
```

### Task 4: Build Hero Dossier And Evidence Band

**Files:**
- Modify: `app/components/HeroImage.tsx`
- Modify: `app/components/sections/Hero.tsx`
- Create: `app/components/sections/EvidenceBand.tsx`
- Modify: `app/page.tsx`

- [x] **Step 1: Replace `HeroImage` with an editorial portrait plate**

Use:

```tsx
'use client';

import { useState } from 'react';

export default function HeroImage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className="relative mx-auto w-full max-w-sm border border-border bg-card p-3 shadow-[var(--shadow-soft)] lg:mx-0">
      {!isLoaded && <div className="aspect-[4/5] animate-pulse bg-muted" aria-hidden="true" />}

      <div className={isLoaded ? 'block' : 'absolute inset-3 opacity-0'}>
        <img
          src="/images/hero/Cabusbusan-ID.svg"
          alt="Professional headshot of Jon Wayne Cabusbusan"
          width={520}
          height={650}
          className="aspect-[4/5] w-full object-cover object-top"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        <span>Iloilo, PH</span>
        <span>Full-stack web systems</span>
      </figcaption>
    </figure>
  );
}
```

- [x] **Step 2: Replace `Hero` with the dossier layout**

Use `Mail`, `BriefcaseBusiness`, `FileDown`, and `ArrowDown` from `lucide-react`. Read `personal`, `proofPoints`, and `featuredSkills` from `portfolioData`.

Structure:

```tsx
<section id="about" className="relative scroll-mt-20 overflow-hidden py-16 sm:py-20 lg:py-28" aria-labelledby="hero-heading">
  <div className="section-shell">
    <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
      <motion.div className="max-w-3xl space-y-8">...</motion.div>
      <motion.div> <HeroImage /> </motion.div>
    </div>
  </div>
</section>
```

Use this hero copy:

```tsx
<p className="section-kicker">{personal.availability.message}</p>
<h1 id="hero-heading" className="max-w-4xl text-balance font-serif text-5xl font-bold leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
  {personal.positioning}
</h1>
<p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
  {personal.summary}
</p>
```

CTA order:

```tsx
<Button asChild size="lg">
  <a href={`mailto:${personal.email}`}>
    <Mail className="h-5 w-5" aria-hidden="true" />
    Start a conversation
  </a>
</Button>
<Button asChild variant="outline" size="lg">
  <a href="#projects">
    <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
    View selected work
  </a>
</Button>
<Button asChild variant="ghost" size="lg">
  <a href="/cv.pdf" download>
    <FileDown className="h-5 w-5" aria-hidden="true" />
    Download CV
  </a>
</Button>
```

Render proof chips from `proofPoints.slice(0, 3)` and stack chips from `featuredSkills`.

- [x] **Step 3: Create `EvidenceBand.tsx`**

Use:

```tsx
import { portfolioData } from '@/data/portfolio';

export default function EvidenceBand() {
  return (
    <section className="editorial-rule bg-card/70" aria-label="Portfolio evidence">
      <div className="section-shell">
        <dl className="grid gap-0 divide-y divide-border border-x border-border bg-card md:grid-cols-4 md:divide-x md:divide-y-0">
          {portfolioData.proofPoints.map((point) => (
            <div key={point.value} className="p-5 sm:p-6">
              <dt className="font-serif text-xl font-bold text-foreground">{point.value}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted-foreground">{point.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

- [x] **Step 4: Insert the evidence band in `app/page.tsx`**

Add:

```tsx
import EvidenceBand from './components/sections/EvidenceBand';
```

Render:

```tsx
<Hero />
<EvidenceBand />
<Projects />
<ProfessionalExperience />
<Skills />
<Education />
<Contact />
```

- [x] **Step 5: Run checks**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both PASS.

- [x] **Step 6: Commit**

```bash
git add app/components/HeroImage.tsx app/components/sections/Hero.tsx app/components/sections/EvidenceBand.tsx app/page.tsx
git commit -m "feat: build editorial hero dossier"
```

### Task 5: Rebuild Selected Work As Case Studies

**Files:**
- Modify: `app/components/sections/Projects.tsx`

- [x] **Step 1: Replace the equal card grid with case-study blocks**

Use these imports:

```tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
```

Use these variants:

```tsx
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};
```

Use section heading:

```tsx
<header className="mb-14 grid gap-5 md:grid-cols-[0.42fr_0.58fr] md:items-end">
  <div>
    <p className="section-kicker">Selected work</p>
    <h2 id="projects-heading" className="mt-4 text-balance font-serif text-4xl font-bold leading-tight md:text-5xl">
      Case-study evidence, not just project tiles.
    </h2>
  </div>
  <p className="max-w-2xl text-base leading-7 text-muted-foreground md:justify-self-end">
    A compact record of systems I have designed, implemented, optimized, and shipped across freelance and personal work.
  </p>
</header>
```

Render each project with:

```tsx
<motion.article
  key={project.id}
  variants={itemVariants}
  className={`border border-border bg-card ${project.featured ? 'md:grid md:grid-cols-[0.95fr_1.05fr]' : ''}`}
>
  <div className="border-b border-border p-6 md:border-b-0 md:border-r md:p-8">
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant={project.featured ? 'default' : 'outline'}>{typeLabels[project.type]}</Badge>
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{project.period}</span>
    </div>
    <h3 className="mt-6 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
      {project.title}
    </h3>
    <p className="mt-5 text-base leading-7 text-muted-foreground">{project.context}</p>
  </div>

  <div className="space-y-6 p-6 md:p-8">
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Responsibility</p>
      <p className="mt-2 text-base leading-7 text-foreground/85">{project.responsibility}</p>
    </div>

    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Evidence</p>
      <ul className="mt-3 space-y-3" role="list">
        {project.outcomes.map((outcome) => (
          <li key={outcome} className="grid grid-cols-[1.25rem_1fr] gap-3 text-sm leading-6 text-muted-foreground">
            <span className="mt-2 h-px bg-primary" aria-hidden="true" />
            <span>{outcome}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-wrap gap-2">
      {project.technologies.map((tech) => (
        <Badge key={tech} variant="secondary">{tech}</Badge>
      ))}
    </div>

    <div className="flex flex-wrap gap-3 pt-2">
      {project.link && (
        <Button asChild variant="outline" size="sm">
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Visit site
          </a>
        </Button>
      )}
      {project.github && (
        <Button asChild variant="ghost" size="sm">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" aria-hidden="true" />
            Source
          </a>
        </Button>
      )}
    </div>
  </div>
</motion.article>
```

- [x] **Step 2: Run checks**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both PASS.

- [x] **Step 3: Commit**

```bash
git add app/components/sections/Projects.tsx
git commit -m "feat: present projects as case studies"
```

### Task 6: Rebuild Experience, Capabilities, And Education

**Files:**
- Modify: `app/components/sections/Experiences.tsx`
- Modify: `app/components/sections/Skills.tsx`
- Modify: `app/components/sections/Education.tsx`

- [x] **Step 1: Rebuild `Experiences.tsx` as a compact dossier timeline**

Keep Framer Motion and `Badge`. Render each experience as a two-column row:

```tsx
<article className="grid gap-5 border-t border-border py-8 md:grid-cols-[0.32fr_0.68fr]">
  <div>
    <time className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground" dateTime={`${exp.startDate}/${exp.endDate}`}>
      {exp.period}
    </time>
    <div className="mt-3 flex flex-wrap gap-2">
      <Badge variant="outline">{typeLabels[exp.type]}</Badge>
      {exp.location && <Badge variant="secondary">{exp.location}</Badge>}
    </div>
  </div>
  <div>
    <h3 className="font-serif text-2xl font-bold text-foreground">{exp.company}</h3>
    <p className="mt-1 text-sm font-bold text-primary">{exp.role}</p>
    <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{exp.scope}</p>
    <ul className="mt-5 grid gap-3" role="list">
      {exp.achievements.slice(0, 3).map((achievement) => (
        <li key={achievement} className="grid grid-cols-[1.25rem_1fr] gap-3 text-sm leading-6 text-foreground/80">
          <span className="mt-2 h-px bg-accent" aria-hidden="true" />
          <span>{achievement}</span>
        </li>
      ))}
    </ul>
    {exp.impact && (
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {exp.impact.map((item) => (
          <div key={`${item.metric}-${item.description}`} className="border border-border bg-secondary/50 p-4">
            <dt className="font-serif text-2xl font-bold text-foreground">{item.metric}</dt>
            <dd className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{item.description}</dd>
          </div>
        ))}
      </dl>
    )}
  </div>
</article>
```

- [x] **Step 2: Rebuild `Skills.tsx` as a capability map**

Use `portfolioData.capabilityGroups`. Render:

```tsx
<section id="skills" aria-labelledby="skills-heading" className="editorial-rule scroll-mt-20 py-20 md:py-28">
  <div className="section-shell">
    <header className="mb-14 max-w-3xl">
      <p className="section-kicker">Capabilities</p>
      <h2 id="skills-heading" className="mt-4 text-balance font-serif text-4xl font-bold leading-tight md:text-5xl">
        The stack, organized by the work it supports.
      </h2>
      <p className="mt-5 text-base leading-7 text-muted-foreground">
        Skills are grouped by delivery surface so readers can connect technology choices to product outcomes.
      </p>
    </header>
    <div className="grid gap-5 md:grid-cols-2">
      {portfolioData.capabilityGroups.map((group) => (
        <article key={group.title} className="border border-border bg-card p-6">
          <h3 className="font-serif text-2xl font-bold text-foreground">{group.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.summary}</p>
          <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-foreground/80">{group.evidence}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [x] **Step 3: Restyle `Education.tsx`**

Use the same `section-shell`, `section-kicker`, and border style. Keep the existing coursework filtering. Render the degree as a horizontal editorial block rather than a large card:

```tsx
<div className="grid gap-8 border border-border bg-card p-6 md:grid-cols-[0.42fr_0.58fr] md:p-8">
  <div>
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Academic foundation</p>
    <h3 className="mt-4 font-serif text-3xl font-bold text-foreground">{education.degree}</h3>
    <p className="mt-2 text-base font-bold text-primary">{education.institution}</p>
    <p className="mt-1 text-sm text-muted-foreground">Class of {education.year}</p>
  </div>
  <div>
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Relevant coursework</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {featuredCoursework.map((course) => (
        <Badge key={course} variant="outline">{course}</Badge>
      ))}
    </div>
  </div>
</div>
```

- [x] **Step 4: Run checks**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both PASS.

- [x] **Step 5: Commit**

```bash
git add app/components/sections/Experiences.tsx app/components/sections/Skills.tsx app/components/sections/Education.tsx
git commit -m "feat: restructure experience and capabilities"
```

### Task 7: Rebuild Contact Close

**Files:**
- Modify: `app/components/sections/Contacts.tsx`

- [x] **Step 1: Replace contact copy and layout**

Use lucide icons: `Copy`, `FileDown`, `Github`, `Linkedin`, `Mail`, `Phone`, `Check`.

Use this heading and copy:

```tsx
<p className="section-kicker">Contact</p>
<h2 id="contact-heading" className="mt-4 text-balance font-serif text-4xl font-bold leading-tight md:text-5xl">
  Start with the role, the product, or the problem.
</h2>
<p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
  I am open to full-time, contract, and project conversations where thoughtful full-stack execution matters.
</p>
```

Primary actions:

```tsx
<Button asChild size="lg">
  <a href={`mailto:${email}`}>
    <Mail className="h-5 w-5" aria-hidden="true" />
    Email Jon Wayne
  </a>
</Button>
<Button asChild variant="outline" size="lg">
  <a href="/cv.pdf" download>
    <FileDown className="h-5 w-5" aria-hidden="true" />
    Download CV
  </a>
</Button>
```

Keep the copy email action with `aria-live="polite"`:

```tsx
<Button
  onClick={handleCopyEmail}
  variant="ghost"
  size="lg"
  aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
>
  {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
  <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
</Button>
```

Render secondary links as text rows in a bordered list instead of icon cards.

- [x] **Step 2: Remove `console.error` from clipboard failure**

Replace the catch block with:

```tsx
} catch {
  setCopied(false);
}
```

- [x] **Step 3: Run checks**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both PASS.

- [x] **Step 4: Commit**

```bash
git add app/components/sections/Contacts.tsx
git commit -m "feat: add editorial contact close"
```

### Task 8: Browser Audit, Anti-Pattern Scan, And Polish

**Files:**
- Modify any file changed in Tasks 1-7 only when verification identifies an issue.

- [x] **Step 1: Run static checks**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Expected: all PASS.

- [x] **Step 2: Run anti-pattern searches**

```bash
rg -n "bg-clip-text|text-transparent|radial-gradient|blur-2xl|blur-3xl|from-accent/5|to-primary/5|border-l-[2-9]|border-r-[2-9]|CursorSpotlight|toggleTheme|ThemeProvider" app components data
```

Expected: no matches.

- [x] **Step 3: Run the Impeccable deterministic scan**

```bash
npx impeccable --json app components data
```

Expected: exit code 0 or exit code 2 with only findings that are reviewed and resolved in this task.

- [x] **Step 4: Start the app**

```bash
npm run dev
```

Expected: Next dev server starts and prints a local URL.

- [x] **Step 5: Inspect desktop in the in-app browser**

Open the local URL at a desktop viewport. Verify:

- First viewport shows name/positioning, availability, CTA hierarchy, and portrait without overlap.
- Evidence band is visible after the hero.
- Navigation anchors scroll to the correct sections.
- Focus outline is visible on nav links, buttons, and contact links.
- No text overflows buttons or bordered panels.
- No section uses gradient text, glow blobs, or generic neon effects.

- [x] **Step 6: Inspect mobile in the in-app browser**

Use a narrow viewport around 390px wide. Verify:

- Mobile nav opens and closes with the button and Escape key.
- Touch targets are at least 44px tall for nav, buttons, and contact actions.
- Hero CTAs stack cleanly.
- Project case-study blocks remain readable with no horizontal scroll.
- Capability cards stack cleanly.
- Contact actions remain visible and readable.

- [x] **Step 7: Stop the dev server**

Stop the running `npm run dev` process.

- [x] **Step 8: Commit polish fixes**

```bash
git add app components data
git commit -m "polish: verify editorial portfolio redesign"
```

## Completion Criteria

- `npx tsc --noEmit` passes.
- `npm run lint` passes.
- `npm run build` passes.
- Anti-pattern search returns no matches.
- Browser inspection passes for desktop and mobile.
- Final page matches the approved Dossier direction: editorial, recruiter-scannable, case-study-forward, and contact-led.
