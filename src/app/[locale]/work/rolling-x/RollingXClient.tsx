'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import VideoEmbed from '@/components/ui/VideoEmbed';
import { navigableProjects } from '@/data/projects';

const IMG = '/images/projects/rolling-x';
const CURRENT_ID = 'rolling-x';
const currentIdx = navigableProjects.findIndex((p) => p.id === CURRENT_ID);
const prevProject = navigableProjects[(currentIdx - 1 + navigableProjects.length) % navigableProjects.length];
const nextProject = navigableProjects[(currentIdx + 1) % navigableProjects.length];
const uiDesignImages = [
  { width: 3022, height: 1714 },
  { width: 3024, height: 1720 },
  { width: 3022, height: 1720 },
  { width: 3020, height: 1722 },
  { width: 3018, height: 1724 },
  { width: 3024, height: 1724 },
  { width: 3020, height: 1722 },
  { width: 3022, height: 1718 },
];
const uiDesignLabels = [
  '資產總覽',
  '資產總覽',
  '錢包：入金',
  '錢包：出入金紀錄',
  '利息收益',
  '訊息通知',
  '用戶管理',
  'API 權限設定',
];
const decisionOptionImages = {
  A: { width: 1512, height: 862 },
  B: { width: 1511, height: 857 },
};

