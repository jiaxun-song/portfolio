'use client';

import { useTranslations } from 'next-intl';

export default function Marquee() {
  const t = useTranslations('marquee');

  const content = (
    <span className="flex items-center gap-8 whitespace-nowrap text-lg md:text-xl font-bold italic">
      <span className="text-text-primary">{t('hello')}</span>
      <span className="text-text-primary">•</span>
      <span className="text-accent">{t('experience')}</span>
      <span className="text-text-primary">•</span>
      <span className="text-accent">{t('trading')}</span>
      <span className="text-text-primary">•</span>
    </span>
  );

  return (
    <div className="w-full glass-light py-4 overflow-hidden">
      <div className="marquee-track flex hover:[animation-play-state:paused]">
        {/* Repeat 4 times for seamless loop */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="marquee-content flex-shrink-0 px-6">
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}
