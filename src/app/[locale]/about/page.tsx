import { setRequestLocale } from 'next-intl/server';
import AboutHero from '@/components/sections/AboutHero';
import DesignValues from '@/components/sections/DesignValues';
import SoftSkills from '@/components/sections/SoftSkills';
import PhotoCarousel from '@/components/sections/PhotoCarousel';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative">
      <AboutHero />

      <DesignValues />

      <SoftSkills />

      <PhotoCarousel />
    </div>
  );
}
