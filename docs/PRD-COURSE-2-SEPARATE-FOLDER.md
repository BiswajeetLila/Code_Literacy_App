# PRD: Course 2 Separate App - Worldclass Agentic Builder

## Problem Statement

Course 2, Worldclass Agentic Builder, now has a standalone course specification, but it is not yet represented as a buildable product in the repository. The current interactive app is Course 1. Course 2 needs its own separate app folder as a sibling to the existing Course 1 app so it can develop as an advanced real-project apprenticeship companion without destabilizing Course 1's code literacy experience.

The learner problem is that Course 2 is not a static reading pack. It needs an interaction-first companion that teaches advanced agentic engineering through run-log drills, spec-building labs, task-graph instruments, verification simulators, tool-risk exercises, debugging boards, prototype tournaments, release gates, SRS, and field assignments. The repo needs a clear product boundary for this new course before implementation agents start building modules.

## Solution

Create Course 2 as its own separate frontend app folder, sibling to the existing Course 1 app folder. The new app should preserve the proven Course 1 educational contract: framework-free TypeScript, static/PWA-friendly delivery, local progress, SRS, manual shell plus instrument labs, accessible interactions, and no backend.

Course 2 should not copy Course 1 blindly. It should reuse the same teaching philosophy while adapting the app structure to an advanced apprenticeship model. The app is the companion layer for a real learner project. It teaches concepts through interactive drills and asks the learner to bring back field evidence from their own repo: specs, diffs, run logs, screenshots, CI results, tool ledgers, postmortems, release notes, and fresh-agent handoffs.

The first deliverable is a complete Course 2 shell and content architecture that can host all 10 modules from the Course 2 spec, with enough implemented vertical slice functionality to prove the folder boundary, route structure, progress model, SRS, module checklist, and one high-quality interactive lab pattern.

## User Stories

