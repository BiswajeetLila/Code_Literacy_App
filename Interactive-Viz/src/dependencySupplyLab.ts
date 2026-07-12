import * as THREE from "three/webgpu";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type DependencyMode = "web" | "python";
type SupplyFocus = "list" | "install" | "import";

type DependencyData = {
  label: string;
  listFile: string;
  installDir: string;
  installCommand: string;
  importLine: string;
  packages: string[];
  manifest: string[];
  importSnippet: string[];
};

const DATA: Record<DependencyMode, DependencyData> = {
  web: {
    label: "Web app",
    listFile: "package.json",
    installDir: "node_modules/",
    installCommand: "npm install",
    importLine: 'import confetti from "canvas-confetti";',
    packages: ["vite", "three", "canvas-confetti"],
    manifest: [
      "{",
      '  "dependencies": {',
      '    "vite": "^5.4.10",',
      '    "three": "^0.180.0",',
      '    "canvas-confetti": "^1.9.3"',
      "  }",
      "}",
    ],
    importSnippet: [
      'import confetti from "canvas-confetti";',
      "",
      "confetti({ particleCount: 80 });",
    ],
  },
  python: {
    label: "Python app",
    listFile: "requirements.txt",
    installDir: ".venv/",
    installCommand: "pip install -r requirements.txt",
    importLine: "import requests",
    packages: ["fastapi", "uvicorn", "requests"],
    manifest: ["fastapi==0.115.0", "uvicorn==0.32.0", "requests==2.32.3"],
    importSnippet: [
      "import requests",
      "",
      'response = requests.get("https://api.example.com/menu")',
      "print(response.status_code)",
    ],
  },
};

const LIST = new THREE.Vector3(-3.2, 0.9, 0);
const REGISTRY = new THREE.Vector3(0, 1.45, 0);
const INSTALLED = new THREE.Vector3(0, -1.25, 0);
const CODE = new THREE.Vector3(3.25, 0.9, 0);
const RED = 0xfc3d21;
const CYAN = 0x5bcee6;
const AMBER = 0xe8a33d;
const GREEN = 0x9fd49f;
const PARTICLES = 240;

function linePoint(from: THREE.Vector3, to: THREE.Vector3, t: number, out: THREE.Vector3): void {
  out.lerpVectors(from, to, THREE.MathUtils.clamp(t, 0, 1));
}

class DependencySupplyScene {
  private renderer!: THREE.WebGPURenderer;
  private scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private canvas!: HTMLCanvasElement;
  private clock = new THREE.Clock();
  private listNode!: THREE.LineSegments;
  private registryNode!: THREE.LineSegments;
  private installedNode!: THREE.LineSegments;
  private codeNode!: THREE.LineSegments;
  private packageCloud!: THREE.Group;
  private particles!: THREE.Points;
  private positionAttr!: THREE.BufferAttribute;
  private colorAttr!: THREE.BufferAttribute;
  private tmp = new THREE.Vector3();
  private color = new THREE.Color();
  private focus: SupplyFocus = "list";
  private installed = false;
  private mode: DependencyMode = "web";
  private phase = 0;
  private running = true;
  private reduced = false;
  private onCaption?: (text: string) => void;

  async mount(canvas: HTMLCanvasElement): Promise<string> {
    this.canvas = canvas;
    this.reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    this.renderer = new THREE.WebGPURenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    await this.renderer.init();

    this.camera = new THREE.PerspectiveCamera(43, 1, 0.1, 100);
    this.camera.position.set(0, 0.45, 8.1);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.enablePan = false;
    this.controls.minDistance = 5.6;
    this.controls.maxDistance = 10.4;
    this.controls.minPolarAngle = Math.PI * 0.25;
    this.controls.maxPolarAngle = Math.PI * 0.78;
    this.controls.minAzimuthAngle = -1.1;
    this.controls.maxAzimuthAngle = 1.1;
    this.controls.target.set(0, 0.1, 0);
    this.controls.addEventListener("start", () => canvas.classList.add("is-grabbing"));
    this.controls.addEventListener("end", () => canvas.classList.remove("is-grabbing"));

    this.buildScene();
    this.resize(canvas.clientWidth, canvas.clientHeight);
    this.updateCaption();

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

  setMode(mode: DependencyMode): void {
    this.mode = mode;
    this.installed = false;
    this.focus = "list";
    this.updateCaption();
  }

  setFocus(focus: SupplyFocus): void {
    this.focus = focus;
    this.updateCaption();
  }

  setInstalled(installed: boolean): void {
    this.installed = installed;
    this.focus = installed ? "import" : "install";
    this.updateCaption();
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
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.86));
    this.scene.add(this.makeLine(LIST, REGISTRY, CYAN, 0.28));
    this.scene.add(this.makeLine(REGISTRY, INSTALLED, CYAN, 0.38));
    this.scene.add(this.makeLine(INSTALLED, CODE, CYAN, 0.34));

