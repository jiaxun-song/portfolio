import { setRequestLocale } from 'next-intl/server';
import Fable5ReviewClient from './Fable5ReviewClient';

export function generateMetadata() {
  return {
    title: 'Fable 5 值得用嗎？三個真實任務後的實測結論',
    description:
      '同一份 Three.js Landing Page 需求，實測 Fable 5、Claude Opus、GPT 5.5、Gemini 3.1 Pro，兩輪迭代後的完整評測與選用建議。',
  };
}

export default async function Fable5ReviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Fable5ReviewClient />;
}
