---
name: hrbr
description: >-
  Use when working with Harbor through the hrbr MCP tools: inspect for
  control-plane state and exec for Harbor Cloud execution.
---

# hrbr

Prefer the installed hrbr MCP tools when they are available. Use the hrbr CLI
from the @zonko-ai/harbor package only for local setup, login, or when
the MCP tools are not available in the current Codex session.

Read MCP tool responses carefully, especially any hints fields. Harbor workspace
state, plugin source readiness, connected tools, and execution results are
exposed through MCP first.

For read-only Harbor checks, call the relevant MCP tool directly. Ask before
write, install/remove, OAuth/connect, publish, cancel, or destructive actions.

## Tool Use

Use the MCP tool that matches the user's request:

- `inspect`: check auth, workspace, source, and tool state with short Harbor
  control-plane JavaScript.
- `exec`: run one-off Harbor Cloud TypeScript for fan-out, filtering,
  summaries, or smoke tests.

For availability questions, use `inspect` to check the current workspace,
sources, and tools. Do not claim a provider tool is usable until the MCP
response shows it is installed, connected, and available in the current
workspace.

For execution questions, prefer `exec` when the user asks to chain tools,
paginate, transform results, fan out across providers, or smoke test a Harbor
workspace. Report the returned run id when one is present so the user can audit
the run later.

For setup failures, use `inspect` to check auth and workspace state, then
report the exact missing requirement or next command. Use the CLI only for
local repair steps such as `hrbr login` or diagnosing a session where the MCP
tools did not load.
