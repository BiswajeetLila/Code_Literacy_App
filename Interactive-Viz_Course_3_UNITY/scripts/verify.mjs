import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import { modules, operatingLoop, templates } from "../src/courseData.js";
import { isModuleComplete, loadProgress, saveProgress, STORAGE_KEY, toggleModule } from "../src/progressStore.js";
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

const indexHtml = await readFile(join(root, "index.html"), "utf8");
expect(indexHtml.includes("./src/main.js"), "index references app entry module");
expect(indexHtml.includes("./src/styles.css"), "index references app styles");
const mainJs = await readFile(join(root, "src", "main.js"), "utf8");
const stylesCss = await readFile(join(root, "src", "styles.css"), "utf8");
expect(mainJs.includes("data-toggle-modules"), "module rail can be toggled");
expect(mainJs.includes("renderCourseReader"), "module content reader is rendered");
expect(mainJs.includes("renderTemplateReader"), "template reader is rendered");
expect(stylesCss.includes(".workspace.modules-collapsed"), "collapsed module rail expands detail view");
expect(stylesCss.includes(".module-grid[hidden]"), "hidden module rail is removed from layout");
expect(stylesCss.includes(".course-reader"), "reader styles are present");

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
