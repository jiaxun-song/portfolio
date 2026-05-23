'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    key: 'karen',
    name: 'Karen',
    title: '@ 希望方程式有限公司 CEO',
    avatar: '/images/testimonials/karen.jpg',
  },
  {
    key: 'kyle',
    name: 'Kyle',
    title: '@ Bitget CN Marketing Lead',
    avatar: '/images/testimonials/kyle.jpg',
  },
];

export default function KindWords() {
  const t = useTranslations('kindWords');

  return (
    <section className="relative py-[var(--section-padding-y)] px-6 md:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-3 h-3 rounded-full bg-accent-orange" />
            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-display)] text-text-primary">
              {t('title')}
            </h2>
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((person, i) => (
            <motion.div
              key={person.key}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group glass-medium p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12]"
              style={{ borderRadius: 28 }}
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-bg-tertiary shrink-0">
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-text-primary font-semibold">{person.name}</p>
                  <p className="text-text-secondary text-sm">{person.title}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-text-secondary leading-relaxed text-[16px]">
                {t(`testimonials.${person.key}.quote`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
