---
tags: [status/draft, meta, build-spec, course-2]
aliases: [Worldclass Agentic Builder, Course 2 Spec]
---

# Course 2: Worldclass Agentic Builder

## Summary

Course 2 is the advanced sequel to Course 1. It teaches a learner to act as the
technical director of AI labor: turning fuzzy ideas into shipped apps,
automations, simulations, and hybrid artifacts through specs, delegated agent
work, tool integrations, verification gates, and production discipline while
writing little code by hand.

This document is the standalone implementation spec. It supersedes the earlier
Course 2 revision memo and is designed so a fresh coding agent or course author
can build from it without reading the handoff or CEO review.

Core promise:

**By the end, the learner can run a frontier agentic engineering workflow:
discover, spec, delegate, integrate, verify, ship, and maintain a real artifact
that would normally require a small team.**

This is not a beginner prompting course. Course 1 already teaches code literacy,
diff review, debugging, and spec-driven steering. Course 2 assumes that base and
raises the standard to agentic production direction.

## Source Of Truth And Fit

Course 2 must fit the locked system already established by this repo:

- `docs/CONTENT-GUIDE.md`: interaction-first teaching, one plain picture per
  concept, picture -> real artifact, prose only supports the action.
- `docs/INTERACTIVE-COURSE-BUILDER.md`: portable lesson loop of picture,
  action, feedback, prediction, real artifact, vocabulary.
- `docs/adr/0001-interactive-lab-design-standard.md`: manual shell plus
  instrument labs, accessibility mandatory, 3D only when it teaches.
- `docs/COURSE-1-CODE-LITERACY-FINAL.md`: each app week uses the
  `WeekData { meta, lessons[], cards[], resources[], glossaryTerms[] }`
  content model, widget ids, SRS cards, done checklist, and verification gate.
- `docs/COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md`: Course 3 is the deep Unity
  production specialization. Course 2 must teach broad agentic engineering, not
  game-engine production.

## Locked Product Decisions

- **Delivery model:** Course 2 is both a guided real-project apprenticeship and
  an interactive companion inside the existing app.
- **Companion role:** the app teaches concepts through run-log drills,
  spec-building labs, task-graph instruments, verification simulators, review
  exercises, SRS, and module gates. It does not replace the learner's real
  project work.
- **Project role:** the learner maintains a real repo and ships a real artifact.
  The project produces specs, diffs, tests, logs, screenshots, deploy evidence,
  reviews, and postmortems.
- **Audience:** graduates of Course 1 or equivalent learners who can read a
  diff, run a project, debug from an error, and steer an AI with a concrete
  spec.
- **Cadence:** 10 modules plus preflight and capstone defense.
- **Course loop:** `Discover -> Spec -> Delegate -> Integrate -> Verify -> Ship -> Maintain`.
- **Tool stance:** teach durable primitives first, then map them to current
  tool surfaces in a refreshable appendix.
- **Scope boundary:** Course 2 may include creative prototypes, browser-native
  game-like demos, generated media, and simulations. It does not teach Unity,
  Godot, Blender, or game-engine production depth; that belongs to Course 3.

## Target Learner Profile

The learner can already:

- Open a repo, identify the entry point, and explain the main layers.
- Run install/build/test commands after reading project instructions.
- Read a small diff and reject a risky AI change.
- Read a stack trace or browser console error and identify the likely layer.
- Use git branches, commits, and basic rollback.
- Write a six-part spec: outcome, scope, constraints, prior decisions, task
  breakdown, and verification.
- Use at least one coding agent in plan/review mode.

The learner does not need to be a professional programmer. They do need enough
Course 1 literacy to direct agents without accepting unread code.

## Preflight Gate

Before Module 1, every learner must pass this gate or complete the bridge pack.

Preflight task:

Ship a tiny artifact from a spec in one weekend or less. Acceptable artifacts:

- A two-screen app with one external dependency and one persisted state.
- A script or automation that reads input, calls one API or file source, and
  produces useful output.
- A small interactive simulation with parameters and visible output.

Required evidence:

- `EXECUTABLE-SPEC.md` with outcome, scope, constraints, task breakdown, and
  verification.
- A repo with git history and at least one reviewed agent diff.
- A passing build or run command.
- A failure log showing one bug that was reproduced and fixed.
- A short handoff explaining how a fresh agent could continue.

Pass condition:

