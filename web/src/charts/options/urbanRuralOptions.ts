/**
 * @file urbanRuralOptions.ts
 * @description ECharts option generator for Urban vs Rural Divergence bar chart.
 * Highlights the 1.5 - 2x excess dementia risk in rural sectors using distinct teal and amber tones.
 */

import { URBAN_RURAL_COLOURS, THEME_COLOURS } from '../../constants/colours';

interface GetUrbanRuralOptionsParams {
  states: string[];
  urbanData: number[];
  ruralData: number[];
  isDarkMode: boolean;
}

export function getUrbanRuralOptions({
  states,
  urbanData,
  ruralData,
  isDarkMode,
}: GetUrbanRuralOptionsParams) {
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
      data: ['Rural', 'Urban'],
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
      type: 'value',
      name: 'Prevalence (%)',
      nameTextStyle: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 10 },
      splitLine: { lineStyle: { color: isDarkMode ? '#1e293b' : '#f1f5f9' } },
      axisLabel: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 10 },
    },
    yAxis: {
      type: 'category',
      data: states,
      axisLine: { lineStyle: { color: isDarkMode ? THEME_COLOURS.DARK_BORDER : '#cbd5e1' } },
      axisLabel: { color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 11 },
    },
    series: [
      {
        name: 'Rural',
        type: 'bar',
        barMaxWidth: states.length <= 2 ? 22 : 14,
        label: {
          show: states.length <= 2,
          position: 'right',
          formatter: '{c}%',
          color: isDarkMode ? '#e2e8f0' : '#1e293b',
          fontSize: 11,
          fontWeight: 600,
        },
        itemStyle: {
          color: URBAN_RURAL_COLOURS.RURAL,
          borderRadius: [0, 4, 4, 0],
        },
        data: ruralData,
      },
      {
        name: 'Urban',
        type: 'bar',
        barMaxWidth: states.length <= 2 ? 22 : 14,
        label: {
          show: states.length <= 2,
          position: 'right',
          formatter: '{c}%',
          color: isDarkMode ? '#e2e8f0' : '#1e293b',
          fontSize: 11,
          fontWeight: 600,
        },
        itemStyle: {
          color: URBAN_RURAL_COLOURS.URBAN,
          borderRadius: [0, 4, 4, 0],
        },
        data: urbanData,
      },
    ],
  };
}
