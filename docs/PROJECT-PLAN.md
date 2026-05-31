> **Reading note (post-cleanup):** this is the historical master spec. Early sections describe
> an Obsidian vault that has since been **removed** — the web app (`Interactive-Viz/`) is now the
> single source of truth. The section that matters next is **"EXPANSION — Distribute as a
> deployable learning app (PWA)"**. Ignore vault paths; they're history.

> **Current state (2026-05-31):** the app shell slice is now built and pushed: hash routing,
> Home, Course Map, Week 1 bridge, placeholder Glossary/Review routes, header week strip,
> Week 1 FAQ, and persistent dark mode are complete. The next slice is the behavior-preserving
> Week 1 content-model migration. Start a new branch from `main` named
> `codex/content-model-migration`.

# V2 — Interactive ELI5 Vertical Slice (Week 01)

## Context

The handoff doc (`PLAN_Learning_Coding_Through_Claude.md`) produced a 10-week
reading-first curriculum, now a passive Obsidian vault (`Code-Literacy-Vault/`). Two
problems to fix:

1. **It is passive** — read links, annotate markdown, self-check on the honor system.
   No feedback loop, no "doing." The best mechanic (predict-then-peek) is dead text.
2. **It is over-personalized** — built on ~52 mechanical-engineering analogies (BOMs,
   kinematic state, tolerances) and an explicit "lean on the ME brain" framing. That locks
   out a true zero-knowledge beginner.

**Goal:** strip ALL mechanical/personalized analogies and rewrite in **best-fit everyday
ELI5** terms so someone with zero programming knowledge can follow — while making the
experience **interactive**. Rather than rewrite the whole vault at once, build and polish
**one vertical slice** (the Week-01 first-touch experience), write the ELI5 rules + build
findings as docs, then propagate project-wide in a later iteration.

Versioning: **V1** = dry Obsidian skeleton (frozen — **do not touch**). **V2** = the current
working curriculum — this de-personalized, ELI5, interactive work, which we iterate on until
proper. There is no V3.

