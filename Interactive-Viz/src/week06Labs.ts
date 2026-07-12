type FrameOwner = "your-code" | "library-code";

type PhoneFrame = {
  functionName: string;
  location: string;
  owner: FrameOwner;
  call: string;
  detail: string;
};

const PHONE_FRAMES: PhoneFrame[] = [
  {
    functionName: "onCheckoutClick",
    location: "src/main.ts:18:5",
    owner: "your-code",
    call: "called refreshCheckout()",
    detail: "The button handler started the phone tree. This is your project file.",
  },
  {
    functionName: "refreshCheckout",
    location: "src/checkout.ts:41:3",
    owner: "your-code",
    call: "called renderCart(item)",
    detail: "The checkout step handed one item to the cart renderer. This is your project file.",
  },
  {
    functionName: "renderCart",
    location: "src/cart.ts:27:16",
    owner: "your-code",
    call: "called formatPrice(item.cost)",
    detail: "The cart renderer handed a value to the formatter. This is the nearest frame in your code to the failure.",
  },
  {
    functionName: "formatPrice",
    location: "node_modules/currency-kit/index.js:84:12",
    owner: "library-code",
    call: "tried value.toFixed(2)",
    detail: "The installed formatter received undefined and could not format it. This is library code.",
  },
];

export function mountWeek06PhoneTreeLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w6-lab w6-phone-lab" aria-labelledby="w6-phone-title">
      <header class="w6-lab-head">
        <p class="w6-kicker">LAB 6.1 &middot; STACK INSPECTOR</p>
        <h2 id="w6-phone-title">The Phone Tree</h2>
        <p>Read from the first caller toward the crash. Select every frame, then predict which line created the bad value.</p>
      </header>
      <div class="w6-error-banner" role="note">
        <span>ERROR</span>
        <code>TypeError: Cannot read properties of undefined (reading 'toFixed')</code>
      </div>
      <div class="w6-phone-workspace">
        <ol class="w6-stack" aria-label="Call frames, oldest caller to crash">
          ${PHONE_FRAMES.map((frame, index) => `
            <li style="--frame-depth:${index}">
              <button class="w6-frame ${frame.owner}" type="button" data-frame="${index}" aria-pressed="false">
                <span class="w6-frame-order">${index + 1}</span>
                <span class="w6-frame-main"><strong>${frame.functionName}()</strong><code>${frame.location}</code></span>
                <span class="w6-owner">${frame.owner === "your-code" ? "YOUR CODE" : "LIBRARY"}</span>
              </button>
            </li>
          `).join("")}
        </ol>
        <section class="w6-inspector" aria-labelledby="w6-inspector-title">
          <p class="w6-kicker">SELECTED FRAME</p>
          <h3 id="w6-inspector-title">Start with frame 1</h3>
          <p id="w6-frame-call">Select a frame to inspect who called whom.</p>
          <p id="w6-frame-detail">Frames in <strong>src/</strong> are your handwriting. Frames in <strong>node_modules/</strong> are installed library code.</p>
        </section>
      </div>
      <fieldset class="w6-predict">
        <legend>Predict: which frame contains the real bug?</legend>
        ${PHONE_FRAMES.map((frame, index) => `<label><input type="radio" name="w6-bug-frame" value="${index}"><span>${frame.functionName}() <code>${frame.location}</code></span></label>`).join("")}
      </fieldset>
      <div class="w6-actions">
        <button id="w6-check-frame" type="button">Reveal the bug</button>
        <button id="w6-phone-reset" class="w6-secondary" type="button">Reset lab</button>
      </div>
      <p id="w6-phone-validation" class="w6-validation" aria-live="polite"></p>
      <div id="w6-phone-feedback" class="w6-feedback" aria-live="polite"></div>
      <p id="w6-phone-status" class="w6-status" role="status" aria-live="polite">Phone tree ready. Four frames run from the first caller to the crash.</p>
    </section>
  `;

  const frames = Array.from(host.querySelectorAll<HTMLButtonElement>("[data-frame]"));
  const inspectorTitle = host.querySelector<HTMLElement>("#w6-inspector-title")!;
  const frameCall = host.querySelector<HTMLElement>("#w6-frame-call")!;
  const frameDetail = host.querySelector<HTMLElement>("#w6-frame-detail")!;
  const validation = host.querySelector<HTMLElement>("#w6-phone-validation")!;
  const feedback = host.querySelector<HTMLElement>("#w6-phone-feedback")!;
  const status = host.querySelector<HTMLElement>("#w6-phone-status")!;

  function selectFrame(index: number): void {
    const frame = PHONE_FRAMES[index];
    frames.forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === index)));
    inspectorTitle.textContent = `${frame.functionName}() - ${frame.owner === "your-code" ? "your code" : "library code"}`;
    frameCall.textContent = frame.call;
    frameDetail.textContent = frame.detail;
    status.textContent = `Frame ${index + 1} of ${PHONE_FRAMES.length}. ${frame.functionName} in ${frame.location}. ${frame.detail}`;
  }

  frames.forEach((button) => button.addEventListener("click", () => selectFrame(Number(button.dataset.frame))));

  host.querySelector<HTMLButtonElement>("#w6-check-frame")!.addEventListener("click", () => {
    const prediction = host.querySelector<HTMLInputElement>('input[name="w6-bug-frame"]:checked');
    if (!prediction) {
      validation.textContent = "Choose one frame before revealing the bug.";
      status.textContent = validation.textContent;
      return;
    }
    const choice = Number(prediction.value);
    const correct = choice === 2;
    validation.textContent = "";
    feedback.className = `w6-feedback ${correct ? "is-correct" : "is-review"}`;
    feedback.innerHTML = `
      <h3>${correct ? "Yes: inspect your nearest frame" : "Follow the value one call upward"}</h3>
      <p><code>formatPrice()</code> crashed, but it only received the bad value. In <code>src/cart.ts:27</code>, your code sends <code>item.cost</code>. The item has a <code>price</code> key, so <code>item.cost</code> is undefined.</p>
      <p><strong>Likely fix:</strong> inspect and change the caller to <code>formatPrice(item.price)</code>, then rerun the same action.</p>
    `;
    selectFrame(2);
    status.textContent = `${correct ? "Prediction matched." : "Prediction reviewed."} The real bug is in src/cart.ts line 27; your code passed item.cost instead of item.price.`;
  });

  host.querySelector<HTMLButtonElement>("#w6-phone-reset")!.addEventListener("click", () => {
    frames.forEach((button) => button.setAttribute("aria-pressed", "false"));
    host.querySelectorAll<HTMLInputElement>('input[name="w6-bug-frame"]').forEach((input) => { input.checked = false; });
    inspectorTitle.textContent = "Start with frame 1";
    frameCall.textContent = "Select a frame to inspect who called whom.";
    frameDetail.innerHTML = "Frames in <strong>src/</strong> are your handwriting. Frames in <strong>node_modules/</strong> are installed library code.";
    validation.textContent = "";
    feedback.replaceChildren();
    feedback.className = "w6-feedback";
    status.textContent = "Reset. Four frames run from the first caller to the crash.";
    frames[0]?.focus();
  });
}

type TriageLayer = "frontend" | "backend" | "config";

type TriageSymptom = {
  symptom: string;
  layer: TriageLayer;
  reason: string;
};

const TRIAGE_SYMPTOMS: TriageSymptom[] = [
  { symptom: "Page is blank; the browser console says renderCart is not defined.", layer: "frontend", reason: "The browser is running the page code and names a missing frontend function." },
  { symptom: "The button changes state, but its visible label stays old.", layer: "frontend", reason: "The request and settings are not involved; the screen redraw logic is the first place to inspect." },
  { symptom: "Network shows 500; the server terminal ends inside save_order().", layer: "backend", reason: "The server failed while saving and returned the 500 response to the browser." },
  { symptom: "The server terminal says database connection refused while loading orders.", layer: "backend", reason: "The hidden server process cannot reach the data service it needs." },
  { symptom: "The app stops at startup: API_KEY is missing.", layer: "config", reason: "A required setting or secret is absent before the app can do its work." },
  { symptom: "Deployment stops: required PORT setting is missing.", layer: "config", reason: "The deployed environment is missing a required setup value." },
];

const LAYER_LABELS: Record<TriageLayer, string> = {
  frontend: "Frontend",
  backend: "Backend",
  config: "Config",
};

export function mountWeek06TriageLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w6-lab w6-triage-lab" aria-labelledby="w6-triage-title">
      <header class="w6-lab-head">
        <p class="w6-kicker">LAB 6.2 &middot; LAYER TRIAGE</p>
        <h2 id="w6-triage-title">Three Fuse Boxes</h2>
        <p>Select or drag each symptom into the first layer you would inspect. A layer is a starting point, not a final verdict.</p>
      </header>
      <div class="w6-triage-progress" aria-label="Triage progress"><span id="w6-triage-count">0 / ${TRIAGE_SYMPTOMS.length} sorted</span><span class="w6-progress-track" aria-hidden="true"><span id="w6-progress-fill"></span></span></div>
      <div class="w6-symptoms" aria-label="Unsorted symptoms">
        ${TRIAGE_SYMPTOMS.map((item, index) => `<button class="w6-symptom" type="button" draggable="true" data-symptom="${index}" aria-pressed="false"><span>SYMPTOM ${index + 1}</span>${item.symptom}</button>`).join("")}
      </div>
      <p class="w6-place-instruction">Choose a symptom, then choose a fuse box. Pointer users can also drag and drop.</p>
      <div class="w6-fuse-grid">
        ${(Object.keys(LAYER_LABELS) as TriageLayer[]).map((layer) => `
          <section class="w6-fuse" data-drop-layer="${layer}" aria-labelledby="w6-${layer}-title">
            <div class="w6-fuse-head"><span class="w6-fuse-light" aria-hidden="true"></span><h3 id="w6-${layer}-title">${LAYER_LABELS[layer]}</h3></div>
            <p>${layer === "frontend" ? "screen and browser code" : layer === "backend" ? "server work and data" : "keys, ports, and setup"}</p>
            <button type="button" data-place-layer="${layer}">Place selected here</button>
            <ul id="w6-${layer}-results" aria-label="Symptoms sorted into ${LAYER_LABELS[layer]}"></ul>
          </section>
        `).join("")}
      </div>
      <div class="w6-actions"><button id="w6-triage-reset" class="w6-secondary" type="button">Reset lab</button></div>
      <div id="w6-triage-feedback" class="w6-feedback" aria-live="polite"></div>
      <p id="w6-triage-status" class="w6-status" role="status" aria-live="polite">Six symptoms are ready to sort. Select one, then choose a fuse box.</p>
    </section>
  `;

  const symptomButtons = Array.from(host.querySelectorAll<HTMLButtonElement>("[data-symptom]"));
  const feedback = host.querySelector<HTMLElement>("#w6-triage-feedback")!;
  const status = host.querySelector<HTMLElement>("#w6-triage-status")!;
  const count = host.querySelector<HTMLElement>("#w6-triage-count")!;
  const progress = host.querySelector<HTMLElement>("#w6-progress-fill")!;
  const sorted = new Set<number>();
  let selected: number | null = null;

  function selectSymptom(index: number): void {
    if (sorted.has(index)) return;
    selected = index;
    symptomButtons.forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === index)));
    status.textContent = `Symptom ${index + 1} selected. Choose Frontend, Backend, or Config.`;
  }

  function placeSymptom(layer: TriageLayer): void {
    if (selected === null) {
      feedback.className = "w6-feedback is-review";
      feedback.innerHTML = "<h3>Choose a symptom first</h3><p>Select one unsorted symptom, then choose its fuse box.</p>";
      status.textContent = "Choose an unsorted symptom before choosing a fuse box.";
      return;
    }
    const index = selected;
    const item = TRIAGE_SYMPTOMS[index];
    const correct = item.layer === layer;
    feedback.className = `w6-feedback ${correct ? "is-correct" : "is-review"}`;
    feedback.innerHTML = `<h3>${correct ? `${LAYER_LABELS[layer]} is the best first stop` : `Try a different fuse box`}</h3><p>${correct ? item.reason : `This evidence points first to ${LAYER_LABELS[item.layer].toLowerCase()}. ${item.reason}`}</p>`;
    if (!correct) {
      status.textContent = `Symptom ${index + 1} does not point first to ${LAYER_LABELS[layer]}. Try again.`;
      return;
    }
    sorted.add(index);
    const button = symptomButtons[index];
    button.hidden = true;
    button.setAttribute("aria-pressed", "false");
    const result = document.createElement("li");
    result.textContent = item.symptom;
    host.querySelector<HTMLElement>(`#w6-${layer}-results`)!.appendChild(result);
    selected = null;
    count.textContent = `${sorted.size} / ${TRIAGE_SYMPTOMS.length} sorted`;
    progress.style.width = `${(sorted.size / TRIAGE_SYMPTOMS.length) * 100}%`;
    status.textContent = `Correct. Symptom ${index + 1} belongs in ${LAYER_LABELS[layer]}. ${sorted.size} of ${TRIAGE_SYMPTOMS.length} sorted.`;
    if (sorted.size === TRIAGE_SYMPTOMS.length) {
      feedback.innerHTML = "<h3>All three layers separated</h3><p>You used the evidence to choose a first inspection point. Next, collect logs or reproduce the failure before changing code.</p>";
      status.textContent = "All six symptoms sorted into frontend, backend, and config.";
    }
  }

  symptomButtons.forEach((button) => {
    const index = Number(button.dataset.symptom);
    button.addEventListener("click", () => selectSymptom(index));
    button.addEventListener("dragstart", (event) => {
      selectSymptom(index);
      event.dataTransfer?.setData("text/plain", String(index));
      if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
    });
  });

  host.querySelectorAll<HTMLButtonElement>("[data-place-layer]").forEach((button) => {
    button.addEventListener("click", () => placeSymptom(button.dataset.placeLayer as TriageLayer));
  });

  host.querySelectorAll<HTMLElement>("[data-drop-layer]").forEach((fuse) => {
    fuse.addEventListener("dragover", (event) => { event.preventDefault(); fuse.classList.add("is-dragover"); });
    fuse.addEventListener("dragleave", () => fuse.classList.remove("is-dragover"));
    fuse.addEventListener("drop", (event) => {
      event.preventDefault();
      fuse.classList.remove("is-dragover");
      const draggedIndex = Number(event.dataTransfer?.getData("text/plain"));
      if (Number.isInteger(draggedIndex)) selected = draggedIndex;
      placeSymptom(fuse.dataset.dropLayer as TriageLayer);
    });
  });

  host.querySelector<HTMLButtonElement>("#w6-triage-reset")!.addEventListener("click", () => {
    sorted.clear();
    selected = null;
    symptomButtons.forEach((button) => { button.hidden = false; button.setAttribute("aria-pressed", "false"); });
    host.querySelectorAll<HTMLElement>(".w6-fuse ul").forEach((list) => list.replaceChildren());
    count.textContent = `0 / ${TRIAGE_SYMPTOMS.length} sorted`;
    progress.style.width = "0%";
    feedback.replaceChildren();
    feedback.className = "w6-feedback";
    status.textContent = "Reset. Six symptoms are ready to sort.";
    symptomButtons[0]?.focus();
  });
}
