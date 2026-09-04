/**
 * @file budgetWaterfallOptions.ts
 * @description ECharts option generator for the Health Budget Allocation Breakdown chart.
 * Shows Union Health Budget breakdown down to Mental Health and the Dementia funding gap.
 */

import type { EChartsOption } from 'echarts';
import { SPENDING_COLOURS } from '../../constants/colours';

export function getBudgetWaterfallOptions(isDarkMode: boolean): EChartsOption {
  // Categories representing the fiscal cascade
  const categories = [
    'Total Health Budget\n(MoHFW)',
    'General Healthcare\n& Infrastructure',
    'Total Mental Health\nAllocation',
    'Tele-MANAS\nTele-MH Program',
    'Dedicated Dementia\nLine Item'
  ];

  // Visualizing step allocation / breakdown values in ₹ Crore
  // 99,859 total -> 98,909 general -> 950 mental health -> 90 tele-manas -> 0 dementia
  const values = [
    { value: 99859, itemStyle: { color: SPENDING_COLOURS.TOTAL_HEALTH } },
    { value: 98909, itemStyle: { color: '#64748B' } },
    { value: 950, itemStyle: { color: SPENDING_COLOURS.MENTAL_HEALTH } },
    { value: 90, itemStyle: { color: SPENDING_COLOURS.TELE_MH } },
    { value: 0, itemStyle: { color: SPENDING_COLOURS.DEMENTIA_GAP } }
  ];

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
        const rawVal = item.value;
        const valFormatted = rawVal === 0 ? '₹0 Cr (No dedicated line item)' : `₹${rawVal.toLocaleString()} Crore`;
        return `<div class="p-1 font-sans">
          <div class="font-bold mb-1">${item.name.replace('\n', ' ')}</div>
          <div class="text-xs text-slate-400">Budget Allocation: <span class="font-semibold text-emerald-400">${valFormatted}</span></div>
          ${item.dataIndex === 4 ? '<div class="text-[11px] text-amber-400 mt-1">Folded into general disability & mental health — untracked</div>' : ''}
        </div>`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        color: subtextColor,
        fontSize: 11,
        interval: 0,
        lineHeight: 14
      },
      axisLine: { lineStyle: { color: isDarkMode ? '#334155' : '#cbd5e1' } }
    },
    yAxis: {
      type: 'log',
      name: '₹ Crore (Log Scale)',
      nameTextStyle: { color: subtextColor, fontSize: 11 },
      axisLabel: {
        color: subtextColor,
        fontSize: 10,
        formatter: (val: number) => `₹${val.toLocaleString()}`
      },
      splitLine: { lineStyle: { color: splitLineColor, type: 'dashed' } }
    },
    series: [
      {
        name: 'Allocation',
        type: 'bar',
        barWidth: '40%',
        data: values,
        label: {
          show: true,
          position: 'top',
          color: textColor,
          fontSize: 11,
          fontWeight: 600,
          formatter: (params: any) => {
            if (params.dataIndex === 4) return '₹0 (Data Gap)';
            return `₹${params.value.toLocaleString()} Cr`;
          }
        }
      }
    ]
  };
}
