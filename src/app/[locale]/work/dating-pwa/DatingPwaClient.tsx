'use client';

import type { ReactNode } from 'react';
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

const metaItems = [
  { label: 'Scope', value: 'Product Design · Information Architecture · Visual Identity' },
  { label: 'Platform', value: 'Mobile PWA · Marketing Website' },
];

const summaryTags = ['PWA', 'OMO Platform', '0-to-1', 'SBIR'];

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

const highlight = (chunks: ReactNode) => <span className="text-accent">{chunks}</span>;

export default function DatingPwaClient() {
  const t = useTranslations('caseStudy.datingPwa');
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
            className="max-w-2xl text-sm leading-6 text-text-secondary md:text-base md:leading-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Highlight Metrics Strip */}
      <ScrollReveal className="mx-auto mt-20 max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
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
                Role
              </p>
              <p className="text-[16px] font-medium text-text-secondary">
                {t('summary.roleValue')}
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
          {t('problem.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('problem.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-amber-400 p-6 md:p-8">
          <p className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-amber-400">
            {t('problem.calloutLabel')}
          </p>
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            {t('problem.calloutHeading')}
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t('problem.calloutBody')}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <ImagePlaceholder label={t('problem.imageLabel')} ratio="16/9" />
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
              {t('problem.gapTitle')}
            </p>
            <p className="max-w-3xl text-[16px] leading-[1.7] text-text-secondary">
              {t.rich('problem.gapBody', { highlight })}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* 02 — 競品分析 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="02 — COMPETITIVE ANALYSIS" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('competitive.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('competitive.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <ImagePlaceholder label={t('competitive.imageLabel')} ratio="16/9" />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8">
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            {t('competitive.insightTitle')}
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t.rich('competitive.insightBody', { highlight })}
          </p>
        </div>
      </ScrollReveal>

      {/* 03 — 產品開發流程 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="03 — DESIGN PROCESS" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('process.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('process.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <ImagePlaceholder label={t('process.imageLabel')} ratio="16/9" />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n, idx) => (
            <div
              key={n}
              className="glass-medium relative overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="font-[var(--font-mono)] text-[40px] font-bold leading-none text-accent/25 md:text-[48px]">
                  0{idx + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary md:text-xl">
                    {t(`process.step${n}Title`)}
                  </h3>
                  <div className="mt-2 h-[2px] w-8 rounded-full bg-accent/40" />
                </div>
              </div>
              <p className="text-[16px] leading-[1.75] text-text-secondary">{t(`process.step${n}Body`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* 04 — 設計提案 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="04 — STYLE EXPLORATION" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('style.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('style.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <ImagePlaceholder label={t('style.imageLabel')} ratio="16/9" />
      </ScrollReveal>

      {/* 05 — 設計產出：PWA */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="05 — DESIGN OUTPUT: PWA" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('pwa.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('pwa.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <LongImagePlaceholder label={t('pwa.imageLabel1')} />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <LongImagePlaceholder label={t('pwa.imageLabel2')} />
      </ScrollReveal>

      {/* 06 — 設計產出：Web */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="06 — DESIGN OUTPUT: WEB" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('web.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('web.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <LongImagePlaceholder label={t('web.imageLabel1')} />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <LongImagePlaceholder label={t('web.imageLabel2')} />
      </ScrollReveal>

      {/* 07 — Impact & Outcomes */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="07 — IMPACT & OUTCOMES" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('impact.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('impact.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 text-center">
              <span className="mb-2 block font-[var(--font-mono)] text-4xl font-bold text-accent md:text-5xl">
                {t(`impact.metric${n}Value`)}
              </span>
              <p className="text-[13px] leading-[1.5] text-text-muted">{t(`impact.metric${n}Label`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8"
            >
              <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
                {t(`impact.card${n}Title`)}
              </h3>
              <p className="text-[16px] leading-[1.75] text-text-secondary">{t(`impact.card${n}Body`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* 08 — 客戶評價 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="08 — CLIENT TESTIMONIAL" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('testimonial.heading')}
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
                {t('testimonial.quote')}
              </p>
            </div>

            <div className="relative mb-10 md:mb-12">
              <p className="text-[15px] leading-[1.8] text-text-secondary md:text-base">
                {t.rich('testimonial.body', { highlight })}
              </p>
            </div>

            <div className="relative border-t border-white/[0.08] pt-6 md:pt-8">
              <p className="flex items-start gap-2 text-[14px] italic leading-[1.7] text-text-muted md:text-[15px]">
                <span className="mt-[1px] not-italic text-accent">→</span>
                <span>
                  {t('testimonial.author')}<span className="mx-2 not-italic text-text-muted/60">·</span>{t('testimonial.authorMeta')}
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
          {t('reflection.heading')}
        </h2>
        <div className="glass-medium rounded-2xl p-8 md:p-10">
          <p className="mb-5 text-[18px] leading-[1.7] text-text-secondary">
            {t('reflection.p1')}
          </p>
          <p className="mb-5 text-[18px] leading-[1.7] text-text-secondary">
            {t.rich('reflection.p2', { highlight })}
          </p>
          <p className="text-[18px] leading-[1.7] text-text-secondary">
            {t.rich('reflection.p3', { highlight })}
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
              {t('projectNav.prev')}
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
