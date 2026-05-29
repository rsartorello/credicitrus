import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'credicitrus.blog',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
