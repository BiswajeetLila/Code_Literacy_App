# VERTICAL-SLICE-SPEC

## Status

complete

## Use When

Use this after `GAME-THESIS.md` is approved and before agents build production features. This is the
control plane for the 5-15 minute Steam-demo candidate.

The spec should be concrete enough that a fresh agent can implement the first playable without
asking what the game is, what is in scope, or what requires human approval.

## Before You Fill This

Have these inputs ready:

- Approved `GAME-THESIS.md`.
- Approved or draft `CUT-PLAN.md`.
- Target demo length.
- Initial asset source plan.
- Known technical risks.
- Human-vs-agent delegation boundaries.
- Target build platform and Steam-demo candidate definition.
- Module 1 agent rules, including approval policy for package installs, editor automation,
  generated assets, and destructive Unity operations.

## Fillable Template

### Project Snapshot

| Field | Fill |
|---|---|
| Working title |  |
| Version/date |  |
| Thesis link |  |
| Cut-plan link |  |
| Dimensionality |  |
| Target demo length |  |
| Target build | Windows Steam-ready package |
| Renderer | URP unless exception is approved |

### Steam-Demo Candidate Definition

Define what "Steam-ready package" means for this slice.

| Requirement | Definition for this project | Evidence required |
|---|---|---|
| Playable duration |  |  |
| Start flow |  |  |
| End flow |  |  |
| Settings/menu baseline |  |  |
| Keyboard/mouse baseline |  |  |
| Controller support, if included |  |  |
| Known-issues tolerance |  |  |
| Store-page materials |  |  |

### Scope Budget

Set hard budgets before production starts.

| Budget area | Limit | Owner | Evidence |
|---|---|---|---|
| Playable minutes |  |  |  |
| Scenes |  |  |  |
| Core mechanics |  |  |  |
| Enemy/hazard/challenge families |  |  |  |
| Levels/rooms/arenas |  |  |  |
| UI screens |  |  |  |
| Save/progression |  |  |  |
| Accessibility basics |  |  |  |
| Performance target |  |  |  |
| Build target |  |  |  |

### Asset Budget

Every asset category needs source, license/commercial-use status, and fallback.

| Asset category | Production need | Planned source | Commercial-use status | License/provenance evidence | Fallback/cut |
|---|---|---|---|---|---|
| Player character |  |  |  |  |  |
| Environment |  |  |  |  |  |
| Enemies/hazards |  |  |  |  |  |
| Animation |  |  |  |  |  |
| VFX/shaders |  |  |  |  |  |
| UI/icons/fonts |  |  |  |  |  |
| Audio/music |  |  |  |  |  |
| Marketing screenshots/trailer capture |  |  |  |  |  |

### Technical Risk Register

| Risk | Why it matters | Likelihood | Impact | Spike/prototype | Kill or cut trigger | Owner |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

### Human-vs-Agent Delegation Map

The human remains director and final approver. Agents can execute only within named boundaries.

| Area | Human decision owner | Agent execution allowed? | Agent role | Required review evidence | Approval needed before acting? |
|---|---|---|---|---|---|
| Core loop |  |  |  |  |  |
| 3C feel |  |  |  |  |  |
| Gameplay systems |  |  |  |  |  |
| UI/UX |  |  |  |  |  |
| Editor tooling |  |  |  |  |  |
| Asset import/settings |  |  |  |  |  |
| Generated assets |  |  |  |  |  |
| Package installs |  |  |  |  |  |
| Build/release packaging |  |  |  |  |  |
| Scope cuts |  |  |  |  |  |

### Feature Slices

Define each vertical slice as something playable and reviewable.

| Slice | Player-visible outcome | Systems touched | Acceptance gate | Agent role | Human review point |
|---|---|---|---|---|---|
| First playable |  |  |  |  |  |
| Core loop proof |  |  |  |  |  |
| Content pass |  |  |  |  |  |
| Polish pass |  |  |  |  |  |
| Release package |  |  |  |  |  |

### Named Scope Cuts

At least one cut is mandatory. Link the full cut sequence in `CUT-PLAN.md`.

