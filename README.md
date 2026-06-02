# Code Literacy

An 11-week, **interaction-first** course that teaches a true beginner to **read AI-generated
code, debug it, spot bad code, and steer an AI to ship working things**. It is not a
write-code-from-blank-page bootcamp. Every concept becomes a small thing to click, predict,
break, reveal, or move before it becomes real code.

**Week 1 is built and verified.** Week 2 has an initial dependency-supply slice, but the
canonical build order now jumps to **Week 8** next so the payoff defines what Weeks 2-7 must
plant.

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

- **Done:** Week 1 - 6 tabs (Start, Round Trip Lab, Project Folder Lab, Error Routing Lab,
  FAQ, Read more), verified.
- **Partial:** Week 2 - initial dependency supply route/lab; canonical Week 2 still needs
  version ranges, lockfiles, fake imports, and slopsquatting.
- **Done:** App shell slice - hash router, Home, Course Map, Week 1 route bridge, planned
  placeholder routes for Glossary and Review, week strip, and dark-mode toggle.
- **Next:** build Week 8 first from `docs/COURSE-1-CODE-LITERACY-FINAL.md`, then trim/build
  Weeks 2-7 around the failure modes Week 8 tests.
- **Next branch:** `codex/week-08-content` from the latest working branch/main.

## For the next agent

Read **`HANDOFF.md`** first.
