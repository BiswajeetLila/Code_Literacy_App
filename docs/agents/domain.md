# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- `CONTEXT.md` at the repo root, if it exists
- `CONTEXT-MAP.md` at the repo root, if it exists
- `docs/adr/`, if it exists

If these files do not exist, proceed silently. The existing source of truth for this project is the product documentation in `HANDOFF.md`, `docs/PROJECT-PLAN.md`, and `docs/CONTENT-GUIDE.md`.

## File structure

This is a single-context repo. The student-facing product is the `Interactive-Viz/` web app. Supporting docs and design-system assets live beside it.

## Use the project's vocabulary

When issue titles, PRDs, or implementation notes name a domain concept, use the vocabulary from the content guide and handoff: Code Literacy, reading-first, ELI10, picture then real code, Week module, lesson, Read more, progress, review, SRS, glossary, and app shell.

## Flag ADR conflicts

If future ADRs are added and a proposal conflicts with one, surface that conflict explicitly instead of silently overriding it.
