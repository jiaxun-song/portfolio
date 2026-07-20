import { setRequestLocale } from 'next-intl/server';
import ArticleClient from './ArticleClient';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ArticleClient />;
}
