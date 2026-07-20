'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import './fable5.css';
import { articleHtml } from './content';

export default function Fable5ReviewClient() {
  const t = useTranslations('articlePage');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Reveal-on-scroll — also drives the score-bar fill (via the `.in` class)
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

    // Cursor-follow glow on the verdict cards
    const cleanups: Array<() => void> = [];
    const canHover =
      window.matchMedia('(hover:hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (canHover) {
      root.querySelectorAll<HTMLElement>('.v-card').forEach((card) => {
        const handler = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${e.clientX - r.left}px`);
          card.style.setProperty('--my', `${e.clientY - r.top}px`);
        };
        card.addEventListener('pointermove', handler);
        cleanups.push(() => card.removeEventListener('pointermove', handler));
      });
    }

    return () => {
      io.disconnect();
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <>
      {/* Back Navigation — same as the case study pages */}
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

      <div className="fable5" ref={ref} dangerouslySetInnerHTML={{ __html: articleHtml }} />
    </>
  );
}
