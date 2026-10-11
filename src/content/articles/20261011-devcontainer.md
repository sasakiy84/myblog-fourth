---
title: devcontainer の設定のメモ
description: devcontainer で良く使う設定
published: 2026-10-11
tags:
---


```json
{
  "name": "Ubuntu",
  "image": "mcr.microsoft.com/devcontainers/base:resolute",

	"features": {
		"ghcr.io/devcontainers/features/docker-in-docker:2": {
			"version": "latest",
			"moby": "false"
		},
		"ghcr.io/devcontainers/features/github-cli:1": {}
	},
  {
    "type": "bind",
    "source": "/home/user/datasets",
    "target": "/mnt/datasets",
    "readonly": true
  }
  "runArgs": ["--gpus", "all"]
}
```