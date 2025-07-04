---
title: セキュリティキャンプ2022の参加レポート
description: セキュリティキャンプ2022 の Web セキュリティクラスに参加しました。来年度以降応募する人がどのような雰囲気か知ることができるように、各講義の感想などをまとめておきます。
published: 2022-08-12
createdAt: 2022-08-12
updatedAt: 2022-09-24
tags:
  - EventReport
  - Security
---
# セキュリティキャンプ2022の参加レポート
## 概要
セキュリティキャンプ2022 の Web セキュリティクラスに参加しました。参加の経緯や選考課題の解答については、以下を参照してください。

[https://blog.sasakiy84.net/articles/seccamp2022-pre](https://blog.sasakiy84.net/articles/seccamp2022-pre)

私が参加した Webセキュリティクラスは、名前のとおり Web に関する技術・セキュリティを中心に学んでいくクラスです。昨今のクラウド化や、DevOps などの流れを反映した、最新の情勢に見合った講義でした。

## 講義の感想
それぞれの講義について、概要や公開されている資料、受講した感想などをまとめていきます。なお、講義概要や感想は、私がまとめたものであり、内容に不備があるかもしれません。

### 作って学ぶ、Webブラウザ
#### 講義概要
講師の方：
[https://twitter.com/d0iasm](https://twitter.com/d0iasm)
公開資料：
[https://twitter.com/d0iasm/status/1558001603164000257](https://twitter.com/d0iasm/status/1558001603164000257)

Web ブラウザを RFC や　HTML Living Standard などの仕様書を読み込みながら自作する講義でした。
ブラウザは、Web セキュリティの文脈で一定の役割を果たしていますが、普段開発するときに、それを意識することは少ないです。むしろ、どうしてこの API にこんな制約があるのかと、不満になることもあります。
だけど、API が制約されている理由が当然あり、その理由を知ることでより深い理解につながります。また、具体的にどのような仕様が定められているのかを知るために、仕様書やコードを読み込む第一歩を踏み出せるような講義でした。

#### 感想
感想としては、具体的にコードと格闘することで、自分のなかでブラウザをセキュリティの文脈のなかに位置づけることができました。また、調べるときに仕様書まで見に行く選択がとれるようになりました。
Google が chrome というクロスプラットフォームの大規模なコード群とどのように向き合っているのかを、講師の方から聞けたのも面白かったです。例えば、24時間交代で Chromium のコードビルドを監視する Sheriff という制度があるらしいです。

今まで、HTML をトークン化してパースして… というような処理の流れの概要は知っていました。ただ、実際に処理を行うコードを見るとやはり概要をなぞるだけでは出てこなかった部分も多く、reconsume など文字列を処理していく上での実践的な知識を得られました。
また、自作の最低限の実装と HTML Liiving Standard に定義されている手順を比べることで、現実世界で使われているソフトウェアの苦労をうかがうことができました。


### マイクロサービス/分散モノリス的アーキテクチャへの攻撃手法
#### 講義概要
講師の方：
[https://twitter.com/no1zy_sec](https://twitter.com/no1zy_sec)
[https://twitter.com/tyage](https://twitter.com/tyage)
公開資料：
[https://twitter.com/tyage/status/1565530410532016128](https://twitter.com/tyage/status/1565530410532016128)

近年話題のマイクロサービスだからこそ成立してしまう攻撃手法を紹介する講義です。
モノリシックなサービスでは問題にならなかった部分が、ほかのサービスと組み合わさるとどのように問題になるのかを学びました。具体的には、仕様が定まっていないような曖昧な部分についての処理がサービスごとに異なるときに、うまくバリデーションが機能しないなどの問題が発生してしまう場合があるなどです。

#### 感想

ハンズオンを積極的にやっていく講義で、なかなかついていくのが大変でした。マイクロサービスをさわったことがなく、なんとなくよさげらしいというイメージを抱いていました。それゆえ、適当に試してみるか、と気軽に考えていましたが、この講義でマイクロサービスに特有のリスクを知ることができたのはよかったです。ハンズオンの質も高く、とりあえず実行して終わりではなく、具体的なコードまで追って解説をしてもらいました。
おそらく、脆弱性になりうるコードのなかには、仕様に定義されていない部分を各ライブラリが独自に解釈して実装したコードもあるのだと思います。それらのコードは、仕様に違反していないので単体ではバグとも言い難いです。それらの挙動を一つずつ把握して、組み合わせの妙を考えるのはとても大変だと思うし、修正するときにどちらに合わせればいいのか、という問題もあります。難しい。

### Policy as Code入門
#### 講義概要
講師の方：
[https://twitter.com/m_mizutani](https://twitter.com/m_mizutani)
公開資料：
[https://twitter.com/m_mizutani/status/1573830895664267264](https://twitter.com/m_mizutani/status/1573830895664267264)
参考資料：講師の方が書いた、講義と類似した題材の記事
[https://zenn.dev/mizutani/books/d2f1440cfbba94 ](https://zenn.dev/mizutani/books/d2f1440cfbba94 )

Policy as Code と呼ばれる概念と、その実装の一つである OPA/Rego のハンズオンです。
Infrastructure as Code の浸透で、サーバーやクラウドリソースの構成などをコードとして表現することができるようになりました。それらのコードのセキュリティ設定などが、組織で定められているポリシーに沿っているかを自動でテストできるよね、という話です。


#### 感想
ポリシーをコードで表現してテストできるのはいいよね、という話はすんなりと理解できました。そのあとの、実用されているツールなどを少し使ってみるというところまでを、詳しい人がいる場所でできたのがよかったです。
ハンズオンでは、繰り返し処理を含めた AWS のリソースチェックまでをやりました。
OPA/Rego をさわった感想としては、ハンズオンでやった範囲では、簡潔にかけるわかりやすい言語でした。個人的には、ポリシーとロジックの記述を別の言語に分けることで、ポリシーを管理する人がポリシーについてのコードを書きやすくなるという話に共感しました。

### モダンな開発環境のセキュリティおよびCI/CDパイプラインのセキュア化
#### 講義概要
講師の方：
[https://twitter.com/rung](https://twitter.com/rung)
公開資料：
[https://twitter.com/rung/status/1557989360196149248](https://twitter.com/rung/status/1557989360196149248)
講師の方の後日談：
[https://mercan.mercari.com/articles/35782/](https://mercan.mercari.com/articles/35782/)

開発マシンや、最近の開発環境として欠かせない CI/CD のパイプラインへの攻撃手法や対策手法を学びました。
ネット上に公開されるアプリケーションだけでなく、開発環境や CI/CD 環境も攻撃パスの一部です。どちらにも重要なクレデンシャルなどが保存されることが多いです。講義では、それぞれの環境にどのようなクレデンシャルが保存されているかや、実際にどのようにクレデンシャルを抜き出すことができるか、などをハンズオンで試しました。

#### 感想
開発者が生成するコードではなく、コードを生成する過程への攻撃という視点の重要性を学びました。
また、その攻撃パスの整理を、MITRE などのフレームワークに落とし込みながら説明してもらえたので、全体像や攻撃されたあとの状況を想像しやすかったです。
具体と抽象の割合がちょうどよかったので、危険性をうまく実感できたように思います。たとえば、開発者端末を守る重要性を学んだあとに、localstorage やブラウザの自動入力パスワードがどのように抜けるかをハンズオンするなどです。あるいは、CI/CD の危険性を実際に攻撃に使われたコードを見ながら説明してもらえたりなどです。


### 実践 Linux コンテナ実行基盤セキュリティ
#### 講義概要
講師の方：
[https://twitter.com/mrtc0](https://twitter.com/mrtc0)
公開資料：
[https://github.com/mrtc0/seccamp-2022](https://github.com/mrtc0/seccamp-2022)

コンテナ・オーケストレーション技術に関係するセキュリティのリスクを、コンテナが動く原理を理解しながら学びました。
コンテナのセキュリティ対策が不十分だと、分離されているはずのホストへ侵入されてしまったり、クラスタのアクセス権限を奪取されてしまいます。それらのリスクと設定項目がどのように対応しているかを、コンテナがどのような原理でホストと隔離されるのかを確認しながら学びました。ハンズオンでは、簡単なコンテナをシェルスクリプトで作ってみることや、実際にコンテナに攻撃を行ってみるなどをしました。

#### 感想
資料がとても充実した講義でした。充実しすぎて、とくにオーケストレーションツールのほうはまだ全然理解できていないです。
コンテナ技術を学ぶというと、設定ファイルの書き方の情報などが多く出てきてしまうため、動作原理から丁寧に学ぶことができたのがとてもよかったです。
今まで不思議技術として使っていたコンテナの気持ちが少し理解できるようになった気がします。
ただ、講義全体で学ぶことの半分も理解できていないと思うので、これから大充実の資料を読み込んでいきたいです。

### ソフトウェアサプライチェーンセキュリティのこれから
#### 講義概要
講師の方：
[https://twitter.com/lmt_swallow](https://twitter.com/lmt_swallow)
公開資料：
[https://github.com/supply-chain-security-book/supply-chain-security-book.github.io](https://github.com/supply-chain-security-book/supply-chain-security-book.github.io)
講師の方の後日談：
[https://diary.shift-js.info/seccamp2022/](https://diary.shift-js.info/seccamp2022/)

ソフトウェアサプライチェーンにかかわる登場人物を整理し、とくに開発者がコードを生成する段階で使えるツールチェインを試しました。
最近の開発環境では OSS を使うことが普通です。しかし、その OSS に悪意のあるコードが紛れ込んでいないかを検証するのはなかなか難しいです。
対策の一つとして、コードやイメージへの署名があるが、鍵の管理などのコストが高く、OSS 開発者が気軽に使えるような状況ではありません。
このような状況の中、sigstore という、署名や署名の検証を気軽に行えるようにするプロジェクトが注目されています。
講義では、それらのツールのハンズオンを行い、どのように署名ができるのか、どのような検証項目があるのかなどを確認しました。

#### 感想
この講義では、「セキュアにするために環境を整えよう」という考え方を、実際のプロジェクトをさわりながら学べたのがよかったです。今まで私は、「セキュアにするために個人のレベルをあげる」という視点が先行していたため、この講義でセキュリティを社会全体の問題として捉えなおすことができたと思います。
「社会全体の問題として捉えなおす」というのは、個々の脆弱性情報やツール情報を、社会的課題とその対応の文脈に位置づけるように解釈するという意味です。このことは「環境を整えよう」という視点に表れていると思います。
個々の脆弱性の情報だけを見ると、各開発者がその脆弱性を踏まないようにしましょうという話になります。
しかし、社会全体としてみたときに、開発者全員に同じような挙動を期待するのは無理筋だ、と考えることが「社会全体の問題として位置づけられる」ということだと思います。
そして、「ツールを使って求められるレベルを下げて、仕組みとして回せるようにする」という方向性を実際に実装に落とし込もうとしている sigstore のプロジェクトをさわって、現実味を帯びたかたちで捉えることができました。
ただ、署名関係には今まで全くさわってこなかったこともあり、ハンズオンで試した機能がどのような論理で成り立っているのかがほとんど理解できていません。時間をかけてじっくりと学んでいきたいと思います。

### まとめ
さまざまなレイヤの講義があり、それぞれの実践的な知識を得ることができました。また、web セキュリティを学んでいくうえで、多くの足掛かりをつくることができました。
存在すら知らないものは学ぶことはできないので、足掛かりを作れたのはとてもありがたいことです。
その観点からいうと、「作って学ぶ、Webブラウザ」では、ブラウザというセキュリティの文脈の登場人物の存在を知れましたし、「ソフトウェアサプライチェーンセキュリティのこれから」では、開発者コミュニティという登場人物を知れました。
また、「マイクロサービス/分散モノリス的アーキテクチャへの攻撃手法」や「モダンな開発環境のセキュリティおよびCI/CDパイプラインのセキュア化」、「実践 Linux コンテナ実行基盤セキュリティ」では、具体的な攻撃手法を学ぶことで、「Policy as Code入門」では継続的にポリシーをチェックすることができるツールを扱うことで、それぞれの世界の解像度を上げることができました。
資料を作って講義をしてくださった講師の方々と、セキュキャンを成立させてくださっているすべての方々、ありがとうございました。

## その他の感想
余談というか、雑多な感想です。
オンラインの開催となり、コミュニケーションツールは主に discord だったのだが、参加者の非同期的なコミュニケーションの上手さが際立っていて、オンラインでも普通に盛り上がることができました。
また、協賛品グッズなども豪華だったし、参考資料として技術書をいただけたのもありがたかったです。

## ほかの方のブログ
[https://diary.shift-js.info/seccamp2022/](https://diary.shift-js.info/seccamp2022/)
[https://qiita.com/Hiyoko1213/items/a2828e36a2c7d3a40aee](https://qiita.com/Hiyoko1213/items/a2828e36a2c7d3a40aee)
[https://speed1313.notion.site/2022-B-Web-16620482e78d43599867acaf1b3e1020](https://speed1313.notion.site/2022-B-Web-16620482e78d43599867acaf1b3e1020#34ca28722cbc458a8cb8f6936a7d9629)
