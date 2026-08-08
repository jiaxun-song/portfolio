'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';

const metaItems = [
  { label: 'Scope', value: 'Product Design · AI Workflow · Full-Stack Build' },
  { label: 'Platform', value: 'Mobile PWA · Telegram Bot Ingest' },
];

const summaryTags = ['PWA', 'AI Classifier', 'Claude Code', 'Solo Build'];

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

const solutionStepMeta = [
  { icon: 'ri-telegram-line', tag: 'ENTRY' },
  { icon: 'ri-code-s-slash-line', tag: 'SCRAPE' },
  { icon: 'ri-sparkling-line', tag: 'CLASSIFY' },
  { icon: 'ri-database-2-line', tag: 'STORE' },
];

const processStepMeta = [
  { icon: 'ri-palette-line', tag: 'SPEC' },
  { icon: 'ri-file-text-line', tag: 'CONTRACT' },
  { icon: 'ri-stack-line', tag: 'BUILD' },
  { icon: 'ri-refresh-line', tag: 'REBRAND' },
];

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

      {/* Watermark number: outlined at rest, gradient fill fades in on hover */}
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
          Step 0{index} · {tag}
        </span>
      </div>

      <h3 className="relative mb-3 pr-14 font-[var(--font-display)] text-lg font-semibold leading-snug text-text-primary md:text-xl">
        {title}
      </h3>
      <p className="relative flex-1 text-[15px] leading-[1.75] text-text-secondary">{body}</p>

      {/* Pipeline progress: how far along the flow this step sits */}
      <div className="relative mt-7">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent/70 to-accent-light transition-all duration-700"
            style={{ width: `${index * 25}%` }}
          />
        </div>
        <div className="mt-2.5 flex items-center justify-between font-[var(--font-mono)] text-[10px] uppercase tracking-[1.6px] text-text-muted">
          <span>0{index}</span>
          <span>/ 04</span>
        </div>
      </div>
    </div>
  );
}

export default function GoodstuffClient() {
  const t = useTranslations('caseStudy.goodstuff');

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
            href="/work?tab=vibe-coding"
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
          {/* GOODSTUFF brand: purple-magenta spectrum glow on dark */}
          <div className="h-full w-full bg-[radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.20),transparent_40%),radial-gradient(circle_at_15%_70%,rgba(139,92,246,0.22),transparent_42%),linear-gradient(135deg,#121016_0%,#0A0A0A_55%,#16101A_100%)]" />
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
                {t('summary.roleLabel')}
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

      {/* 01 — Problem Space */}
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

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
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

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8">
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            {t('problem.alternativesTitle')}
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t('problem.alternativesBody')}
          </p>
        </div>
      </ScrollReveal>

      {/* 02 — Solution: The Pipeline */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="02 — SOLUTION: THE PIPELINE" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('solution.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('solution.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <ImagePlaceholder label={t('solution.imageLabel')} ratio="16/9" />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <StepCard
              key={n}
              index={n}
              icon={solutionStepMeta[n - 1].icon}
              tag={solutionStepMeta[n - 1].tag}
              title={t(`solution.step${n}Title`)}
              body={t(`solution.step${n}Body`)}
            />
          ))}
        </div>
      </ScrollReveal>

      {/* 03 — Build Process: Vibe Coding */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="03 — BUILD PROCESS: VIBE CODING" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('process.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('process.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <StepCard
              key={n}
              index={n}
              icon={processStepMeta[n - 1].icon}
              tag={processStepMeta[n - 1].tag}
              title={t(`process.step${n}Title`)}
              body={t(`process.step${n}Body`)}
            />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <ImagePlaceholder label={t('process.imageLabel1')} ratio="16/9" />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <ImagePlaceholder label={t('process.imageLabel2')} ratio="16/9" />
      </ScrollReveal>

      {/* 04 — Visual Direction */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="04 — VISUAL DIRECTION" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('style.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('style.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8">
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            {t('style.calloutTitle')}
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t('style.calloutBody')}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <ImagePlaceholder label={t('style.imageLabel')} ratio="16/9" />
      </ScrollReveal>

      {/* 05 — Design Output: PWA */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="05 — INTERFACE DECISIONS" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('pwa.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('pwa.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8"
            >
              <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
                {t(`pwa.d${n}Title`)}
              </h3>
              <p className="text-[16px] leading-[1.75] text-text-secondary">{t(`pwa.d${n}Body`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <LongImagePlaceholder label={t('pwa.imageLabel1')} />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <LongImagePlaceholder label={t('pwa.imageLabel2')} />
      </ScrollReveal>

      {/* 06 — Outcomes */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="06 — OUTCOMES" />
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

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
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

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-amber-400 p-6 md:p-8">
          <p className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-amber-400">
            {t('impact.verifyLabel')}
          </p>
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            {t('impact.verifyTitle')}
          </h3>
          <p className="mb-6 text-[16px] leading-[1.7] text-text-secondary">
            {t('impact.verifyIntro')}
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[1, 2].map((n) => (
              <div key={n} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
                <h4 className="mb-2 font-[var(--font-display)] text-[16px] font-semibold text-text-primary">
                  {t(`impact.verify${n}Title`)}
                </h4>
                <p className="text-[15px] leading-[1.7] text-text-secondary">
                  {t(`impact.verify${n}Body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 07 — What's Next: Team Edition */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label="07 — WHAT'S NEXT: TEAM EDITION" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('phase2.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('phase2.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8"
            >
              <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
                {t(`phase2.card${n}Title`)}
              </h3>
              <p className="text-[16px] leading-[1.75] text-text-secondary">{t(`phase2.card${n}Body`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-amber-400 p-6 md:p-8">
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            {t('phase2.calloutTitle')}
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t('phase2.calloutBody')}
          </p>
        </div>
      </ScrollReveal>

      {/* 08 — Reflection */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label="08 — REFLECTION" />
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
          <p className="mb-5 text-[18px] leading-[1.7] text-text-secondary">
            {t.rich('reflection.p3', { highlight })}
          </p>
          <p className="text-[18px] leading-[1.7] text-text-secondary">
            {t.rich('reflection.p4', { highlight })}
          </p>
        </div>
      </ScrollReveal>

      {/* Back to all projects */}
      <ScrollReveal className="mx-auto mb-12 max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
        <Link
          href="/work?tab=vibe-coding"
          className="group glass-medium block rounded-2xl border border-white/[0.08] px-6 py-10 text-center md:px-10 md:py-12"
        >
          <span className="mb-3 flex items-center justify-center gap-1.5 font-[var(--font-mono)] text-[12px] uppercase tracking-[2px] text-text-muted transition-colors duration-300 group-hover:text-accent">
            <i className="ri-arrow-left-s-line text-sm" />
            {t('projectNav.backLabel')}
          </span>
          <p className="text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-accent md:text-xl">
            {t('projectNav.backTitle')}
          </p>
        </Link>
      </ScrollReveal>
    </>
  );
}
