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

For copy-paste MCP configs, this repo uses the installed CLI form:

```bash
hrbr serve
```

That keeps every harness on the same singleton sidecar path instead of launching package bootstrap processes per client.

## Install

Platforms are grouped by install complexity. Plugin-capable platforms get marketplace commands. Other platforms get exact MCP files to create and paste.

Harbor skills are seeded by the `@zonko-ai/harbor` npm postinstall/onboarding path when the CLI is installed. They are refreshed again by Harbor auth/setup flows. This repo does not ask users to copy `AGENTS.md` or per-project instruction files.

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

You should see an `hrbr` MCP server with Reef's `inspect` and `exec` tools.

<details>
<summary>Alternative — MCP-only install</summary>

```bash
claude mcp add -s user hrbr -- hrbr serve
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
hrbr serve
```

It keeps the Codex MCP config stable while Harbor can change package startup details inside the plugin bundle. hrbr serve starts a lightweight stdio bridge and reuses one local hrbr MCP sidecar on 127.0.0.1, so multiple harnesses do not each own a full MCP server.

Restart Codex after installing the plugin.

**Verify:** list MCP tools. Harbor should expose Reef's `inspect` and `exec` tools.

Manual fallback config: [configs/codex/config.toml](configs/codex/config.toml)

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

Codex caches installed plugins by marketplace, plugin name, and plugin version. Harbor bumps the `hrbr` plugin version whenever plugin assets, MCP config, or skills change so upgrades install into a new cache path.

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
      "command": "hrbr",
      "args": ["serve"]
    }
  }
}
```

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
      "command": "hrbr",
      "args": ["serve"]
    }
  }
}
```

**Verify:** open Cursor Settings > MCP and confirm `hrbr` is connected.

Full config: [configs/cursor/mcp.json](configs/cursor/mcp.json)

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
      "command": ["hrbr", "serve"]
    }
  }
}
```

**Verify:** start OpenCode and confirm the `inspect` and `exec` MCP tools are available.

Full config reference: [configs/opencode/opencode.json](configs/opencode/opencode.json)

</details>

<details>
<summary><strong>OpenClaw</strong> — MCP registry</summary>

**Prerequisites:** OpenClaw and Node.js.

**Install:**

```bash
npm install -g @zonko-ai/harbor
hrbr login
openclaw mcp set hrbr '{"command":"hrbr","args":["serve"]}'
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
hermes mcp add hrbr --command hrbr --args serve
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
      "command": "hrbr",
      "args": ["serve"]
    }
  }
}
```

Full config: [configs/vscode-copilot/mcp.json](configs/vscode-copilot/mcp.json)

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
Command: hrbr
Args: serve
```

Full config: [configs/jetbrains-copilot/mcp.json](configs/jetbrains-copilot/mcp.json)

</details>

## Provider Marketplace

Once installed, provider setup happens through Reef MCP tools:

```text
inspect: check auth, workspace, source, and tool state
exec: run Harbor Cloud TypeScript against the current workspace
```
