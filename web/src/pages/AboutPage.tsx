import React from 'react';
import { Heart, Database, ShieldCheck } from 'lucide-react';
import { Disclaimer } from '../components/Disclaimer';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Caregiver Motivation */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl border border-emerald-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Caregiver Context & Personal Motivation
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Built by Cyril Sebastian — engineer, Docker Captain & CNCF Ambassador.
            </p>
          </div>
        </div>
        <div className="prose dark:prose-invert text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
          <p>
            This project was born out of direct, first-hand caregiving experience for a family member living with advanced dementia in India.
            Witnessing the agonizing delays in receiving a formal diagnosis, the acute dearth of cognitive neurologists, and the heavy, silent burden borne almost exclusively by family caregivers inspired this open-access data initiative.
          </p>
          <p>
            Dementia is not merely normal aging. Over <strong>8.8 million senior citizens</strong> in India suffer from Alzheimer's and related neurodegenerative disorders. Yet, fewer than 15% ever receive a clinical diagnosis.
            By democratizing these figures through transparent, interactive visualisations, we hope to support researchers, advocacy groups, and policymakers in building compassionate, equitable care infrastructure.
          </p>
        </div>
      </div>

      {/* Data Sources & Licenses */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Data Sources & Citations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Rigorous, peer-reviewed, and publicly accessible epidemiological datasets.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
          <div className="py-3">
            <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
              <span>Longitudinal Aging Study in India (LASI Wave 1)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">IIPS / MoHFW (2020)</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              National survey of 72,250 older adults across all states/UTs. Includes comprehensive cognitive assessment modules and individual survey sampling weights.
            </p>
          </div>

          <div className="py-3">
            <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
              <span>Global Burden of Disease (GBD 2021) & Lancet Projections</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">IHME / Lancet Public Health (2022)</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Country-level prevalence, mortality, DALY rates, and future disease burden forecasts up to 2050 (GBD 2021 Dementia Collaborators).
            </p>
          </div>

          <div className="py-3">
            <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
              <span>Global Dementia Observatory (GDO)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">World Health Organization</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              National policy status, awareness campaigns, diagnostic infrastructure, and caregiver support frameworks across member nations.
            </p>
          </div>

          <div className="py-3">
            <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
              <span>Indian Academy of Neurology (IAN) & Workforce Studies</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">AIAN / Neurology India</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              State-level distribution of registered clinical neurologists and subspecialists in cognitive and behavioural neurology.
            </p>
          </div>
        </div>
      </div>

      {/* Methodology & Ethics */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ethical Standards & Privacy
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Compliance with DPDP Act 2023 and Open Data Principles.
            </p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          All data hosted on this platform consists exclusively of aggregate statistical estimates and published epidemiological benchmarks.
          No personally identifiable information (PII) or protected health information (PHI) is ever collected, scraped, or stored.
          The complete source code and data pipelines are open source under the MIT license.
        </p>
      </div>

      {/* Legal & Clinical Disclaimer */}
      <Disclaimer />
    </div>
  );
};
