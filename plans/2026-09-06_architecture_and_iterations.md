# Project Dementia India — Architecture & Iteration Plan

## 1. System Architecture & Data Flow

```mermaid
flowchart TD
    subgraph Sources["1. Upstream Data Sources (Extraction Layer)"]
        LASI["LASI Wave 1 Microdata<br/>(IIPS / MoHFW)"]
        GBD["GBD 2021 Results<br/>(IHME VizHub)"]
        WHO["WHO GDO Metrics<br/>(Global Dementia Observatory)"]
        WB["World Bank API<br/>(GDP per Capita)"]
        GEO["Datameet / Survey of India<br/>(GeoJSON Shapefiles)"]
        IAN["IAN / Care Directories<br/>(Neurologists, ARDSI, Clinics)"]
        BUDGET["Union Health Budgets<br/>(PRS India / Open Budgets)"]
    end

    subgraph Pipeline["2. Deterministic Pipeline & Validation (Go 1.25)"]
        FETCH["scripts/fetch_geojson.sh<br/>scripts/extract_pdf_tables.py"]
        MODELS["internal/models/models.go<br/>(Canonical Data Structs)"]
        MOCK["cmd/mock/main.go<br/>(Benchmark Generator)"]
        OUT["internal/output/csv.go<br/>(Type-Safe CSV Serialization)"]
        VAL["cmd/validate/main.go<br/>(Integrity & Schema Sanity Suite)"]
    end

    subgraph Storage["3. Standardized Datasets (Storage Layer)"]
        INDIA_CSV["data/processed/india-states.csv"]
        GLOBAL_CSV["data/processed/global-countries.csv"]
        NEURO_CSV["data/processed/neurologists.csv"]
        SPEND_CSV["data/processed/health-spending.csv"]
        CLINICS_CSV["data/processed/memory-clinics.csv"]
        NGOS_CSV["data/processed/ngos.csv"]
        GEOJSON["web/public/india-states.geojson"]
    end

    subgraph Server["4. Edge & Dev Middleware (Vite)"]
        DEV_MW["Vite Dev Middleware<br/>(Streams /data/*.csv from disk)"]
        PROD_BUILD["Vite Build Plugin<br/>(Copies CSVs to dist/data/)"]
    end

    subgraph Client["5. Client Presentation Runtime (React 18 + TS)"]
        HOOK["useCSV Hook<br/>(In-memory Map Cache + PapaParse)"]
        CTX["FilterContext<br/>(State, Sex, Urban/Rural, Age)"]
        CHARTS["Apache ECharts 5.5<br/>(Choropleth, Bars, Waterfalls)"]
        VIEWS["App Views<br/>(India, Specialist, Spending, Network, Global)"]
    end

    %% Pipeline Connections
    GEO --> FETCH --> GEOJSON
    LASI & GBD & WHO & WB & IAN & BUDGET --> MOCK
    MODELS --> MOCK
    OUT --> MOCK
    MOCK --> INDIA_CSV & GLOBAL_CSV & NEURO_CSV & SPEND_CSV & CLINICS_CSV & NGOS_CSV
    INDIA_CSV & GLOBAL_CSV & NEURO_CSV & SPEND_CSV & CLINICS_CSV & NGOS_CSV --> VAL

    %% Serving Connections
    INDIA_CSV & GLOBAL_CSV & NEURO_CSV & SPEND_CSV & CLINICS_CSV & NGOS_CSV --> DEV_MW
    INDIA_CSV & GLOBAL_CSV & NEURO_CSV & SPEND_CSV & CLINICS_CSV & NGOS_CSV --> PROD_BUILD
    GEOJSON --> DEV_MW

    %% Client Consumption
    DEV_MW -.->|HTTP GET /data/*.csv| HOOK
    PROD_BUILD -.->|Static CDN /data/*.csv| HOOK
    GEOJSON -.->|fetch(/india-states.geojson)| CHARTS

    HOOK --> CHARTS
    CTX --> CHARTS
    CHARTS --> VIEWS
```

### Technology Stack Summary

| Component | Technology | Version | Purpose |
|---|---|---|---|
| **Pipeline Core** | Go | 1.25 | Deterministic dataset compilation, schema validation, and CSV export. |
| **Frontend Framework** | React | 18.3.1 | Component-based reactive user interface. |
| **Language** | TypeScript | 5.5.4 | End-to-end type safety for data models and chart configs. |
| **Build System** | Vite | 5.4.21 | Ultra-fast HMR dev server & production tree-shaking bundler. |
| **Styling** | Tailwind CSS | 3.4.10 | Utility-first responsive design, dark/light theme switching. |
| **Visualizations** | Apache ECharts | 5.5.1 | High-performance Canvas/SVG choropleths, grouped bars, and waterfalls. |
| **Data Parser** | PapaParse | 5.4.1 | In-browser CSV streaming, dynamic typing, and in-memory caching. |
| **Icons** | Lucide React | 0.439.0 | Minimalist iconography. |
| **Hosting & CI/CD** | Cloudflare Pages / GitHub Actions | — | Edge-cached static delivery, automated testing, and wiki sync. |

