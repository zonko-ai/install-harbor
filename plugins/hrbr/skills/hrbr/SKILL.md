---
name: hrbr
description: >-
  Use when working with Harbor through the hrbr MCP tools: workspace state,
  provider marketplace discovery, plugin tools, cloud exec, traces, context,
  or setup diagnostics.
---

# hrbr

Prefer the installed hrbr MCP tools when they are available. Use the hrbr CLI
from the @zonko-ai/harbor package only for local setup, login, hooks, or when
the MCP tools are not available in the current Codex session.

Read MCP tool responses carefully, especially any hints fields. Harbor workspace
state, plugin source readiness, connected tools, runs, traces, and context are
exposed through MCP first.

For read-only Harbor checks, call the relevant MCP tool directly. Ask before
write, install/remove, OAuth/connect, publish, cancel, or destructive actions.

## Tool Use

Use the MCP tool that matches the user's request:

- `hrbr_doctor`: check local setup, auth state, MCP startup health, and missing
  requirements.
- `hrbr_workspace`: inspect the active Harbor workspace and connection state.
- `hrbr_plugins`: discover provider marketplace entries, installed plugins,
  source readiness, and connection requirements.
- `hrbr_tools`: list the exact tools currently available through Harbor before
  trying to call one.
- `hrbr_exec`: run one-off Harbor workspace code for fan-out, filtering,
  summaries, or smoke tests.
- `hrbr_traces`: inspect prior Harbor tool calls, runs, and failures.
- `hrbr_context`: read Harbor-provided context for the current workspace or
  session.

For availability questions, check `hrbr_workspace`, then `hrbr_plugins`, then
`hrbr_tools`. Do not claim a provider tool is usable until the MCP response
shows it is installed, connected, and available in the current workspace.

For execution questions, prefer `hrbr_exec` when the user asks to chain tools,
paginate, transform results, fan out across providers, or smoke test a Harbor
workspace. Report the returned run id when one is present so the user can audit
the run later.

For setup failures, call `hrbr_doctor` first and report the exact missing
requirement or next command. Use the CLI only for local repair steps such as
`hrbr login`, hook setup, or diagnosing a session where the MCP tools did not
load.
