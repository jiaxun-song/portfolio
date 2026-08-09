export const articleHtml = `<!-- ============ HERO ============ -->
<div class="hero">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="wide">
    <span class="eyebrow">Workflow Teardown — 手工 × 可複製產線 · 2026.07</span>
    <h1>使用 Claude Code 開發短影音自動剪輯 AI <span class="q">Workflow</span><span class="sub-t">一個餐飲街訪 AI 剪輯工作流的拆解全記錄</span></h1>
    <p class="lede">這篇記錄我怎麼加速企劃執行的產出，把餐飲街訪長影片，從「每次都要重來的手工剪輯」，一步步收斂成一套能上 GitHub、給同事下載就能產出同級成品的<strong>「餐飲街訪短影音自動剪輯的 AI 工具」</strong>。</p>
    <div class="hero-meta">
      <span class="chip"><b>2</b> 階段流程</span>
      <span class="chip"><b>3</b> 種取景模式</span>
      <span class="chip"><b>7</b> 項美術規格凍結</span>
      <span class="chip"><b>2</b> 張 per-video 表</span>
      <span class="chip"><b>1</b> 條端到端產線</span>
    </div>
  </div>
</div>

<main>

<!-- ============ 一句話結論 ============ -->
<section class="wide rv" aria-label="一句話結論">
  <div class="verdict">
    <span class="eyebrow">The Thesis — 一句話結論</span>
    <ul>
      <li><strong>我要的不是「剪好一支」，而是「每支都一樣好」。</strong>把第一支影片裡好看的部分，拆成規則、拆成一條產線。</li>
      <li><strong>設計決定凍結</strong>——顏色、字級、版位、音量、節奏，全部寫死成常數。</li>
      <li><strong>內容判斷保留</strong>——挑哪段、怎麼寫 hook，這種每支不同的判斷，留給人（＋Claude）。</li>
      <li>工具保證的是<strong>風格與版式一致</strong>，不是內容自動複製。</li>
    </ul>
  </div>
</section>

<!-- ============ 01 工具定位 ============ -->
<section class="prose rv" id="positioning">
  <span class="eyebrow">01 — Positioning 工具定位</span>
  <h2>它是「前處理器＋版式產線」，<br>不是「一鍵神器」。</h2>
  <p>街訪的素材有兩個先天特性：<strong>橫式、而且畫面裡有兩個人</strong>（訪談者＋老闆）。要把它變成一支直式短影音，中間缺兩塊：<span class="hl">橫轉直、講到誰切到誰</span>，以及<span class="hl">一整套餐飲街訪專屬的版式</span>。於是我把它設計成兩階段：</p>
  <div class="steps" style="grid-template-columns:repeat(2,1fr);margin-top:10px">
    <div class="step">
      <span class="wm" aria-hidden="true">A</span>
      <span class="s-tag">Stage A · 切鏡</span>
      <h3>橫 → 直，講到誰切到誰</h3>
      <p>橫式雙人毛片轉 9:16，依逐字稿判斷每段切到訪談者或老闆，套上 cinematic 電影感調色，產出 reframed.mp4。</p>
    </div>
    <div class="step">
      <span class="wm" aria-hidden="true">B</span>
      <span class="s-tag">Stage B · 上版式</span>
      <h3>黑金標題＋片尾＋字幕＋配樂</h3>
      <p>套上凍結好的美術規格：黑金標題匾額、店名條、明體字幕、片尾地址打字機、配樂邏輯，產出 final.mp4（30–60 秒直式短影音）。</p>
    </div>
  </div>

  <h3 style="margin-top:48px">一個關鍵設計決定：位置 ≠ 角色</h3>
  <p>這是整套工具最核心的抽象。我沒有把「訪談者＝畫面右邊」寫死，而是把三件事分開——好處是：<strong>下一支片左右互換、換個機位，我只要改「位置」和「每段切誰」，模板一行都不用動。</strong></p>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th scope="col">層次</th><th scope="col">是什麼</th><th scope="col">怎麼定</th></tr></thead>
      <tbody>
        <tr><td>位置</td><td>兩個人各站在畫面哪個水平位置（像素座標 cx）</td><td>每支看圖量</td></tr>
        <tr><td>角色</td><td>誰是訪談者／老闆、人名</td><td>只是名牌標籤</td></tr>
        <tr><td>切鏡</td><td>每段台詞切到哪個人</td><td>讀逐字稿判斷</td></tr>
      </tbody>
    </table>
  </div>
  <p class="tbl-cap">把「位置」和「角色」拆開，是這套工具具備通用性、而非只服務玉米老闆一支的關鍵。</p>

  <div class="verdict" style="margin-top:34px">
    <span class="eyebrow">它不是什麼</span>
    <ul>
      <li><strong>不是獨立 App</strong>——它是由 Claude Code 驅動的工作流，真正在跑的是「Claude 讀素材、做判斷、呼叫引擎」，人在幾個關卡點頭。</li>
      <li><strong>不保證內容自動相同</strong>——它保證的是「風格與版式」自動相同。</li>
    </ul>
  </div>
</section>

<!-- ============ 02 從成品反推規則 ============ -->
<section class="wide rv" id="method">
  <span class="eyebrow">02 — Method 從成品反推規則</span>
  <h2>不憑空設計規格，<br>拿「玉米老闆」當標準答案反推。</h2>
  <figure class="rv" style="max-width:340px;margin:8px auto 4px">
    <div style="position:relative;aspect-ratio:9/16;border-radius:20px;overflow:hidden;border:1px solid rgba(0,229,208,.22);box-shadow:0 24px 70px -30px rgba(0,229,208,.22);background:#000">
      <iframe style="position:absolute;inset:0;width:100%;height:100%;border:0" src="https://www.youtube.com/embed/jO_6YulfI7o" title="玉米老闆 · 餐飲街訪成品" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <figcaption style="text-align:center;margin-top:14px;font-family:var(--font-m);font-size:12.5px;letter-spacing:.5px;line-height:1.6;color:var(--tx-2)">▲ 那支「標準答案」——玉米老闆街訪成品。本篇所有規格數值，都是從這支挖出來凍結的。</figcaption>
  </figure>
  <p style="max-width:70ch;margin-top:36px">我的做法不是憑空設計，而是拿已經做好、我自己滿意的那支「玉米老闆」當標準答案，逐項把數值挖出來、凍結成常數。美術層我沒有「大概那樣」帶過，而是打開實際檔案，把每一個數字抄出來變成規範：</p>

  <div class="brief">
    <div class="brief-head"><i class="dot t"></i>Frozen Specs · 美術規格凍結表（取自玉米老闆實檔）</div>
    <dl>
      <div class="brief-row"><dt>黑金標題</dt><dd>上方匾額，主標 <strong>94px</strong>、金色 <strong>#E8CB72</strong>、黑金漸層底、雙金框。</dd></div>
      <div class="brief-row"><dt>店名條</dt><dd>下方 <strong>52px</strong>、米金 <strong>#F7EAA0</strong>、黑色描邊，格式固定成「📍 店名 📍」。</dd></div>
      <div class="brief-row"><dt>內文字幕</dt><dd>明體、<strong>60px</strong>、白字深灰外框。</dd></div>
      <div class="brief-row"><dt>調色</dt><dd><strong>cinematic</strong>——暖膚色配青藍陰影的電影感。</dd></div>
      <div class="brief-row"><dt>片尾</dt><dd>訪談結束後接 <strong>3–5 秒</strong>店面／招牌／食物畫面。</dd></div>
      <div class="brief-row"><dt>地址打字機</dt><dd>每字間隔 <strong>0.16 秒</strong>逐字揭露，每字對齊一個鍵盤敲擊音。</dd></div>
      <div class="brief-row"><dt>配樂</dt><dd>音量 <strong>-22dB</strong>、有人聲時自動閃避（sidechain duck）、片尾最後 2 秒漸弱。</dd></div>
    </dl>
    <div class="brief-foot">時間碼一律以逐字稿實際時間為準，沒有的秒數、字數絕不編造——不確定就標「要進轉錄後才能精準對時」。</div>
  </div>

  <div class="steps" style="margin-top:36px">
    <div class="step">
      <span class="wm" aria-hidden="true">01</span>
      <span class="s-tag">Inventory · 盤點</span>
      <h3>哪些是「每支都會重複」的？</h3>
      <p>把一支街訪從毛片到成品逐項攤開，標記哪些已是規則、哪些是這支手工做的。收斂出三層：企劃層、切鏡層、美術層（最該固定）。</p>
    </div>
    <div class="step">
      <span class="wm" aria-hidden="true">02</span>
      <span class="s-tag">Engine · 抽一張表</span>
      <h3>規則寫成引擎，變數抽成表</h3>
      <p>把每一項寫成小引擎，「每支會變的東西」全抽到 per-video 設定檔。<strong>下一支只要填兩張表</strong>：一張管切鏡、一張管版式，其餘全部自動套固定規格。</p>
    </div>
    <div class="step">
      <span class="wm" aria-hidden="true">03</span>
      <span class="s-tag">E2E · 端到端</span>
      <h3>真實跑一遍才算數</h3>
      <p>用玉米老闆素材跑完整流程：切鏡輸出、puppeteer 產黑金匾額、字幕燒錄、配樂輪播、最終合成——每步出檔抽畫面確認，端到端真的吐得出成品。</p>
    </div>
  </div>
</section>

<!-- ============ 03 成果 ============ -->
<section class="wide rv" id="results">
  <span class="eyebrow">03 — Results 成果</span>
  <h2>從「一次性手工品」，<br>變成「可交接的產線」。</h2>
  <div class="fits" style="margin-top:30px">
    <div class="fit first">
      <span class="f-rank">成果 01 · 設計凍結</span>
      <h3>風格穩定，省掉所有「設計決定」</h3>
      <p>版式、調色、字幕、配樂、片尾節奏全固定成規格。第二支之後省掉的，是第一支花掉大把時間的來回——那些都寫死在引擎裡了。</p>
    </div>
    <div class="fit">
      <span class="f-rank">成果 02 · 產線化</span>
      <h3>手工品 → 產線</h3>
      <p>每支的工作量，從「重新設計一次」降到「填兩張表 ＋ 在幾個關卡確認」。這是量級的差異。</p>
    </div>
    <div class="fit">
      <span class="f-rank">成果 03 · 可移交</span>
      <h3>自給自足，打包上 GitHub</h3>
      <p>切鏡引擎、版式引擎、配樂庫、字型、片尾打字機全抽成一個獨立、自足的資料夾。上了 private repo，同事下載裝好環境就能產同版式成品。</p>
    </div>
    <div class="fit">
      <span class="f-rank">成果 04 · 紀律固定</span>
      <h3>連「編輯調性紅線」也寫進去</h3>
      <p>不只美術規格：「先企劃再剪」「hook 從老闆真話裡挖」「不賣慘、不浪漫化犧牲」這些調性紅線也進了工作流。保證的不只是好看，還有調性一致。</p>
    </div>
  </div>
</section>

<!-- ============ 04 限制 ============ -->
<section class="prose rv" id="limits">
  <span class="eyebrow">04 — Limits 誠實的另一面</span>
  <h2>它不會替你做的<br>五件事。</h2>
  <ol class="num-list" style="margin-top:30px">
    <li><span class="no">01</span><div class="txt"><strong>它不會替你「挑故事」。</strong>讀完 10 分鐘毛片、挑出最戳人的 30–60 秒、把 hook 寫對——這是每支都不一樣的判斷。情緒濃度不等於故事品質，老闆紅了眼眶不代表這段就是好片。這種判斷，工具給不了。</div></li>
    <li><span class="no">02</span><div class="txt"><strong>環境不會跟著檔案一起搬。</strong>程式碼進得了 repo，但含 libass 的 ffmpeg、約 1.4GB 語音辨識模型、瀏覽器、Node 得各機安裝。目前只有 macOS 一鍵安裝，Windows 要手動處理。</div></li>
    <li><span class="no">03</span><div class="txt"><strong>進階功能有硬體門檻。</strong>「手持晃自動追臉置中」用的是 Apple 平台臉部偵測，只在 Apple Silicon 的 Mac 上能跑，換機器還要重新編譯。Intel Mac／Windows 只能用「固定框」版本。</div></li>
    <li><span class="no">04</span><div class="txt"><strong>素材有前置成本。</strong>片尾要的店面／食物空景與地址，訪談毛片裡通常沒有，得另外拍、另外查。不是工具的鍋，但它是產出品質的前提。</div></li>
    <li><span class="no">05</span><div class="txt"><strong>「跟我一樣」是有條件的。</strong>同事能產出一樣的版式與質感，但「一樣」指的是風格一致，不是內容自動複製。同毛片＋同判斷 → 幾乎逐幀相同；不同毛片 → 同一套皮、不同的故事。</div></li>
  </ol>
</section>

<!-- ============ 05 適合對象 ============ -->
<section class="wide rv" id="audience">
  <span class="eyebrow">05 — Who It's For 適合對象</span>
  <h2>誰適合這套<br>「AI 短影音自動剪輯」Workflow</h2>
  <div class="fits" style="margin-top:30px">
    <div class="fit first">
      <span class="f-rank">最適合 · 系列型創作者</span>
      <h3>經營系列型短影音的個人</h3>
      <p>頻道有明確、重複的格式（街訪、開箱、語錄、教學），每支結構相似、只是內容不同。你最需要的就是「設計凍結、內容保留」。</p>
    </div>
    <div class="fit">
      <span class="f-rank">很適合 · 小型內容團隊</span>
      <h3>要維持品牌一致性的團隊</h3>
      <p>一個人定好版式與紀律，其他人用同一條產線出片，維持品牌一致性，不會每個人剪出不同調性。</p>
    </div>
    <div class="fit">
      <span class="f-rank">適合 · 願意用命令列的人</span>
      <h3>能跟 AI 協作的人</h3>
      <p>這不是拖拉式剪輯軟體，是「AI ＋ 引擎」的工作流。你不必會寫程式，但要能在對話裡跟 AI 協作、照著步驟跑幾行指令。</p>
    </div>
    <div class="fit no-rec">
      <span class="f-rank">不適合 · 這幾種先跳過</span>
      <h3>三種情況這套價值不大</h3>
      <p>只想剪一支、不打算系列化的人；完全不想碰命令列、只要純圖形介面的人；內容形式每支都天差地遠、沒有可固定版式的人。</p>
    </div>
  </div>
</section>

<!-- ============ 06 結語 ============ -->
<section class="prose rv" id="conclusion">
  <span class="eyebrow">06 — Conclusion 結語</span>
  <h2>將工作流交給 AI，判斷留給人。</h2>
  <div class="verdict" style="margin-top:30px">
    <p style="margin-bottom:1.2em">這個專案對我最大的意義，不在於「做了一個剪輯工具」，而在於<strong>把一次性的手感，變成了一套可以被複製、被交接、被規模化的產線</strong>。</p>
    <p style="margin-bottom:1.2em">——同時，沒有把最珍貴的那部分交給機器：讀懂一個老闆的故事、挑出那句最戳人的真話。一個具體的選擇、一句樸實的真話，往往比一滴眼淚更有力。</p>
    <p><strong>將工作流交給 AI，判斷留給人。</strong>這是我從這支街訪工作流裡，學到最實在的一件事。</p>
  </div>
  <p class="p-note" style="margin-top:24px">本文記錄的是一次真實的工具拆解與建置過程；文中所有規格數值均取自實際成品檔案。</p>
</section>

</main>`;
