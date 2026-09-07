package main

import (
	"flag"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

func ensureDir(path string) error {
	dir := filepath.Dir(path)
	return os.MkdirAll(dir, 0755)
}

func fetchWithCache(url, cachePath string, maxAge time.Duration) ([]byte, error) {
	if fi, err := os.Stat(cachePath); err == nil {
		if time.Since(fi.ModTime()) < maxAge {
			fmt.Printf("  ✓ Using cached response from %s\n", cachePath)
			return os.ReadFile(cachePath)
		}
	}

	fmt.Printf("  🌐 Requesting: %s\n", url)
	client := http.Client{Timeout: 15 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		// Fallback to stale cache if available
		if data, readErr := os.ReadFile(cachePath); readErr == nil {
			fmt.Printf("  ⚠️ Network error (%v); falling back to existing cache at %s\n", err, cachePath)
			return data, nil
		}
		return nil, fmt.Errorf("fetch %s failed: %w", url, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		if data, readErr := os.ReadFile(cachePath); readErr == nil {
			fmt.Printf("  ⚠️ Upstream returned %d; falling back to cache at %s\n", resp.StatusCode, cachePath)
			return data, nil
		}
		return nil, fmt.Errorf("upstream status %d", resp.StatusCode)
	}

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	_ = ensureDir(cachePath)
	_ = os.WriteFile(cachePath, data, 0644)
	fmt.Printf("  ✓ Cached %d bytes to %s\n", len(data), cachePath)
	return data, nil
}

func main() {
	source := flag.String("source", "all", "Source to fetch: who, worldbank, or all")
	flag.Parse()

	fmt.Println("🌐 Deterministic Global Data Ingestion Tool (Dementia India)")

	switch *source {
	case "who":
		fetchWHO()
	case "worldbank":
		fetchWorldBank()
	case "all":
		fetchWHO()
		fetchWorldBank()
	default:
		fmt.Printf("Unknown source: %s. Available: who, worldbank, all\n", *source)
		os.Exit(1)
	}
}

func fetchWHO() {
	fmt.Println("\n[WHO GDO] Fetching Global Dementia Observatory policy status...")
	url := "https://ghoapi.azureedge.net/api/GDO_PLAN_STATUS"
	cacheFile := "data/raw/who_gdo_plan_status.json"
	_, err := fetchWithCache(url, cacheFile, 7*24*time.Hour)
	if err != nil {
		fmt.Printf("  ⚠️ Notice: WHO endpoint query logged: %v\n", err)
	}
}

func fetchWorldBank() {
	fmt.Println("\n[World Bank] Fetching GDP per capita (constant PPP) timeseries...")
	url := "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&per_page=1000&date=1990:2021"
	cacheFile := "data/raw/worldbank_gdp_raw.json"
	_, err := fetchWithCache(url, cacheFile, 14*24*time.Hour)
	if err != nil {
		fmt.Printf("  ⚠️ Notice: World Bank endpoint query logged: %v\n", err)
	}
}
