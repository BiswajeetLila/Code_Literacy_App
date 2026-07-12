type RangeId = "caret" | "tilde" | "exact";

const VERSIONS = ["1.2.3", "1.2.9", "1.3.0", "2.0.0"];

const RANGES: Record<RangeId, { label: string; allowed: string[]; plain: string }> = {
  caret: {
    label: "^1.2.3",
    allowed: ["1.2.3", "1.2.9", "1.3.0"],
    plain: "Compatible updates in major version 1 are allowed.",
  },
  tilde: {
    label: "~1.2.3",
    allowed: ["1.2.3", "1.2.9"],
    plain: "Patch updates in 1.2 are allowed, but 1.3.0 is outside the note.",
  },
  exact: {
    label: "1.2.3",
    allowed: ["1.2.3"],
    plain: "Only the exact edition written on the list is allowed.",
  },
};

export function mountWeek02ShoppingLab(host: HTMLElement): void {
  let range: RangeId = "caret";

  host.innerHTML = `
    <section class="w2-lab" aria-labelledby="w2-shopping-title">
      <header class="w2-lab-head">
        <p class="w2-kicker">LAB 2.1 &middot; VERSION RECEIPT</p>
        <h2 id="w2-shopping-title">Shopping List &amp; Receipt</h2>
        <p>Choose a range, predict every version it permits, then check the exact receipt.</p>
      </header>
      <div class="w2-range-controls" role="group" aria-label="Version range">
        ${Object.entries(RANGES).map(([id, item]) => `
          <button type="button" data-range="${id}" aria-pressed="${id === range}">${item.label}</button>
        `).join("")}
      </div>
      <div class="w2-ledger">
        <section class="w2-file" aria-labelledby="w2-list-title">
          <div class="w2-file-bar"><h3 id="w2-list-title">package.json</h3><span>allowed range</span></div>
          <pre id="w2-package-json"></pre>
        </section>
        <section class="w2-file" aria-labelledby="w2-lock-title">
          <div class="w2-file-bar"><h3 id="w2-lock-title">package-lock.json</h3><span>exact receipt</span></div>
          <pre id="w2-lockfile"></pre>
        </section>
      </div>
      <fieldset class="w2-version-fieldset">
        <legend>Which versions may install?</legend>
        <div class="w2-version-list">
          ${VERSIONS.map((version) => `
            <label><input type="checkbox" value="${version}"><span>${version}</span></label>
          `).join("")}
        </div>
      </fieldset>
      <div class="w2-actions">
        <button id="w2-check-range" type="button">Check prediction</button>
        <button id="w2-reset-range" type="button">Reset</button>
      </div>
      <div id="w2-range-feedback" class="w2-feedback" aria-live="polite"></div>
      <p id="w2-range-status" class="w2-status" role="status" aria-live="polite"></p>
    </section>
  `;

  const packageJson = host.querySelector<HTMLElement>("#w2-package-json")!;
  const lockfile = host.querySelector<HTMLElement>("#w2-lockfile")!;
  const feedback = host.querySelector<HTMLElement>("#w2-range-feedback")!;
  const status = host.querySelector<HTMLElement>("#w2-range-status")!;
  const check = host.querySelector<HTMLButtonElement>("#w2-check-range")!;

  function selected(): string[] {
    return Array.from(host.querySelectorAll<HTMLInputElement>('.w2-version-list input:checked'))
      .map((input) => input.value)
      .sort();
  }

  function render(): void {
    const item = RANGES[range];
    host.querySelectorAll<HTMLButtonElement>("[data-range]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.range === range));
    });
    packageJson.textContent = `{\n  "dependencies": {\n    "parcel": "${item.label}"\n  }\n}`;
    lockfile.textContent = `{\n  "parcel": {\n    "version": "? predict first"\n  }\n}`;
    feedback.replaceChildren();
    status.textContent = `${item.label} selected. ${item.plain}`;
  }

  host.querySelectorAll<HTMLButtonElement>("[data-range]").forEach((button) => {
    button.addEventListener("click", () => {
      range = button.dataset.range as RangeId;
      host.querySelectorAll<HTMLInputElement>('.w2-version-list input').forEach((input) => {
        input.checked = false;
      });
      render();
    });
  });

  check.addEventListener("click", () => {
    const item = RANGES[range];
    const picked = selected();
    const correct = picked.length === item.allowed.length && picked.every((value, index) => value === [...item.allowed].sort()[index]);
    const installed = item.allowed[item.allowed.length - 1];
    feedback.className = `w2-feedback ${correct ? "is-pass" : "is-review"}`;
    feedback.innerHTML = `
      <h3>${correct ? "Prediction matched" : "Check the range again"}</h3>
      <p>${item.label} permits ${item.allowed.join(", ")}. ${item.plain}</p>
      <p><b>Receipt:</b> the installer chooses the newest permitted candidate here: ${installed}.</p>
    `;
    lockfile.textContent = `{\n  "parcel": {\n    "version": "${installed}"\n  }\n}`;
    status.textContent = correct
      ? `Correct. ${item.allowed.length} versions are allowed and ${installed} is written to the lockfile.`
      : `Not yet. The allowed versions are ${item.allowed.join(", ")}.`;
  });

  host.querySelector<HTMLButtonElement>("#w2-reset-range")!.addEventListener("click", () => {
    range = "caret";
    host.querySelectorAll<HTMLInputElement>('.w2-version-list input').forEach((input) => {
      input.checked = false;
    });
    render();
  });

  render();
}

