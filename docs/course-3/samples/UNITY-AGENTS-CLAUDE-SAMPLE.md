# UNITY-AGENTS-CLAUDE-SAMPLE

## Status

Complete for issue #11.

## Use When

Use this sample in Module 1 to create a learner project's Unity repo-rules file. It can be adapted
into `AGENTS.md`, `CLAUDE.md`, or both.

This is a sample policy artifact, not a file to copy verbatim. Replace every bracketed field before
using it in a Unity project.

## Before You Fill This

Have these inputs ready:

- Unity version.
- Render pipeline.
- 2D or 3D decision.
- approved packages.
- approved editor automation tools, if any.
- generated asset policy.
- destructive-operation policy.
- project folder conventions.
- current module gate.

## Fillable Template

```markdown
# Unity Agent Rules

Project: [project name]
Unity version: [Unity version]
Render pipeline: [URP / Built-in / HDRP]
Project format: [2D / 3D]
Current module gate: [current gate]
Human owner: [name]

## Source Of Truth

- Course policy: [path to course policy doc]
- Project spec: [path to VERTICAL-SLICE-SPEC.md or current spec]
- Agent roles: [path to AGENT-ROLES.md]
- Approval policy: this file

If these sources conflict, ask the human before acting.

## Allowed Without Approval

- Read project files.
- Read Unity package manifests.
- Inspect scripts and documentation.
- Propose plans.
- Write or edit markdown docs.
- Draft C# changes for review.
- Run non-destructive checks approved by the human.

## Package-Install Approval Rules

Explicit human approval is required before:

- installing a new Unity package
- upgrading or removing a Unity package
- changing `Packages/manifest.json`
- adding Asset Store, Git URL, scoped registry, or local package dependencies
- changing render pipeline, input package, test framework, build tooling, or MCP/editor tooling

When requesting approval, include:

- package name and version
- source URL or registry
- why the package is needed
- risk if rejected
- rollback plan

## MCP And Editor-Automation Approval Rules

MCP/editor automation is off by default.

Explicit human approval is required before automation:

- changes scenes
- changes prefabs
- changes project settings
- changes package settings
- imports, deletes, renames, or moves assets
- runs code generation
- changes build settings

Automation must first run against a throwaway scene or test asset unless the human explicitly says
otherwise. Prefer dry-run, read-only, or report-only modes.

## Generated-Asset Rules

Generated assets may not enter production folders until the asset ledger is updated.

Every generated asset needs:

- source tool or generator
- prompt or generation notes where practical
- AI-generated: yes
- player-consumed: yes/no
- commercial-use status
- Steam AI disclosure required: yes/no
- replacement plan

Do not claim generated assets are legally shippable. The human decides commercial and disclosure
status.

## Destructive Unity Operation Rules

Explicit human approval is required before:

- deleting files or folders
- moving or renaming assets
- changing GUID-sensitive assets
- changing scenes, prefabs, materials, animation controllers, input settings, project settings, or
  build settings
- overwriting generated files
- running cleanup tools
- applying broad auto-fixes

Before any destructive operation, provide:

- exact paths affected
- why the operation is needed
- backup or rollback plan
- expected diff

## Coding Rules

- Keep C# scripts readable and small.
- Prefer explicit serialized fields over hidden scene lookups.
- Avoid changing scene wiring unless the task explicitly requires it.
- Add comments only where behavior is non-obvious.
- Do not hide Console errors.
- Do not mark work done without verification evidence.

## Verification Rules

Before saying a task is complete, report:

- changed files
- tests or checks run
- Unity Play Mode/build status, if relevant
- known risks
- next verification step

## Ask First If

- the task touches package installs
- the task touches MCP/editor automation
- the task touches generated assets
- the task touches destructive Unity operations
- the task touches input, camera, save, build, package, scene, or prefab settings
- the task changes the current scope or cut plan
```

## Worked Example

```markdown
# Unity Agent Rules

Project: Signal Knife
Unity version: Unity 6.3 LTS
Render pipeline: URP
Project format: 2D
Current module gate: Module 1 - Solo Studio Operating System
Human owner: Biswa

## Source Of Truth

- Course policy: docs/COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md
- Project spec: docs/VERTICAL-SLICE-SPEC.md
- Agent roles: docs/AGENT-ROLES.md
- Approval policy: this file

If these sources conflict, ask the human before acting.

## Allowed Without Approval

- Read project files.
- Inspect C# scripts.
- Draft markdown docs.
- Propose C# changes.
- Run approved read-only checks.

## Package-Install Approval Rules

Explicit human approval is required before changing `Packages/manifest.json`, installing Input
System, installing a Unity MCP package, adding Asset Store packages, or changing URP packages.

Approval request must name package, version, source, reason, risk, and rollback plan.

## MCP And Editor-Automation Approval Rules

MCP/editor automation is allowed only on `Assets/_Throwaway/McpSafetyScene.unity` until validated.
Any scene, prefab, asset, package, project setting, or build-setting mutation requires explicit
human approval.

## Generated-Asset Rules

Generated slash VFX, icons, textures, and placeholder audio must be logged in
`docs/ASSET-LEDGER.md` before entering `Assets/Art/` or `Assets/Audio/`. The human decides
commercial-use and Steam disclosure status.

## Destructive Unity Operation Rules

Never delete, move, rename, or overwrite Unity assets without approval. Never change prefabs,
scenes, input settings, camera settings, build settings, package settings, or project settings
without approval.

## Coding Rules

- Keep C# scripts short.
- Avoid hidden scene lookups.
- Do not change scene wiring unless explicitly requested.
- Do not mark work done without verification evidence.

## Verification Rules

Report changed files, checks run, Play Mode/build status if relevant, known risks, and next
verification step.

## Ask First If

Ask first for packages, MCP/editor automation, generated assets, destructive operations, input,
camera, save, build, package, scene, prefab, scope, or cut-plan changes.
```

## Required Fields

- Project name.
- Unity version.
- Render pipeline.
- Project format.
- Current module gate.
- Human owner.
- Source-of-truth paths.
- Package-install approval rules.
- MCP/editor-automation approval rules.
- Generated-asset rules.
- Destructive Unity operation rules.
- Verification rules.
- Ask-first list.

## Reject If Missing

- Reject if package-install approval is absent.
- Reject if MCP/editor-automation approval is absent.
- Reject if generated-asset rules are absent.
- Reject if destructive Unity operation rules are absent.
- Reject if customization fields remain bracketed.
- Reject if a cold agent cannot list what requires explicit approval before acting.

## Reviewer Notes

After the learner fills this sample, ask a cold agent to read only the resulting file and answer:

```text
What actions require explicit approval before you perform them in this Unity project?
```

The answer must include package installs, MCP/editor automation, generated assets, destructive Unity
operations, and changes to input/camera/build/package/scene/prefab settings.

