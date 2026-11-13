import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Self-contained server in .next/standalone for the Docker image (Coolify). Vercel ignores it.
  output: 'standalone',
  async redirects() {
    return [
      // The docs moved from docs.kashfy.site to help.docistra.com (Kashfy -> Docistra, 2026-11).
      // Old links keep working with the same path. /mcp is left out: apps still on the
      // old build call docs.kashfy.site/mcp, and MCP clients may not follow a redirect.
      {
        source: '/:path((?!mcp(?:/|$)).*)',
        has: [{ type: 'host', value: 'docs\\.(?:kashfy\\.site|docistra\\.com)' }],
        destination: 'https://help.docistra.com/:path',
        permanent: true,
      },
      { source: '/settings/clinic', destination: '/settings/organization', permanent: true },
      { source: '/ar/settings/clinic', destination: '/ar/settings/organization', permanent: true },
    ];
  },
};

export default withMDX(config);
