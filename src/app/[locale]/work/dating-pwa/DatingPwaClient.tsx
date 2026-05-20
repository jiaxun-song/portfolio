'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { visibleProjects } from '@/data/projects';

const CURRENT_ID = 'dating-pwa';
const currentIdx = visibleProjects.findIndex((p) => p.id === CURRENT_ID);
const prevProject = visibleProjects[(currentIdx - 1 + visibleProjects.length) % visibleProjects.length];
const nextProject = visibleProjects[(currentIdx + 1) % visibleProjects.length];

const highlightMetrics = [
  { value: '393 萬', label: '台灣大齡單身人口（35–64 歲）' },
  { value: '98 億', label: '年潛在市場規模（TWD）' },
  { value: '1 萬+', label: '上線 10 個月會員數' },
];

const metaItems = [
  { label: 'Scope', value: 'Product Design · Information Architecture · Visual Identity' },
  { label: 'Platform', value: 'Mobile PWA · Marketing Website' },
];

const summaryTags = ['PWA', 'OMO Platform', '0-to-1', 'SBIR'];

const designProcess = [
  {
    title: '客戶需求訪談',
    body: '與產品創辦人進行多輪需求訪談，定義 MVP 功能範圍、盤點現有資源與技術限制、羅列完整需求清單。客戶背景為 15 年電商經驗，對產品有清晰的市場判斷，設計師的角色是將商業願景轉化為可執行的產品結構。',
  },
  {
    title: '前期任務安排',
    body: '三方同步推進：設計端進行競品分析、功能規劃與 Wireframe 繪製；工程端研究內政部身份認證 API 與金流串接方案；客戶端訂定會員收費規則、準備使用者條款與隱私權政策等法律文件。',
  },
  {
    title: '設計提案',
    body: '擷取重點頁面進行多風格方向的視覺提案，讓客戶在具體畫面上做出風格決策，而非抽象描述。',
  },
  {
    title: '完整設計',
    body: '風格確定後，展開全頁面設計。同步與客戶及工程師定期會議，根據技術可行性與業務需求動態調整設計方案。',
  },
];

const outcomeMetrics = [
  { value: 'SBIR', label: '經濟部 SBIR 計畫成功獲補助' },
  { value: '1 萬+', label: '上線 10 個月會員突破萬人' },
  { value: '1.5 個月', label: '一人完成 PWA + Web 全設計' },
];

const outcomeCards = [
  {
    title: 'SBIR 計畫核心材料',
    body: '設計稿直接作為經濟部 SBIR 計畫申請的核心視覺材料，具體呈現產品定位、用戶流程與平台風格，協助評審委員理解產品的市場差異性與可行性。設計品質直接影響了提案的說服力。',
  },
  {
    title: '從設計到產品落地',
    body: '平台於 2024 年 2 月正式試營運，截至 2024 年 12 月會員人數突破萬人。期間客戶持續與桃園市政府青年事務局合作公益活動，產品從設計概念走向了真實的社會影響力。',
  },
];

function ImagePlaceholder({ label, ratio = '16/9' }: { label: string; ratio?: string }) {
  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-accent/20 bg-gradient-to-br from-accent/[0.08] via-white/[0.025] to-accent/[0.05]"
      style={{ aspectRatio: ratio }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,229,208,0.12),transparent_42%)]" />
      <p className="relative px-6 text-center font-[var(--font-mono)] text-[12px] uppercase tracking-[1.6px] text-text-muted">
        Image Slot — {label}
      </p>
    </div>
  );
}

function LongImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-accent/20 bg-gradient-to-br from-accent/[0.08] via-white/[0.025] to-accent/[0.05]"
      style={{ aspectRatio: '3/5' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(0,229,208,0.12),transparent_38%)]" />
      <p className="relative px-6 text-center font-[var(--font-mono)] text-[12px] uppercase tracking-[1.6px] text-text-muted">
        Image Slot — {label}
      </p>
    </div>
  );
}

