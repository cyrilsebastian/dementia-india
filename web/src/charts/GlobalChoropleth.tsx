/**
 * @file GlobalChoropleth.tsx
 * @description Interactive World Choropleth Map with dual-layer support:
 * 1. Global 60+ Dementia Prevalence Rate (%)
 * 2. WHO GDO National Dementia Plan Readiness Status
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useCSV } from '../data/useCSV';
import { CountryRecord, PolicyRecord } from '../types/data';
import { ChartPanel } from '../components/ChartPanel';
import {
  buildGlobalChoroplethOptions,
  MapLayerMode,
  WorldMapDataItem,
} from './options/globalChoroplethOptions';
import { Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface GlobalChoroplethProps {
  onSelectCountry?: (countryCode: string) => void;
}

export const GlobalChoropleth: React.FC<GlobalChoroplethProps> = ({ onSelectCountry }) => {
  const chartRef = useRef<ReactECharts>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [layer, setLayer] = useState<MapLayerMode>('prevalence');

  const { data: countries, loading: loadingCountries } = useCSV<CountryRecord>('/data/global-countries.csv');
  const { data: policies, loading: loadingPolicies } = useCSV<PolicyRecord>('/data/global-who-policy.csv');

  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Fetch and register world GeoJSON
  useEffect(() => {
    fetch('/world.json')
      .then((res) => res.json())
      .then((geoJson) => {
        echarts.registerMap('world', geoJson);
        setMapLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load /world.json:', err);
      });
  }, []);

  // Construct map dataset
  const mapData = useMemo<WorldMapDataItem[]>(() => {
    if (!countries.length) return [];

    const prevMap = new Map<string, { name: string; val: number }>();
    countries.forEach((c) => {
      if (c.year === 2021 && c.age_group === '60+' && c.sex === 'Both' && c.measure === 'Prevalence') {
        prevMap.set(c.country_code, { name: c.country_name, val: Number(c.value) });
      }
    });

    const policyMap = new Map<string, { text: string; num: number }>();
    policies.forEach((p) => {
      policyMap.set(p.country_code, { text: p.value_text, num: Number(p.value_numeric) });
    });

    const items: WorldMapDataItem[] = [];
    prevMap.forEach((info, code) => {
      const pol = policyMap.get(code);
      const isPrevalence = layer === 'prevalence';

      items.push({
        name: info.name,
        countryCode: code,
        value: isPrevalence ? info.val : (pol ? pol.num : 0),
        prevalenceText: `${info.val.toFixed(2)}%`,
        policyText: pol ? pol.text : 'Not Reported',
      });
    });

    return items;
  }, [countries, policies, layer]);

  const options = useMemo(() => {
    if (!mapLoaded) return {};
    return buildGlobalChoroplethOptions(mapData, layer, isDark);
  }, [mapLoaded, mapData, layer, isDark]);

  const onChartClick = (params: any) => {
    if (params.data && params.data.countryCode && onSelectCountry) {
      onSelectCountry(params.data.countryCode);
    }
  };

  const handleZoom = (zoomIn: boolean) => {
    const inst = chartRef.current?.getEchartsInstance();
    if (!inst) return;
    const currentOpt: any = inst.getOption();
    const currentZoom = currentOpt.geo?.[0]?.zoom || 1.15;
    const nextZoom = zoomIn ? currentZoom * 1.3 : currentZoom / 1.3;
    inst.setOption({ geo: { zoom: Math.max(0.8, Math.min(6, nextZoom)) } });
  };

  const handleResetView = () => {
    const inst = chartRef.current?.getEchartsInstance();
    if (!inst) return;
    inst.setOption({ geo: { zoom: 1.15, center: [15, 20] } });
  };

  const handleExport = () => {
    const inst = chartRef.current?.getEchartsInstance();
    if (!inst) return;
    const base64 = inst.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: isDark ? '#0f172a' : '#ffffff' });
    const link = document.createElement('a');
    link.download = `dementia-world-map-${layer}.png`;
    link.href = base64;
    link.click();
  };

  if (!mapLoaded || loadingCountries || loadingPolicies) {
    return (
      <div className="h-[420px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center animate-pulse">
        <span className="text-xs text-slate-400">Loading global boundaries & epidemiological layer...</span>
      </div>
    );
  }

  return (
    <ChartPanel
      title="Global Surveillance & Policy Preparedness Map"
      subtitle="Interactive cartographic view of age-standardized dementia prevalence and WHO Global Action Plan policy status."
      sourceLabel="WHO Global Dementia Observatory & IHME GBD 2021"
      sourceUrl="https://www.who.int/data/gho/data/themes/topics/dementia"
      exportable
      onExport={handleExport}
      activeFilterBadges={[
        layer === 'prevalence' ? 'Layer: 60+ Prevalence Rate' : 'Layer: National Action Plan',
        'Interactive Pan & Zoom',
      ]}
    >
      <div className="relative flex flex-col h-full justify-between">
        {/* Layer Selector Tabs & Navigation Tools */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
          <div className="flex items-center space-x-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
            <button
              onClick={() => setLayer('prevalence')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 ${
                layer === 'prevalence'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Prevalence Rate</span>
            </button>
            <button
              onClick={() => setLayer('policy')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 ${
                layer === 'policy'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3 mr-1" />
              <span>WHO Policy</span>
            </button>
          </div>
        </div>

        {/* Map Zoom / Reset Controls */}
        <div className="absolute top-2 right-2 z-10 flex flex-col space-y-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <button
            onClick={() => handleZoom(true)}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom(false)}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetView}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            title="Reset Map View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ECharts Canvas */}
        <div className="h-[360px] w-full">
          <ReactECharts
            ref={chartRef}
            option={options}
            style={{ height: '100%', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
            onEvents={{ click: onChartClick }}
          />
        </div>
      </div>
    </ChartPanel>
  );
};
