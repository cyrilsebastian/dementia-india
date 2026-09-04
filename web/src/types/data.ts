export interface StateRecord {
  state_code: string;
  state_name: string;
  sex: 'Both' | 'Male' | 'Female';
  urban: 'All' | 'Urban' | 'Rural';
  age_group: '60+' | '60-64' | '65-69' | '70-74' | '75-79' | '80-84' | '85+';
  education: 'All' | 'None' | 'Primary' | 'Middle' | 'Secondary' | 'Higher';
  prevalence_pct: number;
  lower: number;
  upper: number;
  est_cases: number;
  population: number;
}

export interface CountryRecord {
  country_code: string;
  country_name: string;
  region: string;
  year: number;
  sex: string;
  age_group: string;
  measure: string;
  value: number;
  lower: number;
  upper: number;
  unit: string;
  source: string;
}

export interface ProjectionRecord {
  country_code: string;
  country_name: string;
  year: number;
  cases: number;
  lower: number;
  upper: number;
  source: string;
}

export interface NeurologistRecord {
  state_code: string;
  state_name: string;
  total_neurologists: number;
  cog_behav_neuro: number;
  neurologist_per_million: number;
  patient_per_neurologist: number;
}

export interface PolicyRecord {
  indicator_code: string;
  country_code: string;
  year: number;
  value_text: string;
  value_numeric: number;
}

export interface GDPRecord {
  country_code: string;
  year: number;
  gdp_usd: number;
}

export interface SummaryStatRecord {
  metric_id: string;
  label: string;
  value: string;
  unit: string;
  change_pct: string;
  notes: string;
}
