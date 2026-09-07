/**
 * @file GlobalView.tsx
 * @description Global Dementia Intelligence Dashboard.
 * Integrates global macro statistics, Hans Rosling economic scatter bubbles,
 * 10-country comparative benchmarks, longitudinal 2050 forecast trajectories,
 * interactive world choropleth map, and country quick-inspector drawer.
 */

import React, { useState } from 'react';
import { Globe, BookOpen, ExternalLink } from 'lucide-react';
import { GlobalStatCards } from '../components/GlobalStatCards';
import { GlobalBubble } from '../charts/GlobalBubble';
import { GlobalComparisonBar } from '../charts/GlobalComparisonBar';
import { GlobalProjections } from '../charts/GlobalProjections';
import { GlobalChoropleth } from '../charts/GlobalChoropleth';
import { CountryDetailDrawer } from '../components/CountryDetailDrawer';

export const GlobalView: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Global Dementia Intelligence
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                  Live Surveillance
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cross-National Benchmarks, Economic Gradients & Longitudinal Projections
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Epidemiological synthesis combining the <strong>IHME Global Burden of Disease (GBD 2021)</strong>, the{' '}
          <strong>WHO Global Dementia Observatory (GDO)</strong>, <strong>World Bank Economic Indicators</strong>, and{' '}
          <strong>Lancet Commission 2050 Projections</strong>. Analyze how longevity, healthcare expenditure, and policy
          frameworks impact dementia trajectories worldwide.
        </p>
      </div>

      {/* 5 Macro Stat Cards */}
      <GlobalStatCards />

      {/* 2x2 Interactive Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Hans Rosling Bubble Chart */}
        <div className="w-full">
          <GlobalBubble onSelectCountry={setSelectedCountry} />
        </div>

        {/* Chart 2: 10-Nation Benchmark Grouped Bar */}
        <div className="w-full">
          <GlobalComparisonBar onSelectCountry={setSelectedCountry} />
        </div>

        {/* Chart 3: World Choropleth Map */}
        <div className="w-full">
          <GlobalChoropleth onSelectCountry={setSelectedCountry} />
        </div>

        {/* Chart 4: Multi-Country 2050 Forecast Trajectories */}
        <div className="w-full">
          <GlobalProjections onSelectCountry={setSelectedCountry} />
        </div>
      </div>

      {/* Methodology & Data Sources Footer */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-semibold">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>Global Methodology & Primary Citations</span>
        </div>
        <p className="leading-relaxed">
          National prevalence estimates for the 60+ population are harmonized from the Institute for Health Metrics and
          Evaluation (IHME) GBD 2021 results using Bayesian geospatial regression (DISMOD-MR 2.1). GDP per capita is
          sourced from the World Bank (constant 2017 PPP international dollars). Trajectory curves (2019–2050) utilize
          multivariate forecasting models published by Nichols et al. (<em>The Lancet Public Health</em>, 2022). WHO
          governance metrics are extracted from the Global Dementia Observatory (GDO) monitoring framework.
        </p>
        <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
          <a
            href="https://vizhub.healthdata.org/gbd-results/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            IHME GBD Results Tool <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href="https://www.who.int/data/gho/data/themes/topics/dementia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            WHO Global Dementia Observatory <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href="https://data.worldbank.org/indicator/NY.GDP.PCAP.PP.CD"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            World Bank Open Data <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <a
            href="https://www.thelancet.com/journals/lanpub/article/PIIS2468-2667(21)00249-8/fulltext"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            Lancet Public Health (2022) <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Country Detail Drawer (Drilldown) */}
      <CountryDetailDrawer
        countryCode={selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
};
