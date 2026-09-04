/**
 * @file healthSpending.ts
 * @description Type definitions for Union health and mental health budgetary allocations.
 * Source: Ministry of Health and Family Welfare (MoHFW), PRS India, CMHLP reports.
 */

export interface HealthSpendingRecord {
  year: number;
  total_health_budget_cr: number;
  mental_health_cr: number;
  mental_health_pct: number;
  tele_mh_cr: number;
  source_url: string;
}

export interface InternationalSpendRecord {
  country: string;
  mental_health_pct: number;
  source_label: string;
  source_url: string;
}
