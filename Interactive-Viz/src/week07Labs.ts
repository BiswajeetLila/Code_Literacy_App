type HistoryCommit = {
  id: string;
  label: string;
  branch: "main" | "volunteer-signup";
  detail: string;
  document: string[];
};

const HISTORY: HistoryCommit[] = [
  { id: "a13f", label: "Start open-day draft", branch: "main", detail: "First named save on main.", document: ["Community Garden Open Day", "Date: Saturday 18 May", "Bring a mug for tea."] },
  { id: "b42c", label: "Add arrival details", branch: "main", detail: "Main gets a clearer arrival note. The branch begins from this save.", document: ["Community Garden Open Day", "Date: Saturday 18 May", "Arrive at 10:00 by the east gate.", "Bring a mug for tea."] },
  { id: "c71e", label: "Move date to June", branch: "main", detail: "Main keeps moving while the side idea is tried elsewhere.", document: ["Community Garden Open Day", "Date: Saturday 1 June", "Arrive at 10:00 by the east gate.", "Bring a mug for tea."] },
  { id: "d92a", label: "Add volunteer sign-up", branch: "volunteer-signup", detail: "The safe side copy adds one risky-but-useful idea.", document: ["Community Garden Open Day", "Date: Saturday 18 May", "Arrive at 10:00 by the east gate.", "Volunteer sign-up: garden.example/volunteer", "Bring a mug for tea."] },
  { id: "e04b", label: "Merge volunteer sign-up", branch: "main", detail: "The merge keeps main's newer date and folds in the side branch's sign-up link.", document: ["Community Garden Open Day", "Date: Saturday 1 June", "Arrive at 10:00 by the east gate.", "Volunteer sign-up: garden.example/volunteer", "Bring a mug for tea."] },
];

