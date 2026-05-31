// codeBlock.ts
// Renders a small block of REAL code with a plain-English note beside each line.
// This is Rule 8 of the style guide: show the everyday picture, then the same
// idea in actual syntax, every line tied back to the picture.

export type CodeLine = { code: string; note?: string };
export type CodeSpec = { title: string; lang: string; lines: CodeLine[] };

const KEYWORDS = [
  "const", "let", "await", "async", "function", "return", "import", "from",
  "def", "print", "if", "for", "in", "new", "export",
];

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Very small, forgiving highlighter — strings, comments, a few keywords. */
function highlight(code: string): string {
  let out = escapeHtml(code);

  // comments first (// ... or # ...) so we don't recolor inside them
  out = out.replace(/(\/\/[^\n]*|#[^\n]*)/g, '<span class="code-com">$1</span>');
  // strings in double or single quotes
  out = out.replace(/(&quot;[^&]*?&quot;|'[^']*?')/g, '<span class="code-str">$1</span>');
  // keywords (skip ones already inside a span by requiring word boundaries)
  for (const kw of KEYWORDS) {
    out = out.replace(
      new RegExp(`\\b(${kw})\\b(?![^<]*<\\/span>)`, "g"),
      '<span class="code-kw">$1</span>',
    );
  }
  return out;
}

/** Build a code block into the given container. */
export function mountCodeBlock(container: HTMLElement, spec: CodeSpec): void {
  const block = document.createElement("div");
  block.className = "code-block";

  const rows = spec.lines
    .map(
      (l) => `
      <div class="code-line">
        <code>${highlight(l.code)}</code>
        ${l.note ? `<span class="note">${escapeHtml(l.note)}</span>` : "<span></span>"}
      </div>`,
    )
    .join("");

  block.innerHTML = `
    <div class="code-block-title">
      <span>${escapeHtml(spec.title)}</span>
      <span class="lang">${escapeHtml(spec.lang)}</span>
    </div>
    ${rows}
  `;
  container.appendChild(block);
}
