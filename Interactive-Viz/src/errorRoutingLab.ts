import * as THREE from "three/webgpu";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type ErrorTarget = "terminal" | "browser";
type ScenePick = "source" | "router" | "terminal" | "browser";

type ErrorLine = {
  text: string;
  tone?: "red" | "dim" | "ok";
  decode?: boolean;
};

type ErrorCase = {
  id: string;
  buttonId: string;
  label: string;
  kicker: string;
  target: ErrorTarget;
  title: string;
  caption: string;
  terminal: ErrorLine[];
  browser: ErrorLine[];
  decode: {
    says: string;
    window: string;
    side: string;
    fix: string;
  };
};

const QUIET: ErrorLine[] = [{ text: "(no errors here)", tone: "dim" }];

const CASES: ErrorCase[] = [
  {
    id: "python",
    buttonId: "err-py",
    label: "Break Python",
    kicker: "SERVER / PYTHON",
    target: "terminal",
    title: "NameError in backend code",
    caption: "The red packet routes to the terminal because Python crashed before the page received anything useful.",
    terminal: [
      { text: "$ python app.py" },
      { text: "Traceback (most recent call last):" },
      { text: '  File "app.py", line 3, in <module>' },
      { text: "    print(total)" },
      { text: "NameError: name 'total' is not defined", tone: "red", decode: true },
    ],
    browser: QUIET,
    decode: {
      says: "The code used the name total, but total was never created.",
      window: "Terminal",
      side: "Server or Python side.",
      fix: "Look for a typo, or add the line that creates total before it is used.",
    },
  },
  {
    id: "javascript",
    buttonId: "err-js",
    label: "Break page JS",
    kicker: "BROWSER / JAVASCRIPT",
    target: "browser",
    title: "TypeError in page code",
    caption: "The red packet routes to the browser console because the page's JavaScript crashed inside the user's tab.",
    terminal: QUIET,
    browser: [
      { text: "> openMenu()" },
      { text: "Uncaught TypeError: openMenu is not a function", tone: "red", decode: true },
      { text: "    at app.js:12" },
    ],
    decode: {
      says: "The code tried to call openMenu like a function, but that name does not hold a function.",
      window: "Browser console",
      side: "Frontend or JavaScript side.",
      fix: "Check the spelling, then check that openMenu is defined before this line runs.",
    },
  },
  {
    id: "api",
    buttonId: "err-api",
    label: "Break API call",
    kicker: "SERVER / API",
    target: "terminal",
    title: "500 during fetch()",
    caption: "The browser sees a failed request, but the useful red stack trace is on the server side.",
    terminal: [
      { text: "$ GET /api/profile" },
      { text: "500 Internal Server Error", tone: "red", decode: true },
      { text: "  at loadProfile (server/routes.ts:18)" },
      { text: "  caused by: database URL missing" },
    ],
    browser: [
      { text: "> await fetch('/api/profile')" },
      { text: "Response status: 500", tone: "dim" },
      { text: "No frontend stack trace here.", tone: "dim" },
    ],
    decode: {
      says: "The page asked the server for data. The server crashed while answering.",
      window: "Terminal first, then browser network details if needed.",
      side: "Server or backend side.",
      fix: "Read the server stack trace. The browser only knows the request failed.",
    },
  },
];

const SOURCE = new THREE.Vector3(0, 1.65, 0);
const ROUTER = new THREE.Vector3(0, 0.1, 0);
const TERMINAL = new THREE.Vector3(-3.1, -1.35, 0);
const BROWSER = new THREE.Vector3(3.1, -1.35, 0);
const RED = 0xfc3d21;
const CYAN = 0x5bcee6;
const AMBER = 0xe8a33d;
const SPARK_COUNT = 180;

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function routePoint(target: ErrorTarget, progress: number, out: THREE.Vector3): void {
  const destination = target === "browser" ? BROWSER : TERMINAL;
  if (progress < 0.5) {
    quadraticPoint(SOURCE, new THREE.Vector3(0.45, 1.05, 0.45), ROUTER, progress / 0.5, out);
    return;
  }
  const controlX = target === "browser" ? 1.95 : -1.95;
  quadraticPoint(
    ROUTER,
    new THREE.Vector3(controlX, -0.52, -0.35),
    destination,
    (progress - 0.5) / 0.5,
    out,
  );
}

