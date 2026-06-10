const STORAGE_KEY = "course3.progress.v1";

export function loadProgress(storage = window.localStorage) {
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY) ?? "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed;
  } catch {
    return {};
  }
}

export function saveProgress(progress, storage = window.localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isModuleComplete(progress, moduleId) {
  return Boolean(progress[moduleId]?.complete);
}

export function toggleModule(progress, moduleId) {
  return {
    ...progress,
    [moduleId]: {
      complete: !isModuleComplete(progress, moduleId),
      updatedAt: new Date().toISOString(),
    },
  };
}

export { STORAGE_KEY };
