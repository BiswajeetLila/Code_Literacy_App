# ADR 0001: Interactive Lab Design Standard

## Status

Accepted

## Date

2026-06-02

## Context

Week 1 moved from a light static/manual page into three richer interactive lessons:

- Round Trip Lab: WebGPU/WebGL request-response signal path.
- Project Folder Lab: project tree, file inspector, and startup trace.
- Error Routing Lab: rotatable/clickable 3D error router with terminal/browser decode lanes.

This set a higher visual and interaction quality bar for the rest of the course. The project
needs a reusable decision so later weeks do not become a mix of unrelated UI styles or
decorative 3D.

## Decision

The Code Literacy app will use a **manual shell + instrument lab** design pattern.

- The outer course shell remains the approved light NASA technical-manual system.
- Lesson tabs may contain dark instrument labs when the concept needs focus, motion, live
  output, or console-like behavior.
- 3D is used only when it teaches flow, routing, ownership, spatial hierarchy, or state.
- 3D scenes must be inspectable when practical: rotate, zoom, click, hover, scrub, or link to
  code focus.
- Side panels should not consume large space unless they are continuously useful. Decode/help
  content should usually be compact strips, reveal states, or console lanes.
- FAQ and Read more remain text-heavy manual/reference surfaces unless a specific interaction
  clearly teaches better.
- Every lab must preserve accessibility: keyboard focus, live status text, reduced-motion
  behavior, dark-mode readability, and no horizontal overflow at 375px mobile.

## Consequences

- Week 2 and later weeks should start from a primary learner action, then choose a lab shape.
- WebGPU/Three.js is available but not mandatory. A 2D structured instrument is preferred when
  it teaches better than a 3D scene.
- Heavy visual treatment belongs to the core lesson, not to support/reference tabs.
- Browser verification must include interaction checks, not only build success.

## Verification Checklist

- `npm run build` passes.
- Desktop lab has no horizontal overflow.
- 375px mobile has no horizontal overflow.
- Light default and dark mode are readable.
- `prefers-reduced-motion` still explains the model without forced animation.
- Canvas/3D meaning is mirrored by captions, logs, labels, or real artifacts.
