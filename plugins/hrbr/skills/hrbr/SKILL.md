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

## Operating Model

Harbor is a workspace-scoped MCP control plane. Treat provider marketplace
state, plugin installation, OAuth readiness, tools, runs, traces, and context as
workspace facts. Do not infer that a local package install means the current
workspace is connected or authorized.

Use the MCP tools as the primary interface:

- Start with setup or workspace status when the user asks whether Harbor is
  working, missing, connected, or installed.
- Use plugin/source discovery tools before claiming a provider tool is
  available.
- Use tool listings to find exact Harbor tool names rather than guessing.
- Use trace/run tools when the user asks what happened in a prior execution.
- Use exec only for one-off Harbor workspace code execution or smoke tests.

CLI usage is appropriate for:

- \`hrbr login\` or local auth repair.
- \`hrbr serve\` / MCP startup diagnosis.
- Hook setup and local session capture.
- Cases where Codex did not load the MCP tools for this session.

When setup is broken, prefer reporting the exact missing local requirement and a
single next command. Avoid broad reinstall advice unless the health check shows
the local package or auth state is actually missing.
