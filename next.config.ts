/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force webpack instead of Turbopack
  experimental: {
    turbo: undefined,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
