'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import ImageBlock from '@/components/ui/ImageBlock';
import VideoEmbed from '@/components/ui/VideoEmbed';
import { navigableProjects } from '@/data/projects';

const IMG = '/images/case-studies/exora';
const CURRENT_ID = 'exora';
const currentIdx = navigableProjects.findIndex((p) => p.id === CURRENT_ID);
const prevProject = navigableProjects[(currentIdx - 1 + navigableProjects.length) % navigableProjects.length];
const nextProject = navigableProjects[(currentIdx + 1) % navigableProjects.length];

const positionStates = [
  {
    key: 'safe',
    label: '安全水位',
    sublabel: 'Safe',
    badge: { icon: 'ri-checkbox-circle-fill', text: '安全' },
    marginRatio: 20,
    color: 'rgb(52, 211, 153)',
    border: 'rgba(52, 211, 153, 0.28)',
    tint: 'rgba(52, 211, 153, 0.14)',
    title: '清算價格層級最高',
    body: '作為單一最重要的決策數字，採用最大字重與對比色，支援極速掃視。',
  },
  {
    key: 'warning',
    label: '警戒水位',
    sublabel: 'Alert',
    badge: { icon: 'ri-error-warning-fill', text: '警戒' },
    marginRatio: 65,
    color: 'rgb(251, 191, 36)',
    border: 'rgba(251, 191, 36, 0.32)',
    tint: 'rgba(251, 191, 36, 0.14)',
    title: '隱性成本可視化',
    body: '補足傳統盲區，主動累計顯示資金費率（Funding Rate），讓真實盈虧一目了然。',
  },
  {
    key: 'danger',
    label: '危險水位',
    sublabel: 'Danger',
    badge: null as { icon: string; text: string } | null,
    marginRatio: 85,
    color: 'rgb(239, 68, 68)',
    border: 'rgba(239, 68, 68, 0.4)',
    tint: 'rgba(239, 68, 68, 0.18)',
    title: '警告必須帶有行動路徑',
    body: '危險水位下主動帶出「立即追加保證金」與「部分平倉」兩條行動路徑，使用者不必再尋找按鈕即可立即回應。',
    danger: {
      alert: '距清算還有 $540.00',
    },
  },
] as const;

/* Placeholder for missing images */
function Placeholder({ name, ratio = '16/10' }: { name: string; ratio?: string }) {
  return (
    <div
      className="rounded-xl border border-dashed border-border bg-bg-tertiary flex items-center justify-center"
      style={{ aspectRatio: ratio }}
    >
      <span className="text-sm text-text-muted text-center px-4">Image Placeholder — {name}</span>
    </div>
  );
}

