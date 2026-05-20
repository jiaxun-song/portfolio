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

const IMG = '/images/projects/ai-learning-platform';
const CURRENT_ID = 'ai-learning';
const currentIdx = navigableProjects.findIndex((p) => p.id === CURRENT_ID);
const prevProject = navigableProjects[(currentIdx - 1 + navigableProjects.length) % navigableProjects.length];
const nextProject = navigableProjects[(currentIdx + 1) % navigableProjects.length];

const TAB_ICONS = ['ri-search-line', 'ri-question-line', 'ri-book-open-line'] as const;

export default function AILearningClient() {
  const t = useTranslations('caseStudy.aiLearning');
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
            src={`${IMG}/hero-cover.jpg`}
            alt={t('hero.title')}
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
        </motion.div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent" />
        {/* Title group */}
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
              className="font-[var(--font-display)] text-[32px] md:text-[52px] font-bold text-text-primary mb-3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              className="text-base md:text-xl text-text-secondary"
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

      {/* Metadata Bar */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-3 gap-6">
          {(['role', 'timeline', 'outcome'] as const).map((key) => (
            <div key={key}>
              <p className="font-[var(--font-mono)] text-xs text-text-muted uppercase mb-1">
                {t(`meta.${key}Label`)}
              </p>
              <p className="text-[16px] font-medium text-text-secondary flex items-center gap-1.5">
                {t(`meta.${key}Value`)}
                {key === 'outcome' && <i className="ri-trophy-fill text-accent" />}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Section 01 — OVERVIEW */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-12">
        <SectionLabel label={t('overview.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('overview.heading')}
        </h2>
        <p className="text-[18px] md:text-[18px] leading-[1.7] text-text-secondary mb-8 whitespace-pre-line">
          {t('overview.body')}
        </p>
        {/* Callout */}
        <div className="glass-medium rounded-2xl p-6 md:p-8 border-l-[3px] border-l-accent">
          <p className="font-semibold text-text-primary mb-2">{t('overview.calloutTitle')}</p>
          <p className="text-[16px] leading-[1.7] text-text-secondary mb-2">{t('overview.calloutBody')}</p>
          <p className="text-xs text-text-muted italic">{t('overview.calloutSource')}</p>
        </div>
      </ScrollReveal>

      {/* Full-bleed — Product Overview */}
      <div className="mb-[var(--cs-section-gap)]">
        <ImageBlock src={`${IMG}/product-overview.jpg`} alt={t('overview.imageCaption')} width="wide" />
      </div>

      {/* Section 02 — MY ROLE */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('myRole.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('myRole.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">{t('myRole.intro')}</p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 md:p-8 hover:border-white/[0.15] transition-colors duration-300">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-3">
                {t(`myRole.card${n}Title`)}
              </h3>
              <p className="text-[16px] leading-[1.7] text-text-secondary">{t(`myRole.card${n}Body`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]" />

      {/* Section 03 — RESEARCH */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('research.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('research.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">{t('research.body')}</p>
      </ScrollReveal>
      {/* Research: image + 5W1H */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left — image */}
          <div className="rounded-2xl overflow-hidden">
            <Image
              src={`${IMG}/research-overview.png`}
              alt={t('research.img1Caption')}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Right — 5W1H */}
          <div>
            <h3 className="font-[var(--font-mono)] text-[14px] tracking-[3px] uppercase text-accent mb-5">5W1H</h3>
            <div className="space-y-0">
              {([
                { key: 'who', items: 2 },
                { key: 'what', items: 1 },
                { key: 'when', items: 2 },
                { key: 'where', items: 3 },
                { key: 'why', items: 1 },
                { key: 'how', items: 1 },
              ] as const).map(({ key, items }, idx) => (
                <div key={key} className={`flex gap-4 py-4 ${idx > 0 ? 'border-t border-white/[0.06]' : ''}`}>
                  {/* Label column */}
                  <div className="shrink-0 w-16 pt-[2px]">
                    <span className="block font-[var(--font-mono)] text-[14px] tracking-[2px] uppercase text-accent font-medium leading-none mb-1">
                      {key}
                    </span>
                    <span className="block text-[12px] text-text-muted leading-tight">
                      {t(`research.fiveW1H_${key}Title`)}
                    </span>
                  </div>
                  {/* Content column */}
                  <div className="flex-1 space-y-1">
                    {Array.from({ length: items }, (_, i) => (
                      <p key={i} className="text-[14px] leading-[1.6] text-text-secondary">
                        {t(`research.fiveW1H_${key}${i + 1}`)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
      {/* Pain point cards */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 md:p-8 hover:border-white/[0.15] transition-colors duration-300">
              <span className="block font-[var(--font-mono)] text-5xl font-bold text-accent/30 mb-4">
                {String(n).padStart(2, '0')}
              </span>
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-2">
                {t(`research.pain${n}Title`)}
              </h3>
              <p className="text-[16px] leading-[1.7] text-text-secondary">{t(`research.pain${n}Body`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Section 04 — GOAL */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('goal.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('goal.heading')}
        </h2>
        {/* User Stories */}
        <div className="space-y-6 mb-12">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex gap-4 pb-6 border-b border-border/50">
              <span className="font-[var(--font-mono)] text-2xl font-bold text-accent shrink-0">{n}.</span>
              <p className="text-[18px] leading-[1.7] text-text-secondary">{t(`goal.story${n}`)}</p>
            </div>
          ))}
        </div>
        {/* Product Positioning Callout */}
        <div className="glass-medium rounded-2xl p-6 md:p-8">
          <p className="font-semibold text-text-primary mb-4">{t('goal.positionTitle')}</p>
          <ul className="space-y-4 mb-4">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="text-[16px] leading-[1.7] text-text-secondary flex items-start gap-2">
                <span className="text-text-muted mt-[2px]">•</span>
                <span>
                  {t(`goal.pos${n}Before`)}
                  <span className="text-accent">{t(`goal.pos${n}Highlight`)}</span>
                  {t(`goal.pos${n}After`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]" />

      {/* Section 05 — KEY DECISION */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('keyDecision.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('keyDecision.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">{t('keyDecision.intro')}</p>
      </ScrollReveal>
      {/* 2 Option Cards */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(['a', 'b'] as const).map((opt) => {
            const isSelected = opt === 'b';
            return (
              <div key={opt} className="glass-medium rounded-2xl overflow-hidden hover:border-white/[0.15] transition-colors duration-300">
                <div className={`h-1 ${isSelected ? 'bg-accent' : 'bg-text-muted/30'}`} />
                <div className="p-6 md:p-8">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-1">
                    {t(`keyDecision.option${opt.toUpperCase()}Title`)}
                  </h3>
                  <p className="text-xs text-text-muted mb-4">{t(`keyDecision.option${opt.toUpperCase()}Ref`)}</p>
                  <div className="relative w-full rounded-xl overflow-hidden border border-border bg-bg-tertiary mb-4" style={{ aspectRatio: '8/5' }}>
                    <Image src={`${IMG}/option-${opt}.png`} alt="" fill className="object-cover" sizes="400px" />
                  </div>
                  <div className="mb-3 space-y-1">
                    {t(`keyDecision.option${opt.toUpperCase()}Pros`).split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="text-sm text-accent flex items-start gap-1.5">
                        <i className="ri-check-line text-accent mt-0.5 shrink-0" />
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mb-4 space-y-1">
                    {t(`keyDecision.option${opt.toUpperCase()}Cons`).split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="text-sm text-red-400 flex items-start gap-1.5">
                        <i className="ri-close-line text-red-400 mt-0.5 shrink-0" />
                        {line}
                      </p>
                    ))}
                  </div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-[var(--font-mono)] rounded-full ${
                    isSelected
                      ? 'bg-accent/15 text-accent border border-accent/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {isSelected ? <i className="ri-check-line" /> : <i className="ri-close-line" />}
                    {t(`keyDecision.option${opt.toUpperCase()}Verdict`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">{t('keyDecision.reason')}</p>
        {/* Research Insight Callout */}
        <div className="glass-medium rounded-2xl p-6 md:p-8 border-l-[3px] border-l-accent">
          <p className="font-semibold text-text-primary mb-2">{t('keyDecision.insightTitle')}</p>
          <p className="text-[16px] leading-[1.7] text-text-secondary whitespace-pre-line mb-2">
            {t('keyDecision.insightBody')}
          </p>
          <p className="text-xs text-text-muted italic">{t('keyDecision.insightSource')}</p>
        </div>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]" />

      {/* Section 06 — DESIGN DEEP DIVE */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('deepDive.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('deepDive.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary whitespace-pre-line mb-8">{t('deepDive.body')}</p>
      </ScrollReveal>
      {/* 3 Tab Cards */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 md:p-8 hover:border-white/[0.15] transition-colors duration-300">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-1 flex items-center gap-2">
                <i className={`${TAB_ICONS[n - 1]} text-accent`} />
                {t(`deepDive.tab${n}Name`)}
              </h3>
              <span className="inline-block text-xs text-text-muted mb-3">
                <i className="ri-arrow-right-s-line text-accent mr-0.5" />
                {t(`deepDive.tab${n}Maps`).replace('→ ', '')}
              </span>
              <p className="text-[16px] leading-[1.7] text-text-secondary mb-4">{t(`deepDive.tab${n}Desc`)}</p>
              <div className="bg-bg-tertiary rounded-lg px-4 py-2">
                <p className="font-[var(--font-mono)] text-sm text-text-muted italic">{t(`deepDive.tab${n}Example`)}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-12">
        <p className="text-[18px] leading-[1.7] text-text-secondary">{t('deepDive.decision')}</p>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]">
        <VideoEmbed videoId="ors5xM6jNZM" width="wide" />
      </div>

      {/* Section 07 — ITERATION */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('iteration.label')} />
        <div className="flex items-center gap-3 mb-8">
          <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary">
            {t('iteration.heading')}
          </h2>
        </div>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">{t('iteration.body')}</p>
      </ScrollReveal>
      {/* Before/After */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-[var(--font-mono)] rounded-full bg-red-500/10 text-red-400 mb-4">BEFORE</span>
            <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-bg-tertiary" style={{ aspectRatio: '3/2' }}>
              <Image src={`${IMG}/iteration-before.png`} alt="Before" fill className="object-cover" sizes="600px" />
            </div>
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((n) => (
                <p key={n} className="text-sm text-text-muted flex items-start gap-1.5">
                  <i className="ri-close-line text-red-400 mt-0.5 shrink-0" />
                  {t(`iteration.before${n}`)}
                </p>
              ))}
            </div>
          </div>
          <div>
            <span className="inline-block px-3 py-1 text-xs font-[var(--font-mono)] rounded-full bg-green-500/10 text-green-400 mb-4">AFTER</span>
            <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-bg-tertiary" style={{ aspectRatio: '3/2' }}>
              <Image src={`${IMG}/iteration-after.png`} alt="After" fill className="object-cover" sizes="600px" />
            </div>
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((n) => (
                <p key={n} className="text-sm text-text-primary flex items-start gap-1.5">
                  <i className="ri-check-line text-accent mt-0.5 shrink-0" />
                  {t(`iteration.after${n}`)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Section 08 — FINAL DESIGN */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('finalDesign.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('finalDesign.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">{t('finalDesign.body')}</p>
      </ScrollReveal>
      <div className="space-y-12 mb-[var(--cs-section-gap)]">
        <VideoEmbed videoId="SX8CDh1SmIU" width="wide" />
        <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="rounded-2xl overflow-hidden">
                <Image src={`${IMG}/final-course-detail.png`} alt={t('finalDesign.img2Caption')} width={1200} height={2400} className="w-full h-auto object-cover" />
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden">
                <Image src={`${IMG}/final-ai-panel.png`} alt={t('finalDesign.img3Caption')} width={1200} height={2400} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Section 09 — HANDOFF */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('handoff.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('handoff.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">{t('handoff.body')}</p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="rounded-2xl overflow-hidden">
          <Image src={`${IMG}/ui-flow.png`} alt={t('handoff.imageCaption')} width={2400} height={4800} className="w-full h-auto" />
        </div>
      </ScrollReveal>

      {/* Section 10 — DESIGN SYSTEM */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('designSystem.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('designSystem.heading')}
        </h2>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="rounded-2xl overflow-hidden">
          <Image src={`${IMG}/design-system.png`} alt={t('designSystem.imageCaption')} width={2400} height={4800} className="w-full h-auto" />
        </div>
      </ScrollReveal>

      {/* Section 11 — REFLECTION */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('reflection.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('reflection.heading')}
        </h2>
        {/* First sentence — role description */}
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('reflection.seg1Accent')}{t('reflection.seg1Normal')}
        </p>
        <div className="space-y-6 mb-8">
          {[1, 2].map((n) => (
            <div key={n} className="flex gap-4">
              <span className="shrink-0 font-[var(--font-mono)] text-2xl font-bold text-accent/30 mt-0.5">
                {String(n).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-[var(--font-display)] text-[18px] font-semibold text-text-primary mb-1">
                  {t(`reflection.insight${n}Title`)}
                </h3>
                <p className="text-[16px] leading-[1.7] text-text-secondary">
                  {t(`reflection.insight${n}Body`)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Reflection continued */}
        <p className="text-[18px] leading-[1.7] text-text-secondary">
          {[2, 3, 4, 5].map((n) => (
            <span key={n}>
              <span className="text-accent/70">{t(`reflection.seg${n}Accent`)}</span>
              {t(`reflection.seg${n}Normal`)}
            </span>
          ))}
        </p>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]" />

      {/* Prev / Next Project Nav */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-12">
        <div className="glass-medium rounded-2xl grid grid-cols-2 border border-white/[0.08]">
          {/* Prev */}
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
          {/* Next */}
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
