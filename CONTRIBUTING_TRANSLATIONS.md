# Contributing Translations to Project Dementia India

Project Dementia India serves millions of families, caregivers, and elders across India. Because the vast majority of dementia care takes place in vernacular domestic contexts, accurate regional language resources can save lives and reduce caregiver distress.

We warmly welcome contributions from native speakers, bilingual clinicians, medical students, and community advocates!

---

## Priority Languages

1. **Tier 1 (Immediate)**: Hindi (हिन्दी), Tamil (தமிழ்), Kannada (ಕನ್ನಡ)
2. **Tier 2 (Expansion)**: Telugu (తెలుగు), Bengali (বাংলা), Marathi (मराठी), Malayalam (മലയാളം)
3. **Tier 3 (Comprehensive)**: Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Odia (ଓଡ଼ಿଆ), Assamese (অসমীয়া)

---

## File Structure

All translation files are modular JSON dictionaries stored under:
```
web/src/locales/
  ├── en/
  │   ├── common.json      (Navigation, buttons, shared UI strings)
  │   ├── guide.json       (Family Guide, warning signs, daily routines)
  │   └── helplines.json   (Emergency contacts and elderline descriptions)
  ├── hi/
  └── ta/
```

---

## Translation Rules and Clinical Guidelines

### 1. Clinical Accuracy and Sensitivity
- Dementia is a progressive neurodegenerative condition, not mental insanity.
- **Never use derogatory terms**:
  - Hindi: Do NOT use "पागलपन", "पागल", or "सनक". Use "स्मृतिलोप" or "भूलने की बीमारी".
  - Tamil: Do NOT use "பைத்தியம்". Use "நினைவாற்றல் இழப்பு" or "மறதி நோய்".
  - Telugu: Do NOT use "పిచ్చి". Use "చిత్తవైకల్యం" or "మతిమరుపు".
  - Kannada: Do NOT use "ಹುಚ್ಚುತನ". Use "ಮರೆಗುಳಿತನ".
- Refer to [data/translations/medical_glossary.json](data/translations/medical_glossary.json) for canonical mappings.

### 2. Punctuation and Tone
- **Zero Em-Dashes**: Never use the long dash / em-dash character. Use colons (:), hyphens (-), commas, or separate sentences instead.
- Use an empathetic, clear, and reassuring tone suitable for stressed family caregivers.

### 3. Numbers and Helplines
- Keep all telephone numbers (such as National Elderline `14567`) in standard digits so phone dialers can recognize them.

---

## How to Submit a Translation

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b translation/tamil-guide
   ```
2. Copy the reference English files from `web/src/locales/en/` into your language folder (for example, `web/src/locales/ta/`).
3. Translate the string values while keeping the JSON keys unchanged.
4. Verify that the project builds cleanly:
   ```bash
   cd web && npm run build
   ```
5. Open a Pull Request on GitHub with a description of the language and sections translated.
