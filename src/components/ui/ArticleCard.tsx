'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

interface ArticleCover {
  kicker: string;
  title: string;
  question: string;
  models: string[];
}

interface Article {
  id: string;
  href: string;
  date: string;
  eyebrow: string;
  cover: ArticleCover;
  tags: string[];
}

interface ArticleCardProps {
  article: Article;
  index: number;
  title: string;
  description: string;
  readLabel: string;
}

export default function ArticleCard({
  article,
  index,
  title,
  description,
  readLabel,
}: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={article.href} data-cursor-hover className="block">
        <article
          className="case-card group cursor-pointer overflow-hidden rounded-[32px] transform-gpu transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1"
          style={{
            background: 'radial-gradient(ellipse at 15% 10%, #252830 0%, #101114 50%)',
            border: '1px solid var(--case-card-border)',
          }}
        >
          <div className="case-card-glow" />
          <div className="flex min-h-[300px] flex-col items-stretch gap-8 p-8 md:min-h-[360px] md:flex-row md:p-10">
            {/* Text side */}
            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-4 flex items-center gap-3 font-[var(--font-mono)] text-[12px] uppercase tracking-[1.6px] text-accent">
                <span>{article.eyebrow}</span>
                <span className="text-text-muted">·</span>
                <span className="text-text-muted">{article.date}</span>
              </div>
              <h3 className="mb-4 font-[var(--font-display)] text-2xl font-extrabold leading-snug text-text-primary md:text-3xl">
                {title}
              </h3>
              <p className="mb-6 leading-relaxed text-text-secondary">{description}</p>
              <div className="mb-7 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-4 py-1.5 text-sm text-text-secondary"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 font-[var(--font-mono)] text-sm tracking-wide text-accent transition-transform duration-300 group-hover:translate-x-1">
                {readLabel}
                <span aria-hidden="true">→</span>
              </span>
            </div>

            {/* Designed cover side */}
            <div className="flex-1 md:w-auto">
              <ArticleCover cover={article.cover} />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

function ArticleCover({ cover }: { cover: ArticleCover }) {
  return (
    <div
      className="relative flex h-full min-h-[200px] w-full flex-col justify-end overflow-hidden rounded-[20px] p-7"
      style={{
        background:
          'radial-gradient(circle at 82% 16%, rgba(0,229,208,.20), transparent 46%), radial-gradient(circle at 12% 78%, rgba(123,97,255,.22), transparent 48%), linear-gradient(135deg, #0E1413 0%, #0A0A0A 55%, #12101A 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[2.4px] text-accent">
        {cover.kicker}
      </span>
      <div className="mt-2 font-[var(--font-display)] text-5xl font-bold leading-none text-text-primary md:text-6xl">
        {cover.title}
        <span className="text-accent">{cover.question}</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {cover.models.map((m) => (
          <span
            key={m}
            className="rounded-full px-3 py-1 font-[var(--font-mono)] text-[11px] tracking-wide text-text-secondary"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
