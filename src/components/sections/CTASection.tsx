'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Source dimensions (px). Width is normalized to the column via CSS; height
// stays proportional so the entire screenshot renders without cropping.
const images = [
  { src: "/images/Let's Work Together/1.png", w: 1920, h: 6548 }, // dark
  { src: "/images/Let's Work Together/2.png", w: 1920, h: 5217 }, // dark
  { src: "/images/Let's Work Together/3.png", w: 1920, h: 4858 }, // dark
  { src: "/images/Let's Work Together/4.png", w: 1920, h: 3244 }, // dark
  { src: "/images/Let's Work Together/5.png", w: 1440, h: 3114 }, // light
  { src: "/images/Let's Work Together/6.png", w: 1440, h: 5966 }, // light
  { src: "/images/Let's Work Together/7.png", w: 1440, h: 6873 }, // light
  { src: "/images/Let's Work Together/8.png", w: 1920, h: 5217 }, // light
];

// 8 unique covers (1-4 dark, 5-8 light) distributed across 3 columns × 4 slots.
// Each column alternates dark/light; column 3 reuses 4 images so the loop length stays equal.
const columns = [
  [images[0], images[4], images[2], images[6]], // ↑  1 5 3 7  D L D L
  [images[5], images[1], images[7], images[3]], // ↓  6 2 8 4  L D L D
  [images[3], images[6], images[0], images[5]], // ↑  4 7 1 6  D L D L (offset reuse)
];

export default function CTASection() {
  const t = useTranslations('cta');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative flex items-center justify-center py-24 px-6">
      {/* Outer glow */}
      <div className="cta-glow" />

      {/* Pill container */}
      <motion.div
        className="cta-pill"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Scrolling works wall — 3 vertical columns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="cta-works-grid">
            {columns.map((col, colIdx) => (
              <div
                key={colIdx}
                className={`cta-works-col ${colIdx % 2 === 0 ? 'cta-scroll-up' : 'cta-scroll-down'}`}
              >
                {/* Duplicate for seamless loop */}
                {[...col, ...col].map((img, imgIdx) => (
                  <div key={imgIdx} className="w-full shrink-0 rounded-lg overflow-hidden bg-bg-tertiary">
                    <Image
                      src={img.src}
                      alt=""
                      width={img.w}
                      height={img.h}
                      className="block w-full h-auto"
                      sizes="33vw"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Color overlay */}
        <div
          className="absolute inset-0 transition-[background] duration-500 ease-out"
          style={{
            background: isHovered
              ? 'rgba(200, 60, 20, 0.65)'
              : 'rgba(40, 80, 75, 0.85)',
          }}
        />

        {/* Title text */}
        <h2 className="cta-title">
          {t('title')}
        </h2>
      </motion.div>
    </section>
  );
}
