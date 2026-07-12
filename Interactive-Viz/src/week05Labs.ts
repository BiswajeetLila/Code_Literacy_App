export function mountWeek05MenuLab(host: HTMLElement): void {
  host.innerHTML = `<section class="w5-lab" aria-labelledby="w5-menu-title"><header><p class="w5-kicker">LAB 5.1 &middot; REQUEST CONSOLE</p><h2 id="w5-menu-title">The Menu</h2><p>Choose the address and action. Fault switches reveal who should investigate.</p></header><div class="w5-controls"><label>endpoint<select id="w5-endpoint"><option value="/api/orders">/api/orders</option><option value="/api/missing">/api/missing</option></select></label><label>verb<select id="w5-verb"><option>GET</option><option>POST</option></select></label><label><input id="w5-bad-key" type="checkbox"> bad API key</label><label><input id="w5-server-fail" type="checkbox"> server failure</label></div><div><button id="w5-send" type="button">Send request</button> <button id="w5-reset-menu" type="button">Reset</button></div><div class="w5-response"><div><span>STATUS</span><output id="w5-status-code">ready</output></div><pre id="w5-json">{ "message": "choose and send" }</pre></div><div id="w5-decode" class="w5-feedback" aria-live="polite"></div><p id="w5-menu-status" class="w5-status" role="status" aria-live="polite">Request console ready.</p></section>`;
  host.querySelector<HTMLButtonElement>("#w5-send")!.addEventListener("click", () => {
    const endpoint = host.querySelector<HTMLSelectElement>("#w5-endpoint")!.value;
    const verb = host.querySelector<HTMLSelectElement>("#w5-verb")!.value;
    const badKey = host.querySelector<HTMLInputElement>("#w5-bad-key")!.checked;
    const serverFail = host.querySelector<HTMLInputElement>("#w5-server-fail")!.checked;
    let code = 200; let plain = "Success. The request and server both completed."; let owner = "No failure to triage.";
    if (badKey) { code = 401; plain = "The membership card was rejected."; owner = "Your side: check the API key and header."; }
    else if (endpoint.includes("missing")) { code = 404; plain = "That menu item or address does not exist."; owner = "Your side: check the endpoint spelling."; }
    else if (serverFail) { code = 500; plain = "The server failed while preparing the answer."; owner = "Their/server side: inspect server logs."; }
    host.querySelector<HTMLOutputElement>("#w5-status-code")!.textContent = String(code);
    host.querySelector<HTMLElement>("#w5-json")!.textContent = code === 200 ? JSON.stringify({ method: verb, orders: verb === "GET" ? 3 : undefined, created: verb === "POST" }, null, 2) : JSON.stringify({ error: plain }, null, 2);
    const decode = host.querySelector<HTMLElement>("#w5-decode")!; decode.className = `w5-feedback ${code === 200 ? "is-pass" : "is-review"}`; decode.innerHTML = `<h3>${code} decoded</h3><p>${plain} <b>${owner}</b></p>`;
    host.querySelector<HTMLElement>("#w5-menu-status")!.textContent = `${verb} ${endpoint} returned ${code}. ${plain} ${owner}`;
  });
  host.querySelector<HTMLButtonElement>("#w5-reset-menu")!.addEventListener("click", () => {
    host.querySelector<HTMLSelectElement>("#w5-endpoint")!.value = "/api/orders";
    host.querySelector<HTMLSelectElement>("#w5-verb")!.value = "GET";
    host.querySelector<HTMLInputElement>("#w5-bad-key")!.checked = false;
    host.querySelector<HTMLInputElement>("#w5-server-fail")!.checked = false;
    host.querySelector<HTMLOutputElement>("#w5-status-code")!.textContent = "ready";
    host.querySelector<HTMLElement>("#w5-json")!.textContent = '{ "message": "choose and send" }';
    const decode = host.querySelector<HTMLElement>("#w5-decode")!;
    decode.className = "w5-feedback";
    decode.replaceChildren();
    host.querySelector<HTMLElement>("#w5-menu-status")!.textContent = "Reset. Request console ready.";
  });
}

const TICKET: Record<string, { value: string; destination: string }> = {
  name: { value: "Red notebook", destination: "Product heading" }, price: { value: "12", destination: "Price label" }, imageUrl: { value: "/notebook.jpg", destination: "Product image src" }, inStock: { value: "true", destination: "Add button enabled state" },
};
export function mountWeek05TicketLab(host: HTMLElement): void {
  host.innerHTML = `<section class="w5-lab" aria-labelledby="w5-ticket-title"><header><p class="w5-kicker">LAB 5.2 &middot; JSON INSPECTOR</p><h2 id="w5-ticket-title">Read the Ticket</h2><p>Predict which screen part uses a key, then click the ticket to reveal its route.</p></header><div class="w5-ticket-grid"><pre>{
  "item": {
    ${Object.entries(TICKET).map(([key, item]) => `<button type="button" data-key="${key}">"${key}": ${JSON.stringify(item.value)}</button>`).join(",\n    ")}
  }
}</pre><section class="w5-inspector"><p class="w5-kicker">KEY ROUTE</p><h3 id="w5-key-name">Choose a key</h3><output id="w5-key-value">value</output><p id="w5-key-destination">destination</p></section></div><button id="w5-reset-ticket" type="button">Reset</button><p id="w5-ticket-status" class="w5-status" role="status" aria-live="polite">JSON ticket ready for inspection.</p></section>`;
  host.querySelectorAll<HTMLButtonElement>("[data-key]").forEach((button) => button.addEventListener("click", () => {
    const key = button.dataset.key!; const item = TICKET[key]; host.querySelector<HTMLElement>("#w5-key-name")!.textContent = `item.${key}`; host.querySelector<HTMLOutputElement>("#w5-key-value")!.textContent = item.value; host.querySelector<HTMLElement>("#w5-key-destination")!.textContent = item.destination; host.querySelector<HTMLElement>("#w5-ticket-status")!.textContent = `item.${key} carries ${item.value} to the ${item.destination}.`;
  }));
  host.querySelector<HTMLButtonElement>("#w5-reset-ticket")!.addEventListener("click", () => {
    host.querySelector<HTMLElement>("#w5-key-name")!.textContent = "Choose a key";
    host.querySelector<HTMLOutputElement>("#w5-key-value")!.textContent = "value";
    host.querySelector<HTMLElement>("#w5-key-destination")!.textContent = "destination";
    host.querySelector<HTMLElement>("#w5-ticket-status")!.textContent = "Reset. JSON ticket ready for inspection.";
  });
}
