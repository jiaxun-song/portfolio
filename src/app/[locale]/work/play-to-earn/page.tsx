import { setRequestLocale } from 'next-intl/server';
import PlayToEarnClient from './PlayToEarnClient';

export default async function PlayToEarnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PlayToEarnClient />;
}
