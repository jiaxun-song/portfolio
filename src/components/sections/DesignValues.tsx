'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';

const values = [
  { icon: 'ri-focus-3-fill', titleKey: 'card1Title', descKey: 'card1Desc' },
  { icon: 'ri-settings-3-fill', titleKey: 'card2Title', descKey: 'card2Desc' },
  { icon: 'ri-sparkling-fill', titleKey: 'card3Title', descKey: 'card3Desc' },
  { icon: 'ri-signal-tower-fill', titleKey: 'card4Title', descKey: 'card4Desc' },
];

export default function DesignValues() {
  const t = useTranslations('about.values');

  return (
    <section className="pt-[120px] pb-[100px]">
      <div className="max-w-[1100px] mx-auto px-8">

        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-3 h-3 rounded-full bg-accent-orange" />
            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-display)] text-text-primary">
              {t('title')}
            </h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-[var(--color-text-secondary)] text-base max-w-[600px] mb-14 font-light">
            {t('desc')}
          </p>
        </ScrollReveal>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--card-gap)]">
          {values.map((v, i) => (
            <ScrollReveal key={v.titleKey} delay={0.2 + i * 0.12}>
              <div className="glass-medium rounded-[var(--card-border-radius)] p-[36px_28px] relative overflow-hidden transition-all duration-[400ms] ease-[var(--ease-out-expo)] hover:bg-[var(--color-bg-tertiary)] hover:border-[rgba(0,229,208,0.2)] hover:-translate-y-1 group">

                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[rgba(0,229,208,0.08)] flex items-center justify-center mb-6">
                  <i className={`${v.icon} text-[20px] text-[var(--color-accent)]`} />
                </div>

                {/* Title */}
                <h3 className="font-[var(--font-display)] text-[18px] font-semibold leading-[1.4] tracking-tight mb-3.5">
                  {t(v.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-[var(--color-text-secondary)] text-[14px] leading-[1.75] font-light">
                  {t(v.descKey)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
