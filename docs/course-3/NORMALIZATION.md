# Course 3 Normalization

## Status

Complete for issue #9.

## Source-Of-Truth Split

The master spec owns policy:

- course promise and audience
- gate language
- cadence and time budgets
- human-vs-agent ownership
- scope policy and cut triggers
- Steam-demo candidate definition
- AI and asset compliance
- assessment standards

Operational docs own procedure:

- how to run the preflight
- how to run a cohort
- how to execute each module
- how to fill templates
- how to review submissions
- how to verify schema conformance

If a policy concept appears in both places, the master spec wins. The operational doc should link
back to the master spec and turn that policy into steps, prompts, checks, or artifacts.

## Gate Language

Use these names exactly:

| Gate | Meaning | Operational surface |
|---|---|---|
| Preflight gate | Admission check before studio pace begins | `PREFLIGHT-GATE.md` |
| Bridge pack retake | Retest after targeted remediation | `BRIDGE-PACK.md`, then `PREFLIGHT-GATE.md` |
| Module gate | Pass/fail bar at the end of a module | `modules/` |
| Capstone gate | Final Steam-demo candidate assessment | `rubrics/CAPSTONE-RUBRIC.md` |
| Adversarial assessment | Failure-mode stress test before pass | `rubrics/ADVERSARIAL-ASSESSMENT.md` |

Placement outcomes are exactly:

- `studio-ready`
- `bridge-required`
- `not-ready`

## Module Titles

Use these titles exactly in the master spec, module docs, and issue titles:

| Module | Title | File |
|---|---|---|
| 1 | Solo Studio Operating System | `modules/MODULE-01-SOLO-STUDIO-OS.md` |
| 2 | Game Concept To Vertical Slice Spec | `modules/MODULE-02-VERTICAL-SLICE-SPEC.md` |
| 3 | Prototype Tournament | `modules/MODULE-03-PROTOTYPE-TOURNAMENT.md` |
| 4 | Unity Architecture For Agent Teams | `modules/MODULE-04-UNITY-ARCHITECTURE.md` |
| 5 | Parallel Gameplay Production | `modules/MODULE-05-PARALLEL-GAMEPLAY-PRODUCTION.md` |
| 6 | Hybrid Asset And Technical Art Pipeline | `modules/MODULE-06-HYBRID-ASSET-PIPELINE.md` |
| 7 | Editor Automation And Tooling | `modules/MODULE-07-EDITOR-AUTOMATION-TOOLING.md` |
| 8 | Verification For Games | `modules/MODULE-08-GAME-VERIFICATION.md` |
| 9 | Polish, Feel, UX, And Player Clarity | `modules/MODULE-09-POLISH-FEEL-UX.md` |
| 10 | Steam-Demo Candidate Package And Maintenance | `modules/MODULE-10-STEAM-DEMO-CANDIDATE.md` |

## Template Names

Use these template names exactly:

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

## Operational Docs

Use these operational docs exactly:

- `README.md`
- `NORMALIZATION.md`
- `PREFLIGHT-GATE.md`
- `BRIDGE-PACK.md`
- `COHORT-OPS.md`

## App Folder Convention

Each course app is a sibling folder at the repository root.

- Course 1 app: `Interactive-Viz/`
- Reserved Course 3 app folder: `course-3-app/`

Issue #9 records the convention only. Do not create `course-3-app/` until a later app
implementation issue explicitly asks for it.
