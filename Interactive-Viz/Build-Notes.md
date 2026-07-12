# Build Notes - Interactive-Viz (Code Literacy V2)

The interaction-first layer for the curriculum. Holds the deployable web app and visualizations.
Course 1 Weeks 01-11 are implemented, and the canonical Course 1 spec lives at
`docs/COURSE-1-CODE-LITERACY-FINAL.md`.

## What this is

A tiny **Vite + TypeScript + Three.js** app. `index.html` is the persistent app shell,
`src/router.ts` handles hash routes, and `#/week/01` bridges to the existing Week 01 lesson.

Week 01 contains three tabbed lessons plus Start, FAQ, and Read more:

1. **Round Trip Lab** - WebGPU/WebGL signal path, real `fetch()` code walk, latency/payload
   controls, and server-error logging.
2. **Project Folder Lab** - Web/Python project-tree modes, startup trace, file inspector, and
   installed-parts warnings.
3. **Error Routing Lab** - rotatable/clickable 3D router showing whether Python, page JS, or
   API failures belong in the terminal or browser console.

Every lesson follows the content rule **picture, interact, then real code**: an everyday
picture, a learner action, and 4-6 lines of real syntax annotated back to the action.
Pace is ELI10.

Week 08 adds two 2D instrument labs:

1. **Approve or Reject** - review six real diffs, choose a verdict and reason, then see the
   behavior impact. Five diffs contain planted failure modes.
2. **Build the Bug Report** - select useful evidence, drop noise, and assemble the exact
   three-part report another person can act on.

The code stays deliberately small and readable because later course weeks use this project as
a student reading target.

## Run it

```bash
cd Interactive-Viz
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, then emits a static site to dist/
npm run preview  # serve the built dist/ locally
```

Deploy: `dist/` is plain static files. Drop it on Cloudflare Pages, Netlify, Vercel, or
GitHub Pages. `base: "./"` in `vite.config.ts` keeps asset paths relative for static hosts.

## File map

| File | Role |
|---|---|
| `index.html` | Entry point. Persistent app shell with `#view`. Loads `src/main.ts`. |
| `src/main.ts` | Applies theme and starts the hash router. |
| `src/theme.ts` | Applies the light/dark theme toggle and persists user choice. |
| `src/router.ts` | Routes `#/`, `#/weeks`, `#/week/NN`, `#/glossary`, and `#/review`. |
| `src/pages/` | Home, Course Map, support routes, and Week pages. |
| `src/weekMeta.ts` | The 11-week course-map metadata from the final course spec. |
| `src/tabs.ts` | Tab switching + `onFirstShow` lazy-init callback. |
| `src/content/` | WeekData types, Week 02-11 data, all-week glossary aggregation, and lazy widget registry. |
| `src/approveRejectLab.ts` | Week 08 diff-review verdict/reason lab. |
| `src/bugReportLab.ts` | Week 08 evidence-selection and bug-report builder. |
| `src/signalLab.ts` | Lesson 1: WebGPU/WebGL request-server-response scene. |
| `src/signalCodeWalk.ts` | Lesson 1: clickable `fetch()` code lines that focus the 3D scene. |
| `src/projectFolderLab.ts` | Lesson 2: Web/Python project tree, detail panel, and startup trace. |
| `src/errorRoutingLab.ts` | Lesson 3: rotatable/clickable 3D error router + console decode lanes. |
| `src/restaurant.ts`, `src/fileTree.ts` | Legacy modules kept temporarily until cleanup/content-model migration. |
| `src/codeBlock.ts` | Shared helper: real code + per-line picture notes. |
| `src/cards.ts` | Predict-then-peek cards; one array per lesson. |
| `src/resources.ts` | The mandatory Week 01 Read more list. |
| `src/style.css` | NASA technical-manual theme, dark mode, and app-shell layout. |

## Design decisions

- **Plain TypeScript, no UI framework.** Fewer moving parts makes the app easier to read.
- **Interaction first.** Prose supports the action; it does not replace the action.
- **Hash routes.** Static-host friendly and enough for this PWA milestone.
- **Deliberate content model.** Week 02-11 lessons use `WeekData` records for metadata, lessons,
  cards, resources, and glossary terms; Week 01 remains its established page while the shared
  course shell consumes the same route family.
