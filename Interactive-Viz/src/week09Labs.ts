type CoffeeMode = "sync" | "async";

type Drink = {
  id: string;
  name: string;
  beats: number;
};

const DRINKS: Drink[] = [
  { id: "espresso", name: "Espresso", beats: 3 },
  { id: "tea", name: "Iced tea", beats: 1 },
  { id: "cappuccino", name: "Cappuccino", beats: 2 },
];

const COFFEE_PREDICTIONS: Record<CoffeeMode, string> = {
  sync: "espresso, tea, cappuccino",
  async: "tea, cappuccino, espresso",
};

function coffeeOrder(mode: CoffeeMode): Drink[] {
  return mode === "sync" ? [...DRINKS] : [...DRINKS].sort((left, right) => left.beats - right.beats);
}

export function mountWeek09CoffeeLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w9-lab w9-coffee" aria-labelledby="w9-coffee-title">
      <header class="w9-lab-head">
        <p class="w9-kicker">LAB 9.1 &middot; COMPLETION TIMELINE</p>
        <h2 id="w9-coffee-title">The Coffee Shop</h2>
        <p>Pick a work style, predict which drinks finish first, then run the counter.</p>
      </header>
      <div class="w9-mode" role="group" aria-label="Coffee shop work style">
        <button type="button" data-mode="sync" aria-pressed="true">Sync: one at a time</button>
        <button type="button" data-mode="async" aria-pressed="false">Async: brew together</button>
      </div>
      <fieldset class="w9-predict">
        <legend>What order do drinks come out?</legend>
        <label><input type="radio" name="w9-coffee-prediction" value="espresso, tea, cappuccino"> Espresso, iced tea, cappuccino</label>
        <label><input type="radio" name="w9-coffee-prediction" value="tea, cappuccino, espresso"> Iced tea, cappuccino, espresso</label>
      </fieldset>
      <div class="w9-timeline" aria-label="Drink completion timeline">
        ${DRINKS.map((drink) => `<article class="w9-drink" data-drink="${drink.id}"><div><b>${drink.name}</b><span>${drink.beats} brew beats</span></div><p>Waiting to start</p></article>`).join("")}
      </div>
      <div class="w9-actions">
        <button id="w9-coffee-run" type="button">Run timeline</button>
        <button id="w9-coffee-check" type="button" class="w9-secondary">Check prediction</button>
        <button id="w9-coffee-reset" type="button" class="w9-icon-button" aria-label="Reset coffee timeline" title="Reset coffee timeline">Reset</button>
      </div>
      <div id="w9-coffee-feedback" class="w9-feedback" aria-live="polite"></div>
      <p id="w9-coffee-status" class="w9-status" role="status" aria-live="polite">Coffee counter ready. Choose a style and make a prediction.</p>
    </section>
  `;

  let mode: CoffeeMode = "sync";
  let completed = false;
  let timers: number[] = [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const status = host.querySelector<HTMLElement>("#w9-coffee-status")!;
  const feedback = host.querySelector<HTMLElement>("#w9-coffee-feedback")!;
  const runButton = host.querySelector<HTMLButtonElement>("#w9-coffee-run")!;

  function clearTimers(): void {
    timers.forEach((timer) => window.clearTimeout(timer));
    timers = [];
  }

  function renderWaiting(): void {
    host.querySelectorAll<HTMLElement>("[data-drink]").forEach((item) => {
      item.className = "w9-drink";
      item.querySelector("p")!.textContent = "Waiting to start";
    });
  }

  function reset(): void {
    clearTimers();
    completed = false;
    runButton.disabled = false;
    feedback.className = "w9-feedback";
    feedback.textContent = "";
    renderWaiting();
    status.textContent = `${mode === "sync" ? "Sync" : "Async"} counter ready. Predict the completion order, then run it.`;
  }

  function finishDrink(drink: Drink, position: number): void {
    const card = host.querySelector<HTMLElement>(`[data-drink="${drink.id}"]`)!;
    card.className = "w9-drink is-complete";
    card.querySelector("p")!.textContent = `Completed #${position + 1}`;
  }

  function completeTimeline(): void {
    completed = true;
    runButton.disabled = false;
    const names = coffeeOrder(mode).map((drink) => drink.name).join(", then ");
    feedback.className = "w9-feedback is-pass";
    feedback.innerHTML = `<h3>Completion order revealed</h3><p>${names}. ${mode === "sync" ? "Each drink begins after the one before it is served." : "All buzzers go out together, so the shortest brew returns first."}</p>`;
    status.textContent = `Timeline complete. Drinks came out: ${names}.`;
  }

  function runTimeline(): void {
    reset();
    runButton.disabled = true;
    const order = coffeeOrder(mode);
    const starts = mode === "sync" ? DRINKS.map((_drink, index) => DRINKS.slice(0, index).reduce((total, item) => total + item.beats, 0)) : DRINKS.map(() => 0);
    DRINKS.forEach((drink, index) => {
      const card = host.querySelector<HTMLElement>(`[data-drink="${drink.id}"]`)!;
      card.className = "w9-drink is-brewing";
      card.querySelector("p")!.textContent = mode === "sync" && index > 0 ? "In line behind earlier drinks" : "Brewing now";
    });
    status.textContent = mode === "sync" ? "One drink is brewing; the other orders wait in line." : "All three drinks are brewing together; watch the buzzers.";

    if (reducedMotion) {
      order.forEach(finishDrink);
      completeTimeline();
      return;
    }

    order.forEach((drink, position) => {
      const sourceIndex = DRINKS.findIndex((item) => item.id === drink.id);
      const finishAt = starts[sourceIndex] + drink.beats;
      timers.push(window.setTimeout(() => {
        finishDrink(drink, position);
        if (position === order.length - 1) completeTimeline();
      }, finishAt * 430));
    });
  }

  host.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.mode === "async" ? "async" : "sync";
      host.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      reset();
    });
  });

  runButton.addEventListener("click", runTimeline);
  host.querySelector<HTMLButtonElement>("#w9-coffee-reset")!.addEventListener("click", reset);
  host.querySelector<HTMLButtonElement>("#w9-coffee-check")!.addEventListener("click", () => {
    const chosen = host.querySelector<HTMLInputElement>("input[name='w9-coffee-prediction']:checked");
    if (!chosen) {
      feedback.className = "w9-feedback is-review";
      feedback.innerHTML = "<h3>Make a prediction first</h3><p>Choose a completion order, then run or check the counter.</p>";
      status.textContent = "Choose a completion order before checking it.";
      return;
    }
    const correct = chosen.value === COFFEE_PREDICTIONS[mode];
    feedback.className = `w9-feedback ${correct ? "is-pass" : "is-review"}`;
    feedback.innerHTML = `<h3>${correct ? "Prediction matched" : "Check the work style"}</h3><p>${mode === "sync" ? "Sync keeps start and completion order the same." : "Async starts all drinks together; completion follows brew time."}${completed ? " The completed timeline is above." : " Run the timeline to watch it happen."}</p>`;
    status.textContent = correct ? "Correct prediction." : `Not quite. In ${mode} mode, the completion order is ${COFFEE_PREDICTIONS[mode]}.`;
  });
}

