import { setRequestLocale } from 'next-intl/server';
import PredictionMarketClient from './PredictionMarketClient';

export default async function PredictionMarketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PredictionMarketClient />;
}
