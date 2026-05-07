# install-harbor Matrix

## CLI Bootstrap

Recommended first step for every harness:

```txt
npm install -g @zonko-ai/harbor
hrbr login
```

The copied MCP config may still use `npx -y @zonko-ai/harbor serve` so a fresh client can bootstrap without an existing `hrbr` binary. Beach performs a rate-limited background install attempt when it starts and cannot find `hrbr`; `HRBR_CLI_AUTO_INSTALL=0` disables that path.

## Claude Code

Target marketplace files:

- .claude-plugin/marketplace.json
- .claude-plugin/plugin.json
- hooks/hooks.json

Install target flow:

```txt
npm install -g @zonko-ai/harbor
hrbr login
/plugin marketplace add zonko-ai/install-harbor
/plugin install hrbr@zonko-ai-harbor
/reload-plugins
```

## Codex

Target marketplace/config files:

- .agents/plugins/marketplace.json
- plugins/hrbr/.codex-plugin/plugin.json
- plugins/hrbr/.mcp.json
- plugins/hrbr/skills/hrbr/SKILL.md
- configs/codex/config.toml
- configs/codex/hooks.json

Codex plugin marketplace expects a marketplace manifest that points at a nested plugin directory. A root `.codex-plugin/plugin.json` is not enough to make the marketplace tab show an installable plugin.

Marketplace install:

```bash
codex plugin marketplace add zonko-ai/install-harbor
```

Then open `/plugins`, select `Zonko AI Harbor`, choose `hrbr`, and install it. Hooks remain a separate manual Codex config.

Manual MCP fallback:

```toml
[mcp_servers.hrbr]
command = "hrbr"
args = ["serve"]
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
npm install -g @zonko-ai/harbor
hrbr login
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
npm install -g @zonko-ai/harbor
hrbr login
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
