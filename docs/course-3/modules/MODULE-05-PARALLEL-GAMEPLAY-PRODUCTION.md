# Module 5: Parallel Gameplay Production

## Status

complete

## Policy Links

- Master spec: [`../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`../NORMALIZATION.md`](../NORMALIZATION.md)
- Teachable-unit schema: [`../schemas/teachable-unit-schema.md`](../schemas/teachable-unit-schema.md)
- Task graph template: [`../templates/TASK-GRAPH.md`](../templates/TASK-GRAPH.md)
- Prior module: [`MODULE-04-UNITY-ARCHITECTURE.md`](MODULE-04-UNITY-ARCHITECTURE.md)
- Next module: [`MODULE-06-HYBRID-ASSET-PIPELINE.md`](MODULE-06-HYBRID-ASSET-PIPELINE.md)

## Objective

Run multiple agents like a small production team without creating integration chaos.

By the end of this module, the learner has a filled `TASK-GRAPH.md`, branch/worktree ownership,
agent slice briefs, a review checklist, an integration order, integration evidence, and a fresh-agent
production handoff. At least two independent gameplay slices are built in parallel and integrated
through the architecture defined in Module 4.

The module gate is the master-spec gate: at least two independent gameplay slices are built in
parallel and integrated without unreviewable merge chaos. If integration becomes opaque, reduce
parallelism.

## Time Budget And Cut Triggers

Default budget: `12-20 hours`.

Suggested split:

| Work block | Target |
|---|---:|
| Module 4 artifact check and slice selection | 1-1.5h |
| Filled `TASK-GRAPH.md` | 2-3h |
| Slice briefs and branch/worktree setup | 1.5-2h |
| Parallel implementation window | 5-8h |
| Slice review and architecture-fit checks | 2-3h |
| Integration, smoke checks, and rollback notes | 2-3h |
| Fresh-agent production handoff and revisions | 1-1.5h |

Master-spec cut triggers that matter here:

- If there is no integrated vertical-slice spine by the end of Module 5, remove secondary systems.
- If a slice exceeds its time budget by more than 20% for two modules, activate the cut plan.
- If the game is not fun with greybox art, more art is not allowed to hide the problem.

Module-specific cut triggers:

- If `TASK-GRAPH.md` cannot identify two independent feature slices by hour 3, reduce scope to one
  slice plus one small supporting slice.
- If two agents need to edit the same production scene, prefab, input, camera, package, or project
  setting, serialize the work or cut one slice.
- If any branch/worktree cannot be reviewed in under 20 minutes, do not merge it; split or cut it.
- If integration produces conflicts in protected architecture areas, revert the latest slice and
  update `UNITY-ARCHITECTURE.md` or `CUT-PLAN.md`.
- If integrated smoke evidence is missing by hour 16, stop feature work and integrate only the
  smallest spine.
- If no integrated vertical-slice spine exists by the end of Module 5, remove secondary systems
  before continuing to Module 6.

## Learner Assignment

You are running a small production team made of agents. The point is not to maximize the number of
agents. The point is to prove you can assign independent gameplay slices, keep architecture
boundaries intact, review work before integration, and produce a playable integrated spine.

Work inside the Unity repo used for Modules 1-4. Agents may implement bounded slices, but the human
producer/director owns scope, protected boundary approvals, feel/taste decisions, integration
approval, and final pass/fail.

### Inputs

Use only these inputs:

- This module file.
- The master spec linked above.
- Module 1 `AGENTS.md` or `CLAUDE.md`.
- Module 1 `AGENT-ROLES.md`.
- Module 1 approval policy and MCP/editor automation status.
- `GAME-THESIS.md`.
- `VERTICAL-SLICE-SPEC.md`.
- `CUT-PLAN.md`.
- `CHOSEN-PROTOTYPE.md`.
- `UNITY-ARCHITECTURE.md`.
- `ARCHITECTURE-FIT-CHECK.md`.
- `COLD-AGENT-ARCHITECTURE-HANDOFF.md`.
- [`TASK-GRAPH.md`](../templates/TASK-GRAPH.md).

If `UNITY-ARCHITECTURE.md` does not protect production scenes, prefabs, input, camera, packages,
assets, generated/cache folders, project/build settings, and scope decisions, stop and repair Module
4 before starting parallel implementation.

### Step 1: Select Two Independent Gameplay Slices

Create:

```text
docs/MODULE-05-SLICE-SELECTION.md
```

Choose at least two gameplay slices from `VERTICAL-SLICE-SPEC.md` and `CHOSEN-PROTOTYPE.md`.

Use this table:

| Candidate slice | Player-visible outcome | Systems touched | Shared files/scenes/prefabs? | Can run in parallel? | Keep/cut decision |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

Pick slices that are independently reviewable. A good pair might be:

- core mechanic behavior plus smoke scene
- HUD/results feedback
- one enemy/hazard/challenge behavior
- one progression or success/failure condition

Do not pick two slices that both require unapproved production-scene edits or the same prefab.

### Step 2: Fill `TASK-GRAPH.md`

Copy [`../templates/TASK-GRAPH.md`](../templates/TASK-GRAPH.md) into the Unity repo as:

```text
docs/TASK-GRAPH.md
```

Fill every required field. The graph must define:

- milestone snapshot
- parallelism policy
- branch/worktree plan
- at least two feature slices
- slice owners
- allowed files, scenes, prefabs, and data
- do-not-touch boundaries
- dependency map
- integration order
- review checklist
- integration evidence log
- blockers
- cut triggers
- fresh-agent production prompt

This document is the source of truth for Module 5 production work. If a slice is not in the graph,
it is not assigned.

### Step 3: Create Branch Or Worktree Boundaries

Create one branch or worktree per slice.

Rules:

- One feature slice per branch/worktree.
- One owner agent per implementation branch/worktree.
- Branch names must match `TASK-GRAPH.md`.
- Every branch starts from the same approved base commit unless the graph says otherwise.
- Agents do not share a worktree for simultaneous implementation.
- Agents do not integrate their own work.

Record branch evidence in:

```text
docs/MODULE-05-BRANCH-PLAN.md
```

Required evidence:

- base commit
- branch/worktree name
- owner agent
- allowed paths
- merge target
- cleanup rule

### Step 4: Write Slice Briefs

For each slice, create:

```text
docs/slice-briefs/SLICE-ID.md
```

Each brief must include:

- player-visible outcome
- why it belongs in the vertical-slice spec
- allowed files/folders
- allowed scenes
- allowed prefabs
- allowed data/config
- allowed UI
- required tests or smoke evidence
- do-not-touch boundaries copied from `UNITY-ARCHITECTURE.md`
- implementation agent role
- branch/worktree
- review requirements

The brief must be executable cold by a fresh implementation agent. If the agent would need chat
history to know what to build, the brief fails.

### Step 5: Run Parallel Implementation

Start the assigned implementation agents with only the repo docs and their slice brief.

Agent rules:

- Implement only the assigned slice.
- Stay on the named branch/worktree.
- Touch only allowed files, scenes, prefabs, and data.
- Ask before package installs, generated/third-party assets, editor automation writes, destructive
  operations, production-scene edits, input/camera changes, build/project settings, or scope changes.
- Report changed files, checks run, smoke/test evidence, known risks, and architecture-fit status.

Producer rules:

- Keep at most the maximum parallel agents named in `TASK-GRAPH.md`.
- Stop new work if integration risk becomes unclear.
- Update blockers immediately.
- Do not let an agent expand scope to make its slice more impressive.

### Step 6: Review Each Slice Before Integration

For every completed slice, create:

```text
docs/reviews/SLICE-ID-REVIEW.md
```

Use the `TASK-GRAPH.md` review checklist. The review must answer:

- Does the slice map to `VERTICAL-SLICE-SPEC.md`?
- Does it fit `UNITY-ARCHITECTURE.md`?
- Does it stay inside its branch/worktree and allowed paths?
- Did it touch protected scenes, prefabs, input, camera, packages, project/build settings, assets,
  generated/cache folders, scope, or cut plan?
- If a protected boundary was touched, where is approval recorded?
- What checks or smoke evidence ran?
- Is the diff small enough to review?
- What must be fixed before integration?

Do not integrate a slice with missing review evidence.

### Step 7: Integrate In The Planned Order

Follow the integration order in `TASK-GRAPH.md`.

For each integration, update:

```text
docs/MODULE-05-INTEGRATION-LOG.md
```

Required log fields:

| Slice | Commit/branch | Integrated by | Pre-integration checks | Post-integration smoke | Conflicts | Rollback plan | Result |
|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |  |

Run the smallest smoke path after every integration. If the latest slice breaks the integrated spine,
revert or fix before integrating the next slice.

### Step 8: Prove The Integrated Gameplay Spine

Create:

```text
docs/MODULE-05-INTEGRATED-SPINE-EVIDENCE.md
```

The evidence must show:

- which slices are integrated
- launch path
- first 60 seconds of play
- core loop proof
- success/failure or progress state
- smoke/test result
- screenshot/video/log path, if available
- known issues
- cuts activated, if any

The spine can still use greybox or placeholder assets. It must be integrated and reviewable.

### Step 9: Update Specs And Cuts Only Where Evidence Requires

Update `VERTICAL-SLICE-SPEC.md`, `UNITY-ARCHITECTURE.md`, `TASK-GRAPH.md`, or `CUT-PLAN.md` only if
Module 5 evidence changes production reality.

Allowed updates:

- mark a slice complete
- remove a secondary system
- serialize future parallel work
- add a discovered architecture boundary
- activate a cut trigger
- document a failed integration and rollback

Do not add new features during cleanup.

### Step 10: Run The Cold-Agent Production Handoff

Start a fresh agent session with no chat history. Give it only the Unity repo and ask:

```text
Read AGENTS.md or CLAUDE.md, docs/AGENT-ROLES.md, docs/VERTICAL-SLICE-SPEC.md,
docs/CUT-PLAN.md, docs/UNITY-ARCHITECTURE.md, docs/TASK-GRAPH.md,
docs/MODULE-05-INTEGRATION-LOG.md, and docs/MODULE-05-INTEGRATED-SPINE-EVIDENCE.md.

Without editing files, explain which gameplay slices were integrated, what remains to build, what
branches/worktrees were used, what approval gates still apply, what should be cut if integration
slips again, and what the next safe task is.
```

Save the response as:

```text
docs/COLD-AGENT-PRODUCTION-HANDOFF.md
```

The response passes only if the agent can explain the integrated spine, the branch/worktree history,
the remaining work, the approval gates, and the next safe task without asking what happened in
Module 5.

## Required Artifacts

Submit these artifacts:

| Artifact | Required evidence |
|---|---|
| `docs/MODULE-05-SLICE-SELECTION.md` | Candidate slices with keep/cut decision and parallelism rationale |
| Filled `docs/TASK-GRAPH.md` | Parallelism policy, branch/worktree plan, at least two feature slices, dependency map, integration order, review checklist, evidence log, blockers, and cut triggers |
| `docs/MODULE-05-BRANCH-PLAN.md` | Base commit, branch/worktree name, owner agent, allowed paths, merge target, and cleanup rule for each slice |
| Slice briefs | One `docs/slice-briefs/SLICE-ID.md` per assigned slice |
| Slice review notes | One `docs/reviews/SLICE-ID-REVIEW.md` per completed slice |
| Integration log | `docs/MODULE-05-INTEGRATION-LOG.md` with pre/post checks, conflicts, rollback plan, and result |
| Integrated spine evidence | `docs/MODULE-05-INTEGRATED-SPINE-EVIDENCE.md` showing at least two integrated gameplay slices and smoke/test evidence |
| Updated docs, if needed | `VERTICAL-SLICE-SPEC.md`, `UNITY-ARCHITECTURE.md`, `TASK-GRAPH.md`, or `CUT-PLAN.md` updated only where evidence requires |
| `docs/COLD-AGENT-PRODUCTION-HANDOFF.md` | Fresh agent can explain integrated slices, branch/worktree history, remaining work, approval gates, cuts, and next safe task |
| Module 5 review note | Human pass/fail decision tied to the two-integrated-slices gate |

Optional but useful evidence:

- short screen recording of integrated spine
- branch/commit graph screenshot
- merge conflict notes
- smoke scene screenshot
- reviewer-agent transcripts

## Review Prompts

Reviewers answer these as binary checks:

- Does `TASK-GRAPH.md` name at least two independent feature slices?
- Does each slice map to `VERTICAL-SLICE-SPEC.md`?
- Does each slice fit `UNITY-ARCHITECTURE.md`?
- Does each slice have a single branch/worktree owner?
- Are branch/worktree names, base commits, merge targets, and cleanup rules recorded?
- Are allowed files, scenes, prefabs, data, UI, and tests named for each slice?
- Are do-not-touch boundaries copied into each slice brief?
- Did every completed slice receive review before integration?
- Does the review evidence show architecture-fit, changed files, checks run, and protected-boundary
  status?
- Is integration order explicit and followed?
- Does the integration log show pre-integration checks, post-integration smoke, conflicts, rollback
  plan, and result?
- Are at least two gameplay slices integrated into one spine?
- Is the integrated spine playable or smoke-testable?
- If integration became opaque, was parallelism reduced or scope cut?
- Can a cold agent continue from the production handoff without asking what was integrated?

## Common Failure Modes

- Merge or integration chaos because multiple agents edited the same production scene or prefab.
- Branch/worktree ownership is unclear, so agents overwrite or duplicate each other's work.
- Agents touch protected architecture boundaries without approval.
- No integration order exists, so completed slices pile up without a merge plan.
- Slice review evidence is missing, so the learner cannot explain what changed or why it is safe.
- Parallel work hides scope drift: each slice adds "small" unplanned features that combine into a
  larger game.
- Integration happens only at the end, making the combined failure impossible to diagnose.
- A slice is "done" but has no smoke/test evidence.
- A branch is too large to review and gets merged anyway.
- Package, asset, input, camera, project-setting, or build-setting changes sneak in as part of a
  gameplay slice.
- Agents integrate their own work without reviewer or human producer approval.
- The integrated spine is not playable or smoke-testable by the end of Module 5.

## Pass/Fail Rubric

Pass if all of these are true:

- `TASK-GRAPH.md` is filled and names at least two independent gameplay slices.
- Each slice has a branch/worktree owner, allowed paths, do-not-touch boundaries, done condition, and
  verification evidence.
- Each completed slice is reviewed before integration.
- Integration order is explicit and followed.
- At least two gameplay slices are integrated into one playable or smoke-testable spine.
- Integration evidence includes changed files, checks, smoke/test result, conflicts, rollback plan,
  and known risks.
- No protected architecture boundary is touched without approval.
- Scope drift is cut or documented through the spec/cut plan.
- A cold agent can explain what was integrated, what remains, what approval gates apply, and the
  next safe task.

Fail if any of these are true:

- Fewer than two gameplay slices are integrated.
- There is no filled `TASK-GRAPH.md`.
- Branch/worktree ownership is unclear.
- Agents edit the same production scene, prefab, input, camera, package, asset, project setting, or
  build setting without an explicit integration plan and approval.
- A slice is integrated without review evidence.
- Integration order is missing or ignored.
- The integrated spine cannot be launched, played, or smoke-tested.
- Merge conflicts or large diffs are accepted without explanation.
- Parallel work expands scope without human decision and cut-plan update.
- The cold-agent production handoff cannot explain what happened in Module 5.

## Strong Vs Weak Examples

Strong submission:

```text
docs/MODULE-05-SLICE-SELECTION.md
docs/TASK-GRAPH.md
docs/MODULE-05-BRANCH-PLAN.md
docs/slice-briefs/SLICE-A-BEAM-ROUTING.md
docs/slice-briefs/SLICE-B-TIMER-HUD.md
docs/reviews/SLICE-A-BEAM-ROUTING-REVIEW.md
docs/reviews/SLICE-B-TIMER-HUD-REVIEW.md
docs/MODULE-05-INTEGRATION-LOG.md
docs/MODULE-05-INTEGRATED-SPINE-EVIDENCE.md
docs/COLD-AGENT-PRODUCTION-HANDOFF.md
```

Strong production summary:

```text
Two slices ran in parallel from base commit abc1234. Slice A owned beam routing scripts, puzzle
prefabs, and Smoke_BeamPuzzle. Slice B owned timer/HUD scripts and HUD prefab. Neither slice touched
the production scene, input mappings, camera, package manifest, or third-party assets. Slice A was
integrated first and passed beam-route smoke. Slice B was integrated second and passed timer failure
plus Slice A success smoke. The integrated spine launches the smoke scene, lets the player route the
beam, shows the timer, and reaches success or failure. Timer pressure is marked cuttable if Module 6
asset work slips.
```

Why the strong submission passes:

- Slices are independent and player-visible.
- Branch ownership is clear.
- Architecture boundaries are preserved.
- Review happens before integration.
- Integration order and rollback are documented.
- The integrated spine is testable.
- Future agents can continue without chat memory.

Weak submission:

```text
I had three agents work on gameplay, UI, and polish. They all changed the main scene and some
prefabs. It mostly works now, although there were merge conflicts. We should clean it up next.
```

Why the weak submission fails:

- No task graph.
- No branch/worktree ownership.
- Agents touched the same production scene and prefabs.
- Review evidence is missing.
- Merge conflicts are accepted as normal.
- "Mostly works" is not smoke evidence.
- Cleanup is pushed to later instead of reducing parallelism now.

Gate-boundary example:

```text
Slice A and Slice B both need the player prefab. The learner serializes them instead of running both
in parallel: Slice A owns the player prefab first, integrates with review evidence, then Slice B
starts from the new base. The module still passes if another independent slice runs in parallel and
two slices integrate cleanly; it fails if both agents edit the prefab at the same time.
```

This can pass because reducing unsafe parallelism is the correct production decision.

## Next Module Handoff

Carry these forward to Module 6:

- `docs/GAME-THESIS.md`
- `docs/CUT-PLAN.md`
- `docs/VERTICAL-SLICE-SPEC.md`
- `docs/CHOSEN-PROTOTYPE.md`
- `docs/UNITY-ARCHITECTURE.md`
- `docs/TASK-GRAPH.md`
- `docs/MODULE-05-INTEGRATION-LOG.md`
- `docs/MODULE-05-INTEGRATED-SPINE-EVIDENCE.md`
- `docs/COLD-AGENT-PRODUCTION-HANDOFF.md`
- branch/worktree cleanup notes
- Module 5 review note and pass/fail decision

Module 6 builds the hybrid asset and technical-art pipeline around the integrated spine. Do not
start importing final art or third-party assets until Module 6 defines style, provenance,
commercial-use, AI disclosure, import settings, naming, and asset-ledger rules.
