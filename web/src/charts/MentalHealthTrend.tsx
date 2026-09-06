/**
 * @file MentalHealthTrend.tsx
 * @description Renders year-on-year mental health budgetary allocation (FY2021-2025).
 * Highlights absolute spending in ₹ Crore alongside proportional share of Union Health Budget.
 */

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useFilters } from '../context/FilterContext';
import { useCSV } from '../data/useCSV';
import type { HealthSpendingRecord } from '../types/healthSpending';
import { getMentalHealthTrendOptions } from './options/mentalHealthTrendOptions';
import { ChartPanel } from '../components/ChartPanel';

export const MentalHealthTrend: React.FC = () => {
  const { isDarkMode } = useFilters();
  const { data, loading } = useCSV<HealthSpendingRecord>('/data/health-spending.csv');

  if (loading) {
    return <div className="h-72 bg-slate-50 dark:bg-slate-800/40 rounded-2xl animate-pulse" />;
  }

  const option = getMentalHealthTrendOptions(data, isDarkMode);

  return (
    <ChartPanel
      title="Mental Health Budget Trajectory (FY2015–2025)"
      subtitle="Annual central allocation in ₹ Crore and share of total health spending."
      sourceLabel="Centre for Mental Health Law & Policy (CMHLP) / MoHFW"
      sourceUrl="https://cmhlp.org"
      exportable={true}
    >
      <div className="w-full h-[280px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </ChartPanel>
  );
};
