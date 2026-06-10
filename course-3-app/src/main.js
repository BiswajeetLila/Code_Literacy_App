import { getModuleById, modules, operatingLoop } from "./courseData.js";
import { isModuleComplete, loadProgress, saveProgress, toggleModule } from "./progressStore.js";

const app = document.querySelector("#app");
const MODULE_RAIL_KEY = "course3.moduleRailOpen";
let progress = loadProgress();
let moduleRailOpen = loadModuleRailState();

function selectedModuleId() {
  const hash = window.location.hash.replace("#", "");
  if (modules.some((module) => module.id === hash)) {
    return hash;
  }
  return modules[0].id;
}

function setSelectedModule(moduleId) {
  if (window.location.hash !== `#${moduleId}`) {
    window.location.hash = moduleId;
    return;
  }
  render();
}

function handleToggle(moduleId) {
  progress = toggleModule(progress, moduleId);
  saveProgress(progress);
  render();
}

function handleModuleRailToggle() {
  moduleRailOpen = !moduleRailOpen;
  window.localStorage.setItem(MODULE_RAIL_KEY, String(moduleRailOpen));
  render();
}

function render() {
  const current = getModuleById(selectedModuleId());
  const completedCount = modules.filter((module) => isModuleComplete(progress, module.id)).length;

  app.innerHTML = `
    <header class="topbar">
      <div>
        <p class="kicker">Course 3 / Unity Solo AI Game Studio</p>
        <h1>Studio Control Board</h1>
      </div>
      <div class="progress-meter" aria-label="Local module progress">
        <span>${completedCount}/10</span>
        <small>local gates</small>
      </div>
    </header>

    <main class="workspace ${moduleRailOpen ? "" : "modules-collapsed"}">
      <section class="mission-band" aria-label="Course operating loop">
        ${operatingLoop.map((step, index) => `
          <span class="loop-step">
            <b>${String(index + 1).padStart(2, "0")}</b>
            ${step}
          </span>`).join("")}
      </section>

      <div class="view-controls">
        <button
          class="rail-toggle"
          type="button"
          data-toggle-modules
          aria-expanded="${moduleRailOpen}"
          aria-controls="module-rail"
        >
          ${moduleRailOpen ? "Hide modules" : "Show modules"}
        </button>
        <span class="current-readout">Viewing Module ${String(current.number).padStart(2, "0")} / ${current.title}</span>
      </div>

      <section id="module-rail" class="module-grid" aria-label="Course 3 modules" ${moduleRailOpen ? "" : "hidden"}>
        ${modules.map((module) => renderModuleButton(module, current.id)).join("")}
      </section>

      <section class="detail-panel" aria-live="polite">
        ${renderDetail(current)}
      </section>
    </main>
  `;

  app.querySelectorAll("[data-module-id]").forEach((button) => {
    button.addEventListener("click", () => setSelectedModule(button.dataset.moduleId));
  });

  app.querySelector("[data-toggle-complete]")?.addEventListener("click", () => {
    handleToggle(current.id);
  });

  app.querySelector("[data-toggle-modules]")?.addEventListener("click", handleModuleRailToggle);
}

function renderModuleButton(module, currentId) {
  const complete = isModuleComplete(progress, module.id);
  return `
    <button
      class="module-tile ${module.id === currentId ? "selected" : ""} ${complete ? "complete" : ""}"
      type="button"
      data-module-id="${module.id}"
      aria-pressed="${module.id === currentId}"
    >
      <span class="module-num">${String(module.number).padStart(2, "0")}</span>
      <span class="module-title">${module.title}</span>
      <span class="module-meta">${module.phase} / ${module.timeBudget}</span>
      <span class="module-state">${complete ? "local complete" : module.status}</span>
    </button>
  `;
}

function renderDetail(module) {
  const complete = isModuleComplete(progress, module.id);
  const templateRows = module.templates.length
    ? module.templates.map((template) => `<li>${template}</li>`).join("")
    : "<li>No dedicated template in this slice</li>";

  return `
    <div class="detail-header">
      <div>
        <p class="kicker">Module ${String(module.number).padStart(2, "0")} / ${module.phase}</p>
        <h2>${module.title}</h2>
      </div>
      <button class="complete-toggle ${complete ? "is-complete" : ""}" type="button" data-toggle-complete>
        ${complete ? "Marked complete" : "Mark complete"}
      </button>
    </div>

    <p class="local-note">Local-only progress. This is not official grading, submission, or reviewer approval.</p>

    <div class="summary-strip">
      <div>
        <span>Status</span>
        <strong>${module.status}</strong>
      </div>
      <div>
        <span>Budget</span>
        <strong>${module.timeBudget}</strong>
      </div>
      <div>
        <span>Templates</span>
        <strong>${module.templates.length}</strong>
      </div>
    </div>

    <section class="detail-section">
      <h3>Gate</h3>
      <p>${module.gate}</p>
    </section>

    <section class="detail-section">
      <h3>Assignment Focus</h3>
      <p>${module.summary}</p>
    </section>

    <section class="split-lists">
      <div class="detail-section">
        <h3>Required Artifacts</h3>
        <ul>${module.artifacts.map((artifact) => `<li>${artifact}</li>`).join("")}</ul>
      </div>
      <div class="detail-section">
        <h3>Related Templates</h3>
        <ul>${templateRows}</ul>
      </div>
    </section>
  `;
}

window.addEventListener("hashchange", render);
render();

function loadModuleRailState() {
  return window.localStorage.getItem(MODULE_RAIL_KEY) !== "false";
}
