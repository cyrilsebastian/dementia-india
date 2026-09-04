---
name: agentic-template
description: Standard operating procedures and execution protocol for the layered agentic architecture (directives, personas, plans, deterministic execution, cost cascade, ledger logging, and self-annealing).
---

# Agentic Architecture Protocol

This skill guides agents operating within the layered **agentic-template** architecture.

## Core Structure

```
├── directives/      # WHAT to do (SOPs in Markdown with YAML frontmatter)
├── agents/          # WHO does it (Persona definitions with boundaries & cost tier)
├── plans/           # Human review checkpoint before non-trivial/mutating execution
├── execution/       # Deterministic scripts & cost-aware LLM router
└── ledger/          # Append-only cost and execution audit log (ledger.csv)
```

## Step-by-Step Workflow

### 1. Identify the Directive
- Check `directives/` for an existing Standard Operating Procedure (SOP).
- Read the YAML frontmatter to identify:
  - `agent`: which persona to adopt
  - `tier`: default and max cost tier allowed (`local`, `free_cloud`, `cloud_metered`, `paid`)
  - `plan_required`: whether human review is mandatory before running

### 2. Adopt the Assigned Persona
- Read the matching file in `agents/<persona>.md`.
- Adhere strictly to the persona's:
  - **Thinking style** (e.g. cautious vs exploratory)
  - **Boundaries** (what is strictly forbidden without approval)
  - **Cost tier defaults**

### 3. Check `execution/` First
- Always push complexity into deterministic scripts (`.sh`, `.go`, `.py`, `Makefile`).
- Check if a tool already exists before writing new code.
- Keep LLMs focused on decision-making and synthesis rather than raw computation.

### 4. Human Review & Plans
- If `plan_required: true`, write a plan to `plans/<task_name>.md` detailing:
  - Goal
  - Proposed steps
  - Tools/scripts to call
  - Cost tier estimation
- Wait for user confirmation before executing mutating actions.

### 5. Self-Annealing Protocol
When an error or stack trace occurs:
1. Diagnose the root cause from logs.
2. Fix the deterministic script or code.
3. Test locally (`make test`, `make validate`, etc.) to confirm resolution.
4. Update the relevant directive in `directives/` with the new edge cases or learned procedures.
5. Log the outcome in `ledger/ledger.csv`.
