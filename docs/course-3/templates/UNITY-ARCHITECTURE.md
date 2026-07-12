# UNITY-ARCHITECTURE

## Status

complete

## Use When

Use this after Module 3 chooses one prototype and before agents build production gameplay features.
It turns a playable prototype into a Unity project shape that agents can extend without creating
tangled scene logic, unsafe prefab edits, or invisible architectural drift.

This template is required for Module 4. The filled file should live in the learner project as
`docs/UNITY-ARCHITECTURE.md`.

## Before You Fill This

Have these inputs ready:

- Filled `GAME-THESIS.md`.
- Filled `VERTICAL-SLICE-SPEC.md`.
- Filled `CUT-PLAN.md`.
- Filled `CHOSEN-PROTOTYPE.md`.
- Prototype evidence and kill memos from Module 3.
- Module 1 `AGENTS.md` or `CLAUDE.md`.
- Module 1 `AGENT-ROLES.md`.
- Current Unity version, render pipeline, and 2D/3D choice.
- Current MCP/editor automation status: validated narrow use, read-only only, or cut.
- Any known package, input, camera, scene, prefab, or save/progress constraints.

If the chosen prototype is not clear enough to identify the first production scene and core loop,
repair Module 3 before filling this architecture template.

## Fillable Template

Copy this section into the learner project and fill every blank.

### Project Snapshot

| Field | Fill |
|---|---|
| Working title |  |
| Unity version |  |
| Render pipeline |  |
| 2D or 3D |  |
| Chosen prototype link |  |
| Vertical-slice spec link |  |
| Cut-plan link |  |
| Architecture owner |  |
| Reviewer owner |  |

### Architecture Goal

Write one paragraph describing what this architecture must make easy and what it must prevent.

```text

```

### Scene Map

List every scene expected before Module 5. Keep this small.

| Scene | Purpose | Loaded by | Owns which objects? | Agents may edit? | Verification |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

Rules:

- Name the production gameplay scene.
- Name any menu, bootstrap, smoke, test, or results scenes.
- If a scene is prototype-only, mark it as not production.
- If agents may edit a scene, name the exact boundaries.

### Folder Conventions

Define the project folders agents may use.

| Folder | Purpose | Agents may edit? | Required review |
|---|---|---|---|
| `Assets/_Project/Scenes/` |  |  |  |
| `Assets/_Project/Scripts/` |  |  |  |
| `Assets/_Project/Prefabs/` |  |  |  |
| `Assets/_Project/Data/` |  |  |  |
| `Assets/_Project/UI/` |  |  |  |
| `Assets/_Project/Art/Placeholders/` |  |  |  |
| `Assets/_Project/Tests/` |  |  |  |

Generated/cache folders that agents must not edit:

```text

```

### Prefab Rules

| Prefab or prefab family | Purpose | Source scene or folder | Editable by agents? | Required components | Forbidden changes |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

Rules:

- Name the player prefab or prototype player object.
- Name enemy, hazard, interactable, camera, UI, and manager prefab families if they exist.
- State whether agents may create variants.
- State which prefab changes require human approval.

### Script And Assembly Rules

| Script area | Folder/assembly | Purpose | Dependencies allowed | Tests expected |
|---|---|---|---|---|
| Gameplay runtime |  |  |  |  |
| Data/config |  |  |  |  |
| UI/runtime |  |  |  |  |
| Editor/tools |  |  |  |  |
| Tests |  |  |  |  |

Rules:

- Runtime scripts must not depend on editor-only code.
- Pure logic should be testable without scene wiring where practical.
- Hidden `FindObjectOfType` or global scene lookups require justification.
- Agents must not create circular dependencies to make a feature pass quickly.

### ScriptableObject And Data Rules

| Data asset | Purpose | Folder | Runtime reads? | Agents may create/edit? | Validation |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

State whether the project uses ScriptableObjects, plain serialized components, JSON, or no separate
data layer yet. If the slice does not need a data layer, write that explicitly.

### Input Policy

| Input area | Decision |
|---|---|
| Input package or approach |  |
| Keyboard/mouse baseline |  |
| Controller support |  |
| Rebinding in slice |  |
| Who may change input mappings |  |
| Verification evidence |  |

