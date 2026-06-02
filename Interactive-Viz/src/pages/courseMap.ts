import { WEEKS } from "../weekMeta.ts";

export function renderCourseMap(host: HTMLElement): void {
  const cards = WEEKS.map(
    (week) => `
      <a class="week-card ${week.status}" href="#/week/${week.id}">
        <span class="week-num">${week.id}</span>
        <span class="week-status">${statusLabel(week.status)}</span>
        <h3>${week.title}</h3>
        <p>${week.picture}</p>
      </a>`,
  ).join("");

  host.innerHTML = `
    <section class="route-panel">
      <p class="route-kicker">COURSE MAP</p>
      <h2>11 weeks, all open</h2>
      <p>
        Week 01 is the locked quality bar. Week 08 is the next target in the
        canonical build order, because it tests the failure modes the earlier weeks plant.
      </p>
    </section>
    <section class="week-grid" aria-label="Course weeks">
      ${cards}
    </section>
  `;
}

function statusLabel(status: string): string {
  if (status === "built") return "built";
  if (status === "in_progress") return "in progress";
  if (status === "next") return "next";
  return "planned";
}
