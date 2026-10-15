import { docsLlms } from '@/lib/source';
import { absolutizeLinks, llmsIntro } from '@/lib/llms-intro';

export const revalidate = false;

export async function GET() {
  // Fumadocs' index starts with its own "# Kashfy Docs" heading; the intro supplies the H1.
  const index = (await docsLlms.index('en')).replace(/^# .*\n+/, '');
  return new Response(`${llmsIntro}\n## Docs\n\n${absolutizeLinks(index)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
