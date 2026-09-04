# Project Dementia India — Progress Tracker

> **Update this file as you go.** Sync to GitHub Wiki after each session.  
> Format: `- [x]` = done · `- [-]` = in progress · `- [ ]` = not started  
> Last updated: _(update this date each session)_  
> Current phase: **Phase 0 — Data Collection**

---

## Quick Status

| Phase | Status | Blocker |
|---|---|---|
| Phase 0 — Data Collection | In progress (Mocks & GeoJSON done) | External registrations pending |
| Phase 1 — Go Pipeline | In progress (Foundation, Mock, Validator done) | LASI raw data parsing pending |
| Phase 2 — India Frontend | Ready to start (Unblocked by mock data) | — |
| Phase 3 — Global Frontend | Ready to start (Unblocked by mock data) | — |
| Phase 4 — Deploy + Doctors | Scaffolding complete | — |

---

## Phase 0 — Data Collection

### 0.A — Immediate downloads & Automated Ingestion (Day 1)

- [x] **0.A.0** Generate synthetic benchmark datasets (`make mock-data`) — **Frontend unblocked on Day 1**
- [ ] **0.A.1** Create account at vizhub.healthdata.org (IHME)
- [ ] **0.A.2** Download GBD 2021 CSV with exact filters:
  - Cause: Alzheimer's disease and other dementias
  - Measure: Prevalence · Deaths · DALYs · Incidence
  - Location: All countries + Global
  - Year: 1990–2021 (all)
  - Age: All ages + all 60+ bands
  - Sex: Both · Male · Female
- [ ] **0.A.3** Save as `data/raw/gbd_2021_dementia.csv`
- [ ] **0.A.4** Verify file size > 10MB (confirms all filters were selected)
- [x] **0.A.5** Automated GeoJSON fetch script (`bash scripts/fetch_geojson.sh` / `make fetch-geojson`)
- [x] **0.A.6** Normalized boundaries saved to `web/public/india-states.geojson` (133 KB, standardized properties)
- [ ] **0.A.7** Download World Alzheimer Report 2023 PDF from alzint.org
- [ ] **0.A.8** Save as `data/raw/world_alzheimer_report_2023.pdf`
- [x] **0.A.8a** Automated PDF table extraction script ready (`scripts/extract_pdf_tables.py`)
- [ ] **0.A.9** Clone `github.com/open-numbers/ddf--ihme--global_burden_disease_death_rate` (GBD 2016, usable now)
- [ ] **0.A.10** Check Our World in Data dementia CSV: https://ourworldindata.org/grapher/share-of-population-with-dementia — download directly

### 0.B — Emails to send (Day 1, ~30 minutes)

