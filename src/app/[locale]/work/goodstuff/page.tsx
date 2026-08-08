import { setRequestLocale } from 'next-intl/server';
import GoodstuffClient from './GoodstuffClient';

export default async function GoodstuffPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GoodstuffClient />;
}
