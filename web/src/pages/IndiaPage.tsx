import React from 'react';
import { StatCards } from '../components/StatCards';
import { IndiaChoropleth } from '../charts/IndiaChoropleth';
import { AgeOnsetBar } from '../charts/AgeOnsetBar';
import { UrbanRuralBar } from '../charts/UrbanRuralBar';
import { AlertCircle } from 'lucide-react';

export const IndiaPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Headline Stat Cards */}
      <StatCards />

      {/* Main Visualisation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Interactive Map */}
        <div className="lg:col-span-7 flex flex-col">
          <IndiaChoropleth />
        </div>

        {/* Right Column: Demographic Disparities */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1">
            <AgeOnsetBar />
          </div>
          <div className="flex-1">
            <UrbanRuralBar />
          </div>
        </div>
      </div>

      {/* Analytical Callout Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 shadow-sm">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              The Dual Crisis: Disproportionate Burden and Severe Specialist Deficit
            </h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Based on the <strong>Longitudinal Aging Study in India (LASI Wave 1)</strong>, an estimated <strong>8.8 million</strong> individuals aged 60 and above live with dementia in India.
              Prevalence rates exhibit steep geographical gradients, ranging from ~4.5% in Delhi to ~11.0% in Jammu & Kashmir and ~9.2% in Kerala.
              Simultaneously, rural cohorts face nearly double the risk of urban counterparts, exacerbated by low formal literacy and delayed clinical detection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
