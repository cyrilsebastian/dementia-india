/**
 * @file globalComparisonOptions.ts
 * @description Options builder for 10-country comparative benchmark charts.
 * Supports standard single-metric bar charts (prevalence, cases, DALYs, diagnosis gap)
 * and the 3-series grouped horizontal bar chart for Care Infrastructure.
 */

import type { EChartsOption } from 'echarts';

export type MetricKey = 'prevalence' | 'cases' | 'dalys' | 'diagnosis_gap' | 'care_infrastructure';

export interface ComparisonCountryItem {
  countryCode: string;
  countryName: string;
  value: number;
  formattedValue: string;
  isIndia: boolean;
}

export interface CareInfrastructureItem {
  country: string;
  neurologists: number;
  psychiatrists: number;
  beds: number;
}

export const CARE_INFRASTRUCTURE_DATA: CareInfrastructureItem[] = [
  { country: 'India', neurologists: 0.3, psychiatrists: 0.3, beds: 2.1 },
  { country: 'Nigeria', neurologists: 0.1, psychiatrists: 0.1, beds: 0.6 },
  { country: 'Indonesia', neurologists: 0.3, psychiatrists: 0.4, beds: 1.4 },
  { country: 'China', neurologists: 2.2, psychiatrists: 2.2, beds: 22.0 },
  { country: 'Brazil', neurologists: 1.8, psychiatrists: 3.2, beds: 9.3 },
  { country: 'United States', neurologists: 5.1, psychiatrists: 12.4, beds: 14.4 },
  { country: 'Australia', neurologists: 4.9, psychiatrists: 13.5, beds: 28.0 },
  { country: 'United Kingdom', neurologists: 4.5, psychiatrists: 14.6, beds: 50.6 },
  { country: 'Germany', neurologists: 5.8, psychiatrists: 15.2, beds: 41.1 },
  { country: 'Japan', neurologists: 4.8, psychiatrists: 10.1, beds: 73.1 },
];

export const buildCareInfrastructureOptions = (isDark: boolean): EChartsOption => {
  // Sort ascending by beds + psychiatrists + neurologists so lowest (India/Nigeria) at bottom
  const sorted = [...CARE_INFRASTRUCTURE_DATA].sort(
    (a, b) => (a.neurologists + a.psychiatrists + a.beds) - (b.neurologists + b.psychiatrists + b.beds)
  );

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
        if (!Array.isArray(params) || params.length === 0) return '';
        const country = params[0].axisValue;
        const isIndia = country === 'India';

        let html = `
          <div style="font-weight: 700; margin-bottom: 4px; ${isIndia ? 'color: #f59e0b;' : ''}">
            ${country} ${isIndia ? '★' : ''}
          </div>
        `;

        params.forEach((p: any) => {
          html += `
            <div style="display: flex; justify-content: space-between; gap: 12px; font-size: 11px; margin-top: 2px;">
              <span>
                <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.color}; margin-right:5px;"></span>
                ${p.seriesName}:
              </span>
              <strong>${Number(p.value).toFixed(1)} / 100k</strong>
            </div>
          `;
        });
        return html;
      },
    },
    legend: {
      top: 0,
      right: 10,
      textStyle: {
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 11,
      },
      icon: 'roundRect',
      itemWidth: 12,
      itemHeight: 8,
    },
    grid: {
      top: 35,
      right: 35,
      bottom: 25,
      left: 110,
    },
    xAxis: {
      type: 'value',
      name: 'Per 100,000 Population',
      nameLocation: 'middle',
      nameGap: 25,
      nameTextStyle: {
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 10,
      },
      axisLabel: {
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 11,
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
      data: sorted.map((d) => d.country),
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
        name: 'Neurologists / 100k',
        type: 'bar',
        data: sorted.map((d) => d.neurologists),
        itemStyle: {
          color: '#10b981', // Emerald
          borderRadius: [0, 2, 2, 0],
        },
        markLine: {
          symbol: ['none', 'none'],
          silent: true,
          lineStyle: {
            color: '#ef4444',
            type: 'dashed',
            width: 1.5,
          },
          label: {
            show: true,
            formatter: 'WHO min threshold (1.0)',
            position: 'insideEndTop',
            color: '#ef4444',
            fontSize: 10,
          },
          data: [{ xAxis: 1.0 }],
        },
      },
      {
        name: 'Psychiatrists / 100k',
        type: 'bar',
        data: sorted.map((d) => d.psychiatrists),
        itemStyle: {
          color: '#0ea5e9', // Sky Blue
          borderRadius: [0, 2, 2, 0],
        },
      },
      {
        name: 'Psychiatric Beds / 100k',
        type: 'bar',
        data: sorted.map((d) => d.beds),
        itemStyle: {
          color: '#8b5cf6', // Purple
          borderRadius: [0, 2, 2, 0],
        },
      },
    ],
  };
};

export const buildGlobalComparisonOptions = (
  items: ComparisonCountryItem[],
  metric: MetricKey,
  isDark: boolean
): EChartsOption => {
  if (metric === 'care_infrastructure') {
    return buildCareInfrastructureOptions(isDark);
  }

  // Sort descending by value so highest burden is on top
  const sorted = [...items].sort((a, b) => a.value - b.value);

  const metricTitles: Record<string, { unit: string; axis: string }> = {
    prevalence: { unit: '%', axis: 'Prevalence in 60+ Cohort (%)' },
    cases: { unit: '', axis: 'Total Estimated Caseload' },
    dalys: { unit: 'per 100k', axis: 'Age-Standardized DALYs per 100k' },
    diagnosis_gap: { unit: '%', axis: 'Undiagnosed Population Rate (%)' },
  };

  const meta = metricTitles[metric] || { unit: '', axis: '' };

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
