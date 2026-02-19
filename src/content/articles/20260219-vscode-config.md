---
title: VSCode のTIPs & 設定
description: 便利だと思った VSCode の TIPs & 設定の備忘録
published: 2026-02-19
---

## ショートカット・操作
### シンボルジャンプ
Cmd + Shift + O で、シンボルジャンプができる。

### ターミナルの切り替え
Cmd + J で、ターミナルの表示・非表示を切り替えることができる。

### マークダウンへのリンク挿入
EXPLORER からファイルを選択してマークダウンページへドラッグし、Shift を押しながらドロップすると、マークダウンへのリンクが挿入される。

## VSCode の設定
### ファイルツリーで Double Click で展開する
VSCode のファイルツリーで、Double Click で展開するように設定する。
プレビューしたくないような重いファイルを扱っており、ファイル名を変更したり、ドラッグ&ドロップで移動するときに、シングルクリックでファイルが開かれるのが煩わしい。また、大量のファイルを含むフォルダの名前を変更するときに、シングルクリックでフォルダの中身が展開されるのも煩わしい。

```json
{
  "workbench.list.openMode": "doubleClick",
  "workbench.tree.expandMode": "doubleClick"
}
```


### ターミナルのスクロールバックを増やす

```json
{
  "terminal.integrated.scrollback": 4000,
}
```

### minimap を無効化する
minimap が便利だと思ったことがない。

```json
{
  "editor.minimap.enabled": false,
}
```

