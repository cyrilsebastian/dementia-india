.PHONY: help setup mock-data fetch-geojson validate test data web-install web-dev web-build clean ci

# Default target
all: data

help: ## Show this help message
	@echo "Project Dementia India — Automation Commands"
	@echo "============================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'

setup: ## Initialize directories and verify tooling
	@echo "🔧 Setting up project directories..."
	@mkdir -p data/raw data/processed web/public
	@go version
	@node -v
	@npm -v

mock-data: ## Generate synthetic datasets matching published anchors (Day 1 unblocker)
	@go run ./cmd/mock/main.go

fetch: fetch-geojson ## Download raw external assets (GeoJSON)

fetch-geojson: ## Download and normalize India state boundaries GeoJSON
	@bash scripts/fetch_geojson.sh

transform: mock-data ## Transform and synthesize normalized epidemiological datasets

validate: ## Run automated sanity checks on processed datasets
	@go run ./cmd/validate/main.go

test: ## Run Go unit tests
	@go test -v ./...

data: mock-data validate ## Generate mock/raw data and validate all CSVs

web-install: ## Install React frontend dependencies
	@cd web && npm install

web-dev: ## Start Vite frontend development server
	@cd web && npm run dev

web-build: ## Build React production bundle
	@cd web && npm run build

clean: ## Clean generated CSVs and web build artifacts
	@rm -rf data/processed/*.csv web/dist
	@echo "✓ Cleaned processed data and web dist"

ci: test validate ## Run full local CI suite
	@echo "✅ Local CI suite passed!"
