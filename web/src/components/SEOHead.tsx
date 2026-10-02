import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedDate?: string;
  modifiedDate?: string;
  customSchemas?: object[];
}

const BASE_URL = 'https://dementia.cyrilsebastian.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-preview.png`;

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dementia India',
  url: 'https://dementia.cyrilsebastian.com',
  description: 'Free, open-access dementia data platform for India',
  foundingDate: '2026',
  founder: {
    '@type': 'Person',
    name: 'Cyril Sebastian',
    url: 'https://cyrilsebastian.com',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'dementia@cyrilsebastian.com',
    contactType: 'general inquiry',
  },
};

const FAMILY_GUIDE_SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Family Guide to Dementia',
    url: 'https://dementia.cyrilsebastian.com/family-guide',
    description: 'Practical guide for families in India navigating dementia',
    medicalAudience: 'Patient',
    about: {
      '@type': 'MedicalCondition',
      name: 'Dementia',
      alternateName: ["Alzheimer's Disease", 'Vascular Dementia'],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can dementia be cured?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not currently. There is no cure for any form of dementia. However, medications can slow progression in some patients, and therapy, routine, and physical activity can significantly improve quality of life.',
        },
      },
      {
        '@type': 'Question',
        name: "What is the difference between dementia and Alzheimer's?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Dementia is an umbrella term for conditions that affect memory, thinking, and daily life. Alzheimer's disease is the most common cause of dementia, accounting for approximately 60% of cases. All Alzheimer's is dementia, but not all dementia is Alzheimer's.",
        },
      },
      {
        '@type': 'Question',
        name: 'When should I take someone to a neurologist for dementia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If three or more warning signs are present for more than two weeks and are new or worsening, this is the time to see a neurologist. Early diagnosis can slow progression.',
        },
      },
    ],
  },
];

const CARE_NETWORK_SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'India Memory Clinics & Dementia Care Centres',
    url: 'https://dementia.cyrilsebastian.com/care-network',
    description: 'Verified directory of memory clinics, cognitive neurology centres, and dementia support facilities across India.',
    medicalSpecialty: 'Neurology',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'India Dementia Memory Clinic Directory',
    description: 'Verified directory of memory clinics and dementia care centres across India',
    url: 'https://dementia.cyrilsebastian.com/care-network',
    creator: {
      '@type': 'Person',
      name: 'Cyril Sebastian',
    },
    license: 'https://opensource.org/licenses/MIT',
    spatialCoverage: 'India',
  },
];

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  path,
  keywords,
  ogImage,
  ogType = 'website',
  publishedDate,
  modifiedDate,
  customSchemas,
}) => {
  // Normalize canonical URL: no trailing slash for routes like /family-guide
  const cleanPath = path === '/' ? '' : path.replace(/\/+$/, '');
  const canonicalUrl = `${BASE_URL}${cleanPath.startsWith('/') ? cleanPath : (cleanPath ? `/${cleanPath}` : '')}`;
  const image = ogImage || DEFAULT_IMAGE;

  // Enforce recommended 120-160 character meta description length
  const metaDescription =
    description.length > 160
      ? `${description.slice(0, 157).trim()}...`
      : description;

  const schemas: object[] = [ORGANIZATION_SCHEMA];

  if (path === '/family-guide') {
    schemas.push(...FAMILY_GUIDE_SCHEMAS);
  } else if (path === '/care-network') {
    schemas.push(...CARE_NETWORK_SCHEMAS);
  }

  if (customSchemas && customSchemas.length > 0) {
    schemas.push(...customSchemas);
  }

  return (
    <>
      <Helmet>
        <title>{title} | Dementia India</title>
        <meta name="description" content={metaDescription} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content="Dementia India" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Article-specific */}
        {ogType === 'article' && publishedDate && (
          <meta property="article:published_time" content={publishedDate} />
        )}
        {ogType === 'article' && modifiedDate && (
          <meta property="article:modified_time" content={modifiedDate} />
        )}
      </Helmet>

      {/* JSON-LD Structured Data */}
      <Helmet>
        {schemas.map((schema, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>
    </>
  );
};

export default SEOHead;
