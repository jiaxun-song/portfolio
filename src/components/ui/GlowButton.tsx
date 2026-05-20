'use client';

import { Link } from '@/i18n/navigation';

interface GlowButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function GlowButton({ href, children }: GlowButtonProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <div className="more-projects-btn-wrap">
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="more-projects-btn"
        >
          {children}
        </a>
      ) : (
        <Link href={href} className="more-projects-btn">
          {children}
        </Link>
      )}
    </div>
  );
}
