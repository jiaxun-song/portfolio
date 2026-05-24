export interface Project {
  id: string;
  tags: string[];
  image: string;
  link: string;
}

export const allProjects: Project[] = [
  {
    id: 'exora',
    tags: ['Fintech', 'Trading UX', 'Design System'],
    image: '/images/projects/exora-cover.jpg',
    link: '/work/exora',
  },
  {
    id: 'prediction-market',
    tags: ['Fintech', 'Functional Planning', 'Brand Design'],
    image: '/images/projects/prediction-market-cover.jpg',
    link: '',
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
    tags: ['Claude Code', 'AI Tool', 'Personal Project'],
    image: '/images/projects/IdeaBox.jpg',
    link: '',
  },
];
