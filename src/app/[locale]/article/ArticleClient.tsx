'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import CTASection from '@/components/sections/CTASection';
import ArticleCard from '@/components/ui/ArticleCard';

// Long-form articles. `href` points to a standalone article page served from /public.
const articles = [
  {
    id: 'fable5-review',
    href: '/article/fable5-review',
    date: '2026.07',
    eyebrow: 'AIPost Field Test — LLM × Landing Page',
    cover: {
      kicker: 'FIELD TEST',
      title: 'Fable 5',
      question: '?',
      models: ['Fable 5', 'Claude Opus', 'GPT 5.5', 'Gemini 3.1 Pro'],
    },
    tags: ['LLM 實測', 'Landing Page', 'Three.js', 'AI 協作'],
  },
];

export default function ArticleClient() {
  const t = useTranslations('articlePage');

  return (
    <>
      {/* Page Header — same directional hover-fill title as the Projects page */}
      <motion.div
        className="pt-30 mb-16 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="projects-title-wrapper">
          {/* 4 invisible hover zones (top/right/bottom/left triangles) */}
          <span className="projects-hover-zone" data-dir="top" />
          <span className="projects-hover-zone" data-dir="right" />
          <span className="projects-hover-zone" data-dir="bottom" />
          <span className="projects-hover-zone" data-dir="left" />
          <h1 className="projects-fill-text" data-text={t('pageTitle')}>
            {t('pageTitle')}
          </h1>
        </div>
        <p className="mt-6 max-w-xl px-6 text-center text-sm text-text-secondary md:text-base">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Article Cards */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-16 mb-24">
        <div className="flex flex-col gap-6">
          {articles.map((article, i) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={i}
              title={t(`articles.${article.id}.title`)}
              description={t(`articles.${article.id}.description`)}
              readLabel={t('read')}
            />
          ))}
        </div>
      </div>

      {/* CTA + Footer handled by layout */}
      <CTASection />
    </>
  );
}
