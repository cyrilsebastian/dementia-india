# Multi-Device Workflow: Mac Mini and MacBook Air

This guide defines the synchronization and collaboration workflow for working on **Project Dementia India** across multiple systems (e.g. MacBook Air and Mac Mini).

---

## 1. Directory Structure Convention

Maintain identical directory hierarchies on both machines to keep paths consistent across scripts, terminal commands, and local AI configs:

```text
~/Documents/git/github/
├── dementia-india/        # Hosted application, data pipeline, and web frontend
└── agentic-template/      # Universal agent personas and project-namespaced directives
```

---

## 2. Initial Setup on a New Machine (e.g. Mac Mini)

### Step 1: Install System Prerequisites
Ensure the following tools are installed (via Homebrew or direct downloads):
- **Go**: Version 1.22+ (`brew install go`)
- **Node.js**: Version 18+ and npm (`brew install node`)
- **Make** and **curl**: Pre-installed on macOS (`xcode-select --install`)
- **Python 3**: For compliance checks (`brew install python`)

### Step 2: Clone the Repositories
```bash
cd ~/Documents/git/github

# Clone the hosted application repository
git clone git@github.com:cyrilsebastian/dementia-india.git

# Clone the agentic template repository (optional, for agent directives)
git clone git@github.com:cyrilsebastian/agentic-template.git
```

### Step 3: Configure Local Environment Secrets
`.env.local` is gitignored to protect secret API keys.

**Option A: Secure Transfer via AirDrop (Fastest)**
1. On MacBook Air, locate `.env.local` in `dementia-india`.
2. AirDrop the file to your Mac Mini.
3. Move it into the `dementia-india/` root directory on Mac Mini.

**Option B: Manual Setup from Example**
1. Copy the example template:
   ```bash
   cd ~/Documents/git/github/dementia-india
   cp .env.example .env.local
   ```
2. Open `.env.local` and paste your API keys:
   - `VITE_WEB3FORMS_KEY`
   - `VITE_BREVO_API_KEY`
   - `VITE_TURNSTILE_SITE_KEY`
   - `VITE_TURNSTILE_SECRET_KEY`

### Step 4: Verify the Installation
Run the automated initialization and build commands:
```bash
cd ~/Documents/git/github/dementia-india

# Verify tooling and build directories
make setup

# Generate benchmark datasets and validate schemas
make data

# Install frontend dependencies and verify build
cd web && npm install && npm run build
```

---

## 3. Daily Git Synchronization Routine

To avoid merge conflicts and work seamlessly across both computers, follow this routine:

### Starting Work on Either Machine
Always pull the latest changes before editing code:
```bash
git checkout develop
git pull origin develop
```

### Finishing Work on Either Machine
Commit your changes and push to GitHub so the other machine can pick them up:
```bash
git add .
git commit -m "feat(scope): concise description of changes"
git push origin develop
```

### Handling Uncommitted Work Between Machines
If you switch machines with work-in-progress:
```bash
# Save uncommitted edits temporarily
git stash

# Pull latest updates
git pull --rebase origin develop

# Reapply your edits
git stash pop
```

---

## 4. Managing Environment Variables
- Never commit `.env` or `.env.local` to Git.
- When adding a new variable on one machine:
  1. Add the actual key to `.env.local` on that machine.
  2. Add the variable name with placeholder notes to `.env.example` and commit it.
  3. When you pull on the other machine, check `git status` or `.env.example` diff and update its `.env.local`.

---

## 5. Turnkey Agent Onboarding Prompt (Copy-Paste for Mac Mini)

When opening an AI assistant (Antigravity, Claude Code, Gemini CLI, Cursor, etc.) on Mac Mini, paste this context prompt to get the agent up to speed immediately:

```markdown
I am working on Project Dementia India (https://github.com/cyrilsebastian/dementia-india).

Context & Architecture:
- Repository Role: Contains only the hosted application code (Go data pipeline + React/Vite/Tailwind frontend).
- Active Branch: `develop`. All features and fixes land on `develop`.
- Data Pipeline (Go): Run `make data` to generate and validate all processed datasets in `data/processed/`.
- Frontend (React): Run `cd web && npm run dev` for local dev server (port 3000), `npm run build` for production bundle.
- Testing: Run `make test` for Go unit tests and `python3 scripts/audit_compliance.py` for content compliance.

Strict Project Rules:
1. No em-dashes (—) anywhere in UI copy or documentation. Use colons (:), hyphens (-), commas, or separate sentences.
2. Clinical Compliance: Never include pharmaceutical brand or generic drug names or dosage recommendations. Diagnostic advice must route exclusively to memory clinics and cognitive neurologists.
3. Multi-Device Git: Always pull `origin develop` before beginning work. Keep secrets in `.env.local`.
```
