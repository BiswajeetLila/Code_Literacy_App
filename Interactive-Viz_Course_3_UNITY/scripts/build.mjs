import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { modules, operatingLoop, templates } from "../src/courseData.js";
import { generateContent } from "./generateContent.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

await generateContent();
validateRegistry();

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, "index.html"), join(dist, "index.html"));
await cp(join(root, "src"), join(dist, "src"), { recursive: true });
await writeFile(
  join(dist, "build-info.json"),
  JSON.stringify(
    {
      app: "Interactive-Viz_Course_3_UNITY",
      modules: modules.length,
      templates: templates.length,
      loop: operatingLoop,
      builtAt: new Date().toISOString(),
    },
    null,
    2,
  ),
);

console.log(`Built Course 3 app to ${dist}`);

function validateRegistry() {
  if (modules.length !== 10) {
    throw new Error(`Expected 10 modules, found ${modules.length}`);
  }
  const numbers = modules.map((module) => module.number);
  numbers.forEach((number, index) => {
    if (number !== index + 1) {
      throw new Error(`Module order mismatch at index ${index}: ${number}`);
    }
  });
  modules.forEach((module) => {
    const required = ["id", "title", "status", "timeBudget", "gate", "summary", "artifacts"];
    required.forEach((field) => {
      if (!module[field] || (Array.isArray(module[field]) && module[field].length === 0)) {
        throw new Error(`Module ${module.id} missing ${field}`);
      }
    });
    module.templates.forEach((template) => {
      if (!templates.includes(template)) {
        throw new Error(`Module ${module.id} references unknown template ${template}`);
      }
    });
  });
}
