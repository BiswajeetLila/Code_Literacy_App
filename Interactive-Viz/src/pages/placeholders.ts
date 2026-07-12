import { GLOSSARY_TERMS } from "../content/glossary.ts";
import { escapeHtml } from "../html.ts";

export function renderGlossaryPlaceholder(host: HTMLElement): void {
  host.innerHTML = `
    <section class="route-panel glossary-panel">
      <p class="route-kicker">GLOSSARY</p>
      <h2>Search the whole course</h2>
      <p>
        All Course 1 weeks share one searchable glossary. Each term includes plain words, one
        everyday picture, a real code shape, and the place you will meet it.
      </p>
      <label class="glossary-search">
        <span>Filter terms</span>
        <input id="glossary-filter" type="search" placeholder="Try diff, rules, or report" autocomplete="off">
      </label>
      <p id="glossary-count" class="hint" aria-live="polite"></p>
    </section>
    <section id="glossary-results" class="glossary-grid" aria-label="Glossary terms"></section>
  `;

  const input = host.querySelector<HTMLInputElement>("#glossary-filter")!;
  const results = host.querySelector<HTMLElement>("#glossary-results")!;
  const count = host.querySelector<HTMLElement>("#glossary-count")!;

  const render = () => {
    const query = input.value.trim().toLowerCase();
    const terms = GLOSSARY_TERMS.filter((item) =>
      [item.term, item.plain, item.picture, item.where].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );

    count.textContent = `${terms.length} ${terms.length === 1 ? "term" : "terms"} shown`;
    results.innerHTML = terms.length > 0
      ? terms.map((item) => `
          <article class="glossary-card" id="term-${item.slug}">
            <p class="route-kicker">WEEK ${item.weekId}</p>
            <h3>${escapeHtml(item.term)}</h3>
            <dl>
              <dt>In plain words</dt>
              <dd>${escapeHtml(item.plain)}</dd>
              <dt>Everyday picture</dt>
              <dd>${escapeHtml(item.picture)}</dd>
              <dt>In real code</dt>
              <dd><pre><code>${escapeHtml(item.code)}</code></pre></dd>
              <dt>Where you will meet it</dt>
              <dd>${escapeHtml(item.where)}</dd>
            </dl>
          </article>
        `).join("")
      : `<p class="glossary-empty">No matching term. Try a shorter word.</p>`;
  };

  input.addEventListener("input", render);
  render();
}

export function renderReviewPlaceholder(host: HTMLElement): void {
  host.innerHTML = `
    <section class="route-panel placeholder-panel">
      <p class="route-kicker">REVIEW</p>
      <h2>Spaced repetition is planned</h2>
      <p>
        This route is reserved for the in-app SRS slice. It will reuse each week's
        predict-then-peek cards, then let the learner grade again, good, or easy.
      </p>
      <a class="app-button" href="#/week/01">Use the Week 01 cards</a>
    </section>
  `;
}
