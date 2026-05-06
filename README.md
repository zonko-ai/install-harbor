# install-harbor

Harness packaging for Harbor's local `hrbr` MCP surface.

This repo contains marketplace manifests, client config snippets, hooks, and routing files for installing Harbor into agent harnesses. The server itself ships from the published Harbor package:

```bash
npx -y @zonko-ai/harbor serve
```

## Install

Platforms are grouped by install path. Hook-capable clients get hook templates; MCP-only clients only need the stdio server command.

<details open>
<summary><strong>Claude Code</strong> — plugin marketplace</summary>

**Prerequisites:** Claude Code with plugin support, Node.js, and an authenticated Harbor profile.

**Target install:**

```text
/plugin marketplace add zonko-ai/install-harbor
/plugin install hrbr@zonko-ai-harbor
/reload-plugins
```

The plugin manifest is [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json). It registers the `hrbr` MCP server and hook bundle from [hooks/hooks.json](hooks/hooks.json).

**MCP-only fallback:**

```bash
claude mcp add hrbr -- npx -y @zonko-ai/harbor serve
```

**Verify:**

```text
/mcp
hrbr_doctor action=status
```

</details>

<details>
<summary><strong>Codex</strong> — marketplace plus MCP config</summary>

Codex marketplace metadata lives in:

- [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json)
- [`.codex-plugin/plugin.json`](.codex-plugin/plugin.json)

Manual MCP config:

```toml
[mcp_servers.hrbr]
command = "npx"
args = ["-y", "@zonko-ai/harbor", "serve"]
```

Copyable files:

- [configs/codex/config.toml](configs/codex/config.toml)
- [configs/codex/AGENTS.md](configs/codex/AGENTS.md)

</details>

<details>
<summary><strong>Gemini CLI</strong> — settings file</summary>

Use [configs/gemini-cli/settings.json](configs/gemini-cli/settings.json) for MCP plus hooks, or [configs/gemini-cli/mcp.json](configs/gemini-cli/mcp.json) for MCP-only setup.

Routing text lives in [configs/gemini-cli/GEMINI.md](configs/gemini-cli/GEMINI.md).

</details>

<details>
<summary><strong>Cursor</strong> — MCP, hooks, and rule file</summary>

Use:

- [configs/cursor/mcp.json](configs/cursor/mcp.json)
- [configs/cursor/hooks.json](configs/cursor/hooks.json)
- [configs/cursor/hrbr.mdc](configs/cursor/hrbr.mdc)

Project rules are required because Cursor hook context injection is not a reliable session-start channel.

</details>

<details>
<summary><strong>OpenCode</strong> — local MCP config and AGENTS.md</summary>

Use:

- [configs/opencode/opencode.json](configs/opencode/opencode.json)
- [configs/opencode/AGENTS.md](configs/opencode/AGENTS.md)

</details>

<details>
<summary><strong>Other Harnesses</strong> — routing templates</summary>

Current templates:

- [configs/pi/AGENTS.md](configs/pi/AGENTS.md)
- [configs/qwen-code/QWEN.md](configs/qwen-code/QWEN.md)
- [configs/kiro/KIRO.md](configs/kiro/KIRO.md)
- [configs/vscode-copilot/copilot-instructions.md](configs/vscode-copilot/copilot-instructions.md)
- [configs/jetbrains-copilot/copilot-instructions.md](configs/jetbrains-copilot/copilot-instructions.md)

</details>

## Tool Surface

```txt
hrbr_workspace   profile, workspace list/select/status
hrbr_plugins     provider marketplace, source install/connect/readiness
hrbr_tools       tool search, schema describe, direct invoke
hrbr_exec        Harbor cloud execution for multi-step workflows
hrbr_context     local continuity, hook/session ingest, resume/search
hrbr_traces      runs, spans, artifacts, cancel
hrbr_doctor      setup and health diagnostics
```

## Provider Marketplace

Provider marketplace and install flows stay behind the bounded MCP surface:

```txt
hrbr_plugins action=registry
hrbr_plugins action=install slug=<provider>
hrbr_plugins action=connect namespace=<source>
hrbr_tools action=search query=<intent>
hrbr_tools action=describe tool_id=<id>
hrbr_tools action=invoke tool_id=<id> input=<json>
hrbr_exec for pagination, fan-out, joins, or report shaping
```

## Repo Layout

```txt
.agents/plugins/marketplace.json
.claude-plugin/marketplace.json
.claude-plugin/plugin.json
.codex-plugin/plugin.json
configs/
hooks/
docs/install-matrix.md
```
