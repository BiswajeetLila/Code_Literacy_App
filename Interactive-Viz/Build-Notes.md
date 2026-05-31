# Build Notes — Interactive-Viz (Code Literacy V2)

The interactive layer for the curriculum. Holds the deployable web visualizations.
This first slice covers **Week 01: client & server as a restaurant**.

## What this is

A tiny **Vite + TypeScript + Three.js** site. One page (`index.html`) with **three tabbed
lessons** covering all of Week 01:
1. **Restaurant** — animated 3D request → response, plus the real `fetch()` code.
2. **Files & the front door** — clickable file-tree, "which runs first?" reveal, real
   `package.json` + `print` vs `return`.
3. **Where errors show up** — terminal (Python `NameError`) vs browser console (JS
   `TypeError`); break a side, the right window lights up, click to decode.

Every lesson follows the style-guide rule **picture → real code**: an everyday picture, then
4–6 lines of real syntax annotated back to it. Pace is ELI10.

It is deliberately small and heavily commented because it is *also a reading target*: later
in the course the learner opens this very project to practice "find the entry point and
follow the data" (the Week 01 skill, applied to real code).

## Run it

```bash
cd Interactive-Viz
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, then emits a static site to dist/
npm run preview  # serve the built dist/ locally
```

Deploy: `dist/` is plain static files. Drop it on Cloudflare Pages / Netlify / Vercel /
GitHub Pages, or open `dist/index.html` straight from a `file://` link. `base: "./"` in
`vite.config.ts` keeps asset paths relative so all of those work.

## File map (start here → follow the thread)

| File | Role |
|---|---|
| `index.html` | **Entry point.** The page, tab bar, and 3 lesson panels. Loads `src/main.ts`. |
| `src/main.ts` | Wires tabs and builds each lesson the first time its tab opens (lazy init). |
| `src/tabs.ts` | Tab switching + `onFirstShow` lazy-init callback. |
| `src/restaurant.ts` | Lesson 1: the Three.js restaurant scene. Phases drive request→response. |
| `src/fileTree.ts` | Lesson 2: clickable project file-tree + "reveal which runs first". |
| `src/errorWindows.ts` | Lesson 3: terminal vs browser-console error panes + decode box. |
| `src/codeBlock.ts` | Shared helper: renders real code + per-line "picture" notes (Rule 8). |
| `src/cards.ts` | Predict-then-peek cards; one array per lesson. |
| `src/resources.ts` | The "Read more" tab. Data-driven reading list (one array per week). |
| `src/style.css` | NASA 1980s technical-manual theme (mirrors `design-system/snippet.css`). |

**Single source (SPA plan):** predict-then-peek cards live in `cards.ts` (soon the week module)
and feed BOTH the lesson tab and the in-app SRS deck — author once. (An earlier Obsidian copy
was removed; the web app is now the only source.)

**Mandatory per week:** every week ships a **"Read more" tab** — a curated reading list in
`resources.ts`. The tabs for any week are: `00` Start here (FTUE) · lessons `01..N` · the final
**Read more** tab.

## Design decisions

- **Plain TypeScript, no UI framework.** Fewer moving parts = easier to read for a beginner
  later. Clarity beats cleverness (it's a teaching artifact).
- **Flat line-art 3D.** `MeshBasicMaterial` fills + black `EdgesGeometry` outlines, no
  lights. Gives the engineering-drawing look and renders fast everywhere.
- **Orthographic camera by default.** True "flat" technical-drawing view; a checkbox swaps
  to perspective. Matches the NASA-manual aesthetic.
- **One shared visual language.** `src/style.css` and `design-system/snippet.css` use the same
  palette + fonts, so any surface built from the design system stays consistent.
- **Phases as data.** `PHASES[]` in `restaurant.ts` is a small list of steps with captions.
  Adding/retiming a beat is a data edit, not new logic.

## How to extend (next weeks)

Each future week = one new analogy page. Recommended pattern:
1. Add the concept + its everyday picture to `docs/CONTENT-GUIDE.md` (the map) **first**.
2. Copy `restaurant.ts` to e.g. `mailbox.ts` (Week 05, APIs as mail) and rewrite the
   `PHASES[]` + geometry. Keep the same flat-line-art helpers (`block`, `label`).
3. Reuse `cards.ts` and `style.css` unchanged.
4. For multi-page: add routes/pages and a small index; keep each page small.

Highest-value analogies queued (from the curriculum): async = production line → **swap for
an everyday "two checkout lanes" or "kettle while you do other things"** picture per the
style guide (no factory/ME framing); git = snapshots/timeline; dependencies = a shopping
list; the API request/response = sending mail and getting a reply.

## Verification done (2026-05-30)

- `npm run build` — type-checks clean, emits `dist/` (~478 kB JS, gzip 122 kB; Three.js).
- Loaded at `localhost:5173`: no JS console errors (only harmless WebGL perf warnings).
- Stepped the order: REQUEST token travels table → kitchen, caption tracks the phase.
- Predict-then-peek card reveals its answer on click.
- Mobile (375×812): layout reflows, no horizontal scroll. (Minor: 3D labels clip at the
  far edge on very narrow widths — cosmetic, safe to ignore for now.)
