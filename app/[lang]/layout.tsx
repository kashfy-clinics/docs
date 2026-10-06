import '../global.css';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { i18n, dirOf } from '@/lib/i18n';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { appName, siteUrl } from '@/lib/shared';

const { provider } = defineI18nUI(i18n, {
  en: {
    displayName: 'English',
  },
  ar: {
    displayName: 'العربية',
    'Search(search trigger)': 'دوّر',
    'Search(search dialog)': 'دوّر في الشرح',
    'Open Search(search trigger)(aria-label)': 'افتح البحث',
    'Close Search(search dialog)(aria-label)': 'اقفل البحث',
    'No results found(search dialog)': 'مفيش نتايج',
    'On this page(table of contents)': 'في الصفحة دي',
    'No Headings(table of contents)': 'مفيش عناوين',
    'Table of Contents(inline table of contents)': 'المحتوى',
    'Next Page(pagination)': 'اللي بعده',
    'Previous Page(pagination)': 'اللي قبله',
    'Last updated on(page footer)': 'آخر تعديل',
    'Choose a language(language switcher)': 'اختار اللغة',
    'Choose a language(language switcher)(aria-label)': 'اختار اللغة',
    'Language(language switcher)': 'اللغة',
    'Theme(site menu)': 'الشكل',
    'Toggle Theme(theme switcher)(aria-label)': 'غيّر الشكل',
    'Light(theme switcher)(aria-label)': 'فاتح',
    'Dark(theme switcher)(aria-label)': 'غامق',
    'System(theme switcher)(aria-label)': 'زي الجهاز',
    'Open Sidebar(aria-label)': 'افتح القايمة',
    'Open Sidebar(sidebar)(aria-label)': 'افتح القايمة',
    'Close Sidebar(aria-label)': 'اقفل القايمة',
    'Close Sidebar(sidebar)(aria-label)': 'اقفل القايمة',
    'Collapse Sidebar(sidebar)(aria-label)': 'صغّر القايمة',
    'Hide Sidebar(sidebar)': 'خبّي القايمة',
    'Show Sidebar(sidebar)': 'اظهر القايمة',
    'Toggle Menu(home layout header)(aria-label)': 'افتح القايمة',
    'Copy Markdown(page actions)': 'انسخ Markdown',
    'Copied Markdown(page actions)': 'اتنسخ',
    'Open(page actions)': 'افتح في',
    'View as Markdown(page actions)': 'اعرضها Markdown',
    'Copy Text(code block)(aria-label)': 'انسخ',
    'Copied Text(code block)(aria-label)': 'اتنسخ',
    'Copy Anchor Link(heading anchor)(aria-label)': 'انسخ اللينك',
    'Copied Anchor Link(heading anchor)(aria-label)': 'اتنسخ',
    'Copy Link(accordion)(aria-label)': 'انسخ اللينك',
    'Copied Link(accordion)(aria-label)': 'اتنسخ',
    'Page Not Found(404 not found page)': 'الصفحة دي مش موجودة',
    'Back to Home(404 not found page)': 'ارجع للرئيسية',
    'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 not found page)':
      'يمكن الصفحة اتشالت أو اسمها اتغير.',
  },
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s - ${appName}`,
  },
  description: 'Documentation for Kashfy - the AI-powered clinic receptionist for Egyptian clinics',
  icons: { icon: '/favicon.ico' },
};

export default async function Layout({ params, children }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const dir = dirOf(lang);

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider dir={dir} i18n={provider(lang)}>
          <DocsLayout tree={source.getPageTree(lang)} {...baseOptions(lang)}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