### Locked decisions
- **End goal:** learner ends able to *read AI-generated code, debug it, spot bad code, and
  steer Claude/Cursor to ship working things.* Reading-first — **not** a write-from-scratch
  bootcamp. (Keeps the doc's original thesis.)
- **Analogy style:** **best-fit per concept** — pick whatever everyday thing explains each
  idea clearest (restaurant for client/server, front door for entry point, rented storage
  for the cloud). No single forced theme, no ME analogies.
- **Scope:** build + polish the **Week-01 vertical slice only**; document; propagate later.
- **Platforms:** Three.js analogy viz + Obsidian spaced-repetition (from prior round).
- **Aesthetic:** **1980s NASA technical-manual** — paper/ink, retro mono, hairline grid,
  part-number callouts, orthographic line-art. (A *visual style*, not a personalization —
  kept.)

---

## What "the Week-01 vertical slice" is

Week 01 = *"What is this thing on my screen?"* — client vs server, runtime, the stack,
frontend vs backend, files/folders, where errors print. The slice delivers that week,
end-to-end and polished, across two surfaces sharing one NASA theme + one analogy map:

- **Deployable web page** (new-user first touch): ELI5 lesson + an interactive Three.js
  analogy + inline predict-then-peek cards.
- **Obsidian vault** (personal study/review home): same Week-01 content rewritten ELI5 +
  a spaced-repetition deck for long-term recall.

### Best-fit ELI5 analogies for Week-01 concepts (replacing all ME ones)
- **client / server** → customer at a table vs the kitchen that cooks the order.
- **frontend / backend** → the dining room you see vs the kitchen you don't.
- **runtime** → the kitchen being *open and cooking* — the thing that actually runs the
  instructions.
- **the cloud** → a computer you rent somewhere else, like a storage unit across town.
- **entry point** → the front door / the "start here" page.
- **repository** → one project folder — a binder holding all the recipe pages.

---

## Aesthetic Spec — NASA 1980s Technical Manual (shared by web + Obsidian)
- **Palette:** paper `#F4F1E8`, ink `#1A1A1A`, NASA "worm" red `#FC3D21` (accent),
  blueprint cyan `#5B8DB8`, caution amber `#E8A33D`.
- **Fonts (retro):** `Space Mono` (zero-setup, Google Fonts) for labels/data; optional
  `Departure Mono` local; condensed grotesque (`Space Grotesk`) for headers.
- **Motifs:** hairline grid, corner registration marks, part-number tags (`FIG. 1-2`),
  leader lines, monospace labels, halftone fills, orthographic-camera option in 3D.

---

## Deliverable 1 — ELI5 content rewrite (Week-01 only)

Strip ME analogies, establish the ELI5 voice. Rewrite:
- `05-Weeks/Week-01-What-Is-This-Thing.md`
- Its glossary terms: `06-Glossary/{client,server,runtime,frontend,backend,repository,entry-point}.md`
- Its mental-model notes: `01-Mental-Models/{Client-vs-Server,Frontend-vs-Backend,Runtime,The-Stack,Cloud-Explained}.md`

Rewrite the glossary template (`_templates/Glossary-Term.md`) so the `## Analogy` section is
"Everyday picture" (best-fit ELI5), and drop the mech-eng/game-art slots.

## Deliverable 2 — Predict-then-peek SRS (Week-01 deck, Obsidian)
- Install **Spaced Repetition** plugin (`st3v3nmw/obsidian-spaced-repetition`); syntax
  `Question ?? Answer`. (User clicks Install in Obsidian; I scaffold
  `.obsidian/community-plugins.json` + all card content.)
- New `09-Drills/Week-01-Drills.md` — ELI5 cards: "which file runs first?", "is this the
  customer or the kitchen?", "where does this error show up?".
- Add NASA CSS snippet `.obsidian/snippets/nasa-manual.css` (vault-wide).
- Link deck + "due today" into `00-MOC.md`.

## Deliverable 3 — One Three.js analogy viz (deployable, the first-touch)
- **"Client & Server: a restaurant"** — interactive 3D: you (browser) place an order, it
  travels to the kitchen (server), food comes back and is "rendered" on the table.
  Scrub/step the request→response; toggle labels; orthographic engineering-drawing view.
- Stack: **Vite + TypeScript + Three.js**, static-deployable (Netlify/Vercel/GH Pages).
- Wraps the Week-01 lesson page: ELI5 sections + the viz + inline predict-then-peek cards.
- NASA-manual styled; kept small + readable on purpose (it's also a future reading target).
- New sibling dir `Interactive-Viz/` (Vite app) with `week-01/` route + shared theme CSS
  mirroring the Obsidian snippet.

## Deliverable 4 — Docs / findings (for later propagation)
- `Interactive-Viz/Build-Notes.md` — what was built, decisions, how to extend per week.
- `Code-Literacy-Vault/Analogy-Style-Guide.md` — the ELI5 rules (no jargon-first, one
  everyday picture per concept, beginner test) + a growing concept→analogy map. This is the
  contract the rest of the vault gets rewritten against in the propagation pass.

---

## Build Order
1. **Analogy Style Guide** (Deliverable 4 first — it governs everything).
2. **Week-01 ELI5 rewrite** (Deliverable 1) + glossary template.
3. **SRS deck + NASA CSS snippet** (Deliverable 2); verify review loop.
4. **Three.js restaurant viz + Week-01 web page** (Deliverable 3).
5. **Build notes** + cross-link into `00-MOC.md`.

## Verification
- **Content:** a non-coder read-through of Week-01 produces zero unexplained jargon; every
  new term has an everyday picture. No ME analogies remain in the slice.
- **SRS:** Obsidian → "Spaced Repetition: Review flashcards" → Week-01 cards reveal + grade;
  due count shows in MOC.
- **Web slice:** `npm run dev` → Week-01 page loads, restaurant viz scrubs request→response,
  inline cards work, NASA styling intact; screenshots via the `/browse` skill. `npm run
  build` produces a deployable static bundle.
- **Style guide:** a second concept (e.g. "runtime") can be drafted using only the guide,
  proving it's reusable for propagation.

## Notes / Risks
- Community-plugin install is a manual click in Obsidian (network-gated); I scaffold config
  + content, user enables.
- Two predict-then-peek surfaces (inline web + Obsidian SRS) share card *content* from the
  style-guide map — author once, render twice; avoid drift.
- Propagation to Weeks 02–10 + full glossary/mental-models is an explicit **later** pass,
  out of scope for this slice.

---

# EXPANSION — Distribute as a deployable learning app (PWA)

## Context (this expansion)

Today the work is a pile of folders + `npm run dev` — not something a student can use. A learner
won't install Node, run a dev server, or configure Obsidian. This milestone turns the
`Interactive-Viz` page into a real **single-page web app** students reach at **one URL**, and
makes the **web app the single source of truth** (the Obsidian vault drops out of the pipeline
and becomes private author scratch — this also kills the earlier card-drift debt).

### Locked decisions
- **Product:** one deployed static web-app URL. No login, no backend. Progress in `localStorage`.
- **Source of truth:** the web app repo (vault retired from the pipeline).
- **v1 includes:** in-app spaced-repetition, searchable glossary, progress + streak, **PWA**.
- **Name:** placeholder "Code Literacy" (rename later).
- **Design:** extend the approved `nasa-technical-manual` system (no fresh consultation).
- **Tech:** vanilla TS + a tiny hash router (framework-free; the app stays readable as a
  teaching artifact and small to ship).

## Architecture — SPA shell

Refactor `Interactive-Viz/` from one Week-1 page into an app shell.

- **Router** (`src/router.ts`): hash routes — `#/` home · `#/weeks` course map ·
  `#/week/01..10` · `#/glossary` · `#/review`. Renders into one `#app` root; shared header/nav.
- **Content model** (single source): `src/content/weeks/weekNN.ts` each exports
  `WeekData { meta, lessons[], cards[], resources[], glossaryTerms[] }`. A lesson references an
  interactive widget by id through a **registry** (`src/content/registry.ts`) so custom viz plug
  in. Week-1's widgets (`restaurant.ts`, `fileTree.ts`, `errorWindows.ts`, `codeBlock.ts`,
  `cards.ts`, `resources.ts`) are reused as-is — `cards.ts`/`resources.ts` already take data.
- **Glossary** (`src/content/glossary.ts`): central term list ported from vault `06-Glossary`
  (plain words + everyday picture + real code). Glossary page = searchable/filterable.
- **SRS engine** (`src/srs.ts`): SM-2-lite scheduling over every week's cards; state in
  `localStorage`. Review page (`#/review`) surfaces due cards as predict-then-peek →
  reveal → grade (again/good/easy).
- **Progress store** (`src/store.ts`): `localStorage` — lessons/weeks completed, streak,
  last-visited. Course map draws a progress ring per week; home shows "continue where you left
  off".
- **PWA** (`vite-plugin-pwa`): `manifest` (name, icons, theme `#FC3D21` on paper) + service
  worker (offline cache) → installable / add-to-home-screen.

## Pages (all within nasa-technical-manual)
- **Home** (`src/pages/home.ts`): what this is, "start / continue", week-1-of-10 framing.
- **Course map** (`src/pages/courseMap.ts`): 10 week cards w/ progress rings; all open
  (not gated).
- **Week** (`src/pages/week.ts`): renders the tabbed lessons from `WeekData` (00 Start →
  lessons → Read more) — the current Week-1 layout, now data-driven.
- **Glossary** (`src/pages/glossary.ts`): searchable terms.
- **Review** (`src/pages/review.ts`): the SRS session.

## Deploy
- `git init` → push to GitHub → connect **Cloudflare Pages** (free, fast; Netlify is an equal
  alt). Build `npm run build` → `dist/`. Custom domain later. Document steps in `Build-Notes.md`.

## Build order
1. App shell: `#app`, router, shared header/nav, **Home** + **Course map** (progress-aware).
2. **Week renderer** from `WeekData`; migrate Week-1 into `content/weeks/week01.ts` (no visual
   change vs today).
3. **Progress store** → completion toggles, course-map rings, streak, "continue".
4. **In-app SRS** engine + **Review** page (seed with Week-1 cards).
5. **Glossary** page (port Week-1 terms first; rest as weeks land) + search.
6. **PWA**: manifest, icons, service worker; verify installable.
7. **Deploy** to Cloudflare Pages; verify live URL on a phone.

## Verification
- `npm run build` clean; `npm run preview` → every route loads, no console errors.
- Reload persists progress + SRS state (localStorage).
- SRS: due cards appear, grading reschedules them.
- Glossary search filters; terms cross-link.
- Lighthouse: PWA installable check passes; works offline after first load.
- Deployed URL opens on mobile; "Add to Home Screen" works.

## YAGNI (explicitly out)
- No accounts, no backend, no multi-user, no CMS, no analytics. Add only if real students ask.

## Risk / note
- Vault stops being student-facing. Keep it as personal notes, or generate it from the app
  later — but it is **no longer the source of truth**; the app is.
- Migration must be behavior-preserving for Week 1 (same lessons, widgets, reading tab) — verify
  against current screenshots before/after.

---

# EXPANSION — Finish all of Week 01 (3 layers + picture→code bridge)

## Context (this expansion)

Lesson 1 (client/server restaurant) is built and verified. But Week 01 in the curriculum has
**three** parallel layers, and only Layer 1 (mental pictures) is done. This pass finishes the
other two and upgrades the teaching style:

- **Layer 2 — Code Reading** (missing): what a file/folder is; the shape of a project folder
  (`src/`, `public/`, `node_modules/`·`.venv/`, `package.json`·`requirements.txt`); the
  **entry point in practice** (which file runs first); a gentle **print vs return**.
- **Layer 3 — Debugging** (missing): **where errors actually show up** — the terminal window
  vs the browser console (two different windows); reading a plain error *message* (not stack
  traces — those are Weeks 3/6).

**New teaching rule (user direction):** every concept now bridges **picture → real code**.
Show the everyday picture, then the same idea in 4–6 lines of *real syntax*, annotated line
by line back to the picture. Pace is **ELI10**, not ELI5 — move faster, stay concrete, don't
fear showing actual code. This becomes a permanent Style-Guide rule and Lesson 1 is
retrofitted to it (a real `fetch()` snippet = placing the order).

## Deliverable A — Style Guide upgrade (do first; governs the rest)

Edit `Code-Literacy-Vault/Analogy-Style-Guide.md`:
- Add **Rule 8 — Picture, then the real code.** Each concept pairs its everyday picture with
  a tiny real snippet (Python or JS/TS), every line annotated back to the picture.
- Re-pitch the voice from **ELI5 → ELI10**: faster, one tight picture + real code per concept,
  less hand-holding prose.
- Extend the concept→picture map with the new Week-01 terms (file, folder, src, node_modules,
  package.json, terminal, browser console, print vs return), each with its picture + the code
  shape it shows up as.

## Deliverable B — Web slice: tabs + 2 new interactive widgets

Refactor `Interactive-Viz/` from one page into **3 tabbed lessons** (one URL):

- `src/tabs.ts` (new) — tab switching; lazy-init each lesson so the Three.js scene only starts
  when Lesson 1 is shown.
- `src/codeBlock.ts` (new) — small helper that renders an annotated code snippet (real syntax +
  per-line "this is the order" callouts) in the NASA style. Reused by all lessons.
- **Lesson 1 — Restaurant** (existing `restaurant.ts`): add a `codeBlock` showing a real
  `fetch()` request → `response.json()`, mapped to order → food.
- **Lesson 2 — Files & the front door** (`src/fileTree.ts`, new): a clickable mini Vite/Python
  project tree. Click a file → plain-English "what this is" (src = your stuff, node_modules =
  installed parts don't touch, package.json = the parts label). Predict-then-peek: "which file
  runs **first**?" → reveal the entry point (`index.html → src/main.ts`). Includes a
  `codeBlock` of a real `package.json` and a `print vs return` snippet.
- **Lesson 3 — Where errors show up** (`src/errorWindows.ts`, new): two panes — a **terminal**
  showing a real Python `NameError: name 'order' is not defined`, and a **browser console**
  showing a real JS `Uncaught TypeError: ... is not a function`. Toggle a bug; the matching red
  line appears in the **correct window**; click it → plain-English "what it says / which window
  / which side (kitchen vs dining room)."
- Update `index.html` (tab bar + 3 panels + code-block slots), `src/main.ts` (wire tabs, lazy
  init), `src/style.css` (tabs, `.code-block`, `.file-tree`, `.error-window`, keep NASA theme).

Each lesson stays **tight**: one picture + real code + one interaction + 2–3 cards.

## Deliverable C — Vault content (ELI10 + code)

- **New glossary terms** (`06-Glossary/*.md`, each = plain words + everyday picture + tiny real
  code + "where you'll meet it"): `file`, `folder`, `source-folder` (src), `package-json`,
  `terminal`, `browser-console`, `print-vs-return`. Rewrite existing `node-modules.md` to the
  ELI10 "installed parts" voice.
- **New notes:** `02-Code-Reading/Week-01-Whats-In-This-Folder.md` and
  `03-Debugging/Week-01-Where-Errors-Show-Up.md` (ELI10, with real code). Light ELI10 touch-up
  to `02-Code-Reading/Reading-Strategy.md`.
- Update `05-Weeks/Week-01-What-Is-This-Thing.md`: add Lesson 2 + Lesson 3 sections, new term
  links, the print-vs-return note, and point "Try it" at all three tabs.

## Deliverable D — Expand SRS deck

Extend `09-Drills/Week-01-Drills.md` with cards for: src vs node_modules, what package.json is,
which file runs first, print vs return, "error in terminal vs browser console — which window?",
reading a plain error message.

## Build order
1. Style Guide upgrade (Rule 8 + ELI10 + map).
2. Web slice refactor to tabs + `codeBlock`; retrofit Lesson 1 snippet.
3. Lesson 2 file-tree widget. 4. Lesson 3 error-windows widget.
4. Vault glossary + 2 notes + Week-01 note update.
5. Expand SRS deck. 6. Re-verify + screenshots.

## Verification (this expansion)
- `npm run build` clean; `npm run dev` → all 3 tabs load, no console errors.
- Lesson 2: clicking files explains them; "which runs first?" reveals the entry point.
- Lesson 3: toggling a bug prints the right error in the right window; click decodes it.
- Each lesson shows a **real code snippet** annotated to its picture.
- Mobile (375px) reflows; tabs usable. Screenshots via `/browse`.
- A non-coder can still follow it, and now also recognizes the *shape* of real code.
