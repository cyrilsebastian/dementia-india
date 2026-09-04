---
agent: dementia_data_curator
tier: local
plan_required: false
---

# Directive: Validate Processed Datasets

## Goal
Perform automated schema and epidemiological validation on all datasets in `data/processed/` before they are consumed by the frontend or deployed.

## Execution
```bash
make validate
```
Or directly:
```bash
go run ./cmd/validate/main.go
```

## Checks Performed
1. File existence and non-emptiness for all 7 required CSVs.
2. Header column names match `wiki/decisions/csv-schemas.md`.
3. Prevalence percentages fall within realistic clinical ranges (0–35%).
4. Confidence intervals satisfy `lower <= upper`.
5. Country codes strictly conform to 3-letter uppercase ISO-3 standards.
6. Forward projection counts strictly increase over time (monotonicity).

## Incident Handling
If validation fails:
1. Review error message identifying the exact file and row number.
2. Correct the pipeline or transformation logic.
3. Rerun `make validate`.
