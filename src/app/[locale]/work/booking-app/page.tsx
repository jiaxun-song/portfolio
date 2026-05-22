import { setRequestLocale } from 'next-intl/server';
import BookingAppClient from './BookingAppClient';

export default async function BookingAppPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BookingAppClient />;
}