type RaceMode = "broken" | "locked";

export function mountWeek09RaceLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w9-lab w9-race" aria-labelledby="w9-race-title">
      <header class="w9-lab-head">
        <p class="w9-kicker">LAB 9.2 &middot; SHARED STOCK CONSOLE</p>
        <h2 id="w9-race-title">The Last Croissant</h2>
        <p>Two order requests arrive together. Break the shared-stock rule, then lock it and test a retry.</p>
      </header>
      <div class="w9-stock" aria-label="Croissant stock"><span>DISPLAY CASE</span><output id="w9-stock-count">1 croissant</output><p id="w9-stock-note">One item is available.</p></div>
      <div class="w9-race-lanes" aria-label="Two competing order requests">
        <article data-request="a"><p>REQUEST A</p><h3>Order #A-17</h3><span>Waiting</span></article>
        <article data-request="b"><p>REQUEST B</p><h3>Order #B-42</h3><span>Waiting</span></article>
      </div>
      <div class="w9-actions">
        <button id="w9-race-break" type="button">Run unsafe race</button>
        <button id="w9-race-lock" type="button" class="w9-secondary">Add await + lock</button>
        <button id="w9-race-retry" type="button" class="w9-secondary" disabled>Retry order #A-17</button>
        <button id="w9-race-reset" type="button" class="w9-icon-button" aria-label="Reset croissant race" title="Reset croissant race">Reset</button>
      </div>
      <pre id="w9-race-code" class="w9-mini-code" aria-label="Current stock handling code">if (stock &gt; 0) {
  reserve(orderId); // both requests can pass this check
}</pre>
      <div id="w9-race-feedback" class="w9-feedback" aria-live="polite"></div>
      <p id="w9-race-status" class="w9-status" role="status" aria-live="polite">Stock console ready. Run the unsafe race to see the failure.</p>
    </section>
  `;

  let mode: RaceMode = "broken";
  let completed = false;
  const stock = host.querySelector<HTMLOutputElement>("#w9-stock-count")!;
  const stockNote = host.querySelector<HTMLElement>("#w9-stock-note")!;
  const status = host.querySelector<HTMLElement>("#w9-race-status")!;
  const feedback = host.querySelector<HTMLElement>("#w9-race-feedback")!;
  const retry = host.querySelector<HTMLButtonElement>("#w9-race-retry")!;
  const code = host.querySelector<HTMLElement>("#w9-race-code")!;
  const raceButton = host.querySelector<HTMLButtonElement>("#w9-race-break")!;

  function lanes(first: string, second: string, result: "pass" | "review" | "") : void {
    const requests = [first, second];
    host.querySelectorAll<HTMLElement>("[data-request]").forEach((lane, index) => {
      lane.className = `w9-request ${result ? `is-${result}` : ""}`;
      lane.querySelector("span")!.textContent = requests[index];
    });
  }

  function reset(): void {
    completed = false;
    stock.textContent = "1 croissant";
    stockNote.textContent = "One item is available.";
    feedback.className = "w9-feedback";
    feedback.textContent = "";
    retry.disabled = true;
    lanes("Waiting", "Waiting", "");
    status.textContent = mode === "broken" ? "Unsafe stock console ready. Both requests can inspect the same count." : "Lock installed. One request will finish the stock step before the other enters.";
  }

  function runBroken(): void {
    mode = "broken";
    completed = true;
    raceButton.textContent = "Run race without lock";
    retry.disabled = true;
    stock.textContent = "-1 croissants";
    stockNote.textContent = "Two confirmations were sent from one item.";
    lanes("Saw 1; confirmed", "Saw 1; confirmed", "review");
    code.textContent = "if (stock > 0) {\n  await reserve(orderId); // both requests read 1 first\n  stock -= 1;\n}";
    feedback.className = "w9-feedback is-review";
    feedback.innerHTML = "<h3>Race condition: two sales from one croissant</h3><p>Both requests checked the old count before either changed it. `await` waits for a result, but it does not make this shared check-and-change step private.</p>";
    status.textContent = "Unsafe race complete. Both requests confirmed the single croissant, leaving stock at negative one.";
  }

  function installLock(): void {
    mode = "locked";
    completed = false;
    raceButton.textContent = "Run race with lock";
    code.textContent = "await croissantLock.runExclusive(async () => {\n  if (stock === 0) return soldOut();\n  if (processed.has(orderId)) return alreadyDone();\n  stock -= 1; processed.add(orderId);\n});";
    reset();
    feedback.className = "w9-feedback is-pass";
    feedback.innerHTML = "<h3>Lock installed</h3><p>`await` keeps the request inside the protected step until it finishes. The lock lets one request check and reserve before the next request sees stock.</p>";
    status.textContent = "Lock installed. Run the race again to serialize the shared-stock step.";
  }

  function runLocked(): void {
    completed = true;
    retry.disabled = false;
    stock.textContent = "0 croissants";
    stockNote.textContent = "One order was accepted; one saw sold out.";
    lanes("Lock held; confirmed", "Waited; sold out", "pass");
    feedback.className = "w9-feedback is-pass";
    feedback.innerHTML = "<h3>Shared stock protected</h3><p>Order #A-17 enters first and reserves the croissant. Order #B-42 waits, then reads the new count of zero. This is the safe completion order.</p>";
    status.textContent = "Safe race complete. Order A confirmed one croissant; Order B saw sold out.";
  }

  raceButton.addEventListener("click", () => {
    if (mode === "locked") runLocked();
    else runBroken();
  });
  host.querySelector<HTMLButtonElement>("#w9-race-lock")!.addEventListener("click", installLock);
  host.querySelector<HTMLButtonElement>("#w9-race-reset")!.addEventListener("click", reset);
  retry.addEventListener("click", () => {
    if (!completed || mode !== "locked") return;
    lanes("Duplicate ticket; unchanged", "Waited; sold out", "pass");
    stock.textContent = "0 croissants";
    stockNote.textContent = "Retry #A-17 was recognized; nothing changed.";
    feedback.className = "w9-feedback is-pass";
    feedback.innerHTML = "<h3>Retry was idempotent</h3><p>The same ticket came back, so the handler returned the earlier confirmation instead of subtracting stock again. Retrying is safe when a lost reply makes the customer try again.</p>";
    status.textContent = "Duplicate retry recognized. Stock remains zero and the original order remains the only confirmation.";
  });
}
