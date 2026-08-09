'use client';

import { navigableProjects, type Project } from '@/data/projects';
import { isGateLocked, useUnlockClock } from './useUnlockCountdown';

/* Only timed gates need the clock — a timer-less gate reads as locked without it. */
const hasTimedGate = navigableProjects.some(
  (project) => project.unlock && project.unlock.windowMs !== null,
);

export interface ProjectNav {
  prev: Project;
  next: Project;
}

/**
 * Prev/next links for a case study, skipping projects whose unlock gate hasn't opened yet — a
 * locked neighbour would otherwise dead-end on a page nobody can reach from /work. Ticks with the
 * countdown clock, so the skipped project slots back in the moment it unlocks.
 */
export function useProjectNav(currentId: string): ProjectNav {
  const now = useUnlockClock(hasTimedGate);

  /* Keep the current project in the ring even if it is itself locked — it anchors the index. */
  const reachable = navigableProjects.filter(
    (project) => project.id === currentId || !isGateLocked(project.unlock, now),
  );

  const idx = reachable.findIndex((project) => project.id === currentId);
  if (idx === -1) {
    return { prev: navigableProjects[0], next: navigableProjects[0] };
  }

  return {
    prev: reachable[(idx - 1 + reachable.length) % reachable.length],
    next: reachable[(idx + 1) % reachable.length],
  };
}
