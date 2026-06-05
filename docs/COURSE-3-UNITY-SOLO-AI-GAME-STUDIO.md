---
tags: [status/final, meta, build-spec, course-3]
aliases: [Unity Solo AI Game Studio, Course 3 Plan]
---

# Course 3: Unity Solo AI Game Studio

## Summary

Course 3 is a hardcore, preflight-gated studio course where one person ships a
**Steam-demo candidate Unity vertical slice** by directing AI agents as a replacement for much of a
small game team's production workflow.

This course does **not** promise that agents magically handle the hardest parts of game creation.
It teaches the learner to use agents where they are strongest, while the human owns taste, feel,
scope, final creative judgment, and visual direction.

Locked decisions:

- **Audience:** open application, gated admission. Anyone can apply; only gate-ready learners enter
  the studio track.
- **Cadence:** 10 production modules. Hardcore default delivery is 5 weeks at 2 modules/week;
  slower delivery can run as 10 weeks at 1 module/week.
- **Game model:** learner-owned game, constrained by a scope rubric rather than fixed archetypes.
- **Default format:** 2D Unity game encouraged by default; 3D allowed only with a heavier risk and
  cut plan.
- **Asset strategy:** hybrid AI + Asset Store/free packs + hand-authored edits, tracked in a
  commercial-use asset ledger.
- **Shipping target:** Steam-demo candidate package. Actual Steamworks upload is optional.
- **Default engine:** Unity 6.3 LTS for production-lock stability; URP default unless the game has
  a clear reason not to use it.

Core promise:

By the end, the learner can act as creative director, producer, gameplay engineer, tools engineer,
technical artist, QA lead, and release manager. Agents accelerate logic, tooling, tests, build
systems, documentation, review, and production management. The human owns taste, feel, camera,
scene composition, final art direction, and scope calls.

## Adopted CEO Review Changes

This revision incorporates the Course 3 CEO review with these decisions:

- Keep the studio ambition and assessment rigor.
- Replace generic "agents do most execution work" with a precise human-vs-agent ownership model.
- Resolve "open enrollment + hard preflight" by making the product open-application and
  preflight-gated.
- Add cohort operations: cadence, capacity, critique, grading, and adversarial assessment.
- Rename the capstone target from loose "Steam-ready" to **Steam-demo candidate package**.
- Add Steam AI-content disclosure and commercial asset-legality gates.
- Encourage 2D as the default solo+agent path; allow 3D with stricter risk controls.
- Add time budgets and cut triggers so the course levels learners up fast without hiding scope
  failure until the end.

## Course Architecture

Use a **studio production format**, not a lecture-first format.

Each module ships real production artifacts:

- Unity project changes.
- Agent prompts and specs.
- Reviewable diffs.
- Playable builds or test scenes.
- QA evidence.
- Design decisions.
- Release assets.

The governing loop is:

`Intent -> Spec -> Prototype -> Delegate -> Integrate -> Verify -> Polish -> Package`

Course 1 teaches code literacy. Course 2 teaches broad agentic engineering. Course 3 applies that
skill to a Unity production pipeline.

Course 3 is not required to use the Course 1 interactive PWA delivery model. Its "interaction" is
the production loop itself: real agent runs, real diffs, real Unity scenes, real builds, real
playtests, and real critique. The Course 1 app can later host templates, checklists, and progress
gates, but the primary product is a studio course.

The policy/procedure split is recorded in
[`course-3/NORMALIZATION.md`](course-3/NORMALIZATION.md). Operational docs live in
[`course-3/`](course-3/README.md), modules conform to the
[`Teachable-Unit schema`](course-3/schemas/teachable-unit-schema.md), and templates conform to the
[`Runnable-Template schema`](course-3/schemas/runnable-template-schema.md).

Each course app is a sibling folder at the repository root. Course 1 uses `Interactive-Viz/`.
Course 3 reserves `course-3-app/`, but this docs-first pass does not create that folder.

## Human Vs Agent Ownership

The course must teach what to delegate and what not to delegate.

High-leverage agent work:

- C# gameplay logic and refactors.
- Test scaffolds and Unity Test Framework coverage.
- Editor tooling, validators, import checks, and debug overlays.
- Build automation and release checklists.
- Documentation, specs, task graphs, review checklists, and postmortems.
- Bug reproduction, log analysis, and regression planning.
- Asset organization, naming, import settings, and ledger maintenance.

Human-owned work:

