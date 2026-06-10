import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const port = Number(process.env.PORT ?? 4173);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://localhost:${port}`);
  const rawPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = normalize(join(root, rawPath));

  if (!filePath.startsWith(root + sep) && filePath !== root) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  const target = existsSync(filePath) ? filePath : join(root, "index.html");
  const info = await stat(target);
  if (!info.isFile()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": contentTypes[extname(target)] ?? "application/octet-stream",
  });
  createReadStream(target).pipe(response);
});

server.listen(port, () => {
  console.log(`Course 3 app running at http://localhost:${port}`);
});
