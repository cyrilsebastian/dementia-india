#!/usr/bin/env bash
# Keeps CLAUDE.md and GEMINI.md identical to AGENTS.md.
# Edit AGENTS.md only, then run this script.
set -e
cp AGENTS.md CLAUDE.md
cp AGENTS.md GEMINI.md
echo "Synced AGENTS.md -> CLAUDE.md, GEMINI.md"
