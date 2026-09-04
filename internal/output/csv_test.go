package output

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/cyrilsebastian/dementia-india/internal/models"
)

func TestWriteStateCSV(t *testing.T) {
	tmpDir := t.TempDir()
	outPath := filepath.Join(tmpDir, "test-states.csv")

	records := []models.StateRecord{
		{
			StateCode:     "IN-KL",
			StateName:     "Kerala",
			Sex:           "Both",
			Urban:         "All",
			AgeGroup:      "60+",
			Education:     "All",
			PrevalencePct: 9.2,
			Lower:         7.5,
			Upper:         11.1,
			EstCases:      496800,
			Population:    5400000,
		},
	}

	if err := WriteStateCSV(outPath, records); err != nil {
		t.Fatalf("WriteStateCSV returned error: %v", err)
	}

	content, err := os.ReadFile(outPath)
	if err != nil {
		t.Fatalf("failed to read output file: %v", err)
	}

	expectedHeader := "state_code,state_name,sex,urban,age_group,education,prevalence_pct,lower,upper,est_cases,population\n"
	if len(content) < len(expectedHeader) {
		t.Fatalf("file too short, content: %s", string(content))
	}
}

func TestWriteProjectionCSV(t *testing.T) {
	tmpDir := t.TempDir()
	outPath := filepath.Join(tmpDir, "test-projections.csv")

	records := []models.ProjectionRecord{
		{
			CountryCode: "IND",
			CountryName: "India",
			Year:        2019,
			Cases:       8800000,
			Lower:       7500000,
			Upper:       10200000,
			Source:      "Lancet 2022",
		},
	}

	if err := WriteProjectionCSV(outPath, records); err != nil {
		t.Fatalf("WriteProjectionCSV returned error: %v", err)
	}
}
