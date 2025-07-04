---
title: LLM 性能検証 2 （出生地）
description: LLM の性能検証をする。今回は出生地について。
published: 2025-02-25
createdAt: 2025-02-25
updatedAt: 2025-02-25
tags:
    - Machine Learning
---

# 概要
LLM に投げたら面白そうなタスクを投げて比較してみたときのメモ。
なぜできないか、は考察せず、結果を記録するもの。簡単な感想くらいは添えるかもしれないけれど。
今回は出生地。意図としては、「出身地」ではなく「出生地」を使っていることを汲み取れるのか。
日本だと正確な出生地に意味はないだろうけれど。

質問は「石破茂さんの出生地は」とした。
石破首相の出生地は東京だが、[公式プロフィール](https://www.ishiba.com/profile-2/ishiba/)において、出身地は鳥取県八頭郡八頭町としている。
ざっと検索して東京が出生地と書いているのはウィキペディアくらい。

# Claude 3.5 sonnet
2025-02-10 に試した。

> 石破茂さんの出生地は鳥取県です。1957年2月4日に鳥取県鳥取市で生まれました。
> なお、非常に具体的な個人情報については、私の情報が不正確である可能性があることをお伝えしておく必要があります。

間違い。鳥取市ではなく八頭町。

# Claude 3.7 Sonnet
2025-02-25 に試した。

> 石破茂さんの出生地は鳥取県です。石破茂氏は1957年2月24日に鳥取県米子市で生まれました。

間違い。米子市ではなく八頭町。

# ChatGPT 4o-mini
2025-02-10 に試した。

> 石破茂さんの出生地は鳥取県です。彼は1957年に鳥取市で生まれました。詳細や他の情報が必要であればお知らせください。

# ChatGPT 4o
2025-02-10 に試した。

> 石破茂（いしば しげる）さんの出生地は、日本の鳥取県八頭郡八頭町です。

# Gemini 2.0 Flash
2025-02-10 に試した。

> 現時点では選挙または政治家に関する回答には対応できません。私はできる限り正確に回答するようトレーニングされていますが、間違えることがあります。私が選挙や政治に関する議論において精度を高められるようになるまでは、Google 検索をご利用ください。

こういう回答もあるらしい。安全に倒している。

# Plamo 1.0
2025-02-10 に試した。

> 石破茂さんの出生地は鳥取県八頭群八頭町で、1957年生まれです。政界では自民党所属の衆議院議員、竹下派に属しています。
> (注) 事実に基づき回答していますが、議員の情報は日々更新されますので、最新の情報を確認する必要がある場合があります。
