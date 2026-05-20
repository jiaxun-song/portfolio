import { setRequestLocale } from 'next-intl/server';
import Web3VidClient from './Web3VidClient';

export default async function Web3VidPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Web3VidClient />;
}
