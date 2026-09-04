---
agent: scan_writer
tier_default: local
tier_max: paid
requires_confirmation: false
plan_required: false
---

# Directive: Write a swing-trade scan from plain English

## Goal
Given a plain-English description of a trading setup, produce validated
scan-DSL that can run against the EOD price database.

## Inputs
- `description` (string) — the user's plain-English request
- `universe` (string, optional) — defaults to "NSE_ALL" if not given

## Tools / scripts to use
1. `execution/llm_router.go` (via the `scan_writer` agent persona) — drafts
   the DSL from `description`
2. `execution/validate_scan.py` — validates the DSL against the schema in
   `execution/scan_schema.json`. Run this before returning any result.

## Outputs
- A `.json` file in `.tmp/scans/` containing the validated DSL
- If validation fails twice, a plain-English explanation of what's blocking
  it, returned to the user instead of a broken scan

## Edge cases
- If the request references an indicator not in
  `execution/scan_schema.json`'s approved list, say so explicitly — do not
  substitute a similar indicator without asking.
- If the request is ambiguous about a time window ("recent", "lately"),
  state the assumed window explicitly in the output rather than guessing
  silently.
- If local-tier drafting fails validation twice in a row, escalate to
  `free_cloud` tier automatically (allowed by `tier_max: paid` above,
  cascading through free_cloud first). Log the escalation reason to the
  ledger notes field.

## Learnings (updated by self-annealing — do not hand-edit assumptions here
## without evidence from an actual run)
- (empty — first run of this directive. Once it's been used, real
  learnings about local-model failure modes, timing, etc. go here.)
