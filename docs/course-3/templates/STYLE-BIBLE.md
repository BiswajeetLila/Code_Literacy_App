# STYLE-BIBLE

## Status

complete

## Use When

Use this template in Module 6 before accepting production-intent visual, UI, animation, VFX, or audio
assets. The style bible gives the learner and agents a small, enforceable taste boundary so assets
do not drift into a mismatched collage.

The style bible is not a portfolio art document. It is a production filter: it says what fits, what
does not fit, and how to reject assets quickly.

## Before You Fill This

Have these inputs ready:

- chosen game thesis
- vertical-slice spec
- prototype evidence
- current playable scene screenshots or captures
- target platform and camera perspective
- asset budget from the spec
- any cut-plan constraints for 3D, animation, camera, or asset burden
- current asset ledger, if one exists

Keep the first version short. A vague 20-page style bible is less useful than a precise 2-page one.

## Fillable Template

Copy this into the learner project as `docs/STYLE-BIBLE.md`.

### Game Identity

- Game title:
- One-sentence style promise:
- Camera / perspective:
- Target mood:
- Primary readability priority:
- Asset budget:

### Visual Pillars

Name 3 pillars.

| Pillar | Meaning | Asset Acceptance Rule |
|---|---|---|
|  |  |  |
|  |  |  |
|  |  |  |

### Reference Images / Sources

Use only references that are allowed for learning reference. Do not copy protected work into
production assets.

| Reference | Source / Link | What To Borrow | What Not To Copy |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

### Palette

| Role | Color / Range | Usage Rule |
|---|---|---|
| Background |  |  |
| Player / Primary Focus |  |  |
| Hazard / Damage |  |  |
| Reward / Success |  |  |
| UI Text |  |  |
| UI Surface |  |  |

Palette rules:

- Maximum active gameplay colors:
- Contrast rule:
- Colorblind/readability note:
- What colors are banned:

### Shape Language

- Player shapes:
- Enemy or hazard shapes:
- Pickup or reward shapes:
- Environment shapes:
- UI shapes:
- Line weight:
- Detail density:
- Silhouette rule:

### UI Style

- Font:
- Button style:
- Icon style:
- HUD density:
- Feedback style:
- Error/warning style:
- What UI must avoid:

### Animation / Motion Rules

- Player motion feel:
- Enemy/hazard motion feel:
- UI motion:
- Hit/impact feedback:
- Timing range:
- Easing rule:
- What motion must avoid:

### VFX And Lighting Rules

- VFX purpose:
- Maximum particles or effect density:
- Glow/bloom rule:
- Screen shake rule:
- Camera effect rule:
- Performance warning:

### Audio Direction

- Music direction:
- SFX direction:
- UI sound direction:
- Mix priority:
- Repetition tolerance:
- What audio must avoid:

### Asset Acceptance Checklist

An asset fits only if all are true:

- It supports one of the visual pillars.
- It follows palette or contrast rules.
- It has a readable silhouette at gameplay scale.
- It matches UI, motion, or audio direction where applicable.
- It does not add unplanned production burden.
- It has an asset ledger row before production approval.

### What Does Not Belong

List hard rejects:

-
-
-

### Human Taste Notes

Use this section for judgments an agent should not pretend to own.

- Final art-direction owner:
- Known subjective risks:
- Assets that require human review:
- Assets agents may review mechanically:

## Worked Example

Game: Signal Keeper, a 2D top-down signal-routing arcade game.

### Game Identity

- Game title: Signal Keeper
- One-sentence style promise: Clean arcade circuitry with readable signal flow under pressure.
- Camera / perspective: Fixed 2D top-down board.
- Target mood: Focused, bright, slightly tense.
- Primary readability priority: The player must instantly see signal direction, blockers, and timer
  pressure.
- Asset budget: Small 2D sprite/UI/audio set; no animated character rigs.

### Visual Pillars

| Pillar | Meaning | Asset Acceptance Rule |
|---|---|---|
| Readable Signal Flow | The eye follows beams and nodes first. | Beam, node, and blocker assets must remain legible at 100% gameplay zoom. |
| Repair-Desk Arcade | It feels like a compact electronic workbench. | Backgrounds may add circuit texture, but never compete with active signals. |
| Tense But Clean | Timer pressure is visible without visual noise. | Warning assets use sharp contrast and short animation, not constant flashing. |

### Reference Images / Sources

