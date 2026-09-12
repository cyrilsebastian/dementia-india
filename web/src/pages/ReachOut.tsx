// SETUP REQUIRED: Cloudflare Turnstile
// 1. Go to dash.cloudflare.com → Turnstile → Add site
// 2. Site name: Dementia India Contact Form
// 3. Domain: dementia.cyrilsebastian.com
// 4. Widget mode: Managed (invisible by default, shows
//    challenge only if bot suspected)
// 5. Copy the Site Key and add to .env.local:
//    VITE_TURNSTILE_SITE_KEY=your_site_key_here
// 6. Copy the Secret Key and add to .env.local:
//    VITE_TURNSTILE_SECRET_KEY=your_secret_key_here
//    (secret key is for server-side validation —
//     see Task 4 for how we handle this without a server)

/**
 * @file ReachOut.tsx
 * @description Dedicated reach out and inquiry page for Project Dementia India.
 * Provides category-based routing for caregivers, researchers, institutions, and data reports.
 * Powered by Web3Forms for serverless form submissions.
 *
 * Note: actual email delivery requires the VITE_WEB3FORMS_KEY environment variable to be set.
 */

import React, { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import {
  Heart,
  Database,
  Building2,
  Flag,
  Mail,
  Github,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
  Send,
  MessageSquareHeart,
} from 'lucide-react';

export type NavTabType =
  | 'india'
  | 'family-guide'
  | 'specialist'
  | 'health-spending'
  | 'care-network'
  | 'about'
  | 'global'
  | 'reach-out';

interface ReachOutProps {
  onNavigate?: (tab: NavTabType) => void;
}

interface CategoryOption {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
  hasSubject: boolean;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'caregiver',
    label: 'I am a caregiver or family member',
    sublabel: 'Looking for guidance, resources, or support',
    icon: Heart,
    placeholder: 'Tell us what you are going through or what you need. There is no wrong way to say it.',
    hasSubject: false,
  },
  {
    id: 'researcher',
    label: 'I am a researcher or journalist',
    sublabel: 'Data requests, methodology, citations',
    icon: Database,
    placeholder: 'Describe your request, publication, or research context.',
    hasSubject: true,
  },
  {
    id: 'ngo',
    label: 'I represent an NGO or hospital',
    sublabel: 'Partnership, directory listing, corrections',
    icon: Building2,
    placeholder: 'Describe your organisation and what you would like to discuss.',
    hasSubject: true,
  },
  {
    id: 'correction',
    label: 'I want to report incorrect information',
    sublabel: 'Outdated contact, wrong data, factual error',
    icon: Flag,
    placeholder: 'Describe what information appears to be incorrect and where you saw it on the site.',
    hasSubject: false,
  },
];

