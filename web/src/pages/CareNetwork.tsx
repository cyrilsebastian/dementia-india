/**
 * @file CareNetwork.tsx
 * @description All-India Dementia Care Network directory.
 * Unifies specialized memory clinics, ARDSI NGO chapters, and verified emergency helplines
 * to support families, caregivers, and medical social workers across states.
 */

import React, { useState } from 'react';
import { Building2, Users, PhoneCall, AlertCircle, HeartHandshake, Clock, ShieldCheck, Award } from 'lucide-react';
import { CareDirectory } from '../components/CareDirectory';
import { HelplineCard } from '../components/HelplineCard';
import type { HelplineRecord } from '../types/careNetwork';

export const CareNetwork: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clinics' | 'ngos' | 'helplines'>('clinics');

  // Static, verified mental health and dementia helplines
  const helplines: HelplineRecord[] = [
    {
      name: 'Dementia India Alliance Support Line',
      organization: 'Dementia India Alliance (non-profit, est. 2018)',
      phone: '8585990990',
      hours: 'Mon–Sat, 8:00 AM – 6:00 PM',
      description: "India's only dementia-dedicated national helpline. Provides information, guidance, and referrals to memory clinics. Connects callers to free online memory screening at DemClinic.com led by 12 specialist neurologists and psychiatrists.",
      language: 'English, Hindi, Tamil, Malayalam, Kannada, Telugu',
      isEmergency: false,
      costBadge: '100% FREE',
    },
    {
      name: 'Tele-MANAS National Helpline',
      organization: 'Ministry of Health & Family Welfare, Govt of India',
      phone: '14416',
      hours: '24 Hours / 7 Days a Week',
      description: 'Comprehensive, multi-lingual national tele-mental health programme providing free psychological triage, psychiatric emergency counselling, and state tele-centre dispatch.',
      language: '20+ Indian Languages',
      isEmergency: true,
      isGovtTollFree: true,
    },
    {
      name: 'KIRAN Mental Health Helpline',
      organization: 'Dept. of Empowerment of Persons with Disabilities, Govt of India',
      phone: '1800-599-0019',
      hours: '24 Hours / 7 Days a Week',
      description: 'National toll-free 24×7 psychological first-aid, psychiatric rehabilitation guidance, and crisis intervention operating across all Indian states.',
      note: 'Note: KIRAN has been integrated into Tele-MANAS (14416) as of 2023. Calling this number may redirect to Tele-MANAS. Use 14416 as the primary number.',
      language: '13 Languages (English, Hindi, Assamese, Bengali, Gujarati, etc.)',
      isEmergency: true,
      isGovtTollFree: true,
      badge: {
        text: 'Integrated / See Tele-MANAS',
        color: 'amber',
      },
    },
    {
      name: 'Elderline National Senior Citizens Helpline',
      organization: 'Ministry of Social Justice & Empowerment & NISD',
      phone: '14567',
      hours: '8:00 AM – 8:00 PM (All 7 Days)',
      description: 'Toll-free national senior citizen service providing geriatric mental wellbeing guidance, elder care navigation, legal advice, and cognitive care linkages.',
      language: 'Regional State Languages & Hindi / English',
      isEmergency: false,
      isGovtTollFree: true,
    },
    {
      name: 'NIMHANS Tele-Consultation & Geriatric Clinic',
      organization: 'National Institute of Mental Health & Neurosciences',
      phone: '080-46110007',
      hours: 'Mon – Sat: 9:00 AM – 4:30 PM',
      description: 'Direct clinical neurological teleconsultation, geriatric cognitive triage, and memory disorder clinical guidance from India’s apex neuroscience institute.',
      language: 'English, Hindi, Kannada',
      isEmergency: false,
    },
    {
      name: 'ARDSI National Care Helpline',
      organization: 'Alzheimer’s & Related Disorders Society of India',
      phone: '+91 98461 98471',
      hours: 'Mon – Fri: 10:00 AM – 5:00 PM',
      description: 'Apex patient advocacy helpline providing family counselling, caregiver training linkages, memory clinic referrals, and local chapter navigation.',
      language: 'English, Hindi, Malayalam',
      isEmergency: false,
    },
    {
      name: 'iCall Psychosocial Helpline',
      organization: 'Tata Institute of Social Sciences (TISS)',
      phone: '9152987821',
      hours: 'Mon – Sat: 8:00 AM – 10:00 PM',
      description: 'Free, professional psychological counselling and mental healthcare navigation supported by trained psychiatric social workers.',
      language: 'English, Hindi, Marathi',
      isEmergency: false,
    },
    {
      name: 'Vandrevala Foundation Helpline',
      organization: 'Cyrus & Priya Vandrevala Foundation',
      phone: '9999 666 555',
      hours: '24 Hours / 7 Days a Week',
      description: '24×7 crisis intervention, caregiver distress counselling, and mental health support staffed by certified clinical psychologists.',
      language: 'Multiple Regional Languages',
      isEmergency: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              India Dementia Care Network
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verified directory of specialized memory clinics, ARDSI support chapters, and emergency helplines.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Navigating dementia care in India is often fragmented and overwhelming for families.
          This directory collates specialized memory assessment centres, grassroots caregiver support groups, and free 24×7 helplines into a single unified directory.
        </p>
      </div>

      {/* Emergency Helpline Highlight Bar */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-white/10 text-white shrink-0 mt-0.5 sm:mt-0">
            <PhoneCall className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base">In Crisis or Need Immediate Guidance?</h3>
            <p className="text-xs text-emerald-100">
              Dial Govt. of India’s 24×7 toll-free Tele-MANAS helpline for immediate psychiatric triage and support.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
          <a
            href="tel:14416"
            className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-mono font-bold text-xs sm:text-sm shadow hover:bg-emerald-50 transition-colors flex items-center space-x-1.5 min-h-[42px]"
          >
            <span>Tele-MANAS: 14416</span>
          </a>
          <a
            href="tel:14567"
            className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-mono font-bold text-xs sm:text-sm border border-emerald-400/40 transition-colors flex items-center space-x-1.5 min-h-[42px]"
            title="Elderline National Senior Citizens Helpline"
          >
            <span>Elderline: 14567</span>
          </a>
        </div>
      </div>

      {/* Caregiver Burden & Economic Reality Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Informal Caregiver Burden & Economic Reality
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Source: ARDSI Dementia India Report & WHO Global Dementia Observatory Benchmarks
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-200 dark:border-indigo-800">
            90%+ Home-Based Care
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Daily Care Time</span>
              <Clock className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              6.2 <span className="text-sm font-sans font-medium text-slate-500">hrs/day</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Surges to <strong>9.5 hrs/day</strong> in moderate-to-severe stages of neurodegeneration.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Gender Disparity</span>
              <Users className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
              72% <span className="text-sm font-sans font-medium text-slate-500">Female</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Overwhelmingly borne by spouses, daughters, and daughters-in-law without institutional aid.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Opportunity Cost</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
              ₹40k–₹1.5L
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Monthly lost income and foregone employment opportunities per household.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Respite Access</span>
              <ShieldCheck className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 tabular-nums">
              &lt; 10%
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Fewer than 1 in 10 Indian families have access to subsidized day-care or respite facilities.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setActiveTab('clinics')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 whitespace-nowrap ${
            activeTab === 'clinics'
              ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Hospitals & Memory Clinics</span>
        </button>

        <button
          onClick={() => setActiveTab('ngos')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 whitespace-nowrap ${
            activeTab === 'ngos'
              ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>NGO Chapters & Support</span>
        </button>

        <button
          onClick={() => setActiveTab('helplines')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 whitespace-nowrap ${
            activeTab === 'helplines'
              ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Helplines & Emergency</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'clinics' && <CareDirectory activeSection="clinics" />}
      {activeTab === 'ngos' && <CareDirectory activeSection="ngos" />}
      {activeTab === 'helplines' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 px-1">
            <AlertCircle className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              National Support Lines & Psychological Emergency Contacts
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {helplines.map((helpline, idx) => (
              <HelplineCard key={idx} helpline={helpline} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
