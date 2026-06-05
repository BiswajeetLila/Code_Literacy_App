# Module 6: Hybrid Asset And Technical Art Pipeline

## Status

complete

## Policy Links

- Master spec: [`../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`../NORMALIZATION.md`](../NORMALIZATION.md)
- Teachable-unit schema: [`../schemas/teachable-unit-schema.md`](../schemas/teachable-unit-schema.md)
- Style bible template: [`../templates/STYLE-BIBLE.md`](../templates/STYLE-BIBLE.md)
- Asset ledger template: [`../templates/ASSET-LEDGER.md`](../templates/ASSET-LEDGER.md)
- Prior module: [`MODULE-05-PARALLEL-GAMEPLAY-PRODUCTION.md`](MODULE-05-PARALLEL-GAMEPLAY-PRODUCTION.md)
- Next module: [`MODULE-07-EDITOR-AUTOMATION-TOOLING.md`](MODULE-07-EDITOR-AUTOMATION-TOOLING.md)

## Objective

Build a hybrid AI, Asset Store, free-pack, and hand-authored asset pipeline that keeps the game
visually coherent, technically usable, and commercially trackable.

By the end of this module, the learner can source or generate a new asset, import it into Unity,
validate import settings, document provenance and commercial-use status, decide whether Steam AI
disclosure is needed, and use the asset in-game without style drift or hidden legal ambiguity.

The human owns final art direction, taste, legal/commercial judgment, and disclosure judgment.
Agents may help organize files, draft ledger rows, normalize naming, inspect import settings, and
prepare review checklists, but agents do not approve risky asset rights or final style fit.

## Time Budget And Cut Triggers

Budget: 10-18 hours.

Use this budget as a production-control limit, not as a suggestion to polish forever.

Cut triggers:

- If the learner cannot document commercial use for an asset, replace it or keep it out of the
  shippable package.
- If style direction remains vague after 3 hours, reduce the art target to one palette, one shape
  language, one UI direction, and one audio direction.
- If import or naming cleanup consumes more than 4 hours, freeze new asset intake and stabilize the
  current vertical slice.
- If generated assets need extensive repair, use them as concepts or placeholders only.
- If a 3D asset pipeline creates animation, rigging, camera, or performance debt, activate the
  project cut plan before adding more assets.
- If Steam AI disclosure status is unclear, mark the asset as risky, document the uncertainty, and
  replace it unless a human explicitly approves it for learning-only use.

Master gate:

> A new asset can be generated or sourced, imported, validated, documented, and used in-game without
> breaking style, provenance, disclosure, or commercial-use clarity.

## Learner Assignment

Start with the integrated gameplay spine from Module 5. Do not redesign the game around art. This
module upgrades the asset pipeline around the existing loop.

1. Freeze the asset target for this module.

   Pick one asset that the vertical slice actually needs. It may be a sprite, tileset piece, icon,
   sound effect, music loop, UI frame, VFX texture, material, model, animation, font, or shader
   support asset.

   Record:

   - asset name
   - in-game purpose
   - exact scene or prefab where it will appear
   - whether it is player-consumed content
   - whether it may appear in screenshots, trailer footage, store art, or marketing
   - fallback if the asset is rejected

2. Fill the style bible.

   Copy [`STYLE-BIBLE.md`](../templates/STYLE-BIBLE.md) into the learner project and complete it
   for the current game. Keep it small enough that an agent can apply it during asset review.

   Required decisions:

   - visual pillars
   - reference sources
   - palette
   - shape language
   - UI style
   - animation and motion rules
   - audio direction
   - what does not belong

3. Choose the source path.

   Select one:

   - generated with an AI tool
   - sourced from Unity Asset Store
   - sourced from a free pack or public asset site
   - hand-authored by the learner
   - edited derivative of a permitted source asset

   Do not mix source paths silently. If an asset is generated and then hand-edited, record both.

4. Create or acquire the asset.

   Keep the asset in a reviewable intake folder until it passes the ledger and style checks. Do not
   scatter unreviewed files through production folders.

   Suggested intake folders:

   - `Assets/_Intake/AI/`
   - `Assets/_Intake/Store/`
   - `Assets/_Intake/FreePacks/`
   - `Assets/_Intake/HandAuthored/`

5. Preserve proof.

   Save proof before import cleanup hides the source context.

   Acceptable proof includes:

   - receipt or invoice
   - license text
   - source URL
   - generator/tool name
   - prompt or generation log where appropriate
   - author/vendor page
   - attribution text
   - edit log for derivative work

   Store proof in a stable project docs folder such as `docs/assets/proof/`.

6. Fill the asset ledger.

   Copy [`ASSET-LEDGER.md`](../templates/ASSET-LEDGER.md) into the learner project and add a row for
   the asset before treating it as production-ready.

   The row must include:

   - asset name and in-project path
   - source/tool
   - creator/vendor
   - license
   - commercial use allowed: yes, no, or conditions
   - attribution requirement
   - redistribution limits
   - AI-generated status
   - player-consumed AI status
   - Steam AI disclosure required
   - store/marketing use allowed
   - proof path
   - replacement plan

7. Import into Unity using controlled naming and settings.

   Apply naming rules:

   - use stable, descriptive names
   - avoid spaces in production asset filenames
   - avoid raw generator filenames in production folders
   - keep source-pack names visible in proof or notes
   - use prefixes only if they are already part of the project convention

   Record relevant import settings:

   - sprite pixels per unit, compression, filter mode, and pivot
   - texture max size, compression, alpha, and color space
   - model scale, materials, rig, and animation import settings
   - audio load type, compression, mono/stereo, and normalize choice
   - font license and TMP import notes
   - shader/material pipeline compatibility

8. Run a technical-art review.

   Verify:

   - the asset displays or plays in the intended scene
   - the asset does not break build or play mode
   - the asset is not visually out of family with the style bible
   - the asset is not larger or more expensive than the vertical slice needs
   - the asset has a replacement plan if legal/commercial risk appears later
   - AI-generated or AI-assisted status is documented

9. Use the asset in-game.

   Place the asset in the vertical slice. Evidence must show actual use, not just import success.
   Use the smallest integration that proves the pipeline:

   - one sprite on the player, enemy, pickup, or projectile
   - one UI icon or frame in the HUD
   - one sound effect on a core action
   - one material or VFX texture in a gameplay object
   - one model or animation in the playable scene

10. Write the asset acceptance note.

    Create `MODULE-06-ASSET-ACCEPTANCE.md` with:

    - asset selected
    - source path
    - proof path
    - ledger row link or excerpt
    - style-bible fit
    - Unity import settings summary
    - in-game evidence
    - Steam AI disclosure decision
    - replacement plan
    - human approval or rejection

11. Update production handoff.

    Add the asset pipeline state to the next-module handoff. Module 7 must know which asset rules
    are stable enough for editor automation or validators.

## Required Artifacts

Submit these artifacts:

- `STYLE-BIBLE.md` filled for the game.
- `ASSET-LEDGER.md` with at least one fully documented production-intent asset row.
- Proof file, source URL, receipt, license file, generation log, or equivalent evidence for the row.
- Unity import evidence: screenshot, inspector notes, diff, settings export, or review note.
- In-game evidence showing the asset used in the playable vertical slice.
- `MODULE-06-ASSET-ACCEPTANCE.md`.
- Updated project handoff or task graph note naming asset pipeline rules that Module 7 can automate.

Optional artifacts:

- `docs/assets/proof/README.md` explaining proof storage conventions.
- `Assets/_Intake/README.md` explaining intake-to-production movement.
- Before/after screenshot or audio capture showing style improvement.

## Review Prompts

- Does `STYLE-BIBLE.md` contain enough visual and audio direction for an agent to reject off-style
  assets?
- Does `ASSET-LEDGER.md` document source/tool, creator/vendor, license, commercial-use status,
  attribution, redistribution limits, AI status, Steam AI disclosure, proof, and replacement plan?
- Can the reviewer open the proof path or source URL for the selected asset?
- Is commercial use clearly allowed, clearly forbidden, or clearly conditional?
- If the asset is AI-generated or AI-assisted, is player-consumed status marked?
- If Steam AI disclosure is required or uncertain, is that status visible in the ledger?
- Does the asset appear in the actual playable slice?
- Are Unity import settings recorded well enough for a fresh agent to inspect or reproduce them?
- Does the acceptance note identify a replacement plan?
- Did the learner avoid treating placeholders as final production assets without proof?

## Common Failure Modes

- Commercial use is unclear, but the learner ships or markets the asset anyway.
- The source URL, receipt, generation log, or license proof is missing.
- AI-generated status is not recorded, especially for player-consumed content.
- Steam AI disclosure is guessed instead of documented as yes, no, conditions, or unknown.
- The asset looks good alone but conflicts with the style bible in the actual scene.
- A placeholder asset silently becomes final because nobody marked its replacement plan.
- Unity import settings damage readability, scale, animation timing, audio quality, or performance.
- Asset Store or free-pack redistribution limits are ignored.
- The learner imports an entire pack when only one asset is needed.
- Agents rename, compress, edit, or move assets without preserving provenance.
- A 3D asset adds rigging, animation, or performance debt that exceeds the project cut plan.
- The asset is documented but never used in the vertical slice.

## Pass/Fail Rubric

Pass if all are true:

- The style bible is complete enough to guide asset acceptance and rejection.
- The asset ledger has at least one complete row for a production-intent asset.
- Commercial-use status is explicit.
- Attribution and redistribution requirements are explicit.
- AI-generated, player-consumed, and Steam AI disclosure fields are explicit.
- Proof exists and is findable.
- Unity import settings are documented.
- The asset is used in-game.
- The acceptance note includes style fit, import evidence, disclosure decision, and replacement plan.

Fail if any are true:

- The selected asset has unknown commercial-use status and is still treated as shippable.
- The asset lacks proof.
- AI/disclosure status is omitted for generated or AI-assisted content.
- The style bible is empty, generic, or unusable for review.
- The asset cannot be found in the playable slice.
- Import settings break the asset or create avoidable technical debt.
- The replacement plan is missing.

Minimum bar:

> One new or newly sourced asset moves through intake, proof, ledger, import, style review,
> disclosure review, in-game use, and acceptance without unresolved provenance or commercial-use
> ambiguity.

## Strong Vs Weak Examples

Strong:

> The learner sources a CC0 pickup sound, saves the license page as proof, records the source URL,
> marks commercial use as allowed, marks AI-generated as no, imports the clip with documented audio
> settings, connects it to the pickup event, verifies it in play mode, and notes that it fits the
> style bible's short dry UI-feedback sound direction.

Weak:

> The learner downloads several sounds from a search result, imports them into `Assets/Audio`, and
> writes "free online" in the ledger.

Strong:

> The learner generates an icon set, saves the prompt and generation log, marks AI-generated as yes,
> marks player-consumed content as yes, records Steam AI disclosure as required for review, selects
> one icon that matches the style bible, and keeps a hand-authored fallback plan.

Weak:

> The learner generates icons, edits filenames, imports them, and leaves AI disclosure blank because
> the icons are small.

Strong:

> The learner imports one sprite from a paid pack, records the receipt and license, uses only the
> needed sprite, documents redistribution limits, and creates a replacement plan if marketing use is
> not allowed.

Weak:

> The learner imports the whole pack, commits unused assets, and assumes Asset Store means every
> use is allowed.

## Next Module Handoff

Module 7 turns stable production rules into editor automation and validators. Carry forward:

- filled `STYLE-BIBLE.md`
- filled `ASSET-LEDGER.md`
- proof folder convention
- import-setting notes
- naming conventions
- accepted asset example
- rejected asset examples, if any
- AI/disclosure decision pattern
- asset rules that are safe for automation
- asset rules that require human review

Do not automate asset modification, movement, deletion, compression, or scene placement until the
Module 6 pipeline has at least one reviewed example that a human accepts.
