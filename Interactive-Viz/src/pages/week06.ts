import { WEEK_06 } from "../content/weeks/week06.ts";
import "../styles/week06.css";
import { renderContentWeek } from "./contentWeek.ts";

export function renderWeek06(host: HTMLElement): void {
  renderContentWeek(host, WEEK_06, {
    figureTitle: "FIG. 6 - Read the call record before changing code",
    subtitle: "A stack trace records who called whom. Find the nearest frame in your files, then use the symptom to choose the first layer to inspect.",
    startTitle: "Follow the calls, then choose the layer",
    startLead: "You will inspect a real stack shape, mark your code against installed library code, predict the line that sent the bad value, and sort six symptoms into frontend, backend, or config.",
    reflections: [
      "Which frame held the bad value, and which frame created it?",
      "What evidence tells you where to look first without proving the final cause?",
    ],
  });
}
