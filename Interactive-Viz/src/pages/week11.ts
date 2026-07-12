import { WEEK_11 } from "../content/weeks/week11.ts";
import "../styles/week11.css";
import { renderContentWeek } from "./contentWeek.ts";

export function renderWeek11(host: HTMLElement): void {
  renderContentWeek(host, WEEK_11, {
    figureTitle: "FIG. 11 - The spec is the prompt",
    subtitle: "The next leverage is writing the brief an agent can build and verify, instead of prompting and hoping it guesses the right shape.",
    startTitle: "Write the brief before the build",
    startLead: "You will compare one vague request with a six-part specification, then assemble a testable brief. This very app was guided by PROJECT-PLAN.md and CONTENT-GUIDE.md: you have been using an SDD artifact all along.",
    reflections: [
      "Which missing part of a vague request would most likely make an agent change more than you intended?",
      "Can another person tell exactly how to prove your brief is done without asking a follow-up question?",
    ],
  });
}
