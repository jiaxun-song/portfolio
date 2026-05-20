import { setRequestLocale } from 'next-intl/server';
import RollingXClient from './RollingXClient';

export default async function RollingXPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RollingXClient />;
}
