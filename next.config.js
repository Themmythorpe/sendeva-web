/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "bjorn66.com",
      "6ammart-test.6amdev.xyz",
      "192.168.50.168",
      "6ammart-dev.6amdev.xyz",
    ], // Add the domain here
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Add static page generation timeout
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
  // Configure static file generation
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Configure asset prefix for production
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://sendeva.com' : '',
  // Configure base path
  basePath: '',
  // Configure output
  output: 'standalone',
};

module.exports = nextConfig;
