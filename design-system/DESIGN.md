---
design-system: nasa-technical-manual
status: approved
approved-by: project lead
first-used: Code Literacy V2 (Interactive-Viz)
tags: [design-system, retro, technical, print, light-mode]
---

# Design System — "NASA Technical Manual" (1980s)

A light, print-like, engineering-drawing aesthetic. Looks like a page torn from an
Apollo-era technical manual: paper background, hairline grid, monospace labels, part-number
callouts, one hot accent. Calm, precise, trustworthy, a little retro-cool. **Approved** — reuse
across projects.

> Slug: `nasa-technical-manual`. To reuse: "build this in the nasa-technical-manual style."

---

## 1. Palette

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F4F1E8` | page background (warm off-white) |
| `--paper-2` | `#ECE7D8` | cards, recessed panels |
| `--ink` | `#1A1A1A` | text, borders, headers |
| `--red` | `#FC3D21` | **primary accent** — NASA "worm" red. CTAs, markers, the one hot thing |
| `--cyan` | `#5B8DB8` | blueprint blue — secondary labels, icons, links |
| `--amber` | `#E8A33D` | caution/highlight, sparingly |
| `--grid` | `rgba(26,26,26,0.06)` | hairline graph-paper grid |

Dark code surfaces use `#14140f` ink-black with `#e8e4d8` text. Rule: **light by default**,
dark only inside code/terminal blocks for contrast.

## 2. Typography

- **Mono (body + labels):** `Space Mono` → `ui-monospace, "Courier New", monospace`.
  Everything reads like a typewriter/teletype. This is the signature.
- **Grotesk (headers, tab labels, badges):** `Space Grotesk` → `system-ui, sans-serif`.
  Condensed, bold, uppercase for headings.
- Headings: UPPERCASE, letter-spacing `0.03–0.06em`, weight 700.
- Body line-height 1.6. Labels often uppercase with tracking.

Google Fonts: `Space+Mono:wght@400;700` + `Space+Grotesk:wght@500;700`.

## 3. Signature motifs (the "tells")

- **Hairline grid background** — 24px graph paper (two `linear-gradient`s).
- **The "sheet"** — content sits on a bordered page (`2px solid --ink`, max-width ~880px),
  like a single manual page.
- **Corner registration marks** — small `+` crosshairs in the 4 sheet corners.
- **Part-number / drawing tags** — `FIG. 1-2`, `DWG. WEEK-01 · REV. B`, `SHEET 1 OF 1` in
  header/footer. Everything is a numbered figure.
- **Callout leader lines** — annotations point back with `← note` in dim mono.
- **One hot accent only** — red is rationed; most of the page is ink-on-paper.
- **Orthographic / flat** option for any 3D (engineering-drawing projection, no perspective).

## 4. Component patterns (reusable)

- **Tabs:** square, bordered, sit on a `2px` ink baseline; active tab inverts (ink fill, paper
  text); number prefix in red. No rounded corners.
- **Code block:** dark `#14140f` panel, ink title bar (lang in amber), each line paired with a
  dim `← plain-English note`. Minimal syntax color (keywords coral, strings green, comments grey).
- **Card (predict-then-peek):** bordered `--paper-2`, red `Q` marker, click-to-reveal answer.
- **File tree:** monospace rows, folder names end `/`, "don't touch" rows dimmed, entry row gets
  a red left-bar + `runs 1st` badge.
- **Terminal / console panes:** dark windows, ink title bar with a cyan "who" label, red error
  lines are clickable.
- **Instrument lab:** a lesson-local dark panel used for live systems: WebGPU/WebGL canvas,
  console lanes, sliders, toggles, trace cards, and compact status captions. The outer app
  still stays light/manual.
- **3D teaching scene:** use for flows, routing, ownership, or state. The scene must be
  inspectable when practical: rotate, zoom, hover, click, scrub, or focus a code line. Passive
  3D is not enough for the current quality bar.
- **Decode strip:** explanation panels that are not constantly useful should be compact strips
  below the primary scene, not tall empty side panels.
- **Buttons:** ink fill, paper text, square, mono, uppercase; hover lightens. No gradients.

## 5. Motion & a11y

- Transitions 150–300ms, color/opacity only (no layout-shifting scale on hover).
- Respect `prefers-reduced-motion`.
- Contrast is high by default (ink on paper ≈ AAA). Keep red text ≥ 18px or bold.
- Visible focus rings (cyan, 3px). Square focus, matches the aesthetic.
- 3D scenes need a non-motion interpretation: static positions, status text, logs, or decoded
  output must still teach the point.
- Verify every new lab at desktop and 375px mobile with no horizontal overflow.
- Canvas scenes should expose meaning outside pixels through captions, logs, labels, or
  adjacent real artifacts.

## 6. Do / Don't

| Do | Don't |
|---|---|
| Square corners, hairline borders | Rounded cards, soft shadows |
| One red accent, rest ink/paper | Rainbow of accents |
| Monospace everywhere | Friendly humanist sans for body |
| Number things (FIG/DWG/REV) | Generic "Section 1" headers |
| Inspectable line-art 3D when it teaches | Glossy decorative 3D, perspective, glow |
| Light paper page | Dark-mode-first |

## 7. Source files (this project)

- `src/style.css` — full implementation + CSS vars (lines 5–15 = palette).
- `.obsidian/snippets/nasa-manual.css` (sibling vault) — same look inside Obsidian.
- Both kept byte-for-byte aligned on palette + fonts so the web app and notes feel like one
  document.
