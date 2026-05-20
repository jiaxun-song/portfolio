'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Marquee from '@/components/ui/Marquee';

const UnicornScene = dynamic(() => import('unicornstudio-react'), {
  ssr: false,
});

// Memo the WebGL scene so it never re-renders from parent state changes
const StableWebGLScene = memo(function StableWebGLScene() {
  return (
    <UnicornScene
      projectId="KbPFLo59fHLz24ges3J3"
      width="100%"
      height="100%"
      scale={1}
      dpi={1}
      sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.5/dist/unicornStudio.umd.js"
    />
  );
});

interface HeroSectionProps {
  animationReady: boolean;
}

export default function HeroSection({ animationReady }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause WebGL when hero is scrolled out of view
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      {/* Hashtag labels — always English, aligned with navbar JADE logo */}
      <motion.div
        className="absolute top-12 md:top-20 left-0 right-0 z-[3]"
        initial={{ opacity: 0, x: -20 }}
        animate={animationReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 flex flex-col gap-2">
          <span className="text-[18px] font-extrabold text-accent font-[var(--font-mono)]">
            # Product Design
          </span>
          <span className="text-[18px] font-extrabold text-accent font-[var(--font-mono)]">
            # AI &amp; Trading Enthusiast
          </span>
        </div>
      </motion.div>

      {/* Unicorn Studio WebGL — always shown, including mobile */}
      <motion.div
        className="relative z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={animationReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/*
          Use a wrapper with the visible size (68vw) and an inner div
          scaled up to fill it. The canvas thinks it's 68vw wide
          and won't re-init on window resize since its % base stays stable.
        */}
        <div
          className="mx-auto w-full md:w-[68vw] aspect-square md:aspect-[16/10]"
          style={{
            contain: 'layout style',
            visibility: isVisible ? 'visible' : 'hidden',
          }}
        >
          <StableWebGLScene />
        </div>
      </motion.div>

      {/* Marquee Bar — directly below WebGL, no gap */}
      <motion.div
        className="relative z-[3] -mt-1"
        initial={{ opacity: 0, y: 30 }}
        animate={animationReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Marquee />
      </motion.div>
    </section>
  );
}
