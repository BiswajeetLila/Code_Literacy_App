# CUT-PLAN

## Status

complete

## Use When

Use this when approving a game thesis, approving a vertical-slice spec, or continuing any project
whose scope is slipping.

This template is mandatory for every Course 3 project. It is especially mandatory for 3D projects,
because camera, animation, level-building, and asset burden must have pre-approved cuts before
production starts.

## Before You Fill This

Have these inputs ready:

- Approved or draft `GAME-THESIS.md`.
- Draft `VERTICAL-SLICE-SPEC.md`.
- Target demo length.
- Current highest-risk features.
- Current asset strategy and commercial-use status.
- Human-vs-agent delegation map.
- The minimum playable demo promise you refuse to break.

## Fillable Template

### Project Snapshot

| Field | Fill |
|---|---|
| Working title |  |
| Dimensionality |  |
| Target demo length |  |
| Thesis link |  |
| Spec link |  |
| Human decision owner |  |

### Preserve At All Costs

Name the minimum game that must survive every cut.

| Preserve item | Why it is essential | Evidence it still works after cuts |
|---|---|---|
| Core player fantasy |  |  |
| Core loop |  |  |
| 3C baseline |  |  |
| Success/failure flow |  |  |
| Steam-ready package baseline |  |  |

### Cut Triggers

Define objective triggers, not vibes.

| Trigger | Measurement | Who calls it | Deadline |
|---|---|---|---|
| Camera complexity slipping |  | Human director |  |
| Animation complexity slipping |  | Human director |  |
| Level/content production slipping |  | Human producer |  |
| Asset legality unresolved |  | Human producer |  |
| Core mechanic unstable |  | Human director |  |
| Performance budget failing |  | QA lead |  |
| Build/package failing |  | Build engineer + human producer |  |

### Ordered Cut Sequence

List cuts in the order they will be made. Priority 1 is removed first.

| Priority | Cut name | Trigger | Remove | Keep | New acceptance gate | Human approval required? |
|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  | Yes |
| 2 |  |  |  |  |  | Yes |
| 3 |  |  |  |  |  | Yes |
| 4 |  |  |  |  |  | Yes |
| 5 |  |  |  |  |  | Yes |

### 3D Tax Cuts

Fill this for every project. If the project is 2D, explain why each 3D tax row is not applicable.

| 3D burden | Cut if it slips | Trigger | Replacement |
|---|---|---|---|
| Camera |  |  |  |
| Animation |  |  |  |
| Level-building |  |  |  |
| Asset burden |  |  |  |
| Navigation/collision |  |  |  |

### Asset Legality Cuts

| Asset category | Legal/commercial-use risk | Cut or fallback | Trigger | Ledger evidence required |
|---|---|---|---|---|
| Character |  |  |  |  |
| Environment |  |  |  |  |
| Audio/music |  |  |  |  |
| UI/icons/fonts |  |  |  |  |
| VFX/shaders |  |  |  |  |

### Human-vs-Agent Cut Authority

| Cut type | Agent may recommend? | Agent may execute after approval? | Human owner | Evidence required |
|---|---|---|---|---|
| Remove feature |  |  |  |  |
| Replace asset source |  |  |  |  |
| Simplify 3C |  |  |  |  |
| Reduce content count |  |  |  |  |
| Change Steam-ready package definition | No | No |  |  |

### Verification After Each Cut

| Check | Pass condition | Evidence |
|---|---|---|
| Core loop still playable |  |  |
| Success/failure still works |  |  |
| No missing references |  |  |
| Build still launches |  |  |
| Asset ledger still accurate |  |  |
| Spec updated to match cut |  |  |
| Fresh agent can continue |  |  |

## Worked Example

### Project Snapshot

| Field | Fill |
|---|---|
| Working title | Signal Knife |
| Dimensionality | 3D with fixed isometric camera |
| Target demo length | 8-10 minutes |
| Thesis link | `GAME-THESIS.md` filled for Signal Knife |
| Spec link | `VERTICAL-SLICE-SPEC.md` filled for Signal Knife |
| Human decision owner | Solo learner acting as creative director/producer |

### Preserve At All Costs

| Preserve item | Why it is essential | Evidence it still works after cuts |
|---|---|---|
| Core player fantasy | The game is about being a precise infiltrator using one clever tool. | Player still distracts drones with the signal knife. |
| Core loop | Notice patrol, throw knife, manipulate drone/door, retrieve, move. | One complete room can be won and failed. |
| 3C baseline | Movement, fixed camera, throw/recall controls define the feel. | Playtest confirms controls are readable. |
| Success/failure flow | Steam demo needs a complete run arc. | Success and failure screens still trigger. |
| Steam-ready package baseline | The final output must be packageable. | Windows build launches with README and known issues. |

### Cut Triggers

| Trigger | Measurement | Who calls it | Deadline |
|---|---|---|---|
| Camera complexity slipping | Player loses sight of drones in two consecutive playtests. | Human director | End of Module 4 |
| Animation complexity slipping | Character mesh/animation blocks gameplay work for more than one day. | Human director | End of Module 6 |
| Level/content production slipping | Room 2 is not stable by Module 8. | Human producer | Start of Module 8 |
| Asset legality unresolved | Any release asset lacks commercial-use evidence by Module 8. | Human producer | Module 8 QA gate |
| Core mechanic unstable | Throw/recall fails in smoke test twice after integration. | Human director | Any integration gate |
| Performance budget failing | Build cannot maintain target on test machine after content pass. | QA lead | Module 9 |
| Build/package failing | Windows build fails twice from clean project checkout. | Build engineer + human producer | Module 10 |

### Ordered Cut Sequence

