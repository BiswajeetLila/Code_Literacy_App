# Code Literacy

A 10-week, **reading-first** course that teaches a true beginner to **read AI-generated code,
debug it, spot bad code, and steer an AI to ship working things** — not to write code from a
blank page. Every concept gets an everyday picture, then the same idea in real code.

**Week 1 is built and verified.** The project is mid-way through becoming a single deployable
web app (PWA).

## What's in this folder

```
Interactive-Viz/     The web app (Vite + TypeScript + Three.js). THE product + source of truth.
design-system/       The "NASA technical manual" visual system (spec, drop-in CSS, swatch).
docs/
  PROJECT-PLAN.md    Master plan/spec — all weeks + the next milestone.
  CONTENT-GUIDE.md   The writing contract (ELI10 voice, "picture → real code" rule).
HANDOFF.md           Start here if you're an agent picking this up.
```

## Quick start

```bash
cd Interactive-Viz
npm install
npm run dev      # open the printed URL
npm run build    # static bundle in dist/  (deployable)
```

## Status & next step

- **Done:** Week 1 — 5 tabs (Start, Restaurant, Files, Errors, Read more), verified.
- **Next:** turn the single page into a deployable multi-week PWA (router, course map, in-app
  spaced-repetition, glossary, progress, deploy). Full spec in `docs/PROJECT-PLAN.md`
  ("EXPANSION — Distribute as a deployable learning app").

## For the next agent

Read **`HANDOFF.md`** first.
