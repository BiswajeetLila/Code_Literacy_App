export type WeekMeta = {
  id: string;
  title: string;
  picture: string;
  status: "built" | "in_progress" | "next" | "planned";
};

export const WEEKS: WeekMeta[] = [
  {
    id: "01",
    title: "What is this thing?",
    picture: "screen, browser, files, and error windows",
    status: "built",
  },
  {
    id: "02",
    title: "What does this project need before it can run?",
    picture: "dependencies, versions, lockfiles, and fake imports",
    status: "built",
  },
  {
    id: "03",
    title: "Recipes that take what you give them",
    picture: "functions, parameters, arguments, returns, defaults, and scope",
    status: "built",
  },
  {
    id: "04",
    title: "Where did this number on screen come from?",
    picture: "variables, state, props, data flow, and modules",
    status: "built",
  },
  {
    id: "05",
    title: "Ordering from a menu",
    picture: "APIs, endpoints, verbs, status codes, JSON, headers, and keys",
    status: "built",
  },
  {
    id: "06",
    title: "Reading the note that says what went wrong",
    picture: "stack traces, your code vs library code, and layer triage",
    status: "built",
  },
  {
    id: "07",
    title: "Undo, and going back to an earlier save",
    picture: "commits, branches, merges, diffs, and pull requests",
    status: "built",
  },
  {
    id: "08",
    title: "Checking the AI's work before you say yes",
    picture: "diff review, failure modes, plan mode, and bug reports",
    status: "built",
  },
  {
    id: "09",
    title: "When the kitchen has many cooks",
    picture: "sync vs async, await, promises, races, idempotency, and retry",
    status: "built",
  },
  {
    id: "10",
    title: "Talking about the whole system, not just one file",
    picture: "layers, separation of concerns, deploy, and architecture",
    status: "built",
  },
  {
    id: "11",
    title: "The spec is the prompt",
    picture: "spec-driven development, verification criteria, and plan review",
    status: "built",
  },
];
