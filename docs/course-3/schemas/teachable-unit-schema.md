# Teachable-Unit Schema

## Status

Complete for issue #9.

## Use When

Use this schema for every Course 3 module file in `docs/course-3/modules/`.

The schema is an interface. A module conforms only when a reviewer can check every required section
mechanically, without deciding whether the prose is elegant.

## Required Section Order

Every module file must contain these sections in this order:

| Section | Required content | Binary check |
|---|---|---|
| `# Module NN: Title` | Exact module number and normalized title | Heading matches `NORMALIZATION.md` |
| `## Status` | `stub`, `planned`, `ready-for-review`, `complete`, or `deferred` | One allowed value appears |
| `## Policy Links` | Links to master spec, normalization doc, and this schema | Links resolve |
| `## Objective` | Learner-facing outcome | Non-empty and module-specific |
| `## Time Budget And Cut Triggers` | Budget and cut triggers from the master spec | Budget or deferred note appears |
| `## Learner Assignment` | Self-contained work instructions | Names inputs and expected outputs |
| `## Required Artifacts` | Submission checklist | Each artifact has a filename or concrete evidence form |
| `## Review Prompts` | Reviewer questions | Each question is answerable as pass/fail or yes/no |
| `## Common Failure Modes` | Likely ways the submission fails | At least four failure modes |
| `## Pass/Fail Rubric` | Gate tied to the module outcome | Pass and fail boundaries both appear |
| `## Strong Vs Weak Examples` | Boundary examples | At least one strong and one weak example |
| `## Next Module Handoff` | What carries forward | Names artifacts used by the next module |

## Required Artifact Rules

`Required Artifacts` must name the concrete files, builds, screenshots, logs, diffs, or review
evidence the learner submits.

If a module uses a template, it must name the exact template filename from
`docs/course-3/templates/`.

## Review Prompt Rules

Review prompts must avoid vague questions. Prefer checks such as:

- Does the submitted `CUT-PLAN.md` name the first three cuts?
- Does the build evidence show a Windows build path?
- Does the asset ledger mark commercial-use status for every shipped asset?

## Conformance Checklist

- [ ] H1 matches the module number and title in `NORMALIZATION.md`.
- [ ] `Status` contains one allowed value.
- [ ] `Policy Links` includes the master spec, `NORMALIZATION.md`, and this schema.
- [ ] `Objective` is non-empty and module-specific.
- [ ] `Time Budget And Cut Triggers` includes a budget, a cut trigger, or an explicit deferred note.
- [ ] `Learner Assignment` can be executed without chat history.
- [ ] `Required Artifacts` names concrete evidence.
- [ ] `Review Prompts` are binary or pass/fail.
- [ ] `Common Failure Modes` lists at least four failures.
- [ ] `Pass/Fail Rubric` includes pass and fail conditions.
- [ ] `Strong Vs Weak Examples` includes at least one passing and one failing example.
- [ ] `Next Module Handoff` names artifacts carried forward.

The module conforms only if every applicable checkbox passes.