- Core game taste and player fantasy.
- Feel, timing, camera, hit feedback, readability, and pacing.
- Final scene composition and art direction.
- Scope cuts and priority calls.
- Legal/commercial judgment on assets and disclosure.
- Final pass/fail judgment on whether the game is fun enough to show.

Low-leverage or risky agent work:

- Blind scene wiring in the Unity editor.
- Prefab graph edits without validation.
- Shader/VFX polish without human art direction.
- Animation, camera, and feel tuning without playtest loops.
- MCP/editor automation that modifies scenes or assets without explicit review.

Unity MCP/editor automation is a power tool, not a default. It must be validated in Module 1 on a
throwaway test scene. If it cannot perform safe, reviewable edits, the course uses it only for
read-only inspection or cuts it from production workflows.

## Cohort Operations

Default hardcore delivery:

- **Length:** 5 weeks.
- **Pace:** 2 modules/week.
- **Expected workload:** 18-30 focused hours/week.
- **Live sessions:** 2 per week: production briefing and critique/review.
- **Async work:** agent runs, Unity implementation, playtests, build logs, and template updates.
- **Capacity:** 12-18 learners per instructor; add one reviewer/TA for every additional 6-8
  learners.

Slower delivery:

- **Length:** 10 weeks.
- **Pace:** 1 module/week.
- **Expected workload:** 10-16 focused hours/week.

Required staff roles:

- **Studio lead:** owns course pacing, scope cuts, creative bar, and final pass/fail.
- **Technical reviewer:** reviews Unity architecture, tests, build gates, and agent safety.
- **Playtest/review support:** can be the studio lead in small cohorts; separate for larger cohorts.

Review cadence:

- Every module ends with a submitted artifact and gate evidence.
- Modules 3, 5, 8, and 10 require live or recorded defense.
- Capstone includes an adversarial assessment and a fresh-agent continuation test.

Grading model:

- Pass/fail gates per module.
- A learner who misses a gate gets one resubmission window.
- A learner who misses two consecutive gates must cut scope before continuing.
- A learner whose project cannot produce a playable build by Module 5 moves to a recovery track.

## Preflight Gate

Course 3 is not casual open enrollment. It is open application with a hard placement gate.

Placement outcomes:

- **Studio-ready:** starts Module 1.
- **Bridge-required:** completes the pre-course bridge and retests.
- **Not ready:** routed to Course 1/Course 2 foundations or a separate Unity basics course.

Preflight checks:

- Can read a basic C# script and identify `Start`, `Update`, fields, methods, and components.
- Can explain GameObject, Component, Prefab, Scene, Inspector, Console, and Play Mode.
- Can use git branches, inspect diffs, revert or repair a bad change, and explain what changed.
- Can explain `Plan -> Execute -> Verify` and use a coding agent in plan/review mode.
- Can run Unity, enter Play Mode, inspect Console errors, and build a Windows player.
- Can write a short bug report with reproduction steps, expected behavior, actual behavior, and
  evidence.

Bridge pack:

- A real 1-2 week pre-course, not a few lightweight labs.
- Covers Unity orientation, C# reading, git recovery, agent diff review, build troubleshooting, and
  prefab/scene basics.
- Ends with the same preflight retest.

## Scope Policy

The course optimizes for fast level-up through hard constraints.

Default recommended path:

- 2D Unity vertical slice.
- One core loop.
- One main environment.
- One player character/controller.
- One enemy, hazard, puzzle, or challenge family.
- One progression layer.
- 5-15 minutes of demo play.

Allowed by default:

- Single-player.
- Local-only save or progress state if needed.
- One level, arena, route, room chain, or compact map.
- Placeholder-friendly art direction.
- Keyboard/mouse plus optional controller support.

Disallowed by default:

- Multiplayer.
- Open world.
- Live service.
- Large RPG questing.
- Large inventory/economy systems.
- Large dialogue trees.
- Procedural generation as the main product.
- Complex AI companion systems.
- Full cinematic pipelines.

3D is allowed only if the learner accepts the 3D tax:

- Heavier camera/feel burden.
- Larger asset and animation burden.
- More scene composition risk.
- More performance risk.
- Mandatory cut plan before approval.

Exception policy:

- Any exception requires a written cut plan that names what gets removed if the project slips.
- If a slice exceeds its time budget by more than 20% for two modules, the cut plan is activated.
- If the game is not fun with greybox art, more art is not allowed to hide the problem.

