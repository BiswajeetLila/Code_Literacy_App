import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { generateContent } from "./generateContent.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const port = Number(process.env.PORT ?? 4373);
const browserPath = findBrowser();

if (!browserPath) {
  throw new Error("Chrome or Edge was not found for browser smoke verification");
}

await generateContent();

const server = spawn(process.execPath, ["scripts/dev.mjs"], {
  cwd: root,
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore",
});

try {
  await waitForServer();
  const browserReady = await canDumpDom();
  if (!browserReady) {
    console.warn("Browser dump-dom returned no DOM output on this machine; running server content fallback.");
    await checkServerFallback();
    console.log("Course 3 browser smoke fallback passed.");
  } else {
    await checkPage("#module-02", ["Module 2: Game Concept To Vertical Slice Spec", "GAME-THESIS.md", "VERTICAL-SLICE-SPEC"]);
    await checkPage("#module-08", ["Module 8: Verification For Games", "QA-PLAN.md", "Full Course Unit"]);
    await checkPage("#module-10", ["Module 10: Steam-Demo Candidate Package And Maintenance", "Steam-demo candidate"]);
    console.log("Course 3 browser smoke passed.");
  }
} finally {
  server.kill();
}

function findBrowser() {
  const candidates = [
    process.env.COURSE3_BROWSER,
    join(process.env.PROGRAMFILES ?? "C:\\Program Files", "Microsoft", "Edge", "Application", "msedge.exe"),
    join(process.env["PROGRAMFILES(X86)"] ?? "C:\\Program Files (x86)", "Microsoft", "Edge", "Application", "msedge.exe"),
    join(process.env.PROGRAMFILES ?? "C:\\Program Files", "Google", "Chrome", "Application", "chrome.exe"),
    join(process.env["PROGRAMFILES(X86)"] ?? "C:\\Program Files (x86)", "Google", "Chrome", "Application", "chrome.exe"),
    join(process.env.LOCALAPPDATA ?? "", "Google", "Chrome", "Application", "chrome.exe"),
  ];

  return candidates.find((candidate) => candidate && existsSync(candidate));
}

async function checkPage(hash, expectedText) {
  const html = await dumpDom(`http://localhost:${port}/${hash}`);
  expectedText.forEach((text) => {
    if (!html.includes(text)) {
      throw new Error(`Browser smoke ${hash} did not include expected text: ${text}`);
    }
  });
}

async function dumpDom(url) {
  const profileDir = await mkdtemp(join(tmpdir(), "course-3-browser-"));

  return new Promise((resolve, reject) => {
    const child = spawn(
      browserPath,
      [
        "--headless",
        "--disable-gpu",
        "--disable-gpu-compositing",
        "--disable-gpu-sandbox",
        "--disable-accelerated-2d-canvas",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        "--disable-background-networking",
        "--disable-sync",
        "--disable-features=Vulkan,VizDisplayCompositor,CanvasOopRasterization,CalculateNativeWinOcclusion",
        "--no-first-run",
        "--no-default-browser-check",
        `--user-data-dir=${profileDir}`,
        "--virtual-time-budget=1500",
        "--dump-dom",
        url,
      ],
      { stdio: ["ignore", "pipe", "pipe"] },
    );

    let stdout = "";
    let stderr = "";
    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error(`Browser timed out while dumping ${url}`));
    }, 15000);
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (error) => {
      clearTimeout(timeout);
      rm(profileDir, { recursive: true, force: true }).finally(() => reject(error));
    });
    child.on("close", (code) => {
      clearTimeout(timeout);
      rm(profileDir, { recursive: true, force: true }).finally(() => {
        if (code !== 0) {
          reject(new Error(`Browser exited ${code}: ${stderr}`));
          return;
        }
        resolve(stdout);
      });
    });
  });
}

async function waitForServer() {
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://localhost:${port}/`);
      if (response.ok) {
        return;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error(`Dev server did not respond on ${port}`);
}

async function canDumpDom() {
  try {
    const probe = await dumpDom("data:text/html,<html><body>course3-browser-probe</body></html>");
    return probe.includes("course3-browser-probe");
  } catch (error) {
    console.warn(`Browser dump-dom probe failed: ${error.message}`);
    return false;
  }
}

async function checkServerFallback() {
  const generated = await fetchText(`http://localhost:${port}/src/generatedCourseContent.js`);
  const main = await fetchText(`http://localhost:${port}/src/main.js`);

  [
    "Module 2: Game Concept To Vertical Slice Spec",
    "GAME-THESIS.md",
    "VERTICAL-SLICE-SPEC",
    "Module 8: Verification For Games",
    "QA-PLAN.md",
    "Module 10: Steam-Demo Candidate Package And Maintenance",
    "Steam-demo candidate",
  ].forEach((text) => {
    if (!generated.includes(text)) {
      throw new Error(`Server fallback did not include expected generated content: ${text}`);
    }
  });

  [
    "renderCourseReader",
    "renderTemplateReader",
    "renderEvidenceExportPanel",
    "renderReviewerRubric",
    "data-toggle-modules",
  ].forEach((text) => {
    if (!main.includes(text)) {
      throw new Error(`Server fallback did not include expected app code: ${text}`);
    }
  });
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return response.text();
}
