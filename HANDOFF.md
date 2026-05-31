# HANDOFF — Code Literacy

Self-contained brief for the next agent. Everything referenced is **inside this folder** — it
is portable to any machine. Read this, then `docs/PROJECT-PLAN.md`, then start the milestone in
**§6**. You should not need the prior chat.

---

## 1. What this project is

A **10-week, reading-first** course teaching a true beginner to **read AI-generated code, debug
it, smell when it's bad, and steer an AI (Claude/Cursor) to ship working things.** It is **not**
a write-code-from-scratch bootcamp.

One artifact matters: **`Interactive-Viz/`** — a Vite + TypeScript + Three.js web app.
**Week 1 is fully built (5 tabs) and verified in a browser.**

Supporting docs (all in-folder): `docs/PROJECT-PLAN.md` (master spec), `docs/CONTENT-GUIDE.md`
(writing contract), `design-system/` (visual system).

> A prior Obsidian vault and an "image→3D pipeline" experiment were part of an earlier,
> personalized approach. **Both were removed.** The web app is the single source of truth.
> Ignore any lingering reference to a "vault" or "spine".

---

## 2. Hard decisions already locked (do not relitigate)

- **Product = ONE deployed static web-app URL.** No login, no backend. Progress in
  `localStorage`.
- **The web app is the SINGLE SOURCE OF TRUTH.** Don't author content in two places.
- **Reading-first**, **ELI10** voice (explain like a sharp 10-year-old).
- **Rule 8 — picture, then real code:** every concept = an everyday picture, THEN 4–6 lines of
  real syntax, each line annotated back to the picture. (See `docs/CONTENT-GUIDE.md`.)
- **Best-fit everyday analogies only.** No personalized / domain-specific analogies — everyday
  things (restaurant, front door, rented storage, shopping list…).
- **Aesthetic = the `design-system/` ("NASA technical manual").** Use it for every surface.
- **Tech = vanilla TS + a tiny hash router.** No framework. Small + readable (the code is also
  a student reading target).
- **Every week ships:** `00 Start (FTUE)` → lessons `01..N` → `Read more` (reading list) tab.
  The reading list is **mandatory**.

---

## 3. Current web app (`Interactive-Viz/`) — Week 1, verified

Tabs: `00 Start here` · `01 Restaurant` · `02 Files & the front door` · `03 Where errors show
up` · `04 Read more`. Lazy-inits each tab; Three.js starts only on the Restaurant tab.

| File | Role |
|---|---|
| `index.html` | Entry point. Header + tab bar + 5 panels. Loads `src/main.ts`. |
| `src/main.ts` | Wires tabs; builds each lesson on first open. |
| `src/tabs.ts` | Tab switching + lazy `onFirstShow`. |
| `src/restaurant.ts` | Lesson 1: Three.js client/server restaurant (reduced-motion + aria). |
| `src/fileTree.ts` | Lesson 2: clickable project tree + "reveal which runs first". |
| `src/errorWindows.ts` | Lesson 3: terminal vs browser-console panes + decode. |
| `src/codeBlock.ts` | Shared: real code + per-line "picture" notes (Rule 8). |
| `src/cards.ts` | Predict-then-peek cards; arrays per lesson + `mountCards(host, cards)`. |
| `src/resources.ts` | "Read more" list; `mountResources(host, list)` + `WEEK_01_RESOURCES`. |
| `src/style.css` | The full design-system theme. |
| `DESIGN.md` | Project copy of the design system. |
| `Build-Notes.md` | Run/deploy/extend notes + known debt. |

**Run:** `cd Interactive-Viz && npm install && npm run dev`. **Build:** `npm run build` → `dist/`.

---

## 4. Design system — `design-system/`

`DESIGN.md` (spec), `snippet.css` (drop-in styles), `swatch.png` (preview).
Palette: paper `#F4F1E8`, ink `#1A1A1A`, red `#FC3D21` (one accent), cyan `#5B8DB8`, amber
`#E8A33D`. Fonts: Space Mono (body) + Space Grotesk (headers). Hairline grid, square corners,
part-number tags (`FIG. 1-2`), orthographic 3D, light mode only.

---

## 5. Week topics (content for weeks 2–10)

1. What is this thing? (DONE) · 2. Dependencies = a shopping list · 3. Functions = recipes ·
4. Where does data come from? · 5. APIs = ordering off a menu · 6. Where's the bug? ·
7. Branches & time travel (git) · 8. Reading an AI's diffs like a reviewer ·
9. Async, races & pipelines · 10. Architectural conversations. (Detail in `docs/PROJECT-PLAN.md`.)

---

## 6. THE NEXT MILESTONE — deployable app (PWA). Status: approved, 0% started.

Full spec: `docs/PROJECT-PLAN.md` → "EXPANSION — Distribute as a deployable learning app (PWA)".
Build in this order; **build + browser-verify after each step.**

1. **App shell** — `index.html` → `#view` root + persistent header/nav. `src/router.ts` (hash
   routes: `#/` home · `#/weeks` map · `#/week/NN` · `#/glossary` · `#/review`).
   `src/pages/home.ts` + `src/pages/courseMap.ts` (10 week cards).
2. **Content model + week renderer** — `src/content/types.ts` (`WeekModule`/`Lesson`),
   `src/content/weeks/week01.ts` (migrate Week-1 to data; lessons reuse the existing widgets
   **unchanged** via an `onMount`), `src/content/weeks/meta.ts` (all 10), `src/pages/week.ts`.
   **Behavior-preserving** vs today's Week-1 (verify against the app first).
3. **Progress store** — `src/store.ts` (localStorage): completed lessons/weeks, streak,
   last-visited → course-map rings + home "continue".
4. **In-app SRS** — `src/srs.ts` (SM-2-lite, localStorage) + `src/pages/review.ts`
   (predict-then-peek → reveal → grade). Seed from each week's `cards`.
5. **Glossary page** — `src/content/glossary.ts` (Week-1 terms: plain words + picture + real
   code) + `src/pages/glossary.ts` (searchable).
6. **PWA** — `vite-plugin-pwa`: manifest (name "Code Literacy", theme `#FC3D21`, icons) +
   offline service worker. Verify installable (Lighthouse).
7. **Deploy** — `git init` → GitHub → **Cloudflare Pages** (free; Netlify alt). Verify live URL
   + "Add to Home Screen" on a phone. Document in `Build-Notes.md`.

**YAGNI (do NOT build):** accounts, backend, multi-user, CMS, analytics.

---

## 7. How to verify

- Build clean: `cd Interactive-Viz && npm run build`. Serve: `npm run preview -- --port 4173`.
- Drive a real browser to click through routes + check the console for errors. (If the
  `gstack` browse CLI is installed, run it from your home dir — it errors with
  `EEXIST mkdir '.gstack'` if the cwd already has a `.gstack/`. Otherwise any static server +
  manual browser works.)
- After a route works: reload, confirm `localStorage` persisted progress/SRS.

---

## 8. Conventions to keep

ELI10 + Rule 8 (`docs/CONTENT-GUIDE.md`) · the `design-system/` look · every week
`Start → lessons → Read more` with a mandatory reading list · small, commented widgets (they're
reading targets) · build + browser-verify + screenshot after every step.

---

## 9. First action

1. Read `docs/PROJECT-PLAN.md` (distribution section) + §6 above.
2. `cd Interactive-Viz && npm install && npm run dev`, click all 5 Week-1 tabs → that's your
   behavior-preservation baseline.
3. Start §6 step 1 (shell + router + Home + Course map); keep Week-1 reachable at `#/week/01`
   via a temporary bridge until step 2 migrates it.
