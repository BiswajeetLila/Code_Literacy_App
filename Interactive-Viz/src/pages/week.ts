import { WEEKS } from "../weekMeta.ts";
import { renderWeek01 } from "./week01.ts";

export function renderWeek(host: HTMLElement, id: string): void {
  if (id === "01") {
    renderWeek01(host);
    return;
  }

  const week = WEEKS.find((item) => item.id === id);
  if (!week) {
    host.innerHTML = `
      <section class="route-panel placeholder-panel">
        <p class="route-kicker">WEEK NOT FOUND</p>
        <h2>No week ${id}</h2>
        <p>The course map is the source of truth for available week routes.</p>
        <a class="app-button" href="#/weeks">Back to course map</a>
      </section>
    `;
    return;
  }

  host.innerHTML = `
    <section class="route-panel placeholder-panel">
      <p class="route-kicker">WEEK ${week.id} &middot; PLANNED</p>
      <h2>${week.title}</h2>
      <p>${week.picture}.</p>
      <p>
        This module is intentionally visible but not built yet. Keeping the route
        live now lets the app shell, navigation, and course map settle before the
        later content-model migration.
      </p>
      <a class="app-button" href="#/weeks">Back to course map</a>
    </section>
  `;
}
