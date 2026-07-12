---
tags: [status/final, meta, build-spec, course-1]
aliases: [Code Literacy Final Spec, Course 1 Spec]
---

# Course 1 — Code Literacy — FINAL Content Map & Agent Execution Brief

This is the canonical, finalized spec for Course 1. It supersedes earlier drafts
(`WEEKS-02-10-CONTENT-MAP.md`). It contains two things:

1. **Part I — The finalized week-by-week content map** (Weeks 1–11).
2. **Part II — The execution brief** you hand to your coding agent (Claude Code / Codex) to
   build the remaining weeks against the existing app.

**Source of truth:** the web app (`Interactive-Viz/`), not the retired Obsidian vault.
**Style contract:** `CONTENT-GUIDE.md` (ELI10, one everyday picture per concept, picture→real
code, every tab earns its click). **Build patterns:** `INTERACTIVE-COURSE-BUILDER.md`.
**Design standard:** `docs/adr/0001-interactive-lab-design-standard.md` (NASA technical-manual
shell + dark instrument labs).

---

## The end-goal metric (what every week serves)

Per `CONTENT-GUIDE.md`, a graduate can do four things. Treat these as the only success metric:

1. **READ** AI-generated code — locate the entry point, follow a value, name a function's contract.
2. **SMELL** when it's bad — spot a made-up import, a deleted line of state, a missing `await`.
3. **DEBUG** it — read a stack trace, triage the layer, fix from the error not by re-prompting.
4. **STEER** the AI — review a diff like a senior, write a one-shot bug report, talk architecture.

The whole course converges on **Week 8 (catch the bad diff)** and graduates into **Week 11
(write the spec the agent builds from)** — the bridge to Course 2.

---

# PART I — Finalized Content Map (Weeks 1–11)

Each week is one `src/content/weeks/weekNN.ts` exporting
`WeekData { meta, lessons[], cards[], resources[], glossaryTerms[] }`. Lessons reference widgets
by id through `src/content/registry.ts`.

> **Rule for every week:** ELI10 · one everyday picture per concept (everyday = everyone's day:
> kitchens, mail, documents, light switches, phone calls, to-do lists — NOT trades/hobbies) ·
> picture → 4–6 lines of real code annotated back to the picture · every lab passes the
> 20-second rule and the static-article test · 3D only when motion/space teaches the model.

---

## Week 01 — "What is this thing on my screen?"  ·  Capability: READ (foundation) — ✅ BUILT
Already built to the quality bar. **Do not rebuild.** It defines the standard for the rest:
Round Trip Lab, Project Folder Lab, Error Routing Lab. Use it as the reference for density,
interaction, accessibility, and code-bridge quality.

Concepts: client/server, frontend/backend, runtime, the cloud, entry point, repo, file/folder,
`src`/`node_modules`, `package.json`, terminal vs browser console, print vs return.

---

## Week 02 — "What does this project need before it can run?"  ·  Capability: SMELL
Concepts: dependency (deeper), version range/semver (`^`,`~`), lockfile, dev-dependency,
hallucinated import, slopsquatting.
Pictures: version range = "any 2-point-something carton of milk, not a 3.0 one"; lockfile = the
receipt of exact items bought; dev-dependency = the mixing bowl you don't serve; hallucinated
import = a shopping-list item no store sells; slopsquat = a knock-off named one letter off.
Labs:
- **2.1 Shopping List & Receipt (2D)** — `package.json` beside lockfile; toggle `^`/`~`/exact,
  see which versions match. Predict-then-peek: "which versions install?" Real code: real
  `package.json` lines.
- **2.2 Spot the Fake (2D, payoff)** — sort imports into Real / Made-up / Knock-off
  (`requests` vs `reqests`); feedback reveals truth + "search the registry to check."
Glossary: `version-range`, `lockfile`, `dev-dependency`, `hallucinated-import`, `slopsquatting`.
SRS: "`^1.2.3` — will `1.3.0` install? ?? Yes." · "`import reqests` — real or fake? ?? Knock-off."

## Week 03 — "Recipes that take what you give them"  ·  Capability: READ
Concepts: function, parameter vs argument, return value, default value, scope.
Picture: a recipe card — ingredients in (params), steps (body), dish handed back (return); scope
= what's on your counter vs the whole pantry.
Labs:
- **3.1 Recipe Card (2D)** — change arguments, the returned dish updates. Predict-then-peek:
  "given these inputs, what comes out?"
