// tabs.ts
// Three lessons, one page. Clicking a tab shows its panel and hides the rest.
// `onFirstShow` fires once per tab the first time it's opened, so each lesson
// only builds itself when needed (the 3D scene doesn't start until Lesson 1
// is on screen).

export function setupTabs(
  onFirstShow: (id: string) => void,
  root: ParentNode = document,
): void {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(".tab"));
  const shown = new Set<string>();

  function show(id: string): void {
    for (const tab of tabs) {
      const isTarget = tab.dataset.tab === id;
      tab.setAttribute("aria-selected", String(isTarget));
      const panel = root.querySelector<HTMLElement>(`#panel-${tab.dataset.tab}`)!;
      panel.hidden = !isTarget;
    }
    if (!shown.has(id)) {
      shown.add(id);
      onFirstShow(id);
    }
  }

  for (const tab of tabs) {
    tab.addEventListener("click", () => show(tab.dataset.tab!));
  }

  // open the first tab by default
  const first = tabs[0]?.dataset.tab;
  if (first) show(first);
}
