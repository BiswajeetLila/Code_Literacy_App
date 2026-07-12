const FRUITS = ["apple", "banana", "pear"];

export function mountWeek03RecipeLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w3-lab" aria-labelledby="w3-recipe-title">
      <header class="w3-head"><p class="w3-kicker">LAB 3.1 &middot; FUNCTION RECIPE</p><h2 id="w3-recipe-title">Recipe Card</h2><p>Set the arguments, type your predicted return value, then run the recipe.</p></header>
      <div class="w3-recipe-grid">
        <section class="w3-recipe-card" aria-label="Function definition">
          <div class="w3-card-bar">makeSnack(fruit, servings = 2)</div>
          <label>fruit argument<select id="w3-fruit">${FRUITS.map((fruit) => `<option>${fruit}</option>`).join("")}</select></label>
          <label>servings argument<input id="w3-servings" type="number" min="1" max="6" value="2"></label>
          <label>predict the return value<input id="w3-prediction" type="text" autocomplete="off" placeholder="2 bowls of apple"></label>
          <div><button id="w3-run-recipe" type="button">Run recipe</button> <button id="w3-reset-recipe" type="button">Reset</button></div>
        </section>
        <section class="w3-dish" aria-labelledby="w3-dish-title">
          <p class="w3-kicker">RETURN LANE</p><h3 id="w3-dish-title">Dish waiting</h3>
          <output id="w3-recipe-output">Predict first, then run.</output>
        </section>
      </div>
      <div id="w3-recipe-feedback" class="w3-feedback" aria-live="polite"></div>
      <p id="w3-recipe-status" class="w3-status" role="status" aria-live="polite"></p>
    </section>
  `;

  const fruit = host.querySelector<HTMLSelectElement>("#w3-fruit")!;
  const servings = host.querySelector<HTMLInputElement>("#w3-servings")!;
  const prediction = host.querySelector<HTMLInputElement>("#w3-prediction")!;
  const output = host.querySelector<HTMLOutputElement>("#w3-recipe-output")!;
  const feedback = host.querySelector<HTMLElement>("#w3-recipe-feedback")!;
  const status = host.querySelector<HTMLElement>("#w3-recipe-status")!;

  host.querySelector<HTMLButtonElement>("#w3-run-recipe")!.addEventListener("click", () => {
    const count = Math.max(1, Math.min(6, Number(servings.value) || 2));
    servings.value = String(count);
    const result = `${count} bowls of ${fruit.value}`;
    const correct = prediction.value.trim().toLowerCase() === result.toLowerCase();
    output.textContent = result;
    feedback.className = `w3-feedback ${correct ? "is-pass" : "is-review"}`;
    feedback.innerHTML = `<h3>${correct ? "Prediction matched" : "Compare your words"}</h3><p><code>makeSnack('${fruit.value}', ${count})</code> returns <b>${result}</b>. The arguments fill the parameters; return hands the label back.</p>`;
    status.textContent = correct ? `Correct. The function returned ${result}.` : `The function returned ${result}; compare it with your prediction.`;
  });

  host.querySelector<HTMLButtonElement>("#w3-reset-recipe")!.addEventListener("click", () => {
    fruit.value = FRUITS[0];
    servings.value = "2";
    prediction.value = "";
    output.textContent = "Predict first, then run.";
    feedback.className = "w3-feedback";
    feedback.replaceChildren();
    status.textContent = "Reset. Recipe ready for a new prediction.";
  });

  status.textContent = "Recipe ready. Choose arguments and predict the returned label.";
}

const TRACE = [
  { title: "Caller", value: "50", active: "subtotal", note: "The caller starts with subtotal = 50." },
  { title: "addTax(price)", value: "54", active: "price", note: "50 enters the local parameter `price`; the function returns 54." },
  { title: "Between calls", value: "54", active: "returned value", note: "The number 54 exists as a returned value; `price` is now out of scope." },
  { title: "formatTotal(total)", value: "$54.00", active: "total", note: "54 enters a new local parameter `total` and returns formatted text." },
];

export function mountWeek03TraceLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w3-lab" aria-labelledby="w3-trace-title">
      <header class="w3-head"><p class="w3-kicker">LAB 3.2 &middot; VALUE TRACE</p><h2 id="w3-trace-title">Trace the Value</h2><p>Predict the final value, then scrub through each call and watch local names change.</p></header>
      <fieldset class="w3-predict"><legend>What comes back at the end?</legend>
        ${["50", "54", "$54.00"].map((value) => `<label><input type="radio" name="w3-final" value="${value}"><span>${value}</span></label>`).join("")}
      </fieldset>
      <label class="w3-scrub-label">Trace step <input id="w3-trace-range" type="range" min="0" max="3" value="0"></label>
      <div class="w3-trace-stage">
        <div><span id="w3-trace-step">STEP 1 OF 4</span><h3 id="w3-trace-heading"></h3><output id="w3-trace-value"></output><p id="w3-trace-note"></p></div>
        <dl class="w3-scope-list"><dt>subtotal</dt><dd data-name="subtotal">caller name</dd><dt>price</dt><dd data-name="price">addTax local</dd><dt>total</dt><dd data-name="total">formatTotal local</dd></dl>
      </div>
      <div><button id="w3-check-trace" type="button">Check final prediction</button> <button id="w3-reset-trace" type="button">Reset</button></div>
      <div id="w3-trace-feedback" class="w3-feedback" aria-live="polite"></div>
      <p id="w3-trace-status" class="w3-status" role="status" aria-live="polite"></p>
    </section>
  `;

  const range = host.querySelector<HTMLInputElement>("#w3-trace-range")!;
  const status = host.querySelector<HTMLElement>("#w3-trace-status")!;

  function render(): void {
    const index = Number(range.value);
    const step = TRACE[index];
    host.querySelector<HTMLElement>("#w3-trace-step")!.textContent = `STEP ${index + 1} OF ${TRACE.length}`;
    host.querySelector<HTMLElement>("#w3-trace-heading")!.textContent = step.title;
    host.querySelector<HTMLOutputElement>("#w3-trace-value")!.textContent = step.value;
    host.querySelector<HTMLElement>("#w3-trace-note")!.textContent = step.note;
    host.querySelectorAll<HTMLElement>("[data-name]").forEach((item) => {
      const active = item.dataset.name === step.active;
      item.classList.toggle("is-active", active);
      item.classList.toggle("is-out", !active);
    });
    status.textContent = `${step.title}: ${step.note}`;
  }

  range.addEventListener("input", render);
  host.querySelector<HTMLButtonElement>("#w3-check-trace")!.addEventListener("click", () => {
    const picked = host.querySelector<HTMLInputElement>('input[name="w3-final"]:checked')?.value;
    const correct = picked === "$54.00";
    const feedback = host.querySelector<HTMLElement>("#w3-trace-feedback")!;
    feedback.className = `w3-feedback ${correct ? "is-pass" : "is-review"}`;
    feedback.innerHTML = `<h3>${correct ? "Trace complete" : "Follow both returns"}</h3><p><code>addTax(50)</code> returns 54. That value becomes the <code>total</code> argument, and <code>formatTotal</code> returns <b>$54.00</b>.</p>`;
    status.textContent = correct ? "Correct. The final return value is $54.00." : "The final return value is $54.00; scrub each step to see where its name changes.";
  });

  host.querySelector<HTMLButtonElement>("#w3-reset-trace")!.addEventListener("click", () => {
    host.querySelectorAll<HTMLInputElement>('input[name="w3-final"]').forEach((input) => { input.checked = false; });
    range.value = "0";
    const feedback = host.querySelector<HTMLElement>("#w3-trace-feedback")!;
    feedback.className = "w3-feedback";
    feedback.replaceChildren();
    render();
    status.textContent = "Reset. Trace the value from the caller again.";
  });

  render();
}