    this.listNode = this.makeWire(new THREE.BoxGeometry(1.05, 1.28, 0.32), LIST, AMBER);
    this.registryNode = this.makeWire(new THREE.BoxGeometry(2.2, 0.72, 0.52), REGISTRY, CYAN);
    this.installedNode = this.makeWire(new THREE.BoxGeometry(1.7, 0.9, 0.72), INSTALLED, CYAN);
    this.codeNode = this.makeWire(new THREE.BoxGeometry(1.08, 1.28, 0.32), CODE, GREEN);
    this.scene.add(this.listNode, this.registryNode, this.installedNode, this.codeNode);

    this.packageCloud = new THREE.Group();
    for (let i = 0; i < 9; i += 1) {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.24, 0.24),
        new THREE.MeshBasicMaterial({
          color: i % 3 === 0 ? RED : i % 3 === 1 ? CYAN : AMBER,
          transparent: true,
          opacity: 0.62,
        }),
      );
      box.position.set((i - 4) * 0.28, Math.sin(i) * 0.12, Math.cos(i) * 0.18);
      this.packageCloud.add(box);
    }
    this.packageCloud.position.copy(REGISTRY);
    this.scene.add(this.packageCloud);
    this.buildParticles();
    this.canvas.style.cursor = "grab";
  }

  private makeWire(
    geometry: THREE.BufferGeometry,
    position: THREE.Vector3,
    color: number,
  ): THREE.LineSegments {
    const node = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.78 }),
    );
    node.position.copy(position);
    return node;
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

  private buildParticles(): void {
    const geometry = new THREE.BufferGeometry();
    this.positionAttr = new THREE.BufferAttribute(new Float32Array(PARTICLES * 3), 3).setUsage(
      THREE.DynamicDrawUsage,
    );
    this.colorAttr = new THREE.BufferAttribute(new Float32Array(PARTICLES * 3), 3).setUsage(
      THREE.DynamicDrawUsage,
    );
    geometry.setAttribute("position", this.positionAttr);
    geometry.setAttribute("color", this.colorAttr);
    this.particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.06,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
      }),
    );
    this.particles.frustumCulled = false;
    this.scene.add(this.particles);
  }

  private async tick(): Promise<void> {
    try {
      const dt = Math.min(this.clock.getDelta(), 0.05);
      if (!this.reduced) {
        this.phase = (this.phase + dt * 0.32) % 1;
        this.listNode.rotation.y = Math.sin(this.clock.elapsedTime * 0.5) * 0.08;
        this.registryNode.rotation.y += dt * 0.15;
        this.packageCloud.rotation.y += dt * 0.42;
        this.installedNode.rotation.y = Math.sin(this.clock.elapsedTime * 0.8) * 0.12;
        this.codeNode.rotation.y = Math.sin(this.clock.elapsedTime * 0.45 + 0.8) * 0.08;
      }
      this.updateMaterials();
      this.updateParticles();
      this.controls.update();
      await this.renderer.renderAsync(this.scene, this.camera);
    } catch (error) {
      console.error("[DependencySupplyScene] render loop stopped:", error);
      this.running = false;
    }
  }

  private updateMaterials(): void {
    this.setLine(this.listNode, this.focus === "list", AMBER);
    this.setLine(this.registryNode, this.focus === "install", CYAN);
    this.setLine(this.installedNode, this.focus === "install" || this.installed, this.installed ? GREEN : CYAN);
    this.setLine(this.codeNode, this.focus === "import", GREEN);
  }

  private setLine(node: THREE.LineSegments, active: boolean, color: number): void {
    const material = node.material as THREE.LineBasicMaterial;
    material.color.setHex(active ? RED : color);
    material.opacity = active ? 1 : 0.6;
  }

  private updateParticles(): void {
    const positions = this.positionAttr.array as Float32Array;
    const colors = this.colorAttr.array as Float32Array;
    const [from, to, color] = this.particleRoute();

    for (let i = 0; i < PARTICLES; i += 1) {
      const j = i * 3;
      const tail = i / PARTICLES;
      const t = this.reduced ? 0.7 : (this.phase - tail * 0.42 + 1) % 1;
      linePoint(from, to, t, this.tmp);
      positions[j] = this.tmp.x + Math.sin(i * 1.7) * 0.055;
      positions[j + 1] = this.tmp.y + Math.cos(i * 2.1) * 0.055;
      positions[j + 2] = this.tmp.z + Math.sin(this.clock.elapsedTime + i) * 0.08;
      const fade = 1 - tail * 0.75;
      this.color.setHex(color);
      colors[j] = this.color.r * fade;
      colors[j + 1] = this.color.g * fade;
      colors[j + 2] = this.color.b * fade;
    }

    this.positionAttr.needsUpdate = true;
    this.colorAttr.needsUpdate = true;
  }

  private particleRoute(): [THREE.Vector3, THREE.Vector3, number] {
    if (this.focus === "list") return [LIST, REGISTRY, AMBER];
    if (this.focus === "install" || !this.installed) return [REGISTRY, INSTALLED, RED];
    return [INSTALLED, CODE, GREEN];
  }

  private updateCaption(): void {
    const data = DATA[this.mode];
    if (this.reduced) {
      this.onCaption?.(`Reduced motion: ${data.listFile} lists parts, ${data.installCommand} installs them, and ${data.importLine} uses one.`);
      return;
    }
    if (this.focus === "list") {
      this.onCaption?.(`${data.listFile} is the shopping list. It names outside parts, but it does not contain them.`);
      return;
    }
    if (this.focus === "install") {
      this.onCaption?.(`${data.installCommand} brings the listed parts into ${data.installDir}.`);
      return;
    }
    this.onCaption?.(`${data.importLine} takes one installed part off the shelf so this file can use it.`);
  }
}