| Reference | Source / Link | What To Borrow | What Not To Copy |
|---|---|---|---|
| Oscilloscope UI photos | public-domain/reference folder | thin line rhythm and glow hierarchy | exact interface layout |
| Minimal circuit board diagrams | saved learning references | node/trace readability | manufacturer marks or diagrams |
| Existing greybox prototype | local screenshot | scale and spacing | placeholder colors |

### Palette

| Role | Color / Range | Usage Rule |
|---|---|---|
| Background | deep neutral green-black | low contrast texture only |
| Player / Primary Focus | bright cyan | only for player-controlled node and active beam |
| Hazard / Damage | red-orange | used sparingly for overload state |
| Reward / Success | yellow-green | confirms stable routes |
| UI Text | off-white | high contrast |
| UI Surface | charcoal | no decorative gradients |

Palette rules:

- Maximum active gameplay colors: 5.
- Contrast rule: active beams must pass readability on the darkest background.
- Colorblind/readability note: hazard state also changes shape and pulse timing.
- What colors are banned: pastel rainbow pickups, heavy purple glow, muddy brown UI.

### Shape Language

- Player shapes: rounded node with directional notch.
- Enemy or hazard shapes: angular blocker plates and broken trace marks.
- Pickup or reward shapes: small hex tokens.
- Environment shapes: thin circuit traces and rectangular board modules.
- UI shapes: compact rectangular panels with 4px corners.
- Line weight: consistent 2px/4px strokes.
- Detail density: active gameplay objects stay simple; background detail is quiet.
- Silhouette rule: every interactable object must be readable in grayscale.

### UI Style

- Font: readable sans-serif, no novelty display font in HUD.
- Button style: flat dark surface, cyan focus ring.
- Icon style: line icons with filled warning variants.
- HUD density: compact, top edge only.
- Feedback style: short pulse and color swap.
- Error/warning style: red-orange edge marker plus sound.
- What UI must avoid: decorative frames that cover the board.

### Animation / Motion Rules

- Player motion feel: snap turns, quick settle.
- Enemy/hazard motion feel: mechanical pulse or lock-in.
- UI motion: 80-150ms confirmation.
- Hit/impact feedback: one pulse, then return to readable state.
- Timing range: no loop faster than 4Hz for warning visuals.
- Easing rule: crisp ease-out, no bounce unless tied to reward.
- What motion must avoid: constant screen noise or unreadable beam flicker.

### Audio Direction

- Music direction: minimal electronic bed, optional.
- SFX direction: dry ticks, pings, and short power-downs.
- UI sound direction: quiet clicks, no long whooshes.
- Mix priority: player action, hazard warning, success, UI.
- Repetition tolerance: repeated route-turn sound must stay soft.
- What audio must avoid: cinematic impacts, orchestral stingers, vocal samples.

### What Does Not Belong

- detailed fantasy props
- painterly character portraits
- realistic gun sounds
- heavy bloom masking the board
- UI panels larger than needed for play

## Required Fields

The filled style bible must include:

- game identity
- at least three visual pillars
- at least three reference rows or an explicit note explaining why references are unavailable
- palette roles and usage rules
- shape language
- UI style
- animation or motion rules
- VFX or lighting rules
- audio direction
- asset acceptance checklist
- hard rejects in `What Does Not Belong`
- human taste notes separating human review from mechanical agent review

## Reject If Missing

Reject the style bible if any are true:

- It does not name visual pillars.
- It lacks palette or contrast rules.
- It does not say what assets should be rejected.
- It has references but no notes about what to borrow versus what not to copy.
- It says only "cozy", "retro", "clean", "dark", or similar broad taste labels without acceptance
  rules.
- It does not cover UI for a game that has HUD or menus.
- It does not cover audio for a game that uses sound.
- It does not separate human taste review from mechanical agent review.
- It approves an asset direction that conflicts with the project cut plan.
- It lacks any asset-legality/commercial-use handoff to `ASSET-LEDGER.md`.

Mandatory spec-stage reject checks are not applicable to this template as spec-stage checks because
`STYLE-BIBLE.md` is a production art-direction template, not a concept/spec approval template. It
must still reject assets that lack asset-ledger approval before production use.

## Reviewer Notes

Review by testing whether the document can reject a real asset:

- Pick one candidate asset and ask whether the style bible gives a clear pass/fail decision.
- Check that the rules are specific enough for an agent to apply without inventing taste.
- Check that human-owned taste decisions are explicitly marked.
- Check that references are treated as direction, not copying targets.
- Check that palette, shape, UI, motion, and audio rules match the vertical slice's readability
  needs.
- Reject the style bible if it reads like mood-board prose but cannot block an off-style asset.
