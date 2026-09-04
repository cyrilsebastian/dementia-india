package models

// StateRecord represents an aggregated demographic & prevalence row for an Indian state.
// Output file: data/processed/india-states.csv
type StateRecord struct {
	StateCode     string  `csv:"state_code"`
	StateName     string  `csv:"state_name"`
	Sex           string  `csv:"sex"`           // "Both", "Male", "Female"
	Urban         string  `csv:"urban"`         // "All", "Urban", "Rural"
	AgeGroup      string  `csv:"age_group"`     // "60+", "60-64", "65-69", "70-74", "75-79", "80-84", "85+"
	Education     string  `csv:"education"`     // "All", "None", "Primary", "Middle", "Secondary", "Higher"
	PrevalencePct float64 `csv:"prevalence_pct"` // e.g. 7.4
	Lower         float64 `csv:"lower"`          // 95% CI lower bound
	Upper         float64 `csv:"upper"`          // 95% CI upper bound
	EstCases      int64   `csv:"est_cases"`      // absolute estimated cases
	Population    int64   `csv:"population"`     // population denominator
}

// CountryRecord represents GBD/OWID global prevalence, deaths, or DALYs for a country.
// Output file: data/processed/global-countries.csv
type CountryRecord struct {
	CountryCode string  `csv:"country_code"` // ISO-3 alpha (e.g. "IND", "USA")
	CountryName string  `csv:"country_name"` // "India", "China", etc.
	Region      string  `csv:"region"`       // "Asia", "Europe", "Americas", "Africa", "Oceania"
	Year        int     `csv:"year"`         // 1990 - 2021
	Sex         string  `csv:"sex"`          // "Both", "Male", "Female"
	AgeGroup    string  `csv:"age_group"`    // "All ages", "60+"
	Measure     string  `csv:"measure"`      // "Prevalence", "Deaths", "DALYs", "Incidence"
	Value       float64 `csv:"value"`        // rate or percentage
	Lower       float64 `csv:"lower"`        // 95% uncertainty lower bound
	Upper       float64 `csv:"upper"`        // 95% uncertainty upper bound
	Unit        string  `csv:"unit"`         // "Percent", "Rate per 100k", "Number"
	Source      string  `csv:"source"`       // "GBD 2021", "OWID"
}

// ProjectionRecord represents future dementia forecasts through 2050 (Lancet/GBD).
// Output file: data/processed/projections.csv
type ProjectionRecord struct {
	CountryCode string `csv:"country_code"` // ISO-3 alpha
	CountryName string `csv:"country_name"`
	Year        int    `csv:"year"`         // 2019, 2030, 2040, 2050
	Cases       int64  `csv:"cases"`        // estimated total case count
	Lower       int64  `csv:"lower"`        // 95% UI lower
	Upper       int64  `csv:"upper"`        // 95% UI upper
	Source      string `csv:"source"`       // "Lancet Public Health 2022"
}

// NeurologistRecord represents state-level specialist availability and care gaps.
// Output file: data/processed/neurologists.csv
type NeurologistRecord struct {
	StateCode             string  `csv:"state_code"`
	StateName             string  `csv:"state_name"`
	TotalNeurologists     int     `csv:"total_neurologists"`
	CogBehavNeuro         int     `csv:"cog_behav_neuro"`
	NeurologistPerMillion float64 `csv:"neurologist_per_million"`
	PatientPerNeurologist int64   `csv:"patient_per_neurologist"`
}

// PolicyRecord represents WHO Global Dementia Observatory indicators.
// Output file: data/processed/global-who-policy.csv
type PolicyRecord struct {
	IndicatorCode string  `csv:"indicator_code"` // e.g. "GDO_PLAN_STATUS"
	CountryCode   string  `csv:"country_code"`   // ISO-3
	Year          int     `csv:"year"`
	ValueText     string  `csv:"value_text"`     // "Yes", "No", "In development"
	ValueNumeric  float64 `csv:"value_numeric"`
}

// GDPRecord represents World Bank GDP per capita figures for the bubble chart.
// Output file: data/processed/gdp-per-capita.csv
type GDPRecord struct {
	CountryCode string  `csv:"country_code"` // ISO-3
	Year        int     `csv:"year"`
	GDPUSD      float64 `csv:"gdp_usd"`
}

// SummaryStatRecord represents headline cards for the India dashboard.
// Output file: data/processed/summary-stats.csv
type SummaryStatRecord struct {
	MetricID  string `csv:"metric_id"`  // e.g. "TOTAL_CASES", "DIAGNOSIS_RATE"
	Label     string `csv:"label"`      // "Dementia Cases (60+)", "Diagnosis Gap"
	Value     string `csv:"value"`      // "8.8M", "10-15%"
	Unit      string `csv:"unit"`       // "cases", "%"
	ChangePct string `csv:"change_pct"` // "+100% by 2050"
	Notes     string `csv:"notes"`      // Citation or context note
}
