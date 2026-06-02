import { LESSON_1_CARDS, LESSON_2_CARDS, LESSON_3_CARDS, mountCards } from "../cards.ts";
import { mountErrorRoutingLab } from "../errorRoutingLab.ts";
import { mountProjectFolderLab } from "../projectFolderLab.ts";
import { mountResources, WEEK_01_RESOURCES } from "../resources.ts";
import { SignalLab, type SignalFocus, type SignalTripEvent } from "../signalLab.ts";
import { mountSignalCodeWalk } from "../signalCodeWalk.ts";
import { setupTabs } from "../tabs.ts";

export function renderWeek01(host: HTMLElement): void {
  host.innerHTML = `
    <section class="week-manual">
      <header class="doc-head week-head">
        <p class="doc-tag">CODE LITERACY &middot; V2 &middot; MANUAL 01 &middot; WEEK 1 OF 11</p>
        <h1>FIG. 1 - What is this thing on my screen?</h1>
        <p class="subtitle">
          Three short lessons. Each one starts with an action, then shows the
          <b>real code</b> shape behind it.
        </p>
      </header>

      <nav class="tabs" role="tablist" aria-label="Week 01 lessons">
        <button class="tab" role="tab" data-tab="l0" aria-selected="true">
          <span class="tab-num">00</span>Start here
        </button>
        <button class="tab" role="tab" data-tab="l1" aria-selected="false">
          <span class="tab-num">01</span>Round Trip Lab
        </button>
        <button class="tab" role="tab" data-tab="l2" aria-selected="false">
          <span class="tab-num">02</span>Files &amp; the front door
        </button>
        <button class="tab" role="tab" data-tab="l3" aria-selected="false">
          <span class="tab-num">03</span>Where errors show up
        </button>
        <button class="tab" role="tab" data-tab="l4" aria-selected="false">
          <span class="tab-num">04</span>FAQ
        </button>
        <button class="tab" role="tab" data-tab="l5" aria-selected="false">
          <span class="tab-num">05</span>Read more
        </button>
      </nav>

      <section class="panel" id="panel-l0" role="tabpanel">
        <h2>What is this?</h2>
        <p class="ftue-lead">
          A short course that teaches you to <b>read code</b> - the kind an AI
          writes for you - so you can tell good from broken, fix it, and steer
          the AI. You are <b>not</b> here to write code from a blank page.
        </p>

        <div class="ftue-grid">
          <div class="ftue-card">
            <span class="ftue-k">Q</span>
            <p><b>Am I learning to build a web app?</b></p>
            <p>No. You are learning to read code in general. This page is a live
              specimen because it is small enough to poke at.</p>
          </div>
          <div class="ftue-card">
            <span class="ftue-k">Q</span>
            <p><b>Which languages?</b></p>
            <p>Both worlds you will actually meet: <b>JavaScript/web</b> and
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
        <p class="hint">This is <b>Week 1 of an 11-week course</b>. Each week adds a manual like this one.</p>
        <ol class="ftue-roadmap">
          <li><b>01 &middot; Round Trip Lab</b> - how a screen asks for things and gets answers back.</li>
          <li><b>02 &middot; Files &amp; the front door</b> - what files/folders are, and which one runs first.</li>
          <li><b>03 &middot; Where errors show up</b> - the two windows a crash can print in, and how to read it.</li>
          <li><b>04 &middot; FAQ</b> - quick meanings for small words and syntax you will see here.</li>
          <li><b>05 &middot; Read more</b> - outside links once the week makes sense.</li>
        </ol>

        <h2>One thing before Lesson 2</h2>
        <p>
          The example project in Lesson 2 is a <b>web app layout</b> (a Vite project).
          We picked it on purpose: it is exactly what this page is built from, and it is
          the shape most AIs hand you. A <b>Python</b> project looks a little different:
          you will see <code>.venv/</code> instead of <code>node_modules/</code>, and
          <code>requirements.txt</code> instead of <code>package.json</code>.
        </p>

        <div class="controls">
          <button id="btn-start" type="button">Start with Lesson 01</button>
        </div>
      </section>

      <section class="panel lab-lesson" id="panel-l1" role="tabpanel" hidden>
        <div class="lab-head">
          <p class="route-kicker">INTERACTIVE LESSON 01</p>
          <h2>The round trip</h2>
          <p>
            A request leaves the client, the server works, and a response comes back.
            Click code lines or break the server to see the loop change.
          </p>
        </div>

        <div
          id="signal-stage"
          class="lab-stage"
          role="img"
          aria-label="Interactive diagram: a request signal leaves the client, reaches the server, and a response signal returns. Error mode stops the response."
        >
          <canvas id="signal-canvas"></canvas>
          <div class="lab-stage-overlay" aria-hidden="true">
            <span class="lab-node-tag lab-node-client">CLIENT / browser</span>
            <span class="lab-node-tag lab-node-server">SERVER</span>
            <span class="lab-viewport-tag">VIEWPORT 01</span>
          </div>
          <p id="signal-badge" class="lab-renderer-badge" aria-hidden="true">renderer pending</p>
        </div>
        <p id="signal-caption" class="lab-caption" role="status" aria-live="polite">
          Starting the round trip.
        </p>

        <div class="lab-workbench">
          <section class="lab-codewalk-wrap" aria-labelledby="lab-codewalk-title">
            <h3 id="lab-codewalk-title">Real code, linked to the scene</h3>
            <div id="signal-codewalk"></div>
          </section>

          <section class="lab-control-wrap" aria-labelledby="lab-controls-title">
            <h3 id="lab-controls-title">Controls</h3>
            <button id="signal-error" class="lab-toggle" type="button" aria-pressed="false">
              <span class="lab-led"></span>
              <span id="signal-error-label">Inject server error</span>
            </button>
            <label class="lab-slider">
              <span>Latency <b id="signal-latency-read">0ms</b></span>
              <input id="signal-latency" type="range" min="0" max="100" value="40" />
            </label>
            <label class="lab-slider">
              <span>Payload <b id="signal-payload-read">medium</b></span>
              <input id="signal-payload" type="range" min="0" max="100" value="50" />
            </label>
          </section>
        </div>

        <section class="lab-console-grid" aria-label="Live error windows">
          <article class="lab-console">
            <div class="lab-console-bar">
              <span>Terminal</span>
              <span>server window</span>
            </div>
            <ol id="signal-terminal" class="lab-console-log" aria-live="polite"></ol>
          </article>
          <article class="lab-console">
            <div class="lab-console-bar">
              <span>Browser console</span>
              <span>page window</span>
            </div>
            <ol id="signal-browser" class="lab-console-log" aria-live="polite"></ol>
          </article>
        </section>

        <h2>Predict, then peek</h2>
        <p class="hint">Say your answer out loud first. Then click to reveal.</p>
        <div id="cards-l1" class="cards"></div>
      </section>

      <section class="panel folder-lesson" id="panel-l2" role="tabpanel" hidden>
        <div id="project-folder-lab"></div>

        <h2>Predict, then peek</h2>
        <div id="cards-l2" class="cards"></div>
      </section>

      <section class="panel error-lesson" id="panel-l3" role="tabpanel" hidden>
        <div id="error-routing-lab"></div>

        <h2>Predict, then peek</h2>
        <div id="cards-l3" class="cards"></div>
      </section>

      <section class="panel" id="panel-l4" role="tabpanel" hidden>
        <h2>FAQ - quick meanings</h2>
        <p class="hint">Short answers for words and syntax that show up in Week 01. Use this when a small symbol blocks the bigger idea.</p>
        <div class="faq-list">
          ${WEEK_01_FAQ.map((item) => `
            <article class="faq-item">
              <h3>${item.term}</h3>
              <p>${item.meaning}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="panel" id="panel-l5" role="tabpanel" hidden>
        <h2>Read more - Week 01 reading list</h2>
        <div id="reading"></div>
      </section>
    </section>
  `;

  setupTabs((id) => {
    if (id === "l1") buildLesson1(host);
    if (id === "l2") buildLesson2(host);
    if (id === "l3") buildLesson3(host);
    if (id === "l5") buildLesson4(host);
  }, host);

  host
    .querySelector("#btn-start")
    ?.addEventListener("click", () =>
      host.querySelector<HTMLButtonElement>('.tab[data-tab="l1"]')!.click(),
    );
}

const WEEK_01_FAQ = [
  {
    term: "src/",
    meaning: "Short for source. This is usually the folder with your project's own code, not downloaded parts.",
  },
  {
    term: "JSON",
    meaning: "A plain data shape made of names and values. Curly braces hold the thing, colons connect names to values.",
  },
  {
    term: "package.json",
    meaning: "The web project's parts label. It names the app and lists outside packages it needs.",
  },
  {
    term: "node_modules/",
    meaning: "Downloaded web-project parts. It can be huge. Read the label in package.json; do not edit this folder by hand.",
  },
  {
    term: ".venv/",
    meaning: "A Python project's local box of installed parts. Same idea as node_modules, but for Python.",
  },
  {
    term: "requirements.txt",
    meaning: "A Python parts list. It tells Python which packages the project needs.",
  },
  {
    term: ".bat",
    meaning: "A Windows batch file. It is a small command script that runs terminal commands for you.",
  },
  {
    term: "terminal",
    meaning: "The text window where commands run and many Python/server errors print.",
  },
  {
    term: "browser console",
    meaning: "The browser's error window for the page's JavaScript. Open it from DevTools.",
  },
  {
    term: "fetch()",
    meaning: "JavaScript's way for the browser to ask another URL for data. In the round-trip lab, it sends the request.",
  },
  {
    term: "await",
    meaning: "Wait here until the answer comes back, then keep reading the next line.",
  },
  {
    term: "const",
    meaning: "Make a named box for a value that this code does not plan to replace.",
  },
  {
    term: "return",
    meaning: "Hand a value back to the code that asked for it.",
  },
  {
    term: "print()",
    meaning: "Show a value in the terminal so a human can read it.",
  },
  {
    term: "NameError",
    meaning: "Python used a name that has not been made yet. Often a typo or missing setup line.",
  },
  {
    term: "TypeError",
    meaning: "JavaScript was given the wrong kind of thing. Example: trying to call something that is not a function.",
  },
];

function buildLesson1(root: HTMLElement): void {
  const stage = root.querySelector<HTMLElement>("#signal-stage")!;
  const canvas = root.querySelector<HTMLCanvasElement>("#signal-canvas")!;
  const badge = root.querySelector<HTMLElement>("#signal-badge")!;
  const caption = root.querySelector<HTMLElement>("#signal-caption")!;
  const btnError = root.querySelector<HTMLButtonElement>("#signal-error")!;
  const errorLabel = root.querySelector<HTMLElement>("#signal-error-label")!;
  const latency = root.querySelector<HTMLInputElement>("#signal-latency")!;
  const payload = root.querySelector<HTMLInputElement>("#signal-payload")!;
  const latencyRead = root.querySelector<HTMLElement>("#signal-latency-read")!;
  const payloadRead = root.querySelector<HTMLElement>("#signal-payload-read")!;
  const terminal = root.querySelector<HTMLOListElement>("#signal-terminal")!;
  const browser = root.querySelector<HTMLOListElement>("#signal-browser")!;

  const lab = new SignalLab();
  lab.setCaptionSink((text) => {
    caption.textContent = text;
  });
  lab.setTripSink((event) => printTrip(terminal, browser, event));

  void startSignalLab(lab, stage, canvas, badge, caption, latencyRead);

  mountSignalCodeWalk(
    root.querySelector<HTMLElement>("#signal-codewalk")!,
    (focus: SignalFocus, note: string) => {
      lab.setFocus(focus);
      caption.textContent = note;
    },
  );

  btnError.addEventListener("click", () => {
    const on = btnError.getAttribute("aria-pressed") !== "true";
    btnError.setAttribute("aria-pressed", String(on));
    errorLabel.textContent = on ? "Server error: on" : "Inject server error";
    lab.setError(on);
  });

  latency.addEventListener("input", () => {
    lab.setLatency(Number(latency.value) / 100);
    latencyRead.textContent = `${lab.latencyMs}ms`;
  });

  payload.addEventListener("input", () => {
    const value = Number(payload.value);
    lab.setPayload(value / 100);
    payloadRead.textContent = payloadLabel(value);
  });

  mountCards(root.querySelector("#cards-l1")!, LESSON_1_CARDS);
}

async function startSignalLab(
  lab: SignalLab,
  stage: HTMLElement,
  canvas: HTMLCanvasElement,
  badge: HTMLElement,
  caption: HTMLElement,
  latencyRead: HTMLElement,
): Promise<void> {
  try {
    const backend = await lab.mount(canvas);
    badge.textContent = `renderer: ${backend}`;
    latencyRead.textContent = `${lab.latencyMs}ms`;

    const resize = () => lab.resize(stage.clientWidth, stage.clientHeight);
    resize();
    new ResizeObserver(resize).observe(stage);
  } catch (error) {
    console.error("[SignalLab] failed to start:", error);
    badge.textContent = "3D unavailable";
    caption.textContent =
      "The 3D lab could not start in this browser. The code walk still shows request -> server -> response.";
  }
}

function printTrip(
  terminal: HTMLOListElement,
  browser: HTMLOListElement,
  event: SignalTripEvent,
): void {
  printLine(terminal, "$", "GET /menu");
  printLine(browser, ">", "fetch('/menu')");
  if (event.ok) {
    printLine(terminal, "$", `200 ok - ${event.latencyMs}ms`, "ok");
    printLine(browser, ">", "rendered response", "ok");
  } else {
    printLine(terminal, "$", "500 internal server error", "err");
    printLine(browser, ">", "quiet: failure was server-side", "dim");
  }
}

function printLine(
  lane: HTMLOListElement,
  prompt: string,
  text: string,
  className = "",
): void {
  const item = document.createElement("li");
  item.dataset.prompt = prompt;
  item.textContent = text;
  if (className) item.className = className;
  lane.appendChild(item);
  while (lane.children.length > 6) lane.removeChild(lane.firstElementChild!);
}

function payloadLabel(value: number): string {
  if (value < 33) return "low";
  if (value < 67) return "medium";
  return "high";
}

function buildLesson2(root: HTMLElement): void {
  mountProjectFolderLab(root.querySelector("#project-folder-lab")!);
  mountCards(root.querySelector("#cards-l2")!, LESSON_2_CARDS);
}

function buildLesson3(root: HTMLElement): void {
  mountErrorRoutingLab(root.querySelector("#error-routing-lab")!);
  mountCards(root.querySelector("#cards-l3")!, LESSON_3_CARDS);
}

function buildLesson4(root: HTMLElement): void {
  mountResources(root.querySelector("#reading")!, WEEK_01_RESOURCES);
}
