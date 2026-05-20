'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';

const skills = [
  { num: '01', titleKey: 'card1Title', descKey: 'card1Desc', tag: 'COLLABORATION' },
  { num: '02', titleKey: 'card2Title', descKey: 'card2Desc', tag: 'AI-AUGMENTED' },
  { num: '03', titleKey: 'card3Title', descKey: 'card3Desc', tag: 'CONTINUOUS LEARNING' },
];

export default function SoftSkills() {
  const t = useTranslations('about.skills');

  return (
    <section className="pt-[100px] pb-[100px]">
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

        {/* 3-col Grid — 三張並排 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--card-gap)]">
          {skills.map((s, i) => (
            <ScrollReveal key={s.titleKey} delay={0.2 + i * 0.12}>
              <div className="glass-medium rounded-[var(--card-border-radius)] p-[32px_28px] flex flex-col transition-all duration-[400ms] ease-[var(--ease-out-expo)] hover:bg-[var(--color-bg-tertiary)] hover:border-[rgba(0,229,208,0.2)] h-full">

                {/* Number */}
                <div className="font-[var(--font-display)] text-[40px] font-extrabold text-[var(--color-accent)] opacity-[0.15] leading-none mb-5">
                  {s.num}
                </div>

                {/* Content */}
                <h3 className="font-[var(--font-display)] text-base font-semibold tracking-tight mb-2.5">
                  {t(s.titleKey)}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-[14px] leading-[1.75] font-light flex-1">
                  {t(s.descKey)}
                </p>
                {/* Tag Badge */}
                <span className="inline-block mt-4 self-start bg-[rgba(0,229,208,0.08)] text-[var(--color-accent)] text-[12px] px-2.5 py-[3px] rounded-full font-[var(--font-mono)] tracking-[0.03em]">
                  {s.tag}
                </span>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
