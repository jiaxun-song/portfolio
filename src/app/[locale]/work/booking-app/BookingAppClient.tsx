'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import VideoEmbed from '@/components/ui/VideoEmbed';
import { visibleProjects } from '@/data/projects';

const CURRENT_ID = 'booking-app';
const currentIdx = visibleProjects.findIndex((p) => p.id === CURRENT_ID);
const prevProject = visibleProjects[(currentIdx - 1 + visibleProjects.length) % visibleProjects.length];
const nextProject = visibleProjects[(currentIdx + 1) % visibleProjects.length];

const metaItems = [
  { label: '擔任角色', value: 'UI/UX Designer（一人設計，App & Web）' },
  { label: '專案範疇', value: 'Product Planning · UX · UI & Branding ·  2B Backend System' },
  { label: '產出平台', value: 'App · Web · Admin Backend' },
];

const summaryTags = ['0→1 產品', '雙邊平台', '資訊架構', '2B 後台系統', '跨職能交付'];

const dualChallengeCards = [
  {
    layer: '2C 端',
    title: '簡單到「值得換掉現有習慣」',
    body: '使用者已經習慣了 LINE 預約。要讓他換過來，新體驗不能只是「也能用」，而要明顯更省事——一個地方看完所有選擇、一個流程完成預約。這一層有清楚的設計方向。',
    accent: 'rgb(125, 211, 252)',
    tint: 'rgba(56, 189, 248, 0.14)',
    border: 'rgba(56, 189, 248, 0.22)',
  },
  {
    layer: '2B 端',
    title: '完整到「商家願意把營運交出來」',
    body: '商家後台面向的，是要自己上架與管理課程的場館老闆。它必須涵蓋商家營運的完整工作流，且邏輯要對得起前台的每一個欄位。在沒有 PM 規格的情況下，這一整套系統需要被獨立推導出來並設計落地。',
    accent: 'var(--color-accent)',
    tint: 'rgba(0, 229, 208, 0.14)',
    border: 'rgba(0, 229, 208, 0.32)',
  },
];

const asymmetryRows: Array<{ label: string; consumer: string; merchant: string }> = [
  {
    label: '成敗判準',
    consumer: '能不能比現有的 LINE 流程更省事',
    merchant: '能不能取代商家現在用的 Excel 與訊息對帳',
  },
  {
    label: '主要範圍',
    consumer: '3 個核心畫面：探索 ／ 預約 ／ 完成',
    merchant: '8＋ 個營運模組：課程・課表・場館・教練・訂單・取消改期・評價・報表',
  },
  {
    label: '衡量單位',
    consumer: '用戶體驗順暢速度',
    merchant: '工作流完整度（前台每個欄位都有後台來源）',
  },
  {
    label: '失敗的樣子',
    consumer: '多按一次、多想一步 → 退回去用 LINE',
    merchant: '少一個欄位、少一個動作 → 退回去用 Excel 對帳',
  },
];

const designProcess = [
  {
    title: '客戶需求訪談',
    body: '透過訪談釐清商業目標與目標客群，對標 ClassPass 模式定義 MVP 範圍——區分「平台轉得動的最小功能集合」與「可留待後續迭代的功能」。',
  },
  {
    title: '功能梳理',
    body: '繪製 Wireframe 梳理功能流程，與客戶逐一對焦需求。Wireframe 在這裡的作用不是畫面，而是對齊語言——讓「客戶口中的功能」與「實際要設計的介面」變成同一件事。',
  },
  {
    title: '風格提案',
    body: '先提出產品色彩與風格方向，待風格定錨後再繪製 App 首頁，作為整體視覺基準，再展開其餘介面。',
  },
  {
    title: '完整設計與交付',
    body: '與客戶、工程師定期會議，動態調整設計需求，並將設計產出交付工程師實作。',
  },
];

const appDecisionCards = [
  {
    stage: '01 — 探索 ／ Discovery',
    moment: '「我等等有空，附近有什麼能上」',
    title: '搜尋探索頁以「附近」組織課程',
    body: '使用者打開 App 的真實情境是「我等等有空，附近有什麼能上」，因此搜尋探索頁以地點與分類為主軸組織課程。',
  },
  {
    stage: '02 — 瀏覽 ／ Browse',
    moment: '「這堂課值不值得點進去？」',
    title: '課程卡片只放「決策所需」的資訊',
    body: '卡片以「用戶值不值得點進去」為標準篩選，因此只保留課名、課程時長、地點、評分數；其餘留到詳情頁。',
  },
  {
    stage: '03 — 預約 ／ Booking',
    moment: '「等等，我以為可以取消？」',
    title: '取消政策前置到「確認預約」之前',
    body: '課程預約類產品最大的客訴來源是「我以為可以取消」。把取消與改期規則放在確認預約這一步之前，而不是藏進條款頁，讓使用者在付出成本前就理解規則。',
  },
  {
    stage: '04 — 系統 ／ System',
    moment: '「前台每一個欄位，背後都是一個設計決定」',
    title: 'App 後台與 2C 同步設計',
    body: '2C App 的每一個動態欄位，背後都需要一個輸入來源。App 後台與前台同步規劃，確保前台呈現與後台維護一致——這也銜接到下一段的後台系統設計。',
  },
];

const webDualCards = [
  {
    tag: '2C 形象網頁',
    pitch: '賣「方便」',
    audience: '想找課的使用者',
    points: ['課程多樣性', '預約的簡單', '價格彈性'],
    cta: '下載 App',
    accent: 'rgb(125, 211, 252)',
    tint: 'rgba(56, 189, 248, 0.14)',
    border: 'rgba(56, 189, 248, 0.22)',
  },
  {
    tag: '2B 形象網頁',
    pitch: '賣「生意」',
    audience: '考慮進駐的場館商家',
    points: ['平台曝光效益', '後台管理的省力', '進駐申請'],
    cta: '聯絡進駐 / 申請開店',
    accent: 'rgb(251, 191, 36)',
    tint: 'rgba(251, 191, 36, 0.14)',
    border: 'rgba(251, 191, 36, 0.22)',
  },
];

