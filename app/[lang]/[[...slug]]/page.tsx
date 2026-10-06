import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getPageMarkdownUrl, gitConfig } from '@/lib/shared';
import { dirOf, i18n } from '@/lib/i18n';

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

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <div lang={contentLang} dir={contentDir} className="contents">
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      </div>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody lang={contentLang} dir={contentDir}>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
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

  return {
    // The home page keeps the plain site name.
    title: page.slugs.length === 0 ? { absolute: page.data.title } : page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
    },
  };
}
