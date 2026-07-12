# ASSET-LEDGER

## Status

complete

## Use When

Use this template in Module 6 and keep it alive through the Steam-demo candidate package. The asset
ledger tracks where every production-intent asset came from, whether it can be used commercially,
whether attribution or redistribution limits apply, whether AI disclosure is needed, and what to do
if the asset becomes risky.

This template is not legal advice. It is a production-control artifact that prevents hidden asset
risk from entering a shippable build.

## Before You Fill This

Have these inputs ready:

- current [`STYLE-BIBLE.md`](STYLE-BIBLE.md)
- selected asset or asset pack
- source URL, receipt, license text, generator log, or proof file
- intended Unity path
- intended in-game use
- whether the asset is player-consumed content
- whether the asset may appear in screenshots, trailers, store art, or marketing
- replacement plan if the asset is rejected

Do not fill a row from memory if the proof is not saved or linkable.

## Fillable Template

Copy this table into the learner project as `docs/ASSET-LEDGER.md`.

| Field | Value |
|---|---|
| Asset ID |  |
| Asset Name |  |
| Asset Type | sprite / texture / UI / audio / music / model / animation / font / VFX / shader / other |
| In-Project Path |  |
| Scene / Prefab / System Used In |  |
| Source Path | AI-generated / Asset Store / free pack / public asset site / hand-authored / edited derivative |
| Source URL Or Tool |  |
| Creator / Vendor |  |
| License |  |
| Commercial Use Allowed | yes / no / conditions / unknown |
| Conditions Summary |  |
| Attribution Required | yes / no / conditions / unknown |
| Attribution Text |  |
| Redistribution Limits |  |
| Store / Marketing Use Allowed | yes / no / conditions / unknown |
| AI Generated Or AI Assisted | yes / no / mixed / unknown |
| Player-Consumed AI Content | yes / no / not applicable / unknown |
| Steam AI Disclosure Required | yes / no / review required / unknown |
| Proof Path |  |
| Generation Prompt Or Edit Log Path |  |
| Unity Import Settings Summary |  |
| Style-Bible Fit | pass / fail / needs edit |
| Technical-Art Review | pass / fail / needs edit |
| Human Approval | approved / rejected / learning-only / pending |
| Replacement Plan |  |
| Reviewer Notes |  |

For a compact production ledger, use this row format:

| Asset ID | Name | Path | Source/Tool | Creator/Vendor | License | Commercial Use | Attribution | Redistribution | Store/Marketing | AI Generated | Player-Consumed AI | Steam AI Disclosure | Proof | Import Notes | Style Fit | Approval | Replacement Plan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|  |  |  |  |  |  | yes / no / conditions / unknown | yes / no / conditions / unknown |  | yes / no / conditions / unknown | yes / no / mixed / unknown | yes / no / N/A / unknown | yes / no / review required / unknown |  |  | pass / fail / needs edit | approved / rejected / learning-only / pending |  |

Suggested asset IDs:

- `spr_player_001`
- `ui_icon_dash_001`
- `sfx_pickup_001`
- `mat_hazard_001`
- `vfx_hit_flash_001`
- `font_ui_001`

Review status meanings:

- `approved`: may be used in the shippable demo candidate.
- `rejected`: must not be used.
- `learning-only`: may remain in local learning builds but must not be shipped or marketed.
- `pending`: cannot be treated as production-ready.

## Worked Example

Game: Signal Keeper, a 2D signal-routing arcade game.