## Time Budget

The course is designed to force rapid leveling through production pressure.

| Module | Default Budget | Hardcore Gate |
|---|---:|---|
| Preflight bridge, if needed | 10-20 hours | Pass placement retest |
| 1. Solo Studio Operating System | 8-12 hours | Safe agent-ready Unity repo |
| 2. Game Concept To Vertical Slice Spec | 8-12 hours | Implementable slice spec |
| 3. Prototype Tournament | 12-18 hours | Chosen playable prototype |
| 4. Unity Architecture For Agent Teams | 8-14 hours | Reviewer can enforce architecture |
| 5. Parallel Gameplay Production | 12-20 hours | Two integrated gameplay slices |
| 6. Hybrid Asset And Technical Art Pipeline | 10-18 hours | Legally tracked asset pipeline |
| 7. Editor Automation And Tooling | 8-14 hours | Validators catch common failures |
| 8. Verification For Games | 10-16 hours | Broken core behavior is caught |
| 9. Polish, Feel, UX, And Player Clarity | 12-20 hours | New player understands the loop |
| 10. Steam-Demo Candidate Package | 8-14 hours | Release package and defense ready |

Cut triggers:

- No playable prototype by the end of Module 3: reduce game scope immediately.
- No integrated vertical-slice spine by the end of Module 5: remove secondary systems.
- No passing smoke/build gate by Module 8: freeze features.
- No clear player understanding by Module 9: cut polish tasks and fix onboarding.

## Module Plan

### 1. Solo Studio Operating System

Objective:

Set up the production environment so agents can safely work inside Unity without wrecking the
project.

Build:

- Unity 6.3 LTS project using URP unless there is a clear reason not to.
- Git repo with Unity `.gitignore`, branch rules, and source-control hygiene.
- `AGENTS.md` / `CLAUDE.md` with Unity-specific rules.
- Agent roles: director, producer, gameplay engineer, tools engineer, technical artist, QA, build
  engineer, reviewer.
- Approval policy for package installs, MCP/editor automation, generated assets, and destructive
  Unity operations.
- Throwaway Unity MCP/editor automation safety test.

Gate:

A fresh agent session can read the repo rules and correctly explain how to make a safe Unity change.
Unity automation is either validated for tightly scoped use or explicitly cut.

### 2. Game Concept To Vertical Slice Spec

Objective:

Turn a fuzzy game idea into a production-grade vertical slice.

Build:

- One-page game thesis.
- 5-15 minute demo loop.
- Player fantasy.
- Core mechanic.
- 3C definition: character, camera, controls.
- Win/loss or success/failure condition.
- Scope budget.
- Asset budget.
- Technical risk register.
- Human-vs-agent delegation map.
- Steam-demo candidate definition.

Scope rubric:

- Allowed: one core loop, one main environment, one player character/controller, one
  enemy/system/challenge family, one progression layer.
- Disallowed by default: multiplayer, open world, live service, large RPG questing, procedural
  generation as the main product, complex economy, large dialogue trees, large inventory systems.
- Any exception needs a cut plan showing what will be removed if it slips.

Gate:

Another agent could implement the first playable prototype from the spec without asking what the
game is.

### 3. Prototype Tournament

Objective:

Use agents for creative breadth, then apply human taste and production judgment.

Build:

- 3-5 tiny playable prototypes.
- Each prototype tests one loop, not a full game.
- Scoring sheet for feel, novelty, feasibility, asset burden, extensibility, and risk.
- Kill memo for rejected prototypes.
- Chosen prototype with revision notes.

Gate:

The chosen prototype is playable in under 60 seconds from launch and proves the core loop with
greybox or placeholder assets.

### 4. Unity Architecture For Agent Teams

Objective:

Create a project shape agents can extend without turning it into tangled scene logic.

Build:

- Scene map.
- Prefab rules.
- ScriptableObject data rules.
- Input system policy.
- Event/channel policy.
- UI architecture.
- Save/progress policy if needed.
- Folder conventions.
- Assembly/test structure.
- "Do not touch" boundaries for agents.

Gate:

A reviewer agent can inspect a new feature and tell whether it fits the architecture.

### 5. Parallel Gameplay Production

Objective:

Run multiple agents like a small production team without creating integration chaos.

Build:

- Task graph by feature slice.
- Worktree/branch strategy.
- Gameplay feature pipeline: spec -> implementation -> test scene -> review -> integration.
- Agent role prompts for gameplay, UI, systems, tools, QA, and review.
- Integration checklist.

