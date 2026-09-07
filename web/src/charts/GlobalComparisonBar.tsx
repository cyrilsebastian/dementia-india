/**
 * @file GlobalComparisonBar.tsx
 * @description 10-Country benchmark bar chart comparing India directly against
 * peer global economies across prevalence, caseload, DALYs, and diagnostic gaps.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useCSV } from '../data/useCSV';
import { CountryRecord } from '../types/data';
import { ChartPanel } from '../components/ChartPanel';
import {
  buildGlobalComparisonOptions,
  MetricKey,
  ComparisonCountryItem,
} from './options/globalComparisonOptions';

interface GlobalComparisonBarProps {
  onSelectCountry?: (countryCode: string) => void;
}

const PEER_COUNTRIES = [
  { code: 'IND', name: 'India', dalys: 1340, diagnosisGap: 88, seniorPop: 138000000 },
  { code: 'CHN', name: 'China', dalys: 1420, diagnosisGap: 72, seniorPop: 264000000 },
  { code: 'USA', name: 'United States', dalys: 1780, diagnosisGap: 38, seniorPop: 74000000 },
  { code: 'JPN', name: 'Japan', dalys: 2150, diagnosisGap: 24, seniorPop: 43000000 },
  { code: 'DEU', name: 'Germany', dalys: 1820, diagnosisGap: 32, seniorPop: 24000000 },
  { code: 'GBR', name: 'United Kingdom', dalys: 1710, diagnosisGap: 34, seniorPop: 16000000 },
  { code: 'BRA', name: 'Brazil', dalys: 1460, diagnosisGap: 76, seniorPop: 30000000 },
  { code: 'IDN', name: 'Indonesia', dalys: 1180, diagnosisGap: 84, seniorPop: 28000000 },
  { code: 'NGA', name: 'Nigeria', dalys: 980, diagnosisGap: 92, seniorPop: 9500000 },
  { code: 'AUS', name: 'Australia', dalys: 1690, diagnosisGap: 31, seniorPop: 5500000 },
];

export const GlobalComparisonBar: React.FC<GlobalComparisonBarProps> = ({ onSelectCountry }) => {
  const chartRef = useRef<ReactECharts>(null);
  const { data: countries, loading } = useCSV<CountryRecord>('/data/global-countries.csv');
  const [metric, setMetric] = useState<MetricKey>('prevalence');

  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const items = useMemo<ComparisonCountryItem[]>(() => {
    if (!countries.length) return [];

    // Filter to year 2021, age 60+, sex Both, measure Prevalence
    const map2021 = new Map<string, number>();
    countries.forEach((c) => {
      if (c.year === 2021 && c.age_group === '60+' && c.sex === 'Both' && c.measure === 'Prevalence') {
        map2021.set(c.country_code, Number(c.value));
      }
    });

    return PEER_COUNTRIES.map((p) => {
      const prev = map2021.get(p.code) || 7.5;
      const cases = Math.round((prev / 100) * p.seniorPop);

      let val = prev;
      let formatted = `${prev.toFixed(1)}%`;

      if (metric === 'cases') {
        val = cases;
        if (cases >= 1000000) {
          formatted = `${(cases / 1000000).toFixed(2)}M`;
        } else {
          formatted = `${(cases / 1000).toFixed(0)}k`;
        }
      } else if (metric === 'dalys') {
        val = p.dalys;
        formatted = `${p.dalys.toLocaleString()}`;
      } else if (metric === 'diagnosis_gap') {
        val = p.diagnosisGap;
        formatted = `${p.diagnosisGap}%`;
      }

      return {
        countryCode: p.code,
        countryName: p.name,
        value: val,
        formattedValue: formatted,
        isIndia: p.code === 'IND',
      };
    });
  }, [countries, metric]);

  const options = useMemo(() => {
    return buildGlobalComparisonOptions(items, metric, isDark);
  }, [items, metric, isDark]);

  const onChartClick = (params: any) => {
    const sorted = [...items].sort((a, b) => a.value - b.value);
    const clicked = sorted[params.dataIndex];
    if (clicked && onSelectCountry) {
      onSelectCountry(clicked.countryCode);
    }
  };

  const handleExport = () => {
    const echartsInstance = chartRef.current?.getEchartsInstance();
    if (!echartsInstance) return;
    const base64 = echartsInstance.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: isDark ? '#0f172a' : '#ffffff' });
    const link = document.createElement('a');
    link.download = `dementia-10-country-benchmark-${metric}.png`;
    link.href = base64;
    link.click();
  };

  const tabs: { key: MetricKey; label: string }[] = [
    { key: 'prevalence', label: 'Prevalence %' },
    { key: 'cases', label: 'Total Cases' },
    { key: 'dalys', label: 'DALYs / 100k' },
    { key: 'diagnosis_gap', label: 'Diagnosis Void' },
  ];

  if (loading) {
    return (
      <div className="h-[420px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center animate-pulse">
        <span className="text-xs text-slate-400">Loading 10-country comparative benchmark...</span>
      </div>
    );
  }

  return (
    <ChartPanel
      title="10-Nation Dementia Benchmark"
      subtitle="Cross-national comparison of India against peer developed and emerging economies (2021 benchmarks)."
      sourceLabel="IHME GBD 2021 & WHO GDO"
      sourceUrl="https://vizhub.healthdata.org/gbd-results/"
      exportable
      onExport={handleExport}
      activeFilterBadges={['10 Benchmark Economies', 'Year: 2021']}
    >
      <div className="flex flex-col h-full justify-between">
        {/* Metric Selector Pills */}
        <div className="flex items-center space-x-1.5 mb-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setMetric(tab.key)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                metric === tab.key
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ECharts Canvas */}
        <div className="h-[320px] w-full">
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
