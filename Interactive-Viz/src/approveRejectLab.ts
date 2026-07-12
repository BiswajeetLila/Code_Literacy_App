type Verdict = "approve" | "reject";
type DiffLineKind = "file" | "hunk" | "context" | "add" | "remove";

type DiffLine = {
  kind: DiffLineKind;
  text: string;
};

type ReviewReason = {
  id: string;
  label: string;
};

type ReviewScenario = {
  id: string;
  title: string;
  request: string;
  file: string;
  verdict: Verdict;
  correctReasonId: string;
  reasons: ReviewReason[];
  diff: DiffLine[];
  explanation: string;
  impact: string;
};

const SCENARIOS: ReviewScenario[] = [
  {
    id: "safe-submit-guard",
    title: "Prevent a double save",
    request: "Keep the Save button disabled while the profile request is already running.",
    file: "src/ProfileForm.tsx",
    verdict: "approve",
    correctReasonId: "matches-request",
    reasons: [
      {
        id: "matches-request",
        label: "It uses the existing saving state and changes only the requested button behavior.",
      },
      {
        id: "all-small-safe",
        label: "It is safe because every one-line diff can be approved without checking context.",
      },
      {
        id: "package-needed",
        label: "It adds a package that the form needs before it can save.",
      },
    ],
    diff: [
      { kind: "file", text: "--- a/src/ProfileForm.tsx" },
      { kind: "file", text: "+++ b/src/ProfileForm.tsx" },
      { kind: "hunk", text: "@@ -42,7 +42,7 @@ export function ProfileForm() {" },
      { kind: "context", text: "       <button" },
      { kind: "context", text: "         type=\"submit\"" },
      { kind: "remove", text: "-        disabled={!isValid}" },
      { kind: "add", text: "+        disabled={!isValid || isSaving}" },
      { kind: "context", text: "       >" },
      { kind: "context", text: "         Save profile" },
    ],
    explanation:
      "Approve. The added condition reuses isSaving and directly matches the request. No unrelated behavior or dependency changes are introduced.",
    impact:
      "Nothing should break from this change: invalid forms stay disabled, and a valid form is disabled only during its active save request.",
  },
  {
    id: "invented-package",
    title: "Add a success celebration",
    request: "Show a small celebration after an order is saved.",
    file: "src/saveOrder.ts",
    verdict: "reject",
    correctReasonId: "unverified-package",
    reasons: [
      {
        id: "unverified-package",
        label: "The new package is not in package.json and must be verified before it is trusted or installed.",
      },
      {
        id: "imports-bad",
        label: "All third-party imports are unsafe and should always be rejected.",
      },
      {
        id: "wrong-message",
        label: "The success message needs an exclamation mark.",
      },
    ],
    diff: [
      { kind: "file", text: "--- a/src/saveOrder.ts" },
      { kind: "file", text: "+++ b/src/saveOrder.ts" },
      { kind: "hunk", text: "@@ -1,4 +1,5 @@" },
      { kind: "add", text: "+import { celebrate } from \"instant-perfect-ai\";" },
      { kind: "context", text: " import { api } from \"./api\";" },
      { kind: "context", text: " " },
      { kind: "context", text: " export async function saveOrder(order: Order) {" },
      { kind: "hunk", text: "@@ -8,5 +9,6 @@ export async function saveOrder(order: Order) {" },
      { kind: "context", text: "   await api.post(\"/orders\", order);" },
      { kind: "add", text: "+  celebrate({ message: \"Order saved\" });" },
      { kind: "context", text: " }" },
    ],
    explanation:
      "Reject. The diff invents or introduces instant-perfect-ai without a matching manifest change or evidence that the package exists and is appropriate.",
    impact:
      "The build can fail with a module-not-found error. Installing an unverified name can also pull unknown code into the project.",
  },
  {
    id: "deleted-state-update",
    title: "Simplify order loading",
    request: "Remove unnecessary lines from the order loader without changing what appears on screen.",
    file: "src/useOrders.ts",
    verdict: "reject",
    correctReasonId: "state-never-updates",
    reasons: [
      {
        id: "state-never-updates",
        label: "The fetched orders are no longer copied into state, so the screen will keep its old or empty list.",
      },
      {
        id: "unused-json",
        label: "JSON responses cannot be stored in component state.",
      },
      {
        id: "shorter-better",
        label: "The shorter function is automatically safer because it has fewer lines.",
      },
    ],
    diff: [
      { kind: "file", text: "--- a/src/useOrders.ts" },
      { kind: "file", text: "+++ b/src/useOrders.ts" },
      { kind: "hunk", text: "@@ -18,7 +18,6 @@ export function useOrders() {" },
      { kind: "context", text: "     const response = await fetch(\"/api/orders\");" },
      { kind: "context", text: "     if (!response.ok) throw new Error(\"Load failed\");" },
      { kind: "context", text: "     const orders = await response.json();" },
      { kind: "remove", text: "-    setOrders(orders);" },
      { kind: "context", text: "   }" },
      { kind: "context", text: " " },
      { kind: "context", text: "   void loadOrders();" },
    ],
    explanation:
      "Reject. setOrders(orders) is the line that moves the fetched data into the state rendered by the page. It is behavior, not cleanup.",
    impact:
      "The request can still succeed and the project can still build, but users will see an empty or stale order list.",
  },
  {
    id: "broken-api-contract",
    title: "Simplify order creation",
    request: "Clean up the create-order request without changing the server contract.",
    file: "src/api/createOrder.ts",
    verdict: "reject",
    correctReasonId: "method-breaks-contract",
    reasons: [
      {
        id: "method-breaks-contract",
        label: "The create endpoint expects POST with a JSON body, but the diff changes the request to GET and drops that body.",
      },
      {
        id: "get-always-slow",
        label: "GET requests are always slower than POST requests.",
      },
      {
        id: "fetch-needs-import",
        label: "fetch cannot be called unless it is imported from a package.",
      },
    ],
    diff: [
      { kind: "file", text: "--- a/src/api/createOrder.ts" },
      { kind: "file", text: "+++ b/src/api/createOrder.ts" },
      { kind: "hunk", text: "@@ -2,11 +2,7 @@ export async function createOrder(order: NewOrder) {" },
      { kind: "remove", text: "-  const response = await fetch(\"/api/orders\", {" },
      { kind: "remove", text: "-    method: \"POST\"," },
      { kind: "remove", text: "-    headers: { \"Content-Type\": \"application/json\" }," },
      { kind: "remove", text: "-    body: JSON.stringify(order)," },
      { kind: "remove", text: "-  });" },
      { kind: "add", text: "+  const response = await fetch(\"/api/orders\");" },
      { kind: "context", text: "   if (!response.ok) throw new Error(\"Create failed\");" },
      { kind: "context", text: "   return response.json();" },
      { kind: "context", text: " }" },
    ],
    explanation:
      "Reject. The original request uses the API's create contract: POST plus the new order as JSON. The replacement is a GET that sends no order.",
    impact:
      "The server may return the existing order list instead of creating anything, or reject the request. The user's new order will not be saved.",
  },
  {
    id: "missing-await",
    title: "Tidy the response parser",
    request: "Make the order loader easier to read while preserving its behavior.",
    file: "src/loadOrders.ts",
    verdict: "reject",
    correctReasonId: "promise-instead-of-data",
    reasons: [
      {
        id: "promise-instead-of-data",
        label: "response.json() returns a Promise, so removing await passes unfinished work instead of the orders array.",
      },
      {
        id: "await-style",
        label: "Every function call in an async function must start with await.",
      },
      {
        id: "const-invalid",
        label: "A const variable cannot hold data returned by fetch.",
      },
    ],
    diff: [
      { kind: "file", text: "--- a/src/loadOrders.ts" },
      { kind: "file", text: "+++ b/src/loadOrders.ts" },
      { kind: "hunk", text: "@@ -5,7 +5,7 @@ export async function loadOrders() {" },
      { kind: "context", text: "   const response = await fetch(\"/api/orders\");" },
      { kind: "context", text: "   if (!response.ok) throw new Error(\"Load failed\");" },
      { kind: "context", text: " " },
      { kind: "remove", text: "-  const orders = await response.json();" },
      { kind: "add", text: "+  const orders = response.json();" },
      { kind: "context", text: "   renderOrders(orders);" },
      { kind: "context", text: " }" },
    ],
    explanation:
      "Reject. Parsing the response body is asynchronous. The removed await changes orders from the parsed array into a pending Promise.",
    impact:
      "renderOrders may throw when it tries to loop over the value, or render nothing because it received a Promise instead of order data.",
  },
  {
    id: "swallowed-error",
    title: "Keep the orders page quiet",
    request: "Handle order-loading failures without hiding information needed to diagnose them.",
    file: "src/api/loadOrders.ts",
    verdict: "reject",
    correctReasonId: "failure-hidden",
    reasons: [
      {
        id: "failure-hidden",
        label: "The catch block replaces every failure with an empty list and discards the exact error that explains what went wrong.",
      },
      {
        id: "catch-forbidden",
        label: "Using catch is always wrong because errors should never be handled.",
      },
      {
        id: "arrays-invalid",
        label: "An async function is not allowed to return an array.",
      },
    ],
    diff: [
      { kind: "file", text: "--- a/src/api/loadOrders.ts" },
      { kind: "file", text: "+++ b/src/api/loadOrders.ts" },
      { kind: "hunk", text: "@@ -1,7 +1,11 @@ export async function loadOrders() {" },
      { kind: "add", text: "+  try {" },
      { kind: "context", text: "     const response = await fetch(\"/api/orders\");" },
      { kind: "context", text: "     if (!response.ok) throw new Error(`Load failed: ${response.status}`);" },
      { kind: "context", text: "     return await response.json();" },
      { kind: "add", text: "+  } catch (error) {" },
      { kind: "add", text: "+    return [];" },
      { kind: "add", text: "+  }" },
      { kind: "context", text: " }" },
    ],
    explanation:
      "Reject. Catching can be useful, but this catch discards the error and makes a failed request look like a successful request for zero orders.",
    impact:
      "Users see an empty list instead of a failure state, while developers lose the exact status or network error needed to find and fix the problem.",
  },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function mountApproveRejectLab(host: HTMLElement): void {
  let scenarioIndex = 0;
  let score = 0;
  let submitted = false;

  host.innerHTML = `
    <section class="diff-lab" aria-labelledby="diff-lab-title">
      <header class="diff-lab-header">
        <div class="diff-lab-heading">
          <p class="diff-lab-kicker">LAB 8.1 &middot; DIFF REVIEW</p>
          <h2 id="diff-lab-title">Review the changed lines</h2>
          <p>Choose a verdict, then name the reason that supports it.</p>
        </div>
        <div class="diff-lab-meters" aria-label="Lab progress">
          <p><span>Progress</span> <strong id="diff-lab-progress">1 of 6</strong></p>
          <p><span>Score</span> <strong id="diff-lab-score">0 / 6</strong></p>
        </div>
      </header>

      <div class="diff-lab-progress-track" aria-hidden="true">
        <span id="diff-lab-progress-fill" class="diff-lab-progress-fill"></span>
      </div>

      <article class="diff-lab-review" aria-labelledby="diff-lab-scenario-title">
        <header class="diff-lab-scenario-header">
          <div>
            <p id="diff-lab-scenario-number" class="diff-lab-scenario-number"></p>
            <h3 id="diff-lab-scenario-title" tabindex="-1"></h3>
          </div>
          <code id="diff-lab-file" class="diff-lab-file"></code>
        </header>

        <section class="diff-lab-request" aria-labelledby="diff-lab-request-title">
          <h4 id="diff-lab-request-title">Requested change</h4>
          <p id="diff-lab-request-copy"></p>
        </section>

        <section class="diff-lab-diff-panel" aria-labelledby="diff-lab-diff-title">
          <div class="diff-lab-panel-bar">
            <h4 id="diff-lab-diff-title">Proposed diff</h4>
            <span>unified diff</span>
          </div>
          <pre id="diff-lab-code" class="diff-lab-code" tabindex="0" aria-label="Proposed code changes"></pre>
        </section>

        <form id="diff-lab-form" class="diff-lab-form" novalidate>
          <fieldset class="diff-lab-fieldset">
            <legend>1. Your verdict</legend>
            <div class="diff-lab-verdicts">
              <label class="diff-lab-verdict">
                <input type="radio" name="diff-lab-verdict" value="approve">
                <span>Approve</span>
              </label>
              <label class="diff-lab-verdict">
                <input type="radio" name="diff-lab-verdict" value="reject">
                <span>Reject</span>
              </label>
            </div>
          </fieldset>

          <fieldset class="diff-lab-fieldset">
            <legend>2. Your reason</legend>
            <div id="diff-lab-reasons" class="diff-lab-reasons"></div>
          </fieldset>

          <p id="diff-lab-validation" class="diff-lab-validation" role="alert"></p>
          <div class="diff-lab-actions">
            <button id="diff-lab-submit" class="diff-lab-submit" type="submit">Check review</button>
            <button id="diff-lab-next" class="diff-lab-next" type="button" hidden>Next scenario</button>
          </div>
        </form>

        <section id="diff-lab-feedback" class="diff-lab-feedback" aria-labelledby="diff-lab-feedback-title" hidden>
          <h4 id="diff-lab-feedback-title"></h4>
          <p id="diff-lab-explanation"></p>
          <p class="diff-lab-impact"><strong>What would break:</strong> <span id="diff-lab-impact"></span></p>
        </section>
      </article>

      <section id="diff-lab-results" class="diff-lab-results" aria-labelledby="diff-lab-results-title" hidden>
        <p class="diff-lab-kicker">REVIEW COMPLETE</p>
        <h3 id="diff-lab-results-title" tabindex="-1"></h3>
        <p id="diff-lab-results-copy"></p>
        <button id="diff-lab-reset" class="diff-lab-reset" type="button">Review again</button>
      </section>

      <p id="diff-lab-status" class="diff-lab-status" role="status" aria-live="polite" aria-atomic="true"></p>
    </section>
  `;

  const review = host.querySelector<HTMLElement>(".diff-lab-review")!;
  const scenarioNumber = host.querySelector<HTMLElement>("#diff-lab-scenario-number")!;
  const scenarioTitle = host.querySelector<HTMLElement>("#diff-lab-scenario-title")!;
  const file = host.querySelector<HTMLElement>("#diff-lab-file")!;
  const requestCopy = host.querySelector<HTMLElement>("#diff-lab-request-copy")!;
  const code = host.querySelector<HTMLElement>("#diff-lab-code")!;
  const form = host.querySelector<HTMLFormElement>("#diff-lab-form")!;
  const reasons = host.querySelector<HTMLElement>("#diff-lab-reasons")!;
  const validation = host.querySelector<HTMLElement>("#diff-lab-validation")!;
  const submit = host.querySelector<HTMLButtonElement>("#diff-lab-submit")!;
  const next = host.querySelector<HTMLButtonElement>("#diff-lab-next")!;
  const feedback = host.querySelector<HTMLElement>("#diff-lab-feedback")!;
  const feedbackTitle = host.querySelector<HTMLElement>("#diff-lab-feedback-title")!;
  const explanation = host.querySelector<HTMLElement>("#diff-lab-explanation")!;
  const impact = host.querySelector<HTMLElement>("#diff-lab-impact")!;
  const progress = host.querySelector<HTMLElement>("#diff-lab-progress")!;
  const scoreText = host.querySelector<HTMLElement>("#diff-lab-score")!;
  const progressFill = host.querySelector<HTMLElement>("#diff-lab-progress-fill")!;
  const results = host.querySelector<HTMLElement>("#diff-lab-results")!;
  const resultsTitle = host.querySelector<HTMLElement>("#diff-lab-results-title")!;
  const resultsCopy = host.querySelector<HTMLElement>("#diff-lab-results-copy")!;
  const reset = host.querySelector<HTMLButtonElement>("#diff-lab-reset")!;
  const status = host.querySelector<HTMLElement>("#diff-lab-status")!;

  function currentScenario(): ReviewScenario {
    return SCENARIOS[scenarioIndex];
  }

  function renderDiff(scenario: ReviewScenario): void {
    code.innerHTML = scenario.diff
      .map((line) => {
        return `<span class="diff-lab-line diff-lab-line-${line.kind}">${escapeHtml(line.text)}</span>`;
      })
      .join("\n");
  }

  function renderReasons(scenario: ReviewScenario): void {
    reasons.innerHTML = scenario.reasons
      .map(
        (reason) => `
          <label class="diff-lab-reason">
            <input type="radio" name="diff-lab-reason" value="${escapeHtml(reason.id)}">
            <span>${escapeHtml(reason.label)}</span>
          </label>
        `,
      )
      .join("");
  }

  function renderScenario(moveFocus: boolean): void {
    const scenario = currentScenario();
    submitted = false;
    form.reset();
    form.hidden = false;
    feedback.hidden = true;
    submit.hidden = false;
    next.hidden = true;
    validation.textContent = "";
    scenarioNumber.textContent = `Scenario ${scenarioIndex + 1} of ${SCENARIOS.length}`;
    scenarioTitle.textContent = scenario.title;
    file.textContent = scenario.file;
    requestCopy.textContent = scenario.request;
    progress.textContent = `${scenarioIndex + 1} of ${SCENARIOS.length}`;
    scoreText.textContent = `${score} / ${SCENARIOS.length}`;
    progressFill.style.width = `${(scenarioIndex / SCENARIOS.length) * 100}%`;
    renderDiff(scenario);
    renderReasons(scenario);

    if (moveFocus) scenarioTitle.focus();
  }

  function selectedValue(name: string): string | null {
    return form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value ?? null;
  }

  function setFormDisabled(disabled: boolean): void {
    form.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      input.disabled = disabled;
    });
  }

  function submitReview(): void {
    if (submitted) return;

    const verdict = selectedValue("diff-lab-verdict") as Verdict | null;
    const reasonId = selectedValue("diff-lab-reason");
    if (!verdict || !reasonId) {
      const missing = !verdict && !reasonId ? "a verdict and a reason" : !verdict ? "a verdict" : "a reason";
      validation.textContent = `Choose ${missing} before checking your review.`;
      status.textContent = `Review incomplete. Choose ${missing}.`;
      const firstMissing = !verdict
        ? form.querySelector<HTMLInputElement>('input[name="diff-lab-verdict"]')
        : form.querySelector<HTMLInputElement>('input[name="diff-lab-reason"]');
      firstMissing?.focus();
      return;
    }

    const scenario = currentScenario();
    const verdictCorrect = verdict === scenario.verdict;
    const reasonCorrect = reasonId === scenario.correctReasonId;
    const correct = verdictCorrect && reasonCorrect;
    submitted = true;
    if (correct) score += 1;

    validation.textContent = "";
    feedback.hidden = false;
    feedback.className = `diff-lab-feedback ${correct ? "diff-lab-feedback-correct" : "diff-lab-feedback-review"}`;
    feedbackTitle.textContent = correct ? "Good review" : "Review this one again";
    explanation.textContent = scenario.explanation;
    impact.textContent = scenario.impact;
    scoreText.textContent = `${score} / ${SCENARIOS.length}`;
    progressFill.style.width = `${((scenarioIndex + 1) / SCENARIOS.length) * 100}%`;
    setFormDisabled(true);
    submit.hidden = true;
    next.hidden = false;
    next.textContent = scenarioIndex === SCENARIOS.length - 1 ? "See results" : "Next scenario";

    const choiceSummary = !verdictCorrect
      ? `The safer verdict was ${scenario.verdict}.`
      : !reasonCorrect
        ? "Your verdict was right, but the reason did not identify the real evidence."
        : "Your verdict and reason both match the evidence.";
    status.textContent = `${correct ? "Correct." : "Not quite."} ${choiceSummary} ${scenario.impact}`;
    next.focus();
  }

  function showResults(): void {
    review.hidden = true;
    results.hidden = false;
    progress.textContent = `${SCENARIOS.length} of ${SCENARIOS.length}`;
    progressFill.style.width = "100%";
    resultsTitle.textContent = `Score: ${score} out of ${SCENARIOS.length}`;
    resultsCopy.textContent =
      score === SCENARIOS.length
        ? "You caught every behavior risk and approved only the change that matched its request."
        : "A strong review explains the changed behavior, not just whether the diff looks tidy. Review the scenarios again to practice the failure modes.";
    status.textContent = `Lab complete. Your score is ${score} out of ${SCENARIOS.length}.`;
    resultsTitle.focus();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitReview();
  });

  form.addEventListener("change", () => {
    validation.textContent = "";
  });

  next.addEventListener("click", () => {
    if (scenarioIndex === SCENARIOS.length - 1) {
      showResults();
      return;
    }
    scenarioIndex += 1;
    setFormDisabled(false);
    renderScenario(true);
    status.textContent = `Scenario ${scenarioIndex + 1} loaded. Read the request and proposed diff.`;
  });

  reset.addEventListener("click", () => {
    scenarioIndex = 0;
    score = 0;
    results.hidden = true;
    review.hidden = false;
    setFormDisabled(false);
    renderScenario(true);
    status.textContent = "Lab reset. Scenario 1 loaded.";
  });

  renderScenario(false);
  status.textContent = "Scenario 1 loaded. Read the request and proposed diff.";
}
