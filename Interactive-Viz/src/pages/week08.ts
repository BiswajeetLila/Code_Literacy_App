import { mountCards } from "../cards.ts";
import { mountCodeBlock } from "../codeBlock.ts";
import { mountWidget } from "../content/registry.ts";
import { WEEK_08 } from "../content/weeks/week08.ts";
import { mountResources } from "../resources.ts";
import { setupTabs } from "../tabs.ts";

export function renderWeek08(host: HTMLElement): void {
  host.innerHTML = `
    <section class="week-manual week-08">
      <header class="doc-head week-head">
        <p class="doc-tag">CODE LITERACY &middot; V2 &middot; MANUAL 08 &middot; WEEK 8 OF 11</p>
        <h1>FIG. 8 - Check the AI's work before you say yes</h1>
        <p class="subtitle">
          This is the Verify step. Treat every AI change like a suggested edit: inspect it,
          name the risk, and accept only what you can explain.
        </p>
      </header>

      <nav class="tabs" role="tablist" aria-label="Week 08 lessons">
        <button class="tab" role="tab" data-tab="w8-l0" aria-selected="true">
          <span class="tab-num">00</span>Start here
        </button>
        <button class="tab" role="tab" data-tab="w8-l1" aria-selected="false">
          <span class="tab-num">01</span>Approve or Reject
        </button>
        <button class="tab" role="tab" data-tab="w8-l2" aria-selected="false">
          <span class="tab-num">02</span>Bug Report
        </button>
        <button class="tab" role="tab" data-tab="w8-l3" aria-selected="false">
          <span class="tab-num">03</span>FAQ
        </button>
        <button class="tab" role="tab" data-tab="w8-l4" aria-selected="false">
          <span class="tab-num">04</span>Read more
        </button>
      </nav>

      <section class="panel" id="panel-w8-l0" role="tabpanel">
        <h2>Your job changes here</h2>
        <p class="ftue-lead">
          Vibe coding starts with a wish. Agentic coding lets an AI inspect, plan, change, and
          save. Spec-driven development gives that work a clear target. In all three, the human
          still owns the last step: verify what changed.
        </p>
        <div class="week08-loop" aria-label="Plan, execute, verify loop">
          <div><span>01</span><b>Plan</b><p>Ask what the agent intends to change.</p></div>
          <div><span>02</span><b>Execute</b><p>Let it make a small, reviewable change.</p></div>
          <div class="current"><span>03</span><b>Verify</b><p>Read the diff and test the claim.</p></div>
        </div>
        <ol class="ftue-roadmap">
          <li><b>01 &middot; Approve or Reject</b> - catch a bad diff before it becomes your code.</li>
          <li><b>02 &middot; Bug Report</b> - hand the exact evidence back in one useful message.</li>
          <li><b>03-04 &middot; Reference</b> - keep the durable words and official reading nearby.</li>
        </ol>
      </section>

      <section class="panel week08-lesson" id="panel-w8-l1" role="tabpanel" hidden>
        <div class="week08-lesson-head">
          <p class="route-kicker">TRACK CHANGES FOR CODE</p>
          <h2>Approve or Reject</h2>
          <p>Pick a verdict and a reason. The result tells you what the proposed edit would do.</p>
        </div>
        <div id="approve-reject-lab"></div>
        <h2>Read the safe shape</h2>
        <div id="code-w8-l1"></div>
        <h2>Predict, then peek</h2>
        <div id="cards-w8-l1" class="cards"></div>
        <p class="week08-reflection"><b>Reflection:</b> Which changed line carried the behavior risk, and what evidence proved it?</p>
      </section>

      <section class="panel week08-lesson" id="panel-w8-l2" role="tabpanel" hidden>
        <div class="week08-lesson-head">
          <p class="route-kicker">EVIDENCE, NOT NOISE</p>
          <h2>Build the Bug Report</h2>
          <p>Select the clues another person needs, then submit the smallest useful report.</p>
        </div>
        <div id="bug-report-lab"></div>
        <h2>Read the three-part shape</h2>
        <div id="code-w8-l2"></div>
        <h2>Predict, then peek</h2>
        <div id="cards-w8-l2" class="cards"></div>
        <p class="week08-reflection"><b>Reflection:</b> Could another person reproduce the failure from your report without asking a follow-up question?</p>
      </section>

      <section class="panel" id="panel-w8-l3" role="tabpanel" hidden>
        <h2>FAQ - review words</h2>
        <p class="hint">Short meanings for the words you need while checking AI work.</p>
        <div class="faq-list">
          ${WEEK_08.glossaryTerms.map((item) => `
            <article class="faq-item">
              <h3>${item.term}</h3>
              <p>${item.plain}</p>
            </article>
          `).join("")}
        </div>
        <a class="text-link" href="#/glossary">Open the full glossary with code examples</a>
      </section>

      <section class="panel" id="panel-w8-l4" role="tabpanel" hidden>
        <h2>Read more - Week 08 reading list</h2>
        <div id="reading-w8"></div>
      </section>
    </section>
  `;

  setupTabs((id) => {
    if (id === "w8-l1") void buildLesson(host, "w8-l1", "#approve-reject-lab");
    if (id === "w8-l2") void buildLesson(host, "w8-l2", "#bug-report-lab");
    if (id === "w8-l4") mountResources(host.querySelector("#reading-w8")!, WEEK_08.resources);
  }, host);
}

async function buildLesson(root: HTMLElement, lessonId: string, widgetSelector: string): Promise<void> {
  const lesson = WEEK_08.lessons.find((item) => item.id === lessonId);
  if (!lesson) return;

  const widgetHost = root.querySelector<HTMLElement>(widgetSelector);
  if (!widgetHost) return;
  try {
    if (!(await mountWidget(lesson.widgetId, widgetHost))) return;
  } catch (error) {
    if (!widgetHost.isConnected) return;
    widgetHost.innerHTML = `<p class="lab-load-error" role="alert">This lab could not load. Reload the page and try again.</p>`;
    console.error(error);
  }
  if (!root.isConnected) return;
  const codeHost = root.querySelector<HTMLElement>(`#code-${lessonId}`);
  const cardsHost = root.querySelector<HTMLElement>(`#cards-${lessonId}`);
  if (!codeHost || !cardsHost) return;
  mountCodeBlock(codeHost, lesson.code);
  mountCards(cardsHost, WEEK_08.cards.filter((card) => card.lessonId === lessonId));
}
