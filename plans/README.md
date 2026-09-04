# plans/

The orchestrator writes a plan file here BEFORE executing anything that
matches a directive's `plan_required: true`, or anything that would cross
`COST_THRESHOLD_USD`, or anything marked `requires_confirmation: true`.

Filename convention: `YYYY-MM-DD_short-task-slug.md`

## Expected shape

```markdown
## Task
One line, what's being attempted.

## Steps
1. [tier] step description — which script/agent handles it
2. [tier] ...

## Estimated cost
$X.XX, or $0 if everything stays in free tiers

## Status
PENDING_REVIEW | APPROVED | REJECTED | DONE
```

Contents of this directory (other than this README) are gitignored —
plans are ephemeral review artifacts, not history. If you want a permanent
record of what ran, that's what `ledger/` is for.
