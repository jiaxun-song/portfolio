'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'text-in' | 'text-out' | 'curtain' | 'done'>('text-in');

  useEffect(() => {
    // Check if reduced motion or already seen this session
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenSplash = sessionStorage.getItem('splash-seen');

    if (prefersReducedMotion || hasSeenSplash) {
      onComplete();
      setPhase('done');
      return;
    }

    document.body.style.overflow = 'hidden';

    // Timeline: 0.3s text fade in, 1.5s text fade out, 2.0s curtain slide, 2.8s done
    const t1 = setTimeout(() => setPhase('text-out'), 1500);
    const t2 = setTimeout(() => setPhase('curtain'), 2000);
    const t3 = setTimeout(() => {
      setPhase('done');
      sessionStorage.setItem('splash-seen', 'true');
      document.body.style.overflow = '';
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-tertiary"
        animate={
          phase === 'curtain'
            ? { y: '100vh' }
            : { y: 0 }
        }
        transition={
          phase === 'curtain'
            ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            : undefined
        }
      >
        <motion.h1
          className="text-3xl md:text-5xl font-medium font-[var(--font-display)] text-text-primary"
          initial={{ opacity: 0 }}
          animate={
            phase === 'text-in'
              ? { opacity: 1 }
              : { opacity: 0, y: -20 }
          }
          transition={
            phase === 'text-in'
              ? { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
          }
        >
          Hi! I&apos;m Jade Song
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}
