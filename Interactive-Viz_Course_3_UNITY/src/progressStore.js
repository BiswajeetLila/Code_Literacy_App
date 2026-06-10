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
  const current = getModuleProgress(progress, moduleId);
  return {
    ...progress,
    [moduleId]: {
      ...current,
      complete: !isModuleComplete(progress, moduleId),
      updatedAt: new Date().toISOString(),
    },
  };
}

export function isGateCaptured(progress, moduleId) {
  return Boolean(getModuleProgress(progress, moduleId).gate?.captured);
}

export function getGateEvidence(progress, moduleId) {
  return getModuleProgress(progress, moduleId).gate?.evidence ?? "";
}

export function setGateCaptured(progress, moduleId, captured) {
  const current = getModuleProgress(progress, moduleId);
  return setModuleProgress(progress, moduleId, {
    ...current,
    gate: {
      ...current.gate,
      captured: Boolean(captured),
      updatedAt: new Date().toISOString(),
    },
  });
}

export function setGateEvidence(progress, moduleId, evidence) {
  const current = getModuleProgress(progress, moduleId);
  return setModuleProgress(progress, moduleId, {
    ...current,
    gate: {
      ...current.gate,
      evidence: String(evidence),
      updatedAt: new Date().toISOString(),
    },
  });
}

export function isArtifactCaptured(progress, moduleId, artifactIndex) {
  return Boolean(getArtifactState(progress, moduleId, artifactIndex).captured);
}

export function getArtifactEvidence(progress, moduleId, artifactIndex) {
  return getArtifactState(progress, moduleId, artifactIndex).evidence ?? "";
}

export function getArtifactCaptureCount(progress, moduleId, artifactTotal) {
  return Array.from({ length: artifactTotal }).filter((_, index) => isArtifactCaptured(progress, moduleId, index)).length;
}

export function setArtifactCaptured(progress, moduleId, artifactIndex, captured) {
  const current = getModuleProgress(progress, moduleId);
  return setModuleProgress(progress, moduleId, {
    ...current,
    artifacts: {
      ...current.artifacts,
      [artifactIndex]: {
        ...getArtifactState(progress, moduleId, artifactIndex),
        captured: Boolean(captured),
        updatedAt: new Date().toISOString(),
      },
    },
  });
}

export function setArtifactEvidence(progress, moduleId, artifactIndex, evidence) {
  const current = getModuleProgress(progress, moduleId);
  return setModuleProgress(progress, moduleId, {
    ...current,
    artifacts: {
      ...current.artifacts,
      [artifactIndex]: {
        ...getArtifactState(progress, moduleId, artifactIndex),
        evidence: String(evidence),
        updatedAt: new Date().toISOString(),
      },
    },
  });
}

function getModuleProgress(progress, moduleId) {
  const value = progress[moduleId];
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value;
}

function getArtifactState(progress, moduleId, artifactIndex) {
  const state = getModuleProgress(progress, moduleId).artifacts?.[artifactIndex];
  if (!state || typeof state !== "object" || Array.isArray(state)) {
    return {};
  }
  return state;
}

function setModuleProgress(progress, moduleId, nextModuleProgress) {
  return {
    ...progress,
    [moduleId]: {
      ...nextModuleProgress,
      updatedAt: new Date().toISOString(),
    },
  };
}

export { STORAGE_KEY };
