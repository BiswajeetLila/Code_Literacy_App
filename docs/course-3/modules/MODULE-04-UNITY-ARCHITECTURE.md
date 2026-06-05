# Module 4: Unity Architecture For Agent Teams

## Status

complete

## Policy Links

- Master spec: [`../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`../NORMALIZATION.md`](../NORMALIZATION.md)
- Teachable-unit schema: [`../schemas/teachable-unit-schema.md`](../schemas/teachable-unit-schema.md)
- Unity architecture template: [`../templates/UNITY-ARCHITECTURE.md`](../templates/UNITY-ARCHITECTURE.md)
- Prior module: [`MODULE-03-PROTOTYPE-TOURNAMENT.md`](MODULE-03-PROTOTYPE-TOURNAMENT.md)
- Next module: [`MODULE-05-PARALLEL-GAMEPLAY-PRODUCTION.md`](MODULE-05-PARALLEL-GAMEPLAY-PRODUCTION.md)

## Objective

Turn the chosen prototype into a Unity project shape that agents can extend without creating tangled
scene logic, unsafe prefab edits, or hidden architecture drift.

By the end of this module, the learner has a filled `UNITY-ARCHITECTURE.md`, a scene map, folder and
script conventions, prefab and data boundaries, input/camera/event/UI/save policies, test structure,
do-not-touch boundaries, and a reviewer architecture-fit check. The architecture is intentionally
small: it exists to let agents add the next production features safely, not to create a framework for
a larger game.

The module gate is the master-spec gate: a reviewer agent can inspect a new feature and tell whether
it fits the architecture.

## Time Budget And Cut Triggers

Default budget: `8-14 hours`.

Suggested split:

| Work block | Target |
|---|---:|
| Module 3 artifact check and architecture inventory | 1-1.5h |
| Filled `UNITY-ARCHITECTURE.md` first pass | 2-3h |
| Scene map, folder conventions, prefab/data boundaries | 1.5-2h |
| Input, camera, event/channel, UI, save/progress policies | 1.5-2h |
| Test structure and smoke/reviewer checks | 1-1.5h |
| Do-not-touch boundaries and agent change rules | 1-1.5h |
| Fresh reviewer architecture-fit check and revisions | 1-1.5h |

Master-spec cut triggers that matter here:

- If there is no integrated vertical-slice spine by the end of Module 5, remove secondary systems.
- If a slice exceeds its time budget by more than 20% for two modules, activate the cut plan.
- If the game is not fun with greybox art, more art is not allowed to hide the problem.

Module-specific cut triggers:

- If the scene map needs more than one production gameplay scene before Module 5, cut scene count or
  move extra content to later modules.
- If the architecture requires more than one communication style before the first production feature,
  choose the simplest style and defer the rest.
- If agents cannot tell which scene or prefab they may touch by hour 5, stop implementation planning
  and write do-not-touch boundaries first.
- If input or camera policy is unresolved by hour 6, freeze gameplay feature work until the human
  director makes a decision.
- If architecture work starts inventing systems not required by the chosen prototype, cut those
  systems and update `CUT-PLAN.md` if needed.
- If the reviewer agent cannot judge a sample feature as fit or not-fit, revise the architecture
  before Module 5 parallel production.

## Learner Assignment

You are turning the chosen prototype into a safe production target. Do not build new gameplay
features yet. This module defines the shape that future agents must follow when implementing
features in Module 5 and beyond.

Work inside the Unity repo used for Modules 1-3. Agents may inspect the project and draft bounded
architecture docs, but the human technical director owns input, camera, scene composition, scope,
do-not-touch boundaries, and final architecture approval.

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
- Your `PROTOTYPE-SCORING.md`.
- Your `CHOSEN-PROTOTYPE.md`.
- Your `COLD-AGENT-PROTOTYPE-HANDOFF.md`.
- [`UNITY-ARCHITECTURE.md`](../templates/UNITY-ARCHITECTURE.md).

If Module 3 does not identify exactly one chosen prototype, stop and repair Module 3. Module 4
cannot architect for multiple winners.

### Step 1: Inventory The Chosen Prototype

Create:

```text
docs/ARCHITECTURE-INVENTORY.md
```

Fill this table before writing the architecture:

| Area | What exists in chosen prototype? | Keep, replace, or cut? | Architecture implication |
|---|---|---|---|
| First production scene |  |  |  |
| Player object/controller |  |  |  |
| Camera |  |  |  |
| Core mechanic scripts |  |  |  |
| Interactables/enemies/hazards |  |  |  |
| UI/HUD/results |  |  |  |
| Data/tuning |  |  |  |
| Assets/placeholders |  |  |  |
| Tests/smoke checks |  |  |  |
| Known prototype shortcuts |  |  |  |

Prototype shortcuts are allowed to be thrown away. Do not preserve messy code just because it won
the tournament.

### Step 2: Fill `UNITY-ARCHITECTURE.md`

Copy [`../templates/UNITY-ARCHITECTURE.md`](../templates/UNITY-ARCHITECTURE.md) into the Unity repo
as:

```text
docs/UNITY-ARCHITECTURE.md
```

Fill every required field. The document must define:

- project snapshot
- architecture goal
- scene map
- folder conventions
- prefab rules
- script and assembly rules
- ScriptableObject or data rules
- input policy
- camera policy
- event/channel policy
- UI policy
- save/progress policy
- test structure
- do-not-touch boundaries
- agent change rules
- architecture fit check
- fresh reviewer prompt

Keep the architecture aligned to the chosen prototype. If the chosen prototype does not need a
system, write `not needed yet` and name the module where it may be revisited.

### Step 3: Make The Scene Map Reviewable

The scene map must identify every scene expected before Module 5.

Required categories:

| Scene category | Required? | Notes |
|---|---|---|
| Production gameplay scene | Yes | The chosen prototype's production target. |
| Smoke/test scene | Yes | Safe place for agents to test behavior before touching production scenes. |
| Menu/start scene | Optional | Include only if already in the spec. |
| Results/failure scene | Optional | Include only if needed for the slice gate. |
| Prototype-only scenes | If present | Mark as not production. |

For each scene, state whether agents may edit it. Default: agents may edit smoke/test scenes inside
approved tasks; production scene edits require approval and visible evidence.

### Step 4: Define Prefab And Data Boundaries

Write clear rules for:

- player prefab or player object
- camera prefab or camera rig
- interactable, enemy, hazard, puzzle, or challenge prefabs
- UI prefabs
- manager/service objects
- ScriptableObject or serialized data assets

Each rule must answer:

- Where does this object live?
- Who may edit it?
- What components or data are required?
- What changes are forbidden without approval?
- How does a reviewer verify that the object still fits?

Do not let agents use production scenes as the only place where behavior exists. If possible, define
a smoke scene or prefab/test path for feature work.

### Step 5: Freeze Input And Camera Policy

Input and camera are part of 3C feel. They cannot remain vague.

Create explicit decisions for:

- input package or approach
- keyboard/mouse baseline
- controller support or deferral
- rebinding support or deferral
- who may change input mappings
- camera type
- camera follow/framing rules
- allowed tuning parameters
- forbidden camera changes
- verification evidence

Agents may implement input or camera code only inside an approved task. They may not change the
player feel target, camera style, or control scheme to make their implementation easier.

### Step 6: Choose One Communication Policy

Choose the simplest event/channel approach that fits the slice. Options include:

- direct serialized references for very small slices
- C# events for state-to-UI or success/failure notifications
- ScriptableObject channels if the project already uses them deliberately
- a small service object if lifecycle and dependencies are clear

Do not add a broad event bus, dependency injection framework, or service locator unless the current
slice has a specific need. Architecture that hides simple relationships behind a framework fails
this module.

### Step 7: Define Test Structure Without Becoming Module 8

Module 4 only defines where verification belongs and what minimal evidence protects architecture.
Module 8 will build the full verification system later.

Minimum Module 4 test structure:

- where edit mode tests will live
- where play mode tests will live
- where smoke scene/manual smoke evidence will live
- what behavior must be smoke-tested before Module 5
- how reviewer agents should report architecture-fit failures

The minimum smoke check should prove that the chosen prototype's core loop can still launch and be
exercised after architecture changes.

### Step 8: Write Do-Not-Touch Boundaries

Create explicit boundaries for agents.

Required protected areas:

- production scenes
- prefabs and prefab variants
- input settings
- camera settings
- build/package/project settings
- generated/cache folders
- package manifest
- third-party and generated assets
- scope, cut plan, and human-owned feel decisions

For each boundary, name:

- why it is protected
- who can approve a change
- what the agent may do instead
- what evidence is required if the change is approved

This is the most important step for preventing agent damage in Module 5.

### Step 9: Run A Sample Feature Fit Check

Create:

```text
docs/ARCHITECTURE-FIT-CHECK.md
```

Use one in-scope feature from the vertical-slice spec and one out-of-scope feature. Fill this table:

| Proposed feature | Fits architecture? | Why | Files/scenes/prefabs touched | Approval needed? | Evidence required |
|---|---|---|---|---|---|
| In-scope feature |  |  |  |  |  |
| Out-of-scope feature |  |  |  |  |  |

The out-of-scope feature should fail for a concrete reason, such as touching a protected production
scene, changing input/camera policy, adding a package, bypassing prefab boundaries, or expanding the
vertical-slice spec.

### Step 10: Run The Cold-Agent Architecture Handoff

Start a fresh agent session with no chat history. Give it only the Unity repo and ask:

```text
Read AGENTS.md or CLAUDE.md, docs/AGENT-ROLES.md, docs/VERTICAL-SLICE-SPEC.md,
docs/CUT-PLAN.md, docs/CHOSEN-PROTOTYPE.md, docs/UNITY-ARCHITECTURE.md, and
docs/ARCHITECTURE-FIT-CHECK.md.

Without editing files, explain the next safe production feature you could implement. Name the scene,
prefabs, scripts, data, input/camera boundaries, approval gates, tests or smoke evidence, and one
feature that does not fit the architecture.
```

Save the response as:

```text
docs/COLD-AGENT-ARCHITECTURE-HANDOFF.md
```

The response passes only if the agent can identify a safe feature path and reject an out-of-scope
feature without asking how the Unity project is organized.

## Required Artifacts

Submit these artifacts:

| Artifact | Required evidence |
|---|---|
| `docs/ARCHITECTURE-INVENTORY.md` | Chosen prototype inventory with keep/replace/cut decisions |
| Filled `docs/UNITY-ARCHITECTURE.md` | Scene map, folder conventions, prefab/data rules, input/camera/event/UI/save policies, test structure, do-not-touch boundaries, agent change rules, reviewer prompt |
| Scene map evidence | Production scene, smoke/test scene, and prototype-only scenes clearly identified |
| Prefab/data boundary evidence | Player, camera, interactable/enemy/hazard/challenge, UI, manager/service, and data rules documented |
| Input and camera policy | Baseline controls, camera type, allowed tuning, forbidden changes, and approval owner |
| Test/smoke structure | Edit/play/smoke locations and minimum smoke path named |
| `docs/ARCHITECTURE-FIT-CHECK.md` | One in-scope feature passes and one out-of-scope feature fails for concrete architectural reasons |
| `docs/COLD-AGENT-ARCHITECTURE-HANDOFF.md` | Fresh agent can name next safe feature, touched areas, approval gates, verification, and a feature that does not fit |
| Module 4 review note | Human pass/fail decision tying the submission to the reviewer-agent architecture gate |

Optional but useful evidence:

- scene hierarchy screenshots
- prefab inspector screenshots
- folder tree screenshot or `tree` output
- smoke scene screenshot
- reviewer-agent transcript

## Review Prompts

Reviewers answer these as binary checks:

- Does `UNITY-ARCHITECTURE.md` link to the chosen prototype and vertical-slice spec?
- Does the scene map identify the production gameplay scene and a smoke/test scene?
- Are prototype-only scenes marked as not production?
- Are agents blocked from editing production scenes without approval?
- Are folder conventions specific enough that a fresh agent knows where scripts, prefabs, data,
  scenes, tests, and placeholders belong?
- Are prefab boundaries documented for player, camera, interactables/enemies/hazards/challenges, UI,
  and manager/service objects?
- Does the architecture define whether ScriptableObjects, serialized components, JSON, or no data
  layer is used?
- Is input policy fixed and approval-owned?
- Is camera policy fixed and approval-owned?
- Is the event/channel policy simple and specific to the slice?
- Does UI policy prevent unscoped screens?
- Does save/progress policy either define minimum state or explicitly defer persistence?
- Does test structure name edit, play, smoke, or reviewer checks?
- Are do-not-touch boundaries explicit for scenes, prefabs, input, camera, packages, build/project
  settings, generated/cache folders, assets, scope, and cut plan?
- Does `ARCHITECTURE-FIT-CHECK.md` show one passing feature and one failing feature?
- Can a reviewer agent inspect a proposed feature and say whether it fits without additional chat
  context?

## Common Failure Modes

- Tangled scene logic: behavior exists only as ad hoc scene wiring with no prefab/script boundary.
- Agents edit production scenes blindly instead of working through a smoke scene or approved task.
- Prefab boundaries are missing, so agents mutate player, camera, UI, or challenge prefabs without
  review.
- Input or camera policy is missing, so agents change 3C feel to make implementation easier.
- Event/channel policy is vague, leading to hidden global lookups, service sprawl, or circular
  dependencies.
- UI screens appear because agents needed debug feedback and nobody named a UI boundary.
- Save/progress is added without the vertical-slice spec requiring it.
- Test structure is deferred entirely, leaving Module 5 with no smoke path.
- Do-not-touch boundaries omit packages, generated/cache folders, build/project settings, or asset
  imports.
- The architecture preserves messy prototype code instead of preserving the prototype's proven loop.
- The reviewer cannot judge whether a proposed feature fits the architecture.
- Architecture expands the game instead of making the chosen slice safer to build.

## Pass/Fail Rubric

Pass if all of these are true:

- `UNITY-ARCHITECTURE.md` is filled and internally consistent with the chosen prototype,
  `VERTICAL-SLICE-SPEC.md`, and `CUT-PLAN.md`.
- The scene map names production, smoke/test, and prototype-only scenes where applicable.
- Folder, script, prefab, data, input, camera, event/channel, UI, save/progress, and test policies
  are concrete enough for a fresh agent to follow.
- Do-not-touch boundaries protect production scenes, prefabs, input, camera, packages, build/project
  settings, generated/cache folders, assets, scope, cut plan, and human-owned feel decisions.
- `ARCHITECTURE-FIT-CHECK.md` demonstrates one in-scope feature that fits and one out-of-scope
  feature that fails.
- A cold agent can identify a safe next production feature, touched files/scenes/prefabs, approval
  gates, verification evidence, and one non-fitting feature without asking how the project is
  organized.
- A reviewer agent can inspect a new feature and tell whether it fits the architecture.

Fail if any of these are true:

- `UNITY-ARCHITECTURE.md` is missing or still a stub.
- There is no scene map.
- There is no smoke/test scene or equivalent safe verification path.
- Agents are allowed to edit production scenes, prefabs, input, camera, packages, project settings,
  or build settings without approval.
- Prefab, data, input, camera, event/channel, UI, save/progress, or test policy is blank.
- The architecture introduces systems not present in the vertical-slice spec.
- The architecture requires hidden chat context to understand where a feature belongs.
- The reviewer fit check is missing or cannot reject an out-of-scope feature.

## Strong Vs Weak Examples

Strong submission:

```text
docs/ARCHITECTURE-INVENTORY.md
docs/UNITY-ARCHITECTURE.md
docs/ARCHITECTURE-FIT-CHECK.md
docs/COLD-AGENT-ARCHITECTURE-HANDOFF.md
```

Strong architecture summary:

```text
Signal Keeper has one production gameplay scene, PuzzleWing, and one smoke scene, Smoke_BeamPuzzle.
Agents may add beam and mirror scripts under Assets/_Project/Scripts/Gameplay and test them in the
smoke scene. Production scene edits, input mappings, camera settings, package manifest changes, and
new third-party assets require approval. The player cursor, mirror, receiver, blocker, HUD, and
result controller prefab families are named with allowed components. UI is limited to HUD, menu,
and results. Save is out of scope. A reviewer can reject a proposed inventory system because it is
not in the vertical-slice spec and has no approved folder, UI, save, or prefab boundary.
```

Why the strong submission passes:

- It starts from the chosen prototype instead of inventing a new game.
- The safe edit path is obvious.
- Production scenes and 3C feel are protected.
- Prefab and data ownership are explicit.
- The smoke path gives agents somewhere safe to prove behavior.
- The reviewer can reject scope drift mechanically.

Weak submission:

```text
Use clean code. Put scripts in Scripts. Agents can edit scenes as needed. Use events where useful.
Input and camera can be tuned during implementation. Tests come later. We will organize prefabs
when there are more of them.
```

Why the weak submission fails:

- It does not name scenes, prefabs, data, input, camera, UI, save, or test boundaries.
- It lets agents edit production scenes blindly.
- It leaves 3C feel unresolved.
- It gives reviewers no way to judge feature fit.
- It postpones architecture until after agent changes can already cause damage.

Gate-boundary example:

```text
The chosen prototype has messy scene-only wiring. The learner keeps the loop but throws away the
wiring: player, mirror, receiver, and result controller become prefab families; the production scene
is protected; agents implement behavior in a smoke scene first. No event bus is added because direct
serialized references plus one result event are enough.
```

This can pass because the architecture protects production work without over-engineering the slice.

## Next Module Handoff

Carry these forward to Module 5:

- `docs/GAME-THESIS.md`
- `docs/CUT-PLAN.md`
- `docs/VERTICAL-SLICE-SPEC.md`
- `docs/CHOSEN-PROTOTYPE.md`
- `docs/UNITY-ARCHITECTURE.md`
- `docs/ARCHITECTURE-FIT-CHECK.md`
- `docs/COLD-AGENT-ARCHITECTURE-HANDOFF.md`
- Module 1 `AGENTS.md` or `CLAUDE.md`
- Module 1 `AGENT-ROLES.md`
- Module 1 approval policy and MCP/editor automation status
- Module 4 review note and pass/fail decision

Module 5 uses this architecture to run parallel gameplay production. If an agent task cannot name
where its scripts, prefabs, scenes, tests, and review evidence belong, it is not ready for parallel
work. Return to `UNITY-ARCHITECTURE.md`, tighten the boundary, and rerun the reviewer fit check
before assigning the task.
