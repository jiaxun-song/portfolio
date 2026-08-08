export interface UnlockGate {
  /** Epoch ms. Until this moment the card shows a padlock + countdown instead of linking through. */
  at: number;
  /** Full countdown length in ms — the value the timer shows before the client clock takes over. */
  windowMs: number;
}

/** `unlockGate('2026-08-09T05:41:00+08:00', 6.5)` → unlocks at that moment after a 6.5h countdown. */
function unlockGate(unlockAtISO: string, countdownHours: number): UnlockGate {
  return { at: Date.parse(unlockAtISO), windowMs: countdownHours * 60 * 60 * 1000 };
}

export interface Project {
  id: string;
  tags: string[];
  image: string;
  link: string;
  unlock?: UnlockGate;
}

/** Augur case study: 10.5-hour countdown started 23:11 on 2026-08-08 (UTC+8). */
export const AUGUR_UNLOCK = unlockGate('2026-08-09T09:41:00+08:00', 10.5);

/** Goodstuff / inspiration-library case study: 16-hour countdown started 23:19 on 2026-08-08 (UTC+8). */
export const GOODSTUFF_UNLOCK = unlockGate('2026-08-09T15:19:00+08:00', 16);

export const allProjects: Project[] = [
  {
    id: 'exora',
    tags: ['Fintech', 'Trading UX', 'Design System'],
    image: '/images/projects/exora-cover.jpg',
    link: '/work/exora',
  },
  {
    id: 'prediction-market',
    tags: ['Fintech', 'AI Workflow', 'Design System'],
    image: '/images/projects/prediction-market-cover.jpg',
    link: '/work/prediction-market',
    unlock: AUGUR_UNLOCK,
  },
{
    id: 'cex-web',
    tags: ['CEX UI', 'Branding', 'NFT Illustrate', 'Motion Design'],
    image: '/images/projects/cex-web-cover.png',
    link: '/work/cex-web',
  },
  {
    id: 'web3vid',
    tags: ['Web', 'Video Platform', 'Brand Design'],
    image: '/images/projects/web3vid-cover.jpg',
    link: '/work/web3vid',
  },
  {
    id: 'rolling-x',
    tags: ['Fintech', 'Subscription Platform', 'Brand Design'],
    image: '/images/projects/rolling-cover.jpg',
    link: '/work/rolling-x',
  },
  {
    id: 'booking-app',
    tags: ['APP', 'Web', 'Dashboard', 'Brand Design'],
    image: '/images/projects/Buddy Cover.jpg',
    link: '/work/booking-app',
  },
  {
    id: 'ai-learning',
    tags: ['Web', 'EdTech', 'AI'],
    image: '/images/projects/ai-learning-cover.jpg',
    link: '/work/ai-learning',
  },
  {
    id: 'play-to-earn',
    tags: ['PWA', 'GameFi', 'Brand Design'],
    image: '/images/projects/chicken cover.jpg',
    link: '/work/play-to-earn',
  },
  {
    id: 'dating-pwa',
    tags: ['PWA', 'Social Platform', 'Brand Design'],
    image: '/images/projects/dating-pwa-cover.jpg',
    link: '/work/dating-pwa',
  },
  {
    id: 'ecommerce-mlm',
    tags: ['Web', '2C & 2B', 'Brand Design'],
    image: '/images/projects/ecommerce-mlm-cover.jpg',
    link: '/work/ecommerce-mlm',
  },
];

const hiddenProjectIds = new Set(['web3vid', 'ecommerce-mlm', 'cex-web', 'dating-pwa']);

export const visibleProjects = allProjects.filter((project) => !hiddenProjectIds.has(project.id));

/** Subset used for prev/next navigation inside case studies — skips locked projects (those with empty `link`). */
export const navigableProjects = visibleProjects.filter((project) => project.link !== '');

/** Cards rendered under the "Vibe Coding" tab on /work. */
export const vibeCodingProjects: Project[] = [
  {
    id: 'inspiration-library',
    tags: ['Claude Code', 'AI Classifier', 'PWA', 'Personal Project'],
    image: '/images/projects/IdeaBox.jpg',
    link: '/work/goodstuff',
    unlock: GOODSTUFF_UNLOCK,
  },
];
