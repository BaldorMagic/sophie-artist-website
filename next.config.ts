import type { NextConfig } from "next";

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

export default nextConfig;
