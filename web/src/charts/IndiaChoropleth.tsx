/**
 * @file IndiaChoropleth.tsx
 * @description Interactive choropleth map of India displaying state-level dementia prevalence.
 * Wrapped inside ChartPanel for uniform styling, active filter pills, and inline data attribution.
 */

import React, { useEffect, useState, useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useCSV } from '../data/useCSV';
import { StateRecord } from '../types/data';
import { useFilters } from '../context/FilterContext';
import { getChoroplethOptions, MapDataPoint } from './options/choroplethOptions';
import { ChartPanel } from '../components/ChartPanel';

export const IndiaChoropleth: React.FC = () => {
  const { sex, urban, ageGroup, education, selectedState, setSelectedState, isDarkMode } = useFilters();
  const { data: statesData, loading: loadingCSV } = useCSV<StateRecord>('/data/india-states.csv');
  const [geoLoaded, setGeoLoaded] = useState(false);
  const chartRef = useRef<any>(null);

  // Load GeoJSON once and register with ECharts
  useEffect(() => {
    fetch('/india-states.geojson')
      .then((res) => res.json())
      .then((geoJson) => {
        echarts.registerMap('india', geoJson);
        setGeoLoaded(true);
      })
      .catch((err) => console.error('Failed to load India GeoJSON:', err));
  }, []);

  // Filter data according to current active filters
  const filteredData = useMemo(() => {
    if (!statesData.length) return [];
    return statesData.filter(
      (d) =>
        d.sex === sex &&
        d.urban === urban &&
        d.age_group === ageGroup &&
        d.education === education
    );
  }, [statesData, sex, urban, ageGroup, education]);

  // Map values for ECharts series
  const mapSeriesData: MapDataPoint[] = useMemo(() => {
    return filteredData.map((d) => ({
      name: d.state_name,
      value: d.prevalence_pct,
      lower: d.lower,
      upper: d.upper,
      est_cases: d.est_cases,
      population: d.population,
      state_code: d.state_code,
      selected: selectedState === d.state_code,
    }));
  }, [filteredData, selectedState]);

  const onChartClick = (params: any) => {
    if (params.data && params.data.state_code) {
      if (selectedState === params.data.state_code) {
        setSelectedState(null);
      } else {
        setSelectedState(params.data.state_code);
      }
    }
  };

  const handleExport = () => {
    if (chartRef.current) {
      const echartInstance = chartRef.current.getEchartsInstance();
      const url = echartInstance.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      });
      const a = document.createElement('a');
      a.href = url;
      a.download = `dementia-india-choropleth-${sex}-${urban}-${ageGroup}.png`;
      a.click();
    }
  };

  const activeBadges = [
    `Sex: ${sex}`,
    `Sector: ${urban}`,
    `Cohort: ${ageGroup}`,
    selectedState ? `State: ${selectedState}` : 'All India',
  ];

  if (!geoLoaded || loadingCSV) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center justify-center h-[380px] sm:h-[460px]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading India State Choropleth...</p>
        </div>
      </div>
    );
  }

  const option = getChoroplethOptions({ data: mapSeriesData, isDarkMode });

  return (
    <ChartPanel
      title="State-wise Dementia Prevalence Map"
      subtitle="Interactive choropleth displaying senior prevalence rates across all 36 Indian states and UTs."
      sourceLabel="LASI Wave 1, IIPS 2020"
      sourceUrl="https://iipsindia.ac.in/lasi"
      exportable={true}
      onExport={handleExport}
      activeFilterBadges={activeBadges}
    >
      <div className="w-full h-[380px] sm:h-[460px]">
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: '100%', width: '100%' }}
          onEvents={{ click: onChartClick }}
        />
      </div>
    </ChartPanel>
  );
};
