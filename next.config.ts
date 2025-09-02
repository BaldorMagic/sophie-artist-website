import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.baldor.dev',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
