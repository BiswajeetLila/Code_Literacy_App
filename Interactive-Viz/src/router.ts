import { renderCourseMap } from "./pages/courseMap.ts";
import { renderGlossaryPlaceholder, renderReviewPlaceholder } from "./pages/placeholders.ts";
import { renderHome } from "./pages/home.ts";
import { renderWeek } from "./pages/week.ts";
import { WEEKS } from "./weekMeta.ts";

const WEEK_COUNT = WEEKS.length;

type Route =
  | { name: "home" }
  | { name: "weeks" }
  | { name: "week"; id: string }
  | { name: "glossary" }
  | { name: "review" };

const ROUTE_LINKS: Record<string, string> = {
  home: "#/",
  weeks: "#/weeks",
  glossary: "#/glossary",
  review: "#/review",
};

export function startRouter(): void {
  const view = document.querySelector<HTMLElement>("#view");
  if (!view) throw new Error("Missing #view route root");

  const render = () => {
    const route = parseHash(window.location.hash);
    renderRoute(view, route);
    markActiveNav(route);
    view.focus({ preventScroll: true });
  };

  window.addEventListener("hashchange", render);
  if (!window.location.hash) {
    window.location.hash = ROUTE_LINKS.home;
    return;
  }
  render();
}

function parseHash(hash: string): Route {
  const path = hash.replace(/^#/, "") || "/";
  const parts = path.split("/").filter(Boolean);

  if (path === "/" || parts.length === 0) return { name: "home" };
  if (parts[0] === "weeks" && parts.length === 1) return { name: "weeks" };
  if (parts[0] === "week" && parts.length === 2 && /^\d{1,2}$/.test(parts[1])) {
    const id = parts[1].padStart(2, "0");
    if (WEEKS.some((week) => week.id === id)) return { name: "week", id };
  }
  if (parts[0] === "glossary" && parts.length === 1) return { name: "glossary" };
  if (parts[0] === "review" && parts.length === 1) return { name: "review" };

  window.location.hash = ROUTE_LINKS.home;
  return { name: "home" };
}

function renderRoute(view: HTMLElement, route: Route): void {
  window.dispatchEvent(new Event("app:before-route-change"));
  view.replaceChildren();

  if (route.name === "home") renderHome(view);
  if (route.name === "weeks") renderCourseMap(view);
  if (route.name === "week") renderWeek(view, route.id);
  if (route.name === "glossary") renderGlossaryPlaceholder(view);
  if (route.name === "review") renderReviewPlaceholder(view);
}

function markActiveNav(route: Route): void {
  const active = route.name === "week" ? "weeks" : route.name;
  document.querySelectorAll<HTMLAnchorElement>(".app-nav a").forEach((link) => {
    link.setAttribute("aria-current", link.dataset.route === active ? "page" : "false");
  });

  const status = document.querySelector<HTMLElement>("#route-status");
  if (status) status.replaceChildren(buildRouteStatus(route));
}

function buildRouteStatus(route: Route): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const label = routeStatusText(route);
  const currentWeek = route.name === "week" ? Number(route.id) : 0;
  const labelNode = document.createElement("span");
  labelNode.className = "route-status-label";
  labelNode.textContent = label;
  const strip = document.createElement("span");
  strip.className = "week-strip";
  strip.setAttribute("role", "img");
  strip.setAttribute("aria-label", weekStripLabel(currentWeek));
  Array.from({ length: WEEK_COUNT }, (_, index) => strip.appendChild(weekSquare(index + 1, currentWeek)));
  fragment.append(labelNode, strip);
  return fragment;
}

function routeStatusText(route: Route): string {
  if (route.name === "week") {
    const week = WEEKS.find((item) => item.id === route.id);
    if (week) return `Week ${week.id} of ${WEEK_COUNT}`;
    return `Week ${route.id} of ${WEEK_COUNT}`;
  }
  return `${WEEK_COUNT} week course`;
}

function weekStripLabel(currentWeek: number): string {
  if (currentWeek === 0) return `${WEEK_COUNT} week course map. No week route selected.`;
  return `Week ${currentWeek} of ${WEEK_COUNT} selected. Earlier squares are completed, the bright square is current, and later squares are empty.`;
}

function weekSquare(week: number, currentWeek: number): HTMLSpanElement {
  let state = "future";
  if (currentWeek > 0 && week < currentWeek) state = "complete";
  if (week === currentWeek) state = "current";
  const square = document.createElement("span");
  square.className = `week-square ${state}`;
  square.title = `Week ${week}`;
  return square;
}
