import { mountCards } from "../cards.ts";
import { mountCodeBlock } from "../codeBlock.ts";
import { mountWidget } from "../content/registry.ts";
import { WEEK_03 } from "../content/weeks/week03.ts";
import { mountResources } from "../resources.ts";
import { setupTabs } from "../tabs.ts";

export function renderWeek03(host: HTMLElement): void {
  host.innerHTML = `
    <section class="week-manual week-03">
      <header class="doc-head week-head"><p class="doc-tag">CODE LITERACY &middot; V2 &middot; MANUAL 03 &middot; WEEK 3 OF 11</p><h1>FIG. 3 - Functions are recipes with inputs</h1><p class="subtitle">Parameters are the named spaces on the card. Arguments are the real ingredients. Return hands the finished value back.</p></header>
      <nav class="tabs" role="tablist" aria-label="Week 03 lessons">
        <button class="tab" role="tab" data-tab="w3-l0" aria-selected="true"><span class="tab-num">00</span>Start here</button>
        <button class="tab" role="tab" data-tab="w3-l1" aria-selected="false"><span class="tab-num">01</span>Recipe Card</button>
        <button class="tab" role="tab" data-tab="w3-l2" aria-selected="false"><span class="tab-num">02</span>Trace Value</button>
        <button class="tab" role="tab" data-tab="w3-l3" aria-selected="false"><span class="tab-num">03</span>FAQ</button>
        <button class="tab" role="tab" data-tab="w3-l4" aria-selected="false"><span class="tab-num">04</span>Read more</button>
      </nav>
      <section class="panel" id="panel-w3-l0" role="tabpanel"><h2>Inputs, steps, result</h2><p class="ftue-lead">You will change arguments, predict a returned label, and trace one number through two functions while local names enter and leave scope.</p><div class="w3-start"><div><b>Parameters</b><p>Named spaces on the recipe.</p></div><div><b>Arguments</b><p>Real values placed into them.</p></div><div><b>Return</b><p>The result handed back.</p></div></div><ol class="ftue-roadmap"><li><b>01 &middot; Recipe Card</b> - change inputs and predict output.</li><li><b>02 &middot; Trace the Value</b> - scrub nested calls and scope.</li><li><b>03-04 &middot; Reference</b> - terms and official reading.</li></ol></section>
      <section class="panel" id="panel-w3-l1" role="tabpanel" hidden><div id="week03-recipe-lab"></div><h2>Read the function</h2><div id="code-w3-l1"></div><h2>Predict, then peek</h2><div id="cards-w3-l1" class="cards"></div><p class="w3-reflection"><b>Reflection:</b> Which part of a function call changes: the parameters or the arguments?</p></section>
      <section class="panel" id="panel-w3-l2" role="tabpanel" hidden><div id="week03-trace-lab"></div><h2>Read the value path</h2><div id="code-w3-l2"></div><h2>Predict, then peek</h2><div id="cards-w3-l2" class="cards"></div><p class="w3-reflection"><b>Reflection:</b> When did the name <code>price</code> stop being available?</p></section>
      <section class="panel" id="panel-w3-l3" role="tabpanel" hidden><h2>FAQ - function words</h2><div class="faq-list">${WEEK_03.glossaryTerms.map((item) => `<article class="faq-item"><h3>${item.term}</h3><p>${item.plain}</p></article>`).join("")}</div><a class="text-link" href="#/glossary">Open the full glossary</a></section>
      <section class="panel" id="panel-w3-l4" role="tabpanel" hidden><h2>Read more - Week 03</h2><div id="reading-w3"></div></section>
    </section>
  `;
  setupTabs((id) => {
    if (id === "w3-l1") void buildLesson(host, "w3-l1", "#week03-recipe-lab");
    if (id === "w3-l2") void buildLesson(host, "w3-l2", "#week03-trace-lab");
    if (id === "w3-l4") mountResources(host.querySelector("#reading-w3")!, WEEK_03.resources);
  }, host);
}

async function buildLesson(root: HTMLElement, lessonId: string, widgetSelector: string): Promise<void> {
  const lesson = WEEK_03.lessons.find((item) => item.id === lessonId);
  if (!lesson) return;
  const widgetHost = root.querySelector<HTMLElement>(widgetSelector);
  if (!widgetHost) return;
  try { if (!(await mountWidget(lesson.widgetId, widgetHost))) return; }
  catch (error) { if (!widgetHost.isConnected) return; widgetHost.innerHTML = `<p class="lab-load-error" role="alert">This lab could not load. Reload and try again.</p>`; console.error(error); }
  if (!root.isConnected) return;
  const codeHost = root.querySelector<HTMLElement>(`#code-${lessonId}`);
  const cardsHost = root.querySelector<HTMLElement>(`#cards-${lessonId}`);
  if (!codeHost || !cardsHost) return;
  mountCodeBlock(codeHost, lesson.code);
  mountCards(cardsHost, WEEK_03.cards.filter((card) => card.lessonId === lessonId));
}
