# Module 3: Prototype Tournament

## Status

complete

## Policy Links

- Master spec: [`../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`../NORMALIZATION.md`](../NORMALIZATION.md)
- Teachable-unit schema: [`../schemas/teachable-unit-schema.md`](../schemas/teachable-unit-schema.md)
- Prior module: [`MODULE-02-VERTICAL-SLICE-SPEC.md`](MODULE-02-VERTICAL-SLICE-SPEC.md)
- Next module: [`MODULE-04-UNITY-ARCHITECTURE.md`](MODULE-04-UNITY-ARCHITECTURE.md)
- Playtest rubric template: [`../templates/PLAYTEST-RUBRIC.md`](../templates/PLAYTEST-RUBRIC.md)
- Task graph template: [`../templates/TASK-GRAPH.md`](../templates/TASK-GRAPH.md)

## Objective

Use agents for creative breadth, then apply human taste and production judgment to choose one
prototype that can become the production direction.

By the end of this module, the learner has built `3-5` tiny playable prototypes. Each prototype
tests one core-loop question from the Module 2 vertical-slice spec, not a full game. The learner
scores every prototype on feel, novelty, feasibility, asset burden, extensibility, and risk; writes
kill memos for every rejected prototype; and selects one winner with revision notes.

The module gate is the master-spec gate: the chosen prototype is playable in under 60 seconds from
launch and proves the core loop with greybox or placeholder assets.

## Time Budget And Cut Triggers

Default budget: `12-18 hours`.

Suggested split:

| Work block | Target |
|---|---:|
| Module 2 artifact check and tournament plan | 1-1.5h |
| Prototype prompt/spec setup | 1-1.5h |
| Prototype P1 | 2-3h |
| Prototype P2 | 2-3h |
| Prototype P3 | 2-3h |
| Optional P4/P5, only if first three finish early | 2-4h |
| Scoring, kill memos, and winner decision | 2-3h |
| Cold-agent handoff and revisions | 1-1.5h |

Master-spec cut trigger:

- If there is no playable prototype by the end of Module 3, reduce game scope immediately.

Module-specific cut triggers:

- If the first prototype is not playable by hour 4, cut it to one mechanic, one input path, one
  scene, one visible success/failure state, and placeholder assets only.
- If a prototype cannot be launched and understood in under 60 seconds, reject it or revise its
  first-minute flow before scoring it as a candidate winner.
- If fewer than three prototypes exist by hour 10, stop polishing and build the missing prototype
  variants.
- If no prototype proves the core loop by hour 14, cut the weakest mechanic from
  `VERTICAL-SLICE-SPEC.md` and rerun one tiny prototype.
- If a prototype only works with final art, licensed assets, paid packages, or unclear AI-generated
  content, score asset burden and risk low, then prefer a greybox alternative.
- If the learner wants to keep multiple winners, require a producer decision and update
  `CUT-PLAN.md`; the module may carry forward exactly one production target.

## Learner Assignment

You are running a prototype tournament, not building the vertical slice. The goal is to learn fast by
creating multiple tiny playable proofs, then making one human-owned production decision.

Work inside the Unity repo prepared in Modules 1 and 2. Agents may implement bounded prototypes, but
the human director/producer owns taste, scope, winner selection, kill decisions, and final approval.

### Inputs

Use only these inputs:

- This module file.
- The master spec linked above.
- Your Module 1 `AGENTS.md` or `CLAUDE.md`.
- Your Module 1 `AGENT-ROLES.md`.
- Your Module 1 approval policy and MCP/editor automation decision.
- Your filled `GAME-THESIS.md`.
- Your filled `CUT-PLAN.md`.
- Your filled `VERTICAL-SLICE-SPEC.md`.
- Your Module 2 `COLD-AGENT-SPEC-CHECK.md`.

If `VERTICAL-SLICE-SPEC.md` does not identify the first scene, first 60 seconds, success/failure
state, allowed assets, approval gates, verification evidence, and first cut, stop and repair Module
2 before building prototypes.

### Step 1: Lock The Tournament Boundary

Create:

```text
docs/PROTOTYPE-TOURNAMENT-PLAN.md
```

Start the file with this boundary statement:

```text
Tournament promise: every prototype tests the same Module 2 slice promise.
Winner policy: exactly one prototype can become the production target.
Human authority: agents may build and report evidence; agents may not choose the winner.
Asset policy: greybox, primitives, self-authored placeholders, or already-approved assets only.
Approval policy: package installs, generated player-facing assets, destructive Unity operations, and
write-capable editor automation still follow Module 1 rules.
```

### Step 2: Define Prototype Slots

In `docs/PROTOTYPE-TOURNAMENT-PLAN.md`, fill this table before building:

| Prototype ID | Hypothesis | Core-loop question | Scene/build path | Max build time | Agent role | Human taste check |
|---|---|---|---|---:|---|---|
| P1 |  |  |  |  |  |  |
| P2 |  |  |  |  |  |  |
| P3 |  |  |  |  |  |  |
| P4 optional |  |  |  |  |  |  |
| P5 optional |  |  |  |  |  |  |

Rules:

- Build at least three prototypes.
- Build no more than five prototypes.
- Each prototype tests one core-loop question.
- Each prototype must be playable with greybox or placeholder assets.
- Each prototype must launch or become playable in under 60 seconds.
- Each prototype must stay inside the Module 2 approval policy and allowed asset plan.
- Do not let an implementation agent select the winner.

### Step 3: Write Agent Prototype Briefs

For each prototype, write a brief before implementation. Store briefs at:

```text
docs/prototype-briefs/P1-BRIEF.md
docs/prototype-briefs/P2-BRIEF.md
docs/prototype-briefs/P3-BRIEF.md
```

Use this format:

```markdown
Title: PX Prototype Brief

Hypothesis

[One sentence.]

Build Only This

- Scene:
- Player action:
- Camera/control assumption:
- Success condition:
- Failure condition:
- Placeholder assets allowed:

Do Not Build

- [systems/content/assets excluded from this prototype]

Approval Gates

- [package installs / generated assets / editor writes / destructive operations]

Evidence Required

- [snapshot, build link or launch instructions, changed files, playtest note]
```

The brief must be small enough that a fresh implementation agent can complete it without inventing
the game or expanding scope.

### Step 4: Build Tiny Prototypes

For each prototype, create an evidence folder:

```text
docs/prototypes/P1/
docs/prototypes/P2/
docs/prototypes/P3/
docs/prototypes/P4/
docs/prototypes/P5/
```

Each completed prototype folder must contain:

```text
README.md
snapshot.png or snapshot-link.md
build-link.md or launch-instructions.md
changed-files.md
playtest-note.md
```

`README.md` must state:

- prototype ID
- hypothesis
- core-loop question
- what to do in the first 60 seconds
- success/failure state
- what is intentionally fake, greybox, or placeholder
- what approval gates were triggered
- whether it is eligible to win

Prototype implementation rules:

- A prototype may be ugly.
- A prototype may use temporary scripts, primitives, and placeholder UI.
- A prototype may fake progression, menus, save, audio, and final art if the core-loop question is
  still testable.
- A prototype may not require unapproved packages, unknown-license assets, or hidden chat context to
  make sense.
- A prototype may not become the production architecture. Module 4 handles durable architecture
  after the winner is chosen.

### Step 5: Play And Observe Each Prototype

For each prototype, run at least one short play session. Prefer a new player, but a solo learner may
run the first pass if no tester is available.

The `playtest-note.md` must answer:

- Did the prototype reach playable state within 60 seconds from launch?
- What did the player do first?
- What did the player think the goal was?
- What felt best?
- What was confusing?
- Did the prototype visibly prove the core loop?
- What bug, scope, or asset issue would block production?

If using [`PLAYTEST-RUBRIC.md`](../templates/PLAYTEST-RUBRIC.md), copy it into the project docs and
fill only the sections needed for prototype evidence. Do not turn Module 3 into a full QA pass.

### Step 6: Score All Prototypes

Create:

```text
docs/PROTOTYPE-SCORING.md
```

Use this scoring table for every prototype:

| Prototype | Feel 1-5 | Novelty 1-5 | Feasibility 1-5 | Asset burden 1-5 | Extensibility 1-5 | Risk 1-5 | Total | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| P1 |  |  |  |  |  |  |  |  |
| P2 |  |  |  |  |  |  |  |  |
| P3 |  |  |  |  |  |  |  |  |
| P4 |  |  |  |  |  |  |  |  |
| P5 |  |  |  |  |  |  |  |  |

Scoring definitions:

| Criterion | `1` means | `3` means | `5` means |
|---|---|---|---|
| Feel | Core action is confusing, slow, floaty, unreadable, or unpleasant. | Core action is understandable but needs tuning. | Core action is immediately readable, responsive, and satisfying. |
| Novelty | Feels like a generic clone with no sharp angle. | Has one recognizable twist. | Has a clear hook a player can describe after one minute. |
| Feasibility | Needs systems, assets, tuning, or integrations beyond solo scope. | Buildable with careful cuts. | Obviously buildable inside the slice budget. |
| Asset burden | Needs many final assets, unclear licenses, or custom production pipelines. | Needs some assets, but placeholders work. | Works with greybox, primitives, self-authored placeholders, or already-approved assets. |
| Extensibility | Dead-end experiment; hard to grow into the spec. | Can support one or two more rooms, levels, encounters, or variants. | Cleanly expands into Modules 4-10 without changing the core premise. |
| Risk | Major unknowns remain after prototype. | Some known risks remain but have fallbacks. | Main risks are visible, bounded, and cuttable. |

Important: high `asset burden` score means low burden. High `risk` score means low residual risk.
Add a note if raw scores conflict with human taste; a prototype can score high and still be killed if
it does not match the player fantasy.

### Step 7: Write Kill Memos

For every rejected prototype, create:

```text
docs/kill-memos/PX-KILL-MEMO.md
```

Minimum kill memo format:

```markdown
Title: PX Kill Memo

Decision

- Prototype rejected: [PX]
- Rejected by: [human director/producer]
- Date: [fill]

What It Tested

- Hypothesis: [fill]
- Core-loop question: [fill]
- First 60 seconds: [fill]

Evidence

- Snapshot/build link: [path/link]
- Scoring row: [path/link]
- Strongest score: [criterion and reason]
- Weakest score: [criterion and reason]

Why It Dies

- Primary reason: [feel / novelty / feasibility / asset burden / extensibility / risk]
- Specific production concern: [fill]
- What would have to be true to revive it: [fill]

What Survives

- Idea, mechanic, asset, code, or lesson carried forward: [fill]
- What is explicitly not carried forward: [fill]
```

No kill memo means no evidence that human taste and production judgment were exercised. A rejected
prototype should leave behind a lesson, not only a deleted scene.

### Step 8: Select One Winner

Create:

```text
docs/CHOSEN-PROTOTYPE.md
```

Required sections:

```markdown
Title: Chosen Prototype

Winner

- Prototype ID: [fill]
- Snapshot/build link: [path/link]
- Launch path: [fill]
- Playable under 60 seconds from launch: [yes/no]
- Core loop proved with greybox or placeholder assets: [yes/no]

Why This Wins

- Feel: [fill]
- Novelty: [fill]
- Feasibility: [fill]
- Asset burden: [fill]
- Extensibility: [fill]
- Risk: [fill]

Revision Notes

- Keep: [fill]
- Change next: [fill]
- Cut immediately: [fill]
- Open risk to test in Module 4 or later: [fill]

Spec Updates Required

- GAME-THESIS update: [none or fill]
- VERTICAL-SLICE-SPEC update: [none or fill]
- CUT-PLAN update: [none or fill]
- Asset ledger update: [none or fill]
```

Exactly one prototype can win. If two prototypes appear tied, choose the one with lower asset burden
and lower residual risk unless the human director writes a specific taste reason to override that
choice.

### Step 9: Update Specs Without Overbuilding

Update `GAME-THESIS.md`, `VERTICAL-SLICE-SPEC.md`, and `CUT-PLAN.md` only where the tournament
changed the production direction.

Allowed updates:

- replace the chosen first playable with the winner
- remove killed mechanics or content
- add a risk discovered during prototyping
- clarify first-scene launch path
- update cut order
- mark an asset source as blocked or allowed based on evidence

Do not start Module 4 architecture work in this module. If a prototype exposes architecture
questions, record them as Module 4 inputs instead of solving them here.

### Step 10: Run The Cold-Agent Prototype Handoff

Start a fresh agent session with no chat history. Give it only the Unity repo and ask:

```text
Read AGENTS.md or CLAUDE.md, docs/AGENT-ROLES.md, docs/VERTICAL-SLICE-SPEC.md,
docs/PROTOTYPE-SCORING.md, docs/kill-memos/, docs/CHOSEN-PROTOTYPE.md, and the prototype evidence
folders.

Without editing files, explain which prototype won, why the others were killed, what should be
implemented next, what approval gates still apply, and what risks Module 4 must handle.
```

Save the response as:

```text
docs/COLD-AGENT-PROTOTYPE-HANDOFF.md
```

The response passes only if the agent identifies one winner, summarizes rejected prototypes, names
the next production step, and does not ask which prototype to choose.

## Required Artifacts

Submit these artifacts:

| Artifact | Required evidence |
|---|---|
| `docs/PROTOTYPE-TOURNAMENT-PLAN.md` | `3-5` prototype slots, each with one hypothesis, one core-loop question, max build time, agent role, and human taste check |
| Prototype briefs | `docs/prototype-briefs/P1-BRIEF.md` through at least `P3-BRIEF.md`, each small enough for a fresh agent to execute |
| Prototype snapshots/build links | `docs/prototypes/P1/` through at least `docs/prototypes/P3/`, each with snapshot or link, launch instructions or build link, changed files, and playtest note |
| Completed `docs/PROTOTYPE-SCORING.md` | Scores every prototype on feel, novelty, feasibility, asset burden, extensibility, and risk |
| Kill memos for rejected prototypes | `docs/kill-memos/PX-KILL-MEMO.md` for every non-winning prototype, using the required kill memo format |
| `docs/CHOSEN-PROTOTYPE.md` | One winner, under-60-second launch/playability evidence, greybox/placeholder core-loop proof, and revision notes |
| Updated specs, if needed | `GAME-THESIS.md`, `VERTICAL-SLICE-SPEC.md`, and `CUT-PLAN.md` updated only where tournament evidence changed direction |
| `docs/COLD-AGENT-PROTOTYPE-HANDOFF.md` | Fresh agent can identify the winner, killed prototypes, next step, approval gates, and Module 4 risks |
| Module 3 review note | Human pass/fail decision tying the submission to the playable-under-60-seconds gate |

Optional but useful evidence:

- short screen recordings
- `docs/playtest-notes/`
- `docs/prototype-diffs/`
- `docs/review/tournament-review.md`

## Review Prompts

Reviewers answer these as binary checks:

- Are there at least three and no more than five prototypes?
- Does every prototype test one core-loop question instead of trying to become the full game?
- Does every prototype have a snapshot, build link, or launch instruction?
- Is every candidate winner playable or understandable in under 60 seconds from launch?
- Does `PROTOTYPE-SCORING.md` include feel, novelty, feasibility, asset burden, extensibility, and
  risk?
- Are all six scoring criteria filled for every prototype?
- Does every rejected prototype have a kill memo?
- Does every kill memo say what was tested, why it died, and what survives?
- Is exactly one prototype chosen?
- Does the chosen prototype prove the core loop with greybox or placeholder assets?
- Does the chosen prototype include revision notes?
- Are any spec changes caused by the tournament reflected in `GAME-THESIS.md`,
  `VERTICAL-SLICE-SPEC.md`, or `CUT-PLAN.md`?
- Does the human director/producer, not an implementation agent, make the final winner decision?
- Can a cold agent continue from the handoff without asking which prototype won or what to build
  next?

## Common Failure Modes

- No prototype is playable in 60 seconds from launch.
- Chosen prototype has an unclear core loop.
- No kill memos, so there is no evidence of human taste judgment being exercised.
- Learner builds one polished prototype instead of `3-5` tiny alternatives.
- Prototypes test unrelated game ideas instead of variations on the Module 2 slice promise.
- Scoring sheet omits feel, novelty, feasibility, asset burden, extensibility, or risk.
- Asset-heavy prototype wins because it looks better, despite being impossible inside the budget.
- Agent chooses the winner without human director/producer approval.
- Rejected prototypes disappear with no lesson carried forward.
- Chosen prototype requires final art, licensed assets, generated player-facing assets, or
  unapproved packages to make sense.
- Prototype handoff does not state what to implement next.
- Learner keeps multiple winners and postpones the scope decision to Module 4.

## Pass/Fail Rubric

Pass if all of these are true:

- `3-5` playable prototypes exist.
- Each prototype tests one core-loop question from the Module 2 spec.
- Every prototype has evidence: snapshot or build link, launch instructions, changed files, and
  playtest note.
- `PROTOTYPE-SCORING.md` scores feel, novelty, feasibility, asset burden, extensibility, and risk
  for every prototype.
- Every rejected prototype has a kill memo using the required format.
- Exactly one prototype is chosen by the human director/producer.
- The chosen prototype is playable in under 60 seconds from launch.
- The chosen prototype proves the core loop with greybox or placeholder assets.
- Revision notes name what to keep, change, cut, and test next.
- A cold agent can read the tournament artifacts and identify the winner, killed prototypes, next
  step, approval gates, and Module 4 risks without asking which prototype won.

Fail if any of these are true:

- Fewer than three prototypes exist.
- No prototype is playable in under 60 seconds.
- The chosen prototype does not prove the core loop.
- The chosen prototype depends on final art, unapproved packages, unknown-license assets, or hidden
  chat context.
- `PROTOTYPE-SCORING.md` is missing or omits any of the six required criteria.
- Any rejected prototype lacks a kill memo.
- Multiple winners are carried forward without a human-owned scope decision.
- An agent chooses the winner or approves its own work.
- The cold-agent prototype handoff cannot identify what should be implemented next.

## Strong Vs Weak Examples

Strong submission:

```text
docs/PROTOTYPE-TOURNAMENT-PLAN.md
docs/prototype-briefs/P1-BRIEF.md
docs/prototype-briefs/P2-BRIEF.md
docs/prototype-briefs/P3-BRIEF.md
docs/prototypes/P1/README.md
docs/prototypes/P1/snapshot.png
docs/prototypes/P1/launch-instructions.md
docs/prototypes/P2/README.md
docs/prototypes/P2/snapshot.png
docs/prototypes/P2/launch-instructions.md
docs/prototypes/P3/README.md
docs/prototypes/P3/snapshot.png
docs/prototypes/P3/launch-instructions.md
docs/PROTOTYPE-SCORING.md
docs/kill-memos/P1-KILL-MEMO.md
docs/kill-memos/P3-KILL-MEMO.md
docs/CHOSEN-PROTOTYPE.md
docs/COLD-AGENT-PROTOTYPE-HANDOFF.md
```

Strong decision summary:

```text
P2 wins. It is playable in 45 seconds from launch: rotate two mirrors and route the beam to the
harbor lens. It scored highest on feel and feasibility, has low asset burden because it uses
LineRenderer plus placeholder mirror sprites, and can extend to more rooms. P1 is killed because the
splitter made the first minute confusing. P3 is killed because timer pressure hid the core puzzle.
Next step: turn P2 into the production prototype and keep timer pressure as a later optional cut-in.
```

Why the strong submission passes:

- There are multiple alternatives.
- Each prototype tests a bounded loop question.
- The chosen prototype is playable quickly.
- The decision uses evidence, not vibes alone.
- Kill memos preserve lessons from rejected prototypes.
- Asset burden and risk are considered before taste wins.
- A cold agent knows what to build next.

Weak submission:

```text
I made one polished prototype and it feels best. The other ideas were not worth building. We should
continue with this one and add more content.
```

Why the weak submission fails:

- Only one prototype exists.
- There is no tournament.
- There is no scoring sheet.
- There are no kill memos.
- There is no evidence that human taste compared alternatives.
- There is no proof it launches or becomes playable in under 60 seconds.
- There is no production handoff.

Gate-boundary example:

```text
P1, P2, and P3 are all ugly greybox scenes. P2 wins because a fresh tester understands the core loop
in 40 seconds. P1 feels better but needs licensed animation assets. P3 is more novel but risky
because the camera hides the target. P2 keeps the beam mechanic and cuts the timer until later.
```

This can pass because prototype quality is judged by playable proof, scope, and risk, not polish.

## Next Module Handoff

Carry these forward to Module 4:

- `docs/GAME-THESIS.md`
- `docs/CUT-PLAN.md`
- `docs/VERTICAL-SLICE-SPEC.md`
- `docs/PROTOTYPE-TOURNAMENT-PLAN.md`
- `docs/PROTOTYPE-SCORING.md`
- `docs/kill-memos/`
- `docs/CHOSEN-PROTOTYPE.md`
- `docs/COLD-AGENT-PROTOTYPE-HANDOFF.md`
- prototype snapshot/build links
- Module 3 review note and pass/fail decision

Module 4 turns the chosen prototype into an architecture agents can extend. Do not carry all
prototype code forward automatically. Start from the winner's proven loop, the revision notes, and
the updated `VERTICAL-SLICE-SPEC.md`; treat rejected prototypes as evidence for what not to build.
