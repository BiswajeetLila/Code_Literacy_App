import type { SignalFocus } from "./signalLab.ts";

type CodeWalkLine = {
  code: string;
  note: string;
  focus: SignalFocus;
};

const LINES: CodeWalkLine[] = [
  {
    code: "async function loadMenu() {",
    note: "Name the job: go get the menu. Nothing runs yet; this is the recipe.",
    focus: null,
  },
  {
    code: "  const response = await fetch('/menu')",
    note: "fetch() sends the request from the client to the server. await waits here.",
    focus: "request",
  },
  {
    code: "  // server prepares the answer",
    note: "The server is doing backend work. The client cannot see inside that step.",
    focus: "server",
  },
  {
    code: "  const data = await response.json()",
    note: "The response has come back. json() turns the raw answer into usable data.",
    focus: "response",
  },
  {
    code: "  render(data)",
    note: "The client draws the answer on screen. The round trip is complete.",
    focus: "response",
  },
  {
    code: "}",
    note: "End of the recipe.",
    focus: null,
  },
];

const KEYWORDS = /\b(async|await|const|function|return|let|var)\b/g;

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(source: string): string {
  const escaped = escapeHtml(source);
  if (escaped.trimStart().startsWith("//")) {
    return `<span class="lab-code-comment">${escaped}</span>`;
  }
  return escaped
    .replace(/('[^']*')/g, '<span class="lab-code-string">$1</span>')
    .replace(KEYWORDS, '<span class="lab-code-keyword">$1</span>')
    .replace(
      /\b(fetch|json|render|loadMenu)\b/g,
      '<span class="lab-code-function">$1</span>',
    );
}

export function mountSignalCodeWalk(
  host: HTMLElement,
  onPick: (focus: SignalFocus, note: string) => void,
): void {
  host.innerHTML = "";

  const panel = document.createElement("div");
  panel.className = "lab-code-panel";

  const bar = document.createElement("div");
  bar.className = "lab-code-bar";
  bar.innerHTML = `
    <span>request.js</span>
    <span>click a line</span>
  `;
  panel.appendChild(bar);

  const list = document.createElement("ol");
  list.className = "lab-code-list";
  const buttons: HTMLButtonElement[] = [];

  LINES.forEach((line, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lab-code-line";
    button.innerHTML = highlight(line.code) || "&nbsp;";
    button.addEventListener("click", () => select(index));
    item.appendChild(button);
    list.appendChild(item);
    buttons.push(button);
  });

  panel.appendChild(list);

  const note = document.createElement("p");
  note.className = "lab-code-note";

  const resume = document.createElement("button");
  resume.type = "button";
  resume.className = "lab-secondary-button";
  resume.textContent = "Resume full trip";
  resume.addEventListener("click", () => {
    clearActive();
    note.textContent = "Playing the full request -> server -> response loop.";
    onPick(null, note.textContent);
  });

  host.append(panel, note, resume);

  function clearActive(): void {
    buttons.forEach((button) => button.classList.remove("active"));
  }

  function select(index: number, emit = true): void {
    clearActive();
    buttons[index].classList.add("active");
    note.textContent = LINES[index].note;
    if (emit) onPick(LINES[index].focus, LINES[index].note);
  }

  select(1, false);
}
