# install-harbor

Install Harbor's local `hrbr` MCP server into agent clients.

The MCP server is started with:

```bash
npx -y @zonko-ai/harbor serve
```

## Install

Platforms are grouped by install complexity. Plugin-capable platforms get marketplace commands. Other platforms get exact MCP files to create and paste.

Harbor skills are seeded by the `@zonko-ai/harbor` npm postinstall/onboarding path when `npx -y @zonko-ai/harbor serve` installs the package. They are refreshed again by Harbor auth/setup flows. This repo does not ask users to copy `AGENTS.md` or per-project instruction files.

<details open>
<summary><strong>Claude Code</strong> — plugin marketplace</summary>

**Prerequisites:** Claude Code with plugin support and Node.js.

**Install:**

```bash
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

Then open `/plugins`, choose `hrbr`, and install it.

**Verify:** restart Codex and list MCP tools. `hrbr_doctor action=status` should return local setup status.

<details>
<summary>Alternative — MCP-only config</summary>

Add this to `~/.codex/config.toml`:

```toml
[mcp_servers.hrbr]
command = "npx"
args = ["-y", "@zonko-ai/harbor", "serve"]
```

</details>

Full config reference: [configs/codex/config.toml](configs/codex/config.toml)

</details>

<details>
<summary><strong>Gemini CLI</strong> — one settings file</summary>

**Prerequisites:** Gemini CLI and Node.js.

**Install:**

Add this to `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "hrbr": {
      "command": "npx",
      "args": ["-y", "@zonko-ai/harbor", "serve"]
    }
  },
  "hooks": {
    "BeforeTool": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "npx -y @zonko-ai/harbor hook gemini-cli beforetool" }]
      }
    ],
    "AfterTool": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "npx -y @zonko-ai/harbor hook gemini-cli aftertool" }]
      }
    ],
    "PreCompress": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "npx -y @zonko-ai/harbor hook gemini-cli precompress" }]
      }
    ],
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [{ "type": "command", "command": "npx -y @zonko-ai/harbor hook gemini-cli sessionstart" }]
      }
    ]
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
<summary><strong>Cursor</strong> — MCP and hooks</summary>

**Prerequisites:** Cursor Agent and Node.js.

**Install:**

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
      { "command": "npx -y @zonko-ai/harbor hook cursor pretooluse" }
    ],
    "postToolUse": [
      { "command": "npx -y @zonko-ai/harbor hook cursor posttooluse" }
    ],
    "stop": [
      { "command": "npx -y @zonko-ai/harbor hook cursor stop" }
    ]
  }
}
```

**Verify:** open Cursor Settings > MCP and confirm `hrbr` is connected.

Full configs: [configs/cursor/mcp.json](configs/cursor/mcp.json) | [configs/cursor/hooks.json](configs/cursor/hooks.json)

</details>

<details>
<summary><strong>OpenCode</strong> — opencode.json</summary>

**Prerequisites:** OpenCode and Node.js.

**Install:**

Add this to `opencode.json` in your project root or `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "hrbr": {
      "type": "local",
      "command": ["npx", "-y", "@zonko-ai/harbor", "serve"]
    }
  },
  "plugin": ["hrbr"]
}
```

**Verify:** start OpenCode and ask for `hrbr_doctor action=status`.

Full config reference: [configs/opencode/opencode.json](configs/opencode/opencode.json)

</details>

<details>
<summary><strong>OpenClaw</strong> — plugin marketplace or MCP registry</summary>

**Prerequisites:** OpenClaw and Node.js.

**Install as a compatible bundle:**

```bash
openclaw plugins install hrbr --marketplace https://github.com/zonko-ai/install-harbor
openclaw gateway restart
```

**Alternative — MCP-only registry:**

```bash
openclaw mcp set hrbr '{"command":"npx","args":["-y","@zonko-ai/harbor","serve"]}'
```

**Verify bundle install:**

```bash
openclaw plugins list
openclaw plugins inspect hrbr --json
```

**Verify MCP-only registry install:**

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

</details>

<details>
<summary><strong>JetBrains Copilot</strong> — MCP UI</summary>

**Prerequisites:** JetBrains IDE with Copilot MCP support and Node.js.

**Install:**

Add MCP server in the IDE settings:

```text
Name: hrbr
Command: npx
Args: -y @zonko-ai/harbor serve
```

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
