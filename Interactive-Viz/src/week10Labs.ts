import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type LayerId = "screen" | "logic" | "data" | "outside";

type SystemLayer = {
  id: LayerId;
  label: string;
  room: string;
  detail: string;
  color: number;
  position: THREE.Vector3;
};

const SYSTEM_LAYERS: SystemLayer[] = [
  { id: "screen", label: "Screen", room: "Dining room", detail: "Shows the order form and notices the customer's click. It asks for work; it does not decide every rule.", color: 0x75c7d9, position: new THREE.Vector3(-1.1, 2.45, 0) },
  { id: "logic", label: "Logic / API", room: "Kitchen", detail: "Checks the order, applies business rules, and coordinates the other layers through the API.", color: 0xf0b458, position: new THREE.Vector3(-1.1, 0.65, 0) },
  { id: "data", label: "Data", room: "Pantry", detail: "Reads and saves the app's records. It answers data questions but does not draw the screen.", color: 0x83d5a2, position: new THREE.Vector3(-1.1, -1.15, 0) },
  { id: "outside", label: "Outside service", room: "Supplier", detail: "A separate system, such as a payment or maps service, reached through a controlled adapter.", color: 0xf08f81, position: new THREE.Vector3(3.35, 0.2, 0) },
];

const TRACE_STEPS = [
  { layer: 0, direction: "OUT", caption: "1. SCREEN: the customer presses Pay. The screen sends an order request." },
  { layer: 1, direction: "OUT", caption: "2. LOGIC / API: the kitchen checks the order and asks for the work it needs." },
  { layer: 2, direction: "OUT", caption: "3. DATA: the pantry reads the menu and saves the pending order." },
  { layer: 3, direction: "OUT", caption: "4. OUTSIDE SERVICE: the payment provider approves the charge." },
  { layer: 2, direction: "BACK", caption: "5. DATA: the pantry records the approved payment." },
  { layer: 1, direction: "BACK", caption: "6. LOGIC / API: the kitchen shapes a safe confirmation response." },
  { layer: 0, direction: "BACK", caption: "7. SCREEN: the dining room shows the receipt. The round trip is complete." },
] as const;

