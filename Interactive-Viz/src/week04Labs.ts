import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const FLOW_STEPS = [
  { name: "DATA", detail: "order.items creates the source value: 3." },
  { name: "MODULE", detail: "An exported helper carries the calculated total across a file boundary." },
  { name: "PROPS", detail: "The Summary component receives total as a labeled prop." },
  { name: "SCREEN", detail: "The final desk turns 3 into the visible label: 3 items." },
];

export function mountWeek04DataFlowLab(host: HTMLElement): void {
  host.innerHTML = `
    <section class="w4-lab" aria-labelledby="w4-flow-title">
      <header class="w4-head"><p class="w4-kicker">LAB 4.1 &middot; 3D VALUE ROUTE</p><h2 id="w4-flow-title">Follow the Parcel</h2><p>Rotate, zoom, and click a desk. Trace sends the value from source to screen.</p></header>
      <div class="w4-flow-controls"><button id="w4-trace" type="button">Trace value</button><button id="w4-reset-view" type="button">Reset view</button></div>
      <div class="w4-stage"><canvas id="w4-flow-canvas" tabindex="0" aria-label="3D data-flow desks from source to screen. Use left and right arrow keys to inspect desks."></canvas><div class="w4-stage-labels" aria-hidden="true"><span>DATA</span><span>MODULE</span><span>PROPS</span><span>SCREEN</span></div></div>
      <div class="w4-desk-controls" aria-label="Select a data-flow desk">${FLOW_STEPS.map((step, index) => `<button type="button" data-desk-index="${index}" aria-pressed="${index === 0}">${step.name}</button>`).join("")}</div>
      <div class="w4-decode"><p class="w4-kicker">SELECTED DESK</p><h3 id="w4-selected-name">DATA</h3><p id="w4-selected-detail">${FLOW_STEPS[0].detail}</p></div>
      <p id="w4-flow-status" class="w4-status" role="status" aria-live="polite">Data desk selected. Rotate, zoom, click, or trace the parcel.</p>
    </section>
  `;

  const canvas = host.querySelector<HTMLCanvasElement>("#w4-flow-canvas")!;
  const stage = host.querySelector<HTMLElement>(".w4-stage")!;
  const status = host.querySelector<HTMLElement>("#w4-flow-status")!;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0c1115);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(7, 5, 8);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);
  controls.minDistance = 5;
  controls.maxDistance = 16;
  scene.add(new THREE.HemisphereLight(0xc9e9ff, 0x252018, 2.2));
  const light = new THREE.DirectionalLight(0xffffff, 2.4);
  light.position.set(4, 7, 5);
  scene.add(light);

  const meshes: THREE.Mesh[] = [];
  const colors = [0x5b8db8, 0xe8a33d, 0xfc3d21, 0x74d39b];
  FLOW_STEPS.forEach((_step, index) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.15, 1.5),
      new THREE.MeshStandardMaterial({ color: colors[index], roughness: 0.5 }),
    );
    mesh.position.set((index - 1.5) * 2.1, Math.sin(index * 1.4) * 0.6, 0);
    mesh.userData.index = index;
    scene.add(mesh);
    meshes.push(mesh);
    if (index > 0) {
      const points = [meshes[index - 1].position, mesh.position];
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: 0xd7e8ef })));
    }
  });
  const floor = new THREE.GridHelper(12, 12, 0x5b8db8, 0x27333b);
  floor.position.y = -1.4;
  scene.add(floor);

  let traceTimer = 0;
  let selectedIndex = 0;
  const baseScales = meshes.map(() => new THREE.Vector3(1, 1, 1));

  function select(index: number, announcement = true): void {
    selectedIndex = index;
    meshes.forEach((mesh, meshIndex) => {
      mesh.scale.copy(baseScales[meshIndex]).multiplyScalar(meshIndex === index ? 1.22 : 1);
    });
    host.querySelector<HTMLElement>("#w4-selected-name")!.textContent = FLOW_STEPS[index].name;
    host.querySelector<HTMLElement>("#w4-selected-detail")!.textContent = FLOW_STEPS[index].detail;
    host.querySelectorAll<HTMLButtonElement>("[data-desk-index]").forEach((button) => {
      button.setAttribute("aria-pressed", String(Number(button.dataset.deskIndex) === index));
    });
    if (announcement) status.textContent = `${FLOW_STEPS[index].name}: ${FLOW_STEPS[index].detail}`;
  }

  host.querySelectorAll<HTMLButtonElement>("[data-desk-index]").forEach((button) => {
    button.addEventListener("click", () => select(Number(button.dataset.deskIndex)));
  });

  canvas.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") select(0);
    else if (event.key === "End") select(FLOW_STEPS.length - 1);
    else if (event.key === "ArrowRight") select((selectedIndex + 1) % FLOW_STEPS.length);
    else select((selectedIndex - 1 + FLOW_STEPS.length) % FLOW_STEPS.length);
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  canvas.addEventListener("pointerup", (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(meshes)[0];
    if (hit) select(Number(hit.object.userData.index));
  });

  host.querySelector<HTMLButtonElement>("#w4-trace")!.addEventListener("click", () => {
    window.clearInterval(traceTimer);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      select(FLOW_STEPS.length - 1);
      status.textContent = `Reduced motion trace: ${FLOW_STEPS.map((step) => step.name).join(" to ")}. ${FLOW_STEPS[FLOW_STEPS.length - 1].detail}`;
      return;
    }
    let index = 0;
    select(index);
    traceTimer = window.setInterval(() => {
      index += 1;
      if (index >= FLOW_STEPS.length) { window.clearInterval(traceTimer); return; }
      select(index);
    }, 700);
  });

  host.querySelector<HTMLButtonElement>("#w4-reset-view")!.addEventListener("click", () => {
    camera.position.set(7, 5, 8);
    controls.target.set(0, 0, 0);
    controls.update();
    select(0);
  });

  function resize(): void {
    const width = Math.max(1, stage.clientWidth);
    const height = Math.max(300, stage.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  let running = true;
  function render(): void {
    if (!host.isConnected) { running = false; observer.disconnect(); controls.dispose(); renderer.dispose(); window.clearInterval(traceTimer); return; }
    controls.update();
    renderer.render(scene, camera);
    if (running) requestAnimationFrame(render);
  }
  resize();
  select(0, false);
  render();
}

export function mountWeek04StateLab(host: HTMLElement): void {
  let count = 0;
  host.innerHTML = `
    <section class="w4-lab" aria-labelledby="w4-state-title">
      <header class="w4-head"><p class="w4-kicker">LAB 4.2 &middot; STATE REDRAW</p><h2 id="w4-state-title">The Whiteboard</h2><p>Predict the next screen, change state, and watch the display redraw from the stored value.</p></header>
      <div class="w4-state-grid">
        <section class="w4-whiteboard"><p>STATE / SOURCE OF TRUTH</p><output id="w4-state-value">0</output></section>
        <section class="w4-screen"><p>SCREEN / PICTURE OF STATE</p><output id="w4-screen-value">0 items</output></section>
      </div>
      <fieldset class="w4-predict"><legend>After Add one, what will the screen show?</legend><label><input type="radio" name="w4-next" value="same"><span>the same number</span></label><label><input type="radio" name="w4-next" value="plus"><span>one more item</span></label></fieldset>
      <div class="w4-actions"><button id="w4-add" type="button">Add one</button><button id="w4-state-reset" type="button">Reset</button></div>
      <div id="w4-state-feedback" class="w4-feedback" aria-live="polite"></div><p id="w4-state-status" class="w4-status" role="status" aria-live="polite">State is 0; screen shows 0 items.</p>
    </section>
  `;
  const state = host.querySelector<HTMLOutputElement>("#w4-state-value")!;
  const screen = host.querySelector<HTMLOutputElement>("#w4-screen-value")!;
  const feedback = host.querySelector<HTMLElement>("#w4-state-feedback")!;
  const status = host.querySelector<HTMLElement>("#w4-state-status")!;
  function draw(): void { state.textContent = String(count); screen.textContent = `${count} ${count === 1 ? "item" : "items"}`; }
  host.querySelector<HTMLButtonElement>("#w4-add")!.addEventListener("click", () => {
    const prediction = host.querySelector<HTMLInputElement>('input[name="w4-next"]:checked')?.value;
    count += 1;
    draw();
    const correct = prediction === "plus";
    feedback.className = `w4-feedback ${correct ? "is-pass" : "is-review"}`;
    feedback.innerHTML = `<h3>${correct ? "Prediction matched" : "Watch the whiteboard"}</h3><p><code>setCount</code> changed state to ${count}. The screen then redrew from that state; it did not edit itself.</p>`;
    status.textContent = `State changed to ${count}; screen redrew as ${screen.textContent}.`;
  });
  host.querySelector<HTMLButtonElement>("#w4-state-reset")!.addEventListener("click", () => { count = 0; draw(); feedback.replaceChildren(); feedback.className = "w4-feedback"; status.textContent = "Reset. State is 0; screen shows 0 items."; });
}