function quadraticPoint(
  from: THREE.Vector3,
  control: THREE.Vector3,
  to: THREE.Vector3,
  progress: number,
  out: THREE.Vector3,
): void {
  const t = THREE.MathUtils.clamp(progress, 0, 1);
  const u = 1 - t;
  out.set(
    u * u * from.x + 2 * u * t * control.x + t * t * to.x,
    u * u * from.y + 2 * u * t * control.y + t * t * to.y,
    u * u * from.z + 2 * u * t * control.z + t * t * to.z,
  );
}

class ErrorRouteScene {
  private renderer!: THREE.WebGPURenderer;
  private scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private clock = new THREE.Clock();
  private canvas!: HTMLCanvasElement;
  private packet!: THREE.Mesh;
  private router!: THREE.Mesh;
  private terminal!: THREE.LineSegments;
  private browser!: THREE.LineSegments;
  private sparks!: THREE.Points;
  private positionAttr!: THREE.BufferAttribute;
  private colorAttr!: THREE.BufferAttribute;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private readonly tmp = new THREE.Vector3();
  private readonly color = new THREE.Color();
  private readonly hitTargets: THREE.Mesh[] = [];
  private activeTarget: ErrorTarget | null = null;
  private hovered: ScenePick | null = null;
  private progress = 0.18;
  private running = true;
  private reduced = false;
  private lastCaption = "";
  private onCaption?: (text: string) => void;
  private onPick?: (pick: ScenePick) => void;

  async mount(canvas: HTMLCanvasElement): Promise<string> {
    this.canvas = canvas;
    this.reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    this.renderer = new THREE.WebGPURenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    await this.renderer.init();

    this.camera = new THREE.PerspectiveCamera(43, 1, 0.1, 100);
    this.camera.position.set(0, 0.75, 7.8);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.enableZoom = true;
    this.controls.minDistance = 5.4;
    this.controls.maxDistance = 10.2;
    this.controls.minPolarAngle = Math.PI * 0.24;
    this.controls.maxPolarAngle = Math.PI * 0.78;
    this.controls.minAzimuthAngle = -1.05;
    this.controls.maxAzimuthAngle = 1.05;
    this.controls.target.set(0, -0.08, 0);
    this.controls.addEventListener("start", () => canvas.classList.add("is-grabbing"));
    this.controls.addEventListener("end", () => canvas.classList.remove("is-grabbing"));

    this.buildScene();
    this.bindPointer(canvas);
    this.resize(canvas.clientWidth, canvas.clientHeight);

    const loop = (): void => {
      if (this.running) requestAnimationFrame(loop);
      void this.tick();
    };
    requestAnimationFrame(loop);

    return this.backendLabel();
  }

  setCaptionSink(fn: (text: string) => void): void {
    this.onCaption = fn;
  }

  setPickSink(fn: (pick: ScenePick) => void): void {
    this.onPick = fn;
  }

  setRoute(target: ErrorTarget, caption: string): void {
    this.activeTarget = target;
    this.progress = this.reduced ? 0.86 : 0.04;
    if (this.packet) this.packet.visible = true;
    this.updateCaption(caption);
  }

  clear(): void {
    this.activeTarget = null;
    if (this.packet) this.packet.visible = false;
    this.updateCaption("Choose a crash type. The route lights up when an error has a home.");
  }

