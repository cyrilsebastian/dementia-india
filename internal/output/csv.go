package output

import (
	"encoding/csv"
	"fmt"
	"os"
	"path/filepath"
	"strconv"

	"github.com/cyrilsebastian/dementia-india/internal/models"
)

func ensureDir(filePath string) error {
	dir := filepath.Dir(filePath)
	return os.MkdirAll(dir, 0755)
}

// WriteStateCSV writes aggregated state-level records to CSV.
func WriteStateCSV(path string, records []models.StateRecord) error {
	if err := ensureDir(path); err != nil {
		return err
	}
	f, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create state csv: %w", err)
	}
	defer f.Close()

	w := csv.NewWriter(f)
	defer w.Flush()

	headers := []string{
		"state_code", "state_name", "sex", "urban", "age_group",
		"education", "prevalence_pct", "lower", "upper", "est_cases", "population",
	}
	if err := w.Write(headers); err != nil {
		return err
	}

	for _, r := range records {
		row := []string{
			r.StateCode,
			r.StateName,
			r.Sex,
			r.Urban,
			r.AgeGroup,
			r.Education,
			strconv.FormatFloat(r.PrevalencePct, 'f', 2, 64),
			strconv.FormatFloat(r.Lower, 'f', 2, 64),
			strconv.FormatFloat(r.Upper, 'f', 2, 64),
			strconv.FormatInt(r.EstCases, 10),
			strconv.FormatInt(r.Population, 10),
		}
		if err := w.Write(row); err != nil {
			return err
		}
	}
	return nil
}

// WriteCountryCSV writes global country-level epidemiological records to CSV.
func WriteCountryCSV(path string, records []models.CountryRecord) error {
	if err := ensureDir(path); err != nil {
		return err
	}
	f, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create country csv: %w", err)
	}
	defer f.Close()

	w := csv.NewWriter(f)
	defer w.Flush()

	headers := []string{
		"country_code", "country_name", "region", "year", "sex",
		"age_group", "measure", "value", "lower", "upper", "unit", "source",
	}
	if err := w.Write(headers); err != nil {
		return err
	}

	for _, r := range records {
		row := []string{
			r.CountryCode,
			r.CountryName,
			r.Region,
			strconv.Itoa(r.Year),
			r.Sex,
			r.AgeGroup,
			r.Measure,
			strconv.FormatFloat(r.Value, 'f', 2, 64),
			strconv.FormatFloat(r.Lower, 'f', 2, 64),
			strconv.FormatFloat(r.Upper, 'f', 2, 64),
			r.Unit,
			r.Source,
		}
		if err := w.Write(row); err != nil {
			return err
		}
	}
	return nil
}

// WriteProjectionCSV writes future forecasts up to 2050 to CSV.
func WriteProjectionCSV(path string, records []models.ProjectionRecord) error {
	if err := ensureDir(path); err != nil {
		return err
	}
	f, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create projection csv: %w", err)
	}
	defer f.Close()

	w := csv.NewWriter(f)
	defer w.Flush()

	headers := []string{"country_code", "country_name", "year", "cases", "lower", "upper", "source"}
	if err := w.Write(headers); err != nil {
		return err
	}

	for _, r := range records {
		row := []string{
			r.CountryCode,
			r.CountryName,
			strconv.Itoa(r.Year),
			strconv.FormatInt(r.Cases, 10),
			strconv.FormatInt(r.Lower, 10),
			strconv.FormatInt(r.Upper, 10),
			r.Source,
		}
		if err := w.Write(row); err != nil {
			return err
		}
	}
	return nil
}

// WriteNeurologistCSV writes state-level neurologist counts and metrics to CSV.
func WriteNeurologistCSV(path string, records []models.NeurologistRecord) error {
	if err := ensureDir(path); err != nil {
		return err
	}
	f, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create neurologist csv: %w", err)
	}
	defer f.Close()

	w := csv.NewWriter(f)
	defer w.Flush()

	headers := []string{
		"state_code", "state_name", "total_neurologists", "cog_behav_neuro",
		"neurologist_per_million", "patient_per_neurologist",
	}
	if err := w.Write(headers); err != nil {
		return err
	}

	for _, r := range records {
		row := []string{
			r.StateCode,
			r.StateName,
			strconv.Itoa(r.TotalNeurologists),
			strconv.Itoa(r.CogBehavNeuro),
			strconv.FormatFloat(r.NeurologistPerMillion, 'f', 2, 64),
			strconv.FormatInt(r.PatientPerNeurologist, 10),
		}
		if err := w.Write(row); err != nil {
			return err
		}
	}
	return nil
}

// WritePolicyCSV writes WHO policy indicators to CSV.
func WritePolicyCSV(path string, records []models.PolicyRecord) error {
	if err := ensureDir(path); err != nil {
		return err
	}
	f, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create policy csv: %w", err)
	}
	defer f.Close()

	w := csv.NewWriter(f)
	defer w.Flush()

	headers := []string{"indicator_code", "country_code", "year", "value_text", "value_numeric"}
	if err := w.Write(headers); err != nil {
		return err
	}

	for _, r := range records {
		row := []string{
			r.IndicatorCode,
			r.CountryCode,
			strconv.Itoa(r.Year),
			r.ValueText,
			strconv.FormatFloat(r.ValueNumeric, 'f', 2, 64),
		}
		if err := w.Write(row); err != nil {
			return err
		}
	}
	return nil
}

// WriteGDPCSV writes World Bank GDP per capita to CSV.
func WriteGDPCSV(path string, records []models.GDPRecord) error {
	if err := ensureDir(path); err != nil {
		return err
	}
	f, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create gdp csv: %w", err)
	}
	defer f.Close()

	w := csv.NewWriter(f)
	defer w.Flush()

	headers := []string{"country_code", "year", "gdp_usd"}
	if err := w.Write(headers); err != nil {
		return err
	}

	for _, r := range records {
		row := []string{
			r.CountryCode,
			strconv.Itoa(r.Year),
			strconv.FormatFloat(r.GDPUSD, 'f', 2, 64),
		}
		if err := w.Write(row); err != nil {
			return err
		}
	}
	return nil
}

// WriteSummaryStatsCSV writes dashboard headline summary metrics to CSV.
func WriteSummaryStatsCSV(path string, records []models.SummaryStatRecord) error {
	if err := ensureDir(path); err != nil {
		return err
	}
	f, err := os.Create(path)
	if err != nil {
		return fmt.Errorf("create summary stats csv: %w", err)
	}
	defer f.Close()

	w := csv.NewWriter(f)
	defer w.Flush()

	headers := []string{"metric_id", "label", "value", "unit", "change_pct", "notes"}
	if err := w.Write(headers); err != nil {
		return err
	}

	for _, r := range records {
		row := []string{
			r.MetricID,
			r.Label,
			r.Value,
			r.Unit,
			r.ChangePct,
			r.Notes,
		}
		if err := w.Write(row); err != nil {
			return err
		}
	}
	return nil
}
