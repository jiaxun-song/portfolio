'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import '../fable5-review/fable5.css';
import { articleHtml } from './content';

export default function StreetInterviewKitClient() {
  const t = useTranslations('articlePage');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Reveal-on-scroll — same behaviour as the Fable 5 article
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    root.querySelectorAll('.rv').forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* Back Navigation — same as the case study / Fable 5 pages */}
      <motion.div
        className="sticky top-0 z-50 glass-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="mx-auto max-w-[var(--cs-wide-max-width)] px-6 md:px-12 py-4">
          <Link
            href="/article"
            className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300"
          >
            <i className="ri-arrow-left-line text-accent mr-1" /> {t('backToArticle')}
          </Link>
        </div>
      </motion.div>

      {/* `copyable` opt-in temporarily re-enables text selection/copy for this article
          (overrides the shared .fable5 user-select:none — see fable5.css) */}
      <div className="fable5 copyable" ref={ref} dangerouslySetInnerHTML={{ __html: articleHtml }} />
    </>
  );
}
