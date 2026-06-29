import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "lh3.googleusercontent.com",
        port: '',
        pathname: '/a/**', // Allows all images under this path
      },
    ],
  },
  allowedDevOrigins: ['127.0.0.1'],
};

export default nextConfig;
