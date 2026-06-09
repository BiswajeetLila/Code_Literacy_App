# QA-PLAN

## Status

complete

## Use When

Use this template in Module 8 and keep it current through the final demo-candidate pass. This plan
turns game verification into a repeatable workflow: smoke checks, edit mode tests, play mode tests,
build verification, performance budget, input checks, regression review, and known risks all live
in one surface.

This template is not a promise of exhaustive coverage. It is a practical control document for a
small game project.

## Before You Fill This

Have these inputs ready:

- current playable vertical slice
- current tool and validator runbook from Module 7
- target build platform, at minimum Windows
- known core mechanic, fail state, and smoke path
- current performance concerns
- supported input modes
- known recurring bugs or flaky areas
- current cut plan

If the project is changing every hour, freeze the slice enough to verify one stable loop before
filling the rest of this plan.

## Fillable Template

Copy this into the learner project as `docs/QA-PLAN.md`.

### Scope Snapshot

- Build under test:
- Slice/version:
- Platforms covered:
- Primary reviewer:
- Last updated:
- Packaging blocker threshold:

### Smoke Test

- Launch path:
- Scene or entry point:
- Critical actions to perform:
- Expected success signals:
- Immediate failure conditions:
- Evidence to capture:

### Edit Mode Tests

| Target | Why Edit Mode | Command / Run Path | Pass Condition | Failure Evidence |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

### Play Mode Tests

| Target | Why Play Mode | Command / Run Path | Pass Condition | Failure Evidence |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

If a check cannot be reliably automated, replace `Command / Run Path` with a deterministic manual
script and say why.

### Build Verification

- Target build:
- Build settings or profile path:
- Output folder:
- Required scenes included:
- Required files present:
- Launch verification steps:
- Acceptable warnings:
- Blocking warnings/errors:
- Packaging-specific checks:

### Performance Budget

- Target hardware class:
- Target frame rate or frame time:
- Measurement scene:
- Capture method:
- Acceptable spike threshold:
- Hard fail threshold:
- Known performance hotspots:

### Input Checks

| Input Mode | Critical Actions | Pass Condition | Failure Evidence |
|---|---|---|---|
| Keyboard / mouse |  |  |  |
| Controller |  |  |  |
| Other supported input |  |  |  |

If an input mode is not supported, say so explicitly.

### Regression Checklist

- [ ] Smoke path still works.
- [ ] Core mechanic still works.
- [ ] Win/loss or success/failure state still works.
- [ ] Pause/restart or equivalent recovery path still works.
- [ ] Required UI feedback still appears.
- [ ] Build verification still passes.
- [ ] No new missing references or broken prefab wiring.
- [ ] Performance remains within the current budget.
- [ ] Known blockers are unchanged or reduced.

### Known Risks

| Risk | Impact | Likelihood | Current Mitigation | Blocks Packaging |
|---|---|---|---|---|
|  |  |  |  | yes / no |
|  |  |  |  | yes / no |
|  |  |  |  | yes / no |

### Bug Intake Path

- Bug report location:
- Required fields:
- Severity scale:
- Evidence path convention:
- Who can mark a bug as packaging-blocking:

## Worked Example

Game: Signal Keeper, a 2D signal-routing arcade slice.

### Scope Snapshot

- Build under test: `signal-keeper-pre-demo-08`
- Slice/version: Room 1 tutorial plus overload challenge room
- Platforms covered: Windows
- Primary reviewer: human producer/QA
- Last updated: 2026-06-10
- Packaging blocker threshold: any bug that prevents route completion, scene launch, or readable
  failure feedback

### Smoke Test

- Launch path: Module 7 smoke launcher menu item
- Scene or entry point: `Scenes/Smoke/SignalKeeperSmoke.unity`
- Critical actions to perform: launch, rotate one signal node, route one beam, trigger overload,
  restart
- Expected success signals: beam renders, overload state appears, fail/reset works, no hard lock
- Immediate failure conditions: null reference, missing UI, no input, no restart path
- Evidence to capture: console screenshot plus short run note

### Edit Mode Tests

