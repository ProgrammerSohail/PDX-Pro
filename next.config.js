/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    // Ensure canvas module is properly handled
    config.externals = [...config.externals, { canvas: 'canvas' }];
    
    // Handle PDF.js worker
    config.resolve.alias.canvas = false;
    
    return config;
  },
};

module.exports = nextConfig; 