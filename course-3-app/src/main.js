import { getModuleById, modules, operatingLoop } from "./courseData.js";
import { moduleContent, templateContent } from "./generatedCourseContent.js";
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
        ${renderTemplateSummary(module)}
      </div>
    </section>

    ${renderCourseReader(module)}
    ${renderTemplateReader(module)}
  `;
}

window.addEventListener("hashchange", render);
render();

function loadModuleRailState() {
  return window.localStorage.getItem(MODULE_RAIL_KEY) !== "false";
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
