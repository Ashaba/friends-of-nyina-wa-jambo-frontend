import type { NextConfig } from 'next';

/**
 * Get Strapi hostname for image optimization
 */
function getStrapiHostname(): string {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  try {
    return new URL(strapiUrl).hostname;
  } catch {
    return 'localhost';
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: getStrapiHostname(),
        pathname: '/uploads/**',
      },
    ],
  },
  // Enable server actions for revalidation
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
