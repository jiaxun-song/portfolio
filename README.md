# Jade Song Portfolio

Jade 的中英雙語作品集，包含首頁、About、作品案例與文章。使用 Next.js App Router，預設語系為繁體中文。

接手前先讀 [HANDOFF.md](HANDOFF.md)：目前開放範圍、文案進度、舊規格差異、已知問題與文件維護方式都記錄於此。最近核對日期：2026-10-26（Asia/Taipei）。

## 本機開發

在本目錄（`portfolio/`，有 `package.json` 的位置）執行：

```sh
npm ci
npm run dev
```

開啟 <http://localhost:3100/zh-TW> 或 <http://localhost:3100/en>。開發埠是 **3100**。

```sh
npm run build
npm run start -- --port 3100
npm run lint
```

`build` 包含 TypeScript 檢查；`lint` 是獨立檢查。`npm run start` 未指定埠時使用 Next.js 預設的 3000。現有程式未要求專案自訂環境變數即可建置；Google 字型下載與嵌入的 YouTube 影片仍需要網路。

## 技術與目錄

版本以 [package.json](package.json) 與 [package-lock.json](package-lock.json) 為準：Next.js 16.2.1、React 19.2.4、Tailwind CSS 4、next-intl 4，動畫使用 Framer Motion、GSAP 與本機 WebGL2 renderer。

| 位置 | 用途 |
| --- | --- |
| `src/app/[locale]/` | 首頁、About、作品、文章與設計系統頁 |
| `src/components/` | 共用版型、區塊、UI 與首頁 Hero |
| `src/components/hero/` | 本機 WebGL2 動畫；詳見其 [README](src/components/hero/README.md) |
| `src/data/projects.ts` | 作品資料、隱藏名單與 Coming Soon 設定 |
| `src/messages/zh-TW.json`、`en.json` | 雙語文案 |
| `src/i18n/` | 語系路由與缺少翻譯時的中文回退 |
| `src/app/globals.css` | 實際設計 tokens 與共用樣式 |
| `public/images/` | 網站直接使用的圖片、影片素材 |

## 目前內容安排

- CEX、Web3Vid、Dating PWA、Ecommerce MLM 繼續從作品列表隱藏。
- Goodstuff / inspiration-library 繼續維持 Coming Soon，沒有解鎖日期。
- Prediction Market 中文仍在編修；英文暫緩，保留中文回退。不要為了補齊翻譯欄位而提前翻譯。

以上為使用者於 2026-10-26 確認的安排，不是待自動修復的缺漏。

## 文件與版本管理

Git repository 的範圍是本目錄 `portfolio/`。父資料夾中的 PRD、`Case Study MD/`、`Article/` 與原始 `assets/` 不在此 repository 內；只 clone 此 repo 不會取得那些參考資料。詳細索引、現況優先順序與已知檢查結果見 [HANDOFF.md](HANDOFF.md)。

2026-10-26 檢查：正式建置與 TypeScript 通過；ESLint 尚有 4 個錯誤、7 個警告。瀏覽器逐頁視覺與互動驗收尚未完成。
