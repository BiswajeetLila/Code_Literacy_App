# Module 2: Game Concept To Vertical Slice Spec

## Status

complete

## Policy Links

- Master spec: [`../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`../NORMALIZATION.md`](../NORMALIZATION.md)
- Teachable-unit schema: [`../schemas/teachable-unit-schema.md`](../schemas/teachable-unit-schema.md)
- Game thesis template: [`../templates/GAME-THESIS.md`](../templates/GAME-THESIS.md)
- Vertical-slice spec template: [`../templates/VERTICAL-SLICE-SPEC.md`](../templates/VERTICAL-SLICE-SPEC.md)
- Cut-plan template: [`../templates/CUT-PLAN.md`](../templates/CUT-PLAN.md)
- Prior module: [`MODULE-01-SOLO-STUDIO-OS.md`](MODULE-01-SOLO-STUDIO-OS.md)
- Next module: [`MODULE-03-PROTOTYPE-TOURNAMENT.md`](MODULE-03-PROTOTYPE-TOURNAMENT.md)

## Objective

Turn a fuzzy game idea into a production-grade vertical-slice spec that another agent could use to
build the first playable prototype without asking what the game is.

By the end of this module, the learner has a filled `GAME-THESIS.md`, a filled `CUT-PLAN.md`, and a
filled `VERTICAL-SLICE-SPEC.md` that defines the 5-15 minute Steam-demo candidate slice. The spec
fixes the player fantasy, core loop, 3C definition, success/failure conditions, scope budget, asset
budget, technical risks, human-vs-agent delegation map, and first approved cuts before any prototype
work begins.

The module gate is the master-spec gate: a cold agent could implement the first playable prototype
from the spec without asking what the game is.

## Time Budget And Cut Triggers

Default budget: `8-12 hours`.

Suggested split:

| Work block | Target |
|---|---:|
| Module 1 artifact check and game-idea compression | 1-1.5h |
| Filled `GAME-THESIS.md` | 1.5-2h |
| Scope rubric and 5-15 minute demo-loop definition | 1-1.5h |
| Filled `CUT-PLAN.md` | 1.5-2h |
| Filled `VERTICAL-SLICE-SPEC.md` | 2-3h |
| Incomplete-spec rejection test | 0.5-1h |
| Cold-agent spec check and revisions | 1-1.5h |

Cut triggers:

- If the game idea still needs more than one paragraph to explain after hour 2, cut it to one player
  action, one goal, and one pressure.
- If the 3C definition cannot fit on one screen, cut camera modes, alternate controls, or character
  verbs before writing the vertical-slice spec.
- If the slice needs more than two scenes, three required mechanics, or 15 minutes of play, activate
  the cut plan before implementation starts.
- If 3D is selected and no written `CUT-PLAN.md` exists by hour 4, reject the 3D choice or cut the
  project to a 2D/default-camera version before approval.
- If any third-party or generated asset lacks license, provenance, or commercial-use status, block
  it from the Steam-demo candidate or name a fallback in the asset budget and cut plan.
- If the human-vs-agent delegation map is still "agents build it" by hour 6, stop and assign
  decision ownership before any prototype tournament work.
- If a cold agent asks "what is the game?", "what should I build first?", or "am I allowed to use
  this asset/tool?", the spec fails and must be revised before Module 3.

## Learner Assignment

You are writing the production contract for the game, not implementing the game. Work inside the
Unity repo prepared in Module 1. Do not create prototype scenes, import new assets, install Unity
packages, or run write-capable editor automation during this module unless the Module 1 approval
policy explicitly permits it.

### Inputs

Use only these inputs:

- This module file.
- The master spec linked above.
- Your Module 1 Unity repo and its `AGENTS.md` or `CLAUDE.md`.
- Your filled Module 1 `AGENT-ROLES.md`.
- Your Module 1 approval policy and MCP/editor automation decision.
- [`GAME-THESIS.md`](../templates/GAME-THESIS.md).
- [`CUT-PLAN.md`](../templates/CUT-PLAN.md).
- [`VERTICAL-SLICE-SPEC.md`](../templates/VERTICAL-SLICE-SPEC.md).

If the Module 1 repo rules, roles, approval policy, or fresh-agent safety check are missing, stop and
repair Module 1 first. Module 2 depends on those boundaries.

### Step 1: Compress The Fuzzy Idea

Write the rough idea in one paragraph, then compress it to this shape:

```text
[Player] must [verb] through [pressure] using [core mechanic] before [failure threat].
```

Reject any idea that cannot identify:

- one player role
- one repeated player action
- one main pressure
- one visible success condition
- one visible failure condition
- one intended demo length between 5 and 15 minutes

The output of this step becomes the one-sentence pitch in `GAME-THESIS.md`.

### Step 2: Fill `GAME-THESIS.md`

Copy [`../templates/GAME-THESIS.md`](../templates/GAME-THESIS.md) into the Unity repo as:

```text
docs/GAME-THESIS.md
```

Fill every required field. The thesis must define:

- working title
- one-sentence pitch
- player fantasy
- 10-30 second core loop
- 3C definition: character, camera, controls
- success/failure or win/loss condition
- 2D/3D choice
- scope bounds using the master-spec allowed/disallowed defaults
- at least one named scope cut
- thesis-level asset legality and commercial-use status
- human-vs-agent delegation ownership
- written cut-plan link if the project is 3D

Default to 2D unless 3D is essential to the fantasy or mechanic. A 3D project is not approved until
the cut plan names cuts for camera, animation, level-building, navigation/collision, and asset
burden.

### Step 3: Apply The Scope Rubric

Create a short review note at:

```text
docs/SCOPE-RUBRIC.md
```

Use this table:

| Question | Pass answer | Your answer | Pass/fail |
|---|---|---|---|
| Can the core action be demonstrated in one scene? | Yes |  |  |
| Can a new player understand the goal in 60 seconds? | Yes |  |  |
| Does the playable flow fit 5-15 minutes? | Yes |  |  |
| Are there at most three required mechanics? | Yes |  |  |
| Is there one player controller? | Yes |  |  |
| Is there one enemy, hazard, puzzle, or challenge family? | Yes |  |  |
| Is the camera/control plan fixed, not exploratory? | Yes |  |  |
| Are all third-party/generated assets legal or blocked? | Yes |  |  |
| Is at least one concrete cut pre-approved? | Yes |  |  |
| Are disallowed defaults excluded or justified by a cut plan? | Yes |  |  |

If any answer fails, revise `GAME-THESIS.md` before continuing. Do not solve scope failure by moving
unclear work into "agent tasks"; agents may execute bounded work, but the human owns scope.

### Step 4: Define The 5-15 Minute Demo Loop

In your review note or in `VERTICAL-SLICE-SPEC.md`, write the target first-player flow in this
shape:

```text
Launch -> Start -> First 60 seconds -> Core loop proof -> Escalation -> Success/failure -> Return
```

For each phase, name what the player sees, does, and learns. Keep this concrete enough that an agent
can identify the first scene and first implementation slice.

Example:

```text
Launch: Main menu with Start and Quit.
Start: Player appears in TutorialRoom beside one interactable mirror.
First 60 seconds: Player rotates the mirror to route a beam into the first receiver.
Core loop proof: A blocker forces the player to move, rotate, and time the beam.
Escalation: A timer starts and one hazard interrupts the route.
Success/failure: Harbor lens activates or timer reaches zero.
Return: Results screen returns to menu.
```

### Step 5: Fill `CUT-PLAN.md`

Copy [`../templates/CUT-PLAN.md`](../templates/CUT-PLAN.md) into the Unity repo as:

```text
docs/CUT-PLAN.md
```

Fill the plan before approving the vertical-slice spec. It must include:

- preserve-at-all-costs list
- objective cut triggers
- at least three ordered cuts
- 3D tax cuts or explicit 2D non-applicability notes
- asset legality cuts
- human-vs-agent cut authority
- verification after each cut

Each cut must name what is removed, what remains playable, what trigger activates the cut, what
evidence proves the cut happened, and who owns approval. "Cut polish" is not a cut. A real cut
removes a feature, content count, asset dependency, camera mode, mechanic variant, UI surface, or
release dependency while preserving a playable slice.

### Step 6: Fill `VERTICAL-SLICE-SPEC.md`

Copy [`../templates/VERTICAL-SLICE-SPEC.md`](../templates/VERTICAL-SLICE-SPEC.md) into the Unity
repo as:

```text
docs/VERTICAL-SLICE-SPEC.md
```

Fill every required field from the thesis and cut plan. The spec must include:

- project snapshot with links to `GAME-THESIS.md` and `CUT-PLAN.md`
- Steam-demo candidate definition
- hard scope budget
- asset budget with license/provenance/commercial-use status for every category
- technical risk register
- human-vs-agent delegation map
- feature slices, starting with first playable
- named scope cuts linked to `CUT-PLAN.md`
- 3D tax check
- verification plan

The first playable feature slice must identify:

- first scene
- first 60 seconds of play
- player controls
- camera behavior
- success/failure state
- minimum assets allowed
- agent role allowed to implement it
- human review point
- verification evidence required

### Step 7: Write The Delegation Boundary

In the spec's human-vs-agent delegation map, make the following ownership explicit:

| Area | Default decision owner |
|---|---|
| Core fantasy | Human director |
| 3C feel | Human director |
| Scope cuts | Human director/producer |
| Asset legality and AI disclosure | Human producer/technical art owner |
| Gameplay implementation inside approved scope | Gameplay engineer agent may execute |
| Tooling/editor automation | Tools engineer agent may execute only inside approval policy |
| QA/build evidence | QA/build agents may execute and report |
| Final pass/fail judgment | Human reviewer or instructor |

Agents may recommend cuts, risks, and implementation plans. Agents may not approve their own
creative direction, scope expansion, asset legality, package installs, generated player-facing
assets, destructive Unity operations, or Steam-demo readiness.

### Step 8: Run The Incomplete-Spec Rejection Test

Create:

```text
docs/SPEC-REJECTION-TEST.md
```

Paste this deliberately incomplete fill:

```markdown
Asset budget: use free art later.
Scope cut: reduce polish if needed.
Delegation: agents can build it.
3D tax: maybe 3D if it looks better.
```

Then list the rejection reasons from `GAME-THESIS.md`, `CUT-PLAN.md`, and
`VERTICAL-SLICE-SPEC.md`.

Required rejection reasons:

- asset legality and commercial-use status are missing
- no specific source, license, provenance evidence, or fallback is named
- no named scope cut exists
- no human-vs-agent delegation map exists
- 3D is considered without a written cut plan
- no first scene, first 60 seconds, success/failure condition, or verification evidence is defined

This proves the learner understands the gate boundary before asking agents to build.

### Step 9: Run The Cold-Agent Spec Check

Start a fresh agent session with no chat history. Give it only the Unity repo and ask:

```text
Read AGENTS.md or CLAUDE.md, docs/AGENT-ROLES.md, docs/GAME-THESIS.md,
docs/CUT-PLAN.md, and docs/VERTICAL-SLICE-SPEC.md.

Without editing files, explain the first playable prototype you would implement.
Name the first scene, first 60 seconds of play, success/failure states, allowed assets, approval
gates, verification evidence, and first cut if the project goes over budget.
```

Save the response as:

```text
docs/COLD-AGENT-SPEC-CHECK.md
```

The response passes only if the agent can explain the first playable prototype without asking what
the game is, what assets are allowed, what requires approval, or what gets cut first.

## Required Artifacts

Submit these artifacts:

| Artifact | Required evidence |
|---|---|
| Filled `GAME-THESIS.md` | Working title, pitch, player fantasy, core loop, 3C, success/failure, 2D/3D decision, named cut, asset-legality estimate, and delegation ownership |
| Filled `VERTICAL-SLICE-SPEC.md` | Steam-demo candidate definition, hard scope budget, asset budget, technical risk register, delegation map, feature slices, 3D tax check, verification plan, and link to `CUT-PLAN.md` |
| Filled `CUT-PLAN.md` | At least three ordered cuts, 3D tax handling, asset legality cuts, human approval authority, and verification after each cut |
| `docs/SCOPE-RUBRIC.md` | Scope questions all pass, or revisions are documented before approval |
| `docs/SPEC-REJECTION-TEST.md` | The deliberately incomplete spec is rejected for asset legality, vague cuts, missing delegation, missing 3D cut plan, and missing first-playable detail |
| `docs/COLD-AGENT-SPEC-CHECK.md` | Fresh agent explains the first playable prototype without asking what the game is |
| Module 2 review note | Human pass/fail decision tying the submission to the cold-agent implementability gate |

Optional but useful evidence:

- `docs/sketches/first-scene.png`
- `docs/sketches/core-loop-flow.md`
- `docs/review/spec-review-notes.md`

## Review Prompts

Reviewers answer these as binary checks:

- Does `GAME-THESIS.md` state one player action, one goal, and one pressure?
- Does the core loop repeat through player decision and game feedback?
- Does the 3C definition fix character, camera, and controls tightly enough for implementation?
- Does the thesis name a visible success/failure or win/loss condition?
- Does the thesis state 2D or 3D?
- If 3D is selected, does `CUT-PLAN.md` exist and include cuts for camera, animation,
  level-building, navigation/collision, and asset burden?
- Does `CUT-PLAN.md` name at least three ordered cuts?
- Does the first cut preserve a playable 5-15 minute or reduced 5-7 minute demo loop?
- Does `VERTICAL-SLICE-SPEC.md` define a concrete 5-15 minute playable flow?
- Does the spec identify the first scene and first 60 seconds of play?
- Does the spec include hard budgets for scenes, mechanics, content count, UI, performance, and
  build target?
- Does the asset budget name source, license/provenance evidence, commercial-use status, and fallback
  for every asset category?
- Does the technical risk register include core mechanic, camera/control, asset burden,
  verification, and build/package risks?
- Does the delegation map separate human taste, scope, legal/commercial, and final approval from
  agent implementation?
- Does the Steam-demo candidate definition name observable evidence, not only taste words?
- Does the incomplete-spec rejection test reject vague asset, cut, delegation, and 3D claims?
- Does the cold-agent spec check explain the first playable prototype without asking what the game
  is?

## Common Failure Modes

- Spec too vague for an agent to implement, such as "make a cozy exploration game" with no first
  scene, controls, success condition, or repeated loop.
- 3D approved without a written cut plan.
- Asset legality or commercial-use status not addressed.
- Human-vs-agent delegation map missing.
- Scope bounds list desired features but do not exclude disallowed defaults.
- Core loop is a story premise, not repeated player action.
- 3C is incomplete, especially camera or controls.
- Win/loss or success/failure condition is missing or not visible in the build.
- Cut plan says "reduce polish" but does not name removed features, content, assets, or release
  dependencies.
- Steam-demo candidate definition uses words like "fun", "good", or "polished" without observable
  proof.
- Technical risks have no spike, diagnostic, fallback, or kill/cut trigger.
- Agent is allowed to approve its own implementation work.
- Generated or third-party assets are allowed into the demo without provenance and disclosure notes.
- The cold-agent check is run in the same chat session that wrote the spec, so it does not prove
  cold handoff.

## Pass/Fail Rubric

Pass if all of these are true:

- `GAME-THESIS.md`, `CUT-PLAN.md`, and `VERTICAL-SLICE-SPEC.md` are filled and internally
  consistent.
- The vertical-slice spec defines a 5-15 minute Steam-demo candidate flow with a first playable
  feature slice.
- Character, camera, controls, success/failure, scope budget, asset budget, technical risks, and
  verification evidence are concrete enough for implementation.
- Asset legality and commercial-use status are addressed for every planned asset category.
- At least three ordered cuts exist, and the first cut preserves a playable demo.
- Any 3D project has written cuts for camera, animation, level-building, navigation/collision, and
  asset burden before approval.
- The human-vs-agent delegation map keeps taste, feel, scope, legal/commercial judgment, and final
  approval with the human.
- The cold-agent spec check can identify the first scene, first 60 seconds, success/failure states,
  allowed assets, approval gates, verification evidence, and first cut without asking what the game
  is.

Fail if any of these are true:

- `GAME-THESIS.md` is missing or leaves the pitch, core loop, 3C, success/failure, 2D/3D choice,
  named cut, asset stance, or delegation blank.
- `VERTICAL-SLICE-SPEC.md` is missing or lacks the Steam-demo candidate definition, hard budgets,
  asset budget, risk register, delegation map, feature slices, cut-plan link, 3D tax check, or
  verification plan.
- `CUT-PLAN.md` is missing, unordered, vague, or allows agents to remove scope without human
  approval.
- A 3D project is approved without a written 3D cut plan.
- Third-party or generated assets are used without license/provenance/commercial-use status and a
  fallback.
- The spec lets agents own creative direction, scope decisions, asset legality, package installs, or
  final pass/fail judgment.
- A cold agent cannot identify the first playable prototype from the submitted docs.

## Strong Vs Weak Examples

Strong submission:

```text
docs/GAME-THESIS.md
docs/CUT-PLAN.md
docs/VERTICAL-SLICE-SPEC.md
docs/SCOPE-RUBRIC.md
docs/SPEC-REJECTION-TEST.md
docs/COLD-AGENT-SPEC-CHECK.md
```

Strong spec summary:

```text
Signal Keeper is a 2D top-down lighthouse puzzle slice. In 8 minutes, the player rotates mirrors
to route a beam through one tutorial room and one puzzle room before a timer expires. The first
prototype starts in TutorialRoom, teaches one mirror, then adds one blocker. Success is the beam
reaching the harbor lens. Failure is the timer reaching zero. If over budget, cut the blocker first,
the second room second, and the timer third. No generated or third-party assets are final/demo-ready
without asset ledger approval. The gameplay engineer agent may implement scripts inside the spec;
the human director owns feel, cuts, and final approval.
```

Why the strong submission passes:

- The first playable scene is obvious.
- The 5-15 minute flow is bounded.
- Character, camera, controls, success, and failure are fixed.
- Cuts are ordered and preserve a playable demo.
- Asset legality is addressed before production.
- Delegation blocks agent self-approval.
- A cold agent can start with the tutorial room without inventing scope.

Weak submission:

```text
The game is a 3D cozy survival RPG about running a magical lighthouse. It has crafting, NPCs,
upgrades, weather, exploration, story events, and maybe multiplayer later. Agents can build the
systems. We will use free assets online and cut polish if needed.
```

Why the weak submission fails:

- No first playable scene is named.
- No 5-15 minute vertical slice is defined.
- Character, camera, and controls are unresolved.
- 3D is chosen without a written cut plan.
- Asset legality is unknown.
- Human-vs-agent delegation is missing.
- "Cut polish" is not a named scope cut.
- A cold agent would have to ask what to implement first.

Gate-boundary example:

```text
The learner wants a 3D third-person game, but the 3D tax rows say:
camera cut = fixed top-down camera, animation cut = no humanoid animation, level-building cut =
one greybox room, navigation/collision cut = hand-authored waypoint paths, asset burden cut = Unity
primitives only. If 3D setup exceeds 3 hours, the slice cuts to 2D board-view controls.
```

This can pass because 3D risk is explicit, bounded, and already cuttable before production begins.

## Next Module Handoff

Carry these forward to Module 3:

- `docs/GAME-THESIS.md`
- `docs/CUT-PLAN.md`
- `docs/VERTICAL-SLICE-SPEC.md`
- `docs/COLD-AGENT-SPEC-CHECK.md`
- `docs/AGENT-ROLES.md`
- `AGENTS.md` or `CLAUDE.md`
- Module 1 approval policy.
- Module 1 MCP/editor automation status.
- Clean git baseline.
- Module 2 review note and pass/fail decision.

Module 3 uses these artifacts to run the prototype tournament. Each prototype must test the same
slice promise or an explicitly approved variation, and each rejected prototype must produce a kill
memo tied back to this spec. If Module 3 discovers that the game is still too large, return to
`CUT-PLAN.md`, activate the first cut, update `VERTICAL-SLICE-SPEC.md`, and rerun the cold-agent
spec check before building further.
