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

Manual MCP config:

```toml
[mcp_servers.hrbr]
command = "npx"
args = ["-y", "@zonko-ai/harbor", "serve"]
```

## Cursor

Use configs/cursor/mcp.json and configs/cursor/hooks.json.

## Gemini CLI

Use configs/gemini-cli/settings.json or split mcp.json.

## OpenCode

Use configs/opencode/opencode.json.

## OpenClaw

OpenClaw supports compatible Codex/Claude/Cursor bundles through `openclaw plugins install`.

Install target flow:

```txt
openclaw plugins install hrbr --marketplace https://github.com/zonko-ai/install-harbor
openclaw gateway restart
openclaw plugins inspect hrbr --json
```

Fallback MCP registry flow:

```txt
openclaw mcp set hrbr '{"command":"npx","args":["-y","@zonko-ai/harbor","serve"]}'
openclaw mcp show hrbr --json
```

Target files:

- .mcp.json
- .codex-plugin/plugin.json
- .claude-plugin/plugin.json
- configs/openclaw/mcp.json

## Hermes

Hermes has first-class MCP server management with `hermes mcp add`. Use MCP rather than a native Hermes plugin for Harbor.

Install target flow:

```txt
hermes mcp add hrbr --command npx --args -y @zonko-ai/harbor serve
hermes mcp test hrbr
```

Target files:

- configs/hermes/config.yaml

## Skills

Harbor skills are owned by the `@zonko-ai/harbor` package. The npm postinstall/onboarding path seeds them when `npx -y @zonko-ai/harbor serve` installs the package, unless the package is installed under CI, inside a workspace checkout, or with the explicit opt-out environment variables. Auth/login can refresh them, but auth is not required for the postinstall seed.

## Provider Marketplace

Do not create one MCP server or tool per provider. Harbor providers stay behind:

- hrbr_plugins action=registry
- hrbr_plugins action=install
- hrbr_plugins action=connect
- hrbr_tools action=search
- hrbr_tools action=describe
- hrbr_tools action=invoke
- hrbr_exec for multi-step orchestration
