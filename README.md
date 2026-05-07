# install-harbor

Install Harbor's local `hrbr` MCP server into agent clients.

Install the Harbor CLI once for normal use:

```bash
npm install -g @zonko-ai/harbor
hrbr login
```

The MCP server can then be started with:

```bash
hrbr serve
```

For copy-paste MCP configs, this repo uses the package bootstrap form:

```bash
npx -y @zonko-ai/harbor serve
```

That keeps first-run client installs from failing when `hrbr` is not on `PATH`. Beach also makes a rate-limited background attempt to install the CLI when it starts and cannot find `hrbr`; set `HRBR_CLI_AUTO_INSTALL=0` to disable that best-effort path.

## Install

Platforms are grouped by install complexity. Plugin-capable platforms get marketplace commands. Other platforms get exact MCP files to create and paste.

Harbor skills are seeded by the `@zonko-ai/harbor` npm postinstall/onboarding path when `npx -y @zonko-ai/harbor serve` installs the package. They are refreshed again by Harbor auth/setup flows. This repo does not ask users to copy `AGENTS.md` or per-project instruction files.

<details open>
<summary><strong>Claude Code</strong> — plugin marketplace</summary>

**Prerequisites:** Claude Code with plugin support and Node.js.

**Install:**

```bash
npm install -g @zonko-ai/harbor
hrbr login
/plugin marketplace add zonko-ai/install-harbor
/plugin install hrbr@zonko-ai-harbor
```

Restart Claude Code or run:

```bash
/reload-plugins
```

**Verify:**

```text
/mcp
```

You should see an `hrbr` MCP server with these tools: `hrbr_workspace`, `hrbr_plugins`, `hrbr_tools`, `hrbr_exec`, `hrbr_context`, `hrbr_traces`, `hrbr_doctor`.

The plugin also installs Claude hooks backed by `hrbr hook ...` for session routing and continuity.

<details>
<summary>Alternative — MCP-only install</summary>

```bash
claude mcp add hrbr -- npx -y @zonko-ai/harbor serve
```

</details>

</details>

<details>
<summary><strong>Codex</strong> — plugin marketplace</summary>

**Prerequisites:** Codex CLI with plugin support and Node.js.

**Install:**

```bash
codex plugin marketplace add zonko-ai/install-harbor
```

Open `/plugins`, select `Zonko AI Harbor`, choose `hrbr`, and install it.

Then authenticate:

```bash
hrbr login
```

The plugin installs the `hrbr` MCP server through a plugin-local launcher:

```bash
bash ./scripts/run-mcp.sh
```

That launcher currently executes:

```bash
npx -y @zonko-ai/harbor serve
```

It keeps the Codex MCP config stable while Harbor can change package startup details inside the plugin bundle.

Optional continuity hooks:

```bash
mkdir -p ~/.codex
cp configs/codex/hooks.json ~/.codex/hooks.json
```

The hooks use the global `hrbr` command for local session capture. Install the CLI first if you enable hooks:

```bash
npm install -g @zonko-ai/harbor
```

Hook config:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "local_shell|shell|shell_command|exec_command|container.exec|Bash|Shell|grep_files|mcp__",
        "hooks": [{ "type": "command", "command": "hrbr hook codex pretooluse" }]
      }
    ],
    "PostToolUse": [
      { "hooks": [{ "type": "command", "command": "hrbr hook codex posttooluse" }] }
    ],
    "SessionStart": [
      { "hooks": [{ "type": "command", "command": "hrbr hook codex sessionstart" }] }
    ],
    "UserPromptSubmit": [
      { "hooks": [{ "type": "command", "command": "hrbr hook codex userpromptsubmit" }] }
    ],
    "Stop": [
      { "hooks": [{ "type": "command", "command": "hrbr hook codex stop" }] }
    ]
  }
}
```

Restart Codex.

**Verify:** list MCP tools. `hrbr_doctor action=status` should return local setup status.

Manual fallback configs: [configs/codex/config.toml](configs/codex/config.toml) | [configs/codex/hooks.json](configs/codex/hooks.json)

**Debug local plugin health:**

```bash
PLUGIN_ROOT="$(find ~/.codex/plugins/cache -path '*/zonko-ai-harbor/hrbr/*' -type d | sort | tail -1)"
cd "$PLUGIN_ROOT"
./scripts/check-health.sh
```

**Update:**

```bash
codex plugin marketplace upgrade zonko-ai-harbor
```

Codex caches installed plugins by marketplace, plugin name, and plugin version. Harbor bumps the `hrbr` plugin version whenever plugin assets, MCP config, skills, or hooks change so upgrades install into a new cache path.

Typical cache shape:

```text
~/.codex/plugins/cache/zonko-ai-harbor/hrbr/<version>/
```

</details>

<details>
<summary><strong>Gemini CLI</strong> — one settings file</summary>

**Prerequisites:** Gemini CLI and Node.js.

**Install:**

```bash
npm install -g @zonko-ai/harbor
hrbr login
```

Add this to `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "hrbr": {
      "command": "npx",
      "args": ["-y", "@zonko-ai/harbor", "serve"]
    }
  }
}
```

The settings file also includes Gemini hooks backed by `hrbr hook ...`.

**Verify:**

```text
/mcp list
```

Full config reference: [configs/gemini-cli/settings.json](configs/gemini-cli/settings.json)

</details>

<details>
<summary><strong>Cursor</strong> — MCP config</summary>

**Prerequisites:** Cursor Agent and Node.js.

**Install:**

```bash
npm install -g @zonko-ai/harbor
hrbr login
```

Create `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "hrbr": {
      "command": "npx",
      "args": ["-y", "@zonko-ai/harbor", "serve"]
    }
  }
}
```

Create `.cursor/hooks.json`:

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      { "command": "hrbr hook cursor pretooluse" }
    ],
    "postToolUse": [
      { "command": "hrbr hook cursor posttooluse" }
    ],
    "stop": [
      { "command": "hrbr hook cursor stop" }
    ]
  }
}
```

