# Declutter pass — "everything here has a clear purpose"

Date: 2026-06-10
Goal: move the portfolio from "there is a lot on the screen" to "everything here has a
clear purpose." Reduce decorative noise and badge fatigue; strengthen hierarchy and
breathing room. Preserve all functionality, routing, and data.

## Audit (before)

Decorative tells repeated across the page:
1. Graph-paper grid background washing every section (`globals.css` body bg layers).
2. Repeated index-number motif: "01" watermark (Hero), "02" watermark (project cards),
   numbered labels (Evidence, Skills) — the same gimmick 4×.
3. Panel gradient overlays (`.premium-panel::before`) + rotated corner square
   (`.case-card::after`) on every card.
4. Hero "Production systems dossier" folio chip restating the headline.

Density / badge fatigue:
5. ~10 technologies repeated as badges in Hero, every project (8), every experience (7),
   every Skills card — 40+ pills total.
6. Experience impact metrics boxed in bordered cards inside each entry (cards-in-cards).
7. Two paragraphs per Skills card (summary + evidence); 9 generic coursework badges.

## Changes

- **globals.css**: removed grid background (kept one faint warm top wash); flattened
  `.premium-panel` (dropped gradient `::before`); deleted `.case-card`, `.case-index`,
  `.folio-tag` decorative classes.
- **Hero**: removed "01" watermark + folio chip; CTAs 3 → primary + outline + quiet
  "Download CV" text link; core-stack demoted from bordered pill box to a quiet inline row.
- **Evidence**: flattened, calmed hover, kept 4-col scan.
- **Projects**: removed watermark + corner square; capped tech badges to 5.
- **Experience**: de-boxed impact metrics into inline serif number + label; merged
  type/location into one quiet line; capped tech badges to 5.
- **Skills**: dropped the second (evidence) paragraph per card; capped badges to 5.
- **Education**: trimmed coursework to 5 most relevant.
- **Contact**: left as-is (already clean).

## Verification
- build / lint / typecheck
- before/after screenshots in `audit/`
