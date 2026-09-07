/**
 * @file globalBubbleOptions.ts
 * @description ECharts options builder for the Hans Rosling style GDP vs Dementia Prevalence scatter chart.
 */

import type { EChartsOption } from 'echarts';

export interface CountryBubblePoint {
  countryCode: string;
  countryName: string;
  region: string;
  year: number;
  gdp: number;
  prevalence: number;
  cases: number;
}

export const REGION_COLORS: Record<string, string> = {
  Asia: '#10b981',      // Emerald
  Americas: '#0ea5e9',  // Sky
  Europe: '#6366f1',    // Indigo
  Africa: '#f59e0b',    // Amber
  Oceania: '#ec4899',   // Pink
};

export const buildGlobalBubbleOptions = (
  data: CountryBubblePoint[],
  year: number,
  isDark: boolean
): EChartsOption => {
  const yearData = data.filter((d) => d.year === year);

  // Group by region for multi-series legend
  const regions = ['Asia', 'Americas', 'Europe', 'Africa', 'Oceania'];
  const series = regions.map((region) => {
    const regionPoints = yearData.filter((d) => d.region === region);
    return {
      name: region,
      type: 'scatter' as const,
      data: regionPoints.map((d) => [
        d.gdp,
        d.prevalence,
        d.cases,
        d.countryName,
        d.countryCode,
      ]),
      itemStyle: {
        color: REGION_COLORS[region] || '#94a3b8',
        shadowBlur: 10,
        shadowColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)',
      },
      emphasis: {
        focus: 'series' as const,
        itemStyle: {
          borderColor: isDark ? '#ffffff' : '#0f172a',
          borderWidth: 2,
        },
      },
      symbolSize: (val: any[]) => {
        const cases = val[2] as number;
        // Proportional square-root radius between 14px and 60px
        const minSize = 14;
        const maxSize = 58;
        const normalized = Math.sqrt(cases) / 4000;
        return Math.max(minSize, Math.min(maxSize, minSize + normalized * (maxSize - minSize)));
      },
    };
  });

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
      borderColor: isDark ? '#334155' : '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: isDark ? '#f8fafc' : '#0f172a',
        fontSize: 12,
      },
      formatter: (params: any) => {
        const val = params.value as any[];
        const gdp = Number(val[0]).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
        const prev = Number(val[1]).toFixed(2);
        const cases = Number(val[2]).toLocaleString('en-US');
        const name = val[3];
        const code = val[4];

        return `
          <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px;">
            ${name} (${code})
          </div>
          <div style="display: grid; grid-template-columns: auto auto; gap: 4px 12px; font-size: 12px;">
            <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">GDP per Capita:</span>
            <strong>${gdp}</strong>
            <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">Prevalence (60+):</span>
            <strong style="color: #f59e0b;">${prev}%</strong>
            <span style="color: ${isDark ? '#94a3b8' : '#64748b'};">Est. Caseload:</span>
            <strong>${cases}</strong>
          </div>
        `;
      },
    },
    legend: {
      top: 0,
      right: 10,
      textStyle: {
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 11,
      },
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
    },
    grid: {
      top: 40,
      right: 30,
      bottom: 50,
      left: 55,
    },
    xAxis: {
      type: 'log',
      name: 'GDP per Capita (USD, Log Scale)',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 11,
      },
      min: 800,
      max: 120000,
      axisLabel: {
        color: isDark ? '#94a3b8' : '#64748b',
        formatter: (val: number) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`,
      },
      splitLine: {
        lineStyle: {
          color: isDark ? '#1e293b' : '#f1f5f9',
          type: 'dashed',
        },
      },
      axisLine: {
        lineStyle: {
          color: isDark ? '#334155' : '#cbd5e1',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: 'Prevalence Rate in 60+ Cohort (%)',
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: {
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 11,
      },
      min: 4,
      max: 14,
      axisLabel: {
        color: isDark ? '#94a3b8' : '#64748b',
        formatter: '{value}%',
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
    series,
  };
};
