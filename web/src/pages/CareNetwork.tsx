/**
 * @file CareNetwork.tsx
 * @description All-India Dementia Care Network directory.
 * Unifies specialized memory clinics, ARDSI NGO chapters, and verified emergency helplines
 * to support families, caregivers, and medical social workers across states.
 */

import React, { useState } from 'react';
import { Building2, Users, PhoneCall, AlertCircle } from 'lucide-react';
import { CareDirectory } from '../components/CareDirectory';
import { HelplineCard } from '../components/HelplineCard';
import type { HelplineRecord } from '../types/careNetwork';

export const CareNetwork: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clinics' | 'ngos' | 'helplines'>('clinics');

  // Static, verified mental health and dementia helplines
  const helplines: HelplineRecord[] = [
    {
      name: 'Tele-MANAS National Helpline',
      organization: 'Ministry of Health & Family Welfare, Govt of India',
      phone: '14416',
      hours: '24 Hours / 7 Days a Week',
      description: 'Comprehensive, multi-lingual national tele-mental health programme providing free psychological triage and psychiatric emergency counselling.',
      language: '20+ Indian Languages',
      isEmergency: true,
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
    {
      name: 'NIMHANS Tele-Consultation',
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
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-4 sm:p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-white/10 text-white shrink-0">
            <PhoneCall className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base">In Crisis or Need Immediate Guidance?</h3>
            <p className="text-xs text-emerald-100">
              Dial Govt. of India’s 24×7 toll-free Tele-MANAS helpline for immediate psychiatric triage and support.
            </p>
          </div>
        </div>
        <a
          href="tel:14416"
          className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 font-mono font-bold text-base shadow hover:bg-emerald-50 transition-colors shrink-0"
        >
          Call 14416 (Toll-Free)
        </a>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('clinics')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
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
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
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
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
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