export function mountWeek10BuildingLab(host: HTMLElement): void {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  host.innerHTML = `
    <section class="w10-lab w10-building-lab" aria-labelledby="w10-building-title">
      <header class="w10-lab-head">
        <p class="w10-kicker">LAB 10.1 &middot; SYSTEM CUTAWAY</p>
        <h2 id="w10-building-title">The Whole Building</h2>
        <p>Rotate, zoom, and select a room. Then trace one order through the complete system and back.</p>
      </header>
      <div class="w10-building-controls" aria-label="Building controls">
        <button id="w10-trace" type="button">Trace round trip</button>
        <button id="w10-next-step" class="w10-secondary" type="button">Next step</button>
        <button id="w10-reset-view" class="w10-secondary" type="button">Reset</button>
      </div>
      <div class="w10-building-grid">
        <div class="w10-stage">
          <canvas id="w10-building-canvas" tabindex="0" aria-label="Inspectable 3D cutaway with screen, logic, data, and outside-service layers" aria-describedby="w10-building-caption"></canvas>
          <span class="w10-canvas-help" aria-hidden="true">DRAG TO ROTATE &middot; SCROLL TO ZOOM &middot; CLICK A ROOM</span>
        </div>
        <aside class="w10-inspector" aria-labelledby="w10-selected-layer">
          <p class="w10-kicker">SELECT A LAYER</p>
          <div class="w10-layer-buttons">
            ${SYSTEM_LAYERS.map((layer, index) => `<button type="button" data-building-layer="${index}" aria-pressed="${index === 0}"><span class="w10-swatch" style="--swatch:#${layer.color.toString(16).padStart(6, "0")}"></span><span><b>${layer.label}</b><small>${layer.room}</small></span></button>`).join("")}
          </div>
          <div class="w10-layer-caption">
            <h3 id="w10-selected-layer">${SYSTEM_LAYERS[0].label} / ${SYSTEM_LAYERS[0].room}</h3>
            <p id="w10-layer-detail">${SYSTEM_LAYERS[0].detail}</p>
          </div>
        </aside>
      </div>
      <div id="w10-building-caption" class="w10-trace-caption" aria-live="polite">
        <span id="w10-trace-direction">READY</span>
        <p id="w10-trace-text">Start at the screen. The ordered route below preserves the whole explanation without animation.</p>
      </div>
      <ol class="w10-trace-route" aria-label="Full round-trip route">
        ${TRACE_STEPS.map((step, index) => `<li data-trace-step="${index}"><span>${step.direction}</span>${step.caption.replace(/^\d+\. /, "")}</li>`).join("")}
      </ol>
      <p id="w10-building-status" class="w10-status" role="status" aria-live="polite">Screen layer selected. Four system layers are ready to inspect.</p>
    </section>
  `;

  const canvas = host.querySelector<HTMLCanvasElement>("#w10-building-canvas")!;
  const stage = host.querySelector<HTMLElement>(".w10-stage")!;
  const status = host.querySelector<HTMLElement>("#w10-building-status")!;
  const caption = host.querySelector<HTMLElement>("#w10-trace-text")!;
  const direction = host.querySelector<HTMLElement>("#w10-trace-direction")!;
  const layerButtons = Array.from(host.querySelectorAll<HTMLButtonElement>("[data-building-layer]"));
  const routeItems = Array.from(host.querySelectorAll<HTMLElement>("[data-trace-step]"));

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c1114);
  scene.fog = new THREE.Fog(0x0c1114, 13, 24);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const startPosition = new THREE.Vector3(8.2, 5.7, 9.4);
  camera.position.copy(startPosition);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = !reducedMotion;
  controls.target.set(0.45, 0.45, 0);
  controls.minDistance = 6;
  controls.maxDistance = 18;
  controls.maxPolarAngle = Math.PI * 0.78;

  scene.add(new THREE.HemisphereLight(0xd7edf2, 0x29221c, 2.2));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
  keyLight.position.set(5, 8, 7);
  scene.add(keyLight);
  const fillLight = new THREE.PointLight(0xf0b458, 12, 12);
  fillLight.position.set(-4, 1, 4);
  scene.add(fillLight);

  const layerMeshes: THREE.Mesh[] = [];
  SYSTEM_LAYERS.forEach((layer, index) => {
    const geometry = index === 3 ? new THREE.CylinderGeometry(1.05, 1.05, 1.35, 8) : new THREE.BoxGeometry(3.4, 1.35, 2.55);
    const material = new THREE.MeshStandardMaterial({ color: layer.color, roughness: 0.62, metalness: 0.05, transparent: true, opacity: 0.88 });
    const room = new THREE.Mesh(geometry, material);
    room.position.copy(layer.position);
    room.userData.layerIndex = index;
    scene.add(room);
    layerMeshes.push(room);

    if (index < 3) {
      const floor = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.1, 2.95), new THREE.MeshStandardMaterial({ color: 0x3a464a, roughness: 0.9 }));
      floor.position.set(layer.position.x, layer.position.y - 0.73, layer.position.z);
      scene.add(floor);
    }
  });

  const shellBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 5.7, 3.15),
    new THREE.MeshStandardMaterial({ color: 0x637176, roughness: 0.8 }),
  );
  shellBack.position.set(-2.96, 0.65, -0.05);
  scene.add(shellBack);
  const ground = new THREE.GridHelper(15, 15, 0x526269, 0x253036);
  ground.position.y = -2.02;
  scene.add(ground);

  const tracePoints = TRACE_STEPS.map((step) => SYSTEM_LAYERS[step.layer].position.clone().add(new THREE.Vector3(0, 0.05, 1.55)));
  const route = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(tracePoints),
    new THREE.LineBasicMaterial({ color: 0xe9f0ea, transparent: true, opacity: 0.42 }),
  );
  scene.add(route);
  const signal = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 18, 18),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xf0b458, emissiveIntensity: 2 }),
  );
  signal.position.copy(tracePoints[0]);
  scene.add(signal);

  let selectedLayer = 0;
  let traceStep = -1;
  let traceTimer = 0;

  function selectLayer(index: number, announce = true): void {
    selectedLayer = index;
    layerMeshes.forEach((mesh, meshIndex) => {
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.emissive.setHex(meshIndex === index ? SYSTEM_LAYERS[meshIndex].color : 0x000000);
      material.emissiveIntensity = meshIndex === index ? 0.34 : 0;
      mesh.scale.setScalar(meshIndex === index ? 1.055 : 1);
    });
    layerButtons.forEach((button, buttonIndex) => button.setAttribute("aria-pressed", String(buttonIndex === index)));
    const layer = SYSTEM_LAYERS[index];
    host.querySelector<HTMLElement>("#w10-selected-layer")!.textContent = `${layer.label} / ${layer.room}`;
    host.querySelector<HTMLElement>("#w10-layer-detail")!.textContent = layer.detail;
    if (announce) status.textContent = `${layer.label} layer selected. ${layer.detail}`;
  }

  function showTraceStep(index: number): void {
    traceStep = index;
    const step = TRACE_STEPS[index];
    selectLayer(step.layer, false);
    signal.position.copy(tracePoints[index]);
    direction.textContent = step.direction;
    caption.textContent = step.caption;
    routeItems.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === index));
    status.textContent = `${step.caption} Step ${index + 1} of ${TRACE_STEPS.length}.`;
  }

  layerButtons.forEach((button) => button.addEventListener("click", () => {
    window.clearInterval(traceTimer);
    selectLayer(Number(button.dataset.buildingLayer));
  }));

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  canvas.addEventListener("pointerup", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(layerMeshes)[0];
    if (hit) {
      window.clearInterval(traceTimer);
      selectLayer(Number(hit.object.userData.layerIndex));
    }
  });

  host.querySelector<HTMLButtonElement>("#w10-next-step")!.addEventListener("click", () => {
    window.clearInterval(traceTimer);
    showTraceStep((traceStep + 1) % TRACE_STEPS.length);
  });

  host.querySelector<HTMLButtonElement>("#w10-trace")!.addEventListener("click", () => {
    window.clearInterval(traceTimer);
    showTraceStep(0);
    if (reducedMotion) {
      caption.textContent = `Reduced-motion route: ${SYSTEM_LAYERS.map((layer) => layer.label).join(" to ")} and back through Data, Logic / API, and Screen. Use Next step for every caption.`;
      status.textContent = "Reduced-motion trace ready. The full route is visible below; use Next step to inspect each handoff without animation.";
      return;
    }
    traceTimer = window.setInterval(() => {
      if (traceStep >= TRACE_STEPS.length - 1) {
        window.clearInterval(traceTimer);
        return;
      }
      showTraceStep(traceStep + 1);
    }, 950);
  });

  host.querySelector<HTMLButtonElement>("#w10-reset-view")!.addEventListener("click", () => {
    window.clearInterval(traceTimer);
    camera.position.copy(startPosition);
    controls.target.set(0.45, 0.45, 0);
    controls.update();
    traceStep = -1;
    direction.textContent = "READY";
    caption.textContent = "Start at the screen. The ordered route below preserves the whole explanation without animation.";
    routeItems.forEach((item) => item.classList.remove("is-active"));
    signal.position.copy(tracePoints[0]);
    selectLayer(0, false);
    status.textContent = "Reset. Screen layer selected and the full round trip is ready.";
  });

  function resize(): void {
    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(320, stage.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  let running = true;
  function render(): void {
    if (!host.isConnected) {
      running = false;
      observer.disconnect();
      controls.dispose();
      renderer.dispose();
      window.clearInterval(traceTimer);
      return;
    }
    controls.update();
    renderer.render(scene, camera);
    if (running) requestAnimationFrame(render);
  }

  resize();
  selectLayer(selectedLayer, false);
  render();
}

type Responsibility = {
  task: string;
  layer: LayerId;
  reason: string;
};

const RESPONSIBILITIES: Responsibility[] = [
  { task: "Draw the checkout form", layer: "screen", reason: "Drawing controls and labels is visible screen work." },
  { task: "Check stock and calculate the total", layer: "logic", reason: "Stock and pricing rules are business decisions owned by logic." },
  { task: "Save the order record", layer: "data", reason: "Reading and writing app records belongs to the data layer." },
  { task: "Charge the payment provider", layer: "outside", reason: "The payment company is a separate system reached through an outside-service adapter." },
  { task: "Show the confirmation message", layer: "screen", reason: "Showing the returned answer is visible screen work." },
  { task: "Load menu records", layer: "data", reason: "Fetching stored menu records belongs behind the data boundary." },
  { task: "Decide whether delivery is free", layer: "logic", reason: "A delivery threshold is a business rule, so logic should own it." },
  { task: "Send the address to a maps service", layer: "outside", reason: "Maps is another company's service; an outside adapter controls that handoff." },
];

const SORT_LAYER_COPY: Record<LayerId, { label: string; room: string }> = {
  screen: { label: "Screen", room: "Dining room" },
  logic: { label: "Logic / API", room: "Kitchen" },
  data: { label: "Data", room: "Pantry" },
  outside: { label: "Outside service", room: "Supplier door" },
};

export function mountWeek10LayersLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w10-lab w10-sort-lab" aria-labelledby="w10-sort-title">
      <header class="w10-lab-head">
        <p class="w10-kicker">LAB 10.2 &middot; RESPONSIBILITY SORT</p>
        <h2 id="w10-sort-title">Rearrange the Kitchen</h2>
        <p>Select or drag one responsibility, then place it in the layer that should own it.</p>
      </header>
      <div class="w10-sort-progress"><span id="w10-sort-count">0 / ${RESPONSIBILITIES.length} placed</span><span aria-hidden="true"><i id="w10-sort-fill"></i></span></div>
      <div class="w10-responsibilities" aria-label="Unsorted responsibilities">
        ${RESPONSIBILITIES.map((item, index) => `<button type="button" draggable="true" data-responsibility="${index}" aria-pressed="false"><span>JOB ${String(index + 1).padStart(2, "0")}</span>${item.task}</button>`).join("")}
      </div>
      <p class="w10-sort-instruction">Choose a job above, then use a Place here button. Dragging into a layer works too.</p>
      <div class="w10-layer-zones">
        ${(Object.keys(SORT_LAYER_COPY) as LayerId[]).map((id) => `<section data-layer-zone="${id}" aria-labelledby="w10-zone-${id}"><header><span class="w10-zone-mark ${id}"></span><div><h3 id="w10-zone-${id}">${SORT_LAYER_COPY[id].label}</h3><p>${SORT_LAYER_COPY[id].room}</p></div></header><button type="button" data-place-layer="${id}">Place here</button><ul aria-label="Jobs placed in ${SORT_LAYER_COPY[id].label}"></ul></section>`).join("")}
      </div>
      <div class="w10-sort-actions"><button id="w10-sort-reset" class="w10-secondary" type="button">Reset sort</button></div>
      <div id="w10-sort-feedback" class="w10-feedback" aria-live="polite"></div>
      <p id="w10-sort-status" class="w10-status" role="status" aria-live="polite">Eight responsibilities are ready to sort.</p>
    </section>
  `;

  const cards = Array.from(host.querySelectorAll<HTMLButtonElement>("[data-responsibility]"));
  const zones = Array.from(host.querySelectorAll<HTMLElement>("[data-layer-zone]"));
  const feedback = host.querySelector<HTMLElement>("#w10-sort-feedback")!;
  const status = host.querySelector<HTMLElement>("#w10-sort-status")!;
  const count = host.querySelector<HTMLElement>("#w10-sort-count")!;
  const fill = host.querySelector<HTMLElement>("#w10-sort-fill")!;
  let selected: number | null = null;
  const placed = new Set<number>();

  function select(index: number): void {
    if (placed.has(index)) return;
    selected = index;
    cards.forEach((card, cardIndex) => card.setAttribute("aria-pressed", String(cardIndex === index)));
    status.textContent = `${RESPONSIBILITIES[index].task} selected. Choose the layer that should own it.`;
  }

  function updateProgress(): void {
    count.textContent = `${placed.size} / ${RESPONSIBILITIES.length} placed`;
    fill.style.width = `${(placed.size / RESPONSIBILITIES.length) * 100}%`;
  }

  function place(layer: LayerId): void {
    if (selected === null) {
      feedback.className = "w10-feedback is-review";
      feedback.innerHTML = "<h3>Select a job first</h3><p>Choose one responsibility above, then place it in a layer.</p>";
      status.textContent = "Select one responsibility before choosing a layer.";
      return;
    }
    const index = selected;
    const item = RESPONSIBILITIES[index];
    if (item.layer !== layer) {
      feedback.className = "w10-feedback is-review";
      feedback.innerHTML = `<h3>Keep that boundary clear</h3><p>${item.reason} Try ${SORT_LAYER_COPY[item.layer].label}.</p>`;
      status.textContent = `${item.task} does not belong in ${SORT_LAYER_COPY[layer].label}. ${item.reason}`;
      return;
    }

    placed.add(index);
    cards[index].hidden = true;
    cards[index].setAttribute("aria-pressed", "false");
    host.querySelector<HTMLElement>(`[data-layer-zone="${layer}"] ul`)!.insertAdjacentHTML("beforeend", `<li data-placed-job="${index}">${item.task}</li>`);
    selected = null;
    updateProgress();
    const complete = placed.size === RESPONSIBILITIES.length;
    feedback.className = "w10-feedback is-pass";
    feedback.innerHTML = `<h3>${complete ? "Kitchen rearranged" : `Correct: ${SORT_LAYER_COPY[layer].label}`}</h3><p>${item.reason}${complete ? " Every job now has one clear owner and one clear handoff." : ""}</p>`;
    status.textContent = `${item.task} placed in ${SORT_LAYER_COPY[layer].label}. ${placed.size} of ${RESPONSIBILITIES.length} complete.`;
    cards.find((card) => !card.hidden)?.focus();
  }

  cards.forEach((card) => {
    const index = Number(card.dataset.responsibility);
    card.addEventListener("click", () => select(index));
    card.addEventListener("dragstart", (event) => {
      select(index);
      event.dataTransfer?.setData("text/plain", String(index));
    });
  });

  host.querySelectorAll<HTMLButtonElement>("[data-place-layer]").forEach((button) => {
    button.addEventListener("click", () => place(button.dataset.placeLayer as LayerId));
  });

  zones.forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      zone.classList.add("is-dragover");
    });
    zone.addEventListener("dragleave", () => zone.classList.remove("is-dragover"));
    zone.addEventListener("drop", (event) => {
      event.preventDefault();
      zone.classList.remove("is-dragover");
      const dragged = Number(event.dataTransfer?.getData("text/plain"));
      if (Number.isInteger(dragged)) selected = dragged;
      place(zone.dataset.layerZone as LayerId);
    });
  });

  host.querySelector<HTMLButtonElement>("#w10-sort-reset")!.addEventListener("click", () => {
    selected = null;
    placed.clear();
    cards.forEach((card) => {
      card.hidden = false;
      card.setAttribute("aria-pressed", "false");
    });
    zones.forEach((zone) => zone.querySelector("ul")!.replaceChildren());
    feedback.replaceChildren();
    feedback.className = "w10-feedback";
    updateProgress();
    status.textContent = "Reset. Eight responsibilities are ready to sort.";
    cards[0]?.focus();
  });
}
