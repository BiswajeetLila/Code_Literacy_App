export function renderGlossaryPlaceholder(host: HTMLElement): void {
  host.innerHTML = `
    <section class="route-panel placeholder-panel">
      <p class="route-kicker">GLOSSARY</p>
      <h2>Searchable terms are planned</h2>
      <p>
        This route is reserved for the Week 1 glossary slice: client, server,
        frontend, backend, runtime, entry point, repository, terminal, browser
        console, and print vs return.
      </p>
      <a class="app-button" href="#/week/01">Review Week 01 terms in context</a>
    </section>
  `;
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
