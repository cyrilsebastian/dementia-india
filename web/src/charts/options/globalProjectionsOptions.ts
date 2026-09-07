/**
 * @file globalProjectionsOptions.ts
 * @description Options builder for multi-country 1990–2050 forecast trajectories.
 * Historical data (1990–2021) styled as solid lines; Lancet projections (2021–2050) styled as dashed lines.
 */

import type { EChartsOption } from 'echarts';

export interface TrajectorySeriesItem {
  countryCode: string;
  countryName: string;
  color: string;
  isIndia: boolean;
  historicalPoints: [number, number][]; // [year, cases in millions]
  projectedPoints: [number, number][];  // [year, cases in millions]
}

export const buildGlobalProjectionsOptions = (
  seriesList: TrajectorySeriesItem[],
  isDark: boolean
): EChartsOption => {
  const echartsSeries: any[] = [];

  seriesList.forEach((item) => {
    // 1. Historical Segment (1990–2021)
    echartsSeries.push({
      name: item.countryName,
      type: 'line',
      smooth: true,
      showSymbol: false,
      data: item.historicalPoints,
      lineStyle: {
        width: item.isIndia ? 3.5 : 2,
        color: item.color,
        type: 'solid',
      },
      itemStyle: {
        color: item.color,
      },
      emphasis: {
        focus: 'series',
        lineStyle: { width: 4 },
      },
    });

    // 2. Projected Segment (2021–2050)
    echartsSeries.push({
      name: `${item.countryName} (Forecast)`,
      type: 'line',
      smooth: true,
      showSymbol: false,
      data: item.projectedPoints,
      lineStyle: {
        width: item.isIndia ? 3.5 : 2,
        color: item.color,
        type: 'dashed',
      },
      itemStyle: {
        color: item.color,
      },
      emphasis: {
        focus: 'series',
        lineStyle: { width: 4 },
      },
    });
  });

  // Add vertical markLine at 2021 on the first series
  if (echartsSeries.length > 0) {
    echartsSeries[0].markLine = {
      symbol: ['none', 'none'],
      silent: true,
      lineStyle: {
        color: isDark ? '#94a3b8' : '#64748b',
        type: 'dotted',
        width: 1.5,
      },
      label: {
        show: true,
        formatter: '2021 Forecast Threshold',
        position: 'insideEndTop',
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 10,
      },
      data: [{ xAxis: 2021 }],
    };
  }

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)',
      borderColor: isDark ? '#334155' : '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: isDark ? '#f8fafc' : '#0f172a',
        fontSize: 12,
      },
      formatter: (params: any) => {
        if (!Array.isArray(params) || params.length === 0) return '';
        const year = params[0].axisValue;
        const isProjected = Number(year) > 2021;

        let content = `
          <div style="font-weight: 700; margin-bottom: 4px;">
            Year: ${year} ${isProjected ? '<span style="color:#f59e0b;font-size:11px;">[Forecast Model]</span>' : ''}
          </div>
        `;

        // Filter unique countries to avoid repeating historical + forecast lines
        const seen = new Set<string>();
        params.forEach((p: any) => {
          const cleanName = p.seriesName.replace(' (Forecast)', '');
          if (!seen.has(cleanName) && p.value && p.value[1] !== undefined) {
            seen.add(cleanName);
            const val = Number(p.value[1]).toFixed(2);
            content += `
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 12px; margin-top: 2px;">
                <span style="display: inline-flex; align-items: center;">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${p.color}; margin-right: 6px;"></span>
                  ${cleanName}
                </span>
                <strong>${val}M cases</strong>
              </div>
            `;
          }
        });

        return content;
      },
    },
    legend: {
      top: 0,
      right: 10,
      textStyle: {
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 11,
      },
      // Show only historical names in legend to keep it clean
      data: seriesList.map((s) => s.countryName),
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
    },
    grid: {
      top: 40,
      right: 30,
      bottom: 30,
      left: 60,
    },
    xAxis: {
      type: 'value',
      min: 1990,
      max: 2050,
      interval: 10,
      axisLabel: {
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 11,
        formatter: '{value}',
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
      type: 'value',
      name: 'Estimated Cases (Millions)',
      nameTextStyle: {
        color: isDark ? '#94a3b8' : '#64748b',
        fontSize: 11,
      },
      axisLabel: {
        color: isDark ? '#94a3b8' : '#64748b',
        formatter: '{value}M',
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
    series: echartsSeries,
  };
};
