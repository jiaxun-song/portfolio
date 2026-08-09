'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import VideoEmbed from '@/components/ui/VideoEmbed';
import SectionLabel from '@/components/ui/SectionLabel';
import { useProjectNav } from '@/hooks/useProjectNav';

const IMG = '/images/projects/prediction-market';
const CURRENT_ID = 'prediction-market';

const summaryTags = ['AI Workflow', 'Product Design', 'Design System', 'Spec-Driven', 'Multi-Tenant'];

const highlight = (chunks: ReactNode) => <span className="text-accent">{chunks}</span>;

const specStepMeta = [
  { icon: 'ri-compass-3-line', tag: 'BUSINESS' },
  { icon: 'ri-list-check-2', tag: 'EPICS' },
  { icon: 'ri-folder-chart-line', tag: 'DOMAIN' },
  { icon: 'ri-git-merge-line', tag: 'GOVERNANCE' },
];

const agentMeta = [
  { name: 'spec-writer', icon: 'ri-draft-line' },
  { name: 'design-qa', icon: 'ri-screenshot-2-line' },
  { name: 'push-readiness', icon: 'ri-shield-check-line' },
  { name: 'spec-backfill', icon: 'ri-history-line' },
  { name: 'consolidation-scout', icon: 'ri-radar-line' },
  { name: 'backend-handoff', icon: 'ri-swap-box-line' },
];

const principleMeta = [
  {
    tag: 'PERMISSION',
    gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.14) 0%, rgba(14, 165, 233, 0.04) 100%)',
    border: 'rgba(56, 189, 248, 0.22)',
    glow: 'rgba(56, 189, 248, 0.08)',
    hue: 'rgb(125, 211, 252)',
  },
  {
    tag: 'AUTHORITY',
    gradient: 'linear-gradient(135deg, rgba(0, 229, 208, 0.14) 0%, rgba(20, 184, 166, 0.04) 100%)',
    border: 'rgba(0, 229, 208, 0.22)',
    glow: 'rgba(0, 229, 208, 0.08)',
    hue: 'var(--color-accent)',
  },
  {
    tag: 'SEQUENCE',
    gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.14) 0%, rgba(16, 185, 129, 0.04) 100%)',
    border: 'rgba(52, 211, 153, 0.22)',
    glow: 'rgba(52, 211, 153, 0.08)',
    hue: 'rgb(110, 231, 183)',
  },
] as const;

/** 平倉彈窗 7 個狀態的規格 specimen——樣式與文案對齊 Augur 產品實際彈窗 */
type DialogRow = { k: string; v: string; tone?: 'up'; strong?: boolean; dim?: boolean; rule?: boolean };
type DialogSpec = {
  title: string;
  market: string;
  pill: string;
  shares: string;
  banner?: { icon: string; text: string; tone: 'ok' | 'warn' | 'neutral' | 'danger' };
  rows?: DialogRow[];
  foot?: string;
  expiry?: { label: string; time: string; pct: number; warn?: boolean };
  actions: { label: string; primary?: boolean; working?: boolean }[];
};

const MARKET_Q = 'BTC 年底是否突破 $100,000?';

const closeStates: { code: string; spec: DialogSpec }[] = [
  {
    code: 'QUOTE_READY',
    spec: {
      title: '平倉',
      market: MARKET_Q,
      pill: 'YES',
      shares: '120 股',
      rows: [
        { k: '平均成本', v: '$0.6200' },
        { k: '現價', v: '$0.7400' },
        { k: '預估賣出價', v: '$0.7326', rule: true },
        { k: '預估回收金額', v: '$87.91' },
        { k: '預估已實現損益', v: '+$13.51', tone: 'up', strong: true },
      ],
      foot: '不會以低於 $0.7179 的價格賣出——平台設定的 2% 滑點保護。',
      expiry: { label: '價格保留中', time: '0:24', pct: 80 },
      actions: [{ label: '取消' }, { label: '賣出 120 股', primary: true }],
    },
  },
  {
    code: 'QUOTE_EXPIRING',
    spec: {
      title: '平倉',
      market: MARKET_Q,
      pill: 'YES',
      shares: '120 股',
      rows: [
        { k: '預估回收金額', v: '$87.91' },
        { k: '預估已實現損益', v: '+$13.51', tone: 'up', strong: true },
      ],
      expiry: { label: '價格即將過期', time: '0:04', pct: 13, warn: true },
      actions: [{ label: '取消' }, { label: '賣出 120 股', primary: true }],
    },
  },
  {
    code: 'ORDER_ACCEPTED',
    spec: {
      title: '賣出中',
      market: MARKET_Q,
      pill: 'YES',
      shares: '120 股',
      banner: {
        icon: 'ri-time-line',
        tone: 'warn',
        text: '賣單已送出市場，通常幾秒內完成。你可以關閉此視窗——完成後我們會通知你並更新持倉。',
      },
      rows: [{ k: '預估回收金額', v: '$87.91' }],
      actions: [{ label: '處理中…', working: true }],
    },
  },
  {
    code: 'FILLED',
    spec: {
      title: '已平倉',
      market: MARKET_Q,
      pill: 'YES',
      shares: '120 股',
      banner: { icon: 'ri-check-line', tone: 'ok', text: '已賣出全部 120 股。' },
      rows: [
        { k: '成交均價', v: '$0.7363' },
        { k: '回收金額', v: '$88.36' },
        { k: '已實現損益', v: '+$13.96', tone: 'up', strong: true },
      ],
      actions: [{ label: '完成', primary: true }],
    },
  },
  {
    code: 'PARTIALLY_FILLED',
    spec: {
      title: '部分平倉',
      market: 'SpaceX 是否在 2025 年完成 IPO?',
      pill: 'YES',
      shares: '剩餘 70 股',
      banner: {
        icon: 'ri-alert-line',
        tone: 'warn',
        text: '買家不足以吃下全部持倉。已賣出 130 股，你仍持有 70 股。',
      },
      rows: [
        { k: '已賣出', v: '130 股 @ $0.4214' },
        { k: '回收金額', v: '$54.79' },
        { k: '已實現損益', v: '+$1.49', tone: 'up', strong: true, rule: true },
        { k: '仍持有', v: '70 股' },
      ],
      actions: [{ label: '完成' }, { label: '賣出剩餘 70 股', primary: true }],
    },
  },
  {
    code: 'QUOTE_EXPIRED',
    spec: {
      title: '平倉',
      market: MARKET_Q,
      pill: 'YES',
      shares: '120 股',
      banner: {
        icon: 'ri-refresh-line',
        tone: 'neutral',
        text: '你考慮的時候價格變了，請取得最新價格後繼續。',
      },
      rows: [
        { k: '預估回收金額', v: '$87.91', dim: true },
        { k: '預估已實現損益', v: '+$13.51', tone: 'up', dim: true, strong: true },
      ],
      actions: [{ label: '取消' }, { label: '刷新價格', primary: true }],
    },
  },
  {
    code: 'INSUFFICIENT_LIQUIDITY',
    spec: {
      title: '目前無法平倉',
      market: '美國是否在 4 月加碼伊朗制裁?',
      pill: 'YES',
      shares: '40 股',
      banner: {
        icon: 'ri-close-line',
        tone: 'danger',
        text: '目前沒有人在買這個結果，暫時沒有可賣出的價格。你的持倉沒有變動，請稍後再試。',
      },
      actions: [{ label: '關閉', primary: true }],
    },
  },
];

