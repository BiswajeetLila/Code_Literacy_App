---
tags: [status/review, meta, ceo-review, course-2]
aliases: [Course 2 CEO Review, Agentic Builder Stress Test]
reviews: COURSE-2-WORLDCLASS-AGENTIC-BUILDER.md
posture: HOLD SCOPE (rigor)
---

# CEO Review — Course 2: Worldclass Agentic Builder

A founder-mode stress-test of `COURSE-2-WORLDCLASS-AGENTIC-BUILDER.md`. Posture: **HOLD SCOPE** —
accept the course's ambition, find every failure mode, flag cuts as findings. This is a
holes-and-risks teardown plus a prioritized fix backlog. It does **not** modify the course doc.

> Reviewed in silo. Course 3 has its own separate review (`COURSE-3-CEO-REVIEW.md`); nothing here
> depends on it except one explicitly-marked overlap finding.

---

## The system this course must fit (baseline)

Course 1 locked an unusually precise standard. Course 2 is measured against it:

- **`CONTENT-GUIDE.md`** — ELI10 voice, one everyday picture per concept, picture→real-code, and
  the core belief: **interaction is the teaching engine; prose only supports it.** A lesson that
  survives as a static article "is not interactive enough."
- **`INTERACTIVE-COURSE-BUILDER.md`** — the portable builder loop (picture → action → feedback →
  prediction → real artifact → vocabulary). It explicitly claims this one format ports to *any*
  topic ("football, guitar, cooking, finance").
- **`docs/adr/0001-interactive-lab-design-standard.md`** — manual shell + instrument labs; 3D only
  when it teaches; accessibility mandatory.
- **`COURSE-1-CODE-LITERACY-FINAL.md`** — the delivery contract: each week is a
  `weekNN.ts { meta, lessons[], cards[], resources[], glossaryTerms[] }` data object, widgets
  registered by id, in-app SM-2-lite SRS, a per-week "done" checklist, a verification gate, a
  deliberate build order, and a full execution brief handed to a coding agent.

Course 1 is a self-paced **interactive web app (PWA)**: framework-free TS, NASA-manual shell,
localStorage, zero-knowledge audience, no humans in the loop, ~$0 marginal cost per student.

---

## What Course 2 is

A revision memo that re-pitches Course 2 from "learn Claude Code and Codex" to **"learn to be the
technical director of AI labor."** Ten conceptual modules (Calibration → Agentic OS → Spec →
Context → Task Graphs → Verification → Tools → Debugging → Creative Synthesis → Shipping/Ops).
Capstone: ship one novel artifact that would normally need a small team, behind hard final gates.

## Verdict

**Strong thesis, not yet a plan.** The ambition is right and the module *arc* is genuinely good.
But as a build spec it is missing almost everything Course 1 has — delivery format, entry gate,
per-module structure, scope bound, assessment, and a maintenance model. As written it reads like
the passive outline the project's own `CONTENT-GUIDE` forbids. Keep the ambition; fix the
structural gaps; cut one overlapping module.

## Premise challenge

- **Right problem?** Yes. "Be the technical director of AI labor" is more durable than "learn
  these two tools," and it's the correct sequel to Course 1's STEER capability. Keep it.
