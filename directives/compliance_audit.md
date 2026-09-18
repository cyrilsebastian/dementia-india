---
agent: compliance_auditor
tier: local
plan_required: false
---

# Directive: Clinical Safety & Data Compliance Audit

## Goal
Audit all frontend content and documentation to ensure clinical accuracy, strict prohibition of medicine/dosage mentions, complete inline citation linking, verified legal disclaimers, and exclusive focus on dementia and Alzheimer's disease.

## Execution
Run the deterministic compliance audit script:
```bash
python3 scripts/audit_compliance.py
```

## Checks Performed
1. **Zero Pharmaceutical Mentions**: Scans for brand and generic dementia drugs (Donepezil, Memantine, Galantamine, Rivastigmine, Aducanumab, Lecanemab, Donanemab, etc.).
2. **Zero Dosage Data**: Scans for dosage patterns (e.g. `10mg`, `5 mg`, `tablet`, `capsule`, `daily dose`).
3. **Mandatory Citations & DOIs**:
   - Chatterjee et al., 2024 (`10.1002/alz.088117`)
   - Lancet Commission, 2024 (`10.1016/S0140-6736(24)01061-5`)
   - Frontiers in Dementia, 2026 (`10.3389/frdem.2026.1843904`)
   - GeroScience meta-analysis, 2025 (`10.1007/s11357-024-01488-3`)
   - Joza et al., 2024 (`10.1002/alz.13386`)
   - ScienceDirect / AAIC, 2026 (`10.1016/j.arr.2026.102704`)
   - Supreme Court Common Cause judgment, 2018
4. **Mandatory Disclaimers**:
   - Advance Planning: Legal disclaimer (not legal advice, consult a lawyer).
   - Family Guide: Medical disclaimer (not medical advice, consult a neurologist).
   - Brain Health & Nutrition: Diet research disclaimer (associations, not guarantees).
5. **Neurologist Routing**: Verifies that diagnostic calls to action direct users to cognitive neurologists and memory clinics.
6. **Popup Engagement Constraints**: Verifies that subscription popup is time-triggered (7 minutes / 420s) and persists dismissal/subscription across storage.

## Incident Handling
If the compliance script fails:
1. Review the offending file, line, and rule violation.
2. Remove prohibited terms or add missing disclaimers/citations.
3. Rerun `python3 scripts/audit_compliance.py` and `tsc --noEmit`.
