/**
 * @file AgeOnsetBar.tsx
 * @description Renders age-onset gradient (60-64 through 85+) comparing male vs female dementia risk.
 * Wrapped in ChartPanel for inline citation and active demographic indicators.
 */

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useCSV } from '../data/useCSV';
import { StateRecord } from '../types/data';
import { useFilters } from '../context/FilterContext';
import { getAgeOnsetOptions } from './options/ageOnsetOptions';
import { ChartPanel } from '../components/ChartPanel';

export const AgeOnsetBar: React.FC = () => {
  const { urban, education, selectedState, isDarkMode } = useFilters();
  const { data: statesData, loading } = useCSV<StateRecord>('/data/india-states.csv');

  const ageBrackets = ['60-64', '65-69', '70-74', '75-79', '80-84', '85+'];

  const { maleValues, femaleValues } = useMemo(() => {
    if (!statesData.length) return { maleValues: [], femaleValues: [] };

    const targetData = statesData.filter((d) => {
      const matchState = selectedState ? d.state_code === selectedState : true;
      const matchUrban = d.urban === urban;
      const matchEdu = d.education === education;
      return matchState && matchUrban && matchEdu;
    });

    const getAvg = (sex: 'Male' | 'Female', age: string) => {
      const subset = targetData.filter((d) => d.sex === sex && d.age_group === age);
      if (!subset.length) return 0;
      const total = subset.reduce((acc, curr) => acc + curr.prevalence_pct, 0);
      return Number((total / subset.length).toFixed(2));
    };

    return {
      maleValues: ageBrackets.map((age) => getAvg('Male', age)),
      femaleValues: ageBrackets.map((age) => getAvg('Female', age)),
    };
  }, [statesData, selectedState, urban, education]);

  const activeBadges = [
    `Sector: ${urban}`,
    selectedState ? `State: ${selectedState}` : 'All India',
  ];

  if (loading) {
    return <div className="h-64 bg-slate-50 dark:bg-slate-800/40 rounded-xl animate-pulse" />;
  }

  const option = getAgeOnsetOptions({ ageBrackets, maleValues, femaleValues, isDarkMode });

  return (
    <ChartPanel
      title={`Age-Onset & Gender Gradient ${selectedState ? `(${selectedState})` : ''}`}
      subtitle="Comparing male vs. female risk expansion from age 60 to 85+."
      sourceLabel="LASI Wave 1 Cognitive Module, IIPS 2020"
      sourceUrl="https://iipsindia.ac.in/lasi"
      activeFilterBadges={activeBadges}
    >
      <div className="w-full h-[220px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </ChartPanel>
  );
};
