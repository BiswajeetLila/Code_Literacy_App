---
tags: [status/review, meta, ceo-review, course-3]
aliases: [Course 3 CEO Review, Unity Solo AI Game Studio Stress Test]
reviews: COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md
posture: HOLD SCOPE (rigor)
---

# CEO Review — Course 3: Unity Solo AI Game Studio

A founder-mode stress-test of `COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`. Posture: **HOLD SCOPE** —
accept the course's ambition, find every failure mode, flag cuts as findings. This is a
holes-and-risks teardown plus a prioritized fix backlog. It does **not** modify the course doc.

> Reviewed in silo. Course 2 has its own separate review (`COURSE-2-CEO-REVIEW.md`); nothing here
> depends on it.

---

## The system this course must fit (baseline)

Course 1 locked an unusually precise standard. Course 3 is measured against it:

- **`CONTENT-GUIDE.md`** — ELI10 voice, one everyday picture per concept, picture→real-code, and
  the core belief: **interaction is the teaching engine; prose only supports it.**
- **`INTERACTIVE-COURSE-BUILDER.md`** — the portable builder loop (picture → action → feedback →
  prediction → real artifact → vocabulary), claimed to port to *any* topic.
- **`docs/adr/0001-interactive-lab-design-standard.md`** — manual shell + instrument labs; 3D only
  when it teaches; accessibility mandatory.
- **`COURSE-1-CODE-LITERACY-FINAL.md`** — the delivery contract: `weekNN.ts` data objects,
  widget registry, in-app SM-2-lite SRS, per-week done-checklist, verification gate, build order.

Course 1 is a self-paced **interactive web app (PWA)**: framework-free TS, NASA-manual shell,
localStorage, zero-knowledge audience, no humans in the loop, ~$0 marginal cost per student.

---

## What Course 3 is

An advanced, open-enrollment, 10-module **cohort** studio course. One person ships a **Steam-ready
Unity vertical slice** (5–15 min) by directing AI agents as a replacement for a small game team.
Locked decisions: Unity 6.3 LTS, URP default, hybrid asset strategy with a license ledger,
Steam-ready package (upload optional), hard preflight gate. Ships real artifacts each module;
templates act as the course's "APIs"; assessment includes adversarial scenarios. The author
self-reviewed and posed four explicit product-level questions (answered below).

## Verdict

**The best-specified of the three courses, and the most operationally and technically exposed.**
The internal craft is strong (rubric, gates, adversarial assessment, templates). The risk isn't
sloppiness — it's that the course bets its entire thesis on the one domain where "agents replace a
team" is *weakest*, and it underspecifies the cohort operation and the legal surface of shipping AI
assets commercially. Keep the studio depth; harden the premise and the ops.

## Premise challenge

- **Right problem?** Defensible — "solo dev + agents ships a slice" is a real, aspirational
  outcome. But it picks the **hardest domain for the agentic thesis** (H1): a feature for ambition,
  a bug for feasibility.
- **Most direct path?** The studio-production format is right. The 3D-by-implication default is not
  the most direct path for solo+agents (Q4 — 2D is far more direct).
- **Do nothing?** Real demand exists. The risk is delivering a course whose core promise (agents do
  "most execution work") doesn't hold in Unity's visual, editor-bound reality.

## Consistency audit vs the locked system

| Dimension | Course 1 (standard) | Course 3 (as written) | Verdict |
|---|---|---|---|
| Delivery format | Self-serve interactive web app | Live human-graded cohort | **WARNING** (undocumented different product) |
| Audience gate | None needed (zero-knowledge) | Hard preflight, yet "open enrollment" | **CRITICAL GAP** (contradiction) |
| Ops/cost model | ~$0 marginal, no staff | Implies graders/TAs, undefined | **CRITICAL GAP** |
| Per-module structure | Done-checklist + gate | Objective/Build/Gate/Artifacts — **strong** | **OK-CREDIT** |
| Assessment | Verification gate | Rubric + adversarial scenarios — **strong** | **OK-CREDIT** |
| Engine/tech currency | Durable concepts | Unity 6.3 LTS — **verified correct** | **OK-CREDIT** |

