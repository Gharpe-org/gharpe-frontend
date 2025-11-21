import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin', // Changed from 'unsafe-none' to 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp', // Changed from 'unsafe-none' to 'require-corp'
          },
        ],
      },
    ]
  },
};

export default nextConfig;