A reviewer can run the artifact, inspect one diff, and verify that the learner
understands what the agent changed and how it was checked.

### Bridge Pack

Learners who fail preflight do not enter the main course at a lower standard.
They complete a bridge pack:

- Course 1 Week 08 review drill: approve/reject AI diffs.
- Course 1 Week 11 spec drill: turn a vague idea into a six-part spec.
- Git recovery drill: create branch, inspect diff, revert one bad change.
- Agent steering drill: run plan mode, request a smaller patch, verify output.
- Mini-ship drill: deploy or package a tiny artifact and write a handoff.

## Course Architecture

Use a real-project studio format with an app companion.

Each module ships three kinds of output:

- **Companion app completion:** interactive lab actions, SRS cards, and module
  checklist.
- **Project artifact:** files, specs, diffs, tests, logs, screenshots, CI runs,
  deployments, or postmortems.
- **Review evidence:** run log, verification matrix, human decision notes, and
  fresh-agent continuity proof.

The app keeps the Course 1 interaction standard, but the "real artifact" is no
longer just 4-6 code lines. It may be a spec excerpt, task graph, agent prompt,
diff hunk, CI log, MCP tool manifest, browser screenshot, deploy checklist, or
postmortem. The same builder loop still applies:

1. Plain picture.
2. Learner action.
3. Immediate feedback.
4. Prediction before reveal.
5. Real artifact bridge.
6. Durable vocabulary.

## Companion App Contract

Course 2 modules should fit the existing content spine unless an explicit app
architecture change is approved.

- Each module maps to one `weekNN.ts` style data object using
  `WeekData { meta, lessons[], cards[], resources[], glossaryTerms[] }`.
- Use "module" in user-facing Course 2 text, but preserve the underlying week
  data contract for implementation.
- Each module has:
  - `00 Start`: what the module teaches and what real-world action the learner
    will perform.
  - 2-3 interactive lessons using widgets registered by id.
  - One `Field Assignment` tab that points the learner to their real repo.
  - One `Review Gate` tab that grades the evidence the learner must bring back.
  - FAQ, resources, glossary terms, and SRS cards.
- Widgets should favor dense instruments: spec comparators, task graph boards,
  run-log timelines, verification matrices, review queues, tool risk panels,
  browser screenshot checkers, and incident boards.
- 3D is optional and rare. Use it only for context flow, task dependency
  routing, or system ownership when 2D cannot teach as clearly.
- Every module must pass the Course 1 accessibility gate: keyboard focus, live
  status text, reduced-motion path, readable light/dark modes, and no
  horizontal overflow at 375px.

## Scope Budget

Course 2 is broad, but it must not become every specialty at once.

Allowed by default:

- Web apps, local tools, scripts, automations, browser-native interactive
  artifacts, data dashboards, simulations, and mixed app-plus-automation work.
- Generated images, icons, audio, or copy when they support the artifact.
- One optional 3D/browser scene if it teaches or proves the artifact.
- One or two external APIs or MCP integrations per capstone unless the learner
  has a cut plan.

Disallowed by default:

- Unity, Godot, Unreal, Blender, or full 3D/game-engine production.
- Multiplayer, live service, large RPG/economy systems, or complex real-time
  game pipelines.
- Regulated medical, legal, or financial advice products unless the artifact is
  explicitly framed as an internal prototype with no real-world use.
- Production flows requiring secrets, payments, account takeover, credential
  handling, or user data beyond what the learner can safely mock.
- More than one major unknown at a time: new framework plus new deployment
  target plus new database plus new API is out of scope for Course 2.

Exception rule:

Any out-of-scope exception needs a written cut plan that says what will be
removed if schedule, verification, or agent coordination slips.

## Module Plan

### 1. Calibration: The Vibe Coder Benchmark

Objective:

Make the learner feel the difference between raw vibe coding, disciplined
single-agent work, and spec-driven multi-agent work.

Companion interaction:

A run-log comparison lab shows three attempts at the same small app. The
learner predicts which run has hidden drift, reviews diffs, and scores each run
for speed, bugs, review load, and maintainability.

Build:

- Pick a small app or automation.
- Ship it three ways:
  - Raw vibe prompt.
  - Single-agent disciplined plan -> execute -> verify.
  - Spec-driven run with at least one separate reviewer/verifier pass.
- Record time, number of prompts, diffs accepted/rejected, bugs found, and
  verification results.
- Write `CALIBRATION-REPORT.md`.

