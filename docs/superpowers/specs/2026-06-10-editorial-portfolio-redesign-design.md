# Editorial Portfolio Redesign Design

## Context

This project is a one-page Next.js portfolio for Jon Wayne Cabusbusan. The current app is data-driven through `data/portfolio.ts` and composed from section components under `app/components/sections`. The redesign should improve the portfolio through a combined critique, audit, typography, color, layout, motion, responsive, copy, polish, and performance pass.

## Design Goal

Create a hybrid portfolio that works for recruiters, hiring managers, technical peers, and potential clients. The primary conversion is outreach for interviews or opportunities. Secondary conversions are reviewing selected work, downloading the CV, and starting a project inquiry.

The tone should be **editorial engineer**: premium, thoughtful, evidence-led, and human. It should feel like a compact engineering dossier in a serious magazine rather than a generic SaaS landing page or AI-styled developer portfolio.

## Direction

Use **The Dossier** as the base direction:

- Recruiter-friendly structure and fast scan value.
- Editorial hierarchy with strong proof blocks.
- Warm light visual system with refined contrast.
- Case-study depth from the Field Notes direction.
- Mobile clarity from the Systems Index direction.

Avoid generic AI design tells:

- No gradient text.
- No blurred neon mesh backgrounds.
- No decorative glow blobs.
- No generic equal-card grid for every content type.
- No hero metric template.
- No dark-mode-first cyber palette.
- No side accent stripes on cards or callouts.

## Funnel

1. **Hero**
   Lead with availability, identity, and a sharp positioning statement. The hero should make it clear that Jon Wayne is available for interviews or opportunities and can ship production full-stack web systems.

2. **Proof Strip**
   Immediately show the evidence a recruiter or hiring manager needs: production apps, core domains, primary stack, and delivery scope.

3. **Selected Work**
   Present projects as case-study-style story blocks. Each should make the problem, responsibility, technical surface, and evidence legible.

4. **Experience**
   Present experience as a compact career timeline. Emphasize role, scope, contribution, and impact rather than repeating project-card structure.

5. **Capabilities**
   Replace generic proficiency-bar energy with grouped capabilities: frontend systems, backend/API, database/cloud, and product delivery.

6. **Contact**
   Close with a confident outreach section. Primary action: start a conversation. Secondary actions: download CV, view GitHub/LinkedIn, or ask about project work.

## Page Modules

### Hero Dossier

The hero should include:

- Name.
- Availability status.
- One strong positioning line.
- Short supporting paragraph.
- Compact proof chips for stack/domains.
- CTA hierarchy:
  - Primary: start a conversation.
  - Secondary: view selected work.
  - Utility: download CV.

The current headshot may be reworked or removed if it does not support the editorial direction. If retained, it should feel integrated into the dossier, not like a generic circular profile image with glow.

### Evidence Band

Add a slim evidence band directly after the hero. It should answer "is this person relevant?" in seconds. Candidate entries:

- Production-grade applications.
- Government, e-commerce, healthcare, and marketplace experience.
- Next.js, TypeScript, React, REST APIs, databases, and cloud deployment.
- Independent ownership from architecture through deployment.

### Selected Work

Projects should become larger story blocks with varied hierarchy. The first or strongest project may receive extra visual weight. Each project should support:

- Project title.
- Project type and period.
- Context or problem.
- Responsibility or role.
- Outcome/evidence bullets.
- Technologies.
- Links to live project or source where available.

### Experience Timeline

Experience should read like a professional dossier:

- Role and company.
- Period and type.
- Short scope statement.
- Two to three contribution bullets.
- Technologies used.
- Links where relevant.

Avoid making experience visually identical to projects.

### Capability Map

Capabilities should be grouped by practical work type rather than percentages:

- Frontend systems.
- Backend and APIs.
- Databases and cloud.
- Product delivery and collaboration.

Individual skills can still show years of use where useful, but avoid arbitrary proficiency bars as the primary expression.

### Contact Close

The contact section should make outreach easy and confident:

- Primary email/contact action.
- CV download.
- GitHub and LinkedIn links.
- A path for freelance or project inquiry without competing with the hiring path.