Input changes require human approval unless the current task explicitly authorizes them.

### Camera Policy

| Camera area | Decision |
|---|---|
| Camera type |  |
| Follow/framing rules |  |
| Allowed tuning parameters |  |
| Forbidden camera changes |  |
| 3D camera risk, if applicable |  |
| Verification evidence |  |

Camera and feel remain human-owned decisions. Agents may implement bounded tuning only when the task
and review evidence name the target.

### Event And Channel Policy

Choose one communication approach for this stage.

| Communication need | Approved approach | Forbidden shortcut | Verification |
|---|---|---|---|
| Player action to game system |  |  |  |
| Game state to UI |  |  |  |
| Win/loss or success/failure |  |  |  |
| Audio/VFX feedback |  |  |  |

Allowed approaches include direct serialized references for small slices, C# events, ScriptableObject
channels, or a simple service object. Do not introduce an event bus unless the slice needs it.

### UI Policy

| UI surface | Purpose | Scene/prefab | Agents may edit? | Review evidence |
|---|---|---|---|---|
| HUD |  |  |  |  |
| Menu |  |  |  |  |
| Pause |  |  |  |  |
| Results |  |  |  |  |

If a UI surface is deferred, write the module where it will be handled. Do not let agents add UI
screens outside the spec without a scope decision.

### Save And Progress Policy

| Question | Decision |
|---|---|
| Does the slice need save/progress? |  |
| If yes, what is the minimum state? |  |
| If no, why not? |  |
| Who may change save/progress behavior? |  |
| Verification evidence |  |

Default to no persistent save unless the vertical-slice spec requires it.

### Test Structure

| Test type | What it covers | Folder | Required by Module 4? | Evidence |
|---|---|---|---|---|
| Edit mode |  |  |  |  |
| Play mode |  |  |  |  |
| Smoke scene/manual smoke |  |  |  |  |
| Validator/reviewer checklist |  |  |  |  |

Module 4 does not need full Module 8 verification, but it must define where future tests and smoke
checks belong.

### Do-Not-Touch Boundaries

List exact paths, assets, settings, and decisions agents must not change without approval.

| Boundary | Why protected | Approval owner | Allowed alternative |
|---|---|---|---|
|  |  |  |  |

Required boundaries:

- production scenes
- prefabs and prefab variants
- input settings
- camera settings
- build/package/project settings
- generated/cache folders
- package manifest
- asset imports and licenses
- current scope, cut plan, and human-owned feel decisions

### Agent Change Rules

| Change type | Allowed without approval? | Required evidence |
|---|---|---|
| Add small runtime script inside approved feature |  |  |
| Add or update test |  |  |
| Create new prefab |  |  |
| Edit production scene |  |  |
| Change input/camera/project settings |  |  |
| Install package |  |  |
| Add generated or third-party asset |  |  |
| Run editor automation that writes assets/scenes/settings |  |  |

### Architecture Fit Check

Use this checklist when any agent proposes a new feature:

| Check | Pass/fail | Evidence |
|---|---|---|
| Feature maps to `VERTICAL-SLICE-SPEC.md` |  |  |
| Scene touched is allowed |  |  |
| Prefabs touched are allowed |  |  |
| Input/camera policy is respected |  |  |
| Dependencies fit script/assembly rules |  |  |
| Data/config belongs in approved location |  |  |
| UI changes fit UI policy |  |  |
| Save/progress policy is respected |  |  |
| Tests or smoke evidence are named |  |  |
| Do-not-touch boundaries are preserved |  |  |

### Reviewer Prompt

Copy this prompt for a fresh reviewer agent:

```text
Read AGENTS.md or CLAUDE.md, docs/AGENT-ROLES.md, docs/VERTICAL-SLICE-SPEC.md,
docs/CUT-PLAN.md, docs/CHOSEN-PROTOTYPE.md, and docs/UNITY-ARCHITECTURE.md.

Without editing files, inspect the proposed feature or diff. Say whether it fits the architecture.
Name any scene, prefab, input, camera, data, UI, save, test, package, asset, or do-not-touch boundary
that is violated. If it fits, name the evidence required before merge.
```

## Worked Example

### Project Snapshot

