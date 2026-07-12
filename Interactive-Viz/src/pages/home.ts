export function renderHome(host: HTMLElement): void {
  host.innerHTML = `
    <section class="route-panel home-panel">
      <p class="route-kicker">MANUAL START</p>
      <h2>Interact first, then read the code</h2>
      <p class="ftue-lead">
        Code Literacy is an 11-week course for beginners who use AI to build things.
        Each idea starts as something you can click, predict, break, reveal, or move.
        Then you read the real code shape behind it.
      </p>
      <div class="home-actions">
        <a class="app-button" href="#/week/01">Start Week 01</a>
        <a class="text-link" href="#/weeks">View the course map</a>
      </div>
    </section>

    <section class="route-grid">
      <article class="route-card">
        <span class="card-index">01</span>
        <h3>Picture first</h3>
        <p>Every concept starts with an everyday picture: restaurant, front door, recipe, shopping list.</p>
      </article>
      <article class="route-card">
        <span class="card-index">02</span>
        <h3>Interact next</h3>
        <p>You click, scrub, choose, reveal, or debug before the explanation settles.</p>
      </article>
      <article class="route-card">
        <span class="card-index">03</span>
        <h3>Then read code</h3>
        <p>The interaction turns into 4-6 lines of real JavaScript, TypeScript, or Python.</p>
      </article>
    </section>

    <section class="route-panel">
      <p class="route-kicker">CURRENT POSITION</p>
      <h2>Weeks 01-11 are built</h2>
      <p>
        The full Course 1 path is open: start with the screen, browser, project files, and error
        windows, then move through dependencies, data flow, APIs, debugging, Git, async work,
        architecture, and spec-driven delivery.
      </p>
      <a class="app-button" href="#/weeks">Open the course map</a>
    </section>
  `;
}
