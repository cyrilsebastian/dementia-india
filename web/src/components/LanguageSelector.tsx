import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguageCode } from '../i18n';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguageCode = (i18n.language?.split('-')[0] || 'en') as SupportedLanguageCode;
  const currentLanguage =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === currentLanguageCode) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const setGoogleTranslateLanguage = (code: SupportedLanguageCode) => {
    try {
      const hostname = window.location.hostname;
      if (code === 'en') {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`;
        document.cookie = 'googtrans=/en/en; path=/;';
      } else {
        document.cookie = `googtrans=/en/${code}; path=/;`;
        document.cookie = `googtrans=/en/${code}; domain=${hostname}; path=/;`;
      }

      const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (combo) {
        combo.value = code;
        combo.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
      }
    } catch {
      // Ignore if cookies or DOM restricted
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('di_language') as SupportedLanguageCode | null;
    if (saved && saved !== 'en') {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
      if (!match || match[1] !== saved) {
        setGoogleTranslateLanguage(saved);
      }
    }
  }, []);

  const handleSelectLanguage = (code: SupportedLanguageCode) => {
    i18n.changeLanguage(code);
    try {
      localStorage.setItem('di_language', code);
    } catch {
      // Ignore storage errors in private browsing
    }
    setGoogleTranslateLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        <span className="font-semibold">{currentLanguage.nativeName}</span>
        <ChevronDown className="w-3 h-3 text-slate-400 dark:text-slate-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-52 max-h-80 overflow-y-auto rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
            Select Language / भाषा
          </div>
          <div className="py-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguageCode;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 dark:text-white leading-tight">
                      {lang.nativeName}
                    </span>
                    {lang.code !== 'en' && (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {lang.label}
                      </span>
                    )}
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
