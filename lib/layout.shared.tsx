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
      // The notebook top bar renders every link as plain text, so the
      // "Open App" button is a custom item there and a normal link in the mobile menu.
      {
        type: 'custom',
        on: 'nav',
        children: (
          <a
            href="https://kashfy.site"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center rounded-full border border-fd-primary bg-fd-primary px-3.5 py-1.5 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90 cursor-pointer"
          >
            {ar ? 'فتح التطبيق' : 'Open App'}
          </a>
        ),
      },
      {
        on: 'menu',
        text: ar ? 'فتح التطبيق' : 'Open App',
        url: 'https://kashfy.site',
        external: true,
      },
    ],
  };
}