1. As a Course 2 learner, I want Course 2 to open as its own app, so that I am not confused by Course 1's beginner code literacy flow.
2. As a Course 2 learner, I want a clear module map, so that I can see the 10-module path from calibration through shipping.
3. As a Course 2 learner, I want a preflight gate, so that I know whether I am ready for the advanced course.
4. As a Course 2 learner, I want a bridge-pack section, so that I can close gaps before entering the main modules.
5. As a Course 2 learner, I want each module to start with what I will do, so that I understand the real action expected outside the app.
6. As a Course 2 learner, I want interactive drills instead of articles, so that I learn by reviewing, choosing, sorting, tracing, scoring, and verifying.
7. As a Course 2 learner, I want run-log comparison drills, so that I can see why raw vibe coding is weaker than spec-driven agent work.
8. As a Course 2 learner, I want spec-building labs, so that I can practice turning vague ideas into executable control planes.
9. As a Course 2 learner, I want task-graph instruments, so that I can learn when work can be delegated in parallel and when it creates integration debt.
10. As a Course 2 learner, I want verification-matrix labs, so that I can choose credible gates instead of trusting agent confidence.
11. As a Course 2 learner, I want tool-risk drills, so that I can distinguish prompts, repo rules, skills, hooks, MCP, plugins, browser use, computer use, and CI automation.
12. As a Course 2 learner, I want debugging incident boards, so that I can practice reproduce, minimize, instrument, patch, and regression-test in order.
13. As a Course 2 learner, I want prototype-tournament exercises, so that I can use agents for creative breadth while preserving scope and taste.
14. As a Course 2 learner, I want release-gate drills, so that I can learn what blocks shipping and what can safely become follow-up work.
15. As a Course 2 learner, I want field assignments inside each module, so that the app connects directly to my real project work.
16. As a Course 2 learner, I want module review gates, so that I know what evidence I must produce before moving on.
17. As a Course 2 learner, I want module checklists, so that I can track completion without relying on memory.
18. As a Course 2 learner, I want SRS cards for durable vocabulary, so that concepts like task graph, verification matrix, tool ledger, context rot, and fresh-agent handoff stick.
19. As a Course 2 learner, I want local progress persistence, so that I can resume the course without an account.
20. As a Course 2 learner, I want the app to work offline after load where practical, so that my course progress does not depend on a live service.
21. As a Course 2 learner, I want all labs to work on mobile widths, so that I can review lessons on smaller screens.
22. As a Course 2 learner, I want keyboard-accessible controls, so that I can use every lab without a mouse.
23. As a Course 2 learner, I want reduced-motion support, so that motion-heavy labs remain usable.
24. As a Course 2 learner, I want dark instrument labs within a stable manual shell, so that dense agentic workflows are readable without losing the course's visual identity.
25. As a Course 2 learner, I want real artifact bridges in every lesson, so that each interaction connects to actual specs, diffs, prompts, logs, test output, or release evidence.
26. As a Course 2 learner, I want tool notes to be clearly marked as current and refreshable, so that I can separate durable primitives from changing product surfaces.
27. As a Course 2 learner, I want capstone track guidance, so that I can choose between product app, automation workflow, or simulation/decision tool without unbounded scope.
28. As a Course 2 learner, I want a capstone rubric, so that I know how the final artifact will be judged.
29. As a Course 2 learner, I want adversarial scenarios, so that I can practice catching serious agentic workflow failures before they happen in my own project.
30. As a returning Course 1 learner, I want visual and interaction continuity, so that Course 2 feels like the next course in the same product family.
31. As an advanced learner, I want Course 2 to feel materially more demanding than Course 1, so that it does not repeat beginner prompting or code literacy basics.
32. As a course author, I want Course 2 isolated in its own folder, so that Course 1 can stay stable while Course 2 evolves.
33. As a course author, I want reusable module data contracts, so that each module can be built by separate agents without reshaping the app every time.
34. As a course author, I want a shared widget registry or equivalent module-widget mapping, so that interactive labs can be registered predictably.
35. As a course author, I want shared components for cards, resources, glossary terms, progress, checklists, and code/artifact callouts, so that module authors do not reinvent them.
36. As a course author, I want each module to declare field assignments and review gates, so that the apprenticeship layer is not forgotten during app implementation.
37. As a course author, I want clear content templates, so that future modules can be implemented consistently by AFK agents.
38. As a course author, I want browser-verifiable routes, so that every module can be checked in desktop and mobile viewports.
39. As a course author, I want no backend requirement, so that the course stays cheap to host and simple to run.
40. As a course author, I want tool-specific content isolated from durable concepts, so that docs updates do not force a full course rewrite.
41. As an implementation agent, I want a separate Course 2 project folder, so that I can work without touching the Course 1 app unless explicitly asked.
42. As an implementation agent, I want the Course 2 spec to be the source of truth, so that I can implement modules in the intended order.
43. As an implementation agent, I want a first vertical slice that proves shell, routing, progress, SRS, checklist, and one lab pattern, so that later modules have a stable reference.
44. As an implementation agent, I want strict build and accessibility gates, so that the app does not regress as modules are added.
45. As a maintainer, I want implementation issues to link back to this PRD, so that Course 2 work stays coordinated.
46. As a maintainer, I want Course 2 and Course 1 dependency changes separated, so that dependency risk is localized.
47. As a maintainer, I want build scripts for the Course 2 folder, so that I can build and preview it independently.
48. As a maintainer, I want clear out-of-scope boundaries, so that agents do not add accounts, backend services, analytics, paid APIs, or Course 3 game-engine production.
49. As a reviewer, I want the first Course 2 slice to include screenshots and interaction evidence, so that I can review more than static text.
50. As a reviewer, I want tests focused on external behavior, so that refactors do not break tests that merely assert implementation details.

## Implementation Decisions

