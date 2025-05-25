/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "bjorn66.com",
      "6ammart-test.6amdev.xyz",
      "192.168.50.168",
      "6ammart-dev.6amdev.xyz",
    ],
  },
  // Increase build timeout
  staticPageGenerationTimeout: 120,
  // Optimize build
  swcMinify: true,
  // Optimize CSS
  optimizeFonts: true,
  // Increase memory limit
  webpack: (config, { isServer }) => {
    // Optimize build
    config.optimization = {
      ...config.optimization,
      minimize: true,
    };
    return config;
  },
}

module.exports = nextConfig
