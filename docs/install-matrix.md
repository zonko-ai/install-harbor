# install-harbor Matrix

## Claude Code

Target marketplace files:

- .claude-plugin/marketplace.json
- .claude-plugin/plugin.json
- hooks/hooks.json

Install target flow:

```txt
/plugin marketplace add zonko-ai/install-harbor
/plugin install hrbr@zonko-ai-harbor
/reload-plugins
```

## Codex

Target marketplace/config files:

- .agents/plugins/marketplace.json
- .codex-plugin/plugin.json
- configs/codex/config.toml
- configs/codex/AGENTS.md

Manual MCP config:

```toml
[mcp_servers.hrbr]
command = "npx"
args = ["-y", "@zonko-ai/harbor", "serve"]
```

## Cursor

Use configs/cursor/mcp.json and configs/cursor/hrbr.mdc.

## Gemini CLI

Use configs/gemini-cli/settings.json or split mcp.json plus GEMINI.md.

## OpenCode

Use configs/opencode/opencode.json and configs/opencode/AGENTS.md.

## Provider Marketplace

Do not create one MCP server or tool per provider. Harbor providers stay behind:

- hrbr_plugins action=registry
- hrbr_plugins action=install
- hrbr_plugins action=connect
- hrbr_tools action=search
- hrbr_tools action=describe
- hrbr_tools action=invoke
- hrbr_exec for multi-step orchestration
