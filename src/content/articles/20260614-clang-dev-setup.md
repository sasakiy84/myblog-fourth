---
title: VSCodeでClang開発環境を構築する
description: 最低限拡張機能が利用できるくらいの環境を構築する
published: 2026-06-14
---


C言語を手元で書くために、コンパイラ、デバッガ、フォーマッタ、静的解析、VS Code 拡張、ビルド設定をまとめて用意する。
gcc より clang の方がエコシステムが整っていそうなので、clang を使うことにする。

対象は Ubuntu / Debian 系の環境。

## 必要なパッケージのインストール

clang でコンパイルし、gdb でデバッグし、clangd で補完や定義ジャンプを使う。clang-format と clang-tidy も入れておく。
gdb は、もっとリッチなものを使ってもいいかもしれない。VSCode 側の disassembly view はシンボル情報とかも表示されなかったので、不採用。

```bash
sudo apt install -y gdb clangd clang clang-format clang-tidy cmake
```

## VS Code の推奨拡張
`.vscode/extensions.json`で、[C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)と[clangd](https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.vscode-clangd)を推奨拡張として設定する。

```json
{
  "recommendations": [
    "ms-vscode.cpptools",
    "llvm-vs-code-extensions.vscode-clangd"
  ]
}
```

## Clangd 向けのコンパイルフラグの設定

clangd はソースコードを解析するときに、どの C 標準を使うか、どの警告を有効にするかを知る必要がある。`compile_flags.txt`の値を勝手に読み取ってくれるので、たとえば以下のように設定する。
```
-std=c17
-Wall
-Wextra
-Wpedantic
-g
-O0
```

## Makefile

`Makefile` を用意して、`make` コマンドでビルドできるようにする。以下は一例。
`compile_flags.txt` とフラグが同じになるようにしなければいけないが、せいぜい二箇所だけなので、許容範囲ということにする。
一つの設定ファイルから、両方にフラグを反映させるような仕組みもできるが、大掛かりになりすぎる。

```cmake
CC := clang
CFLAGS := -std=c17 -Wall -Wextra -Wpedantic -g -O0
TARGET := hello
SOURCE := hello.c

all: $(TARGET)

$(TARGET): $(SOURCE)
	$(CC) $(CFLAGS) -o $(TARGET) $(SOURCE)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: all run clean
```