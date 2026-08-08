'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { useProjectNav } from '@/hooks/useProjectNav';

const IMG = '/images/projects/play-to-earn';
const CURRENT_ID = 'play-to-earn';

const metaKeys = ['role', 'duration', 'scope'] as const;

const challengeCardStyles = [
  { gradient: 'linear-gradient(135deg, rgba(56, 189, 248, 0.14) 0%, rgba(14, 165, 233, 0.04) 100%)', border: 'rgba(56, 189, 248, 0.22)', glow: 'rgba(56, 189, 248, 0.08)', labelColor: 'rgb(125, 211, 252)' },
  { gradient: 'linear-gradient(135deg, rgba(0, 229, 208, 0.14) 0%, rgba(20, 184, 166, 0.04) 100%)', border: 'rgba(0, 229, 208, 0.22)', glow: 'rgba(0, 229, 208, 0.08)', labelColor: 'var(--color-accent)' },
  { gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.14) 0%, rgba(16, 185, 129, 0.04) 100%)', border: 'rgba(52, 211, 153, 0.22)', glow: 'rgba(52, 211, 153, 0.08)', labelColor: 'var(--color-accent)' },
];

const visualPrincipleStyles = [
  { icon: 'ri-shape-line', accent: 'rgb(125, 211, 252)', tint: 'rgba(56, 189, 248, 0.14)' },
  { icon: 'ri-palette-line', accent: 'var(--color-accent)', tint: 'rgba(0, 229, 208, 0.14)' },
  { icon: 'ri-contrast-2-line', accent: 'rgb(110, 231, 183)', tint: 'rgba(52, 211, 153, 0.14)' },
];

const deliverableSlides = [
  { src: 'Image Slot — 最終 IP 形象定稿.png', altKey: 'slide1Alt', width: 2400, height: 1500 },
  { src: 'Image Slot — 中英雙語簡報封面與內頁.png', altKey: 'slide2Alt', width: 2400, height: 1500 },
] as const;

