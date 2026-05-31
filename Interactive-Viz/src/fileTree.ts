// fileTree.ts (Lesson 2 — "Files & the front door")
// A clickable mini project folder. Click any item to learn what it is.
// Then hit "Reveal" to see which file runs FIRST — the entry point.

type Node = {
  name: string;
  kind: "file" | "folder";
  depth: number;
  note: string;
  entry?: boolean; // the file that runs first
  dim?: boolean; // "don't touch" (installed parts)
};

const TREE: Node[] = [
  { name: "my-app/", kind: "folder", depth: 0,
    note: "The project folder — the whole app lives in here. (People call this a 'repo'.)" },
  { name: "index.html", kind: "file", depth: 1, entry: true,
    note: "THE FRONT DOOR. The browser opens this first, and it loads src/main.ts. This is the entry point — the thread you pull to follow everything else." },
  { name: "package.json", kind: "file", depth: 1,
    note: "The PARTS LABEL. Lists the app's name and the outside pieces it needs (its dependencies). It's the label on the box, not the contents." },
  { name: "src/", kind: "folder", depth: 1,
    note: "YOUR stuff. The code you actually write and read lives here. Start reading in src/." },
  { name: "main.ts", kind: "file", depth: 2,
    note: "The page's brain. index.html loads this file. After the front door, this is where you start reading." },
  { name: "style.css", kind: "file", depth: 2,
    note: "How the page looks — colours, spacing, fonts." },
  { name: "public/", kind: "folder", depth: 1,
    note: "Static files handed out as-is (images, icons). Nothing here 'runs'." },
  { name: "logo.png", kind: "file", depth: 2,
    note: "A picture, served unchanged." },
  { name: "node_modules/", kind: "folder", depth: 1, dim: true,
    note: "INSTALLED PARTS — pre-made ingredients you downloaded. Huge and auto-made. Never edit by hand; package.json decides what goes in here." },
];

export function mountFileTree(host: HTMLElement): void {
  host.innerHTML = `
    <p class="hint">Click any file or folder to see what it is. Then reveal which one runs first.</p>
    <div class="controls">
      <button id="ft-reveal" type="button">Reveal: which runs first?</button>
    </div>
    <div class="file-tree-wrap">
      <div class="file-tree" id="ft-list"></div>
      <div class="ft-detail" id="ft-detail">
        <h4>Pick a file</h4>
        <p class="ft-empty">Click anything on the left.</p>
      </div>
    </div>
  `;

  const list = host.querySelector<HTMLElement>("#ft-list")!;
  const detail = host.querySelector<HTMLElement>("#ft-detail")!;

  const rows: HTMLElement[] = TREE.map((node) => {
    const row = document.createElement("div");
    row.className =
      "ft-row" +
      (node.kind === "folder" ? " ft-folder" : "") +
      (node.dim ? " dim" : "");
    row.style.paddingLeft = `${6 + node.depth * 20}px`;
    const icon = node.kind === "folder" ? "▸" : "·";
    row.innerHTML = `<span class="ft-icon">${icon}</span><span>${node.name}</span>`;

    row.addEventListener("click", () => {
      rows.forEach((r) => r.classList.remove("selected"));
      row.classList.add("selected");
      detail.innerHTML = `<h4>${node.name}</h4><p>${node.note}</p>`;
    });

    list.appendChild(row);
    return row;
  });

  // Reveal the entry point: mark index.html, show its note.
  host.querySelector<HTMLButtonElement>("#ft-reveal")!.addEventListener("click", () => {
    const entryIndex = TREE.findIndex((n) => n.entry);
    const row = rows[entryIndex];
    row.classList.add("entry", "selected");
    if (!row.querySelector(".ft-badge")) {
      const badge = document.createElement("span");
      badge.className = "ft-badge first";
      badge.textContent = "runs 1st";
      row.appendChild(badge);
    }
    detail.innerHTML = `<h4>${TREE[entryIndex].name}</h4><p>${TREE[entryIndex].note}</p>`;
  });
}
