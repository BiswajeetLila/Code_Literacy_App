import { renderCourseMap } from "./pages/courseMap.ts";
import { renderGlossaryPlaceholder, renderReviewPlaceholder } from "./pages/placeholders.ts";
import { renderHome } from "./pages/home.ts";
import { renderWeek } from "./pages/week.ts";
import { WEEKS } from "./weekMeta.ts";

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
  if (parts[0] === "week" && parts[1]) return { name: "week", id: parts[1].padStart(2, "0") };
  if (parts[0] === "glossary" && parts.length === 1) return { name: "glossary" };
  if (parts[0] === "review" && parts.length === 1) return { name: "review" };

  window.location.hash = ROUTE_LINKS.home;
  return { name: "home" };
}

function renderRoute(view: HTMLElement, route: Route): void {
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
  if (status) status.textContent = routeStatusText(route);
}

function routeStatusText(route: Route): string {
  if (route.name === "home") return "Current: Home";
  if (route.name === "weeks") return "Current: Course Map";
  if (route.name === "glossary") return "Current: Glossary";
  if (route.name === "review") return "Current: Review";

  const week = WEEKS.find((item) => item.id === route.id);
  if (!week) return `Current: Week ${route.id}`;
  return `Current: Week ${week.id} - ${week.title}`;
}
