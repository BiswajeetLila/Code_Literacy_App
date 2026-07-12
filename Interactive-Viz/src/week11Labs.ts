type BriefPart = {
  id: "outcome" | "scope" | "constraints" | "prior" | "breakdown" | "verification";
  title: string;
  brief: string;
  test: string;
};

const BRIEF_PARTS: BriefPart[] = [
  { id: "outcome", title: "Outcome", brief: "Show a Week 11 course-map card that opens #/week/11.", test: "A learner can see the card and activate its route." },
  { id: "scope", title: "Scope", brief: "Change the Week 11 feature files and the course-map metadata only.", test: "The allowed files and behavior boundary are named." },
  { id: "constraints", title: "Constraints", brief: "Keep the NASA manual shell. Do not change shared styles, router behavior, or add a framework.", test: "A reviewer can inspect the diff for forbidden changes." },
  { id: "prior", title: "Prior decisions", brief: "Follow PROJECT-PLAN.md and CONTENT-GUIDE.md; use renderContentWeek and registered widgets.", test: "The brief points to the existing source of truth instead of inventing new rules." },
  { id: "breakdown", title: "Task breakdown", brief: "Add WeekData, page wrapper, two lab exports, widget registrations, then the course-map entry.", test: "The work can be planned and reviewed as small, ordered pieces." },
  { id: "verification", title: "Verification", brief: "Run the build; open #/week/11; check keyboard focus, reduced motion, and no overflow at 375px.", test: "Each check has observable evidence and a pass-or-fail result." },
];

