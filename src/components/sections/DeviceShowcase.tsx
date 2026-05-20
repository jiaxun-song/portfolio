'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Device dimensions — all square, 1.1x scale
const CARD_SIZE = 220;  // square cards
const CARD_SIZE_MOBILE = 120;

// Reference design: 1440px wide, 200px padding each side
const REF_VW = 1440;
const REF_PADDING = 200;

// Positions as fractions of the usable area (-0.5 = left/top edge, +0.5 = right/bottom edge)
// Counterclockwise from top-left: 01→02→03→04→05→06→07→08→09
const devicePositions = [
  // 01 — top-left
  { id: '01', image: '/images/devices/01.jpg', fx: -0.46, fy: -0.34, scale: 0.85, rotation: -5,  offsetX: -6,  offsetY: -8  },
  // 02 — mid-left
  { id: '02', image: '/images/devices/02.jpg', fx: -0.42, fy:  0.04, scale: 0.90, rotation: -3,  offsetX: 10,  offsetY: 4   },
  // 03 — bottom-left
  { id: '03', image: '/images/devices/03.jpg', fx: -0.44, fy:  0.34, scale: 0.80, rotation:  2,  offsetX: -8,  offsetY: 12  },
  // 04 — bottom center-left (swapped: shows 05.jpg)
  { id: '04', image: '/images/devices/05.jpg', fx: -0.16, fy:  0.40, scale: 0.75, rotation: -2,  offsetX: 4,   offsetY: -6  },
  // 05 — bottom center-right (swapped: shows 04.jpg)
  { id: '05', image: '/images/devices/04.jpg', fx:  0.20, fy:  0.38, scale: 0.85, rotation:  2,  offsetX: 8,   offsetY: -4  },
  // 06 — bottom-right
  { id: '06', image: '/images/devices/06.jpg', fx:  0.40, fy:  0.32, scale: 0.80, rotation: -4,  offsetX: -4,  offsetY: 8   },
  // 07 — mid-right
  { id: '07', image: '/images/devices/07.jpg', fx:  0.44, fy:  0.04, scale: 0.90, rotation:  5,  offsetX: 6,   offsetY: -10 },
  // 08 — top-right
  { id: '08', image: '/images/devices/08.jpg', fx:  0.36, fy: -0.34, scale: 0.85, rotation:  3,  offsetX: -8,  offsetY: 8   },
  // 09 — top-center
  { id: '09', image: '/images/devices/09.jpg', fx:  0.04, fy: -0.38, scale: 0.75, rotation:  1,  offsetX: -10, offsetY: 6   },
];

