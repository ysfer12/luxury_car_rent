/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable source maps for smaller, faster builds
    productionBrowserSourceMaps: false,
    
    // Improve memory usage
    swcMinify: true,
    
    // Ensure we have a clean output directory
    cleanDistDir: true,
    
    // Disable webpack caching to resolve your specific error
    webpack: (config, { dev, isServer }) => {
      // Disable webpack caching for production builds
      if (!dev) {
        config.cache = false;
      }
      return config;
    },
    
    // Add reasonable memory limits for builds
    experimental: {
      // Enable optimizations where possible
      optimizeCss: true,
    }
  }
  
  module.exports = nextConfig