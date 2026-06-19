import { cohortCadences, defenseModuleNumbers, getCadenceById, getModuleById, modules, operatingLoop } from "./courseData.js";
import {
  buildCourseEvidencePack,
  buildModuleEvidenceMarkdown,
  buildModuleEvidencePack,
  downloadTextFile,
  reviewCriteria,
} from "./evidencePack.js";
import { moduleContent, templateContent } from "./generatedCourseContent.js";
import {
  getArtifactCaptureCount,
  getArtifactEvidence,
  getGateEvidence,
  getReviewerName,
  getReviewNotes,
  getReviewStatus,
  isArtifactCaptured,
  isGateCaptured,
  isModuleComplete,
  isReviewCriterionMet,
  loadProgress,
  saveProgress,
  setArtifactCaptured,
  setArtifactEvidence,
  setGateCaptured,
  setGateEvidence,
  setReviewerName,
  setReviewCriterion,
  setReviewNotes,
  setReviewStatus,
  toggleModule,
} from "./progressStore.js";
import { getCourseReviewSummary } from "./reviewSummary.js";

const app = document.querySelector("#app");
const MODULE_RAIL_KEY = "course3.moduleRailOpen";
const TIMELINE_CADENCE_KEY = "course3.timelineCadence";
let progress = loadProgress();
let moduleRailOpen = loadModuleRailState();
let timelineCadenceId = loadTimelineCadence();

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

function handleGateCaptured(moduleId, captured) {
  progress = setGateCaptured(progress, moduleId, captured);
  saveProgress(progress);
  render();
}

function handleGateEvidence(moduleId, evidence) {
  progress = setGateEvidence(progress, moduleId, evidence);
  saveProgress(progress);
}

function handleArtifactCaptured(moduleId, artifactIndex, captured) {
  progress = setArtifactCaptured(progress, moduleId, artifactIndex, captured);
  saveProgress(progress);
  render();
}

function handleArtifactEvidence(moduleId, artifactIndex, evidence) {
  progress = setArtifactEvidence(progress, moduleId, artifactIndex, evidence);
  saveProgress(progress);
}

function handleReviewStatus(moduleId, status) {
  progress = setReviewStatus(progress, moduleId, status);
  saveProgress(progress);
  render();
}

function handleReviewerName(moduleId, reviewer) {
  progress = setReviewerName(progress, moduleId, reviewer);
  saveProgress(progress);
}

function handleReviewNotes(moduleId, notes) {
  progress = setReviewNotes(progress, moduleId, notes);
  saveProgress(progress);
}

function handleReviewCriterion(moduleId, criterionId, met) {
  progress = setReviewCriterion(progress, moduleId, criterionId, met);
  saveProgress(progress);
  render();
}

function handleModuleEvidenceExport(module) {
  const pack = buildModuleEvidencePack(module, progress);
  const filename = `course-3-module-${String(module.number).padStart(2, "0")}-evidence.md`;
  downloadTextFile(filename, buildModuleEvidenceMarkdown(pack));
}

function handleCourseEvidenceExport() {
  const pack = buildCourseEvidencePack(modules, progress);
  downloadTextFile("course-3-full-evidence.json", `${JSON.stringify(pack, null, 2)}\n`);
}

function handleModuleRailToggle() {
  moduleRailOpen = !moduleRailOpen;
  window.localStorage.setItem(MODULE_RAIL_KEY, String(moduleRailOpen));
  render();
}

function handleTimelineCadence(cadenceId) {
  timelineCadenceId = getCadenceById(cadenceId).id;
  window.localStorage.setItem(TIMELINE_CADENCE_KEY, timelineCadenceId);
  render();
}

