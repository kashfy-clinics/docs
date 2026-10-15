import { docsLlms } from '@/lib/source';
import { absolutizeLinks, llmsIntro } from '@/lib/llms-intro';

export const revalidate = false;

export async function GET() {
  return new Response(`${llmsIntro}\n---\n\n${absolutizeLinks(await docsLlms.full('en'))}`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
