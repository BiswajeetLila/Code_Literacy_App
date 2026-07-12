# PLAYTEST-RUBRIC

## Status

complete

## Use When

Use this template in Module 9 to observe a first-time player or equivalent cold reviewer. This
rubric captures whether the game communicates its loop, controls, feedback, pacing, and failure
state without developer explanation.

This is a player-observation template, not a vibes-only note sheet. It should create evidence that
can justify clarity fixes.

## Before You Fill This

Have these inputs ready:

- current playable build or stable in-editor play path
- current onboarding path
- current known risks from `QA-PLAN.md`
- supported input mode for the session
- one observer who will record behavior, not only opinions
- capture path for notes, screenshots, or short clips if allowed

Do not explain the game beyond what the final game itself provides.

## Fillable Template

Copy this into the learner project as `docs/PLAYTEST-RUBRIC.md`.

### Session Setup

- Build/version:
- Date:
- Player ID or initials:
- Input mode:
- Prior familiarity with the game:
- Observer:
- Recording allowed:

### Player Instructions

Give the player only what the final game gives them.

Record exactly what the player saw before first control:

- title screen or entry prompt:
- tutorial prompt or lack of prompt:
- first actionable moment:

### Observe

Score each item as `clear`, `unclear`, or `failed`.

| Area | Score | Evidence |
|---|---|---|
| Goal clarity |  |  |
| Control clarity |  |  |
| Feedback clarity |  |  |
| Failure-state clarity |  |  |
| Recovery / restart clarity |  |  |
| Difficulty pacing |  |  |
| Menu / pause comprehension |  |  |
| Accessibility basics |  |  |
| Moments of fun |  |  |
| Bugs or friction |  |  |

### Timeline Notes

| Time / Beat | What Player Did | What Player Said | What The Game Communicated Poorly or Well |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

### Questions

Ask after the run:

- What did you think the goal was?
- What was confusing?
- What felt good?
- Where did you want to stop?
- What would you change first?
- When did you first understand how to succeed?
- What did the game not explain well enough?

### Observer Summary

- Biggest clarity problem:
- Biggest feel win:
- Biggest pacing issue:
- Biggest UI/menu issue:
- Biggest feedback issue:
- Must-fix before packaging:
- Nice-to-fix later:

## Worked Example

Game: Signal Keeper, a 2D signal-routing arcade slice.

### Session Setup

- Build/version: `signal-keeper-pre-demo-09`
- Date: 2026-06-10
- Player ID or initials: `P02`
- Input mode: keyboard/mouse
- Prior familiarity with the game: none
- Observer: human producer
- Recording allowed: yes

### Player Instructions

Give the player only what the final game gives them.

Record exactly what the player saw before first control:

- title screen or entry prompt: "Route the signal before overload"
- tutorial prompt or lack of prompt: one prompt showing rotate control
- first actionable moment: rotate first node and connect beam

### Observe

| Area | Score | Evidence |
|---|---|---|
| Goal clarity | clear | player said "I need to connect the line before the timer fills" |
| Control clarity | unclear | player hesitated before first rotate input |
| Feedback clarity | clear | overload warning and active beam were readable |
| Failure-state clarity | clear | player understood overload failure after one miss |
| Recovery / restart clarity | unclear | player looked for restart button for 4 seconds |
| Difficulty pacing | clear | first room felt readable, second room slightly abrupt |
| Menu / pause comprehension | clear | pause menu found without help |
| Accessibility basics | unclear | warning relied heavily on color before icon pulse fix |
| Moments of fun | clear | player smiled when route stabilized under pressure |
| Bugs or friction | unclear | one pause prompt clipped at 125% UI scale |

### Timeline Notes

| Time / Beat | What Player Did | What Player Said | What The Game Communicated Poorly or Well |
|---|---|---|---|
| 00:10 | stared at first node | "Can I turn this?" | rotate prompt could be stronger |
| 00:22 | rotated node successfully | "Okay, got it" | first success feedback was good |
| 00:48 | hit overload | "Oh, that was the timer" | fail feedback was readable |
| 00:53 | searched for restart | "How do I retry?" | restart action needs stronger placement |

### Questions

- What did you think the goal was?
  Route the signal before overload.
- What was confusing?
  Restart was harder to spot than it should be.
- What felt good?
  Locking in the route under pressure.
- Where did you want to stop?
  After the second overload, before I found restart quickly.
- What would you change first?
  Make retry more obvious.
- When did you first understand how to succeed?
  After the first node rotation.
- What did the game not explain well enough?
  What happens immediately after failure.

### Observer Summary

- Biggest clarity problem: restart/recovery visibility
- Biggest feel win: beam lock-in feedback
- Biggest pacing issue: second room ramps slightly faster than first-time players expect
- Biggest UI/menu issue: restart emphasis
- Biggest feedback issue: warning state needs non-color reinforcement
- Must-fix before packaging: restart clarity, warning readability, clipped pause prompt
- Nice-to-fix later: smoother transition into second challenge beat

## Required Fields

The filled rubric must include:

- session setup
- player instructions as actually shown
- observation table
- timeline notes
- post-run questions
- observer summary
- at least one must-fix item or an explicit note that no blocker was found

The rubric must distinguish what the player did from what the player said.

## Reject If Missing

Reject the playtest rubric if any are true:

- Session setup is missing.
- The player was coached beyond the in-game instructions.
- Observation scores are blank.
- Timeline notes are missing.
- Questions were not asked or the omissions are not explained.
- Observer summary is missing.
- The rubric records only opinions and not behavior.
- The rubric never identifies a must-fix issue or explicitly says none were found.
- The notes hide whether the player was cold or already familiar with the game.

Mandatory spec-stage reject checks are not applicable to this template as spec-stage checks because
`PLAYTEST-RUBRIC.md` is a playtest observation template, not a concept/spec approval template.

## Reviewer Notes

Review the rubric by asking whether it supports a real design decision:

- Confirm the player was cold or sufficiently close to cold.
- Check that the observer did not over-explain the game.
- Look for behavior evidence, not only quoted opinions.
- Check whether the must-fix items align with Module 9 gate language.
- Reject notes that sound polished but cannot tell you what confused the player or what to fix first.
