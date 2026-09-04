/**
 * @file InternationalSpendComparison.tsx
 * @description Renders cross-national benchmark of mental health budget allocation as percentage of total health expenditure.
 * Compares India against global peers (UK, Australia, USA).
 */

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useFilters } from '../context/FilterContext';
import { getInternationalSpendOptions } from './options/internationalSpendOptions';
import { ChartPanel } from '../components/ChartPanel';

export const InternationalSpendComparison: React.FC = () => {
  const { isDarkMode } = useFilters();
  const option = getInternationalSpendOptions(isDarkMode);

  return (
    <ChartPanel
      title="International Comparison: Mental Health Allocation"
      subtitle="Percentage of national public health budget dedicated to mental health (%)."
      sourceLabel="WHO Mental Health Atlas & NHS England"
      sourceUrl="https://www.who.int/data/gho/data/themes/topics/dementia"
      exportable={true}
    >
      <div className="w-full h-[280px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </ChartPanel>
  );
};
