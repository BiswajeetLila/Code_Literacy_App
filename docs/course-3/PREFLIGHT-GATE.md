# Course 3 Preflight Gate

## Status

Complete for issue #10.

## Policy Links

- Master spec: [`../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`NORMALIZATION.md`](NORMALIZATION.md)
- Bridge remediation: [`BRIDGE-PACK.md`](BRIDGE-PACK.md)

## Purpose

Course 3 is open application, not casual open enrollment. This gate protects the studio pace by
checking evidence, not self-confidence.

Every check must produce a named artifact a reviewer can inspect. A learner who cannot provide the
artifact has not passed that check.

## Submission Package

The learner submits a folder named:

```text
course-3-preflight/<learner-name>/
```

Required contents:

- `PREFLIGHT-SUMMARY.md`
- `01-csharp-reading/`
- `02-unity-editor/`
- `03-git-recovery/`
- `04-agent-workflow/`
- `05-unity-build/`
- `06-bug-report/`

## Evidence Checks

| Check | Evidence artifact | Pass condition |
|---|---|---|
| C# reading | `01-csharp-reading/ANNOTATED-MONOBEHAVIOUR.md` | Correctly identifies `Start`, `Update`, serialized fields, public/private fields, methods, component references, and one likely agent-generated risk. |
| Unity editor basics | `02-unity-editor/EDITOR-WALKTHROUGH.md` plus screenshots of Scene, Game, Inspector, Project, Console, and Play Mode | Explains GameObject, Component, Prefab, Scene, Inspector, Console, and Play Mode using the submitted screenshots. |
| Git recovery | `03-git-recovery/GIT-RECOVERY-LOG.md` plus before/after diff snippets | Creates a branch, makes a deliberate bad edit, inspects the diff, recovers without destructive reset, and explains what changed. |
| Agent plan/review workflow | `04-agent-workflow/AGENT-PLAN-REVIEW.md` | Shows a prompt, the agent's plan, review notes, accepted/rejected changes, and a verification result. |
| Unity build troubleshooting | `05-unity-build/BUILD-EVIDENCE.md` plus build log excerpt | Runs Play Mode, inspects Console, produces or attempts a Windows build, and explains any warning/error in plain terms. |
| Bug report quality | `06-bug-report/BUG-REPORT.md` | Includes reproduction steps, expected behavior, actual behavior, evidence, suspected layer, and next verification step. |

## Scoring

Each check receives one score:

- `2`: pass. Evidence is complete and reviewer can trust the learner in studio pace.
- `1`: bridge-required. Evidence is partial, but the gap is narrow enough to remediate.
- `0`: not-ready. Evidence is missing, unverifiable, or shows the learner cannot safely continue.

Maximum score: `12`.

## Placement Rubric

| Placement | Rule |
|---|---|
| `studio-ready` | Total score `10-12`, no `0` scores, and C# reading, git recovery, agent workflow, and Unity build checks all score `2`. |
| `bridge-required` | Total score `6-9`, or total score `10-12` with exactly one non-critical `0`, or any critical check scoring `1`. |
| `not-ready` | Total score `0-5`, two or more `0` scores, or any critical check scoring `0`. |

Critical checks:

- C# reading.
- Git recovery.
- Agent plan/review workflow.
- Unity build troubleshooting.

## Reviewer Procedure

1. Confirm every required folder and artifact exists.
2. Score each evidence check as `0`, `1`, or `2`.
3. Apply the placement rubric exactly.
4. Record the result in `PREFLIGHT-SUMMARY.md`.
5. If placement is `bridge-required`, assign only the labs that match failed or partial checks.
6. If placement is `not-ready`, route the learner to Course 1/Course 2 foundations or a separate
   Unity basics course.

## Under-Qualified Profile Test

This profile must never route to `studio-ready`:

- no Unity project evidence
- no Git recovery log
- no agent plan/review transcript
- no Windows build evidence
- vague C# explanation without annotated code
- bug report missing reproduction steps

Expected scoring:

| Check | Score |
|---|---:|
| C# reading | 1 |
| Unity editor basics | 0 |
| Git recovery | 0 |
| Agent plan/review workflow | 0 |
| Unity build troubleshooting | 0 |
| Bug report quality | 1 |

Total: `2`.

Placement: `not-ready`.

## Bridge Retake

After completing [`BRIDGE-PACK.md`](BRIDGE-PACK.md), the learner retakes this same preflight gate
with fresh artifacts. Do not promote learners on bridge attendance alone.
