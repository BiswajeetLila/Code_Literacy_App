# Module 1: Solo Studio Operating System

## Status

complete

## Policy Links

- Master spec: [`../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`](../../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md)
- Normalization: [`../NORMALIZATION.md`](../NORMALIZATION.md)
- Teachable-unit schema: [`../schemas/teachable-unit-schema.md`](../schemas/teachable-unit-schema.md)
- Agent roles template: [`../templates/AGENT-ROLES.md`](../templates/AGENT-ROLES.md)
- Unity repo-rules sample: [`../samples/UNITY-AGENTS-CLAUDE-SAMPLE.md`](../samples/UNITY-AGENTS-CLAUDE-SAMPLE.md)

## Objective

Stand up an agent-safe Unity production environment where a fresh agent can inspect the repo,
understand the rules, make a small Unity change through a plan-review-verify loop, and avoid
dangerous project mutations without explicit approval.

By the end of this module, the learner has a Unity 6.3 LTS URP project, git hygiene, Unity-specific
agent instructions, filled agent roles, an approval policy, and a documented decision about whether
Unity MCP/editor automation is safe for narrow use or cut from the production workflow.

## Time Budget And Cut Triggers

Default budget: `8-12 hours`.

Suggested split:

| Work block | Target |
|---|---:|
| Unity project creation and sanity build | 1.5-2.5h |
| Git setup and source-control hygiene | 1-1.5h |
| Adapted `AGENTS.md` / `CLAUDE.md` | 1.5-2h |
| Filled `AGENT-ROLES.md` | 1-1.5h |
| Approval policy and destructive-operation rules | 1-1.5h |
| MCP/editor automation throwaway safety test | 1-2h |
| Fresh-agent gate and fixes | 1-1.5h |

Cut triggers:

- If the Unity project cannot open cleanly within 2 hours, stop adding tools and fix install/import
  basics.
- If git is not clean and understandable by hour 4, stop Unity work and fix source-control hygiene.
- If `AGENTS.md` / `CLAUDE.md` is still generic by hour 6, cut optional editor automation and write
  the repo rules first.
- If MCP/editor automation cannot make a safe, reviewable change on a throwaway test scene within
  2 hours, cut it from production and allow read-only inspection only.
- If the fresh-agent gate fails twice, do not proceed to Module 2. Repair the repo rules and
  approval policy.

## Learner Assignment

You are building the operating system for a one-person Unity studio that will use agents aggressively
but safely. Do this work in a fresh or course-specific Unity repo, not inside a production game you
cannot afford to break.

### Inputs

Use only these inputs:

- This module file.
- The master spec linked above.
- [`AGENT-ROLES.md`](../templates/AGENT-ROLES.md).
- [`UNITY-AGENTS-CLAUDE-SAMPLE.md`](../samples/UNITY-AGENTS-CLAUDE-SAMPLE.md).
- Your installed Unity 6.3 LTS editor.
- Your chosen coding agent.

### Step 1: Create The Unity Project

Create a Unity 6.3 LTS project using URP unless you have a written reason not to.

Minimum setup:

- Project opens with no blocking import errors.
- A simple scene enters Play Mode.
- A Windows x64 build can be produced or a build failure is documented with reproduction steps.
- Project folders follow normal Unity conventions: `Assets/`, `Packages/`, `ProjectSettings/`.

Do not install extra packages yet unless Unity requires them for the URP template.

### Step 2: Set Up Git Hygiene

Initialize or verify git.

Required rules:

- Use a Unity `.gitignore` that excludes generated/cache folders such as `Library/`, `Temp/`,
  `Obj/`, `Build/`, `Builds/`, `Logs/`, and user-specific files.
- Track `Assets/`, `Packages/`, `ProjectSettings/`, and course docs.
- Keep a clean baseline commit before agent-driven changes.
- Use branches or worktrees for agent tasks once production work begins.
- Agents must inspect diffs before claiming completion.

Evidence:

- Screenshot or text output showing clean git status after baseline setup.
- A short note explaining which Unity folders are tracked and which are ignored.

### Step 3: Adapt The Unity Repo Rules

Create `AGENTS.md` and/or `CLAUDE.md` in the Unity repo root. Start from
[`UNITY-AGENTS-CLAUDE-SAMPLE.md`](../samples/UNITY-AGENTS-CLAUDE-SAMPLE.md), but adapt it to the
actual project.

The rules must cover:

- Unity version and render pipeline.
- Source-of-truth docs and templates.
- What agents may edit without approval.
- What agents must ask before editing.
- Package-install approval.
- MCP/editor-automation approval.
- Generated-asset rules.
- Destructive Unity operation rules.
- Scene, prefab, input, camera, build-profile, and project-setting boundaries.
- Required verification before completion.
- The current Module 1 gate.