/** 後台能力域 + 一條體例治理，卡片以「控制台模組」的語彙呈現；`n` 對應訊息檔的 card 編號 */
const adminModuleMeta = [
  { tag: 'RBAC', icon: 'ri-shield-keyhole-line', n: 1 },
  { tag: 'TREASURY', icon: 'ri-safe-2-line', n: 3 },
  { tag: 'VIEW SCOPE', icon: 'ri-eye-line', n: 4 },
];

const marketTypeMeta = [
  { icon: 'ri-toggle-line', tag: 'BINARY' },
  { icon: 'ri-list-radio', tag: 'CATEGORICAL' },
  { icon: 'ri-stack-line', tag: 'GROUPED' },
  { icon: 'ri-timer-flash-line', tag: 'UPDOWN' },
];

/** 05 — Design System 三張規則卡：每張的 footer 直接用 UI 示範自己講的規則 */
const designCardMeta = [
  {
    icon: 'ri-contrast-drop-line',
    tag: 'SURFACE',
    hue: 'rgba(255, 255, 255, 0.72)',
    border: 'rgba(255, 255, 255, 0.13)',
    gradient:
      'linear-gradient(155deg, rgba(255, 255, 255, 0.075) 0%, rgba(255, 255, 255, 0.015) 55%, rgba(255, 255, 255, 0.045) 100%)',
    glow: 'rgba(255, 255, 255, 0.05)',
  },
  {
    icon: 'ri-lock-2-line',
    tag: 'COLOR SEMANTICS',
    hue: 'rgb(110, 231, 183)',
    border: 'rgba(52, 211, 153, 0.22)',
    gradient:
      'linear-gradient(155deg, rgba(52, 211, 153, 0.12) 0%, rgba(16, 185, 129, 0.02) 55%, rgba(52, 211, 153, 0.05) 100%)',
    glow: 'rgba(52, 211, 153, 0.07)',
  },
  {
    icon: 'ri-screenshot-2-line',
    tag: 'DESIGN QA',
    hue: 'var(--color-accent)',
    border: 'rgba(0, 229, 208, 0.22)',
    gradient:
      'linear-gradient(155deg, rgba(0, 229, 208, 0.12) 0%, rgba(20, 184, 166, 0.02) 55%, rgba(0, 229, 208, 0.05) 100%)',
    glow: 'rgba(0, 229, 208, 0.07)',
  },
] as const;

