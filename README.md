# Code Literacy

An 11-week, **interaction-first** course that teaches a true beginner to **read AI-generated
code, debug it, spot bad code, and steer an AI to ship working things**. It is not a
write-code-from-blank-page bootcamp. Every concept becomes a small thing to click, predict,
break, reveal, or move before it becomes real code.

**Course 1 Weeks 01-11 are implemented.** The course moves from reading the screen and project
files through dependencies, functions, data flow, APIs, debugging, Git, async work, architecture,
and spec-driven delivery. The whole-course glossary is searchable from one registry.

## What's in this folder

```text
Interactive-Viz/     The web app (Vite + TypeScript + Three.js). THE product + source of truth.
design-system/       The "NASA technical manual" visual system (spec, drop-in CSS, swatch).
docs/
  COURSE-1-CODE-LITERACY-FINAL.md
                     Canonical Course 1 spec: Weeks 1-11 and agent execution brief.
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

- **Done:** Course 1 Weeks 01-11, with interactive lessons, FAQ, Read more, annotated code,
  predict-then-peek cards, and week-specific glossary terms.
- **Done:** Deliberate `WeekData` content model, central all-week glossary aggregation, and
  lazy widget registry for lesson labs.
- **Done:** App shell, hash routes, Home, Course Map, searchable all-week glossary, Review
  placeholder, week strip, accessible tabs/cards, and dark-mode toggle.
- **Verified:** TypeScript and Vite production build; all routes and lesson widgets; interaction
  feedback; glossary search; malicious-hash handling; 375px responsive layouts; dark-mode
  persistence; reduced-motion behavior; 3D scene framing; and clean browser console output.
- **Known warning:** Vite reports the existing large Three.js bundle chunk.
- **Next:** commit and open a PR for `codex/week-08-content`.
- **Current branch:** `codex/week-08-content`.

## For the next agent

Read **`HANDOFF.md`** first.
