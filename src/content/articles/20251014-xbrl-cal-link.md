---
title: XBRL の計算リンクを用いた財務諸表データの収集
description: 計算リンクを使って各企業の財務諸表の勘定項目の木構造を取得する方法を丁寧に解説。
published: 2025-10-14
---


# ルート要素を列挙する方法

XBRL の財務諸表のルートコンセプトの要素IDを取得する方法。

以下の「02 . 財務諸表本表」、「03 . 国際会計基準」から「2025年版EDINETタクソノミ（2025年3月31日以後に終了する事業年度に係る有価証券報告書等から適用）」をダウンロードして、財務諸表のロールURLを手動でリスト化した。

[EDINETタクソノミ及びコードリストダウンロード](https://disclosure2.edinet-fsa.go.jp/weee0010.aspx)

ファイルを開くと、taxonomy -> jppfs -> 2017-02-28 -> jppfs_rt_2017-02-28.xsd のようなファイルがあり、そこに以下のような形式で書かれている。

```xml
<link:roleType roleURI="http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_BalanceSheet" id="rol_BalanceSheet">
  <link:definition>貸借対照表</link:definition>
  <link:usedOn>link:presentationLink</link:usedOn>
  <link:usedOn>link:calculationLink</link:usedOn>
  <link:usedOn>link:definitionLink</link:usedOn>
  <link:usedOn>link:footnoteLink</link:usedOn>
</link:roleType>
```

2025 年度のタクソノミを確認して、列挙したものが以下。

```python
BS_ROLE_TYPE_JP = [
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_BalanceSheet",  # 310040 貸借対照表
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_BalanceSheet",  # 310040 貸借対照表
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_SemiAnnualBalanceSheet",  # 310050 第二種中間貸借対照表
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_SemiAnnualBalanceSheet",  # 310050 第二種中間貸借対照表
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_Type1SemiAnnualBalanceSheet",  # 310051 第一種中間貸借対照表
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_Type1SemiAnnualBalanceSheet",  # 310051 第一種中間貸借対照表
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_QuarterlyBalanceSheet",  # 310060 四半期貸借対照表（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_QuarterlyBalanceSheet",  # 310060 四半期貸借対照表（2025年版で廃止）
]
CONSOLIDATED_BS_ROLE_TYPE_JP = [
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_ConsolidatedBalanceSheet",  # 310010 連結貸借対照表
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_ConsolidatedBalanceSheet",  # 310010 連結貸借対照表
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_SemiAnnualConsolidatedBalanceSheet",  # 310020 第二種中間連結貸借対照表
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_SemiAnnualConsolidatedBalanceSheet",  # 310020 第二種中間連結貸借対照表
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_Type1SemiAnnualConsolidatedBalanceSheet",  # 310021 第一種中間連結貸借対照
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_QuarterlyConsolidatedBalanceSheet",  # 310030 四半期連結貸借対照表（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_QuarterlyConsolidatedBalanceSheet",  # 310030 四半期連結貸借対照表（2025年版で廃止）
]
PL_ROLE_TYPE_JP = [
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_StatementOfIncome",  # 321040 損益計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_StatementOfIncome",  # 321040 損益計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_SemiAnnualStatementOfIncome",  # 321050 第二種中間損益計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_SemiAnnualStatementOfIncome",  # 321050 第二種中間損益計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_Type1SemiAnnualStatementOfIncome",  # 321051 第一種中間損益計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_Type1SemiAnnualStatementOfIncome",  # 321051 第一種中間損益計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_YearToQuarterEndStatementOfIncome",  # 321061 四半期損益計算書　四半期累計期間（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_YearToQuarterEndStatementOfIncome",  # 321061 四半期損益計算書　四半期累計期間（2025年版で廃止）
]
CONSOLIDATED_PL_ROLE_TYPE_JP = [
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_ConsolidatedStatementOfIncome",  # 321010 連結損益（及び包括利益）計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_ConsolidatedStatementOfIncome",  # 321010 連結損益（及び包括利益）計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_SemiAnnualConsolidatedStatementOfIncome",  # 321020 第二種中間連結損益（及び包括利益）計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_SemiAnnualConsolidatedStatementOfIncome",  # 321020 第二種中間連結損益（及び包括利益）計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_Type1SemiAnnualConsolidatedStatementOfIncome",  # 321021 第一種中間連結損益（及び包括利益）計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_Type1SemiAnnualConsolidatedStatementOfIncome",  # 321021 第一種中間連結損益（及び包括利益）計算書
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_YearToQuarterEndConsolidatedStatementOfIncome",  # 321031 四半期連結損益（及び包括利益）計算書　四半期連結累計期間（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_YearToQuarterEndConsolidatedStatementOfIncome",  # 321032 四半期連結損益（及び包括利益）計算書　四半期連結会計期間（2025年版で廃止）\
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_QuarterPeriodConsolidatedStatementOfIncome",  # 321032 四半期連結損益（及び包括利益）計算書　四半期連結会計期間（2025年版で廃止）
]
CF_ROLE_TYPE_JP = [
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_StatementOfCashFlows-direct",  # 341040 キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_StatementOfCashFlows-direct",  # 341040 キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_SemiAnnualStatementOfCashFlows-direct",  # 341050 第二種中間キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_SemiAnnualStatementOfCashFlows-direct",  # 341050 第二種中間キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_Type1SemiAnnualStatementOfCashFlows-direct",  # 341051 第一種中間キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_Type1SemiAnnualStatementOfCashFlows-direct",  # 341051 第一種中間キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_QuarterlyStatementOfCashFlows-direct",  # 341060 四半期キャッシュ・フロー計算書　直接法（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_QuarterlyStatementOfCashFlows-direct",  # 341060 四半期キャッシュ・フロー計算書　直接法（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_StatementOfCashFlows-indirect",  # 342040 キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_StatementOfCashFlows-indirect",  # 342040 キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_SemiAnnualStatementOfCashFlows-indirect",  # 342050 第二種中間キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_SemiAnnualStatementOfCashFlows-indirect",  # 342050 第二種中間キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_Type1SemiAnnualStatementOfCashFlows-indirect",  # 342051 第一種中間キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_Type1SemiAnnualStatementOfCashFlows-indirect",  # 342051 第一種中間キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_QuarterlyStatementOfCashFlows-indirect",  # 342060 四半期キャッシュ・フロー計算書　間接法（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_QuarterlyStatementOfCashFlows-indirect",  # 342060 四半期キャッシュ・フロー計算書　間接法（2025年版で廃止）
]
CONSOLIDATED_CF_ROLE_TYPE_JP = [
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_ConsolidatedStatementOfCashFlows-direct",  # 341010 連結キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_ConsolidatedStatementOfCashFlows-direct",  # 341010 連結キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_SemiAnnualConsolidatedStatementOfCashFlows-direct",  # 341020 第二種中間連結キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_SemiAnnualConsolidatedStatementOfCashFlows-direct",  # 341020 第二種中間連結キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_Type1SemiAnnualConsolidatedStatementOfCashFlows-direct",  # 341021 第一種中間連結キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_Type1SemiAnnualConsolidatedStatementOfCashFlows-direct",  # 341021 第一種中間連結キャッシュ・フロー計算書　直接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_QuarterlyConsolidatedStatementOfCashFlows-direct",  # 341030 四半期連結キャッシュ・フロー計算書　直接法（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_QuarterlyConsolidatedStatementOfCashFlows-direct",  # 341030 四半期連結キャッシュ・フロー計算書　直接法（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_ConsolidatedStatementOfCashFlows-indirect",  # 342010 連結キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_ConsolidatedStatementOfCashFlows-indirect",  # 342010 連結キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_SemiAnnualConsolidatedStatementOfCashFlows-indirect",  # 342020 第二種中間連結キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_SemiAnnualConsolidatedStatementOfCashFlows-indirect",  # 342020 第二種中間連結キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_Type1SemiAnnualConsolidatedStatementOfCashFlows-indirect",  # 342021 第一種中間連結キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_Type1SemiAnnualConsolidatedStatementOfCashFlows-indirect",  # 342021 第一種中間連結キャッシュ・フロー計算書　間接法
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_QuarterlyConsolidatedStatementOfCashFlows-indirect",  # 342030 四半期連結キャッシュ・フロー計算書　間接法（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_std_QuarterlyConsolidatedStatementOfCashFlows-indirect",  # 342030 四半期連結キャッシュ・フロー計算書　間接法（2025年版で廃止）
]

BS_ROLE_TYPE_IFRS = [
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_StatementOfFinancialPositionIFRS",  # 513040 財政状態計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedSemiAnnualStatementOfFinancialPositionIFRS",  # 513050 要約中間財政状態計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedQuarterlyStatementOfFinancialPositionIFRS",  # 513060 要約四半期財政状態計算書（IFRS）（2025年版で廃止）
]
CONSOLIDATED_BS_ROLE_TYPE_IFRS = [
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_ConsolidatedStatementOfFinancialPositionIFRS",  # 513010 連結財政状態計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_std_ConsolidatedStatementOfFinancialPositionIFRS",  # 513010 連結財政状態計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedSemiAnnualConsolidatedStatementOfFinancialPositionIFRS",  # 513020 要約中間連結財政状態計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedQuarterlyConsolidatedStatementOfFinancialPositionIFRS",  # 513030 要約四半期連結財政状態計算書（IFRS）（2025年版で廃止）
]

PL_ROLE_TYPE_IFRS = [
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_StatementOfProfitOrLossIFRS",  # 521040 損益計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedSemiAnnualStatementOfProfitOrLossIFRS",  # 521050 要約中間損益計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedYearToQuarterEndStatementOfProfitOrLossIFRS",  # 521061 要約四半期損益計算書（IFRS）四半期累計期間（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedQuarterPeriodStatementOfProfitOrLossIFRS",  # 521062 要約四半期損益計算書（IFRS）四半期会計期間（2025年版で廃止）
]
CONSOLIDATED_PL_ROLE_TYPE_IFRS = [
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_ConsolidatedStatementOfProfitOrLossIFRS",  # 521010 連結損益計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedSemiAnnualConsolidatedStatementOfProfitOrLossIFRS",  # 521020 要約中間連結損益計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedYearToQuarterEndConsolidatedStatementOfProfitOrLossIFRS",  # 521031 要約四半期連結損益計算書（IFRS）四半期累計期間（2025年版で廃止）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedQuarterPeriodConsolidatedStatementOfProfitOrLossIFRS",  # 521032 要約四半期連結損益計算書（IFRS）四半期会計期間（2025年版で廃止）
]
CF_ROLE_TYPE_IFRS = [
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_StatementOfCashFlowsIFRS",  # 540040 キャッシュ・フロー計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedSemiAnnualStatementOfCashFlowsIFRS",  # 540050 要約中間キャッシュ・フロー計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedQuarterlyStatementOfCashFlowsIFRS",  # 540060 要約四半期キャッシュ・フロー計算書（IFRS）（2025年版で廃止）
]
CONSOLIDATED_CF_ROLE_TYPE_IFRS = [
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_ConsolidatedStatementOfCashFlowsIFRS",  # 540010 連結キャッシュ・フロー計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_std_ConsolidatedStatementOfCashFlowsIFRS",  # 540010 連結キャッシュ・フロー計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedSemiAnnualConsolidatedStatementOfCashFlowsIFRS",  # 540020 要約中間連結キャッシュ・フロー計算書（IFRS）
    "http://disclosure.edinet-fsa.go.jp/role/jpigp/rol_CondensedQuarterlyConsolidatedStatementOfCashFlowsIFRS",  # 540030 要約四半期連結キャッシュ・フロー計算書（IFRS）（2025年版で廃止）
]
```


# cal ファイルを見つける

ダウンロードした XBRL ファイルを解凍すると、PublicDoc フォルダの中に、jpcrp030000-asr-001_E04430-000_2023-03-31_01_2023-06-23_cal.xml のような末尾に _cal.xml がつくファイルがある。
これが、その有価証券報告書に含まれる計算リンクを定義したファイルである。

# cal ファイルから木構造を抽出する


たとえば、日本電信電話株式会社（E04430）の2022-04-01 ～ 2023-03-31の非連結貸借対照表（JP GAAP）の計算リンクは以下のようになる。



```xml
<link:calculationLink xlink:type="extended" xlink:role="http://disclosure.edinet-fsa.go.jp/role/jppfs/rol_BalanceSheet">
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_Assets" xlink:label="Assets" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CurrentAssets" xlink:label="CurrentAssets_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="Assets" xlink:to="CurrentAssets_2" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CurrentAssets" xlink:label="CurrentAssets" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CashAndDeposits" xlink:label="CashAndDeposits" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="CashAndDeposits" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccountsReceivableTrade" xlink:label="AccountsReceivableTrade" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="AccountsReceivableTrade" order="2.125" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AdvancePaymentsTrade" xlink:label="AdvancePaymentsTrade" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="AdvancePaymentsTrade" order="3.375" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccountsReceivableOther" xlink:label="AccountsReceivableOther" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="AccountsReceivableOther" order="5.75000" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ShortTermLoansReceivable" xlink:label="ShortTermLoansReceivable" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="ShortTermLoansReceivable" order="6.2890625" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_OtherCA" xlink:label="OtherCA" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="OtherCA" order="6.828125" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_Supplies" xlink:label="Supplies" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="Supplies" order="7.828125" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_NoncurrentAssets" xlink:label="NoncurrentAssets_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="Assets" xlink:to="NoncurrentAssets_2" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_NoncurrentAssets" xlink:label="NoncurrentAssets" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_PropertyPlantAndEquipment" xlink:label="PropertyPlantAndEquipment_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NoncurrentAssets" xlink:to="PropertyPlantAndEquipment_2" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_PropertyPlantAndEquipment" xlink:label="PropertyPlantAndEquipment" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_BuildingsNet" xlink:label="BuildingsNet_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="PropertyPlantAndEquipment" xlink:to="BuildingsNet_2" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_BuildingsNet" xlink:label="BuildingsNet" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_Buildings" xlink:label="Buildings" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="BuildingsNet" xlink:to="Buildings" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccumulatedDepreciationBuildings" xlink:label="AccumulatedDepreciationBuildings" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="BuildingsNet" xlink:to="AccumulatedDepreciationBuildings" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_StructuresNet" xlink:label="StructuresNet_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="PropertyPlantAndEquipment" xlink:to="StructuresNet_2" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_StructuresNet" xlink:label="StructuresNet" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_Structures" xlink:label="Structures" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="StructuresNet" xlink:to="Structures" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccumulatedDepreciationStructures" xlink:label="AccumulatedDepreciationStructures" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="StructuresNet" xlink:to="AccumulatedDepreciationStructures" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ToolsFurnitureAndFixturesNet" xlink:label="ToolsFurnitureAndFixturesNet_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="PropertyPlantAndEquipment" xlink:to="ToolsFurnitureAndFixturesNet_2" order="3.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ToolsFurnitureAndFixturesNet" xlink:label="ToolsFurnitureAndFixturesNet" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ToolsFurnitureAndFixtures" xlink:label="ToolsFurnitureAndFixtures" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="ToolsFurnitureAndFixturesNet" xlink:to="ToolsFurnitureAndFixtures" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccumulatedDepreciationToolsFurnitureAndFixtures" xlink:label="AccumulatedDepreciationToolsFurnitureAndFixtures" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="ToolsFurnitureAndFixturesNet" xlink:to="AccumulatedDepreciationToolsFurnitureAndFixtures" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_Land" xlink:label="Land" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="PropertyPlantAndEquipment" xlink:to="Land" order="4.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LeaseAssetsNetPPE" xlink:label="LeaseAssetsNetPPE_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="PropertyPlantAndEquipment" xlink:to="LeaseAssetsNetPPE_2" order="5.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LeaseAssetsNetPPE" xlink:label="LeaseAssetsNetPPE" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LeaseAssetsPPE" xlink:label="LeaseAssetsPPE" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="LeaseAssetsNetPPE" xlink:to="LeaseAssetsPPE" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccumulatedDepreciationLeaseAssetsPPE" xlink:label="AccumulatedDepreciationLeaseAssetsPPE" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="LeaseAssetsNetPPE" xlink:to="AccumulatedDepreciationLeaseAssetsPPE" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ConstructionInProgress" xlink:label="ConstructionInProgress" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="PropertyPlantAndEquipment" xlink:to="ConstructionInProgress" order="6.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_MachineryEquipmentAndVehiclesNet" xlink:label="MachineryEquipmentAndVehiclesNet_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="PropertyPlantAndEquipment" xlink:to="MachineryEquipmentAndVehiclesNet_2" order="7.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_MachineryEquipmentAndVehiclesNet" xlink:label="MachineryEquipmentAndVehiclesNet" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_MachineryEquipmentAndVehicles" xlink:label="MachineryEquipmentAndVehicles" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="MachineryEquipmentAndVehiclesNet" xlink:to="MachineryEquipmentAndVehicles" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccumulatedDepreciationMachineryEquipmentAndVehicles" xlink:label="AccumulatedDepreciationMachineryEquipmentAndVehicles" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="MachineryEquipmentAndVehiclesNet" xlink:to="AccumulatedDepreciationMachineryEquipmentAndVehicles" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_IntangibleAssets" xlink:label="IntangibleAssets_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NoncurrentAssets" xlink:to="IntangibleAssets_2" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_IntangibleAssets" xlink:label="IntangibleAssets" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_Software" xlink:label="Software" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="IntangibleAssets" xlink:to="Software" order="1.5" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_OtherIA" xlink:label="OtherIA" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="IntangibleAssets" xlink:to="OtherIA" order="2.5" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_InvestmentsAndOtherAssets" xlink:label="InvestmentsAndOtherAssets_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NoncurrentAssets" xlink:to="InvestmentsAndOtherAssets_2" order="3.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_InvestmentsAndOtherAssets" xlink:label="InvestmentsAndOtherAssets" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_InvestmentSecurities" xlink:label="InvestmentSecurities" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="InvestmentsAndOtherAssets" xlink:to="InvestmentSecurities" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_StocksOfSubsidiariesAndAffiliates" xlink:label="StocksOfSubsidiariesAndAffiliates" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="InvestmentsAndOtherAssets" xlink:to="StocksOfSubsidiariesAndAffiliates" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_InvestmentsInOtherSecuritiesOfSubsidiariesAndAffiliates" xlink:label="InvestmentsInOtherSecuritiesOfSubsidiariesAndAffiliates" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="InvestmentsAndOtherAssets" xlink:to="InvestmentsInOtherSecuritiesOfSubsidiariesAndAffiliates" order="3.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_InvestmentsInCapitalOfSubsidiariesAndAffiliates" xlink:label="InvestmentsInCapitalOfSubsidiariesAndAffiliates" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="InvestmentsAndOtherAssets" xlink:to="InvestmentsInCapitalOfSubsidiariesAndAffiliates" order="3.875" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LongTermLoansReceivableFromSubsidiariesAndAffiliates" xlink:label="LongTermLoansReceivableFromSubsidiariesAndAffiliates" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="InvestmentsAndOtherAssets" xlink:to="LongTermLoansReceivableFromSubsidiariesAndAffiliates" order="4.625" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_PrepaidPensionCostIOA" xlink:label="PrepaidPensionCostIOA" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="InvestmentsAndOtherAssets" xlink:to="PrepaidPensionCostIOA" order="5.90625" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_OtherIOA" xlink:label="OtherIOA" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="InvestmentsAndOtherAssets" xlink:to="OtherIOA" order="6.90625" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LiabilitiesAndNetAssets" xlink:label="LiabilitiesAndNetAssets" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_Liabilities" xlink:label="Liabilities_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="LiabilitiesAndNetAssets" xlink:to="Liabilities_2" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_Liabilities" xlink:label="Liabilities" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CurrentLiabilities" xlink:label="CurrentLiabilities_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="Liabilities" xlink:to="CurrentLiabilities_2" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CurrentLiabilities" xlink:label="CurrentLiabilities" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccountsPayableTrade" xlink:label="AccountsPayableTrade" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="AccountsPayableTrade" order="0.53125" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CurrentPortionOfLongTermLoansPayableToSubsidiariesAndAffiliates" xlink:label="CurrentPortionOfLongTermLoansPayableToSubsidiariesAndAffiliates" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="CurrentPortionOfLongTermLoansPayableToSubsidiariesAndAffiliates" order="1.03125" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ShortTermLoansPayable" xlink:label="ShortTermLoansPayable" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="ShortTermLoansPayable" order="1.6484375" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LeaseObligationsCL" xlink:label="LeaseObligationsCL" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="LeaseObligationsCL" order="2.3906250" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccountsPayableOther" xlink:label="AccountsPayableOther" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="AccountsPayableOther" order="3.228515625" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccruedExpenses" xlink:label="AccruedExpenses" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="AccruedExpenses" order="4.130859375" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_IncomeTaxesPayable" xlink:label="IncomeTaxesPayable" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="IncomeTaxesPayable" order="5.07373046875" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AdvancesReceived" xlink:label="AdvancesReceived" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="AdvancesReceived" order="6.29101562500" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_DepositsReceived" xlink:label="DepositsReceived" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="DepositsReceived" order="7.5225830078125" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AssetRetirementObligationsCL" xlink:label="AssetRetirementObligationsCL" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="AssetRetirementObligationsCL" order="8.1112060546875" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_OtherCL" xlink:label="OtherCL" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="OtherCL" order="8.6998291015625" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CurrentPortionOfBonds" xlink:label="CurrentPortionOfBonds" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="CurrentPortionOfBonds" order="9.7441406250000" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CurrentPortionOfLongTermLoansPayable" xlink:label="CurrentPortionOfLongTermLoansPayable" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentLiabilities" xlink:to="CurrentPortionOfLongTermLoansPayable" order="10.7884521484375" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_NoncurrentLiabilities" xlink:label="NoncurrentLiabilities_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="Liabilities" xlink:to="NoncurrentLiabilities_2" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_NoncurrentLiabilities" xlink:label="NoncurrentLiabilities" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LongTermLoansPayable" xlink:label="LongTermLoansPayable" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NoncurrentLiabilities" xlink:to="LongTermLoansPayable" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LongTermLoansPayableToSubsidiariesAndAffiliates" xlink:label="LongTermLoansPayableToSubsidiariesAndAffiliates" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NoncurrentLiabilities" xlink:to="LongTermLoansPayableToSubsidiariesAndAffiliates" order="2.875" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LeaseObligationsNCL" xlink:label="LeaseObligationsNCL" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NoncurrentLiabilities" xlink:to="LeaseObligationsNCL" order="3.625" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_DeferredTaxLiabilities" xlink:label="DeferredTaxLiabilities" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NoncurrentLiabilities" xlink:to="DeferredTaxLiabilities" order="4.40625" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ProvisionForRetirementBenefits" xlink:label="ProvisionForRetirementBenefits" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NoncurrentLiabilities" xlink:to="ProvisionForRetirementBenefits" order="5.25000" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AssetRetirementObligationsNCL" xlink:label="AssetRetirementObligationsNCL" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NoncurrentLiabilities" xlink:to="AssetRetirementObligationsNCL" order="6.171875" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_OtherNCL" xlink:label="OtherNCL" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NoncurrentLiabilities" xlink:to="OtherNCL" order="7.171875" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_NetAssets" xlink:label="NetAssets_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="LiabilitiesAndNetAssets" xlink:to="NetAssets_2" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_NetAssets" xlink:label="NetAssets" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ShareholdersEquity" xlink:label="ShareholdersEquity_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NetAssets" xlink:to="ShareholdersEquity_2" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ShareholdersEquity" xlink:label="ShareholdersEquity" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CapitalStock" xlink:label="CapitalStock" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="ShareholdersEquity" xlink:to="CapitalStock" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CapitalSurplus" xlink:label="CapitalSurplus_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="ShareholdersEquity" xlink:to="CapitalSurplus_2" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CapitalSurplus" xlink:label="CapitalSurplus" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LegalCapitalSurplus" xlink:label="LegalCapitalSurplus" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CapitalSurplus" xlink:to="LegalCapitalSurplus" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_OtherCapitalSurplus" xlink:label="OtherCapitalSurplus" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CapitalSurplus" xlink:to="OtherCapitalSurplus" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_RetainedEarnings" xlink:label="RetainedEarnings_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="ShareholdersEquity" xlink:to="RetainedEarnings_2" order="3.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_RetainedEarnings" xlink:label="RetainedEarnings" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LegalRetainedEarnings" xlink:label="LegalRetainedEarnings" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="RetainedEarnings" xlink:to="LegalRetainedEarnings" order="1.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_RetainedEarningsBroughtForward" xlink:label="RetainedEarningsBroughtForward" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="RetainedEarnings" xlink:to="RetainedEarningsBroughtForward" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_TreasuryStock" xlink:label="TreasuryStock" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="ShareholdersEquity" xlink:to="TreasuryStock" order="4.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ValuationAndTranslationAdjustments" xlink:label="ValuationAndTranslationAdjustments_2" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="NetAssets" xlink:to="ValuationAndTranslationAdjustments_2" order="2.0" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ValuationAndTranslationAdjustments" xlink:label="ValuationAndTranslationAdjustments" />
  <link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ValuationDifferenceOnAvailableForSaleSecurities" xlink:label="ValuationDifferenceOnAvailableForSaleSecurities" />
  <link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="ValuationAndTranslationAdjustments" xlink:to="ValuationDifferenceOnAvailableForSaleSecurities" order="1.0" />
</link:calculationLink>
```

この木構造を図示すると以下のようになる。

以下のファイルの p. 214 と照らし合わせて、確認してほしい。

https://disclosure2dl.edinet-fsa.go.jp/searchdocument/pdf/S100R2ZO.pdf

```
資産 / Assets / 資産 / jppfs_cor:Assets / debit
    流動資産 / Current assets / 流動資産 / jppfs_cor:CurrentAssets / debit / weight = 1.0 / order = 1.0
        現金及び預金 / Cash and deposits / 現金及び預金 / jppfs_cor:CashAndDeposits / debit / weight = 1.0 / order = 1.0
        売掛金 / Accounts receivable - trade / 売掛金 / jppfs_cor:AccountsReceivableTrade / debit / weight = 1.0 / order = 2.125
        前渡金 / Advance payments to suppliers / 前渡金 / jppfs_cor:AdvancePaymentsTrade / debit / weight = 1.0 / order = 3.375
        未収入金 / Accounts receivable - other / 未収入金 / jppfs_cor:AccountsReceivableOther / debit / weight = 1.0 / order = 5.75
        短期貸付金 / Short-term loans receivable / 短期貸付金 / jppfs_cor:ShortTermLoansReceivable / debit / weight = 1.0 / order = 6.2890625
        その他 / Other / その他、流動資産 / jppfs_cor:OtherCA / debit / weight = 1.0 / order = 6.828125
        貯蔵品 / Supplies / 貯蔵品 / jppfs_cor:Supplies / debit / weight = 1.0 / order = 7.828125
    固定資産 / Non-current assets / 固定資産 / jppfs_cor:NoncurrentAssets / debit / weight = 1.0 / order = 2.0
        有形固定資産 / Property, plant and equipment / 有形固定資産 / jppfs_cor:PropertyPlantAndEquipment / debit / weight = 1.0 / order = 1.0
            建物（純額） / Buildings, net / 建物（純額） / jppfs_cor:BuildingsNet / debit / weight = 1.0 / order = 1.0
                建物 / Buildings / 建物 / jppfs_cor:Buildings / debit / weight = 1.0 / order = 1.0
                減価償却累計額 / Accumulated depreciation / 減価償却累計額、建物 / jppfs_cor:AccumulatedDepreciationBuildings / debit / weight = 1.0 / order = 2.0
            構築物（純額） / Structures, net / 構築物（純額） / jppfs_cor:StructuresNet / debit / weight = 1.0 / order = 2.0
                構築物 / Structures / 構築物 / jppfs_cor:Structures / debit / weight = 1.0 / order = 1.0
                減価償却累計額 / Accumulated depreciation / 減価償却累計額、構築物 / jppfs_cor:AccumulatedDepreciationStructures / debit / weight = 1.0 / order = 2.0
            工具、器具及び備品（純額） / Tools, furniture and fixtures, net / 工具、器具及び備品（純額） / jppfs_cor:ToolsFurnitureAndFixturesNet / debit / weight = 1.0 / order = 3.0
                工具、器具及び備品 / Tools, furniture and fixtures / 工具、器具及び備品 / jppfs_cor:ToolsFurnitureAndFixtures / debit / weight = 1.0 / order = 1.0
                減価償却累計額 / Accumulated depreciation / 減価償却累計額、工具、器具及び備品 / jppfs_cor:AccumulatedDepreciationToolsFurnitureAndFixtures / debit / weight = 1.0 / order = 2.0
            土地 / Land / 土地 / jppfs_cor:Land / debit / weight = 1.0 / order = 4.0
            リース資産（純額） / Leased assets, net / リース資産（純額）、有形固定資産 / jppfs_cor:LeaseAssetsNetPPE / debit / weight = 1.0 / order = 5.0
                リース資産 / Leased assets / リース資産、有形固定資産 / jppfs_cor:LeaseAssetsPPE / debit / weight = 1.0 / order = 1.0
                減価償却累計額 / Accumulated depreciation / 減価償却累計額、リース資産、有形固定資産 / jppfs_cor:AccumulatedDepreciationLeaseAssetsPPE / debit / weight = 1.0 / order = 2.0
            建設仮勘定 / Construction in progress / 建設仮勘定 / jppfs_cor:ConstructionInProgress / debit / weight = 1.0 / order = 6.0
            機械装置及び運搬具（純額） / Machinery, equipment and vehicles, net / 機械装置及び運搬具（純額） / jppfs_cor:MachineryEquipmentAndVehiclesNet / debit / weight = 1.0 / order = 7.0
                機械装置及び運搬具 / Machinery, equipment and vehicles / 機械装置及び運搬具 / jppfs_cor:MachineryEquipmentAndVehicles / debit / weight = 1.0 / order = 1.0
                減価償却累計額 / Accumulated depreciation / 減価償却累計額、機械装置及び運搬具 / jppfs_cor:AccumulatedDepreciationMachineryEquipmentAndVehicles / debit / weight = 1.0 / order = 2.0
        無形固定資産 / Intangible assets / 無形固定資産 / jppfs_cor:IntangibleAssets / debit / weight = 1.0 / order = 2.0
            ソフトウエア / Software / ソフトウエア / jppfs_cor:Software / debit / weight = 1.0 / order = 1.5
            その他 / Other / その他、無形固定資産 / jppfs_cor:OtherIA / debit / weight = 1.0 / order = 2.5
        投資その他の資産 / Investments and other assets / 投資その他の資産 / jppfs_cor:InvestmentsAndOtherAssets / debit / weight = 1.0 / order = 3.0
            投資有価証券 / Investment securities / 投資有価証券 / jppfs_cor:InvestmentSecurities / debit / weight = 1.0 / order = 1.0
            関係会社株式 / Shares of subsidiaries and associates / 関係会社株式 / jppfs_cor:StocksOfSubsidiariesAndAffiliates / debit / weight = 1.0 / order = 2.0
            その他の関係会社有価証券 / Investments in other securities of subsidiaries and associates / その他の関係会社有価証券 / jppfs_cor:InvestmentsInOtherSecuritiesOfSubsidiariesAndAffiliates / debit / weight = 1.0 / order = 3.0
            関係会社出資金 / Investments in capital of subsidiaries and associates / 関係会社出資金 / jppfs_cor:InvestmentsInCapitalOfSubsidiariesAndAffiliates / debit / weight = 1.0 / order = 3.875
            関係会社長期貸付金 / Long-term loans receivable from subsidiaries and associates / 関係会社長期貸付金 / jppfs_cor:LongTermLoansReceivableFromSubsidiariesAndAffiliates / debit / weight = 1.0 / order = 4.625
            前払年金費用 / Prepaid pension costs / 前払年金費用、投資その他の資産 / jppfs_cor:PrepaidPensionCostIOA / debit / weight = 1.0 / order = 5.90625
            その他 / Other / その他、投資その他の資産 / jppfs_cor:OtherIOA / debit / weight = 1.0 / order = 6.90625
負債純資産 / Liabilities and net assets / 負債純資産 / jppfs_cor:LiabilitiesAndNetAssets / credit
    負債 / Liabilities / 負債 / jppfs_cor:Liabilities / credit / weight = 1.0 / order = 1.0
        流動負債 / Current liabilities / 流動負債 / jppfs_cor:CurrentLiabilities / credit / weight = 1.0 / order = 1.0
            買掛金 / Accounts payable - trade / 買掛金 / jppfs_cor:AccountsPayableTrade / credit / weight = 1.0 / order = 0.53125
            １年内返済予定の関係会社長期借入金 / Current portion of long-term borrowings from subsidiaries and associates / １年内返済予定の関係会社長期借入金 / jppfs_cor:CurrentPortionOfLongTermLoansPayableToSubsidiariesAndAffiliates / credit / weight = 1.0 / order = 1.03125
            短期借入金 / Short-term borrowings / 短期借入金 / jppfs_cor:ShortTermLoansPayable / credit / weight = 1.0 / order = 1.6484375
            リース債務 / Lease liabilities / リース債務、流動負債 / jppfs_cor:LeaseObligationsCL / credit / weight = 1.0 / order = 2.390625
            未払金 / Accounts payable - other / 未払金 / jppfs_cor:AccountsPayableOther / credit / weight = 1.0 / order = 3.228515625
            未払費用 / Accrued expenses / 未払費用 / jppfs_cor:AccruedExpenses / credit / weight = 1.0 / order = 4.130859375
            未払法人税等 / Income taxes payable / 未払法人税等 / jppfs_cor:IncomeTaxesPayable / credit / weight = 1.0 / order = 5.07373046875
            前受金 / Advances received / 前受金 / jppfs_cor:AdvancesReceived / credit / weight = 1.0 / order = 6.291015625
            預り金 / Deposits received / 預り金 / jppfs_cor:DepositsReceived / credit / weight = 1.0 / order = 7.5225830078125
            資産除去債務 / Asset retirement obligations / 資産除去債務、流動負債 / jppfs_cor:AssetRetirementObligationsCL / credit / weight = 1.0 / order = 8.1112060546875
            その他 / Other / その他、流動負債 / jppfs_cor:OtherCL / credit / weight = 1.0 / order = 8.6998291015625
            １年内償還予定の社債 / Current portion of bonds payable / １年内償還予定の社債 / jppfs_cor:CurrentPortionOfBonds / credit / weight = 1.0 / order = 9.744140625
            １年内返済予定の長期借入金 / Current portion of long-term borrowings / １年内返済予定の長期借入金 / jppfs_cor:CurrentPortionOfLongTermLoansPayable / credit / weight = 1.0 / order = 10.7884521484375
        固定負債 / Non-current liabilities / 固定負債 / jppfs_cor:NoncurrentLiabilities / credit / weight = 1.0 / order = 2.0
            長期借入金 / Long-term borrowings / 長期借入金 / jppfs_cor:LongTermLoansPayable / credit / weight = 1.0 / order = 2.0
            関係会社長期借入金 / Long-term borrowings from subsidiaries and associates / 関係会社長期借入金 / jppfs_cor:LongTermLoansPayableToSubsidiariesAndAffiliates / credit / weight = 1.0 / order = 2.875
            リース債務 / Lease liabilities / リース債務、固定負債 / jppfs_cor:LeaseObligationsNCL / credit / weight = 1.0 / order = 3.625
            繰延税金負債 / Deferred tax liabilities / 繰延税金負債 / jppfs_cor:DeferredTaxLiabilities / credit / weight = 1.0 / order = 4.40625
            退職給付引当金 / Provision for retirement benefits / 退職給付引当金 / jppfs_cor:ProvisionForRetirementBenefits / credit / weight = 1.0 / order = 5.25
            資産除去債務 / Asset retirement obligations / 資産除去債務、固定負債 / jppfs_cor:AssetRetirementObligationsNCL / credit / weight = 1.0 / order = 6.171875
            その他 / Other / その他、固定負債 / jppfs_cor:OtherNCL / credit / weight = 1.0 / order = 7.171875
    純資産 / Net assets / 純資産 / jppfs_cor:NetAssets / credit / weight = 1.0 / order = 2.0
        株主資本 / Shareholders' equity / 株主資本 / jppfs_cor:ShareholdersEquity / credit / weight = 1.0 / order = 1.0
            資本金 / Share capital / 資本金 / jppfs_cor:CapitalStock / credit / weight = 1.0 / order = 1.0
            資本剰余金 / Capital surplus / 資本剰余金 / jppfs_cor:CapitalSurplus / credit / weight = 1.0 / order = 2.0
                資本準備金 / Legal capital surplus / 資本準備金 / jppfs_cor:LegalCapitalSurplus / credit / weight = 1.0 / order = 1.0
                その他資本剰余金 / Other capital surplus / その他資本剰余金 / jppfs_cor:OtherCapitalSurplus / credit / weight = 1.0 / order = 2.0
            利益剰余金 / Retained earnings / 利益剰余金 / jppfs_cor:RetainedEarnings / credit / weight = 1.0 / order = 3.0
                利益準備金 / Legal retained earnings / 利益準備金 / jppfs_cor:LegalRetainedEarnings / credit / weight = 1.0 / order = 1.0
                繰越利益剰余金 / Retained earnings brought forward / 繰越利益剰余金 / jppfs_cor:RetainedEarningsBroughtForward / credit / weight = 1.0 / order = 2.0
            自己株式 / Treasury shares / 自己株式 / jppfs_cor:TreasuryStock / credit / weight = 1.0 / order = 4.0
        評価・換算差額等 / Valuation and translation adjustments / 評価・換算差額等 / jppfs_cor:ValuationAndTranslationAdjustments / credit / weight = 1.0 / order = 2.0
            その他有価証券評価差額金 / Valuation difference on available-for-sale securities / その他有価証券評価差額金 / jppfs_cor:ValuationDifferenceOnAvailableForSaleSecurities / credit / weight = 1.0 / order = 1.0
```

具体的な構築方法を見てみよう。
まず、`from` 属性が存在しない要素を探す。これはルートノードに相当する。
この場合、`jppfs_cor:Assets` と `jppfs_cor:LiabilitiesAndNetAssets` が該当する。

```xml
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_Assets" xlink:label="Assets" />
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_LiabilitiesAndNetAssets" xlink:label="LiabilitiesAndNetAssets" />
```

次に、その要素の`xlink:label`の値を `from` 属性に持つ要素を探す。
今回は、`jppfs_cor:Assets` を例に取る。
その`xlink:label`の値は `Assets` である。
`from` 属性に `Assets` を持つ要素は以下の通り。

```xml
<link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="Assets" xlink:to="CurrentAssets_2" order="1.0" />
<link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="Assets" xlink:to="NoncurrentAssets_2" order="2.0" />
```

`to` 属性に注目する。`CurrentAssets_2` を label に持つ要素を探すと、以下の要素が見つかる。

```xml
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CurrentAssets" xlink:label="CurrentAssets_2" />
```

この `http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CurrentAssets` を href に持つ要素を探すと、以下の要素が見つかる。


```xml
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CurrentAssets" xlink:label="CurrentAssets" />
```

この要素には `CurrentAssets` という `xlink:label` 属性がある。
この `xlink:label` 属性の値を `from` 属性に持つ要素を探す。
以下の要素が見つかる。

```xml
<link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="CashAndDeposits" order="1.0" />
<link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="AccountsReceivableTrade" order="2.125" />
<link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="AdvancePaymentsTrade" order="3.375" />
<link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="AccountsReceivableOther" order="5.75000" />
<link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="ShortTermLoansReceivable" order="6.2890625" />
<link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="OtherCA" order="6.828125" />
<link:calculationArc xlink:type="arc" weight="1" xlink:arcrole="http://www.xbrl.org/2003/arcrole/summation-item" xlink:from="CurrentAssets" xlink:to="Supplies" order="7.828125" />
```

それぞれの `to` 属性に注目して、対応する要素を探すと以下の要素が見つかる。

```xml
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_CashAndDeposits" xlink:label="CashAndDeposits" />
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccountsReceivableTrade" xlink:label="AccountsReceivableTrade" />
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AdvancePaymentsTrade" xlink:label="AdvancePaymentsTrade" />
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_AccountsReceivableOther" xlink:label="AccountsReceivableOther" />
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_ShortTermLoansReceivable" xlink:label="ShortTermLoansReceivable" />
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_OtherCA" xlink:label="OtherCA" />
<link:loc xlink:type="locator" xlink:href="http://disclosure.edinet-fsa.go.jp/taxonomy/jppfs/2022-11-01/jppfs_cor_2022-11-01.xsd#jppfs_cor_Supplies" xlink:label="Supplies" />
```

このような作業を、少し上で提示した木構造と照らし合わせながらやってみれば、具体的な構築方法が理解できるだろう。
arelle を使った、木構造を表示するための python スクリプトは https://github.com/sasakiy84/xbrl-extractor/blob/23c0c1b8ffd78395697128a75cc1984c87b0a44c/xbrl_utils.py にある。