export function mountWeek07HistoryLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w7-lab w7-history" aria-labelledby="w7-history-title">
      <header class="w7-head"><p class="w7-kicker">LAB 7.1 · VERSION HISTORY</p><h2 id="w7-history-title">Version History</h2><p>Scrub a named save. Main is the shared document; the side line is a safe place to try the sign-up link.</p></header>
      <div class="w7-history-controls"><label for="w7-history-scrub">Scrub saved point <input id="w7-history-scrub" type="range" min="0" max="4" value="0" step="1"></label><button id="w7-history-reset" type="button">Reset history</button></div>
      <div class="w7-history-grid">
        <section class="w7-graph" aria-label="Commit history graph"><p class="w7-kicker">SAVED HISTORY</p><div class="w7-main-line" aria-hidden="true"></div><div class="w7-side-line" aria-hidden="true"></div>${HISTORY.map((commit, index) => `<button class="w7-commit ${commit.branch === "volunteer-signup" ? "is-branch" : ""}" type="button" data-history-index="${index}" aria-pressed="${index === 0}"><span class="w7-node" aria-hidden="true"></span><span>${commit.id}</span><b>${commit.branch === "main" ? "main" : "volunteer-signup"}</b><small>${commit.label}</small></button>`).join("")}<span class="w7-merge-mark" aria-hidden="true">merge</span></section>
        <section class="w7-document" aria-labelledby="w7-document-title"><p class="w7-kicker">DOCUMENT AT THIS SAVE</p><h3 id="w7-document-title">event.md</h3><pre id="w7-document-text"></pre><p id="w7-history-detail" class="w7-detail"></p></section>
      </div>
      <p id="w7-history-status" class="w7-status" role="status" aria-live="polite">History ready. Start at commit a13f.</p>
    </section>`;

  const scrub = host.querySelector<HTMLInputElement>("#w7-history-scrub")!;
  const documentText = host.querySelector<HTMLElement>("#w7-document-text")!;
  const detail = host.querySelector<HTMLElement>("#w7-history-detail")!;
  const status = host.querySelector<HTMLElement>("#w7-history-status")!;
  const buttons = [...host.querySelectorAll<HTMLButtonElement>("[data-history-index]")];

  function select(index: number): void {
    const commit = HISTORY[index];
    scrub.value = String(index);
    buttons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    documentText.textContent = commit.document.join("\n");
    detail.textContent = `${commit.id} on ${commit.branch}: ${commit.detail}`;
    status.textContent = `Showing ${commit.id}, ${commit.label}, on ${commit.branch}. ${commit.detail}`;
  }

  scrub.addEventListener("input", () => select(Number(scrub.value)));
  buttons.forEach((button) => button.addEventListener("click", () => select(Number(button.dataset.historyIndex))));
  host.querySelector<HTMLButtonElement>("#w7-history-reset")!.addEventListener("click", () => select(0));
  select(0);
}

type DiffHunk = { id: string; lines: string[]; title: string; decode: string; safe: boolean; reason: string };

const HUNKS: DiffHunk[] = [
  {
    id: "wait", title: "Hunk 1: wait for the order", safe: true,
    lines: ["@@ -12,6 +12,7 @@ async function submitOrder() {", "   const response = await fetch('/api/orders');", "+  if (!response.ok) throw new Error('Order failed');", "   const order = await response.json();"],
    decode: "The plus line adds a guard. A bad server reply now stops before the app tries to read it as an order.", reason: "Safe in this small example: it adds a clear check and does not remove existing behavior.",
  },
  {
    id: "state", title: "Hunk 2: finish the form", safe: false,
    lines: ["@@ -20,5 +21,5 @@ async function submitOrder() {", "   const order = await response.json();", "-  setSubmitted(true);", "+  // setSubmitted(true);", "   showReceipt(order.id);", " }"],
    decode: "The minus line removes the state update. The plus line only leaves a comment, so it does not run.", reason: "Not safe: the receipt may appear, but the form is no longer recorded as submitted. That can leave a button enabled or allow a duplicate order.",
  },
];

function diffLine(line: string): string {
  const kind = line.startsWith("+") ? "add" : line.startsWith("-") ? "remove" : line.startsWith("@@") ? "range" : "context";
  return `<span class="w7-diff-line is-${kind}">${line || " "}</span>`;
}

export function mountWeek07DiffLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w7-lab w7-diff" aria-labelledby="w7-diff-title">
      <header class="w7-head"><p class="w7-kicker">LAB 7.2 · DIFF REVIEW</p><h2 id="w7-diff-title">Read the Diff</h2><p>Click a hunk, then decide whether it keeps the app safe or quietly removes something it needs.</p></header>
      <div class="w7-diff-toolbar"><p><code>diff --git a/src/checkout.ts b/src/checkout.ts</code></p><button id="w7-diff-reset" type="button">Reset review</button></div>
      <div class="w7-diff-grid"><section class="w7-diff-file" aria-label="Changed lines in src checkout"><p class="w7-file-name">src/checkout.ts</p><pre class="w7-diff-meta">index 7a1c0e2..98d3ab4 100644
--- a/src/checkout.ts
+++ b/src/checkout.ts</pre>${HUNKS.map((hunk, index) => `<button class="w7-hunk" type="button" data-hunk-index="${index}" aria-pressed="${index === 0}"><span class="w7-hunk-title">${hunk.title}</span><code>${hunk.lines.map(diffLine).join("")}</code></button>`).join("")}</section><section class="w7-decode" aria-labelledby="w7-decode-title"><p class="w7-kicker">CLICKED HUNK</p><h3 id="w7-decode-title"></h3><p id="w7-decode-copy"></p><fieldset class="w7-predict"><legend>Before you reveal it, is this change safe?</legend><label><input type="radio" name="w7-safety" value="safe"> Safe: it preserves the needed behavior</label><label><input type="radio" name="w7-safety" value="risk"> Risky: it quietly deletes something</label></fieldset><button id="w7-check-safety" type="button">Check prediction</button><div id="w7-safety-feedback" class="w7-feedback" aria-live="polite"></div></section></div>
      <p id="w7-diff-status" class="w7-status" role="status" aria-live="polite">Diff ready. Hunk 1 is selected; choose a safety prediction before checking it.</p>
    </section>`;

  const title = host.querySelector<HTMLElement>("#w7-decode-title")!;
  const copy = host.querySelector<HTMLElement>("#w7-decode-copy")!;
  const feedback = host.querySelector<HTMLElement>("#w7-safety-feedback")!;
  const status = host.querySelector<HTMLElement>("#w7-diff-status")!;
  const hunkButtons = [...host.querySelectorAll<HTMLButtonElement>("[data-hunk-index]")];
  let selected = 0;

  function select(index: number): void {
    selected = index;
    const hunk = HUNKS[index];
    hunkButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    title.textContent = hunk.title;
    copy.textContent = hunk.decode;
    host.querySelectorAll<HTMLInputElement>('input[name="w7-safety"]').forEach((input) => { input.checked = false; });
    feedback.replaceChildren();
    feedback.className = "w7-feedback";
    status.textContent = `${hunk.title} selected. ${hunk.decode} Choose a safety prediction.`;
  }

  hunkButtons.forEach((button) => button.addEventListener("click", () => select(Number(button.dataset.hunkIndex))));
  host.querySelector<HTMLButtonElement>("#w7-check-safety")!.addEventListener("click", () => {
    const choice = host.querySelector<HTMLInputElement>('input[name="w7-safety"]:checked')?.value;
    const hunk = HUNKS[selected];
    const correct = choice === (hunk.safe ? "safe" : "risk");
    feedback.className = `w7-feedback ${correct ? "is-pass" : "is-review"}`;
    feedback.innerHTML = `<h3>${correct ? "Prediction matched" : "Look at the changed behavior"}</h3><p>${hunk.reason}</p>`;
    status.textContent = `${correct ? "Prediction matched." : "Prediction needs review."} ${hunk.reason}`;
  });
  host.querySelector<HTMLButtonElement>("#w7-diff-reset")!.addEventListener("click", () => {
    host.querySelectorAll<HTMLInputElement>('input[name="w7-safety"]').forEach((input) => { input.checked = false; });
    select(0);
  });
  select(0);
}
