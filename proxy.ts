import { NextRequest, NextResponse } from 'next/server';
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { isMarkdownPreferred } from 'fumadocs-core/negotiation';
import { i18n } from '@/lib/i18n';
import { docsContentRoute } from '@/lib/shared';

const i18nMiddleware = createI18nMiddleware(i18n);

/** "/ar/lab/intake" -> ["ar", "lab/intake"], "/lab/intake" -> ["en", "lab/intake"] */
function splitLocale(pathname: string): [string, string] {
  const [first, ...rest] = pathname.replace(/^\/+|\/+$/g, '').split('/');
  if ((i18n.languages as string[]).includes(first) && first !== i18n.defaultLanguage) {
    return [first, rest.join('/')];
  }
  return [i18n.defaultLanguage, [first, ...rest].filter(Boolean).join('/')];
}

function markdownRoute(lang: string, path: string) {
  return `${docsContentRoute}/${lang}/${path ? `${path}/` : ''}content.md`;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // "/lab/intake.md" -> raw Markdown of that page
  if (pathname.endsWith('.md')) {
    const [lang, path] = splitLocale(pathname.slice(0, -3));
    return NextResponse.rewrite(new URL(markdownRoute(lang, path), request.nextUrl));
  }

  // Same URL, Markdown for agents that ask for it
  if (isMarkdownPreferred(request)) {
    const [lang, path] = splitLocale(pathname);
    return NextResponse.rewrite(new URL(markdownRoute(lang, path), request.nextUrl), {
      headers: { Vary: 'Accept' },
    });
  }

  return i18nMiddleware(request, {} as never);
}

export const config = {
  // Skip API/MCP/LLM routes, Next internals and static files (anything with an
  // extension), but still handle "*.md".
  matcher: ['/((?!api|mcp|llms|_next|.*\\.(?!md$)[^/]+$).*)'],
};
