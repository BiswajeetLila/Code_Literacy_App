# Build Notes - Interactive-Viz (Code Literacy V2)

The interaction-first layer for the curriculum. Holds the deployable web app and visualizations.
Week 01 is built, and the app now has the first routed shell for the PWA path.

## What this is

A tiny **Vite + TypeScript + Three.js** app. `index.html` is the persistent app shell,
`src/router.ts` handles hash routes, and `#/week/01` bridges to the existing Week 01 lesson.

Week 01 contains three tabbed lessons plus Start, FAQ, and Read more:

1. **Restaurant** - animated 3D request/response, plus the real `fetch()` code.
2. **Files & the front door** - clickable file tree, entry-point reveal, real `package.json`,
   and `print` vs `return`.
3. **Where errors show up** - terminal vs browser console; break a side, click the red line,
   and decode the error.

Every lesson follows the content rule **picture, interact, then real code**: an everyday
picture, a learner action, and 4-6 lines of real syntax annotated back to the action.
Pace is ELI10.

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
| `src/pages/` | Home, Course Map, placeholders, and the temporary Week 01 bridge. |
| `src/weekMeta.ts` | The 10-week course-map metadata from the project plan. |
| `src/tabs.ts` | Tab switching + `onFirstShow` lazy-init callback. |
| `src/restaurant.ts` | Lesson 1: the Three.js restaurant scene. |
| `src/fileTree.ts` | Lesson 2: clickable project file tree + entry-point reveal. |
| `src/errorWindows.ts` | Lesson 3: terminal vs browser-console panes + decode box. |
| `src/codeBlock.ts` | Shared helper: real code + per-line picture notes. |
| `src/cards.ts` | Predict-then-peek cards; one array per lesson. |
| `src/resources.ts` | The mandatory Week 01 Read more list. |
| `src/style.css` | NASA technical-manual theme, dark mode, and app-shell layout. |

## Design decisions

- **Plain TypeScript, no UI framework.** Fewer moving parts makes the app easier to read.
- **Interaction first.** Prose supports the action; it does not replace the action.
- **Hash routes.** Static-host friendly and enough for this PWA milestone.
- **Temporary Week 01 bridge.** Current behavior stays intact until the content-model migration.
- **Light by default, dark as a choice.** The NASA manual look stays light-first, with a
  persistent dark-mode toggle for comfort.
- **Flat line-art 3D.** `MeshBasicMaterial` fills + black `EdgesGeometry` outlines; no lights.
- **Orthographic camera by default.** Matches the technical-manual drawing style.
- **One shared visual language.** The web app follows the approved NASA technical-manual system.

## How to extend

1. Add the concept, everyday picture, and primary interaction to `docs/CONTENT-GUIDE.md` first.
2. Add course metadata in `src/weekMeta.ts` if the week/topic changes.
3. Add or update routes/pages through `src/router.ts`.
4. Keep each widget small, commented, and readable as a teaching artifact.
5. Every week must ship `00 Start`, interactive lessons, **FAQ**, and a final **Read more** tab.

## Next session

Create `codex/content-model-migration` from the latest `main`. The next slice is the
behavior-preserving Week 1 content-model migration: move lesson/card/resource/FAQ data toward the
planned content model while reusing the current widgets and keeping the rendered Week 1 experience
unchanged.

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
