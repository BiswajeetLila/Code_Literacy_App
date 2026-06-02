type ProjectMode = "web" | "python";

type TreeNode = {
  id: string;
  name: string;
  kind: "folder" | "file";
  depth: number;
  badge?: string;
  dim?: boolean;
  trace?: number;
  summary: string;
  readSignal: string;
  codeTitle: string;
  code: string[];
};

type TraceStep = {
  title: string;
  detail: string;
  nodeId: string;
};

type ProjectData = {
  label: string;
  command: string;
  nodes: TreeNode[];
  trace: TraceStep[];
};

const WEB_PROJECT: ProjectData = {
  label: "Web app layout",
  command: "Browser opens index.html",
  nodes: [
    {
      id: "web-root",
      name: "my-app/",
      kind: "folder",
      depth: 0,
      badge: "repo",
      summary: "The whole project folder. When someone says repo, they usually mean this top folder.",
      readSignal: "Start here only to understand the outer box. Then find the entry file.",
      codeTitle: "one project folder",
      code: ["my-app/", "  index.html", "  package.json", "  src/"],
    },
    {
      id: "web-index",
      name: "index.html",
      kind: "file",
      depth: 1,
      badge: "runs first",
      trace: 0,
      summary: "The front door. The browser opens this file first.",
      readSignal: "Read this when you need to know what script starts the app.",
      codeTitle: "front door",
      code: [
        '<main id="view"></main>',
        '<script type="module"',
        '  src="/src/main.ts">',
        "</script>",
      ],
    },
    {
      id: "web-package",
      name: "package.json",
      kind: "file",
      depth: 1,
      badge: "parts label",
      summary: "The label on the box. It names the app and lists outside packages.",
      readSignal: "Read dependencies here. Do not dig through installed parts first.",
      codeTitle: "parts label",
      code: [
        "{",
        '  "scripts": { "dev": "vite" },',
        '  "dependencies": {',
        '    "three": "^0.180.0"',
        "  }",
        "}",
      ],
    },
    {
      id: "web-src",
      name: "src/",
      kind: "folder",
      depth: 1,
      badge: "your code",
      summary: "The source folder. This is where the project-specific code usually lives.",
      readSignal: "When an AI gives you a web app, this is the drawer you inspect most.",
      codeTitle: "source drawer",
      code: ["src/", "  main.ts", "  pages/week01.ts", "  style.css"],
    },
    {
      id: "web-main",
      name: "main.ts",
      kind: "file",
      depth: 2,
      badge: "next",
      trace: 1,
      summary: "The first TypeScript file loaded by the front door.",
      readSignal: "After index.html, read this to see how the app starts.",
      codeTitle: "app boot",
      code: [
        'import { startRouter } from "./router.ts";',
        'import { initThemeToggle } from "./theme.ts";',
        "initThemeToggle();",
        "startRouter();",
      ],
    },
    {
      id: "web-week",
      name: "pages/week01.ts",
      kind: "file",
      depth: 2,
      badge: "screen",
      trace: 2,
      summary: "The file that draws this Week 1 screen.",
      readSignal: "Read this when you want to change this lesson.",
      codeTitle: "screen renderer",
      code: [
        "export function renderWeek01(host) {",
        "  host.innerHTML = ...",
        "  setupTabs(...);",
        "}",
      ],
    },
    {
      id: "web-style",
      name: "style.css",
      kind: "file",
      depth: 2,
      summary: "The look of the page: layout, colors, spacing, and responsive rules.",
      readSignal: "Read this when something looks wrong or overflows.",
      codeTitle: "visual rules",
      code: [
        ".lab-stage {",
        "  background: #090d12;",
        "  aspect-ratio: 16 / 9;",
        "}",
      ],
    },
    {
      id: "web-public",
      name: "public/",
      kind: "folder",
      depth: 1,
      summary: "Static files handed out as-is, like icons or images.",
      readSignal: "Useful for assets. Usually not where logic starts.",
      codeTitle: "static files",
      code: ["public/", "  icon.svg", "  course-card.png"],
    },
    {
      id: "web-modules",
      name: "node_modules/",
      kind: "folder",
      depth: 1,
      badge: "do not edit",
      dim: true,
      summary: "Downloaded parts. Big, automatic, and not where you fix your app.",
      readSignal: "Skip it. Read package.json to see what got installed.",
      codeTitle: "installed parts",
      code: ["node_modules/", "  three/", "  vite/", "  typescript/"],
    },
  ],
  trace: [
    {
      title: "Front door",
      detail: "The browser opens index.html.",
      nodeId: "web-index",
    },
    {
      title: "Boot file",
      detail: "index.html loads src/main.ts.",
      nodeId: "web-main",
    },
    {
      title: "Screen file",
      detail: "The router draws pages/week01.ts.",
      nodeId: "web-week",
    },
  ],
};

