 # Project Dementia India — Master Plan

> **Living document.** Every section links to related sections.  
> Stored in: `github.com/cyrilsebastian/dementia-india/wiki/` (GitHub Wiki)  
> Code in: GitHub · Hosting in: GitLab CI → Cloudflare Pages  
> Staging: `dementia.cyrilsebastian.in` · Production: `dementia.cyrilsebastian.com`

---

## Table of Contents

- [Project Overview](#project-overview)
- [Repository & Wiki Architecture](#repository--wiki-architecture)
- [Infrastructure Map](#infrastructure-map)
- [Phase 0 — Data Collection](#phase-0--data-collection)
  - [Open Datasets on GitHub/GitLab](#open-datasets-on-githubgitlab)
  - [Manual Registration Sources](#manual-registration-sources)
  - [Email Templates](#email-templates)
  - [Data Scraping — Legal Framework](#data-scraping--legal-framework)
  - [Scraping Decision Matrix](#scraping-decision-matrix)
- [Phase 1 — Go Data Pipeline](#phase-1--go-data-pipeline)
- [Phase 2 — India Frontend](#phase-2--india-frontend)
- [Phase 3 — Global Frontend](#phase-3--global-frontend)
- [Phase 4 — Neurologist Data + Production Deploy](#phase-4--neurologist-data--production-deploy)
- [All 22 Data Points](#all-22-data-points)
- [CSV Schemas](#csv-schemas)
- [GitHub Wiki as LLM Memory](#github-wiki-as-llm-memory)

---

## Project Overview

A public-facing data visualisation platform for dementia statistics in India and globally.

| Item | Value |
|---|---|
| **Site (prod)** | dementia.cyrilsebastian.com |
| **Site (staging)** | dementia.cyrilsebastian.in |
| **Code repo** | github.com/cyrilsebastian/dementia-india |
| **CI/CD** | GitLab → Cloudflare Pages |
| **Stack** | Go · React · TypeScript · ECharts · Tailwind · Cloudflare Pages |
| **Data storage** | Static CSVs committed to repo (`data/processed/`) |
| **Timeline** | 8 weeks across 5 phases |
| **Personal context** | Built by a caregiver with first-hand dementia experience |

**Why this project matters:**  
8.8 million Indians over 60 live with dementia. 1 neurologist serves 5 million people. 10–15% of cases are ever diagnosed. This project makes that data visible, filterable, and shareable.

→ See [All 22 Data Points](#all-22-data-points) for the full visualisation plan.  
→ See [Phase 0](#phase-0--data-collection) for where to start today.

---

## Repository & Wiki Architecture

### Code lives on GitHub

```
github.com/cyrilsebastian/dementia-india/
├── cmd/
│   ├── fetch/main.go          # downloads + parses all data sources
│   ├── mock/main.go           # generates schema-valid synthetic data (unblocks UI Day 1)
│   ├── transform/main.go      # second-pass cleaning + derived columns
│   └── validate/main.go       # sanity checks before frontend consumes
├── internal/
│   ├── models/models.go       # shared structs — write first
│   ├── sources/
│   │   ├── gbd.go             # parses IHME GBD CSV
│   │   ├── who.go             # WHO GHO OData API client
│   │   └── lasi.go            # LASI microdata parser + survey weights
│   └── output/csv.go          # writes all processed CSVs
├── scripts/
│   ├── fetch_geojson.sh       # automated India GeoJSON download + normalization
│   └── extract_pdf_tables.py  # automated PDF table extractor
├── data/
│   ├── raw/                   # gitignored — downloaded source files
│   └── processed/             # committed — CSVs read by frontend
├── web/                       # React + Vite frontend
│   ├── src/
│   │   ├── context/           # FilterContext.tsx — shared filter state
│   │   ├── data/              # useCSV.ts — generic CSV loader hook
│   │   ├── charts/            # one component per chart type
│   │   └── pages/             # India / Global / About
│   └── public/
│       └── india-states.geojson
├── wiki/                      # mirrors GitHub Wiki (see below)
├── Makefile                   # single-command orchestrator (mock-data, validate, build)
├── .github/workflows/
│   ├── ci.yml                 # GitHub Actions: test + validate
│   ├── deploy.yml             # Cloudflare Pages staging/prod/preview deploy
│   └── wiki-sync.yml          # automated sync to GitHub Wiki repo
└── .gitlab-ci.yml             # GitLab: build + deploy to Cloudflare
```

### Wiki lives on GitHub Wiki

GitHub Wiki is a separate Git repo at `github.com/cyrilsebastian/dementia-india.wiki.git`. Clone it separately to edit locally, or edit in browser.

```
wiki/
├── Home.md                    # entry point — links to all pages
├── PLAN.md                    # this file (mirrored here)
├── PROGRESS.md                # checklist (mirrored from Obsidian)
├── data-sources/
│   ├── GBD.md                 # IHME GBD — what was downloaded, when, filters used
│   ├── LASI.md                # LASI registration status, column mapping notes
│   ├── WHO-GHO.md             # WHO API indicator codes discovered
│   └── Neurologists.md        # IAN/NSI data collection log
├── decisions/
│   ├── stack-choice.md        # why ECharts over D3, why Cloudflare Pages
│   ├── scraping-policy.md     # scraping decision matrix + legal rationale
│   └── csv-schemas.md         # canonical CSV column definitions
├── emails/
│   ├── IIPS-LASI.md           # email log: sent date, response date, file received
│   ├── IAN-neurologists.md    # email log
│   └── Alzheimers-India.md    # email log
└── context/
    └── llm-context.md         # LLM memory file — see section below
```

**Wiki sync workflow:**  
Edit in Obsidian → commit to `wiki/` folder in main repo → a GitHub Action copies it to the Wiki repo automatically. This keeps Obsidian, GitHub Wiki, and the repo all in sync.

---

## Infrastructure Map

```
GitHub (code + wiki)
    ↓ push to main
GitLab CI mirror
    ↓ .gitlab-ci.yml
    ├── Stage 1: go test ./...
    ├── Stage 2: npm ci + npm run build
    └── Stage 3: wrangler pages deploy
                ├── dementia.cyrilsebastian.in  (staging — branch: develop)
                └── dementia.cyrilsebastian.com (prod — branch: main)

DNS (Cloudflare — cyrilsebastian.com zone):
    dementia.cyrilsebastian.com   CNAME → <prod-project>.pages.dev
    dementia.cyrilsebastian.in    CNAME → <staging-project>.pages.dev

Data path:
    data/raw/*.csv (gitignored, downloaded manually or via make fetch)
        ↓ make transform
    data/processed/*.csv (committed, read by React frontend)
```

**GitLab mirror setup:**  
GitHub → Settings → Webhooks → add GitLab CI trigger, OR use GitLab's built-in "mirror repository" feature (Settings → Repository → Mirroring) to pull from GitHub automatically on every push.

**Secrets needed in GitLab CI/CD Variables:**
- `CLOUDFLARE_API_TOKEN` — Cloudflare API token with Pages:Edit permission
- `CLOUDFLARE_ACCOUNT_ID` — from Cloudflare dashboard

---

## Phase 0 — Data Collection

**Start here. Do this before writing any code.**  
Data collection is Phase 0 because LASI takes 2–5 days to arrive after registration. Start all emails and registrations on Day 1 so nothing blocks the pipeline work.

→ See [Progress Checklist](PROGRESS.md#phase-0--data-collection) for tick-off status.

---

### Open Datasets on GitHub/GitLab

These can be used immediately — no registration, no waiting.

#### 0. Automated Benchmark/Mock Generator (Day 1 Unblocker)
- **Tool:** `go run ./cmd/mock/main.go` or `make mock-data`
- **What it does:** Generates all 6 target CSV files adhering strictly to the schema, populated with published epidemiological anchors (Kerala ~9.2%, J&K ~11.0%, Delhi ~4.5%, India total ~8.8M, Lancet 2022 projections).
- **Benefit:** Frontend development (Phase 2 & 3) is **100% unblocked** from Day 1 and does not wait for LASI registration email or GBD downloads.

#### 1. open-numbers / GBD death rate data
- **Repo:** https://github.com/open-numbers/ddf--ihme--global_burden_disease_death_rate
- **What it has:** GBD 2016 cause-of-death rates including dementia, all countries, CSV format
- **License:** CC-BY (free to use with attribution)
- **Limitation:** GBD 2016 only — outdated but useful for trend baselines
- **Use for:** Initial pipeline testing before IHME 2021 download arrives
- **Clone:** `git clone https://github.com/open-numbers/ddf--ihme--global_burden_disease_death_rate`

#### 2. datameet / India Maps GeoJSON (Automated)
- **Automated script:** `bash scripts/fetch_geojson.sh` (or `make fetch-geojson`)
- **What it does:** Automatically downloads Survey of India / Datameet state polygon boundaries GeoJSON, normalizes properties (`name`, `state_name`, `state_code`), splits J&K and Ladakh, and outputs an optimized ~133 KB file to `web/public/india-states.geojson`.
- **License:** MIT
- **Use for:** India state choropleth map (mandatory dependency)

#### 3. Our World in Data — Dementia CSVs
- **URL:** https://github.com/owid/owid-datasets
- **Search for:** `dementia` in the datasets folder
- **What it has:** Country-level dementia prevalence, deaths, DALYs derived from GBD — already cleaned and normalised
- **License:** CC-BY
- **Use for:** Quick global comparison chart before full GBD pipeline is built
- **Direct CSV:** https://ourworldindata.org/grapher/share-of-population-with-dementia — has a CSV download button, no login needed

#### 4. WHO GHO OData API (no registration)
- **URL:** `https://ghoapi.azureedge.net/api`
- **What it has:** 35 Global Dementia Observatory indicators per country — policy flags (national plan Y/N), diagnostic availability, awareness programmes
- **Access:** Completely open, no API key, no login
- **Use for:** `global-who-policy.csv` — which countries have a dementia plan
- **Run:** `go run ./cmd/fetch/... -source who`

#### 5. World Bank Open Data API
- **URL:** `https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json`
- **What it has:** GDP per capita all countries all years — needed for the Hans Rosling bubble chart X-axis
- **License:** CC-BY 4.0
- **Access:** Completely open, no key needed
- **Add to:** `cmd/fetch/main.go` as `runWorldBank()` source

#### 6. TIHM Dataset (monitoring, not prevalence)
- **Repo:** https://github.com/PBarnaghi/TIHM-Dataset
- **Zenodo:** https://zenodo.org/record/8104765
- **What it has:** Remote health monitoring data — activity, sleep, physiology for people living with dementia
- **Use for:** Possible future feature — not needed for Phase 1–3

---

### Manual Registration Sources & Automated Extraction

These require a form, email, or login, or can be expedited using automated extraction.

#### IIPS — LASI Microdata
- **Register at:** https://iipsindia.ac.in/lasi - Jxcrl@0bXB2m@#v%o*@rmw3Up!M%YbEx
- **What to select:** Wave 1 · CSV format · Cognitive Assessment module
- **Wait:** 2–5 working days (use `make mock-data` while waiting!)
- **File to save as:** `data/raw/lasi_wave1_cognitive.csv`
- **Email tracking subject:** `LASI Wave 1 Data Request — Dementia Visualisation Project`
- → See [Email Templates — IIPS](#iips-lasi-data-request)

#### IHME GBD Results Tool
- **Register at:** https://vizhub.healthdata.org/gbd-results
- **Filters to set:**
  - Cause: Alzheimer's disease and other dementias
  - Measure: Prevalence · Deaths · DALYs · Incidence
  - Location: All countries + Global
  - Year: 1990–2021 (select all)
  - Age: All ages + all 60+ bands
  - Sex: Both · Male · Female
- **Wait:** Immediate download
- **License:** IHME Free Non-Commercial User Agreement — permitted for this project
- **File to save as:** `data/raw/gbd_2021_dementia.csv`
- **Email tracking subject:** N/A (no email needed, immediate download)

#### World Alzheimer Report 2023 (Automated Extraction)
- **Download at:** https://alzint.org/resource/world-alzheimer-report-2023/
- **Wait:** Immediate (PDF)
- **File to save as:** `data/raw/world_alzheimer_report_2023.pdf`
- **Automated table extraction:** `python3 scripts/extract_pdf_tables.py --input data/raw/world_alzheimer_report_2023.pdf --pages 12,18 --output data/raw/war2023_tables.csv`

#### Alzheimer's India NGO
- **Email:** info@alzheimer.org.in
- **Wait:** Unknown — could be 1–2 weeks
- **Email tracking subject:** `Data Request — Dementia India 2020 Report — Open Data Project`
- → See [Email Templates — Alzheimer's India](#alzheimers-india-data-request)

#### IAN Neurologist Directory & Published Literature (Phase 4)
- **Email:** ian@indianneurology.com
- **Literature Base:** Peer-reviewed neurological workforce studies in *Annals of Indian Academy of Neurology (AIAN)* / *Neurology India* provide state-level distribution benchmarks already integrated into `cmd/mock/main.go`
- **Email tracking subject:** `State-wise Neurologist Data Request — Health Data Visualisation Project`
- → See [Email Templates — IAN](#ian-neurologist-data-request)

---

### Email Templates

Share the subject line with your LLM context and the full email can be reproduced on demand.

---

#### IIPS LASI Data Request

**Subject:** `LASI Wave 1 Data Request — Dementia Visualisation Project`

```
To: [IIPS data request contact from their website]
Subject: LASI Wave 1 Data Request — Dementia Visualisation Project

Dear Sir/Madam,

I am writing to request access to the LASI (Longitudinal Aging Study in India) 
Wave 1 microdata for a non-commercial, open-access dementia data visualisation 
project.

Project: dementia.cyrilsebastian.com — a publicly accessible dashboard showing 
state-wise dementia prevalence, age-onset patterns, urban/rural divides, and 
the neurologist shortage across India. All data will be attributed to IIPS/LASI 
on the site and in the data sources page.

Data requested:
- LASI Wave 1 (field period 2017–2020)
- Format: CSV preferred
- Module: Cognitive Assessment (dementia status, CDR scores)
- Variables: state ID, age, sex, urban/rural, education, dementia status, 
  survey weight

I have a personal connection to this issue as a caregiver for a family member 
with advanced dementia. This project aims to create public awareness about the 
scale of the problem in India.

I am happy to sign any data use agreement required.

Regards,
Cyril Sebastian
cyril@cyrilsebastian.com
dementia.cyrilsebastian.com
```

---

#### Alzheimer's India Data Request

**Subject:** `Data Request — Dementia India 2020 Report — Open Data Project`

```
To: info@alzheimer.org.in
Subject: Data Request — Dementia India 2020 Report — Open Data Project

Dear Team,

I am building an open-access dementia data visualisation platform at 
dementia.cyrilsebastian.com — a publicly accessible dashboard that will 
display India's dementia burden by state, compare it with global figures, 
and highlight the neurologist shortage.

I am writing to request the underlying data from the Dementia India 2020 
Report in CSV or Excel format, if available. The PDF report has been 
invaluable but structured data would allow us to include the historical 
2010 and 2020 baselines in the visualisation, with full attribution to 
Alzheimer's India.

All data will be clearly credited on the site with a link to your organisation. 
The project is entirely non-commercial and built by a caregiver.

Would you be able to share the data, or point me to where it can be accessed?

Thank you for the work Alzheimer's India does. 

Regards,
Cyril Sebastian
cyril@cyrilsebastian.com
dementia.cyrilsebastian.com
```

---

#### IAN Neurologist Data Request

**Subject:** `State-wise Neurologist Data Request — Health Data Visualisation Project`

```
To: ian@indianneurology.com
Subject: State-wise Neurologist Data Request — Health Data Visualisation Project

Dear Secretary General / Team,

I am building an open-access health data platform at 
dementia.cyrilsebastian.com that visualises dementia statistics across 
India, including a neurologist availability map showing the severe 
mismatch between patient numbers and specialist availability.

To make this map accurate, I am writing to request aggregate (non-personal) 
data on IAN membership by state:

1. Total IAN registered neurologists per state/UT
2. Count of members with subspecialty in cognitive/behavioural neurology 
   (if available from your records)
3. The year the data refers to

No individual member information is needed — only state-level totals.

This data will be used solely to visualise the neurologist-to-patient ratio 
per state, which we believe is critical information for policymakers and 
the public to understand. Full attribution to IAN will be included on the site.

I am happy to share a preview of the visualisation before publishing.

Regards,
Cyril Sebastian
cyril@cyrilsebastian.com
dementia.cyrilsebastian.com
```

---

### Data Scraping — Legal Framework

This is the honest, researched picture. No shortcuts, no hand-waving.

#### What Indian law actually says

The legality of data scraping in India is a grey area, primarily governed by principles under the Information Technology Act, 2000 and the Copyright Act, 1957. There is no explicit law in India that either permits or prohibits web scraping.

Violating the terms of use prohibiting data scraping will be a violation of contract law. It will also violate the Information Technology Act, 2000, which penalises unauthorised access to a computer resource or extracting data from a computer resource without the owner's permission. However, it can be argued that the penalty under the IT Act does not apply to scraping of publicly available information.

More recently, in response to questions raised in the Indian parliament, the government claimed that intermediaries who scrape publicly available data may be in breach of section 43 of the IT Act. This provision penalises unauthorised access to computer systems.

**Summary of the legal position:**
- No outright ban on scraping public, non-personal data in India
- ToS violation = contract breach = possible civil action (not criminal unless you cause server damage)
- Personal data (names, contact details) = DPDP Act applies = do not scrape
- Government/public interest data = lowest risk, courts have been sympathetic
- The IT Act Section 43 risk is real but applies mainly to server-burdening crawls or data that circumvents access controls

#### Safe scraping principles (when you do it)

1. **Only scrape what is publicly visible** — no login bypass, no API rate-limit circumvention
2. **Always check `robots.txt` first** — `https://site.com/robots.txt` — if it disallows your path, do not scrape
3. **Respect `Crawl-delay`** — add 2–5 seconds between requests, never flood a server
4. **Scrape aggregate/statistical data only** — never personal information (names, contact details, addresses)
5. **Store nothing personal** — even if you accidentally receive it, do not write it to disk
6. **Identify yourself in the User-Agent header** — `User-Agent: DementiaIndia-DataBot/1.0 (+https://dementia.cyrilsebastian.com)`
7. **Document your scraping in `wiki/decisions/scraping-policy.md`** — shows good faith if ever questioned
8. **Prefer APIs and official downloads** — scraping is always the last resort, not the first

---

### Scraping Decision Matrix

| Source | What you want | robots.txt status | Personal data? | Decision | Method |
|---|---|---|---|---|---|
| WHO GHO | Policy indicators | N/A — official API exists | No | **USE API** | `who.go` already built |
| IHME GBD | Prevalence data | N/A — official download exists | No | **DOWNLOAD** | Manual one-time download |
| Our World in Data | Country prevalence | Allows crawlers | No | **SAFE TO SCRAPE** | Or use their CSV export directly |
| Alzheimer's India (alzheimer.org.in) | 2010/2020 baselines | Check before scraping | No | **EMAIL FIRST** — scrape only if no response in 2 weeks | Go HTTP client |
| IAN Member Directory (indianneurology.com) | State member counts | **Check ToS carefully** | No (aggregate only) | **EMAIL FIRST** — manual count if no response | Manual count only |
| NMC (National Medical Commission) | Doctor registration data | Likely allows | No | **CHECK API first** at nmc.org.in | Go HTTP if API available |
| Census India (censusindia.gov.in) | Population denominators | Government — open | No | **SAFE** | Direct CSV download from data.gov.in |
| PubMed / PMC | Research citations | Allows via E-utilities API | No | **USE API** | `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/` |
| Dementia Statistics Hub (UK) | UK/global stats | Allows | No | **SAFE** | Direct CSV downloads at dementiastatistics.org |

#### For Alzheimer's India — the safe scrape approach (after 2-week email silence)

```go
// Only if email gets no response after 2 weeks
// Only scrape the public data pages — not member pages
// Identify the bot clearly

req, _ := http.NewRequest("GET", "https://alzheimer.org.in/dementia-india", nil)
req.Header.Set("User-Agent", "DementiaIndia-DataBot/1.0 (+https://dementia.cyrilsebastian.com; research use; contact cyril@cyrilsebastian.com)")

// Add 3-second delay between any subsequent requests
time.Sleep(3 * time.Second)
```

**Do not scrape IAN member directory at any point.** The list contains member names and potentially contact details — that is personal data under DPDP Act 2023. State-level aggregate counts are fine manually; personal member records are not.

---

## Phase 1 — Go Data Pipeline

**Target: Weeks 1–2**  
→ See [Phase 1 in Progress Checklist](PROGRESS.md#phase-1--go-data-pipeline)

Build the full pipeline before touching the frontend. `make data` must run end-to-end cleanly before starting Phase 2.

### File-by-file plan

#### `internal/models/models.go`
Write first. All other packages import from here. Defines four structs: `CountryRecord`, `StateRecord`, `NeurologistRecord`, `ProjectionRecord`.

#### `internal/sources/gbd.go`
- Input: `data/raw/gbd_2021_dementia.csv`
- Maps columns by header name (not position — IHME reorders sometimes)
- `isoCodeFromGBDName()` maps country names → ISO-3
- Skips regional aggregates

#### `internal/sources/who.go`
- WHO GHO OData API client
- `DiscoverDementiaIndicators()` — run once interactively to list codes
- 500ms pause between calls

#### `internal/sources/lasi.go`
- Input: `data/raw/lasi_wave1_cognitive.csv`
- **Critical:** apply survey weights before aggregating
- Aggregate: state × urban/rural × sex × age group × education
- After receiving the CSV, verify column names match constants at top of file
- Validation: Kerala should output ~9.2% prevalence

#### `internal/sources/worldbank.go` *(new — for Hans Rosling chart)*
- Input: World Bank API `https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json`
- Output: GDP per capita per country per year → `data/processed/gdp-per-capita.csv`

#### `internal/output/csv.go`
- `WriteCountryCSV()` · `WriteStateCSV()` · `WriteNeurologistCSV()` · `WriteProjectionCSV()`
- All to `data/processed/`

#### `cmd/fetch/main.go`
```bash
go run ./cmd/fetch/... -source all      # everything
go run ./cmd/fetch/... -source gbd      # GBD CSV only
go run ./cmd/fetch/... -source who      # WHO API only
go run ./cmd/fetch/... -source lasi     # LASI CSV only
go run ./cmd/fetch/... -source worldbank # GDP data
go run ./cmd/fetch/... -source owid     # Our World in Data fallback
```

#### `cmd/transform/main.go`
- Filter GBD to `sex=Both` + `age=All ages` for headline defaults
- Build `projections.csv` from Lancet 2022 published numbers (hardcoded with source)
- Add `country_region` column (Asia / Europe / Americas / Africa / Oceania)
- Generate `summary-stats.csv` (4 India headline stat cards)
- Compute `neurologist_per_million` derived column

#### `cmd/validate/main.go`
- India prevalence per state: 4–12%
- No country with 0 cases for 2019
- ISO-3 codes exactly 3 characters
- Projection values monotonically increase 2019→2030→2050
- All required output CSVs exist and non-empty
- Exit code 1 if any check fails (CI catches this)

#### Makefile
```makefile
make fetch       # all sources
make transform   # cleaning + derived columns
make validate    # sanity checks
make data        # fetch + transform + validate
make build       # data + npm run build
make deploy      # build + wrangler pages deploy (prod)
make deploy-staging  # build + wrangler pages deploy (staging)
make test        # go test ./...
make clean       # remove processed CSVs + web/dist
```

#### Tests (`go test ./...`)
Use `testdata/` folder with 5-row CSVs matching real format. Test:
- `parseGBDRow()` — column mapping, missing fields
- `ageGroupFromAge()` — boundaries: 59→under60, 60→60-64, 85→85+
- `isoCodeFromGBDName()` — known + unknown
- `normaliseSex()` — all variants
- `ParseLASICSV()` — weighted prevalence spot-check

---

## Phase 2 — India Frontend

**Target: Weeks 3–5**  
→ See [Phase 2 in Progress Checklist](PROGRESS.md#phase-2--india-frontend)

### Scaffold

```bash
npm create vite@latest web -- --template react-ts
cd web
npm install echarts echarts-for-react papaparse @types/papaparse tailwindcss
npx tailwindcss init
```

Key files to create first:
- `src/context/FilterContext.tsx` — global filter state (year, sex, urban/rural)
- `src/data/useCSV.ts` — generic PapaParse hook
- `src/components/FilterBar.tsx` — sticky top bar

### Charts (in build order)

| Step | Chart | Data file | Chart type | Key feature |
|---|---|---|---|---|
| 2.2 | India state choropleth | india-states.csv | ECharts geo | Click state → drill down |
| 2.3 | Age-onset grouped bar | india-states.csv | ECharts bar grouped | State dropdown filter |
| 2.4 | Urban vs rural diverging | india-states.csv | ECharts bar diverging | Sorted by rural desc |
| 2.5 | Education gradient | india-states.csv | ECharts line + scatter | CI ribbon |
| 2.6 | Stat cards (4) | summary-stats.csv | React cards | Updates with filters |
| 2.7 | India projection | projections.csv | ECharts area + CI | Solid/dashed at 2021 |
| 2.8 | Shared filter bar | — | React | ECharts connect() |
| 2.9 | Dark mode + export | — | Tailwind + ECharts | PNG/SVG export per chart |
| 2.10 | Deploy to staging | — | GitLab CI | dementia.cyrilsebastian.in |

**The feature that makes it a data product, not a collection of charts:**  
ECharts `connect()` API in step 2.8 — one filter change updates all charts simultaneously.

---

## Phase 3 — Global Frontend

**Target: Weeks 5–6**  
→ See [Phase 3 in Progress Checklist](PROGRESS.md#phase-3--global-frontend)

### Charts (in build order)

| Step | Chart | Data file | Chart type | Key feature |
|---|---|---|---|---|
| 3.1 | Hans Rosling bubble | global-countries.csv + gdp-per-capita.csv | ECharts scatter animated | Play/pause year slider |
| 3.2 | 10-country grouped bar | global-countries.csv | ECharts bar grouped | Measure toggle |
| 3.3 | World choropleth | global-countries.csv | ECharts world map | Year-animated |
| 3.4 | Multi-country projections | projections.csv | ECharts line multi | Dashed after 2021 |
| 3.5 | Country detail panel | global-countries.csv + global-who-policy.csv | React side panel | Click any chart |
| 3.6 | Rising countries callouts | global-countries.csv + projections.csv | React cards | Links to chart views |

**Countries in scope for global view:**  
India · China · Indonesia · USA · UK · Australia · Japan · Brazil · Nigeria · Germany · Pakistan · Bangladesh · France · Italy · South Korea

---

## Phase 4 — Neurologist Data + Production Deploy

**Target: Weeks 7–8**  
→ See [Phase 4 in Progress Checklist](PROGRESS.md#phase-4--neurologist-data--production-deploy)

### Neurologist data collection

1. **Check email response** from IAN (sent in Phase 0)
2. **Fallback:** Manual count from IAN directory (3 hours, all 28 states + 8 UTs)
   - URL: https://www.indianneurology.com/member-directory
   - Count by state, record in `data/raw/neurologists-manual.csv`
   - `cog_behav_neuro = 0` unless subspecialty is visible on profile page

### Production deploy checklist

```bash
wrangler pages project create dementia-india-prod
```

- Build: `npm run build` · Output: `web/dist`
- Custom domain: `dementia.cyrilsebastian.com`
- DNS in Cloudflare: CNAME `dementia` → `<prod-project>.pages.dev`
- Enable Cloudflare Access on `/data/` path (free tier) — gates raw CSV downloads
- GitLab CI secrets: `CLOUDFLARE_API_TOKEN` · `CLOUDFLARE_ACCOUNT_ID`

### `.gitlab-ci.yml` (production version)

```yaml
stages: [test, build, deploy-staging, deploy-prod]

test:
  stage: test
  script: go test ./...

build:
  stage: build
  script:
    - cd web && npm ci && npm run build
  artifacts:
    paths: [web/dist]

deploy-staging:
  stage: deploy-staging
  script:
    - wrangler pages deploy web/dist --project-name dementia-india-staging
  only: [develop]

deploy-prod:
  stage: deploy-prod
  script:
    - wrangler pages deploy web/dist --project-name dementia-india-prod
  only: [main]
```

### About page + SEO

`web/index.html`:
```html
<meta property="og:title" content="Dementia in India — Data & Visualisation" />
<meta property="og:description" content="8.8 million Indians live with dementia. Explore state-wise prevalence, global comparisons, and the neurologist shortage." />
<meta property="og:image" content="/og-preview.png" />
```

About page must include:
- All data sources, URLs, access dates, licenses
- Methodology note on LASI survey weights
- Your name and caregiving motivation
- Public GitHub repo link

### Blog post

**Publish after Phase 4 is stable.**  
Title: *"Building a dementia data dashboard with Go + ECharts + Cloudflare Pages"*  
Publish on: `tech.cyrilsebastian.com`  
This is your Docker Captain / CNCF Ambassador content.

---

## All 22 Data Points

| # | Data point | What it shows | Source | CSV | Priority |
|---|---|---|---|---|---|
| D01 | India state prevalence map | State-wise dementia % among 60+ | LASI Wave 1 | india-states.csv | **P1** |
| D02 | Age-onset by sex | Prevalence by 5-yr band, M vs F | LASI Wave 1 | india-states.csv | **P1** |
| D03 | Urban vs rural | Rural 1.5–2× higher consistently | LASI Wave 1 | india-states.csv | **P1** |
| D04 | Education gradient | No education = 3× risk | LASI Wave 1 | india-states.csv | **P1** |
| D05 | India projection | 8.8M (2020) → 17.6M (2050) | GBD 2021 + Lancet 2022 | projections.csv | **P1** |
| D06 | India diagnosis rate | ~10–15% of cases diagnosed | WHO GDO + ADI 2023 | global-who-policy.csv | **P1** |
| D07 | State case count | Absolute patients per state | LASI + Census | india-states.csv | **P1** |
| D08 | J&K vs Delhi | Highest vs lowest state | LASI Wave 1 | india-states.csv | **P1** |
| D09 | 10-country bar | India vs 9 key countries | GBD 2021 | global-countries.csv | **P1** |
| D10 | Hans Rosling bubble | GDP vs prevalence, animated | GBD 2021 + World Bank | global-countries.csv | **P1** |
| D11 | Neurologist per million | Most states < 1 per million | IAN directory | neurologists.csv | P2 |
| D12 | Neurologist desert map | State-level care gap | IAN directory | neurologists.csv | P2 |
| D13 | World choropleth | 204 countries, year-animated | GBD 2021 | global-countries.csv | P2 |
| D14 | Multi-country projections | 1990→2050 per country | GBD + Lancet 2022 | projections.csv | P2 |
| D15 | N.Africa/ME callout | +367% cases by 2050 | Lancet 2022 | projections.csv | P2 |
| D16 | China burden | 23.6% of global burden | China AD Report + GBD | global-countries.csv | P2 |
| D17 | Cog/behav specialist gap | ~50–80 specialists nationally | IAN manual | neurologists.csv | P3 |
| D18 | National dementia plan | Y/N per country | WHO GDO API | global-who-policy.csv | P3 |
| D19 | Gender gap globally | Women:Men = 1.69 | Lancet 2022 | global-countries.csv | P3 |
| D20 | Economic cost | Global $1.3T in 2019 | WHO 2020 | summary-stats.csv | P3 |
| D21 | Caregiver burden | 5 hrs/day global avg | WHO 2020 | summary-stats.csv | P3 |
| D22 | Risk factors radar | Education, obesity, smoking, BP | Lancet 2020 | global-countries.csv | P3 |

---

## CSV Schemas

All files in `data/processed/`. Canonical definitions — do not change column names without updating `csv-schemas.md` in wiki.

→ Full schemas in [wiki/decisions/csv-schemas.md](decisions/csv-schemas.md)

**Quick reference:**

| File | Key columns |
|---|---|
| india-states.csv | state_code, sex, urban, age_group, education, prevalence_pct, lower, upper |
| global-countries.csv | country_code, year, sex, age_group, measure, value, lower, upper, unit |
| projections.csv | country_code, year, cases, lower, upper, source |
| neurologists.csv | state_code, total_neurologists, cog_behav_neuro, neurologist_per_million |
| global-who-policy.csv | indicator_code, country_code, year, value_text, value_numeric |
| gdp-per-capita.csv | country_code, year, gdp_usd |

---

## GitHub Wiki as LLM Memory

The wiki folder contains `context/llm-context.md` — a structured file that gives any LLM (Claude, GPT, etc.) instant project context without re-reading the whole codebase.

**File: `wiki/context/llm-context.md`**

```markdown
# LLM Context — Project Dementia India

## What this project is
Open dementia data visualisation. Code: github.com/cyrilsebastian/dementia-india
Sites: dementia.cyrilsebastian.com (prod) / dementia.cyrilsebastian.in (staging)

## Stack
Go (data pipeline) · React + TypeScript · ECharts · Tailwind · Cloudflare Pages
CI/CD: GitLab → Cloudflare Pages. Code on GitHub, mirrored to GitLab for CI.

## Current phase
[UPDATE THIS LINE when phase changes]
Phase: 0 — Data Collection

## Data sources status
- [ ] LASI: registration submitted YYYY-MM-DD, waiting
- [ ] GBD 2021: downloaded YYYY-MM-DD, at data/raw/gbd_2021_dementia.csv
- [ ] WHO GHO: fetched via API, at data/processed/global-who-policy.csv
- [ ] World Bank GDP: fetched via API
- [ ] WAR 2023 PDF: downloaded, key tables extracted manually
- [ ] Alzheimer's India: email sent YYYY-MM-DD
- [ ] IAN neurologists: email sent YYYY-MM-DD

## Key decisions made
- ECharts over D3 (faster to build, built-in choropleth, dark mode)
- Static CSVs committed to repo (no database, zero server cost)
- Cloudflare Pages free tier (no server needed)
- Survey weights applied in lasi.go before any aggregation
- WHO GDO indicators kept separate from GBD epi data (different CSV)

## CSV schemas (column names are stable — do not rename)
- india-states.csv: state_code, sex, urban, age_group, education, prevalence_pct, lower, upper, est_cases, population
- global-countries.csv: country_code, country_name, year, sex, age_group, measure, value, lower, upper, unit, source
- projections.csv: country_code, year, cases, lower, upper, source
- neurologists.csv: state_code, total_neurologists, cog_behav_neuro, neurologist_per_million, patient_per_neurologist

## Email tracking subjects (share with Claude to get email content)
- LASI request: "LASI Wave 1 Data Request — Dementia Visualisation Project"
- Alzheimer's India: "Data Request — Dementia India 2020 Report — Open Data Project"
- IAN: "State-wise Neurologist Data Request — Health Data Visualisation Project"

## Active blockers / waiting on
[UPDATE THIS SECTION as things change]

## Completed
[UPDATE THIS SECTION as things complete]
```

**How to use this with Claude:**  
Paste the content of `llm-context.md` at the start of any new conversation. Claude can then answer questions about the project, generate code that matches the established patterns, and track decisions without re-explaining everything. Update the file after each significant decision or phase completion.