The copy should be direct, specific, and warm.

## Visual System

### Theme

Use a light editorial default. A theme toggle can be removed or kept only if it remains polished, useful, and aligned with the redesign. If dark mode remains, it must be fully intentional and not the main visual crutch.

### Color

Use OKLCH-based tokens. Prefer warm, subtly tinted neutrals with one confident accent and one supporting color. Color should guide hierarchy and meaning rather than decorate everything.

Text must meet WCAG AA contrast. Avoid gray text on colored backgrounds; use shades/tints from the surface hue instead.

### Typography

Replace generic-feeling typography with a more editorial pairing. The type system should:

- Use a distinctive display face for key headings.
- Use a readable body face for longer content.
- Keep body text at readable sizes.
- Use strong hierarchy with fewer, clearer type steps.
- Keep comfortable line lengths.
- Use letter spacing only where it has a clear typographic role.

### Layout

Use a disciplined editorial grid:

- Left-led, asymmetric compositions where useful.
- Tight grouping for related information.
- Generous separation between major sections.
- Fewer card surfaces.
- Varied project layouts instead of repeated equal cards.
- Responsive reflow that keeps scan clarity on mobile.

### Motion

Motion should be quiet and purposeful:

- Entrance reveals for major sections.
- Subtle hover and focus feedback.
- Smooth anchor navigation.
- No constant decorative mouse-tracking background.
- No long-running animated blurred mesh.
- Respect `prefers-reduced-motion`.

### Interaction States

All links and buttons need visible hover, focus, active, and disabled/loading states where applicable. Focus indicators must remain clear and accessible.

## Copy Strategy

Use strong reframing while preserving facts. The copy may be reorganized and rewritten around outcomes, responsibility, and evidence. Do not invent claims, metrics, employers, products, or technologies.

The hero should avoid a long generic biography. The longer context can move into selected work, experience, or an "approach" style proof section.

Preferred copy qualities:

- Specific over vague.
- Outcome-led over task-list-heavy.
- Warm but not casual.
- Confident without hype.
- Consistent terminology across sections.

## Data Model

Keep `data/portfolio.ts` as the content source. Extend it only as needed for the approved page modules.

Likely additions:

- `personal.positioning`
- `personal.summary`
- `personal.proofPoints`
- Project fields for `context`, `responsibility`, and `outcomes`
- Experience fields for `scope` or refined contribution copy
- Capability groups that replace or supplement proficiency-oriented skill categories

Do not add a CMS or external data dependency.

## Technical Scope

Stay within the existing Next.js app.

Likely touched files:

- `data/portfolio.ts`
- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `app/components/sections/Hero.tsx`
- `app/components/sections/Projects.tsx`
- `app/components/sections/Experiences.tsx`
- `app/components/sections/Skills.tsx`
- `app/components/sections/Contacts.tsx`
- `app/components/HeroImage.tsx`
- `app/components/Navigation.tsx`
- `app/components/CursorSpotlight.tsx`
- `app/components/ScrollProgress.tsx`
- `components/ui/button.tsx`
- `components/ui/badge.tsx`
- `components/ui/card.tsx`

Remove or simplify effects that no longer serve the direction.

## Accessibility And Performance

The implementation should verify:

- Keyboard navigation works.
- Skip link remains available.
- Focus indicators are visible.
- Text contrast meets WCAG AA.
- Mobile touch targets are at least 44px where practical.
- Layout does not overflow at narrow widths.
- Images reserve stable dimensions.
- Motion respects reduced-motion preferences.
- Decorative animated layers are removed or lightweight.
- Build and lint pass.

## Acceptance Criteria

- The first viewport clearly communicates who Jon Wayne is, what he builds, and how to start a conversation.
- Visitors can scan relevance within seconds through the hero and evidence band.
- Projects read as selected evidence, not generic cards.
- Experience and skills support credibility without duplicating project structure.
- Contact has a clear primary action and secondary paths for CV and client inquiry.
- The visual design feels editorial, premium, and specific to this portfolio.
- The implementation avoids the identified AI design anti-patterns.
- The page works cleanly on mobile, tablet, and desktop.
- The final implementation passes lint/build and browser inspection.
