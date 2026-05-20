'use client';

interface SectionLabelProps {
  label: string;
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-5 bg-accent rounded-full" />
      <span className="font-[var(--font-mono)] text-[14px] md:text-[14px] text-accent uppercase tracking-[2px]">
        {label}
      </span>
    </div>
  );
}
