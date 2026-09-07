package main

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/cyrilsebastian/dementia-india/internal/models"
	"github.com/cyrilsebastian/dementia-india/internal/output"
)

func copyFile(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()

	if err := os.MkdirAll(filepath.Dir(dst), 0755); err != nil {
		return err
	}

	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, in)
	return err
}

func generateGlobalSummaryStats() []models.SummaryStatRecord {
	return []models.SummaryStatRecord{
		{
			MetricID:  "GLOBAL_CASES",
			Label:     "Global Dementia Caseload",
			Value:     "55.2 Million",
			Unit:      "people",
			ChangePct: "Surging to 139M by 2050",
			Notes:     "10 million new diagnoses each year (1 every 3 seconds); India and China represent >40% of global cases.",
		},
		{
			MetricID:  "ECONOMIC_BURDEN",
			Label:     "Annual Global Economic Toll",
			Value:     "$1.3 Trillion",
			Unit:      "USD",
			ChangePct: "Estimated $2.8T by 2030",
			Notes:     "Exceeds market value of most Fortune 500 corporations; 50% borne through unpaid family informal caregiving.",
		},
		{
			MetricID:  "GENDER_RATIO",
			Label:     "Gender Burden Disparity",
			Value:     "1.69x",
			Unit:      "female : male ratio",
			ChangePct: "Women represent ~65% of cases",
			Notes:     "Women provide >70% of informal caregiving hours worldwide, facing elevated cognitive and physical caregiver burnout.",
		},
		{
			MetricID:  "DIAGNOSIS_GAP",
			Label:     "Global Diagnostic Gap",
			Value:     "75%",
			Unit:      "undiagnosed rate",
			ChangePct: "Reaches 85–90% in LMICs / India",
			Notes:     "Over 41 million people live with progressive neurodegeneration without medical diagnosis or symptom-modifying support.",
		},
		{
			MetricID:  "POLICY_READINESS",
			Label:     "National Dementia Action Plans",
			Value:     "39 of 194",
			Unit:      "member states",
			ChangePct: "Only 20% WHO member states",
			Notes:     "Far short of the WHO Global Action Plan on Dementia target of 75% national public health policies.",
		},
	}
}

func main() {
	fmt.Println("⚙️ Transforming and standardizing global dementia datasets...")

	// 1. Generate Global Summary Stats
	stats := generateGlobalSummaryStats()
	targetCSV := "data/processed/global-summary-stats.csv"
	if err := output.WriteSummaryStatsCSV(targetCSV, stats); err != nil {
		fmt.Printf("Error writing %s: %v\n", targetCSV, err)
		os.Exit(1)
	}
	fmt.Printf("  ✓ Generated %s\n", targetCSV)

	// 2. Mirror processed files to web/public/data/ for web client access
	filesToMirror := []string{
		"global-summary-stats.csv",
		"global-countries.csv",
		"gdp-per-capita.csv",
		"global-who-policy.csv",
		"projections.csv",
		"india-states.csv",
		"neurologists.csv",
		"health-spending.csv",
		"memory-clinics.csv",
		"ngos.csv",
		"summary-stats.csv",
	}

	for _, name := range filesToMirror {
		src := filepath.Join("data/processed", name)
		dst := filepath.Join("web/public/data", name)
		if _, err := os.Stat(src); err == nil {
			if err := copyFile(src, dst); err != nil {
				fmt.Printf("  ⚠️ Failed to mirror %s -> %s: %v\n", src, dst, err)
			} else {
				fmt.Printf("  ✓ Mirrored %s -> %s\n", src, dst)
			}
		}
	}

	fmt.Println("🎉 Global data transformation and web mirroring complete!")
}