| Field | Value |
|---|---|
| Asset ID | `sfx_switch_ping_001` |
| Asset Name | Switch Ping |
| Asset Type | audio |
| In-Project Path | `Assets/Game/Audio/SFX/sfx_switch_ping_001.wav` |
| Scene / Prefab / System Used In | `SignalSwitch` prefab, plays when the player rotates a signal node |
| Source Path | free pack |
| Source URL Or Tool | `https://example.invalid/cc0-ui-sounds` |
| Creator / Vendor | Example Audio Lab |
| License | CC0 |
| Commercial Use Allowed | yes |
| Conditions Summary | No conditions listed in saved license text |
| Attribution Required | no |
| Attribution Text | Not required |
| Redistribution Limits | None listed |
| Store / Marketing Use Allowed | yes |
| AI Generated Or AI Assisted | no |
| Player-Consumed AI Content | not applicable |
| Steam AI Disclosure Required | no |
| Proof Path | `docs/assets/proof/sfx_switch_ping_001/license-cc0-saved-page.pdf` |
| Generation Prompt Or Edit Log Path | Not applicable |
| Unity Import Settings Summary | Decompress on load, mono, normalized off, volume set in mixer |
| Style-Bible Fit | pass |
| Technical-Art Review | pass |
| Human Approval | approved |
| Replacement Plan | Replace with hand-authored short sine ping if source proof is challenged |
| Reviewer Notes | Dry, short, readable with the style bible's low-clutter audio direction |

Compact row:

| Asset ID | Name | Path | Source/Tool | Creator/Vendor | License | Commercial Use | Attribution | Redistribution | Store/Marketing | AI Generated | Player-Consumed AI | Steam AI Disclosure | Proof | Import Notes | Style Fit | Approval | Replacement Plan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `sfx_switch_ping_001` | Switch Ping | `Assets/Game/Audio/SFX/sfx_switch_ping_001.wav` | free pack URL | Example Audio Lab | CC0 | yes | no | none listed | yes | no | N/A | no | `docs/assets/proof/sfx_switch_ping_001/license-cc0-saved-page.pdf` | mono, decompress on load | pass | approved | Hand-authored sine ping |

## Required Fields

Every production-intent row must include:

- asset ID
- asset name
- in-project path
- source URL or tool
- creator or vendor
- license
- commercial-use status
- attribution status
- redistribution limits
- store/marketing-use status
- AI-generated or AI-assisted status
- player-consumed AI status
- Steam AI disclosure status
- proof path
- Unity import settings summary
- style-bible fit
- technical-art review status
- human approval status
- replacement plan

Allowed values must be explicit. `unknown` is allowed only while the asset is pending; it blocks
production approval.

## Reject If Missing

Reject the asset row if any of these are true:

- Commercial use is blank or `unknown` for an asset marked `approved`.
- Proof path is blank.
- License is blank.
- Source URL or tool is blank.
- Creator/vendor is blank.
- AI-generated status is blank.
- Player-consumed AI status is blank for generated or AI-assisted content.
- Steam AI disclosure status is blank.
- Attribution requirement is blank.
- Redistribution limits are blank.
- Store/marketing-use status is blank for an asset that may appear in screenshots, trailers, or
  store art.
- Replacement plan is blank.
- Unity import settings summary is blank.
- Human approval is not one of `approved`, `rejected`, `learning-only`, or `pending`.
- An entire pack is imported without naming which assets are actually used.

Mandatory spec-stage reject checks are not applicable to this template as spec-stage checks because
`ASSET-LEDGER.md` is a production compliance template, not a concept/spec approval template. It
still directly enforces asset legality and commercial-use status for every production-intent asset.

## Reviewer Notes

Review the ledger like a release-risk artifact:

- Pick one approved row and open the proof path.
- Confirm the asset exists at the in-project path.
- Confirm the asset is used in the scene, prefab, UI, audio mixer, or system named in the row.
- Check that commercial use is explicit.
- Check that AI/disclosure fields are explicit.
- Check that attribution and redistribution limits are not guessed.
- Compare the asset against `STYLE-BIBLE.md`.
- Reject rows that use vague sources such as "Google", "free online", "AI", or "Asset Store" without
  a specific URL, package, tool, or proof file.
- Treat legal/commercial uncertainty as a shipping blocker, not a polish task.