---

## 2. Action Items & Iteration Plan for Tomorrow

### Item 1: Column Sorting with Up/Down Arrows on Specialist Tables
- **File**: `web/src/pages/SpecialistPage.tsx`
- **Requirement**: Add bidirectional sorting (`asc` / `desc`) with Chevron icons on `Total Neurologists`, `Patients per Specialist`, `Per Million Pop`, and `State / UT`.
- **Implementation**:
  - Add state `sortKey: 'state' | 'total' | 'ratio' | 'density'` and `sortOrder: 'asc' | 'desc'`.
  - Display Lucide `ChevronsUpDown`, `ChevronUp`, or `ChevronDown` on active/inactive headers.
  - Sort copy of `neurologistData` before rendering table rows.

### Item 2: IIPS Data Request Status & Ingestion
- **URL**: `https://iipsindia.ac.in/content/data-request`
- **Context**: The International Institute for Population Sciences (IIPS) hosts LASI Wave 1 individual microdata.
- **Action for Tomorrow**:
  - Document the manual request workflow: Create researcher account on IIPS portal -> Select LASI Wave 1 -> Module: Cognitive Assessment & Health -> Request data download.
  - While institutional access is awaiting approval, verify our synthetic anchors match the published LASI Wave 1 National Report (Kerala 9.2%, J&K 11.0%, Delhi 4.5%, National 7.4%).