export default function PlayToEarnClient() {
  const { prev: prevProject, next: nextProject } = useProjectNav(CURRENT_ID);
  const t = useTranslations('caseStudy.playToEarn');
  const tp = useTranslations('projectsPage');
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = deliverableSlides.length;
  const goPrevSlide = () => setSlideIndex((i) => (i - 1 + totalSlides) % totalSlides);
  const goNextSlide = () => setSlideIndex((i) => (i + 1) % totalSlides);
  const activeSlide = deliverableSlides[slideIndex];

  return (
    <>
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

      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-6 pb-16 pt-24 md:px-12">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={`${IMG}/Chick Hero.jpg`}
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
            className="mb-3 font-[var(--font-display)] text-[32px] font-bold text-text-primary md:text-[52px]"
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

      <ScrollReveal className="mx-auto mt-20 max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
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

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('background.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('background.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('background.body')}
        </p>
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 md:p-8">
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
          <p className="mb-6 font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-accent">
            Design Constraint
          </p>
          <div>
            <div>
              <p className="font-[var(--font-display)] text-xl font-semibold leading-snug text-text-primary md:text-2xl">
                {t('background.constraintTitle')}
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-text-secondary">
                {t('background.constraintBody')}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('coreProblem.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('coreProblem.heading')}
        </h2>
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 pl-7 md:p-8 md:pl-10">
          <div className="absolute bottom-6 left-0 top-6 w-1 rounded-r-full bg-accent" />
          <p className="mb-4 font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-accent">
            Design Question
          </p>
          <p className="max-w-5xl font-[var(--font-display)] text-lg font-semibold leading-[1.55] text-text-primary md:text-[22px]">
            {t('coreProblem.question')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {challengeCardStyles.map((style, index) => {
            return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:translate-y-[-4px] md:p-8"
              style={{
                background: style.gradient,
                border: `1px solid ${style.border}`,
                boxShadow: `0 18px 56px ${style.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-70" />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${style.border} 100%)`,
                }}
              />
              <div
                className="absolute right-0 top-0 h-24 w-24 rounded-full opacity-20 blur-2xl"
                style={{
                  background: style.border,
                  transform: 'translate(30%, -30%)',
                }}
              />
              <div className="relative z-10 mb-8 flex items-center justify-between">
                <span
                  className="rounded-full border px-3 py-1.5 font-[var(--font-mono)] text-[11px] font-semibold uppercase tracking-[1.4px]"
                  style={{
                    borderColor: style.border,
                    background: `${style.border}22`,
                    color: style.labelColor,
                  }}
                >
                  Layer 0{index + 1}
                </span>
                <span className="font-[var(--font-mono)] text-sm font-bold text-text-muted/60">
                  0{index + 1}
                </span>
              </div>
              <h3 className="relative z-10 mb-4 font-[var(--font-display)] text-xl font-semibold text-text-primary">
                {t(`coreProblem.card${index + 1}Title`)}
              </h3>
              <p className="relative z-10 text-[16px] leading-[1.8] text-text-secondary">{t(`coreProblem.card${index + 1}Body`)}</p>
            </div>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('insight.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('insight.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('insight.body')}
        </p>
        <div className="mb-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <Image
            src={`${IMG}/Image Slot — 玩家視角與 UX 判斷補充圖.png`}
            alt={t('insight.img1Alt')}
            width={2524}
            height={1584}
            className="h-auto w-full"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <Image
            src={`${IMG}/Image Slot — 玩家視角與 UX 判斷補充圖 2.png`}
            alt={t('insight.img2Alt')}
            width={2400}
            height={1500}
            className="h-auto w-full"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('aiTools.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('aiTools.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('aiTools.body')}
        </p>
        <div className="mb-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <Image
            src={`${IMG}/Image Slot — AI 輔助 IP 角色風格提案.png`}
            alt={t('aiTools.imgAlt')}
            width={2400}
            height={1356}
            className="h-auto w-full"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('visualSystem.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('visualSystem.heading')}
        </h2>
        <p className="mb-8 text-[18px] leading-[1.7] text-text-secondary">
          {t('visualSystem.body')}
        </p>
        <div className="mb-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <Image
            src={`${IMG}/Image Slot — IP 視覺語言與 UI 元件延伸.png`}
            alt={t('visualSystem.imgAlt')}
            width={2804}
            height={1704}
            className="h-auto w-full"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {visualPrincipleStyles.map((item, idx) => (
            <div
              key={idx}
              className="group glass-medium relative overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at top right, ${item.tint}, transparent 70%)`,
                }}
              />
              <div className="relative z-10 mb-6 flex items-center justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: `color-mix(in srgb, ${item.accent} 32%, transparent)`,
                    background: `color-mix(in srgb, ${item.accent} 12%, transparent)`,
                    color: item.accent,
                  }}
                >
                  <i className={`${item.icon} text-xl`} />
                </span>
                <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[2px] text-text-muted">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="relative z-10 mb-3 font-[var(--font-display)] text-[20px] font-semibold text-text-primary">
                {t(`visualSystem.principle${idx + 1}Title`)}
              </h3>
              <p className="relative z-10 text-[15px] leading-[1.75] text-text-secondary">
                {t(`visualSystem.principle${idx + 1}Body`)}
              </p>
              <div
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('deliverables.label')} />
        <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-text-primary md:text-[32px]">
          {t('deliverables.heading')}
        </h2>
        <div className="glass-medium mb-8 rounded-2xl p-6 md:p-8">
          <div className="space-y-3">
            {(t.raw('deliverables.list') as string[]).map((item) => (
              <div key={item} className="flex items-start gap-2 text-[16px] text-text-secondary">
                <i className="ri-check-line mt-0.5 shrink-0 text-accent" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]"
            style={{ aspectRatio: `${activeSlide.width} / ${activeSlide.height}` }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={`${IMG}/${activeSlide.src}`}
                  alt={t(`deliverables.${activeSlide.altKey}`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={goPrevSlide}
            aria-label={t('deliverables.prevSlideAria')}
            className="group absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-text-primary backdrop-blur transition-all duration-300 hover:border-accent/60 hover:bg-black/55 hover:text-accent md:left-5 md:h-12 md:w-12"
          >
            <i className="ri-arrow-left-s-line text-xl" />
          </button>
          <button
            type="button"
            onClick={goNextSlide}
            aria-label={t('deliverables.nextSlideAria')}
            className="group absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-text-primary backdrop-blur transition-all duration-300 hover:border-accent/60 hover:bg-black/55 hover:text-accent md:right-5 md:h-12 md:w-12"
          >
            <i className="ri-arrow-right-s-line text-xl" />
          </button>
          <div className="mt-5 flex items-center justify-center gap-2">
            {deliverableSlides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setSlideIndex(i)}
                aria-label={t('deliverables.dotAria', { num: i + 1 })}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === slideIndex ? 'w-8 bg-accent' : 'w-4 bg-white/25 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>

<ScrollReveal className="mx-auto mb-12 max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
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
          <Link
            href={nextProject.link}
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
