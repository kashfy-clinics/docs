import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Kashfy Docs';
export const siteUrl = 'https://docs.kashfy.site';
export const docsContentRoute = '/llms.mdx';

export const gitConfig = {
  user: 'kashfy-clinics',
  repo: 'docs',
  branch: 'main',
};

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}
