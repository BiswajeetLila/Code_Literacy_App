# Module 10: Steam-Demo Candidate Package And Maintenance

## Status

complete

## Policy Links

- Master spec: [`../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`../NORMALIZATION.md`](../NORMALIZATION.md)
- Teachable-unit schema: [`../schemas/teachable-unit-schema.md`](../schemas/teachable-unit-schema.md)
- Steam-demo checklist template: [`../templates/STEAM-DEMO-CANDIDATE-CHECKLIST.md`](../templates/STEAM-DEMO-CANDIDATE-CHECKLIST.md)
- Fresh-agent handoff template: [`../templates/FRESH-AGENT-HANDOFF.md`](../templates/FRESH-AGENT-HANDOFF.md)
- Prior module: [`MODULE-09-POLISH-FEEL-UX.md`](MODULE-09-POLISH-FEEL-UX.md)
- Capstone rubric: [`../rubrics/CAPSTONE-RUBRIC.md`](../rubrics/CAPSTONE-RUBRIC.md)
- Adversarial assessment: [`../rubrics/ADVERSARIAL-ASSESSMENT.md`](../rubrics/ADVERSARIAL-ASSESSMENT.md)

## Objective

Package the vertical slice like a real Steam-demo candidate without requiring every learner to
complete Steamworks account-side setup.

By the end of this module, the learner has a reviewable Windows demo package surface: build output,
build profile and reproducible build notes, demo README, known issues, store copy draft, screenshot
set, trailer shot list, Steamworks checklist, Content Survey prep including AI disclosure, asset
ledger linkage, and a fresh-agent handoff that lets another agent continue without hidden chat
context.

This module is about honest release readiness. It is not a vanity launch pass.

## Time Budget And Cut Triggers

Budget: 8-14 hours.

Packaging should present the slice clearly and truthfully. Do not turn this module into platform
operations theatre.

Cut triggers:

- If the Windows build is unstable, stop doing store-copy or trailer polish and stabilize the build
  first.
- If required packaging artifacts are missing, cut optional Steamworks extension work.
- If screenshot or trailer staging would misrepresent placeholder, broken, or unverified content,
  delay capture and fix the slice instead.
- If AI disclosure status is unclear for player-consumed content, block release readiness until the
  asset ledger and Content Survey prep are corrected.
- If the fresh-agent handoff fails a cold continuation check, stop package polish and repair the
  handoff.
- If Steamworks account-side tasks become a distraction, keep them explicitly optional and complete
  only the Steam-demo candidate package surface.

Master gate:

> The output is a Steam-demo candidate package. Actual Steamworks upload is an optional extension.

## Learner Assignment

Start from the verified and clarified build from Modules 8 and 9. Module 10 packages that build for
review, continuation, and capstone assessment.

1. Fill the release checklist.

   Copy [`STEAM-DEMO-CANDIDATE-CHECKLIST.md`](../templates/STEAM-DEMO-CANDIDATE-CHECKLIST.md) into
   the learner project and complete it against the current build.

2. Produce the Windows build.

   Record:

   - build target
   - build profile or settings used
   - output path
   - build timestamp or version tag
   - whether the build launched outside the editor

   This module requires an actual runnable build surface, not only editor confidence.

3. Write reproducible build notes.

   Create or update notes that let another agent or reviewer repeat the build with the same target
   and output expectations.

   Include:

   - Unity version
   - active build profile or scene list
   - special switches or prerequisites
   - output folder convention
   - blocking known issues

4. Prepare the demo README.

   Create `DEMO-README.md` or equivalent with:

   - game premise
   - controls
   - expected session length
   - how to launch
   - known limitations
   - whether this is a Steam-demo candidate and not a final release

5. Prepare the known-issues file.

   Create `KNOWN-ISSUES.md` or equivalent with:

   - issue title
   - impact
   - whether it blocks packaging
   - workaround if any
   - owner or next action

   Keep this honest. A known-issues file that hides defects is worse than none.

6. Prepare store copy draft and capture plan.

   Create:

   - short store-copy draft
   - screenshot set candidate list
   - trailer shot list

   The goal is readiness and honesty, not marketing prose volume.

7. Prepare Steamworks and Content Survey notes.

   Even if account-side upload is not done, the learner must prepare:

   - Steamworks checklist
   - Content Survey prep
   - AI disclosure separation between behind-the-scenes AI use, pre-generated player-consumed AI,
     and live-generated AI if any
   - linkage back to the asset ledger for commercial-use and disclosure evidence

8. Fill the fresh-agent handoff.

   Copy [`FRESH-AGENT-HANDOFF.md`](../templates/FRESH-AGENT-HANDOFF.md) into the learner project and
   complete it for the current build, package, risks, next task, and verification expectations.

9. Run the cold continuation check.

   Hand the package docs to a fresh agent or simulate that handoff with the handoff template as the
   only operational memory surface.

   Confirm the fresh agent can answer:

   - what the project is
   - how to run it
   - how to build it
   - what the current risks are
   - what the next safe task is
   - what not to change without review

10. Write the package evidence note.

    Create `MODULE-10-PACKAGE-EVIDENCE.md` with:

   - build path
   - build launch result
   - checklist status
   - README status
   - known-issues status
   - store-copy status
   - screenshot/trailer plan status
   - Steamworks checklist status
   - Content Survey prep status
   - fresh-agent continuation result

11. Decide whether Steamworks extension work is in or out.

    If the learner has the account/legal/payment readiness, they may continue into optional
   Steamworks extension work. If not, the package is still valid as a course capstone output.

## Required Artifacts

Submit these artifacts:

- filled `STEAM-DEMO-CANDIDATE-CHECKLIST.md`
- filled `FRESH-AGENT-HANDOFF.md`
- playable Windows build path and launch evidence
- build profile and reproducible build notes
- demo README
- known-issues file
- store copy draft
- screenshot set candidate list
- trailer shot list
- Steamworks checklist
- Content Survey prep notes including AI disclosure separation
- `MODULE-10-PACKAGE-EVIDENCE.md`

Optional artifacts:

- release branch note or tag note
- optional Steamworks extension checklist progress
- packaging review note from a second reviewer

## Review Prompts

- Does the package include an actual Windows build surface?
- Can another person reproduce the build from the notes?
- Is the README enough for a reviewer or fresh agent to run the demo?
- Are known issues honest and clearly marked as blocking or non-blocking?
- Do the store copy, screenshot set, and trailer shot list represent the real build honestly?
- Is Content Survey prep separated into behind-the-scenes AI, pre-generated player-consumed AI, and
  live-generated AI if relevant?
- Do the packaging docs link cleanly back to the asset ledger where legality or disclosure matters?
- Does the fresh-agent handoff work without hidden chat context?
- Is Steamworks upload correctly treated as optional extension work rather than mandatory course
  completion?
- Does the output qualify as a Steam-demo candidate package rather than a loose pile of files?

## Common Failure Modes

- The learner claims release readiness without producing a runnable Windows build.
- Build notes are too vague for reproduction.
- The README explains the game poorly or omits launch instructions.
- Known issues are hidden or minimized.
- Screenshot or trailer planning misrepresents the actual slice.
- Content Survey prep ignores AI-generated player-consumed content.
- Asset legality and disclosure notes are disconnected from the release package.
- The fresh-agent handoff is incomplete, so continuation depends on chat history.
- The learner spends time on optional Steamworks setup while the package itself is still incomplete.
- Packaging polish proceeds even though the build or onboarding is still unstable.

## Pass/Fail Rubric

Pass if all are true:

- `STEAM-DEMO-CANDIDATE-CHECKLIST.md` is complete and reviewable.
- `FRESH-AGENT-HANDOFF.md` is complete and operational.
- A playable Windows build exists and launch evidence is present.
- Reproducible build notes exist.
- README, known issues, store copy draft, screenshot set, and trailer shot list exist.
- Content Survey prep and AI disclosure separation exist.
- The package can be continued by a fresh agent without hidden context.
- The output is a Steam-demo candidate package even if Steamworks upload is not attempted.

Fail if any are true:

- No runnable build surface exists.
- Build notes are missing.
- The package hides known issues or disclosure risk.
- The fresh-agent handoff fails.
- Packaging assets or copy misrepresent the real slice.
- The learner treats optional Steamworks upload as the same thing as core package readiness.

Minimum bar:

> Another reviewer or fresh agent can locate the build, launch it, understand the package contents,
> identify known issues and disclosure status, and continue the project safely from the handoff.

## Strong Vs Weak Examples

Strong:

> The learner ships a Windows build folder, reproducible build notes, a concise README, known-issues
> file, honest screenshot/trailer plan, Content Survey prep linked to the asset ledger, and a
> handoff that lets a fresh agent continue with one safe next task.

Weak:

> The learner says the game is "Steam ready" because it runs in the editor and there are some
> screenshots in a folder.

Strong:

> The learner marks Steamworks upload as optional, completes the Steam-demo candidate package, and
> clearly separates unfinished platform-account work from actual course completion.

Weak:

> The learner spends the whole module reading Steamworks docs while the build, README, and handoff
> are still incomplete.

Strong:

> The learner documents one known blocker honestly in `KNOWN-ISSUES.md`, marks the package as not yet
> release-ready for external distribution, and still provides a complete reviewable package surface.

Weak:

> The learner hides a crash-on-restart issue because it would make the package look worse.

## Next Module Handoff

This is the final course module. Carry forward into capstone review and adversarial assessment:

- filled `STEAM-DEMO-CANDIDATE-CHECKLIST.md`
- filled `FRESH-AGENT-HANDOFF.md`
- Windows build path
- reproducible build notes
- README and known issues
- store copy draft
- screenshot set candidate list
- trailer shot list
- Content Survey prep
- asset ledger linkage
- package evidence note

Capstone review should use these artifacts directly rather than reconstructing release readiness from
chat history.
