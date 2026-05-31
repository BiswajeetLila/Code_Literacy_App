import { setupTabs } from "../tabs.ts";
import { Restaurant } from "../restaurant.ts";
import { mountFileTree } from "../fileTree.ts";
import { mountErrorWindows } from "../errorWindows.ts";
import { mountCodeBlock } from "../codeBlock.ts";
import { mountResources, WEEK_01_RESOURCES } from "../resources.ts";
import {
  LESSON_1_CARDS,
  LESSON_2_CARDS,
  LESSON_3_CARDS,
  mountCards,
} from "../cards.ts";

export function renderWeek01(host: HTMLElement): void {
  host.innerHTML = `
    <section class="week-manual">
      <header class="doc-head week-head">
        <p class="doc-tag">CODE LITERACY &middot; V2 &middot; MANUAL 01 &middot; WEEK 1 OF 10</p>
        <h1>FIG. 1 - What is this thing on my screen?</h1>
        <p class="subtitle">
          Three short lessons. Each one shows you an everyday picture, then the
          <b>real code</b> it turns into.
        </p>
      </header>

      <nav class="tabs" role="tablist" aria-label="Week 01 lessons">
        <button class="tab" role="tab" data-tab="l0" aria-selected="true">
          <span class="tab-num">00</span>Start here
        </button>
        <button class="tab" role="tab" data-tab="l1" aria-selected="false">
          <span class="tab-num">01</span>Restaurant
        </button>
        <button class="tab" role="tab" data-tab="l2" aria-selected="false">
          <span class="tab-num">02</span>Files &amp; the front door
        </button>
        <button class="tab" role="tab" data-tab="l3" aria-selected="false">
          <span class="tab-num">03</span>Where errors show up
        </button>
        <button class="tab" role="tab" data-tab="l4" aria-selected="false">
          <span class="tab-num">04</span>Read more
        </button>
      </nav>

      <section class="panel" id="panel-l0" role="tabpanel">
        <h2>What is this?</h2>
        <p class="ftue-lead">
          A short course that teaches you to <b>read code</b> - the kind an AI
          writes for you - so you can tell good from broken, fix it, and steer
          the AI like a pro. You are <b>not</b> here to write code from a blank page.
        </p>

        <div class="ftue-grid">
          <div class="ftue-card">
            <span class="ftue-k">Q</span>
            <p><b>Am I learning to build a web app?</b></p>
            <p>No. You're learning to <i>read</i> code in general. This page just
              happens to be a small web app - we use it as a live specimen to poke at.</p>
          </div>
          <div class="ftue-card">
            <span class="ftue-k">Q</span>
            <p><b>Which languages?</b></p>
            <p>Both worlds you'll actually meet: <b>JavaScript/web</b> and
              <b>Python</b>. Same ideas, slightly different spelling.</p>
          </div>
          <div class="ftue-card">
            <span class="ftue-k">Q</span>
            <p><b>Do I need to install anything?</b></p>
            <p>No. Everything here runs in your browser. Click, predict, reveal.
              Guessing before peeking is the whole trick.</p>
          </div>
        </div>

        <h2>This week - 3 short lessons</h2>
        <p class="hint">This is <b>Week 1 of a 10-week course</b>. Each week adds a manual like this one.</p>
        <ol class="ftue-roadmap">
          <li><b>01 &middot; Restaurant</b> - how a screen <i>asks</i> for things and gets <i>answers</i> back.</li>
          <li><b>02 &middot; Files &amp; the front door</b> - what all those files/folders are, and which one runs first.</li>
          <li><b>03 &middot; Where errors show up</b> - the two windows a crash can print in, and how to read it.</li>
        </ol>

        <h2>One thing before Lesson 2</h2>
        <p>
          The example project in Lesson 2 is a <b>web app layout</b> (a "Vite" project).
          We picked it on purpose: it's exactly what this page is built from, and it's
          the shape most AIs hand you. A <b>Python</b> project looks a little different:
          you'll see <code>.venv/</code> instead of <code>node_modules/</code>, and
          <code>requirements.txt</code> instead of <code>package.json</code>.
        </p>

        <div class="controls">
          <button id="btn-start" type="button">Start with Lesson 01 &rarr;</button>
        </div>
      </section>

      <section class="panel" id="panel-l1" role="tabpanel" hidden>
        <h2>Ask &amp; answer - a restaurant</h2>
        <div id="scene" class="scene"></div>
        <div class="controls">
          <button id="btn-play" type="button">Play the order</button>
          <button id="btn-step" type="button">Step &rsaquo;</button>
          <button id="btn-reset" type="button">Reset</button>
          <label class="ortho-toggle">
            <input id="chk-ortho" type="checkbox" checked />
            Engineering view (flat)
          </label>
        </div>
        <p id="phase" class="phase-readout">Ready. Press "Play the order".</p>

        <h2>The same order, in real code</h2>
        <p>This is what "the browser places an order" actually looks like:</p>
        <div id="code-l1"></div>

        <ul class="lesson">
          <li><b>You are the client.</b> The customer who orders. (Your browser.)</li>
          <li><b>The kitchen is the server.</b> It waits, makes the food, sends it back.</li>
          <li><b>Dining room = frontend</b> (what you see). <b>Kitchen = backend</b> (hidden work).</li>
        </ul>

        <h2>Predict, then peek</h2>
        <p class="hint">Say your answer out loud first. Then click to reveal.</p>
        <div id="cards-l1" class="cards"></div>
      </section>

      <section class="panel" id="panel-l2" role="tabpanel" hidden>
        <h2>What's in a project folder?</h2>
        <div id="filetree"></div>

        <h2>The parts label, in real code</h2>
        <p>Every project has a <code>package.json</code> - its label:</p>
        <div id="code-l2-pkg"></div>

        <h2>print vs return</h2>
        <p>Two things beginners mix up. One <i>shows</i> you a value; the other <i>hands it back</i>.</p>
        <div id="code-l2-pr"></div>

        <h2>Predict, then peek</h2>
        <div id="cards-l2" class="cards"></div>
      </section>

      <section class="panel" id="panel-l3" role="tabpanel" hidden>
        <h2>Two windows: where errors show up</h2>
        <p>
          When something breaks, the error prints in <b>one</b> of two windows.
          Knowing which to check is half the fix.
        </p>
        <div id="errorwindows"></div>

        <h2>Predict, then peek</h2>
        <div id="cards-l3" class="cards"></div>
      </section>

      <section class="panel" id="panel-l4" role="tabpanel" hidden>
        <h2>Read more - Week 01 reading list</h2>
        <div id="reading"></div>
      </section>
    </section>
  `;

  setupTabs((id) => {
    if (id === "l1") buildLesson1(host);
    if (id === "l2") buildLesson2(host);
    if (id === "l3") buildLesson3(host);
    if (id === "l4") buildLesson4(host);
  }, host);

  host
    .querySelector("#btn-start")
    ?.addEventListener("click", () =>
      host.querySelector<HTMLButtonElement>('.tab[data-tab="l1"]')!.click(),
    );
}