  resize(width: number, height: number): void {
    if (!width || !height) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  destroy(): void {
    this.running = false;
    this.controls.dispose();
    this.renderer.dispose();
  }

  private backendLabel(): string {
    const renderer = this.renderer as unknown as {
      backend?: { isWebGPUBackend?: boolean };
    };
    return renderer.backend?.isWebGPUBackend ? "WebGPU" : "WebGL2 fallback";
  }

  private buildScene(): void {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    this.scene.add(this.makeLine(SOURCE, ROUTER, CYAN, 0.45));
    this.scene.add(this.makeLine(ROUTER, TERMINAL, CYAN, 0.32));
    this.scene.add(this.makeLine(ROUTER, BROWSER, CYAN, 0.32));

    const source = this.makeWireNode(new THREE.IcosahedronGeometry(0.55, 1), SOURCE, AMBER);
    this.router = this.makeSolidNode(new THREE.OctahedronGeometry(0.48, 1), ROUTER, CYAN, 0.24);
    this.terminal = this.makeWireNode(new THREE.BoxGeometry(1.12, 0.72, 0.34), TERMINAL, CYAN);
    this.browser = this.makeWireNode(new THREE.BoxGeometry(1.12, 0.72, 0.34), BROWSER, CYAN);
    this.scene.add(source, this.router, this.terminal, this.browser);

    this.packet = this.makeSolidNode(new THREE.SphereGeometry(0.14, 24, 16), SOURCE, RED, 0.92);
    this.packet.visible = false;
    this.scene.add(this.packet);
    this.makeHitNode(new THREE.SphereGeometry(1.05, 20, 14), SOURCE, "source");
    this.makeHitNode(new THREE.BoxGeometry(1.55, 1.3, 1.2), ROUTER, "router");
    this.makeHitNode(new THREE.BoxGeometry(2.25, 1.65, 1.35), TERMINAL, "terminal");
    this.makeHitNode(new THREE.BoxGeometry(2.25, 1.65, 1.35), BROWSER, "browser");
    this.buildSparks();
  }

  private makeLine(
    from: THREE.Vector3,
    to: THREE.Vector3,
    color: number,
    opacity: number,
  ): THREE.Line {
    const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
    return new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    );
  }

