# Code Literacy

A 10-week, **interaction-first** course that teaches a true beginner to **read AI-generated
code, debug it, spot bad code, and steer an AI to ship working things**. It is not a
write-code-from-blank-page bootcamp. Every concept becomes a small thing to click, predict,
break, reveal, or move before it becomes real code.

**Week 1 is built and verified.** The project now has the first routed app shell for the
deployable web app/PWA path.

## What's in this folder

```text
Interactive-Viz/     The web app (Vite + TypeScript + Three.js). THE product + source of truth.
design-system/       The "NASA technical manual" visual system (spec, drop-in CSS, swatch).
docs/
  PROJECT-PLAN.md    Master plan/spec for all weeks and the PWA milestone.
  CONTENT-GUIDE.md   The writing contract: ELI10, interaction-first, picture then code.
  INTERACTIVE-COURSE-BUILDER.md
                     Reusable HOW/WHY blueprint for making courses in this style.
HANDOFF.md           Start here if you're an agent picking this up.
```

## Quick start

```bash
cd Interactive-Viz
npm install
npm run dev      # open the printed URL
npm run build    # static bundle in dist/ (deployable)
```

## Status & next step

- **Done:** Week 1 - 6 tabs (Start, Restaurant, Files, Errors, FAQ, Read more), verified.
- **Done:** App shell slice - hash router, Home, Course Map, Week 1 route bridge, planned
  placeholder routes for Glossary and Review, week strip, and dark-mode toggle.
- **Next:** migrate Week 1 into the content model, then add progress, in-app spaced repetition,
  glossary content/search, PWA installability, and deploy. Full spec in `docs/PROJECT-PLAN.md`
  ("EXPANSION - Distribute as a deployable learning app").
- **Next branch:** `codex/content-model-migration` from the latest `main`.

## For the next agent

Read **`HANDOFF.md`** first.
