import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  eslint: {
    // Enable ESLint during builds for CI/CD pipeline
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "147.79.118.212",
        port: "7099",
        pathname: "/storage/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  experimental: {
    esmExternals: true,
  },
  output: 'standalone',
    devIndicators: {
    appIsrStatus: false,
    buildActivity: false, 
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
