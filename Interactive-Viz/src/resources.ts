import { escapeHtml, safeExternalUrl } from "./html.ts";

// resources.ts
// The "Read more" tab. Every week MUST ship one (mirrors the Obsidian vault's
// 07-Resources notes). A week just supplies an array; this renders it.
// Curated, beginner-first, matched to the week's lessons.

export type Resource = {
  title: string;
  source: string; // who made it
  time: string; // rough read/watch time
  why: string; // one line: why it's worth it
  url: string;
  group: "core" | "deeper"; // core = do these; deeper = optional/curious
};

export const WEEK_01_RESOURCES: Resource[] = [
  // --- CORE (matched to the three lessons) ---
  {
    title: "How does the Internet work?",
    source: "MDN Web Docs",
    time: "45 min read",
    why: "The plain client/server primer — what 'asking' and 'answering' really means (Lesson 1).",
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work",
    group: "core",
  },
  {
    title: "What is a web server?",
    source: "MDN Web Docs",
    time: "15 min read",
    why: "Nails the 'kitchen' side — what a server is and does, in beginner words.",
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server",
    group: "core",
  },
  {
    title: "How does the Internet work? (illustrated)",
    source: "Cloudflare Learning Center",
    time: "20 min read",
    why: "Short, neutral, well-drawn. A second angle if MDN feels dense.",
    url: "https://www.cloudflare.com/learning/network-layer/how-does-the-internet-work/",
    group: "core",
  },
  {
    title: "Reading code",
    source: "Eric Matthes · Mostly Python",
    time: "30 min read",
    why: "How to READ code without writing it — the whole method of this course (Lesson 2).",
    url: "https://mostlypython.substack.com/",
    group: "core",
  },
  {
    title: "What went wrong? Troubleshooting JavaScript",
    source: "MDN Web Docs",
    time: "20 min read",
    why: "Reading an error message calmly — exactly Lesson 3, with real examples.",
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_went_wrong",
    group: "core",
  },
  {
    title: "Console overview",
    source: "Chrome DevTools docs",
    time: "15 min read",
    why: "The browser console (the page's window) — how to open it and read it.",
    url: "https://developer.chrome.com/docs/devtools/console/",
    group: "core",
  },
  // --- DEEPER (optional / for the curious) ---
  {
    title: "What is the cloud?",
    source: "Cloudflare Learning Center",
    time: "10 min read",
    why: "'A computer you rent somewhere else' — spelled out.",
    url: "https://www.cloudflare.com/learning/cloud/what-is-the-cloud/",
    group: "deeper",
  },
  {
    title: "Vibe Coding: why fundamentals still matter (2026)",
    source: "Frontend Mentor",
    time: "15 min read",
    why: "The clearest 'why am I learning to read code at all' argument.",
    url: "https://www.frontendmentor.io/articles",
    group: "deeper",
  },
  {
    title: "Vibe coding",
    source: "Wikipedia",
    time: "10 min read",
    why: "The cultural backstory (Karpathy, 2025) — context, not technique.",
    url: "https://en.wikipedia.org/wiki/Vibe_coding",
    group: "deeper",
  },
];

function section(title: string, items: Resource[]): string {
  if (items.length === 0) return "";
  const rows = items
    .map(
      (r) => `
      <a class="res-item" href="${safeExternalUrl(r.url)}" target="_blank" rel="noopener noreferrer">
        <div class="res-main">
          <span class="res-title">${escapeHtml(r.title)}</span>
          <span class="res-meta">${escapeHtml(r.source)} · ${escapeHtml(r.time)}</span>
        </div>
        <p class="res-why">${escapeHtml(r.why)}</p>
        <span class="res-go">open ↗</span>
      </a>`,
    )
    .join("");
  return `<h3 class="res-head">${title}</h3>${rows}`;
}

export function mountResources(host: HTMLElement, list: Resource[]): void {
  host.innerHTML = `
    <p class="hint">
      Outside reading for this week — same links as the Obsidian vault’s
      <code>07-Resources</code>. Do the <b>core</b> ones; the rest are for the curious.
      Links open in a new tab. If one has moved, search the title.
    </p>
    ${section("Core — do these", list.filter((r) => r.group === "core"))}
    ${section("Deeper — optional", list.filter((r) => r.group === "deeper"))}
  `;
}
