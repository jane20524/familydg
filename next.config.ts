import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/blog/:path*",
        destination:
          "https://wordpress-1568541-6224097.cloudwaysapps.com/:path*",
      },
    ];
  },
};

export default nextConfig;
