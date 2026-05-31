// restaurant.ts
// The Week-01 analogy, drawn in 3D: client & server as a restaurant.
//
//   TABLE (left)  =  the CLIENT (you) — the one who orders
//   KITCHEN (right) = the SERVER — receives the order, makes it, sends it back
//
// A red token = the REQUEST ("I'd like this please") travels table -> kitchen.
// A plate     = the RESPONSE (your food) travels kitchen -> table.
// That out-and-back trip is the whole lesson.
//
// Drawn as flat line-art (no lights, black outlines) for an
// engineering-drawing feel that matches the NASA-manual theme.

import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";

const PAPER = 0xf4f1e8;
const INK = 0x1a1a1a;
const RED = 0xfc3d21;
const CYAN = 0x5b8db8;
const AMBER = 0xe8a33d;

const TABLE_X = -4;
const KITCHEN_X = 4;
const TRACK_Y = 0.7;

/** One step of the order, with the words shown under the canvas. */
type Phase = {
  text: string;
  move?: { token: "request" | "response"; from: number; to: number };
  holdMs?: number; // a still "beat" (e.g. the kitchen cooking)
};

const PHASES: Phase[] = [
  { text: 'Ready. Press "Play the order".' },
  {
    text: "1 · You place an order. You are the CLIENT (the customer).",
    holdMs: 600,
  },
  {
    text: "2 · The REQUEST travels to the kitchen — the SERVER.",
    move: { token: "request", from: TABLE_X, to: KITCHEN_X },
  },
  {
    text: "3 · The kitchen makes it. (Backend work — done out of sight.)",
    holdMs: 900,
  },
  {
    text: "4 · The RESPONSE — your food — travels back to your table.",
    move: { token: "response", from: KITCHEN_X, to: TABLE_X },
  },
  {
    text: "5 · Served. That round trip — request → response — is the whole game.",
    holdMs: 0,
  },
];

/** Make a flat-filled box with black edge outlines (line-art look). */
function block(
  w: number,
  h: number,
  d: number,
  color: number,
): THREE.Group {
  const g = new THREE.Group();
  const fill = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshBasicMaterial({ color }),
  );
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)),
    new THREE.LineBasicMaterial({ color: INK }),
  );
  g.add(fill, edges);
  return g;
}

function label(text: string, accent = false): CSS2DObject {
  const div = document.createElement("div");
  div.className = accent ? "viz-label accent" : "viz-label";
  div.textContent = text;
  return new CSS2DObject(div);
}

export class Restaurant {
  private scene = new THREE.Scene();
  private renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  private labelRenderer = new CSS2DRenderer();
  private ortho!: THREE.OrthographicCamera;
  private persp!: THREE.PerspectiveCamera;
  private useOrtho = true;
  private host!: HTMLElement;

  private requestToken!: THREE.Group;
  private responseToken!: THREE.Group;
  private table!: THREE.Group;
  private kitchen!: THREE.Group;

  private phaseIndex = 0;
  private progress = 0; // 0..1 within a moving/holding phase
  private playing = false;
  private clock = new THREE.Clock();
  private onPhaseChange?: (text: string) => void;
  private reduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  mount(host: HTMLElement, onPhaseChange?: (text: string) => void): void {
    this.host = host;
    this.onPhaseChange = onPhaseChange;

    // screen-reader alternative for the canvas (the live caption narrates steps)
    host.setAttribute("role", "img");
    host.setAttribute(
      "aria-label",
      "Diagram: a request travels from the customer's table (the client) to the " +
        "kitchen (the server), then a plate of food travels back. The caption below " +
        "narrates each step.",
    );

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(PAPER, 0); // transparent -> CSS grid shows through
    host.appendChild(this.renderer.domElement);

    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0";
    this.labelRenderer.domElement.style.pointerEvents = "none";
    host.appendChild(this.labelRenderer.domElement);

    this.buildCameras();
    this.buildWorld();
    this.resize();
    window.addEventListener("resize", () => this.resize());

    this.applyPhase(0);
    this.renderer.setAnimationLoop(() => this.tick());
  }

  private buildCameras(): void {
    this.persp = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    this.persp.position.set(0, 5, 12);
    this.persp.lookAt(0, 0.5, 0);

    // orthographic = true engineering-drawing view (no perspective distortion)
    this.ortho = new THREE.OrthographicCamera(-8, 8, 4.5, -4.5, 0.1, 100);
    this.ortho.position.set(0, 6, 12);
    this.ortho.lookAt(0, 0.5, 0);
  }

  private get camera(): THREE.Camera {
    return this.useOrtho ? this.ortho : this.persp;
  }

