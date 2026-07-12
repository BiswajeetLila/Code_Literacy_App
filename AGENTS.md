# Agent Instructions

## Agent skills

### Issue tracker

Issues and PRDs are tracked in GitHub Issues for `BiswajeetLila/Code_Literacy_App`. See `docs/agents/issue-tracker.md`.

### Triage labels

The repo uses the default five-label triage vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repo. Read root `CONTEXT.md` and `docs/adr/` if they exist. See `docs/agents/domain.md`.

### Model selection SSOT

Before spawning subagents, delegating work, or overriding a model, read and follow
`docs/MODEL-SELECTION-SSOT.md`. It is the mandatory repository-wide model-routing policy.
Do not silently substitute models. If the required model or agent credits are unavailable,
follow the SSOT's availability fallback and record the reason in the task status or handoff.
