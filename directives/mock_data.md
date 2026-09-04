---
agent: dementia_data_curator
tier: local
plan_required: false
---

# Directive: Generate Synthetic Benchmark Datasets

## Goal
Generate schema-compliant, epidemiologically calibrated benchmark datasets into `data/processed/` to immediately unblock frontend and pipeline development without waiting for external data approvals.

## Inputs
- Published epidemiological anchors from LASI Wave 1 National Report (IIPS), Lancet Healthy Longevity, and GBD 2021.

## Execution
Run the Go mock generator:
```bash
make mock-data
```
Or directly:
```bash
go run ./cmd/mock/main.go
```

## Expected Outputs
All 7 canonical CSVs written to `data/processed/`:
1. `india-states.csv`
2. `global-countries.csv`
3. `projections.csv`
4. `neurologists.csv`
5. `global-who-policy.csv`
6. `gdp-per-capita.csv`
7. `summary-stats.csv`

## Validation
Always follow with `make validate` to confirm all sanity checks pass.