function render() {
  const current = getModuleById(selectedModuleId());
  const completedCount = modules.filter((module) => isModuleComplete(progress, module.id)).length;
  const timelineCadence = getCadenceById(timelineCadenceId);
  const courseReviewSummary = getCourseReviewSummary(modules, progress);

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

      ${renderTimeline(timelineCadence)}
      ${renderCourseReviewDashboard(courseReviewSummary)}

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

  app.querySelectorAll("[data-timeline-cadence]").forEach((button) => {
    button.addEventListener("click", () => handleTimelineCadence(button.dataset.timelineCadence));
  });

  app.querySelectorAll("[data-timeline-module-id]").forEach((button) => {
    button.addEventListener("click", () => setSelectedModule(button.dataset.timelineModuleId));
  });

  app.querySelectorAll("[data-review-summary-module-id]").forEach((button) => {
    button.addEventListener("click", () => setSelectedModule(button.dataset.reviewSummaryModuleId));
  });

  app.querySelectorAll("[data-jump-target]").forEach((button) => {
    button.addEventListener("click", () => {
      app.querySelector(`[data-section-id="${button.dataset.jumpTarget}"]`)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  app.querySelector("[data-gate-captured]")?.addEventListener("change", (event) => {
    handleGateCaptured(current.id, event.target.checked);
  });

  app.querySelector("[data-gate-evidence]")?.addEventListener("input", (event) => {
    handleGateEvidence(current.id, event.target.value);
  });

  app.querySelectorAll("[data-artifact-captured]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      handleArtifactCaptured(current.id, Number(checkbox.dataset.artifactIndex), checkbox.checked);
    });
  });

  app.querySelectorAll("[data-artifact-evidence]").forEach((field) => {
    field.addEventListener("input", () => {
      handleArtifactEvidence(current.id, Number(field.dataset.artifactIndex), field.value);
    });
  });

  app.querySelector("[data-export-module-evidence]")?.addEventListener("click", () => {
    handleModuleEvidenceExport(current);
  });

  app.querySelector("[data-export-course-evidence]")?.addEventListener("click", handleCourseEvidenceExport);

  app.querySelector("[data-review-status]")?.addEventListener("change", (event) => {
    handleReviewStatus(current.id, event.target.value);
  });

  app.querySelector("[data-reviewer-name]")?.addEventListener("input", (event) => {
    handleReviewerName(current.id, event.target.value);
  });

  app.querySelector("[data-review-notes]")?.addEventListener("input", (event) => {
    handleReviewNotes(current.id, event.target.value);
  });

  app.querySelectorAll("[data-review-criterion]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      handleReviewCriterion(current.id, checkbox.dataset.reviewCriterion, checkbox.checked);
    });
  });
}

function renderModuleButton(module, currentId) {
  const complete = isModuleComplete(progress, module.id);
  const artifactCount = getArtifactCaptureCount(progress, module.id, module.artifacts.length);
  const stateLabel = complete
    ? "local complete"
    : isGateCaptured(progress, module.id)
      ? "gate captured"
      : `${artifactCount}/${module.artifacts.length} artifacts`;
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
      <span class="module-state">${stateLabel}</span>
    </button>
  `;
}

function renderDetail(module) {
  const complete = isModuleComplete(progress, module.id);
  const artifactCount = getArtifactCaptureCount(progress, module.id, module.artifacts.length);

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
      <div>
        <span>Artifacts</span>
        <strong>${artifactCount}/${module.artifacts.length}</strong>
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
        ${renderTemplateSummary(module)}
      </div>
    </section>

    ${renderLearningStudio(module)}
    ${renderGateArtifactChecklist(module)}
    ${renderEvidenceExportPanel(module)}
    ${renderReviewerRubric(module)}
    ${renderCourseReader(module)}
    ${renderTemplateReader(module)}
  `;
}

window.addEventListener("hashchange", render);
render();

function loadModuleRailState() {
  return window.localStorage.getItem(MODULE_RAIL_KEY) !== "false";
}

function loadTimelineCadence() {
  return getCadenceById(window.localStorage.getItem(TIMELINE_CADENCE_KEY)).id;
}

function renderTimeline(cadence) {
  const weeks = buildTimelineWeeks(cadence.id);

  return `
    <section class="timeline-panel" aria-label="Course 3 cohort timeline">
      <div class="timeline-header">
        <div>
          <p class="kicker">Full Course Timeline</p>
          <h3>${escapeHtml(cadence.label)}</h3>
        </div>
        <div class="cadence-switch" role="group" aria-label="Timeline cadence">
          ${cohortCadences.map((option) => `
            <button
              type="button"
              data-timeline-cadence="${option.id}"
              class="${option.id === cadence.id ? "selected" : ""}"
              aria-pressed="${option.id === cadence.id}"
            >
              ${escapeHtml(option.length)}
            </button>
          `).join("")}
        </div>
      </div>

      <div class="timeline-stats">
        <span>${escapeHtml(cadence.pace)}</span>
        <span>${escapeHtml(cadence.workload)}</span>
        <span>${escapeHtml(cadence.liveSessions)}</span>
      </div>

      <div class="timeline-weeks">
        ${weeks.map((week) => renderTimelineWeek(week, cadence.id)).join("")}
      </div>
    </section>
  `;
}

