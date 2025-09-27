/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["ext.same-assets.com"],
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  compress: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  allowedDevOrigins: [
    '9dc07387-8c0c-487c-8aac-28642b565a24-00-3f0xxj7ddr2i4.kirk.replit.dev'
  ],
};

module.exports = nextConfig;