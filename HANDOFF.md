# 專案交接與目前狀態

核對日期：2026-10-26（Asia/Taipei）。本文件描述目前工作版本，未宣稱與線上部署版本一致。

## 使用者已確認的範圍

1. 未開放作品繼續維持原狀，不自行顯示、解除鎖定或排定解鎖時間。
2. Prediction Market 中文還沒完成，英文目前不處理。英文缺少的 215 個文案欄位集中在 `caseStudy.predictionMarket`，由 `src/i18n/request.ts` 合併繁體中文內容補上；這是目前接受的行為。
3. 本次交接整理保存既有程式、素材與現況文件；不把編修中的中文當成已定稿，也不順帶改寫案例文案。

## 現況與舊規格的差異

| 項目 | 目前實作與接手原則 |
| --- | --- |
| 開發啟動 | `npm run dev` 使用 3100；原本範本 README 的 3000 不適用於此指令 |
| 框架 | Next.js 16.2.1 / React 19.2.4；勿直接照早期 PRD 的版本與範例實作 |
| 首頁 Hero | `HeroSection.tsx` 載入 `NativeHeroScene`，使用本機 WebGL2 renderer；`unicornstudio-react` 已從依賴移除，舊 PRD 的 Unicorn Studio 接法已被取代 |
| Hero 素材 | `public/images/hero/jade.png`、`helmet.png` 為本機素材；renderer、shaders、CSS 與說明一併納入 Git |
| 自訂游標 | 使用 CSS `translate` 移動，保留 `transform` 的縮放過渡 |
| 作品列表 | `src/data/projects.ts` 的 `visibleProjects` 為目前作品列表來源；不是舊 PRD 所說的全部 10 個都顯示 |
| 首頁精選 | `src/components/sections/CaseStudyGrid.tsx` 另有 4 個精選：Prediction Market、Exora、Booking App、Rolling X |
| 履歷 | 既有 Git 歷史已移除履歷連結；不依舊 About 指南的 Resume TODO 重新加入 |
| 設計規範 | 實際 tokens 以 `src/app/globals.css` 為準；父資料夾的 `design-system.md` 為規範與索引，早期 PRD 的範例值不能覆蓋目前樣式 |

Hero 的互動、降級與效能策略詳見 [Hero README](src/components/hero/README.md)。本機實作並非 Unicorn 原場景的逐像素複製；切換實作也不代表已取消外部服務訂閱。

## 作品開放狀態

| 狀態 | 專案 ID |
| --- | --- |
| 作品列表顯示 | `prediction-market`、`exora`、`rolling-x`、`booking-app`、`ai-learning`、`play-to-earn` |
| 作品列表隱藏 | `cex-web`、`web3vid`、`dating-pwa`、`ecommerce-mlm` |
| AI Building 卡片鎖定 | `inspiration-library`，連到 Goodstuff；`GOODSTUFF_UNLOCK` 維持無限期鎖定 |

此處的隱藏／鎖定描述列表入口行為。部分案例路由仍存在，並非伺服器端存取限制；維持現有行為即可。

## 文件來源與更新規則

接手時先讀本文件與 [README](README.md)。實際頁面結構、文案與設定分別核對 `src/app/`、`src/components/`、`src/messages/`、`src/data/projects.ts`，依賴版本核對 `package.json` 與 lockfile。使用者後續明確指示優先於這份狀態紀錄。

父資料夾 `My PPP/` 保留以下參考資料；它們在 `portfolio/.git` 範圍外，搬移或交接完整工作資料夾時需另外保留：

| 相對於 repository 的位置 | 定位與限制 |
| --- | --- |
| `../portfolio-prd.md` | 首頁最初需求及動畫構想；Unicorn、技術版本等內容已不代表現況 |
| `../projects-page-prd.md` | 作品列表原始設計；開放數量以目前資料與本文件為準 |
| `../about-page-prd.md`、`../about-page-dev-guide.md` | About 規格與初期開發範例；內含已過時的 TODO 與元件假設 |
| `../design-system.md` | 設計規範；實作細節需與 `src/app/globals.css` 核對 |
| `../Case Study MD/` | 案例規劃與草稿，不保證逐次同步網站文案；`augur-case-study.md` 對應 Prediction Market |
| `../Article/` | 文章來源；實際網頁內容見 `src/app/[locale]/article/` |
| `../assets/` | 原始／來源素材；正式網站載入的素材應保存在 `public/` |

案例 Markdown 仍遵循原有維護方式：平常修改程式與文案時，不逐次回填案例 MD；使用者明確要求同步案例內容時，再一次性更新。本次已修正交接入口與現況說明，沒有把尚未完成的 Prediction Market 中文同步成定稿，也沒有覆寫原始 PRD 的歷史設計內容。

後續若調整開放狀態、Hero 架構、啟動方式或驗證結果，應一併更新本文件及 README，避免下一位接手者將舊規格視為待辦。

## 驗證結果與已知待辦

2026-10-26 對本機既有程式執行：

- `npm run build`：通過編譯、TypeScript 與靜態頁面生成（37/37）。建置通過不代表所有圖片、連結與互動都已驗收。
- `npm run lint`：4 個錯誤、7 個警告，尚未通過。
- 比對中英文 JSON：英文缺 215 個欄位，依上述內容安排暫緩。
- 瀏覽器逐頁、手機版與 WebGL 視覺驗收：尚未執行。

### ESLint 待處理

| 檔案 | 問題 |
| --- | --- |
| `src/app/[locale]/work/WorkClient.tsx` | effect 內直接呼叫 setState |
| `src/components/layout/SplashScreen.tsx` | effect 內直接呼叫 setState |
| `src/hooks/useMediaQuery.ts` | effect 內直接呼叫 setState |
| `src/components/sections/AboutFooterCTA.tsx` | 站內導覽使用 `<a>`，違反 Next.js Link 規則 |

另有 7 個未使用變數／函式警告，位於 Exora、Prediction Market、Web3Vid 與 Navbar。這些問題未在本次 Git／文件整理中改動。

### 未開放作品的素材狀態

隱藏的 CEX、Web3Vid、Dating PWA、Ecommerce MLM 卡片所引用的封面檔案不在 `public/`。Web3Vid 內頁仍引用缺少的 `/images/case-studies/web3vid/` 圖片目錄；已有的 Hero 圖片實際位於 `/images/projects/web3vid/hero-cover.png`。暫時保留未開放狀態，未來使用者要求開放時再補素材、修正路徑並驗收。

## Git 與交付範圍

- repository 位於 `portfolio/`，目前分支為 `main`。
- 交接整理保存本機 Hero／游標修改、Hero 圖片、依賴移除與文件；`node_modules/`、`.next/`、環境檔與建置快取繼續依 `.gitignore` 排除。
- 檢查時大量檔案顯示修改，原因是原本 `100644` 的檔案被加上可執行位元；整理時依 Git 索引還原這些權限，保留檔案內容。
- 本次範圍為本機提交；遠端同步與部署狀態未驗證。