| Field | Fill |
|---|---|
| Working title | Signal Keeper |
| Unity version | Unity 6.3 LTS |
| Render pipeline | URP |
| 2D or 3D | 2D |
| Chosen prototype link | `docs/CHOSEN-PROTOTYPE.md`, P2 mirror-routing prototype |
| Vertical-slice spec link | `docs/VERTICAL-SLICE-SPEC.md` |
| Cut-plan link | `docs/CUT-PLAN.md` |
| Architecture owner | Solo learner as technical director |
| Reviewer owner | Reviewer agent plus human final approval |

### Architecture Goal

Signal Keeper needs a small, inspectable architecture where agents can add beam puzzle features
without editing production scenes blindly. The architecture should make mirror, receiver, blocker,
timer, and HUD work easy to extend while preventing package churn, camera changes, untracked
prefab edits, and new puzzle systems outside the chosen prototype.

### Scene Map

| Scene | Purpose | Loaded by | Owns which objects? | Agents may edit? | Verification |
|---|---|---|---|---|---|
| `Bootstrap` | Optional startup and service wiring. | Build index 0. | Game bootstrap only. | No, unless approved. | Enters `MainMenu`. |
| `MainMenu` | Start and quit. | Bootstrap or direct launch. | Menu UI. | Yes for UI copy/layout within policy. | Start reaches `PuzzleWing`. |
| `PuzzleWing` | Main vertical-slice gameplay. | Main menu. | Player cursor, mirrors, beam, receiver, blocker, timer. | No scene edits without approval; scripts may target prefabs/test scene first. | Player can win/fail. |
| `Smoke_BeamPuzzle` | Test/smoke scene for beam logic. | Manual/test runner. | Minimal mirror and receiver setup. | Yes. | Smoke checklist passes. |
| `Results` | Success/failure return flow. | Gameplay controller. | Results UI. | Yes for UI inside policy. | Returns to menu. |

### Folder Conventions

| Folder | Purpose | Agents may edit? | Required review |
|---|---|---|---|
| `Assets/_Project/Scenes/` | Production and smoke scenes. | Smoke scene yes; production scenes ask first. | Scene diff or screenshot. |
| `Assets/_Project/Scripts/Gameplay/` | Beam, mirror, receiver, blocker, timer scripts. | Yes inside approved feature. | Diff and smoke test. |
| `Assets/_Project/Scripts/UI/` | HUD/menu/results scripts. | Yes inside approved UI task. | Screenshot and checklist. |
| `Assets/_Project/Prefabs/` | Player cursor, mirror, receiver, blocker, HUD prefabs. | Create variants only with approval. | Prefab diff summary. |
| `Assets/_Project/Data/` | Puzzle tuning ScriptableObjects if needed. | Yes for approved data rows. | Inspector screenshot. |
| `Assets/_Project/Art/Placeholders/` | Self-authored placeholder sprites/materials. | Yes. | Asset ledger note if shipped. |
| `Assets/_Project/Tests/` | Edit/play mode tests and smoke notes. | Yes. | Test result. |

Generated/cache folders agents must not edit:

```text
Library/
Temp/
Obj/
Build/
Builds/
Logs/
UserSettings/
```

### Prefab Rules

| Prefab or prefab family | Purpose | Source scene or folder | Editable by agents? | Required components | Forbidden changes |
|---|---|---|---|---|---|
| `PlayerCursor` | Mouse/keyboard selection marker. | `Assets/_Project/Prefabs/Player/` | Yes, scripts only unless approved. | `PlayerInputReader`, `MirrorInteractor`. | No camera/input changes. |
| `Mirror` | Rotatable beam reflector. | `Assets/_Project/Prefabs/Puzzle/` | Yes via test scene first. | Collider, `MirrorRotator`, visual marker. | No hidden global lookups. |
| `Receiver` | Success target. | `Assets/_Project/Prefabs/Puzzle/` | Yes. | Collider, `BeamReceiver`. | No direct scene-manager calls. |
| `Blocker` | Optional obstruction. | `Assets/_Project/Prefabs/Puzzle/` | Yes if in spec. | Collider, readable placeholder sprite. | No extra damage/combat behavior. |
| `Hud` | Timer and goal text. | `Assets/_Project/Prefabs/UI/` | Yes inside UI policy. | `HudPresenter`. | No new screens without spec update. |

