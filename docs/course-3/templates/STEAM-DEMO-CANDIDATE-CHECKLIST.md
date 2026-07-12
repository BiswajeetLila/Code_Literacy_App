# STEAM-DEMO-CANDIDATE-CHECKLIST

## Status

complete

## Use When

Use this template in Module 10 to determine whether the project is packaged like a real Steam-demo
candidate. This checklist is the release-surface contract for the course capstone package.

Actual Steamworks upload is optional. A complete course package must still prove build readiness,
disclosure prep, and handoff readiness.

## Before You Fill This

Have these inputs ready:

- current Windows build
- reproducible build notes
- current asset ledger
- current known-issues file
- screenshot and trailer capture candidates
- current Content Survey prep notes
- current fresh-agent handoff

Do not mark items complete from intention. Mark them complete only from evidence.

## Fillable Template

Copy this into the learner project as `docs/STEAM-DEMO-CANDIDATE-CHECKLIST.md`.

### Required For Course Capstone

| Item | Status | Evidence Path / Note |
|---|---|---|
| Windows build exists | not started / in progress / complete / blocked |  |
| Build launches outside editor | not started / in progress / complete / blocked |  |
| Reproducible build notes exist | not started / in progress / complete / blocked |  |
| Build profile or build settings are documented | not started / in progress / complete / blocked |  |
| Demo README exists | not started / in progress / complete / blocked |  |
| Known issues exist | not started / in progress / complete / blocked |  |
| Store copy draft exists | not started / in progress / complete / blocked |  |
| Screenshot set candidate list exists | not started / in progress / complete / blocked |  |
| Trailer shot list exists | not started / in progress / complete / blocked |  |
| Asset ledger is complete enough for release review | not started / in progress / complete / blocked |  |
| Steam Content Survey prep exists | not started / in progress / complete / blocked |  |
| Fresh-agent handoff exists | not started / in progress / complete / blocked |  |

### Steamworks Optional Extension

| Item | Status | Evidence Path / Note |
|---|---|---|
| Steamworks account ready | not started / in progress / complete / blocked |  |
| Demo app/App ID setup decision made | not started / in progress / complete / blocked |  |
| Depots configured | not started / in progress / complete / blocked |  |
| SteamPipe upload tested | not started / in progress / complete / blocked |  |
| Content Survey completed in partner site | not started / in progress / complete / blocked |  |
| Store/build review checklist prepared | not started / in progress / complete / blocked |  |

### AI Disclosure Prep

| Item | Status | Evidence Path / Note |
|---|---|---|
| Behind-the-scenes AI efficiency use listed separately | not started / in progress / complete / blocked |  |
| Pre-generated player-consumed AI content listed | not started / in progress / complete / blocked |  |
| Live-generated AI content listed, if any | not started / in progress / complete / blocked / not applicable |  |
| Guardrails for live-generated AI documented, if any | not started / in progress / complete / blocked / not applicable |  |
| Asset-ledger links for disclosure-sensitive content are present | not started / in progress / complete / blocked |  |

### Release Decision

- Capstone package ready for course review:
- Safe for external sharing:
- Steamworks upload attempted:
- Biggest blocker:
- Next safe packaging task:

## Worked Example

Game: Signal Keeper, a 2D signal-routing arcade slice.

### Required For Course Capstone

| Item | Status | Evidence Path / Note |
|---|---|---|
| Windows build exists | complete | `Builds/Windows/SignalKeeper/` |
| Build launches outside editor | complete | launch note in `docs/release/build-check-2026-06-10.md` |
| Reproducible build notes exist | complete | `docs/release/BUILD-NOTES.md` |
| Build profile or build settings are documented | complete | build profile note in `BUILD-NOTES.md` |
| Demo README exists | complete | `docs/release/DEMO-README.md` |
| Known issues exist | complete | `docs/release/KNOWN-ISSUES.md` |
| Store copy draft exists | complete | `docs/release/STORE-COPY-DRAFT.md` |
| Screenshot set candidate list exists | complete | `docs/release/SCREENSHOT-SHOTLIST.md` |
| Trailer shot list exists | complete | `docs/release/TRAILER-SHOTLIST.md` |
| Asset ledger is complete enough for release review | complete | `docs/ASSET-LEDGER.md` |
| Steam Content Survey prep exists | complete | `docs/release/CONTENT-SURVEY-PREP.md` |
| Fresh-agent handoff exists | complete | `docs/FRESH-AGENT-HANDOFF.md` |

### Steamworks Optional Extension

| Item | Status | Evidence Path / Note |
|---|---|---|
| Steamworks account ready | blocked | learner does not have partner account yet |
| Demo app/App ID setup decision made | in progress | deferred until after capstone review |
| Depots configured | not started | optional extension |
| SteamPipe upload tested | not started | optional extension |
| Content Survey completed in partner site | not started | prep exists but site submission not done |
| Store/build review checklist prepared | in progress | draft checklist exists |

### AI Disclosure Prep

| Item | Status | Evidence Path / Note |
|---|---|---|
| Behind-the-scenes AI efficiency use listed separately | complete | `CONTENT-SURVEY-PREP.md` section 1 |
| Pre-generated player-consumed AI content listed | complete | `CONTENT-SURVEY-PREP.md` section 2 |
| Live-generated AI content listed, if any | not applicable | none in this project |
| Guardrails for live-generated AI documented, if any | not applicable | none in this project |
| Asset-ledger links for disclosure-sensitive content are present | complete | links to icon and texture rows |

### Release Decision

- Capstone package ready for course review: yes
- Safe for external sharing: yes, with known-issues note
- Steamworks upload attempted: no
- Biggest blocker: no partner account for actual upload
- Next safe packaging task: tighten screenshot captions and rerun build launch check after UI fix

## Required Fields

The filled checklist must include:

- all capstone-required items
- Steamworks optional-extension section
- AI disclosure prep section
- release decision section
- evidence path or note for every row

The checklist must distinguish course-capstone readiness from Steamworks upload readiness.

## Reject If Missing

Reject the checklist if any are true:

- Windows build status is blank.
- Launch evidence is blank.
- Build notes are blank.
- README or known issues are blank.
- Asset ledger linkage is blank.
- Content Survey prep is blank.
- Fresh-agent handoff is blank.
- AI disclosure prep is missing.
- Steamworks optional extension is missing.
- Release decision section is blank.
- Rows are marked complete without evidence.

Mandatory spec-stage reject checks are not applicable to this template as spec-stage checks because
`STEAM-DEMO-CANDIDATE-CHECKLIST.md` is a release packaging template, not a concept/spec approval
template.

## Reviewer Notes

Review by checking the package like a release surface:

- Open the build path.
- Confirm the README, known issues, and build notes exist.
- Check that disclosure-sensitive assets link back to the asset ledger.
- Make sure optional Steamworks work is not being confused with required course completion.
- Reject checklists that sound complete but have no evidence paths.