- **3.2 Trace the Value (2D/scrub)** — follow one value through two nested calls; out-of-scope
  names grey out. Real code: real Python + TS function annotated.
Glossary: `function`, `parameter`, `argument`, `return-value`, `default-value`, `scope`.

## Week 04 — "Where did this number on screen come from?"  ·  Capability: READ + DEBUG
Concepts: variable, state, props, data flow, module/import.
Picture: a parcel handed desk to desk through a building; state = a whiteboard in a room.
Labs:
- **4.1 Follow the Parcel (3D — flow earns it)** — value enters at top, handed down to screen;
  click a screen element → its path back lights up; rotate/zoom to inspect. Predict-then-peek:
  "which desk does it reach last?"
- **4.2 The Whiteboard (2D)** — click changes state, screen redraws; teaches "the screen is a
  picture of state, not the source of truth." Real code: real `useState` lines.
Glossary: `variable`, `state`, `props`, `data-flow`, `module`.

## Week 05 — "Ordering from a menu" (APIs in depth)  ·  Capability: READ + DEBUG
Concepts: API, endpoint, HTTP verb (GET/POST), status code, JSON, header, API key/auth.
Picture: menu = endpoints; order = request; dish = response; bill verdict = status code
(200/404/401/500); JSON = the order ticket; API key = membership card.
Labs:
- **5.1 The Menu (2D, break-and-decode)** — pick endpoint + GET/POST, send, see JSON; toggle bad
  key → 401, wrong endpoint → 404, server fail → 500; each decodes to plain English + "your side
  or theirs."
- **5.2 Read the Ticket (2D, click-to-inspect)** — click a JSON key → "this is the model link,"
  trace to UI. Real code: real `fetch()` with headers + `await res.json()`, and `requests.post()`.
Glossary: `api`, `endpoint`, `http-verb`, `status-code`, `json`, `header`, `api-key`.
> **Checkpoint:** if flying, consider merging Weeks 9–10; if stack traces scare them, slow before W6.

## Week 06 — "Reading the note that says what went wrong"  ·  Capability: DEBUG (core)
Concepts: stack trace/traceback, your-code vs library-code, three layers of failure
(frontend/backend/config).
Picture: stack trace = a phone-tree record (A called B called C, C broke); your code = your
handwriting vs the printed form; three layers = lights won't turn on: bulb / wiring / fuse box.
Labs:
- **6.1 The Phone Tree (3D — a stack you rotate; prototype the 2D indented-list version first
  and only go 3D if it teaches better)** — click each frame → "this file called that"; your-code
  frame glows. Predict-then-peek: "which line is the real bug?"
- **6.2 Three Fuse Boxes (2D, sort)** — drop symptoms into Frontend / Backend / Config.
Glossary: `stack-trace`, `traceback`, `library-code`, `layer-triage`.

## Week 07 — "Undo, and going back to an earlier save"  ·  Capability: READ + STEER
Concepts: commit, branch, merge, diff, pull request. Picture: document version history (the
"see version history" panel) — commit = a named save; branch = a safe copy to try something
risky; merge = folding two people's edits together; diff = track-changes (green added/red removed).
Labs:
- **7.1 Version History (2D, scrub)** — scrub commits, branch off, merge back; document text
  changes per save point.
- **7.2 Read the Diff (2D, predict)** — real `git diff` with +/−/`@@`; click a hunk; decode.
  Predict-then-peek: "is this change safe, or does it quietly delete something?" (sets up W8).
Glossary: `commit`, `branch`, `merge`, `diff`, `pull-request`.

## Week 08 — "Checking the AI's work before you say yes"  ·  Capability: SMELL + STEER ★ PAYOFF
**Reframe (do this):** explicitly name the arc — vibe coding → agentic coding → spec-driven
development — and tell the learner that this week IS the **Verify** step of the Plan→Execute→Verify
loop, the human-verifier role the whole industry is converging on.
Concepts: the agentic loop (look→plan→change→save), plan mode, diff review, the five failure
modes, a project-rules file (`CLAUDE.md`/`AGENTS.md`), writing a good bug report.
Picture: track-changes / suggested edits — accept or reject each; plan mode = "show me all your
suggested edits before changing anything"; rules file = house rules pinned on the fridge.
Labs:
- **8.1 Approve or Reject (2D, centerpiece)** — real Claude-style diffs, one per card, some with a
  planted problem (made-up package, deleted state line, missing `await`); learner approves/rejects
  + picks the reason; feedback reveals what it would have broken. Every prior week feeds a
  recognizable failure here.
