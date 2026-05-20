import { setRequestLocale } from 'next-intl/server';
import SectionLabel from '@/components/ui/SectionLabel';
import GlowButton from '@/components/ui/GlowButton';

export const metadata = {
  title: 'Design System — Dev Only',
  robots: { index: false, follow: false },
};

export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative pt-32 pb-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <DSHeader />

        <DSSection id="colors" title="01 — Colors" desc="所有 color tokens 在 globals.css 定義。新元件一律使用 token，不寫死 hex。">
          <ColorSwatchGroup />
        </DSSection>

        <DSSection id="glass" title="02 — Glassmorphism" desc="三層級對照。背後放彩色 blob 才能看出透明度差異。不自創新層級。">
          <GlassDemo />
        </DSSection>

        <DSSection id="typography" title="03 — Typography" desc="Display: Space Grotesk · Body: Inter · Mono: JetBrains Mono">
          <TypographyDemo />
        </DSSection>

        <DSSection id="spacing" title="04 — Spacing & Radius" desc="標準 spacing tokens、card border radius。">
          <SpacingDemo />
        </DSSection>

        <DSSection id="animation" title="05 — Animation" desc="統一使用 --ease-out-expo。Hover 上方卡片觀察曲線。">
          <AnimationDemo />
        </DSSection>

        <DSSection id="components" title="06 — Components" desc="實際 component 與 case-study 風格樣板。">
          <ComponentDemos />
        </DSSection>

        <DSSection id="states" title="07 — States" desc="Hover / active / focus / disabled 對照。">
          <StatesDemo />
        </DSSection>
      </div>
    </div>
  );
}

// ============================================================================
// Header
// ============================================================================