The file must be specific enough that a cold agent can answer:

```text
What change can you safely make next, what files may you touch, what must you verify, and what
requires explicit approval?
```

### Step 4: Fill Agent Roles

Copy [`AGENT-ROLES.md`](../templates/AGENT-ROLES.md) into the Unity repo's project docs or fill it
in place if this is a docs-only rehearsal.

Define at minimum:

- Director.
- Producer.
- Gameplay engineer.
- Tools engineer.
- Technical artist.
- QA lead.
- Build engineer.
- Reviewer.

Each role must name:

- Responsibilities.
- Guardrails.
- Allowed actions.
- Ask-first actions.
- Evidence required before claiming done.
- Human decision boundaries.

### Step 5: Write The Approval Policy

Create `APPROVAL-POLICY.md` or a clearly named section inside `AGENTS.md` / `CLAUDE.md`.

The policy must make these approval rules binary:

| Action | Default |
|---|---|
| Install Unity package | Ask first |
| Install external tool or MCP server | Ask first |
| Run editor automation that writes scenes/assets/settings | Ask first |
| Generate asset for player-facing use | Ask first and log provenance |
| Import third-party asset | Ask first and log license/commercial-use status |
| Delete, rename, or move scenes/prefabs/assets | Ask first |
| Change input/camera/project settings | Ask first unless a current approved task says so |
| Edit generated/cache folders | Never |
| Make a small script/doc change inside approved scope | Allowed, then verify |

### Step 6: Run A Throwaway MCP/Editor-Automation Safety Test

Create a throwaway scene or test project area such as `Assets/_Module01SafetyTest/`.

If you use Unity MCP/editor automation, test only a narrow, reversible operation. Examples:

- Read scene hierarchy.
- Create a temporary cube in a throwaway scene.
- Add a simple component to the temporary object.
- Save the scene.
- Inspect the git diff.
- Revert or keep only if the diff is understood.

Do not test automation on production scenes or prefabs.

If MCP/editor automation is unavailable, unstable, too opaque, or cannot produce a reviewable diff,
write this decision:

```text
MCP/editor automation status: cut from production writes for now.
Allowed use: read-only inspection only, or none.
Reason:
Retest condition:
```

### Step 7: Run The Fresh-Agent Gate

Start a fresh agent session with no chat history. Give it only the Unity repo and ask:

```text
Read the repo rules. Explain the safest next Unity change you could make, which files you would
touch, what you must ask approval for, and how you would verify the change.
```

Pass only if the fresh agent:

- Finds `AGENTS.md` / `CLAUDE.md`.
- Names a safe small change.
- Identifies package installs, MCP/editor writes, generated assets, destructive operations, and
  project-setting changes as approval-required.
- Refuses to edit generated/cache folders.
- Explains a verify path: Play Mode, Console, diff review, test scene, or build check as applicable.
- Does not invent permission to edit production scenes blindly.

## Required Artifacts

Submit these artifacts:

| Artifact | Required evidence |
|---|---|
| Unity project baseline | Unity version, URP decision, Play Mode sanity result, and Windows build result or documented build blocker |
| Unity `.gitignore` | File or diff showing Unity generated/cache folders are ignored |
| Clean baseline commit | Commit hash or git log/status evidence |
| Adapted `AGENTS.md` and/or `CLAUDE.md` | Repo-root file adapted from the Unity sample, not copied verbatim |
| Filled `AGENT-ROLES.md` | All eight required roles filled with responsibilities and guardrails |
| Approval policy | `APPROVAL-POLICY.md` or explicit section in repo rules covering package installs, MCP/editor automation, generated assets, destructive operations, and cache-folder edits |
| MCP/editor automation safety-test result | Written result: validated for narrow throwaway-scene use, read-only only, or explicitly cut |
| Throwaway safety-test evidence | Scene path, diff summary, screenshot, log, or note explaining why no write test was run |
| Fresh-agent gate transcript | The fresh agent's answer plus human pass/fail note |
| Module 1 review note | Short defense of what agents may do safely in Module 2 |

## Review Prompts

Reviewers answer these as binary checks:

- Does the Unity project declare Unity 6.3 LTS and URP, or document a specific exception?
- Does the submitted `.gitignore` exclude Unity generated/cache folders?
- Does git status evidence show a clean or intentionally documented baseline?
- Does `AGENTS.md` / `CLAUDE.md` contain Unity-specific rules, not generic agent advice?
- Does the repo policy require approval before package installs?
- Does the repo policy require approval before MCP/editor automation writes scenes, assets, or
  project settings?
- Does the repo policy require provenance and approval before generated or third-party assets are
  used in player-facing content?
- Does the repo policy forbid editing generated/cache folders?
- Does filled `AGENT-ROLES.md` include director, producer, gameplay engineer, tools engineer,
  technical artist, QA lead, build engineer, and reviewer?
