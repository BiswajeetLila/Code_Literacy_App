# Interactive-Viz_Course_3_UNITY Verification Notes

Date: 2026-06-12

## Commands

Run from `Interactive-Viz_Course_3_UNITY/`.

```bash
npm.cmd run build
npm.cmd run verify
npm.cmd run smoke:browser
```

PowerShell on this machine blocks `npm.ps1`, so use `npm.cmd`.

## Results

- Build passed and produced ignored output in `dist/`.
- Registry verification passed:
  - 10 Course 3 modules in order
  - 12 runnable templates
  - operating loop matches the Course 3 docs
  - 10-week and 5-week cohort cadences match the Course 3 docs
  - defense checkpoints are Modules 3, 5, 8, and 10
  - every module has status, time budget, gate, artifacts, and valid template references
- Generated content verification passed:
  - 10 module docs parsed from `docs/course-3/modules/`
  - 12 template docs parsed from `docs/course-3/templates/`
  - Module 2, Module 8, and Module 10 reader content checked for expected course text
  - missing module or template content fails verification
- Local progress verification passed:
  - starts incomplete
  - toggles complete
  - persists through storage reload
  - toggles back to incomplete
  - gate evidence capture persists
  - artifact checklist capture persists
  - artifact evidence notes persist
  - reviewer decision persists
  - reviewer name and notes persist
  - reviewer rubric criteria persist
- Evidence export verification passed:
  - module evidence pack has a versioned schema
  - full-course evidence pack includes all 10 modules
  - Markdown export includes artifact evidence and reviewer notes
- Dev-server smoke verification passed:
  - `index.html` served
  - `src/main.js` served
  - `src/generatedCourseContent.js` served
  - `src/styles.css` served
- Browser smoke verification should pass through `npm.cmd run smoke:browser`:
  - Module 2 reader includes spec/thesis content
  - Module 8 reader includes QA plan content
  - Module 10 reader includes Steam-demo candidate content
  - On this machine, local Chrome/Edge `--dump-dom` times out or returns no DOM even for a tiny data
    URL, so the script reports the limitation and uses the server content fallback

## Browser Notes

Chrome and Edge headless are unreliable in this environment. The browser smoke command first tries
local DOM output, then reports the limitation and uses a server-content fallback when `--dump-dom`
times out or returns no DOM. Screenshot output did not produce a file on this machine, so mobile
layout confidence currently comes from responsive CSS checks plus served app/content checks.

## Current Scope

This verifies the first vertical slice only:

- app shell
- module dashboard
- module registry
- module detail view
- full-module reader generated from Course 3 docs
- related-template reader generated from Course 3 docs
- 10-week and 5-week cohort timeline view
- local gate evidence and artifact checklist capture
- exportable module and full-course evidence packs
- reviewer decision, notes, and rubric checklist capture
- local-only progress tracking

It does not verify future LMS behavior, server persistence, submissions, grading, or Steamworks
workflow.