function DSHeader() {
  return (
    <header className="mb-24">
      <p className="font-[var(--font-mono)] text-[12px] text-text-muted uppercase tracking-[3px] mb-4">
        Dev Only · Not Linked from Nav
      </p>
      <h1 className="font-[var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-bold text-text-primary mb-4 leading-tight">
        Design System
      </h1>
      <p className="text-[17px] leading-[1.7] text-text-secondary max-w-2xl">
        Single-page visual reference. Source of truth: <code className="text-accent font-mono text-[14px]">globals.css</code> + <code className="text-accent font-mono text-[14px]">design-system.md</code>.
      </p>
      <nav className="mt-8 flex flex-wrap gap-3">
        {[
          ['Colors', 'colors'],
          ['Glass', 'glass'],
          ['Typography', 'typography'],
          ['Spacing', 'spacing'],
          ['Animation', 'animation'],
          ['Components', 'components'],
          ['States', 'states'],
        ].map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className="glass-light px-4 py-2 rounded-full text-[13px] font-mono text-text-secondary hover:text-accent transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

// ============================================================================
// Generic Section wrapper
// ============================================================================

function DSSection({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-32 scroll-mt-32">
      <SectionLabel label={title} />
      <p className="text-[15px] leading-[1.7] text-text-secondary mb-10 max-w-2xl">{desc}</p>
      {children}
    </section>
  );
}

// ============================================================================
// 01 — Colors
// ============================================================================

function ColorSwatchGroup() {
  const groups: { label: string; items: { token: string; value: string; usage?: string }[] }[] = [
    {
      label: 'Background',
      items: [
        { token: '--color-bg-primary', value: '#0A0A0A', usage: '主背景' },
        { token: '--color-bg-secondary', value: '#111111', usage: '卡片底' },
        { token: '--color-bg-tertiary', value: '#1A1A1A', usage: 'hover / placeholder' },
      ],
    },
    {
      label: 'Text',
      items: [
        { token: '--color-text-primary', value: '#FFFFFF', usage: '標題' },
        { token: '--color-text-secondary', value: '#BBBBBB', usage: '正文' },
        { token: '--color-text-muted', value: '#888888', usage: '標籤 / caption' },
      ],
    },
    {
      label: 'Accent',
      items: [
        { token: '--color-accent', value: '#00E5D0', usage: '主色 / highlight' },
        { token: '--color-accent-light', value: '#33FFE5', usage: 'hover 亮色' },
        { token: '--color-accent-orange', value: '#FF6B2C', usage: 'indicator dot' },
      ],
    },
    {
      label: 'Border',
      items: [{ token: '--color-border', value: '#222222', usage: '分隔線' }],
    },
    {
      label: 'State (Tailwind)',
      items: [
        { token: 'text-green-400 / bg-green-500/10', value: '#4ade80', usage: '正面 / 成功' },
        { token: 'text-red-400 / bg-red-500/10', value: '#f87171', usage: '負面 / 警告' },
        { token: 'border-l-amber-400', value: '#fbbf24', usage: '警示邊框' },
      ],
    },
  ];

  return (
    <div className="space-y-12">
      {groups.map((g) => (
        <div key={g.label}>
          <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-4">{g.label}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {g.items.map((item) => (
              <div
                key={item.token}
                className="glass-medium rounded-2xl overflow-hidden"
              >
                <div className="h-20 w-full" style={{ backgroundColor: item.value }} />
                <div className="p-4">
                  <p className="font-mono text-[13px] text-text-primary mb-1 break-all">{item.token}</p>
                  <p className="font-mono text-[12px] text-accent mb-2">{item.value}</p>
                  {item.usage && (
                    <p className="text-[12px] text-text-muted">{item.usage}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 02 — Glassmorphism
// ============================================================================

function GlassDemo() {
  const levels: { className: 'glass-light' | 'glass-medium' | 'glass-heavy'; label: string; usage: string }[] = [
    { className: 'glass-light', label: 'glass-light', usage: 'Navbar · Marquee · Tags · Back Nav' },
    { className: 'glass-medium', label: 'glass-medium', usage: 'Project Cards · Summary Cards · Tables · Insight' },
    { className: 'glass-heavy', label: 'glass-heavy', usage: 'Modal · Mobile Menu · Overlay' },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,229,208,0.5), transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,107,44,0.4), transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.45), transparent 70%)', filter: 'blur(45px)' }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        {levels.map((l) => (
          <div key={l.className} className={`${l.className} rounded-2xl p-6`}>
            <p className="font-mono text-[12px] text-accent uppercase tracking-[2px] mb-3">.{l.label}</p>
            <p className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-2">範例文字</p>
            <p className="text-[13px] text-text-secondary leading-[1.6]">{l.usage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 03 — Typography
// ============================================================================

function TypographyDemo() {
  return (
    <div className="space-y-10">
      {/* Display */}
      <div className="glass-medium rounded-2xl p-8 space-y-6">
        <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px]">Display · Space Grotesk</p>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">H1 · clamp(2.5rem, 5vw, 4rem) · 700</p>
          <h1 className="font-[var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight">Page Title</h1>
        </div>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">H2 · 32px / 24px · 600</p>
          <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold">Section Heading</h2>
        </div>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">H3 · 24px / 20px · 600</p>
          <h3 className="font-[var(--font-display)] text-xl md:text-2xl font-semibold">Sub-heading</h3>
        </div>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">Pull Quote · 26px / 20px · 600 · leading-snug</p>
          <p className="font-[var(--font-display)] text-xl md:text-[26px] font-semibold leading-snug">設計的價值在於讓複雜變得簡單。</p>
        </div>
      </div>

      {/* Body */}
      <div className="glass-medium rounded-2xl p-8 space-y-6">
        <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px]">Body · Inter</p>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">Body · 17px · 400 · line-height 1.7</p>
          <p className="text-[17px] leading-[1.7] text-text-secondary max-w-2xl">這是一段標準正文，使用 Inter 字型。文字內容會有 <span className="text-accent">accent 高亮</span>，不加粗。行高 1.7 保持閱讀舒適度。</p>
        </div>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">Card Body · 15px · 400 · line-height 1.7</p>
          <p className="text-[15px] leading-[1.7] text-text-secondary max-w-2xl">卡片內文字，比正文略小。</p>
        </div>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">Caption · 13px · text-muted</p>
          <p className="text-[13px] text-text-muted">圖片說明、附註用</p>
        </div>
      </div>

      {/* Mono */}
      <div className="glass-medium rounded-2xl p-8 space-y-6">
        <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px]">Mono · JetBrains Mono</p>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">Section Label · 14px · accent · uppercase · tracking 2px</p>
          <span className="font-mono text-[14px] text-accent uppercase tracking-[2px]">01 — Section Name</span>
        </div>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">Mono Large Number · 48px / 40px · 700</p>
          <span className="font-mono text-4xl md:text-5xl font-bold text-accent">87%</span>
        </div>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">Mono Metric · 24px / 20px · 700</p>
          <span className="font-mono text-xl md:text-2xl font-bold text-accent">6 → 3</span>
        </div>
        <div>
          <p className="font-mono text-[11px] text-accent mb-1">Metadata Label · 11px · text-muted · uppercase · tracking 2px</p>
          <span className="font-mono text-[11px] text-text-muted uppercase tracking-[2px]">SCOPE</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 04 — Spacing & Radius
// ============================================================================

function SpacingDemo() {
  const spacing = [
    { token: '--section-padding-y', value: '120px' },
    { token: '--section-padding-x', value: '64px (tablet 32 / mobile 20)' },
    { token: '--card-gap', value: '24px (tablet 20 / mobile 16)' },
    { token: '--cs-section-gap', value: '160px (mobile 80)' },
    { token: '--cs-text-gap', value: '32px' },
  ];
  const radius = [
    { label: 'rounded-xl', value: '12px' },
    { label: 'rounded-2xl', value: '16px' },
    { label: 'rounded-[32px]', value: '32px (project card)' },
    { label: 'rounded-full', value: 'pill (tags)' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-medium rounded-2xl p-6">
        <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-4">Spacing Tokens</p>
        <ul className="space-y-3">
          {spacing.map((s) => (
            <li key={s.token} className="flex justify-between items-center text-[14px] border-b border-white/[0.05] pb-2 last:border-b-0">
              <span className="font-mono text-text-primary">{s.token}</span>
              <span className="font-mono text-accent">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass-medium rounded-2xl p-6">
        <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-4">Border Radius</p>
        <div className="grid grid-cols-2 gap-4">
          {radius.map((r) => (
            <div key={r.label} className="text-center">
              <div
                className="w-full aspect-square bg-accent/20 border border-accent/40 mb-2"
                style={{ borderRadius: r.value.startsWith('pill') ? '999px' : r.value.match(/(\d+)px/)?.[1] + 'px' }}
              />
              <p className="font-mono text-[12px] text-text-primary">{r.label}</p>
              <p className="font-mono text-[11px] text-text-muted">{r.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 05 — Animation
// ============================================================================

function AnimationDemo() {
  const easings = [
    { token: '--ease-out-expo', value: 'cubic-bezier(0.16, 1, 0.3, 1)', use: '預設進場 / hover' },
    { token: '--ease-out-quart', value: 'cubic-bezier(0.25, 1, 0.5, 1)', use: '次選 easing' },
    { token: '--ease-curtain', value: 'cubic-bezier(0.76, 0, 0.24, 1)', use: 'Splash 布幕退場' },
  ];
  const durations = [
    { token: '--duration-fast', value: '0.3s' },
    { token: '--duration-normal', value: '0.6s' },
    { token: '--duration-slow', value: '1.0s' },
  ];

  return (
    <div className="space-y-10">
      {/* Hover Demos */}
      <div>
        <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-4">Hover the cards</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-medium rounded-2xl p-6 cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-white/[0.14] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <p className="font-mono text-[11px] text-accent uppercase tracking-[2px] mb-2">Card Lift</p>
            <p className="text-[14px] text-text-secondary">translateY(-6px) · 0.4s · expo.out</p>
          </div>
          <div className="glass-medium rounded-2xl p-6 cursor-pointer overflow-hidden group">
            <p className="font-mono text-[11px] text-accent uppercase tracking-[2px] mb-2">Image Zoom</p>
            <div className="w-full h-24 rounded-xl bg-gradient-to-br from-accent/30 to-accent/5 overflow-hidden">
              <div className="w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] bg-[radial-gradient(circle_at_30%_40%,rgba(0,229,208,0.5),transparent_60%)]" />
            </div>
            <p className="text-[12px] text-text-muted mt-2">scale(1.04) · 0.5s · expo.out</p>
          </div>
          <div className="glass-medium rounded-2xl p-6 cursor-pointer transition-colors duration-300 hover:border-accent/40 group">
            <p className="font-mono text-[11px] text-accent uppercase tracking-[2px] mb-2">Border Glow</p>
            <p className="text-[14px] text-text-secondary group-hover:text-accent transition-colors duration-300">Text → accent on hover</p>
          </div>
        </div>
      </div>

      {/* Easing table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-medium rounded-2xl p-6">
          <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-4">Easing</p>
          <ul className="space-y-3 text-[13px]">
            {easings.map((e) => (
              <li key={e.token} className="border-b border-white/[0.05] pb-3 last:border-b-0">
                <p className="font-mono text-text-primary">{e.token}</p>
                <p className="font-mono text-[11px] text-accent">{e.value}</p>
                <p className="text-text-muted text-[12px]">{e.use}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-medium rounded-2xl p-6">
          <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-4">Duration</p>
          <ul className="space-y-3 text-[13px]">
            {durations.map((d) => (
              <li key={d.token} className="flex justify-between border-b border-white/[0.05] pb-3 last:border-b-0">
                <span className="font-mono text-text-primary">{d.token}</span>
                <span className="font-mono text-accent">{d.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 06 — Components
// ============================================================================

function ComponentDemos() {
  return (
    <div className="space-y-12">
      {/* SectionLabel */}
      <ComponentBlock title="<SectionLabel />" path="@/components/ui/SectionLabel">
        <SectionLabel label="01 — Discovery" />
      </ComponentBlock>

      {/* GlowButton */}
      <ComponentBlock title="<GlowButton />" path="@/components/ui/GlowButton">
        <GlowButton href={`/work`}>查看作品 →</GlowButton>
      </ComponentBlock>

      {/* Tags */}
      <ComponentBlock title="Tags / Badges" path="inline">
        <div className="flex flex-wrap gap-3">
          <span className="inline-block px-3.5 py-1 text-xs rounded-full text-text-secondary" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Fintech
          </span>
          <span className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-full">Trading Platform</span>
          <span className="rounded-full bg-red-500/10 text-red-400 px-3 py-1 text-xs font-mono border border-red-500/20">Before</span>
          <span className="rounded-full bg-green-500/10 text-green-400 px-3 py-1 text-xs font-mono border border-green-500/20">After</span>
          <span className="rounded-full bg-amber-500/10 text-amber-400 px-3 py-1 text-xs font-mono border border-amber-500/20">Warning</span>
        </div>
      </ComponentBlock>

      {/* Project Summary Card */}
      <ComponentBlock title="Project Summary Card" path="case-study-style-guide #4">
        <div className="glass-medium rounded-2xl p-8 md:p-10 border-l-[3px] border-l-accent">
          <p className="font-mono text-xs text-accent uppercase tracking-[2px] mb-6">PROJECT SUMMARY</p>
          <p className="font-[var(--font-display)] text-xl md:text-2xl font-semibold text-text-primary leading-snug mb-5">
            為衍生品交易平台重新設計下單流程
          </p>
          <p className="text-[15px] leading-[1.7] text-text-secondary mb-8">
            將原本六層資金架構抽象為三種用戶可理解的狀態，並打造雙層 Design System Token 架構，一鍵切換不同租戶品牌風格。
          </p>
          <div className="border-t border-white/[0.08] mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-1">ROLE</p>
              <p className="text-[15px] font-medium text-text-secondary">Product Designer</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-full">Trading UX</span>
              <span className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-full">Fund Flow</span>
              <span className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-full">Design System</span>
            </div>
          </div>
        </div>
      </ComponentBlock>

      {/* Highlight Metrics Strip */}
      <ComponentBlock title="Highlight Metrics Strip" path="case-study-style-guide #3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ['6 → 3', '將六層資金架構抽象為三種用戶可理解的狀態'],
            ['Dual-Layer Token', '雙層 Design System Token 架構，一鍵切換租戶品牌'],
            ['End-to-End', '獨立完成 UX → UI → Design System → PWA'],
          ].map(([v, l]) => (
            <div
              key={v}
              className="relative rounded-2xl p-8 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,208,0.08) 0%, rgba(0,229,208,0.02) 100%)',
                border: '1px solid rgba(0,229,208,0.15)',
                boxShadow: '0 4px 24px rgba(0,229,208,0.06)',
              }}
            >
              <span className="block font-mono text-xl md:text-2xl font-bold text-accent mb-3">{v}</span>
              <p className="text-[14px] leading-[1.6] text-text-secondary">{l}</p>
            </div>
          ))}
        </div>
      </ComponentBlock>

      {/* Callout Card */}
      <ComponentBlock title="Callout Card (accent / amber)" path="case-study-style-guide #7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-medium rounded-2xl p-6 md:p-8 border-l-[3px] border-l-accent">
            <h3 className="font-semibold text-text-primary mb-2">Insight</h3>
            <p className="text-[15px] leading-[1.7] text-text-secondary">accent 左邊框，用於主要洞察或結論。</p>
          </div>
          <div className="glass-medium rounded-2xl p-6 md:p-8 border-l-[3px] border-l-amber-400">
            <h3 className="font-semibold text-text-primary mb-2">Warning</h3>
            <p className="text-[15px] leading-[1.7] text-text-secondary">amber 左邊框，用於警示或注意事項。</p>
          </div>
        </div>
      </ComponentBlock>

      {/* Insight Conclusion Card */}
      <ComponentBlock title="Insight Conclusion Card" path="case-study-style-guide #8">
        <div className="glass-medium rounded-2xl p-8 md:p-10 border border-accent/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[11px] text-accent uppercase tracking-[3px] mb-4">KEY INSIGHT</p>
            <p className="font-[var(--font-display)] text-xl md:text-2xl font-semibold text-text-primary mb-3">設計決策的價值在於消除選擇焦慮</p>
            <p className="text-[15px] leading-[1.7] text-text-secondary max-w-3xl">用戶不需要更多選項，而是更清楚的引導。減少介面複雜度，反而提升信任感與決策效率。</p>
          </div>
        </div>
      </ComponentBlock>

      {/* Phase Sub-header */}
      <ComponentBlock title="Phase Sub-header" path="case-study-style-guide #10">
        <div className="space-y-6">
          {['01', '02', '03'].map((n, i) => (
            <div key={n} className="flex items-center gap-4">
              <span className="font-mono text-[40px] md:text-[48px] font-bold text-accent/20 leading-none select-none">{n}</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-[var(--font-display)] text-lg md:text-xl font-semibold text-text-primary">{['交易前', '交易中', '交易後'][i]}</h3>
                <div className="h-[2px] w-8 bg-accent/40 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </ComponentBlock>

      {/* Numbered Card */}
      <ComponentBlock title="Numbered Card" path="case-study-style-guide #15">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ['01', '理解資金架構', '用戶無法分辨多層帳戶間的差異，導致下單前需多次切換確認。'],
            ['02', '介面層級過多', '原本六層帳戶分類在介面上展開，造成認知負擔。'],
            ['03', '操作流程冗長', '完成一筆下單平均需要 8 個 step，遠超業界 CEX 標準。'],
          ].map(([n, t, d]) => (
            <div key={n} className="glass-medium rounded-2xl p-6 md:p-8">
              <span className="block font-mono text-5xl font-bold text-accent/30 mb-4">{n}</span>
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-2">{t}</h3>
              <p className="text-[15px] leading-[1.7] text-text-secondary">{d}</p>
            </div>
          ))}
        </div>
      </ComponentBlock>

      {/* Big Number Metrics */}
      <ComponentBlock title="Big Number Metrics (4 欄)" path="case-study-style-guide #14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ['10+', 'WEB & APP PROJECTS'],
            ['5+', 'YEARS DESIGN EXP'],
            ['4', 'YEARS CRYPTO'],
            ['2', 'LANGUAGES'],
          ].map(([n, l]) => (
            <div key={l} className="glass-medium rounded-2xl p-6 text-center">
              <span className="block font-mono text-4xl md:text-5xl font-bold text-accent mb-2">{n}</span>
              <p className="text-[13px] leading-[1.5] text-text-muted">{l}</p>
            </div>
          ))}
        </div>
      </ComponentBlock>

      {/* User Story List */}
      <ComponentBlock title="User Story List" path="case-study-style-guide #17">
        <div>
          {[
            '希望可以在手機上快速完成下單，不用切換多個帳戶',
            '希望介面顯示我目前的可用資金，而不是讓我自己計算',
            '希望有清楚的風險提示，但不要每次都跳 modal 打斷我',
          ].map((s, i) => (
            <div key={i} className="flex gap-4 pb-6 border-b border-border/50 last:border-b-0">
              <span className="font-mono text-2xl font-bold text-accent">0{i + 1}</span>
              <p className="text-[17px] leading-[1.7] text-text-secondary flex-1">{s}</p>
            </div>
          ))}
        </div>
      </ComponentBlock>
    </div>
  );
}

function ComponentBlock({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
        <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary">{title}</h3>
        <code className="font-mono text-[11px] text-text-muted">{path}</code>
      </div>
      <div className="p-6 md:p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
        {children}
      </div>
    </div>
  );
}

// ============================================================================
// 07 — States
// ============================================================================

function StatesDemo() {
  return (
    <div className="space-y-10">
      <ComponentBlock title="Link · Default / Hover / Focus" path="inline">
        <div className="flex flex-wrap gap-6 items-center">
          <a href="#" className="text-[15px] text-text-secondary hover:text-accent focus:text-accent transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:rounded">
            Default link
          </a>
          <a href="#" className="text-[15px] text-accent">Hover state (forced)</a>
          <a href="#" className="text-[15px] text-text-muted cursor-not-allowed pointer-events-none">Disabled</a>
        </div>
      </ComponentBlock>

      <ComponentBlock title="Card · Default / Hover" path="inline">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-medium rounded-2xl p-6">
            <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-2">Default</p>
            <p className="text-[14px] text-text-secondary">標準 glass-medium 狀態。</p>
          </div>
          <div className="glass-medium rounded-2xl p-6 -translate-y-1.5 border-white/[0.14]" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
            <p className="font-mono text-[11px] text-accent uppercase tracking-[2px] mb-2">Hover (forced)</p>
            <p className="text-[14px] text-text-secondary">translateY(-6px) + border 0.14 + 深陰影。</p>
          </div>
        </div>
      </ComponentBlock>

      <ComponentBlock title="Tag · Default / Active / Accent" path="inline">
        <div className="flex flex-wrap gap-3">
          <span className="inline-block px-3.5 py-1 text-xs rounded-full text-text-secondary" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Default
          </span>
          <span className="inline-block px-3.5 py-1 text-xs rounded-full text-text-primary" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            Active / Hover
          </span>
          <span className="px-3 py-1 text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-full">Accent</span>
        </div>
      </ComponentBlock>

      <ComponentBlock title="Option Card · Selected / Rejected" path="case-study-style-guide #16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-medium rounded-2xl overflow-hidden">
            <div className="h-1 bg-accent" />
            <div className="p-6 md:p-8">
              <span className="inline-block rounded-full bg-accent/15 text-accent border border-accent/20 px-3 py-1 text-xs font-mono mb-3">✅ 最終選擇</span>
              <h4 className="font-semibold text-text-primary mb-2">方案 A — 三層帳戶</h4>
              <p className="text-[14px] text-text-secondary leading-[1.7]">符合用戶心智模型，介面複雜度可控。</p>
            </div>
          </div>
          <div className="glass-medium rounded-2xl overflow-hidden opacity-70">
            <div className="h-1 bg-text-muted/30" />
            <div className="p-6 md:p-8">
              <span className="inline-block rounded-full bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 text-xs font-mono mb-3">未採用</span>
              <h4 className="font-semibold text-text-primary mb-2">方案 B — 六層完整顯示</h4>
              <p className="text-[14px] text-text-secondary leading-[1.7]">技術精準但用戶認知負擔過重。</p>
            </div>
          </div>
        </div>
      </ComponentBlock>
    </div>
  );
}