function ArrowGallery({ slides }: { slides: { src?: string; caption: string }[] }) {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <div className="glass-medium overflow-hidden rounded-2xl border border-white/[0.08]">
      <div className="p-4 md:p-5">
        {slide.src ? (
          <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
            <Image
              src={slide.src}
              alt={slide.caption}
              width={SHOT_W}
              height={SHOT_H}
              className="h-auto w-full"
            />
          </div>
        ) : (
          <div
            className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-accent/20 bg-gradient-to-br from-accent/[0.08] via-white/[0.025] to-accent/[0.05]"
            style={{ aspectRatio: `${SHOT_W}/${SHOT_H}` }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,229,208,0.12),transparent_42%)]" />
            <p className="relative px-6 text-center font-[var(--font-mono)] text-[12px] uppercase tracking-[1.6px] text-text-muted">
              Image Slot — {slide.caption}
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] px-5 py-4 md:px-6">
        <p className="min-w-0 flex-1 truncate text-[13px] text-text-secondary md:text-[14px]">
          {slide.caption}
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setActive((p) => Math.max(0, p - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] text-text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent disabled:opacity-30"
            disabled={active === 0}
          >
            <i className="ri-arrow-left-s-line text-[18px]" />
          </button>
          <span className="font-[var(--font-mono)] text-[13px] tracking-[1px] text-text-muted">
            <span className="text-accent">0{active + 1}</span> / 0{slides.length}
          </span>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setActive((p) => Math.min(slides.length - 1, p + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] text-text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent disabled:opacity-30"
            disabled={active === slides.length - 1}
          >
            <i className="ri-arrow-right-s-line text-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** 七個平倉狀態的橫向 carousel：一頁露出約 2.5 張，靠左右箭頭捲動 */
function StateCarousel({ children, total }: { children: ReactNode; total: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [page, setPage] = useState(1);

  const sync = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth;
    setPage(Math.min(total, Math.round(el.scrollLeft / step) + 1));
  };

  useEffect(sync, [total]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={sync}
        className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="mt-4 flex items-center justify-end gap-3">
        <span className="font-[var(--font-mono)] text-[13px] tracking-[1px] text-text-muted">
          <span className="text-accent">{String(page).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
        </span>
        <button
          type="button"
          aria-label="上一個狀態"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent disabled:opacity-30 disabled:hover:border-white/[0.1] disabled:hover:text-text-muted"
        >
          <i aria-hidden className="ri-arrow-left-s-line text-[18px]" />
        </button>
        <button
          type="button"
          aria-label="下一個狀態"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-text-muted transition-colors duration-300 hover:border-accent/40 hover:text-accent disabled:opacity-30 disabled:hover:border-white/[0.1] disabled:hover:text-text-muted"
        >
          <i aria-hidden className="ri-arrow-right-s-line text-[18px]" />
        </button>
      </div>
    </div>
  );
}

function CaptionedImage({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
        <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
      </div>
      <figcaption className="mt-3 text-center text-[13px] text-text-muted">{caption}</figcaption>
    </figure>
  );
}

const SHOT_W = 2000;
const SHOT_H = 1250;

function PhoneShot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="flex flex-col items-center">
      <div className="w-full overflow-hidden rounded-[2rem] border-[5px] border-white/10 bg-bg-tertiary shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
        <Image src={src} alt={alt} width={900} height={1949} className="h-auto w-full" />
      </div>
      <figcaption className="mt-3 text-center text-[13px] text-text-muted">{caption}</figcaption>
    </figure>
  );
}

const typeGalleryImages = [
  { file: 'front-detail-binary.png', tag: 'BINARY' },
  { file: 'front-detail-categorical.png', tag: 'CATEGORICAL' },
  { file: 'front-detail-grouped.png', tag: 'GROUPED' },
  { file: 'front-detail-updown.png', tag: 'UPDOWN' },
];

function SubHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="mb-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[2.4px] text-accent/75">
        {label}
      </p>
      <h3 className="font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-2xl">
        {title}
      </h3>
    </div>
  );
}

function InsightCard({ label, title, body }: { label: string; title: string; body: ReactNode }) {
  return (
    <div className="glass-medium relative overflow-hidden rounded-2xl border border-accent/20 p-8 md:p-10">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-64 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      <div className="relative">
        <p className="mb-4 font-[var(--font-mono)] text-[12px] uppercase tracking-[3px] text-accent">{label}</p>
        <p className="mb-3 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-2xl">
          {title}
        </p>
        <p className="max-w-3xl text-[16px] leading-[1.7] text-text-secondary">{body}</p>
      </div>
    </div>
  );
}

function CalloutCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8">
      <h4 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">{title}</h4>
      <p className="text-[15px] leading-[1.75] text-text-secondary">{body}</p>
    </div>
  );
}

