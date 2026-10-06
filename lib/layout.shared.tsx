import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(lang: string): BaseLayoutProps {
  const ar = lang === 'ar';
  return {
    nav: {
      title: (
        <>
          <img src="/logo/logo-dark.svg" alt="Kashfy" className="h-6 w-auto dark:hidden" />
          <img src="/logo/logo-light.svg" alt="Kashfy" className="h-6 w-auto hidden dark:block" />
        </>
      ),
      url: ar ? '/ar' : '/',
    },
    links: [
      { text: ar ? 'الأسعار' : 'Pricing', url: 'https://kashfy.site/pricing', external: true },
      { text: ar ? 'الدعم' : 'Support', url: 'mailto:support@kashfy.site', external: true },
      {
        type: 'button',
        text: ar ? 'افتح التطبيق' : 'Open App',
        url: 'https://kashfy.site',
        external: true,
      },
    ],
  };
}
