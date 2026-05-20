import { setRequestLocale } from 'next-intl/server';
import WorkClient from './WorkClient';

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WorkClient />;
}
