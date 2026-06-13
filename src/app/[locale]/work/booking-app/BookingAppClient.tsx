'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
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

const metaKeys = ['role', 'scope', 'platform'] as const;

const dualChallengeStyles = [
  { accent: 'rgb(125, 211, 252)', tint: 'rgba(56, 189, 248, 0.14)', border: 'rgba(56, 189, 248, 0.22)' },
  { accent: 'var(--color-accent)', tint: 'rgba(0, 229, 208, 0.14)', border: 'rgba(0, 229, 208, 0.32)' },
];

const webDualStyles = [
  { accent: 'rgb(125, 211, 252)', tint: 'rgba(56, 189, 248, 0.14)', border: 'rgba(56, 189, 248, 0.22)' },
  { accent: 'rgb(251, 191, 36)', tint: 'rgba(251, 191, 36, 0.14)', border: 'rgba(251, 191, 36, 0.22)' },
];

const DECISION_COUNT = 4;

const highlight = (chunks: ReactNode) => <span className="text-accent">{chunks}</span>;

export default function BookingAppClient() {
  const t = useTranslations('caseStudy.bookingApp');
  const tp = useTranslations('projectsPage');
  const [decisionIdx, setDecisionIdx] = useState(0);
  const goPrev = () => setDecisionIdx((i) => (i - 1 + DECISION_COUNT) % DECISION_COUNT);
  const goNext = () => setDecisionIdx((i) => (i + 1) % DECISION_COUNT);

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
          <Image
            src="/images/projects/booking-app/Buddy Hero.jpg"
            alt={t('hero.alt')}
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

      {/* Metadata Bar */}
      <ScrollReveal className="mx-auto mt-20 max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {metaKeys.map((key) => (
            <div
              key={key}
              className="relative overflow-hidden rounded-2xl border border-accent/15 bg-accent/[0.045] p-6"
            >
              <p className="mb-4 inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 font-[var(--font-mono)] text-[13px] font-semibold uppercase tracking-[1.4px] text-accent">
                {t(`meta.${key}Label`)}
              </p>
              <p className="text-[16px] leading-[1.65] text-text-secondary">{t(`meta.${key}Value`)}</p>
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
              {(t.raw('summaryTags') as string[]).map((tag) => (
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
        <SectionLabel label={t('background.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('background.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('background.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-amber-400 p-6 md:p-8">
          <p className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-amber-400">
            {t('background.calloutLabel')}
          </p>
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            {t('background.calloutHeading')}
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t('background.calloutBody')}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="border-b border-white/[0.08] px-6 py-6 md:px-8 md:py-7">
            <p className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-accent">
              {t('background.axisLabel')}
            </p>
            <h3 className="mb-3 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-[22px]">
              {t('background.axisHeading')}
            </h3>
            <p className="text-[15px] leading-[1.7] text-text-secondary">
              {t('background.axisBody')}
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
                {t('background.demandTitle')}
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-text-muted">
                {t('background.demandDesc')}
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
                {t('background.axisCenterTitle')}
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-text-muted">
                {t('background.axisCenterDesc')}
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
                {t('background.supplyTitle')}
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-text-muted">
                {t('background.supplyDesc')}
              </p>
            </div>
          </div>

          {(t.raw('background.axisRows') as Array<{ consumer: string; dataLabel: string; merchant: string }>).map((row, i, arr) => (
            <div
              key={row.dataLabel}
              className={`grid grid-cols-1 md:grid-cols-12 ${
                i < arr.length - 1 ? 'border-b border-white/[0.05]' : ''
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
              {t('background.opportunityTitle')}
            </p>
            <p className="max-w-3xl text-[16px] leading-[1.7] text-text-secondary">
              {t('background.opportunityBody')}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* 02 — 市場機會 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('market.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('market.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('market.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="border-b border-white/[0.08] px-6 py-5 md:px-8">
            <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary md:text-xl">
              {t('market.tableHeading')}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[14px] md:text-[16px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="w-[22%] px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    {t('market.colDim')}
                  </th>
                  <th className="w-[39%] px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    {t('market.colIntl')}
                  </th>
                  <th className="w-[39%] px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    {t('market.colLocal')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/[0.05]">
                  <td className="px-4 py-5 align-top font-medium text-text-primary md:px-6">{t('market.row1Dim')}</td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">{t('market.row1Intl')}</td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">{t('market.row1Local')}</td>
                </tr>
                <tr className="border-b border-white/[0.05]">
                  <td className="px-4 py-5 align-top font-medium text-text-primary md:px-6">{t('market.row2Dim')}</td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">
                    {t('market.row2Intl')} <span className="ml-1 text-red-400">✗</span>
                  </td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">
                    {t('market.row2Local')} <span className="ml-1 text-amber-400">△</span>
                  </td>
                </tr>
                <tr className="border-b border-white/[0.05]">
                  <td className="px-4 py-5 align-top font-medium text-text-primary md:px-6">{t('market.row3Dim')}</td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">{t('market.row3Intl')}</td>
                  <td className="px-4 py-5 align-top text-text-secondary md:px-6">{t('market.row3Local')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-5 align-top font-medium text-text-primary md:px-6">{t('market.row4Dim')}</td>
                  <td className="px-4 py-5 align-top text-accent md:px-6">{t('market.row4Intl')}</td>
                  <td className="px-4 py-5 align-top text-accent md:px-6">
                    {t('market.row4Local')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border-t border-white/[0.08] bg-white/[0.02] px-6 py-5 md:px-8">
            <p className="text-[14px] leading-[1.7] text-text-secondary">
              <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-accent">Insight ／ </span>
              {t('market.insightCaption')}
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8">
          <h3 className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary">
            {t('market.cardTitle')}
          </h3>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t('market.cardBody')}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start md:gap-8">
          <Image
            src="/images/projects/booking-app/Image Slot — 視覺呈現 01.png"
            alt={t('market.img1Alt')}
            width={1682}
            height={1670}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
          <Image
            src="/images/projects/booking-app/Image Slot — 視覺呈現 02.png"
            alt={t('market.img2Alt')}
            width={1226}
            height={1214}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
        </div>
      </ScrollReveal>

      {/* 03 — 核心設計挑戰 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('challenge.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('challenge.heading')}
        </h2>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {dualChallengeStyles.map((card, idx) => (
            <div
              key={idx}
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
                {t(`challenge.card${idx + 1}Layer`)}
              </span>
              <h3 className="relative z-10 mb-4 mt-5 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-[22px]">
                {t(`challenge.card${idx + 1}Title`)}
              </h3>
              <p className="relative z-10 text-[16px] leading-[1.75] text-text-secondary">
                {t(`challenge.card${idx + 1}Body`)}
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
              {t('challenge.asymLabel')}
            </p>
            <h3 className="mb-3 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-[22px]">
              {t('challenge.asymHeading')}
            </h3>
            <p className="text-[15px] leading-[1.7] text-text-secondary">
              {t('challenge.asymBody')}
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
                {t('challenge.col2cTitle')}
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-text-muted">
                {t('challenge.col2cDesc')}
              </p>
            </div>
            <div
              className="px-5 py-5 md:col-span-5"
              style={{ background: 'rgba(0, 229, 208, 0.05)' }}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.8px] text-accent">
                  {t('challenge.col2bName')}
                </p>
              </div>
              <p className="mt-2 font-[var(--font-display)] text-base font-semibold text-text-primary md:text-[17px]">
                {t('challenge.col2bTitle')}
              </p>
              <p className="mt-1 text-[13px] leading-[1.6] text-text-muted">
                {t('challenge.col2bDesc')}
              </p>
            </div>
          </div>

          {/* Comparison rows */}
          {(t.raw('challenge.rows') as Array<{ label: string; consumer: string; merchant: string }>).map((row, i, arr) => (
            <div
              key={row.label}
              className={`grid grid-cols-1 md:grid-cols-12 ${
                i < arr.length - 1 ? 'border-b border-white/[0.05]' : ''
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
              {t('challenge.readingCaption')}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* 04 — 0~1 設計流程 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('process.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('process.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('process.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
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

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <VideoEmbed videoId="UMYxOdTFVP4" width="wide" padded={false} />
      </ScrollReveal>

      {/* 05 — 設計產出：2C App */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('app.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('app.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('app.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <Image
          src="/images/projects/booking-app/Image Slot — 2C App 主要流程長圖（探索 → 預約 → 完成）.png"
          alt={t('app.flowImgAlt')}
          width={2400}
          height={1175}
          className="h-auto w-full rounded-2xl"
          sizes="(min-width: 768px) 80vw, 100vw"
        />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('app.decisionsLabel')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('app.decisionsHeading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('app.decisionsBody')}
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
                  {t(`app.d${decisionIdx + 1}Stage`)}
                </motion.span>
              </AnimatePresence>

              <div className="flex items-center gap-3">
                <span className="font-[var(--font-mono)] text-[12px] tracking-[1.6px] text-text-muted">
                  {String(decisionIdx + 1).padStart(2, '0')}{' '}
                  <span className="text-text-muted/40">/</span>{' '}
                  {String(DECISION_COUNT).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={t('app.prevAria')}
                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 bg-accent/5 transition-all hover:border-accent/50 hover:bg-accent/10"
                  >
                    <i className="ri-arrow-left-line text-accent transition-transform group-hover:-translate-x-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={t('app.nextAria')}
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
                      {t(`app.d${decisionIdx + 1}Moment`)}
                    </p>
                  </div>
                  <div className="md:col-span-7 md:border-l md:border-white/[0.10] md:pl-10">
                    <h3 className="mb-4 font-[var(--font-display)] text-base font-semibold leading-tight text-text-primary md:text-lg">
                      {t(`app.d${decisionIdx + 1}Title`)}
                    </h3>
                    <p className="text-[15px] leading-[1.75] text-text-secondary md:text-[16px]">
                      {t(`app.d${decisionIdx + 1}Body`)}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicators — pill style */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: DECISION_COUNT }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setDecisionIdx(i)}
                  aria-label={t('app.dotAria', { num: i + 1, stage: t(`app.d${i + 1}Stage`) })}
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
            alt={t('app.img1Alt')}
            width={1196}
            height={5632}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
          <Image
            src="/images/projects/booking-app/Image Slot — App 畫面 02.png"
            alt={t('app.img2Alt')}
            width={1200}
            height={5632}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
        </div>
      </ScrollReveal>

      {/* 06 — 形象網頁分流 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('web.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('web.heading')}
        </h2>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {webDualStyles.map((card, idx) => {
            const n = idx + 1;
            return (
            <div
              key={idx}
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
                {t(`web.card${n}Tag`)}
              </span>
              <h3 className="mt-5 font-[var(--font-display)] text-xl font-semibold text-text-primary md:text-[22px]">
                {t.rich(`web.card${n}Pitch`, {
                  highlight: (chunks) => <span style={{ color: card.accent }}>{chunks}</span>,
                })}
              </h3>
              <dl className="mt-6 space-y-3 text-[15px] text-text-secondary">
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 font-[var(--font-mono)] text-[12px] uppercase tracking-[1.4px] text-text-muted">
                    {t('web.audienceLabel')}
                  </dt>
                  <dd>{t(`web.card${n}Audience`)}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-24 shrink-0 font-[var(--font-mono)] text-[12px] uppercase tracking-[1.4px] text-text-muted">
                    {t('web.pointsLabel')}
                  </dt>
                  <dd>
                    <ul className="space-y-1">
                      {(t.raw(`web.card${n}Points`) as string[]).map((p) => (
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
                    {t('web.ctaLabel')}
                  </dt>
                  <dd style={{ color: card.accent }}>{t(`web.card${n}Cta`)}</dd>
                </div>
              </dl>
            </div>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl border-l-[3px] border-l-accent p-6 md:p-8">
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t('web.caption')}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start md:gap-8">
          <Image
            src="/images/projects/booking-app/Image Slot — 2C 形象網頁.png"
            alt={t('web.img1Alt')}
            width={1195}
            height={8021}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
          <Image
            src="/images/projects/booking-app/Image Slot — 2B 形象網頁.png"
            alt={t('web.img2Alt')}
            width={1195}
            height={8019}
            className="h-auto w-full rounded-2xl"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
        </div>
      </ScrollReveal>

      {/* 07 — 設計產出：2B 後台系統 */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('backend.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('backend.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('backend.body')}
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
                {t(`backend.method1Title`)}
              </h3>
              <div className="mb-5 h-[2px] w-10 rounded-full bg-accent/50" />
              <p className="text-[15px] leading-[1.75] text-text-secondary md:text-[16px]">
                {t(`backend.method1Body`)}
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
              {t(`backend.method2Title`)}
            </h3>
            <div className="relative mb-3 h-[2px] w-8 rounded-full bg-accent/40" />
            <p className="relative text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">
              {t(`backend.method2Body`)}
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
              {t(`backend.method3Title`)}
            </h3>
            <div className="relative mb-3 h-[2px] w-8 rounded-full bg-accent/40" />
            <p className="relative text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">
              {t(`backend.method3Body`)}
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
              {t(`backend.method4Title`)}
            </h3>
            <div className="relative mb-3 h-[2px] w-8 rounded-full bg-accent/40" />
            <p className="relative text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">
              {t(`backend.method4Body`)}
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
                  {t(`backend.method5Title`)}
                </h3>
                <div className="mt-4 h-[2px] w-10 rounded-full bg-accent" />
              </div>
              <div className="md:w-[62%] md:border-l md:border-accent/15 md:pl-10">
                <p className="text-[15px] leading-[1.75] text-text-secondary md:text-[16px]">
                  {t(`backend.method5Body`)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('backend.ifaceLabel')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('backend.ifaceHeading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('backend.ifaceBody')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="border-b border-white/[0.08] px-6 py-5 md:px-8">
            <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary md:text-xl">
              {t('backend.mapHeading')}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[14px] md:text-[16px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="w-1/2 px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    {t('backend.mapColFront')}
                  </th>
                  <th className="w-1/2 px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-accent md:px-6">
                    {t('backend.mapColBack')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(t.raw('backend.mapRows') as [string, string][]).map((row, i, arr) => (
                  <tr
                    key={row[0]}
                    className={i < arr.length - 1 ? 'border-b border-white/[0.05]' : ''}
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
              {t('backend.mapCaption')}
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <Image
          src="/images/projects/booking-app/Image Slot — 物件關聯圖（課程 → 場次 → 訂單）.png"
          alt={t('backend.img1Alt')}
          width={2400}
          height={1175}
          className="h-auto w-full rounded-2xl"
          sizes="(min-width: 768px) 80vw, 100vw"
        />
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <Image
          src="/images/projects/booking-app/Image Slot — 前台課程卡片 ↔ 後台編輯表單的欄位對照圖.png"
          alt={t('backend.img2Alt')}
          width={2400}
          height={1500}
          className="h-auto w-full rounded-2xl"
          sizes="(min-width: 768px) 80vw, 100vw"
        />
      </ScrollReveal>

      {/* 08 — Impact & Scope */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('impact.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('impact.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('impact.body')}
        </p>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[1, 2].map((n, idx) => (
            <div key={n} className="glass-medium rounded-2xl p-6 text-center">
              <span
                className={`mb-2 block font-[var(--font-mono)] text-4xl font-bold md:text-5xl ${
                  idx === 1 ? 'text-accent/70' : 'text-accent'
                }`}
              >
                {t(`impact.metric${n}Value`)}
              </span>
              <p className="text-[15px] font-medium leading-[1.5] text-text-secondary">{t(`impact.metric${n}Label`)}</p>
              <p className="mt-1 text-[12px] leading-[1.5] text-text-muted">{t(`impact.metric${n}Sub`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <h3 className="mb-4 font-[var(--font-display)] text-lg font-semibold text-text-primary">
          {t('impact.experienceHeading')}
        </h3>
        <div className="glass-medium overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    {t('impact.baColDim')}
                  </th>
                  <th className="px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-text-muted md:px-6">
                    {t('impact.baColBefore')}
                  </th>
                  <th className="px-4 py-4 text-left font-[var(--font-mono)] text-xs uppercase tracking-wider text-accent md:px-6">
                    {t('impact.baColAfter')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(t.raw('impact.baRows') as [string, string, string][]).map((row, i, arr) => (
                  <tr
                    key={row[0]}
                    className={i < arr.length - 1 ? 'border-b border-white/[0.05]' : ''}
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
        <SectionLabel label={t('reflection.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('reflection.heading')}
        </h2>
        <div className="glass-medium rounded-2xl p-8 md:p-10">
          <p className="mb-5 text-[18px] leading-[1.7] text-text-secondary">
            {t('reflection.p1')}
          </p>
          <p className="mb-7 text-[18px] leading-[1.7] text-text-secondary">
            {t('reflection.p2')}
          </p>
          <p className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary md:text-xl">
            {t('reflection.sub1')}
          </p>
          <p className="mb-7 text-[18px] leading-[1.7] text-text-secondary">
            {t('reflection.p3')}
          </p>
          <p className="mb-3 font-[var(--font-display)] text-lg font-semibold text-text-primary md:text-xl">
            {t('reflection.sub2')}
          </p>
          <p className="mb-7 text-[18px] leading-[1.7] text-text-secondary">
            {t('reflection.p4')}
          </p>
          <p className="text-[18px] leading-[1.7] text-text-secondary">
            {t('reflection.p5')}
          </p>
        </div>
      </ScrollReveal>

      {/* Project Status — 簡短交代產品最終落點 */}
      <ScrollReveal className="mx-auto mb-[100px] max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
        <p className="text-left text-[13px] leading-[1.75] text-text-muted">
          <span className="mr-2 font-[var(--font-mono)] uppercase tracking-[1.8px] text-text-secondary">
            {t('projectStatus.label')}
          </span>
          {t('projectStatus.body')}
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
