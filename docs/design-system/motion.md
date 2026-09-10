# The world and its motion

One place, two weathers, and the day passes as you scroll.

The whole home page sits in a single continuous scene: a horizon over water.
Dark is night — stars, a moonlit sea. Light is day — a warm sky, sunlit water.
The theme toggle does not swap a palette; it changes the time of day of the same
place, tweened over about half a second. Scrolling is the passage of hours: the
sun or moon starts as the period of the hero masthead, travels an arc to the
right, and has set into the horizon by the time you reach the contact bookend,
whose own period stays lit as a beacon on the water.

The page opens on the water and closes on the water. Only one opaque surface
interrupts it — the Work plate, which is dense enough to need a real sheet — and
it casts a shadow onto the water above its edge.

## The three bundles

| Tier | Loads for | Contents | Size (gz) |
| --- | --- | --- | --- |
| initial | everyone | page, intro markup, the frame store, capability gates | 200.4 KB |
| `motion` | JavaScript, motion tier `full` (phones included), after the intro | GSAP + ScrollTrigger, every scene, Lenis on fine pointers | 46.0 KB |
| `world` | the home page on a wide viewport with WebGL2, motion `full`, no data-saver | OGL subset, the sky/sea program | 22.0 KB |

Reduced-motion and no-JS visitors download neither lazy tier. Phones get
`initial + motion` = 246.3 KB, inside the 300 KB budget that
`tests/budget.test.mjs` enforces on every build.

## Capability gates

The boot script in `app/layout.tsx` resolves everything before first paint and
writes it onto `<html>`, so CSS can gate without waiting for hydration:

| Attribute | Meaning |
| --- | --- |
| `data-js` | JavaScript ran |
| `data-theme` | `light` / `dark`: stored choice → OS → dark |
| `data-motion` | `full` / `reduce`: stored choice → OS → full |
| `data-fine` | a fine pointer (Lenis, hover lights, ripples) |
| `data-wide` | ≥ 768px |
| `data-intro` | the intro is armed for this session |
| `data-world` | `gl` / `2d`, written once the world has picked a path |
| `data-motion-ready` | the scroll timeline is built |
| `data-stage-work` | the pinned work stage is on |

`data-motion` is the single switch for motion. The footer's **Reduce motion**
button stores a choice and reloads, because the boot script is what decides
whether the motion bundle loads at all. It is hidden when the operating system
already asks for reduced motion — that preference wins, and overriding it here
would leave the page half animated, since the CSS still honours the system
query.

Never put a flag on `<html>` whose attribute name also exists on an element:
`document.querySelector('[data-work-stage]')` finds `<html>` first. The stage
flag is `data-stage-work`; the element is `data-work-stage`.

## The frame store

`app/components/world/state.ts` is a plain mutable object, deliberately not
React state. GSAP tweens its numbers on scroll; the WebGL loop, the 2D orb and
the DOM-side effects read them. It has no dependencies, so the motion and world
bundles share it without pulling each other in — the world registers its
renderer through `frameHooks` rather than importing the ticker.

There is exactly one animation loop: `gsap.ticker`, in
`app/components/motion/ticker.ts`. Lenis, the scroll derivations and the world
renderer are all callbacks on it.

## Writing a scene

Scenes live in `app/components/motion/scenes/` and are built once from
`timeline.ts`. Two rules make them cheap and correct:

1. **Never read layout on the frame path.** Measure on ScrollTrigger's
   `refreshInit` and project from `world.scroll`. Every scene caches element
   bounds this way.
2. **Pinning is CSS `position: sticky`, never GSAP `pin`.** Native scrolling,
   find-in-page, keyboard and assistive tech stay untouched, and there are no
   spacer elements to get out of sync.

The DOM-side pattern is a custom property with a safe default: the scene writes
`--lit`, `--r`, `--u`, `--sub`, and the CSS reads `var(--lit, 0)`. Unset means
"already arrived", so no-JS and reduced-motion visitors get the finished page
with no extra rules.

Scenes: `hero` (the camera tilts to the water, the masthead sinks through it),
`stack` (fourteen tools surface as points of light), `work` (three beats in one
pinned window), `experience` (the axis follows the reading line), `activity`
(the calendar fills in), `contact` (the closing line rises, the beacon lights).
`masks.ts` scrubs every `[data-mask]` title through its own lower edge.

## Keeping text readable over a moving world

The sea and sky move, so contrast cannot be checked by reading two tokens off a
static design. Two limits in `world/shaders/skysea.ts` make it provable:

- `NIGHT_LUMINANCE_CAP` — at night nothing in the scene may exceed this
  luminance. Stars and the moon disc are added after it; everything else is
  scaled under it.
- `BEACON_NIGHT_GAIN` — the beacon is the one light added *after* the cap
  (clamped to the same ceiling as the water, it disappears), so its gain is
  bounded separately.

`tests/world-contrast.test.mjs` reads both numbers from the shader and the
colour tokens from `globals.css`, and asserts body text still clears AA against
the brightest thing the world can put behind it. Raise a limit or brighten a
world token and the test fails there, not in a screenshot someone happens to
look at. It has already caught one real regression.

## Performance

The renderer runs at 0.75 × min(DPR, 1.5). If the sixty-frame mean cost passes
20 ms it drops to 0.5 × and stops drawing ripples; it climbs back once frames
are comfortably cheap again. It pauses entirely when the tab is hidden and
halves its rate after a minute of no scrolling or pointer movement. A lost
WebGL context is rebuilt once; a second loss hands the page to the 2D world.

`window.__jnwync` exposes `{ world, lenis }` when the motion bundle is loaded.
It is a read hook for the screenshot and audit scripts, not an API.