  private makeWireNode(
    geometry: THREE.BufferGeometry,
    position: THREE.Vector3,
    color: number,
  ): THREE.LineSegments {
    const node = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.72,
      }),
    );
    node.position.copy(position);
    return node;
  }

  private makeSolidNode(
    geometry: THREE.BufferGeometry,
    position: THREE.Vector3,
    color: number,
    opacity: number,
  ): THREE.Mesh {
    const node = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
      }),
    );
    node.position.copy(position);
    return node;
  }

  private makeHitNode(
    geometry: THREE.BufferGeometry,
    position: THREE.Vector3,
    pick: ScenePick,
  ): void {
    const node = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.001,
        depthWrite: false,
      }),
    );
    node.position.copy(position);
    node.userData.pick = pick;
    this.hitTargets.push(node);
    this.scene.add(node);
  }

  private bindPointer(canvas: HTMLCanvasElement): void {
    canvas.addEventListener("pointermove", (event) => {
      const pick = this.pickFromEvent(event);
      if (pick !== this.hovered) {
        this.hovered = pick;
        canvas.style.cursor = pick ? "pointer" : "grab";
        if (pick) this.updateCaption(this.captionForPick(pick));
      }
    });
    canvas.addEventListener("pointerleave", () => {
      this.hovered = null;
      canvas.style.cursor = "grab";
    });
    canvas.addEventListener("click", (event) => {
      const pick = this.pickFromEvent(event);
      if (pick) this.onPick?.(pick);
    });
  }

  private pickFromEvent(event: PointerEvent): ScenePick | null {
    const rect = this.canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    this.pointer.x = x * 2 - 1;
    this.pointer.y = -(y * 2 - 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObjects(this.hitTargets, false)[0];
    return (hit?.object.userData.pick as ScenePick | undefined) ?? this.fallbackPick(x, y);
  }

  private fallbackPick(x: number, y: number): ScenePick | null {
    if (y < 0.38 && Math.abs(x - 0.5) < 0.18) return "source";
    if (y >= 0.34 && y < 0.62 && Math.abs(x - 0.5) < 0.2) return "router";
    if (y > 0.52 && x < 0.38) return "terminal";
    if (y > 0.52 && x > 0.62) return "browser";
    return null;
  }

  private captionForPick(pick: ScenePick): string {
    if (pick === "browser") return "Browser console selected. Page JavaScript errors land here.";
    if (pick === "terminal") return "Terminal selected. Python and server errors land here.";
    if (pick === "router") return "Router selected. Use the red line to decide which window owns the failure.";
    return "Code source selected. The route starts where the running code breaks.";
  }

  private buildSparks(): void {
    const geometry = new THREE.BufferGeometry();
    this.positionAttr = new THREE.BufferAttribute(new Float32Array(SPARK_COUNT * 3), 3).setUsage(
      THREE.DynamicDrawUsage,
    );
    this.colorAttr = new THREE.BufferAttribute(new Float32Array(SPARK_COUNT * 3), 3).setUsage(
      THREE.DynamicDrawUsage,
    );
    geometry.setAttribute("position", this.positionAttr);
    geometry.setAttribute("color", this.colorAttr);
    this.sparks = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.055,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
      }),
    );
    this.sparks.frustumCulled = false;
    this.scene.add(this.sparks);
  }

  private async tick(): Promise<void> {
    try {
      const dt = Math.min(this.clock.getDelta(), 0.05);
      if (!this.reduced) {
        this.router.rotation.y += dt * 0.65;
        this.terminal.rotation.y = Math.sin(this.clock.elapsedTime * 0.55) * 0.08;
        this.browser.rotation.y = Math.sin(this.clock.elapsedTime * 0.55 + 1.4) * 0.08;
      }

      if (this.activeTarget) {
        if (!this.reduced) this.progress = (this.progress + dt * 0.32) % 1;
        routePoint(this.activeTarget, this.progress, this.tmp);
        this.packet.position.copy(this.tmp);
      }

      this.updateMaterials();
      this.updateSparks();
      this.controls.update();
      await this.renderer.renderAsync(this.scene, this.camera);
    } catch (error) {
      console.error("[ErrorRouteScene] render loop stopped:", error);
      this.running = false;
    }
  }

  private updateMaterials(): void {
    const terminalMaterial = this.terminal.material as THREE.LineBasicMaterial;
    const browserMaterial = this.browser.material as THREE.LineBasicMaterial;
    const terminalActive = this.activeTarget === "terminal";
    const browserActive = this.activeTarget === "browser";
    const terminalHover = this.hovered === "terminal";
    const browserHover = this.hovered === "browser";
    const routerHover = this.hovered === "router";
    const routerMaterial = this.router.material as THREE.MeshBasicMaterial;
    terminalMaterial.color.setHex(terminalActive || terminalHover ? RED : CYAN);
    browserMaterial.color.setHex(browserActive || browserHover ? RED : CYAN);
    terminalMaterial.opacity = terminalActive || terminalHover ? 1 : 0.55;
    browserMaterial.opacity = browserActive || browserHover ? 1 : 0.55;
    routerMaterial.opacity = routerHover ? 0.42 : 0.24;
  }

  private updateSparks(): void {
    const positions = this.positionAttr.array as Float32Array;
    const colors = this.colorAttr.array as Float32Array;

    for (let i = 0; i < SPARK_COUNT; i += 1) {
      const j = i * 3;
      if (!this.activeTarget) {
        positions[j] = 0;
        positions[j + 1] = -999;
        positions[j + 2] = 0;
        colors[j] = 0;
        colors[j + 1] = 0;
        colors[j + 2] = 0;
        continue;
      }

      const tail = i / SPARK_COUNT;
      let p = this.progress - tail * 0.34;
      if (p < 0) p += 1;
      routePoint(this.activeTarget, p, this.tmp);
      const wiggle = Math.sin((this.clock.elapsedTime + i) * 3.1) * 0.05;
      positions[j] = this.tmp.x + wiggle;
      positions[j + 1] = this.tmp.y + Math.cos(i * 2.1) * 0.035;
      positions[j + 2] = this.tmp.z + Math.sin(i * 1.7) * 0.07;

      const fade = 1 - tail;
      this.color.setHex(this.activeTarget === "browser" ? AMBER : RED);
      colors[j] = this.color.r * fade;
      colors[j + 1] = this.color.g * fade;
      colors[j + 2] = this.color.b * fade;
    }

    this.positionAttr.needsUpdate = true;
    this.colorAttr.needsUpdate = true;
  }

  private updateCaption(text: string): void {
    if (text === this.lastCaption) return;
    this.lastCaption = text;
    this.onCaption?.(text);
  }
}

