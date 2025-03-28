import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during production builds
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'main.hivetech.space',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/', // The path you want to redirect from
        destination: '/home', // The path you want to redirect to
        permanent: true, // Set to true for permanent redirect (301) or false for temporary (302)
      },
    ];
  },
  
};

export default nextConfig;
