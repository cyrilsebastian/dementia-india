/**
 * @file choroplethOptions.ts
 * @description Generates the ECharts configuration object for the India State Choropleth map.
 * Enforces neutral pale blue to deep red color gradient, dark mode styling, and rich tooltip formatting.
 */

import { CHOROPLETH_COLOURS, THEME_COLOURS } from '../../constants/colours';
import { PREVALENCE_THRESHOLDS } from '../../constants/thresholds';

export interface MapDataPoint {
  name: string;
  value: number;
  lower: number;
  upper: number;
  est_cases: number;
  population: number;
  state_code: string;
  selected: boolean;
}

interface GetChoroplethOptionsParams {
  data: MapDataPoint[];
  isDarkMode: boolean;
}

export function getChoroplethOptions({ data, isDarkMode }: GetChoroplethOptionsParams) {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      borderColor: isDarkMode ? THEME_COLOURS.DARK_BORDER : THEME_COLOURS.LIGHT_BORDER,
      borderWidth: 1,
      textStyle: {
        color: isDarkMode ? '#f8fafc' : '#0f172a',
        fontSize: 12,
      },
      formatter: (params: any) => {
        if (!params.data) return `${params.name}: No data`;
        const { name, value, lower, upper, est_cases, population } = params.data;
        return `
          <div style="font-family: Inter, sans-serif; min-width: 180px;">
            <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px; border-bottom: 1px solid ${
              isDarkMode ? '#334155' : '#e2e8f0'
            }; padding-bottom: 4px;">
              ${name}
            </div>
            <div style="display: flex; justify-content: space-between; margin: 3px 0;">
              <span style="color: ${isDarkMode ? '#94a3b8' : '#64748b'};">Prevalence:</span>
              <strong style="color: ${CHOROPLETH_COLOURS.CRITICAL_RED};">${value ? value.toFixed(2) : 0}%</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 3px 0; font-size: 11px;">
              <span style="color: ${isDarkMode ? '#94a3b8' : '#64748b'};">95% CI:</span>
              <span>[${lower?.toFixed(1)}% – ${upper?.toFixed(1)}%]</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 3px 0;">
              <span style="color: ${isDarkMode ? '#94a3b8' : '#64748b'};">Est. Cases:</span>
              <strong style="color: #0284c7;">${est_cases ? Number(est_cases).toLocaleString() : 'N/A'}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 3px 0; font-size: 11px;">
              <span style="color: ${isDarkMode ? '#94a3b8' : '#64748b'};">Cohort Pop:</span>
              <span>${population ? Number(population).toLocaleString() : 'N/A'}</span>
            </div>
            <div style="margin-top: 6px; font-size: 10px; color: ${isDarkMode ? '#64748b' : '#94a3b8'}; text-align: center;">
              Click state to inspect sub-breakdown
            </div>
          </div>
        `;
      },
    },
    visualMap: {
      min: PREVALENCE_THRESHOLDS.MIN_DISPLAY_PCT,
      max: PREVALENCE_THRESHOLDS.MAX_DISPLAY_PCT,
      left: 'left',
      bottom: 'bottom',
      text: ['High (20%)', 'Low (2%)'],
      textStyle: {
        color: isDarkMode ? '#94a3b8' : '#64748b',
        fontSize: 11,
      },
      calculable: true,
      inRange: {
        // Pale blue (low prevalence) -> Deep Red (high prevalence)
        color: [...CHOROPLETH_COLOURS.RANGE],
      },
    },
    series: [
      {
        name: 'Dementia Prevalence',
        type: 'map',
        map: 'india',
        roam: true,
        scaleLimit: { min: 0.8, max: 4 },
        zoom: 1.1,
        emphasis: {
          label: {
            show: true,
            color: isDarkMode ? '#f8fafc' : '#0f172a',
            fontWeight: 'bold',
          },
          itemStyle: {
            areaColor: '#38bdf8',
            borderColor: '#0284c7',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
        select: {
          label: {
            show: true,
            color: '#ffffff',
            fontWeight: 'bold',
          },
          itemStyle: {
            areaColor: THEME_COLOURS.SELECTION_HIGHLIGHT,
            borderColor: '#4f46e5',
            borderWidth: 2.5,
          },
        },
        itemStyle: {
          borderColor: isDarkMode ? THEME_COLOURS.DARK_BORDER : '#cbd5e1',
          borderWidth: 0.8,
          areaColor: isDarkMode ? '#1e293b' : '#f1f5f9',
        },
        data,
      },
    ],
  };
}