### Item 3: Alzheimer's Specific Disaggregation
- **Requirement**: Separate Alzheimer's Disease statistics from general dementia where available.
- **Implementation**:
  - ARDSI & GBD data indicates Alzheimer's constitutes 60–70% of total Indian dementia cases, with Vascular Dementia at ~15-20%, and Lewy Body / Frontotemporal making up the remainder.
  - Ingest etiology breakdown into `data/processed/india-states.csv` and add an etiology toggle (All Dementia vs. Alzheimer's Disease) in the FilterBar or on a dedicated etiology chart.

### Item 4: Urban vs. Rural Divergence — Single State Focus Filter
- **File**: `web/src/charts/UrbanRuralBar.tsx`
- **Requirement**: When a specific state is selected in the global `FilterContext`, the chart must isolate and display only that selected state vertically (or side-by-side) with clear visual emphasis, rather than rendering all other states.
- **Implementation**:
  - If `selectedState !== 'ALL'`, filter the dataset to `[selectedState]`, display a dedicated high-contrast side-by-side bar with percentage callouts, and render national benchmarks for comparison.

### Item 5: Freeze / Sticky Filter Bar on Scroll
- **File**: `web/src/components/FilterBar.tsx`
- **Requirement**: The filter pane must freeze/stick to the top of the viewport when scrolling through charts and tables.
- **Implementation**:
  - Wrap the filter bar container with `sticky top-16 z-30 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 shadow-sm`.

### Item 6: Prevent Horizontal Scrollbar in Header / Navigation
- **File**: `web/src/components/Navbar.tsx`
- **Requirement**: Eliminate horizontal scrollbars on the header title and navigation pills across all desktop/laptop resolutions.
- **Implementation**:
  - Adjust container padding (`max-w-7xl px-4 sm:px-6`), optimize font sizes, use flex wrap gracefully or reduce horizontal pill padding (`px-3 py-1.5`) so the navbar breathes without triggering horizontal overflow.

### Item 7: Daily Unpaid Caregiver Hours & Burden Metrics
- **Requirement**: Expand data and visualizations on informal family caregiver commitments.
- **Implementation**:
  - Ingest ARDSI 2020 / WHO benchmarks:
    - Average daily caregiving: **6.2 hours/day** (rising to 9.5 hours in moderate-to-severe stages).
    - Gender disparity: **72% female caregivers** (spouses, daughters, daughters-in-law).
    - Economic opportunity cost: ₹40,000–₹1,50,000/month in unpaid labor.
  - Create a dedicated "Caregiver Burden" insight card or bar in `CareNetwork.tsx`.

### Item 8: Icon-Only Buttons for Global Filters & Reset
- **File**: `web/src/components/FilterBar.tsx`
- **Requirement**: Remove text captions from "Global Filters" and "Reset" buttons; render clean icon-only buttons with accessible tooltip titles.
- **Implementation**:
  - Replace button text with `Filter` and `RotateCcw` icons from `lucide-react` with `p-2 rounded-lg` styling and `title="Reset Filters"` / `title="Filter Settings"`.

### Item 9: 10-Year Health Budget & Mental Health Expenditure Timeseries
- **File**: `data/processed/health-spending.csv` & `web/src/charts/MentalHealthTrend.tsx`
- **Requirement**: Provide a 10-year historical dataset (2014–2024) of Union Health Budget vs. Actual Spend, and specific allocations for the National Mental Health Programme (NMHP).
- **Implementation**:
  - Source data from Union Budget documents / PRS India: BE (Budget Estimates) vs. RE (Revised Estimates) vs. Actuals.
  - Render an interactive 10-year trend line showing total health budget vs. the sub-1% dedicated to mental health.

### Item 10: Granular Mental Health Fund Utilization Breakdown
- **File**: `web/src/pages/HealthSpending.tsx`
- **Requirement**: Identify and visualize where Government mental health allocations actually go.
- **Implementation**:
  - Add breakdown showing:
    1. Tertiary Apex Institutes (~70%): NIMHANS Bengaluru, LGBRIMH Tezpur, CIP Ranchi.
    2. District Mental Health Programme (DMHP) in 704 districts (~15%).
    3. Tele-MANAS national network infrastructure (~10%).
    4. Awareness, research, and modernization (~5%).

### Item 11: Free-of-Cost Healthcare Awareness Guide
- **File**: `web/src/pages/HealthSpending.tsx`
- **Requirement**: Add clear public awareness instructions on how citizens can access care free of cost.
- **Implementation**:
  - Detail public health entitlements:
    - **Ayushman Bharat (AB-PMJAY)**: Up to ₹5 Lakh/family/year for inpatient neurological/psychiatric admissions in empanelled hospitals.
    - **Ayushman Arogya Mandirs**: Free cognitive screening and basic neurological medications from State Essential Drug Lists.
    - **District Hospitals (DMHP)**: Free monthly psychiatric OPDs and subsidized medications.
    - **Tele-MANAS (14416)**: 24/7 toll-free multilingual tele-consultation.

### Item 12: Memory Clinics Audit & Directory Expansion
- **File**: `data/processed/memory-clinics.csv`
- **Requirement**: Expand beyond the current 9 apex centres to include memory clinics and cognitive neurology departments across all Indian states and tier-1/2 cities.
- **Implementation**:
  - Research and compile university medical colleges, government neuro-geriatric clinics, and accredited private memory centers in Mumbai, Bengaluru, Chennai, Delhi NCR, Kolkata, Hyderabad, Pune, Kochi, Chandigarh, and Ahmedabad.

### Item 13: Sortable Memory Clinics Table (Location Asc/Desc)
- **File**: `web/src/components/CareDirectory.tsx`
- **Requirement**: Enable bidirectional sorting by `Location` (City/State), `Centre Name`, and `Type` in the Memory Clinics directory.
- **Implementation**:
  - Add column sorting state and handlers to `CareDirectory.tsx`.

### Item 14: Comprehensive ARDSI Chapters & NGO Expansion
- **File**: `data/processed/ngos.csv`
- **Requirement**: Ingest all 24+ registered ARDSI chapters and major dementia advocacy NGOs.
- **Implementation**:
  - Complete chapter list: Calicut, Cochin, Trivandrum, Chennai, Hyderabad, Mumbai, Delhi, Kolkata, Bengaluru, Pune, Ahmedabad, Goa, Coimbatore, Lucknow, Mysore, Mangalore, Guwahati, etc.

### Item 15: Highlight 100% Free Government Support Helplines
- **File**: `web/src/components/HelplineCard.tsx` / `CareNetwork.tsx`
- **Requirement**: Distinctly label toll-free and 100% free government emergency contacts.
- **Implementation**:
  - Add a **"100% Free / Toll-Free"** badge for **Tele-MANAS (14416)**, **KIRAN (1800-599-0019)**, and **Elderline (14567)**.

### Item 16: Active Hyperlinks for All Data Sources & Citations
- **Files**: `web/src/components/ChartPanel.tsx`, `web/src/pages/AboutPage.tsx`
- **Requirement**: Every data source note, citation, and methodology reference must have an active, clickable hyperlink to its primary scientific/official source.
- **Implementation**:
  - Link IIPS (`https://iipsindia.ac.in`), GBD IHME (`https://vizhub.healthdata.org/gbd-results`), WHO GDO (`https://www.who.int/data/gho/data/themes/topics/dementia`), PRS India Budgets (`https://prsindia.org`), and ARDSI (`https://ardsi.org`).
