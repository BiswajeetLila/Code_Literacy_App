# Course 3 Implementation Package

This folder operationalizes
[`Course 3: Unity Solo AI Game Studio`](../COURSE-3-UNITY-SOLO-AI-GAME-STUDIO.md).

Course 3 is a preflight-gated Unity studio course. The learner ships a Steam-demo candidate
vertical slice by using agents for high-leverage production work while retaining human control over
taste, feel, scope, and final creative judgment.

## Source-Of-Truth Split

The master spec owns policy: outcomes, audience, gate language, cadence, scope rules, time budgets,
cut triggers, Steam-demo candidate definition, asset compliance, and assessment.

This package owns operations: assignments, templates, review checks, module procedures, and
verification surfaces. When a policy concept appears in both places, the master spec wins and this
package should link back.

Normalization rules live in [`NORMALIZATION.md`](NORMALIZATION.md). Module docs must conform to
[`schemas/teachable-unit-schema.md`](schemas/teachable-unit-schema.md). Templates must conform to
[`schemas/runnable-template-schema.md`](schemas/runnable-template-schema.md).
Unity repo-rules samples live in [`samples/`](samples/).
Front-of-funnel close-out verification lives in
[`FRONT-OF-FUNNEL-CLOSEOUT.md`](FRONT-OF-FUNNEL-CLOSEOUT.md).

## Operating Loop

`Intent -> Spec -> Prototype -> Delegate -> Integrate -> Verify -> Polish -> Package`

## Required Flow

1. Run `PREFLIGHT-GATE.md`.
2. Place the learner into studio-ready, bridge-required, or not-ready.
3. If needed, assign `BRIDGE-PACK.md` labs and retake the same preflight gate.
4. Use `COHORT-OPS.md` to run the cohort cadence.
5. Complete modules in order.
6. Use templates as the course APIs.
7. Finish with `rubrics/CAPSTONE-RUBRIC.md` and `rubrics/ADVERSARIAL-ASSESSMENT.md`.

## Defaults

- Unity 6.3 LTS.
- URP unless a project has a clear reason not to use it.
- 2D encouraged by default for solo+agent speed.
- 3D allowed only with a written 3D risk/cut plan.
- Final artifact is a Steam-demo candidate package, not mandatory Steamworks upload.
- AI-generated player-consumed content must be disclosed in the Steam Content Survey prep.

## App Folder Convention

Each course app is a sibling folder at the repository root.

- Course 1 app: [`../Interactive-Viz/`](../../Interactive-Viz/)
- Reserved Course 3 app folder: `course-3-app/`

Issue #9 records this convention only. Do not create `course-3-app/` until a later implementation
issue explicitly asks for it.
