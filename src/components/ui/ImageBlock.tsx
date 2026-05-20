'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  width?: 'content' | 'wide' | 'bleed';
  aspectRatio?: string;
}

const maxWidths = {
  content: 'max-w-[800px]',
  wide: 'max-w-[1200px]',
  bleed: 'max-w-[1440px]',
};

export default function ImageBlock({ src, alt, caption, width = 'wide', aspectRatio = '16/10' }: ImageBlockProps) {
  return (
    <motion.div
      className={`mx-auto px-6 md:px-12 ${maxWidths[width]}`}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="relative w-full rounded-2xl md:rounded-2xl overflow-hidden border border-border bg-bg-tertiary"
        style={{ aspectRatio }}
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" />
      </div>
      {caption && (
        <p className="text-[14px] text-text-muted text-center mt-3">{caption}</p>
      )}
    </motion.div>
  );
}