Gate:

At least two independent gameplay slices are built in parallel and integrated without unreviewable
merge chaos. If integration becomes opaque, reduce parallelism.

### 6. Hybrid Asset And Technical Art Pipeline

Objective:

Build a repeatable art/audio pipeline that one person can direct and legally ship.

Build:

- Style bible.
- Asset source ledger with license, commercial-use, attribution, redistribution, and AI-disclosure
  fields.
- AI asset workflow for concepts, textures, icons, placeholders, and iteration.
- Asset Store/free-pack workflow for production-ready pieces.
- Import settings rules.
- Naming conventions.
- Animation/VFX/audio placeholder policy.
- Technical-art review checklist.

Gate:

A new asset can be generated or sourced, imported, validated, documented, and used in-game without
breaking style, provenance, disclosure, or commercial-use clarity.

### 7. Editor Automation And Tooling

Objective:

Replace repetitive Unity production work with tools and validators.

Build:

- Editor tools for common setup tasks.
- Scene validator.
- Prefab validator.
- Missing-reference scanner.
- Build profile setup.
- Debug overlay.
- One-click smoke scene launcher.
- Optional Unity MCP/editor bridge with strict approval rules.

Gate:

The project catches common Unity production mistakes before a human playtest.

### 8. Verification For Games

Objective:

Build verification systems that fit games, not only web apps.

Build:

- Unity Test Framework edit mode tests for pure logic and tooling.
- Play mode tests for critical gameplay behavior.
- Smoke test scene.
- Build verification checklist.
- Performance budget.
- Controller/keyboard input checks.
- Playtest script.
- Bug report template.
- Regression checklist for agents.

Gate:

A broken core mechanic, failed build, missing reference, obvious performance regression, or packaging
failure is caught before release packaging.

### 9. Polish, Feel, UX, And Player Clarity

Objective:

Use agents for tuning suggestions, but keep human taste in charge.

Build:

- Feel pass: timing, camera, hit feedback, movement, readability.
- Onboarding pass.
- Menu/pause/settings pass.
- Accessibility basics.
- Audio/VFX feedback pass.
- Difficulty and pacing pass.
- Screenshot/trailer capture staging.

Gate:

A new player can understand the goal, controls, feedback, and failure state without developer
explanation. If the game is unclear, no more content may be added until clarity is fixed.

### 10. Steam-Demo Candidate Package And Maintenance

Objective:

Package the vertical slice like a real demo candidate without pretending every learner has completed
Steamworks account-side setup.

Build:

- Windows build.
- Build profile.
- Release branch.
- Demo README.
- Known issues.
- Architecture handoff.
- Store copy draft.
- Screenshot set.
- Trailer shot list.
- Steamworks checklist.
- Steam Content Survey prep, including AI-content disclosure.
- Asset legality/disclosure ledger.
- Post-release maintenance plan.
- Fresh-agent continuation test.

Gate:

The output is a Steam-demo candidate package. If the learner chooses to do actual Steamworks upload,
the extension path covers demo App ID, depots, SteamPipe upload, Content Survey, review checklist,
and release configuration.

## Steam-Demo Candidate Definition

The required capstone package includes:

- Playable Windows build.
- Build profile and reproducible build notes.
- Store-page copy draft.
- Screenshot set and trailer shot list.
- Demo README and known-issues file.
- Asset ledger with commercial-use and AI-disclosure fields.
- Content Survey prep notes.
- Steamworks upload checklist.
- Fresh-agent handoff.

The required capstone package does **not** require:

- Steam Direct fee payment.
- Steamworks account completion.
- Actual App ID creation.
- Depot upload.
- Store review submission.

Optional Steamworks extension:

- Create main app/demo app records as needed.
- Configure depots and packages.
- Upload via SteamPipe.
- Complete Content Survey.
- Add Steam Input/Cloud/achievements only if the game needs them.
- Submit store/build review when legally and commercially ready.

## AI And Asset Compliance

This course is not legal advice, but it must teach commercial discipline.

The asset ledger must track:

- Asset name and in-project path.
- Source URL or generator/tool.
- Creator/vendor.
- License.
- Commercial use allowed: yes/no/conditions.
- Redistribution restrictions.
- Attribution required.
- Proof file or receipt.
- AI-generated: yes/no.
- Player-consumed AI content: yes/no.
- Steam AI disclosure required: yes/no.
- Store/marketing use allowed: yes/no/conditions.
- Replacement plan if the asset becomes legally risky.

