import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/settings/clinic', destination: '/settings/organization', permanent: true },
      { source: '/ar/settings/clinic', destination: '/ar/settings/organization', permanent: true },
    ];
  },
};

export default withMDX(config);
