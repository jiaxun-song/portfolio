import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Messages = Record<string, unknown>;

function mergeMessages(fallback: Messages, messages: Messages): Messages {
  const merged: Messages = { ...fallback };

  for (const [key, value] of Object.entries(messages)) {
    const fallbackValue = fallback[key];

    if (
      value &&
      fallbackValue &&
      typeof value === 'object' &&
      typeof fallbackValue === 'object' &&
      !Array.isArray(value) &&
      !Array.isArray(fallbackValue)
    ) {
      merged[key] = mergeMessages(fallbackValue as Messages, value as Messages);
    } else {
      merged[key] = value;
    }
  }

  return merged;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'zh-TW' | 'en')) {
    locale = routing.defaultLocale;
  }

  const fallbackMessages = (await import(`../messages/${routing.defaultLocale}.json`)).default;
  const localeMessages =
    locale === routing.defaultLocale
      ? fallbackMessages
      : (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages:
      locale === routing.defaultLocale
        ? fallbackMessages
        : mergeMessages(fallbackMessages, localeMessages),
  };
});
