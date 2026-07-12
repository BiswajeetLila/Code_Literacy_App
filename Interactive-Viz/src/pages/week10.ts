import { WEEK_10 } from "../content/weeks/week10.ts";
import "../styles/week10.css";
import { renderContentWeek } from "./contentWeek.ts";

export function renderWeek10(host: HTMLElement): void {
  renderContentWeek(host, WEEK_10, {
    figureTitle: "FIG. 10 - The whole building",
    subtitle: "Architecture is how you steer the shape of a system: which part owns each job, and how one user action travels across the whole app.",
    startTitle: "Direct the structure, not just the lines",
    startLead: "You will inspect a cutaway restaurant as one order travels from screen to logic, data, and an outside service and back. Then you will rearrange mixed-up responsibilities into clear layers.",
    reflections: [
      "If one stop in the round trip fails, which layer would you ask an AI coding agent to inspect first, and what evidence would you give it?",
      "Which responsibility becomes hardest to change when it is placed in the wrong layer, and why?",
    ],
  });
}
