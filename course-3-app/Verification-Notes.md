# Course 3 App Verification Notes

Date: 2026-06-10

## Commands

Run from `course-3-app/`.

```bash
npm.cmd run build
npm.cmd run verify
```

PowerShell on this machine blocks `npm.ps1`, so use `npm.cmd`.

## Results

- Build passed and produced ignored output in `dist/`.
- Registry verification passed:
  - 10 Course 3 modules in order
  - 12 runnable templates
  - operating loop matches the Course 3 docs
  - every module has status, time budget, gate, artifacts, and valid template references
- Local progress verification passed:
  - starts incomplete
  - toggles complete
  - persists through storage reload
  - toggles back to incomplete
- Dev-server smoke verification passed:
  - `index.html` served
  - `src/main.js` served
  - `src/styles.css` served
- Server-backed headless Chrome DOM check passed for `#/module-10`.

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
- local-only progress tracking

It does not verify future LMS behavior, server persistence, submissions, grading, or Steamworks
workflow.