  private buildWorld(): void {
    // floor grid (drafting table)
    const grid = new THREE.GridHelper(20, 20, INK, INK);
    (grid.material as THREE.Material).opacity = 0.15;
    (grid.material as THREE.Material).transparent = true;
    this.scene.add(grid);

    // TABLE — the client side
    this.table = block(2.4, 0.3, 1.8, CYAN);
    this.table.position.set(TABLE_X, 0.15, 0);
    const tableLeg = block(0.2, 1, 0.2, INK);
    tableLeg.position.set(TABLE_X, -0.4, 0);
    const tableLabel = label("TABLE · CLIENT (you)");
    tableLabel.position.set(TABLE_X, 1.1, 0);
    const frontendLabel = label("DINING ROOM = FRONTEND");
    frontendLabel.position.set(TABLE_X, -1.1, 0);
    this.scene.add(this.table, tableLeg, tableLabel, frontendLabel);

    // KITCHEN — the server side
    this.kitchen = block(3, 2, 1.8, AMBER);
    this.kitchen.position.set(KITCHEN_X, 1, 0);
    const kitchenLabel = label("KITCHEN · SERVER");
    kitchenLabel.position.set(KITCHEN_X, 2.4, 0);
    const backendLabel = label("KITCHEN = BACKEND");
    backendLabel.position.set(KITCHEN_X, -1.1, 0);
    this.scene.add(this.kitchen, kitchenLabel, backendLabel);

    // REQUEST token — a red marker
    this.requestToken = block(0.6, 0.6, 0.6, RED);
    const reqLabel = label("REQUEST", true);
    reqLabel.position.set(0, 0.8, 0);
    this.requestToken.add(reqLabel);
    this.requestToken.position.set(TABLE_X, TRACK_Y, 0);
    this.requestToken.visible = false;
    this.scene.add(this.requestToken);

    // RESPONSE token — a plate of food
    this.responseToken = new THREE.Group();
    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.12, 24),
      new THREE.MeshBasicMaterial({ color: PAPER }),
    );
    const plateEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.5, 0.5, 0.12, 24)),
      new THREE.LineBasicMaterial({ color: INK }),
    );
    const food = block(0.4, 0.3, 0.4, RED);
    food.position.y = 0.2;
    const respLabel = label("RESPONSE", true);
    respLabel.position.set(0, 0.8, 0);
    this.responseToken.add(plate, plateEdge, food, respLabel);
    this.responseToken.position.set(KITCHEN_X, TRACK_Y, 0);
    this.responseToken.visible = false;
    this.scene.add(this.responseToken);
  }

  // ---- playback controls (wired to the buttons in main.ts) ----

  play(): void {
    if (this.phaseIndex >= PHASES.length - 1) this.reset();
    this.playing = true;
  }

  step(): void {
    this.playing = false;
    this.gotoPhase(Math.min(this.phaseIndex + 1, PHASES.length - 1), true);
  }

  reset(): void {
    this.playing = false;
    this.gotoPhase(0, true);
  }

  setOrthographic(on: boolean): void {
    this.useOrtho = on;
    this.resize();
  }

  // ---- phase handling ----

  private gotoPhase(index: number, snapToEnd: boolean): void {
    this.phaseIndex = index;
    this.progress = snapToEnd ? 1 : 0;
    this.applyPhase(index);
    if (snapToEnd) this.settleTokens(index);
  }

  /** Set visibility + report the caption for a phase. */
  private applyPhase(index: number): void {
    const phase = PHASES[index];
    // request marker is visible while ordering / travelling to kitchen (1,2)
    this.requestToken.visible = index === 1 || index === 2;
    // response plate is visible while travelling back / served (4,5)
    this.responseToken.visible = index === 4 || index === 5;
    this.onPhaseChange?.(phase.text);
  }

  /** When stepping/resetting, place tokens at their end-of-phase spot. */
  private settleTokens(index: number): void {
    const phase = PHASES[index];
    if (phase.move?.token === "request") {
      this.requestToken.position.x = phase.move.to;
    } else if (phase.move?.token === "response") {
      this.responseToken.position.x = phase.move.to;
    } else if (index === 1) {
      this.requestToken.position.x = TABLE_X;
    }
  }

  private tick(): void {
    const dt = this.clock.getDelta();
    if (this.playing) this.advance(dt);
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  /** Drive motion + auto-advance through phases while playing. */
  private advance(dt: number): void {
    const phase = PHASES[this.phaseIndex];
    // reduced-motion: no gliding — hold each step ~1s so captions stay readable
    const duration = this.reduced
      ? 1.0
      : phase.move
        ? 1.6
        : (phase.holdMs ?? 0) / 1000;

    if (duration <= 0) {
      this.nextPhase();
      return;
    }

    this.progress = Math.min(1, this.progress + dt / duration);

    if (phase.move) {
      const token =
        phase.move.token === "request" ? this.requestToken : this.responseToken;
      // snap to destination when reduced-motion is on, otherwise glide
      token.position.x = this.reduced
        ? phase.move.to
        : THREE.MathUtils.lerp(phase.move.from, phase.move.to, easeInOut(this.progress));
    }

    if (this.progress >= 1) this.nextPhase();
  }

  private nextPhase(): void {
    if (this.phaseIndex >= PHASES.length - 1) {
      this.playing = false;
      return;
    }
    this.gotoPhase(this.phaseIndex + 1, false);
  }

  private resize(): void {
    const w = this.host.clientWidth;
    const h = this.host.clientHeight;
    this.renderer.setSize(w, h);
    this.labelRenderer.setSize(w, h);

    const aspect = w / h;
    this.persp.aspect = aspect;
    this.persp.updateProjectionMatrix();

    const viewH = 5;
    this.ortho.left = -viewH * aspect;
    this.ortho.right = viewH * aspect;
    this.ortho.top = viewH;
    this.ortho.bottom = -viewH;
    this.ortho.updateProjectionMatrix();
  }
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
