'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const aiItems = [
  { key: 'prototyping', icon: '/images/ai-tools/AI_Pic1.png' },
  { key: 'workflow',    icon: '/images/ai-tools/AI_Pic2.png' },
  { key: 'imageGen',    icon: '/images/ai-tools/AI_Pic3.png' },
  { key: 'vibeCoding',  icon: '/images/ai-tools/AI_Pic4.png' },
];

export default function WorkingWithAI() {
  const t = useTranslations('workingWithAI');

  return (
    <section className="relative py-[var(--section-padding-y)] px-6 md:px-16 overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
            <span className="w-3 h-3 rounded-full bg-accent-orange" />
            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-display)] text-text-primary">
              {t('title')}
            </h2>
          </div>
          <p className="text-text-secondary text-[14px] max-w-xl">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-[44px]">
          {aiItems.map((item, i) => (
            <motion.div
              key={item.key}
              className="flex flex-col items-center md:items-start text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Icon with float animation */}
              <div
                className="relative w-36 h-36 md:w-48 md:h-48 mb-6 ai-icon-float"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <div className="w-full h-full relative">
                  <Image
                    src={item.icon}
                    alt={t(`items.${item.key}.title`)}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 144px, 192px"
                  />
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-semibold italic text-accent mb-3">
                {t(`items.${item.key}.title`)}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t(`items.${item.key}.description`)}
              </p>
              {item.key === 'vibeCoding' && (
                <Link
                  href="/work?tab=vibe-coding"
                  className="mt-4 inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs font-medium text-accent transition-colors duration-300 hover:bg-accent/15 hover:text-accent-light"
                >
                  See Projects
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
