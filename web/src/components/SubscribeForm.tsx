/**
 * @file SubscribeForm.tsx
 * @description Monthly newsletter subscription form integrated with Brevo.
 * Submits new subscriber contacts to Brevo list with source attribution metadata.
 */

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

interface SubscribeFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const SubscribeForm: React.FC<SubscribeFormProps> = ({
  title = 'Stay Informed with Dementia India Updates',
  subtitle = 'Get monthly epidemiological research summaries, newly mapped care facilities, and caregiver resources delivered to your inbox.',
  className = '',
}) => {
  const [formData, setFormData] = useState({ email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const apiKey = import.meta.env.VITE_BREVO_API_KEY;

      const payload = {
        email: emailTrimmed,
        // Brevo list ID — verify this matches your actual list ID
        // Brevo dashboard → Contacts → Lists → your list → check URL
        // URL format: brevo.com/contact/list/details/ID
        // Default assumption is 2 — updated to list ID 3 per Brevo dashboard (list-listing/id/3)
        listIds: [3],
        updateEnabled: false,
        attributes: {
          SOURCE: 'website',
          SIGNUP_PAGE: typeof window !== 'undefined' ? window.location.pathname : '/',
          SIGNUP_DATE: new Date().toISOString().split('T')[0],
        },
      };

      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': apiKey || '',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        setStatus('success');
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (
          errorData.message?.toLowerCase().includes('already') ||
          errorData.code === 'duplicate_parameter'
        ) {
          setStatus('duplicate');
        } else {
          setStatus('error');
          setErrorMessage(errorData.message || 'Something went wrong. Please try again.');
        }
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div
      className={`bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 rounded-2xl border border-emerald-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm ${className}`}
    >
      <div className="max-w-xl mx-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-sm">
          <Mail className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {status === 'success' ? (
          <div className="p-4 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm flex items-center justify-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              Thank you for subscribing! You’ll receive our monthly Dementia India update.
            </span>
          </div>
        ) : status === 'duplicate' ? (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm flex items-center justify-center space-x-2 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>You are already subscribed to the monthly newsletter with this email address.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ email: e.target.value })}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-1.5 shrink-0"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs sm:text-sm text-rose-700 dark:text-rose-300 flex items-center justify-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage || 'Unable to subscribe. Please try again later.'}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Sent once monthly from{' '}
              <span className="font-mono text-slate-600 dark:text-slate-300">
                hello@maildementia.cyrilsebastian.com
              </span>
              . No spam, ever. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
