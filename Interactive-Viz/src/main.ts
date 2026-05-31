// main.ts — THE ENTRY POINT.
// index.html loads this first. It sets up the three tabbed lessons and builds
// each one the first time you open its tab.

import { setupTabs } from "./tabs.ts";
import { Restaurant } from "./restaurant.ts";
import { mountFileTree } from "./fileTree.ts";
import { mountErrorWindows } from "./errorWindows.ts";
import { mountCodeBlock } from "./codeBlock.ts";
import { mountResources, WEEK_01_RESOURCES } from "./resources.ts";
import {
  mountCards,
  LESSON_1_CARDS,
  LESSON_2_CARDS,
  LESSON_3_CARDS,
} from "./cards.ts";

// Each lesson builds itself once, the first time its tab is shown.
setupTabs((id) => {
  if (id === "l1") buildLesson1();
  if (id === "l2") buildLesson2();
  if (id === "l3") buildLesson3();
  if (id === "l4") buildLesson4();
});

// "Start here" → jump to Lesson 01 (just click the tab button).
document
  .querySelector("#btn-start")
  ?.addEventListener("click", () =>
    document.querySelector<HTMLButtonElement>('.tab[data-tab="l1"]')!.click(),
  );

// ---- Lesson 1: the restaurant + a real fetch() ----
function buildLesson1(): void {
  const scene = document.querySelector<HTMLElement>("#scene")!;
  const phase = document.querySelector<HTMLElement>("#phase")!;

  const restaurant = new Restaurant();
  restaurant.mount(scene, (text) => (phase.textContent = text));

  document.querySelector("#btn-play")!.addEventListener("click", () => restaurant.play());
  document.querySelector("#btn-step")!.addEventListener("click", () => restaurant.step());
  document.querySelector("#btn-reset")!.addEventListener("click", () => restaurant.reset());
  const ortho = document.querySelector<HTMLInputElement>("#chk-ortho")!;
  ortho.addEventListener("change", () => restaurant.setOrthographic(ortho.checked));

  mountCodeBlock(document.querySelector("#code-l1")!, {
    title: "the browser orders, then shows the food",
    lang: "javascript",
    lines: [
      { code: 'const response = await fetch("https://api.cafe.com/order")', note: "place the order" },
      { code: "const food = await response.json()", note: "the food comes back" },
      { code: "showOnScreen(food)", note: "serve it at the table" },
    ],
  });

  mountCards(document.querySelector("#cards-l1")!, LESSON_1_CARDS);
}

// ---- Lesson 2: files + package.json + print vs return ----
function buildLesson2(): void {
  mountFileTree(document.querySelector("#filetree")!);

  mountCodeBlock(document.querySelector("#code-l2-pkg")!, {
    title: "package.json — the parts label",
    lang: "json",
    lines: [
      { code: "{" },
      { code: '  "name": "my-app",', note: "the project's name" },
      { code: '  "dependencies": {', note: "outside parts it needs" },
      { code: '    "three": "^0.169.0"', note: "one part + its version" },
      { code: "  }" },
      { code: "}" },
    ],
  });

  mountCodeBlock(document.querySelector("#code-l2-pr")!, {
    title: "print vs return",
    lang: "python",
    lines: [
      { code: "def total(a, b):" },
      { code: "    print(a + b)", note: "SHOWS the answer to you" },
      { code: "    return a + b", note: "HANDS the answer back" },
      { code: "" },
      { code: "x = total(2, 3)", note: "x holds 5 (from return)" },
    ],
  });

  mountCards(document.querySelector("#cards-l2")!, LESSON_2_CARDS);
}

// ---- Lesson 3: terminal vs browser console ----
function buildLesson3(): void {
  mountErrorWindows(document.querySelector("#errorwindows")!);
  mountCards(document.querySelector("#cards-l3")!, LESSON_3_CARDS);
}

// ---- Lesson 4: the reading list (mandatory every week) ----
function buildLesson4(): void {
  mountResources(document.querySelector("#reading")!, WEEK_01_RESOURCES);
}
