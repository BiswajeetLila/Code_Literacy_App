import { cohortCadences, defenseModuleNumbers, getCadenceById, getModuleById, modules, operatingLoop } from "./courseData.js";
import { moduleContent, templateContent } from "./generatedCourseContent.js";
import {
  getArtifactCaptureCount,
  getArtifactEvidence,
  getGateEvidence,
  isArtifactCaptured,
  isGateCaptured,
  isModuleComplete,
  loadProgress,
  saveProgress,
  setArtifactCaptured,
  setArtifactEvidence,
  setGateCaptured,
  setGateEvidence,
  toggleModule,
} from "./progressStore.js";

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

    ${renderGateArtifactChecklist(module)}
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

function renderGateArtifactChecklist(module) {
  const gateCaptured = isGateCaptured(progress, module.id);
  const artifactCount = getArtifactCaptureCount(progress, module.id, module.artifacts.length);

  return `
    <section class="checklist-panel" aria-label="Gate and artifact checklist">
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

function renderCourseReader(module) {
  const content = moduleContent[module.id];
  if (!content) {
    return `
      <section class="course-reader" aria-label="Module reader">
        <h3>Full Module Reader</h3>
        <p class="empty-state">No generated content found for this module.</p>
      </section>
    `;
  }

  return `
    <section class="course-reader" aria-label="Module reader">
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
    </section>
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
      <section class="template-reader" aria-label="Template reader">
        <div class="reader-heading">
          <div>
            <p class="kicker">Related Templates</p>
            <h3>Template Reader</h3>
          </div>
        </div>
        <p class="empty-state">This module has no dedicated template. Use the module artifacts as the working checklist.</p>
      </section>
    `;
  }

  return `
    <section class="template-reader" aria-label="Template reader">
      <div class="reader-heading">
        <div>
          <p class="kicker">Related Templates</p>
          <h3>Template Reader</h3>
        </div>
      </div>
      ${module.templates.map((template) => renderTemplateCard(template)).join("")}
    </section>
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