| Priority | Cut name | Removed | Trigger | What remains playable | Decision owner |
|---|---|---|---|---|---|
| 1 |  |  |  |  | Human |
| 2 |  |  |  |  | Human |
| 3 |  |  |  |  | Human |

### 3D Tax Check

Fill this even if the project is 2D.

| Question | Answer |
|---|---|
| Is this project 3D? |  |
| If yes, where is the written cut plan? |  |
| What gets cut first if camera work slips? |  |
| What gets cut first if animation slips? |  |
| What gets cut first if level-building slips? |  |
| What gets cut first if asset burden slips? |  |
| If no, why is the 3D tax not applicable? |  |

### Verification Plan

| Check | Tool/process | Pass condition | Owner | Evidence location |
|---|---|---|---|---|
| Unity opens cleanly |  |  |  |  |
| Console errors |  |  |  |  |
| First playable smoke test |  |  |  |  |
| Core mechanic regression |  |  |  |  |
| Missing references |  |  |  |  |
| Performance budget |  |  |  |  |
| Windows build |  |  |  |  |
| Fresh-agent handoff |  |  |  |  |

## Worked Example

### Project Snapshot

| Field | Fill |
|---|---|
| Working title | Signal Knife |
| Version/date | v0.1, 2026-06-05 |
| Thesis link | `GAME-THESIS.md` filled for Signal Knife |
| Cut-plan link | `CUT-PLAN.md` filled for Signal Knife |
| Dimensionality | 3D, fixed isometric camera |
| Target demo length | 8-10 minutes |
| Target build | Windows Steam-ready package |
| Renderer | URP |

### Steam-Demo Candidate Definition

| Requirement | Definition for this project | Evidence required |
|---|---|---|
| Playable duration | Tutorial room plus two stealth rooms and extraction, 8-10 minutes for first-time player. | Timed playtest notes from two humans. |
| Start flow | Main menu -> new game -> playable room in under 10 seconds. | Capture or checklist. |
| End flow | Success screen or failure screen returns to menu. | Smoke test video or notes. |
| Settings/menu baseline | Pause, resume, restart, quit, volume slider, mouse sensitivity. | Manual QA checklist. |
| Keyboard/mouse baseline | WASD, mouse aim, throw, recall, interact, pause. | Input checklist. |
| Controller support, if included | Not included in first demo. | Marked out of scope. |
| Known-issues tolerance | No blocker, crash, missing reference, or unreadable UI issue. Minor animation clipping allowed. | Known issues file. |
| Store-page materials | 5 screenshots, 1 capsule-copy draft, trailer shot list. | Release assets folder. |

### Scope Budget

| Budget area | Limit | Owner | Evidence |
|---|---|---|---|
| Playable minutes | 8-10 | Human producer | Playtest notes |
| Scenes | MainMenu, RelayWing, Results | Build engineer agent | Build profile |
| Core mechanics | Move, throw, recall, drone lure, relay disable | Gameplay engineer agent | Test scene and PR diff |
| Enemy/hazard/challenge families | One drone family with two tuning variants | Gameplay engineer agent | Prefab review |
| Levels/rooms/arenas | Three rooms plus extraction corner | Human director | Scene map |
| UI screens | Main, pause, HUD, results | UI/system agent | Screenshot set |
| Save/progression | None beyond current run | Human producer | Out-of-scope note |
| Accessibility basics | Subtitles not needed; color + shape alarm signals; remappable controls deferred | Human/QA | UX checklist |
| Performance target | 1080p 60 FPS on midrange Windows laptop | QA lead | Profiler note |
| Build target | Windows x64 development and release builds | Build engineer | Build logs |

### Asset Budget

