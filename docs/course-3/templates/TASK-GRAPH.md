# TASK-GRAPH

## Status

complete

## Use When

Use this when Module 5 starts parallel gameplay production. The task graph turns the chosen
prototype and Unity architecture into agent-sized feature slices with explicit ownership,
branch/worktree boundaries, integration order, review evidence, blockers, and cut triggers.

This template is required for Module 5 and should live in the learner project as
`docs/TASK-GRAPH.md`.

## Before You Fill This

Have these inputs ready:

- Filled `GAME-THESIS.md`.
- Filled `VERTICAL-SLICE-SPEC.md`.
- Filled `CUT-PLAN.md`.
- Filled `CHOSEN-PROTOTYPE.md`.
- Filled `UNITY-ARCHITECTURE.md`.
- Module 4 `ARCHITECTURE-FIT-CHECK.md`.
- Module 1 `AGENTS.md` or `CLAUDE.md`.
- Module 1 `AGENT-ROLES.md`.
- Current branch/worktree policy.
- Current build, smoke, or test command.
- Current known blockers and architecture do-not-touch boundaries.

If the architecture cannot tell an agent where a feature belongs, do not create parallel tasks yet.
Repair `UNITY-ARCHITECTURE.md` first.

## Fillable Template

Copy this section into the learner project and fill every blank.

### Milestone Snapshot

| Field | Fill |
|---|---|
| Milestone name |  |
| Date/version |  |
| Vertical-slice spec link |  |
| Unity architecture link |  |
| Chosen prototype link |  |
| Cut-plan link |  |
| Integration owner |  |
| Reviewer owner |  |
| Maximum parallel agents |  |

### Parallelism Policy

State when parallel work is allowed.

| Rule | Decision |
|---|---|
| Maximum active implementation branches/worktrees |  |
| One feature slice per branch/worktree? |  |
| Who may start a parallel task? |  |
| Who may approve integration? |  |
| What stops parallelism? |  |
| What gets cut if integration becomes opaque? |  |

### Branch And Worktree Plan

| Slice | Branch name | Worktree path, if used | Owner agent | Base commit | Merge target | Cleanup rule |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

Rules:

- Each implementation slice gets one branch or worktree.
- Branch names must map to slice names.
- Agents must not share a worktree for simultaneous implementation.
- Integration happens only after review evidence is attached.
- If a branch cannot be reviewed, it is not merged.

### Feature Slices

Each feature slice must be independently reviewable.

| Slice ID | Player-visible outcome | Systems touched | Allowed files/scenes/prefabs | Do-not-touch boundaries | Owner agent | Done condition | Verification |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |

Minimum for Module 5:

- Slice A: first integrated gameplay feature from the chosen prototype.
- Slice B: second independent gameplay feature that can integrate without changing Slice A's
  ownership.

### Slice Brief Template

Create one brief per slice at:

```text
docs/slice-briefs/SLICE-ID.md
```

Use this format:

```markdown
Title: Slice ID Brief

Outcome

- Player-visible outcome:
- Why this belongs in the vertical-slice spec:

Allowed Scope

- Files/folders:
- Scenes:
- Prefabs:
- Data/config:
- UI:
- Tests/smoke:

Do Not Touch

- [architecture boundaries copied from UNITY-ARCHITECTURE.md]

Implementation Agent

- Role:
- Branch/worktree:
- Base commit:

Verification Required

- Local check:
- Smoke/test scene:
- Screenshot/video/log:
- Diff summary:

Review Required

- Architecture fit:
- Human feel/taste check:
- Integration owner:
```

### Dependency Map

| Slice | Depends on | Blocks | Can run in parallel with | Reason |
|---|---|---|---|---|
|  |  |  |  |  |

A slice is independent only if it can be implemented without changing another active slice's owned
files, scenes, prefabs, or data.

### Integration Order

| Order | Slice | Merge/integration action | Pre-integration checks | Post-integration smoke | Rollback plan |
|---:|---|---|---|---|---|
| 1 |  |  |  |  |  |
| 2 |  |  |  |  |  |

Integration order must be chosen before implementation starts. Change it only with producer approval
and a task graph update.

### Review Checklist

| Check | Required evidence | Pass/fail |
|---|---|---|
| Slice maps to `VERTICAL-SLICE-SPEC.md` |  |  |
| Slice fits `UNITY-ARCHITECTURE.md` |  |  |
| Branch/worktree matches task graph |  |  |
| Changed files stay in allowed paths |  |  |
| Protected scenes/prefabs/settings untouched or approved |  |  |
| Package/assets changes absent or approved |  |  |
| Tests/smoke checks run |  |  |
| Diff is reviewable |  |  |
| Human feel/taste check complete where needed |  |  |
| Integration order still valid |  |  |

### Integration Evidence Log

| Slice | Commit/PR/diff | Review result | Smoke/test result | Integrated by | Integrated at | Notes |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

### Blockers

| Blocker | Affected slice | Owner | Decision needed | Deadline | If unresolved |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

