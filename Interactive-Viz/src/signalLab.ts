import * as THREE from "three/webgpu";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export type SignalFocus = "request" | "server" | "response" | null;

export type SignalTripEvent = {
  ok: boolean;
  latencyMs: number;
};

const CLIENT = new THREE.Vector3(-3.2, 0, 0);
const SERVER = new THREE.Vector3(3.2, 0, 0);
const MAX_PARTICLES = 4200;
const OUT_END = 0.42;
const DWELL_END = 0.58;
const REQUEST = 0xfc3d21;
const RESPONSE = 0x5bcee6;
const INK = 0x11151a;

function curvePoint(
  from: THREE.Vector3,
  control: THREE.Vector3,
  to: THREE.Vector3,
  t: number,
  out: THREE.Vector3,
): void {
  const u = 1 - t;
  out.set(
    u * u * from.x + 2 * u * t * control.x + t * t * to.x,
    u * u * from.y + 2 * u * t * control.y + t * t * to.y,
    u * u * from.z + 2 * u * t * control.z + t * t * to.z,
  );
}

export class SignalLab {
  private renderer!: THREE.WebGPURenderer;
  private scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private clock = new THREE.Clock();

  private clientWire!: THREE.LineSegments;
  private serverFill!: THREE.Mesh;
  private serverWire!: THREE.LineSegments;
  private particles!: THREE.Points;
  private positionAttr!: THREE.BufferAttribute;
  private colorAttr!: THREE.BufferAttribute;

  private readonly seedPhase = new Float32Array(MAX_PARTICLES);
  private readonly scatter = new Float32Array(MAX_PARTICLES * 3);
  private readonly tmp = new THREE.Vector3();
  private readonly control = new THREE.Vector3();
  private readonly tmpColor = new THREE.Color();

  private activeCount = 2200;
  private cycle = 0.08;
  private pulse = 0;
  private latency01 = 0.4;
  private payload01 = 0.5;
  private errorMode = false;
  private focus: SignalFocus = null;
  private running = false;
  private destroyed = false;
  private reduced = false;
  private lastCaption = "";
  private onCaption?: (text: string) => void;
  private onTrip?: (event: SignalTripEvent) => void;

  async mount(canvas: HTMLCanvasElement): Promise<string> {
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
    if (this.destroyed) return "stopped";

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.camera.position.set(0, 0.55, 8.1);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enablePan = false;
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minPolarAngle = Math.PI * 0.36;
    this.controls.maxPolarAngle = Math.PI * 0.61;
    this.controls.minAzimuthAngle = -0.5;
    this.controls.maxAzimuthAngle = 0.5;
    this.controls.target.set(0, 0, 0);

    this.buildNodes();
    this.buildSignal();
    this.setPayload(this.payload01);
    this.resize(canvas.clientWidth, canvas.clientHeight);

    this.running = true;
    const loop = (): void => {
      if (!this.running) return;
      requestAnimationFrame(loop);
      void this.tick();
    };
    requestAnimationFrame(loop);

    return this.backendLabel();
  }

  setCaptionSink(fn: (text: string) => void): void {
    this.onCaption = fn;
  }

  setTripSink(fn: (event: SignalTripEvent) => void): void {
    this.onTrip = fn;
  }

  setFocus(focus: SignalFocus): void {
    this.focus = focus;
    if (focus === "request") this.cycle = OUT_END * 0.5;
    if (focus === "server") this.cycle = (OUT_END + DWELL_END) * 0.5;
    if (focus === "response") this.cycle = (DWELL_END + 1) * 0.5;
    if (focus === "server") this.pulse = 1;
  }

  setError(on: boolean): void {
    this.errorMode = on;
  }

  setLatency(value: number): void {
    this.latency01 = THREE.MathUtils.clamp(value, 0, 1);
  }

  setPayload(value: number): void {
    this.payload01 = THREE.MathUtils.clamp(value, 0, 1);
    this.activeCount = Math.round(
      THREE.MathUtils.lerp(360, MAX_PARTICLES, this.payload01),
    );
    this.particles.geometry.setDrawRange(0, this.activeCount);
  }

