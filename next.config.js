/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "bjorn66.com",
      "6ammart-test.6amdev.xyz",
      "192.168.50.168",
      "6ammart-dev.6amdev.xyz"
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_CLIENT_HOST_URL: process.env.NEXT_CLIENT_HOST_URL,
    NEXT_PUBLIC_SITE_VERSION: process.env.NEXT_PUBLIC_SITE_VERSION,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_APPLE_CLIENT_ID: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
    NEXT_PUBLIC_SOFTWARE_ID: process.env.NEXT_PUBLIC_SOFTWARE_ID,
  },
  // Ensure environment variables are available at build time
  staticPageGenerationTimeout: 120,
  // Enable SWC minification
  swcMinify: true,
  // Configure trailing slashes
  trailingSlash: false,
  // Configure page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Configure redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // Configure rewrites
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
        },
      ],
    };
  },
  // Optimize CSS
  optimizeFonts: true,
  // Configure static file handling
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  // Configure base path
  basePath: '',
  // Configure output
  output: 'standalone',
  // Configure CSS optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize build
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
  // Ensure static files are properly handled
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Configure static file generation
  experimental: {
    optimizeCss: false
  },
};

module.exports = nextConfig;
