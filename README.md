# Project Dementia India

Project Dementia India is an open-source epidemiological data intelligence and health systems visualization platform tracking dementia prevalence, cognitive care disparities, and specialist deficits across Indian states. It democratizes access to evidence-based cognitive health metrics to support researchers, advocacy organizations, clinicians, and health policymakers.

## Live Site Links

- **Production:** [https://dementia-india.vercel.app](https://dementia-india.vercel.app) *(or primary custom domain)*
- **Staging:** [https://dementia-india-staging.vercel.app](https://dementia-india-staging.vercel.app)

## How to Run Locally

### Prerequisites
- **Go** (version 1.22 or higher)
- **Node.js** (version 18 or higher) and **npm**
- **Make** and **curl**

### Local Setup
```bash
# 1. Clone repository
git clone https://github.com/cyrilsebastian/dementia-india.git
cd dementia-india

# 2. Build datasets and validate schemas
make data

# 3. Install frontend dependencies and start Vite dev server
cd web
npm install
npm run dev
```

The application will be running locally at `http://localhost:3000`.

## Data Pipeline

The project uses deterministic pipeline commands orchestrated via `make`:

- `make fetch`: Downloads raw external geographic assets, including the normalized India state boundaries TopoJSON/GeoJSON into `web/public/india-states.geojson`.
- `make transform`: Executes the data processing pipeline (`cmd/mock/main.go`) to generate standardized epidemiological CSVs adhering to published anchors and schema contracts in `data/processed/`.
- `make validate`: Runs automated integrity checks (`cmd/validate/main.go`) verifying column contracts, non-empty records, prevalence percentage ranges (0–100%), and valid state codes.

## Data Sources

| Source Name | URL | License / Terms |
|---|---|---|
| Longitudinal Aging Study in India (LASI Wave 1) | [https://iipsindia.ac.in/lasi](https://iipsindia.ac.in/lasi) | Open Academic Access (IIPS / MoHFW) |
| Global Burden of Disease (GBD 2021) | [https://vizhub.healthdata.org/gbd-results](https://vizhub.healthdata.org/gbd-results) | Open Data / CC BY-NC-ND 4.0 (IHME) |
| WHO Global Dementia Observatory (GDO) | [https://www.who.int/data/gho/data/themes/topics/dementia](https://www.who.int/data/gho/data/themes/topics/dementia) | Open Access (World Health Organization) |
| Indian Academy of Neurology (IAN) Workforce Studies | [https://indianneurology.com](https://indianneurology.com) | Academic Citation (Annals of Indian Academy of Neurology) |
| Union Health Budgets & Demand for Grants | [https://prsindia.org/budgets](https://prsindia.org/budgets) | Public Domain / Open Government Data |
| Dementia Care Notes Resource Directory | [https://dementiacarenotes.in](https://dementiacarenotes.in) | Public Non-Commercial Directory |
| Alzheimer's & Related Disorders Society of India (ARDSI) | [https://ardsi.org](https://ardsi.org) | Public Community Resource |

## Contributing

We welcome contributions from researchers, clinicians, data scientists, and frontend engineers. Please review our [Contributing Guidelines](CONTRIBUTING.md) for details on code quality standards, data schemas, and the pull request workflow.

## License

This project is licensed under the [MIT License](LICENSE).