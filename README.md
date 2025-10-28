# 3分タイマー PWA

起動と同時に3分カウントダウンを開始するタイマーアプリです。PWA（Progressive Web App）として動作し、スマートフォンにインストール可能です。

## 機能

- 起動と同時に3分（180秒）のカウントダウンを自動開始
- リセットボタンで再度3分からスタート
- 進捗バーで残り時間を視覚的に表示
- タイマー終了時に通知とサウンドで知らせる
- オフラインでも動作（PWA）
- スマートフォンのホーム画面に追加可能

## ファイル構成

```
.
├── index.html           # メインのHTMLファイル
├── style.css           # スタイルシート
├── app.js              # タイマーのロジック
├── manifest.json       # PWAマニフェスト
├── service-worker.js   # Service Worker
├── icon-192.png        # アプリアイコン (192x192)
├── icon-512.png        # アプリアイコン (512x512)
└── generate_icons.py   # アイコン生成スクリプト
```

## 使用方法

### ローカルでテスト

1. HTTPサーバーを起動（PWAにはHTTPSまたはlocalhostが必要）:
   ```bash
   python3 -m http.server 8000
   ```

2. ブラウザで開く:
   ```
   http://localhost:8000
   ```

3. ページを開くと自動的に3分のカウントダウンが開始されます

### スマートフォンにインストール

1. スマートフォンのブラウザでアプリを開く
2. ブラウザのメニューから「ホーム画面に追加」を選択
3. アプリがホーム画面に追加されます
4. アプリアイコンをタップして起動すると、自動的にカウントダウンが開始されます

## 技術仕様

- HTML5
- CSS3（レスポンシブデザイン）
- Vanilla JavaScript
- Service Worker（オフライン対応）
- Web Notifications API
- Web Audio API

## ブラウザ対応

- Chrome/Edge（推奨）
- Safari（iOS）
- Firefox

## 開発

アイコンを再生成する場合:
```bash
python3 generate_icons.py
```