const PYTHON_PROJECT: ProjectData = {
  label: "Python app layout",
  command: "Terminal runs python app.py",
  nodes: [
    {
      id: "py-root",
      name: "my-tool/",
      kind: "folder",
      depth: 0,
      badge: "repo",
      summary: "The whole Python project folder.",
      readSignal: "Open the top folder, then find the file the command runs.",
      codeTitle: "one project folder",
      code: ["my-tool/", "  app.py", "  requirements.txt", "  src/"],
    },
    {
      id: "py-app",
      name: "app.py",
      kind: "file",
      depth: 1,
      badge: "runs first",
      trace: 0,
      summary: "The file the terminal command runs first.",
      readSignal: "If the command says python app.py, start reading here.",
      codeTitle: "terminal entry",
      code: [
        "from src.main import run",
        "",
        'if __name__ == "__main__":',
        "    run()",
      ],
    },
    {
      id: "py-req",
      name: "requirements.txt",
      kind: "file",
      depth: 1,
      badge: "parts label",
      summary: "The Python parts list. Same job as package.json in a web app.",
      readSignal: "Read this to see which outside packages the app needs.",
      codeTitle: "parts list",
      code: ["fastapi==0.115.0", "uvicorn==0.32.0", "requests==2.32.3"],
    },
    {
      id: "py-src",
      name: "src/",
      kind: "folder",
      depth: 1,
      badge: "your code",
      summary: "A drawer for the app's own Python modules.",
      readSignal: "After the entry file, follow imports into this folder.",
      codeTitle: "source drawer",
      code: ["src/", "  main.py", "  helpers.py"],
    },
    {
      id: "py-main",
      name: "main.py",
      kind: "file",
      depth: 2,
      badge: "next",
      trace: 1,
      summary: "The main work file imported by app.py.",
      readSignal: "Read this after the entry file to see the real behavior.",
      codeTitle: "main work",
      code: [
        "from .helpers import total",
        "",
        "def run():",
        '    print("total:", total(2, 3))',
      ],
    },
    {
      id: "py-helpers",
      name: "helpers.py",
      kind: "file",
      depth: 2,
      badge: "called",
      trace: 2,
      summary: "A helper file. Main code calls into it when it needs a smaller job.",
      readSignal: "Read this when a function name points here.",
      codeTitle: "helper recipe",
      code: ["def total(a, b):", "    print(a + b)", "    return a + b"],
    },
    {
      id: "py-venv",
      name: ".venv/",
      kind: "folder",
      depth: 1,
      badge: "do not edit",
      dim: true,
      summary: "Downloaded Python parts. Automatic and usually huge.",
      readSignal: "Skip it. Read requirements.txt instead.",
      codeTitle: "installed parts",
      code: [".venv/", "  Lib/", "  Scripts/", "  site-packages/"],
    },
  ],
  trace: [
    {
      title: "Command",
      detail: "The terminal runs app.py.",
      nodeId: "py-app",
    },
    {
      title: "Import",
      detail: "app.py imports src/main.py.",
      nodeId: "py-main",
    },
    {
      title: "Helper",
      detail: "main.py calls helpers.py.",
      nodeId: "py-helpers",
    },
  ],
};

