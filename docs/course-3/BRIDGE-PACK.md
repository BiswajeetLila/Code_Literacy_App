# Course 3 Bridge Pack

## Status

Complete for issue #10.

## Policy Links

- Master spec: [`../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Preflight gate: [`PREFLIGHT-GATE.md`](PREFLIGHT-GATE.md)
- Normalization: [`NORMALIZATION.md`](NORMALIZATION.md)

## Purpose

The bridge pack is a 1-2 week remediation track for learners who are close to Course 3 studio pace
but not yet studio-ready. It is not a beginner Unity course.

Bridge labs are assigned by failed or partial preflight checks. A learner may complete only the
labs tied to their gaps, but the final retake is always the full preflight gate.

## Required Bridge Folder

The learner submits:

```text
course-3-bridge/<learner-name>/
```

Every assigned lab must include:

- lab notes
- evidence artifact
- pass/fail self-check
- reviewer notes, if the lab was reviewed live or async

## Lab 1: Unity Orientation And Editor Basics

Use when:

- Unity editor basics scored `0` or `1`.
- Build troubleshooting failed because the learner could not find core Unity windows.

Assignment:

Create a new throwaway Unity 6.3 LTS project. Add one scene with a named player object, one hazard
object, one UI text object, and one prefab instance. Enter Play Mode and capture the editor in both
Scene and Game views.

Required evidence artifact:

- `LAB-01-UNITY-ORIENTATION.md`
- screenshots of Scene, Game, Inspector, Project, Hierarchy, Console, and Play Mode

Pass condition:

The learner correctly explains GameObject, Component, Prefab, Scene, Inspector, Console, Project,
Hierarchy, and Play Mode using their own screenshots.

## Lab 2: C# Reading For Agent-Generated Code

Use when:

- C# reading scored `0` or `1`.
- The learner can run Unity but cannot review agent-written scripts.

Assignment:

Annotate a short `MonoBehaviour` script that includes serialized fields, component references,
`Start`, `Update`, one helper method, and one intentional bug such as a missing null check or
frame-dependent movement.

Required evidence artifact:

- `LAB-02-CSHARP-READING.md`
- annotated code block
- short risk note naming what an agent might accidentally break

Pass condition:

The learner identifies the script's lifecycle methods, fields, component dependencies, behavior,
and intentional bug without asking an agent to explain it line-by-line.

## Lab 3: Git Diff, Revert, And Recovery

Use when:

- Git recovery scored `0` or `1`.
- The learner cannot safely inspect or back out an agent change.

Assignment:

In a throwaway repo or branch, make a small bad edit, inspect the diff, create a repair commit or
manual reversal, and explain why destructive reset was not needed.

Required evidence artifact:

- `LAB-03-GIT-RECOVERY.md`
- command transcript or screenshots
- before/after diff snippets

Pass condition:

The learner can create a branch, inspect changed files, identify the bad edit, and recover without
losing unrelated work.

## Lab 4: Agent Plan And Review Workflow

Use when:

- Agent plan/review workflow scored `0` or `1`.
- The learner accepts agent output without a review gate.

Assignment:

Ask a coding agent for a plan before implementation on a tiny Unity-safe task, such as adding a
debug log or improving naming in a throwaway script. Review the plan, reject or modify one part,
then verify the final diff.

Required evidence artifact:

- `LAB-04-AGENT-PLAN-REVIEW.md`
- original prompt
- agent plan
- review notes
- final diff or screenshot
- verification result

Pass condition:

The learner demonstrates `Plan -> Execute -> Verify` and can name what they accepted, rejected, and
verified.

## Lab 5: Unity Build Troubleshooting

Use when:

- Unity build troubleshooting scored `0` or `1`.
- The learner cannot produce or reason about a Windows build attempt.

Assignment:

Run Play Mode, inspect Console output, attempt a Windows build, and document the build result. If
the build fails, isolate one error or warning and write the next troubleshooting action.

Required evidence artifact:

- `LAB-05-BUILD-TROUBLESHOOTING.md`
- Console screenshot or log excerpt
- build output path or failure log
- explanation of one warning/error

Pass condition:

The learner can distinguish Play Mode issues from build issues and produce concrete next steps from
the log instead of re-prompting blindly.

## Lab 6: Prefab And Scene Basics

Use when:

- Unity editor basics scored low because prefab/scene reasoning was weak.
- The learner cannot explain what scene or prefab changes an agent should avoid.

Assignment:

Create one prefab from a scene object, place two instances in a scene, change the prefab asset, and
document how the instances update. Then make one scene-only override and identify it.

Required evidence artifact:

- `LAB-06-PREFAB-SCENE-BASICS.md`
- screenshots of prefab asset, instances, and override state
- short explanation of prefab asset vs scene instance

Pass condition:

The learner can explain prefab asset, prefab instance, scene object, override, and why blind agent
scene edits are risky.

## Retake Rule

The bridge ends with a full retake of [`PREFLIGHT-GATE.md`](PREFLIGHT-GATE.md).

Rules:

- Retake artifacts must be fresh, not copied from bridge lab submissions.
- A learner must meet `studio-ready` placement to enter Module 1.
- A learner who remains `bridge-required` after one bridge cycle gets a human review before any
  second attempt.
- A learner who remains `not-ready` after the bridge routes out of Course 3 for now.

