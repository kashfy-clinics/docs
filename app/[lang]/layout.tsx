import '../global.css';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { defineI18nUI } from 'fumadocs-ui/i18n';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { i18n, dirOf } from '@/lib/i18n';
import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { appName, siteUrl } from '@/lib/shared';

const { provider } = defineI18nUI(i18n, {
  en: {
    displayName: 'English',
  },
  ar: {
    displayName: 'العربية',
    'Search(search trigger)': 'بحث',
    'Search(search dialog)': 'ابحث في التوثيق',
    'Open Search(search trigger)(aria-label)': 'فتح البحث',
    'Close Search(search dialog)(aria-label)': 'إغلاق البحث',
    'No results found(search dialog)': 'لا توجد نتائج',
    'On this page(table of contents)': 'في هذه الصفحة',
    'No Headings(table of contents)': 'لا توجد عناوين',
    'Table of Contents(inline table of contents)': 'المحتويات',
    'Next Page(pagination)': 'التالي',
    'Previous Page(pagination)': 'السابق',
    'Last updated on(page footer)': 'آخر تحديث',
    'Choose a language(language switcher)': 'اختر اللغة',
    'Choose a language(language switcher)(aria-label)': 'اختر اللغة',
    'Language(language switcher)': 'اللغة',
    'Theme(site menu)': 'المظهر',
    'Toggle Theme(theme switcher)(aria-label)': 'تبديل المظهر',
    'Light(theme switcher)(aria-label)': 'فاتح',
    'Dark(theme switcher)(aria-label)': 'داكن',
    'System(theme switcher)(aria-label)': 'حسب النظام',
    'Open Sidebar(aria-label)': 'فتح القائمة',
    'Open Sidebar(sidebar)(aria-label)': 'فتح القائمة',
    'Close Sidebar(aria-label)': 'إغلاق القائمة',
    'Close Sidebar(sidebar)(aria-label)': 'إغلاق القائمة',
    'Collapse Sidebar(sidebar)(aria-label)': 'طي القائمة',
    'Hide Sidebar(sidebar)': 'إخفاء القائمة',
    'Show Sidebar(sidebar)': 'إظهار القائمة',
    'Toggle Menu(home layout header)(aria-label)': 'فتح القائمة',
    'Copy Markdown(page actions)': 'نسخ Markdown',
    'Copied Markdown(page actions)': 'تم النسخ',
    'Open(page actions)': 'فتح في',
    'View as Markdown(page actions)': 'عرض بصيغة Markdown',
    'Copy Text(code block)(aria-label)': 'نسخ',
    'Copied Text(code block)(aria-label)': 'تم النسخ',
    'Copy Anchor Link(heading anchor)(aria-label)': 'نسخ الرابط',
    'Copied Anchor Link(heading anchor)(aria-label)': 'تم نسخ الرابط',
    'Copy Link(accordion)(aria-label)': 'نسخ الرابط',
    'Copied Link(accordion)(aria-label)': 'تم نسخ الرابط',
    'Page Not Found(404 not found page)': 'الصفحة غير موجودة',
    'Back to Home(404 not found page)': 'العودة إلى الرئيسية',
    'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 not found page)':
      'ربما حُذفت الصفحة التي تبحث عنها أو تغيّر اسمها، أو أنها غير متاحة مؤقتًا.',
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
  const options = baseOptions(lang);

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider dir={dir} i18n={provider(lang)}>
          {/* Full-width top bar with logo, search and the Pricing / Support / Open App links */}
          <DocsLayout tree={source.getPageTree(lang)} {...options} nav={{ ...options.nav, mode: 'top', children: <SidebarToggle /> }}>
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
