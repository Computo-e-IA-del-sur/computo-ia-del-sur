import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/computo-ia-del-sur',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
