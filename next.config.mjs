import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Self-contained server in .next/standalone for the Docker image (Coolify). Vercel ignores it.
  output: 'standalone',
  async redirects() {
    return [
      { source: '/settings/clinic', destination: '/settings/organization', permanent: true },
      { source: '/ar/settings/clinic', destination: '/ar/settings/organization', permanent: true },
      // The docs only cover clinics now; lab, radiology and modules pages were removed.
      { source: '/:section(lab|radiology)/:path*', destination: '/', permanent: true },
      { source: '/ar/:section(lab|radiology)/:path*', destination: '/ar', permanent: true },
      { source: '/settings/:page(modules|insurance)', destination: '/settings/overview', permanent: true },
      { source: '/ar/settings/:page(modules|insurance)', destination: '/ar/settings/overview', permanent: true },
    ];
  },
};

export default withMDX(config);