### Cut Triggers

| Trigger | Measurement | Cut or reduction | Human owner | Task graph update required? |
|---|---|---|---|---|
| Integration becomes opaque |  | Reduce parallelism or cut secondary slice. |  | Yes |
| Slice exceeds timebox |  |  |  | Yes |
| Protected architecture boundary is needed |  |  |  | Yes |
| Smoke/build fails after integration |  |  |  | Yes |
| Scope drift appears |  |  |  | Yes |

### Fresh-Agent Production Prompt

Use this prompt when handing a slice to a fresh implementation agent:

```text
Read AGENTS.md or CLAUDE.md, docs/AGENT-ROLES.md, docs/VERTICAL-SLICE-SPEC.md,
docs/UNITY-ARCHITECTURE.md, docs/TASK-GRAPH.md, and your slice brief.

Implement only the assigned slice. Use only the branch/worktree named in TASK-GRAPH.md. Do not touch
protected scenes, prefabs, input, camera, package, build/project settings, generated/cache folders,
third-party/generated assets, scope, or cut-plan files unless the slice brief explicitly includes
approval. Before claiming done, report changed files, checks run, smoke/test evidence, known risks,
and whether the slice still fits the architecture.
```

## Worked Example

### Milestone Snapshot

| Field | Fill |
|---|---|
| Milestone name | Signal Keeper Module 5 integrated gameplay spine |
| Date/version | v0.2 |
| Vertical-slice spec link | `docs/VERTICAL-SLICE-SPEC.md` |
| Unity architecture link | `docs/UNITY-ARCHITECTURE.md` |
| Chosen prototype link | `docs/CHOSEN-PROTOTYPE.md` |
| Cut-plan link | `docs/CUT-PLAN.md` |
| Integration owner | Producer agent, human approves scope |
| Reviewer owner | Reviewer agent |
| Maximum parallel agents | 2 implementation agents plus one reviewer |

### Parallelism Policy

| Rule | Decision |
|---|---|
| Maximum active implementation branches/worktrees | 2 |
| One feature slice per branch/worktree? | Yes |
| Who may start a parallel task? | Producer agent after human approval of task graph |
| Who may approve integration? | Reviewer agent recommends; human producer approves |
| What stops parallelism? | Merge conflicts in production scene, protected boundary violation, or unreviewable diff |
| What gets cut if integration becomes opaque? | Cut Slice B timer pressure and keep only mirror-routing spine |

### Branch And Worktree Plan

| Slice | Branch name | Worktree path, if used | Owner agent | Base commit | Merge target | Cleanup rule |
|---|---|---|---|---|---|---|
| A Beam routing | `agent/slice-a-beam-routing` | `../SignalKeeper-slice-a` | Gameplay engineer | `abc1234` | `main` | Remove after integration smoke passes |
| B Timer/HUD pressure | `agent/slice-b-timer-hud` | `../SignalKeeper-slice-b` | UI/gameplay agent | `abc1234` | `main` | Remove after integration smoke passes |

### Feature Slices

| Slice ID | Player-visible outcome | Systems touched | Allowed files/scenes/prefabs | Do-not-touch boundaries | Owner agent | Done condition | Verification |
|---|---|---|---|---|---|---|---|
| Slice A | Player rotates mirror and beam reaches receiver. | Gameplay runtime, mirror/receiver prefabs, smoke scene. | `Scripts/Gameplay`, `Prefabs/Puzzle`, `Smoke_BeamPuzzle`. | Production scene, input mappings, camera. | Gameplay engineer | Smoke scene completes one beam route. | Edit test or smoke note plus screenshot. |
| Slice B | HUD timer counts down and failure triggers when it reaches zero. | UI/runtime, timer script, HUD prefab, smoke scene. | `Scripts/UI`, `Scripts/Gameplay/Timer`, `Prefabs/UI`, `Smoke_BeamPuzzle`. | Production scene, camera, package manifest. | UI/gameplay agent | Timer visible and failure state triggers. | Smoke note plus HUD screenshot. |

### Dependency Map

| Slice | Depends on | Blocks | Can run in parallel with | Reason |
|---|---|---|---|---|
| Slice A | Architecture baseline | Production scene integration | Slice B | Owns puzzle behavior, not HUD timer. |
| Slice B | Architecture baseline | Final results flow | Slice A | Owns timer/HUD path, not beam routing. |

### Integration Order

| Order | Slice | Merge/integration action | Pre-integration checks | Post-integration smoke | Rollback plan |
|---:|---|---|---|---|---|
| 1 | Slice A | Merge beam routing scripts/prefabs, then smoke scene. | Diff review, no production scene edit. | Route beam to receiver. | Revert Slice A merge. |
| 2 | Slice B | Merge timer/HUD, then connect to smoke scene. | Diff review, Slice A smoke still passes. | Beam success and timer failure both trigger. | Revert Slice B merge. |

### Review Checklist

