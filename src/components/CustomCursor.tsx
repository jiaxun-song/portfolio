'use client';

import { useEffect, useRef, useCallback } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"], [data-cursor-hover]';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const hoveredRef = useRef(false);

  const applyScale = useCallback(() => {
    const el = cursorRef.current;
    if (!el) return;
    el.style.transform = `scale(${hoveredRef.current ? 1 : 0.3})`;
    el.style.opacity = visibleRef.current ? '1' : '0';
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const style = document.createElement('style');
    const mql = window.matchMedia('(min-width: 768px)');

    const enableCursor = () => {
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
      style.textContent = '*, *::before, *::after { cursor: none !important; }';
      if (!style.parentNode) document.head.appendChild(style);
    };

    const disableCursor = () => {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      style.textContent = '';
      visibleRef.current = false;
      applyScale();
    };

    if (mql.matches) enableCursor();

    const onMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) enableCursor();
      else disableCursor();
    };
    mql.addEventListener('change', onMediaChange);

    const onMouseMove = (e: MouseEvent) => {
      const el = cursorRef.current;
      if (!el) return;
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      if (!visibleRef.current) {
        visibleRef.current = true;
        applyScale();
      }
    };

    const onMouseEnter = () => {
      visibleRef.current = true;
      applyScale();
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      applyScale();
    };

    const onPointerOver = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE_SELECTOR)) {
        hoveredRef.current = true;
        applyScale();
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE_SELECTOR)) {
        hoveredRef.current = false;
        applyScale();
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });

    return () => {
      mql.removeEventListener('change', onMediaChange);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      style.remove();
    };
  }, [applyScale]);

  return (
    <div
      ref={cursorRef}
      className="fixed z-[9999] pointer-events-none hidden md:block"
      style={{
        width: 50,
        height: 50,
        marginLeft: -25,
        marginTop: -25,
        borderRadius: '50%',
        backgroundColor: '#fff',
        mixBlendMode: 'difference',
        opacity: 0,
        transform: 'scale(0.3)',
        transition: 'transform 300ms ease-out, opacity 150ms ease',
        willChange: 'left, top, transform',
      }}
    />
  );
}
