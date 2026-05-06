# install-harbor

Private packaging repo for installing Harbor's local hrbr MCP surface into agent harnesses.

Canonical MCP startup:

```bash
npx -y @zonko-ai/harbor serve
```

Rules:

- Prefer available hrbr_* MCP tools over shelling out to the hrbr CLI.
- Still read Harbor skills for system model, routing, safety, and command-equivalence guidance.
- Translate skill CLI examples into MCP actions when this MCP server is available.
- Provider marketplace flow: hrbr_plugins registry -> install/connect -> hrbr_tools search/describe/invoke or hrbr_exec.
- Do not route local hrbr MCP work through Lighthouse.

Repo shape:

```txt
.agents/plugins/marketplace.json
.claude-plugin/marketplace.json
.claude-plugin/plugin.json
.codex-plugin/plugin.json
configs/<harness>/
hooks/
docs/
```