const backendMethodSteps = [
  {
    title: '羅列所有功能欄位',
    body: '先以「前台使用者情境」逐畫面盤點哪些欄位是可變動、可輸入的；再切換到「後台管理者情境」，思考商家需要看到、需要操作哪些資訊。',
  },
  {
    title: '側邊欄大分類規劃',
    body: '將盤點出的功能分類成後台的導覽結構；需要被特別處理的功能（例如需審核的內容）獨立成一個大分類。',
  },
  {
    title: '列表資訊呈現',
    body: '每個大分類底下都以列表呈現資料。特殊的數據呈現（如統計圖表）則回頭追問「這個數字的資料從哪裡來」，確保後台抓得到。',
  },
  {
    title: '細欄規劃',
    body: '有列表，就代表有對應的可輸入欄位與新增／編輯／刪除介面，逐一設計每個物件的編輯細節。',
  },
  {
    title: '覆盤檢驗',
    body: '回到前台介面逐欄比對，檢查後台是否有遺漏——任何一個前台欄位若在後台找不到輸入來源，就是一個破洞。',
  },
];

const fieldMappingRows: Array<[string, string]> = [
  ['課程名稱', '文字輸入欄位'],
  ['上課時間', '課表排程：選擇日期與時段'],
  ['上課地點', '場館下拉選單（綁定商家既有場館）'],
  ['授課教練', '教練下拉選單（綁定商家既有教練名單）'],
  ['課程價格', '數字輸入欄位'],
  ['剩餘名額', '容量上限輸入 ＋ 系統依預約數即時扣減'],
  ['課程評價', '唯讀，由使用者預約後評分回填'],
];

const scopeMetrics = [
  { value: '5', label: '介面產出', sub: 'App · App 後台 · 2C 網頁 · 2B 網頁 · 2B 後台' },
  { value: '2', label: '雙邊系統', sub: '2C 使用者端 ＋ 2B 商家端' },
];

const beforeAfterRows: Array<[string, string, string]> = [
  ['找課方式', '分別加多個場館的官方 LINE', '一個 App 看完附近所有課程'],
  ['課程比較', '三套課表格式、各自查詢', '統一的瀏覽與篩選介面'],
  ['取消規則認知', '規則散落、事後才發現', '預約前即明示取消與改期政策'],
  ['商家端營運', '缺乏統一管理工具', '一套涵蓋上架到對帳的 2B 後台'],
  ['前後台一致性', '—', '後台每個欄位皆對應前台呈現，逐欄覆盤驗證'],
];

const systemAxisRows: Array<{ consumer: string; dataLabel: string; merchant: string }> = [
  {
    consumer: '在搜尋探索頁依地點「附近」探索可上的課',
    dataLabel: '課程列表',
    merchant: '在後台建立、上下架課程',
  },
  {
    consumer: '挑選自己有空的時段',
    dataLabel: '場次 ／ 排程',
    merchant: '排定課表、綁定教練與場館',
  },
  {
    consumer: '比較價格與剩餘名額，做出決策',
    dataLabel: '容量 ／ 價格',
    merchant: '設定容量上限與課程定價',
  },
  {
    consumer: '確認預約並完成付款',
    dataLabel: '訂單',
    merchant: '檢視預約名單，名額即時扣減',
  },
  {
    consumer: '預約前即看見取消與改期規則',
    dataLabel: '取消規則',
    merchant: '統一設定退改政策',
  },
  {
    consumer: '預約後留下評價，影響下次決策',
    dataLabel: '評價',
    merchant: '觀看評分回饋，作為營運改善依據',
  },
];

