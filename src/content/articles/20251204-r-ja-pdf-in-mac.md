---
title: R で lattice パッケージを使って日本語を埋め込んだPDFの画像を作成する方法（Mac）
description: Mac で R を使って日本語を埋め込んだPDFの画像を作成する方法について、failed to load cairo DLL というエラーが出た場合の対応手順を説明
published: 2025-12-04
---


Mac で  failed to load cairo DLL というメッセージが出て、R で日本語を埋め込んだPDFの画像を作成できない場合がある。

# 対応手順
1. https://www.xquartz.org/ の XQuartz-XXX.pkg をダウンロード（バージョン番号はなんでもいいはず）して、ダウンロードした pkg をダブルクリックしてソフトウェアをインストールする
2. （念のため PC を再起動する。必要ない可能性が高いので、一旦この手順は飛ばしても大丈夫）
3. 以下の手順を、RStudio で一行ずつ実行してみる

```R
cairo_pdf("test.pdf", width = 6, height = 4)
qqmath(data, xlab = "日本語ラベル", ylab = "日本語ラベル") # グラフを描画する
dev.off() # test.pdf が生成されており、中身が存在することを確認する
```

なお、RStudio 上で表示しているグラフが文字化けする場合は、以下を実行してからグラフを表示してみる。
```R
install.packages("ragg") 
library(ragg) # RStudio の設定を変更しておく。左上のメニューバーで Edit > Preferences > General > Graphics > Graphics Device > backend が AGG になっていることを確認する（日本語設定だと違うかも）。設定を変更したときは、RStudio を再起動する、これは RStudio でグラフを見るときに、日本語が文字化けしないようにするための設定
```


# やっていることの説明
cairo_pdf では、裏側で X11 という表示を管理するためのシステムを使っている。（?cairo_pdf をすると、In principle these devices are independent of X11 (as is seen by their presence on Windows). But on a Unix-alike the cairo libraries may be distributed as part of the X11 system and hence that (for example, on macOS, XQuartz) may need to be installed. と末尾の note に書かれている。）

Mac のバージョンによっては、このシステムがデフォルトではインストールされていないよう。（cf. https://support.apple.com/ja-jp/100724）
それを解決するために XQuartz プロジェクトというものがあり、それが提供しているソフトウェアをインストールしてもらうということ。

# 補足
奥村先生の [Rの初歩](https://okumuralab.org/~okumura/stat/first.html) に、以下の記述がある。

> MacではOSの機能（Quartz）を使ってコマンドでPDF出力することもできます。Macではこちらが推奨です。
> ```R
> quartz(type="pdf", width=7, height=5, file="hoge.pdf")
> par(mgp=c(2, 0.8, 0))
> curve(dnorm(x), -3, 3, lwd=2, family="Helvetica")
> title(main="正規分布", family="HiraginoSans-W3", font.main=1)
> dev.off()
> ```

実際、このコマンドの通りにやれば PDF に日本語を埋め込むことができたが、lattice の qqplot を描画しようとすると日本語が豆腐になってしまい、うまくいかなかった。
試したコマンドは以下。

```R
library(lattice)
data <- rnorm(100)
quartz(type="pdf", width=7, height=5, file="hoge.pdf")
qqmath(data, xlab = "日本語ラベル(Quartz)", ylab = "分位点", par.settings = list(
    axis.text = list(fontfamily = "serif"),      # 軸の数字 (目盛)
    par.xlab.text = list(fontfamily = "serif"),  # X軸ラベル
    par.ylab.text = list(fontfamily = "serif"),  # Y軸ラベル
    par.main.text = list(fontfamily = "serif")   # タイトル
))
dev.off()
```

なお、環境情報は以下の通り。
```
version
               _                           
platform       aarch64-apple-darwin20      
arch           aarch64                     
os             darwin20                    
system         aarch64, darwin20           
status                                     
major          4                           
minor          5.1                         
year           2025                        
month          06                          
day            13                          
svn rev        88306                       
language       R                           
version.string R version 4.5.1 (2025-06-13)
nickname       Great Square Root   
```
