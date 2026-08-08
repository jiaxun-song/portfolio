'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { navigableProjects } from '@/data/projects';

const IMG = '/images/projects/prediction-market';
const CURRENT_ID = 'prediction-market';
const currentIdx = navigableProjects.findIndex((p) => p.id === CURRENT_ID);
const prevProject = navigableProjects[(currentIdx - 1 + navigableProjects.length) % navigableProjects.length];
const nextProject = navigableProjects[(currentIdx + 1) % navigableProjects.length];

const metaItems = [
  { label: 'Scope', value: 'Research · Product Spec · UX/UI Design · Design System · Frontend Build · AI Workflow Governance' },
  { label: 'Platform', value: 'Web App — Trading Front (28 pages) + Admin Console (24 pages)' },
];

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

const marketTypeMeta = [
  { icon: 'ri-toggle-line', tag: 'BINARY' },
  { icon: 'ri-list-radio', tag: 'CATEGORICAL' },
  { icon: 'ri-stack-line', tag: 'GROUPED' },
  { icon: 'ri-timer-flash-line', tag: 'UPDOWN' },
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
  const t = useTranslations('caseStudy.predictionMarket');
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
      <ScrollReveal className={`${SECTION} mt-20 mb-[var(--cs-section-gap)]`}>
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
      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
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
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('context.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <CalloutCard key={n} title={t(`context.scope${n}Title`)} body={t(`context.scope${n}Body`)} />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <CaptionedImage
          src={`${IMG}/front-home-desktop.png`}
          alt={t('context.imageCaption')}
          caption={t('context.imageCaption')}
          width={SHOT_W}
          height={SHOT_H}
        />
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
          <p className="mt-8 border-t border-white/[0.08] pt-6 text-[15px] leading-[1.75] text-text-secondary">
            {t.rich('context.chainOutro', { highlight })}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <InsightCard
          label={t('context.gapLabel')}
          title={t('context.gapTitle')}
          body={t.rich('context.gapBody', { highlight })}
        />
      </ScrollReveal>

      {/* 02 — Research */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="02 — RESEARCH" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('research.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('research.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CalloutCard title={t('research.industryTitle')} body={t('research.industryBody')} />
          <CalloutCard title={t('research.chartTitle')} body={t('research.chartBody')} />
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <DataTable
          title={t('research.tableTitle')}
          columns={[t('research.tableColProduct'), t('research.tableColPosition'), t('research.tableColModel')]}
          rows={[1, 2, 3].map((n) => [
            t(`research.row${n}Product`),
            t(`research.row${n}Position`),
            t(`research.row${n}Model`),
          ])}
          firstColAccent
        />
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <InsightCard
          label={t('research.conclusionLabel')}
          title={t('research.conclusionTitle')}
          body={t.rich('research.conclusionBody', { highlight })}
        />
      </ScrollReveal>

      {/* 03 — Spec System */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="03 — SPEC SYSTEM" />
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

      <ScrollReveal className={`${SECTION} mb-8`}>
        <CalloutCard title={t('spec.reviewTitle')} body={t('spec.reviewBody')} />
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <InsightCard
          label={t('spec.insightLabel')}
          title={t('spec.insightTitle')}
          body={t.rich('spec.insightBody', { highlight })}
        />
      </ScrollReveal>

      {/* 04 — AI Workflow */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="04 — AI WORKFLOW" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('workflow.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('workflow.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <ImagePlaceholder label={t('workflow.imageLabel')} ratio="16/9" />
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
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

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <CalloutCard key={n} title={t(`workflow.principle${n}Title`)} body={t(`workflow.principle${n}Body`)} />
          ))}
        </div>
      </ScrollReveal>

      {/* 05 — Trading Front Design */}
      <ScrollReveal className={`${SECTION} mb-12`}>
        <SectionLabel label="05 — TRADING FRONT DESIGN" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('front.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary">{t('front.body')}</p>
      </ScrollReveal>

      {/* 5a — Market taxonomy */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SubHeading label="5A — MARKET TAXONOMY" title={t('front.subATitle')} />
        <p className="mb-8 text-[16px] leading-[1.75] text-text-secondary">{t('front.subABody')}</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CalloutCard title={t('front.rejectTitle')} body={t('front.rejectBody')} />
          <CalloutCard title={t('front.routeTitle')} body={t('front.routeBody')} />
        </div>
      </ScrollReveal>

      {/* 5b — Detail page architecture */}
      <ScrollReveal className={`${SECTION} mb-8 mt-16`}>
        <SubHeading label="5B — DETAIL PAGE ARCHITECTURE" title={t('front.subBTitle')} />
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
        <CalloutCard title={t('front.antiTitle')} body={t('front.antiBody')} />
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <CaptionedImage
          src={`${IMG}/front-detail-binary.png`}
          alt={t('front.typeImg1Caption')}
          caption={t('front.typeImg1Caption')}
          width={SHOT_W}
          height={SHOT_H}
        />
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CaptionedImage
            src={`${IMG}/front-detail-categorical.png`}
            alt={t('front.typeImg2Caption')}
            caption={t('front.typeImg2Caption')}
            width={SHOT_W}
            height={SHOT_H}
          />
          <CaptionedImage
            src={`${IMG}/front-detail-grouped.png`}
            alt={t('front.typeImg3Caption')}
            caption={t('front.typeImg3Caption')}
            width={SHOT_W}
            height={SHOT_H}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <CaptionedImage
          src={`${IMG}/front-detail-updown.png`}
          alt={t('front.typeImg4Caption')}
          caption={t('front.typeImg4Caption')}
          width={SHOT_W}
          height={SHOT_H}
        />
      </ScrollReveal>

      {/* 5c — Order UX */}
      <ScrollReveal className={`${SECTION} mb-8 mt-16`}>
        <SubHeading label="5C — ORDER EXPERIENCE" title={t('front.subCTitle')} />
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
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <CalloutCard key={n} title={t(`front.d${n}Title`)} body={t(`front.d${n}Body`)} />
          ))}
        </div>
        <CalloutCard title={t('front.limitTitle')} body={t('front.limitBody')} />
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
          <PhoneShot
            src={`${IMG}/mobile-detail-binary.png`}
            alt={t('front.orderImg1Caption')}
            caption={t('front.orderImg1Caption')}
          />
          <PhoneShot
            src={`${IMG}/mobile-order-sheet.png`}
            alt={t('front.orderImg2Caption')}
            caption={t('front.orderImg2Caption')}
          />
        </div>
      </ScrollReveal>

      {/* 5d — Close position */}
      <ScrollReveal className={`${SECTION} mb-8 mt-16`}>
        <SubHeading label="5D — CLOSE POSITION" title={t('front.subDTitle')} />
        <p className="mb-8 text-[16px] leading-[1.75] text-text-secondary">{t('front.subDBody')}</p>
        <div className="mb-6">
          <DataTable
            title={t('front.qTitle')}
            columns={[t('front.qColQuestion'), t('front.qColVerdict'), t('front.qColReason')]}
            rows={[1, 2, 3, 4, 5].map((n) => [
              t(`front.q${n}Question`),
              t(`front.q${n}Verdict`),
              t(`front.q${n}Reason`),
            ])}
          />
        </div>
        <CalloutCard title={t('front.copyTitle')} body={t('front.copyBody')} />
      </ScrollReveal>

      {/* 5e — Portfolio */}
      <ScrollReveal className={`${SECTION} mb-8 mt-16`}>
        <SubHeading label="5E — PORTFOLIO" title={t('front.subETitle')} />
        <p className="mb-8 text-[16px] leading-[1.75] text-text-secondary">{t('front.subEBody')}</p>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <CalloutCard key={n} title={t(`front.e${n}Title`)} body={t(`front.e${n}Body`)} />
          ))}
        </div>
        <CaptionedImage
          src={`${IMG}/front-portfolio.png`}
          alt={t('front.portfolioImgCaption')}
          caption={t('front.portfolioImgCaption')}
          width={SHOT_W}
          height={SHOT_H}
        />
      </ScrollReveal>

      {/* 5f — Sitewide floor */}
      <ScrollReveal className={`${SECTION} mb-8 mt-16`}>
        <SubHeading label="5F — SITEWIDE FOUNDATIONS" title={t('front.subFTitle')} />
        <p className="mb-8 text-[16px] leading-[1.75] text-text-secondary">{t('front.subFBody')}</p>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <CalloutCard key={n} title={t(`front.f${n}Title`)} body={t(`front.f${n}Body`)} />
          ))}
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
      <ScrollReveal className={`${SECTION} mb-8 mt-16`}>
        <SubHeading label="5G — RESPONSIVE" title={t('front.rwdTitle')} />
        <p className="mb-8 text-[16px] leading-[1.75] text-text-secondary">{t('front.rwdBody')}</p>
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

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <InsightCard
          label={t('front.insightLabel')}
          title={t('front.insightTitle')}
          body={t.rich('front.insightBody', { highlight })}
        />
      </ScrollReveal>

      {/* 06 — Design System */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="06 — DESIGN SYSTEM" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('design.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('design.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <CalloutCard key={n} title={t(`design.card${n}Title`)} body={t(`design.card${n}Body`)} />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <DataTable
          title={t('design.defenseTitle')}
          columns={[t('design.defenseColName'), t('design.defenseColWhen'), t('design.defenseColHow')]}
          rows={[1, 2, 3].map((n) => [
            t(`design.defense${n}Name`),
            t(`design.defense${n}When`),
            t(`design.defense${n}How`),
          ])}
        />
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8">
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            {t('design.ratchetTitle')}
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t.rich('design.ratchetBody', { highlight })}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <ImagePlaceholder label={t('design.imageLabel')} ratio="16/9" />
      </ScrollReveal>

      {/* 07 — Admin Console */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="07 — ADMIN CONSOLE" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('admin.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('admin.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <CalloutCard key={n} title={t(`admin.card${n}Title`)} body={t(`admin.card${n}Body`)} />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <CalloutCard title={t('admin.styleTitle')} body={t('admin.styleBody')} />
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

      {/* 08 — Engineering & Governance */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="08 — ENGINEERING & GOVERNANCE" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('governance.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('governance.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CalloutCard title={t('governance.mockTitle')} body={t('governance.mockBody')} />
          <CalloutCard title={t('governance.mobileTitle')} body={t('governance.mobileBody')} />
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="glass-medium rounded-2xl p-6 md:p-10">
          <h3 className="mb-6 font-[var(--font-display)] text-lg font-semibold text-text-primary md:text-xl">
            {t('governance.phaseTitle')}
          </h3>
          <div className="flex flex-col gap-0">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="flex gap-5 border-b border-white/[0.05] py-5 last:border-b-0 md:gap-6"
              >
                <span className="select-none font-[var(--font-mono)] text-2xl font-bold leading-none text-accent/30 md:text-3xl">
                  0{n}
                </span>
                <div>
                  <h4 className="mb-1.5 font-[var(--font-display)] text-[16px] font-semibold text-text-primary md:text-lg">
                    {t(`governance.phase${n}Title`)}
                  </h4>
                  <p className="text-[15px] leading-[1.7] text-text-secondary">
                    {t(`governance.phase${n}Body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <InsightCard
          label={t('governance.insightLabel')}
          title={t('governance.insightTitle')}
          body={t.rich('governance.insightBody', { highlight })}
        />
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2].map((n) => (
            <CalloutCard key={n} title={t(`governance.card${n}Title`)} body={t(`governance.card${n}Body`)} />
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <CaptionedImage
          src={`${IMG}/admin-progress.png`}
          alt={t('governance.imageCaption')}
          caption={t('governance.imageCaption')}
          width={3024}
          height={1718}
        />
      </ScrollReveal>

      {/* 09 — Impact & Scope */}
      <ScrollReveal className={`${SECTION} mb-8`}>
        <SectionLabel label="09 — IMPACT & SCOPE" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('impact.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">{t('impact.body')}</p>
      </ScrollReveal>

      <ScrollReveal className={`${SECTION} mb-8`}>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 text-center">
              <span className="mb-2 block font-[var(--font-mono)] text-4xl font-bold text-accent md:text-5xl">
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

      {/* 10 — Reflection */}
      <ScrollReveal className={`${SECTION} mb-[var(--cs-section-gap)]`}>
        <SectionLabel label="10 — REFLECTION" />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('reflection.heading')}
        </h2>
        <div className="glass-medium rounded-2xl p-8 md:p-10">
          {[1, 2, 3, 4, 5].map((n) => (
            <p
              key={n}
              className={`text-[18px] leading-[1.7] text-text-secondary ${n < 5 ? 'mb-5' : ''}`}
            >
              {t.rich(`reflection.p${n}`, { highlight })}
            </p>
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
