# Kashfy Docs

Source of [docs.kashfy.site](https://docs.kashfy.site), built with [Fumadocs](https://fumadocs.dev) on Next.js.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build
```

## Writing pages

- Pages live in `content/docs/` as `.mdx`. The file path is the URL: `content/docs/lab/intake.mdx` is `/lab/intake`.
  The app links to these paths (`docsUrl()` in kashfy-app), so don't rename or move a page without adding a redirect in `next.config.mjs`.
- Sidebar order and group titles are in `content/docs/meta.json` (Arabic: `meta.ar.json`).
- Components: `Card`/`CardGroup`, `Steps`/`Step`, `Accordion`/`AccordionGroup`, `Tabs`/`Tab`, `Note`, `Info`, `Tip`, `Warning`.
  Icon names are mapped in `components/icon.tsx`.

## Arabic (RTL)

English is served at the root, Arabic under `/ar` with a right-to-left layout.
To translate a page, add a file next to it with `.ar` before the extension: `content/docs/lab/intake.ar.mdx` is `/ar/lab/intake`.
Pages without a translation show the English version under `/ar`.

## For AI tools

- `/llms.txt` and `/llms-full.txt`
- Any page as Markdown: add `.md` to the URL, e.g. `/lab/intake.md`
- MCP server at `/mcp` with `search_kashfy_docs` and `get_kashfy_doc_page` (used by the dashboard help assistant)
