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
        Every Course 1 week is implemented. Follow the path from the first screen map through
        dependencies, functions, data flow, APIs, debugging, Git, async work, architecture,
        and a checkable spec for AI-assisted work.
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
