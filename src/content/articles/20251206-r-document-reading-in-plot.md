---
title: ドキュメントを読むにもある程度の知識が必要
description: R の plot 関数の type 引数の挙動を調べるときに、ドキュメントを辿っていくのは初心者には難しそう。LLM の利用を推奨することと公式説明の読み込みを推奨することのバランスは教える側としては悩ましいところ
published: 2025-12-06
tags:
  - Rlang
---

これは、[TSG Advent Calendar 2025](https://adventar.org/calendars/12405) の 6 日目の記事です。

---

## 公式ドキュメントを読むことは大事だが、難しいのでは

公式ドキュメントの方を先に確認するのはよい考えだと思います。ソフトウェアの場合は、バージョンや環境（OSなど）によって挙動に差があることがあるので、手元の環境から直接的に辿れるドキュメントがある場合は、そちらを参照したほうが速い可能性があります。
ただ、R の ? （ヘルプ機能）も、歩き方をわかっていないと必要な情報が見つけられないことがあるので、少し難しいところです。


## plot 関数の type 引数の説明を調べる場合
たとえば、plot 関数を table オブジェクトに適用したときの type 引数の h の意味と、
type 引数のデフォルト値を確認したいとします。

### ?plot から始める

まず、?plot をすると二つの選択肢が出てきます。

```
?plot

トピック ‘plot’ に対するヘルプが以下のパッケージ中にありました:

  Package               Library
  graphics              /Library/Frameworks/R.framework/Versions/4.5-arm64/Resources/library
  base                  /Library/Frameworks/R.framework/Resources/library

一つ選んでください 

1: The Default Scatterplot Function {graphics}
2: Generic X-Y Plotting {base}
```

graphics, base の二つのパッケージが plot を提供していると出てきます。そこで、plot 関数がどちらのパッケージに属しているかを確認するために、一度コンソールで plot と打ちます。

```
> plot
<environment: namespace:base>
```

`namespace:base` という文字列を確認して base を選び、type の引数の説明を確認します。h の意味はここで確認できます。

> what type of plot should be drawn. Possible types are
> - "p" for points,
> - "l" for lines,
> - "b" for both,
> - "c" for the lines part alone of "b",
> - "o" for both ‘overplotted’,
> - "h" for ‘histogram’ like (or ‘high-density’) vertical lines,
> - "s" for stair steps,
> - "S" for other steps, see ‘Details’ below,
> - "n" for no plotting.
> All other types give a warning or an error; using, e.g., type = "punkte" being equivalent to type = "p" for S compatibility. Note that some methods, e.g. plot.factor, do not accept this.


しかし、デフォルトの値を確認しようとしたりすると、現在見ている引数の説明箇所には書かれていないので、さらに数ステップを踏む必要があります。


### デフォルト値を確認する
他に情報がないかと思って、前書きや後書きに目を通します。すると、前書きに以下のように書いてあります。

> Description
> For simple scatter plots, plot.default will be used. However, there are plot methods for many R objects, including functions, data.frames, density objects, etc. Use methods(plot) and the documentation for these. Most of these methods are implemented using traditional graphics (the graphics package), but this is not mandatory.


`Use methods(plot)` とあるので、methods 関数で plot のメソッドを確認します。ここも、GenericFunction を知らないと難しいかもしれません。

```
> methods(plot)
 [1] plot.acf*             plot.data.frame*      plot.decomposed.ts*   plot.default         
 [5] plot.dendrogram*      plot.density*         plot.ecdf             plot.factor*         
 [9] plot.formula*         plot.function         plot.ggplot2::ggplot* plot.gtable*         
[13] plot.hclust*          plot.histogram*       plot.HoltWinters*     plot.isoreg*         
[17] plot.lm*              plot.medpolish*       plot.mlm*             plot.pal_continuous* 
[21] plot.pal_discrete*    plot.ppr*             plot.prcomp*          plot.princomp*       
[25] plot.profile*         plot.profile.nls*     plot.R6*              plot.raster*         
[29] plot.shingle*         plot.spec*            plot.stepfun          plot.stl*            
[33] plot.table*           plot.transform*       plot.trellis*         plot.ts              
[37] plot.tskernel*        plot.TukeyHSD*   
```

ここで、table があるのを確認して `?plot.table` を実行すると、以下のような説明が出てきます。

> This is a method of the generic plot function for (contingency) table objects. Whereas for two- and more dimensional tables, a mosaicplot is drawn, one-dimensional ones are plotted as bars.
> 
> Usage
> \#\# S3 method for class 'table'
> plot(x, type = "h", ylim = c(0, max(x)), lwd = 2,
     xlab = NULL, ylab = NULL, frame.plot = is.num, ...)

ここで、table オブジェクトに対する plot メソッドのデフォルト値が type = "h" であることがわかります。

## 一言
これは、ティーチングアシスタントをしているときに type 引数についての LLM のハルシネーションをもとにした質問をうけたときに調べた内容です。
このように、公式説明を辿るのもいろいろと難しいので、LLM の利用を推奨することと公式説明の読み込みを推奨することのバランスは教える側としては悩むところです。

## 余談
わかっていれば、コードをみるのが一番楽かもしれません。


```
> plot
function (x, y, ...) 
UseMethod("plot")
<bytecode: 0x12712fb18>
<environment: namespace:base>
```

でコードを確認し、`UseMethod("plot")` から GenericFunction であることがわかります。
そこで、`methods(plot)` でメソッド一覧を確認し、`graphics:::plot.table` でコードをみると、デフォルト引数がわかります。
ただ、graphics の名前空間に plot.table があることを知らないと、?plot.table を経由しなきゃいけないので微妙ですね。