function buildTimelineWeeks(cadenceId) {
  if (cadenceId === "five-week") {
    return Array.from({ length: 5 }, (_, index) => {
      const weekNumber = index + 1;
      return {
        weekNumber,
        modules: modules.slice(index * 2, index * 2 + 2),
      };
    });
  }

  return modules.map((module) => ({
    weekNumber: module.number,
    modules: [module],
  }));
}

function renderTimelineWeek(week, cadenceId) {
  return `
    <div class="timeline-week">
      <div class="week-label">
        <span>Week</span>
        <strong>${String(week.weekNumber).padStart(2, "0")}</strong>
      </div>
      <div class="week-modules">
        ${week.modules.map((module, index) => renderTimelineModule(module, cadenceId === "five-week" ? index + 1 : null)).join("")}
      </div>
    </div>
  `;
}

function renderTimelineModule(module, slotNumber) {
  const defense = defenseModuleNumbers.includes(module.number);
  const artifactCount = getArtifactCaptureCount(progress, module.id, module.artifacts.length);
  const gateLabel = isGateCaptured(progress, module.id) ? "gate captured" : "gate pending";

  return `
    <button class="timeline-module" type="button" data-timeline-module-id="${module.id}">
      <span class="timeline-module-top">
        <strong>${String(module.number).padStart(2, "0")} ${escapeHtml(module.phase)}</strong>
        ${slotNumber ? `<em>slot ${slotNumber}</em>` : ""}
      </span>
      <span class="timeline-title">${escapeHtml(module.title)}</span>
      <span class="timeline-meta">${escapeHtml(module.timeBudget)} / ${artifactCount}/${module.artifacts.length} artifacts / ${gateLabel}</span>
      <span class="timeline-gate">${escapeHtml(module.gate)}</span>
      ${defense ? `<span class="defense-chip">defense checkpoint</span>` : ""}
    </button>
  `;
}

function renderCourseReviewDashboard(summary) {
  return `
    <section class="review-dashboard" aria-label="Course 3 reviewer summary dashboard">
      <div class="review-dashboard-header">
        <div>
          <p class="kicker">Reviewer Summary</p>
          <h3>10-Module Review Dashboard</h3>
        </div>
        <span>${summary.readyModules}/10 modules product-ready</span>
      </div>

      <div class="review-stats">
        <div>
          <span>Gates</span>
          <strong>${summary.gatesCaptured}/10</strong>
        </div>
        <div>
          <span>Artifacts</span>
          <strong>${summary.artifactCount}/${summary.artifactTotal}</strong>
        </div>
        <div>
          <span>Approved</span>
          <strong>${summary.approvedModules}/10</strong>
        </div>
        <div>
          <span>Needs Work</span>
          <strong>${summary.modules.length - summary.readyModules}/10</strong>
        </div>
      </div>

      <div class="review-queue">
        ${summary.modules.map((module) => renderReviewSummaryRow(module)).join("")}
      </div>
    </section>
  `;
}

function renderReviewSummaryRow(module) {
  const missing = module.missing.length > 0 ? module.missing.join(", ") : "ready";

  return `
    <button
      class="review-summary-row ${module.ready ? "is-ready" : ""} status-${module.reviewStatus}"
      type="button"
      data-review-summary-module-id="${module.moduleId}"
    >
      <span class="review-summary-module">
        <b>${String(module.number).padStart(2, "0")}</b>
        <span>${escapeHtml(module.title)}</span>
      </span>
      <span>${escapeHtml(module.phase)}</span>
      <span>${module.gateCaptured ? "gate yes" : "gate no"}</span>
      <span>${module.artifactCount}/${module.artifactTotal} artifacts</span>
      <span>${module.criteriaCount}/${module.criteriaTotal} rubric</span>
      <span>${formatReviewStatus(module.reviewStatus)}</span>
      <span>${escapeHtml(missing)}</span>
    </button>
  `;
}

function formatReviewStatus(status) {
  return status.replace(/-/g, " ");
}

