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
};

module.exports = nextConfig;
