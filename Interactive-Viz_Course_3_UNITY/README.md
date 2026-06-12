# Interactive-Viz_Course_3_UNITY

Independent static app for Course 3: Unity Solo AI Game Studio.

This first vertical slice exposes the completed Course 3 docs package as an operational learner and
reviewer dashboard. It is separate from `Interactive-Viz/` and does not share runtime code with the
Course 1 app.

Folder name: `Interactive-Viz_Course_3_UNITY/`.

## Current Slice

- Course 3 module dashboard
- Module detail cards with gate, budget, artifacts, and related templates
- Local-only progress tracking
- Collapsible module rail for full-width module detail viewing
- Generated full-module reader from `docs/course-3/modules/`
- Generated related-template reader from `docs/course-3/templates/`
- Local gate evidence and artifact checklist capture
- 10-week studio timeline with 5-week hardcore cadence toggle
- Exportable module Markdown evidence packs
- Exportable full-course JSON evidence pack
- Reviewer decision, reviewer notes, and rubric criteria capture

## Next Slice

The next app slice should productize review handoff: import previously exported evidence, compare
modules across a cohort, or prepare hosted submission/review flows.

## Content Source

Course content remains source-of-truth in `docs/course-3/`. The app runs
`scripts/generateContent.mjs` during build and verification to generate
`src/generatedCourseContent.js` from the module and template markdown files.

## Run

```bash
npm run dev
```

Default local URL: `http://localhost:4173`.

## Build

```bash
npm run build
```

The build generates course content, copies the static app to `dist/`, and validates the Course 3
registry contract.

## Verify

```bash
npm run verify
npm run smoke:browser
```

The verification checks module ordering, cohort cadence data, generated module/template content,
registry completeness, related templates, local progress and checklist storage behavior, and build
output references. Browser/mobile checks should be run against the dev server when changing UI
layout. `smoke:browser` uses local Chrome or Edge in headless DOM mode to confirm early, middle, and
late module reader paths render. If local browser DOM output is unavailable, it reports that
limitation and falls back to checking the served generated content and app entry code.
