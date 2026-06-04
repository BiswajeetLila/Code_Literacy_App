# Runnable-Template Schema

## Status

Complete for issue #9.

## Use When

Use this schema for every Course 3 template file in `docs/course-3/templates/`.

A template is runnable when a learner can fill it, compare against an example, and reject an
incomplete version without needing hidden instructor judgment.

## Required Section Order

Every template file must contain these sections in this order:

| Section | Required content | Binary check |
|---|---|---|
| `# TEMPLATE-NAME` | Exact template filename as title | Heading matches filename stem |
| `## Status` | `stub`, `planned`, `ready-for-review`, `complete`, or `deferred` | One allowed value appears |
| `## Use When` | Concrete situation where this template is required | Non-empty |
| `## Before You Fill This` | Inputs the learner must have ready | At least one input appears |
| `## Fillable Template` | Copyable prompts, blanks, or tables | Contains fields the learner can fill |
| `## Worked Example` | Plausible game-specific example | Contains specific details, not placeholders only |
| `## Required Fields` | Fields that cannot be blank | At least one required field appears |
| `## Reject If Missing` | Mechanical bounce checks | At least one reject check appears |
| `## Reviewer Notes` | How to inspect the filled template | Concrete reviewer behavior appears |

## Mandatory Spec-Stage Reject Checks

Spec-stage templates must reject submissions missing any of these:

- asset legality and commercial-use status
- at least one named scope cut
- human-vs-agent delegation ownership

Spec-stage templates include:

- `GAME-THESIS.md`
- `VERTICAL-SLICE-SPEC.md`
- `CUT-PLAN.md`

Other templates may mark a mandatory reject check as not applicable, but must say why. `AGENT-ROLES`
must always reject missing delegation ownership.

## 3D Tax Rule

Any template approving a 3D project choice must reject the submission unless a written cut plan
exists. The cut plan must name what gets removed first when camera, animation, level-building, or
asset burden exceeds budget.

## Conformance Checklist

- [ ] H1 matches the template filename stem.
- [ ] `Status` contains one allowed value.
- [ ] `Use When` says when the template applies.
- [ ] `Before You Fill This` names required inputs.
- [ ] `Fillable Template` contains copyable prompts, blanks, or tables.
- [ ] `Worked Example` uses a plausible Course 3 game, not generic placeholder text only.
- [ ] `Required Fields` names fields that cannot be blank.
- [ ] `Reject If Missing` contains mechanical checks.
- [ ] Spec-stage templates include checks for asset legality, scope cut, and delegation ownership.
- [ ] Any 3D choice requires a written cut plan.
- [ ] `Reviewer Notes` tells reviewers what to inspect.

The template conforms only if every applicable checkbox passes.

