---
tags: [status/permanent, meta]
aliases: [Style Guide, ELI5 Rules, Voice Guide]
---

# Content & Voice Guide

> The **writing contract** for all course content. Some examples below reference old vault
> folders (`06-Glossary/`, `07-Resources/`) — those are gone; the **rules** (voice, Rule 8, the
> concept→picture map) carry forward into the web app.

The contract every piece of course content is written against. If a sentence breaks a rule here,
the sentence is wrong — not the rule. Goal: a person who has **never** written code, never
seen a terminal, and does not know what "a file" really is can read any note and come away
understanding it.

> **End goal of the course:** the reader can *read* AI-generated code, smell when it's bad,
> debug it, and steer an AI to ship working things. Reading-first. We are **not** teaching
> them to write code from a blank page.

> **Pace: ELI10, not ELI5.** Explain like they're a sharp 10-year-old, not a toddler. One
> tight picture per concept, then **show the real code** straight away. Trust the reader to
> keep up. Don't pad. The everyday picture is the on-ramp; the goal is to get them reading
> actual syntax fast.

---

## The 8 rules

1. **No jargon before its picture.** A technical word may only appear after it has been
   given an everyday picture — or it links to the glossary note that does. First use of
   `server`? Either explain it inline or write [[server]].
2. **One everyday picture per concept.** Each concept gets a single, concrete,
   everyday-life image (a restaurant, a mailbox, a recipe card). Best-fit per concept — we
   do **not** force one master theme across everything. Don't stack three analogies; pick
   the clearest one.
3. **Everyday means *everyone's* day.** Allowed: kitchens, mail, libraries, light switches,
   phone calls, recipes, front doors, to-do lists. **Banned:** anything that assumes a
   trade or hobby — no machining, BOMs, tolerances, kinematics, CAD, game-art, electronics.
   If a 12-year-old hasn't lived it, don't use it.
4. **Short sentences. Real words.** Prefer "asks for" over "initiates a request." Define the
   real term *after* the plain phrase, in parentheses: "the program that answers (the
   **server**)."
5. **Always answer "so what?"** Every concept note says where a beginner will actually *see*
   this thing when reading code or using an app. No floating abstractions.
6. **Show, don't just tell.** Lean on the interactive pieces — a predict-then-peek card or
   the Three.js viz — over walls of prose. Prose sets up the picture; the interaction tests
   it.
7. **The beginner test.** Before saving, ask: *could someone with zero coding knowledge
   re-explain this to a friend after one read?* If no, cut words and strengthen the picture.
8. **Picture, then the real code.** After the everyday picture, show the *same idea in real
   syntax* — 4–6 lines, Python or JS/TS, the kind an AI actually writes. Annotate each line
   back to the picture (`// the browser places the order`). The reader should leave able to
   *recognize the shape* of that code in the wild. A concept note without a real snippet is
   not finished. Keep snippets minimal and runnable-looking, never pseudocode.

---

## Note shapes

**Glossary term** (`06-Glossary/*.md`) — use `_templates/Glossary-Term.md`:
- `## In plain words` — 1–2 jargon-free sentences.
- `## Everyday picture` — the one best-fit analogy.
- `## In real code` — 4–6 lines of real syntax, each annotated back to the picture (Rule 8).
- `## Where you'll meet it` — one concrete place a beginner sees it.
- `## See also` — links.

**Mental-model note** (`01-Mental-Models/*.md`): plain words → everyday picture → "what this
lets you do." No "In the spine" mechanical framing.

**Weekly note** (`05-Weeks/*.md`): plain-language theme, ELI5 focus bullets, the everyday
pictures in play, predict-then-peek prompts, self-checks phrased as "Could I explain…", and a
**Reading list** link. The reading list is **mandatory every week** — a curated
`07-Resources/Week-NN-Reading.md` (core + deeper), mirrored as the "Read more" tab in the
interactive page. No week ships without one.

---

## Concept → everyday-picture map

The growing source of truth. Add a row whenever a concept is first written. Anything still
showing a mechanical analogy in V2 content is a bug to fix during propagation.

| Concept | Everyday picture | Real-code shape it shows up as |
|---|---|---|
| client | A customer at a restaurant table — the one who orders. | `await fetch("/order")` — the browser asking |
| server | The kitchen — it receives orders and sends back food. | a route that answers, e.g. `app.get("/order", ...)` |
| frontend | The dining room: the part you see, sit in, and touch. | `.tsx`/`.html`/`.css` — what's drawn on screen |
| backend | The kitchen behind the door: where the work happens, out of sight. | server files that save data / check passwords |
| runtime | The kitchen being *open and cooking* — carries out the instructions, not the recipe on paper. | `python app.py` / `node main.js` — the thing that *runs* it |
| the cloud | A computer you rent somewhere else — like a storage unit across town. | a URL like `https://api.example.com` (server lives elsewhere) |
| entry point | The front door / the "start here" page — where everything begins. | `index.html` → `src/main.ts`; Python `if __name__ == "__main__":` |
| repository (repo) | One project folder — a binder of all the project's files. | the top folder you open in an editor |
| request | Placing an order: "I'd like this, please." | `fetch(url)` / `requests.get(url)` |
| response | The food coming back to your table. | `const data = await response.json()` |
| file | One sheet of paper with writing on it. | `main.ts`, `app.py` — a single `.ext` document |
| folder | A drawer that holds related sheets of paper. | `src/`, `public/` — a name ending in `/` |
| source-folder (`src/`) | The drawer with *your* recipe pages in it. | `src/` — the code you actually write/read |
| installed-parts (`node_modules/`, `.venv/`) | Pre-made ingredients you bought — don't edit them. | huge auto-made folder; never opened by hand |
| package.json / requirements.txt | The parts label on the box — lists what the project needs. | `"dependencies": { "three": "^0.169.0" }` |
| terminal | The kitchen's back window — where the *cook's* notes & errors print. | the black text window running `python app.py` |
| browser console | The dining-room window — where the *page's* notes & errors print. | DevTools Console; `console.log(...)`, red errors |
| print vs return | Print = saying it out loud so you hear it. Return = handing the plate back to be used. | `print(x)` shows you; `return x` hands a value back |
| error / where it prints | A note saying "something went wrong" — and *which window* it shows up in. | `NameError: ...` (terminal) vs `Uncaught TypeError` (console) |

*(Extend this table as later weeks are written. Each new concept must land here before its
note is considered done.)*

---

## Words to avoid → say instead

| Don't write | Write |
|---|---|
| initiates a request | asks for something |
| long-running process | a program that stays open, waiting |
| executes | runs / carries out |
| instantiate | make / create |
| the codebase | all the project's files |
| invoke a function | use a recipe |
| parse | read and make sense of |
