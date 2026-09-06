/**
 * @file mentalHealthTrendOptions.ts
 * @description ECharts option generator for Union Mental Health Budget Trends (FY2021-2025).
 * Plots allocation in ₹ Crore alongside share percentage of the overall health budget.
 */

import type { EChartsOption } from 'echarts';
import type { HealthSpendingRecord } from '../../types/healthSpending';
import { SPENDING_COLOURS } from '../../constants/colours';

export function getMentalHealthTrendOptions(
  data: HealthSpendingRecord[],
  isDarkMode: boolean
): EChartsOption {
  const sortedData = [...data].sort((a, b) => a.year - b.year);
  const years = sortedData.map((d) => `FY ${d.year}`);
  const amounts = sortedData.map((d) => d.mental_health_cr);
  const percentages = sortedData.map((d) => d.mental_health_pct);

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
        const year = params[0].name;
        const d = sortedData[params[0].dataIndex];
        return `<div class="p-1 font-sans">
          <div class="font-bold mb-1">${year}</div>
          <div class="text-xs text-slate-400">Mental Health Budget: <span class="font-semibold text-emerald-400">₹${d.mental_health_cr} Crore</span></div>
          <div class="text-xs text-slate-400">Share of Total Health: <span class="font-semibold text-sky-400">${d.mental_health_pct}%</span></div>
          <div class="text-xs text-slate-400">Tele-MANAS Program: <span class="font-semibold text-slate-300">₹${d.tele_mh_cr} Crore</span></div>
        </div>`;
      }
    },
    legend: {
      data: ['Mental Health Budget (₹ Cr)', '% of Total Health Budget'],
      textStyle: { color: subtextColor, fontSize: 11 },
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      top: '16%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLabel: { color: subtextColor, fontSize: 11 },
      axisLine: { lineStyle: { color: isDarkMode ? '#334155' : '#cbd5e1' } }
    },
    yAxis: [
      {
        type: 'value',
        name: '₹ Crore',
        nameTextStyle: { color: subtextColor, fontSize: 11 },
        min: 300,
        max: 1100,
        axisLabel: { color: subtextColor, fontSize: 11, formatter: '₹{value} Cr' },
        splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } }
      },
      {
        type: 'value',
        name: '% Share',
        nameTextStyle: { color: subtextColor, fontSize: 11 },
        min: 0.7,
        max: 1.5,
        axisLabel: { color: subtextColor, fontSize: 11, formatter: '{value}%' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: 'Mental Health Budget (₹ Cr)',
        type: 'line',
        data: amounts,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: SPENDING_COLOURS.MENTAL_HEALTH },
        lineStyle: { width: 3, color: SPENDING_COLOURS.MENTAL_HEALTH },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.25)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.0)' }
            ]
          }
        }
      },
      {
        name: '% of Total Health Budget',
        type: 'line',
        yAxisIndex: 1,
        data: percentages,
        smooth: true,
        symbol: 'diamond',
        symbolSize: 7,
        itemStyle: { color: SPENDING_COLOURS.TOTAL_HEALTH },
        lineStyle: { width: 2, type: 'dashed', color: SPENDING_COLOURS.TOTAL_HEALTH }
      }
    ]
  };
}
