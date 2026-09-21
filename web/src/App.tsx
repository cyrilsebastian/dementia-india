import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterProvider } from './context/FilterContext';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { IndiaPage } from './pages/IndiaPage';
import { SpecialistPage } from './pages/SpecialistPage';
import { HealthSpending } from './pages/HealthSpending';
import { CareNetwork } from './pages/CareNetwork';
import { GlobalView } from './pages/GlobalView';
import { AboutPage } from './pages/AboutPage';
import { FamilyGuide } from './pages/FamilyGuide';
import { BrainHealth } from './pages/BrainHealth';
import { Research } from './pages/Research';
import { AdvancePlanning } from './pages/AdvancePlanning';
import { ReachOut, NavTabType } from './pages/ReachOut';
import { SubscribePopup } from './components/SubscribePopup';

export const AppContent: React.FC = () => {
  const getInitialTab = (): NavTabType => {
    const path = window.location.pathname.replace(/^\/+/, '');
    const hash = window.location.hash.replace(/^#\/?/, '');
    const target = hash || path;
    if (target === 'india') return 'india';
    if (target === 'brain-health') return 'brain-health';
    if (target === 'research') return 'research';
    if (target === 'advance-planning') return 'advance-planning';
    if (target === 'specialist') return 'specialist';
    if (target === 'health-spending') return 'health-spending';
    if (target === 'care-network') return 'care-network';
    if (target === 'global') return 'global';
    if (target === 'reach-out') return 'reach-out';
    if (target === 'about') return 'about';
    if (target === 'family-guide') return 'family-guide';
    // Family Guide is the primary landing view
    return 'family-guide';
  };

  const [activeTab, setActiveTab] = useState<NavTabType>(getInitialTab);
  const { t } = useTranslation('common');

  React.useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getInitialTab());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  React.useEffect(() => {
    try {
      const savedLang = localStorage.getItem('di_language');
      if (savedLang && savedLang !== 'en') {
        setTimeout(() => {
          const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
          if (combo) {
            combo.value = savedLang;
            combo.dispatchEvent(new Event('change'));
          }
        }, 150);
      }
    } catch {
      // Ignore
    }
  }, [activeTab]);

  const handleTabChange = (tab: NavTabType) => {
    setActiveTab(tab);
    if (tab === 'family-guide') {
      window.history.pushState(null, '', '/family-guide');
    } else if (tab === 'india') {
      window.history.pushState(null, '', '/india');
    } else if (tab === 'brain-health') {
      window.history.pushState(null, '', '/brain-health');
    } else if (tab === 'research') {
      window.history.pushState(null, '', '/research');
    } else if (tab === 'advance-planning') {
      window.history.pushState(null, '', '/advance-planning');
    } else if (tab === 'reach-out') {
      window.history.pushState(null, '', '/reach-out');
    } else if (tab === 'care-network') {
      window.history.pushState(null, '', '/care-network');
    } else if (tab === 'about') {
      window.history.pushState(null, '', '/about');
    } else {
      window.history.pushState(null, '', `/#${tab}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
      {activeTab === 'india' && <FilterBar />}

      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeTab === 'family-guide' && <FamilyGuide onNavigate={handleTabChange} />}
        {activeTab === 'india' && <IndiaPage />}
        {activeTab === 'brain-health' && <BrainHealth onNavigate={handleTabChange} />}
        {activeTab === 'research' && <Research onNavigate={handleTabChange} />}
        {activeTab === 'advance-planning' && <AdvancePlanning onNavigate={handleTabChange} />}
        {activeTab === 'specialist' && <SpecialistPage />}
        {activeTab === 'health-spending' && <HealthSpending />}
        {activeTab === 'care-network' && <CareNetwork />}
        {activeTab === 'global' && <GlobalView />}
        {activeTab === 'reach-out' && <ReachOut onNavigate={handleTabChange} />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Time-triggered subscription popup */}
      <SubscribePopup />

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span>{t('footer.title', { defaultValue: 'Project Dementia India · Open Health Data Platform' })}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
            <button
              type="button"
              onClick={() => {
                handleTabChange('about');
                setTimeout(() => {
                  document.getElementById('disclaimer')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:underline transition-colors cursor-pointer"
            >
              {t('footer.disclaimer', { defaultValue: 'Disclaimer' })}
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a href="https://github.com/cyrilsebastian/dementia-india" target="_blank" rel="noreferrer" className="hover:underline">
              {t('footer.github', { defaultValue: 'GitHub Repository' })}
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a href="https://cyrilsebastian.com" target="_blank" rel="noreferrer" className="hover:underline">
              cyrilsebastian.com
            </a>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <a
              href="https://status.cyrilsebastian.com"
              target="_blank"
              rel="noreferrer"
              className="hover:underline inline-flex items-center gap-1.5"
              title="Live monitoring of web portals"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              {t('footer.status', { defaultValue: 'Status' })}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <FilterProvider>
      <AppContent />
    </FilterProvider>
  );
};

export default App;
