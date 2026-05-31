// errorWindows.ts (Lesson 3 — "Where errors show up")
// Same lesson, two windows. A Python crash prints in the TERMINAL (the cook's
// window). A website crash prints in the BROWSER CONSOLE (the page's window).
// The skill: know which window to look in. Click a red line to decode it.

type Decode = { says: string; window: string; side: string; fix: string };

const QUIET = '<span class="err-quiet">(no errors here)</span>';

const PYTHON_TERMINAL = `<span class="err-line">$ python app.py</span>
<span class="err-line">Traceback (most recent call last):</span>
<span class="err-line">  File "app.py", line 3, in &lt;module&gt;</span>
<span class="err-line">    print(total)</span>
<span class="err-line red" data-decode="py">NameError: name 'total' is not defined</span>`;

const JS_CONSOLE = `<span class="err-line">&gt; openMenu()</span>
<span class="err-line red" data-decode="js">Uncaught TypeError: openMenu is not a function</span>
<span class="err-line">    at app.js:12</span>`;

const DECODES: Record<string, Decode> = {
  py: {
    says: "The code used the name 'total', but 'total' was never created.",
    window: "TERMINAL — the cook's window.",
    side: "Server / Python side (the kitchen).",
    fix: "Usually a typo, or a missing line that should have made 'total' first.",
  },
  js: {
    says: "The code tried to use 'openMenu' as a function, but it isn't one.",
    window: "BROWSER CONSOLE — the page's window.",
    side: "Frontend / JavaScript side (the dining room).",
    fix: "Check the spelling, and that 'openMenu' was actually defined before it's called.",
  },
};

export function mountErrorWindows(host: HTMLElement): void {
  host.innerHTML = `
    <p class="hint">Break something and watch which window lights up. Then click the red line.</p>
    <div class="err-controls">
      <button id="err-py" type="button">Break the Python (server) code</button>
      <button id="err-js" type="button">Break the website (page) code</button>
      <button id="err-clear" type="button">⟲ Clear both</button>
    </div>
    <div class="err-windows">
      <div class="err-win">
        <div class="err-win-title"><span>TERMINAL</span><span class="who">the cook · Python</span></div>
        <div class="err-body" id="err-terminal">${QUIET}</div>
      </div>
      <div class="err-win">
        <div class="err-win-title"><span>BROWSER CONSOLE</span><span class="who">the page · JavaScript</span></div>
        <div class="err-body" id="err-console">${QUIET}</div>
      </div>
    </div>
    <div class="err-decode" id="err-decode"></div>
  `;

  const terminal = host.querySelector<HTMLElement>("#err-terminal")!;
  const console_ = host.querySelector<HTMLElement>("#err-console")!;
  const decodeBox = host.querySelector<HTMLElement>("#err-decode")!;

  function clear(): void {
    terminal.innerHTML = QUIET;
    console_.innerHTML = QUIET;
    decodeBox.classList.remove("show");
  }

  function wireRedLines(): void {
    host.querySelectorAll<HTMLElement>(".err-line.red").forEach((line) => {
      line.addEventListener("click", () => {
        const d = DECODES[line.dataset.decode!];
        decodeBox.innerHTML = `
          <h4>Reading the red line</h4>
          <p><b>What it says:</b> ${d.says}</p>
          <p><b>Which window:</b> ${d.window} <br><b>Which side:</b> ${d.side}</p>
          <p><b>Likely fix:</b> ${d.fix}</p>
        `;
        decodeBox.classList.add("show");
      });
    });
  }

  host.querySelector<HTMLButtonElement>("#err-py")!.addEventListener("click", () => {
    clear();
    terminal.innerHTML = PYTHON_TERMINAL;
    wireRedLines();
  });
  host.querySelector<HTMLButtonElement>("#err-js")!.addEventListener("click", () => {
    clear();
    console_.innerHTML = JS_CONSOLE;
    wireRedLines();
  });
  host.querySelector<HTMLButtonElement>("#err-clear")!.addEventListener("click", clear);
}
