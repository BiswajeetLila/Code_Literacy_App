# Course 3 App

Independent static app for Course 3: Unity Solo AI Game Studio.

This first vertical slice exposes the completed Course 3 docs package as an operational learner and
reviewer dashboard. It is separate from `Interactive-Viz/` and does not share runtime code with the
Course 1 app.

## Current Slice

- Course 3 module dashboard
- Module detail cards with gate, budget, artifacts, and related templates
- Local-only progress tracking
- Collapsible module rail for full-width module detail viewing

## Next Slice

The full course prose is still in `docs/course-3/`. The next app slice should add a course content
reader or content ingestion path so the learner can read module assignments and template details
inside the app instead of jumping back to markdown files.

## Run

```bash
npm run dev
```

Default local URL: `http://localhost:4173`.

## Build

```bash
npm run build
```

The build copies the static app to `dist/` and validates the Course 3 registry contract.

## Verify

```bash
npm run verify
```

The verification checks module ordering, registry completeness, related templates, local progress
storage behavior, and build output references. Browser/mobile checks should be run against the dev
server when changing UI layout.
