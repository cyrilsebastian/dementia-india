/**
 * @file GlobalStatCards.tsx
 * @description Headline macro cards for Global Dementia Intelligence.
 * Displays Caseload (55.2M), Economic Cost ($1.3T), Gender Ratio (1.69x),
 * Diagnostic Gap (75%), and National Policy Readiness (39 of 194 countries) with explanatory tooltips.
 */

import React from 'react';
import { useCSV } from '../data/useCSV';
import { SummaryStatRecord } from '../types/data';
import { Globe, DollarSign, Scale, UserX, ShieldCheck, AlertCircle } from 'lucide-react';
import { Tooltip } from './Tooltip';

export const GlobalStatCards: React.FC = () => {
  const { data: stats, loading, error } = useCSV<SummaryStatRecord>('/data/global-summary-stats.csv');

  const getIcon = (metricId: string) => {
    switch (metricId) {
      case 'GLOBAL_CASES':
        return <Globe className="w-5 h-5 text-amber-500" />;
      case 'ECONOMIC_BURDEN':
        return <DollarSign className="w-5 h-5 text-emerald-500" />;
      case 'GENDER_RATIO':
        return <Scale className="w-5 h-5 text-purple-500" />;
      case 'DIAGNOSIS_GAP':
        return <UserX className="w-5 h-5 text-rose-500" />;
      case 'POLICY_READINESS':
        return <ShieldCheck className="w-5 h-5 text-sky-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-500" />;
    }
  };

  const getTooltipText = (metricId: string) => {
    switch (metricId) {
      case 'GLOBAL_CASES':
        return 'Total number of people estimated to be living with dementia globally. Source: WHO / GBD 2021.';
      case 'ECONOMIC_BURDEN':
        return 'Annual global cost of dementia including medical care, social care, and unpaid family caregiving. Exceeds the market cap of most Fortune 500 companies.';
      case 'GENDER_RATIO':
        return 'Women are 1.69 times more likely to develop dementia than men — this is not fully explained by longer female lifespans. Women also provide over 70% of unpaid caregiving hours globally.';
      case 'DIAGNOSIS_GAP':
        return 'Percentage of dementia cases that are never formally diagnosed. In low and middle-income countries this reaches 85–90%. Source: WHO GDO 2021.';
      case 'POLICY_READINESS':
        return 'Number of WHO member states with a formal National Dementia Action Plan. Only 39 of 194 as of 2021. Source: WHO Global Dementia Observatory. Year: 2021.';
      default:
        return '';
    }
  };

  const getBadgeColor = (metricId: string) => {
    switch (metricId) {
      case 'GLOBAL_CASES':
        return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
      case 'ECONOMIC_BURDEN':
        return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
      case 'GENDER_RATIO':
        return 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800';
      case 'DIAGNOSIS_GAP':
        return 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
      case 'POLICY_READINESS':
        return 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800';
      default:
        return 'text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-32 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5" />
        ))}
      </div>
    );
  }

  if (error || !stats.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.metric_id}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
                <Tooltip text={getTooltipText(stat.metric_id)} size={12} />
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform shrink-0">
                {getIcon(stat.metric_id)}
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
                {stat.value}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center">
              <span className={`font-semibold text-[11px] px-2 py-0.5 rounded-full border ${getBadgeColor(stat.metric_id)}`}>
                {stat.change_pct}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2" title={stat.notes}>
              {stat.notes}
            </p>
            {stat.metric_id === 'POLICY_READINESS' && (
              <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                Data year: 2021 (WHO GDO)
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