export function mountWeek11CompareLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w11-lab w11-compare" aria-labelledby="w11-compare-title">
      <header class="w11-head">
        <p class="w11-kicker">LAB 11.1 &middot; SAME TASK, DIFFERENT TARGET</p>
        <h2 id="w11-compare-title">Vague vs Spec</h2>
        <p>Both agents receive the request to add a Week 11 course-map card. Predict which outcome keeps the existing app decisions intact, then reveal the result.</p>
      </header>
      <div class="w11-compare-grid">
        <article class="w11-brief-card is-vague">
          <p class="w11-card-label">ONE-LINE PROMPT</p>
          <h3>Add a Week 11 card to the course map.</h3>
          <p>The target, allowed files, standing rules, and proof of done are all left for the agent to guess.</p>
        </article>
        <article class="w11-brief-card is-spec">
          <p class="w11-card-label">SIX-PART SPEC</p>
          <h3>Add a Week 11 card that opens <code>#/week/11</code>.</h3>
          <ul>
            <li><b>Outcome:</b> learners can open the new lesson.</li>
            <li><b>Scope:</b> metadata plus Week 11 files only.</li>
            <li><b>Constraints:</b> keep the manual shell and current route pattern.</li>
            <li><b>Prior decisions:</b> use <code>renderContentWeek</code> and project content rules.</li>
            <li><b>Task breakdown:</b> content, page, labs, registration, metadata.</li>
            <li><b>Verification:</b> build, route, keyboard, reduced motion, 375px.</li>
          </ul>
        </article>
      </div>
      <fieldset class="w11-predict">
        <legend>Which outcome do you expect from the vague one-line prompt?</legend>
        <label><input type="radio" name="w11-compare-prediction" value="drift"> It may replace the course map with a new visual idea because the boundaries are unknown.</label>
        <label><input type="radio" name="w11-compare-prediction" value="focused"> It will certainly make only the small routed card because the one line is enough.</label>
      </fieldset>
      <div class="w11-actions">
        <button id="w11-compare-reveal" type="button">Reveal agent outcomes</button>
        <button id="w11-compare-reset" type="button" class="w11-secondary">Reset</button>
      </div>
      <div id="w11-compare-outcomes" class="w11-outcomes" hidden>
        <article class="w11-outcome is-drift">
          <p class="w11-card-label">OUTCOME A &middot; VAGUE PROMPT</p>
          <h3>Polished, but off target</h3>
          <p>The agent replaces the course-map grid with a large animated carousel, edits shared styles, and adds a new navigation pattern. Week 11 is visible, but the existing manual card pattern, scope, and mobile verification were never named.</p>
        </article>
        <article class="w11-outcome is-focused">
          <p class="w11-card-label">OUTCOME B &middot; SIX-PART SPEC</p>
          <h3>Small change, clear proof</h3>
          <p>The agent adds the routed Week 11 card using the existing pattern, keeps the shell unchanged, and reports the build, route, keyboard, reduced-motion, and 375px checks. The spec made the intended tradeoffs inspectable.</p>
        </article>
      </div>
      <div id="w11-compare-feedback" class="w11-feedback" aria-live="polite"></div>
      <p id="w11-compare-status" class="w11-status" role="status" aria-live="polite">Compare lab ready. Choose a prediction, then reveal both outcomes.</p>
    </section>
  `;

  const feedback = host.querySelector<HTMLElement>("#w11-compare-feedback")!;
  const outcomes = host.querySelector<HTMLElement>("#w11-compare-outcomes")!;
  const status = host.querySelector<HTMLElement>("#w11-compare-status")!;

  function reset(): void {
    host.querySelectorAll<HTMLInputElement>('input[name="w11-compare-prediction"]').forEach((input) => { input.checked = false; });
    outcomes.hidden = true;
    feedback.className = "w11-feedback";
    feedback.replaceChildren();
    status.textContent = "Compare lab reset. Choose a prediction, then reveal both outcomes.";
  }

  host.querySelector<HTMLButtonElement>("#w11-compare-reveal")!.addEventListener("click", () => {
    const prediction = host.querySelector<HTMLInputElement>('input[name="w11-compare-prediction"]:checked')?.value;
    outcomes.hidden = false;
    if (!prediction) {
      feedback.className = "w11-feedback is-review";
      feedback.innerHTML = "<h3>Make a prediction first</h3><p>Choose the outcome you expect before you reveal the comparison.</p>";
      status.textContent = "Both outcomes are shown. A prediction was not selected.";
      return;
    }
    const matched = prediction === "drift";
    feedback.className = `w11-feedback ${matched ? "is-pass" : "is-review"}`;
    feedback.innerHTML = `<h3>${matched ? "Prediction matched" : "Look at the missing information"}</h3><p>${matched ? "A one-line request leaves the agent to invent scope, constraints, and verification. The six-part spec turns those guesses into a reviewable target." : "A good agent may make a small change, but the one-line prompt does not require it. The spec makes the small, verifiable path explicit."}</p>`;
    status.textContent = `${matched ? "Prediction matched." : "Prediction needs review."} The vague outcome drifted because the brief did not name boundaries or evidence.`;
  });
  host.querySelector<HTMLButtonElement>("#w11-compare-reset")!.addEventListener("click", reset);
}

export function mountWeek11BriefLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w11-lab w11-builder" aria-labelledby="w11-brief-title">
      <header class="w11-head">
        <p class="w11-kicker">LAB 11.2 &middot; SIX-PART BUILD-UP</p>
        <h2 id="w11-brief-title">Write the Brief</h2>
        <p>Click each useful sentence to add it to the implementation brief. Then grade whether the six parts give a reviewer testable evidence.</p>
      </header>
      <div class="w11-builder-layout">
        <section class="w11-parts" aria-label="Available specification parts">
          ${BRIEF_PARTS.map((part, index) => `<button type="button" class="w11-part" data-part="${part.id}" aria-pressed="false"><span>${String(index + 1).padStart(2, "0")}</span><b>${part.title}</b><small>${part.brief}</small></button>`).join("")}
        </section>
        <section class="w11-draft" aria-labelledby="w11-draft-title">
          <p class="w11-card-label">ASSEMBLED BRIEF</p>
          <h3 id="w11-draft-title">Week 11 course-map card</h3>
          <ol id="w11-brief-output" class="w11-brief-output"><li class="is-empty">Choose a part to add it to the brief.</li></ol>
        </section>
      </div>
      <div class="w11-actions">
        <button id="w11-brief-grade" type="button">Grade the brief</button>
        <button id="w11-brief-reset" type="button" class="w11-secondary">Reset</button>
      </div>
      <section class="w11-grade" aria-labelledby="w11-grade-title">
        <h3 id="w11-grade-title">Completeness and testability</h3>
        <ul id="w11-grade-list">${BRIEF_PARTS.map((part) => `<li data-grade="${part.id}"><b>${part.title}</b><span>Missing</span></li>`).join("")}</ul>
      </section>
      <div id="w11-brief-feedback" class="w11-feedback" aria-live="polite"></div>
      <p id="w11-brief-status" class="w11-status" role="status" aria-live="polite">Brief builder ready. Add all six parts, then grade the evidence.</p>
    </section>
  `;

  const selected = new Set<BriefPart["id"]>();
  const output = host.querySelector<HTMLOListElement>("#w11-brief-output")!;
  const feedback = host.querySelector<HTMLElement>("#w11-brief-feedback")!;
  const status = host.querySelector<HTMLElement>("#w11-brief-status")!;

  function render(): void {
    const parts = BRIEF_PARTS.filter((part) => selected.has(part.id));
    output.innerHTML = parts.length
      ? parts.map((part) => `<li><b>${part.title}:</b> ${part.brief}</li>`).join("")
      : '<li class="is-empty">Choose a part to add it to the brief.</li>';
    host.querySelectorAll<HTMLButtonElement>("[data-part]").forEach((button) => {
      const active = selected.has(button.dataset.part as BriefPart["id"]);
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
    host.querySelectorAll<HTMLElement>("[data-grade]").forEach((item) => {
      const part = BRIEF_PARTS.find((candidate) => candidate.id === item.dataset.grade)!;
      const active = selected.has(part.id);
      item.classList.toggle("is-ready", active);
      item.querySelector("span")!.textContent = active ? `Present: ${part.test}` : "Missing";
    });
  }

  host.querySelectorAll<HTMLButtonElement>("[data-part]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.part as BriefPart["id"];
      if (selected.has(id)) selected.delete(id);
      else selected.add(id);
      feedback.className = "w11-feedback";
      feedback.replaceChildren();
      render();
      status.textContent = `${selected.size} of 6 spec parts assembled. ${BRIEF_PARTS.find((part) => part.id === id)!.title} ${selected.has(id) ? "added" : "removed"}.`;
    });
  });

  host.querySelector<HTMLButtonElement>("#w11-brief-grade")!.addEventListener("click", () => {
    const missing = BRIEF_PARTS.filter((part) => !selected.has(part.id));
    if (missing.length) {
      feedback.className = "w11-feedback is-review";
      feedback.innerHTML = `<h3>Brief needs ${missing.length} more part${missing.length === 1 ? "" : "s"}</h3><p>Add ${missing.map((part) => part.title).join(", ")}. A reader should not have to guess the target, boundary, guardrails, prior context, work path, or proof.</p>`;
      status.textContent = `Brief is incomplete. Missing: ${missing.map((part) => part.title).join(", ")}.`;
      return;
    }
    feedback.className = "w11-feedback is-pass";
    feedback.innerHTML = "<h3>Complete and testable</h3><p>All six parts are present. The verification line names a build command, route, keyboard behavior, reduced-motion behavior, and a 375px overflow check, so the claim can be tested instead of merely trusted.</p>";
    status.textContent = "Brief complete. All six parts are present and the verification criteria are testable.";
  });

  host.querySelector<HTMLButtonElement>("#w11-brief-reset")!.addEventListener("click", () => {
    selected.clear();
    feedback.className = "w11-feedback";
    feedback.replaceChildren();
    render();
    status.textContent = "Brief builder reset. Add all six parts, then grade the evidence.";
  });
  render();
}
