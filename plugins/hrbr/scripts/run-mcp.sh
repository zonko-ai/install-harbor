#!/usr/bin/env bash
set -euo pipefail

if command -v hrbr >/dev/null 2>&1; then
  exec hrbr serve
fi

printf '%s\n' 'hrbr CLI is not installed. Run: npm install -g @zonko-ai/harbor' >&2
exit 127
