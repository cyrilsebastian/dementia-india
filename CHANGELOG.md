# Changelog

All notable changes to Project Dementia India will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## Recent Commit History (Last 15 Changes)

### 1. `98cb85d` (2026-09-20) - Live Status Monitoring
- **feat(web)**: Added a direct Status portal link in the global footer pointing to `status.cyrilsebastian.com` with a live emerald pulse indicator for real-time uptime visibility.

### 2. `35327d2` (2026-09-19) - Family Guide Hero Balancing
- **fix(family-guide)**: Re-architected the Family Guide hero section into a balanced 2-column layout (7-column hero message and 5-column immediate helpline shortcuts) with direct toll-free links to 14567 and 14416.

### 3. `a4600af` (2026-09-19) - Helplines, Header Balancing and Style Guide
- **feat(web)**: Updated top helpline to National Elderline 14567 across all navigation components and pages.
- Balanced navigation headers across desktop and mobile.
- Fixed inline citation links across medical claims.
- Removed artificial em-dashes across all documentation and UI copy to preserve a natural tone.

### 4. `df7bd6a` (2026-09-18) - Content Expansion & Clinical Compliance Auditor
- **feat(content)**: Added 6 major content sections across Advance Planning, Brain Health, and Research pages.
- Created `compliance_auditor` persona and automated compliance audit script (`scripts/audit_compliance.py`) to enforce zero pharmaceutical mentions and mandatory citations.
- Restructured Family Guide navigation into categorized caregiver stages.

### 5. `2ecd06b` (2026-09-12) - Mobile Responsiveness & Drawer Layout
- **feat(web)**: Overhauled mobile responsiveness across the entire portal.
- Implemented slide-down navigation drawer with categorized section clusters.
- Added responsive card wrapping and fluid typography across directory and filter panels.

### 6. `21b252a` (2026-09-10) - Reach Out Portal & Newsletter Subscription
- **feat(web)**: Created the Reach Out portal (`/reach-out`) with category routing for caregivers, researchers, institutions, and data inquiries using Web3Forms.
- Integrated Brevo newsletter subscription modal with double opt-in handling and local dismissal persistence.

### 7. `9f8cf42` (2026-09-08) - Medication Guidance Safety Refactor
- **refactor(guide)**: Replaced Family Guide FAQ Q3 medication text with clinical safety guidance strictly redirecting families to qualified cognitive neurologists and memory clinics.

### 8. `2452eac` (2026-09-07) - Caregiver Roadmap & Analytics
- **feat(guide)**: Built comprehensive Family Guide caregiver roadmap covering warning signs, diagnosis preparation, home safety, and daily routines.
- Integrated Cloudflare Web Analytics beacon for privacy-preserving visitor telemetry.

### 9. `84284f8` (2026-09-07) - SEO & Structured Data Suite
- **feat(seo)**: Added `seo_auditor` persona, automated SEO audit directive (`directives/seo_audit.md`), sitemap.xml, robots.txt, and Schema.org JSON-LD structured data for public health search discovery.

### 10. `9749329` (2026-09-07) - Young-Onset Dementia Citation Fix
- **fix(global)**: Updated Young-Onset Dementia body text and source citation to Zhang et al. (2025) in `YoungOnsetCallout.tsx`.

### 11. `a61da7a` (2026-09-07) - Global Dashboard Visualizations
- **feat(global)**: Added metric explanation tooltips with Lancet Commission DOIs.
- Added 10-nation care infrastructure benchmark.
- Implemented dementia subtypes interactive donut chart and young-onset callout card.

### 12. `0489b09` (2026-09-07) - Global Dementia Intelligence Pipeline
- **feat(global)**: Implemented global intelligence dashboard (`/global`) with WHO and GBD 2021 analytics across 195+ countries.
- Added Rosling bubble chart, choropleth map, and longitudinal projections through 2050.

### 13. `979038f` (2026-09-06) - UI Polish & Specialist Registry Data
- **feat**: Polished UI themes, refreshed specialist registry dataset, redesigned budget waterfall cascade, and refined state filter bar with mobile drawer support.

### 14. `c29e2a6` (2026-09-05) - Architecture Documentation
- **docs(plans)**: Documented system architecture, multi-tiered data flow, and 16 action items for subsequent iteration in `plans/2026-09-06_architecture_and_iterations.md`.

### 15. `3b20248` (2026-09-04) - Care Directory Error Handling
- **fix(web)**: Prevented null reference errors during multi-parameter care directory searches and filtered state queries.

---

## Release Milestones

## [Unreleased]