export function mountErrorRoutingLab(host: HTMLElement): void {
  let activeCase: ErrorCase | null = null;
  const scene = new ErrorRouteScene();

  host.innerHTML = `
    <div class="error-lab">
      <div class="error-lab-head">
        <div>
          <p class="route-kicker">INTERACTIVE LESSON 03</p>
          <h2>Error Routing Lab</h2>
          <p>Break one thing, watch where the red line lands, then decode the message.</p>
        </div>
        <div class="error-case-switch" aria-label="Crash type">
          ${CASES.map((item) => `
            <button id="${item.buttonId}" type="button" data-case="${item.id}" aria-pressed="false">
              <span>${item.kicker}</span>
              ${item.label}
            </button>
          `).join("")}
          <button id="err-clear" type="button">Clear</button>
        </div>
      </div>

      <div class="error-lab-grid">
        <section class="error-stage-panel" aria-labelledby="error-stage-title">
          <div class="error-panel-bar">
            <span id="error-stage-title">Error route</span>
            <span id="error-renderer">renderer pending</span>
          </div>
          <div id="error-stage" class="error-stage" role="img" aria-label="3D error router that points crashes to the terminal or browser console">
            <canvas id="error-canvas"></canvas>
            <div class="error-stage-overlay" aria-hidden="true">
              <span class="error-tag error-tag-source">CODE RUNS</span>
              <span class="error-tag error-tag-router">READ THE RED LINE</span>
              <span class="error-tag error-tag-terminal">TERMINAL</span>
              <span class="error-tag error-tag-browser">BROWSER CONSOLE</span>
            </div>
          </div>
          <p id="error-caption" class="error-caption" role="status" aria-live="polite">
            Choose a crash type. The route lights up when an error has a home.
          </p>
        </section>
      </div>

      <section class="error-decode-strip" aria-labelledby="error-inspector-title">
        <div class="error-panel-bar">
          <span id="error-inspector-title">Decode</span>
          <span id="error-case-label">waiting</span>
        </div>
        <div id="error-decode" class="error-decode is-empty">
          <h3>No red line selected</h3>
          <p>Run a crash, then click the red line in the window that lights up.</p>
        </div>
      </section>

      <div class="error-console-grid" aria-label="Error windows">
        <article class="error-window" data-window="terminal">
          <div class="error-window-bar">
            <span>Terminal</span>
            <span>server and Python window</span>
          </div>
          <ol id="err-terminal" class="error-console-log"></ol>
        </article>
        <article class="error-window" data-window="browser">
          <div class="error-window-bar">
            <span>Browser console</span>
            <span>page JavaScript window</span>
          </div>
          <ol id="err-console" class="error-console-log"></ol>
        </article>
      </div>
    </div>
  `;

  const stage = host.querySelector<HTMLElement>("#error-stage")!;
  const canvas = host.querySelector<HTMLCanvasElement>("#error-canvas")!;
  const renderer = host.querySelector<HTMLElement>("#error-renderer")!;
  const caption = host.querySelector<HTMLElement>("#error-caption")!;
  const caseLabel = host.querySelector<HTMLElement>("#error-case-label")!;
  const decode = host.querySelector<HTMLElement>("#error-decode")!;
  const terminal = host.querySelector<HTMLOListElement>("#err-terminal")!;
  const browser = host.querySelector<HTMLOListElement>("#err-console")!;
  const caseButtons = Array.from(host.querySelectorAll<HTMLButtonElement>("[data-case]"));
  const windows = Array.from(host.querySelectorAll<HTMLElement>(".error-window"));

  scene.setCaptionSink((text) => {
    caption.textContent = text;
  });
  scene.setPickSink((pick) => {
    if (pick === "browser") {
      selectCase(CASES[1]);
      return;
    }
    if (pick === "terminal") {
      selectCase(CASES[0]);
      return;
    }
    selectCase(CASES[2]);
  });
  void startErrorScene(scene, stage, canvas, renderer, caption);

  function renderLines(list: HTMLOListElement, lines: ErrorLine[]): void {
    list.innerHTML = lines
      .map((line) => {
        const className = line.tone ? ` class="${line.tone}"` : "";
        if (line.decode && activeCase) {
          return `<li${className}><button class="error-line-button" type="button" data-decode="${activeCase.id}">${escapeHtml(line.text)}</button></li>`;
        }
        return `<li${className}>${escapeHtml(line.text)}</li>`;
      })
      .join("");
  }

  function renderDecode(item: ErrorCase | null): void {
    if (!item) {
      decode.classList.add("is-empty");
      decode.innerHTML = `
        <h3>No red line selected</h3>
        <p>Run a crash, then click the red line in the window that lights up.</p>
      `;
      return;
    }

    decode.classList.remove("is-empty");
    decode.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <dl>
        <dt>What it says</dt>
        <dd>${escapeHtml(item.decode.says)}</dd>
        <dt>Which window</dt>
        <dd>${escapeHtml(item.decode.window)}</dd>
        <dt>Which side</dt>
        <dd>${escapeHtml(item.decode.side)}</dd>
        <dt>Likely fix</dt>
        <dd>${escapeHtml(item.decode.fix)}</dd>
      </dl>
    `;
  }

  function wireDecodeButtons(): void {
    host.querySelectorAll<HTMLButtonElement>("[data-decode]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = CASES.find((candidate) => candidate.id === button.dataset.decode);
        if (!item) return;
        renderDecode(item);
        scene.setRoute(item.target, item.caption);
      });
    });
  }

  function selectCase(item: ErrorCase): void {
    activeCase = item;
    caseLabel.textContent = item.kicker;
    caseButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.case === item.id));
    });
    windows.forEach((windowEl) => {
      windowEl.classList.toggle("active", windowEl.dataset.window === item.target);
    });
    renderLines(terminal, item.terminal);
    renderLines(browser, item.browser);
    renderDecode(null);
    wireDecodeButtons();
    scene.setRoute(item.target, item.caption);
  }

  function clear(): void {
    activeCase = null;
    caseLabel.textContent = "waiting";
    caseButtons.forEach((button) => button.setAttribute("aria-pressed", "false"));
    windows.forEach((windowEl) => windowEl.classList.remove("active"));
    renderLines(terminal, QUIET);
    renderLines(browser, QUIET);
    renderDecode(null);
    scene.clear();
  }

  caseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = CASES.find((candidate) => candidate.id === button.dataset.case);
      if (item) selectCase(item);
    });
  });
  host.querySelector<HTMLButtonElement>("#err-clear")!.addEventListener("click", clear);

  clear();
}

async function startErrorScene(
  scene: ErrorRouteScene,
  stage: HTMLElement,
  canvas: HTMLCanvasElement,
  renderer: HTMLElement,
  caption: HTMLElement,
): Promise<void> {
  try {
    const backend = await scene.mount(canvas);
    renderer.textContent = `renderer: ${backend}`;

    const resize = () => scene.resize(stage.clientWidth, stage.clientHeight);
    resize();
    new ResizeObserver(resize).observe(stage);
  } catch (error) {
    console.error("[ErrorRouteScene] failed to start:", error);
    renderer.textContent = "3D unavailable";
    caption.textContent =
      "The 3D router could not start in this browser. The terminal and browser console examples still work.";
  }
}
