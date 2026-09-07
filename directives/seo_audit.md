---
persona: seo_auditor
tier: local
plan_required: false
---

# Directive: Technical & On-Page SEO Audit

## Goal
Audit any web project (SPA, SSR, or static site) to verify discovery readiness,
semantic search performance, social share presentation, and Schema.org structured data.

## Execution Checklist

### 1. Crawl & Discovery Layer
- **`public/robots.txt`**: Confirm presence, `User-agent: *`, `Allow: /`, and explicit reference to `Sitemap: https://<domain>/sitemap.xml`.
- **`public/sitemap.xml`**: Ensure XML format adheres to `sitemaps.org/schemas/sitemap/0.9` with accurate URLs, `lastmod` timestamps, and priority scores.
- **Canonical URLs**: Verify `<link rel="canonical" href="https://<canonical-domain>/path" />` is declared on all pages to eliminate duplicate content penalties.

### 2. Meta Tags & Header Hierarchy
- **Title Tag**: Length 50–60 characters. Format: `Primary Keyword / Subject — Site Brand`.
- **Meta Description**: Length 130–160 characters. Action-oriented, descriptive summary containing relevant secondary terms without keyword stuffing.
- **Keywords Meta Tag**: Optional, concise comma-separated domain keywords.
- **Heading Hierarchy**: Exactly one `<h1>` per page/view representing the primary subject. Sub-sections properly structured with `<h2>` and `<h3>`.

### 3. Social Graph & Open Graph Tags
- **OpenGraph**: `og:title`, `og:description`, `og:url`, `og:type`, `og:image`, `og:site_name`.
- **Twitter Cards**: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`.
- **Theme & Favicons**: SVG/PNG favicon declared; `theme-color` meta tag aligned with brand palette.

### 4. Schema.org Structured Data (JSON-LD)
Embed appropriate Schema.org structured data script inside `<head>`:
- **Data & Scientific Dashboards**: `Dataset`, `MedicalWebPage`, `MedicalCondition`, `GovernmentOrganization`.
- **Software / Web Applications**: `WebApplication`, `SoftwareApplication`.
- **Corporate & Portfolio Sites**: `Organization`, `WebSite`, `BreadcrumbList`.

### 5. Accessibility & Performance Indicators
- Verify all images have descriptive `alt` tags.
- Verify viewport `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Verify external links have `rel="noopener noreferrer"`.
