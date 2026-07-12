import { WEEK_09 } from "../content/weeks/week09.ts";
import "../styles/week09.css";
import { renderContentWeek } from "./contentWeek.ts";

export function renderWeek09(host: HTMLElement): void {
  renderContentWeek(host, WEEK_09, {
    figureTitle: "FIG. 9 - When the kitchen has many cooks",
    subtitle: "Some work takes time. Learn when completion order changes, and how to protect one shared item when two requests arrive together.",
    startTitle: "Start, wait, and protect shared stock",
    startLead: "You will predict when drinks finish in a coffee shop, then trigger an over-sale for the last croissant and repair the shared-stock rule with a lock and a repeat-safe ticket.",
    reflections: [
      "When code starts several jobs, which order can you safely assume: start order or completion order?",
      "Which shared check-and-change steps must stay together so two requests cannot both claim one item?",
    ],
  });
}
