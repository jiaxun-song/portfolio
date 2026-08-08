'use client';

import { useSyncExternalStore } from 'react';
import type { UnlockGate } from '@/data/projects';

/* A single module-level 1s clock, so every countdown on the page ticks off one interval. */
let cachedNow: number | null = null;
const listeners = new Set<() => void>();
let timerId: ReturnType<typeof setInterval> | null = null;

function subscribeToClock(listener: () => void) {
  listeners.add(listener);
  if (timerId === null) {
    cachedNow = Date.now();
    timerId = setInterval(() => {
      cachedNow = Date.now();
      for (const l of listeners) l();
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  };
}

/** Ungated cards skip the clock entirely so they never re-render on the tick. */
const noopSubscribe = () => () => {};
const getClock = () => cachedNow;
const getServerClock = () => null;

export interface UnlockCountdown {
  locked: boolean;
  /** Milliseconds left, clamped to the gate's window. `null` when the item has no unlock gate. */
  remaining: number | null;
}

/**
 * Counts down to a gate's absolute unlock timestamp. Renders as "locked, full window" on the server
 * and on the first client paint, then ticks once mounted — so SSR and hydration always agree.
 */
export function useUnlockCountdown(gate?: UnlockGate): UnlockCountdown {
  const now = useSyncExternalStore(
    gate ? subscribeToClock : noopSubscribe,
    getClock,
    getServerClock,
  );

  if (!gate) return { locked: false, remaining: null };

  const remaining =
    now === null
      ? gate.windowMs
      : Math.min(Math.max(gate.at - now, 0), gate.windowMs);

  return { locked: remaining > 0, remaining };
}

/** ms → "HH:MM:SS" */
export function formatCountdown(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((n) => String(n).padStart(2, '0')).join(':');
}
