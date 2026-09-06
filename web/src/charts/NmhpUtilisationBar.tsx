/**
 * @file NmhpUtilisationBar.tsx
 * @description Grouped bar chart comparing National Mental Health Programme (NMHP) funds
 * allocated vs actually spent (FY2015–2025), illustrating chronic underspending and absorption barriers.
 */

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useFilters } from '../context/FilterContext';
import { getNmhpUtilisationOptions } from './options/nmhpUtilisationOptions';
import { ChartPanel } from '../components/ChartPanel';

export const NmhpUtilisationBar: React.FC = () => {
  const { isDarkMode } = useFilters();
  const option = getNmhpUtilisationOptions(isDarkMode);

  return (
    <ChartPanel
      title="Mental Health Funds: Allocated vs Utilised (NMHP)"
      subtitle="India consistently returns unspent mental health funds. In FY2025, only 17% of approved DMHP funds were spent."
      sourceLabel="Parliamentary reply, Lok Sabha, March 2026 (MoS Health Pratap Rao Jadhav)"
      sourceUrl="https://theprint.in/health/gross-underspend-cripples-indias-community-level-mental-health-battle-states-spent-50-funds-for-5-yrs/2878442/"
      exportable={true}
    >
      <div className="w-full h-[320px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </ChartPanel>
  );
};
