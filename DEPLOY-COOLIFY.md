# Deploying to Coolify

help.docistra.com runs as a Next.js server (not a static site), built from this repo's `Dockerfile` on the Coolify server (Ubuntu 24.04, ARM64, Traefik in front).

It needs a server because of:

- `/mcp`: MCP endpoint (POST). **kashfy-app depends on `https://help.docistra.com/mcp`**: the dashboard help assistant calls its `search_docistra_docs` tool. If this endpoint is down or moves, the help assistant stops finding docs.
- `/api/search`: the search box.
- `proxy.ts`: serves English at the root, `.md` URLs, and Markdown for `Accept: text/markdown`.

Vercel still works unchanged (`output: 'standalone'` is ignored there).

## Coolify settings

| Setting | Value |
|---|---|
| Source | GitHub `kashfy-clinics/docs`, branch `main` |
| Build pack | **Dockerfile** (`/Dockerfile`, base directory `/`) |
| Port (Ports Exposes) | **3000** |
| Domain | `https://help.docistra.com` |
| Health check | Enabled, path **`/healthz`**, port 3000, expects `200` (the image also has a Docker `HEALTHCHECK` on the same path) |
| Environment variables | **None.** The app reads no env vars at build time or at runtime; the site URL is set in `lib/shared.ts`. `PORT=3000`, `HOSTNAME=0.0.0.0` and `NODE_ENV=production` are set in the image. |

The base image (`node:22-alpine`) is multi-arch, so the build runs natively on ARM64. A build takes a few minutes; the container runs as the non-root `node` user with `tini` as PID 1.

## DNS

At the DNS provider for `docistra.com`, point `docs` at the Coolify server:

- `A` record: `docs` → the server's public IPv4 (and `AAAA` if it has IPv6)
- Remove the old Vercel record for `docs` (usually a `CNAME` to `cname.vercel-dns.com`)
- If the domain is behind Cloudflare, use **DNS only** until Coolify has issued the Let's Encrypt certificate (or use SSL mode "Full (strict)" with the proxy on)

Traefik gets the HTTPS certificate once the record resolves to the server.

## After deploying

```bash
D=https://help.docistra.com

curl -s -o /dev/null -w '%{http_code}\n' $D/healthz                 # 200
curl -s -o /dev/null -w '%{http_code}\n' $D/quickstart              # 200
curl -s -o /dev/null -w '%{http_code}\n' $D/ar                      # 200
curl -s -o /dev/null -w '%{http_code}\n' $D/no-such-page            # 404
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' $D/settings/clinic   # 308 .../settings/organization
curl -s $D/lab/intake.md | head -1                                  # "# Intake queue (...)"
curl -s "$D/api/search?query=whatsapp" | head -c 200                # JSON results

# MCP (kashfy-app depends on this): must list search_docistra_docs
curl -s -X POST $D/mcp -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | grep -o '"search_docistra_docs"'
```

Then ask the dashboard help assistant in kashfy-app a docs question to confirm it gets answers end to end.

## Running the image locally

```bash
docker build -t kashfy-docs .
docker run --rm -p 3000:3000 kashfy-docs
```
