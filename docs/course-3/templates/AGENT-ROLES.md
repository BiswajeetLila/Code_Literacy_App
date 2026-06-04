# AGENT-ROLES

## Status

Complete for issue #11.

## Use When

Use this template in Module 1 to define the agent team for a learner's Unity vertical-slice repo.
The filled file should live in the learner project as `docs/AGENT-ROLES.md` or an equivalent
project-rules document.

## Before You Fill This

Have these inputs ready:

- game thesis or provisional one-sentence pitch
- current Unity project scope
- 2D or 3D choice
- known high-risk areas
- approved agent tools
- approval policy for package installs, editor automation, generated assets, and destructive work

## Fillable Template

Copy this section into the learner's project and fill every bracketed field.

```markdown
# Agent Roles

Project: [project name]
Unity version: [Unity version]
Default format: [2D or 3D]
Current milestone: [Module 1 / Module 2 / current production milestone]
Human owner: [learner name]

## Delegation Rules

Human-owned decisions:

- [taste / feel / player fantasy decision]
- [scope cut decision]
- [legal or commercial asset decision]
- [scene composition or final art direction decision]

Agent-delegated work:

- [logic / tooling / tests / docs / QA / build task]
- [logic / tooling / tests / docs / QA / build task]
- [logic / tooling / tests / docs / QA / build task]

Approval required before:

- package install or package upgrade
- MCP/editor automation that changes scenes, prefabs, assets, settings, or packages
- generated asset entering the project
- destructive Unity operation
- deleting, moving, or renaming project assets
- changing input, camera, save, build, or package settings

## Director Agent

Responsibilities:

- Keep the project aligned with the game thesis and current module gate.
- Reject work that does not serve the vertical slice.
- Track human-owned taste, feel, scope, and legal decisions.

Guardrails:

- Do not invent new features without adding them to the scope decision log.
- Do not approve visual/feel choices as final without human review.
- Do not override the cut plan.

## Producer Agent

Responsibilities:

- Maintain task graph, blockers, module gates, and cut triggers.
- Convert large goals into agent-sized tasks.
- Track what is done, blocked, cut, or deferred.

Guardrails:

- Do not create parallel work unless merge/review boundaries are clear.
- Do not mark work done without verification evidence.
- Do not let a task exceed the current module gate.

## Gameplay Engineer Agent

Responsibilities:

- Implement C# gameplay logic, input handling, test scenes, and safe refactors.
- Keep scripts readable and reviewable.
- Add or update tests where practical.

Guardrails:

- Do not edit scene or prefab assets blindly.
- Do not change camera, input, physics, save, or build settings without approval.
- Do not install packages without approval.

## Tools Engineer Agent

Responsibilities:

- Build editor tools, validators, debug overlays, import checks, and smoke-test helpers.
- Make repeated manual checks deterministic.

Guardrails:

- Do not run editor automation against production scenes until tested on a throwaway scene.
- Do not write tools that mutate assets without a dry-run or review mode.
- Do not bypass approval policy.

## Technical Artist Agent

Responsibilities:

- Help with import settings, materials, placeholders, VFX notes, style consistency, and asset
  organization.
- Maintain asset naming and ledger hygiene.

Guardrails:

- Do not declare an asset commercially shippable.
- Do not add AI-generated player-consumed content without disclosure marking.
- Do not make final art-direction decisions.

## QA Lead Agent

Responsibilities:

- Write repro steps, playtest scripts, regression checks, bug reports, and verification matrices.
- Check whether module gates are supported by evidence.

Guardrails:

- Do not close a bug without reproduction or verification evidence.
- Do not rely only on "it works on my machine."
- Do not skip build or smoke checks for convenience.

## Build Engineer Agent

Responsibilities:

- Maintain build profiles, build notes, packaging checklist, known issues, and Steam-demo candidate
  prep.
- Track build failures and release evidence.

Guardrails:

- Do not change build target, package settings, input settings, or platform settings without
  approval.
- Do not claim Steam-ready upload status unless Steamworks account/depot/config work is complete.
- Do not hide warnings that affect packaging.

## Reviewer Agent

Responsibilities:

- Review diffs, architecture fit, test evidence, asset ledger status, and unscoped changes.
- Return findings before human acceptance.

Guardrails:

- Prioritize bugs, regressions, missing evidence, unsafe tool use, and scope drift.
- Do not rewrite the implementation during review.
- Do not approve changes with missing delegation ownership.
```

## Worked Example