export default function DeviceShowcase() {
  const t = useTranslations('deviceShowcase');
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const setupAnimation = useCallback(() => {
    if (isMobile || !containerRef.current || !pinWrapRef.current) return;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Scale padding proportionally (200px at 1440px)
      const padding = vw * (REF_PADDING / REF_VW);

      // Usable area devices can occupy — cap at laptop size so large screens don't over-spread
      const maxSpreadW = REF_VW - REF_PADDING * 2; // 1040px
      const usableW = Math.min(vw - padding * 2, maxSpreadW);
      const usableH = Math.min(vh, 900);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          pin: pinWrapRef.current,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Animation completes at ~63% of scroll (0.63), remaining 37% holds the final state
      const anim = 0.4;

      devicePositions.forEach((device) => {
        const el = pinWrapRef.current?.querySelector(`[data-device="${device.id}"]`);
        if (!el) return;

        const cardW = CARD_SIZE;
        const cardH = CARD_SIZE;
        const halfW = (cardW * device.scale) / 2;
        const halfH = (cardH * device.scale) / 2;

        // Clamp so card edges stay within usable area
        const maxX = usableW / 2 - halfW;
        const maxY = usableH / 2 - halfH;
        const targetX = Math.max(-maxX, Math.min(maxX, device.fx * usableW));
        const targetY = Math.max(-maxY, Math.min(maxY, device.fy * usableH));

        tl.to(el, {
          x: targetX,
          y: targetY,
          scale: device.scale,
          rotation: device.rotation,
          ease: 'none',
          duration: anim,
          force3d: true,
        }, 0);
      });

      // Text fades in as devices spread
      tl.to('.stats-number',      { opacity: 1, scale: 1, ease: 'none', duration: 0.22 }, anim * 0.4);
      tl.to('.stats-label',       { opacity: 1, y: 0,     ease: 'none', duration: 0.16 }, anim * 0.55);
      tl.to('.stats-description', { opacity: 1,           ease: 'none', duration: 0.16 }, anim * 0.7);
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  useEffect(() => {
    const cleanup = setupAnimation();
    return cleanup;
  }, [setupAnimation]);

  // Mobile / Tablet: scroll-driven cards with smaller sizes + text backdrop
  if (isMobile) {
    return <DeviceShowcaseMobile t={t} />;
  }

  // Desktop: original layout
  return (
    <div ref={containerRef}>
      <div ref={pinWrapRef} className="relative h-screen overflow-clip">
        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />
        </div>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <h2 className="stats-number text-8xl md:text-9xl font-bold text-accent font-[var(--font-display)] opacity-0 scale-[0.8]">
            {t('count')}
          </h2>
          <p className="stats-label text-xl md:text-2xl font-bold tracking-[0.2em] text-accent opacity-0 translate-y-4 mt-2">
            {t('label')}
          </p>
          <p className="stats-description text-text-secondary mt-4 opacity-0 max-w-xl text-center whitespace-pre-line">
            {t('description')}
          </p>
        </div>

        {/* Device mockups — all start stacked at center, 80% of original size */}
        {devicePositions.map((device) => (
          <div
            key={device.id}
            data-device={device.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 will-change-transform"
            style={{
              marginLeft: device.offsetX,
              marginTop: device.offsetY,
            }}
          >
            <div
              className="relative w-[176px] h-[176px] md:w-[220px] md:h-[220px] bg-bg-secondary/80 border border-border overflow-hidden shadow-2xl"
              style={{ borderRadius: 24 }}
            >
              <Image
                src={device.image}
                alt={device.id}
                fill
                className="object-cover"
                sizes="220px"
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mobile / Tablet sub-component ─── */
function DeviceShowcaseMobile({ t }: { t: ReturnType<typeof useTranslations<'deviceShowcase'>> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pinWrapRef.current) return;

    const ctx = gsap.context(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const padding = 20;
      const usableW = vw - padding * 2;
      const usableH = Math.min(vh, 700);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          pin: pinWrapRef.current,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      const anim = 0.4;

      devicePositions.forEach((device) => {
        const el = pinWrapRef.current?.querySelector(`[data-device="${device.id}"]`);
        if (!el) return;

        const halfW = (CARD_SIZE_MOBILE * device.scale) / 2;
        const halfH = (CARD_SIZE_MOBILE * device.scale) / 2;

        const maxX = usableW / 2 - halfW;
        const maxY = usableH / 2 - halfH;
        const targetX = Math.max(-maxX, Math.min(maxX, device.fx * usableW));
        const targetY = Math.max(-maxY, Math.min(maxY, device.fy * usableH));

        tl.to(el, {
          x: targetX,
          y: targetY,
          scale: device.scale * 0.85,
          rotation: device.rotation,
          ease: 'none',
          duration: anim,
          force3d: true,
        }, 0);
      });

      // Text fades in as devices spread
      tl.to('.stats-number',      { opacity: 1, scale: 1, ease: 'none', duration: 0.22 }, anim * 0.4);
      tl.to('.stats-label',       { opacity: 1, y: 0,     ease: 'none', duration: 0.16 }, anim * 0.55);
      tl.to('.stats-description', { opacity: 1,           ease: 'none', duration: 0.16 }, anim * 0.7);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div ref={pinWrapRef} className="relative h-screen overflow-clip">
        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px]" />
        </div>

        {/* Center text with backdrop for readability */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <div className="relative flex flex-col items-center px-6">
            <div className="absolute -inset-x-10 -inset-y-8 rounded-3xl bg-[radial-gradient(ellipse,rgba(16,17,20,0.88)_0%,transparent_70%)]" />
            <h2 className="stats-number relative text-7xl font-bold text-accent font-[var(--font-display)] opacity-0 scale-[0.8]">
              {t('count')}
            </h2>
            <p className="stats-label relative text-lg font-bold tracking-[0.2em] text-accent opacity-0 translate-y-4 mt-2">
              {t('label')}
            </p>
            <p className="stats-description relative text-sm text-text-secondary mt-4 opacity-0 max-w-xs text-center whitespace-pre-line">
              {t('description')}
            </p>
          </div>
        </div>

        {/* Device mockups — smaller on mobile */}
        {devicePositions.map((device) => (
          <div
            key={device.id}
            data-device={device.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 will-change-transform"
            style={{
              marginLeft: device.offsetX * 0.5,
              marginTop: device.offsetY * 0.5,
            }}
          >
            <div
              className="relative bg-bg-secondary/80 border border-border overflow-hidden shadow-2xl"
              style={{ width: CARD_SIZE_MOBILE, height: CARD_SIZE_MOBILE, borderRadius: 16 }}
            >
              <Image
                src={device.image}
                alt={device.id}
                fill
                className="object-cover"
                sizes="120px"
                priority
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
