# Module 9: Polish, Feel, UX, And Player Clarity

## Status

complete

## Policy Links

- Master spec: [`../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`../NORMALIZATION.md`](../NORMALIZATION.md)
- Teachable-unit schema: [`../schemas/teachable-unit-schema.md`](../schemas/teachable-unit-schema.md)
- Playtest rubric template: [`../templates/PLAYTEST-RUBRIC.md`](../templates/PLAYTEST-RUBRIC.md)
- Prior module: [`MODULE-08-GAME-VERIFICATION.md`](MODULE-08-GAME-VERIFICATION.md)
- Next module: [`MODULE-10-STEAM-DEMO-CANDIDATE.md`](MODULE-10-STEAM-DEMO-CANDIDATE.md)

## Objective

Use agents for tuning suggestions and observation support while the human owns taste, final feel,
and the decision about what actually makes the game worth showing.

By the end of this module, the learner has a documented feel pass, onboarding pass, menu/pause/
settings pass, accessibility-basics pass, audio/VFX feedback pass, difficulty and pacing pass, and
screenshot/trailer staging pass, all grounded in playtest evidence instead of self-belief.

This module is not permission to redesign the game late. It is a clarity and feel pass on a
verified slice.

## Time Budget And Cut Triggers

Budget: 12-20 hours.

Polish must follow verification. If Module 8 still shows broken fundamentals, fix those first.

Cut triggers:

- If a new player still does not understand the goal, controls, feedback, or failure state by the
  midpoint of the module, cut cosmetic polish tasks and fix onboarding first.
- If feel tuning keeps changing core mechanics without improving clarity, freeze tuning and return
  to one stable playable slice.
- If a polish task does not improve player comprehension, feedback readability, or session quality,
  cut it.
- If screenshot or trailer staging starts consuming time needed for actual usability fixes, defer
  capture polish until the player-understanding gate is passing.
- If accessibility basics uncover structural input or readability failures, treat them as gameplay
  blockers rather than optional polish.
- If the learner keeps using agent suggestions as taste decisions, pause the pass and require a
  human comparison judgment before continuing.

Master gate:

> A new player understands the goal, controls, feedback, and failure state without developer
> explanation.

## Learner Assignment

Start from the verified Module 8 slice. This module improves comprehension, readability, and feel
for a first-time player.

1. Fill the playtest rubric.

   Copy [`PLAYTEST-RUBRIC.md`](../templates/PLAYTEST-RUBRIC.md) into the learner project and tailor
   it to the current build. Keep the rubric tied to the actual loop, not to vague polish goals.

2. Define the playtest cohort.

   Select at least 2-3 first-time players or equivalent cold reviewers. They do not need to be
   strangers, but they must not already know the intended answers.

   Record:

   - device/input mode used
   - build version
   - whether they were told anything before starting
   - whether they had prior exposure to the game

3. Run the onboarding pass.

   Focus on the first 30-90 seconds:

   - can the player tell what the goal is
   - can the player tell what to press
   - can the player tell whether they are succeeding or failing
   - can the player recover from the first mistake

   If the answer is unclear, fix onboarding before decorative polish.

4. Run the feel pass.

   Review:

   - timing
   - movement responsiveness
   - camera readability where relevant
   - hit or fail feedback
   - transition timing
   - pause and restart friction

   Agents may summarize observations or suggest options. The human chooses what actually feels right.

5. Run the menu/pause/settings pass.

   Verify the player can:

   - start the game
   - pause or recover
   - restart after failure
   - exit or return safely
   - change any required baseline setting such as volume or sensitivity if the game exposes it

   Do not expand settings just to look complete. A minimal trustworthy menu is better than a broken
   large one.

6. Run the accessibility-basics pass.

   At minimum, inspect:

   - text readability
   - contrast
   - non-color-only signaling for critical states
   - remapping or alternate-input note if supported
   - audio-dependent cues that need visual reinforcement
   - screen-shake, flash, or motion intensity that might need damping

   This module does not require full accessibility compliance, but it does require obvious failures
   to be surfaced and addressed where realistic.

7. Run the audio/VFX feedback pass.

   Check whether the player can understand:

   - success feedback
   - failure feedback
   - hazard warning
   - UI confirmation
   - moments of reward

   If audio or VFX is unclear, noisy, or misleading, document the issue and tighten the feedback.

8. Run the difficulty and pacing pass.

   Look for:

   - confusion spikes
   - dead time
   - sudden difficulty cliffs
   - missing cooldown or recovery beats
   - sections that overstay their value

   Use playtest evidence. Do not tune pacing by gut alone.

9. Stage screenshots and trailer moments.

   Do not create marketing polish yet. Stage capture conditions:

   - readable player state
   - representative moment of the loop
   - no debug noise
   - no placeholder content that would misrepresent the demo

   Record a candidate screenshot list and trailer shot list for Module 10.

10. Write the clarity evidence note.

    Create `MODULE-09-PLAYER-CLARITY-EVIDENCE.md` with:

   - players observed
   - what they understood immediately
   - where they were confused
   - what felt good
   - what they ignored
   - what changes were made
   - what still needs fixing before packaging

11. Re-run one short cold-player check after fixes.

    After the most important clarity fixes, run one more focused cold pass. The purpose is to test
   whether the changes improved understanding, not to start endless polish cycles.

## Required Artifacts

Submit these artifacts:

- filled `PLAYTEST-RUBRIC.md`
- playtest notes from at least one cold-player session
- onboarding pass notes
- feel-pass notes
- menu/pause/settings review note
- accessibility-basics review note
- audio/VFX feedback review note
- difficulty and pacing review note
- screenshot set candidate list
- trailer shot candidate list
- `MODULE-09-PLAYER-CLARITY-EVIDENCE.md`

Optional artifacts:

- before/after clip or screenshot for one important clarity fix
- structured list of agent-generated suggestions that were accepted or rejected
- trimmed known-issues note for problems intentionally deferred to Module 10

## Review Prompts

- Does `PLAYTEST-RUBRIC.md` create a repeatable cold-player observation surface?
- Is there evidence from a real first-time player or equivalent cold reviewer?
- Did the learner prioritize onboarding and comprehension over decorative polish?
- Are feel judgments grounded in observable player response rather than vague adjectives only?
- Can the player start, pause, recover, and exit safely?
- Were obvious accessibility-basics failures inspected and documented?
- Does audio/VFX feedback improve understanding instead of adding noise?
- Are difficulty and pacing notes tied to concrete player friction points?
- Do the screenshot and trailer candidates represent the real loop honestly?
- Would a new player understand the goal, controls, feedback, and failure state without developer
  explanation?

## Common Failure Modes

- The learner polishes visuals while onboarding is still unclear.
- Agent suggestions are accepted as taste decisions without human judgment.
- Playtest subjects are already coached, so the data is fake reassurance.
- The learner records what players said but not what players actually did.
- Menu, pause, restart, or failure recovery remains confusing because it feels "secondary."
- Accessibility basics are skipped because the slice is small.
- Audio/VFX becomes louder or flashier but less informative.
- Difficulty tuning reacts to one player anecdote instead of repeated patterns.
- Screenshot/trailer staging turns into fake marketing instead of honest capture prep.
- The learner keeps polishing after the module should have cut back to clarity fixes.

## Pass/Fail Rubric

Pass if all are true:

- `PLAYTEST-RUBRIC.md` is complete and runnable.
- At least one cold-player or equivalent cold-review session was run.
- Onboarding, feel, menu/pause/settings, accessibility basics, audio/VFX, and pacing were all
  reviewed.
- Evidence shows what confused or helped the player.
- The learner made or documented changes tied to that evidence.
- Screenshot and trailer staging is prepared honestly.
- A new player can understand the goal, controls, feedback, and failure state without developer
  explanation.

Fail if any are true:

- No cold-player evidence exists.
- The learner confuses cosmetic polish with usability improvement.
- Onboarding remains unclear.
- Pause/recovery/settings flow is broken or undocumented.
- Accessibility basics are ignored.
- Feedback is noisy or misleading.
- The evidence does not show what changed or why.

Minimum bar:

> One cold player can enter the game, understand what to do, read the feedback, fail once, recover,
> and continue without developer explanation.

## Strong Vs Weak Examples

Strong:

> A cold player launches the build, understands the objective after the first prompt, fails once,
> uses restart without help, and correctly explains why the failure happened. The learner records the
> one confusion point, adjusts the warning feedback, and reruns a short check.

Weak:

> The learner tweaks particles, colors, and menu spacing, but never watches a real first-time player
> use the build.

Strong:

> The learner observes that players confuse reward feedback with hazard feedback, simplifies the VFX
> and audio contrast, updates the rubric notes, and shows the change improved player understanding.

Weak:

> The learner adds more VFX because the game felt flat, even though players were already missing the
> failure signal.

Strong:

> The learner prepares screenshot and trailer staging by listing honest in-game moments that represent
> the loop, while explicitly excluding placeholder assets and debug overlays.

Weak:

> The learner stages screenshots with fake camera angles and UI states that the real demo does not
> produce.

## Next Module Handoff

Module 10 packages the slice for a demo-candidate release. Carry forward:

- filled `PLAYTEST-RUBRIC.md`
- player clarity evidence
- onboarding fixes made
- unresolved clarity issues
- settings/menu expectations
- accessibility-basics notes
- screenshot candidate list
- trailer shot list
- known presentation risks that affect packaging honesty

Module 10 should package the build that actually passes this clarity gate, not a cosmetically nicer
but more confusing variant.
