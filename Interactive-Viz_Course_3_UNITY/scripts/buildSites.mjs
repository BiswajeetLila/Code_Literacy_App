import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { modules, operatingLoop, templates } from "../src/courseData.js";
import { generateContent } from "./generateContent.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sitesRoot = join(root, "sites-dist");
const dist = join(sitesRoot, "dist");
const client = join(dist, "client");
const server = join(dist, "server");
const openai = join(dist, ".openai");

await generateContent();

await rm(sitesRoot, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await mkdir(openai, { recursive: true });

await cp(join(root, "index.html"), join(client, "index.html"));
await cp(join(root, "src"), join(client, "src"), { recursive: true });
await cp(join(root, ".openai", "hosting.json"), join(openai, "hosting.json"));
await writeFile(join(client, "build-info.json"), JSON.stringify({
  app: "Interactive-Viz_Course_3_UNITY",
  modules: modules.length,
  templates: templates.length,
  loop: operatingLoop,
  builtAt: new Date().toISOString(),
}, null, 2));

await writeFile(join(server, "index.js"), `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const assetResponse = await env.ASSETS.fetch(new Request(new URL(pathname, url.origin), request));

    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    return env.ASSETS.fetch(new Request(new URL("/index.html", url.origin), request));
  },
};
`);

console.log(`Built Course 3 Sites artifact at ${dist}`);
