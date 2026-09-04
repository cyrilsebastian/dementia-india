/**
 * @file BudgetWaterfall.tsx
 * @description Renders the Union Health Budget cascade and data gap for dedicated dementia care.
 * Wrapped in ChartPanel for inline citation and metadata.
 */

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useFilters } from '../context/FilterContext';
import { getBudgetWaterfallOptions } from './options/budgetWaterfallOptions';
import { ChartPanel } from '../components/ChartPanel';

export const BudgetWaterfall: React.FC = () => {
  const { isDarkMode } = useFilters();
  const option = getBudgetWaterfallOptions(isDarkMode);

  return (
    <ChartPanel
      title="Union Health Budget Allocation Cascade (FY2025–26)"
      subtitle="Visualising the funnel from overall health spending to the dementia funding void."
      sourceLabel="MoHFW Demand for Grants 2025-26, PRS India"
      sourceUrl="https://prsindia.org/budgets"
      exportable={true}
    >
      <div className="w-full h-[280px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </ChartPanel>
  );
};
