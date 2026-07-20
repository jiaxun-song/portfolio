import { setRequestLocale } from 'next-intl/server';
import GoodshitClient from './GoodshitClient';

export default async function GoodshitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GoodshitClient />;
}
