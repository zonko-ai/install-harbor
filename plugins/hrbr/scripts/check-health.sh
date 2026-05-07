#!/usr/bin/env bash
set -euo pipefail

echo "hrbr plugin root: $(pwd)"

if ! command -v node >/dev/null 2>&1; then
  echo "node: missing"
  exit 1
fi

echo "node: $(node --version)"

if command -v hrbr >/dev/null 2>&1; then
  echo "hrbr: $(command -v hrbr)"
  hrbr --version || true
else
  echo "hrbr: not on PATH"
  echo "hrbr: MCP startup will use npx -y @zonko-ai/harbor serve"
fi

if command -v npx >/dev/null 2>&1; then
  echo "npx: $(command -v npx)"
else
  echo "npx: missing"
  exit 1
fi

echo "mcp command: bash ./scripts/run-mcp.sh"
echo "status: local prerequisites found"
