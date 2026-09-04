/**
 * @file colours.ts
 * @description Centralized color palette and tokens for Project Dementia India visualizations.
 * Follows clinical accessibility standards: avoids 'safe green' for prevalence rates,
 * using neutral pale blue to alarm crimson instead.
 */

export const CHOROPLETH_COLOURS = {
  // Neutral pale blue (lowest prevalence) to deep crimson (highest)
  // Replaces green->red scale to prevent misinterpreting low prevalence as "safe"
  LOW: '#E8F4FD',
  MINT: '#BEE3F8',
  MID_AMBER: '#F6AD55',
  HIGH_ORANGE: '#E67E22',
  CRITICAL_RED: '#C0392B',
  RANGE: ['#E8F4FD', '#BEE3F8', '#F6AD55', '#E67E22', '#C0392B'],
} as const;

export const AGE_GENDER_COLOURS = {
  // Accessible steel blue for male and warm rose for female
  MALE: '#4A9EDB',
  FEMALE: '#E8647A',
} as const;

export const URBAN_RURAL_COLOURS = {
  // Forest teal for urban, warm amber for rural
  URBAN: '#52A788',
  RURAL: '#E8A045',
} as const;

export const BADGE_COLOURS = {
  POSITIVE: '#27AE60',
  WARNING: '#E67E22',
  CRITICAL: '#C0392B',
} as const;

export const SPECIALIST_RATIO_COLOURS = {
  // Neurologist per million thresholds
  CRITICAL: '#C0392B', // < 0.5 per million
  SEVERE: '#E67E22',   // 0.5 - 1.0 per million
  POOR: '#F1C40F',     // 1.0 - 2.0 per million
  ADEQUATE: '#27AE60', // 2.0 - 5.0 per million
  GOOD: '#2980B9',     // > 5.0 per million
} as const;

export const THEME_COLOURS = {
  DARK_BG: '#0b0f19',
  DARK_CARD: '#151e2e',
  DARK_BORDER: '#334155',
  LIGHT_BORDER: '#e2e8f0',
  SELECTION_HIGHLIGHT: '#6366f1',
} as const;
