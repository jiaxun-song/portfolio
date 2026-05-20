'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import gsap from 'gsap';

const skills = [
  {
    key: 'brand',
    image: '/images/skills/brand-visual-design.png',
    tags: [
      { key: 'visualDesign' },
      { key: 'marketing' },
      { key: 'designSystem' },
    ],
  },
  {
    key: 'research',
    image: '/images/skills/research-ux.png',
    tags: [
      { key: 'ux' },
      { key: 'strategy' },
      { key: 'spec' },
    ],
  },
  {
    key: 'animation',
    image: '/images/skills/anim-ae.gif',
    tags: [
      { key: 'ae' },
      { key: 'rotato' },
      { key: 'rive' },
    ],
  },
  {
    key: 'dev',
    image: '/images/skills/dev-html.png',
    tags: [
      { key: 'htmlCssJs' },
      { key: 'aiDev' },
      { key: 'designMd' },
    ],
  },
];

export default function WhatIDo() {
  const t = useTranslations('whatIDo');
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile.current || !thumbRef.current) return;

    gsap.set(thumbRef.current, { scale: 0, xPercent: -50, yPercent: -50 });
    xTo.current = gsap.quickTo(thumbRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
    yTo.current = gsap.quickTo(thumbRef.current, 'y', { duration: 0.4, ease: 'power3.out' });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !xTo.current || !yTo.current) return;
    xTo.current(e.clientX - rect.left);
    yTo.current(e.clientY - rect.top);
  }, []);

  const handleRowEnter = useCallback((index: number) => {
    if (isMobile.current) return;
    setActiveIndex(index);
    if (thumbRef.current) {
      gsap.to(thumbRef.current, { scale: 1, duration: 0.3, ease: 'power3.out' });
    }
  }, []);

  const handleContainerLeave = useCallback(() => {
    if (isMobile.current) return;
    setActiveIndex(null);
    if (thumbRef.current) {
      gsap.to(thumbRef.current, { scale: 0, duration: 0.3, ease: 'power3.out' });
    }
  }, []);

  // Mobile: tap to toggle
  const handleRowClick = useCallback((index: number) => {
    if (!isMobile.current) return;
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="relative py-[var(--section-padding-y)] px-6 md:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-3 h-3 rounded-full bg-accent-orange" />
            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-display)] text-text-primary">
              {t('title')}
            </h2>
          </div>
          <p className="text-text-secondary text-[14px] max-w-xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Skill rows */}
        <div
          ref={containerRef}
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleContainerLeave}
        >
          {skills.map((skill, index) => {
            const isHovered = activeIndex === index;
            const isFaded = activeIndex !== null && activeIndex !== index;

            return (
              <div
                key={skill.key}
                className="border-b border-white/[0.06] transition-opacity duration-500"
                style={{ opacity: isFaded ? 0.35 : 1 }}
                onMouseEnter={() => handleRowEnter(index)}
                onClick={() => handleRowClick(index)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-8 py-6 px-4 -mx-4 rounded-xl transition-all duration-300">
                  {/* Title — slides left on hover */}
                  <h3
                    className="text-2xl md:text-[2rem] font-normal transition-all duration-500 shrink-0"
                    style={{
                      color: isHovered ? 'var(--color-accent-orange)' : 'var(--color-text-secondary)',
                      transform: isHovered ? 'translateX(-15px)' : 'translateX(0)',
                    }}
                  >
                    {t(`skills.${skill.key}.title`)}
                  </h3>

                  {/* Tags — slide right on hover */}
                  <div
                    className="flex flex-wrap gap-x-6 gap-y-2 transition-transform duration-500"
                    style={{ transform: isHovered ? 'translateX(15px)' : 'translateX(0)' }}
                  >
                    {skill.tags.map((tag) => (
                      <span
                        key={tag.key}
                        className="text-[14px] font-medium text-text-secondary"
                      >
                        {t(`skills.${skill.key}.tags.${tag.key}`)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobile: show image inline (temporarily hidden) */}
                {false && isHovered && (
                  <div className="md:hidden overflow-hidden pb-4">
                    <div className="relative w-full rounded-2xl overflow-hidden border border-white/[0.08]" style={{ maxHeight: 300 }}>
                      <Image
                        src={skill.image}
                        alt={t(`skills.${skill.key}.title`)}
                        width={800}
                        height={300}
                        className="w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Floating thumbnail that follows cursor (desktop only) — temporarily hidden */}
          <div
            ref={thumbRef}
            className="hidden pointer-events-none absolute top-0 left-0 z-10 w-[400px] h-[250px] rounded-2xl overflow-hidden border border-white/[0.08]"
            style={{ willChange: 'transform' }}
          >
            {skills.map((skill, index) => (
              <div
                key={skill.key}
                className="absolute inset-0 transition-opacity duration-300"
                style={{ opacity: activeIndex === index ? 1 : 0 }}
              >
                <Image
                  src={skill.image}
                  alt={t(`skills.${skill.key}.title`)}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
