import {
  getArtifactEvidence,
  getGateEvidence,
  getReviewNotes,
  getReviewerName,
  getReviewStatus,
  isArtifactCaptured,
  isGateCaptured,
  isModuleComplete,
  isReviewCriterionMet,
} from "./progressStore.js";

export const reviewCriteria = [
  {
    id: "gate",
    label: "Gate is proven",
    prompt: "The submitted evidence proves the module gate, not just task activity.",
  },
  {
    id: "artifacts",
    label: "Required artifacts are present",
    prompt: "Every required artifact is captured or explicitly explained as blocked.",
  },
  {
    id: "evidence",
    label: "Evidence is reviewable",
    prompt: "Paths, links, screenshots, logs, or notes are specific enough for a fresh reviewer.",
  },
  {
    id: "handoff",
    label: "Fresh-agent handoff is clear",
    prompt: "A new agent or reviewer can continue without hidden chat context.",
  },
];

export function buildModuleEvidencePack(module, progress, exportedAt = new Date().toISOString()) {
  const artifacts = module.artifacts.map((artifact, index) => ({
    index,
    label: artifact,
    captured: isArtifactCaptured(progress, module.id, index),
    evidence: getArtifactEvidence(progress, module.id, index),
  }));

  return {
    schema: "course3.module-evidence.v1",
    exportedAt,
    module: {
      id: module.id,
      number: module.number,
      title: module.title,
      phase: module.phase,
      timeBudget: module.timeBudget,
      gate: module.gate,
      summary: module.summary,
      templates: module.templates,
    },
    learnerProgress: {
      complete: isModuleComplete(progress, module.id),
      gateCaptured: isGateCaptured(progress, module.id),
      gateEvidence: getGateEvidence(progress, module.id),
      artifacts,
    },
    reviewer: {
      status: getReviewStatus(progress, module.id),
      reviewer: getReviewerName(progress, module.id),
      notes: getReviewNotes(progress, module.id),
      criteria: reviewCriteria.map((criterion) => ({
        ...criterion,
        met: isReviewCriterionMet(progress, module.id, criterion.id),
      })),
    },
  };
}

export function buildCourseEvidencePack(modules, progress, exportedAt = new Date().toISOString()) {
  return {
    schema: "course3.course-evidence.v1",
    exportedAt,
    course: "Course 3 / Unity Solo AI Game Studio",
    modules: modules.map((module) => buildModuleEvidencePack(module, progress, exportedAt)),
  };
}

export function buildModuleEvidenceMarkdown(pack) {
  const artifactRows = pack.learnerProgress.artifacts
    .map((artifact) => `| ${artifact.captured ? "yes" : "no"} | ${escapeMarkdown(artifact.label)} | ${escapeMarkdown(artifact.evidence || "missing")} |`)
    .join("\n");
  const criteriaRows = pack.reviewer.criteria
    .map((criterion) => `| ${criterion.met ? "yes" : "no"} | ${escapeMarkdown(criterion.label)} | ${escapeMarkdown(criterion.prompt)} |`)
    .join("\n");

  return `# Course 3 Module ${String(pack.module.number).padStart(2, "0")} Evidence Pack

Exported: ${pack.exportedAt}

## Module

- Title: ${pack.module.title}
- Phase: ${pack.module.phase}
- Budget: ${pack.module.timeBudget}
- Gate: ${pack.module.gate}
- Summary: ${pack.module.summary}
- Templates: ${pack.module.templates.length > 0 ? pack.module.templates.join(", ") : "none"}

## Learner Progress

- Local complete: ${pack.learnerProgress.complete ? "yes" : "no"}
- Gate captured: ${pack.learnerProgress.gateCaptured ? "yes" : "no"}
- Gate evidence: ${pack.learnerProgress.gateEvidence || "missing"}

| Captured | Artifact | Evidence |
| --- | --- | --- |
${artifactRows}

## Reviewer Rubric

- Status: ${pack.reviewer.status}
- Reviewer: ${pack.reviewer.reviewer || "unassigned"}

| Met | Criterion | Review prompt |
| --- | --- | --- |
${criteriaRows}

## Reviewer Notes

${pack.reviewer.notes || "No reviewer notes recorded."}
`;
}

export function downloadTextFile(filename, text, documentRef = document) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = documentRef.createElement("a");
  link.href = url;
  link.download = filename;
  documentRef.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeMarkdown(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}
