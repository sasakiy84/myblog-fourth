---
title: 米国・中国・日本のイールドカーブの変遷を動画にした
description: 米国・中国・日本の国債金利の変遷データを取得し、manim でアニメーションにした
published: 2026-05-30
---


# 米国・中国・日本のイールドカーブを manim で動画にした

米国・中国・日本の国債イールドカーブを、同じ日付で重なる部分だけ取り出して動画にした。

まず、3カ国を並べた動画。

<video controls src="/20260530-yield-curve-animation/three-country-yield-curve.mp4" style="width: 100%;"></video>

日本だけの動画も作った。

<video controls src="/20260530-yield-curve-animation/japan-yield-curve.mp4" style="width: 100%;"></video>

使ったコードは[sasakiy84/yield-curve-visualization](https://github.com/sasakiy84/yield-curve-visualization)に置いている。

## 何を作ったか

3カ国の国債イールドカーブを、日付ごとにアニメーションする manim のシーンを作った。
ダウンロード可能なデータの日付の範囲は国ごとに異なるため、3カ国すべてに存在する日付だけを使っている。年限も国ごとに異なるため、3カ国すべてに存在する年限だけを描画している。
結果、日付は `2006-03-01` から `2026-04-30` までの 4471 日分、年限としては `1Y`, `3Y`, `5Y`, `7Y`, `10Y`, `30Y` のイールドカーブを描画している。



## データ取得

### 日本

日本は財務省の「国債金利情報」を使った。

- https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/historical/jgbcme_all.csv
- https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/index.htm


```bash
curl -L 'https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/historical/jgbcme_all.csv' -o jgbcme_all.csv
```


### 米国

米国は U.S. Treasury の Daily Treasury Par Yield Curve Rates を使った。

- https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve
- https://home.treasury.gov/treasury-daily-interest-rate-xml-feed

年ごとに XML を取得できる。たとえば 2026 年分は以下。

```bash
curl -L 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/pages/xml?data=daily_treasury_yield_curve&field_tdr_date_value=2026'  -o us_treasury_2026.xml
```

### 中国

中国は ChinaBond の ChinaBond Government Bond Yield Curve を使った。

- https://yield.chinabond.com.cn/cbweb-pbc-web/pbc/more?locale=en_US

HTML をパースして、`ChinaBond Government Bond Yield Curve` というカーブ名の行だけを抜き取る。
日付範囲は最大で1年分しか取れないため、年ごとに取得して結合する。たとえば 2025 年分は以下。

```bash
curl -L 'https://yield.chinabond.com.cn/cbweb-pbc-web/pbc/historyQuery?startDate=2025-01-01&endDate=2025-12-31&gjqx=0&qxId=hzsylqx&locale=en_US' -o chinabond_2025.html
```

厳密には、3つの国のデータは算出方法が完全に同じではないが、今回の目的は、公開されているイールドカーブの変遷を見れるようにすることなので、許容している。

## まとめ

以上により取得したデータを、manim でアニメーションするシーンに変換して動画にした。
