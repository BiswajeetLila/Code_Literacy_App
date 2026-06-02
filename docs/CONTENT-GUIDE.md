---
tags: [status/permanent, meta]
aliases: [Style Guide, Voice Guide, Interaction Guide]
---

# Content & Voice Guide

The contract every course screen is written against. If a sentence or interaction breaks a
rule here, the screen is wrong, not the rule.

Goal: a person who has never written code, never seen a terminal, and does not know what "a
file" really is can use any lesson and come away understanding it.

> **End goal of the course:** the learner can read AI-generated code, smell when it is bad,
> debug it, and steer an AI to ship working things. Reading-first, but not passive-reading-first:
> interaction is the teaching engine, and prose supports the interaction.

> **Pace: ELI10, not ELI5.** Explain like they are a sharp 10-year-old, not a toddler. One
> tight picture per concept, then show the real code straight away. Trust the reader to keep
> up. Do not pad.

## The 9 Rules

1. **No jargon before its picture.** A technical word may only appear after it has been given
   an everyday picture, or after it links to the glossary entry that does.
2. **One everyday picture per concept.** Pick the clearest concrete model. Do not stack three
   analogies. Do not force one master theme across the whole course.
3. **Everyday means everyone's day.** Allowed: kitchens, mail, libraries, light switches,
   phone calls, recipes, front doors, to-do lists. Banned: analogies that assume a trade or
   hobby.
4. **Short sentences. Real words.** Prefer "asks for" over "initiates a request." Define the
   real term after the plain phrase.
5. **Always answer "so what?"** Every concept says where a beginner will actually see it while
   reading code or using an app.
6. **Interaction is the core lesson.** A lesson is not finished until the learner does
   something: predict, scrub, sort, click, reveal, break, fix, compare, or choose. Prose sets
   up the action; the action teaches the point; the code explains what just happened.
7. **The beginner test.** Before saving, ask: could someone with zero coding knowledge
   re-explain this to a friend after one pass? If no, cut words and strengthen the picture.
8. **Picture, then the real code.** After the everyday picture and interaction, show the same
   idea in real syntax: 4-6 lines, Python or JS/TS, the kind an AI actually writes. Annotate
   each line back to the picture.
9. **Every tab earns its click.** Tabs are not article sections. Each lesson tab needs one
   primary action, one immediate feedback moment, and one short reflection prompt. FAQ and
   Read more tabs can support the lesson, but they cannot replace the interaction.

## Interaction-First Lesson Loop

Build each lesson around this loop:

1. **Picture:** give one everyday situation.
2. **Do:** make the learner manipulate or decide something in that situation.
3. **Feedback:** show the result immediately, preferably in the same visual space.
4. **Predict:** ask for a guess before revealing the answer.
5. **Code:** show 4-6 real lines that match the interaction.
6. **Name:** only now attach the durable technical word.

If a lesson can be copied into a static article without losing much, it is not interactive
enough yet.

## Screen Shapes

**Glossary term**

- `In plain words`: 1-2 jargon-free sentences.
- `Everyday picture`: the one best-fit analogy.
- `In real code`: 4-6 lines of real syntax, annotated back to the picture.
- `Where you will meet it`: one concrete place a beginner sees it.

**Lesson tab**

- One everyday picture.
- One primary interaction.
- One feedback or reveal state.
- One predict-then-peek prompt.
- One tiny real code/artifact bridge.

**Weekly module**

- `00 Start`: what this week teaches and what actions the learner will perform.
- `01..N Lessons`: interactive tabs.
- `FAQ`: quick meanings for tiny syntax/word blockers.
- `Read more`: curated outside resources after the learner has a mental model.

## Week 1 Design Findings

These findings are now project-wide rules.

1. **Manual shell, instrument labs.** The course keeps the light NASA technical-manual page
   as the stable shell. Individual lesson labs may become dark, dense instrument panels when
   the concept needs focus, motion, or console-like output.
2. **3D must teach a model.** Use WebGPU/Three.js when motion or spatial inspection clarifies
   flow, routing, ownership, or state. Do not add 3D only for decoration.
3. **Make 3D inspectable.** If a lesson has a 3D scene, the learner should usually be able to
   rotate, zoom, click, hover, or otherwise inspect meaningful objects. A passive animation is
   below the Week 1 quality bar unless reduced motion is active.
