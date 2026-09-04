import React from 'react';
import { useCSV } from '../data/useCSV';
import { SummaryStatRecord } from '../types/data';
import { Users, UserX, Clock, Stethoscope, AlertTriangle } from 'lucide-react';

export const StatCards: React.FC = () => {
  const { data: stats, loading, error } = useCSV<SummaryStatRecord>('/data/summary-stats.csv');

  const getIcon = (metricId: string) => {
    switch (metricId) {
      case 'TOTAL_CASES_60PLUS':
        return <Users className="w-5 h-5 text-emerald-500" />;
      case 'NEUROLOGIST_RATIO':
        return <Stethoscope className="w-5 h-5 text-amber-500" />;
      case 'DIAGNOSIS_GAP':
        return <UserX className="w-5 h-5 text-rose-500" />;
      case 'CAREGIVER_HOURS':
        return <Clock className="w-5 h-5 text-indigo-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-slate-500" />;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5" />
        ))}
      </div>
    );
  }

  if (error || !stats.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.metric_id}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {stat.label}
            </span>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform">
              {getIcon(stat.metric_id)}
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {stat.value}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {stat.change_pct}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2" title={stat.notes}>
            {stat.notes}
          </p>
        </div>
      ))}
    </div>
  );
};
