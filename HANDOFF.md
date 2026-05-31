# HANDOFF - Code Literacy

Self-contained brief for the next agent. Read this first, then `docs/PROJECT-PLAN.md`,
`docs/CONTENT-GUIDE.md`, and `docs/INTERACTIVE-COURSE-BUILDER.md`.

This file is intentionally concise. Do not duplicate plans already captured in those docs.

---

## 1. Current State

Repo path:

```text
D:\_WORKSPACE_\AI_Tests\_Codex_LILA\Code_Literacy_App
```

Remote:

```text
https://github.com/BiswajeetLila/Code_Literacy_App.git
```

Current branch at closeout: `main`.

The repo has been frozen for the day on `main`. The next implementation session should create:

```text
codex/content-model-migration
```

from the latest `main`.

---

## 2. Product Thesis

Code Literacy is a 10-week, interaction-first course for true beginners who use AI to build
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
- Home page, course map, placeholder glossary/review routes, and Week 1 route bridge.
- Week position strip in the header nav: 10 squares, completed/current/future state.
- Week 1 with 6 tabs: Start, Restaurant, Files, Errors, FAQ, Read more.
- FAQ tab for quick meanings like `src`, `JSON`, `.bat`, `package.json`, `.venv`.
- Dark-mode toggle in the screen corner, persisted with `localStorage`.
- Interaction-first docs and reusable builder blueprint.
- Installed local skill: `C:\Users\Biswa\.agents\skills\interactive-course-builder\SKILL.md`.

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
cd D:\_WORKSPACE_\AI_Tests\_Codex_LILA\Code_Literacy_App\Interactive-Viz
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

`npm` may be blocked by PowerShell script policy; use `npm.cmd`.

The latest verified browser checks covered:

- Home and `#/week/01`.
- Light mode default.
- Dark mode persistence after reload.
- Week 1 tabs, cards, FAQ, and Read more.
- Restaurant interaction step behavior.
- 375px mobile width with no horizontal overflow.

---

## 5. Tomorrow's First Task

Create a new branch from latest `main`:

```powershell
git -c safe.directory=D:/_WORKSPACE_/AI_Tests/_Codex_LILA/Code_Literacy_App checkout -b codex/content-model-migration
```

Then migrate Week 1 into the planned content model while preserving the current visual output and
behavior.

Implementation direction:

- Keep the current Week 1 renderer behavior stable.
- Introduce the content model described in `docs/PROJECT-PLAN.md`.
- Move Week 1 lesson/card/resource/FAQ data toward the content model.
- Reuse current widgets instead of rewriting them.
- Build and browser-check after the migration.

Do not start progress tracking, SRS, glossary search, PWA installability, or deployment until the
content-model migration is stable.

---

## 6. Suggested Skills

- `interactive-course-builder`: use for interaction-first course judgment and lesson structure.
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
