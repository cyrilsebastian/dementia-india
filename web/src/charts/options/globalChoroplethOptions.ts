/**
 * @file globalChoroplethOptions.ts
 * @description Options builder for World Choropleth Map in ECharts.
 * Supports Prevalence continuous gradient layer and WHO Policy categorical layer.
 */

import type { EChartsOption } from 'echarts';

export type MapLayerMode = 'prevalence' | 'policy';

export interface WorldMapDataItem {
  name: string;
  countryCode: string;
  value: number; // Prevalence % or Policy Score (0, 0.5, 1)
  prevalenceText?: string;
  policyText?: string;
}

export const buildGlobalChoroplethOptions = (
  items: WorldMapDataItem[],
  layer: MapLayerMode,
  isDark: boolean
): EChartsOption => {
  const mapData = items.map((d) => ({
    name: d.name,
    value: d.value,
    countryCode: d.countryCode,
    prevalenceText: d.prevalenceText,
    policyText: d.policyText,
  }));

  const visualMapConfig =
    layer === 'prevalence'
      ? {
          type: 'continuous' as const,
          min: 4.0,
          max: 11.5,
          orient: 'horizontal' as const,
          left: 'center',
          bottom: 10,
          text: ['High (11.5%)', 'Low (4.0%)'],
          textStyle: {
            color: isDark ? '#94a3b8' : '#64748b',
            fontSize: 11,
          },
          inRange: {
            color: isDark
              ? ['#0f766e', '#d97706', '#dc2626', '#881337']
              : ['#ccfbf1', '#fde68a', '#f87171', '#b91c1c'],
          },
          calculable: true,
        }
      : {
          type: 'piecewise' as const,
          orient: 'horizontal' as const,
          left: 'center',
          bottom: 10,
          pieces: [
            { value: 1.0, label: 'Plan Enacted', color: '#10b981' },
            { value: 0.5, label: 'In Development', color: '#f59e0b' },
            { value: 0.0, label: 'No Dedicated Plan', color: '#f43f5e' },
          ],
          textStyle: {
            color: isDark ? '#94a3b8' : '#64748b',
            fontSize: 11,
          },
        };

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
        if (!params.data) {
          return `<div style="font-weight:600;">${params.name}</div><div style="font-size:11px;color:#94a3b8;">No direct surveillance data</div>`;
        }
        const d = params.data;
        const code = d.countryCode ? ` (${d.countryCode})` : '';

        return `
          <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px;">
            ${d.name}${code}
          </div>
          <div style="font-size: 12px; line-height: 1.5;">
            <div>Prevalence (60+): <strong style="color:#f59e0b;">${d.prevalenceText || 'N/A'}</strong></div>
            <div>WHO National Plan: <strong>${d.policyText || 'Not Reported'}</strong></div>
          </div>
          <div style="font-size: 10px; color: ${isDark ? '#94a3b8' : '#64748b'}; margin-top: 4px;">
            Click country to open full dossier
          </div>
        `;
      },
    },
    visualMap: visualMapConfig,
    geo: {
      map: 'world',
      roam: true,
      zoom: 1.15,
      center: [15, 20],
      scaleLimit: { min: 0.8, max: 6 },
      label: { show: false },
      itemStyle: {
        areaColor: isDark ? '#1e293b' : '#f1f5f9',
        borderColor: isDark ? '#334155' : '#cbd5e1',
        borderWidth: 0.5,
      },
      emphasis: {
        label: { show: false },
        itemStyle: {
          areaColor: isDark ? '#475569' : '#e2e8f0',
          borderColor: isDark ? '#ffffff' : '#0f172a',
          borderWidth: 1.5,
        },
      },
    },
    series: [
      {
        name: layer === 'prevalence' ? 'Prevalence Rate' : 'National Policy Status',
        type: 'map',
        map: 'world',
        geoIndex: 0,
        data: mapData,
      },
    ],
  };
};
