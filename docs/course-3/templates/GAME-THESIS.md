# GAME-THESIS

## Status

complete

## Use When

Use this before writing the vertical-slice spec. It turns a game idea into a small, testable,
production-shaped promise that can survive agent delegation.

This template is required for Module 2 and must be approved before prototype tournament work starts.

## Before You Fill This

Have these inputs ready:

- A rough game idea you can explain in under one minute.
- The target demo length, normally 5-15 minutes.
- Whether the game is intended to be 2D or 3D.
- A first guess at what the player does every 10-30 seconds.
- A first guess at what you can cut if the game gets too large.
- A first guess at asset sources and whether those assets are legal for commercial release.
- A first guess at what the human will own versus what agents may execute.

## Fillable Template

### Project Identity

| Field | Fill |
|---|---|
| Working title |  |
| Genre label |  |
| Target platform | Windows Steam-ready demo |
| Target demo length |  |
| 2D or 3D |  |
| If 3D, link to written cut plan |  |

### One-Sentence Pitch

Write one sentence in this shape:

`[Player] must [verb] through [pressure] using [core mechanic] before [failure threat].`

Pitch:

```text

```

### Player Fantasy

Name the fantasy the player should feel, not the feature list.

Prompt:

- What role does the player inhabit?
- What should they feel competent at by minute 3?
- What should they fear or manage under pressure?
- What makes the fantasy distinct from nearby games?

Player fantasy:

```text

```

### Core Loop

Describe the repeatable 10-30 second loop.

Use this shape:

`Notice -> Decide -> Act -> Feedback -> Reward/Penalty -> New Pressure`

| Loop step | What happens in this game? |
|---|---|
| Notice |  |
| Decide |  |
| Act |  |
| Feedback |  |
| Reward or penalty |  |
| New pressure |  |

### 3C Definition

Define character, camera, and controls tightly enough that an agent can prototype them.

| 3C | Decision | Non-negotiable feel target | What is out of scope |
|---|---|---|---|
| Character |  |  |  |
| Camera |  |  |  |
| Controls |  |  |  |

### Win/Loss Or Success/Failure

Choose one clear success condition and one clear failure condition.

| Condition type | Definition | Player-facing signal |
|---|---|---|
| Success |  |  |
| Failure |  |  |

### 2D/3D Choice

Choose deliberately.

| Question | Answer |
|---|---|
| Why this dimensionality is required for the fantasy |  |
| What it makes easier |  |
| What it makes harder |  |
| If 3D, what will be cut first when camera, animation, level-building, or asset burden slips |  |
| If 3D, where the full cut plan lives |  |

Default to 2D unless 3D is essential to the player fantasy or mechanic.

### Scope Bounds

Allowed by default:

| Allowed item | Why it belongs in the vertical slice |
|---|---|
| One core loop |  |
| One main environment |  |
| One player controller |  |
| One enemy, hazard, or challenge family |  |
| One progression layer, if needed |  |

Disallowed by default:

| Disallowed item | Why it is excluded | Exception condition, if any |
|---|---|---|
| Multiplayer |  |  |
| Open world |  |  |
| Live service systems |  |  |
| Large RPG questing |  |  |
| Procedural generation as the main product |  |  |
| Complex economy |  |  |
| Large dialogue trees |  |  |
| Large inventory systems |  |  |

### Named Scope Cut

Name at least one cut now. This is mandatory even for a small thesis.

| Cut name | What gets removed | Trigger | What remains playable |
|---|---|---|---|
|  |  |  |  |

### Asset Legality And Commercial-Use Status

This is a thesis-level estimate, not the final asset ledger.

| Asset category | Likely source | Commercial-use status known? | License/provenance risk |
|---|---|---|---|
| Character |  |  |  |
| Environment |  |  |  |
| UI/icons |  |  |  |
| Audio/music |  |  |  |
| VFX/shaders |  |  |  |

### Human-vs-Agent Delegation Ownership