Agentic primitives:

- Baseline measurement.
- Prompt drift detection.
- Diff review as production control.
- Verification before confidence.
- Human taste and judgment as the limiting resource.

Failure modes:

- Learner optimizes for speed and ignores hidden defects.
- Agent patches symptoms without preserving the spec.
- Reviewer repeats implementor assumptions.
- Metrics are vague and cannot compare runs.

Verification gate:

The learner can explain which run was fastest, which was safest, which was
easiest to maintain, and what behavior would have escaped review without a
separate verification pass.

Assignment:

Submit the three run logs, final artifact, review notes, and a one-page
calibration report.

### 2. The Agentic Operating System

Objective:

Create the standing workflow stack that makes agent work repeatable instead of
session-by-session improvisation.

Companion interaction:

An operating-room board lets the learner place rules, approvals, model routes,
worktrees, branch policies, run logs, and review gates into the right layer.
Bad placements trigger failure scenarios.

Build:

- `AGENTIC-OS.md`: local operating rules for agent work.
- `AGENTS.md` and/or `CLAUDE.md` with repo-specific rules.
- Model and effort routing table.
- Branch/worktree strategy.
- Approval policy for installs, network, secrets, destructive actions, and
  external tools.
- Run-log format.
- Review checklist.
- Session start and handoff checklist.

Agentic primitives:

- Standing instructions.
- Approval boundaries.
- Work isolation.
- Model routing.
- Session hygiene.
- Reviewable evidence.

Failure modes:

- Rules file becomes a dumping ground and is ignored.
- Agent runs destructive commands without human approval.
- Parallel branches collide.
- No one knows what changed after compaction or handoff.

Verification gate:

A fresh agent can read the repo rules and correctly describe how to make a safe
change, what it may run without approval, what must be verified, and how to
handoff work.

Assignment:

Install the operating system in the learner's project repo and run one small
agent change under the new rules.

### 3. Spec As Control Plane

Objective:

Turn a fuzzy idea into an executable source of truth that agents can build from
and reviewers can grade against.

Companion interaction:

A vague-vs-executable spec lab shows two agent outcomes from the same idea. The
learner repairs the weak spec by adding scope, constraints, non-goals,
architecture, edge cases, screenshots, deploy target, and verification.

Build:

- `PROJECT-THESIS.md`.
- `EXECUTABLE-SPEC.md`.
- `NON-GOALS.md`.
- Edge-case list.
- UX or CLI flow sketch.
- Data shape or interface contract.
- Verification matrix.
- Fresh-agent continuation note.

Agentic primitives:

- Spec as source of truth.
- Constraints as agent control.
- Non-goals as scope defense.
- Interface contracts.
- Testable acceptance criteria.

Failure modes:

- Spec describes intent but not done.
- Scope is broad enough that every agent invents a different product.
- Constraints are hidden in chat instead of written into the project.
- Verification criteria cannot actually be checked.

Verification gate:

Another agent can produce a plan from the spec without asking what the artifact
is, what is out of scope, or how success will be measured.

Assignment:

Rewrite the learner's capstone idea into an executable spec and get a separate
reviewer agent to mark missing assumptions.

### 4. Context Engineering At Scale

Objective:

Treat context as infrastructure: intentionally shaped, versioned, compacted,
retrieved, and handed off.

Companion interaction:

A context-budget lab shows a conversation filling with logs, irrelevant files,
specs, and decisions. The learner chooses what belongs in `AGENTS.md`, ADRs,
skills, run logs, handoffs, issue comments, and the active prompt.

Build:

- `CONTEXT-MAP.md`.
- Repo map with key files, commands, and boundaries.
- ADRs for durable decisions.
- Imported-docs list with source and freshness.
- Handoff template.
- Compaction checklist.
- Context rot warning signs.

Agentic primitives:

- Context placement.
- Retrieval over dumping.
- Progressive disclosure.
- Decision records.
- Handoff continuity.
- Context freshness.

Failure modes:

- Main chat gets polluted with logs and command output.
- Important decisions live only in one vanished session.
- Fresh agents repeat solved exploration.
- Tool-specific docs rot silently.

Verification gate:

A fresh agent can answer "what is this project, what matters, what changed, and
what should I read first?" in under five minutes from the written context.

Assignment:

Refactor the learner's project context into durable docs, then start a fresh
agent and measure how accurately it reconstructs the project state.

