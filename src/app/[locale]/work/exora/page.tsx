import { setRequestLocale } from 'next-intl/server';
import ExoraClient from './ExoraClient';

export default async function ExoraPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExoraClient />;
}
