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
