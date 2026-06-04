# Adversarial Assessment

Run these against the final project before passing the learner.

## Agent Failure Scenarios

- Agent introduces a fake Unity package.
- Agent breaks a prefab reference.
- Agent edits generated/cache files.
- Agent adds an unscoped feature.
- Agent changes input/camera behavior without updating the spec.
- Agent imports an asset without provenance or commercial-use clarity.
- Agent uses AI-generated player-consumed content without disclosure marking.
- Build passes locally but fails release packaging.
- Fresh agent cannot continue because project memory is undocumented.

## Required Evidence

- Detection method.
- Fix or rejection.
- Updated rule/checklist/template if the failure should not happen again.