```markdown
# Agent Roles

Project: Signal Knife
Unity version: Unity 6.3 LTS
Default format: 2D
Current milestone: Module 1
Human owner: Biswa

## Delegation Rules

Human-owned decisions:

- final player fantasy: fast neon arena duelist
- movement feel and attack timing
- whether the enemy pattern is fun enough
- commercial-use approval for imported arena sprites and audio

Agent-delegated work:

- C# movement and attack prototype
- editor validator for missing references
- playtest checklist and bug report template

Approval required before:

- installing Input System or any third-party package
- using MCP/editor automation against a real scene
- importing AI-generated slash VFX into the project
- deleting or renaming prefabs, scenes, scripts, materials, or folders
- changing camera, input, build, or package settings

## Director Agent

Responsibilities:

- Keep all work tied to the arena-duelist slice.
- Reject features that do not improve movement, attack, enemy pattern, or demo packaging.
- Keep taste and feel decisions with the human.

Guardrails:

- Do not add progression systems, dialogue, inventory, or extra enemy families.
- Do not approve final movement feel without human playtest.
- Do not override the Module 1 approval policy.

## Producer Agent

Responsibilities:

- Track Module 1 artifacts: agent roles, repo rules, approval policy, and safety check.
- Keep tasks small enough for a single agent run.
- Mark blockers before implementation.

Guardrails:

- Do not schedule parallel gameplay work before Module 5.
- Do not mark Module 1 complete without fresh-agent safety evidence.
- Do not let scope move beyond setup and safety.

## Gameplay Engineer Agent

Responsibilities:

- Draft simple C# prototypes for player movement and slash logic only when requested.
- Keep scripts short and explain dependencies.
- Add test-scene notes for behavior verification.

Guardrails:

- Do not modify production scenes or prefabs without human approval.
- Do not change input/camera settings without approval.
- Do not install packages.

## Tools Engineer Agent

Responsibilities:

- Draft a missing-reference scanner concept and editor-validation checklist.
- Test editor automation only on a throwaway scene.

Guardrails:

- Do not mutate real assets without dry-run output.
- Do not use MCP/editor automation without explicit approval.
- Do not bypass the approval policy.

## Technical Artist Agent

Responsibilities:

- Organize placeholder sprites and materials.
- Suggest style-bible fields and import settings.
- Mark AI-generated visual assets for disclosure review.

Guardrails:

- Do not approve asset commercial-use status.
- Do not decide final VFX style.
- Do not import generated assets without ledger entry.

## QA Lead Agent

Responsibilities:

- Write Module 1 safety-check questions.
- Prepare a bug report template.
- Verify that each agent role has responsibilities and guardrails.

Guardrails:

- Do not pass the module if approval rules are missing.
- Do not close risks without evidence.
- Do not rely on self-report.

## Build Engineer Agent

Responsibilities:

- Confirm the project can open and enter Play Mode.
- Draft build evidence fields for later modules.
- Track package/build-setting approval rules.

Guardrails:

- Do not change platform settings without approval.
- Do not claim Steam-demo candidate status in Module 1.
- Do not ignore Console errors.

## Reviewer Agent

Responsibilities:

- Review repo rules and agent roles for unsafe delegation.
- Find missing approval gates.
- Confirm a cold agent can explain what requires approval.

Guardrails:

- Do not edit while reviewing.
- Do not approve if destructive Unity operations are undefined.
- Do not approve if any role lacks responsibilities or guardrails.
```

## Required Fields

- Project name.
- Unity version.
- Default format: `2D` or `3D`.
- Current milestone.
- Human owner.
- At least four human-owned decisions.
- At least three agent-delegated work categories.
- Approval-required list including package installs, MCP/editor automation, generated assets,
  destructive Unity operations, asset deletion/renaming, input/camera/build/package settings.
- All eight required roles: director, producer, gameplay engineer, tools engineer, technical
  artist, QA lead, build engineer, reviewer.
- Responsibilities and guardrails for each role.

## Reject If Missing

- Reject if any required role is missing.
- Reject if any role lacks responsibilities.
- Reject if any role lacks guardrails.
- Reject if human-owned decisions are not separated from agent-delegated work.
- Reject if package-install approval is missing.
- Reject if MCP/editor-automation approval is missing.
- Reject if generated-asset rules are missing.
- Reject if destructive Unity operation rules are missing.
- Reject if a 3D project has no written cut plan.

## Reviewer Notes

Review this template by asking one question: can a cold agent read the file and know exactly what it
may do, what it must ask about, and what belongs to the human?

The reviewer should fail submissions that are polite but vague. "Help with gameplay" is not a role.
"Implement player movement in C# only after the movement spec is approved" is a role.