| Target | Why Edit Mode | Command / Run Path | Pass Condition | Failure Evidence |
|---|---|---|---|---|
| Score calculation | Pure logic | Unity Test Runner edit mode | Stable score math for success/failure states | failing test output |
| Build metadata validator | Tooling logic | Unity Test Runner edit mode | Rejects missing version or output path | failing test output |
| Missing-reference validator rule | Tooling logic | Unity Test Runner edit mode | Flags unassigned serialized field state | failing validator assertion |

### Play Mode Tests

| Target | Why Play Mode | Command / Run Path | Pass Condition | Failure Evidence |
|---|---|---|---|---|
| Overload fail state | Needs runtime scene behavior | Unity Test Runner play mode | Overload triggers fail UI and restart path | failing play mode result |
| Restart after failure | Needs runtime reset | smoke script in play mode | Scene resets without stale timer or beam state | capture plus note |
| Manual beam readability check | feel/readability dependent | deterministic manual script | reviewer can identify active beam and blocker state at gameplay zoom | screenshot and observation note |

### Build Verification

- Target build: Windows x64
- Build settings or profile path: stored project build profile for demo candidate
- Output folder: `Builds/Windows/SignalKeeper/`
- Required scenes included: main menu, tutorial room, challenge room, smoke scene
- Required files present: executable, data folder, README, known issues
- Launch verification steps: launch build, start run, fail once, restart once, quit cleanly
- Acceptable warnings: known non-blocking asset import warning documented in risk table
- Blocking warnings/errors: missing scene, null reference on boot, input dead state
- Packaging-specific checks: build opens outside editor and smoke path still works

### Performance Budget

- Target hardware class: mid-range laptop with integrated graphics
- Target frame rate or frame time: 60 FPS / 16.6 ms target
- Measurement scene: overload challenge room
- Capture method: Unity stats overlay plus timed observation note
- Acceptable spike threshold: brief spikes under 25 ms during overload flash
- Hard fail threshold: repeated spikes above 33 ms during ordinary play
- Known performance hotspots: beam chain redraw and warning pulse VFX

### Input Checks

| Input Mode | Critical Actions | Pass Condition | Failure Evidence |
|---|---|---|---|
| Keyboard / mouse | rotate node, restart, pause | all actions work with visible feedback | screenshot and note |
| Controller | rotate node, confirm, restart | equivalent path works without dead inputs | screenshot and note |
| Other supported input | not supported | explicitly out of scope | plan note |

### Known Risks

| Risk | Impact | Likelihood | Current Mitigation | Blocks Packaging |
|---|---|---|---|---|
| Beam readability drops during overload flash | High | Medium | manual readability check in every regression pass | yes |
| Controller restart prompt text is unclear | Medium | Medium | include in Module 9 clarity pass | no |
| Challenge-room VFX spikes frame time | High | Medium | capture after every VFX change | yes |

### Bug Intake Path

- Bug report location: `docs/bugs/`
- Required fields: repro, expected, actual, severity, build tag, evidence
- Severity scale: blocker / major / minor
- Evidence path convention: `docs/bugs/evidence/<date>-<slug>/`
- Who can mark a bug as packaging-blocking: human producer or QA reviewer

## Required Fields

The filled plan must include:

- scope snapshot
- smoke test
- at least one edit mode target or explicit reason none apply
- at least one play mode target or deterministic manual replacement
- build verification section
- performance budget
- input checks
- regression checklist
- known risks
- bug intake path

The plan must say what counts as a packaging blocker.

## Reject If Missing

Reject the QA plan if any are true:

- Smoke test is blank.
- No edit mode target is listed and no justification is given.
- No play mode target is listed and no deterministic replacement is given.
- Build verification is blank.
- Performance budget is blank.
- Input checks are blank.
- Regression checklist is missing.
- Known risks are missing.
- Bug intake path is missing.
- Packaging blocker threshold is missing.
- The plan says only "test gameplay" or "manual QA" without concrete steps.

Mandatory spec-stage reject checks are not applicable to this template as spec-stage checks because
`QA-PLAN.md` is a verification template, not a concept/spec approval template.

## Reviewer Notes

Review this plan by asking whether another person could run it cold:

- Follow the smoke path.
- Check whether the edit mode and play mode targets are real and appropriate.
- Confirm the build verification section would catch more than compile success.
- Confirm performance budget and input checks match the actual project.
- Reject vague plans that name categories but not run paths or pass conditions.
- Treat missing blocker thresholds or hidden known risks as release-risk failures.