### 5. Task Graphs And Parallel Agent Teams

Objective:

Decompose large work into independently verifiable slices and coordinate
parallel agents without creating integration debt.

Companion interaction:

A task-graph instrument lets the learner split a feature into nodes, assign
roles, mark dependencies, detect conflicts, and choose which tasks can run in
parallel. The lab penalizes write-heavy overlap.

Build:

- `TASK-GRAPH.md`.
- `AGENT-ROLES.md`.
- Slice specs for coordinator, explorer, implementor, verifier, reviewer,
  security, and docs roles.
- Worktree/branch map.
- Integration checklist.
- Conflict and rollback plan.

Agentic primitives:

- Task graph design.
- Role prompting.
- Parallel read-heavy exploration.
- Isolated write work.
- Integration sequencing.
- Human merge authority.

Failure modes:

- Parallel agents edit the same files.
- Explorer findings never reach implementors.
- Verifier checks the wrong acceptance criteria.
- Integration turns into unreviewable merge chaos.

Verification gate:

At least two independent slices are completed in parallel or quasi-parallel,
integrated into one branch, and verified without losing traceability from spec
to diff to test evidence.

Assignment:

Run a two-agent production cycle on the learner's project and produce an
integration note showing what each agent did, what conflicted, and how it was
resolved.

### 6. Verification Systems, Not Hope

Objective:

Build layered verification gates so trust comes from evidence, not agent tone.

Companion interaction:

A verification-matrix lab presents a product change and a pile of possible
checks. The learner chooses the minimum credible gate: unit, integration,
browser, visual, type/lint, package trust, smoke, golden example, fuzz/property,
security scan, or fresh-session review.

Build:

- `VERIFICATION-MATRIX.md`.
- Unit or pure-logic tests where useful.
- Integration or API tests where useful.
- Browser/UI checks for user-visible flows.
- Visual screenshot checks for layout-heavy work.
- Type/lint/build gate.
- Package trust checklist.
- Fresh-agent review prompt.
- Evidence bundle per release.

Agentic primitives:

- Test pyramid adapted to agent work.
- User-visible verification.
- Golden examples.
- CI gates.
- Visual and browser inspection.
- Independent review.

Failure modes:

- Tests assert implementation details instead of user behavior.
- Agent invents passing checks without running them.
- Visual regressions pass type checks.
- CI proves build success but not product behavior.

Verification gate:

The learner can intentionally break one core behavior and show that an
appropriate gate catches it before release.

Assignment:

Add or strengthen the project verification matrix, run the gates, and attach
evidence to the run log.

### 7. Tool-Using Agents: MCP, Hooks, Skills, Plugins

Objective:

Give agents real tools without turning every integration into an unreviewed
permission expansion.

Companion interaction:

A tool-risk switchboard asks the learner to choose between prompt instructions,
repo rules, a skill, a hook, MCP, plugin/app connector, browser use, computer
use, or CI automation for different jobs. Each choice shows the power, blast
radius, and review burden.

Build:

- `TOOL-LEDGER.md` with purpose, data access, permissions, owner, and revocation
  plan.
- One reusable skill or command-like workflow.
- One deterministic hook or CI check for a non-negotiable rule.
- One MCP server or app connector where live external context is genuinely
  useful.
- One "do not automate" list for sensitive flows.

Agentic primitives:

- Tool selection by job.
- Least privilege.
- Deterministic enforcement.
- Reusable workflows.
- Live context integrations.
- Permission and data boundaries.

Failure modes:

- Tool is installed because it is novel, not because it solves a repeated need.
- MCP server has broader data access than the task requires.
- Hook blocks work unpredictably or becomes untrusted.
- Browser/computer use acts on signed-in pages without a human reviewing risk.

Verification gate:

The learner can justify every enabled tool, explain what data it can touch,
disable it, and show one workflow where the tool improved reliability over
manual copy-paste.

Assignment:

Install one scoped integration or workflow in the project, document it in the
tool ledger, and run a before/after comparison.

### 8. Agentic Debugging And Recovery

Objective:

Diagnose failures with agents through disciplined reproduction, minimization,
instrumentation, patching, regression tests, and rollback.

Companion interaction:

An incident board presents a broken build, vague symptom, misleading agent
suggestion, and noisy logs. The learner must reproduce, minimize, instrument,
hypothesize, patch, and regression-test in order.

Build:

- `DEBUG-INCIDENT.md`.
- Reproduction script or steps.
- Minimal failing case.
- Instrumentation notes.
- Hypothesis log.
- Patch diff.
- Regression test or guard.
- Rollback and recovery plan.

Agentic primitives:

- Reproduce before patch.
- Minimize before guessing.
- Instrument before broad rewrites.
- Regression tests.
- Rollback.
- Stuck-agent recovery.

Failure modes:

- Agent changes broad code paths without reproducing.
- Error comes from install/config but agent edits product code.
- Hallucinated API calls are patched around instead of checked against docs.
- Multiple agents keep reintroducing the same bug.

Verification gate:

The learner can show the bug failing before the fix, passing after the fix, and
caught by a regression guard.

Assignment:

Run a full incident workflow on one real project failure or a seeded fault and
write the postmortem.

### 9. Creative Synthesis: Apps, Automations, Simulations, Media

Objective:

Use agents for creative breadth while keeping human taste, scope, and
verification in charge.

Companion interaction:

A prototype-tournament lab shows five generated directions for the same idea.
The learner scores novelty, feasibility, verification burden, asset burden,
maintainability, and fit to thesis, then writes kill memos for rejected options.

Build:

- 3-5 tiny prototypes or concept variants.
- Prototype scoring sheet.
- Taste notes: what feels good, clear, useful, or novel.
- Kill memos for rejected directions.
- Chosen direction with cut list.
- Media/style ledger if generated assets are used.

Agentic primitives:

- Prototype breadth.
- Taste-based selection.
- Generated asset review.
- Simulation loops.
- Browser-native interactive scenes.
- Scope preservation during creative work.

Failure modes:

- Learner mistakes novelty for product fit.
- Generated media hides weak interaction.
- Prototype scope expands into Course 3 game production.
- Agent optimizes for impressive demo instead of maintainable artifact.

Verification gate:

The chosen prototype proves one real user or operator loop in under 60 seconds,
and the learner can defend why the rejected prototypes were cut.

Assignment:

Run a prototype tournament for the capstone and lock the final direction.

### 10. Shipping, Operations, And Maintenance

Objective:

Ship the artifact with CI, documentation, release evidence, monitoring or logs,
issue triage, and a maintenance plan.

Companion interaction:

A release-control lab shows a nearly finished project with missing CI, vague
release notes, no known-issues list, stale docs, and a fresh-agent failure. The
learner must choose what blocks release and what can be tracked as follow-up.

Build:

- Public or shareable deployment/package.
- CI gate.
- Release branch or tagged version.
- `README.md` or operator guide.
- Architecture handoff.
- Known issues.
- Release notes.
- Monitoring/logging plan appropriate to the artifact.
- Issue triage workflow.
- Six-weeks-later maintainability test.
- Fresh-agent handoff.

Agentic primitives:

- Release gates.
- CI/CD.
- Observability.
- Issue triage.
- Maintenance planning.
- Fresh-agent continuation.

Failure modes:

- Artifact runs only on the learner's machine.
- Release docs do not match the actual deployed state.
- No one can tell whether future failures are regressions.
- Fresh agent cannot safely extend the project.

Verification gate:

Someone else can run or inspect the shipped artifact, verify the release gate,
read the handoff, and identify the next safe change.

Assignment:

Ship the capstone candidate and prepare it for final adversarial review.

## Course Artifacts And Interfaces

These templates are the course's real APIs. Humans and agents both work through
them.

- `CALIBRATION-REPORT.md`
- `AGENTIC-OS.md`
- `AGENTS.md` / `CLAUDE.md`
- `MODEL-ROUTING.md`
- `RUN-LOG.md`
- `PROJECT-THESIS.md`
- `EXECUTABLE-SPEC.md`
- `NON-GOALS.md`
- `CONTEXT-MAP.md`
- `ADR-000N-DECISION.md`
- `FRESH-AGENT-HANDOFF.md`
- `TASK-GRAPH.md`
- `AGENT-ROLES.md`
- `SLICE-SPEC.md`
- `INTEGRATION-CHECKLIST.md`
- `VERIFICATION-MATRIX.md`
- `PACKAGE-TRUST-CHECKLIST.md`
- `TOOL-LEDGER.md`
- `DEBUG-INCIDENT.md`
- `POSTMORTEM.md`
- `PROTOTYPE-SCORECARD.md`
- `MEDIA-STYLE-LEDGER.md`
- `RELEASE-CHECKLIST.md`
- `KNOWN-ISSUES.md`
- `MAINTENANCE-PLAN.md`
- `CAPSTONE-DEFENSE.md`

