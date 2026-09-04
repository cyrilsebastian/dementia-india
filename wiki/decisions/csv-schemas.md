# Canonical CSV Schemas

All processed datasets are saved in `data/processed/`. Column names are stable and must not be modified without updating this document.

---

## 1. `india-states.csv`
- **Path:** `data/processed/india-states.csv`
- **Source:** LASI Wave 1 microdata / Benchmark generator
- **Columns:**
  - `state_code` (string, e.g. `IN-KL`, `IN-DL`)
  - `state_name` (string, e.g. `Kerala`, `Delhi`)
  - `sex` (string: `Both`, `Male`, `Female`)
  - `urban` (string: `All`, `Urban`, `Rural`)
  - `age_group` (string: `60+`, `60-64`, `65-69`, `70-74`, `75-79`, `80-84`, `85+`)
  - `education` (string: `All`, `None`, `Primary`, `Middle`, `Secondary`, `Higher`)
  - `prevalence_pct` (float: percentage with dementia)
  - `lower` (float: 95% CI lower bound)
  - `upper` (float: 95% CI upper bound)
  - `est_cases` (integer: estimated cases in demographic group)
  - `population` (integer: total subgroup population)

---

## 2. `global-countries.csv`
- **Path:** `data/processed/global-countries.csv`
- **Source:** IHME GBD 2021 / Our World in Data
- **Columns:**
  - `country_code` (string: ISO-3 uppercase, e.g. `IND`, `USA`, `CHN`)
  - `country_name` (string: e.g. `India`, `United States`)
  - `region` (string: `Asia`, `Europe`, `Americas`, `Africa`, `Oceania`)
  - `year` (integer: 1990–2021)
  - `sex` (string: `Both`, `Male`, `Female`)
  - `age_group` (string: `All ages`, `60+`)
  - `measure` (string: `Prevalence`, `Deaths`, `DALYs`, `Incidence`)
  - `value` (float: metric value)
  - `lower` (float: 95% uncertainty lower)
  - `upper` (float: 95% uncertainty upper)
  - `unit` (string: `Percent`, `Rate per 100k`, `Number`)
  - `source` (string: `GBD 2021`, `OWID`)

---

## 3. `projections.csv`
- **Path:** `data/processed/projections.csv`
- **Source:** Lancet Public Health 2022 / GBD 2021
- **Columns:**
  - `country_code` (string: ISO-3)
  - `country_name` (string)
  - `year` (integer: `2019`, `2030`, `2040`, `2050`)
  - `cases` (integer: total projected cases)
  - `lower` (integer: 95% UI lower bound)
  - `upper` (integer: 95% UI upper bound)
  - `source` (string)

---

## 4. `neurologists.csv`
- **Path:** `data/processed/neurologists.csv`
- **Source:** IAN Directory / AIAN & Neurology India workforce studies
- **Columns:**
  - `state_code` (string: `IN-XX`)
  - `state_name` (string)
  - `total_neurologists` (integer)
  - `cog_behav_neuro` (integer: subspecialists in cognitive/behavioral neurology)
  - `neurologist_per_million` (float)
  - `patient_per_neurologist` (integer)

---

## 5. `global-who-policy.csv`
- **Path:** `data/processed/global-who-policy.csv`
- **Source:** WHO Global Dementia Observatory (GDO) OData API
- **Columns:**
  - `indicator_code` (string, e.g. `GDO_PLAN_STATUS`)
  - `country_code` (string: ISO-3)
  - `year` (integer)
  - `value_text` (string: `Yes`, `No`, `In development`)
  - `value_numeric` (float: `1.0`, `0.0`, `0.5`)

---

## 6. `gdp-per-capita.csv`
- **Path:** `data/processed/gdp-per-capita.csv`
- **Source:** World Bank Open Data API (`NY.GDP.PCAP.CD`)
- **Columns:**
  - `country_code` (string: ISO-3)
  - `year` (integer: 1990–2021)
  - `gdp_usd` (float: current USD)

---

## 7. `summary-stats.csv`
- **Path:** `data/processed/summary-stats.csv`
- **Columns:**
  - `metric_id` (string)
  - `label` (string)
  - `value` (string)
  - `unit` (string)
  - `change_pct` (string)
  - `notes` (string)
