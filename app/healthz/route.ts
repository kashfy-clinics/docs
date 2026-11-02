// Health check for the Docker image / Coolify. Prerendered at build time, so it
// answers without touching the docs source or the search index.
export const dynamic = 'force-static';

export function GET() {
  return new Response('ok', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
