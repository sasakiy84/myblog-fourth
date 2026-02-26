---
title: 算術平均、幾何平均、調和平均のヒートマップ
description: 算術平均、幾何平均、調和平均の可視化結果とコード
published: 2026-02-26
---


## 算術平均、幾何平均、調和平均のヒートマップ

![平均の比較](./img/20260226-means-heatmap/mean_comparison.svg)

![算術平均](./img/20260226-means-heatmap/arithmetic_mean_heatmap.svg) 

![幾何平均](./img/20260226-means-heatmap/geometric_mean_heatmap.svg) 

![調和平均](./img/20260226-means-heatmap/harmonic_mean_heatmap.svg) 



## コード
```python
"""
算術平均、幾何平均、調和平均の変動を可視化するコード
"""

import altair as alt
import pandas as pd
import numpy as np


def calc_arithmetic_mean(x: float, y: float) -> float:
    return (x + y) / 2


def calc_harmonic_mean(x: float, y: float) -> float:
    if x == 0 or y == 0:
        return 0.0
    return 2 / (1 / x + 1 / y)


def calc_geometric_mean(x: float, y: float) -> float:
    return (x * y) ** 0.5


def create_heatmap(data: pd.DataFrame, title: str) -> alt.Chart:

    x_min, x_max = data["x"].min(), data["x"].max()
    tick_values = np.linspace(x_min, x_max, 11).round(2).tolist()

    chart = (
        alt.Chart(data)
        .mark_rect()
        .encode(
            x=alt.X(
                "x:O",
                title="x",
                sort="ascending",
                axis=alt.Axis(values=tick_values, labelAngle=0),
            ),
            y=alt.Y(
                "y:O", title="y", sort="descending", axis=alt.Axis(values=tick_values)
            ),
            color=alt.Color(
                "mean:Q", title="平均値", scale=alt.Scale(scheme="turbo")
            ),
            tooltip=["x:Q", "y:Q", alt.Tooltip("mean:Q", format=".3f")],
        )
        .properties(title=title, width=400, height=400)
    )
    return chart


def main():
    # x, y を 0.1 刻みで 0 から 1 までの範囲で生成
    x_values = np.arange(0, 101, 1) / 100
    y_values = np.arange(0, 101, 1) / 100

    # 各平均のデータを作成
    arithmetic_data = []
    geometric_data = []
    harmonic_data = []

    for x in x_values:
        for y in y_values:
            arithmetic_data.append({"x": x, "y": y, "mean": calc_arithmetic_mean(x, y)})
            geometric_data.append({"x": x, "y": y, "mean": calc_geometric_mean(x, y)})
            harmonic_data.append({"x": x, "y": y, "mean": calc_harmonic_mean(x, y)})

    # DataFrameに変換
    arithmetic_df = pd.DataFrame(arithmetic_data)
    geometric_df = pd.DataFrame(geometric_data)
    harmonic_df = pd.DataFrame(harmonic_data)

    # ヒートマップを作成
    arithmetic_chart = create_heatmap(arithmetic_df, "算術平均 (Arithmetic Mean)")
    geometric_chart = create_heatmap(geometric_df, "幾何平均 (Geometric Mean)")
    harmonic_chart = create_heatmap(harmonic_df, "調和平均 (Harmonic Mean)")

    # 3つのグラフを横に並べる
    combined_chart = alt.hconcat(
        arithmetic_chart, geometric_chart, harmonic_chart
    ).resolve_scale(color="shared")

    # 表示または保存
    combined_chart.save("mean_comparison.svg")
    print("グラフを mean_comparison.svg に保存しました")

    # 個別のグラフも保存する
    arithmetic_chart.save("arithmetic_mean_heatmap.svg")
    geometric_chart.save("geometric_mean_heatmap.svg")
    harmonic_chart.save("harmonic_mean_heatmap.svg")


if __name__ == "__main__":
    main()
```