### Added
- Comprehensive internationalization (i18n) framework powered by `react-i18next` with modular namespaces (`common`, `guide`, `helplines`).
- Multi-language localization across 12 Indian languages:
  - English (`en`)
  - Tier 1: Hindi (`hi` - हिन्दी), Tamil (`ta` - தமிழ்), Kannada (`kn` - ಕನ್ನಡ)
  - Tier 2: Telugu (`te` - తెలుగు), Bengali (`bn` - বাংলা), Marathi (`mr` - मराठी), Malayalam (`ml` - മലയാളം)
  - Tier 3: Gujarati (`gu` - ગુજરાતી), Punjabi (`pa` - ਪੰਜਾਬੀ), Odia (`or` - ଓଡ଼ିଆ), Assamese (`as` - অসমীয়া)
- Global navigation headers, page titles, footer, clinical disclaimers, and Family Guide localized reactively across all 12 languages.
- Cross-lingual clinical medical glossary (`data/translations/medical_glossary.json`) mapping clinical terminology and enforcing strict zero-pejorative-vocabulary constraints across all 12 languages.
- Translation protocol directive (`directives/translate_locale.md`) and community translation guide (`CONTRIBUTING_TRANSLATIONS.md`).
- Navbar language switcher dropdown with native script names, English sublabels, smooth scrolling, and local storage persistence.

## [0.4.0] - 2026-09-20

### Added
- Dedicated Status portal link in the footer connecting to live uptime monitoring (`status.cyrilsebastian.com`).
- Reach Out portal (`/reach-out`) with category routing for caregivers, researchers, institutions, and data reports via Web3Forms.
- Brevo newsletter subscription modal with 7-minute engagement trigger and persistent local dismissal.
- Comprehensive Family Guide with step-by-step caregiver roadmap, 10 warning signs, daily care protocols, and stage transitions.
- Cloudflare Web Analytics beacon integration for privacy-preserving visitor telemetry.
- Automated SEO suite: `seo_auditor` persona, automated directive, sitemap.xml, robots.txt, and Schema.org JSON-LD structured data.
- Automated clinical compliance audit script (`scripts/audit_compliance.py`) to enforce strict zero-drug-mention rules, mandatory citations, and verified disclaimers.

### Changed
- Elevated national elderly helpline 14567 (Elderline) to primary emergency position across the Family Guide and directory.
- Re-architected Family Guide hero into a balanced 2-column layout with immediate helpline shortcuts.
- Re-aligned navigation headers and updated FAQ items to clinical redirect guidelines.
- Standardized documentation style guide: removed artificial em-dashes across all public copy.

### Fixed
- Prevented layout shifts and horizontal scroll on mobile devices via responsive navigation drawer and fluid card layouts.
- Corrected Young-Onset Dementia citation metadata to Zhang et al. (2025).

## [0.3.0] - 2026-09-07

### Added
- Global Dementia Intelligence Dashboard (`/global`) comparing burden metrics across 195+ countries.
- Ten-Nation Care Infrastructure Benchmark highlighting international disparities in neurologist density and day-care facilities.
- Dementia Subtypes interactive donut chart breakdown (Alzheimer's disease, Vascular, Lewy Body, Frontotemporal).
- Young-Onset Dementia callout section emphasizing working-age diagnosis prevalence.
- Metric explanation tooltips across all global health indicators with Lancet Commission DOIs.

### Changed
- Refactored chart color system to neutral, clinical HSL palettes.
- Extracted reusable ECharts option builders for memory-efficient client-side rendering.

## [0.2.0] - 2026-09-04

### Added
- Interactive India State Choropleth map powered by normalized GeoJSON boundaries (`india-states.geojson`).
- Care Network Directory (`/care-network`) indexing ARDSI chapters, memory clinics, day-care centers, and helplines across Indian states.
- Health Spending waterfall and longitudinal mental health budget allocation charts (`/health-spending`).
- Specialist registry with state-level neurologist and geriatrician density indicators.
- Clinical and legal disclaimers integrated across pages and in the application footer.

### Changed
- Redesigned state filter bar into labeled clusters with dedicated mobile slide-over drawer.
- Integrated primary state dropdown synchronized across map, demographic charts, and care facilities.

### Fixed
- Resolved null reference errors during multi-parameter care directory searches.
- Handled edge cases for newly organized Union Territories in GeoJSON properties.

## [0.1.0] - 2026-09-04

### Added
- Initial project scaffolding with layered architecture (directives, personas, plans, execution scripts, and cost ledger).
- Deterministic Go data pipeline foundation (`cmd/pipeline`, `cmd/validate`).
- Synthetic mock data generator (`make mock-data`) unblocking frontend development.
- Automated GeoJSON retrieval script (`scripts/fetch_geojson.sh`) for Survey of India boundaries.
- Modern Vite, React 18, and Tailwind CSS frontend application setup.
- CI/CD workflow configurations for GitHub Actions and Cloudflare Pages.
