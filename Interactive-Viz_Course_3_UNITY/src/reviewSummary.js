import { reviewCriteria } from "./evidencePack.js";
import {
  getArtifactCaptureCount,
  getReviewStatus,
  isGateCaptured,
  isReviewCriterionMet,
} from "./progressStore.js";

export function getModuleReviewSummary(module, progress) {
  const artifactCount = getArtifactCaptureCount(progress, module.id, module.artifacts.length);
  const criteriaCount = reviewCriteria.filter((criterion) => isReviewCriterionMet(progress, module.id, criterion.id)).length;
  const gateCaptured = isGateCaptured(progress, module.id);
  const reviewStatus = getReviewStatus(progress, module.id);
  const missing = [];

  if (!gateCaptured) {
    missing.push("gate");
  }
  if (artifactCount < module.artifacts.length) {
    missing.push("artifacts");
  }
  if (criteriaCount < reviewCriteria.length) {
    missing.push("rubric");
  }
  if (reviewStatus !== "approved") {
    missing.push("approval");
  }

  return {
    moduleId: module.id,
    number: module.number,
    title: module.title,
    phase: module.phase,
    gateCaptured,
    artifactCount,
    artifactTotal: module.artifacts.length,
    criteriaCount,
    criteriaTotal: reviewCriteria.length,
    reviewStatus,
    missing,
    ready: missing.length === 0,
  };
}

export function getCourseReviewSummary(modules, progress) {
  const moduleSummaries = modules.map((module) => getModuleReviewSummary(module, progress));
  const artifactTotal = moduleSummaries.reduce((sum, module) => sum + module.artifactTotal, 0);
  const artifactCount = moduleSummaries.reduce((sum, module) => sum + module.artifactCount, 0);

  return {
    modules: moduleSummaries,
    gatesCaptured: moduleSummaries.filter((module) => module.gateCaptured).length,
    approvedModules: moduleSummaries.filter((module) => module.reviewStatus === "approved").length,
    revisionModules: moduleSummaries.filter((module) => module.reviewStatus === "needs-revision").length,
    blockedModules: moduleSummaries.filter((module) => module.reviewStatus === "blocked").length,
    readyModules: moduleSummaries.filter((module) => module.ready).length,
    artifactCount,
    artifactTotal,
  };
}
