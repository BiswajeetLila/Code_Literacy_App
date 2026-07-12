import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import { cohortCadences, defenseModuleNumbers, getCadenceById, modules, operatingLoop, templates } from "../src/courseData.js";
import { buildCourseEvidencePack, buildModuleEvidenceMarkdown, buildModuleEvidencePack, reviewCriteria } from "../src/evidencePack.js";
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
  STORAGE_KEY,
  toggleModule,
} from "../src/progressStore.js";
import { getCourseReviewSummary, getModuleReviewSummary } from "../src/reviewSummary.js";
import { generateContent } from "./generateContent.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const errors = [];
await generateContent();
const generatedUrl = pathToFileURL(join(root, "src", "generatedCourseContent.js"));
generatedUrl.search = `v=${Date.now()}`;
const { moduleContent, templateContent } = await import(generatedUrl.href);

expect(modules.length === 10, "renders all ten Course 3 modules from registry");
expect(templates.length === 12, "tracks twelve Course 3 runnable templates");
expect(operatingLoop.join(" -> ") === "Intent -> Spec -> Prototype -> Delegate -> Integrate -> Verify -> Polish -> Package", "operating loop matches Course 3 docs");
expect(cohortCadences.length === 2, "tracks two Course 3 cohort cadences");
expect(getCadenceById("ten-week").pace === "1 module/week", "10-week cadence is the default slower plan");
expect(getCadenceById("five-week").pace === "2 modules/week", "5-week cadence is the hardcore plan");
expect(defenseModuleNumbers.join(",") === "3,5,8,10", "defense checkpoints match cohort ops docs");
expect(Object.keys(moduleContent).length === 10, "generated content includes all ten module docs");
expect(Object.keys(templateContent).length === 12, "generated content includes all twelve template docs");

modules.forEach((module, index) => {
  expect(module.number === index + 1, `module ${module.id} is in order`);
  expect(module.status === "complete", `module ${module.id} is complete`);
  expect(Boolean(module.gate), `module ${module.id} has a gate`);
  expect(Boolean(module.timeBudget), `module ${module.id} has a time budget`);
  expect(module.artifacts.length > 0, `module ${module.id} has artifacts`);
  expect(Boolean(moduleContent[module.id]), `module ${module.id} has generated reader content`);
  expect(moduleContent[module.id]?.sections.length >= 5, `module ${module.id} has enough reader sections`);
  expect(
    moduleContent[module.id]?.sections.some((section) => section.title === "Learner Assignment"),
    `module ${module.id} includes learner assignment content`,
  );
  module.templates.forEach((template) => {
    expect(templates.includes(template), `module ${module.id} references known template ${template}`);
    expect(Boolean(templateContent[template]), `template ${template} has generated reader content`);
  });
});

expect(
  moduleContent["module-02"]?.sections.some((section) => section.body.includes("Fill `GAME-THESIS.md`")),
  "module 2 generated content includes course steps",
);
expect(
  moduleContent["module-08"]?.sections.some((section) => section.body.includes("QA-PLAN.md")),
  "module 8 generated content includes QA plan content",
);
expect(
  moduleContent["module-10"]?.sections.some((section) => section.body.includes("Steam-demo candidate")),
  "module 10 generated content includes package language",
);