export function mountDependencySupplyLab(host: HTMLElement): void {
  let mode: DependencyMode = "web";
  let installed = false;
  let focus: SupplyFocus = "list";
  const scene = new DependencySupplyScene();

  host.innerHTML = `
    <div class="dep-lab">
      <div class="dep-lab-head">
        <div>
          <p class="route-kicker">INTERACTIVE LESSON 01</p>
          <h2>Dependency Supply Lab</h2>
          <p>Read the list, install the outside parts, then import one part into code.</p>
        </div>
        <div class="dep-mode-switch" aria-label="Project type">
          <button type="button" data-mode="web" aria-pressed="true">Web</button>
          <button type="button" data-mode="python" aria-pressed="false">Python</button>
        </div>
      </div>

      <section class="dep-stage-panel" aria-labelledby="dep-stage-title">
        <div class="dep-panel-bar">
          <span id="dep-stage-title">Supply route</span>
          <span id="dep-renderer">renderer pending</span>
        </div>
        <div id="dep-stage" class="dep-stage" role="img" aria-label="3D dependency supply route from list to installed parts to import line">
          <canvas id="dep-canvas"></canvas>
          <div class="dep-stage-overlay" aria-hidden="true">
            <span class="dep-tag dep-tag-list">LIST FILE</span>
            <span class="dep-tag dep-tag-registry">OUTSIDE PARTS</span>
            <span class="dep-tag dep-tag-installed">INSTALLED HERE</span>
            <span class="dep-tag dep-tag-code">IMPORT LINE</span>
          </div>
        </div>
        <p id="dep-caption" class="dep-caption" role="status" aria-live="polite">
          package.json is the shopping list. It names outside parts, but it does not contain them.
        </p>
      </section>

      <div class="dep-workbench">
        <section class="dep-panel dep-flow-panel" aria-labelledby="dep-flow-title">
          <div class="dep-panel-bar">
            <span id="dep-flow-title">Three-step read</span>
            <span id="dep-mode-label">Web app</span>
          </div>
          <ol class="dep-flow">
            <li><button type="button" data-focus="list" aria-pressed="true"><b>01 Read list</b><span id="dep-list-name">package.json</span></button></li>
            <li><button type="button" data-focus="install" aria-pressed="false"><b>02 Install</b><span id="dep-install-command">npm install</span></button></li>
            <li><button type="button" data-focus="import" aria-pressed="false"><b>03 Import</b><span id="dep-import-line">import confetti...</span></button></li>
          </ol>
          <div class="dep-actions">
            <button id="dep-run-install" type="button">Run install</button>
            <button id="dep-reset" type="button">Reset</button>
          </div>
          <p id="dep-status" class="dep-status" role="status" aria-live="polite"></p>
        </section>

        <section class="dep-panel dep-code-panel" aria-labelledby="dep-code-title">
          <div class="dep-panel-bar">
            <span id="dep-code-title">Real artifact</span>
            <span id="dep-code-label">package.json</span>
          </div>
          <pre id="dep-code"></pre>
        </section>

        <section class="dep-panel dep-terminal-panel" aria-labelledby="dep-terminal-title">
          <div class="dep-panel-bar">
            <span id="dep-terminal-title">Terminal</span>
            <span id="dep-install-dir">node_modules/</span>
          </div>
          <ol id="dep-terminal" class="dep-terminal-log" aria-live="polite"></ol>
        </section>
      </div>
    </div>
  `;

  const stage = host.querySelector<HTMLElement>("#dep-stage")!;
  const canvas = host.querySelector<HTMLCanvasElement>("#dep-canvas")!;
  const renderer = host.querySelector<HTMLElement>("#dep-renderer")!;
  const caption = host.querySelector<HTMLElement>("#dep-caption")!;
  const modeLabel = host.querySelector<HTMLElement>("#dep-mode-label")!;
  const listName = host.querySelector<HTMLElement>("#dep-list-name")!;
  const installCommand = host.querySelector<HTMLElement>("#dep-install-command")!;
  const importLine = host.querySelector<HTMLElement>("#dep-import-line")!;
  const status = host.querySelector<HTMLElement>("#dep-status")!;
  const codeLabel = host.querySelector<HTMLElement>("#dep-code-label")!;
  const code = host.querySelector<HTMLElement>("#dep-code")!;
  const installDir = host.querySelector<HTMLElement>("#dep-install-dir")!;
  const terminal = host.querySelector<HTMLOListElement>("#dep-terminal")!;
  const modeButtons = Array.from(host.querySelectorAll<HTMLButtonElement>("[data-mode]"));
  const focusButtons = Array.from(host.querySelectorAll<HTMLButtonElement>("[data-focus]"));

  scene.setCaptionSink((text) => {
    caption.textContent = text;
  });
  void startDependencyScene(scene, stage, canvas, renderer, caption);

  function data(): DependencyData {
    return DATA[mode];
  }

  function renderAll(): void {
    const current = data();
    modeLabel.textContent = current.label;
    listName.textContent = current.listFile;
    installCommand.textContent = current.installCommand;
    importLine.textContent = current.importLine;
    installDir.textContent = current.installDir;
    codeLabel.textContent = focus === "import" ? "import line" : current.listFile;
    code.textContent =
      focus === "import" ? current.importSnippet.join("\n") : current.manifest.join("\n");
    status.textContent = installed
      ? `${current.installDir} is filled. Imports can now use installed packages.`
      : `${current.listFile} names packages. Run install before imports can use them.`;
    modeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mode === mode));
    });
    focusButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.focus === focus));
    });
  }

  function printInstall(): void {
    const current = data();
    terminal.innerHTML = "";
    const lines = [
      `$ ${current.installCommand}`,
      `read ${current.listFile}`,
      ...current.packages.map((name) => `download ${name}`),
      `saved into ${current.installDir}`,
    ];
    for (const line of lines) {
      const item = document.createElement("li");
      item.textContent = line;
      terminal.appendChild(item);
    }
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.mode as DependencyMode;
      installed = false;
      focus = "list";
      terminal.innerHTML = "";
      scene.setMode(mode);
      renderAll();
    });
  });

  focusButtons.forEach((button) => {
    button.addEventListener("click", () => {
      focus = button.dataset.focus as SupplyFocus;
      scene.setFocus(focus);
      renderAll();
    });
  });

  host.querySelector<HTMLButtonElement>("#dep-run-install")!.addEventListener("click", () => {
    installed = true;
    focus = "install";
    scene.setInstalled(true);
    printInstall();
    renderAll();
  });

  host.querySelector<HTMLButtonElement>("#dep-reset")!.addEventListener("click", () => {
    installed = false;
    focus = "list";
    terminal.innerHTML = "";
    scene.setInstalled(false);
    scene.setFocus("list");
    renderAll();
  });

  renderAll();
}

async function startDependencyScene(
  scene: DependencySupplyScene,
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
    console.error("[DependencySupplyScene] failed to start:", error);
    renderer.textContent = "3D unavailable";
    caption.textContent =
      "The 3D supply route could not start in this browser. The list, install command, and import snippets still show the model.";
  }
}
