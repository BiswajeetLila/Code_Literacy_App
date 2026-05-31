import { defineConfig } from "vite";

// Static site. `base: "./"` keeps asset paths relative so the built
// bundle works on any static host (Netlify, Vercel, GitHub Pages) or
// straight from a file:// link inside the Obsidian vault.
export default defineConfig({
  base: "./",
});
