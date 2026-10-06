import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
} from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';
import { Card, getMDXComponents } from '@/components/mdx';
import { PageActions } from '@/components/page-actions';
import type { Metadata } from 'next';
import type { ComponentProps } from 'react';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getPageMarkdownUrl } from '@/lib/shared';
import { dirOf, i18n } from '@/lib/i18n';

/** Content links are written as "/lab/intake"; keep readers in their language. */
function localizeHref(href: string | undefined, lang: string) {
  if (!href || lang === i18n.defaultLanguage || !href.startsWith('/') || href.startsWith('//')) return href;
  if (href === `/${lang}` || href.startsWith(`/${lang}/`) || href.startsWith(`/${lang}#`)) return href;
  // Static files (images, icons) are not localized.
  if (/\.[a-z0-9]+$/i.test(href.split('#')[0])) return href;
  return href === '/' ? `/${lang}` : `/${lang}${href}`;
}

export default async function Page(props: PageProps<'/[lang]/[[...slug]]'>) {
  const { lang, slug } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  // Untranslated pages fall back to English: keep their text left-to-right
  // inside the Arabic (RTL) layout.
  const translated = lang === i18n.defaultLanguage || page.path.endsWith(`.${lang}.mdx`);
  const contentLang = translated ? lang : i18n.defaultLanguage;
  const contentDir = dirOf(contentLang);
  const RelativeLink = createRelativeLink(source, page);

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <div lang={contentLang} dir={contentDir} className="contents">
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      </div>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <PageActions lang={lang} markdownUrl={markdownUrl} />
      </div>
      <DocsBody lang={contentLang} dir={contentDir}>
        <MDX
          components={getMDXComponents({
            a: (p) => <RelativeLink {...p} href={localizeHref(p.href, lang)} />,
            Card: (p: ComponentProps<typeof Card>) => <Card {...p} href={localizeHref(p.href, lang)} />,
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/[lang]/[[...slug]]'>): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  const enPath = `/${page.slugs.join('/')}`;

  return {
    // The home page keeps the plain site name.
    title: page.slugs.length === 0 ? { absolute: page.data.title } : page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
      languages: {
        en: enPath,
        ar: enPath === '/' ? '/ar' : `/ar${enPath}`,
        'x-default': enPath,
      },
    },
  };
}
