'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

function stagger(delay: number) {
  return {
    ...fadeUp,
    transition: { ...fadeUp.transition, delay },
  };
}

export default function AboutHero() {
  const t = useTranslations('about.hero');

  return (
    <section className="pt-[100px] lg:pt-[120px] pb-[80px] lg:pb-[100px]">
      <div className="max-w-[1100px] mx-auto px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-20 items-center">

          {/* 左側文字 */}
          <div>
            <motion.div {...stagger(0)} className="mb-[23px]">
              <div className="about-title-wrapper">
                <span className="about-hover-zone" data-dir="top" />
                <span className="about-hover-zone" data-dir="right" />
                <span className="about-hover-zone" data-dir="bottom" />
                <span className="about-hover-zone" data-dir="left" />
                <h1
                  className="about-fill-text"
                  data-text={`${t('greeting')} ${t('name')}`}
                >
                  {t('greeting')} {t('name')}
                </h1>
              </div>
            </motion.div>

            <motion.div
              {...stagger(0.1)}
              className="text-[var(--color-text-secondary)] text-base leading-[1.85] font-light space-y-[18px]"
            >
              <p>
                <span className="text-[var(--color-accent)] font-normal">{t('paragraph1Accent')}</span>
                {t('paragraph1After')}
              </p>
              <p>
                <span className="text-[var(--color-accent)] font-normal">{t('paragraph2Highlight')}</span>
                {t('paragraph2')}
                <span className="text-[var(--color-accent)] font-normal">{t('paragraph2Accent')}</span>
              </p>
              <p>
                {t('paragraph3')}
                <span className="text-[var(--color-accent)] font-normal">{t('paragraph3Accent')}</span>
                {t('paragraph3After')}
              </p>
              <p>{t('paragraph4')}</p>
            </motion.div>

            <motion.div {...stagger(0.2)} className="mt-9 flex gap-4 items-center flex-wrap">
              <a
                href="https://drive.google.com/drive/u/5/folders/1jTFXeVDkk5sfFede1RY9_F6DIogl7pvu?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold text-[14px] rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,208,0.25)] hover:-translate-y-0.5"
              >
                {t('btnResume')}
              </a>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-[var(--color-text-secondary)] font-medium text-[14px] rounded-full border border-[var(--color-border)] transition-all duration-300 hover:border-[rgba(0,229,208,0.2)] hover:text-[var(--color-accent)]"
              >
                {t('btnWork')}
              </Link>
            </motion.div>
          </div>

          {/* 右側照片 — Glow Frame */}
          <motion.div {...stagger(0.4)} className="relative flex justify-center order-first lg:order-last">
            <div className="glow-frame">
              <div className="glow-frame-body">
                <Image
                  src="/images/about-photo-02.png"
                  alt="Jade"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 340px, 200px"
                />
              </div>
            </div>
            <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-full px-5 py-2 font-[var(--font-mono)] text-[12px] text-[var(--color-accent)] tracking-[0.05em] whitespace-nowrap z-10">
              {t('location')}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
