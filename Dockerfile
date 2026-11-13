# syntax=docker/dockerfile:1
# Docistra Docs: Next.js standalone server (Coolify). Works on linux/arm64 and linux/amd64.

ARG NODE_VERSION=22-alpine

# ---- deps: install from the lockfile only ----
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
# Same pnpm as "packageManager" in package.json
RUN npm install -g pnpm@11.21.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ---- build ----
FROM node:${NODE_VERSION} AS build
WORKDIR /app
RUN npm install -g pnpm@11.21.0
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- run ----
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
RUN apk add --no-cache tini
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# The node image already has a non-root "node" user (uid 1000)
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node
EXPOSE 3000

# /healthz is prerendered: no docs or search I/O
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/healthz" || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
