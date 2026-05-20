'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { visibleProjects, vibeCodingProjects } from '@/data/projects';
import ProjectGridCard from '@/components/ui/ProjectGridCard';
import GlowButton from '@/components/ui/GlowButton';
import CTASection from '@/components/sections/CTASection';

const tabs = ['Works', 'Vibe Coding'] as const;

export default function WorkClient() {
  const t = useTranslations('projectsPage');
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Works');
  const displayedProjects = activeTab === 'Works' ? visibleProjects : vibeCodingProjects;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'vibe-coding') {
      setActiveTab('Vibe Coding');
    }
  }, []);

  return (
    <>
      {/* Page Header — Directional hover fill effect */}
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
          <h1
            className="projects-fill-text"
            data-text={t('pageTitle')}
          >
            {t('pageTitle')}
          </h1>
        </div>
        <div className="mt-7 inline-flex rounded-full border border-white/[0.12] bg-white/[0.045] p-0.5 shadow-[0_12px_28px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                className={`min-w-[92px] rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-300 md:min-w-[120px] md:px-5 md:py-2 md:text-sm ${
                  isActive
                    ? 'border border-accent bg-accent/20 text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                    : 'border border-transparent text-text-muted hover:text-text-primary'
                }`}
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Project Cards Grid */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-16 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          {displayedProjects.map((project, i) => (
            <ProjectGridCard key={project.id} project={project} index={i} />
          ))}
        </div>
        {activeTab === 'Works' && (
          <div className="flex justify-center mt-[88px]">
            <GlowButton href="https://www.behance.net/zx98979897d9dd">
              {t('moreDesignWork')}
            </GlowButton>
          </div>
        )}
      </div>

      {/* CTA + Footer handled by layout */}
      <CTASection />
    </>
  );
}