- Does each role include responsibilities and guardrails?
- Is MCP/editor automation either validated on a throwaway scene or explicitly cut from production
  writes?
- Does the fresh-agent transcript identify what requires explicit approval before acting?
- Can the fresh agent explain a safe Unity change and a verification path without additional chat
  context?

## Common Failure Modes

- Missing Unity `.gitignore`, causing `Library/`, `Temp/`, or other generated folders to appear in
  diffs.
- Agent policy is generic and does not mention Unity scenes, prefabs, packages, project settings,
  generated/cache folders, Play Mode, Console, or build verification.
- MCP/editor automation is neither validated on a throwaway scene nor explicitly cut.
- Approval policy is not documented or is scattered across chat history instead of repo files.
- `AGENTS.md` / `CLAUDE.md` is copied from the sample without adapting project name, Unity version,
  allowed paths, or approval rules.
- Agent roles are vague, such as "AI helps with code", instead of role-specific responsibilities and
  guardrails.
- Fresh-agent gate uses the same chat session that wrote the files, so it does not test cold
  handoff.
- Automation writes to production scenes before its diff behavior is understood.
- The repo allows package installation without version, reason, rollback, and human approval.
- The learner proceeds to Module 2 even though a fresh agent cannot explain safe workflow.

## Pass/Fail Rubric

Pass if all of these are true:

- The Unity project can be opened and inspected, with Play Mode/build status documented.
- Git ignores Unity generated/cache files and has a clean baseline.
- `AGENTS.md` / `CLAUDE.md` is Unity-specific and adapted to the learner project.
- `AGENT-ROLES.md` defines all eight required roles with responsibilities and guardrails.
- The approval policy clearly marks package installs, MCP/editor writes, generated assets,
  third-party imports, destructive operations, project-setting changes, and cache-folder edits.
- MCP/editor automation is validated for tightly scoped throwaway-scene use or explicitly cut from
  production writes.
- A fresh agent can read the repo rules and correctly explain how to make a safe Unity change.

Fail if any of these are true:

- Unity generated/cache files are tracked without a deliberate exception.
- The agent policy does not mention Unity-specific risks.
- Package installs or editor-automation writes are allowed without explicit approval.
- Generated or third-party assets can enter the project without provenance/commercial-use tracking.
- MCP/editor automation status is unknown.
- Roles are missing or do not define guardrails.
- The fresh-agent gate is missing, failed, or performed in a non-fresh session.
- The submission relies on chat memory instead of repo artifacts.

## Strong Vs Weak Examples

Strong submission:

```text
Project: Signal Knife Unity prototype
Unity: 6.3 LTS, URP
Git: clean baseline commit 9a14c2e; Library/Temp/Obj/Builds/Logs ignored
Repo rules: AGENTS.md names allowed paths, ask-first operations, verification, and Module 1 gate
Roles: AGENT-ROLES.md defines eight roles with guardrails and evidence requirements
Automation: Unity MCP write test created one cube in Assets/_Module01SafetyTest/McpSmoke.unity;
diff was inspected; production writes still require approval
Fresh-agent result: pass. Agent named a safe doc-only change, refused package install without
approval, refused generated/cache edits, and proposed Play Mode + Console + git diff verification.
```

Weak submission:

```text
Project made in Unity.
AI can help with scripts and assets.
We will use MCP later.
Git is set up.
Roles: coder, artist, tester.
Fresh-agent result: not run.
```

Why the weak submission fails:

- It does not prove Unity version, URP decision, Play Mode, build status, or git hygiene.
- It does not document Unity-specific approval rules.
- It does not validate or cut MCP/editor automation.
- It does not use the required role set.
- It does not test whether a fresh agent can continue safely.

Gate-boundary example:

```text
MCP/editor automation failed to connect. I cut production writes for now, allowed no MCP actions in
AGENTS.md, and wrote a retest condition: retry only in Module 7 with a throwaway scene and diff
inspection. Fresh agent correctly says it may not use MCP.
```

This passes because the risky tool is explicitly cut and the fresh agent understands the boundary.

## Next Module Handoff

Carry these forward to Module 2:

- Adapted `AGENTS.md` / `CLAUDE.md`.
- Filled `AGENT-ROLES.md`.
- Approval policy.
- MCP/editor automation status: validated narrow use, read-only only, or cut.
- Clean git baseline.
- Unity project version/render-pipeline note.
- Fresh-agent gate transcript.

Module 2 uses these artifacts to write `GAME-THESIS.md`, `VERTICAL-SLICE-SPEC.md`, and `CUT-PLAN.md`
without letting agents invent scope, install packages, import assets, or mutate Unity scenes outside
the approved workflow.
