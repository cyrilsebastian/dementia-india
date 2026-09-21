---
agent: dementia_data_curator
tier: local
plan_required: false
---

# Directive: Translation and Localization Protocol

## Goal
Translate, validate, and maintain high-fidelity vernacular content for Project Dementia India across scheduled Indian languages (Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Malayalam, Gujarati, Odia, and Punjabi), ensuring zero stigmatizing language, strict medical accuracy, and seamless UI integration.

## Reference Standards
1. **Clinical Glossary**: Check `data/translations/medical_glossary.json` before translating medical terms.
2. **Prohibited Vocabulary**: Never use pejorative colloquialisms (e.g. in Hindi: पागलपन, पागल; in Tamil: பைத்தியம்; in Telugu: పిచ్చి; in Kannada: ಹುಚ್ಚುತನ; in Bengali: পাগলামি).
3. **Punctuation Rules**: Never use em-dashes. Use native full-stops or hyphens, colons, and commas.

## Namespace Structure
All translations reside in `web/src/locales/{lang}/`:
- `common.json`: Navigation items, search boxes, filter labels, actions, footer notices.
- `guide.json`: Family caregiving roadmap, 10 early warning signs, safety protocols.
- `helplines.json`: National and state elderline details, operating hours, emergency lines.

## Execution Workflow
1. Extract new keys from master `web/src/locales/en/` JSON files.
2. Draft target language strings maintaining exact JSON key hierarchies.
3. Validate strings against `data/translations/medical_glossary.json`.
4. Ensure text expansion does not break mobile button layouts or card wraps.
5. Run TypeScript check and frontend verification:
   ```bash
   cd web && npm run build
   ```

## Quality Checklist
- [ ] No prohibited terms present.
- [ ] No em-dashes used.
- [ ] Direct medical diagnosis instructions point exclusively to cognitive neurologists and memory clinics.
- [ ] Emergency helpline numbers (14567, 112, 1090) remain un-mangled.
