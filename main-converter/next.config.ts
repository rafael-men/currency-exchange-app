import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignora o ESLint durante a build
  },
};

export default nextConfig;
