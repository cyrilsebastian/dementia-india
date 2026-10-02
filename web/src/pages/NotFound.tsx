import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Home, AlertCircle } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <SEOHead
        title="Page Not Found — 404 Error"
        description="The page you requested could not be found. Return to the Dementia India open health data platform homepage for state prevalence and care guides."
        path="/404"
      />
      <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
        <AlertCircle className="w-12 h-12" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        Page not found
      </h1>
      <p className="text-slate-600 dark:text-slate-300 max-w-md mb-8 text-sm leading-relaxed">
        The page you are looking for doesn't exist, has been removed, or was moved to another URL.
      </p>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
      >
        <Home className="w-4 h-4" aria-hidden="true" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};

export default NotFound;