const PROJECTS: Record<ProjectMode, ProjectData> = {
  web: WEB_PROJECT,
  python: PYTHON_PROJECT,
};

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function nodeIcon(node: TreeNode): string {
  return node.kind === "folder" ? "DIR" : "FILE";
}

function modeLabel(mode: ProjectMode): string {
  return mode === "web" ? "Web app" : "Python app";
}

export function mountProjectFolderLab(host: HTMLElement): void {
  let mode: ProjectMode = "web";
  let selectedId = WEB_PROJECT.nodes[1].id;
  let activeTrace = -1;
  let traceTimer = 0;

  host.innerHTML = `
    <div class="folder-lab">
      <div class="folder-lab-head">
        <div>
          <p class="route-kicker">INTERACTIVE LESSON 02</p>
          <h2>Project Folder Lab</h2>
          <p>Pick the app shape, click files, then trace which file runs first.</p>
        </div>
        <div class="folder-mode-switch" aria-label="Project type">
          <button type="button" data-mode="web" aria-pressed="true">Web</button>
          <button type="button" data-mode="python" aria-pressed="false">Python</button>
        </div>
      </div>

      <div class="folder-lab-grid">
        <section class="folder-panel folder-tree-panel" aria-labelledby="folder-tree-title">
          <div class="folder-panel-bar">
            <span id="folder-tree-title">Project tree</span>
            <span id="folder-mode-label">Web app</span>
          </div>
          <div id="folder-tree" class="folder-tree" role="tree"></div>
        </section>

        <section class="folder-panel folder-detail-panel" aria-live="polite">
          <div class="folder-panel-bar">
            <span id="folder-detail-name">index.html</span>
            <span id="folder-detail-badge">runs first</span>
          </div>
          <p id="folder-detail-summary"></p>
          <p id="folder-detail-signal"></p>
          <div id="folder-code-panel" class="folder-code-panel"></div>
        </section>

        <section class="folder-panel folder-trace-panel" aria-labelledby="folder-trace-title">
          <div class="folder-panel-bar">
            <span id="folder-trace-title">Startup trace</span>
            <span id="folder-command"></span>
          </div>
          <ol id="folder-trace" class="folder-trace"></ol>
          <div class="folder-actions">
            <button id="folder-trace-run" type="button">Trace startup</button>
            <button id="folder-reset" type="button">Reset</button>
          </div>
          <p id="folder-status" class="folder-status" role="status" aria-live="polite"></p>
        </section>
      </div>
    </div>
  `;

  const tree = host.querySelector<HTMLElement>("#folder-tree")!;
  const modeButtons = Array.from(
    host.querySelectorAll<HTMLButtonElement>(".folder-mode-switch button"),
  );
  const modeText = host.querySelector<HTMLElement>("#folder-mode-label")!;
  const detailName = host.querySelector<HTMLElement>("#folder-detail-name")!;
  const detailBadge = host.querySelector<HTMLElement>("#folder-detail-badge")!;
  const detailSummary = host.querySelector<HTMLElement>("#folder-detail-summary")!;
  const detailSignal = host.querySelector<HTMLElement>("#folder-detail-signal")!;
  const codePanel = host.querySelector<HTMLElement>("#folder-code-panel")!;
  const command = host.querySelector<HTMLElement>("#folder-command")!;
  const trace = host.querySelector<HTMLElement>("#folder-trace")!;
  const status = host.querySelector<HTMLElement>("#folder-status")!;
  const runTrace = host.querySelector<HTMLButtonElement>("#folder-trace-run")!;
  const reset = host.querySelector<HTMLButtonElement>("#folder-reset")!;
  const reduceMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  function data(): ProjectData {
    return PROJECTS[mode];
  }

  function selectedNode(): TreeNode {
    return data().nodes.find((node) => node.id === selectedId) ?? data().nodes[0];
  }

  function renderAll(): void {
    modeText.textContent = modeLabel(mode);
    command.textContent = data().command;
    renderTree();
    renderTrace();
    renderDetail(selectedNode());
    modeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mode === mode));
    });
  }

  function renderTree(): void {
    tree.innerHTML = "";
    for (const node of data().nodes) {
      const row = document.createElement("button");
      row.type = "button";
      row.className =
        "folder-row" +
        (node.id === selectedId ? " selected" : "") +
        (node.dim ? " dim" : "") +
        (node.trace === activeTrace ? " traced" : "");
      row.style.setProperty("--depth", String(node.depth));
      row.setAttribute("role", "treeitem");
      row.setAttribute("aria-selected", String(node.id === selectedId));
      row.innerHTML = `
        <span class="folder-icon">${nodeIcon(node)}</span>
        <span class="folder-name">${escapeHtml(node.name)}</span>
        ${node.badge ? `<span class="folder-badge">${escapeHtml(node.badge)}</span>` : ""}
      `;
      row.addEventListener("click", () => {
        stopTrace();
        selectedId = node.id;
        activeTrace = node.trace ?? -1;
        status.textContent = node.readSignal;
        renderAll();
      });
      tree.appendChild(row);
    }
  }

  function renderTrace(): void {
    trace.innerHTML = "";
    data().trace.forEach((step, index) => {
      const item = document.createElement("li");
      item.className =
        "folder-trace-step" +
        (index === activeTrace ? " active" : "") +
        (index < activeTrace ? " done" : "");
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.innerHTML = `
        <span class="folder-trace-num">${String(index + 1).padStart(2, "0")}</span>
        <span>
          <b>${escapeHtml(step.title)}</b>
          <small>${escapeHtml(step.detail)}</small>
        </span>
      `;
      item.addEventListener("click", () => {
        stopTrace();
        activeTrace = index;
        selectedId = step.nodeId;
        status.textContent = step.detail;
        renderAll();
      });
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          item.click();
        }
      });
      trace.appendChild(item);
    });
  }

  function renderDetail(node: TreeNode): void {
    detailName.textContent = node.name;
    detailBadge.textContent = node.badge ?? node.kind;
    detailSummary.textContent = node.summary;
    detailSignal.textContent = node.readSignal;
    codePanel.innerHTML = `
      <div class="folder-code-bar">
        <span>${escapeHtml(node.codeTitle)}</span>
        <span>${escapeHtml(node.name)}</span>
      </div>
      <pre>${escapeHtml(node.code.join("\n"))}</pre>
    `;
  }

  function traceStep(index: number): void {
    const step = data().trace[index];
    activeTrace = index;
    selectedId = step.nodeId;
    status.textContent = step.detail;
    renderAll();
  }

  function stopTrace(): void {
    if (traceTimer) {
      window.clearTimeout(traceTimer);
      traceTimer = 0;
    }
  }

  function playTrace(index = 0): void {
    stopTrace();
    if (index >= data().trace.length) {
      status.textContent = "Trace complete. You found the reading path.";
      return;
    }
    traceStep(index);
    if (reduceMotion) {
      playTrace(index + 1);
      return;
    }
    traceTimer = window.setTimeout(() => playTrace(index + 1), 850);
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      stopTrace();
      mode = button.dataset.mode as ProjectMode;
      selectedId = data().nodes[1].id;
      activeTrace = -1;
      status.textContent = `${modeLabel(mode)} selected. Click a file or trace startup.`;
      renderAll();
    });
  });

  runTrace.addEventListener("click", () => playTrace());
  reset.addEventListener("click", () => {
    stopTrace();
    selectedId = data().nodes[1].id;
    activeTrace = -1;
    status.textContent = "Reset. Pick a file or trace startup.";
    renderAll();
  });

  status.textContent = "Web app selected. Click a file or trace startup.";
  renderAll();
}