| Asset category | Production need | Planned source | Commercial-use status | License/provenance evidence | Fallback/cut |
|---|---|---|---|---|---|
| Player character | Courier silhouette | Prototype capsule plus simple cloak mesh | Self-authored, commercial OK | Asset ledger row | Keep capsule if mesh slips |
| Environment | Modular sci-fi corridors | Paid Asset Store pack | Must verify EULA before import | Store invoice/EULA link | Use ProBuilder graybox |
| Enemies/hazards | Patrol drone | Self-authored primitive model + emissive material | Self-authored, commercial OK | Asset ledger row | Use sphere drone |
| Animation | Door open, drone rotation, knife throw | Unity animation clips authored in project | Self-authored, commercial OK | Asset ledger row | Use static poses/tween movement |
| VFX/shaders | Alarm pulse, knife trail | Unity URP particle/trail renderer | Built-in/self-authored | Asset ledger row | Use colored line renderer |
| UI/icons/fonts | HUD icons and menu font | CC0 icon set, bundled font only after license check | Unknown until logged | License URLs | Plain text UI |
| Audio/music | Throw, recall, drone ping, alarm loop | Purchased or CC0 pack | Unknown until logged | License URLs | Silent build with UI feedback |
| Marketing screenshots/trailer capture | Five key shots and trailer plan | Captured from build | Self-authored | Screenshot folder | Screenshot-only package |

### Technical Risk Register

| Risk | Why it matters | Likelihood | Impact | Spike/prototype | Kill or cut trigger | Owner |
|---|---|---|---|---|---|---|
| Isometric camera occludes drones behind walls | Player cannot read stealth state. | Medium | High | Build one room with walls and patrol cones in Module 3. | If unreadable after one day, switch to cutaway walls and fewer rooms. | Technical artist |
| Knife recall path gets stuck on geometry | Core mechanic feels broken. | Medium | High | Test line-of-sight recall and fallback teleport. | If pathing stays unreliable, recall ignores collisions with VFX explanation. | Gameplay engineer |
| Asset licensing for audio remains unclear | Release package cannot be Steam-ready. | Medium | Medium | Source audio by Module 6 and log license. | If not resolved by Module 8, ship silent with visual feedback. | QA/build |

### Human-vs-Agent Delegation Map

| Area | Human decision owner | Agent execution allowed? | Agent role | Required review evidence | Approval needed before acting? |
|---|---|---|---|---|---|
| Core loop | Human director | No | Director/reviewer only | Thesis approval note | Yes |
| 3C feel | Human director | Yes | Gameplay engineer | Playtest notes and scene capture | Yes for feel changes |
| Gameplay systems | Human director | Yes | Gameplay engineer | Diff, test scene, smoke result | No if within spec |
| UI/UX | Human director | Yes | UI/system agent | Screenshot and checklist | No if within spec |
| Editor tooling | Human producer | Yes | Tools engineer | Editor script diff and rollback note | Yes |
| Asset import/settings | Human technical art owner | Yes | Technical artist | Asset ledger row and screenshot | Yes for new packages |
| Generated assets | Human technical art owner | Yes | Technical artist | Prompt/source/provenance row | Yes |
| Package installs | Human producer | Yes | Build/tools engineer | Package name, version, reason | Yes |
| Build/release packaging | Human producer | Yes | Build engineer | Build logs and package checklist | No if profile exists |
| Scope cuts | Human director | No | Producer may recommend | Cut-plan update | Yes |

### Feature Slices

| Slice | Player-visible outcome | Systems touched | Acceptance gate | Agent role | Human review point |
|---|---|---|---|---|---|
| First playable | Move, throw, recall in graybox room. | Player, camera, input, knife. | Playable in under 60 seconds from launch. | Gameplay engineer | Feel review. |
| Core loop proof | Drone reacts to sound and door opens after relay disable. | Drone AI, relay, door, HUD. | Player can complete one stealth puzzle. | Gameplay engineer | Core-loop approval. |
| Content pass | Three-room relay wing. | Scene content, prefabs, lighting. | New player reaches extraction. | Technical artist/gameplay | Scope review. |
| Polish pass | Feedback, audio, UI clarity. | VFX, audio, HUD, camera. | New player understands goals without explanation. | QA/UI/technical art | Playtest review. |
| Release package | Windows build and release assets. | Build profile, README, screenshots. | Steam-ready checklist passes. | Build engineer | Final defense. |

### Named Scope Cuts

