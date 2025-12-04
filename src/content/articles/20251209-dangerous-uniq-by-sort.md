---
title: sort -u ではなく sort | uniq を使おう
description: Linux の sort -u コマンドで重複排除を行う際、ロケール設定（ja\_JP.UTF-8）によって異なる文字が同一とみなされデータが消失する現象と、その対策（uniq の使用推奨）について
published: 2025-12-09
-----

これは、[TSG Advent Calendar 2025](https://adventar.org/calendars/12405) の 9 日目の記事です。

---

Linux でデータの重複排除をする際、タイプ数が少ないので `sort -u` を使っていたが、特定の文字（ローマ数字や絵文字）が含まれる場合に集計結果がおかしいことに気づいた。

`sort -u` はロケールの影響を強く受けるため、厳密な重複排除には `sort | uniq` を使う方がよい。

## Ⅰ, Ⅱ, Ⅲ が Ⅰ になってしまう

以下のようなローマ数字を含むリストを `sort -u` で処理すると、なぜか「Ⅰ」しか残らない。

```bash
$ sort -u <<EOF
Ⅰ
Ⅱ
Ⅲ
EOF
# Ⅰ
```

GNU coreutils 8.32 環境で確認した。

原因は `sort` コマンドが参照している `LC_COLLATE`（照合順序） の設定にある。
日本語環境（`ja_JP.UTF-8`）では、Unicode の照合アルゴリズム（UCA）に基づき、「Ⅰ (U+2160) と Ⅱ (U+2161) と Ⅲ (U+2162) はソート順序において『等価』である」 と定義されている場合がある。

挙動を確認したサーバーでは、以下のように設定されていた。

```bash
$  locale | grep COLLATE
LC_COLLATE="ja_JP.UTF-8"
```

`sort -u` は「ソート順序が同じなら重複とみなす」という挙動をするため、これらをすべて同じものとして扱い、最初の1行だけを残して他を削除してしまう。これはローマ数字に限らず、丸数字（①）でも同様の現象が起こる。

```bash
$ sort -u <<EOF
①
②
③
EOF
# ①
```

## 方法１： uniq コマンドを使う

最も安全で確実な方法は、`uniq` コマンドを使うこと。

```bash
sort | uniq
```

sort は順番を比較した結果で重複排除しているのに対して、uniq は「完全に同じ行かどうか」を比較する。

## 方法２： LC\_COLLATE=C を指定する

sort を使いたい場合は、ロケールを `C`（バイト順）に強制することで回避できる。

```bash
LC_COLLATE=C sort -u <<EOF
Ⅰ
Ⅱ
Ⅲ
EOF
# Ⅰ
# Ⅱ
# Ⅲ
```

今回の場合だと、英語でも正常に扱ってくれるので、以下でもよかった。

```bash
$ LC_COLLATE="ja_JP.UTF-8" sort -u <<EOF
①
②
③
EOF
# ①
# ②
# ③
```

これなら文字コード順（バイト列の数値順）で比較されるため、正しく3行出力される。

## 積み残し
ということで、一見整合性のある説明はできた。
できたのだが、なんとなく他のサーバー（サーバーB）で以下のコマンドを打ったら、普通に3行出力されてしまった。

```bash
$ LC_COLLATE="ja_JP.UTF-8" sort -u <<EOF
①
②
③
EOF
# ①
# ②
# ③
```

日本語環境では変な挙動になる、という話だったのに、なぜか普通に動いてしまう。

サーバーの環境情報は以下の通りで、ほとんど同じだった。

```
サーバーA
$ cat /etc/os-release
VERSION="22.04.1 LTS (Jammy Jellyfish)"

$ ldd --version
ldd (Ubuntu GLIBC 2.35-0ubuntu3.11) 2.35

$ sort --version
sort (GNU coreutils) 8.32


サーバーB
$ cat /etc/os-release 
VERSION="22.04.4 LTS (Jammy Jellyfish)"

$ ldd --version
ldd (Ubuntu GLIBC 2.35-0ubuntu3.8) 2.35

$ sort --version
sort (GNU coreutils) 8.32
```

Ubuntu のマイナーバージョンの違いが影響しているのか、あるいは他の何らかの設定が影響しているのかは不明。
まあとりあえず `sort | uniq` を使うのが無難、という結論は変わらないし、`LC_COLLATE=C` を指定すれば挙動が変わったということも事実なので、今回はこれでよしとする。