export default function RollingXClient() {
  const t = useTranslations('caseStudy.rolling-x');
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
      {/* ========== Back Navigation ========== */}
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

      {/* ========== Hero Banner ========== */}
      <section className="relative w-full overflow-hidden" style={{ height: '70vh', minHeight: 400 }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={`${IMG}/hero.jpg`}
            alt={t('hero.title')}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
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

      {/* ========== Metadata Bar ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mt-20 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(['result', 'scope'] as const).map((key) => (
            <div
              key={key}
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 229, 208, 0.08) 0%, rgba(0, 229, 208, 0.02) 100%)',
                border: '1px solid rgba(0, 229, 208, 0.15)',
                boxShadow: '0 4px 24px rgba(0, 229, 208, 0.06)',
              }}
            >
              <p className="mb-3 inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 font-[var(--font-mono)] text-[13px] font-semibold text-accent uppercase tracking-[1.5px]">
                {t(`meta.${key}Label`)}
              </p>
              <p className="text-[16px] font-medium text-text-secondary">
                {t(`meta.${key}Value`)}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ========== Section 1: 專案背景 ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('background.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('background.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('background.intro')}
        </p>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.16,
              },
            },
          }}
        >
          {([
            { key: 'challenge', tone: 'earth' },
            { key: 'solution', tone: 'cyan' },
            { key: 'task', tone: 'accent' },
          ] as const).map(({ key, tone }, index) => {
            const isChallenge = tone === 'earth';
            return (
              <motion.div
                key={key}
                className={`relative overflow-hidden rounded-2xl border p-6 ${
                  isChallenge
                    ? 'border-[#C9A45A]/20 bg-[#C9A45A]/[0.055]'
                    : 'border-accent/15 bg-accent/[0.045]'
                }`}
                variants={{
                  hidden: { opacity: 0, y: 42, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className={`absolute right-0 top-0 h-24 w-24 rounded-full blur-3xl ${
                    isChallenge ? 'bg-[#C9A45A]/12' : 'bg-accent/10'
                  }`}
                />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <p className={`inline-flex rounded-full border px-3 py-1.5 font-[var(--font-mono)] text-[12px] font-semibold uppercase tracking-[1.3px] ${
                      isChallenge
                        ? 'border-[#C9A45A]/25 bg-[#C9A45A]/12 text-[#C9A45A]'
                        : 'border-accent/20 bg-accent/10 text-accent'
                    }`}>
                      {t(`background.${key}Label`)}
                    </p>
                    <span className={`font-[var(--font-mono)] text-sm font-bold ${isChallenge ? 'text-[#C9A45A]/80' : 'text-accent/80'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-3">
                    {t(`background.${key}Title`)}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-text-secondary">
                    {t(`background.${key}Body`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 1-A: Why Now */}
        <div className="mb-8">
          <div
            className="rounded-2xl p-8 md:p-10 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 229, 208, 0.06) 0%, rgba(0, 229, 208, 0.01) 100%)',
              border: '1px solid rgba(0, 229, 208, 0.12)',
            }}
          >
            {/* Header */}
            <p className="font-[var(--font-mono)] text-xs text-accent uppercase tracking-[2px] mb-3">
              Why Now
            </p>
            <h3 className="font-[var(--font-display)] text-xl md:text-2xl font-semibold text-text-primary mb-2">
              {t('background.whyNow.title')}
            </h3>
            <p className="text-[16px] leading-[1.7] text-text-secondary mb-6">
              {t('background.whyNow.intro')}
            </p>

            {/* Numbered bullet cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {([1, 2, 3] as const).map((n) => (
                <div
                  key={n}
                  className="rounded-xl p-5"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/15 text-accent font-[var(--font-mono)] text-xs font-bold mb-3">
                    {n}
                  </span>
                  <p className="text-[14px] leading-[1.6] text-text-secondary">
                    {t(`background.whyNow.bullet${n}`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="border-t border-white/[0.06] pt-5">
              <p className="text-[16px] leading-[1.7] text-text-secondary">
                {t('background.whyNow.conclusion')}
              </p>
            </div>
          </div>
        </div>

      </ScrollReveal>

      {/* ========== Section 2: 競品分析 ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('competitive.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('competitive.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('competitive.body')}
        </p>

        {/* 競品總覽表格 */}
        <div className="glass-medium rounded-2xl p-6 md:p-8 overflow-x-auto mb-16">
          <table className="w-full min-w-[760px] border-collapse md:min-w-0">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-4 py-4 font-mono text-xs text-text-muted uppercase tracking-[2px]">
                  {t('competitive.table.colName')}
                </th>
                <th className="text-left px-4 py-4 font-mono text-xs text-text-muted uppercase tracking-[2px]">
                  {t('competitive.table.colPlatform')}
                </th>
                <th className="text-left px-4 py-4 font-mono text-xs text-text-muted uppercase tracking-[2px]">
                  {t('competitive.table.colPricing')}
                </th>
                <th className="text-left px-4 py-4 font-mono text-xs text-text-muted uppercase tracking-[2px]">
                  {t('competitive.table.colFeature')}
                </th>
                <th className="text-left px-4 py-4 font-mono text-xs text-text-muted uppercase tracking-[2px]">
                  {t('competitive.table.colWeakness')}
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((n) => (
                <tr key={n} className="border-b border-border/50 last:border-b-0">
                  <td className="px-4 py-4 text-[14px] font-medium text-accent whitespace-nowrap">
                    <span className="competitive-table-clamp">
                      {t(`competitive.table.row${n}Name`)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[14px] text-text-secondary">
                    <span className="competitive-table-clamp">
                      {t(`competitive.table.row${n}Platform`)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[14px] text-text-secondary">
                    <span className="competitive-table-clamp">
                      {t(`competitive.table.row${n}Pricing`)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[14px] text-text-secondary">
                    <span className="competitive-table-clamp">
                      {t(`competitive.table.row${n}Feature`)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[14px] text-text-muted">
                    <span className="competitive-table-clamp">
                      {t(`competitive.table.row${n}Weakness`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 補充文字 */}
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('competitive.fulyIntro')}
        </p>

        {/* 痛點 — UX Audit Findings */}
        <div
          className="grid grid-cols-1 gap-6 rounded-2xl p-6 md:grid-cols-[280px_1fr] md:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(201, 164, 90, 0.08) 0%, rgba(255, 255, 255, 0.025) 52%, rgba(0, 229, 208, 0.035) 100%)',
            border: '1px solid rgba(201, 164, 90, 0.16)',
          }}
        >
          <div className="flex flex-col justify-between gap-8">
            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[2px] text-[#C9A45A]">
                Fuly.ai UX Audit
              </p>
              <h3 className="mt-3 font-[var(--font-display)] text-2xl font-semibold leading-tight text-text-primary">
                三個阻礙新手的關鍵摩擦
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-text-muted">
                從註冊、啟動到報表查看，逐步拆解用戶最容易流失的節點。
              </p>
            </div>
            <div className="hidden rounded-xl border border-white/[0.1] bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:block">
              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.5px] text-text-muted">
                拆解重點
              </p>
              <p className="mt-2 text-sm leading-[1.6] text-text-secondary">
                註冊流程複雜度、系統狀態回饋、績效資訊清晰度
              </p>
            </div>
          </div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                className="group relative overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition-all duration-300 hover:border-[#C9A45A]/25 hover:bg-white/[0.065]"
                variants={{
                  hidden: { opacity: 0, y: 52, scale: 0.97 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-[#C9A45A]/70" />
                <div className="grid gap-4 md:grid-cols-[56px_1fr] md:items-start">
                  <div className="font-[var(--font-mono)] text-[26px] font-bold leading-none text-[#C9A45A] md:text-[30px]">
                    {String(n).padStart(2, '0')}
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary">
                        {t(`competitive.pain${n}.title`)}
                      </h3>
                    </div>
                    <p className="text-[15px] leading-[1.75] text-text-secondary">
                      {t(`competitive.pain${n}.body`)}
                    </p>
                    {n === 1 && (
                      <p className="mt-3 text-[13px] leading-[1.6] text-text-muted">
                        {t('competitive.pain1.note')}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <Image
            src={`${IMG}/三個阻礙新手的關鍵摩擦.png`}
            alt="三個阻礙新手的關鍵摩擦"
            width={2400}
            height={805}
            className="h-auto w-full opacity-[0.85]"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
        <p className="mt-3 text-center text-[13px] leading-relaxed text-accent">
          Fuly.ai 的 Dashbaord 視覺層級不明確，績效報表缺乏直覺性
        </p>
      </ScrollReveal>

      {/* ========== Section 3: 設計策略 ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('strategy.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('strategy.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t.rich('strategy.body', {
            highlight: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </p>

        {/* 對照表格 */}
        <div className="glass-medium rounded-2xl p-6 md:p-8 overflow-x-auto mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-4 py-4 text-red-400 font-mono text-xs uppercase">
                  {t('strategy.table.colFuly')}
                </th>
                <th className="text-left px-4 py-4 text-accent font-mono text-xs uppercase">
                  {t('strategy.table.colRolling')}
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((n) => (
                <tr key={n} className="border-b border-border/50 last:border-b-0">
                  <td className="px-4 py-4 text-[16px] text-text-muted">
                    {t(`strategy.table.row${n}Fuly`)}
                  </td>
                  <td className="px-4 py-4 text-[16px] text-text-secondary">
                    {t(`strategy.table.row${n}Rolling`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Before / After 用戶旅程對比 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before — Fuly.ai */}
          <div
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(201, 164, 90, 0.08) 0%, rgba(201, 164, 90, 0.015) 100%)',
              border: '1px solid rgba(201, 164, 90, 0.16)',
            }}
          >
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-mono font-medium mb-6"
              style={{
                background: 'rgba(201, 164, 90, 0.13)',
                color: 'rgb(201, 164, 90)',
                border: '1px solid rgba(201, 164, 90, 0.24)',
              }}
            >
              {t('strategy.before.tag')}
            </span>
            <div className="space-y-0">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((n) => (
                <div
                  key={n}
                  className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-b-0"
                >
                  <span
                    className="flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-[10px] font-mono font-bold"
                    style={{
                      background: 'rgba(201, 164, 90, 0.12)',
                      color: 'rgb(201, 164, 90)',
                    }}
                  >
                    {n}
                  </span>
                  <span className="text-[14px] text-text-muted">{t(`strategy.before.step${n}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After — Rolling */}
          <div
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(0, 229, 208, 0.06) 0%, rgba(0, 229, 208, 0.01) 100%)',
              border: '1px solid rgba(0, 229, 208, 0.12)',
            }}
          >
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-mono font-medium bg-accent/15 text-accent border border-accent/20 mb-6">
              {t('strategy.after.tag')}
            </span>
            <div className="space-y-0">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-b-0"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full shrink-0 bg-accent/15 text-accent">
                    <i className="ri-check-line text-xs" />
                  </span>
                  <span className="text-[14px] text-text-secondary">{t(`strategy.after.step${n}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ========== Section 4: 目標用戶 & User Story ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('targetUser.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('targetUser.heading')}
        </h2>

        {/* 3 欄 TA Cards — gradient */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {([
            { n: 1, gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.14) 0%, rgba(14, 165, 233, 0.04) 100%)', border: 'rgba(56, 189, 248, 0.22)', glow: 'rgba(56, 189, 248, 0.08)' },
            { n: 2, gradient: 'linear-gradient(135deg, rgba(0, 229, 208, 0.14) 0%, rgba(20, 184, 166, 0.04) 100%)', border: 'rgba(0, 229, 208, 0.22)', glow: 'rgba(0, 229, 208, 0.08)' },
            { n: 3, gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.14) 0%, rgba(16, 185, 129, 0.04) 100%)', border: 'rgba(52, 211, 153, 0.22)', glow: 'rgba(52, 211, 153, 0.08)' },
          ] as const).map(({ n, gradient, border, glow }) => (
            <div
              key={n}
              className="group relative rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:translate-y-[-4px]"
              style={{
                background: gradient,
                border: `1px solid ${border}`,
                boxShadow: `0 18px 56px ${glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-70" />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${border} 100%)`,
                }}
              />
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 blur-2xl"
                style={{
                  background: border,
                  transform: 'translate(30%, -30%)',
                }}
              />
              <div className="relative z-10 mb-8 flex items-center justify-between">
                <span
                  className="rounded-full border px-3 py-1.5 font-[var(--font-mono)] text-[11px] font-semibold uppercase tracking-[1.4px]"
                  style={{
                    borderColor: border,
                    background: `${border}22`,
                    color: n === 1 ? 'rgb(125, 211, 252)' : 'var(--color-accent)',
                  }}
                >
                  Target 0{n}
                </span>
                <span className="font-[var(--font-mono)] text-sm font-bold text-text-muted/60">
                  0{n}
                </span>
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-semibold text-text-primary mb-4 relative z-10">
                {t(`targetUser.ta${n}.title`)}
              </h3>
              <p className="text-[16px] leading-[1.8] text-text-secondary relative z-10">
                {t.rich(`targetUser.ta${n}.body`, {
                  highlight: (chunks) => <span className="text-accent">{chunks}</span>,
                })}
              </p>
            </div>
          ))}
        </div>

        {/* User Story video */}
        <div className="mt-8">
          <VideoEmbed videoId="A-M2QrMDbbk" width="wide" padded={false} />
        </div>

        {/* User Story List */}
        <div className="mt-8 rounded-2xl border border-accent/15 bg-gradient-to-br from-accent/[0.08] via-white/[0.025] to-transparent p-6 md:p-8">
          <div className="mb-7 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[2px] text-accent">
                User Story
              </p>
              <h3 className="mt-2 font-[var(--font-display)] text-xl font-semibold text-text-primary">
                從使用者情境收斂核心需求
              </h3>
            </div>
            <p className="max-w-md text-sm leading-[1.7] text-text-muted">
              將競品痛點轉譯成三個產品需要直接回答的問題。
            </p>
          </div>

          <div className="relative">
            <div className="space-y-5">
              {[1, 2, 3].map((n) => (
                <div key={n} className="relative grid gap-4 md:grid-cols-[40px_1fr] md:gap-5">
                  {n < 3 && (
                    <div className="absolute left-[19px] top-10 hidden h-5 w-px bg-accent/25 md:block" />
                  )}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-white/[0.06] font-[var(--font-mono)] text-sm font-bold text-accent shadow-[0_0_24px_rgba(0,229,208,0.14)]">
                    {String(n).padStart(2, '0')}
                  </div>
                  <div className="rounded-xl border border-white/[0.1] bg-white/[0.05] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <p className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[1.5px] text-accent/80">
                      User Story {String(n).padStart(2, '0')}
                    </p>
                    <p className="text-[16px] md:text-[18px] leading-[1.75] text-text-secondary">
                      {t(`targetUser.story${n}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </ScrollReveal>

      {/* ========== Section 5: 功能規劃 & Site Map ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('featurePlanning.label')} />

        {/* Site Map */}
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('featurePlanning.sitemapHeading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('featurePlanning.sitemapBody')}
        </p>
        <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-bg-tertiary" style={{ aspectRatio: '16/10' }}>
          <Image src={`${IMG}/sitemap.png`} alt={t('featurePlanning.sitemapHeading')} fill className="object-cover" sizes="1200px" />
        </div>
      </ScrollReveal>

      {/* ========== Section 6: 關鍵設計決策 ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[calc(var(--cs-section-gap)-32px)]">
        <SectionLabel label={t('decisions.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('decisions.heading')}
        </h2>

        {/* 決策 ① 資產概覽 */}
        <h3 className="font-[var(--font-display)] text-xl md:text-2xl font-semibold text-text-primary mb-4">
          {t('decisions.d1.title')}
        </h3>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('decisions.d1.question')}
        </p>

        {/* Option Cards — 2 欄 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {(['A', 'B'] as const).map((opt) => {
            const isSelected = opt === 'B';
            return (
              <div key={opt} className="glass-medium rounded-2xl overflow-hidden hover:border-white/[0.15] transition-colors duration-300">
                <div className={`h-1 ${isSelected ? 'bg-accent' : 'bg-text-muted/30'}`} />
                <div className="p-6 md:p-8">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src={`${IMG}/decision-1-option-${opt.toLowerCase()}.png`}
                      alt={t(`decisions.d1.option${opt}.title`)}
                      width={decisionOptionImages[opt].width}
                      height={decisionOptionImages[opt].height}
                      className="h-auto w-full"
                      sizes="600px"
                    />
                  </div>
                  <h4 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mt-4 mb-2">
                    {t(`decisions.d1.option${opt}.title`)}
                  </h4>
                  <p className="text-[16px] leading-[1.7] text-text-secondary mb-3">
                    {t(`decisions.d1.option${opt}.desc`)}
                  </p>
                  {/* Pros / Cons */}
                  {isSelected ? (
                    <p className="text-sm text-accent flex items-start gap-1.5">
                      <i className="ri-check-line mt-0.5 shrink-0" />
                      {t('decisions.d1.optionB.pros')}
                    </p>
                  ) : (
                    <p className="text-sm text-red-400 flex items-start gap-1.5">
                      <i className="ri-close-line mt-0.5 shrink-0" />
                      {t(`decisions.d1.option${opt}.cons`)}
                    </p>
                  )}
                  {/* Verdict tag */}
                  <div className="mt-4">
                    {isSelected ? (
                      <span className="inline-block px-3 py-1 text-xs rounded-full bg-accent/15 text-accent border border-accent/20">
                        {t('decisions.d1.optionB.verdict')}
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                        {t('decisions.rejected')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 選擇理由 Callout */}
        <div className="glass-medium rounded-2xl p-6 md:p-8 border-l-[3px] border-l-accent mb-8">
          <h4 className="font-semibold text-text-primary mb-2">
            {t('decisions.d1.callout.title')}
          </h4>
          <p className="text-[16px] leading-[1.7] text-text-secondary">
            {t.rich('decisions.d1.callout.body', {
              highlight: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
          </p>
        </div>
      </ScrollReveal>

      {/* ========== Section 7: 介面設計 ========== */}
      <section
        ref={uiSectionRef}
        className="relative mb-[calc(var(--cs-section-gap)-32px)]"
        style={{ height: uiScrollDistance ? `${uiScrollDistance}px` : '180vh' }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="w-full">
            <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
              <SectionLabel label={t('uiDesign.label')} />
              <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary">
                  {t('uiDesign.heading')}
                </h2>
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[1.5px] text-text-muted">
                  Scroll to explore
                </p>
              </div>
            </div>

            <div ref={uiViewportRef} className="mx-auto max-w-[var(--cs-wide-max-width)] overflow-hidden px-6 md:px-12">
              <motion.div ref={uiTrackRef} className="flex gap-8 pr-[28vw]" style={{ x: uiX }}>
                {uiDesignImages.map(({ width, height }, index) => (
                  <div
                    key={index}
                    className="w-[72vw] max-w-[860px] flex-none overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                  >
                    <Image
                      src={`${IMG}/ui-design-${index + 1}.png`}
                      alt={`${t('uiDesign.heading')} ${index + 1}`}
                      width={width}
                      height={height}
                      className="h-auto w-full"
                      sizes="(max-width: 768px) 72vw, 860px"
                    />
                    <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
                      <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[1.5px] text-accent">
                        {uiDesignLabels[index]}
                      </span>
                      <span className="font-[var(--font-mono)] text-[11px] text-text-muted">
                        {String(index + 1).padStart(2, '0')} / {String(uiDesignImages.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Section 8: Design System ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('designSystem.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('designSystem.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t.rich('designSystem.body', {
            highlight: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </p>
        <VideoEmbed videoId="aBuUIz2CNr4" width="wide" padded={false} />
      </ScrollReveal>

      {/* ========== Section 9: 品牌設計 ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('branding.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('branding.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('branding.body')}
        </p>
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={`${IMG}/logo-design.png`}
              alt={t('branding.heading')}
              width={2880}
              height={934}
              className="h-auto w-full"
              sizes="1200px"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* ========== Section 10: 專案成果 ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('results.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('results.heading')}
        </h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[1, 2].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 text-center hover:border-white/[0.15] transition-colors duration-300">
              <p className="font-[var(--font-display)] text-3xl md:text-4xl font-bold text-accent">
                {t(`results.stat${n}.value`)}
              </p>
              <p className="text-[14px] text-text-muted mt-2">
                {t(`results.stat${n}.label`)}
              </p>
            </div>
          ))}
        </div>

        {/* 說明文字 */}
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-4">
          {t('results.body1')}
        </p>

        {/* 質化成果 */}
        <div className="glass-medium rounded-2xl p-6 md:p-8">
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-start gap-2 text-[16px] text-text-secondary">
                <i className="ri-check-line text-accent mt-0.5 shrink-0" />
                <span>{t(`results.qualitative${n}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ========== Section 11: 反思與學習 ========== */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('reflection.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('reflection.heading')}
        </h2>

        {/* 3 欄 Numbered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 md:p-8 hover:border-white/[0.15] transition-colors duration-300">
              <span className="block font-[var(--font-mono)] text-5xl font-bold text-accent/30 mb-4">
                {String(n).padStart(2, '0')}
              </span>
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-2">
                {t(`reflection.card${n}.title`)}
              </h3>
              <p className="text-[16px] leading-[1.7] text-text-secondary">
                {t.rich(`reflection.card${n}.body`, {
                  highlight: (chunks) => <span className="text-accent">{chunks}</span>,
                })}
              </p>
            </div>
          ))}
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
