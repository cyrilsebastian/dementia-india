/**
 * @file CareDirectory.tsx
 * @description Interactive search and filtering directory for memory clinics, specialized dementia hospitals,
 * and Alzheimer's & Related Disorders Society of India (ARDSI) NGO chapters.
 * Reads data from /data/memory-clinics.csv and /data/ngos.csv.
 */

import React, { useState, useMemo } from 'react';
import { useCSV } from '../data/useCSV';
import type { ClinicRecord, NgoRecord } from '../types/careNetwork';
import { Search, MapPin, ExternalLink, Phone, Mail, CheckCircle2, Building2, Users, ArrowUpDown, ChevronUp, ChevronDown, Info } from 'lucide-react';

interface CareDirectoryProps {
  activeSection: 'clinics' | 'ngos';
}

type ClinicSortKey = 'name' | 'location' | 'type' | 'speciality';
type SortOrder = 'asc' | 'desc';

export const CareDirectory: React.FC<CareDirectoryProps> = ({ activeSection }) => {
  const { data: clinics, loading: loadingClinics } = useCSV<ClinicRecord>('/data/memory-clinics.csv');
  const { data: ngos, loading: loadingNgos } = useCSV<NgoRecord>('/data/ngos.csv');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const [clinicSortKey, setClinicSortKey] = useState<ClinicSortKey>('location');
  const [clinicSortOrder, setClinicSortOrder] = useState<SortOrder>('asc');

  const handleClinicSort = (key: ClinicSortKey) => {
    if (clinicSortKey === key) {
      setClinicSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setClinicSortKey(key);
      setClinicSortOrder('asc');
    }
  };

  const renderClinicSortIcon = (key: ClinicSortKey) => {
    if (clinicSortKey !== key) {
      return <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60 ml-1 inline" />;
    }
    return clinicSortOrder === 'asc' ? (
      <ChevronUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400 ml-1 inline" />
    ) : (
      <ChevronDown className="w-3 h-3 text-emerald-600 dark:text-emerald-400 ml-1 inline" />
    );
  };

  // Extract unique states for clinics
  const clinicStates = useMemo(() => {
    const states = new Set<string>();
    clinics.forEach((c) => {
      if (c.state && c.state !== 'Multiple') states.add(c.state);
    });
    return Array.from(states).sort();
  }, [clinics]);

  // Extract unique states for NGOs
  const ngoStates = useMemo(() => {
    const states = new Set<string>();
    ngos.forEach((n) => {
      if (n.state && n.state !== 'Multiple' && n.state !== 'National') states.add(n.state);
    });
    return Array.from(states).sort();
  }, [ngos]);

  // Extract unique service tags for NGOs
  const ngoServices = useMemo(() => {
    const services = new Set<string>();
    ngos.forEach((n) => {
      if (n.services) {
        n.services.split(',').forEach((s) => services.add(s.trim()));
      }
    });
    return Array.from(services).sort();
  }, [ngos]);

  // Filtered & Sorted Clinics
  const filteredClinics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const result = clinics.filter((item) => {
      const matchSearch =
        !q ||
        (item.name || '').toLowerCase().includes(q) ||
        (item.city || '').toLowerCase().includes(q) ||
        (item.state || '').toLowerCase().includes(q);
      const matchState = selectedState ? item.state === selectedState : true;
      return matchSearch && matchState;
    });

    return result.sort((a, b) => {
      let cmp = 0;
      switch (clinicSortKey) {
        case 'name':
          cmp = (a.name || '').localeCompare(b.name || '');
          break;
        case 'location': {
          const locA = `${a.state || ''} ${a.city || ''}`;
          const locB = `${b.state || ''} ${b.city || ''}`;
          cmp = locA.localeCompare(locB);
          break;
        }
        case 'type':
          cmp = (a.type || '').localeCompare(b.type || '');
          break;
        case 'speciality':
          cmp = (a.dementia_speciality === b.dementia_speciality ? 0 : a.dementia_speciality ? -1 : 1);
          break;
      }
      return clinicSortOrder === 'asc' ? cmp : -cmp;
    });
  }, [clinics, searchQuery, selectedState, clinicSortKey, clinicSortOrder]);

  // Filtered NGOs
  const filteredNgos = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ngos.filter((item) => {
      const matchSearch =
        !q ||
        (item.name || '').toLowerCase().includes(q) ||
        (item.city || '').toLowerCase().includes(q) ||
        (item.state || '').toLowerCase().includes(q) ||
        (item.services || '').toLowerCase().includes(q);
      const matchState = selectedState ? item.state === selectedState : true;
      const matchService = selectedService ? (item.services || '').includes(selectedService) : true;
      return matchSearch && matchState && matchService;
    });
  }, [ngos, searchQuery, selectedState, selectedService]);

  const formatServiceTag = (tag: string) => {
    return tag.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loadingClinics || loadingNgos) {
    return <div className="h-96 bg-slate-50 dark:bg-slate-800/40 rounded-2xl animate-pulse" />;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${activeSection === 'clinics' ? 'clinics or cities' : 'NGOs, services, cities'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>

        {/* State Filter */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="text-xs sm:text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All States</option>
              {(activeSection === 'clinics' ? clinicStates : ngoStates).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Service Filter (for NGOs only) */}
          {activeSection === 'ngos' && (
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="text-xs sm:text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Services</option>
              {ngoServices.map((srv) => (
                <option key={srv} value={srv}>
                  {formatServiceTag(srv)}
                </option>
              ))}
            </select>
          )}

          {(searchQuery || selectedState || selectedService) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedState('');
                setSelectedService('');
              }}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Content Rendering */}
      {activeSection === 'clinics' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Memory Clinics & Neuro-Geriatric Centres
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Showing {filteredClinics.length} centres
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 select-none">
                <tr>
                  <th className="py-3 px-4">
                    <button
                      onClick={() => handleClinicSort('name')}
                      className="font-semibold text-left flex items-center hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <span>Hospital / Clinic</span>
                      {renderClinicSortIcon('name')}
                    </button>
                  </th>
                  <th className="py-3 px-4">
                    <button
                      onClick={() => handleClinicSort('location')}
                      className="font-semibold text-left flex items-center hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <span>Location</span>
                      {renderClinicSortIcon('location')}
                    </button>
                  </th>
                  <th className="py-3 px-4">
                    <button
                      onClick={() => handleClinicSort('type')}
                      className="font-semibold text-left flex items-center hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <span>Facility Type</span>
                      {renderClinicSortIcon('type')}
                    </button>
                  </th>
                  <th className="py-3 px-4">
                    <button
                      onClick={() => handleClinicSort('speciality')}
                      className="font-semibold text-left flex items-center hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <span>Dementia Speciality</span>
                      {renderClinicSortIcon('speciality')}
                    </button>
                  </th>
                  <th className="py-3 px-4 text-right">Directory Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-800 dark:text-slate-200">
                {filteredClinics.map((clinic, idx) => (
                  <tr key={`${clinic.name}-${idx}`} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {clinic.name}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{clinic.city}, {clinic.state}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize text-slate-500 dark:text-slate-400">
                      {clinic.type.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4">
                      {clinic.dementia_speciality ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Dedicated Clinic</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">General Neurology</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {clinic.website ? (
                        <a
                          href={clinic.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          <span>Visit</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* NGO Chapters Grid */
        <div className="space-y-4">
          {/* Data Integrity Warning Banner (Task 5) */}
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-2xl p-4 sm:p-5 text-xs text-blue-900 dark:text-blue-200 flex items-start space-x-3 shadow-sm">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Contact information sourced from the official ARDSI chapter directory at{' '}
              <a href="https://ardsi.org" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-blue-700 dark:hover:text-blue-100">ardsi.org</a>
              {' '}and{' '}
              <a href="https://alzheimer.org.in/chapters.php" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-blue-700 dark:hover:text-blue-100">alzheimer.org.in</a>.
              Chapter details change over time. Always confirm before travelling. Last verified: September 2026.
            </p>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                ARDSI Chapters & Caregiver Support NGOs
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Showing {filteredNgos.length} organizations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNgos.map((ngo, idx) => (
              <div
                key={`${ngo.name}-${idx}`}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors"
              >
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {ngo.name}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{ngo.city ? `${ngo.city}, ` : ''}{ngo.state}</span>
                    </div>
                  </div>

                  {ngo.address && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {ngo.address}
                    </p>
                  )}

                  {ngo.note && (
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/50 leading-relaxed font-medium">
                      {ngo.note}
                    </p>
                  )}

                  {/* Services tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(ngo.services || '').split(',').filter(Boolean).map((srv, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {formatServiceTag(srv.trim())}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contacts & Links */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                  {ngo.phone && (
                    <a
                      href={`tel:${String(ngo.phone).replace(/[^0-9+]/g, '')}`}
                      className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{String(ngo.phone)}</span>
                    </a>
                  )}
                  {ngo.phone2 && (
                    <a
                      href={`tel:${String(ngo.phone2).replace(/[^0-9+]/g, '')}`}
                      className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{String(ngo.phone2)}</span>
                    </a>
                  )}
                  {ngo.email && (
                    <a
                      href={`mailto:${ngo.email}`}
                      className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                    >
                      <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{ngo.email}</span>
                    </a>
                  )}
                  {ngo.website && (
                    <a
                      href={ngo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline pt-0.5"
                    >
                      <span>Official Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <div className="pt-2 border-t border-slate-100/60 dark:border-slate-800/60">
                    <a
                      href={`https://github.com/cyrilsebastian/dementia-india/issues/new?title=Outdated+info:+${encodeURIComponent(ngo.name)}&labels=data-quality`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:underline inline-flex items-center space-x-1"
                    >
                      <span>Report outdated info</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