### Script And Assembly Rules

| Script area | Folder/assembly | Purpose | Dependencies allowed | Tests expected |
|---|---|---|---|---|
| Gameplay runtime | `Scripts/Gameplay` | Beam, mirror, receiver, blocker, timer. | Unity runtime and project data. | Edit tests for pure beam math, smoke scene. |
| Data/config | `Scripts/Data`, `Data/` | Tuning values for puzzle objects. | Runtime only. | Inspector validation where practical. |
| UI/runtime | `Scripts/UI` | HUD/menu/results presentation. | Runtime gameplay events, no puzzle mutation. | Manual screenshot/smoke note. |
| Editor/tools | `Scripts/Editor` | Future validators. | Editor only. | Dry-run output. |
| Tests | `Tests/EditMode`, `Tests/PlayMode` | Protect core behavior. | Test assemblies only. | Passing result or documented blocker. |

### ScriptableObject And Data Rules

| Data asset | Purpose | Folder | Runtime reads? | Agents may create/edit? | Validation |
|---|---|---|---|---|---|
| `BeamPuzzleTuning` | Beam length, rotation step, timer length. | `Assets/_Project/Data/` | Yes. | Yes within approved values. | Inspector screenshot and smoke note. |

No JSON save/config is needed for the slice. Save/progress is deferred unless Module 5 proves it is
required.

### Input Policy

| Input area | Decision |
|---|---|
| Input package or approach | Unity built-in input for prototype; Input System package requires approval. |
| Keyboard/mouse baseline | Mouse select, Q/E rotate, Space start beam test, Esc pause. |
| Controller support | Out of scope until later review. |
| Rebinding in slice | Deferred. |
| Who may change input mappings | Human approval required. |
| Verification evidence | Input checklist in smoke note. |

### Camera Policy

| Camera area | Decision |
|---|---|
| Camera type | Fixed 2D orthographic camera. |
| Follow/framing rules | No follow; room must fit one screen. |
| Allowed tuning parameters | Orthographic size and position after human approval. |
| Forbidden camera changes | No dynamic camera, zoom, shake, or 3D camera. |
| 3D camera risk, if applicable | Not applicable; 2D selected. |
| Verification evidence | Screenshot of whole puzzle room. |

### Event And Channel Policy

| Communication need | Approved approach | Forbidden shortcut | Verification |
|---|---|---|---|
| Player action to game system | Serialized references from interactor to selected mirror. | Global scene search every frame. | Smoke play note. |
| Game state to UI | C# event from timer/result controller to HUD presenter. | UI directly mutates puzzle state. | HUD screenshot. |
| Win/loss or success/failure | `RunResultController` owns result transition. | Individual puzzle objects loading scenes. | Success/failure smoke path. |
| Audio/VFX feedback | Deferred visual pulse only. | Importing audio packages/assets. | Visual feedback note. |

### UI Policy

| UI surface | Purpose | Scene/prefab | Agents may edit? | Review evidence |
|---|---|---|---|---|
| HUD | Goal, timer, simple feedback. | `Hud` prefab. | Yes within task. | Screenshot. |
| Menu | Start and quit. | `MainMenu`. | Yes. | Launch checklist. |
| Pause | Minimal pause/resume. | Deferred to later module unless needed. | No until approved. | Out-of-scope note. |
| Results | Success/failure and return. | `Results`. | Yes. | Smoke note. |

### Save And Progress Policy

| Question | Decision |
|---|---|
| Does the slice need save/progress? | No. |
| If yes, what is the minimum state? | Not applicable. |
| If no, why not? | Demo is a single short puzzle run. |
| Who may change save/progress behavior? | Human producer approval required. |
| Verification evidence | Spec and architecture both mark save out of scope. |

### Test Structure

| Test type | What it covers | Folder | Required by Module 4? | Evidence |
|---|---|---|---|---|
| Edit mode | Beam reflection math if extracted from scene. | `Assets/_Project/Tests/EditMode/` | Recommended. | Test output. |
| Play mode | One mirror routes beam to receiver. | `Assets/_Project/Tests/PlayMode/` | Optional until Module 8. | Test or smoke note. |
| Smoke scene/manual smoke | Launch, rotate mirror, win/fail. | `Smoke_BeamPuzzle`. | Yes. | Smoke checklist. |
| Validator/reviewer checklist | Missing references and architecture fit. | `docs/ARCHITECTURE-FIT-CHECK.md`. | Yes. | Reviewer result. |

