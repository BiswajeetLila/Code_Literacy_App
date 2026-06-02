// Predict-then-peek cards. Same idea as the review cards: read the question,
// say your answer out loud, then click to reveal. Guessing first is the point.

export type Card = { q: string; a: string };

export const LESSON_1_CARDS: Card[] = [
  {
    q: "You click a button and the page asks for data. Who is the client?",
    a: "Your browser is the client. It sends the request with fetch() and waits for the response.",
  },
  {
    q: "The screen pauses after you click. Where is the time being spent?",
    a: "In the round trip: request out, server work, and response back. That delay is latency.",
  },
  {
    q: "The server returns a 500. Which window should you check first?",
    a: "Check the terminal first. A 500 is a server-side failure, so the useful red line usually prints in the server's window.",
  },
  {
    q: "What does `await` do in `await fetch('/menu')`?",
    a: "It pauses on that line until the response comes back, so the next line can use the answer.",
  },
];

export const LESSON_2_CARDS: Card[] = [
  {
    q: "In a web app, which runs first: index.html or src/main.ts?",
    a: "index.html runs first. It is the front door, and it points the browser to src/main.ts.",
  },
  {
    q: "In a Python app, the command says `python app.py`. Where do you start reading?",
    a: "Start at app.py. The command tells you the entry file, then imports point to the next files.",
  },
  {
    q: "You see `node_modules/` or `.venv/`. Do you edit those folders?",
    a: "No. Those are installed parts. Read package.json or requirements.txt to know what they contain.",
  },
  {
    q: "What does a parts label file tell you?",
    a: "package.json or requirements.txt tells you which outside packages the project needs. It is the label, not the installed parts themselves.",
  },
];

export const LESSON_3_CARDS: Card[] = [
  {
    q: "A Python program crashes. Which window shows the error: the terminal or the browser console?",
    a: "The terminal. That is the server/Python side. Browser console is for the page's own JavaScript.",
  },
  {
    q: "A button on a webpage does nothing and you suspect the page's code. Where do you look?",
    a: "The browser console in DevTools. That is where the page's JavaScript prints logs and red errors.",
  },
  {
    q: "You read `NameError: name 'order' is not defined`. In plain words?",
    a: "The code used a name (`order`) that was never created. Usually a typo or a missing line that should have made `order` first.",
  },
  {
    q: "The browser says a fetch returned 500. Does that prove the bug is in the browser code?",
    a: "No. A 500 means the server failed while answering. Check the terminal first, then use the browser network details for context.",
  },
];

export const WEEK_2_LESSON_1_CARDS: Card[] = [
  {
    q: "Does `package.json` contain the downloaded code for every package?",
    a: "No. It is the shopping list. The installed code lands in `node_modules/` after `npm install`.",
  },
  {
    q: "A Python project has `requirements.txt`. Which command usually reads that list?",
    a: "`pip install -r requirements.txt` reads the list and installs the packages into the Python environment.",
  },
  {
    q: "Why can an import fail even when the import line is spelled correctly?",
    a: "The package may not be installed yet. Read the list, run the install command, then try the import again.",
  },
];

/** Build a set of cards into a container. */
export function mountCards(container: HTMLElement, cards: Card[]): void {
  container.innerHTML = "";

  for (const card of cards) {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <div class="card-q" role="button" tabindex="0">
        <span>${card.q}</span>
        <span class="card-reveal">reveal</span>
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