| Check | Required evidence | Pass/fail |
|---|---|---|
| Slice maps to `VERTICAL-SLICE-SPEC.md` | Feature slice row link. | Pass |
| Slice fits `UNITY-ARCHITECTURE.md` | Architecture fit checklist. | Pass |
| Branch/worktree matches task graph | Branch name and base commit. | Pass |
| Changed files stay in allowed paths | Diff summary. | Pass |
| Protected scenes/prefabs/settings untouched or approved | Diff review. | Pass |
| Package/assets changes absent or approved | No manifest/asset import changes. | Pass |
| Tests/smoke checks run | Smoke note. | Pass |
| Diff is reviewable | Reviewer notes. | Pass |
| Human feel/taste check complete where needed | Human play note for mirror feel. | Pass |
| Integration order still valid | Integration log. | Pass |

### Integration Evidence Log

| Slice | Commit/PR/diff | Review result | Smoke/test result | Integrated by | Integrated at | Notes |
|---|---|---|---|---|---|---|
| Slice A | `def5678` | Approved after prefab boundary fix. | Beam route smoke passed. | Producer agent | v0.2 | No production scene edit. |
| Slice B | `789abcd` | Approved after HUD screenshot. | Timer failure and Slice A success passed. | Producer agent | v0.2 | Timer can be cut if pacing slips. |

### Blockers

| Blocker | Affected slice | Owner | Decision needed | Deadline | If unresolved |
|---|---|---|---|---|---|
| Timer pressure may hide puzzle learning | Slice B | Human director | Keep or cut timer in Module 5 | Before integration | Cut Slice B and keep beam spine |

### Cut Triggers

| Trigger | Measurement | Cut or reduction | Human owner | Task graph update required? |
|---|---|---|---|---|
| Integration becomes opaque | Reviewer cannot explain combined diff in 20 minutes. | Reduce to one active branch; cut Slice B. | Human producer | Yes |
| Slice exceeds timebox | Slice exceeds 5 hours without smoke evidence. | Cut optional UI polish. | Human producer | Yes |
| Protected architecture boundary is needed | Agent asks to edit production scene/camera/input. | Require approval or move work to smoke scene. | Human director | Yes |
| Smoke/build fails after integration | Smoke path fails twice after merge. | Revert latest slice. | Producer | Yes |
| Scope drift appears | Feature not in spec or chosen prototype. | Reject or update spec after human decision. | Human director | Yes |

## Required Fields

The filled task graph must include:

- Milestone name.
- Date/version.
- Links to `VERTICAL-SLICE-SPEC.md`, `UNITY-ARCHITECTURE.md`, `CHOSEN-PROTOTYPE.md`, and
  `CUT-PLAN.md`.
- Integration owner.
- Reviewer owner.
- Maximum parallel agents.
- Parallelism policy.
- Branch and worktree plan.
- At least two feature slices.
- Owner agent for every slice.
- Allowed files/scenes/prefabs for every slice.
- Do-not-touch boundaries for every slice.
- Done condition for every slice.
- Verification for every slice.
- Dependency map.
- Integration order.
- Review checklist.
- Integration evidence log.
- Blockers.
- Cut triggers.
- Fresh-agent production prompt.

## Reject If Missing

Reject the task graph if any of these are true:

- The H1 is not `# TASK-GRAPH`.
- `Status` is not one of the allowed schema values.
- It does not link to `VERTICAL-SLICE-SPEC.md`.
- It does not link to `UNITY-ARCHITECTURE.md`.
- It does not name at least two feature slices for Module 5.
- Any slice lacks owner agent, branch/worktree, allowed paths, done condition, or verification.
- Any slice can touch protected architecture boundaries without approval.
- Branch or worktree ownership is unclear.
- Integration order is missing.
- Review checklist is missing.
- Integration evidence log is missing.
- Cut triggers are missing.
- A feature slice expands scope without updating the spec and cut plan.
- Human-vs-agent delegation is missing: agents may implement slices, but human/reviewer approval is
  required for scope, feel, protected boundaries, integration, and final pass/fail.
- Asset legality is bypassed: any slice importing third-party or generated assets must require an
  asset-ledger/provenance path or be rejected.

Named scope cuts, asset legality, and core delegation ownership are governed by
`VERTICAL-SLICE-SPEC.md`, `CUT-PLAN.md`, `AGENT-ROLES.md`, and `UNITY-ARCHITECTURE.md`. This task
graph must reject any slice that bypasses those documents.

## Reviewer Notes

Review this as a production control board, not a todo list.

Ask:

- Can two agents start work without touching the same files, scenes, prefabs, or settings?
- Does every slice produce player-visible progress tied to the vertical-slice spec?
- Can a reviewer inspect each slice before integration?
- Is integration order explicit enough to avoid merge chaos?
- Are protected architecture boundaries copied into each slice brief?
- If integration becomes opaque, does the task graph say exactly what to cut or serialize?

Pass the graph only when parallelism is safer than sequential improvisation.
