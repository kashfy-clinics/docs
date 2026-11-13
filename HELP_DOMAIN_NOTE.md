# Note: the docs site becomes help.docistra.com

Decided 2026-11-12, during the Kashfy to Docistra rename.

| Before | After |
|---|---|
| docs.kashfy.site | **help.docistra.com** |
| repo folder `Desktop\Kashfy\docs` | `Desktop\Docistra\docistra-help` (this copy) |

## Done (in the Docistra folders only)

- **This repo:** every `docs.docistra.com` is now `help.docistra.com` (4 files).
- **The app (`Desktop\Docistra\docistra-app`):** same, in 20 files: the docs info icon links (`src/components/ui/docs-link.tsx`), the in-app help chat and its docs search (`src/lib/help-chat.ts`, `src/lib/help-knowledge.ts`, `src/app/api/dashboard/help/route.ts`), the marketing navbar and footer, the SEO `sameAs` list, `llms.txt` and the sales agent.
- **The docs MCP endpoint** the app calls is now `https://help.docistra.com/mcp` (also in `.claude/.mcp.json`).
- **Old addresses:** `docs.kashfy.site` and `docs.docistra.com` redirect (308) to `help.docistra.com` with the same path, in this repo's `next.config.mjs`. `/mcp` is left on the old host, because apps still on the old build call `docs.kashfy.site/mcp`. The app's `next.config.ts` has the same docs rule, ahead of its general `*.kashfy.site` redirect.

The old `Desktop\Kashfy` folders were not changed and still say `docs.docistra.com`.

## Still to do

- **Hosting:** add `help.docistra.com` in DNS and on the docs service in Coolify, and keep `docs.kashfy.site` on the same service so its redirect works.

## State of this copy

A full copy of `Desktop\Kashfy\docs`, made 2026-11-12. It includes the uncommitted Docistra rename (180 changed files plus a "What's new" entry in English and Arabic). Last commit: `b8f18c7`. Its git remote still points at the old docs repo.
