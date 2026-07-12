type EvidencePart = "changed" | "expected" | "actual" | "error" | "noise";

type EvidenceItem = {
  id: string;
  source: string;
  text: string;
  part: EvidencePart;
  useful: boolean;
};

const EVIDENCE: EvidenceItem[] = [
  {
    id: "change",
    source: "DIFF SUMMARY",
    text: "Added Save validation to the profile form.",
    part: "changed",
    useful: true,
  },
  {
    id: "timestamp",
    source: "CLOCK",
    text: "Test run started at 10:42 AM.",
    part: "noise",
    useful: false,
  },
  {
    id: "expected",
    source: "ACCEPTANCE CHECK",
    text: "A valid profile form should save and show a success message.",
    part: "expected",
    useful: true,
  },
  {
    id: "warning",
    source: "CONSOLE",
    text: "DevTools failed to load a source map for analytics.js.",
    part: "noise",
    useful: false,
  },
  {
    id: "actual",
    source: "OBSERVATION",
    text: "Clicking Save leaves the form open and shows no success message.",
    part: "actual",
    useful: true,
  },
  {
    id: "vague",
    source: "CHAT NOTE",
    text: "The save button is broken.",
    part: "noise",
    useful: false,
  },
  {
    id: "error",
    source: "CONSOLE ERROR",
    text: "TypeError: response.json is not a function",
    part: "error",
    useful: true,
  },
  {
    id: "guess",
    source: "GUESS",
    text: "Maybe rewrite the whole form component.",
    part: "noise",
    useful: false,
  },
];

function makeElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) element.className = className;
  return element;
}

