'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionLabel from '@/components/ui/SectionLabel';
import ImageBlock from '@/components/ui/ImageBlock';
import { allProjects } from '@/data/projects';

const IMG = '/images/case-studies/web3vid';
const CURRENT_ID = 'web3vid';
const currentIdx = allProjects.findIndex((p) => p.id === CURRENT_ID);
const prevProject = allProjects[(currentIdx - 1 + allProjects.length) % allProjects.length];
const nextProject = allProjects[(currentIdx + 1) % allProjects.length];

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

/* Reusable image-or-placeholder */
function CaseImage({
  src,
  alt,
  width,
  height,
  className = 'w-full h-auto',
  ratio,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  ratio?: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden">
      <Image src={src} alt={alt} width={width} height={height} className={className} />
    </div>
  );
}

export default function Web3VidClient() {
  const t = useTranslations('caseStudy.web3vid');
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
            src={`${IMG}/hero-cover.png`}
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

      {/* Metadata Bar */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mt-16 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['timeline', 'outcome', 'scope'] as const).map((key) => (
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

      {/* Section 01 — PROJECT CONTEXT */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('context.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('context.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8 whitespace-pre-line">
          {t('context.body')}
        </p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <CaseImage src={`${IMG}/context-workshop.jpg`} alt="Project context" width={1200} height={800} />
      </ScrollReveal>

      {/* Section 02 — PROBLEM DEFINITION */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('problemDefinition.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('problemDefinition.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('problemDefinition.body')}
        </p>
      </ScrollReveal>
      {/* Competitive positioning groups */}
      {([1, 2] as const).map((g) => (
        <ScrollReveal key={g} className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-6">
          {/* Group header badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-block rounded-full bg-gradient-to-r from-accent/80 to-accent/50 px-6 py-2 text-[16px] font-semibold text-white">
              {t(`problemDefinition.group${g}Header`)}
            </span>
          </div>
          {/* Two side-by-side cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([1, 2] as const).map((c) => {
              const competitors = g === 1 && c === 1
                ? [t('problemDefinition.group1Card1Competitor'), t('problemDefinition.group1Card1Competitor2')]
                : [t(`problemDefinition.group${g}Card${c}Competitor`)];
              const advantages = [
                t(`problemDefinition.group${g}Card${c}Adv1`),
                t(`problemDefinition.group${g}Card${c}Adv2`),
                t(`problemDefinition.group${g}Card${c}Adv3`),
              ];
              return (
                <div key={c} className="glass-medium rounded-2xl p-6 md:p-8">
                  {/* Competitor row */}
                  <p className="text-sm text-text-muted mb-3">{t('problemDefinition.competitorLabel')}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {competitors.map((comp) => (
                      <span key={comp} className="rounded-lg bg-white/10 px-4 py-2 text-[16px] font-semibold text-text-primary">
                        {comp}
                      </span>
                    ))}
                  </div>
                  {/* Advantage row */}
                  <p className="text-sm text-text-muted mb-3">{t('problemDefinition.advantageLabel')}</p>
                  <div className="flex flex-col gap-3">
                    {advantages.map((adv) => (
                      <span key={adv} className="rounded-lg bg-accent/15 border border-accent/30 px-4 py-2.5 text-[16px] font-medium text-accent text-center">
                        {adv}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      ))}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="glass-medium rounded-2xl p-6 md:p-8 border-l-[3px] border-l-accent">
          <p className="font-semibold text-text-primary mb-2">{t('problemDefinition.calloutTitle')}</p>
          <p className="text-[16px] leading-[1.7] text-text-secondary mb-2">{t('problemDefinition.calloutBody')}</p>
          <p className="text-xs text-text-muted italic">{t('problemDefinition.calloutSource')}</p>
        </div>
      </ScrollReveal>

      {/* Section 03 — PRODUCT POSITIONING */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('productPositioning.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('productPositioning.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('productPositioning.body')}
        </p>
      </ScrollReveal>
      <div className="mb-8">
        <ImageBlock src={`${IMG}/product-positioning.png`} alt="Web3Vid product positioning and business model" width="wide" />
      </div>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl p-6 md:p-8 border-l-[3px] border-l-accent">
          <p className="font-semibold text-text-primary mb-2">{t('productPositioning.calloutTitle')}</p>
          <p className="text-[16px] leading-[1.7] text-text-secondary mb-2">{t('productPositioning.calloutBody')}</p>
          <p className="text-xs text-text-muted italic">{t('productPositioning.calloutSource')}</p>
        </div>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CaseImage src={`${IMG}/competitive-advantage-1.png`} alt={t('productPositioning.img1Caption')} width={1200} height={900} />
            <p className="text-[14px] text-text-muted text-center mt-3">{t('productPositioning.img1Caption')}</p>
          </div>
          <div>
            <CaseImage src={`${IMG}/competitive-advantage-2.png`} alt={t('productPositioning.img2Caption')} width={1200} height={900} />
            <p className="text-[14px] text-text-muted text-center mt-3">{t('productPositioning.img2Caption')}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Section 04 — MARKET RESEARCH (was 03) */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('marketResearch.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('marketResearch.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('marketResearch.body')}
        </p>
      </ScrollReveal>
      <div className="mb-8">
        <ImageBlock src={`${IMG}/market-data.png`} alt="Global crypto user growth data 2023" width="wide" />
      </div>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-6">{t('marketResearch.calloutTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {([1, 2] as const).map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 md:p-8">
              <span className="font-[var(--font-mono)] text-2xl font-bold text-accent mb-4 block">{`0${n}`}</span>
              <h4 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-2">{t(`marketResearch.calloutCard${n}Title`)}</h4>
              <p className="text-[16px] leading-[1.7] text-text-secondary">{t(`marketResearch.calloutCard${n}Body`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Section 05 — MARKET OPPORTUNITY (temporarily hidden) */}
      {false && (
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('marketOpportunity.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('marketOpportunity.heading')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <CaseImage src={`${IMG}/market-opportunity.png`} alt={t('marketOpportunity.heading')} width={1200} height={800} />
          <p className="text-[18px] leading-[1.7] text-text-secondary">
            {t('marketOpportunity.body')}
          </p>
        </div>
      </ScrollReveal>
      )}

      {/* Section 06 — PLATFORM DECISION (temporarily hidden) */}
      {false && (<>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('platformDecision.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('platformDecision.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('platformDecision.body')}
        </p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['A', 'B', 'C'] as const).map((opt) => {
            const isSelected = opt === 'A';
            return (
              <div key={opt} className="glass-medium rounded-2xl overflow-hidden hover:border-white/[0.15] transition-colors duration-300">
                <div className={`h-1 ${isSelected ? 'bg-accent' : 'bg-text-muted/30'}`} />
                <div className="p-6 md:p-8">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-4">
                    {t(`platformDecision.option${opt}Title`)}
                  </h3>
                  <div className="relative w-full rounded-xl overflow-hidden border border-border bg-bg-tertiary mb-4" style={{ aspectRatio: '8/5' }}>
                    <Image src={`${IMG}/option-${opt === 'A' ? 'web' : opt === 'B' ? 'mobile' : 'pwa'}.png`} alt="" fill className="object-cover" sizes="400px" />
                  </div>
                  <div className="mb-3 space-y-1">
                    {t(`platformDecision.option${opt}Pros`).split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="text-sm text-accent flex items-start gap-1.5">
                        <i className="ri-check-line text-accent mt-0.5 shrink-0" />
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mb-4 space-y-1">
                    {t(`platformDecision.option${opt}Cons`).split('\n').filter(Boolean).map((line, i) => (
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
                    {t(`platformDecision.option${opt}Verdict`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <p className="text-[18px] leading-[1.7] text-text-secondary">{t('platformDecision.reason')}</p>
      </ScrollReveal>
      </>)}

      {/* Section 07 — COMPETITIVE ANALYSIS */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('competitiveAnalysis.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('competitiveAnalysis.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('competitiveAnalysis.body')}
        </p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="flex flex-col gap-5">
          {([1, 2, 3] as const).map((n) => {
            const icons = { 1: 'ri-film-fill', 2: 'ri-coin-fill', 3: 'ri-cursor-fill' } as const;
            return (
            <div key={n} className="glass-medium rounded-2xl p-6 md:p-8 hover:border-white/[0.15] transition-colors duration-300 flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary md:min-w-[140px] md:shrink-0 md:pt-0.5 flex items-center gap-2">
                <i className={`${icons[n]} text-accent`} />
                {t(`competitiveAnalysis.card${n}Title`)}
              </h3>
              <div className="flex-1">
                <p className="text-[16px] leading-[1.7] text-text-secondary mb-3">
                  {t(`competitiveAnalysis.card${n}Body`)}
                </p>
                <p className="text-[16px] leading-[1.7] text-text-secondary">
                  <span className="font-semibold">{t(`competitiveAnalysis.card${n}Insight`)}</span>
                  {t(`competitiveAnalysis.card${n}InsightText`)}
                  <span className="text-accent">{t(`competitiveAnalysis.card${n}Highlight`)}</span>
                  {t(`competitiveAnalysis.card${n}After`)}
                </p>
              </div>
            </div>
            );
          })}
        </div>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]">
        <ImageBlock src={`${IMG}/competitive-analysis.png`} alt="Web3 video platform competitive analysis matrix" width="wide" />
      </div>

      {/* Section 08 — DESIGN PRINCIPLES */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('designPrinciples.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('designPrinciples.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('designPrinciples.body')}
        </p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 md:p-8 hover:border-white/[0.15] transition-colors duration-300">
              <span className="block font-[var(--font-mono)] text-5xl font-bold text-accent/30 mb-4">
                {String(n).padStart(2, '0')}
              </span>
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-2">
                {t(`designPrinciples.card${n}Title`)}
              </h3>
              <p className="text-[16px] leading-[1.7] text-text-secondary">{t(`designPrinciples.card${n}Body`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <p className="text-sm text-text-muted italic">
          <i className="ri-user-star-line text-accent mr-1" />
          {t('designPrinciples.ownershipTag')}
        </p>
      </ScrollReveal>

      {/* Section 09 — DESIGN DECISION */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('designDecision.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('designDecision.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('designDecision.body')}
        </p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['A', 'B', 'C'] as const).map((opt) => {
            const isSelected = opt === 'B';
            return (
              <div key={opt} className="glass-medium rounded-2xl overflow-hidden hover:border-white/[0.15] transition-colors duration-300">
                <div className={`h-1 ${isSelected ? 'bg-accent' : 'bg-text-muted/30'}`} />
                <div className="p-6 md:p-8">
                  <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-4">
                    {t(`designDecision.option${opt}Title`)}
                  </h3>
                  <div className="relative w-full rounded-xl overflow-hidden border border-border bg-bg-tertiary mb-4" style={{ aspectRatio: '8/5' }}>
                    <Image src={`${IMG}/retention-${opt === 'A' ? 'content' : opt === 'B' ? 'points' : 'social'}.png`} alt="" fill className="object-cover" sizes="400px" />
                  </div>
                  <div className="mb-3 space-y-1">
                    {t(`designDecision.option${opt}Pros`).split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="text-sm text-accent flex items-start gap-1.5">
                        <i className="ri-check-line text-accent mt-0.5 shrink-0" />
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mb-4 space-y-1">
                    {t(`designDecision.option${opt}Cons`).split('\n').filter(Boolean).map((line, i) => (
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
                    {t(`designDecision.option${opt}Verdict`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="glass-medium rounded-2xl p-6 md:p-8 border-l-[3px] border-l-accent">
          <p className="font-semibold text-text-primary mb-2">{t('designDecision.calloutTitle')}</p>
          <p className="text-[16px] leading-[1.7] text-text-secondary mb-2">{t('designDecision.calloutBody')}</p>
          <p className="text-xs text-text-muted italic">{t('designDecision.calloutSource')}</p>
        </div>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <p className="text-sm text-text-muted italic">
          <i className="ri-user-star-line text-accent mr-1" />
          {t('designDecision.ownershipTag')}
        </p>
      </ScrollReveal>

      {/* Section 10 — BEHAVIORAL DESIGN */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('behavioralDesign.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('behavioralDesign.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('behavioralDesign.body')}
        </p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 md:p-8 hover:border-white/[0.15] transition-colors duration-300">
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-3">
                {t(`behavioralDesign.card${n}Title`)}
              </h3>
              <p className="text-[16px] leading-[1.7] text-text-secondary">
                {t(`behavioralDesign.card${n}Before`)}
                <span className="text-accent">{t(`behavioralDesign.card${n}Highlight`)}</span>
                {t(`behavioralDesign.card${n}After`)}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]">
        <ImageBlock src={`${IMG}/behavioral-design.jpg`} alt="Behavioral design framework for points mechanism" width="wide" />
      </div>

      {/* Section 11 — FEATURE DESIGN */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('featureDesign.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('featureDesign.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('featureDesign.body')}
        </p>
        {/* User Story List */}
        <div className="space-y-6 mb-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex gap-4 pb-6 border-b border-border/50">
              <span className="font-[var(--font-mono)] text-2xl font-bold text-accent shrink-0">
                {String(n).padStart(2, '0')}
              </span>
              <p className="text-[18px] leading-[1.7] text-text-secondary">
                {t(`featureDesign.story${n}Before`)}
                <span className="text-accent">{t(`featureDesign.story${n}Highlight`)}</span>
                {t(`featureDesign.story${n}After`)}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]">
        <ImageBlock src={`${IMG}/three-sided-value.png`} alt="Three-sided value loop: creators, viewers, projects" width="wide" />
      </div>

      {/* Section 12 — CORE FLOW */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('coreFlow.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('coreFlow.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-4">
          {t('coreFlow.body')}
        </p>
        <p className="text-sm text-text-muted italic mb-8">
          <i className="ri-user-star-line text-accent mr-1" />
          {t('coreFlow.ownershipTag')}
        </p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="rounded-2xl overflow-hidden">
          <Image src={`${IMG}/core-flow-full.png`} alt={t('coreFlow.flowCaption')} width={2400} height={4800} className="w-full h-auto" />
        </div>
        <p className="text-[14px] text-text-muted text-center mt-3">{t('coreFlow.flowCaption')}</p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CaseImage src={`${IMG}/flow-wallet-connect.png`} alt={t('coreFlow.img1Caption')} width={1200} height={900} />
            <p className="text-[14px] text-text-muted text-center mt-3">{t('coreFlow.img1Caption')}</p>
          </div>
          <div>
            <CaseImage src={`${IMG}/flow-task-reward.png`} alt={t('coreFlow.img2Caption')} width={1200} height={900} />
            <p className="text-[14px] text-text-muted text-center mt-3">{t('coreFlow.img2Caption')}</p>
          </div>
        </div>
      </ScrollReveal>

      {/* Section 13 — INFORMATION ARCHITECTURE */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <SectionLabel label={t('informationArchitecture.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('informationArchitecture.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('informationArchitecture.body')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <CaseImage src={`${IMG}/category-system.png`} alt={t('informationArchitecture.heading')} width={1200} height={800} />
          <p className="text-[18px] leading-[1.7] text-text-secondary whitespace-pre-line">
            {t('informationArchitecture.text')}
          </p>
        </div>
      </ScrollReveal>

      {/* Section 14 — UI DESIGN (temporarily hidden) */}
      {false && (<>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('uiDesign.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('uiDesign.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('uiDesign.body')}
        </p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CaseImage src={`${IMG}/ui-homepage.png`} alt={t('uiDesign.img1Caption')} width={1200} height={900} />
            <p className="text-[14px] text-text-muted text-center mt-3">{t('uiDesign.img1Caption')}</p>
          </div>
          <div>
            <CaseImage src={`${IMG}/ui-player.png`} alt={t('uiDesign.img2Caption')} width={1200} height={900} />
            <p className="text-[14px] text-text-muted text-center mt-3">{t('uiDesign.img2Caption')}</p>
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="rounded-2xl overflow-hidden">
          <Image src={`${IMG}/ui-flow-full.png`} alt={t('uiDesign.flowCaption')} width={2400} height={4800} className="w-full h-auto" />
        </div>
        <p className="text-[14px] text-text-muted text-center mt-3">{t('uiDesign.flowCaption')}</p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CaseImage src={`${IMG}/ui-task-panel.png`} alt={t('uiDesign.img3Caption')} width={1200} height={900} />
            <p className="text-[14px] text-text-muted text-center mt-3">{t('uiDesign.img3Caption')}</p>
          </div>
          <div>
            <CaseImage src={`${IMG}/ui-points-dashboard.png`} alt={t('uiDesign.img4Caption')} width={1200} height={900} />
            <p className="text-[14px] text-text-muted text-center mt-3">{t('uiDesign.img4Caption')}</p>
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CaseImage src={`${IMG}/ui-lottery.png`} alt={t('uiDesign.img5Caption')} width={1200} height={900} />
            <p className="text-[14px] text-text-muted text-center mt-3">{t('uiDesign.img5Caption')}</p>
          </div>
          <div>
            <CaseImage src={`${IMG}/ui-shorts.png`} alt={t('uiDesign.img6Caption')} width={1200} height={900} />
            <p className="text-[14px] text-text-muted text-center mt-3">{t('uiDesign.img6Caption')}</p>
          </div>
        </div>
      </ScrollReveal>
      </>)}

      {/* Section 15 — DESIGN SYSTEM */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('designSystem.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('designSystem.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-4">
          {t('designSystem.body')}
        </p>
        <p className="text-sm text-text-muted italic mb-8">
          <i className="ri-user-star-line text-accent mr-1" />
          {t('designSystem.ownershipTag')}
        </p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="rounded-2xl overflow-hidden">
          <Image src={`${IMG}/design-system-full.png`} alt={t('designSystem.fullCaption')} width={2400} height={4800} className="w-full h-auto" />
        </div>
        <p className="text-[14px] text-text-muted text-center mt-3">{t('designSystem.fullCaption')}</p>
      </ScrollReveal>

      {/* Section 16 — PITCH DECK */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('pitchDeck.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('pitchDeck.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('pitchDeck.body')}
        </p>
      </ScrollReveal>
      <div className="mb-[var(--cs-section-gap)]">
        <ImageBlock src={`${IMG}/pitch-deck.png`} alt="Web3Vid pitch deck design" width="wide" />
      </div>

      {/* Section 17 — SCALABILITY */}
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-8">
        <SectionLabel label={t('scalability.label')} />
        <h2 className="font-[var(--font-display)] text-2xl md:text-[32px] font-semibold text-text-primary mb-8">
          {t('scalability.heading')}
        </h2>
        <p className="text-[18px] leading-[1.7] text-text-secondary mb-8">
          {t('scalability.body')}
        </p>
      </ScrollReveal>
      <ScrollReveal className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 mb-[var(--cs-section-gap)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-medium rounded-2xl p-6 md:p-8 hover:border-white/[0.15] transition-colors duration-300">
              <span className="block font-[var(--font-mono)] text-5xl font-bold text-accent/30 mb-4">
                {String(n).padStart(2, '0')}
              </span>
              <h3 className="font-[var(--font-display)] text-lg font-semibold text-text-primary mb-2">
                {t(`scalability.card${n}Title`)}
              </h3>
              <p className="text-[16px] leading-[1.7] text-text-secondary">{t(`scalability.card${n}Body`)}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Prev / Next Project Nav */}
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