## Capstone

The capstone is one novel artifact that would normally require a small team.
The learner may write little code by hand, but must direct the workflow,
understand the major decisions, verify behavior, and defend the result.

### Capstone Tracks

Pick one primary track.

**Track A: Product App**

- A useful web, desktop, or local app with durable state.
- Must include meaningful user flow, deployment or package, tests, docs, and
  fresh-agent handoff.
- Optional: one external API, generated media, or browser-native visualization.

**Track B: Automation / Ops Workflow**

- A multi-step workflow that reads from one or more sources, transforms or
  decides something, and produces an action or report.
- Must include idempotency, retry or failure handling, observability, and
  operator documentation.
- External APIs must be mocked or safely scoped if production access is risky.

**Track C: Simulation / Decision Tool**

- An interactive model with adjustable parameters, visible outputs, and an
  explanation of assumptions.
- Must include validation examples, scenario tests, visual or numerical output,
  and a clear warning about model limits.
- Generated media is allowed only when it clarifies the model.

Hybrid work is allowed only if one track remains primary and the scope budget
does not expand.

### Capstone Rubric

Passing score: 80/100, with no critical fail.

- Spec and scope control: 15 points.
- Agent orchestration and delegation: 15 points.
- Context engineering and handoff quality: 10 points.
- Implementation quality and integration discipline: 15 points.
- Verification evidence: 20 points.
- Shipping and operations readiness: 10 points.
- Maintainability and six-weeks-later survivability: 10 points.
- Human defense of major decisions and residual risks: 5 points.

Critical fails:

- Artifact does not run or cannot be inspected.
- No credible verification evidence.
- Learner cannot explain what agents changed.
- Secrets, personal data, payments, or signed-in accounts are mishandled.
- Fresh-agent session cannot understand how to continue.
- Capstone quietly depends on an out-of-scope specialty pipeline.

### Final Gate

The final capstone passes only when:

- The shipped artifact is available as a deployment, package, or reproducible
  local run.
- CI or an equivalent verification gate passes.
- Core user/operator flow has been tested with evidence.
- Architecture and scope decisions are documented.
- A fresh agent can extend the project from the handoff.
- The learner can explain what was delegated, what was verified, and what risks
  remain.
- The project survives adversarial review.

## Adversarial Assessment Scenarios

Use these as module gates and capstone review prompts:

- Agent adds a fake package or typo-squatted dependency.
- Agent deletes state, auth, validation, or error handling while making a UI
  improvement.
- Agent claims tests passed but no test command was run.
- CLI/model/tool behavior changes mid-course and breaks a workflow.
- MCP server or app connector asks for broader access than needed.
- Browser/computer use reaches a signed-in or sensitive page.
- Hook or CI check blocks valid work because it is too broad.
- Two agents edit overlapping files and produce a confusing merge.
- Fresh agent repeats old exploration because context was not written down.
- Visual regression passes lint and type checks.
- Capstone scope expands after prototype tournament.
- Learner cannot distinguish a product decision from an agent suggestion.
- Automation retries create duplicate side effects.
- Simulation output looks precise but assumptions are undocumented.
- Release works locally but fails on a clean machine.

## Tool Notes And Currency Plan

Tool notes are volatile. They are current-source notes for the teaching surface,
not the curriculum's durable core. Refresh this section before building modules,
recording lessons, or publishing a new cohort.

### Durable Primitive To Current Surface

| Durable primitive | Codex current surface | Claude Code current surface | Teaching rule |
|---|---|---|---|
| Repo standing rules | `AGENTS.md`, config, rules | `CLAUDE.md`, settings | Teach where durable guidance belongs before naming tool files. |
| Live tools and data | MCP servers, app connectors, plugins | MCP servers, plugins, integrations | Use for repeated live context, not one-off facts. |
| Reusable workflows | Skills, plugins | Skills, plugins | Make a skill when repeated instructions become a procedure. |
| Deterministic enforcement | Hooks, CI, rules | Hooks, CI | Use hooks for non-negotiable mechanics, not judgment calls. |
| Parallel work | Worktrees, subagents, background/cloud tasks | Worktrees, subagents, agent teams/background agents | Prefer parallel read-heavy work; isolate write-heavy work. |
| Visual/browser verification | In-app browser, Browser plugin, Chrome extension, computer use | Chrome, computer use, browser/desktop surfaces | Use structured tools first, screen control only when needed. |
| CI agent automation | Codex GitHub Action, non-interactive CLI | Claude Code GitHub Actions, Agent SDK | CI agents need narrow permissions and prompt-injection defenses. |

