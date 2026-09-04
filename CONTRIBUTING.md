# Contributing to Project Dementia India

Thank you for your interest in contributing to Project Dementia India! This open-source repository maintains epidemiological and health systems intelligence to support dementia research and care in India.

## Development Standards

To ensure the codebase remains clean, maintainable, and reliable for clinical and public health researchers:

1. **JSDoc Documentation**: Every component file must have a JSDoc block at the top explaining what it renders, props accepted, and data sources read.
2. **Deterministic Data Separation**: Data parsing is decoupled from UI presentation (via `useCSV` hook). Visualizations read standardized CSVs from `data/processed/`.
3. **No Magic Numbers or Inline Styles**:
   - Extract numerical thresholds to `src/constants/thresholds.ts`.
   - Extract color palettes to `src/constants/colours.ts`.
   - Style components with Tailwind CSS utility classes.
4. **ECharts Modularization**: Chart options live in `src/charts/options/` rather than inline within React JSX.
5. **Strict TypeScript**: No `any` types. All datasets must have interfaces in `src/types/`.
6. **Commit Messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat: ...`, `fix: ...`, `data: ...`).

## Pull Request Workflow

1. Fork the repository and create a feature branch (`git checkout -b feat/my-improvement`).
2. Verify local builds and tests pass:
   ```bash
   make ci
   cd web && npm run build
   ```
3. Commit your changes with conventional commit messages.
4. Push to your fork and submit a Pull Request describing your changes, data sources, and screenshots (for UI changes).

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for all contributors.