function renderLearningStudio(module) {
  return `
    <section class="learning-studio" aria-label="Interactive learner studio brief">
      <div class="learning-visual">
        ${renderStudioMap(module)}
      </div>
      <div class="learning-actions">
        <p class="kicker">Learner Studio</p>
        <h3>${escapeHtml(module.phase)} Mission Brief</h3>
        <p class="learning-summary">${escapeHtml(module.summary)}</p>
        <div class="learning-cards">
          <article>
            <span>Learn</span>
            <strong>${escapeHtml(getLearningVerb(module.phase))}</strong>
            <p>${escapeHtml(getLearningPrompt(module))}</p>
            <button type="button" data-jump-target="source-docs">Open unit docs</button>
          </article>
          <article>
            <span>Build</span>
            <strong>${module.artifacts.length} artifacts</strong>
            <p>Capture proof as you produce each deliverable.</p>
            <button type="button" data-jump-target="artifact-checklist">Work checklist</button>
          </article>
          <article>
            <span>Prove</span>
            <strong>Gate review</strong>
            <p>${escapeHtml(module.gate)}</p>
            <button type="button" data-jump-target="review-rubric">Review rubric</button>
          </article>
        </div>
      </div>
    </section>
  `;
}

function renderStudioMap(module) {
  const activeIndex = Math.max(0, operatingLoop.findIndex((step) => step === module.phase));
  const nodes = operatingLoop.map((step, index) => {
    const x = 54 + index * 58;
    const active = index === activeIndex;
    return `
      <g class="${active ? "active" : ""}">
        <circle cx="${x}" cy="${active ? 74 : 86}" r="${active ? 20 : 14}" />
        <text x="${x}" y="130">${escapeHtml(step)}</text>
      </g>
    `;
  }).join("");

  return `
    <svg class="studio-map" viewBox="0 0 520 180" role="img" aria-label="Course production loop with current module phase highlighted">
      <rect x="18" y="22" width="484" height="132" rx="0" />
      <path d="M58 86 H462" />
      ${nodes}
      <text class="studio-map-title" x="32" y="48">Module ${String(module.number).padStart(2, "0")} production position</text>
      <text class="studio-map-gate" x="32" y="164">${escapeHtml(module.phase)} gate: ${escapeHtml(module.artifacts.length)} artifacts + review evidence</text>
    </svg>
  `;
}

function getLearningVerb(phase) {
  const verbs = {
    Intent: "Set rules",
    Spec: "Shape scope",
    Prototype: "Test loops",
    Delegate: "Draw boundaries",
    Integrate: "Merge safely",
    Verify: "Catch failures",
    Polish: "Clarify play",
    Package: "Ship evidence",
  };
  return verbs[phase] ?? "Build proof";
}

function getLearningPrompt(module) {
  if (module.number === 2) {
    return "Turn an idea into a spec another agent can implement without extra chat.";
  }
  if (module.number === 3) {
    return "Run playable experiments and choose the loop that deserves production time.";
  }
  if (module.number === 10) {
    return "Package the demo candidate so a fresh reviewer can run and continue it.";
  }
  return module.gate;
}

function renderGateArtifactChecklist(module) {
  const gateCaptured = isGateCaptured(progress, module.id);
  const artifactCount = getArtifactCaptureCount(progress, module.id, module.artifacts.length);

  return `
    <section class="checklist-panel" aria-label="Gate and artifact checklist" data-section-id="artifact-checklist">
      <div class="checklist-heading">
        <div>
          <p class="kicker">Local Gate Capture</p>
          <h3>Gate & Artifact Checklist</h3>
        </div>
        <span>${artifactCount}/${module.artifacts.length} artifacts</span>
      </div>

      <div class="gate-capture ${gateCaptured ? "is-captured" : ""}">
        <label class="check-row">
          <input type="checkbox" data-gate-captured ${gateCaptured ? "checked" : ""}>
          <span>Gate evidence captured</span>
        </label>
        <label class="evidence-field">
          <span>Gate evidence note</span>
          <textarea data-gate-evidence rows="3">${escapeHtml(getGateEvidence(progress, module.id))}</textarea>
        </label>
      </div>

      <div class="artifact-checklist">
        ${module.artifacts.map((artifact, index) => renderArtifactCapture(module.id, artifact, index)).join("")}
      </div>
    </section>
  `;
}

