/**
 * @file IndiaPage.tsx
 * @description Main dashboard overview for Project Dementia India.
 * Assembles headline stat cards, national state choropleth, age-onset gradient,
 * and urban-rural risk distribution charts with interactive demographic filtering.
 */

import React, { lazy, Suspense } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StatCards } from '../components/StatCards';
import { EtiologyBreakdown } from '../components/EtiologyBreakdown';
import { AlertCircle } from 'lucide-react';
import { SubscribeForm } from '../components/SubscribeForm';
import { DeferredView } from '../components/DeferredView';

const IndiaChoropleth = lazy(() =>
  import('../charts/IndiaChoropleth').then((m) => ({ default: m.IndiaChoropleth }))
);
const AgeOnsetBar = lazy(() =>
  import('../charts/AgeOnsetBar').then((m) => ({ default: m.AgeOnsetBar }))
);
const UrbanRuralBar = lazy(() =>
  import('../charts/UrbanRuralBar').then((m) => ({ default: m.UrbanRuralBar }))
);

const ChartSkeleton: React.FC<{ heightClass: string; title: string }> = ({ heightClass, title }) => (
  <div
    className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center justify-center ${heightClass}`}
  >
    <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
    <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">Loading {title}...</p>
  </div>
);

export const IndiaPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <SEOHead
        title="Dementia in India — State-wise Prevalence Data and Statistics"
        description="State-wise dementia prevalence maps, cognitive neurologist availability, and demographic trends across India based on LASI Wave 1 and GBD 2021 data."
        path="/"
        keywords="dementia India statistics, dementia prevalence India state wise, Alzheimer's India data, dementia map India, LASI dementia study"
      />

      {/* Accessible Page Heading for SEO & Screen Readers / Agents */}
      <header className="sr-only">
        <h1>Dementia in India: Epidemiological Intelligence & State Prevalence Dashboard</h1>
      </header>

      {/* Headline Stat Cards (Pre-rendered for immediate LCP paint) */}
      <StatCards />

      {/* Main Visualisation Grid */}
      <section aria-label="Visualizations: National Prevalence and Demographics" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <h2 className="sr-only">Prevalence Maps and Demographic Disparities</h2>
        {/* Left Column: Interactive Map */}
        <div className="lg:col-span-7 flex flex-col">
          <DeferredView fallback={<ChartSkeleton heightClass="min-h-[500px] h-[500px]" title="State Prevalence Map" />}>
            <Suspense fallback={<ChartSkeleton heightClass="min-h-[500px] h-[500px]" title="State Prevalence Map" />}>
              <IndiaChoropleth />
            </Suspense>
          </DeferredView>
        </div>

        {/* Right Column: Demographic Disparities */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1">
            <DeferredView fallback={<ChartSkeleton heightClass="h-[210px] sm:h-[220px]" title="Age-Onset Gradient" />}>
              <Suspense fallback={<ChartSkeleton heightClass="h-[210px] sm:h-[220px]" title="Age-Onset Gradient" />}>
                <AgeOnsetBar />
              </Suspense>
            </DeferredView>
          </div>
          <div className="flex-1">
            <DeferredView fallback={<ChartSkeleton heightClass="h-[210px] sm:h-[220px]" title="Urban-Rural Distribution" />}>
              <Suspense fallback={<ChartSkeleton heightClass="h-[210px] sm:h-[220px]" title="Urban-Rural Distribution" />}>
                <UrbanRuralBar />
              </Suspense>
            </DeferredView>
          </div>
        </div>
      </section>

      {/* Etiology Breakdown: Alzheimer's vs Other Dementias */}
      <EtiologyBreakdown />

      {/* Analytical Callout Banner */}
      <section
        aria-label="Analytical Summary"
        className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 shadow-sm"
      >
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0">
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              The Dual Crisis: Disproportionate Burden and Severe Specialist Deficit
            </h2>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Based on the <strong>Longitudinal Aging Study in India (LASI Wave 1)</strong>, an estimated <strong>8.8 million</strong> individuals aged 60 and above live with dementia in India.
              Prevalence rates exhibit steep geographical gradients, ranging from ~4.5% in Delhi to ~11.0% in Jammu & Kashmir and ~9.2% in Kerala.
              Simultaneously, rural cohorts face nearly double the risk of urban counterparts, exacerbated by low formal literacy and delayed clinical detection.
            </p>
          </div>
        </div>
      </section>

      {/* Monthly Newsletter Subscription */}
      <SubscribeForm />
    </div>
  );
};

export default IndiaPage;

