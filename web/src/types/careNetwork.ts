/**
 * @file careNetwork.ts
 * @description Type definitions for the India Care Network directory:
 * Memory Clinics, Hospitals, ARDSI NGO chapters, and Emergency Helplines.
 */

export interface ClinicRecord {
  name: string;
  city: string;
  state: string;
  state_code: string;
  type: 'hospital' | 'daycare' | 'hospital_chain' | string;
  dementia_speciality: boolean;
  website: string;
  source: string;
}

export interface NgoRecord {
  name: string;
  city: string;
  state: string;
  state_code: string;
  type: 'national_ngo' | 'chapter' | 'resource_portal' | 'ngo' | string;
  services: string; // comma-separated service tags
  website?: string;
  phone?: string;
  email?: string;
}

export interface HelplineRecord {
  name: string;
  organization: string;
  phone: string;
  hours: string;
  description: string;
  language?: string;
  isEmergency?: boolean;
}