  resize(width: number, height: number): void {
    if (!width || !height) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    this.running = false;
    this.controls?.dispose();
    this.renderer?.dispose();
  }

  get isDestroyed(): boolean {
    return this.destroyed;
  }

  get latencyMs(): number {
    return Math.round(this.tripDuration * 1000);
  }

  private backendLabel(): string {
    const renderer = this.renderer as unknown as {
      backend?: { isWebGPUBackend?: boolean };
    };
    return renderer.backend?.isWebGPUBackend ? "WebGPU" : "WebGL2 fallback";
  }

  private get tripDuration(): number {
    return THREE.MathUtils.lerp(1.8, 6.0, this.latency01);
  }

  private makeNode(
    geometry: THREE.BufferGeometry,
    position: THREE.Vector3,
    opacity: number,
  ): { fill: THREE.Mesh; wire: THREE.LineSegments } {
    const fill = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: RESPONSE,
        transparent: true,
        opacity,
      }),
    );
    fill.position.copy(position);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      new THREE.LineBasicMaterial({
        color: RESPONSE,
        transparent: true,
        opacity: 0.9,
      }),
    );
    wire.position.copy(position);
    this.scene.add(fill, wire);
    return { fill, wire };
  }

  private buildNodes(): void {
    const client = this.makeNode(
      new THREE.IcosahedronGeometry(0.72, 1),
      CLIENT,
      0.06,
    );
    const server = this.makeNode(
      new THREE.IcosahedronGeometry(1.22, 2),
      SERVER,
      0.08,
    );
    this.clientWire = client.wire;
    this.serverFill = server.fill;
    this.serverWire = server.wire;

    const baseline = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(CLIENT.x, -1.55, 0),
      new THREE.Vector3(SERVER.x, -1.55, 0),
    ]);
    this.scene.add(
      new THREE.Line(
        baseline,
        new THREE.LineBasicMaterial({
          color: INK,
          transparent: true,
          opacity: 0.45,
        }),
      ),
    );
  }

  private buildSignal(): void {
    const positions = new Float32Array(MAX_PARTICLES * 3);
    const colors = new Float32Array(MAX_PARTICLES * 3);

    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      this.seedPhase[i] = Math.random();
      this.scatter[i * 3] = (Math.random() - 0.5) * 0.42;
      this.scatter[i * 3 + 1] = (Math.random() - 0.5) * 0.42;
      this.scatter[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    this.positionAttr = new THREE.BufferAttribute(positions, 3).setUsage(
      THREE.DynamicDrawUsage,
    );
    this.colorAttr = new THREE.BufferAttribute(colors, 3).setUsage(
      THREE.DynamicDrawUsage,
    );
    geometry.setAttribute("position", this.positionAttr);
    geometry.setAttribute("color", this.colorAttr);

    this.particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.075,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    );
    this.particles.frustumCulled = false;
    this.scene.add(this.particles);
  }

  private async tick(): Promise<void> {
    try {
      const dt = Math.min(this.clock.getDelta(), 0.05);
      const shouldMove = !this.reduced && this.focus === null;

      if (shouldMove) {
        const previous = this.cycle;
        this.cycle = (this.cycle + dt / this.tripDuration) % 1;
        if (previous < OUT_END && this.cycle >= OUT_END) this.pulse = 1;
        if (this.cycle < previous) {
          this.onTrip?.({ ok: !this.errorMode, latencyMs: this.latencyMs });
        }
      }

      if (this.focus === "server") this.pulse = 1;
      this.pulse = Math.max(0, this.pulse - dt * 2.4);

      if (!this.reduced) {
        this.clientWire.rotation.y += dt * 0.22;
        this.serverWire.rotation.y -= dt * 0.18;
        this.serverFill.rotation.y -= dt * 0.18;
      }

      this.updateSignal();
      this.updateServer();
      this.updateCaption();
      this.controls.update();
      await this.renderer.renderAsync(this.scene, this.camera);
    } catch (error) {
      console.error("[SignalLab] render loop stopped:", error);
      this.running = false;
    }
  }

  private updateServer(): void {
    const fill = this.serverFill.material as THREE.MeshBasicMaterial;
    const wire = this.serverWire.material as THREE.LineBasicMaterial;
    const activeColor = this.errorMode && this.pulse > 0.02 ? REQUEST : RESPONSE;
    const color = this.tmpColor.setHex(activeColor).clone();
    fill.color = color;
    wire.color = color.clone();
    fill.opacity = 0.08 + this.pulse * 0.48;
    wire.opacity = 0.85 + this.pulse * 0.15;
  }

  private updateSignal(): void {
    const positions = this.positionAttr.array as Float32Array;
    const colors = this.colorAttr.array as Float32Array;
    const requestColor = new THREE.Color(REQUEST);
    const responseColor = new THREE.Color(this.errorMode ? REQUEST : RESPONSE);

    for (let i = 0; i < this.activeCount; i += 1) {
      const p = (this.seedPhase[i] + this.cycle) % 1;
      const driftX = this.scatter[i * 3];
      const driftY = this.scatter[i * 3 + 1];
      const driftZ = this.scatter[i * 3 + 2];
      let segment: Exclude<SignalFocus, null>;
      let color: THREE.Color;
      let hidden = false;

      if (p < OUT_END) {
        curvePoint(
          CLIENT,
          this.control.set(0, 1.55, 0.35),
          SERVER,
          p / OUT_END,
          this.tmp,
        );
        segment = "request";
        color = requestColor;
      } else if (p < DWELL_END) {
        const ring = ((p - OUT_END) / (DWELL_END - OUT_END)) * Math.PI * 2;
        this.tmp.set(
          SERVER.x + Math.cos(ring) * 0.5,
          Math.sin(ring) * 0.5,
          Math.sin(ring * 1.4) * 0.35,
        );
        segment = "server";
        color = requestColor;
      } else {
        curvePoint(
          SERVER,
          this.control.set(0, -1.55, -0.35),
          CLIENT,
          (p - DWELL_END) / (1 - DWELL_END),
          this.tmp,
        );
        segment = "response";
        color = responseColor;
        hidden = this.errorMode;
      }

      const j = i * 3;
      if (hidden) {
        positions[j] = 0;
        positions[j + 1] = -999;
        positions[j + 2] = 0;
      } else {
        positions[j] = this.tmp.x + driftX;
        positions[j + 1] = this.tmp.y + driftY;
        positions[j + 2] = this.tmp.z + driftZ;
      }

      const dim = this.focus !== null && this.focus !== segment ? 0.13 : 1;
      colors[j] = color.r * dim;
      colors[j + 1] = color.g * dim;
      colors[j + 2] = color.b * dim;
    }

    this.positionAttr.needsUpdate = true;
    this.colorAttr.needsUpdate = true;
  }

  private updateCaption(): void {
    let caption: string;
    if (this.reduced) {
      caption = this.errorMode
        ? "Reduced motion: request reaches the server, then fails before a response returns."
        : "Reduced motion: request, server work, and response are shown as a static signal path.";
    } else if (this.focus === "request") {
      caption = "Code focus: fetch() sends the request from the client to the server.";
    } else if (this.focus === "server") {
      caption = "Code focus: the server does hidden backend work before answering.";
    } else if (this.focus === "response") {
      caption = "Code focus: the response returns so the client can draw the result.";
    } else if (this.cycle < OUT_END) {
      caption = "Outbound: the request travels from the client to the server.";
    } else if (this.cycle < DWELL_END) {
      caption = "Server work: the answer is prepared out of sight.";
    } else if (this.errorMode) {
      caption = "Server failure: no response stream returns to the client.";
    } else {
      caption = "Return: the response travels back to the client.";
    }

    if (caption !== this.lastCaption) {
      this.lastCaption = caption;
      this.onCaption?.(caption);
    }
  }
}
