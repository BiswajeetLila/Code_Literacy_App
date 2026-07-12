# Model Selection SSOT

Status: Active

This document is the single source of truth for model selection, delegation, and escalation in
this repository. Every agent must read and follow it before spawning subagents or choosing a
model for delegated work.

An explicit user instruction or a platform safety requirement overrides this document. When an
override happens, record it in the task update or handoff. Do not silently substitute models.

## Available Model Roles

### GPT-5.6 Sol

Use for decisions with a large blast radius or unusually high reasoning demand:

- Main orchestration, architecture, contracts, and shared integration.
- Cross-module debugging after a narrower model has failed with concrete evidence.
- Spatial/3D interaction design and implementation.
- Final holistic code, product, and accessibility review.

Default reasoning effort: `high`. Use `xhigh` only for the final review or a genuinely difficult
cross-system defect.

### GPT-5.6 Terra

Use for normal production implementation that needs strong engineering judgment:

- Complete 2D lesson/week implementation.
- Responsive CSS and interaction polishing.
- Moderate debugging within a bounded feature area.
- Refactors with clear ownership and acceptance criteria.

Default reasoning effort: `high`.

### GPT-5.6 Luna

Use for bounded, repetitive, or verification-heavy work:

- File scaffolding after interfaces are fixed.
- Cards, glossary entries, resource lists, and documentation updates.
- Build checks, route smoke tests, repetitive browser QA, and static audits.
- Mechanical fixes with an already-proven root cause.

Default reasoning effort: `medium`. Use `high` for verification work that must catch edge cases.

## Mandatory Operation Routing

| Operation | Required model | Default effort |
|---|---|---|
| Architecture, contracts, shared integration | GPT-5.6 Sol | high |
| Three.js/3D implementation | GPT-5.6 Sol | high |
| Final holistic review | GPT-5.6 Sol | high or xhigh |
| Complete 2D feature/week implementation | GPT-5.6 Terra | high |
| Responsive interaction and CSS polishing | GPT-5.6 Terra | high |
| Routine content/data/documentation work | GPT-5.6 Luna | medium |
| Builds, route smoke tests, repetitive browser QA | GPT-5.6 Luna | high |
| Cross-module debugging | Terra first; Sol only after escalation trigger | high |

Do not use Sol for routine scaffolding, glossary/resource entry, repetitive smoke tests, or
mechanical documentation work when Luna or Terra is available.

## Course 1 Allocation

The main thread remains on GPT-5.6 Sol and owns shared files, integration, verification gates,
and final decisions.

- Weeks 02, 03, 05, 07, 09, and 11: GPT-5.6 Terra workers.
- Weeks 04, 06, and 10: GPT-5.6 Sol workers because the canonical labs require inspectable 3D.
- Repetitive content checks, documentation, and batch smoke testing: GPT-5.6 Luna reviewers.
- Final Course 1 review and defect integration: the GPT-5.6 Sol main thread.

When one worker owns a complete week, keep its page, labs, content data, and week-specific CSS
together under that worker. Do not split a small week between Terra and Luna when coordination
would cost more than the saved model usage.

## Delegation And Concurrency

1. The Sol main agent defines the file contract and acceptance criteria before delegation.
2. Run at most three writing workers in one batch unless the files are demonstrably disjoint.
3. Every worker receives an explicit write set and must not edit shared integration files.
4. The main agent integrates one completed batch and runs a build before starting the next.
5. Use a separate Luna verification pass after each batch when credits and concurrency allow.
6. Close completed or failed workers promptly so they do not consume concurrency slots.

## Escalation Triggers

Escalate Luna to Terra only when at least one of these is true:

- The task requires product or interaction judgment beyond fixed instructions.
- A mechanical attempt failed and the root cause is not established.
- The change crosses more than one owned module.

Escalate Terra to Sol only when at least one of these is true:

- The issue crosses shared architecture or multiple week contracts.
- The task involves Three.js, spatial teaching behavior, or a complex accessibility tradeoff.
- Terra produced a reproducible failure or conflicting design conclusions after a focused pass.
- The task is the final holistic release review.

Never escalate merely because a task is long.

## Availability And Credit Fallback

Model routing cannot bypass platform availability, permissions, or agent-credit limits.

If the required delegated model is unavailable:

1. Record the unavailable model and the exact platform reason.
2. Do not silently replace it with a more expensive model.
3. The Sol main thread may continue architecture, integration, diagnostics, or one bounded
   critical-path implementation unit at a time when the user has already asked work to continue.
4. Mark that work as a fallback, not as optimized delegated execution.
5. Resume the required model allocation when availability returns.

If all subagents are blocked by credits, do not repeatedly spawn them. Continue only safe local
critical-path work and surface the credit blocker in the next user-facing status.

## Required Reporting

Every orchestration handoff must state:

- Which model handled each delegated operation.
- Any escalation and its concrete trigger.
- Any fallback caused by model or credit unavailability.
- Build and browser verification performed after integration.
- Work that remains because the required model was unavailable.