export function mountBugReportLab(host: HTMLElement): void {
  const selectedIds = new Set<string>();

  host.innerHTML = `
    <div class="bug-lab">
      <header class="bug-lab__header">
        <p class="bug-lab__kicker">INTERACTIVE LESSON 02</p>
        <h2>Build the Bug Report</h2>
        <p>Keep the evidence another person needs. Leave out clues that do not explain this failure.</p>
      </header>

      <div class="bug-lab__workspace">
        <section class="bug-lab__evidence-panel" aria-labelledby="bug-lab-evidence-title">
          <div class="bug-lab__panel-bar">
            <h3 id="bug-lab-evidence-title">Evidence tray</h3>
            <span id="bug-lab-selection-count">0 selected</span>
          </div>
          <fieldset class="bug-lab__evidence-fieldset">
            <legend>Choose the useful evidence</legend>
            <div id="bug-lab-evidence-list" class="bug-lab__evidence-list"></div>
          </fieldset>
        </section>

        <section class="bug-lab__report-panel" aria-labelledby="bug-lab-report-title">
          <div class="bug-lab__panel-bar">
            <h3 id="bug-lab-report-title">Live report</h3>
            <span>3-part shape</span>
          </div>
          <div id="bug-lab-preview" class="bug-lab__preview" aria-live="polite"></div>
          <div class="bug-lab__actions">
            <button id="bug-lab-submit" class="bug-lab__submit" type="button">Submit report</button>
            <button id="bug-lab-reset" class="bug-lab__reset" type="button">Reset</button>
          </div>
          <div id="bug-lab-feedback" class="bug-lab__feedback" aria-live="polite" aria-atomic="true"></div>
        </section>
      </div>

      <p id="bug-lab-status" class="bug-lab__status" role="status" aria-live="polite" aria-atomic="true">
        No evidence selected. Build the report from the evidence tray.
      </p>
    </div>
  `;

  const evidenceList = host.querySelector<HTMLElement>("#bug-lab-evidence-list")!;
  const preview = host.querySelector<HTMLElement>("#bug-lab-preview")!;
  const selectionCount = host.querySelector<HTMLElement>("#bug-lab-selection-count")!;
  const feedback = host.querySelector<HTMLElement>("#bug-lab-feedback")!;
  const status = host.querySelector<HTMLElement>("#bug-lab-status")!;
  const submit = host.querySelector<HTMLButtonElement>("#bug-lab-submit")!;
  const reset = host.querySelector<HTMLButtonElement>("#bug-lab-reset")!;

  function selectedEvidence(): EvidenceItem[] {
    return EVIDENCE.filter((item) => selectedIds.has(item.id));
  }

  function renderEvidence(): void {
    evidenceList.replaceChildren();

    for (const item of EVIDENCE) {
      const label = makeElement("label", "bug-lab__evidence-item");
      if (selectedIds.has(item.id)) label.classList.add("bug-lab__evidence-item--selected");

      const checkbox = makeElement("input", "bug-lab__checkbox");
      checkbox.type = "checkbox";
      checkbox.name = "bug-report-evidence";
      checkbox.value = item.id;
      checkbox.checked = selectedIds.has(item.id);

      const copy = makeElement("span", "bug-lab__evidence-copy");
      const source = makeElement("span", "bug-lab__evidence-source");
      source.textContent = item.source;
      const text = makeElement("span", "bug-lab__evidence-text");
      text.textContent = item.text;
      copy.append(source, text);
      label.append(checkbox, copy);

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) selectedIds.add(item.id);
        else selectedIds.delete(item.id);

        feedback.classList.remove("bug-lab__feedback--pass", "bug-lab__feedback--needs-work");
        feedback.replaceChildren();
        renderEvidence();
        renderPreview();
        announceProgress(item, checkbox.checked);
        host.querySelector<HTMLInputElement>(`input[value="${item.id}"]`)?.focus();
      });

      evidenceList.appendChild(label);
    }
  }

  function appendPreviewPart(
    number: string,
    title: string,
    items: EvidenceItem[],
    emptyText: string,
  ): void {
    const section = makeElement("section", "bug-lab__preview-part");
    const heading = makeElement("h4", "bug-lab__preview-heading");
    const marker = makeElement("span", "bug-lab__preview-number");
    marker.textContent = number;
    const headingText = makeElement("span", "bug-lab__preview-title");
    headingText.textContent = title;
    heading.append(marker, headingText);

    const body = makeElement("div", "bug-lab__preview-body");
    if (items.length === 0) {
      const empty = makeElement("p", "bug-lab__preview-empty");
      empty.textContent = emptyText;
      body.appendChild(empty);
    } else {
      for (const item of items) {
        const row = makeElement("p", "bug-lab__preview-line");
        if (item.part === "expected" || item.part === "actual") {
          const label = makeElement("strong", "bug-lab__preview-label");
          label.textContent = item.part === "expected" ? "Expected: " : "Actual: ";
          row.append(label, document.createTextNode(item.text));
        } else {
          row.textContent = item.text;
        }
        body.appendChild(row);
      }
    }

    section.append(heading, body);
    preview.appendChild(section);
  }

  function renderPreview(): void {
    const selected = selectedEvidence();
    preview.replaceChildren();
    appendPreviewPart(
      "01",
      "What changed",
      selected.filter((item) => item.part === "changed"),
      "Choose evidence that names the change.",
    );
    appendPreviewPart(
      "02",
      "Expected vs actual",
      selected.filter((item) => item.part === "expected" || item.part === "actual"),
      "Choose both the intended behavior and what happened instead.",
    );
    appendPreviewPart(
      "03",
      "Exact error",
      selected.filter((item) => item.part === "error"),
      "Choose the exact red error text.",
    );

    const noise = selected.filter((item) => item.part === "noise");
    if (noise.length > 0) {
      const extra = makeElement("aside", "bug-lab__preview-noise");
      const title = makeElement("h4", "bug-lab__preview-noise-title");
      title.textContent = "Extra evidence";
      const list = makeElement("ul", "bug-lab__preview-noise-list");
      for (const item of noise) {
        const listItem = makeElement("li", "bug-lab__preview-noise-item");
        listItem.textContent = item.text;
        list.appendChild(listItem);
      }
      extra.append(title, list);
      preview.appendChild(extra);
    }

    selectionCount.textContent = `${selected.length} selected`;
  }

  function announceProgress(item: EvidenceItem, checked: boolean): void {
    const selected = selectedEvidence();
    const usefulCount = selected.filter((entry) => entry.useful).length;
    const action = checked ? "Added" : "Removed";
    status.textContent = `${action}: ${item.text} Report has ${usefulCount} of 4 useful evidence items.`;
  }

  function addFeedbackItem(list: HTMLUListElement, text: string): void {
    const item = makeElement("li", "bug-lab__feedback-item");
    item.textContent = text;
    list.appendChild(item);
  }

  function gradeReport(): void {
    const selected = selectedEvidence();
    const missing = EVIDENCE.filter((item) => item.useful && !selectedIds.has(item.id));
    const noise = selected.filter((item) => !item.useful);
    feedback.replaceChildren();

    const heading = makeElement("h4", "bug-lab__feedback-title");
    const list = makeElement("ul", "bug-lab__feedback-list");

    if (missing.length === 0 && noise.length === 0) {
      feedback.classList.remove("bug-lab__feedback--needs-work");
      feedback.classList.add("bug-lab__feedback--pass");
      heading.textContent = "Report ready to hand back";
      addFeedbackItem(list, "What changed is specific: Save validation was added.");
      addFeedbackItem(list, "Expected and actual behavior make the gap clear.");
      addFeedbackItem(list, "The exact TypeError is preserved without unrelated console noise.");
      status.textContent = "Passed. Your bug report has all three parts and no noise.";
    } else {
      feedback.classList.remove("bug-lab__feedback--pass");
      feedback.classList.add("bug-lab__feedback--needs-work");
      heading.textContent = "Report needs another pass";

      if (missing.some((item) => item.part === "changed")) {
        addFeedbackItem(list, "Add what changed. The next person needs to know the failure began after Save validation was added.");
      }
      if (missing.some((item) => item.part === "expected")) {
        addFeedbackItem(list, "Add the expected result. State that a valid form should save and show success.");
      }
      if (missing.some((item) => item.part === "actual")) {
        addFeedbackItem(list, "Add the actual result. State what the Save click does instead of only saying it is broken.");
      }
      if (missing.some((item) => item.part === "error")) {
        addFeedbackItem(list, "Add the exact error text. A searchable TypeError is more useful than a vague summary.");
      }
      if (noise.length > 0) {
        addFeedbackItem(
          list,
          `Remove ${noise.length === 1 ? "the unrelated item" : `${noise.length} unrelated items`}. Timestamps, guesses, vague notes, and unrelated warnings hide the useful clue.`,
        );
      }
      status.textContent = `Not ready. ${missing.length} useful ${missing.length === 1 ? "item is" : "items are"} missing and ${noise.length} noise ${noise.length === 1 ? "item is" : "items are"} selected.`;
    }

    feedback.append(heading, list);
    feedback.focus({ preventScroll: true });
  }

  function resetLab(): void {
    selectedIds.clear();
    feedback.classList.remove("bug-lab__feedback--pass", "bug-lab__feedback--needs-work");
    feedback.replaceChildren();
    renderEvidence();
    renderPreview();
    status.textContent = "Reset complete. No evidence selected.";
    host.querySelector<HTMLInputElement>("#bug-lab-evidence-list input")?.focus();
  }

  feedback.tabIndex = -1;
  submit.addEventListener("click", gradeReport);
  reset.addEventListener("click", resetLab);
  renderEvidence();
  renderPreview();
}
