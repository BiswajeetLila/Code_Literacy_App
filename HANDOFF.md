# HANDOFF - Code Literacy

Self-contained brief for the next agent. Read this first, then
`docs/COURSE-1-CODE-LITERACY-FINAL.md`, `docs/PROJECT-PLAN.md`, `docs/CONTENT-GUIDE.md`,
and `docs/INTERACTIVE-COURSE-BUILDER.md`.

This file is intentionally concise. Do not duplicate plans already captured in those docs.

---

## 1. Current State

Repo path:

```text
D:\AI_Workflows\Code_Literacy_App
```

Remote:

```text
https://github.com/BiswajeetLila/Code_Literacy_App.git
```

Current active branch: `codex/week-08-content`.

The canonical Course 1 spec has been imported into:

```text
docs/COURSE-1-CODE-LITERACY-FINAL.md
```

That file supersedes the earlier 10-week map. Course 1 is now Weeks 01-11, and every week is
implemented.

---

## 2. Product Thesis

Code Literacy is an 11-week, interaction-first course for true beginners who use AI to build
things. It teaches them to read AI-generated code, debug it, spot bad code, and steer the work.
It is not a write-code-from-blank-page bootcamp.

The durable teaching loop is:

```text
picture -> interact -> predict -> feedback -> real code -> vocabulary
```

Reading supports the learner action. If a lesson still works as a static article, it is not done.

---

## 3. What Is Built

The web app in `Interactive-Viz/` is the product and source of truth.

Completed:

- Routed app shell with hash routes: `#/`, `#/weeks`, `#/week/NN`, `#/glossary`, `#/review`.
- Home page, course map, searchable Week 8 glossary, Review placeholder, and Week routes.
- Week position strip in the header nav: 11 squares, completed/current/future state.
- Week 1 with 6 tabs: Start, Round Trip Lab, Project Folder Lab, Error Routing Lab, FAQ,
  Read more.
- Weeks 02-11 with their interactive lessons, FAQ, Read more, cards, resources, annotated code,
  and week-specific glossary terms.
- Week 8 with 5 tabs: Start, Approve or Reject, Build the Bug Report, FAQ, and Read more.
- Approve or Reject has one safe diff and five planted failure modes: made-up package,
  deleted state, broken API contract, missing `await`, and swallowed error evidence.
- Build the Bug Report grades what changed, expected vs actual, exact error text, and noise.
- Weeks 02-11 use the canonical `WeekData` model. The lazy widget registry mounts lesson labs
  by stable IDs, and one central glossary aggregation makes all-week search available.
- FAQ tab for quick meanings like `src`, `JSON`, `.bat`, `package.json`, `.venv`.
- Dark-mode toggle in the screen corner, persisted with `localStorage`.
- Interaction-first docs and reusable builder blueprint.

Key docs:

- `README.md` - current project status and quick start.
- `docs/PROJECT-PLAN.md` - master plan and PWA/content-model direction.
- `docs/CONTENT-GUIDE.md` - writing and lesson contract.
- `docs/INTERACTIVE-COURSE-BUILDER.md` - portable HOW/WHY blueprint.
- `Interactive-Viz/Build-Notes.md` - app architecture, file map, run/deploy notes, verification.

---

## 4. Run And Verify

Use PowerShell commands:

```powershell
cd D:\AI_Workflows\Code_Literacy_App\Interactive-Viz
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

`npm` may be blocked by PowerShell script policy; use `npm.cmd`.

Current verification: TypeScript and Vite production build pass. Browser QA passed across Weeks
01-11 and both lesson widgets per week, including live interaction feedback, glossary search,
malicious-hash handling, 375px responsive layouts, dark-mode persistence, reduced-motion behavior,
3D scene framing, and clean console output. Vite reports the existing large Three.js bundle warning.

The final Sol review then found and closed three release issues: Week 01 route teardown now disposes
its render loops and observers, lazy widget imports refuse detached route hosts, and Week 04 exposes
all 3D desks through keyboard arrows and explicit desk buttons. TypeScript, Vite, and the Sol static
re-review pass after those fixes. A focused post-fix browser rerun remains prudent when localhost
browser access is available again; the browser surface declined further localhost control in this
session.

---

## 5. Next Task

Commit and open a PR for the current branch: `codex/week-08-content`.

---

## 6. Suggested Skills

- `docs/INTERACTIVE-COURSE-BUILDER.md`: use for interaction-first course judgment and lesson
  structure.
- `tdd`: use if adding new behavior where tests can protect the migration.
- `diagnose`: use for browser, build, or routing regressions.
- `handoff`: use again at the end of the next session.

---

## 7. Constraints

- Keep the app framework-free: vanilla TypeScript, Vite, Three.js where needed.
- Keep the NASA technical-manual visual system.
- Light mode remains default; dark mode is a user choice.
- The web app is the single source of truth.
- No accounts, backend, CMS, analytics, or multi-user features.
- Do not author student-facing content in multiple places.