4. **Compact support panels.** Avoid tall empty side panels. If a decode/explanation panel is
   not always useful, make it a compact strip or reveal state so the primary interaction gets
   the space.
5. **Manual/reference tabs stay text-heavy.** FAQ and Read more are support tabs. They should
   stay scan-friendly, dense, and technical-manual styled unless there is a specific action
   that teaches better than text.
6. **Instrument labs still need real code or artifacts.** A learner should leave the lab able
   to recognize the real shape: a `fetch()` line, a project folder, an error message, a package
   file, or a command.
7. **Accessibility is part of the lesson.** Every lab must keep keyboard focus states, live
   status text for changing captions/logs, mobile layouts with no horizontal overflow, dark
   mode readability, and `prefers-reduced-motion` behavior.

## Concept To Everyday-Picture Map

| Concept | Everyday picture | Real-code shape it shows up as |
|---|---|---|
| client | A customer at a restaurant table: the one who orders. | `await fetch("/order")`: the browser asking |
| server | The kitchen: receives orders and sends back food. | a route that answers, e.g. `app.get("/order", ...)` |
| frontend | The dining room: the part you see, sit in, and touch. | `.html`, `.css`, `.tsx`: what is drawn on screen |
| backend | The kitchen behind the door: where hidden work happens. | server files that save data or check passwords |
| runtime | The kitchen being open and cooking: the thing carrying out instructions. | `python app.py` / `node main.js` |
| the cloud | A computer you rent somewhere else, like storage across town. | a URL like `https://api.example.com` |
| entry point | The front door / start-here page. | `index.html` -> `src/main.ts`; Python `if __name__ == "__main__":` |
| repository (repo) | One project folder: a binder of all project files. | the top folder you open in an editor |
| request | Placing an order: "I would like this, please." | `fetch(url)` / `requests.get(url)` |
| response | The food coming back to your table. | `const data = await response.json()` |
| file | One sheet of paper with writing on it. | `main.ts`, `app.py`: one `.ext` document |
| folder | A drawer that holds related sheets of paper. | `src/`, `public/`: a name ending in `/` |
| source-folder (`src/`) | The drawer with your recipe pages in it. | `src/`: the code you actually write/read |
| installed-parts (`node_modules/`, `.venv/`) | Pre-made ingredients you bought. | huge auto-made folder; never edited by hand |
| package.json / requirements.txt | The parts label on the box. | `"dependencies": { "three": "^0.169.0" }` |
| terminal | The kitchen's back window: where cook notes and errors print. | the text window running `python app.py` |
| browser console | The dining-room window: where page notes and errors print. | DevTools Console; `console.log(...)`, red errors |
| print vs return | Print = saying it out loud. Return = handing the plate back. | `print(x)` shows you; `return x` hands a value back |
| error / where it prints | A note saying something went wrong, in a specific window. | `NameError: ...` vs `Uncaught TypeError` |
| dependency | A bought outside part the project uses instead of making from scratch. | `dependencies`, `import`, `from ... import ...` |
| dependency list | A shopping list of outside parts needed before the project runs. | `package.json`, `requirements.txt`, `pyproject.toml` |
| install command | Going shopping before cooking: fetch the listed parts into the local project. | `npm install`, `pip install -r requirements.txt` |
| import | Taking a bought part off the shelf so this file can use it. | `import express from "express"` / `import requests` |
| version | The exact model or edition of a bought part. | `"three": "^0.180.0"`, `requests==2.32.3` |
| version range | A label that says which editions are allowed, not always one exact box. | `"three": "^0.180.0"` allows compatible updates |
| lockfile | The receipt that records exactly what got bought this time. | `package-lock.json`, `pnpm-lock.yaml`, `uv.lock` |
| dev dependency | A tool used while building, not a part shipped to the user. | `"devDependencies": { "vite": "..." }` |
| hallucinated import | Asking for a part that does not exist on the shelf. | `import { missingThing } from "fake-package"` |
| slopsquatting | A fake or risky package name that looks close enough to fool you. | `npm install expres` instead of `express` |

Extend this table as later weeks are written. Each new concept must land here before its lesson
is considered done.

## Words To Avoid

| Do not write | Write |
|---|---|
| initiates a request | asks for something |
| long-running process | a program that stays open, waiting |
| executes | runs / carries out |
| instantiate | make / create |
| the codebase | all the project's files |
| invoke a function | use a recipe |
| parse | read and make sense of |
