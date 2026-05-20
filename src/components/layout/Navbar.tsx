'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';

const navLinks = [
  { label: 'Projects', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: 'https://drive.google.com/drive/u/5/folders/1jTFXeVDkk5sfFede1RY9_F6DIogl7pvu?usp=sharing', external: true },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Direct DOM manipulation — no React re-render on scroll
  const handleScroll = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    const p = Math.min(window.scrollY / 120, 1);
    const blur = p * 20;
    const bgAlpha = 0.2 + p * 0.4; // 0.2 → 0.6

    el.style.backdropFilter = `blur(${blur}px)`;
    (el.style as CSSStyleDeclaration & { WebkitBackdropFilter: string }).WebkitBackdropFilter = `blur(${blur}px)`;
    el.style.background = `rgba(20, 20, 20, ${bgAlpha})`;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 2.8 }}
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(20, 20, 20, 0.2)',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-[var(--font-display)] text-xl font-black tracking-tight text-text-primary"
            >
              JADE
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isInternal = link.href.startsWith('/');
                const isExternal = 'external' in link && link.external;
                const Tag = isInternal ? Link : 'a';
                const isActive = isInternal && pathname === link.href;
                return (
                  <Tag
                    key={link.label}
                    href={link.href}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`group relative text-sm transition-colors duration-300 ${isActive ? 'text-[var(--color-accent)]' : 'text-text-secondary hover:text-text-primary'}`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Tag>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-text-primary p-1"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass-heavy flex items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => {
                const isInternal = link.href.startsWith('/');
                const isExternal = 'external' in link && link.external;
                const Tag = isInternal ? Link : 'a';
                const isActive = isInternal && pathname === link.href;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Tag
                      href={link.href}
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`text-2xl font-medium transition-colors ${isActive ? 'text-accent' : 'text-text-primary hover:text-accent'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Tag>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
