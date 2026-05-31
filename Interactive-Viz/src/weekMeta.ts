export type WeekMeta = {
  id: string;
  title: string;
  picture: string;
  status: "built" | "planned";
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
    title: "Dependencies = a shopping list",
    picture: "the list of outside parts a project needs",
    status: "planned",
  },
  {
    id: "03",
    title: "Functions = recipes",
    picture: "small named instructions with inputs and an output",
    status: "planned",
  },
  {
    id: "04",
    title: "Where does data come from?",
    picture: "forms, files, memory, and rented storage",
    status: "planned",
  },
  {
    id: "05",
    title: "APIs = ordering off a menu",
    picture: "asking another program for exactly what it offers",
    status: "planned",
  },
  {
    id: "06",
    title: "Where is the bug?",
    picture: "follow the clue from the red line to the cause",
    status: "planned",
  },
  {
    id: "07",
    title: "Branches & time travel",
    picture: "git snapshots, history, and safe experiments",
    status: "planned",
  },
  {
    id: "08",
    title: "Reading AI diffs like a reviewer",
    picture: "what changed, why it changed, and what might break",
    status: "planned",
  },
  {
    id: "09",
    title: "Async, races & pipelines",
    picture: "work that happens while other work keeps moving",
    status: "planned",
  },
  {
    id: "10",
    title: "Architectural conversations",
    picture: "talking to the AI about shape, tradeoffs, and maintainability",
    status: "planned",
  },
];
