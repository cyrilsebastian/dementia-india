/**
 * @file internationalSpendOptions.ts
 * @description ECharts option generator for international comparison of mental health budget allocation.
 * Compares India's mental health percentage with global peers (UK, Australia, USA).
 */

import type { EChartsOption } from 'echarts';
import { SPENDING_COLOURS } from '../../constants/colours';

export function getInternationalSpendOptions(isDarkMode: boolean): EChartsOption {
  // Sorted ascending for horizontal bar (highest on top)
  const data = [
    { country: 'India (MoHFW 2025)', pct: 1.05, isIndia: true, note: 'National Health Accounts / Union Budget' },
    { country: 'United States', pct: 7.1, isIndia: false, note: 'SAMHSA / National Health Expenditure' },
    { country: 'Australia', pct: 8.5, isIndia: false, note: 'AIHW Mental Health Services' },
    { country: 'United Kingdom (NHS)', pct: 13.7, isIndia: false, note: 'NHS England Mental Health Dashboard' }
  ];

  const countries = data.map((d) => d.country);
  const values = data.map((d) => ({
    value: d.pct,
    itemStyle: {
      color: d.isIndia ? SPENDING_COLOURS.INDIA_BAR : SPENDING_COLOURS.GLOBAL_BAR
    },
    note: d.note
  }));

  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
  const subtextColor = isDarkMode ? '#94a3b8' : '#64748b';
  const splitLineColor = isDarkMode ? '#1e293b' : '#f1f5f9';

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      borderColor: isDarkMode ? '#334155' : '#e2e8f0',
      textStyle: { color: textColor },
      formatter: (params: any) => {
        const item = params[0];
        if (!item) return '';
        const rawItem = data[item.dataIndex];
        return `<div class="p-1 font-sans">
          <div class="font-bold mb-1">${rawItem.country}</div>
          <div class="text-xs text-slate-400">Mental Health Budget: <span class="font-semibold text-emerald-400">${rawItem.pct}%</span> of total health</div>
          <div class="text-[11px] text-slate-500 mt-1">${rawItem.note}</div>
        </div>`;
      }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '6%',
      top: '6%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '% of National Health Budget',
      nameTextStyle: { color: subtextColor, fontSize: 11 },
      max: 16,
      axisLabel: { color: subtextColor, fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: countries,
      axisLabel: {
        color: textColor,
        fontSize: 12,
        fontWeight: 'bold'
      },
      axisLine: { lineStyle: { color: isDarkMode ? '#334155' : '#cbd5e1' } }
    },
    series: [
      {
        name: 'Mental Health %',
        type: 'bar',
        barWidth: '45%',
        data: values,
        label: {
          show: true,
          position: 'right',
          color: textColor,
          fontSize: 12,
          fontWeight: 600,
          formatter: '{c}%'
        }
      }
    ]
  };
}
