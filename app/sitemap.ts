import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

export const revalidate = false;

/** Every page in both languages, each linking to its other-language version. */
export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages('en').map((page) => {
    const en = `${siteUrl}${page.url === '/' ? '' : page.url}`;
    const ar = `${siteUrl}/ar${page.url === '/' ? '' : page.url}`;
    const languages = { en, ar, 'x-default': en };
    return [
      { url: en, changeFrequency: 'weekly' as const, priority: page.url === '/' ? 1 : 0.7, alternates: { languages } },
      { url: ar, changeFrequency: 'weekly' as const, priority: page.url === '/' ? 1 : 0.7, alternates: { languages } },
    ];
  }).flat();
}
