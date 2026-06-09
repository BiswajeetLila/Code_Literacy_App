# FRESH-AGENT-HANDOFF

## Status

complete

## Use When

Use this template whenever a fresh agent needs to continue the project without hidden chat context.
It is required for Module 10 and remains useful after the course as the operational memory surface
for the project.

A good handoff tells the next agent what the project is, how to run it, what is risky, what is
allowed, and what the next safe task is.

## Before You Fill This

Have these inputs ready:

- current build status
- run path and build path
- architecture docs
- current agent rules
- known issues and risks
- current release package notes
- next intended task

Do not fill this from memory if the repo docs disagree. Resolve the disagreement first.

## Fillable Template

Copy this into the learner project as `docs/FRESH-AGENT-HANDOFF.md`.

### Project Goal

- Game/project name:
- Current milestone:
- What counts as success right now:

### Current Build Status

- Latest known good build:
- Build path:
- Last launch check:
- Known build blockers:

### How To Run

- Preferred run path:
- Required scenes or entry points:
- Required input mode:
- Quick smoke steps:

### How To Build

- Unity version:
- Build target:
- Build profile or settings path:
- Output folder:
- Repro notes path:

### Architecture Summary

- Core gameplay loop:
- Key scenes:
- Key systems:
- Key docs to read first:

### Agent Rules

- Safe operations:
- Human-review-only operations:
- Destructive or risky operations to avoid:
- Package/install approval rule:

### Current Risks

| Risk | Impact | Mitigation | Blocks Release |
|---|---|---|---|
|  |  |  | yes / no |
|  |  |  | yes / no |
|  |  |  | yes / no |

### Next Safe Task

- One concrete next task:
- Why it is safe:
- What evidence should be produced:

### Do Not Do

-
-
-

### Verification Required

- Required before merge:
- Required before packaging:
- Required before changing scope:

## Worked Example

Game: Signal Keeper.

### Project Goal

- Game/project name: Signal Keeper
- Current milestone: Steam-demo candidate package prep
- What counts as success right now: Windows build launches, package docs are complete, and a fresh
  agent can continue without chat history

### Current Build Status

- Latest known good build: `signal-keeper-pre-demo-10`
- Build path: `Builds/Windows/SignalKeeper/`
- Last launch check: 2026-06-10 outside editor, launch and restart passed
- Known build blockers: none for course package, Steamworks upload not configured

### How To Run

- Preferred run path: launch `SignalKeeper.exe` from the Windows build folder
- Required scenes or entry points: title -> tutorial room -> challenge room
- Required input mode: keyboard/mouse supported, controller optional
- Quick smoke steps: start run, rotate node, trigger overload once, restart, quit cleanly

### How To Build

- Unity version: 6.3 LTS
- Build target: Windows x64
- Build profile or settings path: see `docs/release/BUILD-NOTES.md`
- Output folder: `Builds/Windows/SignalKeeper/`
- Repro notes path: `docs/release/BUILD-NOTES.md`

### Architecture Summary

- Core gameplay loop: route signals under timer pressure
- Key scenes: title, tutorial room, challenge room, smoke scene
- Key systems: routing logic, fail/restart, UI feedback, validators, asset ledger
- Key docs to read first: `VERTICAL-SLICE-SPEC.md`, `UNITY-ARCHITECTURE.md`, `QA-PLAN.md`,
  `STEAM-DEMO-CANDIDATE-CHECKLIST.md`

### Agent Rules

- Safe operations: docs edits, validator runs, checklist updates, review-note updates
- Human-review-only operations: taste changes, final copy tone, risky asset swaps, destructive Unity
  edits
- Destructive or risky operations to avoid: package installs, bulk asset rewrites, scene mutation
  without review path
- Package/install approval rule: ask before package installs or external tooling changes

### Current Risks

| Risk | Impact | Mitigation | Blocks Release |
|---|---|---|---|
| restart prompt is still slightly low-emphasis | medium | revisit only if fresh-player confusion returns | no |
| screenshot set includes one placeholder background shot | medium | replace before external sharing | yes |
| Steamworks upload path is unconfigured | low for course / high for actual store | keep as optional extension | no |

### Next Safe Task

- One concrete next task: replace placeholder screenshot candidate with an honest in-build capture
- Why it is safe: packaging honesty improvement, no gameplay mutation
- What evidence should be produced: updated screenshot shot list and capture note

### Do Not Do

- do not change core gameplay rules without rerunning QA and playtest checks
- do not mark Steamworks upload complete from prep notes alone
- do not remove known issues to make the package look cleaner

### Verification Required

- Required before merge: run smoke path and update evidence note
- Required before packaging: confirm build launch, checklist, known issues, and disclosure prep
- Required before changing scope: review cut plan and module 9 clarity evidence

## Required Fields

The filled handoff must include:

- project goal
- current build status
- how to run
- how to build
- architecture summary
- agent rules
- current risks
- next safe task
- do-not-do list
- verification required

The handoff must name one concrete next task and one concrete verification expectation.

## Reject If Missing

Reject the handoff if any are true:

- Project goal is blank.
- Current build status is blank.
- Run path is blank.
- Build path or build notes path is blank.
- Agent rules are missing.
- Risks are missing.
- Next safe task is vague.
- Do-not-do list is blank.
- Verification requirements are blank.
- The handoff depends on hidden chat context to make sense.

Mandatory spec-stage reject checks are not applicable to this template as spec-stage checks because
`FRESH-AGENT-HANDOFF.md` is an operational continuity template, not a concept/spec approval
template.

## Reviewer Notes

Review the handoff by pretending you are the next agent:

- Can you explain the project goal after reading it once?
- Can you find the build and run it?
- Can you identify one safe next task?
- Can you tell what not to touch?
- Reject handoffs that sound comprehensive but still require chat history to act safely.
