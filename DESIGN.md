# DESIGN.md — SUBSONIC NOISE (90s Grunge Zine Aesthetic)

## 1. Visual Identity & Aesthetic Contract

- **Inspiration**: Early 1990s Seattle zines, xeroxed gig flyers, wheat-paste posters, and analog tape sleeves. Raw, tactile, anti-gloss, and assembled—never slick SaaS.
- **Color Tokens (`src/index.css` `@theme`)**:
  - `paper` (`#E9E1D4`) — Primary off-white newsprint canvas with subtle SVG xerox grain.
  - `paper-light` (`#F3EDE2`) — Elevated card, ticket, and callout box background.
  - `ink` (`#2E2E2E`) — Faded black primary ink, borders, and primary dark buttons (never `#000000`).
  - `dirty-yellow` (`#B5A642`) — Tilted stamp badges, primary-on-dark wordmark highlight, attention tags.
  - `muted-red` (`#8C2727`) — Squiggly nav underlines, offset frame shadows, left callout bars, secondary CTA fill.
  - `olive` (`#6B8E23`) — Live availability indicator dot and active status cues.
  - `concrete` (`#7A7A7A`) — Muted metadata, captions, and secondary labels.
  - `denim` (`#3B5998`) — Subtle secondary badge/link accent where needed.
  - `burnt-orange` (`#A84700`) — Warm secondary callout highlight.

## 2. Typography

- **Display (`font-display`)**: `Archivo Black` + condensed heavy uppercase tracking for `GARAGE / REVIVAL` hero impact and section titles.
- **Mono / Body (`font-mono`)**: `Space Mono`, `Courier New`, monospace — Weight 400/700 for body copy, rate sheets, metadata, and controls.
- **Marker (`font-marker`)**: `Permanent Marker` — Handwritten zine stamp labels (`LIVE TODAY!`, `TAPE ONLY`, `SOLD OUT`).
- **Tabular Numbers**: `font-variant-numeric: tabular-nums` enforced on all prices, session durations, studio hours, and time slots.

## 3. Zine Surface Treatments & Constraints

- **Duct Tape Strips (`.zine-tape`)**: Translucent grey-beige tape (`rgba(170, 166, 156, 0.72)`) rotated slightly over photo corners and section headers.
- **Offset Frames (`.zine-offset-frame`)**: Hard offset borders (`6px 6px 0 #8C2727` or `5px 5px 0 #2E2E2E`) with crisp `2px` ink borders.
- **Squiggly Underlines (`.zine-squiggle`)**: Muted red (`#8C2727`) wavy underline on nav links and key links.
- **Dashed Rules**: `2px dashed #2E2E2E` dividers separating navigation, rate sheet rows, and ticket stubs.
- **Photography**: Monochrome editorial contrast (`grayscale contrast-[1.18] brightness-[0.92]`) with inline SVG fallback on `onError`.
- **Anti-Patterns**: No emojis in UI (use `lucide-react`), no pure `#000000`, no 3-column equal-width grids (use asymmetric 2-col or staggered collage), no `h-screen` (use `min-h-[100dvh]` or `min-h-[82svh]`), no AI clichés ("Elevate", "Seamless", "Unleash", "Next-Gen").
