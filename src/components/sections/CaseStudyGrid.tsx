'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import GlowButton from '@/components/ui/GlowButton';
import LockedOverlay from '@/components/ui/LockedOverlay';
import { useUnlockCountdown } from '@/hooks/useUnlockCountdown';
import { AUGUR_UNLOCK } from '@/data/projects';

const projects = [
  { id: 'exora',      tags: ['Fintech', 'Trading UX', 'Design System'], link: '/work/exora' as const, image: '/images/projects/exora-cover.jpg' },
  { id: 'prediction-market', tags: ['Fintech', 'AI Workflow', 'Design System'], link: '/work/prediction-market' as const, image: '/images/projects/prediction-market-cover.jpg' },
  { id: 'booking-app', tags: ['APP', 'Web', 'Dashboard', 'Brand Design'], link: '/work/booking-app' as const, image: '/images/projects/Buddy Cover.jpg' },
  { id: 'rolling-x',  tags: ['Fintech', 'Subscription Platform', 'Brand Design'], link: '/work/rolling-x' as const, image: '/images/projects/rolling-cover.jpg' },
];

const TOTAL = projects.length;

export default function CaseStudyGrid() {
  const t = useTranslations('caseStudy');
  // Only the Augur card is gated, so one countdown at the top beats a hook per card.
  const augur = useUnlockCountdown(AUGUR_UNLOCK);
  return (
    <section id="case-study" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Stacked cards */}
        <div className="relative">
          {projects.map((project, index) => {
            // Cards further back scale down for folder/deck effect
            const scale = 1 - (TOTAL - 1 - index) * 0.03;

            return (
              <div
                key={project.id}
                className="mb-[24px]"
                style={{
                  position: 'sticky',
                  top: `${60 + index * 28}px`,
                  zIndex: index + 1,
                }}
              >
                {(() => {
                  const locked = project.id === 'prediction-market' && augur.locked;
                  const card = (
                    <div
                      className={`case-card group rounded-[32px] transform-gpu transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 ${locked ? 'cursor-default' : 'cursor-pointer'}`}
                      style={{
                        background: 'radial-gradient(ellipse at 15% 10%, #252830 0%, #101114 50%)',
                        border: '1px solid var(--case-card-border)',
                        transform: `scale(${scale})`,
                        transformOrigin: 'top center',
                      }}
                    >
                      <div className="case-card-glow" />
                      <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center min-h-[300px] md:min-h-[400px]">
                        {/* Text side */}
                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-2xl md:text-3xl font-extrabold font-[var(--font-display)] text-text-primary mb-4">
                            {t(`projects.${project.id}.title`)}
                          </h3>
                          <p className="text-text-secondary mb-6 whitespace-pre-line leading-relaxed">
                            {t(`projects.${project.id}.description`)}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="case-tag px-4 py-1.5 text-sm rounded-full text-text-secondary"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Image side */}
                        <div className="flex-1 w-full md:w-auto">
                          <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.id}
                              fill
                              className="object-cover"
                              sizes="(min-width: 768px) 50vw, 100vw"
                            />
                            {locked && <LockedOverlay remaining={augur.remaining} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );

                  return project.link && !locked ? (
                    <Link href={project.link} className="block">
                      {card}
                    </Link>
                  ) : (
                    card
                  );
                })()}
              </div>
            );
          })}
        </div>

        {/* More Projects button */}
        <div className="flex justify-center mt-[88px]">
          <GlowButton href="/work">{t('moreProjects')}</GlowButton>
        </div>
      </div>
    </section>
  );
}
