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
		"type=bind,source=/mnt/data1/,target=${containerWorkspaceFolder}/data/"
	],
	"runArgs": [
		"--gpus",
		"all"
	],
	"postCreateCommand": {
		"codex": "curl -fsSL https://chatgpt.com/codex/install.sh | CODEX_NON_INTERACTIVE=1 sh",
		"uv": "curl -LsSf https://astral.sh/uv/install.sh | sh",
		"bun": "curl -fsSL https://bun.com/install | bash",
		"playwright-cli": "npm install -g @playwright/cli@latest && playwright-cli install-browser chrome --with-deps && playwright-cli install --skills=agents --global",
		"sasakiy-skills": "npx --yes skills add --global --agent codex --yes sasakiy84/agent-toolbox/skills/pkg00-base sasakiy84/agent-toolbox/skills/pkg01-dev"
	}
}
```