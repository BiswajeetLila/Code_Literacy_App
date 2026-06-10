# Course 3 App Verification Notes

Date: 2026-06-10

## Commands

Run from `course-3-app/`.

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

Chrome and Edge headless initially failed in this environment because the GPU process could not
initialize. Chrome rendered DOM successfully when launched with the low-level headless flags used in
the terminal verification. Screenshot output did not produce a file on this machine, so mobile
layout confidence currently comes from responsive CSS checks plus the module-detail DOM render.

## Current Scope

This verifies the first vertical slice only:

- app shell
- module dashboard
- module registry
- module detail view
- full-module reader generated from Course 3 docs
- related-template reader generated from Course 3 docs
- local-only progress tracking

It does not verify future LMS behavior, server persistence, submissions, grading, or Steamworks
workflow.