| Priority | Cut name | Removed | Trigger | What remains playable | Decision owner |
|---|---|---|---|---|---|
| 1 | Two-room cut | Remove room 3 and second drone tuning variant. | Room 2 not stable by Module 8. | Tutorial, one challenge room, extraction. | Human |
| 2 | Silent build cut | Remove sourced audio and use visual feedback only. | Audio license unclear by Module 8. | Full playable demo with no audio dependency. | Human |
| 3 | Capsule character cut | Remove humanoid mesh and animation polish. | Character import or animation slips. | Capsule courier with readable knife and cloak marker. | Human |

### 3D Tax Check

| Question | Answer |
|---|---|
| Is this project 3D? | Yes. |
| If yes, where is the written cut plan? | `CUT-PLAN.md`, Signal Knife cut sequence. |
| What gets cut first if camera work slips? | Switch to lower walls/cutaway walls and reduce room count. |
| What gets cut first if animation slips? | Use capsule courier and static drone body with rotation only. |
| What gets cut first if level-building slips? | Two-room cut. |
| What gets cut first if asset burden slips? | Keep graybox/ProBuilder environment and remove decorative set dressing. |
| If no, why is the 3D tax not applicable? | Not applicable because project is 3D. |

### Verification Plan

| Check | Tool/process | Pass condition | Owner | Evidence location |
|---|---|---|---|---|
| Unity opens cleanly | Open project in target Unity version. | No blocking import errors. | QA lead | QA notes |
| Console errors | Enter Play Mode and inspect Console. | No red errors during smoke path. | QA lead | QA notes |
| First playable smoke test | Launch RelayWing scene. | Player can throw, lure, recall, extract/fail. | QA lead | Smoke checklist |
| Core mechanic regression | Play-mode tests or manual scripted run. | Drone lure and door relay behavior still work. | Gameplay engineer | Test results |
| Missing references | Scene/prefab validator. | Zero missing references in included scenes. | Tools engineer | Validator output |
| Performance budget | Profiler/basic FPS pass. | 1080p 60 FPS target or documented exception. | QA lead | Profiler note |
| Windows build | Unity build profile. | x64 build launches and exits cleanly. | Build engineer | Build logs |
| Fresh-agent handoff | Fresh agent reads docs and explains next safe task. | Agent identifies approvals and current scope. | Reviewer | Handoff note |

## Required Fields

The filled spec must include:

- Working title.
- Thesis link.
- Cut-plan link.
- Dimensionality.
- Target demo length.
- Steam-demo candidate definition.
- Scope budget.
- Asset budget.
- Asset legality and commercial-use status for every asset category.
- Technical risk register.
- Human-vs-agent delegation map.
- At least one named scope cut.
- 3D tax check.
- Verification plan.

## Reject If Missing

Reject the spec if any of these are true:

- The H1 is not `# VERTICAL-SLICE-SPEC`.
- `Status` is not one of the allowed schema values.
- The thesis link is blank.
- The Steam-demo candidate definition is vague or missing.
- The scope budget has no hard limits.
- The asset budget omits asset legality or commercial-use status.
- Any planned third-party or generated asset lacks provenance evidence or a fallback.
- There is no technical risk register.
- There is no human-vs-agent delegation map.
- There is no named scope cut.
- The cut-plan link is blank.
- The project is 3D and does not include a written cut plan before approval.
- The project is 3D and does not name cuts for camera, animation, level-building, and asset burden.
- Verification has no build, smoke, missing-reference, or fresh-agent check.

Deliberately incomplete fills must fail here. For example, a spec that says "use Asset Store art"
without commercial-use status, or says "agents build gameplay" without a delegation map, or has no
named cut is not ready for production.

## Reviewer Notes

Review this as the production contract agents will execute against.

Pass the spec only if:

- A fresh agent can identify the next implementation slice without inventing scope.
- Asset legality is explicit enough to protect the release package.
- The human-vs-agent delegation map names decision ownership, not just tasks.
- The first cut preserves a playable demo.
- A 3D project has paid its production tax with a written cut plan.
- Verification catches broken mechanics, missing references, failed builds, and undocumented handoff.
