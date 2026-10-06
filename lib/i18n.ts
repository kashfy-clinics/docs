import { defineI18n } from 'fumadocs-core/i18n';

// English stays at the root (/lab/intake) so links from the app keep working.
// Arabic lives under /ar and falls back to the English page until it's translated.
export const i18n = defineI18n({
  languages: ['en', 'ar'],
  defaultLanguage: 'en',
  hideLocale: 'default-locale',
  parser: 'dot',
});

export type Lang = (typeof i18n.languages)[number];

export function dirOf(lang: string): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}
