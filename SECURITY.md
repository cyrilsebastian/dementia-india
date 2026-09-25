# Security and Data Privacy Policy: Project Dementia India

This document outlines the security, data privacy, and clinical safety standards enforced across **Project Dementia India**.

---

## 1. Zero Protected Health Information (PHI) and PII

Project Dementia India is strictly a public health data visualization, research intelligence, and caregiver guidance platform.

- **No Patient Data**: Under no circumstances does this platform collect, store, transmit, or process patient medical records, diagnostic imaging, cognitive assessment test results, or personal identifiers.
- **Aggregated Open Data**: All datasets hosted in `data/processed/` consist exclusively of aggregated, anonymized epidemiological indicators derived from accredited national and international surveys (LASI Wave 1, GBD 2021, WHO Global Dementia Observatory).
- **Directory Submissions**: Any directory submissions (e.g. support groups, day care centers) contain only publicly available organizational contacts, never private individuals.

---

## 2. Secrets and Credential Management

- **Local Secrets Stay Local**: Environment variables (`.env`, `.env.local`, `*.local`) are gitignored and must never be committed to source control.
- **Template Configuration**: Reference [.env.example](.env.example) for required client-side keys.
- **Restricted Access Keys**: Client-side keys (`VITE_WEB3FORMS_KEY`, `VITE_TURNSTILE_SITE_KEY`) are scoped with domain restrictions and rate limiting to prevent unauthorized usage.
- **No Private Keys in Client Bundles**: Backend tokens, secret keys (such as `VITE_TURNSTILE_SECRET_KEY` or admin keys), and database connection strings must never be bundled into frontend assets.

---

## 3. Clinical Safety and Statutory Disclaimers

To protect vulnerable families and caregivers from misinformation:

- **Zero Pharmaceutical Recommendations**: Brand and generic drug names (e.g. Donepezil, Memantine, Galantamine, Rivastigmine, Aducanumab, Lecanemab, Donanemab) and dosage instructions are strictly prohibited from all public pages.
- **Specialist Routing**: All diagnostic, symptom assessment, and clinical inquiries must direct families exclusively to qualified cognitive neurologists, geriatricians, and accredited memory clinics.
- **Mandatory Disclaimers**:
  - Legal & Advance Planning: Explicitly state that content is informational and does not constitute formal legal counsel.
  - Caregiver Guidance: Explicitly state that advice is non-prescriptive guidance and requires consultation with medical professionals.
- **Deterministic Compliance Scanning**: The automated scanner (`python3 scripts/audit_compliance.py`) runs in CI and pre-commit to block prohibited terms.

---

## 4. Source Attribution and Citation Integrity

- Every statistical claim, epidemiological estimate, and prevalence figure must be anchored to a published, peer-reviewed source or government health dataset.
- Mandatory DOIs and permanent URLs must be hyperlinked directly in the user interface (e.g. Research and Brain Health pages).

---

## 5. Reporting Security Vulnerabilities

We take the security of this platform and its underlying data pipelines seriously.

If you discover a security vulnerability, data integrity flaw, or credential exposure:
1. Please do not open a public issue.
2. Email the maintainer directly at: `security@cyrilsebastian.com` (or create a private GitHub Security Advisory).
3. Include detailed steps to reproduce the issue. We will respond within 48 hours to validate and patch the vulnerability.
