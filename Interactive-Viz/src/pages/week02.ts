import { mountCards } from "../cards.ts";
import { mountCodeBlock } from "../codeBlock.ts";
import { mountWidget } from "../content/registry.ts";
import { WEEK_02 } from "../content/weeks/week02.ts";
import { mountResources } from "../resources.ts";
import { setupTabs } from "../tabs.ts";

export function renderWeek02(host: HTMLElement): void {
  host.innerHTML = `
    <section class="week-manual week-02">
      <header class="doc-head week-head">
        <p class="doc-tag">CODE LITERACY &middot; V2 &middot; MANUAL 02 &middot; WEEK 2 OF 11</p>
        <h1>FIG. 2 - Check the shopping list before install</h1>
        <p class="subtitle">
          A dependency list says which outside parts are allowed. A lockfile records the exact
          parts installed. An import name still needs verification before you trust it.
        </p>
      </header>

      <nav class="tabs" role="tablist" aria-label="Week 02 lessons">
        <button class="tab" role="tab" data-tab="w2-l0" aria-selected="true"><span class="tab-num">00</span>Start here</button>
        <button class="tab" role="tab" data-tab="w2-l1" aria-selected="false"><span class="tab-num">01</span>List &amp; Receipt</button>
        <button class="tab" role="tab" data-tab="w2-l2" aria-selected="false"><span class="tab-num">02</span>Spot the Fake</button>
        <button class="tab" role="tab" data-tab="w2-l3" aria-selected="false"><span class="tab-num">03</span>FAQ</button>
        <button class="tab" role="tab" data-tab="w2-l4" aria-selected="false"><span class="tab-num">04</span>Read more</button>
      </nav>

      <section class="panel" id="panel-w2-l0" role="tabpanel">
        <h2>Read the list, receipt, and label</h2>
        <p class="ftue-lead">
          You will predict which versions a package list allows, reveal the exact lockfile
          receipt, and classify imports that may be real, invented, or one-letter knock-offs.
        </p>
        <div class="w2-start-grid" aria-label="Week 2 learning path">
          <div><span>LIST</span><b>Allowed range</b><p>package.json names acceptable editions.</p></div>
          <div><span>RECEIPT</span><b>Exact install</b><p>The lockfile records what arrived.</p></div>
          <div><span>VERIFY</span><b>Package identity</b><p>Check the registry before installing.</p></div>
        </div>
        <ol class="ftue-roadmap">
          <li><b>01 &middot; Shopping List &amp; Receipt</b> - predict caret, tilde, and exact ranges.</li>
          <li><b>02 &middot; Spot the Fake</b> - distinguish real, invented, and knock-off names.</li>
          <li><b>03-04 &middot; Reference</b> - keep the durable terms and official docs nearby.</li>
        </ol>
      </section>

      <section class="panel" id="panel-w2-l1" role="tabpanel" hidden>
        <div id="week02-shopping-lab"></div>
        <h2>Read the real files</h2>
        <div id="code-w2-l1"></div>
        <h2>Predict, then peek</h2>
        <div id="cards-w2-l1" class="cards"></div>
        <p class="w2-reflection"><b>Reflection:</b> Why can two clean installs use different versions without a lockfile?</p>
      </section>

      <section class="panel" id="panel-w2-l2" role="tabpanel" hidden>
        <div id="week02-fake-lab"></div>
        <h2>Read the import shape</h2>
        <div id="code-w2-l2"></div>
        <h2>Predict, then peek</h2>
        <div id="cards-w2-l2" class="cards"></div>
        <p class="w2-reflection"><b>Reflection:</b> What evidence would make you trust a package suggested by an AI?</p>
      </section>

      <section class="panel" id="panel-w2-l3" role="tabpanel" hidden>
        <h2>FAQ - dependency checks</h2>
        <p class="hint">Short meanings for the words that block safe package decisions.</p>
        <div class="faq-list">
          ${WEEK_02.glossaryTerms.map((item) => `
            <article class="faq-item"><h3>${item.term}</h3><p>${item.plain}</p></article>
          `).join("")}
        </div>
        <a class="text-link" href="#/glossary">Open the full glossary</a>
      </section>

      <section class="panel" id="panel-w2-l4" role="tabpanel" hidden>
        <h2>Read more - Week 02</h2>
        <div id="reading-w2"></div>
      </section>
    </section>
  `;

  setupTabs((id) => {
    if (id === "w2-l1") void buildLesson(host, "w2-l1", "#week02-shopping-lab");
    if (id === "w2-l2") void buildLesson(host, "w2-l2", "#week02-fake-lab");
    if (id === "w2-l4") mountResources(host.querySelector("#reading-w2")!, WEEK_02.resources);
  }, host);
}

async function buildLesson(root: HTMLElement, lessonId: string, widgetSelector: string): Promise<void> {
  const lesson = WEEK_02.lessons.find((item) => item.id === lessonId);
  if (!lesson) return;

  const widgetHost = root.querySelector<HTMLElement>(widgetSelector);
  if (!widgetHost) return;
  try {
    if (!(await mountWidget(lesson.widgetId, widgetHost))) return;
  } catch (error) {
    if (!widgetHost.isConnected) return;
    widgetHost.innerHTML = `<p class="lab-load-error" role="alert">This lab could not load. Reload and try again.</p>`;
    console.error(error);
  }
  if (!root.isConnected) return;
  const codeHost = root.querySelector<HTMLElement>(`#code-${lessonId}`);
  const cardsHost = root.querySelector<HTMLElement>(`#cards-${lessonId}`);
  if (!codeHost || !cardsHost) return;
  mountCodeBlock(codeHost, lesson.code);
  mountCards(cardsHost, WEEK_02.cards.filter((card) => card.lessonId === lessonId));
}
