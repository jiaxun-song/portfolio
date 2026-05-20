'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

const photos = [
  '/images/about/carousel-1.png',
  '/images/about/carousel-2.png',
  '/images/about/carousel-3.png',
  '/images/about/carousel-4.png',
];

export default function PhotoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let position = 0;
    const speed = 0.2; // px per frame

    const animate = () => {
      position -= speed;
      // Reset when first set scrolls out
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(position) >= halfWidth) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleEnter = () => cancelAnimationFrame(animationId);
    const handleLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    track.addEventListener('mouseenter', handleEnter);
    track.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(animationId);
      track.removeEventListener('mouseenter', handleEnter);
      track.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section className="w-full pt-[100px] pb-[48px] overflow-hidden">
      <div ref={trackRef} className="flex gap-7 w-max will-change-transform">
        {/* Duplicate photos for seamless loop */}
        {[...photos, ...photos].map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 rounded-2xl overflow-hidden opacity-85"
            style={{ width: '518px', aspectRatio: '4/3' }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="518px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