const memoryStorage = createMemoryStorage();
let progress = loadProgress(memoryStorage);
expect(!isModuleComplete(progress, "module-01"), "module progress starts incomplete");
progress = toggleModule(progress, "module-01");
saveProgress(progress, memoryStorage);
const reloaded = loadProgress(memoryStorage);
expect(isModuleComplete(reloaded, "module-01"), "module progress persists after reload");
progress = toggleModule(reloaded, "module-01");
expect(!isModuleComplete(progress, "module-01"), "module progress can be reversed");
expect(memoryStorage.getItem(STORAGE_KEY) !== null, "progress uses the Course 3 storage key");
progress = setGateCaptured(progress, "module-02", true);
progress = setGateEvidence(progress, "module-02", "docs/MODULE-02-GATE.md");
progress = setArtifactCaptured(progress, "module-02", 0, true);
progress = setArtifactEvidence(progress, "module-02", 0, "docs/GAME-THESIS.md");
progress = setReviewStatus(progress, "module-02", "needs-revision");
progress = setReviewerName(progress, "module-02", "Course reviewer");
progress = setReviewNotes(progress, "module-02", "Spec needs a clearer cold-agent first task.");
progress = setReviewCriterion(progress, "module-02", "gate", true);
progress = setGateCaptured(progress, "module-03", true);
modules[2].artifacts.forEach((_, index) => {
  progress = setArtifactCaptured(progress, "module-03", index, true);
});
reviewCriteria.forEach((criterion) => {
  progress = setReviewCriterion(progress, "module-03", criterion.id, true);
});
progress = setReviewStatus(progress, "module-03", "approved");
saveProgress(progress, memoryStorage);
const evidenceReloaded = loadProgress(memoryStorage);
expect(isGateCaptured(evidenceReloaded, "module-02"), "gate capture persists after reload");
expect(getGateEvidence(evidenceReloaded, "module-02") === "docs/MODULE-02-GATE.md", "gate evidence note persists");
expect(isArtifactCaptured(evidenceReloaded, "module-02", 0), "artifact capture persists after reload");
expect(getArtifactEvidence(evidenceReloaded, "module-02", 0) === "docs/GAME-THESIS.md", "artifact evidence note persists");
expect(getArtifactCaptureCount(evidenceReloaded, "module-02", 4) === 1, "artifact capture count is calculated");
expect(getReviewStatus(evidenceReloaded, "module-02") === "needs-revision", "review status persists");
expect(getReviewerName(evidenceReloaded, "module-02") === "Course reviewer", "reviewer name persists");
expect(getReviewNotes(evidenceReloaded, "module-02").includes("clearer cold-agent"), "review notes persist");
expect(isReviewCriterionMet(evidenceReloaded, "module-02", "gate"), "review criteria persist");
expect(reviewCriteria.length === 4, "review workflow has four criteria");
const moduleEvidencePack = buildModuleEvidencePack(modules[1], evidenceReloaded, "2026-06-12T00:00:00.000Z");
expect(moduleEvidencePack.schema === "course3.module-evidence.v1", "module evidence pack has a schema");
expect(moduleEvidencePack.module.id === "module-02", "module evidence pack identifies the module");
expect(moduleEvidencePack.learnerProgress.artifacts.length === 4, "module evidence pack includes all artifacts");
expect(moduleEvidencePack.reviewer.status === "needs-revision", "module evidence pack includes review decision");
const evidenceMarkdown = buildModuleEvidenceMarkdown(moduleEvidencePack);
expect(evidenceMarkdown.includes("Course 3 Module 02 Evidence Pack"), "module evidence markdown has a title");
expect(evidenceMarkdown.includes("docs/GAME-THESIS.md"), "module evidence markdown includes artifact evidence");
expect(evidenceMarkdown.includes("Spec needs a clearer cold-agent first task."), "module evidence markdown includes reviewer notes");
const courseEvidencePack = buildCourseEvidencePack(modules, evidenceReloaded, "2026-06-12T00:00:00.000Z");
expect(courseEvidencePack.schema === "course3.course-evidence.v1", "course evidence pack has a schema");
expect(courseEvidencePack.modules.length === 10, "course evidence pack includes all modules");
const moduleReviewSummary = getModuleReviewSummary(modules[1], evidenceReloaded);
expect(moduleReviewSummary.moduleId === "module-02", "module review summary identifies the module");
expect(moduleReviewSummary.artifactCount === 1, "module review summary counts captured artifacts");
expect(moduleReviewSummary.criteriaCount === 1, "module review summary counts met review criteria");
expect(moduleReviewSummary.missing.includes("artifacts"), "module review summary names missing artifacts");
const courseReviewSummary = getCourseReviewSummary(modules, evidenceReloaded);
expect(courseReviewSummary.modules.length === 10, "course review dashboard covers all modules");
expect(courseReviewSummary.gatesCaptured === 2, "course review summary counts captured gates");
expect(courseReviewSummary.approvedModules === 1, "course review summary counts approved modules");
expect(courseReviewSummary.readyModules === 1, "course review summary counts product-ready modules");
expect(courseReviewSummary.artifactCount === 5, "course review summary counts captured artifacts across modules");

