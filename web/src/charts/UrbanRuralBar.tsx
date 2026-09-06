/**
 * @file UrbanRuralBar.tsx
 * @description Horizontal comparison bar chart showing prevalence divergence between Rural and Urban demographics.
 * Wrapped in ChartPanel for standardized citations and filter pills.
 */

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useCSV } from '../data/useCSV';
import { StateRecord } from '../types/data';
import { useFilters } from '../context/FilterContext';
import { getUrbanRuralOptions } from './options/urbanRuralOptions';
import { ChartPanel } from '../components/ChartPanel';

export const UrbanRuralBar: React.FC = () => {
  const { sex, ageGroup, education, selectedState, isDarkMode } = useFilters();
  const { data: statesData, loading } = useCSV<StateRecord>('/data/india-states.csv');

  const baseStates = ['Kerala', 'Jammu and Kashmir', 'Tamil Nadu', 'Goa', 'Karnataka', 'Maharashtra', 'West Bengal', 'Delhi'];

  const matchedState = useMemo(() => {
    if (!selectedState || !statesData.length) return null;
    return statesData.find((d) => d.state_code === selectedState);
  }, [selectedState, statesData]);

  // If a state is selected, isolate it and compare with the National Benchmark
  const activeStates = useMemo(() => {
    if (!matchedState) return baseStates;
    return [matchedState.state_name, 'All-India Avg'];
  }, [matchedState, baseStates]);

  const { urbanData, ruralData } = useMemo(() => {
    if (!statesData.length) return { urbanData: [], ruralData: [] };

    const getVal = (stateName: string, urb: 'Urban' | 'Rural') => {
      if (stateName === 'All-India Avg') {
        const matches = statesData.filter(
          (d) =>
            d.urban === urb &&
            d.sex === sex &&
            d.age_group === ageGroup &&
            d.education === education
        );
        if (!matches.length) return 0;
        const sum = matches.reduce((acc, curr) => acc + curr.prevalence_pct, 0);
        return Math.round((sum / matches.length) * 10) / 10;
      }

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

  const activeBadges = [
    `Sex: ${sex}`,
    `Cohort: ${ageGroup}`,
    matchedState ? `State Focus: ${matchedState.state_name}` : 'Top Comparative States',
  ];

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
    <ChartPanel
      title="Urban vs. Rural Divergence"
      subtitle={
        matchedState
          ? `Direct rural-urban comparison for ${matchedState.state_name} alongside National Benchmark.`
          : 'Rural areas consistently exhibit 1.5–2× higher prevalence across major states.'
      }
      sourceLabel="LASI Wave 1, IIPS 2020"
      sourceUrl="https://iipsindia.ac.in/lasi"
      activeFilterBadges={activeBadges}
    >
      <div className="w-full h-[220px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </ChartPanel>
  );
};
