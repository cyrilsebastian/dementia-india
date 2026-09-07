package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

type validationError struct {
	file string
	row  int
	msg  string
}

func (e validationError) String() string {
	return fmt.Sprintf("[%s : row %d] %s", e.file, e.row, e.msg)
}

func validateFileExists(path string) error {
	info, err := os.Stat(path)
	if err != nil {
		return fmt.Errorf("file missing: %s", path)
	}
	if info.Size() == 0 {
		return fmt.Errorf("file empty: %s", path)
	}
	return nil
}

func validateIndiaStates(path string) []validationError {
	var errs []validationError
	f, err := os.Open(path)
	if err != nil {
		return []validationError{{file: path, msg: err.Error()}}
	}
	defer f.Close()

	r := csv.NewReader(f)
	header, err := r.Read()
	if err != nil {
		return []validationError{{file: path, msg: "failed to read header"}}
	}

	expectedHeaders := []string{"state_code", "state_name", "sex", "urban", "age_group", "education", "prevalence_pct", "lower", "upper", "est_cases", "population"}
	if len(header) != len(expectedHeaders) {
		errs = append(errs, validationError{file: path, row: 1, msg: fmt.Sprintf("header length %d != expected %d", len(header), len(expectedHeaders))})
	}

	rowNum := 1
	for {
		rowNum++
		rec, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			errs = append(errs, validationError{file: path, row: rowNum, msg: err.Error()})
			break
		}

		stateCode := rec[0]
		if !strings.HasPrefix(stateCode, "IN-") && len(stateCode) < 2 {
			errs = append(errs, validationError{file: path, row: rowNum, msg: fmt.Sprintf("invalid state code: %s", stateCode)})
		}

		prev, err := strconv.ParseFloat(rec[6], 64)
		if err != nil || prev <= 0 || prev > 50 {
			errs = append(errs, validationError{file: path, row: rowNum, msg: fmt.Sprintf("prevalence_pct out of valid range (0-50%%): %s", rec[6])})
		}

		lower, err := strconv.ParseFloat(rec[7], 64)
		upper, err2 := strconv.ParseFloat(rec[8], 64)
		if err == nil && err2 == nil && lower > upper {
			errs = append(errs, validationError{file: path, row: rowNum, msg: fmt.Sprintf("lower CI %f > upper CI %f", lower, upper)})
		}
	}
	return errs
}

func validateGlobalCountries(path string) []validationError {
	var errs []validationError
	f, err := os.Open(path)
	if err != nil {
		return []validationError{{file: path, msg: err.Error()}}
	}
	defer f.Close()

	r := csv.NewReader(f)
	_, _ = r.Read() // skip header

	rowNum := 1
	for {
		rowNum++
		rec, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			errs = append(errs, validationError{file: path, row: rowNum, msg: err.Error()})
			break
		}

		code := rec[0]
		if len(code) != 3 || strings.ToUpper(code) != code {
			errs = append(errs, validationError{file: path, row: rowNum, msg: fmt.Sprintf("invalid ISO-3 code: '%s'", code)})
		}

		year, err := strconv.Atoi(rec[3])
		if err != nil || year < 1980 || year > 2030 {
			errs = append(errs, validationError{file: path, row: rowNum, msg: fmt.Sprintf("unreasonable year: %s", rec[3])})
		}
	}
	return errs
}

func validateProjections(path string) []validationError {
	var errs []validationError
	f, err := os.Open(path)
	if err != nil {
		return []validationError{{file: path, msg: err.Error()}}
	}
	defer f.Close()

	r := csv.NewReader(f)
	_, _ = r.Read()

	lastYear := make(map[string]int)
	lastCases := make(map[string]int64)

	rowNum := 1
	for {
		rowNum++
		rec, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			errs = append(errs, validationError{file: path, row: rowNum, msg: err.Error()})
			break
		}

		code := rec[0]
		year, _ := strconv.Atoi(rec[2])
		cases, _ := strconv.ParseInt(rec[3], 10, 64)

		if prevYear, ok := lastYear[code]; ok {
			if year <= prevYear {
				errs = append(errs, validationError{file: path, row: rowNum, msg: fmt.Sprintf("year %d not strictly greater than previous year %d for %s", year, prevYear, code)})
			}
			if cases < lastCases[code] {
				errs = append(errs, validationError{file: path, row: rowNum, msg: fmt.Sprintf("projection cases decreased (%d < %d) for %s", cases, lastCases[code], code)})
			}
		}

		lastYear[code] = year
		lastCases[code] = cases
	}
	return errs
}