export default function ExoraClient() {
  const t = useTranslations('caseStudy.exora');
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
        <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 py-4">
          <Link
            href="/work"
            className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300"
          >
            <i className="ri-arrow-left-line text-accent mr-1" /> {t('backToProjects')}
          </Link>
        </div>
      </motion.div>

      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden" style={{ height: '70vh', minHeight: 400 }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/projects/exora/hero.jpg"
            alt="Exora Hero"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-16">
          <div className="mx-auto max-w-[var(--cs-wide-max-width)]">
            <motion.span
              className="block font-[var(--font-mono)] text-[14px] text-accent uppercase tracking-[3px] mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero.label')}
            </motion.span>
            <motion.h1
              className="font-[var(--font-display)] text-[32px] md:text-[52px] font-bold text-text-primary mb-3 whitespace-pre-line"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              className="text-base md:text-xl text-text-secondary max-w-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Highlights — quick impact strip */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mt-20 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="relative rounded-2xl p-8 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 229, 208, 0.08) 0%, rgba(0, 229, 208, 0.02) 100%)',
                border: '1px solid rgba(0, 229, 208, 0.15)',
                boxShadow: '0 4px 24px rgba(0, 229, 208, 0.06)',
              }}
            >
              <span className="block font-[var(--font-mono)] text-xl md:text-2xl font-bold text-accent mb-3">
                {t(`highlights.metric${n}Value`)}
              </span>
              <p className="text-[14px] leading-[1.6] text-text-secondary">
                {t(`highlights.metric${n}Label`)}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Project Summary */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl p-8 md:p-10 border-l-[3px] border-l-accent">
          {/* Label */}
          <p className="font-[var(--font-mono)] text-xs text-accent uppercase tracking-[2px] mb-6">
            {t('summary.label')}
          </p>

          {/* Headline statement */}
          <h2 className="font-[var(--font-display)] text-xl md:text-2xl font-semibold text-text-primary leading-snug mb-5">
            {t('summary.headline')}
          </h2>

          {/* Body */}
          <p className="text-[16px] leading-[1.7] text-text-secondary mb-8">
            {t('summary.body')}
          </p>

          {/* Divider */}
          <div className="border-t border-white/[0.08] mb-6" />

          {/* Bottom row: Role + Scope tags */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[var(--font-mono)] text-[12px] text-text-muted uppercase tracking-[2px] mb-1">
                {t('summary.roleLabel')}
              </p>
              <p className="text-[16px] font-medium text-text-secondary">
                {t('summary.roleValue')}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['tag1', 'tag2', 'tag3', 'tag4'] as const).map((key) => (
                <span
                  key={key}
                  className="px-3 py-1 text-xs font-[var(--font-mono)] text-accent bg-accent/10 border border-accent/20 rounded-full"
                >
                  {t(`summary.${key}`)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ========== 01 — PROJECT CONTEXT ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('context.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('context.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('context.body')}
        </p>
      </ScrollReveal>

      {/* User-side problem — Callout Card (amber border) */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl p-6 md:p-8 border-l-[3px] border-l-amber-400">
          <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-2">
            {t('context.userProblemTitle')}
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary mb-4">
            {t('context.userProblemCardBody')}
          </p>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t('context.userProblemExtra')}
          </p>
        </div>
      </ScrollReveal>

      {/* Context image */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <Image
          src="/images/projects/exora/context-overview.jpg"
          alt="市場現況"
          width={1920}
          height={1080}
          className="w-full h-auto rounded-xl opacity-90"
          sizes="(min-width: 768px) 80vw, 100vw"
        />
      </ScrollReveal>

      {/* Insight Callout */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl p-6 md:p-8 border-l-[3px] border-l-accent">
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t('context.insightBody')}
          </p>
        </div>
      </ScrollReveal>

      {/* ========== 02 — COMPETITIVE ANALYSIS ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('competitive.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('competitive.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('competitive.body')}
        </p>
      </ScrollReveal>
      {/* Competitive comparison table */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl overflow-hidden border border-white/[0.08]">
          {/* Table title */}
          <div className="px-6 md:px-8 py-5 border-b border-white/[0.08]">
            <h3 className="font-[var(--font-display)] text-lg md:text-xl font-semibold text-text-primary">
              {t('competitive.tableTitle')}
            </h3>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[14px] md:text-[16px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left px-4 md:px-6 py-4 text-text-muted font-normal w-[22%]" />
                  <th className="text-center px-4 md:px-6 py-4 text-text-muted font-medium w-[26%]">
                    {t('competitive.col1')}
                  </th>
                  <th className="text-center px-4 md:px-6 py-4 text-text-muted font-medium w-[26%]">
                    {t('competitive.col2')}
                  </th>
                  <th className="text-center px-4 md:px-6 py-4 text-accent font-semibold w-[26%]">
                    {t('competitive.col3')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 — Trading Fluidity */}
                <tr className="border-b border-white/[0.05]">
                  <td className="px-4 md:px-6 py-5 text-text-secondary font-medium">
                    {t('competitive.row1Label')}
                  </td>
                  <td className="px-4 md:px-6 py-5 text-center text-text-secondary">
                    {t('competitive.row1Col1')}
                  </td>
                  <td className="px-4 md:px-6 py-5 text-center text-text-muted">
                    {t('competitive.row1Col2')}
                  </td>
                  <td className="px-4 md:px-6 py-5 text-center">
                    <span className="inline-block rounded-lg bg-accent/10 border border-accent/20 px-4 py-1.5 text-accent font-medium">
                      {t('competitive.row1Col3')}
                    </span>
                  </td>
                </tr>
                {/* Row 2 — Asset Transparency */}
                <tr className="border-b border-white/[0.05]">
                  <td className="px-4 md:px-6 py-5 text-text-secondary font-medium">
                    {t('competitive.row2Label')}
                  </td>
                  <td className="px-4 md:px-6 py-5 text-center text-text-muted">
                    {t('competitive.row2Col1')} <span className="text-red-400 ml-1">✗</span>
                  </td>
                  <td className="px-4 md:px-6 py-5 text-center text-text-secondary">
                    {t('competitive.row2Col2')} <span className="text-green-400 ml-1">✓</span>
                  </td>
                  <td className="px-4 md:px-6 py-5 text-center">
                    <span className="inline-block rounded-lg bg-accent/10 border border-accent/20 px-4 py-1.5 text-accent font-medium">
                      {t('competitive.row2Col3')} <span className="text-green-400 ml-1">✓</span>
                    </span>
                  </td>
                </tr>
                {/* Row 3 — Enterprise Customization */}
                <tr>
                  <td className="px-4 md:px-6 py-5 text-text-secondary font-medium">
                    {t('competitive.row3Label')}
                  </td>
                  <td className="px-4 md:px-6 py-5 text-center text-text-muted">
                    {t('competitive.row3Col1')} <span className="text-red-400 ml-1">✗</span>
                  </td>
                  <td className="px-4 md:px-6 py-5 text-center text-text-muted">
                    {t('competitive.row3Col2')} <span className="text-red-400 ml-1">✗</span>
                  </td>
                  <td className="px-4 md:px-6 py-5 text-center">
                    <span className="inline-block rounded-lg bg-accent/10 border border-accent/20 px-4 py-1.5 text-accent font-medium">
                      {t('competitive.row3Col3')} <span className="text-green-400 ml-1">✓</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table footer callout */}
          <div className="px-6 md:px-8 py-5 border-t border-white/[0.08] bg-white/[0.02]">
            <p className="text-[14px] leading-[1.7] text-text-secondary text-center">
              {t('competitive.tableFooter')}
            </p>
          </div>
        </div>
      </ScrollReveal>
      {/* Competitive Insight — Section Conclusion */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl p-8 md:p-10 border border-accent/20 relative overflow-hidden">
          {/* Accent glow background */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <p className="font-[var(--font-mono)] text-[12px] text-accent uppercase tracking-[3px] mb-4">
              {t('competitive.insightLabel')}
            </p>
            <p className="font-[var(--font-display)] text-xl md:text-2xl font-semibold text-text-primary mb-3">
              {t('competitive.insightHeadline')}
            </p>
            <p className="text-[16px] leading-[1.7] text-text-secondary max-w-3xl">
              {t('competitive.insightBody')}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* ========== 03 — USER RESEARCH ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('userResearch.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('userResearch.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('userResearch.body')}
        </p>
      </ScrollReveal>

      {/* Trader Spectrum */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl p-6 md:p-10 overflow-hidden">
          {/* Title */}
          <h3 className="font-[var(--font-display)] text-lg md:text-xl font-semibold text-text-primary mb-8">
            {t('userResearch.spectrumTitle')}
          </h3>

          {/* Spectrum subtitle */}
          <p className="font-[var(--font-mono)] text-xs text-text-muted uppercase tracking-[2px] text-center mb-6">
            {'«'} {t('userResearch.spectrumSubtitle')} {'»'}
          </p>

          {/* Three trader cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6">
            {([
              { key: '1', color: '#00B4D8' },
              { key: '2', color: '#00CCD4' },
              { key: '3', color: '#00E5D0' },
            ] as const).map(({ key, color }) => (
              <div
                key={key}
                className="rounded-xl border p-5 md:p-6 text-center transition-colors duration-300"
                style={{
                  borderColor: `${color}30`,
                  background: `${color}0A`,
                }}
              >
                <p
                  className="font-[var(--font-display)] text-base md:text-lg font-semibold mb-0.5"
                  style={{ color }}
                >
                  {t(`userResearch.trader${key}Title`)}
                </p>
                <p className="font-[var(--font-mono)] text-[12px] text-text-muted uppercase tracking-[1px] mb-3">
                  ({t(`userResearch.trader${key}Sub`)})
                </p>
                <p className="text-[14px] leading-[1.6] text-text-secondary">
                  {t(`userResearch.trader${key}Desc`)}
                </p>
              </div>
            ))}
          </div>

          {/* Spectrum gradient bar with arrow */}
          <div className="relative mb-8 pr-4">
            <div
              className="h-1 rounded-l-full"
              style={{ background: 'linear-gradient(to right, #00B4D8, #00CCD4, #00E5D0)' }}
            />
            <svg
              className="absolute right-0 top-1/2 -translate-y-1/2"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path d="M0 2L12 7L0 12V2Z" fill="#00E5D0" />
            </svg>
          </div>

          {/* Footer quote */}
          <div className="border-t border-white/[0.06] pt-6">
            <p className="text-[16px] leading-[1.7] text-accent text-center whitespace-pre-line">
              {t('userResearch.spectrumFooter')}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Pre-Trade sub-header */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-6 mt-12 md:mt-20">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[40px] md:text-[48px] font-bold text-accent/20 leading-none select-none">
            01
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-[var(--font-display)] text-lg md:text-xl font-semibold text-text-primary">
              {t('tradingJourney.preTradeLabel')}
            </h3>
            <div className="h-[2px] w-8 bg-accent/40 rounded-full" />
          </div>
        </div>
      </ScrollReveal>

      {/* Personal Friction Moment */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="flex flex-col gap-6">
          {/* Left — Card (full width) */}
          <div className="relative rounded-2xl border border-accent/[0.12] overflow-hidden py-12 md:py-16 px-8 md:px-16"
               style={{ background: 'linear-gradient(135deg, rgba(0,229,208,0.08) 0%, rgba(0,229,208,0.03) 40%, rgba(0,229,208,0.01) 100%)' }}>
            {/* Decorative quote mark */}
            <span className="absolute top-6 left-8 md:left-14 text-[120px] md:text-[160px] leading-none font-bold text-accent/[0.06] select-none pointer-events-none"
                  style={{ fontFamily: 'Georgia, serif' }}>
              &ldquo;
            </span>

            {/* Layer 1 — Pull Quote */}
            <div className="relative flex items-stretch gap-5 md:gap-6 mb-10 md:mb-12">
              <div className="w-[3px] flex-shrink-0 rounded-full bg-accent/60" />
              <p className="font-[var(--font-display)] text-xl md:text-[26px] font-semibold text-text-primary leading-snug">
                {t('userResearch.proseQuote')}
              </p>
            </div>

            {/* Layer 2 — Context narrative */}
            <div className="relative mb-10 md:mb-12">
              <p className="text-[16px] md:text-base leading-[1.8] text-text-secondary">
                {t('userResearch.proseContext')}
                <span className="text-accent">
                  {t('userResearch.proseHighlight')}
                </span>
                {t('userResearch.proseContextSuffix')}
              </p>
            </div>

            {/* Layer 3 — Takeaway */}
            <div className="relative border-t border-white/[0.08] pt-6 md:pt-8">
              <p className="text-[14px] md:text-[16px] leading-[1.7] text-text-muted italic flex items-start gap-2">
                <span className="text-accent not-italic mt-[1px]">→</span>
                <span>{t('userResearch.proseTakeaway')}</span>
              </p>
            </div>
          </div>

        </div>
      </ScrollReveal>

      {/* ===== Trading Journey: Pre / During / Post ===== */}
      {(['pre', 'during', 'post'] as const).map((phase, phaseIndex) => {
        const labelKey = phase === 'pre' ? 'preTradeLabel' : phase === 'during' ? 'duringTradeLabel' : 'postTradeLabel';
        const rows = phase === 'post' ? [1] : [1, 2];
        const rowPrefix = phase === 'pre' ? 'preRow' : phase === 'during' ? 'duringRow' : 'postRow';
        const phaseNumber = String(phaseIndex + 1).padStart(2, '0');
        return (
          <div key={phase}>
            {/* Phase sub-header (skip pre — rendered above Personal Friction Moment) */}
            {phase !== 'pre' && (
              <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-6 mt-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[40px] md:text-[48px] font-bold text-accent/20 leading-none select-none">
                    {phaseNumber}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-[var(--font-display)] text-lg md:text-xl font-semibold text-text-primary">
                      {t(`tradingJourney.${labelKey}`)}
                    </h3>
                    <div className="h-[2px] w-8 bg-accent/40 rounded-full" />
                  </div>
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
              <div className="glass-medium rounded-2xl overflow-hidden border border-white/[0.08]">

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-[14px] md:text-[16px]">
                    <thead>
                      <tr className="border-b border-white/[0.08]">
                        <th className="text-left px-4 md:px-6 py-4 text-text-muted font-medium w-[28%]">
                          {t('tradingJourney.preTradeCol1')}
                        </th>
                        <th className="text-left px-4 md:px-6 py-4 text-text-muted font-medium w-[36%]">
                          {t('tradingJourney.preTradeCol2')}
                        </th>
                        <th className="text-left px-4 md:px-6 py-4 text-accent font-medium w-[36%]">
                          {t('tradingJourney.preTradeCol3')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((n) => (
                        <tr key={n} className={n < rows.length ? 'border-b border-white/[0.05]' : ''}>
                          <td className="px-4 md:px-6 py-5 text-text-primary font-medium align-top">
                            {t(`tradingJourney.${rowPrefix}${n}Pain`)}
                          </td>
                          <td className="px-4 md:px-6 py-5 text-text-secondary align-top">
                            {t(`tradingJourney.${rowPrefix}${n}Desc`)}
                          </td>
                          <td className="px-4 md:px-6 py-5 align-top">
                            <span className="text-accent">
                              {t(`tradingJourney.${rowPrefix}${n}Opportunity`)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollReveal>

            {/* Image after each phase */}
            <div className="mb-[var(--cs-section-gap)]">
              <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
                <Image
                  src={`/images/projects/exora/${phaseIndex + 1}.png`}
                  alt={t(`tradingJourney.${labelKey}`)}
                  width={1920}
                  height={1080}
                  className="w-full h-auto rounded-xl"
                  sizes="(min-width: 768px) 80vw, 100vw"
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* ========== 05 — TRADING UX (merged with Order Panel) ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('tradingUX.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('tradingUX.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('tradingUX.body')}
        </p>
      </ScrollReveal>

      {/* High-pressure position management — three states visualization */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr]">
          {positionStates.map((state) => {
            const hasDanger = 'danger' in state && state.danger !== undefined;
            return (
              <div key={state.key} className="grid gap-4 lg:row-span-3 lg:grid-rows-subgrid">
                {/* Position card mockup */}
                <div
                  className="relative overflow-hidden rounded-2xl border p-5 md:p-6"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(20,20,22,0.85) 0%, rgba(15,15,18,0.85) 100%)',
                    borderColor: state.border,
                  }}
                >
                  <div
                    className="mb-4 flex items-center justify-between border-b pb-3"
                    style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                  >
                    <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-text-muted">
                      POSITION
                    </span>
                    <i className="ri-close-line text-text-muted/60" />
                  </div>

                  {hasDanger && state.danger && (
                    <div
                      className="mb-4 rounded-lg border px-3 py-2.5"
                      style={{
                        borderColor: state.border,
                        background: state.tint,
                        color: state.color,
                      }}
                    >
                      <span className="text-[13px] font-medium">{state.danger.alert}</span>
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[13px] text-text-secondary">槓桿</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${state.marginRatio}%`,
                          background: state.color,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[13px] text-text-secondary">
                      Margin Ratio:{' '}
                      <span className="font-medium text-text-primary">{state.marginRatio}%</span>
                    </span>
                    {state.badge && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium"
                        style={{
                          color: state.color,
                          background: state.tint,
                          border: `1px solid ${state.border}`,
                        }}
                      >
                        <i className={`${state.badge.icon} text-[12px]`} />
                        {state.badge.text}
                      </span>
                    )}
                  </div>

                </div>

                <p className="text-center">
                  <span className="font-[var(--font-display)] text-base font-semibold text-text-primary">
                    {state.label}
                  </span>
                  <span
                    className="ml-2 font-[var(--font-mono)] text-[12px] uppercase tracking-[1.5px]"
                    style={{ color: state.color }}
                  >
                    {state.sublabel}
                  </span>
                </p>

                <div
                  className="glass-medium rounded-2xl border-l-[3px] p-5 md:p-6"
                  style={{ borderLeftColor: state.color }}
                >
                  <h4 className="mb-2 font-[var(--font-display)] text-base font-semibold text-text-primary md:text-[17px]">
                    {state.title}
                  </h4>
                  <p className="text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">
                    {state.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Order Panel sub-heading */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <h3 className="font-[var(--font-display)] text-xl md:text-2xl font-semibold text-text-primary mb-4">
          {t('orderPanel.heading')}
        </h3>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('orderPanel.body')}
        </p>
      </ScrollReveal>

      {/* Order panel image */}
      <div className="mb-[var(--cs-section-gap)]">
        <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
          <Image
            src="/images/projects/exora/img-order-panel.png"
            alt={t('orderPanel.heading')}
            width={1920}
            height={1080}
            className="w-full h-auto rounded-xl opacity-90"
            sizes="(min-width: 768px) 80vw, 100vw"
          />
        </div>
      </div>

      {/* ========== 04 — CORE DESIGN INSIGHT ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('designInsight.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('designInsight.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('designInsight.body')}
        </p>
      </ScrollReveal>

      <div className="mb-8">
        <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
          <Image
            src="/images/projects/exora/img-design-insight.png"
            alt={t('designInsight.heading')}
            width={1920}
            height={1080}
            className="w-full h-auto rounded-xl opacity-80"
            sizes="(min-width: 768px) 80vw, 100vw"
          />
        </div>
      </div>

      <div className="mb-[var(--cs-section-gap)]">
        <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
          <Image
            src="/images/projects/exora/DD insight.png"
            alt={t('designInsight.heading')}
            width={1920}
            height={1080}
            className="w-full h-auto rounded-xl"
            sizes="(min-width: 768px) 80vw, 100vw"
          />
          <p className="mt-3 text-center text-[15px] leading-relaxed text-accent">
            獨立規劃用戶合約交易下單流程、介面設計＆產品視覺風格
          </p>
        </div>
      </div>

      {/* ========== 06 — ONBOARDING ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('onboarding.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('onboarding.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('onboarding.body')}
        </p>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]">
        <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
          <Image
            src="/images/projects/exora/img-onboarding-before-after.png"
            alt={t('onboarding.heading')}
            width={1920}
            height={1080}
            className="w-full h-auto rounded-xl"
            sizes="(min-width: 768px) 80vw, 100vw"
          />
        </div>
      </div>

      {/* ========== 07 — MOBILE PWA (temporarily hidden) ========== */}
      {false && (
        <>
          <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
            <SectionLabel label={t('mobilePWA.label')} />
            <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
              {t('mobilePWA.heading')}
            </h2>
            <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
              {t('mobilePWA.body')}
            </p>
          </ScrollReveal>
          <div className="mb-8">
            <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
              <Placeholder name="img-desktop-vs-mobile.png" />
            </div>
          </div>

          {/* 3-column mobile screenshots */}
          <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { img: 'img-mobile-markets.png', caption: t('mobilePWA.caption1') },
                { img: 'img-mobile-trade.png', caption: t('mobilePWA.caption2') },
                { img: 'img-mobile-portfolio.png', caption: t('mobilePWA.caption3') },
              ].map((item) => (
                <div key={item.img}>
                  <Placeholder name={item.img} ratio="9/16" />
                  <p className="text-[14px] text-text-muted text-center mt-3">{item.caption}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </>
      )}

      {/* ========== 08 — VISUAL STYLE ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('visualStyle.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('visualStyle.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('visualStyle.body')}
          <span className="text-accent">{t('visualStyle.bodyAccent')}</span>
        </p>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]">
        <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
          <Image
            src="/images/projects/exora/img-color-system.png"
            alt={t('visualStyle.heading')}
            width={1920}
            height={1080}
            className="w-full h-auto rounded-xl"
            sizes="(min-width: 768px) 80vw, 100vw"
          />
        </div>
      </div>

      {/* ========== 10 — DESIGN SYSTEM ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('designSystem.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('designSystem.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('designSystem.body')}
        </p>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]">
        <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
          <Image
            src="/images/projects/exora/img-design-system.png"
            alt={t('designSystem.heading')}
            width={1920}
            height={1080}
            className="w-full h-auto rounded-xl"
            sizes="(min-width: 768px) 80vw, 100vw"
          />
        </div>
      </div>

      {/* ========== 11 — CROSS-FUNCTIONAL COLLABORATION ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('collaboration.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('collaboration.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('collaboration.body')}
        </p>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]">
        <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
          <VideoEmbed videoId="APXhAmcMlHU" width="wide" padded={false} />
        </div>
      </div>

      {/* ========== 12 — IMPACT & OUTCOMES ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('impact.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('impact.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('impact.body')}
        </p>
      </ScrollReveal>

      {/* Big number metrics — 2-column grid */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => {
            const colors = ['text-accent', 'text-accent/70'];
            return (
              <div key={n} className="glass-medium rounded-2xl p-6 text-center">
                <span className={`block font-[var(--font-mono)] text-4xl md:text-5xl font-bold ${colors[n - 1]} mb-2`}>
                  {t(`impact.metric${n}Value`)}
                </span>
                <p className="text-[14px] leading-[1.5] text-text-muted">
                  {t(`impact.metric${n}Label`)}
                </p>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Trading Experience Before/After Table */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-4">
          {t('impact.tableTitle')}
        </h3>
        <div className="glass-medium rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  {(t.raw('impact.tableHeaders') as string[]).map((h, i) => (
                    <th key={i} className="text-left px-4 md:px-6 py-4 text-text-muted font-medium font-[var(--font-mono)] text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(t.raw('impact.tableRows') as string[][]).map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.05] last:border-0">
                    <td className="px-4 md:px-6 py-4 text-text-secondary font-medium">{row[0]}</td>
                    <td className="px-4 md:px-6 py-4 text-text-muted">{row[1]}</td>
                    <td className="px-4 md:px-6 py-4 text-accent font-medium">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* DS & Strategy Table */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-4">
          {t('impact.dsTableTitle')}
        </h3>
        <div className="glass-medium rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  {(t.raw('impact.dsTableHeaders') as string[]).map((h, i) => (
                    <th key={i} className="text-left px-4 md:px-6 py-4 text-text-muted font-medium font-[var(--font-mono)] text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(t.raw('impact.dsTableRows') as string[][]).map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.05] last:border-0">
                    <td className="px-4 md:px-6 py-4 text-text-secondary font-medium">{row[0]}</td>
                    <td className="px-4 md:px-6 py-4 text-text-secondary">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* ========== Prev / Next Project Nav ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-12">
        <div className="glass-medium rounded-2xl grid grid-cols-2 border border-white/[0.08]">
          <Link
            href={prevProject.link}
            className="group py-10 md:py-12 px-6 md:px-10 border-r border-white/[0.08]"
          >
            <span className="flex items-center gap-1.5 font-[var(--font-mono)] text-[12px] text-text-muted uppercase tracking-[2px] mb-3 group-hover:text-accent transition-colors duration-300">
              <i className="ri-arrow-left-s-line text-sm" />
              {t('projectNav.prev')}
            </span>
            <p className="text-lg md:text-xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">
              {tp(`cards.${prevProject.id}.title`)}
            </p>
          </Link>
          <Link
            href={nextProject.link}
            className="group py-10 md:py-12 px-6 md:px-10 text-right"
          >
            <span className="flex items-center justify-end gap-1.5 font-[var(--font-mono)] text-[12px] text-text-muted uppercase tracking-[2px] mb-3 group-hover:text-accent transition-colors duration-300">
              {t('projectNav.next')}
              <i className="ri-arrow-right-s-line text-sm" />
            </span>
            <p className="text-lg md:text-xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-300">
              {tp(`cards.${nextProject.id}.title`)}
            </p>
          </Link>
        </div>
      </ScrollReveal>
    </>
  );
}
