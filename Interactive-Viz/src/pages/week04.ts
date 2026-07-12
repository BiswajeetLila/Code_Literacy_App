import { mountCards } from "../cards.ts";
import { mountCodeBlock } from "../codeBlock.ts";
import { mountWidget } from "../content/registry.ts";
import { WEEK_04 } from "../content/weeks/week04.ts";
import { mountResources } from "../resources.ts";
import { setupTabs } from "../tabs.ts";

export function renderWeek04(host: HTMLElement): void {
  host.innerHTML = `
    <section class="week-manual week-04">
      <header class="doc-head week-head"><p class="doc-tag">CODE LITERACY &middot; V2 &middot; MANUAL 04 &middot; WEEK 4 OF 11</p><h1>FIG. 4 - Follow the value back to its source</h1><p class="subtitle">A screen value is the last stop, not the source. Trace its parcel route through modules and props, or find the state whiteboard that stores it.</p></header>
      <nav class="tabs" role="tablist" aria-label="Week 04 lessons"><button class="tab" role="tab" data-tab="w4-l0" aria-selected="true"><span class="tab-num">00</span>Start here</button><button class="tab" role="tab" data-tab="w4-l1" aria-selected="false"><span class="tab-num">01</span>Follow Parcel</button><button class="tab" role="tab" data-tab="w4-l2" aria-selected="false"><span class="tab-num">02</span>Whiteboard</button><button class="tab" role="tab" data-tab="w4-l3" aria-selected="false"><span class="tab-num">03</span>FAQ</button><button class="tab" role="tab" data-tab="w4-l4" aria-selected="false"><span class="tab-num">04</span>Read more</button></nav>
      <section class="panel" id="panel-w4-l0" role="tabpanel"><h2>Screen last, source first</h2><p class="ftue-lead">You will inspect a value moving through a 3D project route, then change state and watch the screen redraw from its source of truth.</p><div class="w4-start"><div><b>Variable</b><p>A label on a value.</p></div><div><b>Props</b><p>A parcel handed to a component.</p></div><div><b>State</b><p>The room's current whiteboard.</p></div></div><ol class="ftue-roadmap"><li><b>01 &middot; Follow the Parcel</b> - rotate, zoom, click, and trace.</li><li><b>02 &middot; The Whiteboard</b> - predict a state-driven redraw.</li><li><b>03-04 &middot; Reference</b> - terms and official reading.</li></ol></section>
      <section class="panel" id="panel-w4-l1" role="tabpanel" hidden><div id="week04-flow-lab"></div><h2>Read the parcel route</h2><div id="code-w4-l1"></div><h2>Predict, then peek</h2><div id="cards-w4-l1" class="cards"></div><p class="w4-reflection"><b>Reflection:</b> Which desk created the value, and which desk only displayed it?</p></section>
      <section class="panel" id="panel-w4-l2" role="tabpanel" hidden><div id="week04-state-lab"></div><h2>Read the state update</h2><div id="code-w4-l2"></div><h2>Predict, then peek</h2><div id="cards-w4-l2" class="cards"></div><p class="w4-reflection"><b>Reflection:</b> Why is changing visible text directly different from changing state?</p></section>
      <section class="panel" id="panel-w4-l3" role="tabpanel" hidden><h2>FAQ - value-flow words</h2><div class="faq-list">${WEEK_04.glossaryTerms.map((item) => `<article class="faq-item"><h3>${item.term}</h3><p>${item.plain}</p></article>`).join("")}</div><a class="text-link" href="#/glossary">Open the full glossary</a></section>
      <section class="panel" id="panel-w4-l4" role="tabpanel" hidden><h2>Read more - Week 04</h2><div id="reading-w4"></div></section>
    </section>
  `;
  setupTabs((id) => {
    if (id === "w4-l1") void buildLesson(host, "w4-l1", "#week04-flow-lab");
    if (id === "w4-l2") void buildLesson(host, "w4-l2", "#week04-state-lab");
    if (id === "w4-l4") mountResources(host.querySelector("#reading-w4")!, WEEK_04.resources);
  }, host);
}
async function buildLesson(root: HTMLElement, lessonId: string, widgetSelector: string): Promise<void> {
  const lesson = WEEK_04.lessons.find((item) => item.id === lessonId); if (!lesson) return;
  const widgetHost = root.querySelector<HTMLElement>(widgetSelector);
  if (!widgetHost) return;
  try { if (!(await mountWidget(lesson.widgetId, widgetHost))) return; } catch (error) { if (!widgetHost.isConnected) return; widgetHost.innerHTML = `<p class="lab-load-error" role="alert">This lab could not load. Reload and try again.</p>`; console.error(error); }
  if (!root.isConnected) return;
  const codeHost = root.querySelector<HTMLElement>(`#code-${lessonId}`);
  const cardsHost = root.querySelector<HTMLElement>(`#cards-${lessonId}`);
  if (!codeHost || !cardsHost) return;
  mountCodeBlock(codeHost, lesson.code);
  mountCards(cardsHost, WEEK_04.cards.filter((card) => card.lessonId === lessonId));
}
