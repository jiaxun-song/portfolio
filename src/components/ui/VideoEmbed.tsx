'use client';

import { motion } from 'framer-motion';

interface VideoEmbedProps {
  videoId: string;
  caption?: string;
  width?: 'content' | 'wide' | 'bleed';
  padded?: boolean;
}

const maxWidths = {
  content: 'max-w-[800px]',
  wide: 'max-w-[1200px]',
  bleed: 'max-w-[1440px]',
};

export default function VideoEmbed({ videoId, caption, width = 'wide', padded = true }: VideoEmbedProps) {
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080`;

  return (
    <motion.div
      className={`mx-auto w-full ${padded ? 'px-6 md:px-12' : ''} ${maxWidths[width]}`}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-bg-secondary" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={src}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          loading="lazy"
          title={caption || 'Video'}
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {caption && (
        <p className="text-[14px] text-text-muted text-center mt-3">{caption}</p>
      )}
    </motion.div>
  );
}
