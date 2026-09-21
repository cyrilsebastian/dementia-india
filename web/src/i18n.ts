import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Tier 1
import enCommon from './locales/en/common.json';
import enGuide from './locales/en/guide.json';
import enHelplines from './locales/en/helplines.json';

import hiCommon from './locales/hi/common.json';
import hiGuide from './locales/hi/guide.json';
import hiHelplines from './locales/hi/helplines.json';

import taCommon from './locales/ta/common.json';
import taGuide from './locales/ta/guide.json';
import taHelplines from './locales/ta/helplines.json';

import knCommon from './locales/kn/common.json';
import knGuide from './locales/kn/guide.json';
import knHelplines from './locales/kn/helplines.json';

// Tier 2
import teCommon from './locales/te/common.json';
import teGuide from './locales/te/guide.json';
import teHelplines from './locales/te/helplines.json';

import bnCommon from './locales/bn/common.json';
import bnGuide from './locales/bn/guide.json';
import bnHelplines from './locales/bn/helplines.json';

import mrCommon from './locales/mr/common.json';
import mrGuide from './locales/mr/guide.json';
import mrHelplines from './locales/mr/helplines.json';

import mlCommon from './locales/ml/common.json';
import mlGuide from './locales/ml/guide.json';
import mlHelplines from './locales/ml/helplines.json';

// Tier 3
import guCommon from './locales/gu/common.json';
import guGuide from './locales/gu/guide.json';
import guHelplines from './locales/gu/helplines.json';

import paCommon from './locales/pa/common.json';
import paGuide from './locales/pa/guide.json';
import paHelplines from './locales/pa/helplines.json';

import orCommon from './locales/or/common.json';
import orGuide from './locales/or/guide.json';
import orHelplines from './locales/or/helplines.json';

import asCommon from './locales/as/common.json';
import asGuide from './locales/as/guide.json';
import asHelplines from './locales/as/helplines.json';

export const SUPPORTED_LANGUAGES = [
  // Primary
  { code: 'en', label: 'English', nativeName: 'English' },
  // Tier 1
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  // Tier 2
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'ml', label: 'Malayalam', nativeName: 'മലയാളം' },
  // Tier 3
  { code: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'pa', label: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'or', label: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', label: 'Assamese', nativeName: 'অসমীয়া' },
] as const;

export type SupportedLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

const resources = {
  en: { common: enCommon, guide: enGuide, helplines: enHelplines },
  hi: { common: hiCommon, guide: hiGuide, helplines: hiHelplines },
  ta: { common: taCommon, guide: taGuide, helplines: taHelplines },
  kn: { common: knCommon, guide: knGuide, helplines: knHelplines },
  te: { common: teCommon, guide: teGuide, helplines: teHelplines },
  bn: { common: bnCommon, guide: bnGuide, helplines: bnHelplines },
  mr: { common: mrCommon, guide: mrGuide, helplines: mrHelplines },
  ml: { common: mlCommon, guide: mlGuide, helplines: mlHelplines },
  gu: { common: guCommon, guide: guGuide, helplines: guHelplines },
  pa: { common: paCommon, guide: paGuide, helplines: paHelplines },
  or: { common: orCommon, guide: orGuide, helplines: orHelplines },
  as: { common: asCommon, guide: asGuide, helplines: asHelplines },
};

const VALID_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);

const getInitialLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('di_language');
  if (saved && VALID_CODES.includes(saved as SupportedLanguageCode)) {
    return saved;
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    ns: ['common', 'guide', 'helplines'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
