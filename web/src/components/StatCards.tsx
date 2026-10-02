/**
 * @file StatCards.tsx
 * @description Renders headline dementia metrics (Total Cases, Specialist Ratio, Diagnosis Gap, Caregiver Hours).
 * Formats values with tabular-nums to prevent layout jitter during dynamic updates.
 * Reads data from /data/summary-stats.csv.
 */

import React from 'react';
import { useCSV } from '../data/useCSV';
import { SummaryStatRecord } from '../types/data';
import { Users, UserX, Clock, Stethoscope, AlertTriangle } from 'lucide-react';

const DEFAULT_STATS: SummaryStatRecord[] = [
  {
    metric_id: 'TOTAL_CASES_60PLUS',
    label: 'Indians Living with Dementia (60+)',
    value: '8.8 Million',
    unit: 'people',
    change_pct: '+100% by 2050 (17.6M)',
    notes: 'Based on LASI Wave 1 survey weights (2020) and Lancet 2022 projections.',
  },
  {
    metric_id: 'NEUROLOGIST_RATIO',
    label: 'Neurologist Specialist Ratio',
    value: '1 per 5 Million',
    unit: 'ratio',
    change_pct: 'Extreme rural deficit',
    notes: 'Fewer than 100 cognitive/behavioral subspecialists across India.',
  },
  {
    metric_id: 'DIAGNOSIS_GAP',
    label: 'Dementia Diagnosis Rate',
    value: '10 – 15%',
    unit: 'percentage',
    change_pct: '~85% undiagnosed',
    notes: '85-90% of individuals never receive a formal clinical diagnosis.',
  },
  {
    metric_id: 'CAREGIVER_HOURS',
    label: 'Daily Unpaid Caregiver Hours',
    value: '6.2 Hours / Day',
    unit: 'hours/day',
    change_pct: '72% provided by female kin',
    notes: 'Surges to 9.5 hrs/day in advanced stages; estimated opportunity loss of ₹40,000–₹1,50,000/month.',
  },
];

export const StatCards: React.FC = () => {
  const { data: stats } = useCSV<SummaryStatRecord>('/data/summary-stats.csv');
  const activeStats = stats && stats.length > 0 ? stats : DEFAULT_STATS;

  const getIcon = (metricId: string) => {
    switch (metricId) {
      case 'TOTAL_CASES_60PLUS':
        return <Users className="w-5 h-5 text-emerald-500" aria-hidden="true" />;
      case 'NEUROLOGIST_RATIO':
        return <Stethoscope className="w-5 h-5 text-amber-500" aria-hidden="true" />;
      case 'DIAGNOSIS_GAP':
        return <UserX className="w-5 h-5 text-rose-500" aria-hidden="true" />;
      case 'CAREGIVER_HOURS':
        return <Clock className="w-5 h-5 text-indigo-500" aria-hidden="true" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-slate-500" aria-hidden="true" />;
    }
  };

  return (
    <section aria-label="Key Dementia Statistics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {activeStats.map((stat) => (
        <article
          key={stat.metric_id}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {stat.label}
            </span>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform">
              {getIcon(stat.metric_id)}
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
              {stat.value}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {stat.change_pct}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-700 dark:text-slate-300 leading-snug line-clamp-2" title={stat.notes}>
            {stat.notes}
          </p>
        </article>
      ))}
    </section>
  );
};

export default StatCards;

