/**
 * @file UrbanRuralBar.tsx
 * @description Horizontal comparison bar chart showing prevalence divergence between Rural and Urban demographics.
 * Automatically lifts the user's selected state to the top row for instant comparison.
 */

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useCSV } from '../data/useCSV';
import { StateRecord } from '../types/data';
import { useFilters } from '../context/FilterContext';
import { getUrbanRuralOptions } from './options/urbanRuralOptions';

export const UrbanRuralBar: React.FC = () => {
  const { sex, ageGroup, education, selectedState, isDarkMode } = useFilters();
  const { data: statesData, loading } = useCSV<StateRecord>('/data/india-states.csv');

  const baseStates = ['Kerala', 'Jammu and Kashmir', 'Tamil Nadu', 'Goa', 'Karnataka', 'Maharashtra', 'West Bengal', 'Delhi'];

  // If a state is selected, ensure it is at the front of the list
  const activeStates = useMemo(() => {
    if (!selectedState || !statesData.length) return baseStates;
    const match = statesData.find((d) => d.state_code === selectedState);
    if (!match) return baseStates;
    return [match.state_name, ...baseStates.filter((s) => s !== match.state_name)];
  }, [selectedState, statesData]);

  const { urbanData, ruralData } = useMemo(() => {
    if (!statesData.length) return { urbanData: [], ruralData: [] };

    const getVal = (stateName: string, urb: 'Urban' | 'Rural') => {
      const match = statesData.find(
        (d) =>
          d.state_name === stateName &&
          d.urban === urb &&
          d.sex === sex &&
          d.age_group === ageGroup &&
          d.education === education
      );
      return match ? match.prevalence_pct : 0;
    };

    return {
      urbanData: activeStates.map((s) => getVal(s, 'Urban')),
      ruralData: activeStates.map((s) => getVal(s, 'Rural')),
    };
  }, [statesData, activeStates, sex, ageGroup, education]);

  if (loading) {
    return <div className="h-64 bg-slate-50 dark:bg-slate-800/40 rounded-xl animate-pulse" />;
  }

  const option = getUrbanRuralOptions({
    states: activeStates,
    urbanData,
    ruralData,
    isDarkMode,
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col h-full">
      <div className="mb-2">
        <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
          Urban vs. Rural Divergence
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Rural areas consistently exhibit 1.5–2× higher prevalence across major states.
        </p>
      </div>
      <div className="flex-1 min-h-[220px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};
