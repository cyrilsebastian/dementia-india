/**
 * @file ageOnsetOptions.ts
 * @description ECharts option generator for the Age-Onset & Gender Gradient grouped bar chart.
 * Uses steel blue for male and warm rose for female.
 */

import { AGE_GENDER_COLOURS, THEME_COLOURS } from '../../constants/colours';

interface GetAgeOnsetOptionsParams {
  ageBrackets: string[];
  maleValues: number[];
  femaleValues: number[];
  isDarkMode: boolean;
}

export function getAgeOnsetOptions({
  ageBrackets,
  maleValues,
  femaleValues,
  isDarkMode,
}: GetAgeOnsetOptionsParams) {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      borderColor: isDarkMode ? THEME_COLOURS.DARK_BORDER : THEME_COLOURS.LIGHT_BORDER,
      textStyle: { color: isDarkMode ? '#f8fafc' : '#0f172a', fontSize: 12 },
    },
    legend: {
      data: ['Male', 'Female'],
      top: 0,
      right: 0,
      textStyle: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '18%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ageBrackets,
      axisLine: { lineStyle: { color: isDarkMode ? THEME_COLOURS.DARK_BORDER : '#cbd5e1' } },
      axisLabel: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      name: 'Prevalence (%)',
      nameTextStyle: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 10 },
      splitLine: { lineStyle: { color: isDarkMode ? '#1e293b' : '#f1f5f9' } },
      axisLabel: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 10 },
    },
    series: [
      {
        name: 'Male',
        type: 'bar',
        barMaxWidth: 20,
        itemStyle: {
          color: AGE_GENDER_COLOURS.MALE,
          borderRadius: [4, 4, 0, 0],
        },
        data: maleValues,
      },
      {
        name: 'Female',
        type: 'bar',
        barMaxWidth: 20,
        itemStyle: {
          color: AGE_GENDER_COLOURS.FEMALE,
          borderRadius: [4, 4, 0, 0],
        },
        data: femaleValues,
      },
    ],
  };
}
