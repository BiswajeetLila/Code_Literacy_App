import { WEEK_2_LESSON_1_CARDS, mountCards } from "../cards.ts";
import { mountDependencySupplyLab } from "../dependencySupplyLab.ts";
import { setupTabs } from "../tabs.ts";

const WEEK_02_FAQ = [
  {
    term: "dependency",
    meaning: "An outside package your project uses instead of writing that code yourself.",
  },
  {
    term: "package.json",
    meaning: "A web project's dependency list. It names packages and versions.",
  },
  {
    term: "requirements.txt",
    meaning: "A Python dependency list. `pip install -r requirements.txt` reads it.",
  },
  {
    term: "node_modules/",
    meaning: "The installed web packages. Do not edit it by hand.",
  },
  {
    term: ".venv/",
    meaning: "A Python project's local installed-package box.",
  },
  {
    term: "import",
    meaning: "A line that brings an installed package into the current file so code can use it.",
  },
];

const WEEK_02_RESOURCES = [
  {
    title: "npm: About packages and modules",
    source: "npm docs",
    url: "https://docs.npmjs.com/about-packages-and-modules",
    why: "The official web-package model: packages are named things you install and import.",
  },
  {
    title: "Python Packaging User Guide: Installing packages",
    source: "PyPA",
    url: "https://packaging.python.org/en/latest/tutorials/installing-packages/",
    why: "The official beginner path for `pip install` and Python package environments.",
  },
  {
    title: "MDN: JavaScript modules",
    source: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
    why: "A practical reference for `import` once the shopping-list idea is clear.",
  },
];

export function renderWeek02(host: HTMLElement): void {
  host.innerHTML = `
    <section class="week-manual week-02">
      <header class="doc-head week-head">
        <p class="doc-tag">CODE LITERACY &middot; V2 &middot; MANUAL 02 &middot; WEEK 2 OF 10</p>
        <h1>FIG. 2 - Dependencies are a shopping list</h1>
        <p class="subtitle">
          Outside packages are normal. This week teaches where the list lives, how install fills
          the parts box, and why imports fail when the parts are missing.
        </p>
      </header>

      <nav class="tabs" role="tablist" aria-label="Week 02 lessons">
        <button class="tab" role="tab" data-tab="w2-l0" aria-selected="true">
          <span class="tab-num">00</span>Start here
        </button>
        <button class="tab" role="tab" data-tab="w2-l1" aria-selected="false">
          <span class="tab-num">01</span>Supply Lab
        </button>
        <button class="tab" role="tab" data-tab="w2-l2" aria-selected="false">
          <span class="tab-num">02</span>FAQ
        </button>
        <button class="tab" role="tab" data-tab="w2-l3" aria-selected="false">
          <span class="tab-num">03</span>Read more
        </button>
      </nav>

      <section class="panel" id="panel-w2-l0" role="tabpanel">
        <h2>This week</h2>
        <p class="ftue-lead">
          A dependency is an outside part the project uses. The beginner move is not memorizing
          every package. The beginner move is knowing where the shopping list is, which command
          installs it, and which import line uses it.
        </p>
        <ol class="ftue-roadmap">
          <li><b>01 &middot; Supply Lab</b> - watch parts move from list to installed box to import line.</li>
          <li><b>02 &middot; FAQ</b> - quick meanings for dependency words.</li>
          <li><b>03 &middot; Read more</b> - official docs after the model is in your head.</li>
        </ol>
      </section>

      <section class="panel dependency-lesson" id="panel-w2-l1" role="tabpanel" hidden>
        <div id="dependency-supply-lab"></div>
        <h2>Predict, then peek</h2>
        <div id="cards-w2-l1" class="cards"></div>
      </section>

      <section class="panel" id="panel-w2-l2" role="tabpanel" hidden>
        <h2>FAQ - dependency words</h2>
        <p class="hint">Short meanings for the words that block dependency errors.</p>
        <div class="faq-list">
          ${WEEK_02_FAQ.map((item) => `
            <article class="faq-item">
              <h3>${item.term}</h3>
              <p>${item.meaning}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="panel" id="panel-w2-l3" role="tabpanel" hidden>
        <h2>Read more - Week 02 reading list</h2>
        <p class="hint">Read these after you can explain list -> install -> import.</p>
        <div class="res-list">
          ${WEEK_02_RESOURCES.map((item) => `
            <a class="res-item" href="${item.url}" target="_blank" rel="noopener noreferrer">
              <div class="res-main">
                <span class="res-title">${item.title}</span>
                <span class="res-meta">${item.source}</span>
              </div>
              <p class="res-why">${item.why}</p>
              <span class="res-go">open ↗</span>
            </a>
          `).join("")}
        </div>
      </section>
    </section>
  `;

  setupTabs((id) => {
    if (id === "w2-l1") buildLesson1(host);
  }, host);
}

function buildLesson1(root: HTMLElement): void {
  mountDependencySupplyLab(root.querySelector("#dependency-supply-lab")!);
  mountCards(root.querySelector("#cards-w2-l1")!, WEEK_2_LESSON_1_CARDS);
}
