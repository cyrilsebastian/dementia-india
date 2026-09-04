/**
 * @file GlobalView.tsx
 * @description Phase 2 country-level dementia intelligence stub page.
 * Displays upcoming global comparison charts with loading shimmer placeholders
 * covering World Choropleth, 10-Country Grouped Bar, Rosling Bubbles, and 2050 Projections.
 */

import React from 'react';
import { Globe, Clock, Sparkles } from 'lucide-react';

export const GlobalView: React.FC = () => {
  const upcomingCharts = [
    {
      title: 'World Choropleth Map',
      badge: 'Interactive Map',
      description: 'Global age-standardized dementia prevalence rates per 100,000 population across 195+ countries and territories.',
    },
    {
      title: 'Country Comparison (10 Nations)',
      badge: 'Grouped Bar',
      description: 'Benchmarking India against China, USA, UK, Australia, Japan, Brazil, Nigeria, Germany, and Indonesia.',
    },
    {
      title: 'Projection Trends (1990–2050)',
      badge: 'Forecast Trajectory',
      description: 'Historical burden curves with Lancet Commission forecast trajectories through 2050.',
    },
    {
      title: 'Policy & GDO Observational Map',
      badge: 'WHO GDO Framework',
      description: 'Cross-national readiness scores across diagnostic infrastructure, national action plans, and caregiver rights.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Global Dementia Overview
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                  Beta
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Country-level data — Phase 2
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Global comparison charts are being prepared.
          Data source: <strong>IHME Global Burden of Disease 2021</strong>.
          This module will provide interactive cross-national benchmarking, socioeconomic gradient analysis, and longitudinal disease projections.
        </p>
      </div>

      {/* Grid of 4 Shimmer Loading Chart Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingCharts.map((chart, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {chart.title}
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                  {chart.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {chart.description}
              </p>
            </div>

            {/* Shimmer Placeholder Area */}
            <div className="w-full h-56 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col items-center justify-center space-y-2">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" />
              <div className="p-3 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-400">
                <Sparkles className="w-5 h-5 animate-spin" />
              </div>
              <span className="text-xs font-medium text-slate-400">
                Synthesizing GBD 2021 Vectors...
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
              <div className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Phase 2 Pipeline</span>
              </div>
              <span>data/processed/global-countries.csv</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
