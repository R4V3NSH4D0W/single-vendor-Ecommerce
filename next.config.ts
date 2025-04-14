import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push({
      '@prisma/client': '@prisma/client',
    })
    return config
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
