import { readFileSync } from "node:fs";

const required = [
  ".agents/plugins/marketplace.json",
  ".claude-plugin/marketplace.json",
  ".claude-plugin/plugin.json",
  ".codex-plugin/plugin.json",
  ".mcp.json",
  "configs/codex/config.toml",
  "configs/codex/hooks.json",
  "configs/cursor/mcp.json",
  "configs/cursor/hooks.json",
  "configs/hermes/config.yaml",
  "configs/gemini-cli/mcp.json",
  "configs/openclaw/mcp.json",
  "configs/opencode/opencode.json",
  "hooks/hooks.json",
  "plugins/hrbr/.codex-plugin/plugin.json",
  "plugins/hrbr/.mcp.json",
  "plugins/hrbr/skills/hrbr/SKILL.md",
  "plugins/hrbr/assets/harbor-icon.png",
  "plugins/hrbr/assets/harbor-logo.png"
];

for (const file of required) {
  const text = readFileSync(new URL("../" + file, import.meta.url), "utf8");
  if (file.endsWith(".svg") || file.endsWith(".png")) continue;
  if (!text.includes("@zonko-ai/harbor") && !text.includes("hrbr hook") && !text.includes('command = "hrbr"') && !file.includes("marketplace") && !file.includes("plugin.json")) {
    throw new Error(file + " does not mention @zonko-ai/harbor");
  }
}

console.log("install-harbor templates ok");
