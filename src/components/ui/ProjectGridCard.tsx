'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { Project } from '@/data/projects';

interface ProjectGridCardProps {
  project: Project;
  index: number;
}

export default function ProjectGridCard({ project, index }: ProjectGridCardProps) {
  const t = useTranslations('projectsPage');

  const hasLink = !!project.link;

  const card = (
    <article data-cursor-hover className="group glass-medium rounded-[32px] md:rounded-[32px] overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-1.5 hover:border-white/[0.14] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] h-full flex flex-col"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(0, 229, 208, 0.03) 0%, rgba(0, 0, 0, 0) 50%)',
      }}
    >
      {/* Cover image */}
      <div className="relative w-[calc(100%-24px)] mx-3 mt-3 aspect-[16/10] rounded-xl overflow-hidden">
        <Image
          src={project.image}
          alt={t(`cards.${project.id}.title`)}
          fill
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {!hasLink && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            {project.id === 'prediction-market' ? (
              <i className="ri-lock-line text-3xl text-white" aria-label="Locked" />
            ) : (
              <span className="text-white text-lg font-semibold tracking-wide">Coming Soon</span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
        <h3 className="font-[var(--font-display)] text-[20px] md:text-[18px] lg:text-[20px] font-semibold text-text-primary mb-2 leading-[1.4]">
          {t(`cards.${project.id}.title`)}
        </h3>
        <p className="text-[14px] text-text-secondary leading-relaxed mb-4 whitespace-pre-line flex-1">
          {t(`cards.${project.id}.description`)}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-3.5 py-1 text-xs rounded-full text-text-secondary"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {hasLink ? (
        <Link href={project.link} className="h-full block">{card}</Link>
      ) : (
        <div className="h-full">{card}</div>
      )}
    </motion.div>
  );
}