- **8.2 Build the Bug Report (2D, build-up)** — assemble error text + what changed + expected vs
  actual; drop the noise; graded against the three-part shape.
Glossary: `plan-mode`, `diff-review`, `failure-mode`, `claude-md`, `agents-md`, `bug-report`.

## Week 09 — "When the kitchen has many cooks"  ·  Capability: READ + SMELL + DEBUG
Concepts: synchronous vs asynchronous, `await`, promise, race condition, idempotency, retry.
Picture: a coffee shop — sync = finish each drink before starting the next; async = start your
espresso, serve others while it brews; `await` = "wait here until this drink is ready"; promise =
the buzzer; race = two orders for the last croissant; idempotency = pressing the lift button twice.
Labs:
- **9.1 The Coffee Shop (2D timeline)** — toggle sync/async, watch completion order.
  Predict-then-peek: "what order do drinks come out?"
- **9.2 The Last Croissant (2D, break-and-fix)** — two requests race; show bug; add `await`/lock;
  show fix. Real code: the missing-`await` line before/after.
Glossary: `synchronous`, `asynchronous`, `await`, `promise`, `race-condition`, `idempotency`.

## Week 10 — "Talking about the whole system, not just one file"  ·  Capability: STEER (capstone)
**Reframe (do this):** frame architecture conversations as the steering half of agentic
engineering — directing structure, not lines.
Concepts: separation of concerns, the layers (screen→logic→data→outside services), deploy, the
full round trip at system scale.
Picture: a restaurant as a whole business — front of house / kitchen / pantry & suppliers /
the building; separation of concerns = the waiter doesn't cook, the cook doesn't take payment.
Labs:
- **10.1 The Whole Building (3D — capstone; extends W1's Round Trip)** — cutaway of screen→API→
  data→external; trace one user action through and back; rotate/zoom/click each layer.
- **10.2 Rearrange the Kitchen (2D, sort)** — drag responsibilities to the right layer; feedback
  explains why mixing them causes bugs.
Glossary: `separation-of-concerns`, `layer`, `deploy`, `architecture`.

## Week 11 — "The spec is the prompt" (NEW — SDD capstone, bridge to Course 2)  ·  Capability: STEER+
The graduation move: once you can read, smell, debug, and steer, the next leverage is **writing the
specification the agent builds against** instead of prompting and praying.
Concepts: spec-driven development (SDD), spec as source of truth, the six parts of a good spec
(outcome, scope, constraints, prior decisions, task breakdown, verification), `CLAUDE.md`/
`AGENTS.md` as standing rules, plan-review gate.
Picture: a renovation brief — you write down exactly what "done" means and how it'll be checked,
*then* the builder builds; the brief, not your verbal nudging, is what they work from.
Labs:
- **11.1 Vague vs Spec (2D, compare)** — same task as a one-line prompt vs a six-part spec; predict
  which produces drift; reveal two real agent outcomes side by side.
- **11.2 Write the Brief (2D, build-up)** — assemble a real spec from parts; a checklist grades
  whether each of the six elements is present and testable.
Glossary: `spec-driven-development`, `spec`, `verification-criteria`, `plan-review-gate`.
> Self-reflective note for the learner: the very app they're using was built from a spec
> (`PROJECT-PLAN.md` + `CONTENT-GUIDE.md`). They've been inside an SDD artifact the whole time.

---

## Per-week "done" checklist (applies to every weekNN.ts)
1. `00 Start` states what the week teaches and what the learner will DO.
2. 2–3 lessons; each = one everyday picture · one primary action · one feedback/reveal · one
   predict-then-peek · one annotated real-code snippet.
3. Passes the 20-second rule and the static-article test.
4. 3D only where motion/space teaches (W4 routing, W6 stack, W10 cutaway); else 2D.
5. Every new concept added to the concept→picture map in `CONTENT-GUIDE.md`.
6. FAQ covers word-blockers; Read-more links go AFTER the interaction.
7. SRS cards seeded for the week.
8. Accessibility: keyboard focus, live status text, 375px mobile no-overflow, reduced-motion path.

---

# PART II — Execution Brief for the Coding Agent

Hand this section (Part II) to Claude Code or Codex. It is written as a spec, on purpose — you are
practicing the thing Week 11 teaches.

## Context
- **Repo:** the existing `Interactive-Viz/` SPA (vanilla TS + tiny hash router + Three.js +
  in-app SRS + PWA). Single source of truth. NASA technical-manual design system.
- **You are extending, not redesigning.** Week 1 is the locked quality bar. Match it; do not
  restyle the shell or change the design system.
- **Read first, in this order:** `CONTENT-GUIDE.md`, `INTERACTIVE-COURSE-BUILDER.md`,
  `docs/adr/0001-interactive-lab-design-standard.md`, the existing `src/content/weeks/week01.ts`,
  and `src/content/registry.ts`. Then read Part I of THIS file for the week you're building.

## Locked decisions (do not relitigate)
- No accounts, no backend, no analytics. Progress in `localStorage`.
- Framework-free TS so the app stays readable as a teaching artifact.
- ELI10 voice, best-fit everyday pictures, picture→real-code on every concept.
- One deployable static bundle; PWA installable.

## Content-model contract
- Each week exports `WeekData { meta, lessons[], cards[], resources[], glossaryTerms[] }` from
  `src/content/weeks/weekNN.ts`.
- A lesson references its interactive widget by **id** via `src/content/registry.ts`. New widgets
  register there; reuse `codeBlock.ts`, `cards.ts`, `resources.ts` as-is.
- Glossary terms are added to the central `src/content/glossary.ts` (plain words + everyday
  picture + real code + "where you'll meet it").
- SRS cards are added to the week's `cards[]`; the SM-2-lite engine schedules them.

## Build order (NOT week order — this is deliberate)
1. **Week 08 first** (right after Week 1). It's the payoff and reveals which earlier concepts
   actually matter. Build it rough, ship it, then trim Weeks 2–7 to exactly what W8 needs.
2. Then **Weeks 02 → 07** in order (they plant the failure modes W8 tests).
3. Then **Week 09**, **Week 10**, **Week 11**.

## Per-week procedure (repeat for each weekNN)
1. Create a branch `codex/week-NN-content`. One week per branch, one PR per week.
2. Build the `weekNN.ts` data object per Part I: meta, 2–3 lessons, cards, resources, glossary.
3. Build any new widget in its own file (`src/<widgetName>.ts`), register it, lazy-init so 3D
   scenes only start when their tab is shown.
4. For each lesson, include the annotated real-code snippet via `codeBlock.ts`.
5. Add the week's glossary terms to `glossary.ts` and the concept→picture rows to
   `CONTENT-GUIDE.md`.
6. Run the verification gate below. Capture before/after screenshots at 375px and desktop.
7. Open the PR with a plain-English summary of every lesson and every widget added.

## Verification gate (must pass before a PR is "done")
- `npm run build` clean; `npm run preview` → every route loads, **zero console errors**.
- All lesson tabs load; each has a working primary action, a feedback/reveal, and a
  predict-then-peek.
- Each lesson shows a real code snippet annotated to its picture.
- 375px mobile reflows with no horizontal overflow; keyboard focus visible; reduced-motion path
  works; live status text present for changing captions/logs.
- Reload persists progress + SRS state; due SRS cards appear and reschedule on grade.
- A non-coder read-through produces zero unexplained jargon.

## Guardrails — do NOT
- Do not introduce a frontend framework, a backend, or browser-storage beyond `localStorage`.
- Do not add 3D for decoration; if the flat 2D version teaches as well, ship 2D.
- Do not let any lesson become a readable-as-static-article page — if it would survive as prose,
  it isn't interactive enough.
- Do not change the NASA shell, the router, or Week 1.
- Do not stack multiple analogies on one concept, and do not use trade/hobby analogies.

## Suggested Claude Code setup for this build
- **CLAUDE.md** at repo root with: the locked decisions, the content-model contract, the
  per-week "done" checklist, and "match Week 1; never restyle the shell." (Keep < 200 lines;
  import the long checklists.)
- **A `content-lint` hook** (PreToolUse or post-edit) that fails if a new lesson has no registered
  widget id, or a glossary term is missing its real-code field.
- **A `lesson-builder` skill** encoding the per-week procedure so each week is one invocation.
- **A `reviewer` subagent** that reads a finished `weekNN.ts` against `CONTENT-GUIDE.md` and the
  done-checklist and returns a pass/fail with reasons — in its own context, so it doesn't pollute
  the build session.