func validateNeurologists(path string) []validationError {
	var errs []validationError
	f, err := os.Open(path)
	if err != nil {
		return []validationError{{file: path, msg: err.Error()}}
	}
	defer f.Close()

	r := csv.NewReader(f)
	_, _ = r.Read()

	rowNum := 1
	for {
		rowNum++
		rec, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			errs = append(errs, validationError{file: path, row: rowNum, msg: err.Error()})
			break
		}

		total, err := strconv.Atoi(rec[2])
		if err != nil || total < 0 {
			errs = append(errs, validationError{file: path, row: rowNum, msg: fmt.Sprintf("invalid total neurologists: %s", rec[2])})
		}
	}
	return errs
}

func validateSummaryStats(path string) []validationError {
	var errs []validationError
	f, err := os.Open(path)
	if err != nil {
		return []validationError{{file: path, msg: err.Error()}}
	}
	defer f.Close()

	r := csv.NewReader(f)
	header, err := r.Read()
	if err != nil {
		return []validationError{{file: path, msg: "failed to read header"}}
	}

	expectedHeaders := []string{"metric_id", "label", "value", "unit", "change_pct", "notes"}
	if len(header) != len(expectedHeaders) {
		errs = append(errs, validationError{file: path, row: 1, msg: fmt.Sprintf("header length %d != expected %d", len(header), len(expectedHeaders))})
	}

	rowNum := 1
	for {
		rowNum++
		rec, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			errs = append(errs, validationError{file: path, row: rowNum, msg: err.Error()})
			break
		}
		if len(rec[0]) == 0 || len(rec[2]) == 0 {
			errs = append(errs, validationError{file: path, row: rowNum, msg: "empty metric_id or value"})
		}
	}
	return errs
}

func main() {
	fmt.Println("🔍 Running automated validation suite on processed datasets...")

	requiredFiles := []string{
		"data/processed/india-states.csv",
		"data/processed/global-countries.csv",
		"data/processed/projections.csv",
		"data/processed/neurologists.csv",
		"data/processed/global-who-policy.csv",
		"data/processed/gdp-per-capita.csv",
		"data/processed/summary-stats.csv",
		"data/processed/global-summary-stats.csv",
	}

	var allErrors []validationError

	for _, file := range requiredFiles {
		cleanPath := filepath.Clean(file)
		if err := validateFileExists(cleanPath); err != nil {
			allErrors = append(allErrors, validationError{file: cleanPath, msg: err.Error()})
			continue
		}
		fmt.Printf("  ✓ File exists & non-empty: %s\n", cleanPath)
	}

	allErrors = append(allErrors, validateIndiaStates("data/processed/india-states.csv")...)
	allErrors = append(allErrors, validateGlobalCountries("data/processed/global-countries.csv")...)
	allErrors = append(allErrors, validateProjections("data/processed/projections.csv")...)
	allErrors = append(allErrors, validateNeurologists("data/processed/neurologists.csv")...)
	allErrors = append(allErrors, validateSummaryStats("data/processed/global-summary-stats.csv")...)
	allErrors = append(allErrors, validateSummaryStats("data/processed/summary-stats.csv")...)

	if len(allErrors) > 0 {
		fmt.Printf("\n❌ Validation FAILED with %d error(s):\n", len(allErrors))
		for _, e := range allErrors {
			fmt.Printf("  • %s\n", e.String())
		}
		os.Exit(1)
	}

	fmt.Println("\n✅ All validation sanity checks PASSED!")
}