### Source-Backed Notes

- OpenAI Codex documentation describes Codex skills as reusable workflows with
  `SKILL.md`, progressive disclosure, repository/user/admin/system locations,
  and plugin distribution paths. Source: [Codex skills](https://developers.openai.com/codex/skills).
- OpenAI Codex MCP docs describe stdio and streamable HTTP servers, OAuth/bearer
  auth, project/user `config.toml`, server instructions, tool allow/deny lists,
  and plugin-provided MCP servers. Source: [Codex MCP](https://developers.openai.com/codex/mcp).
- OpenAI Codex hooks are lifecycle command hooks with trust review and events
  such as `PreToolUse`, `PostToolUse`, `PermissionRequest`, `Stop`, and
  compaction events. Source: [Codex hooks](https://developers.openai.com/codex/hooks).
- OpenAI Codex plugins bundle skills, app integrations, and MCP servers; they
  are the shareable distribution unit for reusable workflows. Source:
  [Codex plugins](https://developers.openai.com/codex/plugins).
- OpenAI Codex app worktrees use Git worktrees for isolated background tasks
  and handoff between local and worktree contexts. Source:
  [Codex worktrees](https://developers.openai.com/codex/app/worktrees).
- OpenAI Codex app browser docs frame the in-app browser as the preferred tool
  for local unauthenticated web preview and browser-use verification; computer
  use is for GUI tasks that command-line or structured integrations cannot
  reach. Sources: [Codex browser](https://developers.openai.com/codex/app/browser),
  [Codex computer use](https://developers.openai.com/codex/app/computer-use).
- OpenAI Codex subagent docs emphasize moving noisy parallel exploration out of
  the main thread and being cautious with parallel write-heavy work. Source:
  [Codex subagents](https://developers.openai.com/codex/concepts/subagents).
- OpenAI Codex GitHub Action can run Codex in GitHub Actions for CI reviews and
  repeatable agent tasks, with explicit sandbox and security configuration.
  Source: [Codex GitHub Action](https://developers.openai.com/codex/github-action).
- Anthropic describes Claude Code as an agentic coding tool available in
  terminal, IDE, desktop, and browser surfaces, with codebase reading, file
  edits, command execution, git, MCP, skills, hooks, parallel agents, and CI
  integrations. Source: [Claude Code overview](https://code.claude.com/docs/en/overview).
- Anthropic's Claude Code MCP docs describe MCP servers as the way to connect
  Claude Code to external tools, databases, APIs, issue trackers, monitoring
  dashboards, and design sources. Source: [Claude Code MCP](https://code.claude.com/docs/en/mcp).
- Anthropic's hooks docs describe hooks as user-defined shell commands that run
  at lifecycle points to format, notify, validate, block protected edits, and
  enforce project rules. Source: [Claude Code hooks](https://code.claude.com/docs/en/hooks-guide).
- Anthropic's skills docs describe skills as `SKILL.md` workflows that can be
  invoked directly or loaded when relevant, with project/personal/plugin
  locations and optional supporting files. Source:
  [Claude Code skills](https://code.claude.com/docs/en/skills).
- Anthropic's plugin docs describe plugins as shareable packages for skills,
  agents, hooks, and MCP servers. Source:
  [Claude Code plugins](https://code.claude.com/docs/en/plugins).
- Anthropic's subagent and worktree docs separate context-isolated workers from
  file-isolated worktrees. Source:
  [Claude Code subagents](https://code.claude.com/docs/en/sub-agents),
  [Claude Code worktrees](https://code.claude.com/docs/en/worktrees).
- Anthropic's computer-use docs frame screen control as broad and slower than
  structured integrations, best reserved for native apps, simulators, visual
  bugs, and GUI-only tools. Source:
  [Claude Code computer use](https://code.claude.com/docs/en/computer-use).
- Anthropic's GitHub Actions docs support `@claude` issue/PR automation and
  CI/CD integration while following project standards. Source:
  [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions).
- The Model Context Protocol docs define MCP as an open-source standard for
  connecting AI applications to external systems, with servers exposing
  resources, prompts, and tools and with explicit consent/security concerns.
  Sources: [MCP introduction](https://modelcontextprotocol.io/docs/getting-started/intro),
  [MCP specification](https://modelcontextprotocol.io/specification/2025-06-18).
- Playwright's testing guidance emphasizes user-visible behavior, isolated
  tests, resilient locators, web-first assertions, trace viewer evidence, and CI
  execution. Sources: [Playwright best practices](https://playwright.dev/docs/best-practices),
  [Playwright CI](https://playwright.dev/docs/ci).
- GitHub Actions docs frame Actions as CI/CD automation for build, test, and
  deployment pipelines, with Node workflows using checkout, setup-node,
  `npm ci`, build, and test steps. Sources:
  [GitHub Actions quickstart](https://docs.github.com/en/actions/get-started/quickstart),
  [Building and testing Node.js](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs).

### Refresh Procedure

Before publishing or recording a Course 2 cohort:

1. Refresh OpenAI Codex docs, especially skills, plugins, MCP, hooks,
   worktrees, browser/computer use, subagents, and GitHub Action.
2. Refresh Anthropic Claude Code docs, especially overview, skills, plugins,
   MCP, hooks, worktrees, subagents, computer use, and GitHub Actions.
3. Check the current MCP spec date and update any protocol-specific language.
4. Check Playwright and GitHub Actions examples for versioned action names.
5. Update only the tool appendix and module implementation notes unless a tool
   change invalidates a durable primitive.

## Assessment Model

Every module has:

- A companion app completion state.
- A field assignment.
- A review gate.
- SRS cards for durable vocabulary.
- A real artifact saved in the learner project.
- Evidence that can be reviewed by a fresh agent.

Grades are pass/fail per module. A module passes only if the learner can show
the artifact, explain the decision, and produce verification evidence.

Capstone grading uses the 100-point rubric above. A learner cannot compensate
for a critical fail with points elsewhere.

## Build Order For The Companion App

Build the companion in this order, not module order:

1. Module 1 Calibration, because it defines the before/after value of the
   whole course.
2. Module 6 Verification, because every later module needs shared gate language.
3. Module 3 Spec, because the spec is the control plane.
4. Modules 2, 4, and 5, because operating system, context, and task graph form
   the production backbone.
5. Module 8 Debugging, because it pressure-tests the verification language.
6. Module 7 Tools, once the tool appendix is refreshed.
7. Module 9 Creative Synthesis.
8. Module 10 Shipping.

One module per branch and PR. Each PR must include the module data object,
widgets, glossary/SRS additions, resources, mobile/desktop screenshots, and
verification notes.

## Coding Agent Execution Brief

When building this course inside the app:

- Read in order: `docs/CONTENT-GUIDE.md`,
  `docs/INTERACTIVE-COURSE-BUILDER.md`,
  `docs/adr/0001-interactive-lab-design-standard.md`,
  `docs/COURSE-1-CODE-LITERACY-FINAL.md`, then this file.
- Preserve the framework-free TypeScript app and NASA manual shell.
- Do not turn Course 2 into article pages. Every lesson needs a primary action,
  feedback, prediction, and real artifact bridge.
- Do not implement Course 2 as only a document pack. The document pack is the
  field-work layer; the app is the companion layer.
- Do not add accounts, backend, analytics, or paid APIs for the companion.
- Register every widget by id and keep progress/SRS local.
- Use the Course 1 done checklist plus Course 2 field evidence.
- Browser verification must include at least one desktop and one 375px mobile
  pass with no horizontal overflow.
- Tool-specific lessons must cite the current source appendix and include a
  refresh date.

## Self-Review Against CEO Findings

- H1 delivery format: resolved as guided real-project apprenticeship plus app
  companion.
- H2 entry gap: resolved with preflight gate and bridge pack.
- H3 tool churn: resolved with durable primitive plus current surface appendix
  and refresh procedure.
- H4 per-module structure: resolved with objective, interaction, build,
  primitives, failure modes, gate, and assignment for each module.
- H5 unbounded scope: resolved with explicit scope budget and three capstone
  tracks.
- H6 Course 3 overlap: resolved by routing Unity/Godot/Blender/game-engine
  production depth to Course 3.
- H7 revision memo problem: resolved by rewriting as standalone spec.
- H8 assessment model: resolved with module gates, capstone rubric, critical
  fails, and adversarial scenarios.