| Area | Human owns final decision? | Agent may execute? | Review evidence required |
|---|---|---|---|
| Core fantasy | Yes | No |  |
| 3C feel | Yes | Yes |  |
| Scope cuts | Yes | No |  |
| Gameplay code |  |  |  |
| Tools/editor automation |  |  |  |
| Assets/import settings |  |  |  |
| QA/build checks |  |  |  |

## Worked Example

### Project Identity

| Field | Fill |
|---|---|
| Working title | Signal Knife |
| Genre label | 2.5D stealth extraction puzzle |
| Target platform | Windows Steam-ready demo |
| Target demo length | 8-10 minutes |
| 2D or 3D | 3D with fixed isometric camera |
| If 3D, link to written cut plan | `docs/course-3/templates/CUT-PLAN.md`, filled for Signal Knife |

### One-Sentence Pitch

```text
A stranded courier must cross a guarded relay station using thrown signal knives to distract drones
and unlock doors before the station broadcast exposes their location.
```

### Player Fantasy

The player is a precise, under-equipped infiltrator who wins through timing and misdirection rather
than combat. By minute 3, they should feel clever for chaining a thrown knife, a drone sound lure,
and a door override. They should fear being seen by patrol cones and running out of safe knife
retrieval opportunities.

### Core Loop

| Loop step | What happens in this game? |
|---|---|
| Notice | Player reads patrol cones, locked doors, knife recall range, and sound-reactive objects. |
| Decide | Player chooses whether to distract, disable a relay, retrieve the knife, or hide. |
| Act | Player aims and throws one signal knife, recalls it, or moves between cover points. |
| Feedback | Drones rotate, lights change color, doors pulse, and audio pings show lure strength. |
| Reward or penalty | Correct throw opens a route; bad timing raises alarm meter or blocks knife retrieval. |
| New pressure | Patrol pattern tightens and the broadcast timer keeps counting down. |

### 3C Definition

| 3C | Decision | Non-negotiable feel target | What is out of scope |
|---|---|---|---|
| Character | Single courier with crouch-speed movement and no jump. | Movement is crisp and readable, never physics-wobbly. | Climbing, vaulting, parkour, melee combat. |
| Camera | Fixed isometric 3D camera with room-by-room framing. | Player always sees patrol cones and the next objective. | Free camera, shoulder camera, cinematic camera cuts. |
| Controls | WASD move, mouse aim, left click throw, right click recall, E interact. | Throw and recall must feel instant and predictable. | Controller rebinding in slice, complex ability wheel. |

### Win/Loss Or Success/Failure

| Condition type | Definition | Player-facing signal |
|---|---|---|
| Success | Player reaches the extraction elevator after disabling three relays. | Elevator door opens, broadcast timer stops, results screen appears. |
| Failure | Alarm meter fills or timer reaches zero. | Station lights turn red, drones converge, failure screen appears. |

### 2D/3D Choice

| Question | Answer |
|---|---|
| Why this dimensionality is required for the fantasy | Patrol cone readability, room geometry, and thrown-object arcs benefit from 3D depth. |
| What it makes easier | Using Asset Store modular sci-fi rooms and readable drone patrol volumes. |
| What it makes harder | Camera occlusion, animation polish, collision, nav paths, and environment dressing. |
| If 3D, what will be cut first when camera, animation, level-building, or asset burden slips | Cut room count from 4 to 2, remove animated courier body, use capsule with first-person-style arm/knife feedback. |
| If 3D, where the full cut plan lives | `CUT-PLAN.md` filled with the Signal Knife sequence. |

### Scope Bounds

Allowed:

| Allowed item | Why it belongs in the vertical slice |
|---|---|
| One core loop | Throw/recall signal knife to manipulate drones and doors. |
| One main environment | One relay station wing. |
| One player controller | Courier movement, throw, recall, interact. |
| One enemy, hazard, or challenge family | Sound-reactive patrol drones. |
| One progression layer, if needed | Relay disable count opens extraction. |

