/**
 * @file thresholds.ts
 * @description Epidemiological and healthcare capacity benchmark constants for India.
 */

export const PREVALENCE_THRESHOLDS = {
  MIN_DISPLAY_PCT: 2.0,
  MAX_DISPLAY_PCT: 20.0,
  NATIONAL_AVERAGE_PCT: 7.4,
} as const;

export const SPECIALIST_THRESHOLDS = {
  CRITICAL_PER_MILLION: 0.5,
  SEVERE_PER_MILLION: 1.0,
  POOR_PER_MILLION: 2.0,
  ADEQUATE_PER_MILLION: 5.0,
} as const;
