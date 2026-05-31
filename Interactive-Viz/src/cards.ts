// Predict-then-peek cards. Same idea as the Obsidian flashcards: read the
// question, say your answer OUT LOUD, then click to reveal. Guessing first is
// the whole point.

export type Card = { q: string; a: string };

export const LESSON_1_CARDS: Card[] = [
  {
    q: "You open a website. In restaurant terms, are you the customer or the kitchen?",
    a: "The customer (the client). You are the one ASKING — the browser places the order with fetch().",
  },
  {
    q: "You click a button and new text appears. Who did the asking — the dining room or the kitchen?",
    a: "The dining room (the frontend/client) asked the kitchen (the server). The server answered, and the page showed the answer.",
  },
  {
    q: "The code is sitting in a file but nothing happens. What is most likely missing?",
    a: "A runtime — the thing that actually RUNS the code. A recipe alone cooks no food; something has to follow it (a browser, or `python app.py`).",
  },
];

export const LESSON_2_CARDS: Card[] = [
  {
    q: "In a project folder, which runs FIRST — index.html or src/main.ts?",
    a: "index.html (the front door). The browser opens it first, and IT loads src/main.ts. Find the front door and you can follow everything else.",
  },
  {
    q: "You see a giant `node_modules/` folder. Do you read or edit it?",
    a: "Neither. Those are installed parts (pre-made ingredients you downloaded). You never edit them by hand — they're listed in package.json.",
  },
  {
    q: "What does `package.json` tell you at a glance?",
    a: "The parts label: the project's name and the list of outside pieces it needs (its dependencies). It's the box label, not the contents.",
  },
  {
    q: "`print(x)` vs `return x` — what's the difference?",
    a: "print SHOWS you the value (so you can read it). return HANDS the value back so other code can use it. Showing ≠ handing back.",
  },
];

export const LESSON_3_CARDS: Card[] = [
  {
    q: "A Python program crashes. Which window shows the error — the terminal or the browser console?",
    a: "The terminal — that's the cook's window (the server/Python side). Browser console is for the page's own JavaScript.",
  },
  {
    q: "A button on a webpage does nothing and you suspect the page's code. Where do you look?",
    a: "The browser console (open DevTools). That's the dining-room window — where the page's JavaScript prints its logs and red errors.",
  },
  {
    q: "You read `NameError: name 'order' is not defined`. In plain words?",
    a: "The code used a name ('order') that was never created. Usually a typo or a missing line that should have made 'order' first.",
  },
];

/** Build a set of cards into a container. */
export function mountCards(container: HTMLElement, cards: Card[]): void {
  for (const card of cards) {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <div class="card-q" role="button" tabindex="0">
        <span>${card.q}</span>
        <span class="card-reveal">reveal ▾</span>
      </div>
      <div class="card-a">${card.a}</div>
    `;

    const question = el.querySelector<HTMLElement>(".card-q")!;
    const toggle = () => el.classList.toggle("open");
    question.addEventListener("click", toggle);
    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    container.appendChild(el);
  }
}
