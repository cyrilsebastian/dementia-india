/**
 * @file globalComparisonOptions.ts
 * @description Options builder for 10-country comparative benchmark bar chart.
 */

import type { EChartsOption } from 'echarts';

export type MetricKey = 'prevalence' | 'cases' | 'dalys' | 'diagnosis_gap';

export interface ComparisonCountryItem {
  countryCode: string;
  countryName: string;
  value: number;
  formattedValue: string;
  isIndia: boolean;
}

export const buildGlobalComparisonOptions = (
  items: ComparisonCountryItem[],
  metric: MetricKey,
  isDark: boolean
): EChartsOption => {
  // Sort descending by value so highest burden is on top
  const sorted = [...items].sort((a, b) => a.value - b.value);

  const metricTitles: Record<MetricKey, { unit: string; axis: string }> = {
    prevalence: { unit: '%', axis: 'Prevalence in 60+ Cohort (%)' },
    cases: { unit: '', axis: 'Total Estimated Caseload' },
    dalys: { unit: 'per 100k', axis: 'Age-Standardized DALYs per 100k' },
    diagnosis_gap: { unit: '%', axis: 'Undiagnosed Population Rate (%)' },
  };

  const meta = metricTitles[metric];

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
      borderColor: isDark ? '#334155' : '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: isDark ? '#f8fafc' : '#0f172a',
        fontSize: 12,
      },
      formatter: (params: any) => {
        const item = params[0];
        const dataItem = sorted[item.dataIndex];
        return `
          <div style="font-weight: 700; margin-bottom: 2px;">
            ${dataItem.countryName} (${dataItem.countryCode})
          </div>
          <div style="font-size: 13px; color: ${dataItem.isIndia ? '#f59e0b' : (isDark ? '#38bdf8' : '#0284c7')};">
            ${meta.axis}: <strong>${dataItem.formattedValue}</strong>
          </div>
        `;
      },
    },
    grid: {
      top: 15,
      right: 40,
      bottom: 25,
      left: 110,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 11,
        formatter: (val: number) => {
          if (metric === 'cases') {
            if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
            if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
            return `${val}`;
          }
          if (metric === 'prevalence' || metric === 'diagnosis_gap') {
            return `${val}%`;
          }
          return `${val}`;
        },
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#1e293b' : '#f1f5f9',
        },
      },
      axisLine: {
        lineStyle: {
          color: isDark ? '#334155' : '#cbd5e1',
        },
      },
    },
    yAxis: {
      type: 'category',
      data: sorted.map((d) => d.countryName),
      axisLabel: {
        color: (value?: string | number) => {
          if (value === 'India') return '#f59e0b';
          return isDark ? '#cbd5e1' : '#334155';
        },
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: isDark ? '#334155' : '#cbd5e1',
        },
      },
      axisTick: { show: false },
    },
    series: [
      {
        name: meta.axis,
        type: 'bar',
        data: sorted.map((d) => ({
          value: d.value,
          itemStyle: {
            color: d.isIndia
              ? '#f59e0b' // Accent amber for India
              : isDark
              ? '#3b82f6'
              : '#0284c7',
            borderRadius: [0, 4, 4, 0],
          },
        })),
        label: {
          show: true,
          position: 'right',
          color: isDark ? '#94a3b8' : '#64748b',
          fontSize: 11,
          formatter: (params: any) => sorted[params.dataIndex].formattedValue,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 8,
            shadowColor: 'rgba(0,0,0,0.3)',
          },
        },
      },
    ],
  };
};