## Holes & inconsistencies

**H1 — The agentic thesis is weakest exactly where this course lives. CRITICAL GAP.**
Coding agents are strong at text-shaped work (web apps, automation, C# *logic*, tests, tooling) and
weak at Unity's visual, editor-bound work: scene wiring, prefab graphs, shader/VFX, animation,
camera/feel tuning, audio mix. The course promises "agents do most execution work," but most of a
game's *execution* is precisely the low-leverage work below:

```
AGENT LEVERAGE BY DOMAIN  ("agents replace a team" thesis)
HIGH | web apps · automation · scripts · CRUD/API · data pipelines   <- where agents shine
 MED | game LOGIC (C# systems) · unit/play-mode tests · editor tools
 LOW | scene wiring · prefab graphs · shaders/VFX · animation ·       <- Course 3's CORE
     | camera & "feel" · audio mix · level layout · visual polish        work lives here
```

The course bets the thesis on the LOW band. Not fatal, but the plan must stop implying agents do
"most" of it and instead teach the human to *own* the visual/feel work while agents own
logic/tests/tooling. The doc already flags the Unity MCP bridge as "optional and dangerous until
validated" — that flag is load-bearing.
*Fix: rewrite the promise to split owned-by-human vs delegated-to-agent explicitly; make "what
agents can't do here" a Module 1 lesson; validate-or-cut the Unity MCP bridge early instead of
carrying it as an optional dangerous appendix.*

**H2 — "Open enrollment + hard preflight gate" is a contradiction. CRITICAL GAP.**
The preflight requires: read a C# script and identify Start/Update/fields/methods/components; use
git branches and recover a bad change; run Unity, enter Play Mode, read Console, build a Windows
player; drive a coding agent in plan/review mode. **That is not a beginner.** The "3–5 short labs"
bridge pack cannot move a true zero from there to gate-pass. So either enrollment isn't really open
(it's gated to intermediate devs), or the bridge pack is a promise it can't keep.
*Fix: pick one. Either (a) rename to "open application, gated admission" and size the bridge
honestly as a multi-week pre-course (a real Course-0), or (b) keep "open" and accept the bridge
becomes that pre-course, not 3–5 labs.*

**H3 — Cohort operations are undefined. CRITICAL GAP.**
"10-module cohort" + "a graduate passes only if they produce…" + human playtest notes + adversarial
assessment + "defense of major decisions" implies **live scheduling, human grading, and staff/TA
labor** — a completely different ops and cost model from Course 1's self-serve PWA. The plan never
says who grades, what the cadence is (weekly? self-paced cohort?), how the adversarial scenarios are
administered/scored, or the per-cohort cost and capacity. This is the biggest *operational* risk and
it's invisible in the doc.
*Fix: specify the ops — graders, cadence, async vs live, capacity per cohort, and how the
adversarial assessment is run and scored. This also decides whether the Course-1 app plays any role.*

**H4 — "Steam-ready" overclaims, and the AI-disclosure gap is concrete. CRITICAL GAP.**
Two problems:
- *Definition drift:* the final gate says output is "ready for Steamworks upload if the learner does
  the account-side work." But real Steam shipping isn't just account-side — it needs Steamworks SDK
  integration, depot/build config, and (for the claimed achievements/save) Platform Toolkit wiring.
  A "Windows build + README + store copy" is a **demo build package**, not Steam-ready in the
  Steamworks sense. (Unity 6.3's new **Platform Toolkit** actually provides achievements/save/account
  APIs — an argument to either use it and *earn* the claim, or drop the claim.)
- *Legal/compliance, verified:* Steam's **Jan 17 2026 AI policy** requires disclosure of
  **pre-generated AI content that ships** (textures, character art, AI voice, LLM-written text).
  Agent-written *code* is an exempt efficiency tool, so the "agents wrote the C#" side is fine — but
  C3's **hybrid AI asset strategy** means nearly every learner's slice triggers a mandatory
  store-page AI disclosure, which `STEAM-READY-CHECKLIST.md` does not mention.
*Fix: define "Steam-ready" precisely (use Platform Toolkit if you keep the achievements claim), add
a mandatory Steam AI-content disclosure step to the checklist, or rename the deliverable to "demo
build package."*

**H5 — Asset legality is treated as documentation, not law. WARNING.**
The license ledger tracks *provenance* ("where did this come from"), which is necessary but not
sufficient. It doesn't resolve *can this asset legally ship in a commercial product*: AI-generated-
asset copyright/ownership is unsettled, and Asset Store / free-pack licenses carry redistribution
and resale restrictions. A provenance row doesn't make a generated texture or a CC-licensed pack
legally shippable on a paid Steam page.
*Fix: add a "commercially shippable? (yes/no/conditions)" legal gate to `ASSET-LEDGER.md`, separate
from provenance — and tie it to H4's disclosure step.*

**H6 — Scope is likely over-ambitious for the cadence; the self-review asks the wrong question.
WARNING (HOLD-mode flag).**
A Steam-ready 5–15 min slice + hybrid art/audio pipeline + edit- and play-mode tests + editor
tooling/validators + polish/feel pass + packaging, solo, in 10 modules. Even with agents that's a
lot — and the low-leverage visual work (H1) is the part agents *don't* compress. The author's
self-review asks "is the scope rubric aggressive enough [at cutting]?" — but there's no per-module
**time/effort budget**, so the real risk is over-ambition against a fixed cadence, not under-cutting.
*Fix: add an hours-per-module budget and pressure-test the 10-module → Steam-ready slice against it;
default to 2D (Q4) to cut the asset/feel ceiling.*

**H7 — Delivery-format inconsistency with the established system. WARNING.**
C3 is a cohort shipping real Unity builds, not predict-then-peek web labs. The
`INTERACTIVE-COURSE-BUILDER` claims one portable format for all courses; C3 doesn't use it and
doesn't say why.

```
ESTABLISHED SYSTEM (Course 1)          COURSE 3 (as written)
-----------------------------          ---------------------
self-paced web app / PWA               live cohort studio, scheduled
tiny ELI10 predict-then-peek labs      real diffs, builds, playtests, human-graded review
infinite scale, ~$0 / student          staff/TA cost per cohort, gated admission
        |                                       |
        +--- ONE delivery system --------------X  different ops model, no app mapping
```

*Fix: state explicitly that C3's "interaction" is the production loop itself (real diffs, builds,
playtests), and decide whether the app holds any of it (templates, gates, QA evidence) or whether
C3 is a separate product. Document the decision.*

### Credit (HOLD includes naming what's right)

- **Unity 6.3 LTS is the correct engine choice — verified.** Released Dec 2025, supported to Dec
  2027, version 6000.3.0f1; Unity officially recommends it for "developers about to lock in
  production." Any preliminary "is this real?" doubt is withdrawn.
- The scope rubric (one core loop / one environment / one character / disallowed defaults /
  exception needs a cut plan) is genuinely good discipline — Course 2 should copy it.
- The adversarial assessment scenarios (fake package, broken prefab ref, edits cache files,
  unscoped feature, asset without provenance, passes locally/fails packaging) directly target real
  agent failure modes. Excellent.
- The preflight-gate *concept* (don't lower standards for open enrollment) is right; only the
  execution is the problem (H2).
- High self-awareness: the doc already flags Unity MCP as "optional and dangerous until validated."

## Stress test (adversarial — does the plan survive?)

| Scenario | Survives? |
|---|---|
| Agent introduces a fake package / breaks a prefab ref / edits cache files | **Yes** — explicit in the adversarial assessment. Strong. |
| A true beginner enrolls via "open enrollment" | **No** — bridge pack can't close the gate gap (H2). |
| Learner needs scene/animation/feel work done by the agent | **No** — low-leverage band; thesis breaks (H1). |
| Learner tries to actually put the slice on Steam | **Partly** — "Steam-ready" overclaims; SDK/depot/disclosure missing (H4). |
| Learner ships AI-generated art on a paid store page | **No** — no disclosure step, no commercial-legality gate (H4, H5). |
| A 30-person cohort submits adversarial assessments for grading | **No** — no grader/ops/capacity model (H3). |
| Slice slips past the 10-module cadence | **Partly** — rubric has a cut-plan rule, but no time budget to detect slip early (H6). |
| Build passes locally, fails release packaging | **Yes** — explicit assessment scenario. Strong. |

## Author's four open questions — answered

1. **Is the preflight gate strict enough for open enrollment?** Wrong frame — the gate is *too*
   strict to coexist with "open." It's the right bar for an intermediate course; it's incompatible
   with the word "open" unless the bridge becomes a real pre-course. Fix the contradiction (H2),
   don't just tighten the gate.
2. **Is the scope rubric aggressive enough?** It's aggressive at *breadth*, silent on *time/effort*
   and on the asset-feasibility ceiling. Add a per-module hours budget and default to 2D. The risk
   is over-ambition, not under-cutting (H6).
3. **Steam-ready package vs mandatory upload?** Keep upload optional (correct — account/payment/
   legal readiness varies, and AI-asset commercial risk is real). But fix the overclaim: define
   "Steam-ready" precisely (incl. Platform Toolkit if you keep achievements) and add the mandatory
   AI-content disclosure (H4). Don't make upload mandatory.
4. **3D only, or allow 2D?** **Allow 2D — and default-encourage it.** Unity 6.3 LTS ships Box2D v3
   (first-class 2D physics), and 2D collapses the highest-cost, lowest-agent-leverage work:
   animation, shaders, 3D asset volume, camera/feel. For solo+agents, 2D is the smarter default and
   directly de-risks H1 and H6. Keep 3D allowed for learners who accept the heavier asset burden
   with a cut plan.

## Scope verdict (HOLD)

Hold the studio depth and the artifact/assessment rigor — they're the best parts. Flag two
*reframes* (not cuts): default to 2D (Q4), and split human-owned vs agent-delegated work honestly
(H1). Flag two *additions* the scope is currently missing: cohort ops (H3) and the legal/disclosure
surface (H4/H5).

## Prioritized fix backlog

- **P1 (blocks ship):** H1 reframe the thesis (human owns feel/visual; validate-or-cut MCP) ·
  H2 resolve open-vs-gate contradiction · H3 define cohort ops & grading · H4 fix "Steam-ready"
  definition + add AI-disclosure step.
- **P2 (before first cohort):** H5 commercial-legality gate in the asset ledger · H6 per-module
  time budget · Q4 make 2D the encouraged default.
- **P3 (polish):** H7 document the delivery-format decision; decide if the Course-1 app holds any
  C3 templates/gates.

## Dream-state delta

12-month ideal: a solo dev reliably ships a legally-clean, genuinely Steam-shippable slice by owning
taste/feel while agents own logic/tests/tooling. This plan is close on craft and far on two axes it
currently doesn't see: the **operational** reality of a graded cohort, and the **legal** reality of
shipping AI assets commercially. Fix the premise framing and those two surfaces and it becomes a
defensible flagship.

## Failure-modes registry (the P1s, in one view)

| Hole | Failure mode | Currently caught? | Learner sees | Fix lands in |
|---|---|---|---|---|
| H1 | Agent can't do the core visual work; promise breaks | Partly (MCP flagged) | Stalls at scene/feel work | Promise rewrite + Module 1 lesson |
| H2 | Under-qualified learner admitted, drowns | No | Mid-cohort attrition | Real bridge / renamed admission |
| H3 | No one to grade; cohort can't run at scale | No | Ungraded submissions, bottleneck | Ops spec |
| H4 | Learner ships, violates Steam AI disclosure | No | Store rejection / takedown risk | Steam-ready checklist update |

## Sources (external facts verified)

- [Unity 6.3 LTS is Now Available](https://unity.com/blog/unity-6-3-lts-is-now-available)
- [Unity 6 Releases & Support (LTS)](https://unity.com/releases/unity-6/support)
- [Steam updates AI disclosure form — PC Gamer](https://www.pcgamer.com/software/ai/steam-updates-ai-disclosure-form-to-specify-that-its-focused-on-ai-generated-content-that-is-consumed-by-players-not-efficiency-tools-used-behind-the-scenes/)
- [Steamworks: AI Content on Steam](https://store.steampowered.com/news/group/4145017/view/3862463747997849618)