/** footer specimen：每張卡用一小段真的 UI 示範自己的規則 */
function DesignCardSpecimen({ index }: { index: number }) {
  const chip =
    'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-[var(--font-mono)] text-[11px] tracking-[0.5px]';

  if (index === 0) {
    /* 玻璃：同一塊白，三段透明度 */
    return (
      <div className="flex items-center gap-1.5">
        {[0.04, 0.09, 0.16].map((alpha) => (
          <div
            key={alpha}
            className="flex h-10 flex-1 items-center justify-center rounded-lg border border-white/[0.12]"
            style={{ background: `rgba(255,255,255,${alpha})` }}
          >
            <span className="font-[var(--font-mono)] text-[10px] tracking-[1px] text-text-muted">
              {Math.round(alpha * 100)}%
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (index === 1) {
    /* 語意：YES emerald、NO #ea4d61、金額 mono */
    return (
      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className={chip}
          style={{ color: 'rgb(52,211,153)', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.28)' }}
        >
          YES 0.74
        </span>
        <span
          className={chip}
          style={{ color: '#ea4d61', background: 'rgba(234,77,97,0.1)', border: '1px solid rgba(234,77,97,0.28)' }}
        >
          NO 0.26
        </span>
        <span className={`${chip} border border-white/[0.1] bg-white/[0.04] text-text-secondary`}>$1,204.36</span>
      </div>
    );
  }

  /* QA：三組實截環境 */
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {[
        { icon: 'ri-smartphone-line', label: 'MOBILE' },
        { icon: 'ri-macbook-line', label: 'DESKTOP' },
        { icon: 'ri-moon-line', label: 'DARK' },
      ].map(({ icon, label }) => (
        <span key={label} className={`${chip} border border-white/[0.1] bg-white/[0.04] text-text-secondary`}>
          <i aria-hidden className={`${icon} text-[13px] text-accent`} />
          {label}
        </span>
      ))}
    </div>
  );
}

function DesignSystemCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  const meta = designCardMeta[index];
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 md:p-8"
      style={{
        background: meta.gradient,
        border: `1px solid ${meta.border}`,
        boxShadow: `0 18px 56px ${meta.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-70" />
      <div
        className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full opacity-20 blur-2xl"
        style={{ background: meta.border, transform: 'translate(30%, -30%)' }}
      />

      <div className="relative mb-5 flex items-center justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ border: `1px solid ${meta.border}`, background: 'rgba(255,255,255,0.04)' }}
        >
          <i aria-hidden className={`${meta.icon} text-lg`} style={{ color: meta.hue }} />
        </span>
        <span
          className="font-[var(--font-mono)] text-[10px] uppercase tracking-[2.4px]"
          style={{ color: meta.hue, opacity: 0.85 }}
        >
          {meta.tag}
        </span>
      </div>

      <h4 className="relative mb-3 font-[var(--font-display)] text-lg font-semibold leading-snug text-text-primary">
        {title}
      </h4>
      <p className="relative flex-1 text-[15px] leading-[1.75] text-text-secondary">{body}</p>

      <div className="relative mt-6 border-t border-white/[0.08] pt-5">
        <DesignCardSpecimen index={index} />
      </div>
    </div>
  );
}

function PrincipleCard({
  tag,
  title,
  body,
  gradient,
  border,
  glow,
  hue,
}: {
  tag: string;
  title: string;
  body: string;
  gradient: string;
  border: string;
  glow: string;
  hue: string;
}) {
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 md:p-8"
      style={{
        background: gradient,
        border: `1px solid ${border}`,
        boxShadow: `0 18px 56px ${glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-70" />
      <div
        className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full opacity-20 blur-2xl"
        style={{ background: border, transform: 'translate(30%, -30%)' }}
      />

      <div className="relative flex flex-1 gap-4">
        <div className="flex flex-col items-center pt-[7px]">
          <span
            aria-hidden
            className="h-[7px] w-[7px] shrink-0 rotate-45 transition-shadow duration-500"
            style={{ border: `1px solid ${hue}`, background: `${border}` }}
          />
          <span
            aria-hidden
            className="mt-2 w-px flex-1"
            style={{ background: `linear-gradient(to bottom, ${hue}, transparent)`, opacity: 0.45 }}
          />
        </div>

        <div className="flex-1">
          <p
            className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[2.4px]"
            style={{ color: hue, opacity: 0.85 }}
          >
            {tag}
          </p>
          <h4 className="mb-3 font-[var(--font-display)] text-lg font-semibold leading-snug text-text-primary">
            {title}
          </h4>
          <p className="text-[15px] leading-[1.75] text-text-secondary">{body}</p>
        </div>
      </div>
    </div>
  );
}

const bannerTone = {
  ok: { box: 'border-emerald-400/30 bg-emerald-400/[0.06]', icon: 'text-emerald-400' },
  warn: { box: 'border-amber-400/30 bg-amber-400/[0.05]', icon: 'text-amber-400' },
  neutral: { box: 'border-fuchsia-400/25 bg-fuchsia-400/[0.05]', icon: 'text-fuchsia-400' },
  danger: { box: 'border-rose-400/30 bg-rose-400/[0.05]', icon: 'text-rose-400' },
} as const;

function MiniDialog({ spec }: { spec: DialogSpec }) {
  return (
    <div className="rounded-2xl border border-[#1d2130] bg-[#0d0f17] p-4 shadow-[0_20px_44px_-26px_rgba(0,0,0,0.95)]">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-bold text-white">{spec.title}</p>
        <i aria-hidden className="ri-close-line text-[14px] text-[#565d73]" />
      </div>

      <div className="mt-3 rounded-xl border border-[#20243a] bg-[#131624] px-3 py-2.5">
        <p className="text-[12px] font-medium leading-snug text-gray-200">{spec.market}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-[1px] font-[var(--font-mono)] text-[9px] font-bold tracking-[0.5px] text-emerald-400">
            {spec.pill}
          </span>
          <span className="font-[var(--font-mono)] text-[10px] text-[#8a90a3]">{spec.shares}</span>
        </div>
      </div>

      {spec.banner && (
        <div className={`mt-3 flex gap-2 rounded-xl border px-3 py-2.5 ${bannerTone[spec.banner.tone].box}`}>
          <i
            aria-hidden
            className={`${spec.banner.icon} mt-[1px] text-[11px] ${bannerTone[spec.banner.tone].icon}`}
          />
          <p className="text-[11px] leading-[1.6] text-gray-300">{spec.banner.text}</p>
        </div>
      )}

      {spec.rows && (
        <div className="mt-3 flex flex-col gap-2">
          {spec.rows.map((row) => (
            <div key={row.k}>
              <div className={`flex items-baseline justify-between gap-3 ${row.dim ? 'opacity-40' : ''}`}>
                <span className={`text-[11px] text-[#8a90a3] ${row.strong ? 'font-semibold text-gray-300' : ''}`}>
                  {row.k}
                </span>
                <span
                  className={`font-[var(--font-mono)] text-[12px] ${row.strong ? 'font-bold' : ''} ${
                    row.tone === 'up' ? 'text-emerald-400' : 'text-gray-100'
                  }`}
                >
                  {row.v}
                </span>
              </div>
              {row.rule && <div className="mt-2 w-full border-t border-dashed border-white/10" />}
            </div>
          ))}
        </div>
      )}

      {spec.foot && <p className="mt-3 text-[10px] leading-[1.6] text-[#6b7186]">{spec.foot}</p>}

      {spec.expiry && (
        <div className="mt-3">
          <div
            className={`mb-1.5 flex items-baseline justify-between text-[10px] ${
              spec.expiry.warn ? 'text-amber-400' : 'text-[#8a90a3]'
            }`}
          >
            <span>{spec.expiry.label}</span>
            <span className="font-[var(--font-mono)]">{spec.expiry.time}</span>
          </div>
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className={`h-full rounded-full ${spec.expiry.warn ? 'bg-amber-400' : 'bg-gray-300/80'}`}
              style={{ width: `${spec.expiry.pct}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {spec.actions.map((action) => (
          <span
            key={action.label}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-semibold ${
              action.primary
                ? 'bg-[linear-gradient(135deg,#5b5fe8,#8a8df8)] text-white'
                : action.working
                  ? 'border border-[#262b3a] bg-[#161927] text-[#8a90a3]'
                  : 'border border-[#2a2e3f] bg-[#161927] text-gray-200'
            }`}
          >
            {action.working && (
              <i aria-hidden className="ri-loader-4-line animate-spin text-[12px] motion-reduce:animate-none" />
            )}
            {action.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ModuleCard({ tag, icon, title, body }: { tag: string; icon: string; title: string; body: string }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101010]/90 p-6 backdrop-blur-xl transition-colors duration-500 hover:border-accent/25 md:p-8">
      {/* 角落框線：控制台模組的識別記號 */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-accent/30 transition-colors duration-500 group-hover:border-accent/70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-accent/30 transition-colors duration-500 group-hover:border-accent/70"
      />

      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.07] text-accent transition-colors duration-500 group-hover:border-accent/45">
          <i aria-hidden className={`${icon} text-[17px]`} />
        </span>
        <span className="shrink-0 font-[var(--font-mono)] text-[11px] uppercase tracking-[2.4px] text-accent/75">
          {tag}
        </span>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-white/[0.12] to-transparent" />
      </div>

      <h4 className="mb-3 font-[var(--font-display)] text-lg font-semibold leading-snug text-text-primary">{title}</h4>
      <p className="text-[15px] leading-[1.75] text-text-secondary">{body}</p>
    </div>
  );
}

function CloseStateCard({
  index,
  code,
  title,
  note,
  spec,
}: {
  index: number;
  code: string;
  title: string;
  note: string;
  spec: DialogSpec;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#111111]/90 p-5 backdrop-blur-xl">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="font-[var(--font-mono)] text-[11px] font-semibold text-accent">
          {String(index).padStart(2, '0')}
        </span>
        <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[1.6px] text-text-muted">{code}</span>
      </div>
      <h4 className="mb-2 font-[var(--font-display)] text-[15px] font-semibold text-text-primary">{title}</h4>
      <p className="mb-4 text-[13px] leading-[1.7] text-text-secondary">{note}</p>
      <div>
        <MiniDialog spec={spec} />
      </div>
    </div>
  );
}

function StepCard({
  index,
  icon,
  tag,
  title,
  body,
}: {
  index: number;
  icon: string;
  tag: string;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_24px_60px_-16px_rgba(0,229,208,0.18)] md:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/50 via-accent/10 to-transparent" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent/[0.06] blur-3xl transition-colors duration-700 group-hover:bg-accent/[0.14]" />

      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-5 select-none font-[var(--font-display)] text-[88px] font-bold leading-none tracking-tight text-transparent transition-transform duration-700 group-hover:-translate-y-1 md:text-[104px]"
        style={{ WebkitTextStroke: '1.5px rgba(0,229,208,0.16)' }}
      >
        0{index}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-5 select-none bg-gradient-to-b from-accent/40 to-transparent bg-clip-text font-[var(--font-display)] text-[88px] font-bold leading-none tracking-tight text-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:text-[104px]"
      >
        0{index}
      </span>

      <div className="relative mb-6 flex items-center gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors duration-500 group-hover:border-accent/45 group-hover:bg-accent/15">
          <i className={`${icon} text-[20px]`} />
        </div>
        <span className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[2.4px] text-accent/75">
          {tag}
        </span>
      </div>

      <h3 className="relative mb-3 pr-14 font-[var(--font-display)] text-lg font-semibold leading-snug text-text-primary md:text-xl">
        {title}
      </h3>
      <p className="relative flex-1 text-[15px] leading-[1.75] text-text-secondary">{body}</p>
    </div>
  );
}

function DataTable({
  title,
  columns,
  rows,
  firstColAccent = false,
}: {
  title?: string;
  columns: string[];
  rows: string[][];
  firstColAccent?: boolean;
}) {
  return (
    <div className="glass-medium overflow-hidden rounded-2xl border border-white/[0.08]">
      {title && (
        <div className="border-b border-white/[0.08] px-6 py-5 md:px-8">
          <h4 className="font-[var(--font-display)] text-lg font-semibold text-text-primary md:text-xl">
            {title}
          </h4>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-[14px] md:text-[15px]">
          <thead>
            <tr className="border-b border-white/[0.08]">
              {columns.map((col) => (
                <th key={col} className="px-4 py-4 text-left font-medium text-text-muted md:px-6">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.05] last:border-b-0">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-5 align-top md:px-6 ${
                      j === 0
                        ? firstColAccent
                          ? 'whitespace-nowrap font-medium text-accent'
                          : 'font-medium text-text-primary'
                        : 'text-text-secondary'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const SECTION = 'mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12';

export default function PredictionMarketClient() {
  const { prev: prevProject, next: nextProject } = useProjectNav(CURRENT_ID);
  const t = useTranslations('caseStudy.predictionMarket');
  const tp = useTranslations('projectsPage');
  const uiSectionRef = useRef<HTMLElement | null>(null);
  const uiViewportRef = useRef<HTMLDivElement | null>(null);
  const uiTrackRef = useRef<HTMLDivElement | null>(null);
  const [uiMaxX, setUiMaxX] = useState(0);
  const [uiScrollDistance, setUiScrollDistance] = useState(0);
  const { scrollYProgress: uiScrollProgress } = useScroll({
    target: uiSectionRef,
    offset: ['start start', 'end end'],
  });
  const uiX = useTransform(uiScrollProgress, [0, 1], [0, -uiMaxX]);

  useEffect(() => {
    const measureGallery = () => {
      const viewport = uiViewportRef.current;
      const track = uiTrackRef.current;
      if (!viewport || !track) return;

      const viewportStyle = window.getComputedStyle(viewport);
      const viewportPaddingX =
        parseFloat(viewportStyle.paddingLeft) + parseFloat(viewportStyle.paddingRight);
      const viewportContentWidth = viewport.clientWidth - viewportPaddingX;
      const maxX = Math.max(0, track.scrollWidth - viewportContentWidth);
      setUiMaxX(maxX);
      setUiScrollDistance(maxX + window.innerHeight);
    };

    measureGallery();

    const resizeObserver = new ResizeObserver(measureGallery);
    if (uiViewportRef.current) resizeObserver.observe(uiViewportRef.current);
    if (uiTrackRef.current) resizeObserver.observe(uiTrackRef.current);
    window.addEventListener('resize', measureGallery);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureGallery);
    };
  }, []);

  return (
    <>
      {/* Back Navigation */}
      <motion.div
        className="sticky top-0 z-50 glass-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className={`${SECTION} py-4`}>
          <Link
            href="/work"
            className="text-sm text-text-muted transition-colors duration-300 hover:text-text-primary"
          >
            <i className="ri-arrow-left-line mr-1 text-accent" /> {t('backToProjects')}
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
            src="/images/projects/prediction-market-cover.jpg"
            alt={t('hero.title')}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-bg-primary/20" />
        <div className="relative z-10 mx-auto w-full max-w-[var(--cs-wide-max-width)]">
          <motion.span
            className="mb-4 block font-[var(--font-mono)] text-[14px] uppercase tracking-[3px] text-accent"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.label')}
          </motion.span>
          <motion.h1
            className="mb-3 max-w-4xl whitespace-pre-line font-[var(--font-display)] text-[32px] font-bold leading-[1.18] text-text-primary md:text-[52px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            className="max-w-2xl text-base text-text-secondary md:text-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Highlight Metrics Strip */}
      <ScrollReveal className={`${SECTION} mt-20 mb-5`}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="relative overflow-hidden rounded-2xl p-8 text-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0, 229, 208, 0.08) 0%, rgba(0, 229, 208, 0.02) 100%)',
                border: '1px solid rgba(0, 229, 208, 0.15)',
                boxShadow: '0 4px 24px rgba(0, 229, 208, 0.06)',
              }}
            >
              <span className="mb-3 block font-[var(--font-mono)] text-xl font-bold text-accent md:text-2xl">
                {t(`highlightMetrics.m${n}Value`)}
              </span>
              <p className="text-[14px] leading-[1.6] text-text-secondary">{t(`highlightMetrics.m${n}Label`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Project Summary Card */}
      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-8 md:p-10">
          <p className="mb-6 font-[var(--font-mono)] text-xs uppercase tracking-[2px] text-accent">
            {t('summary.label')}
          </p>
          <h2 className="mb-5 font-[var(--font-display)] text-xl font-semibold leading-snug text-text-primary md:text-2xl">
            {t('summary.heading')}
          </h2>
          <p className="mb-8 text-[16px] leading-[1.7] text-text-secondary">
            {t.rich('summary.body', { highlight })}
          </p>
          <div className="mb-6 border-t border-white/[0.08]" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 font-[var(--font-mono)] text-[12px] uppercase tracking-[2px] text-text-muted">
                {t('summary.roleLabel')}
              </p>
              <p className="text-[16px] font-medium text-text-secondary">{t('summary.roleValue')}</p>
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

      {/* 01 — Context */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="01 — CONTEXT" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('context.heading')}
        </h2>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="glass-medium rounded-2xl p-8 md:p-10">
          <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-[3px] text-accent">
            {t('context.chainLabel')}
          </p>
          <h3 className="mb-8 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-2xl">
            {t('context.chainTitle')}
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="relative rounded-xl border border-accent/15 bg-accent/[0.04] p-5"
              >
                <span className="mb-3 block font-[var(--font-mono)] text-2xl font-bold text-accent/30">
                  0{n}
                </span>
                <p className="mb-1.5 font-[var(--font-display)] text-[15px] font-semibold leading-snug text-text-primary">
                  {t(`context.chain${n}Title`)}
                </p>
                <p className="text-[13px] leading-[1.6] text-text-muted">{t(`context.chain${n}Sub`)}</p>
                {n < 5 && (
                  <i
                    aria-hidden
                    className="ri-arrow-right-line absolute -right-[14px] top-1/2 z-10 hidden -translate-y-1/2 text-lg text-accent/50 md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className={`${SECTION} mb-8`}>
        <VideoEmbed videoId="J6USuZNWh2U" width="wide" padded={false} caption={t('context.imageCaption')} />
      </div>

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <InsightCard
          label={t('context.gapLabel')}
          title={t('context.gapTitle')}
          body={t.rich('context.gapBody', { highlight })}
        />
      </ScrollReveal>

      {/* 02 — Spec System */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="02 — SPEC SYSTEM" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('spec.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('spec.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <StepCard
              key={n}
              index={n}
              icon={specStepMeta[n - 1].icon}
              tag={`LAYER 0${n} · ${specStepMeta[n - 1].tag}`}
              title={t(`spec.step${n}Title`)}
              body={t(`spec.step${n}Body`)}
            />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <InsightCard
          label={t('spec.insightLabel')}
          title={t('spec.insightTitle')}
          body={t.rich('spec.insightBody', { highlight })}
        />
      </ScrollReveal>

      {/* 03 — AI Workflow */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="03 — AI WORKFLOW" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('workflow.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('workflow.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {principleMeta.map((p, i) => (
            <PrincipleCard
              key={p.tag}
              tag={p.tag}
              gradient={p.gradient}
              border={p.border}
              glow={p.glow}
              hue={p.hue}
              title={t(`workflow.principle${i + 1}Title`)}
              body={t(`workflow.principle${i + 1}Body`)}
            />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agentMeta.map((agent, i) => (
            <div
              key={agent.name}
              className="glass-medium flex h-full flex-col rounded-2xl border border-white/[0.08] p-6 md:p-7"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                  <i className={`${agent.icon} text-[18px]`} />
                </div>
                <div>
                  <p className="font-[var(--font-mono)] text-[13px] font-semibold text-accent">{agent.name}</p>
                  <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.6px] text-text-muted">
                    {t(`workflow.agent${i + 1}Role`)}
                  </p>
                </div>
              </div>
              <p className="flex-1 text-[14px] leading-[1.7] text-text-secondary">
                {t(`workflow.agent${i + 1}Duty`)}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* 04 — Trading Front Design */}
      <ScrollReveal className={`${SECTION} mb-12`}>
        <SectionLabel label="04 — TRADING FRONT DESIGN" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('front.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary">{t('front.body')}</p>
      </ScrollReveal>

      {/* 4a — Detail page architecture */}
      <ScrollReveal className={`${SECTION} mb-8 mt-16`}>
        <SubHeading label="4A — DETAIL PAGE ARCHITECTURE" title={t('front.subBTitle')} />
        <p className="mb-8 text-[16px] leading-[1.75] text-text-secondary">{t('front.subBBody')}</p>
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <StepCard
              key={n}
              index={n}
              icon={marketTypeMeta[n - 1].icon}
              tag={marketTypeMeta[n - 1].tag}
              title={t(`front.type${n}Title`)}
              body={t(`front.type${n}Body`)}
            />
          ))}
        </div>
      </ScrollReveal>

      {/* Market type shots — scroll-driven horizontal gallery */}
      <section
        ref={uiSectionRef}
        className="relative mb-8"
        style={{ height: uiScrollDistance ? `${uiScrollDistance}px` : '180vh' }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="w-full">
            <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
              <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h3 className="font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-2xl">
                  {t('front.subBTitle')}
                </h3>
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[1.5px] text-text-muted">
                  Scroll to explore
                </p>
              </div>
            </div>

            <div ref={uiViewportRef} className="mx-auto max-w-[var(--cs-wide-max-width)] overflow-hidden px-6 md:px-12">
              <motion.div ref={uiTrackRef} className="flex gap-8 pr-[28vw]" style={{ x: uiX }}>
                {typeGalleryImages.map(({ file, tag }, index) => (
                  <div
                    key={file}
                    className="w-[72vw] max-w-[860px] flex-none overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                  >
                    <Image
                      src={`${IMG}/${file}`}
                      alt={t(`front.typeImg${index + 1}Caption`)}
                      width={SHOT_W}
                      height={SHOT_H}
                      className="h-auto w-full"
                      sizes="(max-width: 768px) 72vw, 860px"
                    />
                    <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
                      <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.5px] text-accent">
                        {tag}
                      </span>
                      <span className="font-[var(--font-mono)] text-[11px] text-text-muted">
                        {String(index + 1).padStart(2, '0')} / {String(typeGalleryImages.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4b — Order UX */}
      <ScrollReveal className={`${SECTION} mb-8 mt-28`}>
        <SubHeading label="4B — ORDER EXPERIENCE" title={t('front.subCTitle')} />
        <p className="mb-8 text-[16px] leading-[1.75] text-text-secondary">{t('front.subCBody')}</p>
        <div className="mb-6">
          <DataTable
            title={t('front.benchTitle')}
            columns={[t('front.benchColPlatform'), t('front.benchColAdopt'), t('front.benchColReject')]}
            rows={[1, 2, 3, 4].map((n) => [
              t(`front.bench${n}Platform`),
              t(`front.bench${n}Adopt`),
              t(`front.bench${n}Reject`),
            ])}
            firstColAccent
          />
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <PhoneShot
            src={`${IMG}/mobile-order-sheet.png`}
            alt={t('front.orderImg2Caption')}
            caption={t('front.orderImg2Caption')}
          />
          <PhoneShot
            src={`${IMG}/mobile-order-review.png`}
            alt={t('front.orderImg3Caption')}
            caption={t('front.orderImg3Caption')}
          />
          <PhoneShot
            src={`${IMG}/mobile-order-success.png`}
            alt={t('front.orderImg4Caption')}
            caption={t('front.orderImg4Caption')}
          />
        </div>
      </ScrollReveal>

      {/* 4c — Close position */}
      <ScrollReveal className={`${SECTION} mb-8 mt-28`}>
        <SubHeading label="4C — CLOSE POSITION" title={t('front.subDTitle')} />
        <p className="mb-8 text-[16px] leading-[1.75] text-text-secondary">{t('front.subDBody')}</p>
        <div className="mb-6">
          <p className="mb-2 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            {t('front.statesTitle')}
          </p>
          <p className="mb-6 text-[15px] leading-[1.75] text-text-secondary">{t('front.statesNote')}</p>
          <StateCarousel total={closeStates.length}>
            {closeStates.map((state, i) => (
              <div
                key={state.code}
                className="w-[86%] shrink-0 snap-start sm:w-[48%] lg:w-[calc((100%-2.5rem)/2.5)]"
              >
                <CloseStateCard
                  index={i + 1}
                  code={state.code}
                  title={t(`front.s${i + 1}Title`)}
                  note={t(`front.s${i + 1}Note`)}
                  spec={state.spec}
                />
              </div>
            ))}
          </StateCarousel>
        </div>
      </ScrollReveal>

      {/* 4d — Portfolio */}
      <ScrollReveal className={`${SECTION} mb-8 mt-28`}>
        <SubHeading label="4D — PORTFOLIO" title={t('front.subETitle')} />
        <p className="mb-8 text-[16px] leading-[1.75] text-text-secondary">{t('front.subEBody')}</p>
        <ArrowGallery
          slides={[
            { src: `${IMG}/front-portfolio.png`, caption: t('front.portfolioImgCaption') },
            { src: `${IMG}/front-portfolio-positions.png`, caption: t('front.portfolioImg2Caption') },
            { src: `${IMG}/front-portfolio-orders.png`, caption: t('front.portfolioImg3Caption') },
            { src: `${IMG}/front-portfolio-activity.png`, caption: t('front.portfolioImg4Caption') },
          ]}
        />
      </ScrollReveal>

      {/* 4e — Sitewide floor */}
      <ScrollReveal className={`${SECTION} mb-8 mt-28`}>
        <SubHeading label="4E — SITEWIDE FOUNDATIONS" title={t('front.subFTitle')} />
        <p className="mb-8 text-[16px] leading-[1.75] text-text-secondary">{t('front.subFBody')}</p>
        <div className="mb-8">
          <DataTable
            columns={[t('front.fColArea'), t('front.fColDecision'), t('front.fColTradeoff')]}
            rows={[2, 3, 4].map((n) => [
              t(`front.fRow${n}Area`),
              t(`front.fRow${n}Decision`),
              t(`front.fRow${n}Tradeoff`),
            ])}
            firstColAccent
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CaptionedImage
            src={`${IMG}/front-wallet-deposit.png`}
            alt={t('front.walletImgCaption')}
            caption={t('front.walletImgCaption')}
            width={SHOT_W}
            height={SHOT_H}
          />
          <CaptionedImage
            src={`${IMG}/front-leaderboard.png`}
            alt={t('front.leaderboardImgCaption')}
            caption={t('front.leaderboardImgCaption')}
            width={SHOT_W}
            height={SHOT_H}
          />
        </div>
      </ScrollReveal>

      {/* RWD phone strip */}
      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)] mt-16`}>
        <SubHeading label="4F — RESPONSIVE" title={t('front.rwdTitle')} />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <PhoneShot
            src={`${IMG}/mobile-home.png`}
            alt={t('front.rwdPhone1Caption')}
            caption={t('front.rwdPhone1Caption')}
          />
          <PhoneShot
            src={`${IMG}/mobile-portfolio.png`}
            alt={t('front.rwdPhone2Caption')}
            caption={t('front.rwdPhone2Caption')}
          />
          <PhoneShot
            src={`${IMG}/mobile-wallet-deposit.png`}
            alt={t('front.rwdPhone3Caption')}
            caption={t('front.rwdPhone3Caption')}
          />
        </div>
      </ScrollReveal>

      {/* 05 — Design System */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="05 — DESIGN SYSTEM" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('design.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('design.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <DesignSystemCard key={n} index={n - 1} title={t(`design.card${n}Title`)} body={t(`design.card${n}Body`)} />
          ))}
        </div>
      </ScrollReveal>

      <div className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <VideoEmbed videoId="APXhAmcMlHU" width="wide" padded={false} caption={t('design.imageLabel')} />
      </div>

      {/* 06 — Admin Console */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="06 — ADMIN CONSOLE" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('admin.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('admin.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {adminModuleMeta.map((m) => (
            <ModuleCard
              key={m.tag}
              tag={m.tag}
              icon={m.icon}
              title={t(`admin.card${m.n}Title`)}
              body={t(`admin.card${m.n}Body`)}
            />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <ModuleCard
          tag="CONSISTENCY"
          icon="ri-ruler-line"
          title={t('admin.styleTitle')}
          body={t('admin.styleBody')}
        />
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <CaptionedImage
          src={`${IMG}/admin-overview.png`}
          alt={t('admin.image1Caption')}
          caption={t('admin.image1Caption')}
          width={3024}
          height={1718}
        />
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <CaptionedImage
          src={`${IMG}/admin-login.png`}
          alt={t('admin.image2Caption')}
          caption={t('admin.image2Caption')}
          width={1440}
          height={1000}
        />
      </ScrollReveal>

      {/* 07 — Impact & Scope */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="07 — IMPACT & SCOPE" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('impact.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('impact.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[2, 3, 4].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 text-center">
              <span className="mb-2 block font-[var(--font-mono)] text-3xl font-bold text-accent md:text-4xl">
                {t(`impact.metric${n}Value`)}
              </span>
              <p className="text-[13px] leading-[1.5] text-text-muted">{t(`impact.metric${n}Label`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <DataTable
          columns={[t('impact.tableColDim'), t('impact.tableColValue')]}
          rows={[1, 2, 3, 4, 5, 6, 7, 8].map((n) => [t(`impact.r${n}Label`), t(`impact.r${n}Value`)])}
        />
      </ScrollReveal>

      {/* 08 — Reflection */}
      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <SectionLabel label="08 — REFLECTION" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('reflection.heading')}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="glass-medium rounded-2xl p-6 transition-colors duration-300 hover:border-white/[0.15] md:p-8"
            >
              <span className="mb-4 block font-[var(--font-mono)] text-5xl font-bold text-accent/30">
                {String(n).padStart(2, '0')}
              </span>
              <h3 className="mb-2 font-[var(--font-display)] text-lg font-semibold text-text-primary">
                {t(`reflection.card${n}.title`)}
              </h3>
              <p className="text-[16px] leading-[1.7] text-text-secondary">
                {t.rich(`reflection.card${n}.body`, { highlight })}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Prev / Next Project Nav */}
      <ScrollReveal className={`${SECTION} mb-12`}>
        <div className="glass-medium grid grid-cols-2 rounded-2xl border border-white/[0.08]">
          <Link
            href={prevProject.link}
            className="group border-r border-white/[0.08] px-6 py-10 md:px-10 md:py-12"
          >
            <span className="mb-3 flex items-center gap-1.5 font-[var(--font-mono)] text-[12px] uppercase tracking-[2px] text-text-muted transition-colors duration-300 group-hover:text-accent">
              <i className="ri-arrow-left-s-line text-sm" />
              {t('projectNav.prev')}
            </span>
            <p className="text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent md:text-xl">
              {tp(`cards.${prevProject.id}.title`)}
            </p>
          </Link>
          <Link href={nextProject.link} className="group px-6 py-10 text-right md:px-10 md:py-12">
            <span className="mb-3 flex items-center justify-end gap-1.5 font-[var(--font-mono)] text-[12px] uppercase tracking-[2px] text-text-muted transition-colors duration-300 group-hover:text-accent">
              {t('projectNav.next')}
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
