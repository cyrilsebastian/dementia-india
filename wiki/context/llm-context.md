# LLM Context — Project Dementia India

## What this project is
Open dementia data visualisation. Code: github.com/cyrilsebastian/dementia-india
Sites: dementia.cyrilsebastian.com (prod) / dementia.cyrilsebastian.in (staging)

## Stack
Go (data pipeline) · React + TypeScript · ECharts · Tailwind · Cloudflare Pages
CI/CD: GitHub Actions + GitLab → Cloudflare Pages. Code on GitHub, mirrored to GitLab or direct via Wrangler.

## Current phase
Phase: 0 / Phase 1 — Foundation & Data Pipeline Scaffolding Completed

## Data sources status
- [x] Mock & Benchmark Generator: `make mock-data` generates all 7 processed CSVs unblocking frontend Day 1
- [x] India GeoJSON: downloaded & normalized to `web/public/india-states.geojson` via `bash scripts/fetch_geojson.sh`
- [ ] LASI: registration submitted, waiting
- [ ] GBD 2021: download pending
- [ ] WHO GHO: fetched via API
- [ ] World Bank GDP: fetched via API
- [ ] WAR 2023 PDF: downloaded, extraction script ready (`scripts/extract_pdf_tables.py`)
- [ ] Alzheimer's India: email sent
- [ ] IAN neurologists: email sent (literature benchmarks seeded in `cmd/mock/main.go`)

## Key decisions made
- ECharts over D3 (faster to build, built-in choropleth, dark mode)
- Static CSVs committed to repo (no database, zero server cost)
- Cloudflare Pages free tier (no server needed)
- High-fidelity synthetic data generator unblocks UI development immediately
- Automated GeoJSON fetch script standardizes ECharts state properties and coordinates
- Automated CSV validator (`cmd/validate/main.go`) enforces schema and epidemiological ranges in CI
- Survey weights applied in lasi.go before any aggregation
- WHO GDO indicators kept separate from GBD epi data (different CSV)

## CSV schemas (column names are stable — do not rename)
- india-states.csv: state_code, state_name, sex, urban, age_group, education, prevalence_pct, lower, upper, est_cases, population
- global-countries.csv: country_code, country_name, region, year, sex, age_group, measure, value, lower, upper, unit, source
- projections.csv: country_code, country_name, year, cases, lower, upper, source
- neurologists.csv: state_code, state_name, total_neurologists, cog_behav_neuro, neurologist_per_million, patient_per_neurologist
- global-who-policy.csv: indicator_code, country_code, year, value_text, value_numeric
- gdp-per-capita.csv: country_code, year, gdp_usd
- summary-stats.csv: metric_id, label, value, unit, change_pct, notes

## Email tracking subjects (share with Claude to get email content)
- LASI request: "LASI Wave 1 Data Request — Dementia Visualisation Project"
- Alzheimer's India: "Data Request — Dementia India 2020 Report — Open Data Project"
- IAN: "State-wise Neurologist Data Request — Health Data Visualisation Project"

## Completed
- Go module initialized (`github.com/cyrilsebastian/dementia-india`)
- Canonical structs in `internal/models/models.go`
- CSV export writers in `internal/output/csv.go` with unit tests
- Mock data generator in `cmd/mock/main.go`
- Automated validator in `cmd/validate/main.go`
- Master `Makefile` orchestrating all workflows
- India GeoJSON fetcher in `scripts/fetch_geojson.sh`
- PDF table extractor in `scripts/extract_pdf_tables.py`
- GitHub Actions CI, Wiki sync, and Cloudflare Pages workflows
