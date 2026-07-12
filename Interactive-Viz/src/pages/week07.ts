import { WEEK_07 } from "../content/weeks/week07.ts";
import "../styles/week07.css";
import { renderContentWeek } from "./contentWeek.ts";

export function renderWeek07(host: HTMLElement): void {
  renderContentWeek(host, WEEK_07, {
    figureTitle: "FIG. 7 - Read what changed before you accept it",
    subtitle: "Commits are named saves, branches are safe side copies, and a diff is track changes for code.",
    startTitle: "Named saves, safe experiments, visible changes",
    startLead: "You will scrub a document's saved history, trace a branch back into main, then inspect the exact lines a proposed change adds and removes.",
    reflections: [
      "When would you make a side branch instead of changing the main document directly?",
      "Which removed line would you want explained before accepting an AI change?",
    ],
  });
}
