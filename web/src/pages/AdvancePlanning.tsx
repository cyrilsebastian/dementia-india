/**
 * @file AdvancePlanning.tsx
 * @description Advance medical and legal planning for dementia patients and families in India.
 * Covers Living Wills (Advance Medical Directives under Common Cause 2018), execution steps, and practical financial checklists.
 */

import React from 'react';
import {
  Scale,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { NavTabType } from './ReachOut';

interface AdvancePlanningProps {
  onNavigate?: (tab: NavTabType) => void;
}

export const AdvancePlanning: React.FC<AdvancePlanningProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-16">
      {/* HEADER / INTRO */}
      <section className="bg-gradient-to-b from-blue-500/10 via-blue-500/5 to-transparent dark:from-blue-950/30 dark:via-blue-950/10 dark:to-transparent rounded-3xl border border-blue-200/80 dark:border-blue-800/50 p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-semibold border border-blue-300 dark:border-blue-800">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal &amp; Medical Directives</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Planning Ahead — While You Still Can
          </h1>

          <p className="text-base sm:text-lg font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
            An Advance Medical Directive lets you make medical decisions in advance, before you lose the ability to communicate them. In India, this is a legal right — and planning early is an act of love for your family.
          </p>

          {/* Prominent Legal Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 text-xs sm:text-sm font-medium leading-relaxed">
            <div className="flex items-center space-x-2 font-bold mb-1">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Important Legal Notice:</span>
            </div>
            This page provides general information about legal planning for dementia patients and families in India. It is not legal advice. Consult a lawyer for your specific situation.
          </div>
        </div>
      </section>

      {/* SUBSECTION 4A — What is an Advance Medical Directive */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Subsection 4A · Legal Framework
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            What is an Advance Medical Directive?
          </h2>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed">
          <p>
            An Advance Medical Directive (AMD) — also called a Living Will — is a written legal document that specifies the medical treatment you want or do not want if you become unable to communicate your wishes.
          </p>
          <p>
            In India, the Supreme Court recognised AMDs as legally valid in its landmark 2018 Common Cause judgment. This means any mentally competent adult in India can execute a Living Will today.
          </p>
        </div>

        <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          Legal Landmark:{' '}
          <a
            href="https://main.sci.gov.in/supremecourt/2005/215/215_2005_Judgement_09-Mar-2018.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            <span>Supreme Court of India, Common Cause v. Union of India, 2018</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* What an AMD can specify */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            What an AMD can specify:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Whether you want to be placed on a ventilator',
              'Whether you want cardiopulmonary resuscitation (CPR)',
              'Whether you want artificial nutrition through a tube',
              'Organ donation preferences',
              'Pain management and palliative care preferences',
              'Who should make decisions if you cannot (nominated surrogate)',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why this matters specifically for dementia */}
        <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 space-y-2">
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            Why this matters specifically for dementia:
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Dementia progressively removes the ability to make and communicate decisions. A person in late-stage dementia cannot consent to or refuse treatment. An AMD made early — ideally at or soon after diagnosis — ensures your wishes are followed and removes an impossible burden from your family.
          </p>
        </div>
      </section>

      {/* SUBSECTION 4B — How to execute an AMD in India */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Subsection 4B · Execution Protocol
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            How to execute an AMD in India
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Five clear, structured steps to ensure your directive is legally sound and recognized by medical teams.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              step: 1,
              title: 'Write the document',
              desc: 'Specify clearly what treatments you want and do not want. You can use a template — GetYellow.in and PalliumIndia.org both provide free templates in plain English.',
              links: [
                { name: 'getyellow.in', url: 'https://getyellow.in' },
                { name: 'palliumindia.org', url: 'https://palliumindia.org' },
              ],
            },
            {
              step: 2,
              title: 'Sign in front of two witnesses',
              desc: 'Two witnesses must be present who are not family members and have no financial interest in your estate.',
            },
            {
              step: 3,
              title: 'Get it notarised',
              desc: 'Signed in the presence of a notary or gazetted officer. This is what makes it legally binding.',
            },
            {
              step: 4,
              title: 'Register with your doctor',
              desc: 'Give a copy to your treating neurologist and ensure it is part of your medical file.',
            },
            {
              step: 5,
              title: 'Tell your family',
              desc: 'The document only works if your family knows it exists and where to find it.',
            },
          ].map((s) => (
            <div
              key={s.step}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 flex items-start space-x-4"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                {s.step}
              </div>
              <div className="space-y-1.5 min-w-0 flex-1">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
                {s.links && (
                  <div className="flex flex-wrap gap-3 pt-1 text-xs">
                    {s.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSECTION 4C — Financial and legal planning for families */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Subsection 4C · Practical Estate &amp; Legal Preparation
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Practical planning while the person can still participate in decisions
          </h2>
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Power of Attorney',
              desc: 'Assign someone to manage financial decisions if the patient loses capacity.',
            },
            {
              title: 'Property and asset documentation',
              desc: 'Gather all documents while the person can explain and confirm.',
            },
            {
              title: 'Bank account access',
              desc: 'Ensure at least one family member has joint access.',
            },
            {
              title: 'Insurance and benefits',
              desc: 'Document all policies, nominations, and claim procedures.',
            },
            {
              title: 'Will',
              desc: 'If not already made, this is the time to draft and execute a formal will.',
            },
            {
              title: 'Disability certificate',
              desc: 'Apply under RPwD Act 2016 — dementia qualifies. Enables tax benefits and priority access to government services.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
          &ldquo;These conversations are uncomfortable. Having them early — while the person with dementia can still participate — is far better than having them in crisis. A compassionate conversation now prevents painful disputes later.&rdquo;
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => onNavigate?.('family-guide')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>Return to Family Guide</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </section>

      {/* Bottom Legal Disclaimer */}
      <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
          Disclaimer: This guidance is informational only and does not substitute for consultation with a qualified legal advocate or notary. Legal provisions may vary based on state jurisprudence and individual competency assessments.
        </p>
      </div>
    </div>
  );
};

export default AdvancePlanning;
