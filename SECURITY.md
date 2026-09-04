# Security rules

These rules are not subject to self-annealing. An agent may propose a change
to this file; it may never apply one to itself.

## 1. Secrets stay in the execution layer

Only files in `execution/` may read `.env`. Directives, agent persona files,
and plan files are committed to git and must never contain API keys, tokens,
account numbers, or credentials — not even example ones that look real.

## 2. Mutating actions require confirmation, always

Any execution script that changes external state — placing a trade or order,
sending an email, posting to a social account, deleting/overwriting a file
outside `.tmp/`, calling a paid API above the cost threshold — must be marked
`requires_confirmation: true` in its directive's frontmatter. The orchestrator
writes a plan file and stops for human review before running it. This applies
even after a script has run successfully many times before. No exceptions
carved out by self-annealing.

## 3. Read-only is the default assumption

If a directive doesn't explicitly say a script mutates state, treat it as
read-only until proven otherwise. When in doubt, ask.

## 4. Confirmation flags are a one-way door

An agent may set `requires_confirmation: true` on its own initiative if it
judges a task riskier than the directive assumed. An agent may never set it
to `false`. Only a human editing the file directly can loosen this.

## 5. Cost threshold is a hard stop, not a suggestion

`COST_THRESHOLD_USD` in `.env` defines the per-call/per-task ceiling above
which the router must stop and request confirmation via a plan file,
regardless of how confident the agent is that the spend is worth it.

## 6. No credentials in prompts sent to cloud/paid models

Never include `.env` contents, tokens, or account identifiers in a prompt
sent to any LLM, local or remote. Local models are lower risk but not zero
risk — treat prompt contents as if they could leak.

## 7. Financial account connections (trading APIs, banking, etc.)

Any directive that touches a live trading, banking, or payment account:
- Must be read-only (quotes, positions, balances) unless explicitly and
  narrowly scoped otherwise by the user.
- Order placement / fund transfer directives require `requires_confirmation:
  true` with no exception, and should log the full intended action to
  `plans/` before any execution script runs.

## 8. Reviewing this file

Re-read this file at the start of any session where the task involves money,
personal data, or external communication on the user's behalf.
