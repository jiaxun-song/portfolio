'use client';

import { useState } from 'react';
import SplashScreen from '@/components/layout/SplashScreen';
import HeroSection from '@/components/sections/HeroSection';
import DeviceShowcase from '@/components/sections/DeviceShowcase';
import CaseStudyGrid from '@/components/sections/CaseStudyGrid';
import WorkingWithAI from '@/components/sections/WorkingWithAI';
import WhatIDo from '@/components/sections/WhatIDo';
import KindWords from '@/components/sections/KindWords';
import CTASection from '@/components/sections/CTASection';

export default function HomeClient() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <SplashScreen onComplete={() => setSplashDone(true)} />

      <div className="flex flex-col">
        <HeroSection animationReady={splashDone} />
        <DeviceShowcase />
        <div className="h-10" />
        <CaseStudyGrid />
        <div className="-mt-5" />
        <WorkingWithAI />
        <WhatIDo />
        <KindWords />
        <CTASection />
      </div>
    </>
  );
}
