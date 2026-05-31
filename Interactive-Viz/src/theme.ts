type Theme = "light" | "dark";

const THEME_KEY = "code-literacy-theme";

export function initThemeToggle(): void {
  const toggle = document.querySelector<HTMLButtonElement>("#theme-toggle");
  const label = document.querySelector<HTMLElement>("#theme-toggle-label");
  if (!toggle || !label) return;

  const apply = (theme: Theme) => {
    document.documentElement.dataset.theme = theme;
    toggle.setAttribute("aria-pressed", String(theme === "dark"));
    label.textContent = theme === "dark" ? "Light" : "Dark";
  };

  apply(readSavedTheme());

  toggle.addEventListener("click", () => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    apply(next);
  });
}

function readSavedTheme(): Theme {
  return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
}