- **Most direct path?** Unknowable, because the path is undefined. The promise ("run a frontier
  agentic workflow… while writing little code by hand") is an *outcome*; the doc never says how a
  learner is taken there — what they do, in what surface, graded how.
- **Do nothing?** The thesis is timely (fast tool churn; the human-verifier role consolidating).
  But "timely" is exactly why an undefined, un-versioned plan is dangerous: it dates fast.

## Consistency audit vs the locked system

| Dimension | Course 1 (standard) | Course 2 (as written) | Verdict |
|---|---|---|---|
| Delivery format | Exact `weekNN.ts` contract + widgets + SRS | None specified | **CRITICAL GAP** |
| Teaching mode | Interaction-first (rule 6) | Passive module outline | **CRITICAL GAP** |
| Entry requirements | Zero-knowledge, no gate needed | "Already shipped vibe apps" — unbridged | **CRITICAL GAP** |
| Per-unit structure | Objective/lessons/gate/checklist | One-line module blurbs | **WARNING** |
| Assessment | Per-week done-checklist + verification gate | Capstone gates only | **WARNING** |
| Versioning/currency | Durable concepts, low churn | Tool-specific, high churn, no plan | **WARNING** |
| Self-contained spec | FINAL doc supersedes drafts | Revision memo referencing an absent "original" | **WARNING** |

## Holes & inconsistencies

**H1 — No delivery format. CRITICAL GAP.**
Course 1 ships a precise contract (`weekNN.ts`, widget registry, SRS, done-checklist, verification
gate). Course 2 specifies none of it — no statement of whether this is interactive-app content, a
real-project apprenticeship with the app as companion, a cohort, or something else. Until decided,
every other section is unanchored, and the course violates `CONTENT-GUIDE` rule 6 ("interaction is
the core lesson") and the builder's core belief ("not a library of readings").
*Fix: pick and document the delivery model. Most likely answer — C2 is a guided real-project
apprenticeship and the app becomes the companion that holds specs, checklists, verification gates,
and run-log review (reuse the artifact/SRS spine, drop the "tiny widget" framing).*

**H2 — Entry gap: no bridge from Course 1, no preflight. CRITICAL GAP.**
C2 assumes a learner "who has already shipped vibe-coded apps." But Course 1 graduates a
zero-knowledge person who can READ/SMELL/DEBUG/STEER — not necessarily someone who has shipped
anything. The C1-exit state and the C2-entry assumption don't match, and there's no gate to close
it. (Course 3 has a preflight gate; Course 2 has nothing.)
*Fix: define a preflight/bridge, or redefine the audience to exactly equal Course 1's graduate.*

**H3 — Tool-churn with no currency/maintenance plan. WARNING.**
The course is built on Claude Code + Codex specifics: MCP, hooks, skills, plugins, model routing,
worktrees. These churn on a months-scale cadence. Course 1 teaches durable concepts (functions,
APIs, git) with low churn; Course 2 is high-churn by nature. The doc says "transferable primitive"
but never separates the durable layer from the tool-surface layer, so a model/CLI update forces a
course-wide rewrite.
*Fix: structure every module as `durable primitive` (stable) + `current SOTA surface` (swappable
appendix). Updates then localize to the appendix.*

**H4 — No per-module structure. WARNING.**
Course 3's modules each have Objective / Build list / Gate / Artifacts. Course 2's modules are
one-line descriptions — no module gates, no artifact templates, no per-module "done." This is the
biggest gap in *executability*.
*Fix: give every module the C3 treatment — objective, concrete build deliverables, a pass/fail
gate, and named template artifacts.*

**H5 — Unbounded scope. WARNING (HOLD-mode cut flag).**
Module 9 alone spans apps, automations, games, simulations, generated media, 3D/game engines,
browser/computer use. The full course implies competence across ~10 specialist domains. There is
no scope budget and no "disallowed by default" list — the exact discipline Course 3 *does* have.
Without it, C2 is a 6-week course or a 2-year course depending on who reads it.
*Fix: add a scope budget and an explicit out-of-scope list. Pick 2–3 capstone artifact archetypes
instead of "anything."*

**H6 — Overlap with Course 3. WARNING.**
Module 9 ("Creative Synthesis") includes games and 3D/game engines; Module 7 lists
"Blender/Godot/Unity" as agent tools. Course 3 is an entire course on exactly this (Unity). The
boundary ("C2 broad, C3 deep Unity") is defensible but C2's own text muddies it.
*Fix: cut game-engine/3D production from C2 Module 9 (or reduce it to a single creative-breadth
demo) and route all game-production depth to Course 3. Resolves the overlap and shrinks H5 at once.*

**H7 — It's a revision memo, not a standalone spec. WARNING.**
The doc opens "Your correction is right…" and repeatedly references "the original plan" without
including it ("Keep its thesis and most primitives, but raise the bar"). A coding agent or a new
author cannot build from this alone.
*Fix: fold the original plan in and rewrite as a single self-contained build spec, the way
`COURSE-1-CODE-LITERACY-FINAL.md` supersedes its drafts.*

**H8 — No assessment model. WARNING.**
The capstone gates are great, but there's no per-module assessment and no rubric/scoring. Course 3
has both (plus adversarial scenarios). For a course this ambitious, "you'll know it when the
capstone passes" is too coarse — learners need checkpoints.
*Fix: add a per-module gate (from H4) and a capstone rubric.*

### Credit (HOLD includes naming what's right)

- The upgraded loop `Discover → Spec → Delegate → Integrate → Verify → Ship → Maintain` is a clean
  superset of Course 1's `Plan → Execute → Verify`. Good continuity.
- The capstone final-gate list ("fresh agent can extend it," "survives an adversarial review pass,"
  "human can defend every decision") is the strongest, most concrete part of the doc.
- "Frame every tool lesson as a transferable primitive" is the right instinct — it just isn't
  operationalized yet (H3).

## Stress test (adversarial — does the plan survive?)

| Scenario | Survives? |
|---|---|
| A Course 1 grad enrolls the next day | **No** — entry gap (H2); they may never have shipped an app. |
| Vendor ships a breaking CLI/model change mid-course | **No** — no currency layer (H3); content silently rots. |
| A coding agent is handed this doc to build the course | **No** — no delivery format, no per-module spec (H1, H4, H7). |
| Two learners dispute whether a capstone "counts" | **No** — no rubric (H8). |
| One learner picks "media," another "full-stack app" | **Partly** — capstone allows it, but no scope budget = wildly unequal difficulty (H5). |
| Prospective student asks "how is this different from Course 3?" | **Weakly** — Module 7/9 overlap (H6). |

## The crux (why H1/H7 matter most)

Course 1 and Course 2 are **different products wearing one "Course N" label.**

```
ESTABLISHED SYSTEM (Course 1)          COURSE 2 (as written)
-----------------------------          ---------------------
self-paced web app / PWA               real-world apprenticeship
tiny ELI10 predict-then-peek labs      real repos, agent runs, real deploys, postmortems
weekNN.ts widgets + in-app SRS         (no delivery-format spec at all)
zero-knowledge, no human in loop       "already shipped apps"
infinite scale, ~$0 / student          1:1 self-directed
        |                                       |
        +--- ONE delivery system --------------X
             (CONTENT-GUIDE + builder + ADR)    no mapping, no documented pivot
```

`INTERACTIVE-COURSE-BUILDER.md` claims the interactive-app format is the through-line for every
course. Course 2 doesn't honor it and doesn't say why. So exactly one of these is true, and both
are holes: **(a)** the delivery model silently pivoted (undocumented strategic break), or **(b)**
C2 is still meant to live in the app and completely fails to spec how hands-on work maps to
predict-then-peek widgets. Decide this once and most P1 fixes fall out of it.

## Scope verdict (HOLD)

Hold the *thesis and arc*. Flag two cuts: **(1)** remove game-engine/3D production from Module 9 →
Course 3 (H6); **(2)** bound the capstone to a small set of archetypes (H5). Everything else is
additive structure, not scope reduction.

## Prioritized fix backlog

- **P1 (blocks everything):** H1 delivery format · H2 entry gate/bridge · H4 per-module structure ·
  H7 convert memo → standalone spec.
- **P2 (before build):** H3 durable/tool-surface split · H5 scope budget + out-of-scope list ·
  H6 cut C2/C3 overlap · H8 assessment rubric.
- **P3 (polish):** name the 2–3 capstone archetypes; add a "six weeks later" maintainability test to
  the capstone (mirrors C3's maintenance gate).

## Dream-state delta

12-month ideal: a learner exits able to direct an agent team to ship real artifacts, with durable
judgment that survives tool churn. This plan points at that state but has no road surface yet. The
fixes above are mostly *structure* (format + per-module spec + bound), not new ambition — the good
news is the vision is sound and only the scaffolding is missing.

## Failure-modes registry (the P1s, in one view)

| Hole | Failure mode | Currently caught? | Learner/author sees | Fix lands in |
|---|---|---|---|---|
| H1 | Course can't be built or delivered | No | Nothing — silent | Build spec |
| H2 | Wrong-level learner enrolls, drowns | No | Mid-course attrition | Preflight/bridge |
| H4 | Modules can't be executed or graded | No | "What do I actually build?" | Per-module spec |
| H7 | Agent/author can't build from the doc | No | Stalls at module 1 | Standalone rewrite |

## Sources (external facts referenced)

No external facts were load-bearing for this course's findings; all holes are internal-consistency
against the locked Course 1 system. (Course 3's review verifies Unity and Steam facts.)
