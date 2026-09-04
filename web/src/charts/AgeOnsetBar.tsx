/**
 * @file AgeOnsetBar.tsx
 * @description Renders age-onset gradient (60-64 through 85+) comparing male vs female dementia risk.
 * Pulls from india-states.csv and automatically reacts to the selected state filter.
 */

import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { useCSV } from '../data/useCSV';
import { StateRecord } from '../types/data';
import { useFilters } from '../context/FilterContext';
import { getAgeOnsetOptions } from './options/ageOnsetOptions';

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

  if (loading) {
    return <div className="h-64 bg-slate-50 dark:bg-slate-800/40 rounded-xl animate-pulse" />;
  }

  const option = getAgeOnsetOptions({ ageBrackets, maleValues, femaleValues, isDarkMode });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col h-full">
      <div className="mb-2">
        <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
          Age-Onset & Gender Gradient {selectedState && `(${selectedState})`}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparing male vs. female risk expansion from age 60 to 85+.
        </p>
      </div>
      <div className="flex-1 min-h-[220px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};
