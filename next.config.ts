import type { NextConfig } from 'next';
import { default as _withNextIntl } from 'next-intl/plugin';

const withNextIntl = _withNextIntl();

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Optimized image configuration for image tools
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },

  // Essential security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },

  // Specific configuration for Turbopack
  turbopack: {
    // Resolve extensions for development with Turbopack
    resolveExtensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'],
  },

  // Optimize imports for performance
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
      preventFullImport: true,
    },
  },

  // Experimental features
  experimental: {
    // Enable the built-in React compiler instead of using Babel
    reactCompiler: {
      compilationMode: 'all',
    },

    // Performance optimizations
    optimizeCss: true,
    serverSourceMaps: true,
    scrollRestoration: true,

    // Package optimization
    optimizePackageImports: ['lucide-react'],

    // Enhanced performance for Turbopack
    turbopackTreeShaking: true,
    turbopackPersistentCaching: false,
  },
};

export default withNextIntl(nextConfig);