- [ ] **0.B.1** Send LASI data request email
  - Subject: `LASI Wave 1 Data Request — Dementia Visualisation Project`
  - Template in: PLAN.md → [Email Templates — IIPS](#iips-lasi-data-request)
  - Date sent: ___________
  - Expected response: 2–5 working days
- [ ] **0.B.2** Send Alzheimer's India email
  - Subject: `Data Request — Dementia India 2020 Report — Open Data Project`
  - To: info@alzheimer.org.in
  - Template in: PLAN.md → [Email Templates — Alzheimer's India]
  - Date sent: ___________
- [ ] **0.B.3** Send IAN neurologist data email (Phase 4 prep — start now)
  - Subject: `State-wise Neurologist Data Request — Health Data Visualisation Project`
  - To: ian@indianneurology.com
  - Template in: PLAN.md → [Email Templates — IAN]
  - Date sent: ___________

### 0.C — Registrations with wait time

- [ ] **0.C.1** Register at iipsindia.ac.in for LASI access
- [ ] **0.C.2** Fill LASI data request form — select Wave 1, CSV, Cognitive module
- [ ] **0.C.3** LASI data received (waiting)
  - Received on: ___________
  - Filename saved as: ___________
  - Actual columns in CSV: _(list here after receiving)_

### 0.D — Go repo setup & CI/CD (Day 1)

- [x] **0.D.1** `mkdir dementia-india && cd dementia-india`
- [x] **0.D.2** `go mod init github.com/cyrilsebastian/dementia-india`
- [x] **0.D.3** Create full directory structure (see PLAN.md → Repository Architecture)
- [x] **0.D.4** `git init && git remote add origin <github-repo-url>`
- [x] **0.D.5** GitHub repository configured: `github.com/cyrilsebastian/dementia-india`
- [x] **0.D.6** Automated GitHub Actions Wiki Sync workflow (`.github/workflows/wiki-sync.yml`)
- [x] **0.D.7** Automated CI test & validate workflow (`.github/workflows/ci.yml`)
- [x] **0.D.8** Automated Cloudflare Pages deployment workflow (`.github/workflows/deploy.yml`)
- [ ] **0.D.9** Add GitHub / GitLab CI/CD secrets: `CLOUDFLARE_API_TOKEN` · `CLOUDFLARE_ACCOUNT_ID`
- [ ] **0.D.10** Create Cloudflare Pages project for staging: `dementia-india-staging`
- [ ] **0.D.11** Create Cloudflare Pages project for prod: `dementia-india-prod`
- [ ] **0.D.12** DNS: Add CNAME `dementia` → staging project in cyrilsebastian.in zone
- [ ] **0.D.13** DNS: Add CNAME `dementia` → prod project in cyrilsebastian.com zone

### 0.E — Open data extraction while waiting for LASI

- [ ] **0.E.1** Run `go run ./cmd/fetch/... -source who` — fetch WHO GHO indicators
- [x] **0.E.2** Verify `data/processed/global-who-policy.csv` was created (populated via mock/pipeline)
- [ ] **0.E.3** Parse Our World in Data CSV as interim `global-countries.csv`
- [ ] **0.E.4** Parse GBD 2016 open-numbers data as fallback global dataset
- [ ] **0.E.5** Extract WAR 2023 Table 1 and Table 3 using `scripts/extract_pdf_tables.py`
- [ ] **0.E.6** Save extracted data as `data/raw/war2023_tables.csv`
- [ ] **0.E.7** Run `go run ./cmd/fetch/... -source worldbank` — GDP data for bubble chart

### 0.F — Scraping decisions (check before doing)

- [ ] **0.F.1** Check alzheimer.org.in `robots.txt` — note result here: ___________
- [ ] **0.F.2** Check indianneurology.com `robots.txt` — note result here: ___________
- [ ] **0.F.3** Review indianneurology.com Terms of Service — note relevant clause: ___________
- [ ] **0.F.4** Decision logged in `wiki/decisions/scraping-policy.md`

---

## Phase 1 — Go Data Pipeline

### 1.A — Foundation

- [x] **1.A.1** Write `internal/models/models.go` — models matching canonical schemas
- [x] **1.A.2** Verify `go build ./...` passes with models
- [x] **1.A.3** Write `internal/output/csv.go` — type-safe Write functions for all models
- [x] **1.A.4** Write `internal/output/csv_test.go` — test round-trip write → read (PASS)
- [x] **1.A.5** Write `cmd/mock/main.go` (`make mock-data`) — synthetic data generator (PASS)
- [x] **1.A.6** Write `cmd/validate/main.go` (`make validate`) — sanity checks validator (PASS)
- [x] **1.A.7** Write `Makefile` with all orchestrated targets (PASS)

### 1.B — GBD source

- [ ] **1.B.1** Write `internal/sources/gbd.go` — `ParseGBDCSV(path)`
- [ ] **1.B.2** Write `testdata/gbd_sample.csv` — 5 rows matching actual format
- [ ] **1.B.3** Write `internal/sources/gbd_test.go` — table-driven tests
- [ ] **1.B.4** Run `go run ./cmd/fetch/... -source gbd` — verify output
- [ ] **1.B.5** Open `data/processed/global-countries.csv` — spot-check India 2019 prevalence
- [ ] **1.B.6** Note actual GBD column names here (after downloading): ___________

### 1.C — WHO source

- [ ] **1.C.1** Write `internal/sources/who.go` — `WHOClient`
- [ ] **1.C.2** Run `DiscoverDementiaIndicators()` — list all codes found
  - Codes discovered: ___________
- [ ] **1.C.3** Update `DementiaIndicators` slice with confirmed codes
- [ ] **1.C.4** Run `go run ./cmd/fetch/... -source who`
- [ ] **1.C.5** Verify `data/processed/global-who-policy.csv` — check India row

### 1.D — World Bank source (new)

- [ ] **1.D.1** Write `internal/sources/worldbank.go`
- [ ] **1.D.2** Output: `data/processed/gdp-per-capita.csv`
- [ ] **1.D.3** Verify USA 2019 GDP ~$65,000 as sanity check

### 1.E — LASI source (start after data received)

- [ ] **1.E.1** LASI data received — open and inspect actual column names
- [ ] **1.E.2** Update column name constants at top of `lasi.go` to match actual CSV
- [ ] **1.E.3** Write `internal/sources/lasi.go` — `ParseLASICSV(path)`
- [ ] **1.E.4** Write `testdata/lasi_sample.csv` — 10 rows
- [ ] **1.E.5** Write `internal/sources/lasi_test.go`
- [ ] **1.E.6** Run `go run ./cmd/fetch/... -source lasi`
- [ ] **1.E.7** Verify Kerala prevalence output ≈ 9.2% (published value)
- [ ] **1.E.8** Verify J&K ≈ 11.0% and Delhi ≈ 4.5%

### 1.F — Transform and validate

- [ ] **1.F.1** Write `cmd/transform/main.go`
- [ ] **1.F.2** Verify `projections.csv` is generated with 2019 · 2030 · 2040 · 2050 rows
- [ ] **1.F.3** Verify `country_region` column populated in `global-countries.csv`
- [ ] **1.F.4** Verify `summary-stats.csv` has exactly 4 rows (the stat cards)
- [ ] **1.F.5** Write `cmd/validate/main.go`
- [ ] **1.F.6** Run `make validate` — confirm PASS
- [ ] **1.F.7** Write `Makefile` — all targets
- [ ] **1.F.8** Run `make data` end-to-end — confirm all CSVs generated + PASS

### 1.G — Tests

- [ ] **1.G.1** Write tests for `ageGroupFromAge()` — all boundary values
- [ ] **1.G.2** Write tests for `isoCodeFromGBDName()` — known + unknown
- [ ] **1.G.3** Write tests for `normaliseSex()` — all variants
- [ ] **1.G.4** Run `go test ./...` — all pass

---

## Phase 2 — India Frontend

**Start when:** `make data` passes and `india-states.csv` is populated

### 2.A — Scaffold

- [x] **2.A.1** `npm create vite@latest web -- --template react-ts`
- [x] **2.A.2** Install dependencies: `echarts echarts-for-react papaparse @types/papaparse tailwindcss lucide-react`
- [x] **2.A.3** Configure `tailwind.config.js` and `postcss.config.js`
- [x] **2.A.4** Write `src/data/useCSV.ts` — generic typed PapaParse hook
- [x] **2.A.5** Write `src/context/FilterContext.tsx` — year, sex, urban/rural, state filter context
- [x] **2.A.6** Write `src/components/FilterBar.tsx` — interactive filter pills and state badge
- [x] **2.A.7** `npm run build` — passes with TypeScript type checking

### 2.B — India choropleth (first chart)

- [x] **2.B.1** Write `src/charts/IndiaChoropleth.tsx`
- [x] **2.B.2** Load `india-states.geojson` into ECharts
- [x] **2.B.3** Load `india-states.csv` via `useCSV`
- [x] **2.B.4** Apply colour scale: pale mint → amber → crimson
- [x] **2.B.5** Add tooltip: state name, prevalence %, estimated cases, CI
- [x] **2.B.6** Connect to FilterContext — sex and urban/rural toggles
- [x] **2.B.7** Add drill-down: click state → filter demographic charts
- [x] **2.B.8** Visual check: J&K darkest · Delhi lightest

### 2.C — Age-onset bar

- [x] **2.C.1** Write `src/charts/AgeOnsetBar.tsx`
- [x] **2.C.2** Two series: Male (blue) · Female (coral)
- [x] **2.C.3** Add state selector integration (FilterContext)
- [ ] **2.C.4** Add national average reference line
- [ ] **2.C.5** Add insight annotation text

### 2.D — Urban vs Rural diverging

- [x] **2.D.1** Write `src/charts/UrbanRuralBar.tsx`
- [x] **2.D.2** Urban bars vs Rural bars
- [x] **2.D.3** Comparison across top states
- [ ] **2.D.4** Add "Rural 1.8× higher" annotation

### 2.E — Education gradient

- [ ] **2.E.1** Write `src/charts/EducationGradient.tsx`
- [ ] **2.E.2** Line chart with CI ribbon
- [ ] **2.E.3** "3× risk" callout annotation

### 2.F — Stat cards

- [x] **2.F.1** Write `src/components/StatCards.tsx` — 4 cards
- [x] **2.F.2** Cards display metrics, unit, change badge, notes

### 2.G — India projection

- [ ] **2.G.1** Write `src/charts/IndiaProjection.tsx`
- [ ] **2.G.2** Solid line up to 2021 · dashed line after
- [ ] **2.G.3** CI ribbon around projection
- [ ] **2.G.4** Vertical marker at 2021

### 2.H — Filter bar + ECharts connect

- [x] **2.H.1** Complete `src/components/FilterBar.tsx`
- [x] **2.H.2** Wire up FilterContext across India charts
- [x] **2.H.3** Test: change sex/urban toggle → all charts update simultaneously

### 2.I — Polish

- [x] **2.I.1** Tailwind responsive grid: 2-col desktop · 1-col mobile
- [x] **2.I.2** Dark mode: ECharts dark theme + Tailwind `dark:` classes
- [x] **2.I.3** Export button on map (ECharts PNG)
- [x] **2.I.4** Source citation footer per chart panel

### 2.J — Deploy staging

- [ ] **2.J.1** Write `.gitlab-ci.yml` with test + build + deploy-staging stages
- [ ] **2.J.2** Push to `develop` branch
- [ ] **2.J.3** Verify deployment at https://dementia.cyrilsebastian.in
- [ ] **2.J.4** Test on mobile screen

---

## Phase 3 — Global Frontend

**Start when:** Phase 2 is live on staging

### 3.A — Hans Rosling bubble chart

- [ ] **3.A.1** Write `src/charts/GlobalBubble.tsx`
- [ ] **3.A.2** Join `global-countries.csv` + `gdp-per-capita.csv` by country_code + year
- [ ] **3.A.3** Implement year slider with play/pause animation
- [ ] **3.A.4** Region colour coding: Asia · Europe · Americas · Africa · Oceania
- [ ] **3.A.5** India bubble always labelled · others on hover
- [ ] **3.A.6** Verify animation plays smoothly at 60fps

### 3.B — 10-country grouped bar

- [ ] **3.B.1** Write `src/charts/CountryComparisonBar.tsx`
- [ ] **3.B.2** Add measure toggle: Prevalence / Deaths / DALYs / Incidence
- [ ] **3.B.3** Add sort toggle: A–Z / by value
- [ ] **3.B.4** India bar always in accent red

### 3.C — World choropleth

- [ ] **3.C.1** Write `src/charts/WorldChoropleth.tsx`
- [ ] **3.C.2** Same green → red scale as India map
- [ ] **3.C.3** Year slider animates the map
- [ ] **3.C.4** Click country → opens detail panel (3.E)

### 3.D — Multi-country projections

- [ ] **3.D.1** Write `src/charts/MultiCountryProjection.tsx`
- [ ] **3.D.2** India line: thicker, labelled
- [ ] **3.D.3** Lines dashed after 2021
- [ ] **3.D.4** Checkbox show/hide per country
- [ ] **3.D.5** "+367% N.Africa/ME" annotation

### 3.E — Country detail panel

- [ ] **3.E.1** Write `src/components/CountryDetailPanel.tsx`
- [ ] **3.E.2** Join GBD data + WHO policy data on country_code
- [ ] **3.E.3** Source footnote per data point

### 3.F — Rising countries callouts

- [ ] **3.F.1** Write `src/components/RisingCallouts.tsx` — 3 cards
- [ ] **3.F.2** Each card links to relevant chart view

---

## Phase 4 — Neurologist Data + Production Deploy

**Start when:** Phase 3 is live on staging and reviewed

### 4.A — Neurologist data

- [ ] **4.A.1** Check IAN email response (sent in Phase 0)
  - Response received: ___________
  - Data format: ___________
- [ ] **4.A.2** If no response after 1 week: manual IAN directory count
  - Start date: ___________
  - End date: ___________
  - States completed: ___ / 28 states + 8 UTs
- [ ] **4.A.3** Save as `data/raw/neurologists-manual.csv`
- [ ] **4.A.4** Run `go run ./cmd/transform/... -source neurologists`
- [ ] **4.A.5** Verify `neurologists.csv` has `neurologist_per_million` column populated
- [ ] **4.A.6** Spot-check: Maharashtra should show < 1 per million

### 4.B — Neurologist desert map

- [ ] **4.B.1** Write `src/charts/NeurologistDesertMap.tsx`
- [ ] **4.B.2** Overlay: bubble per state sized by dementia patient count
- [ ] **4.B.3** Colour: white → deep red (crisis threshold)
- [ ] **4.B.4** Tooltip with neurologist : patient ratio

### 4.C — Production deployment

- [ ] **4.C.1** Update `.gitlab-ci.yml` — add `deploy-prod` stage for `main` branch
- [ ] **4.C.2** Verify Cloudflare Pages prod project is configured
- [ ] **4.C.3** Verify DNS CNAME for `dementia.cyrilsebastian.com`
- [ ] **4.C.4** Enable Cloudflare Access on `/data/` path
- [ ] **4.C.5** Push to `main` branch
- [ ] **4.C.6** Verify deployment at https://dementia.cyrilsebastian.com
- [ ] **4.C.7** Test all 10 charts on prod
- [ ] **4.C.8** Test on mobile
- [ ] **4.C.9** Test dark mode

### 4.D — SEO + About page

- [ ] **4.D.1** Write `/about` page with all data sources, dates, licenses
- [ ] **4.D.2** Add methodology note on LASI survey weights
- [ ] **4.D.3** Add Open Graph meta tags to `index.html`
- [ ] **4.D.4** Generate `og-preview.png` from a chart screenshot
- [ ] **4.D.5** Write `sitemap.xml` — 3 pages: / · /india · /global
- [ ] **4.D.6** Write `robots.txt` — allow all

### 4.E — GitHub Wiki setup

- [ ] **4.E.1** Enable GitHub Wiki on repository
- [ ] **4.E.2** Clone wiki: `git clone https://github.com/cyrilsebastian/dementia-india.wiki.git`
- [ ] **4.E.3** Copy `PLAN.md` and `PROGRESS.md` to wiki
- [ ] **4.E.4** Create `wiki/context/llm-context.md` (see PLAN.md → GitHub Wiki as LLM Memory)
- [ ] **4.E.5** Create `wiki/data-sources/` folder with one file per source
- [ ] **4.E.6** Create `wiki/emails/` folder — log sent date, response date per email
- [ ] **4.E.7** Create `wiki/decisions/` folder — stack-choice · scraping-policy · csv-schemas
- [ ] **4.E.8** Write GitHub Action to sync `wiki/` folder → GitHub Wiki on push

### 4.F — Blog post

- [ ] **4.F.1** Draft outline on `tech.cyrilsebastian.com`
- [ ] **4.F.2** Write full post
- [ ] **4.F.3** Publish
- [ ] **4.F.4** Share on LinkedIn · X · Bluesky

---

## Ongoing — Email Tracking Log

| Subject | Sent to | Date sent | Date response | Status | Notes |
|---|---|---|---|---|---|
| `LASI Wave 1 Data Request — Dementia Visualisation Project` | IIPS | ___ | ___ | Waiting | |
| `Data Request — Dementia India 2020 Report — Open Data Project` | info@alzheimer.org.in | ___ | ___ | Waiting | |
| `State-wise Neurologist Data Request — Health Data Visualisation Project` | ian@indianneurology.com | ___ | ___ | Waiting | |

**How to use email tracking with Claude:**  
Share the subject line from the table above and say "generate the email content". Claude will produce the full email from the template in PLAN.md. Update this table when responses arrive.

---

## Ongoing — Decision Log

| Date | Decision | Rationale |
|---|---|---|
| ___ | ECharts over D3 | Faster, built-in choropleth, dark mode, PNG export |
| ___ | Static CSVs over database | Zero server cost, Cloudflare Pages, simpler infra |
| ___ | Code on GitHub, CI on GitLab | GitHub for open collaboration, GitLab for CI/CD |
| ___ | Staging on .in, prod on .com | Both already owned and under Cloudflare |
| ___ | Survey weights applied in lasi.go | Unweighted aggregation gives wrong prevalence |
| ___ | WHO GDO separate from GBD CSV | Different units and semantics — mixing would confuse |

---

## Ongoing — Blockers

| Blocker | Since | Unblocked by |
|---|---|---|
| LASI microdata not yet received | Day 1 | Response from IIPS |
| IAN neurologist data unknown | Day 1 | Email response or manual count |

---

## Scraping Decision Log

> Update this when you check any site's robots.txt or ToS.

| Site | robots.txt | ToS says | Decision | Date checked |
|---|---|---|---|---|
| alzheimer.org.in | ___ | ___ | ___ | ___ |
| indianneurology.com | ___ | ___ | ___ | ___ |
| censusindia.gov.in | ___ | ___ | ___ | ___ |
