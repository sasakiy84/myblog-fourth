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
    "type=bind,source=/mnt/data1/,target=${containerWorkspaceFolder}/data/,readonly",
    "source=claude-code-config,target=/home/vscode/.claude,type=volume",
    "source=anthropic-config,target=/home/vscode/.config/anthropic,type=volume",
    "source=codex-config,target=/home/vscode/.codex,type=volume",
    "source=copilot-config,target=/home/vscode/.copilot,type=volume"
  ],
  "containerEnv": {
    "CLAUDE_CONFIG_DIR": "/home/vscode/.claude"
  },
  "runArgs": [
    "--gpus",
    "all",
    "--name=devcontainer-${localWorkspaceFolderBasename}-${devcontainerId}"
  ],
  "onCreateCommand": "sudo chown -R \"$(id -u):$(id -g)\" /home/vscode/.claude /home/vscode/.codex /home/vscode/.copilot",
  "postCreateCommand": {
    "codex": "curl -fsSL https://chatgpt.com/codex/install.sh | CODEX_NON_INTERACTIVE=1 sh",
    "claude": "curl -fsSL https://claude.ai/install.sh | bash",
    "copilot": "curl -fsSL https://gh.io/copilot-install | bash",
    "uv": "curl -LsSf https://astral.sh/uv/install.sh | sh",
    "bun": "curl -fsSL https://bun.com/install | bash",
    "playwright-cli": "npm install -g @playwright/cli@latest && playwright-cli install-browser chromium --with-deps && playwright-cli install --skills=agents --global && playwright-cli install --skills=claude --global",
    "sasakiy-skills": "npx --yes skills add --global --agent codex --agent claude-code --yes sasakiy84/agent-toolbox/skills/pkg00-base sasakiy84/agent-toolbox/skills/pkg01-dev"
  }
}
```
