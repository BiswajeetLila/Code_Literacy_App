import { WEEKS } from "../weekMeta.ts";

export function renderCourseMap(host: HTMLElement): void {
  const cards = WEEKS.map(
    (week) => `
      <a class="week-card ${week.status}" href="#/week/${week.id}">
        <span class="week-num">${week.id}</span>
        <span class="week-status">${week.status === "built" ? "built" : "planned"}</span>
        <h3>${week.title}</h3>
        <p>${week.picture}</p>
      </a>`,
  ).join("");

  host.innerHTML = `
    <section class="route-panel">
      <p class="route-kicker">COURSE MAP</p>
      <h2>10 weeks, all open</h2>
      <p>
        Week 01 is the working module. The remaining weeks are the planned route
        map from the project spec, shown now so the app behaves like a real course shell.
      </p>
    </section>
    <section class="week-grid" aria-label="Course weeks">
      ${cards}
    </section>
  `;
}
