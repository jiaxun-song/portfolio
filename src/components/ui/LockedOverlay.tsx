'use client';

import { formatCountdown } from '@/hooks/useUnlockCountdown';

interface LockedOverlayProps {
  /** Milliseconds left; `null` hides the countdown pill and leaves just the padlock. */
  remaining: number | null;
  /** Extra classes for the overlay container (e.g. to match the parent's border radius). */
  className?: string;
}

/**
 * Padlock + "Coming Soon" + countdown, revealed on card hover.
 * Always visible on touch devices, where there is no hover state to trigger it.
 */
export default function LockedOverlay({ remaining, className = '' }: LockedOverlayProps) {
  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2.5 bg-black/65 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ${className}`}
      style={{ backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
    >
      <i className="ri-lock-2-line text-3xl md:text-4xl text-white" aria-hidden="true" />
      <span className="text-white text-base md:text-lg font-semibold tracking-wide">Coming Soon</span>
      {remaining !== null && (
        <span
          className="font-[var(--font-mono)] text-sm md:text-base tabular-nums tracking-[0.12em] px-3 py-1 rounded-full"
          style={{
            color: 'var(--color-accent)',
            background: 'rgba(0, 229, 208, 0.08)',
            border: '1px solid rgba(0, 229, 208, 0.28)',
          }}
        >
          {formatCountdown(remaining)}
        </span>
      )}
    </div>
  );
}
