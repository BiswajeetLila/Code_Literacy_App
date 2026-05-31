// main.ts - the app entry point.
// index.html loads this file, then the hash router draws the current page.

import { startRouter } from "./router.ts";
import { initThemeToggle } from "./theme.ts";

initThemeToggle();
startRouter();