export default function BookingAppClient() {
  const tp = useTranslations('projectsPage');
  const [decisionIdx, setDecisionIdx] = useState(0);
  const decision = appDecisionCards[decisionIdx];
  const goPrev = () =>
    setDecisionIdx((i) => (i - 1 + appDecisionCards.length) % appDecisionCards.length);
  const goNext = () => setDecisionIdx((i) => (i + 1) % appDecisionCards.length);

  return (
    <>
      {/* Back Navigation */}
      <motion.div
        className="sticky top-0 z-50 glass-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 py-4 md:px-12">
          <Link
            href="/work"
            className="text-sm text-text-muted transition-colors duration-300 hover:text-text-primary"
          >
            <i className="ri-arrow-left-line mr-1 text-accent" /> Back to Projects
          </Link>
        </div>
      </motion.div>

      {/* Hero Banner */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-6 pb-16 pt-24 md:px-12">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/projects/booking-app/Buddy Hero.jpg"
            alt="Buddy — 課程預約平台 Hero"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/25 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[var(--cs-wide-max-width)]">
          <motion.h1
            className="mb-3 max-w-4xl font-[var(--font-display)] text-[32px] font-bold leading-[1.18] text-text-primary md:text-[52px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            課程預約平台：從 2C 預約 App 到 2B 商家後台的雙邊系統設計
          </motion.h1>
          <motion.p
            className="max-w-2xl text-base text-text-secondary md:text-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            把客戶「想做台灣版 ClassPass」的模糊命題，收斂成一套 2C 預約 App 與 2B 商家管理後台咬合運作的雙邊系統。
          </motion.p>
        </div>
      </section>

      {/* Metadata Bar */}
      <ScrollReveal className="mx-auto mt-20 max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {metaItems.map((item) => (
            <div
              key={item.label}
              className="relative overflow-hidden rounded-2xl border border-accent/15 bg-accent/[0.045] p-6"
            >
              <p className="mb-4 inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 font-[var(--font-mono)] text-[13px] font-semibold uppercase tracking-[1.4px] text-accent">
                {item.label}
              </p>
              <p className="text-[16px] leading-[1.65] text-text-secondary">{item.value}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Project Summary Card */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-8 md:p-10">
          <p className="mb-6 font-[var(--font-mono)] text-xs uppercase tracking-[2px] text-accent">
            專案摘要
          </p>
          <h2 className="mb-5 font-[var(--font-display)] text-xl font-semibold leading-snug text-text-primary md:text-2xl">
            把一個模糊的市場願景，收斂成一套雙邊產品的完整設計藍圖。
          </h2>
          <p className="mb-8 text-[16px] leading-[1.7] text-text-secondary">
            這是一個對標 ClassPass 模式的台灣課程預約平台。核心設計任務是處理「雙邊產品」的本質挑戰——面對 2C 使用者要換掉舊習慣的門檻很高，產品體驗必須低到值得跨過，2B 商家後台要完整到讓商家願意託付營運。在沒有現成產品規格的情況下，獨立完成功能規劃、資訊架構、2C App 與形象網頁設計，並
            <span className="text-accent">從前台介面反推、設計出整套 2B 商家管理後台</span>。
          </p>
          <div className="mb-6 border-t border-white/[0.08]" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 font-[var(--font-mono)] text-[12px] uppercase tracking-[2px] text-text-muted">
                Role
              </p>
              <p className="text-[16px] font-medium text-text-secondary">
                UI/UX Designer（一人設計，App & Web）
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {summaryTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-[var(--font-mono)] text-xs text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 01 — 專案背景 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="01 — 專案背景" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          想上三堂不同的課，要先加三個官方 LINE
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          在國外，課程聚合平台用一個 App 就能串起上千家場館；但這個模式始終沒有真正服務台灣的使用者，而客戶看見了這個缺口與其潛力。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-amber-400 p-6 md:p-8">
          <p className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-amber-400">
            用戶側的問題
          </p>
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            分散在各處的預約體驗
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            想上一堂瑜珈、一堂拳擊、一堂壺鈴，在台灣需要分別加三個官方 LINE、記三套預約規則、看三種課表格式。沒有一個地方能讓用戶「一次看完附近所有能上的課」——課程選擇的成本，被間接推給了使用者。
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="border-b border-white/[0.08] px-6 py-6 md:px-8 md:py-7">
            <p className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-accent">
              Bilateral System ／ 雙邊系統關係
            </p>
            <h3 className="mb-3 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-[22px]">
              課程資料，是 2C 與 2B 之間唯一的軸線
            </h3>
            <p className="text-[15px] leading-[1.7] text-text-secondary">
              雙邊平台轉得動的前提，是兩端對「同一份資料」的理解必須咬合一致——2C 使用者看見的每一個欄位，都對應 2B 商家在後台維護的一筆資料。
            </p>
          </div>

          <div className="grid grid-cols-1 border-b border-white/[0.08] md:grid-cols-12">
            <div
              className="border-b border-white/[0.06] px-5 py-5 md:col-span-4 md:border-b-0 md:border-r md:border-white/[0.05]"
              style={{ background: 'rgba(56, 189, 248, 0.05)' }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-2 w-2 rounded-full"
                  style={{ background: 'rgb(125, 211, 252)' }}
                />
                <p
                  className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.8px]"
                  style={{ color: 'rgb(125, 211, 252)' }}
                >
                  Demand Side
                </p>
              </div>
              <p className="mt-2 font-[var(--font-display)] text-base font-semibold text-text-primary md:text-[17px]">
                2C 使用者端
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-text-muted">
                想找課、想預約的人
              </p>
            </div>

            <div
              className="border-b border-white/[0.06] px-5 py-5 md:col-span-4 md:border-b-0 md:border-r md:border-white/[0.05]"
              style={{ background: 'rgba(0, 229, 208, 0.05)' }}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.8px] text-accent">
                  Shared Data Axis
                </p>
              </div>
              <p className="mt-2 font-[var(--font-display)] text-base font-semibold text-text-primary md:text-[17px]">
                課程資料軸線
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-text-muted">
                兩端共用的同一份資料
              </p>
            </div>

            <div
              className="px-5 py-5 md:col-span-4"
              style={{ background: 'rgba(251, 191, 36, 0.05)' }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-2 w-2 rounded-full"
                  style={{ background: 'rgb(251, 191, 36)' }}
                />
                <p
                  className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.8px]"
                  style={{ color: 'rgb(251, 191, 36)' }}
                >
                  Supply Side
                </p>
              </div>
              <p className="mt-2 font-[var(--font-display)] text-base font-semibold text-text-primary md:text-[17px]">
                2B 商家端
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-text-muted">
                要把課程經營起來的場館
              </p>
            </div>
          </div>

          {systemAxisRows.map((row, i) => (
            <div
              key={row.dataLabel}
              className={`grid grid-cols-1 md:grid-cols-12 ${
                i < systemAxisRows.length - 1 ? 'border-b border-white/[0.05]' : ''
              }`}
            >
              <div className="flex items-start gap-3 px-5 py-5 md:col-span-4 md:border-r md:border-white/[0.05]">
                <span
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: 'rgb(125, 211, 252)' }}
                />
                <p className="text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">
                  {row.consumer}
                </p>
              </div>

              <div
                className="flex items-center justify-center px-5 py-5 md:col-span-4 md:border-r md:border-white/[0.05]"
                style={{ background: 'rgba(0, 229, 208, 0.03)' }}
              >
                <span
                  className="inline-flex rounded-full border px-4 py-1.5 font-[var(--font-mono)] text-[12px] font-semibold tracking-[1px] text-accent"
                  style={{
                    borderColor: 'rgba(0, 229, 208, 0.32)',
                    background: 'rgba(0, 229, 208, 0.12)',
                  }}
                >
                  {row.dataLabel}
                </span>
              </div>

              <div className="flex items-start gap-3 px-5 py-5 md:col-span-4">
                <span
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: 'rgb(251, 191, 36)' }}
                />
                <p className="text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">
                  {row.merchant}
                </p>
              </div>
            </div>
          ))}

        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium relative overflow-hidden rounded-2xl border border-accent/20 p-8 md:p-10">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-64 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
          <div className="relative">
            <p className="mb-4 font-[var(--font-mono)] text-[12px] uppercase tracking-[3px] text-accent">
              THE OPPORTUNITY
            </p>
            <p className="mb-3 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-2xl">
              不只是一個 App 的設計題，是個雙邊系統的設計
            </p>
            <p className="max-w-3xl text-[16px] leading-[1.7] text-text-secondary">
              真正的設計挑戰，不是把預約功能做出來，而是同時回答兩個方向相反的問題——2C 使用者為什麼要從現有的 LINE 習慣換過來？2B 商家為什麼願意把課程營運交給一個還沒有用戶基礎的新平台？任何一邊的體驗失衡，平台就轉不動。
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* 02 — 市場機會 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="02 — 競品與市場機會" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          缺口存在，挑戰者也一直有
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          定位這個平台的市場處境，需要同時看見兩件事：國際品牌的缺席，以及本地前人的足跡。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="border-b border-white/[0.08] px-6 py-5 md:px-8">
            <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary md:text-xl">
              兩種市場訊號，指向同一個結論
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[14px] md:text-[16px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="w-[22%] px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    維度
                  </th>
                  <th className="w-[39%] px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    國際品牌（如 ClassPass）
                  </th>
                  <th className="w-[39%] px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    本地前人（17Fit / KFit, 2014）
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/[0.05]">
                  <td className="px-4 py-5 align-top font-medium text-text-primary md:px-6">市場涵蓋</td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">服務全球數千座城市</td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">受其啟發、紮根本地</td>
                </tr>
                <tr className="border-b border-white/[0.05]">
                  <td className="px-4 py-5 align-top font-medium text-text-primary md:px-6">與台灣的關係</td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">
                    始終未進入 <span className="ml-1 text-red-400">✗</span>
                  </td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">
                    已嘗試，但未長大 <span className="ml-1 text-amber-400">△</span>
                  </td>
                </tr>
                <tr className="border-b border-white/[0.05]">
                  <td className="px-4 py-5 align-top font-medium text-text-primary md:px-6">對市場的證明</td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">模式在他國長期成立</td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">台灣確實有人需要這個服務</td>
                </tr>
                <tr>
                  <td className="px-4 py-5 align-top font-medium text-text-primary md:px-6">留下的訊號</td>
                  <td className="px-4 py-5 align-top text-accent md:px-6">缺口仍在，沒有現成競品要對位</td>
                  <td className="px-4 py-5 align-top text-accent md:px-6">
                    「做出來」 ≠ 「做得起來」
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border-t border-white/[0.08] bg-white/[0.02] px-6 py-5 md:px-8">
            <p className="text-[14px] leading-[1.7] text-text-secondary">
              <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-accent">Insight ／ </span>
              真空存在，但模式不易擴展——本專案要解的，不只是「功能題」，更是雙邊平台的「招募題」。
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8">
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            需求真實，但模式不易做大
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            國際課程聚合平台（如 ClassPass）服務涵蓋全球數千座城市，卻始終未進入台灣市場。而早在 2014 年，台灣就出現過受其啟發的本地嘗試（如 17Fit、KFit），它們驗證了需求真實存在，卻都沒有長成足夠大的平台。
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start md:gap-8">
          <Image
            src="/images/projects/booking-app/Image Slot — 視覺呈現 01.png"
            alt="視覺呈現 01"
            width={1682}
            height={1670}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
          <Image
            src="/images/projects/booking-app/Image Slot — 視覺呈現 02.png"
            alt="視覺呈現 02"
            width={1226}
            height={1214}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
        </div>
      </ScrollReveal>

      {/* 03 — 核心設計挑戰 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="03 — 核心設計挑戰" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          一個雙邊系統，兩種要被說服的人
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          雙邊平台最常見的設計錯誤，是用同一套思路面對兩種人。此專案存在兩個性質不同的設計挑戰。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {dualChallengeCards.map((card) => (
            <div
              key={card.layer}
              className="group relative overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1 md:p-9"
              style={{
                background: `linear-gradient(135deg, ${card.tint} 0%, rgba(255,255,255,0.02) 100%)`,
                border: `1px solid ${card.border}`,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full opacity-60 blur-3xl"
                style={{ background: card.tint }}
              />
              <span
                className="relative z-10 inline-flex rounded-full border px-3 py-1.5 font-[var(--font-mono)] text-[11px] font-semibold uppercase tracking-[1.6px]"
                style={{
                  borderColor: `color-mix(in srgb, ${card.accent} 35%, transparent)`,
                  background: `color-mix(in srgb, ${card.accent} 14%, transparent)`,
                  color: card.accent,
                }}
              >
                {card.layer}
              </span>
              <h3 className="relative z-10 mb-4 mt-5 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-[22px]">
                {card.title}
              </h3>
              <p className="relative z-10 text-[16px] leading-[1.75] text-text-secondary">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium overflow-hidden rounded-2xl border border-white/[0.08]">
          {/* Header */}
          <div className="border-b border-white/[0.08] px-6 py-6 md:px-8 md:py-7">
            <p className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-accent">
              Asymmetric Challenge ／ 設計重量對照
            </p>
            <h3 className="mb-3 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-[22px]">
              同一個產品，兩端的設計取捨幾乎相反
            </h3>
            <p className="text-[15px] leading-[1.7] text-text-secondary">
              上面兩張卡描述了兩種挑戰的性質——這張表把它變成可量化的對比，讓「不對稱」這件事被看見。
            </p>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-1 border-b border-white/[0.08] md:grid-cols-12">
            <div className="hidden md:col-span-2 md:block md:border-r md:border-white/[0.05]" />
            <div
              className="border-b border-white/[0.06] px-5 py-5 md:col-span-5 md:border-b-0 md:border-r md:border-white/[0.05]"
              style={{ background: 'rgba(56, 189, 248, 0.05)' }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-2 w-2 rounded-full"
                  style={{ background: 'rgb(125, 211, 252)' }}
                />
                <p
                  className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.8px]"
                  style={{ color: 'rgb(125, 211, 252)' }}
                >
                  2C App
                </p>
              </div>
              <p className="mt-2 font-[var(--font-display)] text-base font-semibold text-text-primary md:text-[17px]">
                設計取向：減法
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-text-muted">
                拿掉所有不必要的，留下決策最短路徑
              </p>
            </div>
            <div
              className="px-5 py-5 md:col-span-5"
              style={{ background: 'rgba(0, 229, 208, 0.05)' }}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.8px] text-accent">
                  2B 後台
                </p>
              </div>
              <p className="mt-2 font-[var(--font-display)] text-base font-semibold text-text-primary md:text-[17px]">
                設計取向：加法
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-text-muted">
                補齊所有必要的，撐起完整的營運流程
              </p>
            </div>
          </div>

          {/* Comparison rows */}
          {asymmetryRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-1 md:grid-cols-12 ${
                i < asymmetryRows.length - 1 ? 'border-b border-white/[0.05]' : ''
              }`}
            >
              <div className="flex items-center px-5 py-4 md:col-span-2 md:border-r md:border-white/[0.05]">
                <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.6px] text-text-muted">
                  {row.label}
                </p>
              </div>
              <div
                className="border-b border-white/[0.05] px-5 py-4 text-[14px] leading-[1.7] text-text-secondary md:col-span-5 md:border-b-0 md:border-r md:border-white/[0.05] md:text-[15px]"
                style={{ background: 'rgba(56, 189, 248, 0.03)' }}
              >
                {row.consumer}
              </div>
              <div
                className="px-5 py-4 text-[14px] leading-[1.7] text-text-secondary md:col-span-5 md:text-[15px]"
                style={{ background: 'rgba(0, 229, 208, 0.03)' }}
              >
                {row.merchant}
              </div>
            </div>
          ))}

          {/* Reading caption */}
          <div className="border-t border-white/[0.08] bg-white/[0.02] px-6 py-5 md:px-8">
            <p className="text-[14px] leading-[1.7] text-text-secondary">
              <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-accent">
                Reading the table ／{' '}
              </span>
              2C 那一欄越短越好，2B 那一欄越完整越好：同一個產品，兩端的「做好」是兩件相反的事。
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* 04 — 0~1 設計流程 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="04 — 0~1 設計流程" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          從模糊命題到可執行藍圖
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          客戶帶來的是一個方向，不是一份規格。設計流程的核心任務，是把它一步步收斂成可交付工程的產品藍圖。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {designProcess.map((step, idx) => (
            <div
              key={step.title}
              className="glass-medium relative overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="font-[var(--font-mono)] text-[40px] font-bold leading-none text-accent/25 md:text-[48px]">
                  0{idx + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary md:text-xl">
                    {step.title}
                  </h3>
                  <div className="mt-2 h-[2px] w-8 rounded-full bg-accent/40" />
                </div>
              </div>
              <p className="text-[16px] leading-[1.75] text-text-secondary">{step.body}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <VideoEmbed videoId="UMYxOdTFVP4" width="wide" padded={false} />
      </ScrollReveal>

      {/* 05 — 設計產出：2C App */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="05 — 設計產出：2C App" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          App UI &amp; UX
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          2C App 的設計目標只有一個——讓「找課、預約」這件事，比現有「自己 Google 找課、加官方 LINE 預約」的流程明顯更省事。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <Image
          src="/images/projects/booking-app/Image Slot — 2C App 主要流程長圖（探索 → 預約 → 完成）.png"
          alt="2C App 主要流程長圖：探索 → 預約 → 完成"
          width={2400}
          height={1175}
          className="h-auto w-full rounded-2xl"
          sizes="(min-width: 768px) 80vw, 100vw"
        />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="關鍵設計決策" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          跟著使用者走進 App 的每一個瞬間
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          以下是這個專案中幾個關鍵的介面設計判斷。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium relative overflow-hidden rounded-2xl border border-white/[0.08] p-6 md:p-8">
          {/* Top accent hairline */}
          <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          {/* Subtle background blob */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.06] blur-3xl"
          />

          <div className="relative">
            {/* Header: stage marker + nav controls */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`stage-${decisionIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-[var(--font-mono)] text-[12px] uppercase tracking-[2.5px] text-accent"
                >
                  {decision.stage}
                </motion.span>
              </AnimatePresence>

              <div className="flex items-center gap-3">
                <span className="font-[var(--font-mono)] text-[12px] tracking-[1.6px] text-text-muted">
                  {String(decisionIdx + 1).padStart(2, '0')}{' '}
                  <span className="text-text-muted/40">/</span>{' '}
                  {String(appDecisionCards.length).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="上一個設計決策"
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 bg-accent/5 transition-all hover:border-accent/50 hover:bg-accent/10"
                  >
                    <i className="ri-arrow-left-line text-accent transition-transform group-hover:-translate-x-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="下一個設計決策"
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 bg-accent/5 transition-all hover:border-accent/50 hover:bg-accent/10"
                  >
                    <i className="ri-arrow-right-line text-accent transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Divider between header and content */}
            <div className="mb-6 h-px w-full bg-gradient-to-r from-accent/20 via-white/[0.06] to-transparent" />

            {/* Chapter content — animated transition between decisions */}
            <div className="min-h-[160px] md:min-h-[130px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={decisionIdx}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 gap-7 md:grid-cols-12 md:gap-10"
                >
                  <div className="md:col-span-5">
                    <p className="font-[var(--font-display)] text-xl font-semibold leading-[1.45] text-text-primary md:text-[26px]">
                      {decision.moment}
                    </p>
                  </div>
                  <div className="md:col-span-7 md:border-l md:border-white/[0.10] md:pl-10">
                    <h3 className="mb-4 font-[var(--font-display)] text-base font-semibold leading-tight text-text-primary md:text-lg">
                      {decision.title}
                    </h3>
                    <p className="text-[15px] leading-[1.75] text-text-secondary md:text-[16px]">
                      {decision.body}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicators — pill style */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {appDecisionCards.map((card, i) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setDecisionIdx(i)}
                  aria-label={`切換到第 ${i + 1} 章 ／ ${card.stage}`}
                  aria-current={i === decisionIdx ? 'true' : 'false'}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === decisionIdx
                      ? 'w-10 bg-accent'
                      : 'w-4 bg-text-muted/30 hover:bg-text-muted/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start md:gap-8">
          <Image
            src="/images/projects/booking-app/Image Slot — App 關鍵畫面 01 — 帶設計決策標註.png"
            alt="App 關鍵畫面 01：帶設計決策標註"
            width={1196}
            height={5632}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
          <Image
            src="/images/projects/booking-app/Image Slot — App 畫面 02.png"
            alt="App 畫面 02"
            width={1200}
            height={5632}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
        </div>
      </ScrollReveal>

      {/* 06 — 形象網頁分流 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="06 — 形象網頁" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          面對 2C &amp; 2B 的形象網頁設計
        </h2>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {webDualCards.map((card) => (
            <div
              key={card.tag}
              className="relative overflow-hidden rounded-2xl p-7 md:p-8"
              style={{
                background: `linear-gradient(135deg, ${card.tint} 0%, rgba(255,255,255,0.02) 100%)`,
                border: `1px solid ${card.border}`,
              }}
            >
              <span
                className="inline-flex rounded-full border px-3 py-1.5 font-[var(--font-mono)] text-[11px] font-semibold uppercase tracking-[1.6px]"
                style={{
                  borderColor: `color-mix(in srgb, ${card.accent} 35%, transparent)`,
                  background: `color-mix(in srgb, ${card.accent} 14%, transparent)`,
                  color: card.accent,
                }}
              >
                {card.tag}
              </span>
              <h3 className="mt-5 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-[22px]">
                賣「<span style={{ color: card.accent }}>{card.pitch.replace(/賣「|」/g, '')}</span>」
              </h3>
              <dl className="mt-6 space-y-3 text-[15px] text-text-secondary">
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 font-[var(--font-mono)] text-[12px] uppercase tracking-[1.4px] text-text-muted">
                    訴求對象
                  </dt>
                  <dd>{card.audience}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 font-[var(--font-mono)] text-[12px] uppercase tracking-[1.4px] text-text-muted">
                    內容重點
                  </dt>
                  <dd>
                    <ul className="space-y-1">
                      {card.points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <i
                            className="ri-check-line mt-0.5 shrink-0"
                            style={{ color: card.accent }}
                          />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 font-[var(--font-mono)] text-[12px] uppercase tracking-[1.4px] text-text-muted">
                    CTA
                  </dt>
                  <dd style={{ color: card.accent }}>{card.cta}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8">
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            為兩種使用者設計不同的內容結構與視覺語氣，讓每一頁只專心說服一種人——這是雙邊平台「招募雙邊」這件事，在形象層的落地。
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start md:gap-8">
          <Image
            src="/images/projects/booking-app/Image Slot — 2C 形象網頁.png"
            alt="2C 形象網頁：訴求想找課的使用者，主打課程多樣性、預約簡單、價格彈性"
            width={1195}
            height={8021}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
          <Image
            src="/images/projects/booking-app/Image Slot — 2B 形象網頁.png"
            alt="2B 形象網頁：訴求考慮進駐的場館商家，主打平台曝光效益與後台管理"
            width={1195}
            height={8019}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
        </div>
      </ScrollReveal>

      {/* 07 — 設計產出：2B 後台系統 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="07 — 設計產出：2B 後台系統" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          前台使用者看到的每一個資訊，都是後台一個被設計過的輸入決策
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          2B 後台是一個獨立系統，面向的是「要自己管課程」的場館商家。在沒有現成規格的情況下，這整套後台的內容與結構，是從前台一路反推、自行定義出來的。而 2C App 與 2B 後台看似是兩個產品，實際上是同一份資料的一體兩面。以下是把後台從零推導出來的方法。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {/* 01 — Foundation（feature 大卡） */}
          <div className="group glass-medium relative col-span-1 overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1 md:col-span-7 md:p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/[0.10] blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-sky-400/[0.06] blur-3xl"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-0 select-none font-[var(--font-mono)] text-[140px] font-bold leading-none text-accent/[0.07] md:text-[180px]"
            >
              01
            </span>
            <div className="relative flex h-full flex-col">
              <h3 className="mb-4 font-[var(--font-display)] text-xl font-semibold leading-tight text-text-primary md:text-[24px]">
                {backendMethodSteps[0].title}
              </h3>
              <div className="mb-5 h-[2px] w-10 rounded-full bg-accent/50" />
              <p className="text-[15px] leading-[1.75] text-text-secondary md:text-[16px]">
                {backendMethodSteps[0].body}
              </p>
            </div>
          </div>

          {/* 02 — Structure */}
          <div className="group glass-medium relative col-span-1 overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 md:col-span-5">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 right-3 select-none font-[var(--font-mono)] text-[100px] font-bold leading-none text-accent/[0.05]"
            >
              02
            </span>
            <h3 className="relative mb-3 font-[var(--font-display)] text-base font-semibold leading-tight text-text-primary md:text-lg">
              {backendMethodSteps[1].title}
            </h3>
            <div className="relative mb-3 h-[2px] w-8 rounded-full bg-accent/40" />
            <p className="relative text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">
              {backendMethodSteps[1].body}
            </p>
          </div>

          {/* 03 — Listing（與 02 鏡像排列） */}
          <div className="group glass-medium relative col-span-1 overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 md:col-span-5">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 right-3 select-none font-[var(--font-mono)] text-[100px] font-bold leading-none text-accent/[0.05]"
            >
              03
            </span>
            <h3 className="relative mb-3 font-[var(--font-display)] text-base font-semibold leading-tight text-text-primary md:text-lg">
              {backendMethodSteps[2].title}
            </h3>
            <div className="relative mb-3 h-[2px] w-8 rounded-full bg-accent/40" />
            <p className="relative text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">
              {backendMethodSteps[2].body}
            </p>
          </div>

          {/* 04 — Detail */}
          <div className="group glass-medium relative col-span-1 overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 md:col-span-7 md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-accent/[0.05] blur-3xl"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 right-4 select-none font-[var(--font-mono)] text-[110px] font-bold leading-none text-accent/[0.06] md:text-[120px]"
            >
              04
            </span>
            <h3 className="relative mb-3 font-[var(--font-display)] text-base font-semibold leading-tight text-text-primary md:text-lg">
              {backendMethodSteps[3].title}
            </h3>
            <div className="relative mb-3 h-[2px] w-8 rounded-full bg-accent/40" />
            <p className="relative text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">
              {backendMethodSteps[3].body}
            </p>
          </div>

          {/* 05 — Closing Check（accent feature 全寬卡） */}
          <div
            className="group relative col-span-1 overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1 md:col-span-12 md:p-9"
            style={{
              background:
                'linear-gradient(135deg, rgba(0, 229, 208, 0.10) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(0, 229, 208, 0.28)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 right-1/4 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-6 top-2 select-none font-[var(--font-mono)] text-[120px] font-bold leading-none text-accent/[0.10] md:text-[160px]"
            >
              05
            </span>
            <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <div className="md:w-[38%]">
                <h3 className="font-[var(--font-display)] text-xl font-semibold leading-tight text-text-primary md:text-[24px]">
                  {backendMethodSteps[4].title}
                </h3>
                <div className="mt-4 h-[2px] w-10 rounded-full bg-accent" />
              </div>
              <div className="md:w-[62%] md:border-l md:border-accent/15 md:pl-10">
                <p className="text-[15px] leading-[1.75] text-text-secondary md:text-[16px]">
                  {backendMethodSteps[4].body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="後台介面" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          一張課程卡片，如何決定後台的樣子
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          以使用者在 App 上看到的「課程卡片」為例，它的每一個欄位，都對應到後台一個被設計過的輸入。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="border-b border-white/[0.08] px-6 py-5 md:px-8">
            <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary md:text-xl">
              課程卡片 → 後台編輯表單的欄位對照
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[14px] md:text-[16px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="w-1/2 px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    前台（2C App 課程卡片顯示）
                  </th>
                  <th className="w-1/2 px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-accent md:px-6">
                    後台（2B 課程編輯表單輸入）
                  </th>
                </tr>
              </thead>
              <tbody>
                {fieldMappingRows.map((row, i) => (
                  <tr
                    key={row[0]}
                    className={i < fieldMappingRows.length - 1 ? 'border-b border-white/[0.05]' : ''}
                  >
                    <td className="px-4 py-5 align-top font-medium text-text-primary md:px-6">
                      {row[0]}
                    </td>
                    <td className="px-4 py-5 align-top text-text-secondary md:px-6">
                      <span className="text-accent">{row[1]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-white/[0.08] bg-white/[0.02] px-6 py-5 md:px-8">
            <p className="text-[14px] leading-[1.7] text-text-secondary">
              前台每一個欄位，在後台都不只是「一個輸入框」——它牽涉到這個欄位由誰維護、用什麼介面輸入、以及它和其他資料的關聯。
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <Image
          src="/images/projects/booking-app/Image Slot — 物件關聯圖（課程 → 場次 → 訂單）.png"
          alt="物件關聯圖：課程 → 場次 → 訂單"
          width={2400}
          height={1175}
          className="h-auto w-full rounded-2xl"
          sizes="(min-width: 768px) 80vw, 100vw"
        />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <Image
          src="/images/projects/booking-app/Image Slot — 前台課程卡片 ↔ 後台編輯表單的欄位對照圖.png"
          alt="前台課程卡片 ↔ 後台編輯表單的欄位對照圖"
          width={2400}
          height={1500}
          className="h-auto w-full rounded-2xl"
          sizes="(min-width: 768px) 80vw, 100vw"
        />
      </ScrollReveal>

      {/* 08 — Impact & Scope */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="08 — Impact & Scope" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          一個人交付的設計範疇
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          設計交付以「完整、可交付工程」為終點。以下從設計範疇與體驗改變兩個層面呈現。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {scopeMetrics.map((m, idx) => (
            <div key={m.label} className="glass-medium rounded-2xl p-6 text-center">
              <span
                className={`mb-2 block font-[var(--font-mono)] text-4xl font-bold md:text-5xl ${
                  idx === 1 ? 'text-accent/70' : 'text-accent'
                }`}
              >
                {m.value}
              </span>
              <p className="text-[15px] font-medium leading-[1.5] text-text-secondary">{m.label}</p>
              <p className="mt-1 text-[12px] leading-[1.5] text-text-muted">{m.sub}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <h3 className="mb-4 font-[var(--font-display)] text-lg font-semibold text-text-primary">
          體驗改變
        </h3>
        <div className="glass-medium overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    面向
                  </th>
                  <th className="px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    Before（現況）
                  </th>
                  <th className="px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-accent md:px-6">
                    After（本平台設計）
                  </th>
                </tr>
              </thead>
              <tbody>
                {beforeAfterRows.map((row, i) => (
                  <tr
                    key={row[0]}
                    className={i < beforeAfterRows.length - 1 ? 'border-b border-white/[0.05]' : ''}
                  >
                    <td className="px-4 py-4 font-medium text-text-secondary md:px-6">{row[0]}</td>
                    <td className="px-4 py-4 text-text-muted md:px-6">{row[1]}</td>
                    <td className="px-4 py-4 font-medium text-accent md:px-6">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* 09 — Reflection */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-6">
        <SectionLabel label="09 — Reflection" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          如果重做一次，我會把「驗證」往前放
        </h2>
        <div className="glass-medium rounded-2xl p-8 md:p-10">
          <p className="mb-5 text-[18px] leading-[1.7] text-text-secondary">
            這個專案讓我完整經歷了一次雙邊產品從 0 到交付的設計。最大的收穫，是「從前台反推後台系統」這套方法——它後來成為我處理任何前後台一併設計時的思路。
          </p>
          <p className="mb-5 text-[18px] leading-[1.7] text-text-secondary">
            但如果重來一次，有兩件事我會做得不同。
          </p>
          <p className="mb-5 text-[18px] leading-[1.7] text-text-secondary">
            <span className="font-semibold text-text-primary">我會把市場驗證往前放。</span>
            這次的需求主要來自客戶的市場觀察，我沒有對台灣既有的同類嘗試做足夠的研究。若能更早釐清「這個模式過去為什麼沒做大」，設計就能更早針對真實風險——例如雙邊平台最難的商家冷啟動——做出回應，而不只是把功能做對。
          </p>
          <p className="mb-5 text-[18px] leading-[1.7] text-text-secondary">
            <span className="font-semibold text-text-primary">我會為設計成果埋下可被衡量的指標。</span>
            這次的交付以「完整、可交付工程」為終點，缺少上線後的數據回饋。未來我會在設計階段就與客戶定義成功指標（例如預約完成率、商家上架課程的耗時），讓設計的價值能被驗證，而不只是被交付。
          </p>
          <p className="text-[18px] leading-[1.7] text-text-secondary">
            設計師在 0~1 專案裡最有價值的貢獻，往往不是把介面做漂亮，而是
            <span className="text-accent">在資訊不完整時，仍能把一個模糊的願景，拆解成一套彼此咬合、可被執行的系統。</span>
            這個專案，是我這個能力的起點。
          </p>
        </div>
      </ScrollReveal>

      {/* Project Status — 簡短交代產品最終落點 */}
      <ScrollReveal className="mx-auto mb-[100px] max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
        <p className="text-left text-[13px] leading-[1.75] text-text-muted">
          <span className="mr-2 font-[var(--font-mono)] uppercase tracking-[1.8px] text-text-secondary">
            Project Status —
          </span>
          設計交付完成並上架 TestFlight 進行 beta 測試；後因客戶與公司之間的合約因素，產品未進入正式上線階段。
        </p>
      </ScrollReveal>

      {/* Prev / Next Project Nav */}
      <ScrollReveal className="mx-auto mb-12 max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
        <div className="glass-medium grid grid-cols-2 rounded-2xl border border-white/[0.08]">
          <Link
            href={prevProject.link || '/work'}
            className="group border-r border-white/[0.08] px-6 py-10 md:px-10 md:py-12"
          >
            <span className="mb-3 flex items-center gap-1.5 font-[var(--font-mono)] text-[12px] uppercase tracking-[2px] text-text-muted transition-colors duration-300 group-hover:text-accent">
              <i className="ri-arrow-left-s-line text-sm" />
              上一則作品
            </span>
            <p className="text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent md:text-xl">
              {tp(`cards.${prevProject.id}.title`)}
            </p>
          </Link>
          <Link
            href={nextProject.link || '/work'}
            className="group px-6 py-10 text-right md:px-10 md:py-12"
          >
            <span className="mb-3 flex items-center justify-end gap-1.5 font-[var(--font-mono)] text-[12px] uppercase tracking-[2px] text-text-muted transition-colors duration-300 group-hover:text-accent">
              下一則作品
              <i className="ri-arrow-right-s-line text-sm" />
            </span>
            <p className="text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent md:text-xl">
              {tp(`cards.${nextProject.id}.title`)}
            </p>
          </Link>
        </div>
      </ScrollReveal>
    </>
  );
}
