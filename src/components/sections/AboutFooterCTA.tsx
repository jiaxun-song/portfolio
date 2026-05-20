'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function AboutFooterCTA() {
  const t = useTranslations('about.cta');

  return (
    <section className="text-center py-[120px] pb-20">
      <div className="max-w-[1100px] mx-auto px-8">
        <ScrollReveal>
          <h2 className="font-[var(--font-display)] text-[clamp(28px,3vw,40px)] font-bold tracking-tight mb-5 whitespace-pre-line">
            {t('titleBefore')}
            <span className="text-[var(--color-accent)]">{t('accent')}</span>
            {t('titleAfter')}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-[var(--color-text-secondary)] text-base mb-9 font-light">
            {t('desc')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/#case-study"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold text-[14px] rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,208,0.25)] hover:-translate-y-0.5"
            >
              {t('btnWork')}
            </a>
            <a
              href="mailto:jade@example.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-[var(--color-text-secondary)] font-medium text-[14px] rounded-full border border-[var(--color-border)] transition-all duration-300 hover:border-[rgba(0,229,208,0.2)] hover:text-[var(--color-accent)]"
            >
              {t('btnContact')}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