function renderArtifactCapture(moduleId, artifact, index) {
  const captured = isArtifactCaptured(progress, moduleId, index);

  return `
    <article class="artifact-capture ${captured ? "is-captured" : ""}">
      <label class="check-row">
        <input
          type="checkbox"
          data-artifact-captured
          data-artifact-index="${index}"
          ${captured ? "checked" : ""}
        >
        <span>${escapeHtml(artifact)}</span>
      </label>
      <label class="evidence-field">
        <span>Evidence path or note</span>
        <input
          type="text"
          data-artifact-evidence
          data-artifact-index="${index}"
          value="${escapeHtml(getArtifactEvidence(progress, moduleId, index))}"
        >
      </label>
    </article>
  `;
}

function renderEvidenceExportPanel(module) {
  const artifactCount = getArtifactCaptureCount(progress, module.id, module.artifacts.length);
  const readyCount = [
    isGateCaptured(progress, module.id),
    artifactCount === module.artifacts.length,
    getReviewStatus(progress, module.id) === "approved",
  ].filter(Boolean).length;

  return `
    <section class="export-panel" aria-label="Evidence export">
      <div>
        <p class="kicker">Evidence Pack</p>
        <h3>Export Review Handoff</h3>
        <p>${readyCount}/3 readiness signals captured for this module.</p>
      </div>
      <div class="export-actions">
        <button type="button" data-export-module-evidence>Export Module MD</button>
        <button type="button" data-export-course-evidence>Export Course JSON</button>
      </div>
    </section>
  `;
}

function renderReviewerRubric(module) {
  const status = getReviewStatus(progress, module.id);

  return `
    <section class="review-panel" aria-label="Reviewer rubric workflow" data-section-id="review-rubric">
      <div class="review-heading">
        <div>
          <p class="kicker">Reviewer Workflow</p>
          <h3>Rubric Decision</h3>
        </div>
        <label class="review-status">
          <span>Decision</span>
          <select data-review-status>
            ${renderReviewOption("not-reviewed", "Not reviewed", status)}
            ${renderReviewOption("needs-revision", "Needs revision", status)}
            ${renderReviewOption("approved", "Approved", status)}
            ${renderReviewOption("blocked", "Blocked", status)}
          </select>
        </label>
      </div>

      <div class="review-grid">
        <label class="evidence-field">
          <span>Reviewer</span>
          <input type="text" data-reviewer-name value="${escapeHtml(getReviewerName(progress, module.id))}">
        </label>
        <label class="evidence-field">
          <span>Reviewer notes</span>
          <textarea data-review-notes rows="4">${escapeHtml(getReviewNotes(progress, module.id))}</textarea>
        </label>
      </div>

      <div class="rubric-list">
        ${reviewCriteria.map((criterion) => renderReviewCriterion(module.id, criterion)).join("")}
      </div>
    </section>
  `;
}

function renderReviewOption(value, label, currentValue) {
  return `<option value="${value}" ${value === currentValue ? "selected" : ""}>${label}</option>`;
}

function renderReviewCriterion(moduleId, criterion) {
  const met = isReviewCriterionMet(progress, moduleId, criterion.id);

  return `
    <article class="rubric-item ${met ? "is-met" : ""}">
      <label class="check-row">
        <input
          type="checkbox"
          data-review-criterion="${criterion.id}"
          ${met ? "checked" : ""}
        >
        <span>${escapeHtml(criterion.label)}</span>
      </label>
      <p>${escapeHtml(criterion.prompt)}</p>
    </article>
  `;
}

function renderCourseReader(module) {
  const content = moduleContent[module.id];
  if (!content) {
    return `
      <details class="course-reader source-docs" aria-label="Module reader" data-section-id="source-docs">
        <summary>Full source docs</summary>
        <p class="empty-state">No generated content found for this module.</p>
      </details>
    `;
  }

  return `
    <details class="course-reader source-docs" aria-label="Module reader" data-section-id="source-docs">
      <summary>Full source docs and teaching notes</summary>
      <div class="reader-heading">
        <div>
          <p class="kicker">Full Course Unit</p>
          <h3>${escapeHtml(content.title)}</h3>
        </div>
        <span>${escapeHtml(content.sourcePath)}</span>
      </div>
      <div class="reader-sections">
        ${content.sections.map((section) => renderSectionDetails(section, shouldOpenModuleSection(section.title))).join("")}
      </div>
    </details>
  `;
}

