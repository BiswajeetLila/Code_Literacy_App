type WidgetMount = (host: HTMLElement) => void;

const WIDGETS: Record<string, () => Promise<WidgetMount>> = {
  "week02-shopping": async () =>
    (await import("../week02Labs.ts")).mountWeek02ShoppingLab,
  "week02-fake": async () =>
    (await import("../week02Labs.ts")).mountWeek02FakeLab,
  "week03-recipe": async () =>
    (await import("../week03Labs.ts")).mountWeek03RecipeLab,
  "week03-trace": async () =>
    (await import("../week03Labs.ts")).mountWeek03TraceLab,
  "week04-data-flow": async () =>
    (await import("../week04Labs.ts")).mountWeek04DataFlowLab,
  "week04-state": async () =>
    (await import("../week04Labs.ts")).mountWeek04StateLab,
  "week05-menu": async () =>
    (await import("../week05Labs.ts")).mountWeek05MenuLab,
  "week05-ticket": async () =>
    (await import("../week05Labs.ts")).mountWeek05TicketLab,
  "week06-phone-tree": async () =>
    (await import("../week06Labs.ts")).mountWeek06PhoneTreeLab,
  "week06-triage": async () =>
    (await import("../week06Labs.ts")).mountWeek06TriageLab,
  "week07-history": async () =>
    (await import("../week07Labs.ts")).mountWeek07HistoryLab,
  "week07-diff": async () =>
    (await import("../week07Labs.ts")).mountWeek07DiffLab,
  "approve-reject": async () =>
    (await import("../approveRejectLab.ts")).mountApproveRejectLab,
  "bug-report-builder": async () =>
    (await import("../bugReportLab.ts")).mountBugReportLab,
  "week09-coffee": async () =>
    (await import("../week09Labs.ts")).mountWeek09CoffeeLab,
  "week09-race": async () =>
    (await import("../week09Labs.ts")).mountWeek09RaceLab,
  "week10-building": async () =>
    (await import("../week10Labs.ts")).mountWeek10BuildingLab,
  "week10-layers": async () =>
    (await import("../week10Labs.ts")).mountWeek10LayersLab,
  "week11-compare": async () =>
    (await import("../week11Labs.ts")).mountWeek11CompareLab,
  "week11-brief": async () =>
    (await import("../week11Labs.ts")).mountWeek11BriefLab,
};

export async function mountWidget(id: string, host: HTMLElement): Promise<boolean> {
  const load = WIDGETS[id];
  if (!load) throw new Error(`Unknown lesson widget: ${id}`);
  const mount = await load();
  if (!host.isConnected) return false;
  mount(host);
  return true;
}