- **Lazy widget registry.** Interactive lesson labs are registered by stable widget ID and
  mounted on demand, keeping the content records readable and the initial route lighter.
- **Light by default, dark as a choice.** The NASA manual look stays light-first, with a
  persistent dark-mode toggle for comfort.
- **Manual shell, instrument labs.** The app shell stays light and paper-like; lesson labs may
  use dark instrument panels for WebGPU scenes, console lanes, and live controls.
- **Inspectable 3D.** If a 3D scene teaches the concept, it should usually be rotatable,
  clickable, hoverable, or linked to code. Passive 3D is below the Week 1 quality bar.
- **Compact decode/help panels.** Empty side panels waste the learner's attention. Put decode
  content in compact strips or reveal states unless it is continuously useful.
- **WebGPU with fallback.** Use `three/webgpu` for heavier labs and verify WebGPU or WebGL2
  fallback starts.
- **One shared visual language.** The web app follows the approved NASA technical-manual system.
- **Reference tabs stay manual.** FAQ and Read more should remain text-heavy and scan-friendly.

## How to extend

1. Add the concept, everyday picture, and primary interaction to `docs/CONTENT-GUIDE.md` first.
2. Add course metadata in `src/weekMeta.ts` if the week/topic changes.
3. Add or update routes/pages through `src/router.ts`.
4. Keep each widget small, commented, and readable as a teaching artifact.
5. Every week must ship `00 Start`, interactive lessons, **FAQ**, and a final **Read more** tab.
6. For 3D labs, verify desktop and 375px mobile, no horizontal overflow, dark mode, reduced
   motion, and meaningful status text outside the canvas.

## Next session

Commit and open a PR for `codex/week-08-content`. TypeScript and the Vite production build pass;
Vite still reports the existing large Three.js bundle warning.

## Verification done (2026-05-30)

- `npm run build` passed for the original Week 01 page.
- Browser check at `localhost:5173` had no app JS console errors.
- Restaurant step/card/mobile checks passed.

## Verification done (2026-05-31)

- Baseline commit created before the app-shell refactor.
- `npm run build` passes. Vite reports the expected large Three.js bundle warning.
- Headless Edge verified production `dist/` routes: `#/`, `#/weeks`, `#/week/01`,
  `#/week/02`, `#/glossary`, and `#/review`, including reloads.
- Browser back/forward works between Home, Course Map, and Glossary.
- Week 01 regression passed: tabs, lazy Restaurant canvas, step control, card reveal,
  file-tree entry reveal, terminal error decode, FAQ, and Read more resources.
- Mobile checks at 375x812 passed for Course Map and Week 01 with no horizontal overflow.
- Dark mode persists with `localStorage` and keeps Week 01 readable.

## Verification done (2026-06-02)

- Week 1 interactive refresh build passes with `three@^0.180.0`.
- Lesson 1 starts WebGPU/WebGL, code-line clicks focus request/server/response, sliders update
  latency/payload, and server-error mode logs the failure.
- Lesson 2 project-folder lab passes Web/Python mode, startup trace, file click, and mobile
  overflow checks.
- Lesson 3 error-routing lab is rotatable, zoomable, hoverable, and clickable; 3D router,
  browser-console, and terminal picks select the correct error case.
- FAQ and Read more counts remained intact.
- Dark mode and reduced-motion checks passed.

## Build verification (2026-07-12)

- TypeScript and Vite production build pass; Vite keeps the expected large Three.js chunk warning.
- Browser QA passed across Weeks 01-11 and both lesson widgets per week.
- Interaction feedback, glossary search, malicious-hash handling, 375px responsive layouts,
  dark-mode persistence, reduced-motion behavior, 3D scene framing, and console output passed.
- Final release fixes add explicit Week 01 route teardown, detached-host guards for lazy widgets,
  and keyboard/button inspection for every Week 04 3D desk.
- TypeScript, Vite, and the final Sol static re-review pass after those fixes. A focused post-fix
  browser rerun is still recommended when localhost browser control is available again.