Disallowed:

| Disallowed item | Why it is excluded | Exception condition, if any |
|---|---|---|
| Multiplayer | No relevance to the slice. | None. |
| Open world | Room-by-room stealth is the point. | None. |
| Live service systems | Not needed for a demo candidate. | None. |
| Large RPG questing | Would dilute the stealth loop. | None. |
| Procedural generation as the main product | Hand-authored patrol puzzles are easier to polish. | None. |
| Complex economy | No shop or currency needed. | None. |
| Large dialogue trees | Story delivered through environment and one-line objective prompts. | None. |
| Large inventory systems | Single tool game. | None. |

### Named Scope Cut

| Cut name | What gets removed | Trigger | What remains playable |
|---|---|---|---|
| Two-room cut | Remove rooms 3 and 4 plus final drone variant. | If first two rooms are not fun and stable by Module 8. | Tutorial room, challenge room, extraction door, success/failure flow. |

### Asset Legality And Commercial-Use Status

| Asset category | Likely source | Commercial-use status known? | License/provenance risk |
|---|---|---|---|
| Character | Hand-authored capsule/prototype mesh, later Asset Store humanoid if needed. | Yes for prototype; store asset must be checked. | Medium if humanoid asset is added late. |
| Environment | Commercial-use modular sci-fi corridor pack. | Must verify EULA before import. | Medium. |
| UI/icons | AI-generated placeholders redrawn by learner or CC0 icon set. | Must log source before release package. | Medium. |
| Audio/music | FreeSound/CC0 or purchased pack only. | Not known yet. | High until logged. |
| VFX/shaders | Unity URP built-ins plus hand-authored simple materials. | Yes. | Low. |

### Human-vs-Agent Delegation Ownership

| Area | Human owns final decision? | Agent may execute? | Review evidence required |
|---|---|---|---|
| Core fantasy | Yes | No | Human thesis approval note. |
| 3C feel | Yes | Yes | Captured playtest notes and diff review. |
| Scope cuts | Yes | No | Cut-plan approval. |
| Gameplay code | Yes | Yes | PR diff, test scene, play-mode evidence. |
| Tools/editor automation | Yes | Yes with approval | Editor script diff and rollback note. |
| Assets/import settings | Yes | Yes with ledger update | Asset ledger row and in-game screenshot. |
| QA/build checks | Yes | Yes | Test/build logs and bug list. |

## Required Fields

The filled thesis must include:

- Working title.
- One-sentence pitch.
- Player fantasy.
- Core loop.
- Character definition.
- Camera definition.
- Controls definition.
- Success condition.
- Failure condition.
- 2D/3D choice.
- Scope bounds.
- At least one named scope cut.
- Asset legality and commercial-use status estimate.
- Human-vs-agent delegation ownership.
- Written cut-plan link if the project is 3D.

## Reject If Missing

Reject the thesis if any of these are true:

- The H1 is not `# GAME-THESIS`.
- `Status` is not one of the allowed schema values.
- The pitch is longer than two sentences.
- The player fantasy describes only mechanics and no desired feeling.
- The core loop does not include player action and game feedback.
- Any 3C row is blank.
- Success or failure is missing.
- The 2D/3D choice is missing.
- A 3D project does not link to a written cut plan.
- There is no named scope cut.
- Asset legality and commercial-use status are not addressed.
- Human-vs-agent delegation ownership is missing.
- The allowed/disallowed scope bounds are blank.

## Reviewer Notes

Review this template as a scope contract, not as a pitch deck. A good thesis makes the game smaller
and sharper.

Ask:

- Could an agent prototype the first playable from this without inventing the game?
- Does the dimensionality choice create more value than production burden?
- Does the named cut preserve a playable game?
- Does the thesis make asset legality visible early enough to prevent release surprises?
- Is the human clearly retaining taste, scope, and final approval?
