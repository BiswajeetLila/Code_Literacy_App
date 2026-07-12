import { WEEKS } from "../weekMeta.ts";
import { renderWeek01 } from "./week01.ts";
import { renderWeek02 } from "./week02.ts";
import { renderWeek03 } from "./week03.ts";
import { renderWeek04 } from "./week04.ts";
import { renderWeek05 } from "./week05.ts";
import { renderWeek06 } from "./week06.ts";
import { renderWeek07 } from "./week07.ts";
import { renderWeek08 } from "./week08.ts";
import { renderWeek09 } from "./week09.ts";
import { renderWeek10 } from "./week10.ts";
import { renderWeek11 } from "./week11.ts";

export function renderWeek(host: HTMLElement, id: string): void {
  if (id === "01") {
    renderWeek01(host);
    return;
  }
  if (id === "02") {
    renderWeek02(host);
    return;
  }
  if (id === "03") {
    renderWeek03(host);
    return;
  }
  if (id === "04") {
    renderWeek04(host);
    return;
  }
  if (id === "05") {
    renderWeek05(host);
    return;
  }
  if (id === "06") {
    renderWeek06(host);
    return;
  }
  if (id === "07") {
    renderWeek07(host);
    return;
  }
  if (id === "08") {
    renderWeek08(host);
    return;
  }
  if (id === "09") {
    renderWeek09(host);
    return;
  }
  if (id === "10") {
    renderWeek10(host);
    return;
  }
  if (id === "11") {
    renderWeek11(host);
    return;
  }

  const week = WEEKS.find((item) => item.id === id);
  if (!week) {
    const section = document.createElement("section");
    section.className = "route-panel placeholder-panel";
    const kicker = document.createElement("p");
    kicker.className = "route-kicker";
    kicker.textContent = "WEEK NOT FOUND";
    const heading = document.createElement("h2");
    heading.textContent = `No week ${id}`;
    const explanation = document.createElement("p");
    explanation.textContent = "The course map is the source of truth for available week routes.";
    const link = document.createElement("a");
    link.className = "app-button";
    link.href = "#/weeks";
    link.textContent = "Back to course map";
    section.append(kicker, heading, explanation, link);
    host.replaceChildren(section);
    return;
  }

  host.innerHTML = `
    <section class="route-panel placeholder-panel">
      <p class="route-kicker">WEEK ${week.id} &middot; ${statusLabel(week.status).toUpperCase()}</p>
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

function statusLabel(status: string): string {
  if (status === "built") return "built";
  if (status === "in_progress") return "in progress";
  if (status === "next") return "next target";
  return "planned";
}
