import { setRequestLocale } from 'next-intl/server';
import StreetInterviewKitClient from './StreetInterviewKitClient';

export function generateMetadata() {
  return {
    title: '把一支街訪毛片變成可複製的產線｜餐飲街訪 AI 剪輯工作流拆解',
    description:
      '把一支餐飲街訪，從每次都要重來的手工剪輯，收斂成能上 GitHub、同事下載就能產出同級成品的餐飲街訪 Kit——設計凍結、判斷保留的一條產線拆解全記錄。',
  };
}

export default async function StreetInterviewKitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StreetInterviewKitClient />;
}
