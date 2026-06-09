# Module 8: Verification For Games

## Status

complete

## Policy Links

- Master spec: [`../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`../NORMALIZATION.md`](../NORMALIZATION.md)
- Teachable-unit schema: [`../schemas/teachable-unit-schema.md`](../schemas/teachable-unit-schema.md)
- QA plan template: [`../templates/QA-PLAN.md`](../templates/QA-PLAN.md)
- Prior module: [`MODULE-07-EDITOR-AUTOMATION-TOOLING.md`](MODULE-07-EDITOR-AUTOMATION-TOOLING.md)
- Next module: [`MODULE-09-POLISH-FEEL-UX.md`](MODULE-09-POLISH-FEEL-UX.md)

## Objective

Build verification systems that fit game production instead of pretending every important quality bar
can be reduced to unit tests.

By the end of this module, the learner has a working verification surface for the current game slice:
edit mode tests where logic deserves them, play mode checks where behavior must be observed, a smoke
scene path, build verification checklist, performance budget, input checks, regression checklist,
and bug intake path.

The goal is not maximal test coverage. The goal is catching expensive failures before the release
package stage.

## Time Budget And Cut Triggers

Budget: 10-16 hours.

Verification must scale to the slice. Do not try to build a large QA system for a small demo.

Cut triggers:

- If the learner spends more than 3 hours designing a broad testing framework, cut back to one edit
  mode target, one play mode target, one smoke path, and one build checklist.
- If a gameplay behavior is too feel-dependent for reliable automation, cover it with a repeatable
  human playtest script and explicit observation checks rather than forcing brittle tests.
- If play mode testing setup becomes unstable, keep the smoke scene and regression checklist as the
  required floor.
- If performance instrumentation becomes a time sink, define one measurable budget and one manual
  capture path instead of building full telemetry.
- If verification is finding many failures but the learner is not fixing them, freeze new checks and
  stabilize the current failing surface.
- If build verification is not runnable by the end of the module, cut secondary checks until the
  project can at least verify a Windows build path and smoke launch path.

Master gate:

> A broken core mechanic, failed build, missing reference, or packaging failure is caught before the
> final release package.

## Learner Assignment

Start from the current playable slice plus the tooling produced in Module 7. Module 8 turns those
ad hoc checks into a repeatable verification loop.

1. Fill the QA plan.

   Copy [`QA-PLAN.md`](../templates/QA-PLAN.md) into the learner project and complete it for the
   current vertical slice.

   The plan must name:

   - smoke path
   - edit mode targets
   - play mode targets
   - build verification path
   - performance budget
   - input checks
   - regression checklist
   - known risks
   - bug intake format

2. Choose the minimum verification spine.

   Define the smallest complete verification loop that still protects the project:

   - one edit mode check
   - one play mode check or equivalent scripted gameplay verification
   - one smoke launch path
   - one build verification checklist
   - one performance budget check
   - one input verification pass

   If the game is too small for one of these to be automated meaningfully, explain the replacement
   manual check in the QA plan.

3. Add edit mode coverage where logic deserves it.

   Good edit mode targets:

   - pure scoring logic
   - timer or rule evaluation
   - config validation
   - validator behavior from Module 7
   - build or release metadata checks

   Avoid forcing scene-dependent gameplay into edit mode tests.

4. Add play mode coverage where behavior must be observed.

   Good play mode targets:

   - critical win/loss condition
   - spawn or reset behavior
   - core interactable flow
   - hazard/player collision rule
   - UI state change required for gameplay clarity

   If full play mode automation is too costly, write a deterministic smoke scene script and reviewer
   steps that exercise the same critical behavior.

5. Define the smoke scene path.

   Name one launch path that proves the game still boots and the core loop still runs. This may be:

   - dedicated smoke scene
   - one-click launcher from Module 7
   - documented main-scene launch path

   Record:

   - what the tester does
   - what must appear
   - what counts as immediate failure

6. Write the build verification checklist.

   Cover:

   - Windows build target
   - build profile or build settings
   - clean output location
   - launch success
   - missing file or missing scene failures
   - known warnings that are acceptable versus blocking

7. Set a performance budget.

   Define a budget simple enough to rerun:

   - target machine class
   - target frame rate or frame time
   - measurement scene
   - capture method
   - acceptable spike threshold

   The budget must be honest for the slice, not aspirational.

8. Define input checks.

   Verify the actual supported input modes. At minimum, confirm:

   - basic controls work
   - pause/restart or equivalent recovery control works
   - required UI can be navigated with the supported input device
   - no silent input dead state blocks the player

9. Create the bug intake path.

   Add `MODULE-08-BUG-REPORT-TEMPLATE.md` or equivalent bug intake notes covering:

   - reproduction steps
   - expected behavior
   - actual behavior
   - severity
   - scene or build version
   - evidence path

10. Run a regression pass.

    Use the completed QA plan to run:

   - edit mode checks
   - play mode checks
   - smoke path
   - build verification
   - performance capture
   - input checks

   Record all failures and whether they were fixed or deferred.

11. Write the verification evidence note.

    Create `MODULE-08-VERIFICATION-EVIDENCE.md` with:

   - what was run
   - when it was run
   - what failed
   - what passed
   - what was fixed
   - what remains known risk
   - what blocks packaging if left unresolved

12. Carry the results forward.

    Module 9 uses this module to decide whether polish work is safe or whether core clarity problems
    still need fixing. Do not hide failing fundamentals under a polish pass.

## Required Artifacts

Submit these artifacts:

- filled `QA-PLAN.md`
- edit mode test evidence or explicit note why a chosen target is manual-only
- play mode test evidence or scripted manual replacement path
- smoke test scene or documented smoke launch path
- build verification checklist evidence
- performance budget and one capture result
- input check evidence
- bug intake template or note
- `MODULE-08-VERIFICATION-EVIDENCE.md`
- regression checklist results

Optional artifacts:

- validator integration note from Module 7
- failing and passing build screenshots
- defect log for deferred but known non-blocking issues

## Review Prompts

- Does `QA-PLAN.md` define a complete verification loop rather than isolated checks?
- Is there at least one meaningful edit mode check and one meaningful play mode check or justified
  replacement?
- Can a reviewer follow the smoke path without hidden chat context?
- Does the build verification checklist prove more than "the build button was clicked"?
- Is there a concrete performance budget and measurement method?
- Do the input checks match the actual supported input modes?
- Does the bug intake path capture reproduction, expected behavior, actual behavior, severity, and
  evidence?
- Does the verification evidence show at least one failure that was caught or one explicitly named
  risk that would block packaging?
- Are known risks visible instead of buried?
- Does the module catch broken core behavior before release packaging rather than discovering it at
  the end?

## Common Failure Modes

- The learner writes a large QA plan but never runs it.
- Edit mode tests cover trivial helpers while risky game rules stay unchecked.
- Play mode verification is skipped because it feels harder than edit mode tests.
- The smoke path exists, but nobody defines what counts as failure.
- Build verification stops at "it compiled" without launch or packaging checks.
- Performance budget is vague, unrealistic, or never measured.
- Input checks ignore pause, restart, menu, or failure-recovery states.
- Known risks are undocumented, so the same failures keep returning.
- The regression pass finds issues, but the learner does not classify which ones block packaging.
- The bug report path is so vague that another agent cannot reproduce a defect.
- Verification is deferred in favor of polish even though core behavior is still unstable.

## Pass/Fail Rubric

Pass if all are true:

- `QA-PLAN.md` is complete and runnable.
- The project has a defined smoke path.
- Edit mode and play mode verification exist where they make sense, or justified manual replacements
  are documented.
- Build verification is explicit and reviewable.
- Performance budget and input checks are explicit.
- The regression pass was actually run.
- Verification evidence shows what passed, what failed, and what remains risky.
- The module would catch a broken core mechanic, failed build, missing reference, or packaging
  failure before release packaging.

Fail if any are true:

- The QA plan is incomplete or generic.
- No meaningful verification was run.
- Core mechanics have no repeatable verification path.
- Build verification is absent or unreviewable.
- Performance and input checks are ignored.
- Known risks are hidden.
- The evidence does not show what the learner actually ran.

Minimum bar:

> The learner can run one repeatable verification loop that would catch a broken core mechanic,
> failed build, missing reference, or packaging failure before the release package stage.

## Strong Vs Weak Examples

Strong:

> The learner adds one edit mode test for score calculation, one play mode check for mission fail
> state, one smoke launcher for the core scene, a Windows build checklist, an input pass for keyboard
> and controller, and a performance capture from the busiest room, then records one caught missing
> reference and its fix.

Weak:

> The learner writes "we should test gameplay" in the QA plan, runs no checks, and assumes manual
> play during development is enough.

Strong:

> The learner cannot justify brittle play mode automation for a feel-heavy dash mechanic, so they
> replace it with a smoke script plus a deterministic manual observation checklist and document why
> that is the correct verification surface.

Weak:

> The learner forces a flaky play mode test that fails randomly, then ignores it because the suite is
> "mostly green."

Strong:

> The learner defines a build checklist that confirms the Windows build launches, required scenes are
> included, the smoke path works in the build, and acceptable warnings are separated from blockers.

Weak:

> The learner says "build passed" because Unity did not throw an exception in the editor.

## Next Module Handoff

Module 9 uses Module 8 to decide what can be polished and what still needs fixing for player
clarity. Carry forward:

- filled `QA-PLAN.md`
- smoke path
- edit mode coverage list
- play mode coverage list
- build verification checklist
- performance budget
- input verification notes
- bug intake template
- regression results
- known blocking risks

If Module 8 still shows unstable fundamentals, Module 9 must fix clarity and usability problems
before spending time on cosmetic polish.