function buildLesson1(root: HTMLElement): void {
  const scene = root.querySelector<HTMLElement>("#scene")!;
  const phase = root.querySelector<HTMLElement>("#phase")!;

  const restaurant = new Restaurant();
  restaurant.mount(scene, (text) => (phase.textContent = text));

  root.querySelector("#btn-play")!.addEventListener("click", () => restaurant.play());
  root.querySelector("#btn-step")!.addEventListener("click", () => restaurant.step());
  root.querySelector("#btn-reset")!.addEventListener("click", () => restaurant.reset());
  const ortho = root.querySelector<HTMLInputElement>("#chk-ortho")!;
  ortho.addEventListener("change", () => restaurant.setOrthographic(ortho.checked));

  mountCodeBlock(root.querySelector("#code-l1")!, {
    title: "the browser orders, then shows the food",
    lang: "javascript",
    lines: [
      { code: 'const response = await fetch("https://api.cafe.com/order")', note: "place the order" },
      { code: "const food = await response.json()", note: "the food comes back" },
      { code: "showOnScreen(food)", note: "serve it at the table" },
    ],
  });

  mountCards(root.querySelector("#cards-l1")!, LESSON_1_CARDS);
}

function buildLesson2(root: HTMLElement): void {
  mountFileTree(root.querySelector("#filetree")!);

  mountCodeBlock(root.querySelector("#code-l2-pkg")!, {
    title: "package.json - the parts label",
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

  mountCodeBlock(root.querySelector("#code-l2-pr")!, {
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

  mountCards(root.querySelector("#cards-l2")!, LESSON_2_CARDS);
}

function buildLesson3(root: HTMLElement): void {
  mountErrorWindows(root.querySelector("#errorwindows")!);
  mountCards(root.querySelector("#cards-l3")!, LESSON_3_CARDS);
}

function buildLesson4(root: HTMLElement): void {
  mountResources(root.querySelector("#reading")!, WEEK_01_RESOURCES);
}