const indexHtml = await readFile(join(root, "index.html"), "utf8");
expect(indexHtml.includes("./src/main.js"), "index references app entry module");
expect(indexHtml.includes("./src/styles.css"), "index references app styles");
const mainJs = await readFile(join(root, "src", "main.js"), "utf8");
const stylesCss = await readFile(join(root, "src", "styles.css"), "utf8");
expect(mainJs.includes("data-toggle-modules"), "module rail can be toggled");
expect(mainJs.includes("renderCourseReader"), "module content reader is rendered");
expect(mainJs.includes("renderTemplateReader"), "template reader is rendered");
expect(mainJs.includes("renderGateArtifactChecklist"), "gate and artifact checklist is rendered");
expect(mainJs.includes("renderTimeline"), "cohort timeline is rendered");
expect(mainJs.includes("renderEvidenceExportPanel"), "evidence export panel is rendered");
expect(mainJs.includes("renderReviewerRubric"), "reviewer rubric workflow is rendered");
expect(mainJs.includes("renderCourseReviewDashboard"), "course review dashboard is rendered");
expect(mainJs.includes("renderLearningStudio"), "learner studio brief is rendered");
expect(mainJs.includes("renderStudioMap"), "visual studio map is rendered");
expect(mainJs.includes("data-jump-target"), "learner studio jump controls are present");
expect(mainJs.includes("data-timeline-cadence"), "timeline cadence controls are present");
expect(mainJs.includes("data-timeline-module-id"), "timeline module links are present");
expect(mainJs.includes("data-review-summary-module-id"), "review dashboard module links are present");
expect(mainJs.includes("data-artifact-captured"), "artifact checklist controls are present");
expect(mainJs.includes("data-export-module-evidence"), "module evidence export control is present");
expect(mainJs.includes("data-export-course-evidence"), "course evidence export control is present");
expect(mainJs.includes("data-review-status"), "review decision control is present");
expect(mainJs.includes("data-review-criterion"), "review criteria controls are present");
expect(stylesCss.includes(".workspace.modules-collapsed"), "collapsed module rail expands detail view");
expect(stylesCss.includes(".module-grid[hidden]"), "hidden module rail is removed from layout");
expect(stylesCss.includes(".course-reader"), "reader styles are present");
expect(stylesCss.includes(".checklist-panel"), "checklist styles are present");
expect(stylesCss.includes(".timeline-panel"), "timeline styles are present");
expect(stylesCss.includes(".export-panel"), "evidence export styles are present");
expect(stylesCss.includes(".review-panel"), "review panel styles are present");
expect(stylesCss.includes(".review-dashboard"), "review dashboard styles are present");
expect(stylesCss.includes(".review-summary-row"), "review dashboard row styles are present");
expect(stylesCss.includes(".learning-studio"), "learner studio styles are present");
expect(stylesCss.includes(".studio-map"), "visual studio map styles are present");
expect(stylesCss.includes(".source-docs"), "source document collapse styles are present");
expect(stylesCss.includes(".rubric-list"), "rubric list styles are present");

if (existsSync(join(root, "dist"))) {
  const distIndex = await readFile(join(root, "dist", "index.html"), "utf8");
  expect(distIndex.includes("./src/main.js"), "built index references app entry module");
}

await verifyServerSmoke();

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Course 3 app verification passed.");

function expect(condition, message) {
  if (!condition) {
    errors.push(`FAIL: ${message}`);
  }
}

function createMemoryStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    removeItem(key) {
      data.delete(key);
    },
  };
}

async function verifyServerSmoke() {
  const port = 4273;
  const child = spawn(process.execPath, ["scripts/dev.mjs"], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: "ignore",
  });

  try {
    await waitForServer(port);
    const index = await fetchText(`http://localhost:${port}/`);
    const main = await fetchText(`http://localhost:${port}/src/main.js`);
    const generated = await fetchText(`http://localhost:${port}/src/generatedCourseContent.js`);
    const styles = await fetchText(`http://localhost:${port}/src/styles.css`);
    expect(index.includes("Course 3 Studio Dashboard"), "server returns app shell");
    expect(main.includes("renderDetail"), "server returns app entry code");
    expect(main.includes("renderGateArtifactChecklist"), "server returns checklist code");
    expect(main.includes("renderTimeline"), "server returns timeline code");
    expect(main.includes("renderEvidenceExportPanel"), "server returns evidence export code");
    expect(main.includes("renderReviewerRubric"), "server returns reviewer rubric code");
    expect(main.includes("renderCourseReviewDashboard"), "server returns reviewer dashboard code");
    expect(main.includes("renderLearningStudio"), "server returns learner studio code");
    expect(generated.includes("Module 8: Verification For Games"), "server returns generated module content");
    expect(generated.includes("VERTICAL-SLICE-SPEC"), "server returns generated template content");
    expect(styles.includes("@media (max-width: 560px)"), "server returns responsive styles");
  } finally {
    child.kill();
  }
}

async function waitForServer(port) {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    try {
      await fetchText(`http://localhost:${port}/`);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error(`Dev server did not respond on ${port}`);
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return response.text();
}
