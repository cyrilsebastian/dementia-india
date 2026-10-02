import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FilterProvider } from './context/FilterContext';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { SubscribePopup } from './components/SubscribePopup';
import type { NavTabType } from './pages/ReachOut';

const FamilyGuide      = lazy(() => import('./pages/FamilyGuide'));
const IndiaOverview    = lazy(() => import('./pages/IndiaOverview'));
const CareNetwork      = lazy(() => import('./pages/CareNetwork'));
const HealthSpending   = lazy(() => import('./pages/HealthSpending'));
const GlobalView       = lazy(() => import('./pages/GlobalView'));
const BrainHealth      = lazy(() => import('./pages/BrainHealth'));
const AdvancePlanning  = lazy(() => import('./pages/AdvancePlanning'));
const Research         = lazy(() => import('./pages/Research'));
const About            = lazy(() => import('./pages/About'));
const ReachOut         = lazy(() => import('./pages/ReachOut'));
const SpecialistPage   = lazy(() => import('./pages/SpecialistPage'));

export const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('common');

  const getTabFromPath = (pathname: string): NavTabType => {
    const clean = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
    if (!clean || clean === 'india') return 'india';
    if (clean === 'family-guide') return 'family-guide';
    if (clean === 'brain-health') return 'brain-health';
    if (clean === 'research') return 'research';
    if (clean === 'advance-planning') return 'advance-planning';
    if (clean === 'specialist' || clean === 'specialist-deserts') return 'specialist';
    if (clean === 'health-spending') return 'health-spending';
    if (clean === 'care-network') return 'care-network';
    if (clean === 'global' || clean === 'global-view') return 'global';
    if (clean === 'reach-out') return 'reach-out';
    if (clean === 'about') return 'about';
    return 'india';
  };

  const activeTab = getTabFromPath(location.pathname);

  // Backward compatibility: redirect any legacy hash URLs to clean BrowserRouter paths
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const hashRouteMap: Record<string, string> = {
        'india': '/',
        'family-guide': '/family-guide',
        'care-network': '/care-network',
        'brain-health': '/brain-health',
        'specialist': '/specialist-deserts',
        'specialist-deserts': '/specialist-deserts',
        'health-spending': '/health-spending',
        'global': '/global-view',
        'global-view': '/global-view',
        'advance-planning': '/advance-planning',
        'research': '/research',
        'about': '/about',
        'reach-out': '/reach-out',
      };
      if (hashRouteMap[hash]) {
        navigate(hashRouteMap[hash], { replace: true });
      }
    }
  }, [navigate]);

  useEffect(() => {
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
  }, [location.pathname]);

  const handleTabChange = (tab: NavTabType) => {
    const routeMap: Record<NavTabType, string> = {
      'india': '/',
      'family-guide': '/family-guide',
      'care-network': '/care-network',
      'brain-health': '/brain-health',
      'specialist': '/specialist-deserts',
      'health-spending': '/health-spending',
      'global': '/global-view',
      'advance-planning': '/advance-planning',
      'research': '/research',
      'about': '/about',
      'reach-out': '/reach-out',
    };
    navigate(routeMap[tab] || `/${tab}`);
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
      {activeTab === 'india' && <FilterBar />}

      <main id="main-content" role="main" className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<IndiaOverview />} />
            <Route path="/india" element={<IndiaOverview />} />
            <Route path="/family-guide" element={<FamilyGuide onNavigate={handleTabChange} />} />
            <Route path="/care-network" element={<CareNetwork />} />
            <Route path="/brain-health" element={<BrainHealth onNavigate={handleTabChange} />} />
            <Route path="/specialist-deserts" element={<SpecialistPage />} />
            <Route path="/specialist" element={<SpecialistPage />} />
            <Route path="/health-spending" element={<HealthSpending />} />
            <Route path="/global-view" element={<GlobalView />} />
            <Route path="/global" element={<GlobalView />} />
            <Route path="/advance-planning" element={<AdvancePlanning onNavigate={handleTabChange} />} />
            <Route path="/research" element={<Research onNavigate={handleTabChange} />} />
            <Route path="/about" element={<About />} />
            <Route path="/reach-out" element={<ReachOut onNavigate={handleTabChange} />} />
            <Route path="*" element={<IndiaOverview />} />
          </Routes>
        </Suspense>
      </main>

      {/* Time-triggered subscription popup */}
      <SubscribePopup />

      <footer role="contentinfo" className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-700 dark:text-slate-300">
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
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:underline transition-colors cursor-pointer"
            >
              {t('footer.disclaimer', { defaultValue: 'Disclaimer' })}
            </button>
            <span className="text-slate-400 dark:text-slate-600" aria-hidden="true">•</span>
            <a href="https://github.com/cyrilsebastian/dementia-india" target="_blank" rel="noreferrer" className="hover:underline text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              {t('footer.github', { defaultValue: 'GitHub Repository' })}
            </a>
            <span className="text-slate-400 dark:text-slate-600" aria-hidden="true">•</span>
            <a href="https://cyrilsebastian.com" target="_blank" rel="noreferrer" className="hover:underline text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              cyrilsebastian.com
            </a>
            <span className="text-slate-400 dark:text-slate-600" aria-hidden="true">•</span>
            <a
              href="https://status.cyrilsebastian.com"
              target="_blank"
              rel="noreferrer"
              className="hover:underline inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              title="Live monitoring of web portals"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" aria-hidden="true"></span>
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
    <BrowserRouter>
      <FilterProvider>
        <AppContent />
      </FilterProvider>
    </BrowserRouter>
  );
};

export default App;

