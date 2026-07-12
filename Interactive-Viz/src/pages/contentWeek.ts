import { mountCards } from "../cards.ts";
import { mountCodeBlock } from "../codeBlock.ts";
import { mountWidget } from "../content/registry.ts";
import type { WeekData } from "../content/types.ts";
import { mountResources } from "../resources.ts";
import { setupTabs } from "../tabs.ts";
import { escapeHtml } from "../html.ts";

export type ContentWeekConfig = {
  figureTitle: string;
  subtitle: string;
  startTitle: string;
  startLead: string;
  reflections: [string, string];
};

export function renderContentWeek(host: HTMLElement, week: WeekData, config: ContentWeekConfig): void {
  const [first, second] = week.lessons;
  const prefix = `w${Number(week.meta.id)}`;
  host.innerHTML = `
    <section class="week-manual week-${week.meta.id}">
      <header class="doc-head week-head">
        <p class="doc-tag">CODE LITERACY &middot; V2 &middot; MANUAL ${week.meta.id} &middot; WEEK ${Number(week.meta.id)} OF 11</p>
        <h1>${escapeHtml(config.figureTitle)}</h1><p class="subtitle">${escapeHtml(config.subtitle)}</p>
      </header>
      <nav class="tabs" role="tablist" aria-label="Week ${week.meta.id} lessons">
        <button class="tab" role="tab" data-tab="${prefix}-l0" aria-selected="true"><span class="tab-num">00</span>Start here</button>
        <button class="tab" role="tab" data-tab="${first.id}" aria-selected="false"><span class="tab-num">01</span>${escapeHtml(first.title)}</button>
        <button class="tab" role="tab" data-tab="${second.id}" aria-selected="false"><span class="tab-num">02</span>${escapeHtml(second.title)}</button>
        <button class="tab" role="tab" data-tab="${prefix}-l3" aria-selected="false"><span class="tab-num">03</span>FAQ</button>
        <button class="tab" role="tab" data-tab="${prefix}-l4" aria-selected="false"><span class="tab-num">04</span>Read more</button>
      </nav>
      <section class="panel" id="panel-${prefix}-l0" role="tabpanel">
        <h2>${escapeHtml(config.startTitle)}</h2><p class="ftue-lead">${escapeHtml(config.startLead)}</p>
        <ol class="ftue-roadmap"><li><b>01 &middot; ${escapeHtml(first.title)}</b> - ${escapeHtml(first.summary)}</li><li><b>02 &middot; ${escapeHtml(second.title)}</b> - ${escapeHtml(second.summary)}</li><li><b>03-04 &middot; Reference</b> - terms and official reading after the interactions.</li></ol>
      </section>
      ${week.lessons.map((lesson, index) => `
        <section class="panel" id="panel-${lesson.id}" role="tabpanel" hidden>
          <div id="${lesson.id}-widget"></div><h2>Read the real shape</h2><div id="code-${lesson.id}"></div>
          <h2>Predict, then peek</h2><div id="cards-${lesson.id}" class="cards"></div>
          <p class="week-reflection"><b>Reflection:</b> ${escapeHtml(config.reflections[index])}</p>
        </section>
      `).join("")}
      <section class="panel" id="panel-${prefix}-l3" role="tabpanel" hidden><h2>FAQ - Week ${week.meta.id}</h2><div class="faq-list">${week.glossaryTerms.map((item) => `<article class="faq-item"><h3>${escapeHtml(item.term)}</h3><p>${escapeHtml(item.plain)}</p></article>`).join("")}</div><a class="text-link" href="#/glossary">Open the full glossary</a></section>
      <section class="panel" id="panel-${prefix}-l4" role="tabpanel" hidden><h2>Read more - Week ${week.meta.id}</h2><div id="reading-${prefix}"></div></section>
    </section>
  `;

  setupTabs((id) => {
    const lesson = week.lessons.find((item) => item.id === id);
    if (lesson) void buildLesson(host, week, lesson.id);
    if (id === `${prefix}-l4`) mountResources(host.querySelector(`#reading-${prefix}`)!, week.resources);
  }, host);
}

async function buildLesson(root: HTMLElement, week: WeekData, lessonId: string): Promise<void> {
  const lesson = week.lessons.find((item) => item.id === lessonId);
  if (!lesson) return;
  const widgetHost = root.querySelector<HTMLElement>(`#${lesson.id}-widget`);
  if (!widgetHost) return;
  try {
    if (!(await mountWidget(lesson.widgetId, widgetHost))) return;
  } catch (error) {
    if (!widgetHost.isConnected) return;
    widgetHost.innerHTML = `<p class="lab-load-error" role="alert">This lab could not load. Reload and try again.</p>`;
    console.error(error);
  }
  if (!root.isConnected) return;
  const codeHost = root.querySelector<HTMLElement>(`#code-${lesson.id}`);
  const cardsHost = root.querySelector<HTMLElement>(`#cards-${lesson.id}`);
  if (!codeHost || !cardsHost) return;
  mountCodeBlock(codeHost, lesson.code);
  mountCards(cardsHost, week.cards.filter((card) => card.lessonId === lesson.id));
}
