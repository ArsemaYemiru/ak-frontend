import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowSVG: true,
    // Allow loading images from localhost in development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
