/**
 * @file GlobalBubble.tsx
 * @description Interactive Hans Rosling scatter bubble chart exploring the
 * relationship between national wealth (GDP per capita) and dementia prevalence in seniors (60+).
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useCSV } from '../data/useCSV';
import { CountryRecord, GDPRecord } from '../types/data';
import { ChartPanel } from '../components/ChartPanel';
import { buildGlobalBubbleOptions, CountryBubblePoint } from './options/globalBubbleOptions';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface GlobalBubbleProps {
  onSelectCountry?: (countryCode: string) => void;
}

export const GlobalBubble: React.FC<GlobalBubbleProps> = ({ onSelectCountry }) => {
  const chartRef = useRef<ReactECharts>(null);
  const { data: countries, loading: loadingCountries } = useCSV<CountryRecord>('/data/global-countries.csv');
  const { data: gdpRecords, loading: loadingGDP } = useCSV<GDPRecord>('/data/gdp-per-capita.csv');

  const [year, setYear] = useState<number>(2021);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 1x or 2x

  // Check dark mode
  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Join data: (country, year)
  const bubbleData = useMemo<CountryBubblePoint[]>(() => {
    if (!countries.length || !gdpRecords.length) return [];

    const gdpMap = new Map<string, number>();
    gdpRecords.forEach((g) => {
      gdpMap.set(`${g.country_code}_${g.year}`, Number(g.gdp_usd));
    });

    // Country baseline population approximations (in millions for 60+)
    const seniorPopMap: Record<string, number> = {
      IND: 138000000,
      CHN: 264000000,
      USA: 74000000,
      JPN: 43000000,
      DEU: 24000000,
      GBR: 16000000,
      FRA: 18000000,
      ITA: 18000000,
      BRA: 30000000,
      IDN: 28000000,
      NGA: 9500000,
      KOR: 16000000,
      AUS: 5500000,
      PAK: 12000000,
      BGD: 13000000,
    };

    const points: CountryBubblePoint[] = [];
    countries.forEach((c) => {
      if (c.age_group === '60+' && c.sex === 'Both' && c.measure === 'Prevalence') {
        const key = `${c.country_code}_${c.year}`;
        const gdp = gdpMap.get(key) || 2000;
        const seniorPop = seniorPopMap[c.country_code] || 10000000;
        const cases = Math.round((Number(c.value) / 100) * seniorPop);

        points.push({
          countryCode: c.country_code,
          countryName: c.country_name,
          region: c.region,
          year: Number(c.year),
          gdp,
          prevalence: Number(c.value),
          cases,
        });
      }
    });

    return points;
  }, [countries, gdpRecords]);

  // Animation player loop
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setYear((prev) => {
          if (prev >= 2021) {
            setIsPlaying(false);
            return 2021;
          }
          return prev + 1;
        });
      }, 700 / speed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, speed]);

  const options = useMemo(() => {
    return buildGlobalBubbleOptions(bubbleData, year, isDark);
  }, [bubbleData, year, isDark]);

  const onChartClick = (params: any) => {
    if (params.data && params.data[4] && onSelectCountry) {
      onSelectCountry(params.data[4]);
    }
  };

  const handleExport = () => {
    const echartsInstance = chartRef.current?.getEchartsInstance();
    if (!echartsInstance) return;
    const base64 = echartsInstance.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: isDark ? '#0f172a' : '#ffffff' });
    const link = document.createElement('a');
    link.download = `dementia-global-wealth-gradient-${year}.png`;
    link.href = base64;
    link.click();
  };

  if (loadingCountries || loadingGDP) {
    return (
      <div className="h-[420px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center animate-pulse">
        <span className="text-xs text-slate-400">Loading cross-national economic gradient...</span>
      </div>
    );
  }

  return (
    <ChartPanel
      title="Economic Gradient vs. Senior Dementia Prevalence"
      subtitle="Correlation of national GDP per capita against 60+ dementia prevalence. Bubble size proportional to absolute disease volume."
      sourceLabel="World Bank & IHME GBD 2021"
      sourceUrl="https://vizhub.healthdata.org/gbd-results/"
      exportable
      onExport={handleExport}
      activeFilterBadges={[`Year: ${year}`, 'Age: 60+', 'Sex: Both']}
    >
      <div className="flex flex-col h-full justify-between">
        {/* ECharts Canvas */}
        <div className="h-[340px] w-full">
          <ReactECharts
            ref={chartRef}
            option={options}
            style={{ height: '100%', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
            onEvents={{ click: onChartClick }}
          />
        </div>

        {/* Timeline & Playback Controls Bar */}
        <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Controls */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors flex items-center space-x-1 font-medium shadow-xs"
              title={isPlaying ? 'Pause timeline' : 'Play timeline (1990–2021)'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[11px] pr-1">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setYear((y) => Math.max(1990, y - 1));
              }}
              disabled={year <= 1990}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
              title="Previous Year"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setYear((y) => Math.min(2021, y + 1));
              }}
              disabled={year >= 2021}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
              title="Next Year"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setYear(1990);
              }}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Reset to 1990"
            >
              <RotateCcw className="w-3 h-3" />
            </button>

            <button
              onClick={() => setSpeed((s) => (s === 1 ? 2 : 1))}
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {speed}x
            </button>
          </div>

          {/* Slider */}
          <div className="flex-1 flex items-center space-x-3 max-w-sm sm:max-w-md mx-2">
            <span className="text-[11px] font-mono text-slate-400">1990</span>
            <input
              type="range"
              min="1990"
              max="2021"
              value={year}
              onChange={(e) => {
                setIsPlaying(false);
                setYear(Number(e.target.value));
              }}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span className="text-[11px] font-mono text-slate-400">2021</span>
          </div>

          {/* Active Year Callout */}
          <div className="text-right">
            <span className="text-base font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
              {year}
            </span>
          </div>
        </div>
      </div>
    </ChartPanel>
  );
};
