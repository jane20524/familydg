import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "wordpress-1568541-6224097.cloudwaysapps.com",
      },
    ],
  },
};

export default nextConfig;