| Priority | Cut name | Trigger | Remove | Keep | New acceptance gate | Human approval required? |
|---|---|---|---|---|---|---|
| 1 | Two-room cut | Room 2 is not stable by Module 8. | Room 3, final drone variant, extra relay. | Tutorial room, one challenge room, extraction. | New player completes demo in 5-7 minutes. | Yes |
| 2 | Capsule character cut | Character mesh or animation blocks gameplay. | Humanoid mesh, bespoke movement animations. | Capsule courier, knife, cloak color marker. | Player can read position and facing. | Yes |
| 3 | Silent build cut | Audio license unresolved by Module 8. | Music, sourced sound effects. | Visual alarm, UI feedback, particle pings. | All gameplay feedback remains readable without audio. | Yes |
| 4 | Static drone cut | Drone animation/VFX slips. | Animated drone parts and complex VFX. | Rotating sphere drone with patrol cone. | Patrol state is readable. | Yes |
| 5 | Menu-lite cut | UI polish slips in Module 9. | Settings beyond volume and sensitivity. | Start, pause, restart, quit, results. | Build still meets Steam-demo baseline. | Yes |

### 3D Tax Cuts

| 3D burden | Cut if it slips | Trigger | Replacement |
|---|---|---|---|
| Camera | Remove tall walls and use cutaway room geometry. | Drones/objectives hidden in playtest. | Low walls, floor markings, room-by-room framing. |
| Animation | Remove humanoid mesh and bespoke animations. | Animation work blocks gameplay for more than one day. | Capsule courier and simple knife hand marker. |
| Level-building | Cut from three rooms to two rooms. | Room 2 not stable by Module 8. | Tutorial room plus one challenge room. |
| Asset burden | Remove decorative set dressing and paid environment dependency. | Asset import/licensing slips. | ProBuilder/primitive graybox with strong lighting. |
| Navigation/collision | Simplify drone paths and recall collision. | Pathing/recall bugs recur after spike. | Hand-placed waypoint loops and collision-ignoring recall. |

### Asset Legality Cuts

| Asset category | Legal/commercial-use risk | Cut or fallback | Trigger | Ledger evidence required |
|---|---|---|---|---|
| Character | Imported humanoid license unclear. | Use self-authored capsule. | No EULA/invoice by Module 6. | Self-authored row in asset ledger. |
| Environment | Paid modular pack EULA not logged. | Use ProBuilder graybox. | No provenance by Module 6. | Unity-created asset row. |
| Audio/music | Free asset has unclear attribution/commercial terms. | Silent build with visual-only feedback. | No clean license by Module 8. | Known-issues note and no shipped audio files. |
| UI/icons/fonts | Font/icon license unclear. | Use Unity default font and text labels. | License missing by Module 8. | Built-in/default note. |
| VFX/shaders | Third-party shader package unsupported. | Use URP built-ins. | Package causes build/perf issue. | Built-in/self-authored ledger row. |

### Human-vs-Agent Cut Authority

| Cut type | Agent may recommend? | Agent may execute after approval? | Human owner | Evidence required |
|---|---|---|---|---|
| Remove feature | Yes | Yes | Human director | Updated spec and cut log. |
| Replace asset source | Yes | Yes | Human technical art owner | Asset ledger update. |
| Simplify 3C | Yes | Yes | Human director | Playtest note and updated thesis/spec. |
| Reduce content count | Yes | Yes | Human producer | Scene map update. |
| Change Steam-ready package definition | No | No | Human producer | Explicit human decision note. |

### Verification After Each Cut

| Check | Pass condition | Evidence |
|---|---|---|
| Core loop still playable | Player can complete at least one stealth room with throw/recall. | Smoke checklist. |
| Success/failure still works | Extraction and alarm failure both trigger. | QA note. |
| No missing references | Validator reports zero missing references in included scenes. | Validator output. |
| Build still launches | Windows build opens main menu and enters gameplay. | Build log. |
| Asset ledger still accurate | Removed assets are not listed as shipped; remaining assets have provenance. | Ledger diff. |
| Spec updated to match cut | Scope budget, feature slices, and known issues match reality. | Spec diff. |
| Fresh agent can continue | Fresh agent names current scope and next safe task. | Handoff note. |

## Required Fields

The filled cut plan must include:

- Working title.
- Dimensionality.
- Target demo length.
- Thesis/spec links.
- Human decision owner.
- Preserve-at-all-costs list.
- Objective cut triggers.
- Ordered cut sequence.
- 3D tax cuts or explicit 2D non-applicability notes.
- Asset legality cuts.
- Human-vs-agent cut authority.
- Verification after each cut.

## Reject If Missing

Reject the cut plan if any of these are true:

- The H1 is not `# CUT-PLAN`.
- `Status` is not one of the allowed schema values.
- There is no ordered cut sequence.
- Cuts are not prioritized from first removed to last removed.
- A cut removes the core loop, success/failure flow, or Steam-ready package baseline.
- A 3D project does not name cuts for camera, animation, level-building, asset burden, and
  navigation/collision.
- Asset legality and commercial-use fallback cuts are missing.
- Human-vs-agent cut authority is missing.
- Agents are allowed to remove features without human approval.
- Verification after each cut is missing.

## Reviewer Notes

Review this as an emergency plan written before panic. It should make the future smaller decision
obvious.

Ask:

- If the schedule slips tomorrow, does the learner know exactly what to remove first?
- Does the first cut preserve a playable Steam-demo candidate?
- Are 3D burdens converted into explicit cuts rather than vague hope?
- Are asset legality problems handled by replacement or removal before release packaging?
- Can agents recommend and execute approved cuts without becoming the decision maker?
