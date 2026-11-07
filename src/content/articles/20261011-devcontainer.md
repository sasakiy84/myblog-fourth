---
title: devcontainer の設定のメモ
description: devcontainer で良く使う設定
published: 2026-10-11
---


```sh
mkdir .devcontainer && touch .devcontainer/devcontainer.json
```

```json
{
	"name": "",
	"image": "mcr.microsoft.com/devcontainers/base:resolute",
	"remoteUser": "vscode",
	"shutdownAction": "none",
	"appPort": [
		// hostPort:containerPort
	],
	"features": {
		"ghcr.io/devcontainers/features/docker-in-docker:4": {
			"version": "latest",
			"moby": "false"
		},
		"ghcr.io/devcontainers/features/github-cli:1": {
			"version": "latest"
		},
		"ghcr.io/devcontainers/features/node:2": {
			"version": "latest"
		},
		"ghcr.io/devcontainers/features/rust:1": {
			"version": "latest",
			"profile": "minimal"
		},
		"ghcr.io/devcontainers/features/go:1": {
			"version": "latest"
		}
	},
	"remoteEnv": {
		"BUN_INSTALL": "/home/vscode/.local",
		"PATH": "/home/vscode/.local/bin:${containerEnv:PATH}"
	},
	"mounts": [
		"type=bind,source=/mnt/data1,target=/data,readonly",
		// "type=bind,source=/mnt/data1/hdd,target=/workspace/${localWorkspaceFolderBasename}/data/hdd",
		"source=claude-code-config,target=/home/vscode/.claude,type=volume",
		"source=anthropic-config,target=/home/vscode/.config/anthropic,type=volume",
		"source=codex-config-${localWorkspaceFolderBasename}-${devcontainerId},target=/home/vscode/.codex,type=volume",
		"source=copilot-config,target=/home/vscode/.copilot,type=volume",
		"source=gh-config,target=/home/vscode/.config/gh,type=volume"
	],
	"containerEnv": {
		"CLAUDE_CONFIG_DIR": "/home/vscode/.claude"
	},
	"runArgs": [
		"--gpus=all",
		"--hostname=${localWorkspaceFolderBasename}-devcontainer",
		"--name=devcontainer-${localWorkspaceFolderBasename}-${devcontainerId}"
	],
	"sudo chown -R \"$(id -u):$(id -g)\" \"$HOME/.claude\" \"$HOME/.config/anthropic\" \"$HOME/.codex\" \"$HOME/.copilot\" \"$HOME/.config/gh\"",
	"postCreateCommand": {
		"codex": "curl -fsSL https://chatgpt.com/codex/install.sh | CODEX_NON_INTERACTIVE=1 sh",
		"claude": "curl -fsSL https://claude.ai/install.sh | bash",
		"uv": "curl -LsSf https://astral.sh/uv/install.sh | sh",
		"bun": "curl -fsSL https://bun.com/install | bash",
		"playwright-cli": "npm install -g @playwright/cli@latest && playwright-cli install-browser chromium --with-deps && playwright-cli install --skills=agents --global && playwright-cli install --skills=claude --global",
		"sasakiy-skills": "mkdir -p ~/.local/share && git clone --depth 1 https://github.com/sasakiy84/agent-toolbox.git ~/.local/share/agent-toolbox"
	},
	"postStartCommand": {
		"sync-basic-skills": "nohup bash -c 'bash /home/vscode/.local/share/agent-toolbox/sync-basic-skills.sh >/tmp/skills-update.log 2>&1 </dev/null &' >/dev/null 2>&1"
	}
}
```
