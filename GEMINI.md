# Agent Instructions

> Mirrored across CLAUDE.md, AGENTS.md, and GEMINI.md so the same instructions
> load in any AI environment (Claude Code, Codex, Gemini CLI, Antigravity, etc).
> Edit AGENTS.md, then run `./sync_agent_files.sh` to copy it to the others.
> Never edit CLAUDE.md or GEMINI.md directly — your change will be overwritten.

You operate within a layered architecture that separates concerns to maximize
reliability. LLMs are probabilistic; most business logic is deterministic and
needs to be consistent every time. This system fixes that mismatch, and adds
cost control and a review checkpoint so nothing expensive or destructive runs
unattended.

## The Layers

**directives/ — WHAT to do**
SOPs written in Markdown. Define goal, inputs, which execution script(s) to
call, expected output, edge cases. Written like instructions for a mid-level
employee, not a prompt. Each directive has YAML frontmatter declaring which
`agents/` persona should run it and what cost `tier` it's allowed to reach.

**agents/ — WHO does it / HOW they think**
Persona definitions, separate from directives so the same directive can be run
by different personas with different risk tolerance. A persona sets tone,
caution level, and — critically — what it is and isn't allowed to do without
asking first.

**plans/ — the stated intent BEFORE anything runs**
For anything non-trivial, the orchestrator writes a plan file describing the
steps it intends to take, which tier each step will use, and the estimated
cost, before executing. This is the human review checkpoint. Trivial,
already-proven, zero-cost, non-mutating tasks may skip this — see each
directive's `plan_required` field.

**execution/ — the actual work**
Deterministic scripts (Go preferred, Python where it's faster to write).
Environment variables and API tokens live in `.env`, read only by this layer.
Reliable, testable, fast, commented well. Includes:
- `llm_router.go` — the cost-aware cascade (cache → local → free cloud → paid)
- `cache.go` — response cache keyed by prompt hash
- `ledger.go` — append-only cost/usage log, CSV format so it opens in Excel

**ledger/ — what actually happened**
Every LLM call, cache hit/miss, model used, tokens, and $ cost gets logged
here automatically by the router. This is the data you review weekly to
decide whether to tune a prompt, upgrade a local model, or accept the paid
cost.

## Why this works

If one agent does everything itself — reasoning, deciding, and acting in one
pass — errors compound. 90% accuracy per step means ~59% success over 5 steps.
The fix: push complexity into deterministic code, keep the LLM focused on
decision-making, and put a human checkpoint (the plan file) between "decided"
and "executed" for anything that costs money or touches the outside world.

## Operating principles

**1. Check execution/ first**
Before writing a new script, check whether one already exists for this task.
Only create a new one if the directive doesn't point to an existing tool.

**2. Cost-aware by default**
Before calling any LLM, the router checks `.cache/` first (free), then local
Ollama (free, unlimited — `qwen3-coder:30b` by default), then free cloud
tiers (Gemini/Groq/OpenRouter free quota), then Ollama's own `:cloud`-tagged
models (e.g. `kimi-k2.7-code:cloud` — $0 direct cost but metered against your
Ollama plan allowance, not truly unlimited like the local tier — reserve for
tasks the earlier tiers actually fail on, not routine calls), and only
escalates to a paid model (Claude, etc.) as the last resort. Every escalation
that exceeds the cost threshold in `.env` (`COST_THRESHOLD_USD`) requires a
plan file and human confirmation — no exceptions, even mid-task.

**3. Self-anneal when things break**
- Read the error and stack trace.
- Fix the script and test it again — unless the fix would consume paid
  tokens/credits, in which case check with the user first.
- Update the relevant directive with what you learned (rate limits, timing,
  edge cases, a better local prompt that avoided an escalation).
- Never loosen a `requires_confirmation: true` flag on your own. That's a
  one-way door only the user opens.

**4. Directives are living documents, but not yours to overwrite**
Update a directive when you learn something real (an API limit, a better
approach, a common failure mode). Never create or overwrite a directive
without asking, unless explicitly told to — directives are the instruction
set and must be preserved and improved deliberately, not silently rewritten.

## Self-annealing loop

1. Fix the script.
2. Update/add tests, confirm it works.
3. Update the directive to describe the new flow.
4. Log the incident in the ledger notes if it changed cost behavior.
5. System is now stronger for next time.

## File organization

- `.tmp/` — intermediate files only (scraped data, temp exports). Never
  committed, always regenerable, safe to delete anytime.
- `.cache/` — LLM response cache. Gitignored. Safe to delete; it just means
  the next identical call costs tokens again instead of being free.
- `plans/` — plan files awaiting or after review. Gitignored contents.
- `ledger/` — cost/usage history. Committed by default (it's small, plain
  text, and useful as a project history) — gitignore it yourself if a
  project generates a lot of volume.
- `execution/` — the deterministic scripts.
- `directives/` — the SOPs.
- `agents/` — the personas.
- `.env` — secrets, gitignored, execution-layer-only. Never referenced from
  directives, agents, or plans, which all get committed to git.
- `SECURITY.md` — hard rules that apply across every layer, not subject to
  self-annealing.

## Summary

You sit between human intent (directives) and deterministic execution
(scripts), with a persona (agents/) shaping how you approach the task, a plan
(plans/) as the checkpoint before anything costly or irreversible happens,
and a ledger (ledger/) recording what it actually cost. Read instructions,
make decisions, call tools, handle errors, spend the least money that gets
the job done, continuously improve the system — but never the security rules.
