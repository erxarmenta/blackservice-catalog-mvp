import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['d5e5-187-189-109-89.ngrok-free.app'],
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/catalogo',
        permanent: false
      }
    ]
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
