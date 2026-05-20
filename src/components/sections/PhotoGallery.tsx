'use client';

const photos = [
  { alt: 'Event photo 1' },
  { alt: 'Event photo 2' },
  { alt: 'Event photo 3' },
  { alt: 'Event photo 4' },
];

export default function PhotoGallery() {
  // Duplicate for seamless loop
  const allPhotos = [...photos, ...photos];

  return (
    <section className="py-20 overflow-hidden">
      <div
        className="flex gap-5 max-sm:gap-3 w-max hover:[animation-play-state:paused]"
        style={{ animation: 'scroll-gallery 30s linear infinite' }}
      >
        {allPhotos.map((photo, i) => (
          <div
            key={i}
            className="shrink-0 w-[360px] h-[260px] max-sm:w-[280px] max-sm:h-[200px] rounded-[var(--card-border-radius)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center"
          >
            {/* Placeholder — replace with <Image> when photos are ready */}
            <span className="text-[var(--color-text-muted)] text-sm font-[var(--font-mono)]">
              {photo.alt}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
