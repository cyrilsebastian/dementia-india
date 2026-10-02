/**
 * @file webmcp.ts
 * @description Web Model Context Protocol (WebMCP) registration for autonomous AI agents.
 * Exposes structured, machine-readable query tools directly to browser-based AI models.
 */

export function registerWebMCPTools() {
  if (typeof window === 'undefined') return;

  const modelContext =
    (document as any).modelContext || (navigator as any).modelContext;

  if (!modelContext || typeof modelContext.registerTool !== 'function') {
    return;
  }

  try {
    modelContext.registerTool({
      name: 'get_national_dementia_summary',
      description:
        'Returns national epidemiological summary metrics for dementia in India including senior caseload, prevalence rate, and specialist deficits.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      execute: async () => {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                total_cases_60plus: '8.8 Million',
                national_prevalence_pct: 7.4,
                projected_2050_cases: '17.6 Million (+100%)',
                rural_neurologist_ratio: '1 per 5 Million',
                undiagnosed_gap: '85-90%',
                daily_caregiver_hours: '6.2 hrs/day',
                female_caregiver_pct: 72,
              }),
            },
          ],
        };
      },
    });

    modelContext.registerTool({
      name: 'get_public_datasets',
      description:
        'Returns downloadable CSV and GeoJSON dataset URLs for subnational Indian dementia statistics.',
      inputSchema: {
        type: 'object',
        properties: {},
      },
      execute: async () => {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                state_prevalence_csv: 'https://dementia.cyrilsebastian.com/data/india-states.csv',
                state_boundaries_geojson: 'https://dementia.cyrilsebastian.com/india-states.geojson',
                headline_stats_csv: 'https://dementia.cyrilsebastian.com/data/summary-stats.csv',
                documentation: 'https://dementia.cyrilsebastian.com/llms.txt',
              }),
            },
          ],
        };
      },
    });
  } catch (err) {
    // Ignore in unsupported environments
  }
}