export default function DatingPwaClient() {
  const tp = useTranslations('projectsPage');

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
          <div className="h-full w-full bg-[radial-gradient(circle_at_78%_22%,rgba(255,107,44,0.18),transparent_38%),radial-gradient(circle_at_18%_68%,rgba(0,229,208,0.22),transparent_40%),linear-gradient(135deg,#111111_0%,#0A0A0A_55%,#171012_100%)]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/25 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[var(--cs-wide-max-width)]">
          <motion.span
            className="mb-4 block font-[var(--font-mono)] text-[14px] uppercase tracking-[3px] text-accent"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Case Study — 2023
          </motion.span>
          <motion.h1
            className="mb-3 max-w-4xl whitespace-pre-line font-[var(--font-display)] text-[32px] font-bold leading-[1.18] text-text-primary md:text-[52px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {`35 社交平台\nOnline-Merge-Offline\nDating for Grown-ups`}
          </motion.h1>
          <motion.p
            className="max-w-2xl text-base text-text-secondary md:text-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            專為二春、晚婚、單身父母設計的 OMO 社交平台——在安全、友善的環境中，讓線上認識延伸到線下真實交流。
          </motion.p>
        </div>
      </section>

      {/* Highlight Metrics Strip */}
      <ScrollReveal className="mx-auto mt-20 max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {highlightMetrics.map((m) => (
            <div
              key={m.label}
              className="relative overflow-hidden rounded-2xl p-8 text-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0, 229, 208, 0.08) 0%, rgba(0, 229, 208, 0.02) 100%)',
                border: '1px solid rgba(0, 229, 208, 0.15)',
                boxShadow: '0 4px 24px rgba(0, 229, 208, 0.06)',
              }}
            >
              <span className="mb-3 block font-[var(--font-mono)] text-xl font-bold text-accent md:text-2xl">
                {m.value}
              </span>
              <p className="text-[14px] leading-[1.6] text-text-secondary">{m.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Metadata Bar */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
            台灣第一個專為 35 歲以上族群打造的 OMO 社交平台。
          </h2>
          <p className="mb-8 text-[16px] leading-[1.7] text-text-secondary">
            35 社交平台 是台灣第一個專為 35 歲以上族群設計的 OMO 社交平台。作為唯一設計師從 0 到 1 主導產品設計——從客戶需求訪談、競品分析、資訊架構規劃到完整的 PWA 交友平台與形象網站設計。設計成果直接作為經濟部 SBIR 計畫申請的核心視覺材料，
            <span className="text-accent">協助客戶成功取得政府補助</span>。
          </p>
          <div className="mb-6 border-t border-white/[0.08]" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 font-[var(--font-mono)] text-[12px] uppercase tracking-[2px] text-text-muted">
                Role
              </p>
              <p className="text-[16px] font-medium text-text-secondary">
                UI/UX Designer · Solo · 1.5 個月
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

      {/* 01 — 市場問題 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="01 — PROBLEM SPACE" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          一個 393 萬人的需求，被整個市場忽視
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          台灣正同時經歷高齡化、晚婚與高離婚率三重趨勢。35–64 歲的大齡單身人口在十年間增加了超過 100 萬人，同期 25–34 歲的適婚單身人口卻減少了 14 萬人——交友市場的重心正在位移，但產品設計沒有跟上。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-amber-400 p-6 md:p-8">
          <p className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-amber-400">
            被忽視的用戶群像
          </p>
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            175 萬有過婚姻經驗的成熟單身，沒有產品為他們而建
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            大齡單身人口佔全國人口的 17%，其中 45% 為離異或喪偶——這 175 萬人有過婚姻經驗，對關係有更成熟的期待，也有更複雜的現實考量（子女、財務、社交圈重建）。他們不是「交友 App 的邊緣用戶」，他們是一個完整的、被忽視的市場。
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <ImagePlaceholder label="台灣單身人口趨勢——大齡增加 vs 適婚減少的交叉走勢" ratio="16/9" />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium relative overflow-hidden rounded-2xl border border-accent/20 p-8 md:p-10">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-64 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
          <div className="relative">
            <p className="mb-4 font-[var(--font-mono)] text-[12px] uppercase tracking-[3px] text-accent">
              STRUCTURAL GAP
            </p>
            <p className="mb-3 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-2xl">
              不是功能不夠，是產品假設就不為這群人建立
            </p>
            <p className="max-w-3xl text-[16px] leading-[1.7] text-text-secondary">
              現有交友平台清一色以 18–30 歲用戶為核心設計——輕量、快速、外貌驅動。這套設計邏輯與 35 族群需要的「安全感、深度了解、線下真實互動」存在結構性落差。這不是功能不夠的問題，而是
              <span className="text-accent">整個產品假設就不是為這群人建立的</span>。
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* 02 — 競品分析 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="02 — COMPETITIVE ANALYSIS" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          市場空白：30 歲以上 × 認真交往
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          將台灣市場主要交友平台按「年齡定位」與「關係嚴肅度」兩個維度繪製象限圖後，右上角（30 歲以上 × 認真交往）幾乎是空白——僅有牽手 50（76.6 萬會員）觸及此區間，但產品形態偏向傳統媒合服務，缺乏現代社交平台的體驗。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <ImagePlaceholder label="競品定位圖——年齡 × 關係嚴肅度象限，標出 Tinder / Paktor / 牽手 50 等" ratio="16/9" />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8">
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            社交場景比配對演算法更重要
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            市場缺口不只是年齡覆蓋，更是產品形態的落差。35 族群需要的不是「Tinder 但年紀大一點」，而是一個從線上到線下（OMO）完整串聯的社交平台——單親親子遊、熟齡輕旅行、講座聚會、婚戀顧問，
            <span className="text-accent">社交場景比配對演算法更重要</span>。
          </p>
        </div>
      </ScrollReveal>

      {/* 03 — 產品開發流程 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="03 — DESIGN PROCESS" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          0 → 1：從需求訪談到設計交付
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          以唯一設計師的角色，從零開始與客戶進行功能需求討論，梳理整體產品功能規劃，到最後的設計產出並交付工程師。整個流程分為四個階段，設計與工程、客戶端任務同步推進。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <ImagePlaceholder label="0~1 產品開發四步驟流程圖" ratio="16/9" />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
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

      {/* 04 — 設計提案 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="04 — STYLE EXPLORATION" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          找到「溫暖但不幼稚」的視覺語言
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          35 族群的視覺偏好與年輕用戶截然不同——太花俏會顯得不夠認真，太商務會失去社交的親和感。設計提案階段探索了多個風格方向，最終收斂到「溫暖、成熟、值得信任」的視覺基調，讓平台從第一眼就傳達出與 Tinder、Bumble 不同的定位。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <ImagePlaceholder label="設計風格提案——多方向提案的探索過程" ratio="16/9" />
      </ScrollReveal>

      {/* 05 — 設計產出：PWA */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="05 — DESIGN OUTPUT: PWA" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          行動優先的交友體驗
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          以 PWA 形式打造，讓用戶不需從 App Store 下載即可使用。核心功能涵蓋個人檔案建立、配對瀏覽、聊天互動與活動報名——將線上認識到線下見面的完整旅程整合在同一個產品內。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <LongImagePlaceholder label="PWA 交友平台完整 UI 長圖" />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <LongImagePlaceholder label="PWA 交友平台完整 UI 長圖（第二組頁面）" />
      </ScrollReveal>

      {/* 06 — 設計產出：Web */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="06 — DESIGN OUTPUT: WEB" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          品牌形象與內容入口
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          除了 PWA 交友平台，同步設計品牌形象網站與部落格系統。形象頁負責對外傳遞品牌定位與信任感，部落格則作為 SEO 內容入口與社群經營的延伸——為平台持續導入有機流量。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <LongImagePlaceholder label="形象＆部落格網頁完整 UI 長圖" />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <LongImagePlaceholder label="形象＆部落格網頁完整 UI 長圖（第二組頁面）" />
      </ScrollReveal>

      {/* 07 — Impact & Outcomes */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="07 — IMPACT & OUTCOMES" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          設計如何影響產品結果
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          從提案獲補助到產品上線營運，設計成果在多個層面產生具體影響。
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {outcomeMetrics.map((m) => (
            <div key={m.label} className="glass-medium rounded-2xl p-6 text-center">
              <span className="mb-2 block font-[var(--font-mono)] text-4xl font-bold text-accent md:text-5xl">
                {m.value}
              </span>
              <p className="text-[13px] leading-[1.5] text-text-muted">{m.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {outcomeCards.map((card) => (
            <div
              key={card.title}
              className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8"
            >
              <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
                {card.title}
              </h3>
              <p className="text-[16px] leading-[1.75] text-text-secondary">{card.body}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* 08 — 客戶評價 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="08 — CLIENT TESTIMONIAL" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          來自客戶的回饋
        </h2>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="flex flex-col gap-6 md:flex-row">
          <div
            className="relative overflow-hidden rounded-2xl border border-accent/[0.12] px-8 py-12 md:w-2/3 md:px-16 md:py-16"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,229,208,0.08) 0%, rgba(0,229,208,0.03) 40%, rgba(0,229,208,0.01) 100%)',
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute left-8 top-6 select-none text-[120px] font-bold leading-none text-accent/[0.06] md:left-14 md:text-[160px]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              &ldquo;
            </span>

            <div className="relative mb-10 flex items-stretch gap-5 md:mb-12 md:gap-6">
              <div className="w-[3px] flex-shrink-0 rounded-full bg-accent/60" />
              <p className="font-[var(--font-display)] text-xl font-semibold leading-snug text-text-primary md:text-[26px]">
                「設計成品不僅符合期待，甚至超過預期。」
              </p>
            </div>

            <div className="relative mb-10 md:mb-12">
              <p className="text-[15px] leading-[1.8] text-text-secondary md:text-base">
                由衷感謝 JS 的專業與細心，讓每個設計細節都經過深思熟慮，以確保設計的
                <span className="text-accent">實用性與美感兼具</span>
                。在溝通過程中，總是耐心傾聽需求，精準掌握方向。與 JS 合作非常愉快，是個值得信賴的合作夥伴！
              </p>
            </div>

            <div className="relative border-t border-white/[0.08] pt-6 md:pt-8">
              <p className="flex items-start gap-2 text-[14px] italic leading-[1.7] text-text-muted md:text-[15px]">
                <span className="mt-[1px] not-italic text-accent">→</span>
                <span>
                  Karen<span className="mx-2 not-italic text-text-muted/60">·</span>35+ CEO
                </span>
              </p>
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-tertiary md:w-1/3">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,107,44,0.18),transparent_50%),radial-gradient(circle_at_70%_75%,rgba(0,229,208,0.15),transparent_55%),linear-gradient(135deg,#1A1216_0%,#0F0F12_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="px-6 text-center font-[var(--font-mono)] text-[12px] uppercase tracking-[1.6px] text-text-muted">
                Image Slot — Client Portrait
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 09 — Reflection */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label="09 — REFLECTION" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          理解客戶的問題，比理解客戶的需求更重要
        </h2>
        <div className="glass-medium rounded-2xl p-8 md:p-10">
          <p className="mb-5 text-[18px] leading-[1.7] text-text-secondary">
            這是一個 1.5 個月、一人完成的 0-to-1 客戶專案。回頭看，最關鍵的設計決策不是發生在 Figma 裡，而是在需求訪談階段。
          </p>
          <p className="mb-5 text-[18px] leading-[1.7] text-text-secondary">
            客戶帶著清晰的市場判斷來：她知道 35 大齡單身族群是一個被忽視的市場，她知道 OMO 是對的產品形態。
            <span className="text-accent">設計師的價值不是告訴她「要做什麼」，而是把她的商業直覺翻譯成用戶能理解的產品結構。</span>
          </p>
          <p className="text-[18px] leading-[1.7] text-text-secondary">
            產品上線後會員快速破萬，驗證了一件事：當市場缺口夠真實，設計要做的不是創造需求，而是
            <span className="text-accent">移除阻力——讓對的人能用最低門檻找到這個為他們而建的平台</span>。
          </p>
        </div>
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
