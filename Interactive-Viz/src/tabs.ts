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

  tabs.forEach((tab, index) => {
    const tabKey = tab.dataset.tab!;
    const panel = root.querySelector<HTMLElement>(`#panel-${tabKey}`)!;
    tab.id = `${tabKey}-tab`;
    tab.setAttribute("aria-controls", panel.id);
    tab.tabIndex = index === 0 ? 0 : -1;
    panel.setAttribute("aria-labelledby", tab.id);
  });

  function show(id: string): void {
    for (const tab of tabs) {
      const isTarget = tab.dataset.tab === id;
      tab.setAttribute("aria-selected", String(isTarget));
      tab.tabIndex = isTarget ? 0 : -1;
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
    tab.addEventListener("keydown", (event) => {
      const current = tabs.indexOf(tab);
      let next = current;
      if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next === current) return;
      event.preventDefault();
      tabs[next].focus();
      show(tabs[next].dataset.tab!);
    });
  }

  // open the first tab by default
  const first = tabs[0]?.dataset.tab;
  if (first) show(first);
}