**Verify:** open Cursor Settings > MCP and confirm `hrbr` is connected.

Full configs: [configs/cursor/mcp.json](configs/cursor/mcp.json) | [configs/cursor/hooks.json](configs/cursor/hooks.json)

</details>

<details>
<summary><strong>OpenCode</strong> — MCP config</summary>

**Prerequisites:** OpenCode and Node.js.

**Install:**

```bash
npm install -g @zonko-ai/harbor
hrbr login
```

Add this to `opencode.json` in your project root or `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "hrbr": {
      "type": "local",
      "command": ["npx", "-y", "@zonko-ai/harbor", "serve"]
    }
  }
}
```

**Verify:** start OpenCode and ask for `hrbr_doctor action=status`.

Full config reference: [configs/opencode/opencode.json](configs/opencode/opencode.json)

</details>

<details>
<summary><strong>OpenClaw</strong> — MCP registry</summary>

**Prerequisites:** OpenClaw and Node.js.

**Install:**

```bash
npm install -g @zonko-ai/harbor
hrbr login
openclaw mcp set hrbr '{"command":"npx","args":["-y","@zonko-ai/harbor","serve"]}'
```

**Verify:**

```bash
openclaw mcp show hrbr --json
```

Full config reference: [configs/openclaw/mcp.json](configs/openclaw/mcp.json)

</details>

<details>
<summary><strong>Hermes</strong> — MCP server</summary>

**Prerequisites:** Hermes Agent and Node.js.

**Install:**

```bash
npm install -g @zonko-ai/harbor
hrbr login
hermes mcp add hrbr --command npx --args -y @zonko-ai/harbor serve
```

**Verify:**

```bash
hermes mcp test hrbr
hermes mcp list
```

Full config reference: [configs/hermes/config.yaml](configs/hermes/config.yaml)

</details>

<details>
<summary><strong>VS Code Copilot</strong> — MCP config</summary>

**Prerequisites:** VS Code Copilot Chat with MCP support and Node.js.

**Install:**

```bash
npm install -g @zonko-ai/harbor
hrbr login
```

Create `.vscode/mcp.json`:

```json
{
  "servers": {
    "hrbr": {
      "command": "npx",
      "args": ["-y", "@zonko-ai/harbor", "serve"]
    }
  }
}
```

Optional hooks for local session capture are available at [configs/vscode-copilot/hooks.json](configs/vscode-copilot/hooks.json).

Full configs: [configs/vscode-copilot/mcp.json](configs/vscode-copilot/mcp.json) | [configs/vscode-copilot/hooks.json](configs/vscode-copilot/hooks.json)

</details>

<details>
<summary><strong>JetBrains Copilot</strong> — MCP UI</summary>

**Prerequisites:** JetBrains IDE with Copilot MCP support and Node.js.

**Install:**

```bash
npm install -g @zonko-ai/harbor
hrbr login
```

Add MCP server in the IDE settings:

```text
Name: hrbr
Command: npx
Args: -y @zonko-ai/harbor serve
```

Optional hooks for local session capture are available at [configs/jetbrains-copilot/hooks.json](configs/jetbrains-copilot/hooks.json).

Full configs: [configs/jetbrains-copilot/mcp.json](configs/jetbrains-copilot/mcp.json) | [configs/jetbrains-copilot/hooks.json](configs/jetbrains-copilot/hooks.json)

</details>

## Provider Marketplace

Once installed, provider setup happens through MCP tools:

```text
hrbr_plugins action=registry
hrbr_plugins action=install slug=<provider>
hrbr_plugins action=connect namespace=<source>
hrbr_tools action=search query=<intent>
hrbr_tools action=describe tool_id=<id>
hrbr_tools action=invoke tool_id=<id> input=<json>
```
