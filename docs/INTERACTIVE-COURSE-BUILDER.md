# Interactive Course Builder Blueprint

This is the HOW/WHY behind Code Literacy. Use it when building another course in the same
style, even if the topic is football, guitar, cooking, finance, or something else entirely.

## Core Belief

The course is not a library of readings. It is a sequence of small interactive models.
Reading is there to name and stabilize what the learner just experienced.

The durable loop is:

1. **Picture:** start with one everyday situation.
2. **Action:** ask the learner to do something concrete.
3. **Feedback:** respond immediately and visibly.
4. **Prediction:** make them guess before the answer appears.
5. **Real artifact:** connect the action to the real-world thing: code, chord, pass, tactic,
   recipe, diagram, or decision.
6. **Vocabulary:** attach the formal word last.

## Product Pillars

- **Interaction first:** each lesson needs a primary action. If removing the widget barely
  changes the lesson, the lesson is not done.
- **One picture per concept:** choose the clearest everyday model and stick to it.
- **Short path to reality:** after the picture and action, show the real artifact quickly.
- **Immediate feedback:** every click, guess, or toggle should teach something.
- **Plain language, then names:** explain the thing before naming it.
- **Portable structure:** the course shell, week map, FAQ, review, and progress concepts should
  work for other domains.

## Lesson Shape

Each lesson should contain:

- One sentence for what the learner will learn.
- One everyday picture.
- One primary interaction.
- One feedback state or reveal.
- One predict-then-peek prompt.
- One tiny real artifact with annotations.
- One FAQ/back-pocket vocabulary path for small blockers.

Avoid long explanatory pages. If the concept needs a paragraph, first ask what action would make
the paragraph unnecessary.

## Interaction Patterns

Use these patterns repeatedly:

- **Scrub:** move through a sequence step by step.
- **Predict then peek:** answer before reveal.
- **Sort:** classify examples into buckets.
- **Click to inspect:** choose a part and see what it means.
- **Break and decode:** toggle a mistake, then read the resulting signal.
- **Compare:** show two similar things and ask what changed.
- **Build up:** assemble a whole from small named parts.
- **Trace:** follow a token, value, ball, sound, or decision through a system.

## Lab UI Standard

Week 1 established the reusable UI pattern for Code Literacy lessons:

- The outer course remains a light NASA technical-manual page: square tabs, paper background,
  dense labels, and predictable navigation.
- A lesson may contain a dark instrument lab when it needs focus, live output, or 3D motion.
  This is a teaching surface, not a decorative hero.
- The primary lab gets the space. Avoid dead side panels. Put decode/help content in compact
  strips, reveals, or console lanes unless it is actively used during the whole lesson.
- 3D scenes must be meaningful and inspectable: rotate, zoom, click, hover, trace, or scrub.
  If the learner cannot manipulate the model, ask whether a simpler 2D instrument would teach
  better.
- WebGPU/Three.js is appropriate for flows, routing, ownership, state changes, and spatial
  mental models. It is not required for file lists, static definitions, FAQ, or reading lists.
- Every lab needs a reduced-motion path, visible focus states, live status text, and verified
  375px mobile behavior with no horizontal overflow.
- Manual/reference tabs stay text-heavy and scan-friendly. FAQ and Read more support the
  interaction; they do not need to match the lab's visual weight.

## Week 1 Reference Labs

Use these as the quality bar when building later weeks:

- **Round Trip Lab:** a WebGPU/WebGL signal path where code-line clicks focus request, server
  work, or response; controls affect latency, payload, and server failure.
- **Project Folder Lab:** a structured project tree with Web/Python modes, entry-file trace,
  details, real snippets, and installed-parts warnings. This intentionally stays mostly 2D
  because the concept is hierarchy, not space.
- **Error Routing Lab:** a rotatable/clickable 3D router showing whether Python, page JS, or API
  failures belong in the terminal or browser console; red lines decode into plain language.

## Week Shape

Every week should ship:

- `00 Start`: what this week is and what actions the learner will perform.
- `01..N Lessons`: interactive tabs, each with one core action.
- `FAQ`: quick meanings for tiny terms that might block momentum.
- `Read more`: curated outside resources after the learner has a mental model.

## Porting To Other Topics

For a football course, the artifact might be a formation, pass path, or decision tree.
For guitar, it might be a fretboard, rhythm pattern, or chord change.
For code literacy, it is a file, terminal, request, error, or snippet.

The topic changes. The builder loop does not: picture, action, feedback, prediction, artifact,
vocabulary.

## Quality Bar

Before calling a lesson done, check:

- Can a learner do something within 20 seconds?
- Does the interaction produce visible feedback?
- Does the learner predict before reveal at least once?
- Does the real artifact appear while the picture is still fresh?
- Does the FAQ handle small vocabulary blockers?
- Would the lesson lose most of its value if converted to a static article?
