---
title: Obsidian をフローティングウィンドウで使う
description: Obsidian を常に最前面に表示されるフローティングウィンドウとして使う方法を紹介します。Raycast Notes のような使い方が可能になります。
published: 2025-12-15
---

これは、[TSG Advent Calendar 2025](https://adventar.org/calendars/12405) の 15 日目の記事です。


-----


Obsidian を Raycast Notes のような「常に最前面に表示されるフローティングメモ」として使いたかったので、プラグインとスクリプトを組み合わせて環境を構築した。
たとえば、授業用のPDFを最大化したウインドウで表示しつつ、右下に小さな Obsidian ウィンドウを常に表示してメモを取る、みたいな使い方ができる。


<video controls autoplay muted loop style="width: 100%; height: auto; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 16px;">
  <source src="/20251215-obsidian-floating-window/obsidian-floating-window.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

動画の最初でウインドウが明滅してるのは、ショートカットを押して表示を切り替えているため。
ウインドウを切り替えても常に最前面に表示されていて、他のウインドウの操作をしても常に前面に表示されている。

なお、Hover Editor というプラグインがあるが、デスクトップ横断で常に最前面に表示する機能はなさそうだったので、自分でスクリプトを書いている。

やりたいことはシンプル。

1.  Electron API を使って、Obsidian のウィンドウを常に最前面に表示するように設定する。
2.  QuickAdd プラグインで、その挙動を制御するスクリプトをマクロとして登録する。
3.  Raycast の Quicklink からそのマクロを URI Scheme 経由で叩く。

## 実装したスクリプト

QuickAdd の Macro に登録する JavaScript は以下の通り。
Electron の API を直接叩いている。

```javascript
module.exports = async (params) => {
  const { app } = params;

  const { remote } = require('electron');
  const screen = remote.screen;
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.bounds;
  const windowWidth = 350;
  const windowHeight = 500;
  const offset = {
    x: 10,
    y: 30
  }
  const workspaceWindowInitData = {
    x: Math.round(width - windowWidth - offset.x),
    y: Math.round(height - windowHeight - offset.y),
    size: {
      width: windowWidth,
      height: windowHeight
    }
  }

  // 既存のフローティングウィンドウを探す
  const allWindows = remote.BrowserWindow.getAllWindows();
  
  // メインウィンドウ以外で、alwaysOnTopが設定されているウィンドウを探す
  let floatingWindow = allWindows.find(win => 
    win.isAlwaysOnTop()
  );

  // 既存のウィンドウがあって表示されている場合はそれを隠す
  if (floatingWindow && !floatingWindow.isDestroyed() && floatingWindow.isVisible()) {
    floatingWindow.hide();
    return;
  }

  // 既存のウィンドウが隠れている場合は表示
  if (floatingWindow && !floatingWindow.isDestroyed() && !floatingWindow.isVisible()) {
    floatingWindow.show();
    floatingWindow.focus();
    return;
  }

  // 既存のウィンドウがない場合は新規作成
  // mainWin.minimize();
  app.workspace.openPopoutLeaf(workspaceWindowInitData);

  // ウィンドウの設定
  floatingWindow = remote.BrowserWindow.getFocusedWindow();
  
  if (floatingWindow) {
    floatingWindow.webContents.setZoomFactor(0.8);
    floatingWindow.setOpacity(0.9);
    floatingWindow.setSize(workspaceWindowInitData.size.width, workspaceWindowInitData.size.height);
    floatingWindow.setPosition(workspaceWindowInitData.x, workspaceWindowInitData.y);
    floatingWindow.setAlwaysOnTop(true);
    
    if (process.platform === 'darwin' && parseFloat(process.versions.electron) >= 2.0) {
      floatingWindow.setVisibleOnAllWorkspaces(true);
    }

    // ウィンドウが閉じられるのを防ぐ
    floatingWindow.on('close', (event) => {
      event.preventDefault();
      floatingWindow.hide();
    });
  }
}
```

## 設定手順

1.  上記のスクリプトを `.js` ファイルとして Vault 内に保存する。
2.  QuickAdd の Macros に新しいマクロを作成し、User Script として上記の js ファイルを紐付ける。（設定画面から Name に obsidian-floating-window を入れて、Macro を選んで、Add Choice。User Script で open-floating-window.js を選んで追加。）
3.  Raycast の Quicklink を作成し、以下のような URL を登録する。
    `obsidian://quickadd?choice=open-floating-window&vault=obsidian-vault`
      - `choice`: QuickAdd で作成したマクロ名
      - `vault`: 自分の Vault 名

これで、Raycast からコマンド一発で右下に半透明の Obsidian がポップアップする。
なお、別に Raycast を使わなくても、Global Hotkey などのプラグインを使ってショートカットを割り当てても良い。

## 課題と挙動

実現はできたが、仮想デスクトップが勝手に切り替わる問題がある。

なんらかの条件のもとで、ショートカットなどでフローティングウィンドウを呼び出すと、Obsidian 本体があるデスクトップに強制的に移動してしまう現象が発生する。
常に発生するわけではないものの、Obsidian 本体とは別のデスクトップで作業しているときに起きるとストレス。

「デスクトップとDock (Desktop & Dock)」から、Mission Controlの「アプリケーションの切り替えで、アプリケーションのウインドウが開いている操作スペースに移動」をオフにするという解決策を Gemini 3.0 Pro に言われたので試してみましたが、効果はなかった。まだ解決策は見つかっていない。


## 参考

- [ディスプレイ狭い民のための「新規ウィンドウで開く」for Obsidian｜iiz](https://note.com/iiz00/n/n79c2cd5ab202)
  - アイデア元。このスクリプトをベースに、`setVisibleOnAllWorkspaces` を追加して、スタイルを調整し、ショートカットで呼び出せるようにした
- [`win.setVisibleOnAllWorkspaces(visible[, options])`](https://www.electronjs.org/ja/docs/latest/api/base-window#winsetvisibleonallworkspacesvisible-options-macos-linux)
- [`win.setAlwaysOnTop(flag[, level][, relativeLevel])`](https://www.electronjs.org/ja/docs/latest/api/base-window#winsetalwaysontopflag-level-relativelevel)
- [Open QuickAdd from a URI | QuickAdd](https://quickadd.obsidian.guide/docs/Advanced/ObsidianUri)