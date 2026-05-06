# hrbr MCP

Harbor's local MCP server is available as hrbr.

- Prefer hrbr_* MCP tools over shelling out to the hrbr CLI.
- Read Harbor skills when they match the task; translate CLI examples into MCP actions.
- Provider marketplace flow: hrbr_plugins action=registry, install/connect as needed, then hrbr_tools action=search/describe/invoke.
- Use hrbr_exec only for multi-step cloud execution, pagination, joins, or data shaping.
- Use hrbr_context for local continuity and resume.
- Do not route local hrbr MCP work through Lighthouse.

