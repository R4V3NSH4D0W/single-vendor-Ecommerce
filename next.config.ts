import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push({
      '@prisma/client': '@prisma/client',
    });
    return config;
  },
  images: {
    domains: ["images.unsplash.com", "localhost","59cqvp91-3000.inc1.devtunnels.ms"],
  },
};

export default nextConfig;
