import React, { useEffect, useState, useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useCSV } from '../data/useCSV';
import { StateRecord } from '../types/data';
import { useFilters } from '../context/FilterContext';
import { Download } from 'lucide-react';

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
  const mapSeriesData = useMemo(() => {
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

  if (!geoLoaded || loadingCSV) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex items-center justify-center h-[540px]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading India State Choropleth...</p>
        </div>
      </div>
    );
  }

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      borderColor: isDarkMode ? '#334155' : '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: isDarkMode ? '#f8fafc' : '#0f172a',
        fontSize: 12,
      },
      formatter: (params: any) => {
        if (!params.data) return `${params.name}: No data`;
        const { name, value, lower, upper, est_cases, population } = params.data;
        return `
          <div style="font-family: Inter, sans-serif; min-width: 170px;">
            <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px; border-bottom: 1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}; padding-bottom: 4px;">
              ${name}
            </div>
            <div style="display: flex; justify-content: space-between; margin: 3px 0;">
              <span style="color: ${isDarkMode ? '#94a3b8' : '#64748b'};">Prevalence:</span>
              <strong style="color: #ef4444;">${value ? value.toFixed(2) : 0}%</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 3px 0; font-size: 11px;">
              <span style="color: ${isDarkMode ? '#94a3b8' : '#64748b'};">95% CI:</span>
              <span>[${lower?.toFixed(1)}% – ${upper?.toFixed(1)}%]</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 3px 0;">
              <span style="color: ${isDarkMode ? '#94a3b8' : '#64748b'};">Est. Patients:</span>
              <strong style="color: #10b981;">${est_cases ? Number(est_cases).toLocaleString() : 'N/A'}</strong>
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
      min: 2,
      max: 20,
      left: 'left',
      bottom: 'bottom',
      text: ['High (20%)', 'Low (2%)'],
      textStyle: {
        color: isDarkMode ? '#94a3b8' : '#64748b',
        fontSize: 11,
      },
      calculable: true,
      inRange: {
        color: ['#a7f3d0', '#fde047', '#fb923c', '#ef4444', '#991b1b'],
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
            areaColor: '#6366f1',
            borderColor: '#4f46e5',
            borderWidth: 2.5,
          },
        },
        itemStyle: {
          borderColor: isDarkMode ? '#334155' : '#cbd5e1',
          borderWidth: 0.8,
          areaColor: isDarkMode ? '#1e293b' : '#f1f5f9',
        },
        data: mapSeriesData,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm relative flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center space-x-2">
            <span>State-wise Dementia Prevalence Map</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              60+ Cohort
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any state boundary to filter demographic and specialist charts.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center space-x-1"
            title="Export Map Image"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[460px]">
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: '100%', width: '100%' }}
          onEvents={{ click: onChartClick }}
        />
      </div>
    </div>
  );
};