Steam Content Survey prep must separate:

- AI used only for behind-the-scenes efficiency.
- Pre-generated AI content that ships and is consumed by players.
- Live-generated AI content, if any.
- Guardrails for live-generated content, if any.

If a learner cannot document an asset's commercial use status, that asset cannot ship in the final
package.

## Course Artifacts / Interfaces

The course should provide these reusable templates:

- `GAME-THESIS.md`
- `VERTICAL-SLICE-SPEC.md`
- `AGENT-ROLES.md`
- `UNITY-ARCHITECTURE.md`
- `TASK-GRAPH.md`
- `STYLE-BIBLE.md`
- `ASSET-LEDGER.md`
- `QA-PLAN.md`
- `PLAYTEST-RUBRIC.md`
- `STEAM-DEMO-CANDIDATE-CHECKLIST.md`
- `FRESH-AGENT-HANDOFF.md`
- `CUT-PLAN.md`

The course also provides these operational interfaces:

- `COHORT-OPS.md`
- `PREFLIGHT-GATE.md`
- `NORMALIZATION.md`
- `README.md`

These are the course's real "APIs." Agents and humans both work through them.

## Assessment

A graduate passes only if they produce:

- A playable 5-15 minute Unity vertical slice.
- A Windows Steam-demo candidate package.
- A documented architecture.
- A scoped design spec.
- A human-vs-agent delegation map.
- A hybrid asset ledger with commercial-use and AI-disclosure fields.
- Passing build/smoke checks.
- Human playtest notes.
- Store-page copy and screenshot/trailer plan.
- A fresh-agent handoff that works.
- A defense of major creative, technical, legal/commercial, and scope decisions.

Adversarial assessment scenarios:

- Agent introduces a fake Unity package.
- Agent breaks a prefab reference.
- Agent edits generated/cache files.
- Agent adds an unscoped feature.
- Agent changes input/camera behavior without updating the spec.
- Agent imports an asset without provenance or commercial-use clarity.
- Agent uses AI-generated player-consumed content without marking disclosure.
- Build passes locally but fails release packaging.
- Fresh agent cannot continue because project memory is undocumented.

## Self-Review Status

This revision has been self-reviewed against:

- The Course 3 CEO review.
- The goal: one person replacing a small Unity game team's production workflow.
- Fast level-up: hardcore pace, time budgets, and cut triggers are explicit.
- Open-application risk: handled with a gate and real bridge, not lowered standards.
- Agent leverage reality: human-owned vs agent-owned work is explicit.
- Scope collapse risk: handled with 2D default, 3D tax, and cut plans.
- Agent chaos risk: handled with roles, task graph, architecture docs, and integration gates.
- Unity production risk: handled with tests, validators, build profiles, smoke scenes, and playtest
  rubrics.
- Shipping realism: final gate is a Steam-demo candidate package, with actual Steamworks upload as
  an optional extension.
- AI/commercial asset risk: handled with disclosure and asset-legality fields.

## Assumptions And Sources

Assumptions:

- Course 3 is advanced and preflight-gated.
- Unity 6.3 LTS is the default engine target.
- URP is the default renderer unless a specific game requires otherwise.
- 2D is the recommended default for solo+agent speed; 3D is allowed with stricter risk controls.
- Unity MCP/editor automation is optional until validated.
- Actual Steamworks upload is optional because account/payment/legal readiness varies by learner.

Sources used:

- [Unity 6 release support](https://unity.com/releases/release-overview)
- [Unity 6.3 LTS release page](https://unity.com/releases/unity-6)
- [Unity 6.3 LTS announcement](https://unity.com/blog/unity-6-3-lts-is-now-available)
- [Unity Build Automation](https://docs.unity.com/devops/en/manual/unity-build-automation)
- [Unity Test Framework](https://docs.unity.cn/Manual/com.unity.test-framework.html)
- [Steamworks demos documentation](https://partner.steamgames.com/doc/store/application/demos)
- [SteamPipe upload documentation](https://partner.steamgames.com/doc/sdk/uploading)
- [Steamworks Content Survey](https://partner.steamgames.com/doc/gettingstarted/contentsurvey)
- [MCP Unity registry entry](https://github.com/mcp/coplaydev/unity-mcp)