### Do-Not-Touch Boundaries

| Boundary | Why protected | Approval owner | Allowed alternative |
|---|---|---|---|
| `PuzzleWing.unity` production scene | Prevent hidden scene wiring drift. | Human director/producer. | Work in `Smoke_BeamPuzzle` first. |
| Input mappings | Controls are part of 3C feel. | Human director. | Propose change in docs. |
| Camera settings | Room readability is human-owned. | Human director. | Screenshot recommendation. |
| `Packages/manifest.json` | Package churn breaks reproducibility. | Human producer. | Ask with package/version/reason. |
| Third-party assets | Legal/commercial risk. | Human technical art owner. | Use primitives/placeholders. |
| `CUT-PLAN.md` scope cuts | Scope is human-owned. | Human producer/director. | Recommend cut, do not apply. |

### Agent Change Rules

| Change type | Allowed without approval? | Required evidence |
|---|---|---|
| Add small runtime script inside approved feature | Yes | Diff, smoke note. |
| Add or update test | Yes | Test output. |
| Create new prefab | Ask first | Proposed path and purpose. |
| Edit production scene | Ask first | Scene diff/screenshot and rollback note. |
| Change input/camera/project settings | Ask first | Human approval and verification. |
| Install package | Ask first | Package, version, reason, rollback. |
| Add generated or third-party asset | Ask first | Asset ledger row. |
| Run editor automation that writes assets/scenes/settings | Ask first | Throwaway proof or dry-run. |

## Required Fields

The filled architecture document must include:

- Working title.
- Unity version.
- Render pipeline.
- 2D/3D choice.
- Chosen prototype link.
- Vertical-slice spec link.
- Cut-plan link.
- Architecture owner and reviewer owner.
- Architecture goal.
- Scene map.
- Folder conventions.
- Prefab rules.
- Script and assembly rules.
- ScriptableObject or data policy, even if the answer is "none yet."
- Input policy.
- Camera policy.
- Event/channel policy.
- UI policy.
- Save/progress policy, even if the answer is "none."
- Test structure.
- Do-not-touch boundaries.
- Agent change rules.
- Architecture fit check.
- Fresh reviewer prompt.

## Reject If Missing

Reject the architecture if any of these are true:

- The H1 is not `# UNITY-ARCHITECTURE`.
- `Status` is not one of the allowed schema values.
- It does not link to `VERTICAL-SLICE-SPEC.md`.
- It does not link to the chosen prototype.
- It lacks a scene map.
- It lacks folder conventions.
- It lacks prefab boundaries.
- It lacks input policy.
- It lacks camera policy.
- It lacks event/channel or communication policy.
- It lacks UI policy.
- It lacks save/progress policy.
- It lacks test structure.
- It lacks do-not-touch boundaries for agents.
- It lets agents edit production scenes, prefabs, input, camera, package, build, or project settings
  without approval.
- It does not say how a reviewer checks whether a feature fits.
- It introduces architecture for systems that are not in the vertical-slice spec.
- If the project is 3D, it does not link to a written cut plan for 3D camera, animation,
  level-building, navigation/collision, and asset burden.

Spec-stage reject checks for asset legality and named scope cuts are not owned by this template;
they are owned by `GAME-THESIS.md`, `VERTICAL-SLICE-SPEC.md`, and `CUT-PLAN.md`. This template must
still reject architecture that bypasses those approved docs.

## Reviewer Notes

Review this template as an agent-safety contract, not a software architecture essay.

Ask:

- Could a fresh agent identify which scene, prefab, folder, and script area to touch for a feature?
- Could the same agent identify what it must not touch without approval?
- Can a reviewer inspect a proposed feature and answer "fits" or "does not fit" from this document?
- Does the architecture serve the chosen prototype instead of inventing a larger game?
- Does the architecture keep human-owned taste, feel, camera, scope, and legal/commercial decisions
  out of agent autopilot?

Pass the document only when it makes safe extension more obvious than improvisation.