export const ReachOut: React.FC<ReachOutProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileStatus, setTurnstileStatus] =
    useState<'idle' | 'solved' | 'error'>('idle');
  const turnstileRef = useRef<any>(null);

  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

  const handleCategorySelect = (category: CategoryOption) => {
    setSelectedCategory(category);
    setErrorMessage(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 2000) {
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setIsSuccess(false);
    setSubmittedEmail('');
    setErrorMessage(null);
    turnstileRef.current?.reset();
    setTurnstileToken('');
    setTurnstileStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      setErrorMessage('Please select what best describes your message before submitting.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Support mock submission for testing and verification without sending real emails
    if (WEB3FORMS_KEY === 'mock') {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmittedEmail(formData.email.trim());
      setIsSuccess(true);
      setIsSubmitting(false);
      turnstileRef.current?.reset();
      setTurnstileToken('');
      setTurnstileStatus('idle');
      return;
    }

    const payload = {
      access_key: WEB3FORMS_KEY,
      from_name: formData.name.trim(),
      email: formData.email.trim(),
      subject: `[Dementia India] ${selectedCategory.label}: ${formData.subject.trim() || 'New message'}`,
      message: formData.message.trim(),
      category: selectedCategory.label,
      redirect: false,
      'cf-turnstile-response': turnstileToken,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && result.success) {
        setSubmittedEmail(formData.email.trim());
        setIsSuccess(true);
        turnstileRef.current?.reset();
        setTurnstileToken('');
        setTurnstileStatus('idle');
      } else {
        // Handle mock or missing access key during development gracefully if needed, but per spec report failure
        throw new Error(result?.message || 'Submission failed');
      }
    } catch (err: unknown) {
      setErrorMessage(
        'Message could not be sent. Please email us directly at '
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateTo = (e: React.MouseEvent, tab: NavTabType) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(tab);
    } else {
      window.location.href = `/${tab === 'india' ? '' : tab}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <MessageSquareHeart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Reach Out
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              We read every message. Response time is typically 2 to 3 working days.
            </p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
          If you need urgent help for a family member, please use the helplines on the{' '}
          <a
            href="/care-network"
            onClick={(e) => handleNavigateTo(e, 'care-network')}
            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline inline-flex items-center gap-0.5"
          >
            Care Network page
          </a>{' '}
          — they are staffed 24x7 and can help immediately.
        </p>
      </div>

      {/* Success State */}
      {isSuccess ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 p-6 sm:p-8 shadow-sm animate-fadeIn">
          <div className="flex flex-col items-center text-center space-y-4 max-w-lg mx-auto py-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Message received
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We will respond to{' '}
              <span className="font-semibold text-slate-900 dark:text-white">
                {submittedEmail || 'your email'}
              </span>{' '}
              within 2 to 3 working days. If you are a caregiver in an urgent situation,
              please call the ARDSI helpline on{' '}
              <a
                href="tel:+919846198471"
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                +91 98461 98471
              </a>{' '}
              or Tele-MANAS on{' '}
              <a
                href="tel:14416"
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                14416
              </a>
              .
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* SECTION A — Category Selector */}
          <div className="space-y-4">
            <div className="px-1">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                What best describes your message?
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a category below to open the message form.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedCategory?.id === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className={`text-left p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-teal-500 dark:border-teal-400 bg-teal-50/60 dark:bg-teal-950/30 ring-2 ring-teal-500/20 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-3.5">
                      <div
                        className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                            : 'bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div
                          className={`text-sm font-semibold leading-snug ${
                            isSelected
                              ? 'text-teal-900 dark:text-teal-200'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {cat.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {cat.sublabel}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION B — The Form (Hidden until a card is selected) */}
          {selectedCategory && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Selected Category
                </span>
                <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedCategory.label}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Hidden Category Field */}
                <input type="hidden" name="category" value={selectedCategory.label} />

                {/* Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="form-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="form-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="form-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="form-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
                  />
                </div>

                {/* Subject (Only for Card 2 and Card 3) */}
                {selectedCategory.hasSubject && (
                  <div className="space-y-1.5">
                    <label
                      htmlFor="form-subject"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Subject
                    </label>
                    <input
                      id="form-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Data request for LASI prevalence figures"
                      className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
                    />
                  </div>
                )}

                {/* Message */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="form-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <span
                      className={`text-xs tabular-nums ${
                        formData.message.length >= 1950
                          ? 'text-rose-500 font-semibold'
                          : 'text-slate-400'
                      }`}
                    >
                      {formData.message.length} / 2000
                    </span>
                  </div>
                  <textarea
                    id="form-message"
                    name="message"
                    rows={5}
                    required
                    maxLength={2000}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={selectedCategory.placeholder}
                    className="w-full px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all resize-y leading-relaxed"
                  />
                </div>

                {/* Turnstile Widget */}
                <div className="pt-2">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                      setTurnstileStatus('solved');
                    }}
                    onError={() => {
                      setTurnstileStatus('error');
                    }}
                    onExpire={() => {
                      setTurnstileToken('');
                      setTurnstileStatus('idle');
                    }}
                    options={{
                      theme: 'dark',
                      size: 'normal',
                    }}
                  />

                  {turnstileStatus === 'error' && (
                    <p className="text-red-400 text-sm mt-1">
                      Verification failed. Please refresh and try again.
                    </p>
                  )}
                </div>

                {/* Submit Button & Inline Error */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    aria-label={!turnstileToken ? 'Complete verification to send' : 'Send message'}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send message</span>
                      </>
                    )}
                  </button>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs sm:text-sm text-rose-700 dark:text-rose-300 flex items-start space-x-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        {errorMessage}
                        <a
                          href="mailto:dementia@cyrilsebastian.com"
                          className="font-semibold underline hover:text-rose-900 dark:hover:text-rose-100 ml-1"
                        >
                          dementia@cyrilsebastian.com
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {/* SECTION E — Direct Contact (Always visible below the form) */}
      <div className="space-y-3">
        <div className="px-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Direct & Public Channels
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left card: Email */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2.5 text-slate-500 dark:text-slate-400">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Email directly
                </span>
              </div>
              <div>
                <a
                  href="mailto:dementia@cyrilsebastian.com"
                  className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 hover:underline break-all"
                >
                  dementia@cyrilsebastian.com
                </a>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
              For sensitive matters you prefer not to submit through a form
            </p>
          </div>

          {/* Right card: GitHub */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2.5 text-slate-500 dark:text-slate-400">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300">
                  <Github className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Report a data issue
                </span>
              </div>
              <div>
                <a
                  href="https://github.com/cyrilsebastian/dementia-india/issues/new?labels=data-quality&template=data_report.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center space-x-1"
                >
                  <span>Open a GitHub issue</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
              For factual errors, outdated information, or missing data — tracked publicly
            </p>
          </div>
        </div>
      </div>

      {/* SECTION F — Privacy Note */}
      <div className="text-center pt-2 pb-6 px-4 space-y-2">
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Messages submitted through this form are sent to{' '}
          <a
            href="mailto:dementia@cyrilsebastian.com"
            className="text-slate-600 dark:text-slate-300 hover:underline"
          >
            dementia@cyrilsebastian.com
          </a>{' '}
          via Web3Forms. Your name and email are used only to respond to your message. No data is stored
          on this platform. Read our full privacy approach on the{' '}
          <a
            href="/about"
            onClick={(e) => handleNavigateTo(e, 'about')}
            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
          >
            About & Methodology page
          </a>
          .
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          If you subscribed to the newsletter, your email is stored in Brevo and used only to send the monthly Dementia India update from hello@maildementia.cyrilsebastian.com. Replies go to dementia@cyrilsebastian.com. You can unsubscribe at any time using the link in any email we send.
        </p>
      </div>
    </div>
  );
};
