# Module 7: Editor Automation And Tooling

## Status

complete

## Policy Links

- Master spec: [`../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`../NORMALIZATION.md`](../NORMALIZATION.md)
- Teachable-unit schema: [`../schemas/teachable-unit-schema.md`](../schemas/teachable-unit-schema.md)
- Prior module: [`MODULE-06-HYBRID-ASSET-PIPELINE.md`](MODULE-06-HYBRID-ASSET-PIPELINE.md)
- Next module: [`MODULE-08-GAME-VERIFICATION.md`](MODULE-08-GAME-VERIFICATION.md)

## Objective

Replace repetitive Unity production work with tools and validators without creating opaque scene,
asset, or package mutations that a human cannot review.

By the end of this module, the learner has at least one safe editor tool or validator in place,
evidence that it catches a real production mistake, and a written boundary between automation that
can run mechanically and operations that still require explicit human review.

This module assumes Module 6 already established naming rules, asset proof discipline, import
setting patterns, and human-vs-agent review boundaries. Module 7 turns those stable rules into
repeatable tooling.

## Time Budget And Cut Triggers

Budget: 8-14 hours.

Use the budget to reduce repetitive work and catch common failures. Do not use it to build a tool
platform larger than the game.

Cut triggers:

- If a tool takes more than 2 hours to explain, it is probably too broad for this module. Narrow it
  to one validator or one setup task.
- If a proposed automation mutates scenes, assets, prefabs, packages, or project settings in a way
  that cannot be reviewed by diff or clear evidence, cut or redesign it.
- If editor automation requires risky package installs or unstable integrations, fall back to
  read-only scanning or menu-triggered validators.
- If the learner cannot demonstrate one real caught failure by the halfway point, cut secondary
  tools and ship only one validator plus one smoke helper.
- If Unity MCP/editor automation still fails the Module 1 safety test, do not reintroduce it here
  except for read-only inspection.

Master gate:

> The project catches common Unity production mistakes before a human playtest.

## Learner Assignment

Work from the integrated gameplay slice and asset rules already established in Modules 5 and 6. The
 goal is not "automation for automation's sake." The goal is to remove repeatable mistakes and setup
friction from the current project.

1. Choose the automation targets.

   Pick 2-4 high-friction production checks from the current project. At least one must be a
   validator that can fail a bad state.

   Good targets:

   - scene validator
   - prefab validator
   - missing-reference scanner
   - build profile setup helper
   - debug overlay toggle or launch helper
   - one-click smoke scene launcher
   - asset naming/import checker based on Module 6 rules

   Bad targets for this module:

   - broad scene generation
   - mass asset rewriting
   - package management automation without review
   - automatic feel or balance tuning
   - tools that require hidden chat context to operate safely

2. Write the automation boundary note.

   Create `MODULE-07-AUTOMATION-BOUNDARY.md` and split proposed work into three categories:

   - safe to automate
   - safe only with explicit human review
   - not safe for this project

   Cover:

   - scenes
   - prefabs
   - assets and import settings
   - packages
   - build settings
   - generated files
   - destructive operations

3. Choose one tracer-bullet validator.

   Pick one validator that can prove real value quickly. Prefer the smallest tool that catches a
   real project mistake.

   Examples:

   - find missing references in prefabs or scenes
   - detect assets outside approved folder conventions
   - detect production assets with unresolved ledger or proof state
   - flag required smoke scene objects that are missing
   - detect unassigned serialized fields in gameplay prefabs

4. Define pass/fail inputs.

   Before implementation, name:

   - the bad state the validator should catch
   - the good state it should accept
   - how the learner will create the failing case safely
   - what evidence proves the validator worked

   Store this in `MODULE-07-VALIDATOR-SPEC.md`.

5. Build the validator or helper.

   Use the smallest reviewable surface:

   - menu item
   - editor window
   - report asset
   - console summary
   - generated text or markdown report

   Prefer tools that are:

   - deterministic
   - easy to re-run
   - diffable where possible
   - readable by a fresh agent
   - safe on a working project

6. Add one secondary helper only if the tracer-bullet validator is already working.

   Acceptable secondary helpers:

   - build profile setup helper
   - smoke scene launcher
   - debug overlay bootstrap
   - prefab naming audit

   Do not add more tools just to look productive.

7. Run the validator against a deliberate failure.

   Create one safe failing state in a throwaway object, prefab copy, test scene, or branch-local
   setup. Do not damage the real production slice just to demonstrate the validator.

   Capture:

   - what was broken
   - what the validator reported
   - what the learner changed to fix it
   - what the validator reported after the fix

8. Review the tool for safety.

   Confirm:

   - the tool does not silently rewrite risky content
   - the output is understandable without hidden chat context
   - the tool has a clear rerun path
   - the tool does not encourage off-architecture shortcuts
   - the tool is named clearly enough for another agent to use safely

9. Connect the tool to project workflow.

   Write when the validator or helper should run:

   - before playtest
   - before integration
   - before build
   - before release packaging

   Keep this in `MODULE-07-TOOL-RUNBOOK.md`.

10. Record the caught failure.

    Create `MODULE-07-VALIDATION-EVIDENCE.md` with:

    - tool name
    - target failure
    - failing input or state
    - failing output
    - fix applied
    - passing output
    - whether the tool is agent-safe, human-review-only, or project-local only

11. Carry forward verification hooks.

    Module 8 will build the real verification surface. Leave Module 7 in a state where Module 8 can
    reuse the validator outputs, smoke helper, and runbook rather than rediscovering them.

## Required Artifacts

Submit these artifacts:

- `MODULE-07-AUTOMATION-BOUNDARY.md`
- `MODULE-07-VALIDATOR-SPEC.md`
- at least one working validator or helper with a reviewable invocation path
- `MODULE-07-VALIDATION-EVIDENCE.md`
- `MODULE-07-TOOL-RUNBOOK.md`
- proof that the validator catches a deliberate failing state and passes after a fix
- review note describing what remains human-review-only

Optional artifacts:

- secondary helper such as a smoke launcher, debug overlay setup helper, or build profile helper
- validator report output file or screenshot
- short tool index added to the project docs

## Review Prompts

- Does the module produce at least one validator or helper that addresses a real project pain point?
- Is the automation boundary explicit about what is safe to automate versus what still requires human
  review?
- Does the validator catch a real failing state rather than only printing a success path?
- Can a reviewer understand how to rerun the tool from the written evidence?
- Does the tool avoid opaque scene, asset, prefab, package, or destructive mutation?
- If the tool writes anything, is the output reviewable and appropriately narrow?
- Does the runbook say when the tool should run in the project workflow?
- Does the tool support Module 8 verification rather than competing with it?
- Is Unity MCP/editor automation still treated as optional until proven safe?

## Common Failure Modes

- The learner builds a broad tool framework instead of one useful validator.
- The tool silently mutates scenes, prefabs, assets, or packages without a clear review surface.
- The validator never demonstrates a real failing case.
- The output is too vague to help a reviewer or a fresh agent.
- The tool depends on hidden chat history or unwritten assumptions.
- The learner automates a process whose rules are not stable yet.
- The validator reports many warnings but does not define what blocks progress.
- The tool duplicates Module 8 verification without integrating into a runbook.
- Unity MCP/editor automation is reintroduced despite failing the earlier safety gate.
- Build profile or smoke helpers are created, but nobody records when to run them.

## Pass/Fail Rubric

Pass if all are true:

- At least one validator or helper exists and is runnable.
- The automation boundary clearly separates safe automation from human-review-only operations.
- A deliberate failing state is created safely and caught by the validator.
- The fix is applied and the validator passes afterward.
- The evidence explains what happened without hidden context.
- The tool reduces a real production mistake or setup burden.
- The tool does not create opaque risky mutation.

Fail if any are true:

- No working validator or helper exists.
- The tool cannot be rerun reliably.
- The learner never demonstrates a real caught failure.
- The automation boundary is missing or vague.
- The tool mutates risky project surfaces without explicit review design.
- The learner spends the module building tooling infrastructure without project value.

Minimum bar:

> One small validator or helper catches a common Unity production mistake before a human playtest and
> is documented well enough for another agent or reviewer to run safely.

Gate restatement:

> The project catches common Unity production mistakes before a human playtest.

Verification phrase:

> A common Unity production mistake is caught before a human playtest.

## Strong Vs Weak Examples

Strong:

> The learner builds a missing-reference scanner that checks gameplay prefabs in the project folder,
> creates a throwaway prefab copy with one unassigned field, captures the failing report, fixes the
> reference, reruns the scan, and records when the scan should run before playtests and builds.

Weak:

> The learner creates an "automation framework" document, a base tool class, and a menu root but no
> validator that catches a real problem.

Strong:

> The learner adds a smoke scene launcher and a validator that flags assets imported outside the
> approved production folders, then marks the validator as agent-safe and scene mutation as
> human-review-only in the boundary note.

Weak:

> The learner writes a tool that automatically reorganizes folders and edits import settings in bulk
> without proof, rollback notes, or a human review boundary.

Strong:

> The learner builds a build profile setup helper that only prepares a known profile and prints the
> exact settings it touched, then pairs it with a runbook and a validator that checks those settings
> before Windows builds.

Weak:

> The learner claims "build automation complete" because a script exists, but there is no evidence
> that it prevents a common failure or that anyone knows when to run it.

## Next Module Handoff

Module 8 converts the project from useful tools into a repeatable verification system. Carry
forward:

- validator or helper entry points
- automation boundary note
- failing-case and passing-case evidence
- smoke launch path
- build profile helper notes, if any
- debug overlay notes, if any
- tool runbook
- list of checks that should become recurring verification steps

Module 8 should reuse these tools instead of replacing them with a parallel verification surface.