- Course 2 will be implemented as a separate app folder sibling to the current Course 1 app folder.
- The new folder should use a clear Course 2-oriented name, such as `Course-2-Agentic-Builder`, unless the maintainer chooses a different naming convention before implementation starts.
- Course 1 remains stable. Course 2 implementation should not modify Course 1 app behavior, routes, styling, content, or dependencies unless a later issue explicitly authorizes shared extraction.
- Course 2 should start by copying the proven architectural shape of Course 1 where useful: static frontend, TypeScript, Vite-style build, local progress, SRS, route-based course map, reusable lesson cards, resources, glossary terms, and interactive widget registration.
- Course 2 should not introduce a backend, accounts, analytics, database, paid API dependency, or server-side course state.
- Course 2 should use a manual shell plus dense instrument labs. The shell may evolve for the advanced audience, but it should remain recognizably part of the same product family.
- The first implementation milestone should be a vertical slice, not all 10 modules. The slice should prove the Course 2 shell, course map, preflight page, module route, local progress, SRS, module checklist, field assignment, review gate, and one high-quality interactive lab.
- The first interactive lab should come from Module 1, Calibration: The Vibe Coder Benchmark, because it establishes the course's value proposition and creates the benchmark pattern for later modules.
- Module 6, Verification Systems, should be the second major module target because its vocabulary and gate model are reused throughout the rest of the course.
- Module 3, Spec As Control Plane, should follow early because it establishes the control-plane artifact for field work.
- The companion app should model Course 2 modules using a reusable module data contract equivalent in spirit to Course 1's week data contract.
- Each Course 2 module should include metadata, lessons, SRS cards, resources, glossary terms, field assignment, review gate, and checklist state.
- Each lesson should include one primary action, immediate feedback, a prediction moment, and a real artifact bridge.
- Real artifact bridges in Course 2 may be specs, prompts, run logs, diffs, CI logs, tool manifests, screenshots, verification matrices, postmortems, release notes, or handoffs.
- A widget registry or equivalent lookup should map lesson definitions to interactive lab implementations by stable id.
- Reusable deep modules should be extracted for progress persistence, SRS scheduling, module checklist state, glossary/resources rendering, artifact callouts, and review-gate/checklist evaluation.
- A Course 2-specific lab library should include reusable primitives for comparison tables, sortable evidence cards, scoring rubrics, timeline/run-log playback, task graph boards, verification matrices, tool-risk switchboards, incident boards, and release gates.
- Course 2 should keep tool-specific current facts isolated in resources or appendix content so that volatile product details can be refreshed without rewriting durable lessons.
- The app should include a source freshness display or metadata field for tool-note resources when a lesson depends on current Codex, Claude Code, MCP, Playwright, or GitHub Actions behavior.
- Capstone content should be represented as guidance, rubric, and defense checklist, not as a backend submission system.
- Learner field evidence should be tracked as checklist completion and prompts for self-review, not by uploading private project files into the app.
- Course 2 must clearly separate broad agentic engineering from Course 3's Unity specialization. Game-engine production depth remains out of scope.
- The route structure should make Course 2 independently buildable and previewable.
- The build command for Course 2 should run without building Course 1.
- Implementation should favor stable, testable interfaces over one-off page scripts because later modules will be built by multiple agents over time.

## Testing Decisions

- Tests should focus on externally visible behavior: routes render, module data appears, progress persists, SRS cards schedule, checklists update, and interactive labs respond to user actions.
- Tests should not assert private implementation details such as exact internal object shapes unless those shapes are exported as deliberate content contracts.
- The first test target should be the Course 2 shell and routing: home/course map, preflight, module route, and fallback route.
- The progress module should be tested because it is a deep module with a small interface and high learner impact.
- The SRS scheduling module should be tested because Course 1 already treats SRS as a core learning mechanic and regressions would be subtle.
- The module checklist/review-gate state module should be tested because Course 2 depends on field evidence and pass/fail gates.
- The widget registry or lesson-to-widget lookup should be tested because missing widgets would silently turn interactive lessons into static content.
- The first Module 1 calibration lab should have behavior tests for selecting runs, making predictions, scoring evidence, and revealing feedback.
- Accessibility checks should be part of verification: keyboard reachability, visible focus, live status for changing feedback, reduced-motion handling, and no horizontal overflow at 375px.
- Browser verification should cover at least one desktop viewport and one 375px mobile viewport for the Course 2 shell and the first interactive lab.
- Build verification should run the Course 2 type/build command independently.
- Prior art: Course 1 already has the relevant product behavior patterns: route-based pages, cards, resources, SRS-like cards, reusable widgets, manual shell styling, and interactive labs.

## Out of Scope

- Building all 10 Course 2 modules in the first implementation pass.
- Migrating Course 1 into a monorepo-wide shared package.
- Refactoring Course 1 unless a later implementation issue explicitly requires it.
- Backend services, accounts, analytics, databases, auth, paid APIs, or user uploads.
- In-app submission or grading of private learner project repos.
- Unity, Godot, Unreal, Blender, or deep game-engine production workflows.
- Course 3 implementation.
- External tool automation inside the app itself, such as directly controlling Codex, Claude Code, GitHub, MCP servers, or learner machines.
- A polished marketing landing page. The first screen should serve the course experience.
- Replacing the established interaction-first course model with static documentation.

## Further Notes

The Course 2 source spec is `Course 2: Worldclass Agentic Builder`. It defines the product promise, delivery model, preflight gate, 10-module plan, templates, capstone tracks, rubric, adversarial scenarios, tool appendix, and build order.

The recommended implementation path is:

1. Create the separate Course 2 app folder.
2. Establish independent install/build/preview scripts.
3. Port or recreate the minimal shell, course map, routing, progress, SRS, resources, glossary, and widget registration needed for Course 2.
4. Implement the preflight page and Module 1 vertical slice.
5. Add browser/mobile/accessibility verification evidence.
6. Split the remaining modules into implementation issues linked back to this PRD.

This PRD should be labeled `ready-for-agent` once published to GitHub Issues.
