/**
 * @file AboutPage.tsx
 * @description About and Methodology documentation page.
 * Details caregiver motivation, public data sources (LASI, GBD, WHO GDO, IAN),
 * ethical standards under DPDP Act 2023, and embeds the official disclaimer.
 */

import React from 'react';
import { Heart, Database, ShieldCheck, ExternalLink } from 'lucide-react';
import { Disclaimer } from '../components/Disclaimer';
import { SubscribeForm } from '../components/SubscribeForm';

export const AboutPage: React.FC = () => {
  const sources = [
    {
      title: 'Longitudinal Aging Study in India (LASI Wave 1)',
      institution: 'IIPS / MoHFW (2020)',
      url: 'https://iipsindia.ac.in/lasi',
      description: 'National survey of 72,250 older adults across all states/UTs. Includes comprehensive cognitive assessment modules and individual survey sampling weights.',
    },
    {
      title: 'Global Burden of Disease (GBD 2021) & Lancet Projections',
      institution: 'IHME / Lancet Public Health (2022)',
      url: 'https://vizhub.healthdata.org/gbd-results',
      description: 'Country-level prevalence, mortality, DALY rates, and future disease burden forecasts up to 2050 (GBD 2021 Dementia Collaborators).',
    },
    {
      title: 'Global Dementia Observatory (GDO)',
      institution: 'World Health Organization (WHO)',
      url: 'https://www.who.int/data/gho/data/themes/global-dementia-observatory-gdo',
      description: 'National policy status, awareness campaigns, diagnostic infrastructure, and caregiver support frameworks across member nations.',
    },
    {
      title: 'Indian Academy of Neurology (IAN) & Workforce Studies',
      institution: 'AIAN / Neurology India',
      url: 'https://ianindia.org',
      description: 'State-level distribution of registered clinical neurologists and subspecialists in cognitive and behavioural neurology.',
    },
    {
      title: 'Alzheimer\'s and Related Disorders Society of India (ARDSI)',
      institution: 'Dementia India Report 2010 & Strategy 2018',
      url: 'https://ardsi.org',
      description: 'National epidemiological baseline (2010) and policy strategy (2018). Family caregiver distress surveys and non-pharmacological care standards across 22 regional chapters.',
    },
    {
      title: 'Union Health & Family Welfare Budgets',
      institution: 'PRS Legislative Research / Open Budgets India',
      url: 'https://prsindia.org/budgets',
      description: 'Union budget demands for grants (2014–2025), National Mental Health Programme allocations, and Tele-MANAS expenditures.',
    },
  ];

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
              Built by Cyril Sebastian, a DevOps and Platform Engineering consultant and a family caregiver.
            </p>
          </div>
        </div>
        <div className="prose dark:prose-invert text-sm text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
          <p>
            This project came from a personal place. Cyril's mother lives with advanced dementia. The delays in getting a formal diagnosis, the near-impossibility of finding a cognitive neurologist outside a major city, and the weight of caregiving carried almost entirely by family with little to no institutional support are not statistics. They are daily life. This platform started as a way to put numbers to what so many families in India are quietly going through.
          </p>
          <p>
            Dementia is not a normal part of getting older. More than 8.8 million Indians aged 60 and above live with Alzheimer's or a related condition. Fewer than 15 in every 100 will ever receive a formal diagnosis. This platform brings those numbers together in one place for researchers, caregivers, advocacy groups and policymakers, sourced from published data and presented as clearly as possible.
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
          {sources.map((src, idx) => (
            <div key={idx} className="py-3.5 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-semibold text-slate-900 dark:text-white">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>{src.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 w-fit">
                  {src.institution}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {src.description}
              </p>
            </div>
          ))}
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
          The complete source code and data pipelines are open source under the MIT license. This site uses Cloudflare Web Analytics, a cookieless and
          privacy-first analytics tool. No personal data is collected or stored. If you choose to subscribe to the newsletter,
          your email address is stored securely in Brevo (brevo.com) and used only to send the monthly Dementia India update.
          We do not share your email with anyone. Unsubscribe any time from any email.
        </p>
      </div>

      {/* Monthly Newsletter Subscription */}
      <SubscribeForm />

      {/* Legal & Clinical Disclaimer */}
      <Disclaimer />
    </div>
  );
};