function renderTemplateSummary(module) {
  if (module.templates.length === 0) {
    return `<p class="empty-state">No dedicated template for this module.</p>`;
  }

  return `
    <ul>
      ${module.templates.map((template) => `<li>${escapeHtml(template)}</li>`).join("")}
    </ul>
  `;
}

function renderTemplateReader(module) {
  if (module.templates.length === 0) {
    return `
      <details class="template-reader source-docs" aria-label="Template reader">
        <summary>Related template docs</summary>
        <div class="reader-heading">
          <div>
            <p class="kicker">Related Templates</p>
            <h3>Template Reader</h3>
          </div>
        </div>
        <p class="empty-state">This module has no dedicated template. Use the module artifacts as the working checklist.</p>
      </details>
    `;
  }

  return `
    <details class="template-reader source-docs" aria-label="Template reader">
      <summary>Related template docs</summary>
      <div class="reader-heading">
        <div>
          <p class="kicker">Related Templates</p>
          <h3>Template Reader</h3>
        </div>
      </div>
      ${module.templates.map((template) => renderTemplateCard(template)).join("")}
    </details>
  `;
}

function renderTemplateCard(template) {
  const content = templateContent[template];
  if (!content) {
    return `
      <article class="template-card" data-template-name="${escapeHtml(template)}">
        <h4>${escapeHtml(template)}</h4>
        <p class="empty-state">No generated template content found.</p>
      </article>
    `;
  }

  return `
    <article class="template-card" data-template-name="${escapeHtml(template)}">
      <div class="template-card-header">
        <h4>${escapeHtml(content.title)}</h4>
        <span>${escapeHtml(content.sourcePath)}</span>
      </div>
      <div class="reader-sections compact">
        ${content.sections.map((section, index) => renderSectionDetails(section, index < 2)).join("")}
      </div>
    </article>
  `;
}

function renderSectionDetails(section, open) {
  return `
    <details class="reader-section" ${open ? "open" : ""}>
      <summary>${escapeHtml(section.title)}</summary>
      <div class="doc-body">
        ${renderMarkdownLite(section.body)}
      </div>
    </details>
  `;
}

function shouldOpenModuleSection(title) {
  return ["Objective", "Learner Assignment", "Required Artifacts"].includes(title);
}

function renderMarkdownLite(markdown) {
  const lines = markdown.trim().split("\n");
  let html = "";
  let listType = "";
  let inCode = false;
  let codeLines = [];

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const trimmed = rawLine.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        html += `<pre class="doc-code"><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`;
        codeLines = [];
        inCode = false;
      } else {
        html += closeList(listType);
        listType = "";
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    if (!trimmed) {
      html += closeList(listType);
      listType = "";
      continue;
    }

    if (trimmed.startsWith("|")) {
      html += closeList(listType);
      listType = "";
      const tableLines = [trimmed];
      while (lines[index + 1]?.trim().startsWith("|")) {
        index += 1;
        tableLines.push(lines[index].trim());
      }
      html += `<pre class="doc-table">${escapeHtml(tableLines.join("\n"))}</pre>`;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      html += closeList(listType);
      listType = "";
      html += `<h4>${renderInlineMarkdown(trimmed.slice(4))}</h4>`;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      html += closeList(listType);
      listType = "";
      html += `<blockquote>${renderInlineMarkdown(trimmed.slice(2))}</blockquote>`;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (listType !== "ul") {
        html += closeList(listType);
        html += "<ul>";
        listType = "ul";
      }
      html += `<li>${renderInlineMarkdown(trimmed.slice(2))}</li>`;
      continue;
    }

    const numbered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      if (listType !== "ol") {
        html += closeList(listType);
        html += "<ol>";
        listType = "ol";
      }
      html += `<li>${renderInlineMarkdown(numbered[1])}</li>`;
      continue;
    }

    html += closeList(listType);
    listType = "";
    html += `<p>${renderInlineMarkdown(trimmed)}</p>`;
  }

  if (inCode) {
    html += `<pre class="doc-code"><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`;
  }

  html += closeList(listType);
  return html;
}

function closeList(type) {
  if (type === "ul") {
    return "</ul>";
  }
  if (type === "ol") {
    return "</ol>";
  }
  return "";
}

function renderInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="doc-reference">$1</span>')
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