type PackageKind = "real" | "made-up" | "knock-off";

const PACKAGE_CASES: Array<{
  id: string;
  code: string;
  answer: PackageKind;
  explanation: string;
}> = [
  {
    id: "express",
    code: "import express from 'express';",
    answer: "real",
    explanation: "express is a real npm package with established documentation and history.",
  },
  {
    id: "instant",
    code: "import helper from 'instant-perfect-ai';",
    answer: "made-up",
    explanation: "This confident-looking name is unverified. Search the registry before trusting it.",
  },
  {
    id: "reqests",
    code: "import reqests",
    answer: "knock-off",
    explanation: "reqests is one letter away from requests. Close spelling is a warning, not proof of safety.",
  },
  {
    id: "react",
    code: "import React from 'react';",
    answer: "real",
    explanation: "react is a real npm package, but a real name should still be checked in an unfamiliar project.",
  },
];

export function mountWeek02FakeLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w2-lab" aria-labelledby="w2-fake-title">
      <header class="w2-lab-head">
        <p class="w2-kicker">LAB 2.2 &middot; PACKAGE CHECK</p>
        <h2 id="w2-fake-title">Spot the Fake</h2>
        <p>Classify each suggested import. The final check explains what evidence to seek.</p>
      </header>
      <div class="w2-package-cases">
        ${PACKAGE_CASES.map((item, index) => `
          <fieldset class="w2-package-case" data-case="${item.id}">
            <legend>${String(index + 1).padStart(2, "0")} &middot; <code>${item.code}</code></legend>
            <div class="w2-kind-options">
              ${(["real", "made-up", "knock-off"] as PackageKind[]).map((kind) => `
                <label><input type="radio" name="w2-${item.id}" value="${kind}"><span>${kind}</span></label>
              `).join("")}
            </div>
            <p class="w2-case-feedback"></p>
          </fieldset>
        `).join("")}
      </div>
      <div class="w2-actions">
        <button id="w2-check-packages" type="button">Check all imports</button>
        <button id="w2-reset-packages" type="button">Reset</button>
      </div>
      <div id="w2-package-summary" class="w2-feedback" aria-live="polite"></div>
      <p id="w2-package-status" class="w2-status" role="status" aria-live="polite"></p>
    </section>
  `;

  const summary = host.querySelector<HTMLElement>("#w2-package-summary")!;
  const status = host.querySelector<HTMLElement>("#w2-package-status")!;

  host.querySelector<HTMLButtonElement>("#w2-check-packages")!.addEventListener("click", () => {
    let score = 0;
    let answered = 0;
    PACKAGE_CASES.forEach((item) => {
      const fieldset = host.querySelector<HTMLElement>(`[data-case="${item.id}"]`)!;
      const picked = fieldset.querySelector<HTMLInputElement>('input:checked')?.value as PackageKind | undefined;
      const output = fieldset.querySelector<HTMLElement>(".w2-case-feedback")!;
      if (picked) answered += 1;
      if (picked === item.answer) score += 1;
      fieldset.classList.toggle("is-pass", picked === item.answer);
      fieldset.classList.toggle("is-review", Boolean(picked) && picked !== item.answer);
      output.textContent = picked ? item.explanation : "Choose a category before the review is complete.";
    });

    const complete = answered === PACKAGE_CASES.length;
    summary.className = `w2-feedback ${complete && score === PACKAGE_CASES.length ? "is-pass" : "is-review"}`;
    summary.innerHTML = `
      <h3>${complete && score === PACKAGE_CASES.length ? "All four checked" : "Verification still needed"}</h3>
      <p>Score: ${score} of ${PACKAGE_CASES.length}. A name is only the first clue: check the official registry, spelling, owner, age, downloads, and documentation before install.</p>
    `;
    status.textContent = `${answered} of ${PACKAGE_CASES.length} answered; ${score} correct.`;
  });

  host.querySelector<HTMLButtonElement>("#w2-reset-packages")!.addEventListener("click", () => {
    host.querySelectorAll<HTMLInputElement>('.w2-package-case input').forEach((input) => {
      input.checked = false;
    });
    host.querySelectorAll<HTMLElement>('.w2-package-case').forEach((item) => {
      item.classList.remove("is-pass", "is-review");
      item.querySelector<HTMLElement>(".w2-case-feedback")!.textContent = "";
    });
    summary.replaceChildren();
    summary.className = "w2-feedback";
    status.textContent = "Reset complete. Classify each import again.";
  });

  status.textContent = "Four imports ready for classification.";
}
