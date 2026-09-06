/**
 * @file nmhpUtilisationOptions.ts
 * @description ECharts option generator for Mental Health Funds: Allocated vs Utilised (NMHP).
 * Plots allocated vs actual spent funds (₹ Crore) with a 100% utilisation reference line and callout annotations.
 */

import type { EChartsOption } from 'echarts';

export interface NmhpSpendRecord {
  year: string;
  allocated: number;
  spent: number;
  utilisation: number;
}

export const NMHP_UTILISATION_DATA: NmhpSpendRecord[] = [
  { year: 'FY2015', allocated: 35, spent: 35, utilisation: 100 },
  { year: 'FY2017', allocated: 35, spent: 30.9, utilisation: 88 },
  { year: 'FY2018', allocated: 44, spent: 44.3, utilisation: 101 },
  { year: 'FY2019', allocated: 50, spent: 2.0, utilisation: 4 },
  { year: 'FY2020', allocated: 35, spent: 2.5, utilisation: 7 },
  { year: 'FY2021', allocated: 40, spent: 20.4, utilisation: 51 },
  { year: 'FY2022', allocated: 40, spent: 25.2, utilisation: 63 },
  { year: 'FY2023', allocated: 31.5, spent: 34.6, utilisation: 110 },
  { year: 'FY2024', allocated: 31.5, spent: 15.1, utilisation: 48 },
  { year: 'FY2025', allocated: 30.7, spent: 5.3, utilisation: 17 },
];

export function getNmhpUtilisationOptions(isDarkMode: boolean): EChartsOption {
  const years = NMHP_UTILISATION_DATA.map((d) => d.year);
  const allocatedData = NMHP_UTILISATION_DATA.map((d) => d.allocated);
  const spentData = NMHP_UTILISATION_DATA.map((d) => d.spent);

  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
  const subtextColor = isDarkMode ? '#94a3b8' : '#64748b';
  const splitLineColor = isDarkMode ? '#1e293b' : '#f1f5f9';

  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      borderColor: isDarkMode ? '#334155' : '#e2e8f0',
      textStyle: { color: textColor },
      formatter: (params: any) => {
        if (!params || !params.length) return '';
        const idx = params[0].dataIndex;
        const d = NMHP_UTILISATION_DATA[idx];
        return `<div class="p-1 font-sans">
          <div class="font-bold text-sm mb-1">${d.year}</div>
          <div class="text-xs text-slate-400">Allocated Budget: <span class="font-semibold text-slate-200">₹${d.allocated} Cr</span></div>
          <div class="text-xs text-slate-400">Actually Spent: <span class="font-semibold text-rose-400">₹${d.spent} Cr</span></div>
          <div class="text-xs text-slate-400 mt-1 pt-1 border-t border-slate-700/60">Utilisation Rate: <span class="font-bold ${d.utilisation < 50 ? 'text-rose-400' : 'text-emerald-400'}">${d.utilisation}%</span></div>
        </div>`;
      },
    },
    legend: {
      data: ['Allocated (₹ Cr)', 'Actually Spent (₹ Cr)', '100% Utilisation Target'],
      textStyle: { color: subtextColor, fontSize: 11 },
      top: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '16%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLabel: { color: subtextColor, fontSize: 11 },
      axisLine: { lineStyle: { color: isDarkMode ? '#334155' : '#cbd5e1' } },
    },
    yAxis: [
      {
        type: 'value',
        name: '₹ Crore',
        nameTextStyle: { color: subtextColor, fontSize: 11 },
        min: 0,
        max: 60,
        axisLabel: { color: subtextColor, fontSize: 11, formatter: '₹{value} Cr' },
        splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } },
      },
      {
        type: 'value',
        name: '% Utilisation',
        nameTextStyle: { color: subtextColor, fontSize: 11 },
        min: 0,
        max: 120,
        axisLabel: { color: subtextColor, fontSize: 11, formatter: '{value}%' },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: 'Allocated (₹ Cr)',
        type: 'bar',
        data: allocatedData,
        barGap: '20%',
        barMaxWidth: 26,
        itemStyle: {
          color: isDarkMode ? '#64748b' : '#94a3b8',
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: 'Actually Spent (₹ Cr)',
        type: 'bar',
        data: spentData,
        barMaxWidth: 26,
        itemStyle: {
          color: '#ef4444',
          borderRadius: [4, 4, 0, 0],
        },
        markPoint: {
          symbol: 'pin',
          symbolSize: 44,
          data: [
            {
              name: 'FY2019: 4% Utilised',
              coord: ['FY2019', 2.0],
              value: '4%',
              itemStyle: { color: '#dc2626' },
              label: { fontWeight: 'bold', fontSize: 10, color: '#ffffff' },
            },
            {
              name: 'FY2025: 17% Utilised',
              coord: ['FY2025', 5.3],
              value: '17%',
              itemStyle: { color: '#dc2626' },
              label: { fontWeight: 'bold', fontSize: 10, color: '#ffffff' },
            },
          ],
        },
      },
      {
        name: '100% Utilisation Target',
        type: 'line',
        yAxisIndex: 1,
        data: [],
        markLine: {
          symbol: 'none',
          silent: true,
          lineStyle: {
            type: 'dashed',
            color: isDarkMode ? '#fbbf24' : '#d97706',
            width: 1.5,
          },
          data: [
            {
              yAxis: 100,
              label: {
                formatter: '100% Target',
                position: 'insideEndTop',
                color: isDarkMode ? '#fbbf24' : '#d97706',
                fontSize: 10,
                fontWeight: 'bold',
              },
            },
          ],
        },
      },
    ],
  };
}
