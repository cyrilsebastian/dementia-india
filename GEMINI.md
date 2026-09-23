# Agent Instructions: Project Dementia India

> Mirrored across CLAUDE.md, AGENTS.md, and GEMINI.md so the same instructions
> load in any AI environment (Antigravity, Claude Code, Gemini CLI, Cursor, etc).
> Edit AGENTS.md, then copy to CLAUDE.md and GEMINI.md:
> `cp AGENTS.md CLAUDE.md && cp AGENTS.md GEMINI.md`

## 1. Repository Identity & Architecture

This repository contains **only the hosted application code** for **Project Dementia India**, an open-source epidemiological data intelligence and caregiver navigation platform.

The universal agent personas and namespaced directives are maintained in the separate `agentic-template` repository (`~/Documents/git/github/agentic-template/`).

### Codebase Organization
- `cmd/`: Go deterministic pipeline executables (`mock`, `validate`, `transform`, `fetch`).
- `internal/`: Go models and domain packages (`models`, `output`, `sources`).
- `data/`: Processed benchmark CSV datasets (`data/processed/`).
- `web/`: React 18, Vite, TypeScript, and Tailwind CSS frontend application.
- `scripts/`: Operational scripts (`audit_compliance.py`, `extract_pdf_tables.py`, `fetch_geojson.sh`).
- `wiki/`: Architecture decisions, CSV schema contracts, and domain documentation.

---

## 2. Multi-Device Synchronization (Mac Mini & MacBook Air)

1. **Active Branch**: All work is coordinated on the `develop` branch.
2. **Pull Before Work**: Always verify git status and pull latest changes:
   ```bash
   git checkout develop
   git pull origin develop
   ```
3. **Push After Work**: Commit using conventional commits (`feat:`, `fix:`, `docs:`) and push to `origin develop`.
4. **Environment Secrets**: Secrets live strictly in `.env.local` (gitignored). When introducing new configuration keys, add placeholders to `.env.example`.

---

## 3. Non-Negotiable Operational Rules

### Rule 1: No Em-Dashes (—)
Never use em-dashes (—) in user-facing website copy, headers, or documentation. It feels artificial and AI-generated. Instead, use natural punctuation: colons (:), hyphens (-), commas, parentheses, or clear separate sentences.

### Rule 2: Clinical & Statutory Compliance
1. **Zero Pharmaceutical Mentions**: Strictly prohibit brand and generic drug names (e.g. Donepezil, Memantine, Galantamine, Rivastigmine, Aducanumab, Lecanemab, Donanemab) and dosage instructions anywhere on public pages.
2. **Neurologist Routing**: All diagnostic and symptom queries must direct users exclusively to qualified cognitive neurologists, geriatricians, and accredited memory clinics.
3. **Mandatory Disclaimers**:
   - Legal/Advance Care: Must state information is educational, not legal advice.
   - Medical/Caregiver: Must state content is for guidance, not direct medical consultation.
4. **Citation Integrity**: Every clinical or statistical claim must cite peer-reviewed DOIs or accredited government/institutional data.

### Rule 3: Deterministic Pipeline Verification
Always verify changes locally before finishing a task:
- `make data`: Runs mock generation and validates all 7 canonical CSVs against schemas.
- `make test`: Executes all Go unit tests.
- `cd web && npm run build`: Confirms TypeScript compiles with zero errors.
- `python3 scripts/audit_compliance.py`: Confirms compliance with clinical guidelines.

---

## 4. Agentic Directives & Personas Boundary

- **Hosted Application Scope (This Repository)**: All executable application logic, data pipelines (`cmd/`, `internal/`), web UI (`web/`), vernacular translations (`web/src/locales/`), documentation (`wiki/`), and tests live strictly here.
- **Directives & Personas (`agentic-template`)**: When executing specialized workflows, refer to the sibling directory `~/Documents/git/github/agentic-template/`:
  - **Dementia India Directives**: `agentic-template/directives/dementia-india/`
    - `mock_data.md`: Dataset synthesis protocols
    - `validate_data.md`: Schema sanity checking rules
    - `translate_locale.md`: Localization and clinical glossary standards
    - `compliance_audit.md`: Regulatory and clinical verification rules
    - `seo_audit.md`: Search engine optimization guidelines
  - **Universal Personas**: `agentic-template/agents/` (`data_curator.md`, `compliance_auditor.md`, `seo_auditor.md`, etc.).
- **Boundary Rule**: Never commit agent framework files, prompt plans, or ledgers inside `dementia-india`. Only the production-ready hosted code lives in this repository.

