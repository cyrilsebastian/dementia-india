/**
 * @file DementiaSubtypesDonut.tsx
 * @description Donut chart breaking down dementia etiology and subtypes globally.
 * Features Alzheimer's, Vascular, Mixed, Lewy Body, Frontotemporal, and Other causes,
 * paired with clinical callout insights.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { ChartPanel } from '../components/ChartPanel';

const SUBTYPE_DATA = [
  { name: "Alzheimer's disease", value: 62, color: '#6366f1' },
  { name: "Mixed (Alzheimer's + VaD)", value: 16, color: '#10b981' },
  { name: 'Vascular dementia (pure)', value: 15, color: '#0ea5e9' },
  { name: 'Lewy Body dementia', value: 4, color: '#f59e0b' },
  { name: 'Frontotemporal dementia', value: 2, color: '#ec4899' },
  { name: 'Other causes', value: 1, color: '#94a3b8' },
];

export const DementiaSubtypesDonut: React.FC = () => {
  const chartRef = useRef<ReactECharts>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const options = useMemo<EChartsOption>(() => {
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
        formatter: (params: any) => `
          <div style="font-weight: 700; margin-bottom: 2px;">${params.name}</div>
          <div style="font-size: 13px; color: ${params.color};">
            Global Share: <strong>${params.value}%</strong>
          </div>
        `,
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'middle',
        itemWidth: 10,
        itemHeight: 10,
        icon: 'circle',
        textStyle: {
          color: isDark ? '#cbd5e1' : '#475569',
          fontSize: 11,
        },
        formatter: (name: string) => {
          const item = SUBTYPE_DATA.find((d) => d.name === name);
          return `${name} (${item ? item.value : 0}%)`;
        },
      },
      series: [
        {
          name: 'Dementia Subtypes',
          type: 'pie',
          radius: ['45%', '75%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: isDark ? '#0f172a' : '#ffffff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              formatter: '{b}\n{c}%',
              color: isDark ? '#f8fafc' : '#0f172a',
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
          data: SUBTYPE_DATA.map((d) => ({
            name: d.name,
            value: d.value,
            itemStyle: { color: d.color },
          })),
        },
      ],
    };
  }, [isDark]);

  const handleExport = () => {
    const echartsInstance = chartRef.current?.getEchartsInstance();
    if (!echartsInstance) return;
    const base64 = echartsInstance.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: isDark ? '#0f172a' : '#ffffff' });
    const link = document.createElement('a');
    link.download = 'dementia-subtypes-etiology.png';
    link.href = base64;
    link.click();
  };

  return (
    <ChartPanel
      title="What causes dementia? Alzheimer's, Vascular and beyond"
      subtitle="Dementia is not a single disease. Alzheimer's is the most common cause, but not the only one."
      sourceLabel="GBD 2021 · Lancet Public Health 2022 (vascular dementia proportional allocation methodology)"
      sourceUrl="https://www.thelancet.com/journals/lanpub/article/PIIS2468-2667(21)00249-8/fulltext"
      exportable
      onExport={handleExport}
      activeFilterBadges={['Global Etiology', '6 Diagnostic Subtypes']}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        {/* Donut Chart Canvas */}
        <div className="h-[260px] w-full">
          <ReactECharts
            ref={chartRef}
            option={options}
            style={{ height: '100%', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
          />
        </div>

        {/* 3 Plain-Text Callout Lines */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
            <span>Alzheimer's accounts for 62% of all dementia cases globally.</span>
          </div>
          <div className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <span>All forms of dementia are progressive — currently no cure exists for any subtype.</span>
          </div>
          <div className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
            <span>
              Vascular dementia (from strokes or mini-strokes) is the most preventable form — blood pressure control
              reduces risk.
            </span>
          </div>
        </div>
      </div>
    </ChartPanel>
  );
};
